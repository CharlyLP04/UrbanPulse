import { render, screen, fireEvent } from '@testing-library/react'
import { LoginForm } from '@/components/forms/LoginForm'

describe('LoginForm Component', () => {
  test('renders login form correctly when not in verification mode', () => {
    render(<LoginForm />)

    expect(screen.getByRole('heading', { name: /INICIAR SESIÓN/i })).toBeInTheDocument()
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Iniciar sesión/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Continuar con Google/i })).toBeInTheDocument()
  })

  test('renders verification code input when requiresVerification is true', () => {
    const mockVerify = jest.fn((e) => e.preventDefault())
    
    render(<LoginForm requiresVerification={true} onVerify={mockVerify} verificationCode="123456" />)

    expect(screen.getByRole('heading', { name: /VERIFICACIÓN/i })).toBeInTheDocument()
    expect(screen.getByLabelText(/Código de 6 dígitos/i)).toBeInTheDocument()
    expect(screen.getByDisplayValue('123456')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Verificar y Entrar/i })).toBeInTheDocument()
  })

  test('calls onSubmit when login form is submitted', () => {
    const mockSubmit = jest.fn((e) => e.preventDefault())
    render(<LoginForm email="test@test.com" password="password123" onSubmit={mockSubmit} />)

    const form = screen.getByRole('button', { name: /Iniciar sesión/i }).closest('form')
    fireEvent.submit(form!)

    expect(mockSubmit).toHaveBeenCalledTimes(1)
  })

  test('shows error alert when showError is true in normal mode', () => {
    render(<LoginForm showError={true} />)
    expect(screen.getByRole('alert')).toHaveTextContent(/Credenciales inválidas o cuenta no verificada/i)
  })

  test('shows error alert when showError is true in verification mode', () => {
    render(<LoginForm requiresVerification={true} showError={true} />)
    expect(screen.getByRole('alert')).toHaveTextContent(/Código inválido o expirado/i)
  })
})
