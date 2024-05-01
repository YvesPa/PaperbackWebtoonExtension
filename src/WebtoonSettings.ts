import {
    DUISection,
    SourceStateManager
} from '@paperback/types'


export const getCanvasWanted = async (stateManager: SourceStateManager): Promise<boolean> => {
    return (await stateManager.retrieve('canvas_wanted') as boolean) ?? false
}
export const setCanvasWanted = async (stateManager: SourceStateManager, value: boolean) => {
    await stateManager.store('canvas_wanted', value)
}

export const configSettings = (stateManager: SourceStateManager): DUISection => {
    return App.createDUISection(
        {
            id: 'main',
            header: 'Source Settings',
            rows: async () => {
                return [
                    App.createDUISwitch({
                        id: 'canvas_wanted',
                        label: 'Enable Canvas (Community)',
                        value: App.createDUIBinding({
                            get: async () => await getCanvasWanted(stateManager),
                            set: async (value: boolean) => { await setCanvasWanted(stateManager, value) }
                        })
                    }) ,
                    App.createDUIButton({
                        id: 'reset',
                        label: 'Reset to Default',
                        onTap: async () => {
                            await setCanvasWanted(stateManager, false)
                        }
                    })
                ]
            },
            isHidden: false
        }
    )
}