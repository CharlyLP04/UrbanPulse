'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Report } from './types'

type ReportCardProps = {
  report: Report
  onVote: (reportId: string) => void
}

const getBadgeClass = (status: Report['status']) => {
  if (status === 'urgente') return 'badge-urgente'
  if (status === 'proceso') return 'badge-proceso'
  if (status === 'resuelto') return 'badge-resuelto'
  return 'badge-pendiente'
}

const getStatusLabel = (status: Report['status']) => {
  if (status === 'urgente') return 'Alta Prioridad'
  if (status === 'proceso') return 'En Proceso'
  if (status === 'resuelto') return 'Resuelto'
  return 'Pendiente'
}

export default function ReportCard({ report, onVote }: ReportCardProps) {
  const [copied, setCopied] = useState(false)

  const handleShare = async () => {
    const url = `${window.location.origin}/public/explore/${report.id}`
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch {
      window.prompt('Copia este enlace:', url)
    }
  }

  return (
    <div
      className={`report-card ${report.status === 'urgente' ? 'urgente' : ''} ${
        report.status === 'resuelto' ? 'resuelto' : ''
      }`}
    >
      <div className="report-image">{report.emoji}</div>
      <div className="report-content">
        <div>
          <div className="report-header">
            <div>
              <h3 className="report-title">{report.title}</h3>
              <span className={`status-badge ${getBadgeClass(report.status)}`}>
                {getStatusLabel(report.status)}
              </span>
            </div>
          </div>

          <p className="report-description">{report.description}</p>

          <div className="report-meta">
            <div className="meta-item">📍 {report.location}</div>
            <div className="meta-item">👤 {report.author}</div>
            <div className="meta-item">🕐 {report.time}</div>
          </div>
        </div>

        <div className="report-footer">
          <div className="vote-section">
            <button
              type="button"
              className="vote-btn"
              disabled={report.status === 'resuelto'}
              onClick={() => onVote(report.id)}
              style={report.status === 'resuelto' ? { opacity: 0.5 } : undefined}
            >
              {report.status === 'resuelto' ? '👍 Resuelto' : '👍 Votar'}
            </button>
            <span className="vote-count">{report.votes} votos</span>
          </div>
          <div className="action-btns">
            <Link href={`/public/explore/${report.id}`} className="btn-detail">
              Ver Detalles
            </Link>
            <button type="button" className="btn-share" onClick={handleShare}>
              {copied ? '✅ Copiado' : '🔗 Compartir'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
