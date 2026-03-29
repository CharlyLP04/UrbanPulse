'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

interface User {
  id: string
  email: string
  name: string
  role: 'admin' | 'user'
}

let isRefreshing = false
let refreshPromise: Promise<boolean> | null = null

export const fetchApi = async (url: string, options: RequestInit = {}): Promise<Response> => {
  let res = await fetch(url, options)

  // Si el token original expiró (HTTTP 401)
  if (res.status === 401) {
    if (!isRefreshing) {
      isRefreshing = true

      // Bloqueamos (mutex) y ejecutamos refresh una sola vez
      refreshPromise = fetch('/api/auth/refresh', { method: 'POST' }).then(r => r.ok)

      const success = await refreshPromise
      isRefreshing = false
      refreshPromise = null

      if (success) {
        // Retry petición original
        return fetch(url, options)
      } else {
        // Refresh falló, liquidamos sesión en todas las pestañas
        window.dispatchEvent(new Event('session-expired'))
        return res
      }
    } else if (refreshPromise) {
      // Las demás llamadas en vuelo (ej. Dashboard cargando 5 widgets)
      // esperan a la promesa original en lugar de mandar 5 refresh tokens
      const success = await refreshPromise
      if (success) {
        return fetch(url, options)
      } else {
        return res
      }
    }
  }

  return res
}

interface LoginResult {
  success: boolean
  role?: string
  requiresVerification?: boolean
  message?: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<LoginResult>
  verifyLogin: (email: string, code: string) => Promise<LoginResult>
  logout: () => void
  demoLogin: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (typeof BroadcastChannel === 'undefined') return

    const channel = new BroadcastChannel('auth-channel')

    channel.onmessage = (event) => {
      if (event.data === 'sync') {
        checkSession()
      } else if (event.data === 'logout' || event.data === 'session-expired') {
        setUser(null)
        if (window.location.pathname !== '/auth/login') {
          window.location.href = '/auth/login'
        }
      }
    }

    const checkSession = async () => {
      try {
        if (typeof window !== 'undefined' && localStorage.getItem('demo_user')) {
          setUser(JSON.parse(localStorage.getItem('demo_user') as string))
          setIsLoading(false)
          return
        }

        const res = await fetch('/api/auth/me')
        if (res.ok) {
          const userData = await res.json()
          setUser(userData.user)
        } else {
          setUser(null)
        }
      } catch (error) {
        setUser(null)
      } finally {
        setIsLoading(false)
      }
    }

    checkSession()

    const handleSessionExpired = () => {
      setUser(null)
      channel.postMessage('session-expired')
      if (window.location.pathname !== '/auth/login') {
        window.location.href = '/auth/login'
      }
    }

    window.addEventListener('session-expired', handleSessionExpired as EventListener)

    return () => {
      channel.close()
      window.removeEventListener('session-expired', handleSessionExpired as EventListener)
    }
  }, [])

  const login = async (email: string, password: string): Promise<LoginResult> => {
    try {
      if (email && password) {
        const res = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        })

        const data = await res.json()

        if (res.ok && data.success) {
          if (data.requiresVerification) {
            return { success: true, requiresVerification: true, message: data.message }
          }
          
          setUser(data.user)

          if (typeof BroadcastChannel !== 'undefined') {
            const channel = new BroadcastChannel('auth-channel')
            channel.postMessage('sync')
            channel.close()
          }

          return { success: true, role: data.user.role }
        } else {
            // Not OK, return error msg
            return { success: false, message: data.message }
        }
      }
      return { success: false }
    } catch (error) {
      console.error('Error en login:', error)
      return { success: false }
    }
  }

  const verifyLogin = async (email: string, code: string): Promise<LoginResult> => {
    try {
        const res = await fetch('/api/auth/verify-login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, code })
        })

        const data = await res.json()

        if (res.ok && data.success) {
          setUser(data.user)

          if (typeof BroadcastChannel !== 'undefined') {
            const channel = new BroadcastChannel('auth-channel')
            channel.postMessage('sync')
            channel.close()
          }

          return { success: true, role: data.user.role }
        } else {
            return { success: false, message: data.message }
        }
    } catch (error) {
      console.error('Error en verifyLogin:', error)
      return { success: false }
    }
  }

  const logout = () => {
    if (typeof window !== 'undefined') localStorage.removeItem('demo_user')
    fetch('/api/auth/logout', { method: 'POST' })
      .catch(err => console.error('Error en logout:', err))
      .finally(() => {
        setUser(null)
        if (typeof BroadcastChannel !== 'undefined') {
          const channel = new BroadcastChannel('auth-channel')
          channel.postMessage('logout')
          channel.close()
        }
        window.location.href = '/auth/login'
      })
  }

  const demoLogin = () => {
    const mockUser: User = { id: '999', name: 'Carlos', role: 'admin', email: 'carlos@techlead.com' }
    if (typeof window !== 'undefined') {
      localStorage.setItem('demo_user', JSON.stringify(mockUser))
    }
    setUser(mockUser)

    if (typeof BroadcastChannel !== 'undefined') {
      const channel = new BroadcastChannel('auth-channel')
      channel.postMessage('sync')
      channel.close()
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, verifyLogin, logout, demoLogin, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
