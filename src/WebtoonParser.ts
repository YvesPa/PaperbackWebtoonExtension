import {
    SourceManga,
    Chapter,
    ChapterDetails,
    PagedResults,
    Tag,
    SearchResultItem,
    ContentRating
} from '@paperback/types'

import moment from 'moment'
import { CheerioAPI } from 'cheerio/lib/load'
import { Cheerio } from 'cheerio/lib/cheerio'
import { 
    Element,
    AnyNode
} from 'domhandler/lib/node'

type CheerioElement = Cheerio<Element>;

export class WebtoonParser {

    constructor(
        private dateFormat: string,
        private locale: string,
        private language: string,
        private BASE_URL: string,
        private MOBILE_URL: string) 
    { }

    parseDetails($: CheerioAPI, mangaId: string): SourceManga {
        const detailElement = $('#content > div.cont_box > div.detail_header > div.info')
        const infoElement = $('#_asideDetail') as CheerioElement

        return {
            mangaId: mangaId,
            mangaInfo: {
                thumbnailUrl: this.parseDetailsThumbnail($),
                synopsis: infoElement.find('p.summary').text(),
                primaryTitle: detailElement.find('h1').text(),
                secondaryTitles: [],
                contentRating: ContentRating.EVERYONE,

                status: this.parseStatus(infoElement),
                artist: '',
                author: detailElement.find('.author_area').text().trim(),
                tagGroups: [
                    {
                        id: '0',
                        title: 'genres',
                        tags: detailElement.find('.genre').toArray().map(genre => ({ id: $(genre).text(), title: $(genre).text() }))
                    }
                ]
            },
            chapterCount: 0,
            newChapterCount: 0,
            unreadChapterCount: 0
        }
    }

    parseStatus(infoElement: CheerioElement): string {
        const statusElement = infoElement.find('p.day_info')
        const bubbleTest = statusElement.find('span').text() ?? ''
        return statusElement.text()?.replace(bubbleTest, '')
    }

    parseDetailsThumbnail($: CheerioAPI): string {
        const picElement = $('#content > div.cont_box > div.detail_body')
        return picElement.attr('style')?.match(/url\((.*?)\)/)?.[1] ?? ''
    }

    parseChaptersList($: CheerioAPI, sourceManga: SourceManga): Chapter[] {
        const chapters: Chapter[] = []
      
        $('ul#_episodeList > li[id*=episode]').each((_ : number, elem: Element) => {
            chapters.push(this.parseChapter($(elem), sourceManga))})

        return chapters
    }

    parseChapter(elem: CheerioElement, sourceManga: SourceManga): Chapter {
        return {
            chapterId: elem.find('a').attr('href')?.replace(this.MOBILE_URL + '/', '') ?? '',
            sourceManga: sourceManga,
            langCode: this.locale,
            title: elem.find('a > div.row > div.info > p.sub_title > span.ellipsis').text(),
            chapNum: Number(elem.find('a > div.row > div.num').text()?.substring(1)),
            publishDate: this.parseDate(elem.find('a > div.row > div.info > div.sub_info > span.date').text())
        }
    }

    parseDate(date: string) : Date{
        return new Date( moment(date, this.dateFormat, this.language).toDate() )
    }
  
    parseChapterDetails($: CheerioAPI, chapter: Chapter): ChapterDetails {
        const pages: string[] = []

        $('div#_imageList img').each((_ : number, elem: Element) => {
            pages.push($(elem).attr('data-url') ?? '')
        })

        return Paperback.createChapterDetails({
            id: chapter.chapterId,
            mangaId: chapter.sourceManga.mangaId,
            pages: pages
        })
    }

    parsePopularTitles($: CheerioAPI): PagedResults<SearchResultItem> {
        const mangas: SearchResultItem[] = []
        
        $('div#content div.NE\\=a\\:tnt li a').each((_ : number, elem: AnyNode) => {
            if ($(elem).find('p.subj'))
                mangas.push(this.parseMangaFromElement($(elem as Element)))
        })

        return {items: mangas}
    }

    parseCarouselTitles($: CheerioAPI): PagedResults<SearchResultItem> {
        const mangas: SearchResultItem[] = []

        $('div#content div.main_banner_big div._largeBanner').each((_ : number, elem: Element) => {
            const manga = this.parseMangaFromCarouselElement($(elem))
            if(manga) mangas.push(manga)
        })

        return {items: mangas}
    }

    parseMangaFromCarouselElement(elem: CheerioElement): SearchResultItem | void {
        let mangaId = elem.find('a').attr('href') ?? ''
        if (mangaId.includes('episode_no')){
            mangaId = mangaId
                .replace(/&episode_no=[^$]+$/, '')
                .replace(/[^/]+\/viewer(\?|$)/, 'list$1')
        }

        if (mangaId.includes('/list?'))
            return {
                mangaId: mangaId.replace(this.BASE_URL + '/', ''),
                title: '',
                imageUrl: elem.find('img').attr('src') ?? ''
            }
    }

    parseTodayTitles($: CheerioAPI, allTitles: boolean): PagedResults<SearchResultItem> {
        const mangas: SearchResultItem[] = []

        const date = moment().locale('en').format('dddd').toUpperCase()
        const list = $(`div#dailyList div.daily_section._list_${date} li a.daily_card_item`)
        for(let i = 0; i <= list.length && (allTitles || mangas.length < 10); i++){
            if($(list[i]).find('p.subj'))
                mangas.push(this.parseMangaFromElement($(list[i])))
        }

        return {items: mangas}
    }

    parseOngoingTitles($: CheerioAPI, allTitles: boolean): PagedResults<SearchResultItem> {
        const mangas: SearchResultItem[] = []
        let maxChild = 0

        $('div#dailyList > div').each((_ : number, elem: Element) => {
            if ($(elem).find('li').length > maxChild) maxChild = $(elem).find('li').length
        })

        for (let i = 1; i <= maxChild; i++) {
            if(!allTitles && mangas.length >= 14) return {items: mangas}
            $('div#dailyList > div li:nth-child(' + i + ') a.daily_card_item').each((_ : number, elem: AnyNode) => {
                if ($(elem).find('p.subj'))
                    mangas.push(this.parseMangaFromElement($(elem as Element)))
            })
        }

        return {items: mangas}
    }

    parseCompletedTitles($: CheerioAPI, allTitles: boolean): PagedResults<SearchResultItem> {
        const mangas: SearchResultItem[] = []

        const list = $('div.daily_lst.comp li a')
        for(let i = 0; i <= list.length && (allTitles || mangas.length < 10); i++){
            if($(list[i]).find('p.subj'))
                mangas.push(this.parseMangaFromElement($(list[i])))
        }

        return {items: mangas}
    }

    parseMangaFromElement(elem: CheerioElement): SearchResultItem {
        return {
            mangaId: elem.attr('href')?.replace(this.BASE_URL + '/', '') ?? '',
            title: elem.find('p.subj').text(),
            imageUrl: elem.find('img').attr('src') ?? ''
        }
    }

    parseSearchResults($: CheerioAPI): PagedResults<SearchResultItem> {
        const items: SearchResultItem[] = []

        $('#content > div.card_wrap.search li a.card_item').each((_ : number, elem: Element) => {
            items.push(this.parseMangaFromElement($(elem)))
        })

        return {items: items}
    }
    
    parseGenres($: CheerioAPI): Tag[]{
        const tags: Tag[] = []

        $('#content ul._genre li').each((_ : number, elem: Element) => {
            tags.push(this.parseTagFromElement($(elem)))
        })

        return tags
    }

    parseTagFromElement(elem: CheerioElement): Tag {
        return {
            id: elem.attr('data-genre') ?? '',
            title: elem.find('a').text().trim()
        }
    }
    
    parseTagResults($: CheerioAPI): PagedResults<SearchResultItem> {
        const items: SearchResultItem[] = []

        $('#content > div.card_wrap ul.card_lst li a').each((_ : number, elem: Element) => {
            items.push(this.parseMangaFromElement($(elem)))
        })

        return {items: items}
    }


}
