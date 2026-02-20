import Link from 'next/link'
import { KeyboardEvent } from 'react'

type DetailNavbarProps = {
  onKeyDown: (event: KeyboardEvent<HTMLElement>) => void
  setItemRef: (index: number, element: HTMLAnchorElement | null) => void
}

export default function DetailNavbar({ onKeyDown, setItemRef }: DetailNavbarProps) {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link
          href="/public/index-wireframe"
          className="logo"
          ref={(element) => setItemRef(0, element)}
          onKeyDown={onKeyDown}
        >
          🏙️ UrbanPulse
        </Link>
        <Link
          href="/public/explore"
          className="back-link"
          ref={(element) => setItemRef(1, element)}
          onKeyDown={onKeyDown}
        >
          ← Volver a Reportes
        </Link>
      </div>
    </nav>
  )
}
