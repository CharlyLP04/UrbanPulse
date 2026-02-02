import { Navbar } from '@/components/layout/Navbar'
import { Breadcrumb } from '@/components/layout/Breadcrumb'
// Metadata para SEO
export const metadata = {
  title: 'UrbanPulse - Sistema Municipal de Reportes',
  description: 'Plataforma para reportar y seguir incidencias de servicios públicos',
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        {/* Skip link para accesibilidad - PRIMERO en el DOM */}
        <a 
          href="#main-content" 
          className="skip-link"
          tabIndex={0}
        >
          Saltar al contenido principal
        </a>
        
        {/* Navegación principal */}
        <header>
          <Navbar />
        </header>
        
        {/* Breadcrumbs - navegación secundaria */}
        <nav aria-label="Ruta de navegación">
          <Breadcrumb items={[{ label: 'Inicio', href: '/' }]} />
        </nav>
        
        {/* Contenido principal */}
        <main id="main-content" role="main">
          {children}
        </main>
        
        {/* Footer opcional */}
        <footer>
          <p>&copy; 2024 UrbanPulse - Municipalidad</p>
        </footer>
      </body>
    </html>
  )
}
