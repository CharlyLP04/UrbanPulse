import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { Navbar } from '../../components/layout/Navbar'

jest.mock('next/navigation', () => ({
  usePathname: () => '/',
}))

jest.mock('@/components/providers/auth-provider', () => ({
  useAuth: jest.fn().mockReturnValue({ user: null, logout: jest.fn() }),
}))

describe('Navbar Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('renders all navigation links', () => {
    render(<Navbar />)
    expect(screen.getByText('Inicio')).toBeInTheDocument()
    expect(screen.getByText('Explorar')).toBeInTheDocument()
    expect(screen.getByText('Login')).toBeInTheDocument()
  })

  test('links are keyboard accessible', () => {
    render(<Navbar />)
    const links = screen.getAllByRole('link')
    expect(links).toHaveLength(4) // Inicio, Explorar, Login + Logo
    
    links.slice(1).forEach(link => {
      expect(link).toHaveAttribute('tabIndex', '0')
    })
  })

  test('navigation has proper ARIA labels', () => {
    render(<Navbar />)
    const nav = screen.getByRole('navigation')
    expect(nav).toHaveAttribute('aria-label', 'Navegación principal')
    expect(nav).toHaveAttribute('role', 'navigation')
  })

  test('links have correct href attributes', () => {
    render(<Navbar />)
    expect(screen.getByText('Inicio')).toHaveAttribute('href', '/')
    expect(screen.getByText('Explorar')).toHaveAttribute('href', '/public/explore')
    expect(screen.getByText('Login')).toHaveAttribute('href', '/auth/login')
  })

  test('can navigate links with keyboard', async () => {
    const user = userEvent.setup()
    render(<Navbar />)
    const links = screen.getAllByRole('link')
    links[1].focus() // Inicio
    expect(links[1]).toHaveFocus()
    await user.tab() // Avanza al siguiente enlace: Explorar
    expect(links[2]).toHaveFocus()
  })

  test('component structure is semantically correct', () => {
    const { container } = render(<Navbar />)
    expect(container.querySelector('nav')).toBeInTheDocument()
    expect(container.querySelector('ul')).toBeInTheDocument()
    expect(container.querySelectorAll('li')).toHaveLength(3) // Inicio, Explorar, Login
    expect(container.querySelectorAll('a')).toHaveLength(4) // Logo + los 3 enlaces
  })

  test('no accessibility violations', async () => {
    const { container } = render(<Navbar />)
    const results = await import('axe-core').then(axe =>
      axe.run(container)
    )
    expect(results.violations).toHaveLength(0)
  })
})
