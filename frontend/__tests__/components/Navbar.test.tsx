import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { Navbar } from '../../components/layout/Navbar'

// Mock next/navigation
jest.mock('next/navigation', () => ({
  usePathname: () => '/',
}))

describe('Navbar Component', () => {
  beforeEach(() => {
    // Clear mocks before each test
    jest.clearAllMocks()
  })

  test('renders all navigation links', () => {
    render(<Navbar />)
    
    // Verify all expected navigation items are present
    expect(screen.getByText('Inicio')).toBeInTheDocument()
    expect(screen.getByText('Explorar')).toBeInTheDocument()
    expect(screen.getByText('Login')).toBeInTheDocument()
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
  })

  test('links are keyboard accessible', () => {
    render(<Navbar />)
    
    const links = screen.getAllByRole('link')
    expect(links).toHaveLength(4)
    
    // Verify all links have tabIndex={0} for keyboard navigation
    links.forEach(link => {
      expect(link).toHaveAttribute('tabIndex', '0')
    })
  })

  test('navigation has proper ARIA labels', () => {
    render(<Navbar />)
    
    // Verify the navigation element has proper ARIA labeling
    const nav = screen.getByRole('navigation')
    expect(nav).toHaveAttribute('aria-label', 'Navegación principal')
    expect(nav).toHaveAttribute('role', 'navigation')
  })

  test('links have correct href attributes', () => {
    render(<Navbar />)
    
    const homeLink = screen.getByText('Inicio')
    const exploreLink = screen.getByText('Explorar')
    const loginLink = screen.getByText('Login')
    const dashboardLink = screen.getByText('Dashboard')
    
    expect(homeLink).toHaveAttribute('href', '/')
    expect(exploreLink).toHaveAttribute('href', '/public/explore')
    expect(loginLink).toHaveAttribute('href', '/auth/login')
    expect(dashboardLink).toHaveAttribute('href', '/dashboard/home')
  })

  test('can navigate links with keyboard', async () => {
    const user = userEvent.setup()
    render(<Navbar />)
    
    const links = screen.getAllByRole('link')
    
    // Test focus management
    links[0].focus()
    expect(links[0]).toHaveFocus()
    
    // Simulate Tab navigation with userEvent
    await user.tab()
    expect(links[1]).toHaveFocus()
  })

  test('component structure is semantically correct', () => {
    const { container } = render(<Navbar />)
    
    // Verify semantic HTML structure
    expect(container.querySelector('nav')).toBeInTheDocument()
    expect(container.querySelector('ul')).toBeInTheDocument()
    expect(container.querySelectorAll('li')).toHaveLength(4)
    expect(container.querySelectorAll('a')).toHaveLength(4)
  })

  test('no accessibility violations', async () => {
    const { container } = render(<Navbar />)
    
    // Test with axe-core for accessibility violations
    // This requires the axe-core integration in jest.setup.js
    const results = await import('axe-core').then(axe => 
      axe.run(container)
    )
    
    expect(results.violations).toHaveLength(0)
  })
})