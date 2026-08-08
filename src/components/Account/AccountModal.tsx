import { useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import LoggedInView from './LoggedInView'
import LoggedOutView from './LoggedOutView'
import { CloseButton, ModalBox, Overlay } from './style'

type Props = {
  onClose: () => void
}

export default function AccountModal({ onClose }: Props) {
  const { user, loading } = useAuth()

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [onClose])

  return (
    <Overlay onClick={onClose}>
      <ModalBox onClick={e => e.stopPropagation()}>
        <CloseButton onClick={onClose} aria-label='Schließen'>×</CloseButton>
        {loading ? <p>Lädt…</p> : user ? <LoggedInView user={user} /> : <LoggedOutView />}
      </ModalBox>
    </Overlay>
  )
}
