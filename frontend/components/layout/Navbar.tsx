'use client'
import Link from 'next/link'
import type { KeyboardEvent } from 'react'
import { useRef } from 'react'
import { usePathname } from 'next/navigation'

type NavItem = {
  label: string
  href: string
}

export function Navbar() {
  const pathname = usePathname()
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([])

  const navItems: NavItem[] = [
    { label: 'Inicio', href: '/' },
    { label: 'Explorar', href: '/public/explore' },
    { label: 'Login', href: '/auth/login' },
    { label: 'Dashboard', href: '/dashboard/home' },
  ]

  const handleArrowNavigation = (event: KeyboardEvent<HTMLUListElement>) => {
    const keys = ['ArrowRight', 'ArrowLeft', 'ArrowDown', 'ArrowUp', 'Home', 'End']
    if (!keys.includes(event.key)) {
      return
    }

    const links = linkRefs.current.filter((item): item is HTMLAnchorElement => item !== null)
    if (links.length === 0) {
      return
    }

    const currentIndex = links.findIndex((link) => link === document.activeElement)
    if (currentIndex === -1) {
      return
    }

    event.preventDefault()

    if (event.key === 'Home') {
      links[0].focus()
      return
    }

    if (event.key === 'End') {
      links[links.length - 1].focus()
      return
    }

    const movingForward = event.key === 'ArrowRight' || event.key === 'ArrowDown'
    const step = movingForward ? 1 : -1
    const nextIndex = (currentIndex + step + links.length) % links.length
    links[nextIndex].focus()
  }

  return (
    <nav id="main-navigation" aria-label="Navegación principal" role="navigation">
      <ul
        onKeyDown={handleArrowNavigation}
        className="flex list-none gap-4 p-0"
      >
        {navItems.map((item, index) => {
          const isActive =
            item.href === '/'
              ? pathname === item.href
              : pathname?.startsWith(item.href)

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                ref={(element) => {
                  linkRefs.current[index] = element
                }}
                tabIndex={0}
                aria-current={isActive ? 'page' : undefined}
                className="rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
              >
                {item.label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
