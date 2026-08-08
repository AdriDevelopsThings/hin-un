import { FormEvent, useState } from 'react'
import { loginMastodon } from '../../utils/api'
import { FieldRow, FormSection, IntroText, SubmitButton } from './style'

export default function LoggedOutView() {
  const [instance, setInstance] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    setSubmitting(true)
    try {
      const { redirect_url } = await loginMastodon(instance)
      window.location.href = redirect_url
    } catch {
      setError('Anmeldung fehlgeschlagen. Bitte die Instanz prüfen.')
      setSubmitting(false)
    }
  }

  return (
    <div>
      <h2>Konto</h2>
      <IntroText>
        Melde dich mit deinem Mastodon-Konto an, um dir zu merken, welche Stoffe du schon
        nachgeschlagen hast, und dich mit Freunden zu vergleichen. Beim ersten Anmelden wird
        automatisch ein Konto für dich angelegt.
      </IntroText>
      <FormSection onSubmit={onSubmit}>
        <FieldRow>
          <label htmlFor='mastodon-instance'>Mastodon-Instanz</label>
          <input
            id='mastodon-instance'
            type='text'
            placeholder='mastodon.social'
            value={instance}
            onChange={e => setInstance(e.target.value)}
            required
          />
        </FieldRow>
        {error && <p role='alert'>{error}</p>}
        <SubmitButton type='submit' disabled={submitting}>
          Mit Mastodon anmelden
        </SubmitButton>
      </FormSection>
    </div>
  )
}
