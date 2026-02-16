import Link from 'next/link'
import styles from './CreateReportPage.module.css'

type CreateReportSuccessModalProps = {
  isOpen: boolean
  onClose: () => void
}

export default function CreateReportSuccessModal({
  isOpen,
  onClose,
}: CreateReportSuccessModalProps) {
  return (
    <div
      className={`${styles.successModal} ${isOpen ? styles.show : ''}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="create-report-success-title"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose()
        }
      }}
    >
      <div className={styles.successContent}>
        <div className={styles.successIcon} aria-hidden="true">
          ✅
        </div>
        <h2 id="create-report-success-title" className={styles.successTitle}>
          ¡Reporte Creado!
        </h2>
        <p className={styles.successText}>
          Tu reporte ha sido publicado exitosamente. La comunidad ya puede verlo y votarlo.
          Las autoridades han sido notificadas.
        </p>
        <Link href="/public/explore" className={styles.btnSuccessAction}>
          Ver Todos los Reportes
        </Link>
      </div>
    </div>
  )
}
