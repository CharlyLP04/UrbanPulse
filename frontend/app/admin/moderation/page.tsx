'use client'

import { useEffect, useState } from 'react'
import { getReports, Report } from '@/lib/api'
import Link from 'next/link'

const STATUS_OPTIONS = [
  { value: 'OPEN',        label: 'Pendiente',   cls: 'bg-orange-100 text-orange-700' },
  { value: 'IN_PROGRESS', label: 'En proceso',  cls: 'bg-blue-100 text-blue-700' },
  { value: 'RESOLVED',    label: 'Resuelto',    cls: 'bg-emerald-100 text-emerald-700' },
  { value: 'CLOSED',      label: 'Cerrado',     cls: 'bg-slate-100 text-slate-600' },
]

function getStatusStyle(status: string) {
  return STATUS_OPTIONS.find((s) => s.value === status) ?? { label: status, cls: 'bg-gray-100 text-gray-600' }
}

export default function AdminModerationPage() {
  const [reports, setReports] = useState<Report[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<string>('ALL')
  const [updating, setUpdating] = useState<string | null>(null)
  const [deleting, setDeleting] = useState<string | null>(null)
  const [toast, setToast] = useState<string | null>(null)

  useEffect(() => {
    getReports()
      .then(setReports)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(null), 3000)
  }

  const handleStatusChange = async (reportId: string, newStatus: string) => {
    setUpdating(reportId)
    try {
      const res = await fetch(`/api/admin/reports/${reportId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      })
      const data = await res.json()
      if (data.success) {
        setReports((prev) => prev.map((r) => r.id === reportId ? { ...r, status: newStatus } : r))
        showToast('✅ Estado actualizado correctamente')
      } else {
        showToast('❌ Error al actualizar el estado')
      }
    } catch {
      showToast('❌ Error de red')
    } finally {
      setUpdating(null)
    }
  }

  const handleDelete = async (reportId: string, title: string) => {
    if (!confirm(`¿Eliminar el reporte "${title}"? Esta acción no se puede deshacer.`)) return
    setDeleting(reportId)
    try {
      const res = await fetch(`/api/admin/reports/${reportId}`, { method: 'DELETE' })
      const data = await res.json()
      if (data.success) {
        setReports((prev) => prev.filter((r) => r.id !== reportId))
        showToast('🗑️ Reporte eliminado')
      } else {
        showToast('❌ Error al eliminar')
      }
    } catch {
      showToast('❌ Error de red')
    } finally {
      setDeleting(null)
    }
  }

  const filtered = filter === 'ALL' ? reports : reports.filter((r) => r.status === filter)

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50 py-10 px-4">
      {/* Toast */}
      {toast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-slate-800 text-white px-6 py-3 rounded-xl shadow-xl font-semibold text-sm transition-all animate-in fade-in slide-in-from-top-4">
          {toast}
        </div>
      )}

      <div className="max-w-7xl mx-auto flex flex-col gap-6">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black text-slate-800">🛡️ Moderación de Reportes</h1>
            <p className="text-slate-500 mt-1">Gestiona el estado de todos los reportes ciudadanos</p>
          </div>
          <Link href="/admin/dashboard" className="text-sm font-bold text-slate-500 hover:text-slate-800 transition-colors">
            ← Panel Admin
          </Link>
        </div>

        {/* Filtro por estado */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilter('ALL')}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-colors ${filter === 'ALL' ? 'bg-slate-800 text-white' : 'bg-white border border-gray-200 text-slate-600 hover:bg-slate-50'}`}
          >
            Todos ({reports.length})
          </button>
          {STATUS_OPTIONS.map((opt) => {
            const count = reports.filter((r) => r.status === opt.value).length
            return (
              <button
                key={opt.value}
                onClick={() => setFilter(opt.value)}
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-colors ${filter === opt.value ? 'bg-slate-800 text-white' : 'bg-white border border-gray-200 text-slate-600 hover:bg-slate-50'}`}
              >
                {opt.label} ({count})
              </button>
            )
          })}
        </div>

        {/* Tabla de reportes */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {loading ? (
            <div className="py-16 text-center">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-rose-600 mx-auto" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-16 text-center text-slate-400 font-semibold">Sin reportes para este filtro</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 border-b border-gray-100">
                  <tr>
                    <th className="text-left px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Reporte</th>
                    <th className="text-left px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Usuario</th>
                    <th className="text-left px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Categoría</th>
                    <th className="text-left px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Estado</th>
                    <th className="text-left px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Fecha</th>
                    <th className="text-left px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filtered.map((r) => {
                    const statusStyle = getStatusStyle(r.status)
                    const isUpdating = updating === r.id
                    const isDeleting = deleting === r.id

                    return (
                      <tr key={r.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-4 max-w-xs">
                          <p className="font-bold text-slate-800 truncate">{r.title}</p>
                          <p className="text-xs text-slate-400 truncate mt-0.5">{r.location || '—'}</p>
                        </td>
                        <td className="px-6 py-4 text-slate-600 font-medium">{r.user?.name ?? '—'}</td>
                        <td className="px-6 py-4">
                          <span className="text-xs px-2 py-1 rounded-full font-semibold"
                            style={{ backgroundColor: `${r.category?.color}22`, color: r.category?.color }}>
                            {r.category?.name ?? 'Sin categoría'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <select
                            value={r.status}
                            disabled={isUpdating}
                            onChange={(e) => handleStatusChange(r.id, e.target.value)}
                            className={`text-xs font-bold px-3 py-1.5 rounded-lg border-0 outline-none cursor-pointer ${statusStyle.cls}`}
                          >
                            {STATUS_OPTIONS.map((opt) => (
                              <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                          </select>
                        </td>
                        <td className="px-6 py-4 text-xs text-slate-400">
                          {new Date(r.createdAt).toLocaleDateString('es-ES')}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <Link
                              href={`/public/explore/${r.id}`}
                              target="_blank"
                              className="text-xs px-3 py-1.5 bg-sky-50 text-sky-700 hover:bg-sky-100 rounded-lg font-bold transition-colors"
                            >
                              Ver
                            </Link>
                            <button
                              onClick={() => handleDelete(r.id, r.title)}
                              disabled={isDeleting}
                              className="text-xs px-3 py-1.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg font-bold transition-colors disabled:opacity-50"
                            >
                              {isDeleting ? '...' : 'Eliminar'}
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}
