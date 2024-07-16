import { 
    SourceIntents, 
    ContentRating 
} from '@paperback/types'

const VERSION = '[[Version]]'
const SOURCE_NAME = '[[SourceName]]'
const LANGUAGE_INFO = '[[LanguageInfo]]'

export default {
    icon: 'icon.png',
    name: SOURCE_NAME,
    version: VERSION,
    description: `Extension that pulls manga from ${SOURCE_NAME}`,
    contentRating: ContentRating.MATURE,
    developers: [
        {
            name: 'Yves Pa',
            github: 'https://github.com/YvesPa/webtoons-extensions'
        }
    ],
    badges: [{ label: LANGUAGE_INFO, backgroundColor: '#FF0000', textColor: '#FFFFFF' }],
    capabilities: [
        SourceIntents.MANGA_CHAPTERS,
        SourceIntents.HOMEPAGE_SECTIONS,
        SourceIntents.SETTINGS_UI,
        SourceIntents.MANGA_SEARCH
    ]
}