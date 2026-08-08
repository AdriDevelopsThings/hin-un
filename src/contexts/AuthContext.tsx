import { createContext, ReactNode, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { User } from '../types'
import { ApiError, createSession, deleteSession, getSession } from '../utils/api'

const LOGGED_IN_HINT_KEY = 'hinun_logged_in'

type AuthState = {
  user: User | null,
  loading: boolean,
  refresh: () => void,
  logout: () => void
}

const AuthContext = createContext<AuthState>({
  user: null,
  loading: false,
  refresh: () => {},
  logout: () => {}
})

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }: { children: ReactNode }) {
  // Captured synchronously during the initial render (not in an effect) so a
  // later re-render can never lose code/state before we've read them.
  const [oauthParams] = useState(() => {
    const params = new URLSearchParams(location.search)
    return { code: params.get('code'), state: params.get('state') }
  })

  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(false)
  // The OAuth code is single-use; StrictMode double-invokes effects in dev,
  // so guard against exchanging it twice.
  const exchangedRef = useRef(false)

  const refresh = useCallback(() => {
    setLoading(true)
    getSession()
      .then(u => {
        setUser(u)
        localStorage.setItem(LOGGED_IN_HINT_KEY, '1')
      })
      .catch(() => {
        setUser(null)
        localStorage.removeItem(LOGGED_IN_HINT_KEY)
      })
      .finally(() => setLoading(false))
  }, [])

  const logout = useCallback(() => {
    deleteSession()
      .catch(() => {})
      .finally(() => {
        setUser(null)
        localStorage.removeItem(LOGGED_IN_HINT_KEY)
      })
  }, [])

  useEffect(() => {
    if (oauthParams.code && oauthParams.state) {
      if (exchangedRef.current) {
        return
      }
      exchangedRef.current = true
      setLoading(true)
      createSession(oauthParams.code, oauthParams.state)
        .then(u => {
          setUser(u)
          localStorage.setItem(LOGGED_IN_HINT_KEY, '1')
        })
        .catch((e: unknown) => {
          if (!(e instanceof ApiError)) {
            throw e
          }
        })
        .finally(() => {
          setLoading(false)
          // code/state are query params (required by the OAuth redirect), but
          // hin/un now live in the hash, so nothing else clears these for us.
          const url = new URL(location.href)
          url.searchParams.delete('code')
          url.searchParams.delete('state')
          history.replaceState(null, '', url)
        })
      return
    }

    if (localStorage.getItem(LOGGED_IN_HINT_KEY)) {
      refresh()
    }
    // Only ever relevant on mount: oauthParams is captured once and refresh/logout are stable.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading, refresh, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
