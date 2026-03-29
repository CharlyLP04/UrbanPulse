'use client'
import Link from 'next/link'
import type { KeyboardEvent } from 'react'
import { useRef } from 'react'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/components/providers/auth-provider'

type NavItem = {
  label: string
  href: string
}

export function Navbar() {
  const pathname = usePathname()
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([])
  const { user, logout, isLoading } = useAuth()

  const navItems = [
    { label: 'Inicio', href: '/' },
    { label: 'Explorar', href: '/public/explore' },
    ...(!user && !isLoading ? [{ label: 'Login', href: '/auth/login' }] : []),
    ...(user ? [{ label: 'Dashboard', href: '/dashboard/home' }] : []),
  ]

  const handleArrowNavigation = (event: KeyboardEvent<HTMLUListElement>) => {
    const keys = ['ArrowRight', 'ArrowLeft', 'ArrowDown', 'ArrowUp', 'Home', 'End']
    if (!keys.includes(event.key)) {
      return
    }

    const links = linkRefs.current.filter((item: HTMLAnchorElement | null): item is HTMLAnchorElement => item !== null)
    if (links.length === 0) {
      return
    }

    const currentIndex = links.findIndex((link: HTMLAnchorElement) => link === document.activeElement)
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
    <nav id="main-navigation" aria-label="Navegación principal" role="navigation" className="sticky top-0 z-50 w-full bg-[#1A4B6B] shadow-md transition-all duration-300 border-b border-[#113247]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <Link href="/" className="flex-shrink-0 flex items-center gap-3 cursor-pointer transition-transform hover:scale-105 duration-300">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-b from-sky-300 to-blue-500 overflow-hidden relative flex-shrink-0 shadow-[0_2px_10px_rgba(0,0,0,0.2)] border border-[#1A4B6B]/20">
              {/* Clouds */}
              <div className="absolute top-1.5 right-1 w-5 h-3 bg-white/95 rounded-full blur-[0.5px]"></div>
              <div className="absolute top-2.5 right-3 w-4 h-2 bg-pink-50/90 rounded-full blur-[0.5px]"></div>
              
              {/* Buildings */}
              {/* Right building */}
              <div className="absolute bottom-0 right-0 w-[14px] h-[22px] bg-[#3B82F6] rounded-t-sm shadow-sm">
                <div className="absolute top-1.5 left-[2px] w-[10px] h-[3px] bg-[#FDE047] rounded-sm opacity-90"></div>
                <div className="absolute top-3.5 left-[2px] w-[10px] h-[3px] bg-[#FDE047] rounded-sm opacity-90"></div>
              </div>
              {/* Center building */}
              <div className="absolute bottom-0 left-[8px] w-[18px] h-[30px] bg-[#1D4ED8] rounded-t-sm shadow-md z-10 border-r border-[#1e40af]">
                <div className="absolute top-[5px] left-[3px] w-[4px] h-[4px] bg-[#FEF08A]"></div>
                <div className="absolute top-[5px] left-[11px] w-[4px] h-[4px] bg-[#FEF08A]"></div>
                <div className="absolute top-[13px] left-[3px] w-[4px] h-[4px] bg-[#1e293b]"></div>
                <div className="absolute top-[13px] left-[11px] w-[4px] h-[4px] bg-[#FEF08A]"></div>
                <div className="absolute top-[21px] left-[3px] w-[4px] h-[4px] bg-[#FEF08A]"></div>
                <div className="absolute top-[21px] left-[11px] w-[4px] h-[4px] bg-[#1e293b]"></div>
              </div>
              {/* Left building */}
              <div className="absolute bottom-0 left-0 w-[12px] h-[18px] bg-[#60A5FA] rounded-t-sm shadow-sm z-20">
                <div className="absolute top-[3px] left-[4px] w-[4px] h-[4px] bg-[#FDE047]"></div>
                <div className="absolute top-[10px] left-[4px] w-[4px] h-[4px] bg-[#FDE047]"></div>
              </div>
            </div>
            <span 
              className="font-black text-[28px] tracking-tight text-white uppercase" 
              style={{ fontFamily: 'Impact, "Arial Black", sans-serif', transform: 'scaleY(1.05)' }}
            >
              URBANPULSE
            </span>
          </Link>

          {/* Links Section */}
          <div className="flex items-center gap-2 sm:gap-4 flex-wrap pb-2 sm:pb-0 justify-end flex-1 pl-4">
            <ul
              onKeyDown={handleArrowNavigation}
              className="flex list-none gap-2 sm:gap-6 p-0 items-center overflow-x-auto scrolbar-hide whitespace-nowrap"
            >
              {navItems.map((item, index) => {
                const isActive =
                  item.href === '/'
                    ? pathname === item.href
                    : pathname?.startsWith(item.href)

                return (
                  <li key={item.href} className="shrink-0">
                    <Link
                      href={item.href}
                      ref={(element) => {
                        linkRefs.current[index] = element
                      }}
                      tabIndex={0}
                      aria-current={isActive ? 'page' : undefined}
                      className={`relative flex items-center justify-center px-3 sm:px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-300 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 ${
                        isActive
                          ? 'text-white bg-white/10 shadow-inner'
                          : 'text-blue-100 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {item.label}
                      {isActive && (
                        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-sky-300 rounded-t-full shadow-[0_-2px_6px_rgba(125,211,252,0.6)]"></span>
                      )}
                    </Link>
                  </li>
                )
              })}
            </ul>

            {/* User Profile Area */}
            {!isLoading && user && (
              <div className="flex items-center gap-2 sm:gap-3 pl-2 sm:pl-4 border-l border-blue-400/30 shrink-0">
                <div className="flex flex-col items-end hidden lg:flex">
                  <span className="text-sm font-bold text-white leading-tight">
                    {user.name || 'Ciudadano'}
                  </span>
                  <span className="text-xs text-sky-200 capitalize">
                    {user.role || 'Usuario'}
                  </span>
                </div>
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-tr from-sky-400 to-blue-500 flex items-center justify-center text-white font-bold shadow-md ring-2 ring-white/20 shrink-0 select-none">
                  {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </div>
                
                <button 
                  onClick={() => logout()}
                  className="p-1.5 sm:p-2 rounded-full text-blue-200 hover:text-white hover:bg-red-500/20 transition-colors group shrink-0"
                  title="Cerrar Sesión"
                  aria-label="Cerrar Sesión"
                >
                  <svg className="w-5 h-5 group-hover:text-red-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

