import {useEffect, useState} from 'react'

// 定义目录项的类型
type TocItem = {
    text: string
    level: number
    id: string
}

const useToc = (loading: boolean, get: Function, outline: Function, listenerCtx: any) => {
    const [toc, setToc] = useState<TocItem[]>([])

    const calculateToc = () => {
        const toc: TocItem[] = outline()(get().ctx).map((item: TocItem) => ({
            text: item.text,
            level: item.level,
            id: item.id,
        }))
        setToc(toc)
    }

    useEffect(() => {
        if (loading) {
            return
        }

        // 组件挂载时计算一次目录
        calculateToc()
        const listener = get().ctx.get(listenerCtx)
        listener.markdownUpdated(() => {
            calculateToc()
        })
    }, [loading])

    return toc
}

export default useToc
