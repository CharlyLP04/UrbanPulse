import Link from 'next/link'
import { FormEvent } from 'react'

type LoginFormProps = {
  email: string
  password: string
  showError: boolean
  onEmailChange: (value: string) => void
  onPasswordChange: (value: string) => void
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
}

export default function LoginForm({
  email,
  password,
  showError,
  onEmailChange,
  onPasswordChange,
  onSubmit,
}: LoginFormProps) {
  return (
    <div className="login-form-container">
      <div className="form-header">
        <h2>Iniciar Sesión</h2>
        <p>Bienvenido de vuelta a UrbanPulse</p>
      </div>

      <div className={`error-message ${showError ? 'show' : ''}`}>
        ⚠️ Credenciales incorrectas. Por favor, verifica tus datos.
      </div>

      <form className="login-form" onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="email">Correo Electrónico</label>
          <input
            type="email"
            id="email"
            placeholder="tu@correo.com"
            required
            value={email}
            onChange={(event) => onEmailChange(event.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            placeholder="••••••••"
            required
            value={password}
            onChange={(event) => onPasswordChange(event.target.value)}
          />
        </div>

        <div className="form-options">
          <label className="remember-me">
            <input type="checkbox" id="remember" />
            Recordarme
          </label>
          <Link href="#" className="forgot-password">
            ¿Olvidaste tu contraseña?
          </Link>
        </div>

        <button type="submit" className="btn-login">
          Iniciar Sesión
        </button>
      </form>

      <div className="divider">o</div>

      <button type="button" className="btn-social">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            fill="#4285F4"
          />
          <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
          />
          <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            fill="#FBBC05"
          />
          <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="#EA4335"
          />
        </svg>
        Continuar con Google
      </button>

      <div className="signup-prompt">
        ¿No tienes cuenta? <Link href="/auth/register">Regístrate aquí</Link>
      </div>
    </div>
  )
}
