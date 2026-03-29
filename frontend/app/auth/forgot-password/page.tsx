'use client'

import { useState, FormEvent } from 'react'
import Link from 'next/link'
import LoginBranding from '@/components/wireframes/login/LoginBranding'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage('')
    setError('')

    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data = await res.json()

      if (res.ok && data.success) {
        setMessage(data.message)
        setEmail('')
      } else {
        throw new Error(data.message || 'Error al procesar la solicitud.')
      }
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-[calc(100vh-80px)] w-full flex items-center justify-center p-4 md:p-8 bg-gradient-to-br from-[#0f4c75] to-[#3282b8] relative overflow-hidden">
      <div className="absolute inset-0 bg-white/5 opacity-40 mix-blend-overlay pointer-events-none"></div>

      <Link href="/auth/login" className="absolute top-4 left-4 lg:top-8 lg:left-8 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg font-medium transition-all text-sm backdrop-blur-md z-20 border border-white/20">
        ← Volver al Login
      </Link>

      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col md:flex-row items-stretch relative z-10 my-auto">
        <LoginBranding />
        <div className="w-full md:w-[60%] flex-shrink-0 p-8 flex flex-col justify-center">
            <h2 className="text-2xl font-black tracking-tight text-[#0f4c75] mb-2" style={{ fontFamily: 'Impact, "Arial Black", sans-serif' }}>Recuperar Contraseña</h2>
            <p className="text-gray-500 mb-6 text-sm font-medium">Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.</p>

            {message ? (
                <div className="p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm mb-4">
                    {message}
                </div>
            ) : (
                <form onSubmit={onSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Correo Electrónico</label>
                    <input
                      type="email"
                      className="w-full p-3 rounded-lg border-2 border-gray-200 outline-none focus:ring-4 focus:ring-sky-500/30 focus:border-sky-500 transition-all text-sm"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="tucorreo@ejemplo.com"
                      required
                    />
                  </div>

                  {error && (
                    <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm border-l-4 border-red-500 font-medium">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 bg-[#3282b8] hover:bg-[#0f4c75] text-white rounded-lg font-bold shadow-md transition-all flex items-center justify-center mt-2 focus-visible:ring-4 focus-visible:ring-sky-500/50"
                  >
                    {isLoading ? 'Enviando...' : 'Enviar enlace'}
                  </button>
                </form>
            )}
        </div>
      </div>
    </div>
  )
}
