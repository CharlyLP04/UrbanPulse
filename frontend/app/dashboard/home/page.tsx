'use client'

import React from 'react'
import { useAuth } from '@/components/providers/auth-provider'
import Link from 'next/link'

export default function DashboardHome() {
  const { user, logout } = useAuth()

  // Mock data para reportes
  const resumentStats = [
    { title: 'Reportes Activos', value: '142', color: 'text-orange-500', bg: 'bg-orange-100', icon: '📋' },
    { title: 'Resueltos (Mes)', value: '328', color: 'text-emerald-500', bg: 'bg-emerald-100', icon: '✅' },
    { title: 'En Revisión', value: '45', color: 'text-blue-500', bg: 'bg-blue-100', icon: '🔍' },
    { title: 'Falsas Alarmas', value: '12', color: 'text-red-500', bg: 'bg-red-100', icon: '⚠️' }
  ]

  const ultimosReportes = [
    { id: 'REP-001', tipo: 'Bacheo', ubicacion: 'Av. Constitución 402', estado: 'Pendiente', urgente: true },
    { id: 'REP-002', tipo: 'Alumbrado', ubicacion: 'Parque Central', estado: 'Asignado', urgente: false },
    { id: 'REP-003', tipo: 'Fuga de Agua', ubicacion: 'Col. Las Rosas', estado: 'Resolviendo', urgente: true },
    { id: 'REP-004', tipo: 'Basura', ubicacion: 'Callejón del Sapo', estado: 'Resuelto', urgente: false }
  ]

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50/50 relative overflow-hidden flex flex-col items-center">
      {/* Elementos decorativos de fondo abstractos */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-400/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-400/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-8 md:py-12 z-10 flex flex-col gap-8 animate-fade-in my-auto">
        
        {/* Cabecera / Bienvenida */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white/80 backdrop-blur-md p-6 lg:p-8 rounded-2xl shadow-sm border border-gray-100">
          <div>
            <h1 className="text-3xl font-black text-slate-800 tracking-tight mb-2">
              ¡Hola, <span className="text-sky-600">{user?.name || 'Ciudadano'}</span>! 👋
            </h1>
            <p className="text-slate-500 font-medium">
              Aquí tienes el resumen de incidencias de la ciudad en tiempo real.
            </p>
          </div>
          <div className="flex gap-3 w-full md:w-auto mt-2 md:mt-0">
            <button className="flex-1 md:flex-none bg-sky-600 hover:bg-sky-700 text-white font-bold py-2.5 px-6 rounded-xl shadow-md shadow-sky-600/20 transition-all active:scale-95 flex items-center justify-center gap-2">
              <span className="text-lg">+</span> Nuevo Reporte
            </button>
            <button 
              onClick={logout}
              className="md:flex-none bg-white hover:bg-red-50 text-slate-700 hover:text-red-600 font-bold py-2.5 px-6 rounded-xl shadow-sm border border-gray-200 transition-all active:scale-95"
            >
              Salir
            </button>
          </div>
        </div>

        {/* Tarjetas de Estadísticas */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {resumentStats.map((stat, i) => (
            <div key={i} className="bg-white/90 backdrop-blur-md rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow hover:-translate-y-1 duration-300">
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-10 h-10 rounded-lg ${stat.bg} flex items-center justify-center text-xl`}>
                  {stat.icon}
                </div>
                <h3 className="text-xs sm:text-sm font-bold text-slate-500 uppercase tracking-wider">{stat.title}</h3>
              </div>
              <div className={`text-4xl font-black ${stat.color}`}>
                {stat.value}
              </div>
            </div>
          ))}
        </div>

        {/* Listado de Reportes Recientes Glassmorphism */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-100/50 overflow-hidden flex-1">
          <div className="p-6 border-b border-gray-100 bg-white/50 flex justify-between items-center">
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              📍 Últimos Reportes Cercanos
            </h2>
            <Link href="#" className="text-sky-600 font-semibold text-sm hover:underline">Ver mapa completo</Link>
          </div>
          
          <div className="divide-y divide-gray-100/80">
            {ultimosReportes.map((report) => (
              <div key={report.id} className="p-6 hover:bg-slate-50/50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className={`w-2 h-2 rounded-full ${report.urgente ? 'bg-red-500 animate-pulse' : 'bg-slate-300'}`} />
                  <div>
                    <h4 className="font-bold text-slate-800 text-lg">{report.tipo} <span className="text-sm font-medium text-slate-400 ml-2">#{report.id}</span></h4>
                    <p className="text-slate-500 text-sm flex items-center gap-1 mt-1">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                      {report.ubicacion}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 text-xs font-bold rounded-full border ${
                    report.estado === 'Pendiente' ? 'bg-orange-50 text-orange-600 border-orange-200' :
                    report.estado === 'Asignado' ? 'bg-blue-50 text-blue-600 border-blue-200' :
                    report.estado === 'Resolviendo' ? 'bg-purple-50 text-purple-600 border-purple-200' :
                    'bg-emerald-50 text-emerald-600 border-emerald-200'
                  }`}>
                    {report.estado}
                  </span>
                  <button className="text-slate-400 hover:text-sky-600 transition-colors p-2">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
