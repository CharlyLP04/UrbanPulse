import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import CreateReportSuccessModal from '@/components/reports/create-report/CreateReportSuccessModal'

describe('CreateReportSuccessModal - Animaciones y Accesibilidad', () => {
  const mockOnClose = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Renderizado y animaciones', () => {
    it('renderiza el modal cuando está abierto', () => {
      render(<CreateReportSuccessModal isOpen={true} onClose={mockOnClose} />)

      expect(screen.getByRole('dialog')).toBeInTheDocument()
      expect(screen.getByText('¡Reporte Creado!')).toBeInTheDocument()
    })

    it('no renderiza nada cuando está cerrado', () => {
      const { container } = render(<CreateReportSuccessModal isOpen={false} onClose={mockOnClose} />)

      expect(container.firstChild).toBeNull()
    })

    it('aplica las clases de animación correctamente', () => {
      render(<CreateReportSuccessModal isOpen={true} onClose={mockOnClose} />)

      const modal = screen.getByRole('dialog')
      expect(modal).toHaveClass('show')
      
      const content = screen.getByText('¡Reporte Creado!').closest('div')
      expect(content).toBeInTheDocument()
    })

    it('el contenido del modal es renderizado', () => {
      render(<CreateReportSuccessModal isOpen={true} onClose={mockOnClose} />)

      expect(screen.getByText('¡Reporte Creado!')).toBeInTheDocument()
      expect(screen.getByText(/Tu reporte ha sido publicado exitosamente/i)).toBeInTheDocument()
    })
  })

  describe('Accesibilidad - ARIA', () => {
    it('tiene role="dialog" para accesibilidad', () => {
      render(<CreateReportSuccessModal isOpen={true} onClose={mockOnClose} />)

      expect(screen.getByRole('dialog')).toBeInTheDocument()
    })

    it('tiene aria-modal="true"', () => {
      render(<CreateReportSuccessModal isOpen={true} onClose={mockOnClose} />)

      const modal = screen.getByRole('dialog')
      expect(modal).toHaveAttribute('aria-modal', 'true')
    })

    it('tiene aria-labelledby referenciando el título', () => {
      render(<CreateReportSuccessModal isOpen={true} onClose={mockOnClose} />)

      const modal = screen.getByRole('dialog')
      expect(modal).toHaveAttribute('aria-labelledby', 'create-report-success-title')
    })

    it('el título es accesible por su texto', () => {
      render(<CreateReportSuccessModal isOpen={true} onClose={mockOnClose} />)

      expect(screen.getByText('¡Reporte Creado!')).toBeInTheDocument()
    })

    it('el icono tiene aria-hidden="true" para lectores de pantalla', () => {
      render(<CreateReportSuccessModal isOpen={true} onClose={mockOnClose} />)

      const icon = screen.getByText('✅')
      expect(icon).toHaveAttribute('aria-hidden', 'true')
    })
  })

  describe('Accesibilidad - Foco de teclado', () => {
    it('mueve el foco al modal cuando se abre', () => {
      const button = document.createElement('button')
      button.textContent = 'Abrir modal'
      document.body.appendChild(button)
      button.focus()

      render(<CreateReportSuccessModal isOpen={true} onClose={mockOnClose} />)

      const modalContent = screen.getByText('¡Reporte Creado!').closest('div[tabIndex="-1"]')
      expect(document.activeElement).toBe(modalContent)

      document.body.removeChild(button)
    })

    it('el contenido del modal es enfocable con tabIndex=-1', () => {
      render(<CreateReportSuccessModal isOpen={true} onClose={mockOnClose} />)

      const modalContent = screen.getByText('¡Reporte Creado!').closest('div[tabIndex="-1"]')
      expect(modalContent).toHaveAttribute('tabIndex', '-1')
    })

    it('el botón de acción es enfocable', () => {
      render(<CreateReportSuccessModal isOpen={true} onClose={mockOnClose} />)

      const link = screen.getByRole('link', { name: /Ver Todos los Reportes/i })
      expect(link).toBeInTheDocument()
    })
  })

  describe('Cerrar modal con teclado', () => {
    it('cierra el modal al presionar ESC', () => {
      render(<CreateReportSuccessModal isOpen={true} onClose={mockOnClose} />)

      fireEvent.keyDown(document, { key: 'Escape' })

      expect(mockOnClose).toHaveBeenCalledTimes(1)
    })

    it('no cierra el modal con otras teclas', () => {
      render(<CreateReportSuccessModal isOpen={true} onClose={mockOnClose} />)

      fireEvent.keyDown(document, { key: 'Enter' })
      fireEvent.keyDown(document, { key: 'Space' })
      fireEvent.keyDown(document, { key: 'Tab' })

      expect(mockOnClose).not.toHaveBeenCalled()
    })
  })

  describe('Cerrar modal al hacer click fuera', () => {
    it('cierra el modal al hacer click en el overlay', () => {
      render(<CreateReportSuccessModal isOpen={true} onClose={mockOnClose} />)

      const modal = screen.getByRole('dialog')
      fireEvent.click(modal)

      expect(mockOnClose).toHaveBeenCalledTimes(1)
    })

    it('no cierra el modal al hacer click en el contenido', () => {
      render(<CreateReportSuccessModal isOpen={true} onClose={mockOnClose} />)

      const content = screen.getByText('¡Reporte Creado!').closest('div')
      fireEvent.click(content!)

      expect(mockOnClose).not.toHaveBeenCalled()
    })
  })

  describe('Contenido del modal', () => {
    it('muestra el mensaje de éxito correcto', () => {
      render(<CreateReportSuccessModal isOpen={true} onClose={mockOnClose} />)

      expect(screen.getByText(/Tu reporte ha sido publicado exitosamente/i)).toBeInTheDocument()
    })

    it('el enlace de acción tiene el texto correcto', () => {
      render(<CreateReportSuccessModal isOpen={true} onClose={mockOnClose} />)

      const link = screen.getByRole('link', { name: /Ver Todos los Reportes/i })
      expect(link).toHaveAttribute('href', '/public/explore')
    })
  })
})
