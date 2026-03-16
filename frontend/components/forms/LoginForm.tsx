'use client'

interface LoginFormProps {
  email: string
  password: string
  showError: boolean
  onEmailChange: (value: string) => void
  onPasswordChange: (value: string) => void
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
}

export function LoginForm({
  email,
  password,
  showError,
  onEmailChange,
  onPasswordChange,
  onSubmit
}: LoginFormProps) {
  return (
    <div className="login-form-container">
      <div className="form-header">
        <h2>Iniciar sesión</h2>
        <p>Accede a tu cuenta para gestionar reportes ciudadanos</p>
      </div>

      <form className="login-form" onSubmit={onSubmit} noValidate>

        <div className="form-group">
          <label htmlFor="email">Correo electrónico</label>
          <input
            id="email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            aria-invalid={showError}
            aria-describedby={showError ? "login-error" : undefined}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input
            id="password"
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => onPasswordChange(e.target.value)}
            aria-invalid={showError}
            aria-describedby={showError ? "login-error" : undefined}
          />
        </div>

        <div className="form-options">
          <label className="remember-me">
            <input type="checkbox" />
            Recordarme
          </label>

          <a href="#" className="forgot-password">
            ¿Olvidaste tu contraseña?
          </a>
        </div>

        {showError && (
          <div
            id="login-error"
            className="error-message show"
            role="alert"
            aria-live="assertive"
          >
            Credenciales inválidas. Verifique su correo y contraseña.
          </div>
        )}

        <button type="submit" className="btn-login">
          Iniciar sesión
        </button>

      </form>

      <div className="divider">o</div>

      <button className="btn-social">
        Continuar con Google
      </button>

      <div className="signup-prompt">
        ¿No tienes cuenta? <a href="/auth/register">Regístrate</a>
      </div>
    </div>
  )
}