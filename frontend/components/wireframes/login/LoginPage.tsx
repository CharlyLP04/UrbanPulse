'use client'

import Link from 'next/link'
import { FormEvent, useState } from 'react'
import LoginBranding from './LoginBranding'
import LoginForm from './LoginForm'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showError, setShowError] = useState(false)

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (email === 'demo@urbanpulse.com' && password === 'demo123') {
      setShowError(false)
      return
    }

    setShowError(true)
    window.setTimeout(() => setShowError(false), 3000)
  }

  return (
    <div className="login-page">
      <Link href="/public/index-wireframe" className="back-button">
        ← Volver al Inicio
      </Link>

      <div className="login-container">
        <LoginBranding />
        <LoginForm
          email={email}
          password={password}
          showError={showError}
          onEmailChange={setEmail}
          onPasswordChange={setPassword}
          onSubmit={onSubmit}
        />
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=IBM+Plex+Sans:wght@400;500;600;700&display=swap');

        .login-page {
          --azul-institucional: #0f4c75;
          --azul-medio: #3282b8;
          --verde-estable: #1b9c85;
          --rojo-institucional: #e74646;
          --gris-azulado: #e8eef1;
          --negro-carbon: #1a1a1d;
          --blanco: #ffffff;
          font-family: 'IBM Plex Sans', sans-serif;
          background: linear-gradient(135deg, var(--azul-institucional) 0%, var(--azul-medio) 100%);
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          position: relative;
          overflow: hidden;
        }

        .login-page::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle, rgba(255, 255, 255, 0.08) 0%, transparent 65%);
          opacity: 0.4;
        }

        .login-container {
          background: var(--blanco);
          border-radius: 16px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          overflow: hidden;
          display: grid;
          grid-template-columns: 1fr 1fr;
          max-width: 1000px;
          width: 100%;
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

        .login-branding {
          background: linear-gradient(135deg, var(--azul-institucional) 0%, var(--azul-medio) 100%);
          color: var(--blanco);
          padding: 4rem 3rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }

        .login-branding::before {
          content: '🏙️';
          position: absolute;
          font-size: 20rem;
          opacity: 0.05;
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
          font-size: 3rem;
          margin-bottom: 1rem;
          letter-spacing: 2px;
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .brand-tagline {
          font-size: 1.3rem;
          margin-bottom: 2rem;
          opacity: 0.95;
          font-weight: 500;
        }

        .brand-features {
          list-style: none;
          margin-top: 3rem;
          padding: 0;
        }

        .brand-features li {
          padding: 1rem 0;
          padding-left: 2rem;
          position: relative;
          font-size: 1.05rem;
          opacity: 0.9;
        }

        .brand-features li::before {
          content: '✓';
          position: absolute;
          left: 0;
          color: var(--verde-estable);
          font-weight: bold;
          font-size: 1.3rem;
        }

        .login-form-container {
          padding: 4rem 3rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          background: var(--blanco);
        }

        .form-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .form-header h2 {
          font-family: 'Bebas Neue', cursive;
          font-size: 2.5rem;
          color: var(--azul-institucional);
          margin-bottom: 0.5rem;
          letter-spacing: 1px;
        }

        .form-header p {
          color: var(--negro-carbon);
          opacity: 0.7;
        }

        .login-form {
          display: flex;
          flex-direction: column;
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

        .form-group input {
          padding: 1rem;
          border: 2px solid var(--gris-azulado);
          border-radius: 8px;
          font-size: 1rem;
          font-family: 'IBM Plex Sans', sans-serif;
          transition: all 0.3s ease;
          background: var(--blanco);
          color: var(--negro-carbon);
        }

        .form-group input:focus {
          outline: none;
          border-color: var(--azul-medio);
          box-shadow: 0 0 0 3px rgba(50, 130, 184, 0.1);
        }

        .form-options {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.9rem;
        }

        .remember-me {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--negro-carbon);
        }

        .remember-me input[type='checkbox'] {
          width: 18px;
          height: 18px;
          cursor: pointer;
        }

        .forgot-password {
          color: var(--azul-medio);
          text-decoration: none;
          font-weight: 500;
          transition: color 0.3s ease;
        }

        .forgot-password:hover {
          color: var(--azul-institucional);
          text-decoration: underline;
        }

        .btn-login {
          background: var(--verde-estable);
          color: var(--blanco);
          padding: 1rem;
          border: none;
          border-radius: 8px;
          font-size: 1.1rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-top: 1rem;
        }

        .btn-login:hover {
          background: #158f75;
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(27, 156, 133, 0.3);
        }

        .divider {
          text-align: center;
          margin: 1.5rem 0;
          color: var(--negro-carbon);
          opacity: 0.5;
          position: relative;
        }

        .divider::before,
        .divider::after {
          content: '';
          position: absolute;
          top: 50%;
          width: 40%;
          height: 1px;
          background: var(--gris-azulado);
        }

        .divider::before {
          left: 0;
        }

        .divider::after {
          right: 0;
        }

        .btn-social {
          background: var(--blanco);
          color: var(--negro-carbon);
          padding: 1rem;
          border: 2px solid var(--gris-azulado);
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
        }

        .btn-social:hover {
          border-color: var(--azul-medio);
          background: var(--gris-azulado);
        }

        .signup-prompt {
          text-align: center;
          margin-top: 2rem;
          color: var(--negro-carbon);
        }

        .signup-prompt a {
          color: var(--azul-institucional);
          text-decoration: none;
          font-weight: 700;
          transition: color 0.3s ease;
        }

        .signup-prompt a:hover {
          color: var(--azul-medio);
          text-decoration: underline;
        }

        .error-message {
          background: rgba(231, 70, 70, 0.1);
          color: var(--rojo-institucional);
          padding: 1rem;
          border-radius: 8px;
          border-left: 4px solid var(--rojo-institucional);
          font-size: 0.9rem;
          display: none;
        }

        .error-message.show {
          display: block;
          animation: shake 0.5s;
        }

        @keyframes shake {
          0%,
          100% {
            transform: translateX(0);
          }
          25% {
            transform: translateX(-10px);
          }
          75% {
            transform: translateX(10px);
          }
        }

        .back-button {
          position: absolute;
          top: 2rem;
          left: 2rem;
          background: rgba(255, 255, 255, 0.2);
          color: var(--blanco);
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 6px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
          z-index: 10;
          text-decoration: none;
          display: inline-block;
        }

        .back-button:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: translateX(-5px);
        }

        .back-button:focus-visible,
        .btn-login:focus-visible,
        .btn-social:focus-visible,
        .forgot-password:focus-visible {
          outline: 3px solid var(--blanco);
          outline-offset: 2px;
        }

        @media (max-width: 768px) {
          .login-container {
            grid-template-columns: 1fr;
          }

          .login-branding {
            display: none;
          }

          .login-form-container {
            padding: 2rem 1.5rem;
          }
        }
      `}</style>
    </div>
  )
}
