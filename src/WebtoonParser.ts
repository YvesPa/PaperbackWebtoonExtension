import {
    SourceManga,
    Chapter,
    ChapterDetails,
    PagedResults,
    PartialSourceManga,
    Tag
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
        private language: string,
        private BASE_URL: string,
        private MOBILE_URL: string) 
    { }

    parseDetails($: CheerioAPI, mangaId: string): SourceManga {
        const detailElement = $('#content > div.cont_box > div.detail_header > div.info')
        const infoElement = $('#_asideDetail') as CheerioElement

        const [image, title] = mangaId.startsWith('canvas') 
            ? [this.parseCanvasDetailsThumbnail($), detailElement.find('h3').text().trim()]
            : [this.parseDetailsThumbnail($), detailElement.find('h1').text().trim()]

        return App.createSourceManga({
            id: mangaId,
            mangaInfo: App.createMangaInfo({
                image: image,
                titles: [title],
                author: detailElement.find('.author_area').text().trim(),
                artist: '',
                desc: infoElement.find('p.summary').text(),
                tags: [
                    App.createTagSection({
                        id: '0',
                        label: 'genres',
                        tags: detailElement.find('.genre').toArray().map(genre => App.createTag({ id: $(genre).text(), label: $(genre).text() }))
                    })
                ],
                status: this.parseStatus(infoElement)
            })
        })
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

    parseChaptersList($: CheerioAPI): Chapter[] {
        return $('ul#_episodeList > li[id*=episode]')
            .toArray()
            .map(elem => this.parseChapter($(elem)))
    }

    parseChapter(elem: CheerioElement): Chapter {
        return App.createChapter({
            id: elem.find('a').attr('href')?.replace(this.MOBILE_URL + '/', '') ?? '',
            name: elem.find('a > div.row > div.info > p.sub_title > span.ellipsis').text(),
            chapNum: Number(elem.find('a > div.row > div.num').text()?.substring(1)),
            time: this.parseDate(elem.find('a > div.row > div.info > div.sub_info > span.date').text())
        })
    }

    parseDate(date: string) : Date{
        return new Date( moment(date, this.dateFormat, this.language).toDate() )
    }
  
    parseChapterDetails($: CheerioAPI, mangaId: string, chapterId: string): ChapterDetails {
        return App.createChapterDetails({
            id: chapterId,
            mangaId: mangaId,
            pages: $('div#_imageList img').toArray().map(elem => $(elem).attr('data-url') ?? '')
        })
    }

    parsePopularTitles($: CheerioAPI): PartialSourceManga[] {
        return $('div#content div.NE\\=a\\:tnt li a')
            .toArray()
            .filter(elem => $(elem).find('p.subj'))
            .map(elem => this.parseMangaFromElement($(elem)))
    }

    parseCarouselTitles($: CheerioAPI): PartialSourceManga[] {
        return $('div#content div.main_banner_big div._largeBanner')
            .toArray()
            .map(elem => this.parseMangaFromCarouselElement($(elem)))
            .filter(manga => manga)
            .map(manga => manga as PartialSourceManga)
    }

    parseMangaFromCarouselElement(elem: CheerioElement): PartialSourceManga | void {
        let mangaId = elem.find('a').attr('href') ?? ''
        if (mangaId.includes('episode_no')){
            mangaId = mangaId
                .replace(/&episode_no=[^$]+$/, '')
                .replace(/[^/]+\/viewer(\?|$)/, 'list$1')
        }

        if (mangaId.includes('/list?'))
            return App.createPartialSourceManga({
                mangaId: mangaId.replace(this.BASE_URL + '/', ''),
                title: '',
                image: elem.find('img').attr('src') ?? ''
            })
    }

    parseTodayTitles($: CheerioAPI, allTitles: boolean): PartialSourceManga[] {
        const mangas: PartialSourceManga[] = []

        const date = moment().locale('en').format('dddd').toUpperCase()
        const list = $(`div#dailyList div.daily_section._list_${date} li a.daily_card_item`)
        for(let i = 0; i <= list.length && (allTitles || mangas.length < 10); i++){
            if($(list[i]).find('p.subj'))
                mangas.push(this.parseMangaFromElement($(list[i])))
        }

        return mangas
    }

    parseOngoingTitles($: CheerioAPI, allTitles: boolean): PartialSourceManga[] {
        const mangas: PartialSourceManga[] = []
        let maxChild = 0

        $('div#dailyList > div').each((_ : number, elem: Element) => {
            if ($(elem).find('li').length > maxChild) maxChild = $(elem).find('li').length
        })

        for (let i = 1; i <= maxChild; i++) {
            if(!allTitles && mangas.length >= 14) return mangas
            $('div#dailyList > div li:nth-child(' + i + ') a.daily_card_item').each((_ : number, elem: AnyNode) => {
                if ($(elem).find('p.subj'))
                    mangas.push(this.parseMangaFromElement($(elem as Element)))
            })
        }

        return mangas
    }

    parseCompletedTitles($: CheerioAPI, allTitles: boolean): PartialSourceManga[] {
        const mangas: PartialSourceManga[] = []

        const list = $('div.daily_lst.comp li a')
        for(let i = 0; i <= list.length && (allTitles || mangas.length < 10); i++){
            if($(list[i]).find('p.subj'))
                mangas.push(this.parseMangaFromElement($(list[i])))
        }

        return mangas
    }

    parseCanvasRecommendedTitles($: CheerioAPI): PartialSourceManga[] {
        return $('#recommendArea li.rolling-item')
            .toArray()
            .map(elem => this.parseCanvasFromRecommendedElement($(elem)))
    }

    parseCanvasFromRecommendedElement(elem: CheerioElement): PartialSourceManga {
        return App.createPartialSourceManga({
            mangaId: elem.find('a').attr('href')?.replace(this.BASE_URL + '/', '') ?? '',
            title: elem.find('p.subj').text(),
            image: elem.find('img').attr('src') ?? '',
            subtitle: 'Canvas'
        })
    }

    parseCanvasPopularTitles($: CheerioAPI): PartialSourceManga[] {
        return $('div.challenge_lst li a')
            .toArray()
            .map(elem => this.parseCanvasFromElement($(elem)))
    }

    parseMangaFromElement(elem: CheerioElement): PartialSourceManga {
        return App.createPartialSourceManga({
            mangaId: elem.attr('href')?.replace(this.BASE_URL + '/', '') ?? '',
            title: elem.find('p.subj').text(),
            image: elem.find('img').attr('src') ?? ''
        })
    }

    parseCanvasFromElement(elem: CheerioElement): PartialSourceManga {
        return App.createPartialSourceManga({
            mangaId: elem.attr('href')?.replace(this.BASE_URL + '/', '') ?? '',
            title: elem.find('p.subj').text(),
            image: elem.find('img').attr('src') ?? '',
            subtitle: 'Canvas'
        })
    }

    parseSearchResults($: CheerioAPI, canvas_wanted: boolean): PagedResults {
        const items: PartialSourceManga[] = []
        items.push(...$('#content > div.card_wrap.search li a.card_item')
            .toArray()
            .map(elem => this.parseMangaFromElement($(elem))))

        if (canvas_wanted) {
            items.push(...$('#content > div.card_wrap.search li a.challenge_item')
                .toArray()
                .map(elem => this.parseCanvasFromElement($(elem))))
        }

        return App.createPagedResults({
            results: items
        })
    }
    
    parseGenres($: CheerioAPI): Tag[]{
        return  $('#content ul._genre li')
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
        return App.createTag({
            id: elem.attr('data-genre') ?? '',
            label: elem.find('a').text().trim()
        })
    }
    
    parseCanvasTagFromElement(elem: CheerioElement): Tag {
        return App.createTag({
            id: 'CANVAS$$' + elem.attr('data-genre') ?? '',
            label: elem.find('a').text().trim()
        })
    }

    parseTagResults($: CheerioAPI): PagedResults {
        return App.createPagedResults({
            results: $('#content > div.card_wrap ul.card_lst li a')
                .toArray()
                .map(elem => this.parseMangaFromElement($(elem)))
        })
    }

}
