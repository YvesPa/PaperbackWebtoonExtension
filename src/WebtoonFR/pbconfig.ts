import { 
    SourceIntents, 
    ContentRating 
} from '@paperback/types'

export default {
    icon: 'icon.png',
    name: 'WebtoonFR',
    version: '0.1.0',
    description: 'Extension that pulls manga from WebtoonsFR',
    contentRating: ContentRating.MATURE,
    developers: [
        {
            name: 'Yves Pa',
            github: 'https://github.com/YvesPa/webtoons-extensions'
        }
    ],
    badges: [{ label: 'French', backgroundColor: '#FF0000', textColor: '#FFFFFF' }],
    capabilities: [
        SourceIntents.MANGA_CHAPTERS,
        SourceIntents.HOMEPAGE_SECTIONS,
        SourceIntents.SETTINGS_UI
    ]
}