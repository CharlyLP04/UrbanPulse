export default function RegisterBenefits() {
  return (
    <div className="benefits-section">
      <h3 className="benefits-title">¿Por qué registrarte?</h3>
      <div className="benefits-grid">
        <div className="benefit-card">
          <div className="benefit-icon">📸</div>
          <div className="benefit-title">Reporta Problemas</div>
          <div className="benefit-description">
            Documenta fallas urbanas con fotos y ubicación precisa
          </div>
        </div>
        <div className="benefit-card">
          <div className="benefit-icon">👥</div>
          <div className="benefit-title">Genera Presión Social</div>
          <div className="benefit-description">
            Tu voto multiplica el impacto de los reportes comunitarios
          </div>
        </div>
        <div className="benefit-card">
          <div className="benefit-icon">📊</div>
          <div className="benefit-title">Rastrea el Progreso</div>
          <div className="benefit-description">Sigue en tiempo real el estatus de cada reporte</div>
        </div>
      </div>
    </div>
  )
}
