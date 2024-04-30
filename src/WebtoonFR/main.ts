import {
    BASE_URL_XX,
    MOBILE_URL_XX,
    Webtoon
} from '../Webtoon'

import { CheerioAPI } from 'cheerio/lib/load'

import 'moment/locale/fr'

const LOCALE = 'fr'
const DATE_FORMAT = 'D MMM YYYY'
const LANGUAGE = 'fr'
const BASE_URL = `${BASE_URL_XX}/${LOCALE}`
const MOBILE_URL = `${MOBILE_URL_XX}/${LOCALE}`
/*const VERSION = '0.0.0'
const LANGUAGE_INFO = 'French'
const SOURCE_NAME = 'WebtoonFR'*/
const HAVE_TRENDING = true
/*const SOURCE_TAGS: {text: string, type: BadgeColor}[] = [{text: 'French', type: BadgeColor.GREY}]*/

export class WebtoonFR extends Webtoon {
    constructor (cheerio: CheerioAPI){
        super(cheerio, LOCALE, DATE_FORMAT, LANGUAGE, BASE_URL, MOBILE_URL, HAVE_TRENDING)
    }
}