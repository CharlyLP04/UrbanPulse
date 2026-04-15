'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'

interface ReportDetail {
  id: string
  title: string
  description: string
  location: string | null
  status: string
  createdAt: string
  updatedAt: string
  category: { name: string; color: string } | null
  user: { name: string } | null
  _count: { votes: number; comments: number }
}

const STATUS_MAP: Record<string, { label: string; cls: string }> = {
  OPEN:        { label: 'Pendiente',   cls: 'bg-orange-100 text-orange-700 border-orange-300' },
  IN_PROGRESS: { label: 'En proceso',  cls: 'bg-blue-100 text-blue-700 border-blue-300' },
  RESOLVED:    { label: 'Resuelto',    cls: 'bg-emerald-100 text-emerald-700 border-emerald-300' },
  CLOSED:      { label: 'Cerrado',     cls: 'bg-slate-100 text-slate-600 border-slate-300' },
}

export default function ReportDetailPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const [report, setReport] = useState<ReportDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!id) return
    fetch(`/api/reports/${id}`)
      .then((r) => r.json())
      .then((data) => setReport(data.report ?? data))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [id])

  const handleShare = async () => {
    const url = window.location.href
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch {
      // Fallback para navegadores sin permiso de clipboard
      window.prompt('Copia este enlace:', url)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600" />
      </div>
    )
  }

  if (!report) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 gap-4">
        <span className="text-6xl">🔍</span>
        <h1 className="text-2xl font-black text-slate-700">Reporte no encontrado</h1>
        <Link href="/public/explore" className="text-sky-600 font-semibold hover:underline">← Volver a Explorar</Link>
      </div>
    )
  }

  const badge = STATUS_MAP[report.status] ?? { label: report.status, cls: 'bg-gray-100 text-gray-600 border-gray-300' }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50 py-10 px-4">
      <div className="max-w-3xl mx-auto flex flex-col gap-6">

        {/* Breadcrumb */}
        <nav className="text-sm text-slate-500 flex items-center gap-2">
          <Link href="/" className="hover:text-sky-600 transition-colors">Inicio</Link>
          <span>/</span>
          <Link href="/public/explore" className="hover:text-sky-600 transition-colors">Explorar</Link>
          <span>/</span>
          <span className="text-slate-700 font-semibold truncate">{report.title}</span>
        </nav>

        {/* Card principal */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Header de color */}
          <div className="h-3 bg-gradient-to-r from-[#1A4B6B] to-[#3282b8]" />

          <div className="p-6 sm:p-8 flex flex-col gap-5">
            {/* Título y badge */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
              <h1 className="text-2xl sm:text-3xl font-black text-slate-800 leading-tight">{report.title}</h1>
              <span className={`self-start flex-shrink-0 px-3 py-1 rounded-full text-sm font-bold border ${badge.cls}`}>
                {badge.label}
              </span>
            </div>

            {/* Categoría */}
            {report.category && (
              <div className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: report.category.color }}
                />
                <span className="text-sm font-semibold text-slate-500">{report.category.name}</span>
              </div>
            )}

            {/* Descripción */}
            <p className="text-slate-700 leading-relaxed text-base">{report.description}</p>

            {/* Meta info */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 py-4 border-t border-b border-gray-100">
              <div className="flex flex-col gap-1">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Ubicación</span>
                <span className="text-sm font-semibold text-slate-700 flex items-center gap-1">
                  📍 {report.location || 'No especificada'}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Reportado por</span>
                <span className="text-sm font-semibold text-slate-700 flex items-center gap-1">
                  👤 {report.user?.name || 'Anónimo'}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Fecha</span>
                <span className="text-sm font-semibold text-slate-700">
                  🕐 {new Date(report.createdAt).toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' })}
                </span>
              </div>
            </div>

            {/* Contadores */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-slate-600">
                <span className="text-2xl font-black text-sky-600">{report._count?.votes ?? 0}</span>
                <span className="text-sm font-semibold">votos de apoyo</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <span className="text-2xl font-black text-slate-500">{report._count?.comments ?? 0}</span>
                <span className="text-sm font-semibold">comentarios</span>
              </div>
            </div>

            {/* Acciones */}
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={handleShare}
                className="flex items-center gap-2 px-5 py-2.5 border-2 border-sky-600 text-sky-600 hover:bg-sky-600 hover:text-white font-bold rounded-xl transition-all text-sm"
              >
                {copied ? '✅ ¡Enlace copiado!' : '🔗 Compartir enlace'}
              </button>
              <button
                onClick={() => router.back()}
                className="flex items-center gap-2 px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-all text-sm"
              >
                ← Volver
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
