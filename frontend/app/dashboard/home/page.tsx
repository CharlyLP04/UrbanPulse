'use client'

import React, { useEffect, useState } from 'react'
import { useAuth } from '@/components/providers/auth-provider'
import Link from 'next/link'
import { getReports, Report } from '@/lib/api'

const STATUS_CONFIG: Record<string, { label: string; border: string; text: string; bg: string; dot: string }> = {
  OPEN:        { label: 'Pendiente',   border: 'border-orange-200', text: 'text-orange-600',  bg: 'bg-orange-50',  dot: 'bg-orange-500 animate-pulse' },
  IN_PROGRESS: { label: 'En Proceso',  border: 'border-blue-200',   text: 'text-blue-600',    bg: 'bg-blue-50',    dot: 'bg-blue-500' },
  RESOLVED:    { label: 'Resuelto',    border: 'border-emerald-200', text: 'text-emerald-600', bg: 'bg-emerald-50', dot: 'bg-emerald-500' },
  CLOSED:      { label: 'Cerrado',     border: 'border-slate-200',  text: 'text-slate-500',   bg: 'bg-slate-100',  dot: 'bg-slate-300' },
}

export default function DashboardHome() {
  const { user } = useAuth()
  const [reports, setReports] = useState<Report[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      getReports()
        .then((allReports) => {
          const userReports = allReports.filter(r => r.userId === user.id)
          setReports(userReports)
        })
        .catch(console.error)
        .finally(() => setLoading(false))
    }
  }, [user])

  const activosCount    = reports.filter(r => r.status === 'OPEN').length
  const resueltosCount  = reports.filter(r => r.status === 'RESOLVED').length
  const procesoCount    = reports.filter(r => r.status === 'IN_PROGRESS').length
  const cerradosCount   = reports.filter(r => r.status === 'CLOSED').length

  const resumentStats = [
    { title: 'Pendientes', value: activosCount,   color: 'text-orange-500', bg: 'bg-orange-100',  icon: '📋' },
    { title: 'En Revisión', value: procesoCount,  color: 'text-blue-500',   bg: 'bg-blue-100',    icon: '🔍' },
    { title: 'Resueltos',  value: resueltosCount, color: 'text-emerald-500', bg: 'bg-emerald-100', icon: '✅' },
    { title: 'Cerrados',   value: cerradosCount,  color: 'text-slate-500',  bg: 'bg-slate-100',   icon: '📂' },
  ]

  const ultimosReportes = reports.slice(0, 5)

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50/50 relative overflow-hidden flex flex-col items-center">
      {/* Fondo decorativo */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-400/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-400/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-8 md:py-12 z-10 flex flex-col gap-8">

        {/* Cabecera */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white/80 backdrop-blur-md p-6 lg:p-8 rounded-2xl shadow-sm border border-gray-100">
          <div>
            <h1 className="text-3xl font-black text-slate-800 tracking-tight mb-1">
              ¡Hola, <span className="text-sky-600">{user?.name?.split(' ')[0] || 'Ciudadano'}</span>! 👋
            </h1>
            <p className="text-slate-500 font-medium">
              Tienes <span className="font-bold text-slate-700">{loading ? '…' : reports.length}</span> reporte{reports.length !== 1 ? 's' : ''} registrado{reports.length !== 1 ? 's' : ''}.
            </p>
          </div>
          <Link
            href="/dashboard/create-report"
            className="flex-shrink-0 bg-sky-600 hover:bg-sky-700 text-white font-bold py-2.5 px-6 rounded-xl shadow-md shadow-sky-600/20 transition-all active:scale-95 flex items-center gap-2"
          >
            <span className="text-lg leading-none">+</span> Nuevo Reporte
          </Link>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {resumentStats.map((stat, i) => (
            <div key={i} className="bg-white/90 backdrop-blur-md rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all hover:-translate-y-1 duration-300">
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-10 h-10 rounded-lg ${stat.bg} flex items-center justify-center text-xl`}>
                  {stat.icon}
                </div>
                <h3 className="text-xs sm:text-sm font-bold text-slate-500 uppercase tracking-wider">{stat.title}</h3>
              </div>
              <div className={`text-4xl font-black ${stat.color}`}>
                {loading ? <div className="h-10 w-10 bg-slate-100 rounded-lg animate-pulse" /> : stat.value}
              </div>
            </div>
          ))}
        </div>

        {/* Reportes recientes */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-100/50 overflow-hidden">
          <div className="p-6 border-b border-gray-100 bg-white/50 flex justify-between items-center">
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              📋 Mis Reportes Recientes
            </h2>
            <Link href="/public/explore" className="text-sky-600 font-semibold text-sm hover:underline">
              Ver todos los reportes
            </Link>
          </div>

          <div className="divide-y divide-gray-100/80 min-h-[150px]">
            {loading ? (
              <div className="flex justify-center items-center py-10">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-600" />
              </div>
            ) : ultimosReportes.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 gap-3 text-slate-400">
                <span className="text-4xl">📭</span>
                <p className="font-semibold">No tienes reportes aún</p>
                <Link href="/dashboard/create-report" className="mt-1 text-sm bg-sky-600 text-white font-bold px-5 py-2 rounded-lg hover:bg-sky-700 transition-colors">
                  Crear mi primer reporte
                </Link>
              </div>
            ) : ultimosReportes.map((report) => {
              const cfg = STATUS_CONFIG[report.status] ?? STATUS_CONFIG['CLOSED']
              return (
                <Link
                  key={report.id}
                  href={`/public/explore/${report.id}`}
                  className="p-5 hover:bg-slate-50/50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${cfg.dot}`} />
                    <div>
                      <h4 className="font-bold text-slate-800 group-hover:text-sky-700 transition-colors">{report.title}</h4>
                      <p className="text-slate-500 text-sm flex items-center gap-1 mt-0.5">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {report.location || 'Ubicación no especificada'}
                        {report.category && (
                          <span className="ml-2 text-xs font-semibold" style={{ color: report.category.color }}>
                            · {report.category.name}
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className={`px-3 py-1 text-xs font-bold rounded-full border ${cfg.bg} ${cfg.text} ${cfg.border}`}>
                      {cfg.label}
                    </span>
                    <svg className="w-4 h-4 text-slate-300 group-hover:text-sky-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>

      </div>
    </div>
  )
}
