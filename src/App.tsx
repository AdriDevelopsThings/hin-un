import { Container, HazardBoard } from './style'
import Sources from './components/Sources'
import HazardBoardLine from './components/HazardBoardLine'
import { useEffect, useState } from 'react'
import Description from './components/Description'
import AccountIcon from './components/Account/AccountIcon'
import { AuthProvider } from './contexts/AuthContext'

const App = () => {
  const [hinContent, setHinContent] = useState('')
  const [unContent, setUnContent] = useState('')

  useEffect(() => {
    const hashParams = new URLSearchParams(location.hash.slice(1))
    const hin = hashParams.get('hin')
    const un = hashParams.get('un')

    if (hin) {
      setHinContent(hin)
    }
    if (un) {
      setUnContent(un)
    }
  }, [])

  useEffect(() => {
    if (
      typeof navigator !== 'undefined' &&
      window.location.hostname !== 'localhost' &&
      navigator.serviceWorker
    ) {
      navigator.serviceWorker.register('/sw.js')
        .then(() => console.log('Service Worker got registered'))
        .catch(e => console.error(`Error while registering Service Worker: ${e}`))
    }
  }, [])

  useEffect(() => {
    const url = new URL(window.location.href)
    const hashParams = new URLSearchParams()
    if (hinContent) {
      hashParams.set('hin', hinContent)
    }
    if (unContent) {
      hashParams.set('un', unContent)
    }
    url.hash = hinContent || unContent ? hashParams.toString() : ''
    history.replaceState(null, '', url)
  }, [hinContent, unContent])

  return (
    <AuthProvider>
      <AccountIcon />
      <Container>
        <HazardBoard>
          <HazardBoardLine first={true} content={hinContent} setContent={setHinContent} />
          <HazardBoardLine first={false} content={unContent} setContent={setUnContent} />
        </HazardBoard>

        <div>
          <Description hinContent={hinContent} unContent={unContent} />
          <Sources />
        </div>
      </Container>
    </AuthProvider>
  )
}

export default App
