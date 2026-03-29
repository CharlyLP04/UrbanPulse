import ReportCard from './ReportCard'
import { Report } from './types'

type ExploreReportsSectionProps = {
  reports: Report[]
  onVote: (reportId: string) => void
}

export default function ExploreReportsSection({ reports, onVote }: ExploreReportsSectionProps) {
  const hasReports = reports.length > 0;

  return (
    <div className="reports-section">
      <div className="reports-stats">
        <div className="stats-info">
          Mostrando <strong>{reports.length}</strong> reportes activos
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

      {!hasReports ? (
        <div className="flex flex-col items-center justify-center p-12 bg-white rounded-xl shadow-sm border-2 border-dashed border-gray-200 text-center animate-in fade-in duration-500">
          <div className="text-6xl mb-4">🏙️</div>
          <h3 className="text-2xl font-black text-[#0f4c75] mb-2" style={{ fontFamily: 'Impact, "Arial Black", sans-serif' }}>¡Tu ciudad está impecable!</h3>
          <p className="text-gray-500 mb-6 max-w-md">No hay reportes activos en este momento. Si ves algún problema en tu comunidad, ¡sé el primero en reportarlo y marca la diferencia!</p>
          <a href="/dashboard/create-report" className="bg-[#1b9c85] hover:bg-[#158f75] text-white px-6 py-3 rounded-lg font-bold shadow-md transition-all active:scale-95">
            + Crear Nuevo Reporte
          </a>
        </div>
      ) : (
        <>
          {reports.map((report) => (
            <ReportCard key={report.id} report={report} onVote={onVote} />
          ))}

          <div className="pagination">
            <button type="button">&laquo; Anterior</button>
            <button type="button" className="active">
              1
            </button>
            {(reports.length > 5) && <button type="button">2</button>}
            <button type="button">Siguiente &raquo;</button>
          </div>
        </>
      )}
    </div>
  )
}
