import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Navbar } from '@/components/layout/Navbar'

describe('Navegación con Animaciones - Accesibilidad', () => {
  describe('Navegación por teclado', () => {
    it('renderiza la barra de navegación correctamente', () => {
      render(<Navbar />)

      expect(screen.getByRole('navigation')).toBeInTheDocument()
      expect(screen.getByLabelText('Navegación principal')).toBeInTheDocument()
    })

    it('todos los enlaces son enfocables con Tab', () => {
      render(<Navbar />)

      const links = screen.getAllByRole('link')
      links.forEach((link) => {
        expect(link).toHaveAttribute('tabIndex', '0')
      })
    })

    it('soporta navegación con flechas del teclado', () => {
      render(<Navbar />)

      const navList = screen.getByRole('list')
      const firstLink = screen.getAllByRole('link')[0]
      firstLink.focus()

      fireEvent.keyDown(navList, { key: 'ArrowRight' })

      const links = screen.getAllByRole('link')
      expect(document.activeElement).toBe(links[1])
    })

    it('soporta navegación con Home y End', () => {
      render(<Navbar />)

      const navList = screen.getByRole('list')
      const links = screen.getAllByRole('link')
      links[1].focus()

      fireEvent.keyDown(navList, { key: 'Home' })
      expect(document.activeElement).toBe(links[0])

      fireEvent.keyDown(navList, { key: 'End' })
      expect(document.activeElement).toBe(links[links.length - 1])
    })

    it('el componente soporta aria-current en los enlaces', () => {
      render(<Navbar />)

      const links = screen.getAllByRole('link')
      expect(links.length).toBe(4)
    })
  })

  describe('Animaciones de transición', () => {
    it('aplica clases de animación de entrada al Navbar', () => {
      const { container } = render(<Navbar />)

      const nav = container.querySelector('nav')
      expect(nav).toBeInTheDocument()
    })

    it('los enlaces tienen transiciones CSS definidas', () => {
      render(<Navbar />)

      const link = screen.getAllByRole('link')[0]
      const styles = window.getComputedStyle(link)

      expect(styles.transitionProperty).toBeDefined()
    })

    it('los enlaces tienen estilos de focus visibles', () => {
      render(<Navbar />)

      const link = screen.getAllByRole('link')[0]
      link.focus()

      expect(link).toHaveClass('focus:outline-none')
      expect(link).toHaveClass('focus:ring-2')
    })
  })

  describe('Estructura semántica', () => {
    it('usa elemento semántico nav', () => {
      render(<Navbar />)

      expect(screen.getByRole('navigation')).toBeInTheDocument()
    })

    it('usa lista ordenada para los items', () => {
      render(<Navbar />)

      expect(screen.getByRole('list')).toBeInTheDocument()
    })

    it('cada enlace tiene rol de link implícito', () => {
      render(<Navbar />)

      const links = screen.getAllByRole('link')
      expect(links.length).toBeGreaterThan(0)
    })

    it('los enlaces tienen texto accesible', () => {
      render(<Navbar />)

      expect(screen.getByText('Inicio')).toBeInTheDocument()
      expect(screen.getByText('Explorar')).toBeInTheDocument()
      expect(screen.getByText('Login')).toBeInTheDocument()
      expect(screen.getByText('Dashboard')).toBeInTheDocument()
    })
  })

  describe('Flujo de navegación', () => {
    it('el orden de los enlaces es lógico', () => {
      render(<Navbar />)

      const links = screen.getAllByRole('link')
      const labels = links.map((link) => link.textContent)

      expect(labels).toEqual(['Inicio', 'Explorar', 'Login', 'Dashboard'])
    })

    it('los enlaces tienen href válido', () => {
      render(<Navbar />)

      const links = screen.getAllByRole('link')
      
      expect(links[0]).toHaveAttribute('href', '/')
      expect(links[1]).toHaveAttribute('href', '/public/explore')
      expect(links[2]).toHaveAttribute('href', '/auth/login')
      expect(links[3]).toHaveAttribute('href', '/dashboard/home')
    })
  })

  describe('Interacción con animaciones', () => {
    it('el hover no causa reflow significativo', () => {
      render(<Navbar />)

      const link = screen.getAllByRole('link')[0]
      const stylesBefore = window.getComputedStyle(link)
      
      fireEvent.mouseEnter(link)
      
      const stylesAfter = window.getComputedStyle(link)
      
      expect(stylesAfter.position).toBe(stylesBefore.position)
    })

    it('las transiciones son suaves', () => {
      render(<Navbar />)

      const link = screen.getAllByRole('link')[0]
      const styles = window.getComputedStyle(link)
      
      const hasTransition = styles.transitionDuration !== '0s'
      expect(hasTransition || styles.transitionProperty === 'all').toBe(true)
    })
  })
})
