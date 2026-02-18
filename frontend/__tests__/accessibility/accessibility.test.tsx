import { render } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import { Navbar } from '@/components/layout/Navbar'
import { Breadcrumb } from '@/components/layout/Breadcrumb'

expect.extend(toHaveNoViolations)

// 🔹 Mock next/link
jest.mock('next/link', () => {
  return ({ children, href, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  )
})

// 🔹 Mock next/navigation
jest.mock('next/navigation', () => ({
  usePathname: () => '/',
}))

describe('Accessibility Tests', () => {
  
  test('Navbar should not have accessibility violations', async () => {
    const { container } = render(<Navbar />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  test('Breadcrumb should not have accessibility violations', async () => {
    const mockItems = [
      { label: 'Inicio', href: '/' },
      { label: 'Dashboard', href: '/dashboard' },
    ]

    const { container } = render(<Breadcrumb items={mockItems} />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

})
