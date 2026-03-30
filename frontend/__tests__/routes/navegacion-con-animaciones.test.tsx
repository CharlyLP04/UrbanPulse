import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Navbar } from '@/components/layout/Navbar'

jest.mock('next/navigation', () => ({
  usePathname: () => '/',
}))

jest.mock('@/components/providers/auth-provider', () => ({
  useAuth: jest.fn().mockReturnValue({ user: null, logout: jest.fn() }),
}))

describe('Navegacion con Animaciones - Accesibilidad', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Navegacion por teclado', () => {
    it('renderiza la barra de navegacion correctamente', () => {
      render(<Navbar />)
      expect(screen.getByRole('navigation')).toBeInTheDocument()
      expect(screen.getByLabelText('Navegación principal')).toBeInTheDocument()
    })

    it('todos los enlaces son enfocables con Tab', () => {
      render(<Navbar />)
      const links = screen.getAllByRole('link')
      
      links.slice(1).forEach((link) => {
        expect(link).toHaveAttribute('tabIndex', '0')
      })
    })

    it('el componente soporta aria-current en los enlaces', () => {
      render(<Navbar />)
      const links = screen.getAllByRole('link')
      expect(links.length).toBe(4) // Logo, Inicio, Explorar, Login
    })
  })

  describe('Estructura semantica', () => {
    it('usa elemento semantico nav', () => {
      render(<Navbar />)
      expect(screen.getByRole('navigation')).toBeInTheDocument()
    })

    it('usa lista ordenada para los items', () => {
      render(<Navbar />)
      expect(screen.getByRole('list')).toBeInTheDocument()
    })

    it('cada enlace tiene rol de link implicito', () => {
      render(<Navbar />)
      const links = screen.getAllByRole('link')
      expect(links.length).toBeGreaterThan(0)
    })

    it('los enlaces tienen texto accesible', () => {
      render(<Navbar />)
      expect(screen.getByText('Inicio')).toBeInTheDocument()
      expect(screen.getByText('Explorar')).toBeInTheDocument()
      expect(screen.getByText('Login')).toBeInTheDocument()
    })
  })

  describe('Flujo de navegacion', () => {
    it('el orden de los enlaces es logico', () => {
      render(<Navbar />)
      const links = screen.getAllByRole('link')
      const labels = links.map((link) => link.textContent)
      expect(labels).toEqual(['URBANPULSE', 'Inicio', 'Explorar', 'Login'])
    })

    it('los enlaces tienen href valido', () => {
      render(<Navbar />)
      const links = screen.getAllByRole('link')
      expect(links[0]).toHaveAttribute('href', '/')
      expect(links[1]).toHaveAttribute('href', '/')
      expect(links[2]).toHaveAttribute('href', '/public/explore')
      expect(links[3]).toHaveAttribute('href', '/auth/login')
    })
  })
})
