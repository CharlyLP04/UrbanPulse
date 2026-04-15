'use client'

import Link from 'next/link'
import { FormEvent, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/providers/auth-provider'
import LoginBranding from './LoginBranding'
import { LoginForm } from '../../forms/LoginForm'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showError, setShowError] = useState(false)
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  
  // 2FA State
  const [requiresVerification, setRequiresVerification] = useState(false)
  const [verificationCode, setVerificationCode] = useState('')
  
  const emailRef = useRef<HTMLInputElement | null>(null)
  const passwordRef = useRef<HTMLInputElement | null>(null)
  
  const { login, verifyLogin, demoLogin } = useAuth()
  const router = useRouter()

  useEffect(() => {
    emailRef.current = document.querySelector<HTMLInputElement>('#email')
  }, [])

  const validateFields = () => {
    let hasErrors = false

    if (!email.trim()) {
      setEmailError('El correo es obligatorio.')
      hasErrors = true
    } else {
      setEmailError('')
    }

    if (!password.trim()) {
      setPasswordError('La contraseña es obligatoria.')
      hasErrors = true
    } else {
      setPasswordError('')
    }

    return !hasErrors
  }

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setShowError(false)

    const isValid = validateFields()

    if (!isValid) {
      if (!email.trim()) {
        emailRef.current?.focus()
        return
      }
      if (!password.trim()) {
        passwordRef.current?.focus()
        return
      }
    }

    const result = await login(email, password)

    if (result.success) {
      if (result.requiresVerification) {
        setRequiresVerification(true)
      } else {
        if (result.role === 'admin') {
          router.push('/admin/dashboard')
        } else {
          router.push('/dashboard/home')
        }
      }
    } else {
      if (result.message && result.message.includes('verifica tu correo')) {
        // Opción de mejora: redirigir a verify-email si su cuenta no está verificada en absoluto
        router.push('/auth/verify-email')
      } else {
        setShowError(true)
        window.setTimeout(() => setShowError(false), 3000)
      }
    }
  }

  const onVerify = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setShowError(false)

    if (!verificationCode.trim()) return

    const result = await verifyLogin(email, verificationCode)

    if (result.success) {
      if (result.role === 'admin') {
        router.push('/admin/dashboard')
      } else {
        router.push('/dashboard/home')
      }
    } else {
      setShowError(true)
      window.setTimeout(() => setShowError(false), 3000)
    }
  }

  return (
    <div className="min-h-[calc(100vh-80px)] w-full flex items-center justify-center p-4 md:p-8 bg-gradient-to-br from-[#0f4c75] to-[#3282b8] relative overflow-hidden">
      
      {/* Background overlay effect */}
      <div className="absolute inset-0 bg-white/5 opacity-40 mix-blend-overlay pointer-events-none"></div>

      <Link href="/public/index-wireframe" className="absolute top-4 left-4 lg:top-8 lg:left-8 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg font-medium transition-all text-sm backdrop-blur-md z-20 border border-white/20">
        ← Volver al Inicio
      </Link>

      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col md:flex-row items-stretch relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-500 my-auto">
        <LoginBranding />
        <div className="w-full md:w-[60%] flex-shrink-0">
          <LoginForm
            email={email}
            password={password}
            showError={showError}
            emailError={emailError}
            passwordError={passwordError}
            onEmailChange={setEmail}
            onPasswordChange={setPassword}
            onSubmit={onSubmit}
            requiresVerification={requiresVerification}
            verificationCode={verificationCode}
            onVerificationCodeChange={setVerificationCode}
            onVerify={onVerify}
            onGoogleClick={async () => {
              try {
                const res = await fetch('/api/auth/google/url')
                const data = await res.json()
                if (data.url) {
                  window.location.href = data.url
                } else {
                  setShowError(true)
                }
              } catch (e) {
                console.error(e)
                setShowError(true)
              }
            }}
          />
        </div>
      </div>
    </div>
  )
}
