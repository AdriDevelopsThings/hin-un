import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import { HazardBoardColumn, HazardBoardInput, HazardBoardRow } from '../style';

type Props = {
    content: string,
    setContent: (s: string) => unknown
}

export default function HazardBoardLine({ content, setContent }: Props) {
    const columnRef = useRef<HTMLTableCellElement>(null)
    const [fontSize, setFontSize] = useState(20)
    useEffect(() => {
        if (columnRef.current) {
            const updateFontSize = () => {
                setFontSize(Math.round(columnRef.current!.clientHeight * 0.8))
            }

            updateFontSize()

            const observer = new ResizeObserver(() => updateFontSize())

            observer.observe(columnRef.current)

            return () => {
                observer.disconnect()
            }
        }
    }, [columnRef.current])

    const onChange = useCallback((e: ChangeEvent) => {
        const value = (e.target as HTMLInputElement).value
        if (value.length <= 4) {
            setContent(value)
        }
    }, [setContent])


    return (
        <HazardBoardRow>
            <HazardBoardColumn ref={columnRef}>
                <HazardBoardInput type='number' value={content} onChange={onChange} $fontSize={fontSize} />
            </HazardBoardColumn>
        </HazardBoardRow>
    )
}