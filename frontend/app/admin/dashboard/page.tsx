'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/components/providers/auth-provider'
import { getReports, Report } from '@/lib/api'
import Link from 'next/link'

interface AdminUser {
  id: string
  name: string
  email: string
  role: string
  emailVerified: boolean
  createdAt: string
  _count: { reports: number }
}

const ROLE_COLORS: Record<string, string> = {
  admin:     'bg-red-100 text-red-700',
  moderator: 'bg-purple-100 text-purple-700',
  user:      'bg-sky-100 text-sky-700',
}

const STATUS_LABELS: Record<string, string> = {
  OPEN: 'Pendiente', IN_PROGRESS: 'En proceso', RESOLVED: 'Resuelto', CLOSED: 'Cerrado',
}

export default function AdminDashboardPage() {
  const { user } = useAuth()
  const [reports, setReports] = useState<Report[]>([])
  const [users, setUsers] = useState<AdminUser[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      getReports(),
      fetch('/api/admin/users').then((r) => r.json()),
    ])
      .then(([rpts, usrData]) => {
        setReports(rpts)
        if (usrData.success) setUsers(usrData.users)
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const open = reports.filter((r) => r.status === 'OPEN').length
  const inProgress = reports.filter((r) => r.status === 'IN_PROGRESS').length
  const resolved = reports.filter((r) => r.status === 'RESOLVED').length
  const closed = reports.filter((r) => r.status === 'CLOSED').length

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50 py-10 px-4">
      <div className="max-w-7xl mx-auto flex flex-col gap-8">

        {/* Header */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="h-3 bg-gradient-to-r from-red-600 via-rose-500 to-orange-400" />
          <div className="px-8 py-6 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-black text-slate-800 tracking-tight">Panel de Administración</h1>
              <p className="text-slate-500 mt-1">Bienvenido, <span className="font-bold text-slate-700">{user?.name}</span> · Rol: <span className="text-red-600 font-bold uppercase text-xs">Admin</span></p>
            </div>
            <Link href="/admin/moderation" className="bg-rose-600 hover:bg-rose-700 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-colors shadow-md">
              🛡️ Moderación
            </Link>
          </div>
        </div>

        {/* Stats de reportes */}
        <div>
          <h2 className="text-lg font-black text-slate-600 mb-3 uppercase tracking-wider">Reportes</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Pendientes',  value: open,       icon: '🔴', cls: 'text-orange-600', bg: 'bg-orange-50' },
              { label: 'En Proceso',  value: inProgress, icon: '🔵', cls: 'text-blue-600',   bg: 'bg-blue-50' },
              { label: 'Resueltos',   value: resolved,   icon: '✅', cls: 'text-emerald-600', bg: 'bg-emerald-50' },
              { label: 'Cerrados',    value: closed,     icon: '📂', cls: 'text-slate-500',   bg: 'bg-slate-100' },
            ].map((s) => (
              <div key={s.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col gap-2">
                <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center text-xl`}>{s.icon}</div>
                <div className={`text-4xl font-black ${s.cls}`}>{loading ? '—' : s.value}</div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats de usuarios */}
        <div>
          <h2 className="text-lg font-black text-slate-600 mb-3 uppercase tracking-wider">Usuarios ({loading ? '…' : users.length})</h2>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 border-b border-gray-100">
                  <tr>
                    <th className="text-left px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Usuario</th>
                    <th className="text-left px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Email</th>
                    <th className="text-left px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Rol</th>
                    <th className="text-left px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Verificado</th>
                    <th className="text-left px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Reportes</th>
                    <th className="text-left px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Registro</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {loading ? (
                    <tr><td colSpan={6} className="py-10 text-center text-slate-400">Cargando...</td></tr>
                  ) : users.length === 0 ? (
                    <tr><td colSpan={6} className="py-10 text-center text-slate-400">Sin usuarios</td></tr>
                  ) : users.map((u) => (
                    <tr key={u.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center text-white text-xs font-black flex-shrink-0">
                            {u.name.charAt(0).toUpperCase()}
                          </div>
                          <span className="font-semibold text-slate-800">{u.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-500">{u.email}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${ROLE_COLORS[u.role.toLowerCase()] ?? 'bg-gray-100 text-gray-600'}`}>
                          {u.role.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={u.emailVerified ? 'text-emerald-600 font-bold' : 'text-orange-500 font-bold'}>
                          {u.emailVerified ? '✅ Sí' : '⚠️ No'}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-bold text-slate-700">{u._count.reports}</td>
                      <td className="px-6 py-4 text-slate-400 text-xs">
                        {new Date(u.createdAt).toLocaleDateString('es-ES')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Últimos 8 reportes */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-black text-slate-600 uppercase tracking-wider">Últimos Reportes</h2>
            <Link href="/admin/moderation" className="text-sm font-bold text-rose-600 hover:underline">
              Ver todos →
            </Link>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="divide-y divide-gray-50">
              {loading ? (
                <div className="py-10 text-center text-slate-400">Cargando...</div>
              ) : reports.slice(0, 8).map((r) => (
                <div key={r.id} className="px-6 py-4 flex items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors">
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-slate-800 truncate">{r.title}</p>
                    <p className="text-xs text-slate-400 mt-0.5 truncate">
                      {r.user?.name} · {r.category?.name ?? 'Sin categoría'} · {new Date(r.createdAt).toLocaleDateString('es-ES')}
                    </p>
                  </div>
                  <span className="flex-shrink-0 text-xs font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-600">
                    {STATUS_LABELS[r.status] ?? r.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
