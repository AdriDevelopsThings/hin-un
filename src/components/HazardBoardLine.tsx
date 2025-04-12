import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react'
import { HazardBoardFirstRow, HazardBoardInput, HazardBoardSecondRow } from '../style'

type Props = {
    content: string,
    setContent: (s: string) => unknown,
    first: boolean
}

export default function HazardBoardLine({ content, setContent, first }: Props) {
    const columnRef = useRef<HTMLTableCellElement>(null)
    const [fontSize, setFontSize] = useState(20)

    useEffect(() => {
        if (columnRef.current) {
            const updateFontSize = () => {
                setFontSize(Math.round(columnRef.current!.clientHeight))
            }
            updateFontSize()
            const observer = new ResizeObserver(updateFontSize)
            observer.observe(columnRef.current)
            return () => observer.disconnect()
        }
    }, [])

    const onChange = useCallback((e: ChangeEvent) => {
        const value = (e.target as HTMLInputElement).value
        if (value.match(/^\d{0,4}$/)) {
            setContent(value)
        }
    }, [setContent])
    
    if (first) {
        return ( 
            <HazardBoardFirstRow ref={columnRef}>
                <HazardBoardInput type='text' inputMode='numeric' value={content} onChange={onChange} $fontSize={fontSize} />
            </HazardBoardFirstRow>
        )
    } else {
        return ( 
            <HazardBoardSecondRow ref={columnRef}>
                <HazardBoardInput type='text' inputMode='numeric' value={content} onChange={onChange} $fontSize={fontSize} />
            </HazardBoardSecondRow>
        )
    }
}