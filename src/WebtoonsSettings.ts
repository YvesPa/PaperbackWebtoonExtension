import {
    Form,
    Section,
    SettingsFormProviding,
    ToggleRow
} from '@paperback/types'

const CANVAS_WANTED = 'canvas_wanted'

function toBoolean(value: any | undefined): boolean {
    return (value ?? false) === 'true'
}

export abstract class WebtoonsSettings implements SettingsFormProviding
{
    get canvasWanted(): boolean {
        return toBoolean(Application.getState(CANVAS_WANTED))
    }

    set canvasWanted(value: boolean) {
        Application.setState(value.toString(), CANVAS_WANTED)
    }

    async getSettingsForm(): Promise<Form> {
        return new WebtoonSettingForm(this)
    }
}

class WebtoonSettingForm extends Form {
    private settings: WebtoonsSettings

    constructor(settings: WebtoonsSettings) {
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