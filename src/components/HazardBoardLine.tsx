import { ChangeEvent, useCallback } from 'react'
import { HazardBoardFirstRow, HazardBoardInput, HazardBoardSecondRow } from '../style'

type Props = {
    content: string,
    setContent: (s: string) => unknown,
    first: boolean
}

export default function HazardBoardLine({ content, setContent, first }: Props) {
    const onChange = useCallback((e: ChangeEvent) => {
        const value = (e.target as HTMLInputElement).value
        if (value.match(/^\d{0,4}$/)) {
            setContent(value)
        }
    }, [setContent])
    
    if (first) {
        return ( 
            <HazardBoardFirstRow>
                <HazardBoardInput type='text' inputMode='numeric' value={content} onChange={onChange} />
            </HazardBoardFirstRow>
        )
    } else {
        return ( 
            <HazardBoardSecondRow>
                <HazardBoardInput type='text' inputMode='numeric' value={content} onChange={onChange} />
            </HazardBoardSecondRow>
        )
    }
}