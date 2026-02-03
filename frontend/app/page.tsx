'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

// Tipos para las estadísticas
interface Statistics {
  totalReports: number
  resolvedReports: number
  pendingReports: number
  activeUsers: number
}

// Tipos para los reportes recientes
interface RecentReport {
  id: string
  title: string
  category: string
  status: 'pendiente' | 'en-progreso' | 'resuelto'
  createdAt: string
  location: string
}

export default function HomePage() {
  const [statistics, setStatistics] = useState<Statistics>({
    totalReports: 0,
    resolvedReports: 0,
    pendingReports: 0,
    activeUsers: 0,
  })
  
  const [recentReports, setRecentReports] = useState<RecentReport[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simular carga de datos (reemplazar con llamada real a API)
    const loadData = async () => {
      try {
        // Simulación de datos
        setTimeout(() => {
          setStatistics({
            totalReports: 1247,
            resolvedReports: 892,
            pendingReports: 355,
            activeUsers: 3421,
          })
          
          setRecentReports([
            {
              id: '1',
              title: 'Bache en avenida principal',
              category: 'infraestructura',
              status: 'pendiente',
              createdAt: '2026-01-31T10:30:00Z',
              location: 'Avenida Central #123',
            },
            {
              id: '2',
              title: 'Fuga de agua en colonia',
              category: 'agua',
              status: 'en-progreso',
              createdAt: '2026-01-31T09:15:00Z',
              location: 'Colonia Jardines',
            },
            {
              id: '3',
              title: 'Luz pública averiada',
              category: 'alumbrado',
              status: 'resuelto',
              createdAt: '2026-01-30T18:45:00Z',
              location: 'Parque Municipal',
            },
          ])
          
          setIsLoading(false)
        }, 1500)
      } catch (error) {
        console.error('Error al cargar datos:', error)
        setIsLoading(false)
      }
    }

    loadData()
  }, [])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pendiente':
        return 'bg-yellow-100 text-yellow-800'
      case 'en-progreso':
        return 'bg-blue-100 text-blue-800'
      case 'resuelto':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'infraestructura':
        return '🚧'
      case 'agua':
        return '💧'
      case 'alumbrado':
        return '💡'
      default:
        return '📝'
    }
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-32 bg-gray-200 rounded mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="mb-12" role="banner">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-8 text-center">
          <h1 className="text-4xl font-bold mb-4">
            Bienvenido a UrbanPulse
          </h1>
          <p className="text-xl mb-6 max-w-2xl mx-auto">
            El sistema municipal para reportar y seguir incidencias de servicios públicos en tu comunidad
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              href="/auth/register"
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600"
            >
              Crear Cuenta
            </Link>
            <Link
              href="/public/explore"
              className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent"
            >
              Explorar Reportes
            </Link>
          </div>
        </div>
      </section>

      {/* Estadísticas */}
      <section className="mb-12" aria-labelledby="stats-heading">
        <h2 id="stats-heading" className="text-2xl font-bold text-gray-900 mb-6 sr-only">
          Estadísticas del Sistema
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {statistics.totalReports.toLocaleString('es-MX')}
            </div>
            <div className="text-gray-600">Total de Reportes</div>
          </div>
          
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {statistics.resolvedReports.toLocaleString('es-MX')}
            </div>
            <div className="text-gray-600">Reportes Resueltos</div>
          </div>
          
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="text-3xl font-bold text-yellow-600 mb-2">
              {statistics.pendingReports.toLocaleString('es-MX')}
            </div>
            <div className="text-gray-600">Reportes Pendientes</div>
          </div>
          
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="text-3xl font-bold text-purple-600 mb-2">
              {statistics.activeUsers.toLocaleString('es-MX')}
            </div>
            <div className="text-gray-600">Usuarios Activos</div>
          </div>
        </div>
      </section>

      {/* Reportes Recientes */}
      <section aria-labelledby="recent-heading">
        <div className="flex justify-between items-center mb-6">
          <h2 id="recent-heading" className="text-2xl font-bold text-gray-900">
            Reportes Recientes
          </h2>
          <Link
            href="/public/explore"
            className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
            aria-label="Ver todos los reportes"
          >
            Ver todos
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Reporte
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Categoría
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fecha
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ubicación
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {recentReports.map((report) => (
                  <tr key={report.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {report.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex items-center">
                      <span className="mr-2">{getCategoryIcon(report.category)}</span>
                      {report.category.charAt(0).toUpperCase() + report.category.slice(1)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(report.status)}`}>
                        {report.status.replace('-', ' ').toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(report.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {report.location}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  )
}