// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import {
    BASE_URL_XX,
    MOBILE_URL_XX,
    Webtoon
} from '../Webtoon'
[[ImportLanguage]][[SpecialCode]]
const LOCALE = '[[Locale]]'
const DATE_FORMAT = '[[DateFormat]]'
const LANGUAGE = '[[Language]]'
const BASE_URL = `${BASE_URL_XX}/${LOCALE}`
const MOBILE_URL = `${MOBILE_URL_XX}/${LOCALE}`
const HAVE_TRENDING = [[HaveTrending]]

export const [[SourceName]] = new Webtoon(LOCALE, DATE_FORMAT, LANGUAGE, BASE_URL, MOBILE_URL, HAVE_TRENDING)