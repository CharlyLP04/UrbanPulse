'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

interface User {
  id: string
  email: string
  name: string
  role: 'admin' | 'user'
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const channel = new BroadcastChannel('auth-channel')

    channel.onmessage = (event) => {
      if (event.data === 'sync') {
        checkSession()
      } else if (event.data === 'logout') {
        setUser(null)
        window.location.href = '/auth/login'
      } else if (event.data === 'session-expired') {
        setUser(null)
        window.location.href = '/auth/login'
      }
    }

    const checkSession = async () => {
      try {
        const res = await fetch('/api/auth/me')
        if (res.ok) {
          const userData = await res.json()
          setUser(userData)
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
      window.location.href = '/auth/login'
    }

    window.addEventListener('session-expired', handleSessionExpired as EventListener)

    return () => {
      channel.close()
      window.removeEventListener('session-expired', handleSessionExpired as EventListener)
    }
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      if (email && password) {
        const res = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        })

        if (res.ok) {
          const userData = await res.json()
          setUser(userData)
          
          const channel = new BroadcastChannel('auth-channel')
          channel.postMessage('sync')
          channel.close()
          
          return true
        }
      }
      return false
    } catch (error) {
      console.error('Error en login:', error)
      return false
    }
  }

  const logout = () => {
    fetch('/api/auth/logout', { method: 'POST' })
      .catch(err => console.error('Error en logout:', err))
      .finally(() => {
        setUser(null)
        const channel = new BroadcastChannel('auth-channel')
        channel.postMessage('logout')
        channel.close()
        window.location.href = '/auth/login'
      })
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
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
