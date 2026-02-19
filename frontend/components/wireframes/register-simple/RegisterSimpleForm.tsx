import Link from 'next/link'
import { FormEvent } from 'react'

export type RegisterSimpleData = {
  nombre: string
  username: string
  email: string
  password: string
  confirmPassword: string
  terms: boolean
}

type RegisterSimpleFormProps = {
  form: RegisterSimpleData
  showSuccess: boolean
  strength: number
  passwordMatch: boolean
  isValid: boolean
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
  onInputChange: (
    field: Exclude<keyof RegisterSimpleData, 'terms'>,
    value: string
  ) => void
  onTermsChange: (value: boolean) => void
}

export default function RegisterSimpleForm({
  form,
  showSuccess,
  strength,
  passwordMatch,
  isValid,
  onSubmit,
  onInputChange,
  onTermsChange,
}: RegisterSimpleFormProps) {
  return (
    <div className="registro-form-container">
      <div className="form-header">
        <h2>Crear Cuenta</h2>
        <p>Es rápido, solo te tomará un minuto</p>
      </div>

      <div className={`success-message ${showSuccess ? 'show' : ''}`}>
        <span>✅</span>
        <span>¡Cuenta creada! Revisa tu correo para verificarla.</span>
      </div>

      <form className="registro-form" onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="nombre">
            Nombre Completo <span className="required">*</span>
          </label>
          <div className="input-wrapper">
            <span className="input-icon">👤</span>
            <input
              type="text"
              id="nombre"
              placeholder="Juan Pérez García"
              required
              minLength={3}
              autoComplete="name"
              value={form.nombre}
              onChange={(event) => onInputChange('nombre', event.target.value)}
            />
          </div>
          <span className="error-text">⚠️ Ingresa tu nombre completo (mínimo 3 caracteres)</span>
        </div>

        <div className="form-group">
          <label htmlFor="username">
            Nombre de Usuario <span className="required">*</span>
          </label>
          <div className="input-wrapper">
            <span className="input-icon">@</span>
            <input
              type="text"
              id="username"
              placeholder="juanperez"
              required
              minLength={3}
              pattern="[a-zA-Z0-9_]+"
              autoComplete="username"
              value={form.username}
              onChange={(event) => onInputChange('username', event.target.value)}
            />
          </div>
          <span className="form-help">💡 Solo letras, números y guión bajo</span>
          <span className="error-text">⚠️ Usuario inválido (min. 3 caracteres, sin espacios)</span>
        </div>

        <div className="form-group">
          <label htmlFor="email">
            Correo Electrónico <span className="required">*</span>
          </label>
          <div className="input-wrapper">
            <span className="input-icon">📧</span>
            <input
              type="email"
              id="email"
              placeholder="tu@correo.com"
              required
              autoComplete="email"
              value={form.email}
              onChange={(event) => onInputChange('email', event.target.value)}
            />
          </div>
          <span className="error-text">⚠️ Ingresa un correo electrónico válido</span>
        </div>

        <div className="form-group">
          <label htmlFor="password">
            Contraseña <span className="required">*</span>
          </label>
          <div className="input-wrapper">
            <span className="input-icon">🔒</span>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              required
              minLength={8}
              autoComplete="new-password"
              value={form.password}
              onChange={(event) => onInputChange('password', event.target.value)}
            />
          </div>
          <div className="password-strength" id="strengthBars">
            {[0, 1, 2, 3].map((index) => (
              <div
                key={index}
                className={`strength-bar ${index < strength ? 'active' : ''} ${
                  strength <= 2 ? 'weak' : strength === 3 ? 'medium' : 'strong'
                }`}
              />
            ))}
          </div>
          <div className="strength-label">
            {form.password.length === 0
              ? 'Mínimo 8 caracteres'
              : strength <= 1
                ? 'Muy débil'
                : strength === 2
                  ? 'Débil'
                  : strength === 3
                    ? 'Aceptable'
                    : 'Fuerte'}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">
            Confirmar Contraseña <span className="required">*</span>
          </label>
          <div className="input-wrapper">
            <span className="input-icon">🔒</span>
            <input
              type="password"
              id="confirmPassword"
              placeholder="••••••••"
              required
              autoComplete="new-password"
              value={form.confirmPassword}
              onChange={(event) => onInputChange('confirmPassword', event.target.value)}
            />
          </div>
          <span
            className="error-text"
            id="passwordMatchError"
            style={{ display: passwordMatch ? 'none' : 'flex' }}
          >
            ⚠️ Las contraseñas no coinciden
          </span>
        </div>

        <div className="checkbox-group">
          <input
            type="checkbox"
            id="terms"
            required
            checked={form.terms}
            onChange={(event) => onTermsChange(event.target.checked)}
          />
          <label htmlFor="terms">
            Acepto los <Link href="#">Términos y Condiciones</Link> y el{' '}
            <Link href="#">Aviso de Privacidad</Link>
          </label>
        </div>

        <button type="submit" className="btn-registro" id="btnSubmit" disabled={!isValid}>
          <span>Crear Cuenta</span>
          <span>→</span>
        </button>
      </form>

      <div className="divider">o regístrate con</div>

      <div className="social-login">
        <button type="button" className="btn-social">
          <span>Google</span>
        </button>
        <button type="button" className="btn-social">
          <span>Facebook</span>
        </button>
      </div>

      <div className="login-prompt">
        ¿Ya tienes cuenta? <Link href="/auth/login">Inicia sesión</Link>
      </div>
    </div>
  )
}
