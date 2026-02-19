import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { Breadcrumb } from '../../components/navigation/Breadcrumb'

describe('Breadcrumb Component', () => {
  const mockItems = [
    { label: 'Inicio', href: '/' },
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Reportes', href: '/dashboard/reports' }
  ]

  const mockItemsSingle = [
    { label: 'Inicio', href: '/' }
  ]

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('renders all breadcrumb items', () => {
    render(<Breadcrumb items={mockItems} />)
    
    // Verify all breadcrumb items are rendered
    expect(screen.getByText('Inicio')).toBeInTheDocument()
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
    expect(screen.getByText('Reportes')).toBeInTheDocument()
  })

  test('last item has aria-current="page"', () => {
    render(<Breadcrumb items={mockItems} />)
    
    const lastLink = screen.getByText('Reportes')
    expect(lastLink).toHaveAttribute('aria-current', 'page')
  })

  test('intermediate items do not have aria-current', () => {
    render(<Breadcrumb items={mockItems} />)
    
    const firstLink = screen.getByText('Inicio')
    const middleLink = screen.getByText('Dashboard')
    
    expect(firstLink).not.toHaveAttribute('aria-current')
    expect(middleLink).not.toHaveAttribute('aria-current')
  })

  test('items are keyboard navigable', () => {
    render(<Breadcrumb items={mockItems} />)
    
    const links = screen.getAllByRole('link')
    expect(links).toHaveLength(2) // First 2 items are links, last is span
    
    // Verify links are focusable (Next.js Link has tabIndex by default)
    links.forEach(link => {
      expect(link).toBeVisible()
    })
  })

  test('displays separators between items', () => {
    render(<Breadcrumb items={mockItems} />)
    
    // Check that separators are present (SVG chevrons)
    const chevrons = document.querySelectorAll('svg')
    expect(chevrons.length).toBeGreaterThan(0)
  })

  test('returns null for single item (hides breadcrumb on single item)', () => {
    const { container } = render(<Breadcrumb items={mockItemsSingle} />)
    
    // Should render nothing when only one item
    expect(container.firstChild).toBeNull()
  })

  test('breadcrumb has proper ARIA labeling', () => {
    render(<Breadcrumb items={mockItems} />)
    
    const nav = screen.getByRole('navigation')
    expect(nav).toHaveAttribute('aria-label', 'Ruta de navegación')
  })

  test('links have correct href attributes', () => {
    render(<Breadcrumb items={mockItems} />)
    
    const homeLink = screen.getByText('Inicio')
    const dashboardLink = screen.getByText('Dashboard')
    
    expect(homeLink).toHaveAttribute('href', '/')
    expect(dashboardLink).toHaveAttribute('href', '/dashboard')
    // Last item is current page, rendered as span not link
    expect(screen.getByText('Reportes').tagName).toBe('SPAN')
  })

  test('semantic HTML structure is correct', () => {
    const { container } = render(<Breadcrumb items={mockItems} />)
    
    // Verify semantic structure
    expect(container.querySelector('nav')).toBeInTheDocument()
    expect(container.querySelector('ol')).toBeInTheDocument()
    expect(container.querySelectorAll('li')).toHaveLength(3)
    // First 2 items are links, last item is a span (current page)
    expect(container.querySelectorAll('a')).toHaveLength(2)
    expect(container.querySelectorAll('span')).toHaveLength(1)
  })

  test('handles empty items array', () => {
    const { container } = render(<Breadcrumb items={[]} />)
    
    // Should render nothing when empty
    expect(container.firstChild).toBeNull()
  })

  test('can navigate with keyboard', async () => {
    const user = userEvent.setup()
    render(<Breadcrumb items={mockItems} />)
    
    const links = screen.getAllByRole('link')
    
    // Test focus management
    links[0].focus()
    expect(links[0]).toHaveFocus()
    
    // Simulate Tab navigation with userEvent
    await user.tab()
    expect(links[1]).toHaveFocus()
  })

  test('no accessibility violations', async () => {
    const { container } = render(<Breadcrumb items={mockItems} />)
    
    // Test with axe-core for accessibility violations
    const results = await import('axe-core').then(axe => 
      axe.run(container)
    )
    
    expect(results.violations).toHaveLength(0)
  })

  test('renders correctly with different item labels', () => {
    const customItems = [
      { label: 'Página Principal', href: '/home' },
      { label: 'Servicios', href: '/services' },
      { label: 'Reportes Ciudadanos', href: '/services/reports' },
      { label: 'Nuevo Reporte', href: '/services/reports/new' }
    ]
    
    render(<Breadcrumb items={customItems} />)
    
    customItems.forEach(item => {
      expect(screen.getByText(item.label)).toBeInTheDocument()
    })
  })
})