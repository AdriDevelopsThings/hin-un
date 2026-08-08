import { lazy, Suspense, useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { AccountIconButton } from '../../style'

const AccountModal = lazy(() => import('./AccountModal'))

export default function AccountIcon() {
  const [open, setOpen] = useState(false)
  const { user, loading, refresh } = useAuth()

  const onClick = () => {
    if (!user && !loading) {
      refresh()
    }
    setOpen(true)
  }

  return (
    <>
      <AccountIconButton onClick={onClick} aria-label='Konto & Freunde' title='Konto & Freunde'>
        <svg viewBox='0 0 24 24' width='1.25rem' height='1.25rem' fill='currentColor' aria-hidden='true'>
          <path d='M12 12c2.7 0 4.9-2.2 4.9-4.9S14.7 2.2 12 2.2 7.1 4.4 7.1 7.1 9.3 12 12 12Zm0 2.5c-3.3 0-9.8 1.6-9.8 4.9v2.4h19.6v-2.4c0-3.3-6.5-4.9-9.8-4.9Z' />
        </svg>
      </AccountIconButton>
      {open && (
        <Suspense fallback={null}>
          <AccountModal onClose={() => setOpen(false)} />
        </Suspense>
      )}
    </>
  )
}
