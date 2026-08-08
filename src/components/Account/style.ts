import styled, { css } from 'styled-components'

export const Overlay = styled.div`
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding: 2rem 1rem;
    z-index: 1000;
    overflow-y: auto;
`

export const ModalBox = styled.div`
    background: Canvas;
    color: CanvasText;
    border-radius: 0.5rem;
    padding: 1.5rem;
    width: 100%;
    max-width: 32rem;
    position: relative;
    box-shadow: 0 0.5rem 2rem rgba(0, 0, 0, 0.3);
`

export const CloseButton = styled.button`
    position: absolute;
    top: 0.75rem;
    right: 0.75rem;
    border: none;
    background: transparent;
    font-size: 1.5rem;
    line-height: 1;
    cursor: pointer;
    color: inherit;
`

export const IntroText = styled.p`
    opacity: 0.8;
    margin-top: 0;
    margin-bottom: 1rem;
`

export const FormSection = styled.form`
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
`

export const FieldRow = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.25rem;

    label {
        font-size: 0.875rem;
    }

    input {
        padding: 0.5rem;
        border: 1px solid currentColor;
        border-radius: 0.25rem;
        background: transparent;
        color: inherit;
    }
`

export const SubmitButton = styled.button`
    align-self: flex-start;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 0.25rem;
    background: #fe9900;
    color: black;
    cursor: pointer;

    &:disabled {
        opacity: 0.6;
        cursor: default;
    }
`

export const SectionHeading = styled.h3`
    margin-top: 1.5rem;
    margin-bottom: 0.5rem;
`

export const List = styled.ul`
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
`

export const ListItem = styled.li`
    display: flex;
    align-items: center;
    gap: 0.5rem;
`

export const InviteForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    align-items: flex-start;
    margin-bottom: 1.5rem;
`

export const FriendRow = styled.button<{ $active: boolean }>`
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 0.5rem;
    border: 1px solid currentColor;
    border-radius: 0.25rem;
    background: transparent;
    color: inherit;
    cursor: pointer;
    text-align: left;

    ${({ $active }) => $active && css`
        border-color: #fe9900;
        border-width: 2px;
    `}
`

export const LogoutButton = styled.button`
    padding: 0.35rem 0.75rem;
    border: 1px solid currentColor;
    border-radius: 0.25rem;
    background: transparent;
    color: inherit;
    cursor: pointer;
    margin-bottom: 1rem;
`

export const DiffGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;

    @media only screen and (max-width: 600px) {
        grid-template-columns: 1fr;
    }
`

export const DiffColumn = styled.div`
    h3 {
        font-size: 0.9rem;
        margin-bottom: 0.5rem;
    }
`
