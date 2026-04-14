'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import LoginBranding from '@/components/wireframes/login/LoginBranding'

export default function VerifyEmailPage() {
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    setSuccess('')

    try {
      const res = await fetch('/api/auth/verify-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.message || 'Error de verificación')
      }

      setSuccess('¡Cuenta verificada! Redirigiendo al login...')
      setTimeout(() => {
        router.push('/auth/login')
      }, 2000)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-[calc(100vh-80px)] w-full flex items-center justify-center p-4 md:p-8 bg-gradient-to-br from-[#0f4c75] to-[#3282b8] relative overflow-hidden">
      <div className="absolute inset-0 bg-white/5 opacity-40 mix-blend-overlay pointer-events-none"></div>

      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col md:flex-row items-stretch relative z-10 my-auto">
        <LoginBranding />
        <div className="w-full md:w-[60%] flex-shrink-0 p-8 flex flex-col justify-center">
            <h2 className="text-2xl font-bold text-[#0f4c75] mb-2">Verifica tu correo</h2>
            <p className="text-gray-500 mb-6 font-medium">Hemos enviado un código de 6 dígitos a tu bandeja de entrada.</p>

            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Correo Electrónico</label>
                <input
                  type="email"
                  className="w-full p-3 rounded-lg bg-gray-50 border border-gray-200 outline-none focus:ring-2 focus:ring-[#3282b8] focus:border-transparent transition-all"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tucorreo@ejemplo.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Código de Verificación</label>
                <input
                  type="text"
                  className="w-full p-3 rounded-lg bg-gray-50 border border-gray-200 outline-none focus:ring-2 focus:ring-[#3282b8] focus:border-transparent transition-all text-center tracking-[0.5em] text-lg font-bold"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="------"
                  maxLength={6}
                  required
                />
              </div>

              {error && (
                <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm border border-red-100 flex items-center gap-2">
                  <span className="font-bold">Error:</span> {error}
                </div>
              )}

              {success && (
                <div className="p-3 bg-green-50 text-green-600 rounded-lg text-sm border border-green-100 flex items-center gap-2">
                  <span className="font-bold">¡Éxito!:</span> {success}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-[#3282b8] hover:bg-[#0f4c75] text-white rounded-lg font-bold transition-all shadow-md mt-4 flex items-center justify-center"
              >
                {isLoading ? 'Verificando...' : 'Verificar e Iniciar Sesión'}
              </button>
            </form>

            <div className="mt-6 text-center text-sm font-medium text-gray-500">
              ¿Ya estás verificado?{' '}
              <Link href="/auth/login" className="text-[#3282b8] hover:text-[#0f4c75] hover:underline underline-offset-4 font-bold transition-all">
                Ir al login
              </Link>
            </div>
        </div>
      </div>
    </div>
  )
}
