'use client'

import { useState } from 'react'

export function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !password) {
      setError('Todos los campos son obligatorios')
      return
    }

    setError('')
    console.log('Login enviado')
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Iniciar sesión</h2>

      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      {error && <p role="alert">{error}</p>}

      <button type="submit">Iniciar sesión</button>
    </form>
  )
}
