import {
    SourceManga,
    Chapter,
    ChapterDetails,
    HomeSection,
    SearchRequest,
    PagedResults,
    SourceInfo,
    ContentRating,
    Request,
    Response,
    SourceIntents,
    SearchResultsProviding,
    ChapterProviding,
    MangaProviding,
    HomePageSectionsProviding,
    HomeSectionType,
    PartialSourceManga
} from '@paperback/types'

import { WebtoonParser } from './WebtoonParser'
import { CheerioAPI } from 'cheerio/lib/load'

export const BASE_URL_XX = 'https://www.webtoons.com'
export const MOBILE_URL_XX = 'https://m.webtoons.com'

const BASE_VERSION = '1.0.0'
export const getExportVersion = (EXTENSION_VERSION: string): string => {
    return BASE_VERSION.split('.').map((x, index) => Number(x) + Number(EXTENSION_VERSION.split('.')[index])).join('.')
}

export const WebtoonBaseInfo: SourceInfo = {
    version: getExportVersion('0.0.0'),
    name: 'Webtoon',
    description: `Extension that pulls manga from ${BASE_URL_XX}`,
    author: 'YvesPa',
    authorWebsite: 'http://github.com/YvesPa',
    icon: 'icon.png',
    contentRating: ContentRating.EVERYONE,
    websiteBaseURL: BASE_URL_XX,
    sourceTags: [],
    intents: SourceIntents.MANGA_CHAPTERS | SourceIntents.HOMEPAGE_SECTIONS | SourceIntents.CLOUDFLARE_BYPASS_REQUIRED | SourceIntents.SETTINGS_UI
}

export abstract class Webtoon implements SearchResultsProviding, MangaProviding, ChapterProviding, HomePageSectionsProviding {

    private parser : WebtoonParser;  

    constructor(
        private cheerio: CheerioAPI,
        private LOCALE: string,
        DATE_FORMAT: string,
        LANGUAGE: string,
        private BASE_URL: string,
        private MOBILE_URL: string) 
    { 
        this.parser = new WebtoonParser(DATE_FORMAT, LANGUAGE, BASE_URL, MOBILE_URL)  
    }

    // stateManager = App.createSourceStateManager()

    requestManager = App.createRequestManager({
        requestsPerSecond: 10,
        requestTimeout: 20000,
        interceptor: {
            interceptRequest: async (request: Request): Promise<Request> => {
                request.headers = {
                    ...(request.headers ?? {}),
                    'Referer': request.headers?.Referer ?? `${this.BASE_URL}/`,
                    'user-agent': await this.requestManager.getDefaultUserAgent()
                }

                request.cookies = [
                    App.createCookie({ name: 'ageGatePass', value: 'true', domain: BASE_URL_XX }),
                    App.createCookie({ name: 'locale', value: this.LOCALE, domain: BASE_URL_XX })
                ]

                return request
            },
            interceptResponse: async (response: Response): Promise<Response> => {
                return response
            }

        }
    });

    async ExecRequest<T>(
        infos: { url: string, headers?: Record<string, string>, param?: string}, 
        parseMethods: (_: CheerioAPI) => T) : Promise<T> 
    {
        const request = App.createRequest({ ...infos, method: 'GET'})
        const response = await this.requestManager.schedule(request, 1)
        const $ = this.cheerio.load(response.data as string)
        return parseMethods.call(this.parser, $)
    }

    getMangaShareUrl(mangaId: string): string { return `${this.BASE_URL}/${mangaId}` }

    getMangaDetails(mangaId: string): Promise<SourceManga> {
        return this.ExecRequest({ url: `${this.BASE_URL}/${mangaId}` }, $ => this.parser.parseDetails($, mangaId))
    }

    getChapters(mangaId: string): Promise<Chapter[]> {
        return this.ExecRequest(
            { 
                url: `${this.MOBILE_URL}/${mangaId}`, 
                headers: { 'Referer': this.MOBILE_URL} 
            }
            , this.parser.parseChaptersList)
    }

    getChapterDetails(mangaId: string, chapterId: string): Promise<ChapterDetails> {
        return this.ExecRequest(
            { url: `${this.BASE_URL}/${chapterId}` }, 
            $ => this.parser.parseChapterDetails($, mangaId, chapterId))
    }

    getPopularTitles(): Promise<PartialSourceManga[]> {
        return this.ExecRequest(
            { url: `${this.BASE_URL}/dailySchedule` }, 
            this.parser.parsePopularTitles)
    }

    getSearchResults(query: SearchRequest, metadata: unknown | undefined): Promise<PagedResults> {
        return this.ExecRequest(
            {
                url: `${this.BASE_URL}/search`,
                param: this.paramsToString({ keyword: query.title, searchType: 'WEBTOON' })
            },
            this.parser.parseSearchResults)
    }

    async getHomePageSections(sectionCallback: (section: HomeSection) => void): Promise<void> {
        const popularSection = App.createHomeSection({
            id: 'popular',
            title: 'Popular',
            containsMoreItems: true,
            type: HomeSectionType.singleRowNormal,
            items: await this.getPopularTitles()
        })
        sectionCallback(popularSection)
    }

    async getViewMoreItems(homepageSectionId: string, metadata: unknown): Promise<PagedResults> {
        let items: PartialSourceManga[] = []

        switch (homepageSectionId) {
            case 'popular':
                items = await this.getPopularTitles()
                break

            default:
                throw new Error(`Invalid homeSectionId | ${homepageSectionId}`)
        }

        return App.createPagedResults({
            results: items,
            metadata
        })
    }

    paramsToString = (params: Record<string, unknown>): string => {
        return '?' + Object.keys(params).map(key => `${key}=${params[key]}`).join('&')
    } 
}
