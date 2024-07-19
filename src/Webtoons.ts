import {
    SourceManga,
    Chapter,
    ChapterDetails,
    PagedResults,
    SearchResultsProviding,
    ChapterProviding,
    DiscoverSectionType,
    SearchResultItem,
    SearchQuery,
    DiscoverSection,
    Tag
} from '@paperback/types'

import { WebtoonsMetadata } from './WebtoonsParser'
import { WebtoonsInfra } from './WebtoonsInfra'

export const BASE_URL_XX = 'https://www.webtoons.com'
export const MOBILE_URL_XX = 'https://m.webtoons.com'

const BASE_VERSION = '0.9.1'
export const getExportVersion = (EXTENSION_VERSION: string): string => {
    return BASE_VERSION.split('.').map((x, index) => Number(x) + Number(EXTENSION_VERSION.split('.')[index])).join('.')
}

export class Webtoons 
    extends WebtoonsInfra
    implements SearchResultsProviding, ChapterProviding  
{
    constructor(
        LOCALE: string,
        DATE_FORMAT: string,
        LANGUAGE: string,
        BASE_URL: string,
        MOBILE_URL: string,
        private HAVE_TRENDING: boolean)
    {
        super(DATE_FORMAT, LOCALE, LANGUAGE, BASE_URL, MOBILE_URL)
    }

    getMangaDetails(mangaId: string): Promise<SourceManga> {
        return this.ExecRequest(
            { url: `${this.BASE_URL}/${mangaId}` }, 
            $ => this.parseDetails($, mangaId))
    }

    getChapters(sourceManga: SourceManga): Promise<Chapter[]> {
        return this.ExecRequest(
            {
                url: `${this.MOBILE_URL}/${sourceManga.mangaId}`,
                headers: { 'referer': this.MOBILE_URL }
            },
            $ => this.parseChaptersList($, sourceManga))
    }

    getChapterDetails(chapter: Chapter): Promise<ChapterDetails> {
        return this.ExecRequest(
            { url: `${this.BASE_URL}/${chapter.chapterId}` },
            $ => this.parseChapterDetails($, chapter))
    }

    getPopularTitles(): Promise<PagedResults<SearchResultItem>> {
        return this.ExecPagedResultsRequest(
            { url: `${this.BASE_URL}/popular` },
            { page: 0, maxPages: 1 },
            this.parsePopularTitles)
    }

    getTodayTitles(section: DiscoverSection, metadata: WebtoonsMetadata | undefined) : Promise<PagedResults<SearchResultItem>> {
        return this.ExecPagedResultsRequest(
            { url: `${this.BASE_URL}/originals` },
            { page: metadata?.page ?? 0, maxPages: 2 },
            $ => this.parseTodayTitles($, metadata?.page ? true : false))
    }

    getOngoingTitles(section: DiscoverSection, metadata: WebtoonsMetadata | undefined) : Promise<PagedResults<SearchResultItem>> {
        return this.ExecPagedResultsRequest(
            { url: `${this.BASE_URL}/originals` },
            { page: metadata?.page ?? 0, maxPages: 2 },
            $ => this.parseOngoingTitles($, metadata?.page ? true : false))
    }

    getCompletedTitles(section: DiscoverSection, metadata: WebtoonsMetadata | undefined) : Promise<PagedResults<SearchResultItem>> {
        return this.ExecPagedResultsRequest(
            { url: `${this.BASE_URL}/originals` },
            { page: metadata?.page ?? 0, maxPages: 2 },
            $ => this.parseCompletedTitles($, metadata?.page ? true : false))
    }

    getCanvasRecommendedTitles(): Promise<PagedResults<SearchResultItem>> {
        return this.ExecRequest(
            { url: `${this.BASE_URL}/canvas` }, 
            this.parseCanvasRecommendedTitles)
    }

    getCanvasPopularTitles(section: DiscoverSection, metadata: WebtoonsMetadata | undefined): Promise<PagedResults<SearchResultItem>> { return this._getCanvasPopularTitles(metadata) }
    _getCanvasPopularTitles(metadata: WebtoonsMetadata | undefined, genre?: string): Promise<PagedResults<SearchResultItem>> {
        return this.ExecPagedResultsRequest(
            { 
                url: `${this.BASE_URL}/canvas/list`,
                params: { genreTab: genre ?? 'ALL', sortOrder: 'READ_COUNT'}
            }, 
            { page: metadata?.page ?? 0 },
            this.parseCanvasPopularTitles)
    }

    getTitlesByGenre(genre: string): Promise<PagedResults<SearchResultItem>> {
        return this.ExecRequest(
            {
                url: `${this.BASE_URL}/genres/${genre}`,
                params: { sortOrder: 'READ_COUNT'}
            },
            this.parseTagResults)
    }

    getTitlesByKeyword(keyword: string, metadata: WebtoonsMetadata | undefined): Promise<PagedResults<SearchResultItem>> {
        return this.ExecPagedResultsRequest(
            {
                url: `${this.BASE_URL}/search`,
                params: { keyword: keyword, ...(this.canvasWanted ? {} : {searchType: 'WEBTOON' })}
            },
            { page: metadata?.page ?? 0 },
            this.parseSearchResults)
    }

    getSearchResults(query: SearchQuery, metadata: WebtoonsMetadata | undefined): Promise<PagedResults<SearchResultItem>> {
        const genre = (query.filters[0]?.value as string) ?? 'ALL'
        return genre !== 'ALL'
            ? genre.startsWith('CANVAS$$')
                ? this._getCanvasPopularTitles(metadata, genre.split('$$')[1])
                : this.getTitlesByGenre(genre)
            : query.title
                ? this.getTitlesByKeyword(query.title, metadata)
                : Promise.resolve({ items: [] })
    }

    registerDiscoverSections(): void {
        if(this.HAVE_TRENDING)
            Application.registerDiscoverSection(
                {
                    id: 'popular',
                    title: 'New & Trending',
                    type: DiscoverSectionType.simpleCarousel
                },
                Application.Selector(this as Webtoons, 'getPopularTitles')
            )


        Application.registerDiscoverSection(
            {
                id: 'today',
                title: 'Today release',
                type: DiscoverSectionType.simpleCarousel
            },
            Application.Selector(this as Webtoons, 'getTodayTitles')
        )

        Application.registerDiscoverSection(
            {
                id: 'ongoing',
                title: 'Ongoing',
                type: DiscoverSectionType.simpleCarousel
            },
            Application.Selector(this as Webtoons, 'getOngoingTitles')
        )

        Application.registerDiscoverSection(
            {
                id: 'completed',
                title: 'Completed',
                type: DiscoverSectionType.simpleCarousel
            },
            Application.Selector(this as Webtoons, 'getCompletedTitles')
        )

        if (this.canvasWanted)
        {
            Application.registerDiscoverSection(
                {
                    id : 'canvas_recommended',
                    title: 'Canvas Recommended',
                    type: DiscoverSectionType.simpleCarousel
                },
                Application.Selector(this as Webtoons, 'getCanvasRecommendedTitles')
            )

            Application.registerDiscoverSection(
                {
                    id : 'canvas_popular',
                    title: 'Canvas Popular',
                    type: DiscoverSectionType.simpleCarousel
                },
                Application.Selector(this as Webtoons, 'getCanvasPopularTitles')
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
            ...await this.ExecRequest({ url: `${this.BASE_URL}/genres` }, $ => this.parseGenres($)),
            ...(this.canvasWanted ? await this.ExecRequest({ url: `${this.BASE_URL}/canvas` }, $ => this.parseCanvasGenres($)) : [])]
    }
}
