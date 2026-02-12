import { render, screen } from '@testing-library/react'
import AccessibleButton from '@/components/ui/AccessibleButton'

describe('AccessibleButton', () => {
  test('renders button with label', () => {
    render(<AccessibleButton label="Guardar" />)

    const button = screen.getByRole('button', { name: 'Guardar' })
    expect(button).toBeInTheDocument()
  })

  test('is disabled when disabled prop is true', () => {
    render(<AccessibleButton label="Enviar" disabled />)

    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
  })
})

