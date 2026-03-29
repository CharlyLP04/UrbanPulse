'use client'

import React from 'react'

interface LoginFormProps {
  email?: string
  password?: string
  showError?: boolean
  emailError?: string
  passwordError?: string
  onEmailChange?: (value: string) => void
  onPasswordChange?: (value: string) => void
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void
  onGoogleClick?: () => void
}

export function LoginForm({
  email,
  password,
  showError,
  emailError,
  passwordError,
  onEmailChange,
  onPasswordChange,
  onSubmit,
  onGoogleClick
}: LoginFormProps) {
  const emailHasError = Boolean(emailError)
  const passwordHasError = Boolean(passwordError)
  const hasFieldErrors = emailHasError || passwordHasError

  return (
    <div className="p-6 sm:p-8 bg-white flex flex-col justify-center h-full">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-black tracking-tight text-[#0f4c75] mb-1" style={{ fontFamily: 'Impact, "Arial Black", sans-serif' }}>
          INICIAR SESIÓN
        </h2>
        <p className="text-sm text-gray-500">Accede para gestionar reportes ciudadanos</p>
      </div>

      <div aria-live="polite" className="w-full">
        {showError && !hasFieldErrors && (
          <div role="alert" className="bg-red-50 text-red-600 p-3 rounded-lg border-l-4 border-red-500 text-xs text-center mb-4 font-medium transition-all">
            Credenciales inválidas. Verifique su correo y contraseña.
          </div>
        )}
      </div>

      <form className="flex flex-col gap-4" onSubmit={onSubmit} noValidate>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-xs font-bold text-gray-700">Email</label>
          <input
            id="email"
            type="email"
            required
            autoComplete="email"
            value={email ?? ''}
            onChange={(e) => onEmailChange?.(e.target.value)}
            aria-invalid={emailHasError || showError ? "true" : "false"}
            aria-describedby={emailHasError ? "email-error" : undefined}
            className={`w-full px-3 py-2 text-sm border-2 rounded-lg outline-none transition-colors focus-visible:ring-4 focus-visible:ring-sky-500/30 ${emailHasError || showError ? 'border-red-400 bg-red-50 focus:border-red-500' : 'border-gray-200 focus:border-sky-500'}`}
          />
          {emailHasError && <span id="email-error" role="alert" className="text-xs text-red-500 font-medium">{emailError}</span>}
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="password" className="text-xs font-bold text-gray-700">Password</label>
          <input
            id="password"
            type="password"
            required
            autoComplete="current-password"
            value={password ?? ''}
            onChange={(e) => onPasswordChange?.(e.target.value)}
            aria-invalid={passwordHasError || showError ? "true" : "false"}
            aria-describedby={passwordHasError ? "password-error" : undefined}
            className={`w-full px-3 py-2 text-sm border-2 rounded-lg outline-none transition-colors focus-visible:ring-4 focus-visible:ring-sky-500/30 ${passwordHasError || showError ? 'border-red-400 bg-red-50 focus:border-red-500' : 'border-gray-200 focus:border-sky-500'}`}
          />
          {passwordHasError && <span id="password-error" role="alert" className="text-xs text-red-500 font-medium">{passwordError}</span>}
        </div>

        <div className="flex justify-between items-center text-xs mt-1">
          <label className="flex items-center gap-2 cursor-pointer text-gray-600">
            <input type="checkbox" className="w-4 h-4 rounded text-emerald-500 focus:ring-emerald-500 focus-visible:ring-4 focus-visible:ring-emerald-500/30" />
            Recordarme
          </label>
          <a href="/auth/forgot-password" className="font-semibold text-sky-600 hover:text-sky-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 rounded">
            ¿Olvidaste tu contraseña?
          </a>
        </div>

        <button type="submit" className="w-full mt-2 bg-emerald-500 hover:bg-emerald-600 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-500/50 active:transform active:scale-[0.98] text-white font-bold py-2.5 rounded-lg text-sm shadow-md transition-all">
          Iniciar sesión
        </button>
      </form>

      <div className="relative my-6 text-center">
        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200"></div></div>
        <span className="relative z-10 bg-white px-4 text-xs font-medium text-gray-400">o</span>
      </div>

      <button
        type="button"
        onClick={onGoogleClick}
        className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold py-2.5 rounded-lg text-sm transition-colors shadow-sm"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
        </svg>
        Continuar con Google
      </button>

      <div className="mt-6 text-center text-xs text-gray-600">
        ¿No tienes cuenta? <a href="/auth/register" className="font-bold text-sky-600 hover:text-sky-800">Regístrate</a>
      </div>
    </div>
  )
}
