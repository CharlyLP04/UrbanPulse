'use client'

import { useState, FormEvent, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import LoginBranding from '@/components/wireframes/login/LoginBranding'

function ResetPasswordContent() {
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  
  const router = useRouter()
  // Since we use useSearchParams, we need to wrap the export or ensure this is handled well.
  // We'll trust Next 14 handles it fine in client components.
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  useEffect(() => {
      if (!token) {
          setError('El enlace de recuperación es inválido o no existe.')
      }
  }, [token])

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!token) return

    if (newPassword !== confirmPassword) {
        setError('Las contraseñas no coinciden.')
        return
    }

    setIsLoading(true)
    setMessage('')
    setError('')

    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, newPassword }),
      })

      const data = await res.json()

      if (res.ok && data.success) {
        setSuccess(true)
        setMessage(data.message)
        setTimeout(() => {
            router.push('/auth/login')
        }, 3000)
      } else {
        throw new Error(data.message || 'Error al restablecer contraseña.')
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

      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col md:flex-row items-stretch relative z-10 my-auto">
        <LoginBranding />
        <div className="w-full md:w-[60%] flex-shrink-0 p-8 flex flex-col justify-center">
            <h2 className="text-2xl font-black tracking-tight text-[#0f4c75] mb-2" style={{ fontFamily: 'Impact, "Arial Black", sans-serif' }}>Restablecer Contraseña</h2>
            
            {!token && (
                <div className="p-4 bg-red-50 text-red-600 rounded-lg text-sm mb-4 border border-red-200">
                    Tu enlace de recuperación es inválido o falta.
                    <br/><br/>
                    <Link href="/auth/forgot-password" className="text-[#3282b8] hover:underline font-bold">Solicitar un nuevo enlace</Link>
                </div>
            )}

            {token && success && (
                <div className="p-4 bg-green-50 text-green-700 rounded-lg text-sm mb-4 border border-green-200">
                    {message}
                    <p className="mt-2 text-gray-500">Redirigiendo a inicio de sesión...</p>
                </div>
            )}

            {token && !success && (
                <form onSubmit={onSubmit} className="space-y-4">
                  <p className="text-gray-500 mb-6 text-sm font-medium">Ingresa tu nueva contraseña para acceder a tu cuenta.</p>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Nueva Contraseña</label>
                    <input
                      type="password"
                      className="w-full p-3 rounded-lg border-2 border-gray-200 outline-none focus:ring-4 focus:ring-sky-500/30 focus:border-sky-500 transition-all text-sm"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      minLength={6}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Confirmar Contraseña</label>
                    <input
                      type="password"
                      className="w-full p-3 rounded-lg border-2 border-gray-200 outline-none focus:ring-4 focus:ring-sky-500/30 focus:border-sky-500 transition-all text-sm"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      minLength={6}
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
                    className="w-full py-3 bg-[#1b9c85] hover:bg-[#158f75] text-white rounded-lg font-bold shadow-md transition-all flex items-center justify-center mt-2 focus-visible:ring-4 focus-visible:ring-emerald-500/50"
                  >
                    {isLoading ? 'Actualizando...' : 'Restablecer Contraseña'}
                  </button>
                </form>
            )}
        </div>
      </div>
    </div>
  )
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="min-h-[calc(100vh-80px)] w-full flex items-center justify-center bg-[#0f4c75] text-white font-bold">Cargando...</div>}>
      <ResetPasswordContent />
    </Suspense>
  )
}
