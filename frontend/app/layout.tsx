import './globals.css'
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
        {/* Skip links para accesibilidad - PRIMEROS en el DOM */}
        <div className="skip-links" aria-label="Enlaces de salto">
          <a href="#main-navigation" className="skip-link" tabIndex={0}>
            Saltar a navegación principal
          </a>
          <a href="#breadcrumb-navigation" className="skip-link" tabIndex={0}>
            Saltar a ruta de navegación
          </a>
          <a href="#main-content" className="skip-link" tabIndex={0}>
            Saltar al contenido principal
          </a>
          <a href="#site-footer" className="skip-link" tabIndex={0}>
            Saltar al pie de página
          </a>
        </div>
        
        {/* Navegación principal */}
        <header>
          <Navbar />
        </header>
        
        {/* Breadcrumbs - navegación secundaria */}
        <div id="breadcrumb-navigation">
          <Breadcrumb />
        </div>
        
        {/* Contenido principal */}
        <main id="main-content" role="main" tabIndex={-1}>
          {children}
        </main>
        
        {/* Footer opcional */}
        <footer id="site-footer" tabIndex={-1}>
          <p>&copy; 2024 UrbanPulse - Municipalidad</p>
        </footer>
      </body>
    </html>
  )
}
