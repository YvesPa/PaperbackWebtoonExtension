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
    PartialSourceManga,
    TagSection,
    Cookie,
    DUISection,
    SourceStateManager
} from '@paperback/types'

import { WebtoonParser } from './WebtoonParser'
import { CheerioAPI } from 'cheerio/lib/load'
import { 
    configSettings, 
    getCanvasWanted
} from './WebtoonSettings'

export const BASE_URL_XX = 'https://www.webtoons.com'
export const MOBILE_URL_XX = 'https://m.webtoons.com'

const BASE_VERSION = '1.3.0'
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
    intents: SourceIntents.MANGA_CHAPTERS | SourceIntents.HOMEPAGE_SECTIONS | SourceIntents.SETTINGS_UI
}

export abstract class Webtoon implements SearchResultsProviding, MangaProviding, ChapterProviding, HomePageSectionsProviding {
    private parser : WebtoonParser;  
    private cookies: Cookie[] = []
    private stateManager: SourceStateManager;

    constructor(
        private cheerio: CheerioAPI,
        private LOCALE: string,
        DATE_FORMAT: string,
        LANGUAGE: string,
        private BASE_URL: string,
        private MOBILE_URL: string,
        private HAVE_TRENDING: boolean) 
    { 
        this.stateManager = App.createSourceStateManager()
        this.parser = new WebtoonParser(DATE_FORMAT, LANGUAGE, BASE_URL, MOBILE_URL) 
        this.cookies = 
        [
            App.createCookie({ name: 'ageGatePass', value: 'true', domain: BASE_URL_XX }),
            App.createCookie({ name: 'locale', value: this.LOCALE, domain: BASE_URL_XX })
        ]
    }

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
                request.cookies = this.cookies

                return request
            },
            interceptResponse: async (response: Response): Promise<Response> => {
                return response
            }

        }
    });
    
    async getSourceMenu(): Promise<DUISection> {
        return configSettings(this.stateManager)
    }

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
            { url: `${this.BASE_URL}/popular` }, 
            this.parser.parsePopularTitles)
    }

    getCarouselTitles(): Promise<PartialSourceManga[]> {
        return this.ExecRequest(
            { url: `${this.BASE_URL}/` }, 
            this.parser.parseCarouselTitles)
    }

    getTodayTitles(allTitles: boolean): Promise<PartialSourceManga[]> {
        return this.ExecRequest(
            { url: `${this.BASE_URL}/dailySchedule` }, 
            $ => this.parser.parseTodayTitles($, allTitles))
    }

    getOngoingTitles(allTitles: boolean): Promise<PartialSourceManga[]> {
        return this.ExecRequest(
            { url: `${this.BASE_URL}/dailySchedule` }, 
            $ => this.parser.parseOngoingTitles($, allTitles))
    }

    getCompletedTitles(allTitles: boolean): Promise<PartialSourceManga[]> {
        return this.ExecRequest(
            { url: `${this.BASE_URL}/dailySchedule` }, 
            $ => this.parser.parseCompletedTitles($, allTitles))
    }

    getCanvasRecommendedTitles(): Promise<PartialSourceManga[]> {
        return this.ExecRequest(
            { url: `${this.BASE_URL}/canvas` }, 
            this.parser.parseCanvasRecommendedTitles)
    }

    getCanvasPopularTitles(metadata?: {page : number} | undefined, genre?: string): Promise<PartialSourceManga[]> {
        return this.ExecRequest(
            { 
                url: `${this.BASE_URL}/canvas/list`,
                param: this.paramsToString({ genreTab: genre ?? 'ALL', sortOrder: 'READ_COUNT', page: metadata?.page ?? 1})
            }, 
            this.parser.parseCanvasPopularTitles)
    }

    async getSearchResults(query: SearchRequest, metadata: {page : number} | undefined): Promise<PagedResults> {
        if (query?.includedTags?.length > 0 && query.includedTags[0]?.id)
        {
            if (query.includedTags[0].id.startsWith('CANVAS$$'))
            {
                const newMetadata = {page: (metadata?.page ?? 0) + 1}
                const result = await this.getCanvasPopularTitles(newMetadata, query.includedTags[0].id.replace('CANVAS$$', ''))
                return App.createPagedResults({
                    results: result,
                    metadata: newMetadata
                })
            }
            else
            {
                return await this.ExecRequest(
                    { 
                        url: `${this.BASE_URL}/genres/${query.includedTags[0].id}`,
                        param: this.paramsToString({ sortOrder: 'READ_COUNT#'})
                    },
                    $ => this.parser.parseTagResults($))

            }
        }
        else 
        {
            const params = { keyword: query.title} as Record<string, unknown>
            const canvas_wanted = await getCanvasWanted(this.stateManager)
            if (!canvas_wanted) 
                params['searchType'] = 'WEBTOON'
            
            return await this.ExecRequest(
                {
                    url: `${this.BASE_URL}/search`,
                    param: this.paramsToString(params)
                },
                $ => this.parser.parseSearchResults($, canvas_wanted))
        }
    }

    async getHomePageSections(sectionCallback: (section: HomeSection) => void): Promise<void> {
        const sections : {request: Promise<PartialSourceManga[]>, section: HomeSection}[] = []
        sections.push({
            request: this.getCarouselTitles(),
            section: App.createHomeSection({
                id: 'test',
                title: 'test',
                containsMoreItems: true,
                type: HomeSectionType.featured
            })
        
        })

        if(this.HAVE_TRENDING)
            sections.push(
                {
                    request: this.getPopularTitles(),
                    section: App.createHomeSection({
                        id: 'popular',
                        title: 'New & Trending',
                        containsMoreItems: false,
                        type: HomeSectionType.singleRowNormal
                    })
                })
                
        sections.push(...[
            {
                request: this.getTodayTitles(false),
                section: App.createHomeSection({
                    id: 'today',
                    title: 'Today release',
                    containsMoreItems: true,
                    type: HomeSectionType.singleRowNormal
                })
            },
            {
                request: this.getOngoingTitles(false),
                section: App.createHomeSection({
                    id: 'ongoing',
                    title: 'Ongoing',
                    containsMoreItems: true,
                    type: HomeSectionType.singleRowNormal
                })
            },
            {
                request: this.getCompletedTitles(false),
                section: App.createHomeSection({
                    id: 'completed',
                    title: 'Completed',
                    containsMoreItems: true,
                    type: HomeSectionType.singleRowNormal
                })
            }
        ])

        if (await getCanvasWanted(this.stateManager))
        {
            sections.push(
                ...[
                    {
                        request: this.getCanvasRecommendedTitles(),
                        section: App.createHomeSection({
                            id: 'canvas_recommended',
                            title: 'Canvas Recommended',
                            containsMoreItems: false,
                            type: HomeSectionType.singleRowNormal
                        })
                    },
                    {
                        request: this.getCanvasPopularTitles({page : 1}),
                        section: App.createHomeSection({
                            id: 'canvas_popular',
                            title: 'Canvas Popular',
                            containsMoreItems: true,
                            type: HomeSectionType.singleRowNormal
                        })

                    }
                ]
            )
        }


        const promises: Promise<void>[] = []
        for (const section of sections) {
            promises.push(section.request.then(items => {
                section.section.items = items
                sectionCallback(section.section)
            }))
        }
    }
    
    async getSearchTags(): Promise<TagSection[]> {
        const result =
        [ 
            App.createTagSection({
                id: '0', 
                label: 'genres', 
                tags: await this.ExecRequest({ url: `${this.BASE_URL}/genres` }, $ => this.parser.parseGenres($)) 
            })
        ]

        if (await getCanvasWanted(this.stateManager))
            result.push(
                App.createTagSection({
                    id: '1', 
                    label: 'Canvas genres', 
                    tags: await this.ExecRequest({ url: `${this.BASE_URL}/canvas` }, $ => this.parser.parseCanvasGenres($)) 
                })
            )

        return result
    }

    async getViewMoreItems(homepageSectionId: string, metadata: {page: number} | undefined ): Promise<PagedResults> {
        let items: PartialSourceManga[] = []
        const newMetadata = metadata ?? {page: 0} 

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

            case 'canvas_popular':
                newMetadata.page += 1
                items = await this.getCanvasPopularTitles(newMetadata)
                break

            default:
                throw new Error(`Invalid homeSectionId | ${homepageSectionId}`)
        }

        return App.createPagedResults({
            results: items,
            metadata: newMetadata
        })
    }

    paramsToString = (params: Record<string, unknown>): string => {
        return '?' + Object.keys(params).map(key => `${key}=${params[key]}`).join('&')
    } 
}
