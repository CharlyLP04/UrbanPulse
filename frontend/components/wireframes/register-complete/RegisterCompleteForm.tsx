import Link from 'next/link'
import { FormEvent } from 'react'

export type RegisterCompleteData = {
  nombre: string
  username: string
  email: string
  telefono: string
  ciudad: string
  colonia: string
  password: string
  confirmPassword: string
  newsletter: boolean
  terms: boolean
}

type RegisterCompleteFormProps = {
  form: RegisterCompleteData
  showSuccess: boolean
  strength: number
  matches: boolean
  canSubmit: boolean
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
  onInputChange: (
    field: Exclude<keyof RegisterCompleteData, 'newsletter' | 'terms'>,
    value: string
  ) => void
  onToggleChange: (field: 'newsletter' | 'terms', value: boolean) => void
}

export default function RegisterCompleteForm({
  form,
  showSuccess,
  strength,
  matches,
  canSubmit,
  onSubmit,
  onInputChange,
  onToggleChange,
}: RegisterCompleteFormProps) {
  return (
    <div className="form-container">
      <div className={`success-message ${showSuccess ? 'show' : ''}`}>
        <span>✅</span>
        <span>¡Cuenta creada exitosamente! Revisa tu correo.</span>
      </div>

      <form onSubmit={onSubmit}>
        <h3 className="section-title">Datos Personales</h3>
        <div className="form-grid">
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
            <span className="error-text">⚠️ Mínimo 3 caracteres</span>
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
            <span className="error-text">⚠️ Solo letras, números y _</span>
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
            <span className="error-text">⚠️ Email inválido</span>
          </div>

          <div className="form-group">
            <label htmlFor="telefono">
              Teléfono <span className="optional">(Opcional)</span>
            </label>
            <div className="input-wrapper">
              <span className="input-icon">📱</span>
              <input
                type="tel"
                id="telefono"
                placeholder="222 123 4567"
                pattern="[0-9]{10}"
                autoComplete="tel"
                value={form.telefono}
                onChange={(event) => onInputChange('telefono', event.target.value)}
              />
            </div>
            <span className="form-help">💡 10 dígitos sin espacios</span>
          </div>
        </div>

        <h3 className="section-title">Ubicación</h3>
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="ciudad">
              Ciudad <span className="optional">(Opcional)</span>
            </label>
            <div className="input-wrapper">
              <span className="input-icon">🏙️</span>
              <select
                id="ciudad"
                value={form.ciudad}
                onChange={(event) => onInputChange('ciudad', event.target.value)}
              >
                <option value="">Selecciona tu ciudad</option>
                <option value="puebla">Puebla</option>
                <option value="cdmx">Ciudad de México</option>
                <option value="guadalajara">Guadalajara</option>
                <option value="monterrey">Monterrey</option>
                <option value="queretaro">Querétaro</option>
                <option value="otra">Otra</option>
              </select>
            </div>
            <span className="form-help">💡 Ayuda a filtrar reportes locales</span>
          </div>

          <div className="form-group">
            <label htmlFor="colonia">
              Colonia <span className="optional">(Opcional)</span>
            </label>
            <div className="input-wrapper">
              <span className="input-icon">📍</span>
              <input
                type="text"
                id="colonia"
                placeholder="Centro Histórico"
                value={form.colonia}
                onChange={(event) => onInputChange('colonia', event.target.value)}
              />
            </div>
          </div>
        </div>

        <h3 className="section-title">Seguridad</h3>
        <div className="form-grid">
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
            <div className="password-strength">
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
              {form.password.length > 0
                ? strength <= 1
                  ? 'Muy débil'
                  : strength === 2
                    ? 'Débil'
                    : strength === 3
                      ? 'Aceptable'
                      : 'Fuerte'
                : 'Mínimo 8 caracteres'}
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
            <span className="error-text" style={{ display: matches ? 'none' : 'flex' }}>
              ⚠️ No coinciden
            </span>
          </div>
        </div>

        <div className="checkbox-group">
          <input
            type="checkbox"
            id="terms"
            required
            checked={form.terms}
            onChange={(event) => onToggleChange('terms', event.target.checked)}
          />
          <label htmlFor="terms">
            Acepto los <Link href="#">Términos y Condiciones</Link> y el{' '}
            <Link href="#">Aviso de Privacidad</Link> de UrbanPulse
          </label>
        </div>

        <div className="checkbox-group">
          <input
            type="checkbox"
            id="newsletter"
            checked={form.newsletter}
            onChange={(event) => onToggleChange('newsletter', event.target.checked)}
          />
          <label htmlFor="newsletter">Deseo recibir actualizaciones y noticias de UrbanPulse</label>
        </div>

        <div className="form-actions">
          <Link href="/auth/login" className="btn btn-secondary">
            Cancelar
          </Link>
          <button type="submit" className="btn btn-primary" id="btnSubmit" disabled={!canSubmit}>
            <span>Crear Cuenta</span>
            <span>→</span>
          </button>
        </div>
      </form>

      <div className="login-prompt">
        ¿Ya tienes cuenta? <Link href="/auth/login">Inicia sesión aquí</Link>
      </div>
    </div>
  )
}
