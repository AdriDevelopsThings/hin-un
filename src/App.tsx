import { Container, HazardBoard } from './style'
import Sources from './components/Sources'
import HazardBoardLine from './components/HazardBoardLine'
import { useEffect, useState } from 'react'
import Description from './components/Description'

const App = () => {
  const [hinContent, setHinContent] = useState('')
  const [unContent, setUnContent] = useState('')
  
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    const hin = searchParams.get('hin')
    const un = searchParams.get('un')

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
    const searchParams = new URLSearchParams()
    if (hinContent) {
      searchParams.set('hin', hinContent)
    }
    if (unContent) {
      searchParams.set('un', unContent)
    }
    url.search = hinContent || unContent ? '?' + searchParams.toString() : ''
    history.replaceState(null, '', url)
  }, [hinContent, unContent])

  return (
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
  )
}

export default App
