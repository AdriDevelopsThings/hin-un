import { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { StarButton } from '../style'
import { getSubstance, pushSubstance } from '../utils/api'

type Status = 'checking' | 'unsaved' | 'saving' | 'saved' | 'error'

export default function SaveSubstanceButton({ un }: { un: number }) {
  const { user } = useAuth()
  const [status, setStatus] = useState<Status>('checking')

  useEffect(() => {
    if (!user) {
      return
    }

    let cancelled = false
    setStatus('checking')

    getSubstance(un)
      .then(found => {
        if (cancelled) {
          return
        }
        if (found) {
          // Already tracked: silently bump last_found, no click required
          pushSubstance(un).catch(() => {})
          setStatus('saved')
        } else {
          setStatus('unsaved')
        }
      })
      .catch(() => {
        if (!cancelled) {
          setStatus('error')
        }
      })

    return () => {
      cancelled = true
    }
  }, [un, user])

  if (!user || status === 'checking' || status === 'error') {
    return null
  }

  const onClick = () => {
    if (status !== 'unsaved') {
      return
    }
    setStatus('saving')
    pushSubstance(un)
      .then(() => setStatus('saved'))
      .catch(() => setStatus('unsaved'))
  }

  const title = status === 'saved'
      ? 'Bereits im Verlauf gespeichert'
      : 'Zum Verlauf hinzufügen'

  return (
    <StarButton
      type='button'
      $filled={status === 'saved'}
      disabled={status !== 'unsaved'}
      onClick={onClick}
      aria-pressed={status === 'saved'}
      title={title}
    >
      <svg viewBox='0 0 24 24' width='1.1rem' height='1.1rem' aria-hidden='true'>
        <path
          fill={status === 'saved' ? 'currentColor' : 'none'}
          stroke='currentColor'
          strokeWidth='1.5'
          strokeLinejoin='round'
          d='M12 2.5l2.9 6.2 6.6.7-4.9 4.6 1.3 6.6L12 17.4l-5.9 3.2 1.3-6.6-4.9-4.6 6.6-.7L12 2.5z'
        />
      </svg>
    </StarButton>
  )
}
