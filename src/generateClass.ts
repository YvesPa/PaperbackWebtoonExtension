import { 
    WebtoonFactory,
    WebtoonConfiguration 
} from './WebtoonFactory'

import fs from 'fs'
import path from 'path'

const SOURCE_DIRECTORY = 'src'
const EMPTY_SOURCE_FILE = 'emptySource.ts.txt'
const INCLUDES_DIRECTORY = 'includes'
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
        

        // Read the content of emptySource.ts.txt
        let emptySourceContent = fs.readFileSync(path.join(SOURCE_DIRECTORY, EMPTY_SOURCE_FILE), 'utf-8')

        // Replace [[${prop}]] with the property value from configuration
        for (const [prop, propValue] of Object.entries(configuration)) {
            emptySourceContent = emptySourceContent.replace(new RegExp(`\\[\\[${prop}\\]\\]`, 'g'), propValue)
        }

        // Write the modified content to the file
        fs.writeFileSync(path.join(SOURCE_DIRECTORY, sourceName, `${sourceName}.ts`), emptySourceContent)

        // Create import directory and copy icon.png
        fs.mkdirSync(path.join(SOURCE_DIRECTORY, sourceName, INCLUDES_DIRECTORY))
        fs.copyFileSync(path.join(SOURCE_DIRECTORY, ICON_FILE), path.join(SOURCE_DIRECTORY, sourceName, INCLUDES_DIRECTORY, ICON_FILE))
    }
}