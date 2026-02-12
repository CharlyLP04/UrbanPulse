import { render, screen } from '@testing-library/react'
import { Navbar } from '../../components/layout/Navbar'

describe('Navbar accessibility', () => {
  test('renders navigation landmark', () => {
    render(<Navbar />)

    const nav = screen.getByRole('navigation')
    expect(nav).toBeInTheDocument()
  })
})

