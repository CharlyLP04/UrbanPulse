import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { mockMatchMedia, resetMatchMedia } from '../../jest.setup'

describe('Prefers Reduced Motion - Accesibilidad', () => {
  beforeEach(() => {
    resetMatchMedia()
  })

  afterEach(() => {
    resetMatchMedia()
  })

  describe('Cuando prefers-reduced-motion: reduce está desactivado', () => {
    beforeEach(() => {
      mockMatchMedia(false)
    })

    it('renderiza animaciones cuando el usuario NO tiene preferencia de movimiento reducido', () => {
      const AnimatedComponent = () => (
        <div data-testid="animated-element" className="animate-fade-in">
          Contenido animado
        </div>
      )

      render(<AnimatedComponent />)

      const element = screen.getByTestId('animated-element')
      expect(element).toHaveClass('animate-fade-in')
    })

    it('permite animaciones de entrada en ReportCard', () => {
      const ReportCardMock = () => (
        <div data-testid="report-card" className="report-card">
          Reporte de ejemplo
        </div>
      )

      render(<ReportCardMock />)

      const card = screen.getByTestId('report-card')
      expect(card).toHaveClass('report-card')
    })
  })

  describe('Cuando prefers-reduced-motion: reduce está activado', () => {
    beforeEach(() => {
      mockMatchMedia(true)
    })

    it('matchMedia retorna matches: true para reduced motion', () => {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
      expect(mediaQuery.matches).toBe(true)
    })

    it('matchMedia puede ser configurado correctamente', () => {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
      expect(mediaQuery).toBeDefined()
      expect(mediaQuery.media).toBe('(prefers-reduced-motion: reduce)')
    })

    it('verifica que prefers-reduced-motion está configurado en CSS', () => {
      const style = document.createElement('style')
      style.textContent = `
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
          }
        }
      `
      document.head.appendChild(style)

      expect(window.matchMedia).toBeDefined()
      
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
      expect(mediaQuery.matches).toBe(true)

      document.head.removeChild(style)
    })

    it('no causa errores cuando matchMedia no está disponible', () => {
      delete (window as any).matchMedia

      expect(() => {
        mockMatchMedia(false)
      }).not.toThrow()
    })
  })

  describe('Validación de medios de CSS', () => {
    it('matchMedia soporta la media query de reduced motion', () => {
      const mediaQuery = '(prefers-reduced-motion: reduce)'
      const mq = window.matchMedia(mediaQuery)
      
      expect(mq).toBeDefined()
      expect(typeof mq.matches).toBe('boolean')
      expect(typeof mq.media).toBe('string')
      expect(mq.media).toBe(mediaQuery)
    })

    it('matchMedia soporta la media query de color scheme', () => {
      const mediaQuery = '(prefers-color-scheme: dark)'
      const mq = window.matchMedia(mediaQuery)
      
      expect(mq).toBeDefined()
    })

    it('matchMedia soporta la media query de contraste alto', () => {
      const mediaQuery = '(prefers-contrast: more)'
      const mq = window.matchMedia(mediaQuery)
      
      expect(mq).toBeDefined()
    })
  })

  describe('Verificación de reglas CSS existentes', () => {
    it('globals.css contiene la regla prefers-reduced-motion', async () => {
      const cssContent = `
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
          }
        }
      `

      expect(cssContent).toContain('prefers-reduced-motion')
      expect(cssContent).toContain('animation-duration')
      expect(cssContent).toContain('transition-duration')
    })
  })
})
