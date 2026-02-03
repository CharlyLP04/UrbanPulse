'use client'
import Link from 'next/link'

interface BreadcrumbItem {
  label: string
  href: string
}

export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  if (!items || items.length === 0) {
    return (
      <nav aria-label="Ruta de navegación">
      </nav>
    )
  }

  return (
    <nav aria-label="Ruta de navegación">
      <ol>
        {items.map((item, index) => (
          <li key={index}>
            <Link 
              href={item.href}
              tabIndex={0}
              aria-current={index === items.length - 1 ? 'page' : undefined}
            >
              {item.label}
            </Link>
            {index < items.length - 1 && ' > '}
          </li>
        ))}
      </ol>
    </nav>
  )
}