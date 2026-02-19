'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface BreadcrumbItem {
  label: string
  href: string
}

const routeLabels: Record<string, string> = {
  '/': 'Inicio',
  '/public': 'Público',
  '/public/explore': 'Explorar',
  '/public/explore/detail': 'Detalle',
  '/auth': 'Autenticación',
  '/auth/login': 'Iniciar Sesión',
  '/auth/register': 'Registrarse',
  '/auth/register/simple': 'Registro Simple',
  '/auth/register/complete': 'Registro Completo',
  '/dashboard': 'Dashboard',
  '/dashboard/home': 'Principal',
  '/dashboard/profile': 'Perfil',
  '/dashboard/create-report': 'Crear Reporte',
  '/admin': 'Administración',
  '/admin/dashboard': 'Panel Admin',
  '/admin/moderation': 'Moderación',
}

function generateBreadcrumbsFromPathname(pathname: string): BreadcrumbItem[] {
  if (!pathname || pathname === '/') {
    return [{ label: 'Inicio', href: '/' }]
  }

  const paths = pathname.split('/').filter(Boolean)
  const items: BreadcrumbItem[] = [{ label: 'Inicio', href: '/' }]

  let currentPath = ''
  paths.forEach((path) => {
    currentPath += `/${path}`
    const label = routeLabels[currentPath] || formatPathToLabel(path)
    items.push({ label, href: currentPath })
  })

  return items
}

function formatPathToLabel(path: string): string {
  return path
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export function Breadcrumb({ items }: { items?: BreadcrumbItem[] }) {
  const pathname = usePathname()
  const breadcrumbItems = items || generateBreadcrumbsFromPathname(pathname)

  if (!breadcrumbItems || breadcrumbItems.length <= 1) {
    return null
  }

  return (
    <nav aria-label="Ruta de navegación" className="px-4 py-2">
      <ol className="flex items-center gap-1 text-sm">
        {breadcrumbItems.map((item, index) => {
          const isLast = index === breadcrumbItems.length - 1

          return (
            <li key={index} className="flex items-center gap-1">
              {index === 0 && (
                <svg
                  className="w-4 h-4 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
              )}

              {isLast ? (
                <span className="font-medium text-gray-900" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <>
                  <Link
                    href={item.href}
                    className="text-gray-500 hover:text-blue-600 transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                  <svg
                    className="w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
