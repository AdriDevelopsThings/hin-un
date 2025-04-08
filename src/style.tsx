import styled from 'styled-components';

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

export const HazardBoard = styled.table`
    width: 50vw;
    aspect-ratio: 25 / 20;
    border-spacing: 0;
    border-collapse: collapse;
    flex-shrink: 0;

    @media only screen and (max-width: 800px) {
        width: 100%;
    }
`

export const HazardBoardRow = styled.tr`
    border: 1.75vw solid black;
    background-color: #fe9900;
    aspect-ratio: 25 / 9;

    @media only screen and (max-width: 800px) {
        border: 3vw solid black;
    }
`

export const HazardBoardColumn = styled.td`
    border: 1.75vw solid black;

    @media only screen and (max-width: 800px) {
        border: 3vw solid black;
    }
`

export const HazardBoardInput = styled.input<{ $fontSize: number }>`
    border: none;
    outline: none;
    padding: 0;

    background-color: #fe9900;
    text-align: center;
    width: 100%;
    height: 100%;
    font-family: 'hazard-board-font', sans-serif;
    font-size: ${props => props.$fontSize}px;

    appearance: textfield;
    /* TODO */
    -moz-appearance: textfield;
    &::-webkit-outer-spin-button, &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
`

export const DescriptionContainer = styled.div``
export const SourcesContainer = styled.div``