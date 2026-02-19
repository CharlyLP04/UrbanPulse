import ReportCard from './ReportCard'
import { Report } from './types'

type ExploreReportsSectionProps = {
  reports: Report[]
  onVote: (reportId: string) => void
}

export default function ExploreReportsSection({ reports, onVote }: ExploreReportsSectionProps) {
  return (
    <div className="reports-section">
      <div className="reports-stats">
        <div className="stats-info">
          Mostrando <strong>284</strong> reportes activos
        </div>
        <div className="sort-options">
          <select defaultValue="Más Votados">
            <option>Más Votados</option>
            <option>Más Recientes</option>
            <option>Más Urgentes</option>
            <option>Cercanos a Ti</option>
          </select>
        </div>
      </div>

      {reports.map((report) => (
        <ReportCard key={report.id} report={report} onVote={onVote} />
      ))}

      <div className="pagination">
        <button type="button">&laquo; Anterior</button>
        <button type="button" className="active">
          1
        </button>
        <button type="button">2</button>
        <button type="button">3</button>
        <button type="button">4</button>
        <button type="button">5</button>
        <button type="button">Siguiente &raquo;</button>
      </div>
    </div>
  )
}
