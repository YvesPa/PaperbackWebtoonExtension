// > npx ts-node ./src/generateClass.ts
// to lunch the factory

export class WebtoonConfiguration
{
    public SourceName: string
    public Locale: string
    public DateFormat: string
    public Language: string
    public Version: string
    public LanguageInfo: string | undefined
    public ImportLanguage: string
    public HaveTrending: boolean
    public SourceTags: string

    constructor(input?: Partial<WebtoonConfiguration>){
        this.SourceName = input?.SourceName ?? 'WebtoonEN'
        this.Locale = input?.Locale ?? 'en'
        this.DateFormat = input?.DateFormat ?? 'MMM D, YYYY'
        this.Version = input?.Version ?? '0.0.0'
        this.LanguageInfo = input?.LanguageInfo ? `'${input.LanguageInfo}'` : undefined
        this.Language = input?.Language ?? this.Locale
        this.ImportLanguage = input?.ImportLanguage ?? (this.Language === 'en' ? '' : `\nimport 'moment/locale/${this.Language}'\n`)
        this.HaveTrending = input?.HaveTrending !== undefined ? input.HaveTrending : true
        this.SourceTags = this.Language === 'en' ? '[]' : `[{text: ${this.LanguageInfo}, type: BadgeColor.GREY}]`
    }
}

export const WebtoonFactory : WebtoonConfiguration[] = 
[
    new WebtoonConfiguration(),
    new WebtoonConfiguration({SourceName: 'WebtoonFR', Locale: 'fr', DateFormat :'D MMM YYYY', LanguageInfo: 'French'}),
    new WebtoonConfiguration({SourceName: 'WebtoonID', Locale: 'id', DateFormat :'YYYY MMM D', LanguageInfo: 'Indonesian', ImportLanguage: '\nimport \'../../src/customLocale/id\'\n'}),
    new WebtoonConfiguration({SourceName: 'WebtoonES', Locale: 'es', DateFormat :'DD-MMM-YYYY', LanguageInfo: 'Spanish', HaveTrending: false}),
    new WebtoonConfiguration({SourceName: 'WebtoonDE', Locale: 'de', DateFormat :'DD.MM.YYYY', LanguageInfo: 'German', HaveTrending: false}),
    new WebtoonConfiguration({SourceName: 'WebtoonZH', Locale: 'zh-hant', DateFormat :'l', LanguageInfo: 'Chinese (Traditional)', Language: 'zh-tw'}),
    new WebtoonConfiguration({SourceName: 'WebtoonTH', Locale: 'th', DateFormat: 'D MMM YYYY', LanguageInfo: 'Thai'})
]