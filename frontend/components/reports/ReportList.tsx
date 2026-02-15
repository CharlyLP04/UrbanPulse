'use client'
import { useState, useEffect } from 'react'
import EmptyState from '@/components/ui/EmptyState'
import Loader from '@/components/ui/Loader'
import { ReportListSkeleton } from '@/components/ui/Skeleton'

interface Report {
  id: string
  title: string
  description: string
  status: string
}
export default function ReportList() {
  const [reports, setReports] = useState<Report[]>([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    // Simular carga de datos
    setTimeout(() => {
      setReports([
        { id: '1', title: 'Bache en calle principal', description: 'Bache grande', status: 'pending' },
        { id: '2', title: 'Luz fundida', description: 'Poste sin luz', status: 'in_progress' }
      ])
      setLoading(false)
    }, 1000)
  }, [])

  return (
    <section role="region" aria-label="Lista de reportes">
      {loading ? (
        <div aria-live="polite" aria-busy="true" className="space-y-3">
          <Loader label="Cargando reportes..." />
          <ReportListSkeleton items={3} />
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
              className="rounded-md border border-gray-200 p-4"
            >
              <h3 className="text-base font-semibold text-gray-900">{report.title}</h3>
              <p className="mt-1 text-sm text-gray-600">{report.description}</p>
              <span className="mt-2 inline-block text-xs font-medium uppercase tracking-wide text-gray-700">
                Status: {report.status}
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
