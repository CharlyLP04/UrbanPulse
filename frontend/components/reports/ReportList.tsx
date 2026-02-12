'use client'
import { useState, useEffect } from 'react'
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
        <div aria-live="polite" aria-busy="true">
          Cargando reportes...
        </div>
      ) : (
        <ul role="list">
          {reports.map((report) => (
            <li key={report.id} role="listitem" tabIndex={0}>
              <h3>{report.title}</h3>
              <p>{report.description}</p>
              <span>Status: {report.status}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
