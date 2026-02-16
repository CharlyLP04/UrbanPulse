'use client'

import Link from 'next/link'
import type { KeyboardEvent } from 'react'
import { useRef } from 'react'
import styles from './CreateReportPage.module.css'

const navItems = [
  { label: '🏙️ UrbanPulse', href: '/', className: styles.logo },
  { label: '← Cancelar', href: '/public/explore', className: styles.backLink },
]

export default function CreateReportNavbar() {
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([])

  const handleArrowNavigation = (event: KeyboardEvent<HTMLUListElement>) => {
    const validKeys = ['ArrowRight', 'ArrowLeft', 'Home', 'End']
    if (!validKeys.includes(event.key)) {
      return
    }

    const links = linkRefs.current.filter((link): link is HTMLAnchorElement => link !== null)
    const currentIndex = links.findIndex((link) => link === document.activeElement)
    if (links.length === 0 || currentIndex === -1) {
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

    const delta = event.key === 'ArrowRight' ? 1 : -1
    const nextIndex = (currentIndex + delta + links.length) % links.length
    links[nextIndex].focus()
  }

  return (
    <nav className={styles.navbar} aria-label="Navegación de creación de reporte">
      <div className={styles.navContainer}>
        <ul className={styles.navLinks} onKeyDown={handleArrowNavigation}>
          {navItems.map((item, index) => (
            <li key={item.href}>
              <Link
                href={item.href}
                ref={(element) => {
                  linkRefs.current[index] = element
                }}
                className={item.className}
                tabIndex={0}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
