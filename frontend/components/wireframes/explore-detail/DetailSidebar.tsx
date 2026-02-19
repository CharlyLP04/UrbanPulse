type DetailSidebarProps = {
  votes: number
}

export default function DetailSidebar({ votes }: DetailSidebarProps) {
  return (
    <aside className="sidebar">
      <div className="sidebar-card">
        <h3 className="sidebar-title">Información</h3>
        <div className="info-item">
          <span className="info-label">ID del Reporte</span>
          <span className="info-value">#2847</span>
        </div>
        <div className="info-item">
          <span className="info-label">Categoría</span>
          <span className="info-value">Baches</span>
        </div>
        <div className="info-item">
          <span className="info-label">Estado</span>
          <span className="info-value status-high">Alta Prioridad</span>
        </div>
        <div className="info-item">
          <span className="info-label">Votos</span>
          <span className="info-value">{votes}</span>
        </div>
        <div className="info-item">
          <span className="info-label">Vistas</span>
          <span className="info-value">1,523</span>
        </div>
        <div className="info-item">
          <span className="info-label">Fecha</span>
          <span className="info-value">27 Ene 2026</span>
        </div>
      </div>

      <div className="sidebar-card">
        <h3 className="sidebar-title">Ubicación</h3>
        <div className="map-placeholder">🗺️</div>
        <p className="location-text">
          📍 Av. Juárez esquina con 5 de Mayo
          <br />
          Centro Histórico, Puebla
        </p>
      </div>
    </aside>
  )
}
