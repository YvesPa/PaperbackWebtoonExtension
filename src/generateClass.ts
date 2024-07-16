import { 
    WebtoonFactory,
    WebtoonConfiguration 
} from './WebtoonFactory'

import fs from 'fs'
import path from 'path'

const SOURCE_DIRECTORY = 'src'
const EMPTY_MAIN_FILE = 'emptyMain.ts'
const MAIN_FILE = 'main.ts'
const EMPTY_PBCONFIG_FILE = 'emptyPbconfig.ts'
const PBCONFIG_FILE = 'pbconfig.ts'
const INCLUDES_DIRECTORY = 'static'
const ICON_FILE = 'icon.png'

for (let i = 0; i < WebtoonFactory.length; i++) {

    if (WebtoonFactory[i] !== undefined) {
        const configuration = WebtoonFactory[i] as WebtoonConfiguration
        const sourceName = configuration.SourceName

        //Delete directory if exist 
        if (fs.existsSync(path.join(SOURCE_DIRECTORY, sourceName))) {
            fs.rmSync(path.join(SOURCE_DIRECTORY, sourceName), { recursive: true })
        }

        // Create directory
        fs.mkdirSync(path.join(SOURCE_DIRECTORY, sourceName))
        
        ///----- MAIN
        // Read the content of emptyMain.ts.txt
        let emptyMainContent = fs.readFileSync(path.join(SOURCE_DIRECTORY, EMPTY_MAIN_FILE), 'utf-8')
        emptyMainContent = emptyMainContent.replace('// eslint-disable-next-line @typescript-eslint/ban-ts-comment\n', '')
        emptyMainContent = emptyMainContent.replace('// @ts-nocheck\n\n', '')

        // Replace [[${prop}]] with the property value from configuration
        for (const [prop, propValue] of Object.entries(configuration)) {
            emptyMainContent = emptyMainContent.replace(new RegExp(`\\[\\[${prop}\\]\\]`, 'g'), propValue)
        }

        // Write the modified content to the file
        fs.writeFileSync(path.join(SOURCE_DIRECTORY, sourceName, MAIN_FILE), emptyMainContent)

        ///----- PBCONFIG
        // Read the content of emptyMain.ts.txt
        let emptyPbconfigContent = fs.readFileSync(path.join(SOURCE_DIRECTORY, EMPTY_PBCONFIG_FILE), 'utf-8')

        // Replace [[${prop}]] with the property value from configuration
        for (const [prop, propValue] of Object.entries(configuration)) {
            emptyPbconfigContent = emptyPbconfigContent.replace(new RegExp(`\\[\\[${prop}\\]\\]`, 'g'), propValue)
        }

        // Write the modified content to the file
        fs.writeFileSync(path.join(SOURCE_DIRECTORY, sourceName, PBCONFIG_FILE), emptyPbconfigContent)

        // Create import directory and copy icon.png
        fs.mkdirSync(path.join(SOURCE_DIRECTORY, sourceName, INCLUDES_DIRECTORY))
        fs.copyFileSync(path.join(SOURCE_DIRECTORY, ICON_FILE), path.join(SOURCE_DIRECTORY, sourceName, INCLUDES_DIRECTORY, ICON_FILE))
    }
}