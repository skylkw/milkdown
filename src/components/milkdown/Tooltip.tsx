import {tooltipFactory, TooltipProvider} from '@milkdown/plugin-tooltip'
import {EditorView} from '@milkdown/prose/view'
import {EditorState} from '@milkdown/prose/state'

export const tooltip = tooltipFactory('tooltip')

export function TooltipView() {
    const content = document.createElement('div')
    content.innerHTML = 'This is a tooltip'

    const provider = new TooltipProvider({
        content: content,
    })

    return {
        update: (updatedView: EditorView, prevState: EditorState | undefined) => {
            provider.update(updatedView, prevState)
        },
        destroy: () => {
            provider.destroy()
            content.remove()
        },
    }
}
