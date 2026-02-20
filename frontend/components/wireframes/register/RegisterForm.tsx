import Link from 'next/link'
import { FormEvent } from 'react'
import { RegisterData, RegisterTextField } from './types'

type RegisterFormProps = {
  form: RegisterData
  showSuccess: boolean
  passwordStrength: number
  passwordMatch: boolean
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
  onInputChange: (field: RegisterTextField, value: string) => void
  onToggleChange: (field: 'terms' | 'newsletter', value: boolean) => void
}

export default function RegisterForm({
  form,
  showSuccess,
  passwordStrength,
  passwordMatch,
  onSubmit,
  onInputChange,
  onToggleChange,
}: RegisterFormProps) {
  return (
    <>
      <div className={`success-message ${showSuccess ? 'show' : ''}`}>
        ✅ ¡Registro exitoso! Revisa tu correo para verificar tu cuenta.
      </div>

      <form onSubmit={onSubmit}>
        <div className="form-section">
          <h2 className="section-title">Datos Personales</h2>

          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="nombre">
                Nombre Completo <span className="required">*</span>
              </label>
              <input
                type="text"
                id="nombre"
                placeholder="Juan Pérez García"
                required
                minLength={3}
                value={form.nombre}
                onChange={(event) => onInputChange('nombre', event.target.value)}
              />
              <span className="error-text">⚠️ El nombre debe tener al menos 3 caracteres</span>
            </div>

            <div className="form-group">
              <label htmlFor="telefono">
                Teléfono <span className="required">*</span>
              </label>
              <input
                type="tel"
                id="telefono"
                placeholder="222 123 4567"
                pattern="[0-9]{10}"
                required
                value={form.telefono}
                onChange={(event) => onInputChange('telefono', event.target.value)}
              />
              <span className="error-text">⚠️ Ingresa un teléfono válido de 10 dígitos</span>
              <span className="form-help">Formato: 10 dígitos sin espacios</span>
            </div>

            <div className="form-group">
              <label htmlFor="ciudad">
                Ciudad <span className="required">*</span>
              </label>
              <select
                id="ciudad"
                required
                value={form.ciudad}
                onChange={(event) => onInputChange('ciudad', event.target.value)}
              >
                <option value="">Selecciona tu ciudad</option>
                <option value="puebla">Puebla</option>
                <option value="cdmx">Ciudad de México</option>
                <option value="guadalajara">Guadalajara</option>
                <option value="monterrey">Monterrey</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="colonia">Colonia</label>
              <input
                type="text"
                id="colonia"
                placeholder="Centro Histórico"
                value={form.colonia}
                onChange={(event) => onInputChange('colonia', event.target.value)}
              />
              <span className="form-help">Opcional: Ayuda a mejorar la geolocalización</span>
            </div>
          </div>
        </div>

        <div className="form-section">
          <h2 className="section-title">Información de Cuenta</h2>

          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="email">
                Correo Electrónico <span className="required">*</span>
              </label>
              <input
                type="email"
                id="email"
                placeholder="tu@correo.com"
                required
                value={form.email}
                onChange={(event) => onInputChange('email', event.target.value)}
              />
              <span className="error-text">⚠️ Ingresa un correo electrónico válido</span>
            </div>

            <div className="form-group">
              <label htmlFor="password">
                Contraseña <span className="required">*</span>
              </label>
              <input
                type="password"
                id="password"
                placeholder="••••••••"
                required
                minLength={8}
                value={form.password}
                onChange={(event) => onInputChange('password', event.target.value)}
              />
              <div className="password-strength">
                {[0, 1, 2, 3].map((index) => (
                  <div
                    key={index}
                    className={`strength-bar ${index < passwordStrength ? 'active' : ''} ${
                      passwordStrength <= 2
                        ? 'weak'
                        : passwordStrength === 3
                          ? 'medium'
                          : 'strong'
                    }`}
                  />
                ))}
              </div>
              <span className="form-help">Mínimo 8 caracteres, incluye números y símbolos</span>
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">
                Confirmar Contraseña <span className="required">*</span>
              </label>
              <input
                type="password"
                id="confirmPassword"
                placeholder="••••••••"
                required
                value={form.confirmPassword}
                onChange={(event) => onInputChange('confirmPassword', event.target.value)}
              />
              <span
                className="error-text"
                id="passwordMatchError"
                style={{ display: passwordMatch ? 'none' : 'block' }}
              >
                ⚠️ Las contraseñas no coinciden
              </span>
            </div>

            <div className="form-group">
              <label htmlFor="rol">
                Tipo de Usuario <span className="required">*</span>
              </label>
              <select
                id="rol"
                required
                value={form.rol}
                onChange={(event) => onInputChange('rol', event.target.value)}
              >
                <option value="">Selecciona...</option>
                <option value="ciudadano">Ciudadano</option>
                <option value="organizacion">Organización Civil</option>
                <option value="verificador">Verificador Comunitario</option>
              </select>
              <span className="form-help">Los verificadores pueden validar reportes</span>
            </div>
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
            He leído y acepto los <Link href="#">Términos y Condiciones</Link> y el{' '}
            <Link href="#">Aviso de Privacidad</Link> de UrbanPulse <span className="required">*</span>
          </label>
        </div>

        <div className="checkbox-group">
          <input
            type="checkbox"
            id="newsletter"
            checked={form.newsletter}
            onChange={(event) => onToggleChange('newsletter', event.target.checked)}
          />
          <label htmlFor="newsletter">Deseo recibir actualizaciones y noticias sobre UrbanPulse</label>
        </div>

        <div className="form-actions">
          <Link href="/auth/login" className="btn btn-secondary">
            Cancelar
          </Link>
          <button type="submit" className="btn btn-primary">
            Crear Cuenta →
          </button>
        </div>
      </form>

      <div className="login-prompt">
        ¿Ya tienes una cuenta? <Link href="/auth/login">Inicia sesión aquí</Link>
      </div>
    </>
  )
}
