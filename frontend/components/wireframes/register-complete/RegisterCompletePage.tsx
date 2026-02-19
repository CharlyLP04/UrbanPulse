'use client'

import Link from 'next/link'
import { FormEvent, useMemo, useState } from 'react'
import RegisterCompleteForm, { RegisterCompleteData } from './RegisterCompleteForm'
import RegisterCompleteHeader from './RegisterCompleteHeader'

const initialForm: RegisterCompleteData = {
  nombre: '',
  username: '',
  email: '',
  telefono: '',
  ciudad: '',
  colonia: '',
  password: '',
  confirmPassword: '',
  newsletter: false,
  terms: false,
}

export default function RegisterCompletePage() {
  const [form, setForm] = useState<RegisterCompleteData>(initialForm)
  const [showSuccess, setShowSuccess] = useState(false)

  const strength = useMemo(() => {
    let score = 0
    if (form.password.length >= 8) score += 1
    if (/[a-z]/.test(form.password) && /[A-Z]/.test(form.password)) score += 1
    if (/[0-9]/.test(form.password)) score += 1
    if (/[^a-zA-Z0-9]/.test(form.password)) score += 1
    return score
  }, [form.password])

  const matches = !form.confirmPassword || form.password === form.confirmPassword
  const canSubmit =
    form.nombre.trim() !== '' &&
    form.username.trim() !== '' &&
    form.email.trim() !== '' &&
    form.password.trim() !== '' &&
    form.confirmPassword.trim() !== '' &&
    form.terms &&
    matches

  const onInputChange = (
    field: Exclude<keyof RegisterCompleteData, 'newsletter' | 'terms'>,
    value: string
  ) => {
    setForm((previous) => ({ ...previous, [field]: value }))
  }

  const onToggleChange = (field: 'newsletter' | 'terms', value: boolean) => {
    setForm((previous) => ({ ...previous, [field]: value }))
  }

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!matches) return
    setShowSuccess(true)
  }

  return (
    <div className="register-complete-page">
      <Link href="/public/index-wireframe" className="back-button">
        ← Inicio
      </Link>

      <div className="registro-container">
        <RegisterCompleteHeader />
        <RegisterCompleteForm
          form={form}
          showSuccess={showSuccess}
          strength={strength}
          matches={matches}
          canSubmit={canSubmit}
          onSubmit={onSubmit}
          onInputChange={onInputChange}
          onToggleChange={onToggleChange}
        />
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=IBM+Plex+Sans:wght@400;500;600;700&display=swap');

        .register-complete-page {
          --azul-institucional: #0f4c75;
          --azul-medio: #3282b8;
          --verde-estable: #1b9c85;
          --rojo-institucional: #e74646;
          --gris-azulado: #e8eef1;
          --negro-carbon: #1a1a1d;
          --blanco: #ffffff;
          font-family: 'IBM Plex Sans', sans-serif;
          background: var(--gris-azulado);
          min-height: 100vh;
          padding: 1rem;
        }

        .back-button {
          position: fixed;
          top: 1.5rem;
          left: 1.5rem;
          background: var(--blanco);
          color: var(--azul-institucional);
          padding: 0.75rem 1.5rem;
          border: 2px solid var(--azul-institucional);
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          z-index: 100;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          box-shadow: 0 4px 12px rgba(15, 76, 117, 0.15);
        }

        .back-button:hover {
          background: var(--azul-institucional);
          color: var(--blanco);
          transform: translateX(-5px);
        }

        .registro-container {
          max-width: 800px;
          margin: 2rem auto;
          background: var(--blanco);
          border-radius: 16px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          animation: fadeIn 0.6s ease;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .registro-header {
          background: linear-gradient(135deg, var(--azul-institucional) 0%, var(--azul-medio) 100%);
          color: var(--blanco);
          padding: 2.5rem 2rem;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .registro-header::before {
          content: '🏙️';
          position: absolute;
          font-size: 10rem;
          opacity: 0.08;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        .header-content {
          position: relative;
          z-index: 1;
        }

        .header-content h1 {
          font-family: 'Bebas Neue', cursive;
          font-size: 2.5rem;
          margin-bottom: 0.5rem;
          letter-spacing: 2px;
        }

        .header-content p {
          font-size: 1.1rem;
          opacity: 0.95;
        }

        .form-container {
          padding: 2.5rem 2rem;
        }

        .success-message {
          background: rgba(27, 156, 133, 0.1);
          color: var(--verde-estable);
          padding: 1rem;
          border-radius: 8px;
          border-left: 4px solid var(--verde-estable);
          display: none;
          margin-bottom: 1.5rem;
          align-items: center;
          gap: 0.5rem;
        }

        .success-message.show {
          display: flex;
          animation: slideDown 0.5s ease;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .section-title {
          font-family: 'Bebas Neue', cursive;
          font-size: 1.5rem;
          color: var(--azul-institucional);
          margin-bottom: 1rem;
          padding-bottom: 0.5rem;
          border-bottom: 2px solid var(--verde-estable);
          letter-spacing: 1px;
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.25rem;
          margin-bottom: 2rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .form-group label {
          color: var(--negro-carbon);
          font-weight: 600;
          font-size: 0.95rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .required {
          color: var(--rojo-institucional);
        }

        .optional {
          color: var(--azul-medio);
          font-weight: 400;
          font-size: 0.8rem;
        }

        .input-wrapper {
          position: relative;
        }

        .input-icon {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: var(--azul-medio);
          font-size: 1.1rem;
        }

        .form-group input,
        .form-group select {
          padding: 0.9rem 0.9rem 0.9rem 2.75rem;
          border: 2px solid var(--gris-azulado);
          border-radius: 8px;
          font-size: 0.95rem;
          font-family: 'IBM Plex Sans', sans-serif;
          transition: all 0.3s ease;
          background: var(--blanco);
          color: var(--negro-carbon);
          width: 100%;
        }

        .form-group select {
          cursor: pointer;
        }

        .form-group input:focus,
        .form-group select:focus {
          outline: none;
          border-color: var(--azul-medio);
          box-shadow: 0 0 0 3px rgba(50, 130, 184, 0.1);
        }

        .form-help {
          font-size: 0.8rem;
          color: var(--negro-carbon);
          opacity: 0.7;
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        .error-text {
          color: var(--rojo-institucional);
          font-size: 0.8rem;
          display: none;
          align-items: center;
          gap: 0.4rem;
        }

        .form-group input:invalid:not(:placeholder-shown) ~ .error-text {
          display: flex;
        }

        .password-strength {
          display: flex;
          gap: 0.4rem;
          margin-top: 0.5rem;
        }

        .strength-bar {
          height: 4px;
          flex: 1;
          background: var(--gris-azulado);
          border-radius: 2px;
          transition: background 0.3s ease;
        }

        .strength-bar.active.weak {
          background: var(--rojo-institucional);
        }

        .strength-bar.active.medium {
          background: #ffa94d;
        }

        .strength-bar.active.strong {
          background: var(--verde-estable);
        }

        .strength-label {
          font-size: 0.8rem;
          color: var(--negro-carbon);
          opacity: 0.7;
          margin-top: 0.3rem;
        }

        .checkbox-group {
          display: flex;
          align-items: start;
          gap: 0.75rem;
          padding: 1rem;
          background: var(--gris-azulado);
          border-radius: 8px;
          margin-bottom: 1rem;
        }

        .checkbox-group input[type='checkbox'] {
          width: 20px;
          height: 20px;
          cursor: pointer;
          margin-top: 0.2rem;
          accent-color: var(--azul-medio);
        }

        .checkbox-group label {
          font-size: 0.9rem;
          color: var(--negro-carbon);
          cursor: pointer;
          font-weight: 400;
        }

        .checkbox-group a {
          color: var(--azul-medio);
          text-decoration: none;
          font-weight: 600;
        }

        .checkbox-group a:hover {
          color: var(--azul-institucional);
          text-decoration: underline;
        }

        .form-actions {
          display: flex;
          gap: 1rem;
          margin-top: 2rem;
        }

        .btn {
          padding: 1rem 2rem;
          border: none;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          flex: 1;
          text-decoration: none;
        }

        .btn-secondary {
          background: var(--blanco);
          color: var(--azul-medio);
          border: 2px solid var(--azul-medio);
        }

        .btn-secondary:hover {
          background: var(--azul-medio);
          color: var(--blanco);
        }

        .btn-primary {
          background: var(--verde-estable);
          color: var(--blanco);
        }

        .btn-primary:hover:not(:disabled) {
          background: #158f75;
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(27, 156, 133, 0.3);
        }

        .btn-primary:disabled {
          background: var(--gris-azulado);
          cursor: not-allowed;
          opacity: 0.6;
        }

        .login-prompt {
          text-align: center;
          margin-top: 2rem;
          padding-top: 2rem;
          border-top: 1px solid var(--gris-azulado);
          color: var(--negro-carbon);
        }

        .login-prompt a {
          color: var(--azul-institucional);
          text-decoration: none;
          font-weight: 700;
        }

        .login-prompt a:hover {
          color: var(--azul-medio);
          text-decoration: underline;
        }

        @media (max-width: 768px) {
          .registro-container {
            margin: 1rem auto;
          }

          .form-grid {
            grid-template-columns: 1fr;
          }

          .form-container {
            padding: 2rem 1.5rem;
          }

          .form-actions {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  )
}
