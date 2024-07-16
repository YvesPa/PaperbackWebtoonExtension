import {
    DUISection,
    Form,
    Section,
    ToggleRow
} from '@paperback/types'

const CANVAS_WANTED = 'canvas_wanted'

export function toBoolean(value: any | undefined): boolean {
    return (value ?? false) === 'true'
}
export class WebtoonSettings {
    get canvasWanted(): boolean {
        return toBoolean(Application.getState(CANVAS_WANTED))
    }

    set canvasWanted(value: boolean) {
        Application.setState(value.toString(), CANVAS_WANTED)
    }
}

export class WebtoonSettingForm  extends Form {
    private settings: WebtoonSettings

    constructor(settings: WebtoonSettings) {
        super()
        this.settings = settings
    }

    override getSections(): Application.FormSectionElement[] {
        return [
            Section('hideStuff', [
                ToggleRow('toggle', {
                    title: 'Toggles can hide rows',
                    value: this.settings.canvasWanted,
                    onValueChange: Application.Selector(this as WebtoonSettingForm, 'setCanvasWanted')
                })
            ])
        ]
    }

    async setCanvasWanted(value: boolean): Promise<void> {
        this.settings.canvasWanted = value
    }
}