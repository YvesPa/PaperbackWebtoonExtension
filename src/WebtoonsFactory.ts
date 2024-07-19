// > npx ts-node ./src/generateClass.ts
// to lunch the factory

import { getExportVersion } from './Webtoons'

export class WebtoonsConfiguration
{
    public SourceName: string
    public Locale: string
    public DateFormat: string
    public Language: string
    public Version: string
    public LanguageInfo: string | undefined
    public ImportLanguage: string
    public HaveTrending: boolean
    public SpecialCode: string

    constructor(input?: Partial<WebtoonsConfiguration>){
        this.SourceName = input?.SourceName ?? 'WebtoonEN'
        this.Locale = input?.Locale ?? 'en'
        this.DateFormat = input?.DateFormat ?? 'MMM D, YYYY'
        this.Version = getExportVersion(input?.Version ?? '0.0.0')
        this.LanguageInfo = input?.LanguageInfo ?? 'English'
        this.Language = input?.Language ?? this.Locale
        this.ImportLanguage = (this.Language === 'en' ? '' : `\nimport 'moment/locale/${this.Language}'\n`)
        this.HaveTrending = input?.HaveTrending !== undefined ? input.HaveTrending : true
        this.SpecialCode = input?.SpecialCode ?? ''
    }
}

export const WebtoonsFactory : WebtoonsConfiguration[] = 
[
    new WebtoonsConfiguration(),
    new WebtoonsConfiguration({SourceName: 'WebtoonFR', Locale: 'fr', DateFormat :'D MMM YYYY', LanguageInfo: 'French'}),
    new WebtoonsConfiguration({SourceName: 'WebtoonES', Locale: 'es', DateFormat :'DD-MMM-YYYY', LanguageInfo: 'Spanish', HaveTrending: false}),
    new WebtoonsConfiguration({SourceName: 'WebtoonDE', Locale: 'de', DateFormat :'DD.MM.YYYY', LanguageInfo: 'German', HaveTrending: false}),
    new WebtoonsConfiguration({SourceName: 'WebtoonZH', Locale: 'zh-hant', DateFormat :'l', LanguageInfo: 'Chinese (Traditional)', Language: 'zh-tw'}),
    new WebtoonsConfiguration({SourceName: 'WebtoonTH', Locale: 'th', DateFormat: 'D MMM YYYY', LanguageInfo: 'Thai'}),
    new WebtoonsConfiguration({SourceName: 'WebtoonID', Locale: 'id', DateFormat :'YYYY MMM D', LanguageInfo: 'Indonesian', 
        SpecialCode: '\nimport moment from \'moment\'\n' + 'moment.updateLocale(\'id\', {monthsShort: \'Jan_Feb_Mar_Apr_Mei_Jun_Jul_Agu_Sep_Okt_Nov_Des\'.split(\'_\')})\n' })
]