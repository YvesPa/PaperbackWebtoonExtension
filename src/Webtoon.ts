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
    Extension,
    DiscoverSectionType,
    SearchResultItem,
    SearchQuery,
    SettingsFormProviding,
    Form,
    DiscoverSection,
    Tag,
    BasicRateLimiter
} from '@paperback/types'

import { WebtoonParser } from './WebtoonParser'

import * as cheerio from 'cheerio'
import { CheerioAPI } from 'cheerio/lib/load'
import {
    WebtoonSettingForm,
    WebtoonSettings
} from './WebtoonSettings'

export const BASE_URL_XX = 'https://www.webtoons.com'
export const MOBILE_URL_XX = 'https://m.webtoons.com'

const BASE_VERSION = '0.9.1'
export const getExportVersion = (EXTENSION_VERSION: string): string => {
    return BASE_VERSION.split('.').map((x, index) => Number(x) + Number(EXTENSION_VERSION.split('.')[index])).join('.')
}

type WebtoonMetadata = { page: number, maxPages?: number | undefined }

export class Webtoon 
    extends WebtoonSettings
    implements Extension, SearchResultsProviding, ChapterProviding, SettingsFormProviding  
{
    cheerio = cheerio
    globalRateLimiter = new BasicRateLimiter('rateLimiter', 10, 1)
    private parser : WebtoonParser;
    private cookies: Record<string, string> = {}

    constructor(
        LOCALE: string,
        DATE_FORMAT: string,
        LANGUAGE: string,
        private BASE_URL: string,
        private MOBILE_URL: string,
        private HAVE_TRENDING: boolean)
    {
        super()
        this.parser = new WebtoonParser(DATE_FORMAT, LOCALE, LANGUAGE, BASE_URL, MOBILE_URL)
        this.cookies = 
        {
            'ageGatePass': 'true',
            'locale': LOCALE
        }
    }

    async initialise(): Promise<void> {
        this.registerInterceptors()
        this.registerDiscoverSections()
        await this.registerSearchFilters()
    }

    async ExecRequest<T>(
        infos: { url: string, headers?: Record<string, string>, params?: Record<string, unknown>},
        parseMethods: (_: CheerioAPI) => T) : Promise<T>
    {
        if (infos.params) 
            infos.url +=  `?${Object.entries(infos.params).map(([key, value]) => `${key}=${value}`).join('&')}`
        
        const request = ({ ...infos, method: 'GET'})
        const data = (await Application.scheduleRequest(request))[1]
        const $ = this.cheerio.load(Application.arrayBufferToUTF8String(data))
        return parseMethods.call(this.parser, $)
    }

    async ExecPagedResultsRequest<T>(
        infos: { url: string, headers?: Record<string, string>, params?: Record<string, unknown>},
        metadata: WebtoonMetadata,
        parseMethods: (_: CheerioAPI) => PagedResults<T>
    ) : Promise<PagedResults<T>>
    {
        infos.params ??= {}
        const page = infos.params.page = metadata.page + 1

        if (metadata?.maxPages && page > metadata.maxPages) 
            return { items: [], metadata }
        
        return {
            items: (await this.ExecRequest(infos, parseMethods)).items,
            metadata : { ...metadata, page: page }
        }
    }

    getMangaDetails(mangaId: string): Promise<SourceManga> {
        return this.ExecRequest(
            { url: `${this.BASE_URL}/${mangaId}` }, 
            $ => this.parser.parseDetails($, mangaId))
    }

    getChapters(sourceManga: SourceManga): Promise<Chapter[]> {
        return this.ExecRequest(
            {
                url: `${this.MOBILE_URL}/${sourceManga.mangaId}`,
                headers: { 'referer': this.MOBILE_URL }
            },
            $ => this.parser.parseChaptersList($, sourceManga))
    }

    getChapterDetails(chapter: Chapter): Promise<ChapterDetails> {
        return this.ExecRequest(
            { url: `${this.BASE_URL}/${chapter.chapterId}` },
            $ => this.parser.parseChapterDetails($, chapter))
    }

    getPopularTitles(): Promise<PagedResults<SearchResultItem>> {
        return this.ExecPagedResultsRequest(
            { url: `${this.BASE_URL}/popular` },
            { page: 0, maxPages: 1 },
            this.parser.parsePopularTitles)
    }

    getTodayTitles(section: DiscoverSection, metadata: WebtoonMetadata | undefined) : Promise<PagedResults<SearchResultItem>> {
        return this.ExecPagedResultsRequest(
            { url: `${this.BASE_URL}/originals` },
            { page: metadata?.page ?? 0, maxPages: 2 },
            $ => this.parser.parseTodayTitles($, metadata?.page ? true : false))
    }

    getOngoingTitles(section: DiscoverSection, metadata: WebtoonMetadata | undefined) : Promise<PagedResults<SearchResultItem>> {
        return this.ExecPagedResultsRequest(
            { url: `${this.BASE_URL}/originals` },
            { page: metadata?.page ?? 0, maxPages: 2 },
            $ => this.parser.parseOngoingTitles($, metadata?.page ? true : false))
    }

    getCompletedTitles(section: DiscoverSection, metadata: WebtoonMetadata | undefined) : Promise<PagedResults<SearchResultItem>> {
        return this.ExecPagedResultsRequest(
            { url: `${this.BASE_URL}/originals` },
            { page: metadata?.page ?? 0, maxPages: 2 },
            $ => this.parser.parseCompletedTitles($, metadata?.page ? true : false))
    }

    getCanvasRecommendedTitles(): Promise<PagedResults<SearchResultItem>> {
        return this.ExecRequest(
            { url: `${this.BASE_URL}/canvas` }, 
            this.parser.parseCanvasRecommendedTitles)
    }

    getCanvasPopularTitles(section: DiscoverSection, metadata: WebtoonMetadata | undefined): Promise<PagedResults<SearchResultItem>> { return this._getCanvasPopularTitles(metadata) }
    _getCanvasPopularTitles(metadata: WebtoonMetadata | undefined, genre?: string): Promise<PagedResults<SearchResultItem>> {
        return this.ExecPagedResultsRequest(
            { 
                url: `${this.BASE_URL}/canvas/list`,
                params: { genreTab: genre ?? 'ALL', sortOrder: 'READ_COUNT'}
            }, 
            { page: metadata?.page ?? 0 },
            this.parser.parseCanvasPopularTitles)
    }

    getTitlesByGenre(genre: string): Promise<PagedResults<SearchResultItem>> {
        return this.ExecRequest(
            {
                url: `${this.BASE_URL}/genres/${genre}`,
                params: { sortOrder: 'READ_COUNT'}
            },
            this.parser.parseTagResults)
    }

    getTitlesByKeyword(keyword: string, metadata: WebtoonMetadata | undefined): Promise<PagedResults<SearchResultItem>> {
        return this.ExecPagedResultsRequest(
            {
                url: `${this.BASE_URL}/search`,
                params: { keyword: keyword, ...(this.canvasWanted ? {} : {searchType: 'WEBTOON' })}
            },
            { page: metadata?.page ?? 0 },
            $ => this.parser.parseSearchResults($, this.canvasWanted))
    }

    getSearchResults(query: SearchQuery, metadata: WebtoonMetadata | undefined): Promise<PagedResults<SearchResultItem>> {
        const genre = (query.filters[0]?.value as string) ?? 'ALL'
        return genre !== 'ALL'
            ? genre.startsWith('CANVAS$$')
                ? this._getCanvasPopularTitles(metadata, genre.split('$$')[1])
                : this.getTitlesByGenre(genre)
            : query.title
                ? this.getTitlesByKeyword(query.title, metadata)
                : Promise.resolve({ items: [] })
    }

    registerInterceptors() {
        this.globalRateLimiter.registerInterceptor()
        Application.registerInterceptor(
            'webtoon',
            Application.Selector(this as Webtoon, 'interceptRequest'),
            Application.Selector(this as Webtoon, 'interceptResponse')
        )
    }

    async interceptRequest(request: Request): Promise<Request> {
        request.headers = {
            ...(request.headers ?? {}),
            ...{
                referer: request.headers?.referer ?? `${this.BASE_URL}/`,
                'user-agent': await Application.getDefaultUserAgent()
            }
        }
        request.cookies = { ...request.cookies, ...this.cookies }
        return request
    }

    async interceptResponse(request: Request, response: Response, data: ArrayBuffer): Promise<ArrayBuffer> {
        return data
    }

    async registerDiscoverSections(): Promise<void> {
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

        if (this.canvasWanted)
        {
            Application.registerDiscoverSection(
                {
                    id : 'canvas_recommended',
                    title: 'Canvas Recommended',
                    type: DiscoverSectionType.simpleCarousel
                },
                Application.Selector(this as Webtoon, 'getCanvasRecommendedTitles')
            )

            Application.registerDiscoverSection(
                {
                    id : 'canvas_popular',
                    title: 'Canvas Popular',
                    type: DiscoverSectionType.simpleCarousel
                },
                Application.Selector(this as Webtoon, 'getCanvasPopularTitles')
            )
        }
    }

    async registerSearchFilters(): Promise<void> {
        const genres = await this.getSearchTags()
        Application.registerSearchFilter({
            id: '0',
            title: 'Genres',
            type: 'dropdown',
            options: genres.map(genre => ({ id: genre.id, value: genre.title })),
            value: 'ALL'
        })
    }

    async getSearchTags(): Promise<Tag[]> {
        return [ { id: 'ALL', title: 'All' }, 
            ...await this.ExecRequest({ url: `${this.BASE_URL}/genres` }, $ => this.parser.parseGenres($)),
            ...(this.canvasWanted ? await this.ExecRequest({ url: `${this.BASE_URL}/canvas` }, $ => this.parser.parseCanvasGenres($)) : [])]
    }
    
    async getSettingsForm(): Promise<Form> {
        return new WebtoonSettingForm(this)
    }
}
