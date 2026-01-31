import { render, screen, fireEvent } from '@testing-library/react'
import { Breadcrumb } from '../../../components/navigation/Breadcrumb'

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
    expect(links).toHaveLength(3)
    
    // Verify all links have tabIndex={0} for keyboard navigation
    links.forEach(link => {
      expect(link).toHaveAttribute('tabIndex', '0')
    })
  })

  test('displays separators between items', () => {
    render(<Breadcrumb items={mockItems} />)
    
    // Check that separators are present
    const separators = screen.getAllByText('>')
    expect(separators).toHaveLength(2) // Between 3 items, there are 2 separators
  })

  test('no separators for single item', () => {
    render(<Breadcrumb items={mockItemsSingle} />)
    
    const separators = screen.queryAllByText('>')
    expect(separators).toHaveLength(0)
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
    const reportsLink = screen.getByText('Reportes')
    
    expect(homeLink).toHaveAttribute('href', '/')
    expect(dashboardLink).toHaveAttribute('href', '/dashboard')
    expect(reportsLink).toHaveAttribute('href', '/dashboard/reports')
  })

  test('semantic HTML structure is correct', () => {
    const { container } = render(<Breadcrumb items={mockItems} />)
    
    // Verify semantic structure
    expect(container.querySelector('nav')).toBeInTheDocument()
    expect(container.querySelector('ol')).toBeInTheDocument()
    expect(container.querySelectorAll('li')).toHaveLength(3)
    expect(container.querySelectorAll('a')).toHaveLength(3)
  })

  test('handles empty items array', () => {
    render(<Breadcrumb items={[]} />)
    
    // Should render empty navigation
    const nav = screen.getByRole('navigation')
    expect(nav).toBeInTheDocument()
    expect(nav).toBeEmptyDOMElement()
  })

  test('can navigate with keyboard', async () => {
    render(<Breadcrumb items={mockItems} />)
    
    const links = screen.getAllByRole('link')
    
    // Test focus management
    links[0].focus()
    expect(links[0]).toHaveFocus()
    
    // Simulate Tab navigation
    await fireEvent.keyDown(links[0], { key: 'Tab' })
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