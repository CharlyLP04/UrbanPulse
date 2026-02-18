'use client'

import Link from 'next/link'
import { FormEvent, useMemo, useState } from 'react'
import RegisterSimpleForm, { RegisterSimpleData } from './RegisterSimpleForm'
import RegisterSimpleHeader from './RegisterSimpleHeader'

const initialForm: RegisterSimpleData = {
  nombre: '',
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  terms: false,
}

export default function RegisterSimplePage() {
  const [form, setForm] = useState<RegisterSimpleData>(initialForm)
  const [showSuccess, setShowSuccess] = useState(false)

  const strength = useMemo(() => {
    let score = 0
    if (form.password.length >= 8) score += 1
    if (/[a-z]/.test(form.password) && /[A-Z]/.test(form.password)) score += 1
    if (/[0-9]/.test(form.password)) score += 1
    if (/[^a-zA-Z0-9]/.test(form.password)) score += 1
    return score
  }, [form.password])

  const passwordMatch = !form.confirmPassword || form.password === form.confirmPassword
  const isValid =
    form.nombre.length >= 3 &&
    form.username.length >= 3 &&
    form.email !== '' &&
    form.password.length >= 8 &&
    passwordMatch &&
    form.terms

  const onInputChange = (
    field: Exclude<keyof RegisterSimpleData, 'terms'>,
    value: string
  ) => {
    setForm((previous) => ({ ...previous, [field]: value }))
  }

  const onTermsChange = (value: boolean) => {
    setForm((previous) => ({ ...previous, terms: value }))
  }

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!passwordMatch) return
    setShowSuccess(true)
  }

  return (
    <div className="register-simple-page">
      <Link href="/public/index-wireframe" className="back-button">
        ← Inicio
      </Link>

      <div className="registro-wrapper">
        <RegisterSimpleHeader />

        <div className="registro-card">
          <RegisterSimpleForm
            form={form}
            showSuccess={showSuccess}
            strength={strength}
            passwordMatch={passwordMatch}
            isValid={isValid}
            onSubmit={onSubmit}
            onInputChange={onInputChange}
            onTermsChange={onTermsChange}
          />
        </div>
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=IBM+Plex+Sans:wght@400;500;600;700&display=swap');

        .register-simple-page {
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
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          position: relative;
        }

        .register-simple-page::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(45deg, var(--azul-institucional) 0%, var(--azul-medio) 100%);
          opacity: 0.05;
          z-index: 0;
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

        .registro-wrapper {
          width: 100%;
          max-width: 500px;
          position: relative;
          z-index: 1;
          animation: slideUp 0.6s ease;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .brand-header {
          background: linear-gradient(135deg, var(--azul-institucional) 0%, var(--azul-medio) 100%);
          color: var(--blanco);
          padding: 2.5rem 2rem;
          border-radius: 16px 16px 0 0;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .brand-header::before {
          content: '🏙️';
          position: absolute;
          font-size: 12rem;
          opacity: 0.08;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        .brand-content {
          position: relative;
          z-index: 1;
        }

        .brand-logo {
          font-family: 'Bebas Neue', cursive;
          font-size: 2.5rem;
          margin-bottom: 0.5rem;
          letter-spacing: 2px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
        }

        .brand-tagline {
          font-size: 1.1rem;
          opacity: 0.95;
          font-weight: 400;
        }

        .registro-card {
          background: var(--blanco);
          border-radius: 0 0 16px 16px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
        }

        .registro-form-container {
          padding: 2.5rem 2rem;
        }

        .form-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .form-header h2 {
          font-family: 'Bebas Neue', cursive;
          font-size: 2rem;
          color: var(--azul-institucional);
          margin-bottom: 0.5rem;
          letter-spacing: 1px;
        }

        .form-header p {
          color: var(--negro-carbon);
          opacity: 0.7;
          font-size: 0.95rem;
        }

        .registro-form {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
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

        .input-wrapper {
          position: relative;
        }

        .input-icon {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: var(--azul-medio);
          font-size: 1.2rem;
        }

        .form-group input {
          padding: 1rem 1rem 1rem 3rem;
          border: 2px solid var(--gris-azulado);
          border-radius: 8px;
          font-size: 1rem;
          font-family: 'IBM Plex Sans', sans-serif;
          transition: all 0.3s ease;
          background: var(--blanco);
          color: var(--negro-carbon);
          width: 100%;
        }

        .form-group input:focus {
          outline: none;
          border-color: var(--azul-medio);
          box-shadow: 0 0 0 3px rgba(50, 130, 184, 0.1);
        }

        .form-help {
          font-size: 0.85rem;
          color: var(--negro-carbon);
          opacity: 0.7;
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        .error-text {
          color: var(--rojo-institucional);
          font-size: 0.85rem;
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
          margin-top: 0.5rem;
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

        .btn-registro {
          background: var(--verde-estable);
          color: var(--blanco);
          padding: 1.1rem;
          border: none;
          border-radius: 8px;
          font-size: 1.1rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-top: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }

        .btn-registro:hover:not(:disabled) {
          background: #158f75;
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(27, 156, 133, 0.3);
        }

        .btn-registro:disabled {
          background: var(--gris-azulado);
          cursor: not-allowed;
          opacity: 0.6;
        }

        .divider {
          text-align: center;
          margin: 1.5rem 0;
          color: var(--negro-carbon);
          opacity: 0.5;
          position: relative;
          font-size: 0.9rem;
        }

        .divider::before,
        .divider::after {
          content: '';
          position: absolute;
          top: 50%;
          width: 42%;
          height: 1px;
          background: var(--gris-azulado);
        }

        .divider::before {
          left: 0;
        }

        .divider::after {
          right: 0;
        }

        .social-login {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .btn-social {
          background: var(--blanco);
          color: var(--negro-carbon);
          padding: 0.9rem;
          border: 2px solid var(--gris-azulado);
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          font-size: 0.95rem;
        }

        .btn-social:hover {
          border-color: var(--azul-medio);
          background: var(--gris-azulado);
          transform: translateY(-2px);
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

        @media (max-width: 768px) {
          .back-button {
            top: 1rem;
            left: 1rem;
            padding: 0.6rem 1rem;
            font-size: 0.9rem;
          }

          .brand-header {
            padding: 2rem 1.5rem;
          }

          .brand-logo {
            font-size: 2rem;
          }

          .registro-form-container {
            padding: 2rem 1.5rem;
          }
        }
      `}</style>
    </div>
  )
}
