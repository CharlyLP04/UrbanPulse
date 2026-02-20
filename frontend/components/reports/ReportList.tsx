'use client'
import { useState, useEffect } from 'react'
import EmptyState from '@/components/ui/EmptyState'
import Loader from '@/components/ui/Loader'
import { ReportListSkeleton } from '@/components/ui/Skeleton'
import { getReports, Report } from '@/lib/api'

export default function ReportList() {
  const [reports, setReports] = useState<Report[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getReports()
      .then(setReports)
      .catch(() => setError('Error al cargar los reportes'))
      .finally(() => setLoading(false))
  }, [])

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'OPEN': return 'Abierto'
      case 'IN_PROGRESS': return 'En Progreso'
      case 'RESOLVED': return 'Resuelto'
      case 'CLOSED': return 'Cerrado'
      default: return status
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'OPEN': return 'bg-yellow-100 text-yellow-800'
      case 'IN_PROGRESS': return 'bg-blue-100 text-blue-800'
      case 'RESOLVED': return 'bg-green-100 text-green-800'
      case 'CLOSED': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <section role="region" aria-label="Lista de reportes">
      {loading ? (
        <div aria-live="polite" aria-busy="true" className="space-y-3">
          <Loader label="Cargando reportes..." />
          <ReportListSkeleton items={3} />
        </div>
      ) : error ? (
        <div className="text-center py-8">
          <p className="text-red-500 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Reintentar
          </button>
        </div>
      ) : reports.length === 0 ? (
        <EmptyState
          title="Sin reportes por mostrar"
          description="Todavía no hay reportes disponibles. Intenta de nuevo en unos minutos."
        />
      ) : (
        <ul role="list" className="space-y-3">
          {reports.map((report) => (
            <li
              key={report.id}
              role="listitem"
              tabIndex={0}
              className="rounded-md border border-gray-200 p-4 hover:bg-gray-50"
            >
              <h3 className="text-base font-semibold text-gray-900">{report.title}</h3>
              <p className="mt-1 text-sm text-gray-600">{report.description}</p>
              <span className={`mt-2 inline-block text-xs font-medium uppercase tracking-wide px-2 py-1 rounded ${getStatusColor(report.status)}`}>
                {getStatusLabel(report.status)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
