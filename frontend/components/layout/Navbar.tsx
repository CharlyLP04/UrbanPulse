'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
export function Navbar() {
  const pathname = usePathname()
  
  return (
    <nav aria-label="Navegación principal" role="navigation">
      <ul>
        <li><Link href="/" tabIndex={0}>Inicio</Link></li>
        <li><Link href="/public/explore" tabIndex={0}>Explorar</Link></li>
        <li><Link href="/auth/login" tabIndex={0}>Login</Link></li>
        <li><Link href="/dashboard/home" tabIndex={0}>Dashboard</Link></li>
      </ul>
    </nav>
  )
}
