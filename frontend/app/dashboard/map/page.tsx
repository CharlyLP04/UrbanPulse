'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { getReports, Report } from '@/lib/api'
import Link from 'next/link'

// Leaflet solo puede correr en el cliente — importación dinámica obligatoria
const MapView = dynamic(() => import('@/components/map/MapView'), { ssr: false })

const STATUS_CONFIG: Record<string, { label: string; color: string }> = {
  OPEN:        { label: 'Pendiente',  color: '#f97316' },
  IN_PROGRESS: { label: 'En proceso', color: '#3b82f6' },
  RESOLVED:    { label: 'Resuelto',   color: '#10b981' },
  CLOSED:      { label: 'Cerrado',    color: '#94a3b8' },
}

export default function MapPage() {
  const [reports, setReports] = useState<Report[]>([])
  const [loading, setLoading] = useState(true)
  const [filterStatus, setFilterStatus] = useState<string>('ALL')

  useEffect(() => {
    getReports()
      .then(setReports)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  // Solo reportes con coordenadas
  const geoReports = reports.filter(r => r.latitude != null && r.longitude != null)
  const filtered = filterStatus === 'ALL'
    ? geoReports
    : geoReports.filter(r => r.status === filterStatus)

  const reportsWithoutCoords = reports.length - geoReports.length

  return (
    <div className="flex flex-col h-[calc(100vh-64px)]">

      {/* Toolbar */}
      <div className="bg-white border-b border-gray-100 shadow-sm px-6 py-3 flex items-center justify-between gap-4 flex-wrap z-10">
        <div className="flex items-center gap-3">
          <h1 className="text-lg font-black text-slate-800 flex items-center gap-2">
            🗺️ Mapa de Reportes
          </h1>
          <span className="text-xs bg-slate-100 text-slate-500 font-semibold px-2 py-1 rounded-full">
            {loading ? '…' : `${filtered.length} en mapa`}
          </span>
        </div>

        {/* Filtros por estado */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setFilterStatus('ALL')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${filterStatus === 'ALL' ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
          >
            Todos ({geoReports.length})
          </button>
          {Object.entries(STATUS_CONFIG).map(([key, cfg]) => {
            const count = geoReports.filter(r => r.status === key).length
            return (
              <button
                key={key}
                onClick={() => setFilterStatus(key)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${filterStatus === key ? 'text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                style={filterStatus === key ? { backgroundColor: cfg.color } : undefined}
              >
                {cfg.label} ({count})
              </button>
            )
          })}
        </div>

        <Link
          href="/dashboard/create-report"
          className="text-xs bg-sky-600 hover:bg-sky-700 text-white font-bold px-4 py-2 rounded-lg transition-colors flex-shrink-0"
        >
          + Nuevo Reporte
        </Link>
      </div>

      {/* Aviso si hay reportes sin coords */}
      {reportsWithoutCoords > 0 && !loading && (
        <div className="bg-amber-50 border-b border-amber-200 px-6 py-2 text-xs text-amber-700 font-medium flex items-center gap-2">
          <span>⚠️</span>
          <span>
            {reportsWithoutCoords} reporte{reportsWithoutCoords !== 1 ? 's' : ''} no aparece{reportsWithoutCoords !== 1 ? 'n' : ''} en el mapa por no tener coordenadas guardadas.
            Los nuevos reportes creados con GPS sí aparecerán.
          </span>
        </div>
      )}

      {/* Mapa */}
      <div className="flex-1 relative">
        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
            <div className="flex flex-col items-center gap-3">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600" />
              <p className="text-slate-500 font-semibold">Cargando reportes...</p>
            </div>
          </div>
        ) : (
          <MapView reports={filtered} />
        )}
      </div>

    </div>
  )
}
