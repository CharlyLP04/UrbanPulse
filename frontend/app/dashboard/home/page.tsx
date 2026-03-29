'use client'

import { useAuth } from '@/components/providers/auth-provider'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function DashboardHomePage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  // Protect the route
  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/auth/login')
    }
  }, [user, isLoading, router])

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Encabezado */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col md:flex-row items-center justify-between gap-6 transition-all duration-300 hover:shadow-md">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-blue-500 to-sky-400 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
              {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </div>
            <div>
              <h1 className="text-3xl font-black text-gray-900 tracking-tight">
                ¡Hola, <span className="text-blue-600">{user.name || 'Ciudadano'}</span>! 👋
              </h1>
              <p className="text-gray-500 mt-1 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                Tu cuenta está activa y lista para reportar.
              </p>
            </div>
          </div>
          <Link 
            href="/public/explore" 
            className="shrink-0 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold shadow-[0_4px_14px_0_rgba(37,99,235,0.39)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.23)] hover:-translate-y-1 transition-all duration-300 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Nuevo Reporte
          </Link>
        </div>

        {/* Estadísticas Top */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:border-blue-200 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-500 font-medium">Reportes Activos</h3>
              <span className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </span>
            </div>
            <p className="text-4xl font-black text-gray-900">0</p>
            <p className="text-sm text-gray-500 mt-2">Sin incidencias reportadas aún</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:border-green-200 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-500 font-medium">Problemas Resueltos</h3>
              <span className="p-2 bg-green-50 text-green-600 rounded-lg">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </span>
            </div>
            <p className="text-4xl font-black text-gray-900">0</p>
            <p className="text-sm text-gray-500 mt-2">Contribuciones comunitarias exitosas</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:border-yellow-200 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-500 font-medium">Puntos de Impacto</h3>
              <span className="p-2 bg-yellow-50 text-yellow-600 rounded-lg">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </span>
            </div>
            <p className="text-4xl font-black text-gray-900">100</p>
            <p className="text-sm text-green-600 font-medium mt-2">↑ Bono de bienvenida activado</p>
          </div>
        </div>

        {/* Actividad Reciente */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-900">Actividad Reciente</h2>
          </div>
          <div className="p-8 text-center bg-gray-50/50">
            <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <p className="text-lg text-gray-600 font-medium">Aún no hay actividad que mostrar</p>
            <p className="text-gray-400 mt-1 max-w-sm mx-auto">Parece que tu bandeja está limpia. Comienza descubriendo el mapa de problemas urbanos para empezar a contribuir.</p>
            <Link 
              href="/public/explore"
              className="inline-block mt-6 text-blue-600 font-semibold hover:text-blue-800 border-b-2 border-transparent hover:border-blue-600 transition-all"
            >
              Explorar el mapa →
            </Link>
          </div>
        </div>
        
      </div>
    </div>
  )
}
