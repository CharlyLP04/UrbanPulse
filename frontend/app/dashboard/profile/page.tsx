'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/components/providers/auth-provider'
import { getReports, Report } from '@/lib/api'
import Link from 'next/link'

export default function DashboardProfilePage() {
  const { user } = useAuth()
  const [reports, setReports] = useState<Report[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      getReports()
        .then((all) => setReports(all.filter((r) => r.userId === user.id)))
        .catch(console.error)
        .finally(() => setLoading(false))
    }
  }, [user])

  const total = reports.length
  const resueltos = reports.filter((r) => r.status === 'RESOLVED').length
  const activos = reports.filter((r) => r.status === 'OPEN').length
  const enproceso = reports.filter((r) => r.status === 'IN_PROGRESS').length

  const initials = user?.name
    ? user.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
    : '?'

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50/50 relative overflow-hidden flex flex-col items-center">
      {/* Fondo decorativo */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-sky-400/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-5%] right-[-5%] w-[35%] h-[35%] bg-emerald-400/15 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-4xl px-4 sm:px-6 lg:px-8 py-10 z-10 flex flex-col gap-6">

        {/* Card principal del perfil */}
        <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Banner */}
          <div className="h-28 bg-gradient-to-r from-[#1A4B6B] via-[#1e6493] to-[#3282b8] relative">
            <div className="absolute inset-0 opacity-20"
              style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)', backgroundSize: '40px 40px' }}
            />
          </div>

          {/* Avatar + Nombre — claramente debajo del banner */}
          <div className="px-6 py-5 flex flex-row items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-sky-400 to-blue-700 flex items-center justify-center text-white text-2xl font-black shadow-lg border-4 border-white flex-shrink-0">
              {initials}
            </div>
            <div>
              <h1 className="text-2xl font-black text-slate-800 tracking-tight leading-tight">{user?.name}</h1>
              <div className="flex items-center gap-2 mt-1 flex-wrap">
                <span className="text-sm text-slate-500">{user?.email}</span>
                <span className="px-2 py-0.5 bg-sky-100 text-sky-700 text-xs font-bold rounded-full uppercase tracking-wider">
                  {user?.role}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Total Reportes', value: total, icon: '📋', color: 'text-slate-700', bg: 'bg-slate-100' },
            { label: 'Pendientes', value: activos, icon: '🔴', color: 'text-orange-600', bg: 'bg-orange-50' },
            { label: 'En Proceso', value: enproceso, icon: '🔵', color: 'text-blue-600', bg: 'bg-blue-50' },
            { label: 'Resueltos', value: resueltos, icon: '✅', color: 'text-emerald-600', bg: 'bg-emerald-50' },
          ].map((s) => (
            <div key={s.label} className="bg-white/90 rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col gap-2 hover:-translate-y-1 transition-transform duration-300">
              <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center text-xl`}>{s.icon}</div>
              <div className={`text-4xl font-black ${s.color}`}>{loading ? '—' : s.value}</div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Últimos reportes */}
        <div className="bg-white/90 backdrop-blur-md rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
            <h2 className="font-black text-slate-700 text-lg">Mis reportes recientes</h2>
            <Link href="/dashboard/create-report" className="text-sm font-bold text-sky-600 hover:underline">
              + Crear nuevo
            </Link>
          </div>

          <div className="divide-y divide-gray-50">
            {loading ? (
              <div className="flex justify-center py-10">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-600" />
              </div>
            ) : reports.length === 0 ? (
              <div className="flex flex-col items-center py-12 text-slate-400 gap-2">
                <span className="text-4xl">📭</span>
                <p className="font-semibold">Aún no has creado reportes</p>
                <Link href="/dashboard/create-report" className="mt-2 text-sm bg-sky-600 text-white font-bold px-5 py-2 rounded-lg hover:bg-sky-700 transition-colors">
                  Crear mi primer reporte
                </Link>
              </div>
            ) : (
              reports.slice(0, 6).map((r) => {
                const statusMap: Record<string, { label: string; cls: string }> = {
                  OPEN:        { label: 'Pendiente',  cls: 'bg-orange-50 text-orange-600 border-orange-200' },
                  IN_PROGRESS: { label: 'En proceso', cls: 'bg-blue-50 text-blue-600 border-blue-200' },
                  RESOLVED:    { label: 'Resuelto',   cls: 'bg-emerald-50 text-emerald-600 border-emerald-200' },
                  CLOSED:      { label: 'Cerrado',    cls: 'bg-slate-100 text-slate-500 border-slate-200' },
                }
                const badge = statusMap[r.status] ?? { label: r.status, cls: 'bg-gray-100 text-gray-500 border-gray-200' }

                return (
                  <div key={r.id} className="px-6 py-4 flex items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors">
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-slate-800 truncate">{r.title}</p>
                      <p className="text-xs text-slate-400 mt-0.5 truncate">{r.location || 'Ubicación no especificada'} · {r.category?.name || 'Sin categoría'}</p>
                    </div>
                    <span className={`flex-shrink-0 px-3 py-1 text-xs font-bold rounded-full border ${badge.cls}`}>
                      {badge.label}
                    </span>
                  </div>
                )
              })
            )}
          </div>
        </div>

        {/* Correo y datos extra */}
        <div className="bg-white/90 backdrop-blur-md rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="font-black text-slate-700 text-lg mb-4">Información de la cuenta</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { label: 'Nombre completo', value: user?.name },
              { label: 'Correo electrónico', value: user?.email },
              { label: 'Rol', value: user?.role?.toUpperCase() },
              { label: 'Miembro desde', value: 'UrbanPulse 2026' },
            ].map((item) => (
              <div key={item.label} className="flex flex-col gap-1">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{item.label}</span>
                <span className="text-sm font-semibold text-slate-700">{item.value || '—'}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
