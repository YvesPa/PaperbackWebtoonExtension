import {
    PagedResults,
    Request,
    Response,
    Extension,
    BasicRateLimiter
} from '@paperback/types'

import * as cheerio from 'cheerio'
import { CheerioAPI } from 'cheerio'
import { 
    WebtoonsMetadata,
    WebtoonsParser
} from './WebtoonsParser'

export abstract class WebtoonsInfra 
    extends WebtoonsParser
    implements Extension
{
    cheerio = cheerio
    globalRateLimiter = new BasicRateLimiter('rateLimiter', {numberOfRequests : 10, bufferInterval: 1, ignoreImages: false})
    cookies: Record<string, string>

    constructor(
        dateFormat: string,
        locale: string,
        language: string,
        BASE_URL: string,
        MOBILE_URL: string) {
        super(dateFormat, locale, language, BASE_URL, MOBILE_URL)
        this.cookies = 
        {
            'ageGatePass': 'true',
            'locale': locale
        }
    }
    
    async initialise(): Promise<void> {
        this.registerInterceptors()
        await this.registerSearchFilters()
    }

    abstract registerSearchFilters() : Promise<void>


    registerInterceptors() {
        this.globalRateLimiter.registerInterceptor()
        Application.registerInterceptor(
            'requestInterceptor',
            Application.Selector(this as WebtoonsInfra, 'interceptRequest'),
            Application.Selector(this as WebtoonsInfra, 'interceptResponse')
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

    async interceptResponse(_request: Request, _response: Response, data: ArrayBuffer): Promise<ArrayBuffer> {
        return data
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
        return parseMethods.call(this, $)
    }

    async ExecPagedResultsRequest<T>(
        infos: { url: string, headers?: Record<string, string>, params?: Record<string, unknown>},
        metadata: WebtoonsMetadata,
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

}