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

    constructor(
        sourceName = 'WebtoonEN',
        locale = 'en',
        dateFormat = 'MMM D, YYYY',
        version = '0.0.0',
        languageInfo: string | undefined = undefined,
        language: string | undefined = undefined)
    {
        this.SourceName = sourceName
        this.Locale = locale
        this.DateFormat = dateFormat
        this.Version = version
        this.LanguageInfo = languageInfo ? `'${languageInfo}'` : undefined 
        this.Language = language ?? locale
        this.ImportLanguage = this.Language === 'en' ? '' : `\nimport 'moment/locale/${this.Language}'\n`
    }
}

const IndonesianWebtoon = new WebtoonConfiguration('WebtoonID', 'id', 'YYYY MMM D', '0.0.0', 'Indonesian')
IndonesianWebtoon.ImportLanguage = '\nimport \'../../src/customLocale/id\'\n'

export const WebtoonFactory : WebtoonConfiguration[] = 
[
    new WebtoonConfiguration(),
    new WebtoonConfiguration('WebtoonFR', 'fr', 'D MMM YYYY', '0.0.0', 'French'),
    IndonesianWebtoon,
    new WebtoonConfiguration('WebtoonES', 'es', 'DD-MMM-YYYY', '0.0.0', 'Spanish'),
    new WebtoonConfiguration('WebtoonDE', 'de', 'DD.MM.YYYY', '0.0.0', 'German'),
    new WebtoonConfiguration('WebtoonZH', 'zh-hant', 'l', '0.0.0', 'Chinese (Traditional)', 'zh-tw'),
    new WebtoonConfiguration('WebtoonTH', 'th', 'D MMM YYYY', '0.0.0', 'Thai')
]