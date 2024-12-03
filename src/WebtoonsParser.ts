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
import { 
    CheerioAPI,
    Cheerio 
} from 'cheerio'
import { 
    Element,
    AnyNode
} from 'domhandler/lib/node'
import { WebtoonsSettings } from './WebtoonsSettings'

type CheerioElement = Cheerio<Element>;

export type WebtoonsMetadata = { page: number, maxPages?: number | undefined }

export abstract class WebtoonsParser
    extends WebtoonsSettings
{
    BASE_URL: string
    MOBILE_URL: string

    constructor(
        private dateFormat: string,
        private locale: string,
        private language: string,
        BASE_URL: string,
        MOBILE_URL: string) 
    { 
        super()
        this.BASE_URL = BASE_URL
        this.MOBILE_URL = MOBILE_URL
    }

    parseDetails($: CheerioAPI, mangaId: string): SourceManga {
        const detailElement = $('#content > div.cont_box > div.detail_header > div.info')
        const infoElement = $('#_asideDetail') as CheerioElement

        const [image, title] = mangaId.startsWith('canvas') 
            ? [this.parseCanvasDetailsThumbnail($), detailElement.find('h3').text().trim()]
            : [this.parseDetailsThumbnail($), detailElement.find('h1').text().trim()]

        return {
            mangaId: mangaId,
            mangaInfo: {
                thumbnailUrl: image,
                synopsis: infoElement.find('p.summary').text(),
                primaryTitle: title,
                secondaryTitles: [],
                contentRating: ContentRating.MATURE,

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
            }
        }
    }

    parseStatus(infoElement: CheerioElement): string {
        const statusElement = infoElement.find('p.day_info')
        const bubbleTest = statusElement.find('span').text() ?? ''
        return statusElement.text()?.replace(bubbleTest, '')
    }

    parseDetailsThumbnail($: CheerioAPI): string {
        return $('#content > div.cont_box > div.detail_body').attr('style')?.match(/url\((.*?)\)/)?.[1] ?? ''
    }
    
    parseCanvasDetailsThumbnail($: CheerioAPI): string {
        return $('#content > div.cont_box span.thmb > img').attr('src') ?? ''
    }

    parseChaptersList($: CheerioAPI, sourceManga: SourceManga): Chapter[] {
        return $('ul#_episodeList > li[id*=episode]')
            .toArray()
            .map(elem => this.parseChapter($(elem), sourceManga))
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
        return {
            id: chapter.chapterId,
            mangaId: chapter.sourceManga.mangaId,
            pages: $('div#_imageList img').toArray().map(elem => $(elem).attr('data-url') ?? '')
        }
    }

    parsePopularTitles($: CheerioAPI): PagedResults<SearchResultItem> {
        return {
            items: $('div#content div.NE\\=a\\:tnt li a')
                .toArray()
                .filter(elem => $(elem).find('p.subj'))
                .map(elem => this.parseMangaFromElement($(elem)))
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

    parseCanvasRecommendedTitles($: CheerioAPI): PagedResults<SearchResultItem> {
        return {
            items: $('#recommendArea li.rolling-item')
                .toArray()
                .map(elem => this.parseCanvasFromRecommendedElement($(elem)))
        }
    }

    parseCanvasFromRecommendedElement(elem: CheerioElement): SearchResultItem {
        return {
            mangaId: elem.find('a').attr('href')?.replace(this.BASE_URL + '/', '') ?? '',
            title: elem.find('p.subj').text(),
            imageUrl: elem.find('img').attr('src') ?? '',
            subtitle: 'Canvas'
        }
    }

    parseCanvasPopularTitles($: CheerioAPI): PagedResults<SearchResultItem> {
        return { 
            items: $('div.challenge_lst li a')
                .toArray()
                .map(elem => this.parseCanvasFromElement($(elem)))
        }
    }

    parseMangaFromElement(elem: CheerioElement): SearchResultItem {
        return {
            mangaId: elem.attr('href')?.replace(this.BASE_URL + '/', '') ?? '',
            title: elem.find('p.subj').text(),
            imageUrl: elem.find('img').attr('src') ?? ''
        }
    }

    parseCanvasFromElement(elem: CheerioElement): SearchResultItem {
        return {
            mangaId: elem.attr('href')?.replace(this.BASE_URL + '/', '') ?? '',
            title: elem.find('p.subj').text(),
            imageUrl: elem.find('img').attr('src') ?? '',
            subtitle: 'Canvas'
        }
    }

    parseSearchResults($: CheerioAPI): PagedResults<SearchResultItem> {
        return {
            items : [
                ...$('#content > div.card_wrap.search li a.card_item')
                    .toArray()
                    .map(elem => this.parseMangaFromElement($(elem))),
                ...(this.canvasWanted 
                    ? $('#content > div.card_wrap.search li a.challenge_item')
                        .toArray()
                        .map(elem => this.parseCanvasFromElement($(elem)))
                    : [])
            ]
        }
    }

    parseGenres($: CheerioAPI): Tag[]{
        return $('#content ul._genre li')
            .toArray()
            .map(elem => this.parseTagFromElement($(elem)))
    }

    parseCanvasGenres($: CheerioAPI): Tag[]{
        return $('#content ul.challenge li')
            .toArray()
            .filter(elem => $(elem).attr('data-genre') && $(elem).attr('data-genre') !== 'ALL')
            .map(elem => this.parseCanvasTagFromElement($(elem)))
    }

    parseTagFromElement(elem: CheerioElement): Tag {
        return {
            id: elem.attr('data-genre') ?? '',
            title: elem.find('a').text().trim()
        }
    }
    
    parseCanvasTagFromElement(elem: CheerioElement): Tag {
        return {
            id: 'CANVAS$$' + (elem.attr('data-genre') ?? ''),
            title: 'Canvas - ' + elem.find('a').text().trim()
        }
    }
    
    parseTagResults($: CheerioAPI): PagedResults<SearchResultItem> {
        return {
            items: $('#content > div.card_wrap ul.card_lst li a')
                .toArray()
                .map(elem => this.parseMangaFromElement($(elem)))
        }
    }
}
