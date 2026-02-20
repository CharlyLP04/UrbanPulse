import Link from 'next/link'
import { KeyboardEvent, MutableRefObject } from 'react'

type ExploreNavbarProps = {
  itemRefs: MutableRefObject<(HTMLAnchorElement | null)[]>
  onKeyDown: (event: KeyboardEvent<HTMLElement>) => void
}

export default function ExploreNavbar({ itemRefs, onKeyDown }: ExploreNavbarProps) {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link href="/public/index-wireframe" className="logo">
          🏙️ UrbanPulse
        </Link>
        <ul className="nav-links" onKeyDown={onKeyDown}>
          <li>
            <Link
              href="/public/index-wireframe"
              ref={(element) => {
                itemRefs.current[0] = element
              }}
            >
              Inicio
            </Link>
          </li>
          <li>
            <Link
              href="/public/explore"
              style={{ color: 'var(--verde-estable)' }}
              ref={(element) => {
                itemRefs.current[1] = element
              }}
            >
              Reportes
            </Link>
          </li>
          <li>
            <Link
              href="#mapa"
              ref={(element) => {
                itemRefs.current[2] = element
              }}
            >
              Mapa
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/profile"
              ref={(element) => {
                itemRefs.current[3] = element
              }}
            >
              Mi Perfil
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/create-report"
              className="btn-crear"
              ref={(element) => {
                itemRefs.current[4] = element
              }}
            >
              + Crear Reporte
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}
