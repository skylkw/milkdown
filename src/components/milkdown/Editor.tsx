import {Editor, rootCtx} from '@milkdown/core'
import {FC, useState} from 'react'

import {commonmark, headingIdGenerator} from '@milkdown/preset-commonmark'
import {listener} from '@milkdown/plugin-listener'
import {Milkdown, MilkdownProvider, useEditor} from '@milkdown/react'
import {nord} from '@milkdown/theme-nord'

// import { tooltip, TooltipView } from '@/components/milkdown/Tooltip';

import '@milkdown/theme-nord/style.css'
import {Toc} from './Toc'

import {cn, generateUniqueHeadingId} from '@/lib/utils'
import {Button} from '@/components/ui/button'
import {block} from '@milkdown/plugin-block'
import {BlockView} from './Block'
import {ProsemirrorAdapterProvider, usePluginViewFactory} from '@prosemirror-adapter/react'

const MilkdownEditor: FC = () => {
    const pluginViewFactory = usePluginViewFactory()

    // 是否显示目录
    const [showToc, setShowToc] = useState(true)
    const handleShowToc = () => {
        setShowToc(!showToc)
    }

    useEditor(root => {
        return Editor.make()
            .config(ctx => {
                ctx.set(rootCtx, root)
                ctx.set(headingIdGenerator.key, node => {
                    return generateUniqueHeadingId(node.textContent)
                })
                ctx.set(block.key, {
                    view: pluginViewFactory({
                        component: BlockView,
                    }),
                })

                // ctx.set(tooltip.key, {
                //   view: TooltipView,
                // })
            })
            .config(nord)
            .use(commonmark)
            .use(listener)
            .use(block)
        // .use(tooltip)
    }, [])
    return (
        <div className="container mx-auto px-4">
   
            <div className="flex mx-auto">
                <div className={cn('w-3/4 h-full', {'w-full': !showToc})}>
                    <Milkdown />
                </div>
                <Button className="" onClick={handleShowToc}>
                切换
            </Button>
                <Toc show={showToc} />
            </div>
        </div>
    )
}
export const MilkdownEditorWrapper: React.FC = () => {
    return (
        <MilkdownProvider>
            <ProsemirrorAdapterProvider>
                <MilkdownEditor />
            </ProsemirrorAdapterProvider>
        </MilkdownProvider>
    )
}
