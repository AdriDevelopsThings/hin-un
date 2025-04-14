import styled from 'styled-components'

export const Container = styled.div`
    margin-top: 1rem;
    display: flex;
    gap: 2rem;
    align-items: flex-start;

    @media only screen and (max-width: 800px) {
        flex-direction: column;
        gap: 0;
    }
`

export const HazardBoard = styled.div`
    width: 50vw;
    aspect-ratio: 25 / 20;
    border-spacing: 0;
    border-collapse: collapse;
    flex-shrink: 0;

    @media only screen and (max-width: 800px) {
        width: 100%;
    }
`

const HazardBoardRow = styled.div`
    background-color: #fe9900;
    aspect-ratio: 25 / 9;

    border-style: solid;
    border-color: black;
`

export const HazardBoardFirstRow = styled(HazardBoardRow)`
    border-width: 1.75vw 1.75vw 0.875vw;
    @media only screen and (max-width: 800px) {
        border-width: 3vw 3vw 1.5vw;
    }
`

export const HazardBoardSecondRow = styled(HazardBoardRow)`
    border-width: 0.875vw 1.75vw 1.75vw;
    @media only screen and (max-width: 800px) {
        border-width: 1.5vw 3vw 3vw;
    }
`

export const HazardBoardInput = styled.input<{ $fontSize: number }>`
    border: none;
    outline: none;
    padding: 0;

    color: black;
    background-color: #fe9900;
    text-align: center;
    width: 100%;
    height: 100%;
    font-family: 'hazard-board-font', sans-serif;
    font-size: ${props => props.$fontSize}px;

    appearance: textfield;
    -moz-appearance: textfield;
    &::-webkit-outer-spin-button, &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
`

export const DescriptionContainer = styled.div``
export const SourcesContainer = styled.div``