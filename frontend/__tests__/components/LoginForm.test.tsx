import { render, screen } from '@testing-library/react'
import { LoginForm } from '../../components/forms/LoginForm'



describe('LoginForm Component', () => {
  test('renders login form correctly', () => {
    render(<LoginForm />)

    expect(screen.getByRole('heading', { name: 'Iniciar sesión' })).toBeInTheDocument()
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByLabelText('Password')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Iniciar sesión' })).toBeInTheDocument()
  })
})
