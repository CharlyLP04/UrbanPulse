'use client'

import Link from 'next/link'
import { FormEvent, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import RegisterBenefits from './RegisterBenefits'
import RegisterForm from './RegisterForm'
import './register.css'
import RegisterProgressSteps from './RegisterProgressSteps'
import { RegisterData, RegisterTextField } from './types'

const initialForm: RegisterData = {
  nombre: '',
  telefono: '',
  ciudad: '',
  colonia: '',
  email: '',
  password: '',
  confirmPassword: '',
  rol: '',
  terms: false,
  newsletter: false,
}

export default function RegisterPage() {
  const [form, setForm] = useState<RegisterData>(initialForm)
  const [showSuccess, setShowSuccess] = useState(false)
  const router = useRouter()

  const passwordStrength = useMemo(() => {
    let strength = 0
    if (form.password.length >= 8) strength += 1
    if (/[a-z]/.test(form.password) && /[A-Z]/.test(form.password)) strength += 1
    if (/[0-9]/.test(form.password)) strength += 1
    if (/[^a-zA-Z0-9]/.test(form.password)) strength += 1
    return strength
  }, [form.password])

  const passwordMatch = !form.confirmPassword || form.password === form.confirmPassword

  const onInputChange = (field: RegisterTextField, value: string) => {
    setForm((previous) => ({ ...previous, [field]: value }))
  }

  const onToggleChange = (field: 'terms' | 'newsletter', value: boolean) => {
    setForm((previous) => ({ ...previous, [field]: value }))
  }

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (form.password !== form.confirmPassword) {
      return
    }

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: form.nombre,
          email: form.email,
          password: form.password,
        }),
      })

      if (res.ok) {
        setShowSuccess(true)
        window.setTimeout(() => {
          router.push('/auth/login')
        }, 1500)
      } else {
        const data = await res.json()
        alert('Error en el registro: ' + data.message)
      }
    } catch (error) {
      console.error(error)
      alert('Error de conexión con el backend.')
    }
  }

  return (
    <div className="register-page">

      <div className="registro-container">
        <div className="registro-header">
          <div className="header-content">
            <h1>Únete a UrbanPulse</h1>
            <p>Crea tu cuenta y comienza a generar impacto en tu ciudad</p>
          </div>
        </div>

        <RegisterProgressSteps />

        <div className="form-content">
          <RegisterBenefits />
          <RegisterForm
            form={form}
            showSuccess={showSuccess}
            passwordStrength={passwordStrength}
            passwordMatch={passwordMatch}
            onSubmit={onSubmit}
            onInputChange={onInputChange}
            onToggleChange={onToggleChange}
          />
        </div>
      </div>

    </div>
  )
}
