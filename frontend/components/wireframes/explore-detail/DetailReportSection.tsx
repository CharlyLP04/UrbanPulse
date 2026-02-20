type DetailReportSectionProps = {
  voted: boolean
  votes: number
  onVote: () => void
}

export default function DetailReportSection({ voted, votes, onVote }: DetailReportSectionProps) {
  return (
    <>
      <div className="report-header">
        <span className="status-badge badge-urgente">Alta Prioridad</span>
        <h1 className="report-title">Bache peligroso en Av. Juárez esquina con 5 de Mayo</h1>
        <div className="report-meta">
          <div className="meta-item">
            <span>📍</span>
            <span>Centro, Puebla</span>
          </div>
          <div className="meta-item">
            <span>👤</span>
            <span>Carlos López</span>
          </div>
          <div className="meta-item">
            <span>🕐</span>
            <span>Hace 2 horas</span>
          </div>
          <div className="meta-item">
            <span>🏷️</span>
            <span>Baches</span>
          </div>
        </div>
      </div>

      <div className="report-image-container">🚧</div>

      <div className="report-content">
        <p className="report-description">
          Se reporta un bache de aproximadamente 50cm de profundidad y 1 metro de diámetro ubicado
          en el carril central de Av. Juárez, justo en la esquina con 5 de Mayo.
          <br />
          <br />
          El bache ha causado varios incidentes menores en las últimas semanas, incluyendo daños a
          llantas y suspensiones de vehículos. Debido a su ubicación y tamaño, representa un peligro
          significativo para motociclistas y ciclistas.
          <br />
          <br />
          Se solicita atención urgente de las autoridades correspondientes para reparar este
          desperfecto antes de que ocurra un accidente mayor.
        </p>
      </div>

      <div className="report-actions">
        <button type="button" className={`vote-button ${voted ? 'voted' : ''}`} onClick={onVote}>
          <span>{voted ? '✓' : '👍'}</span>
          <span>{voted ? 'Votado' : 'Votar'}</span>
        </button>
        <div className="vote-count">{votes} votos</div>
        <button type="button" className="action-btn">
          📤 Compartir
        </button>
        <button type="button" className="action-btn">
          ⚠️ Reportar
        </button>
      </div>
    </>
  )
}
