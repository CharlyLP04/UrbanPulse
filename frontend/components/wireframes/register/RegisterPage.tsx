'use client'

import Link from 'next/link'
import { FormEvent, useMemo, useState } from 'react'
import RegisterBenefits from './RegisterBenefits'
import RegisterForm from './RegisterForm'
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

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (form.password !== form.confirmPassword) {
      return
    }

    setShowSuccess(true)
  }

  return (
    <div className="register-page">
      <Link href="/public/index-wireframe" className="back-button">
        ← Volver al Inicio
      </Link>

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

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=IBM+Plex+Sans:wght@400;500;600;700&display=swap');

        .register-page {
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
          padding: 2rem;
        }

        .back-button {
          position: fixed;
          top: 2rem;
          left: 2rem;
          background: var(--azul-medio);
          color: var(--blanco);
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 6px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          z-index: 10;
          text-decoration: none;
          display: inline-block;
        }

        .back-button:hover {
          background: var(--azul-institucional);
          transform: translateX(-5px);
        }

        .registro-container {
          max-width: 1200px;
          margin: 0 auto;
          background: var(--blanco);
          border-radius: 16px;
          box-shadow: 0 20px 60px rgba(26, 26, 29, 0.1);
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
          padding: 3rem 2rem;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .registro-header::before {
          content: '🏙️';
          position: absolute;
          font-size: 15rem;
          opacity: 0.05;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        .header-content {
          position: relative;
          z-index: 1;
        }

        .registro-header h1 {
          font-family: 'Bebas Neue', cursive;
          font-size: 3rem;
          margin-bottom: 0.5rem;
          letter-spacing: 2px;
        }

        .registro-header p {
          font-size: 1.2rem;
          opacity: 0.95;
        }

        .progress-steps {
          background: var(--gris-azulado);
          padding: 2rem;
          display: flex;
          justify-content: center;
          gap: 1rem;
        }

        .step {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .step-number {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: var(--blanco);
          color: var(--negro-carbon);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 1.2rem;
          border: 3px solid var(--gris-azulado);
          transition: all 0.3s ease;
        }

        .step.active .step-number {
          background: var(--azul-medio);
          color: var(--blanco);
          border-color: var(--azul-medio);
        }

        .step-label {
          font-weight: 600;
          color: var(--negro-carbon);
        }

        .step-arrow {
          color: var(--azul-medio);
          font-size: 1.5rem;
        }

        .form-content {
          padding: 3rem;
        }

        .form-section {
          margin-bottom: 2.5rem;
        }

        .section-title {
          font-family: 'Bebas Neue', cursive;
          font-size: 1.8rem;
          color: var(--azul-institucional);
          margin-bottom: 1rem;
          letter-spacing: 1px;
          padding-bottom: 0.5rem;
          border-bottom: 3px solid var(--verde-estable);
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
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
        }

        .required {
          color: var(--rojo-institucional);
        }

        .form-group input,
        .form-group select {
          padding: 1rem;
          border: 2px solid var(--gris-azulado);
          border-radius: 8px;
          font-size: 1rem;
          font-family: 'IBM Plex Sans', sans-serif;
          transition: all 0.3s ease;
          background: var(--blanco);
          color: var(--negro-carbon);
        }

        .form-group input:focus,
        .form-group select:focus {
          outline: none;
          border-color: var(--azul-medio);
          box-shadow: 0 0 0 3px rgba(50, 130, 184, 0.1);
        }

        .form-help {
          font-size: 0.85rem;
          color: var(--negro-carbon);
          opacity: 0.7;
        }

        .error-text {
          color: var(--rojo-institucional);
          font-size: 0.85rem;
          display: none;
        }

        .form-group input:invalid:not(:placeholder-shown) ~ .error-text {
          display: block;
        }

        .password-strength {
          display: flex;
          gap: 0.5rem;
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

        .checkbox-group {
          display: flex;
          align-items: start;
          gap: 0.75rem;
          padding: 1rem;
          background: var(--gris-azulado);
          border-radius: 8px;
          margin-top: 1rem;
        }

        .checkbox-group input[type='checkbox'] {
          width: 20px;
          height: 20px;
          cursor: pointer;
          margin-top: 0.2rem;
        }

        .checkbox-group label {
          font-size: 0.95rem;
          color: var(--negro-carbon);
          cursor: pointer;
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

        .benefits-section {
          background: var(--gris-azulado);
          padding: 2rem;
          border-radius: 12px;
          margin-bottom: 2rem;
        }

        .benefits-title {
          color: var(--azul-institucional);
          font-family: 'Bebas Neue', cursive;
          font-size: 1.5rem;
          letter-spacing: 1px;
        }

        .benefits-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
          margin-top: 1rem;
        }

        .benefit-card {
          background: var(--blanco);
          padding: 1.5rem;
          border-radius: 8px;
          border-left: 4px solid var(--verde-estable);
          transition: transform 0.3s ease;
        }

        .benefit-card:hover {
          transform: translateX(10px);
        }

        .benefit-icon {
          font-size: 2.5rem;
          margin-bottom: 0.5rem;
        }

        .benefit-title {
          font-weight: 700;
          color: var(--azul-institucional);
          margin-bottom: 0.5rem;
        }

        .benefit-description {
          color: var(--negro-carbon);
          font-size: 0.9rem;
          opacity: 0.8;
        }

        .form-actions {
          display: flex;
          gap: 1rem;
          justify-content: flex-end;
          padding-top: 2rem;
          border-top: 2px solid var(--gris-azulado);
        }

        .btn {
          padding: 1rem 2rem;
          border: none;
          border-radius: 8px;
          font-size: 1.1rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 0.5rem;
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

        .btn-primary:hover {
          background: #158f75;
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(27, 156, 133, 0.3);
        }

        .login-prompt {
          text-align: center;
          padding: 2rem;
          background: var(--gris-azulado);
          border-radius: 12px;
          margin-top: 2rem;
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

        .success-message {
          background: rgba(27, 156, 133, 0.1);
          color: var(--verde-estable);
          padding: 1.5rem;
          border-radius: 12px;
          border-left: 5px solid var(--verde-estable);
          display: none;
          margin-bottom: 2rem;
        }

        .success-message.show {
          display: block;
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
          .progress-steps {
            flex-direction: column;
            align-items: center;
          }

          .step-arrow {
            transform: rotate(90deg);
          }

          .form-content {
            padding: 2rem 1.5rem;
          }

          .form-actions {
            flex-direction: column;
          }

          .btn {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  )
}
