import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import ReportForm from '../../components/forms/ReportForm'

describe('ReportForm Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('renders all form fields and submit button', () => {
    render(<ReportForm />)

    expect(screen.getByLabelText('Título del Reporte')).toBeInTheDocument()
    expect(screen.getByLabelText('Descripción')).toBeInTheDocument()
    expect(screen.getByLabelText('Ubicación')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Enviar Reporte' })).toBeInTheDocument()
  })

  test('form has proper ARIA label', () => {
    render(<ReportForm />)

    const form = screen.getByRole('form', { name: 'Formulario de reporte' })
    expect(form).toBeInTheDocument()
  })

  test('inputs are required and accessible', () => {
    render(<ReportForm />)

    const titleInput = screen.getByLabelText('Título del Reporte')
    const descriptionInput = screen.getByLabelText('Descripción')
    const locationInput = screen.getByLabelText('Ubicación')

    expect(titleInput).toBeRequired()
    expect(descriptionInput).toBeRequired()
    expect(locationInput).toBeRequired()

    expect(titleInput).toHaveAttribute('aria-required', 'true')
    expect(descriptionInput).toHaveAttribute('aria-required', 'true')
    expect(locationInput).toHaveAttribute('aria-required', 'true')
  })

  test('allows user to type into inputs', async () => {
    const user = userEvent.setup()
    render(<ReportForm />)

    const titleInput = screen.getByLabelText('Título del Reporte')
    const descriptionInput = screen.getByLabelText('Descripción')
    const locationInput = screen.getByLabelText('Ubicación')

    await user.type(titleInput, 'Bache en la calle')
    await user.type(descriptionInput, 'Hay un bache muy grande')
    await user.type(locationInput, 'Av. Principal')

    expect(titleInput).toHaveValue('Bache en la calle')
    expect(descriptionInput).toHaveValue('Hay un bache muy grande')
    expect(locationInput).toHaveValue('Av. Principal')
  })

  test('form submission prevents page reload', async () => {
    const user = userEvent.setup()
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {})

    render(<ReportForm />)

    await user.type(screen.getByLabelText('Título del Reporte'), 'Reporte prueba')
    await user.type(screen.getByLabelText('Descripción'), 'Descripción prueba')
    await user.type(screen.getByLabelText('Ubicación'), 'Ubicación prueba')

    await user.click(screen.getByRole('button', { name: 'Enviar Reporte' }))

    expect(consoleSpy).toHaveBeenCalledWith('Form submitted:', {
      title: 'Reporte prueba',
      description: 'Descripción prueba',
      location: 'Ubicación prueba',
    })

    consoleSpy.mockRestore()
  })

  test('inputs and button are keyboard accessible', async () => {
    const user = userEvent.setup()
    render(<ReportForm />)

    const titleInput = screen.getByLabelText('Título del Reporte')
    titleInput.focus()
    expect(titleInput).toHaveFocus()

    await user.tab()
    expect(screen.getByLabelText('Descripción')).toHaveFocus()

    await user.tab()
    expect(screen.getByLabelText('Ubicación')).toHaveFocus()

    await user.tab()
    expect(screen.getByRole('button', { name: 'Enviar Reporte' })).toHaveFocus()
  })

  test('component structure is semantically correct', () => {
    const { container } = render(<ReportForm />)

    expect(container.querySelector('form')).toBeInTheDocument()
    expect(container.querySelectorAll('label')).toHaveLength(3)
    expect(container.querySelectorAll('input')).toHaveLength(2)
    expect(container.querySelectorAll('textarea')).toHaveLength(1)
    expect(container.querySelector('button')).toBeInTheDocument()
  })

  test('no accessibility violations', async () => {
    const { container } = render(<ReportForm />)

const axe = await import('axe-core')

const results = await axe.run(container, {
  rules: {
    'color-contrast': { enabled: false },
  },
})


    expect(results.violations).toHaveLength(0)
  })
})
