// 目录组件
import useToc from '@/hooks/useToc'
import { cn } from '@/lib/utils'
import {listenerCtx} from '@milkdown/plugin-listener'
import {useInstance} from '@milkdown/react'
import {outline} from '@milkdown/utils'
import {FC} from 'react'
type TocProps = {
    show: boolean
}

export const Toc: FC<TocProps> = ({show}) => {
    if (!show) {
        return null
    }
    const [loading, get] = useInstance()
    const toc = useToc(loading, get, outline, listenerCtx)
    return (
        <div className={cn("w-1/4", "sticky", "top-0", "p-4", "bg-white", "shadow-md", "self-start")}>
            <h2 className={cn("text-xl", "font-bold", "mb-4")}>Table of Contents</h2>
            <ul className={cn("list-disc", "list-inside")}>
                {toc.map((item, index) => (
                    <li key={index} style={{ marginLeft: `${item.level * 20}px` }} className={cn("mb-2")}>
                        <a href={`#${item.id}`} className={cn("text-blue-600")}>
                            {item.text}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    )
}
