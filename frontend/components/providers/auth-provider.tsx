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
    const storedUser = localStorage.getItem('auth-user')
    const token = localStorage.getItem('auth-token')

    if (storedUser && token) {
      setUser(JSON.parse(storedUser))
    }

    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      if (email && password) {
        const role: User['role'] = email.includes('admin') ? 'admin' : 'user'
        const mockUser: User = {
          id: '1',
          email,
          name: 'Usuario Ejemplo',
          role
        }

        localStorage.setItem('auth-token', 'mock-jwt-token')
        localStorage.setItem('auth-user', JSON.stringify(mockUser))
        setUser(mockUser)
        return true
      }
      return false
    } catch (error) {
      console.error('Error en login:', error)
      return false
    }
  }

  const logout = () => {
    localStorage.removeItem('auth-token')
    localStorage.removeItem('auth-user')
    setUser(null)
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
