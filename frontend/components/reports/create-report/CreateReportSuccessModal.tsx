'use client'

import { useEffect, useRef } from 'react'
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
  const modalRef = useRef<HTMLDivElement>(null)
  const previouslyFocusedElement = useRef<HTMLElement | null>(null)

  // Mover foco al modal cuando abre y restaurarlo cuando cierra
  useEffect(() => {
    if (isOpen) {
      previouslyFocusedElement.current = document.activeElement as HTMLElement
      modalRef.current?.focus()
    } else {
      previouslyFocusedElement.current?.focus()
    }
  }, [isOpen])

  // Cerrar con tecla ESC

  useEffect(() => {
    if (!isOpen) return
  
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.stopPropagation()
        onClose()
      }
    }
  
    document.addEventListener('keydown', handleKeyDown)
  
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      className={`${styles.successModal} ${styles.show}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="create-report-success-title"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose()
        }
      }}
    >
      <div
        className={styles.successContent}
        ref={modalRef}
        tabIndex={-1}
      >
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