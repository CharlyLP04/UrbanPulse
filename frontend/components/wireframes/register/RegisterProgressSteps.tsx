export default function RegisterProgressSteps() {
  return (
    <div className="progress-steps" role="list" aria-label="Progreso de registro">
      <div className="step active" role="listitem">
        <div className="step-number">1</div>
        <span className="step-label">Datos Personales</span>
      </div>
      <span className="step-arrow">→</span>
      <div className="step" role="listitem">
        <div className="step-number">2</div>
        <span className="step-label">Información de Cuenta</span>
      </div>
      <span className="step-arrow">→</span>
      <div className="step" role="listitem">
        <div className="step-number">3</div>
        <span className="step-label">Confirmación</span>
      </div>
    </div>
  )
}
