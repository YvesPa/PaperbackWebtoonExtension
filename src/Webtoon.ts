import {
    SourceManga,
    Chapter,
    ChapterDetails,
    PagedResults,
    Request,
    Response,
    SearchResultsProviding,
    ChapterProviding,
    MangaProviding,
    TagSection,
    Cookie,
    Extension,
    DiscoverSectionType,
    SearchResultItem,
    SearchQuery
} from '@paperback/types'

import { WebtoonParser } from './WebtoonParser'
import { CheerioAPI } from 'cheerio/lib/load'

export const BASE_URL_XX = 'https://www.webtoons.com'
export const MOBILE_URL_XX = 'https://m.webtoons.com'

const BASE_VERSION = '1.2.0'
export const getExportVersion = (EXTENSION_VERSION: string): string => {
    return BASE_VERSION.split('.').map((x, index) => Number(x) + Number(EXTENSION_VERSION.split('.')[index])).join('.')
}

export abstract class Webtoon implements Extension, SearchResultsProviding, MangaProviding, ChapterProviding {

    private parser : WebtoonParser;  
    private cookies: Cookie[] = []

    constructor(
        private cheerio: CheerioAPI,
        private LOCALE: string,
        DATE_FORMAT: string,
        LANGUAGE: string,
        private BASE_URL: string,
        private MOBILE_URL: string,
        private HAVE_TRENDING: boolean) 
    { 
        this.parser = new WebtoonParser(DATE_FORMAT, LOCALE, LANGUAGE, BASE_URL, MOBILE_URL) 
        this.cookies = 
        [
            Paperback.createCookie({ name: 'ageGatePass', value: 'true', domain: BASE_URL_XX }),
            Paperback.createCookie({ name: 'locale', value: this.LOCALE, domain: BASE_URL_XX })
        ]
    }

    async initialise(): Promise<void> {
        Application.registerInterceptor(
            'main',
            Application.Selector(this as Webtoon, 'interceptRequest'),
            Application.Selector(this as Webtoon, 'interceptResponse')
        )

        this.registerDiscoverSection()
    }

    async interceptRequest(request: Request): Promise<Request> {
        request.headers = {
            ...(request.headers ?? {}),
            ...{
                referer: request.headers?.referer ?? `${this.BASE_URL}/`,
                'user-agent': await Application.getDefaultUserAgent()
            }
        }
        request.cookies = this.cookies
        return request
    }

    async interceptResponse(
        request: Request,
        response: Response,
        data: ArrayBuffer
    ): Promise<ArrayBuffer> {
        return data
    }


    stateManager = Paperback.createSourceStateManager()

    async ExecRequest<T>(
        infos: { url: string, headers?: Record<string, string>, param?: string}, 
        parseMethods: (_: CheerioAPI) => T) : Promise<T> 
    {
        const request = ({ ...infos, method: 'GET'})
        const [_response, data] = await Application.scheduleRequest(request)
        const $ = this.cheerio.load(Application.arrayBufferToUTF8String(data))
        return parseMethods.call(this.parser, $)
    }

    getMangaDetails(mangaId: string): Promise<SourceManga> {
        return this.ExecRequest({ url: `${this.BASE_URL}/${mangaId}` }, $ => this.parser.parseDetails($, mangaId))
    }

    getChapters(sourceManga: SourceManga): Promise<Chapter[]> {
        return this.ExecRequest(
            { 
                url: `${this.MOBILE_URL}/${sourceManga.mangaId}`, 
                headers: { 'Referer': this.MOBILE_URL} 
            },
            $ => this.parser.parseChaptersList($, sourceManga))
    }

    getChapterDetails(chapter: Chapter): Promise<ChapterDetails> {
        return this.ExecRequest(
            { url: `${this.BASE_URL}/${chapter.chapterId}` }, 
            $ => this.parser.parseChapterDetails($, chapter))
    }

    getPopularTitles(): Promise<PagedResults<SearchResultItem>> {
        return this.ExecRequest(
            { url: `${this.BASE_URL}/popular` }, 
            this.parser.parsePopularTitles)
    }

    getCarouselTitles(): Promise<PagedResults<SearchResultItem>> {
        return this.ExecRequest(
            { url: `${this.BASE_URL}/` }, 
            this.parser.parseCarouselTitles)
    }

    getTodayTitles() : Promise<PagedResults<SearchResultItem>> { return this._getTodayTitles(false) }
    _getTodayTitles(allTitles: boolean ): Promise<PagedResults<SearchResultItem>> {
        return this.ExecRequest(
            { url: `${this.BASE_URL}/dailySchedule` }, 
            $ => this.parser.parseTodayTitles($, allTitles))
    }

    getOngoingTitles(metadata: unknown | undefined): Promise<PagedResults<SearchResultItem>> { return this._getOngoingTitles(false) }
    _getOngoingTitles(allTitles: boolean): Promise<PagedResults<SearchResultItem>> {
        return this.ExecRequest(
            { url: `${this.BASE_URL}/dailySchedule` }, 
            $ => this.parser.parseOngoingTitles($, allTitles))
    }

    getCompletedTitles(metadata: unknown | undefined): Promise<PagedResults<SearchResultItem>> { return this._getCompletedTitles(false) }
    _getCompletedTitles(allTitles: boolean): Promise<PagedResults<SearchResultItem>> {
        return this.ExecRequest(
            { url: `${this.BASE_URL}/dailySchedule` }, 
            $ => this.parser.parseCompletedTitles($, allTitles))
    }

    getSearchResults(query: SearchQuery, metadata: unknown | undefined): Promise<PagedResults<SearchResultItem>> {
        if (query?.includedTags?.length > 0 && query.includedTags[0]?.id)
            return this.ExecRequest(
                { 
                    url: `${this.BASE_URL}/genres/${query.includedTags[0].id}`,
                    param: this.paramsToString({ sortOrder: 'READ_COUNT#'})
                },
                $ => this.parser.parseTagResults($))
        else 
            return this.ExecRequest(
                {
                    url: `${this.BASE_URL}/search`,
                    param: this.paramsToString({ keyword: query.title, searchType: 'WEBTOON' })
                },
                this.parser.parseSearchResults)
    }

    async registerDiscoverSection(): Promise<void> {
        Application.registerDiscoverSection(
            {
                id: 'carousel',
                title: 'Discover',
                type: DiscoverSectionType.featured
            },
            Application.Selector(this as Webtoon, 'getCarouselTitles')
        )

        if(this.HAVE_TRENDING)
            Application.registerDiscoverSection(
                {  
                    id: 'popular',
                    title: 'New & Trending',
                    type: DiscoverSectionType.simpleCarousel 
                },
                Application.Selector(this as Webtoon, 'getPopularTitles')
            )
                
        Application.registerDiscoverSection(
            {
                id: 'today',
                title: 'Today release',
                type: DiscoverSectionType.simpleCarousel
            },
            Application.Selector(this as Webtoon, 'getTodayTitles')
        )

        Application.registerDiscoverSection(
            {
                id: 'ongoing',
                title: 'Ongoing',
                type: DiscoverSectionType.simpleCarousel
            },
            Application.Selector(this as Webtoon, 'getOngoingTitles')
        )

        Application.registerDiscoverSection(
            {
                id: 'completed',
                title: 'Completed',
                type: DiscoverSectionType.simpleCarousel
            },
            Application.Selector(this as Webtoon, 'getCompletedTitles')
        )
    }
    
    async getSearchTags(): Promise<TagSection[]> {
        const tags = await this.ExecRequest({ url: `${this.BASE_URL}/genres` }, $ => this.parser.parseGenres($))
        return [ 
            {
                id: '0', 
                title: 'genres', 
                tags: tags 
            }
        ]
    }

    /*
    async getViewMoreItems(homepageSectionId: string, metadata: unknown): Promise<PagedResults> {
        let items: PartialSourceManga[] = []

        switch (homepageSectionId) {            
            case 'today':
                items = await this.getTodayTitles(true)
                break

            case 'ongoing':
                items = await this.getOngoingTitles(true)
                break
            
            case 'completed':
                items = await this.getCompletedTitles(true)
                break

            default:
                throw new Error(`Invalid homeSectionId | ${homepageSectionId}`)
        }

        return App.createPagedResults({
            results: items,
            metadata
        })
    }
    */

    paramsToString = (params: Record<string, unknown>): string => {
        return '?' + Object.keys(params).map(key => `${key}=${params[key]}`).join('&')
    } 
}
