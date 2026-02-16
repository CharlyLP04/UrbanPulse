'use client'

import Link from 'next/link'
import type { FormEvent } from 'react'
import { useEffect, useRef, useState } from 'react'
import CreateReportSuccessModal from './CreateReportSuccessModal'
import styles from './CreateReportPage.module.css'

type Priority = 'alta' | 'media' | 'baja'

type LocationState = {
  type: 'success' | 'error' | null
  message: string
}

type SelectedImage = {
  id: string
  url: string
}

const MAX_IMAGES = 5

export default function CreateReportForm() {
  const [titulo, setTitulo] = useState('')
  const [categoria, setCategoria] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [direccion, setDireccion] = useState('')
  const [ciudad, setCiudad] = useState('puebla')
  const [referencia, setReferencia] = useState('')
  const [prioridad, setPrioridad] = useState<Priority>('media')
  const [selectedImages, setSelectedImages] = useState<SelectedImage[]>([])
  const [isDragOver, setIsDragOver] = useState(false)
  const [locationState, setLocationState] = useState<LocationState>({
    type: null,
    message: '',
  })
  const [isGettingLocation, setIsGettingLocation] = useState(false)
  const [locationResolved, setLocationResolved] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  const fileInputRef = useRef<HTMLInputElement>(null)
  const selectedImagesRef = useRef<SelectedImage[]>([])

  useEffect(() => {
    selectedImagesRef.current = selectedImages
  }, [selectedImages])

  useEffect(() => {
    return () => {
      selectedImagesRef.current.forEach((image) => {
        URL.revokeObjectURL(image.url)
      })
    }
  }, [])

  const handleFiles = (files: File[]) => {
    const imageFiles = files.filter((file) => file.type.startsWith('image/'))

    if (selectedImages.length + imageFiles.length > MAX_IMAGES) {
      window.alert('⚠️ Máximo 5 imágenes permitidas')
      return
    }

    const nextImages = imageFiles.map((file, index) => ({
      id: `${file.name}-${Date.now()}-${index}`,
      url: URL.createObjectURL(file),
    }))

    setSelectedImages((previous) => [...previous, ...nextImages])
  }

  const removeImage = (imageId: string) => {
    setSelectedImages((previous) => {
      const imageToRemove = previous.find((image) => image.id === imageId)
      if (imageToRemove) {
        URL.revokeObjectURL(imageToRemove.url)
      }
      return previous.filter((image) => image.id !== imageId)
    })
  }

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setLocationState({
        type: 'error',
        message: '⚠️ Tu navegador no soporta geolocalización',
      })
      return
    }

    setIsGettingLocation(true)
    setLocationResolved(false)

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude
        const lon = position.coords.longitude
        const mockAddress = `Av. Juárez #${Math.floor(Math.random() * 1000)}, Centro`

        setDireccion(mockAddress)
        setLocationState({
          type: 'success',
          message: `✓ Ubicación obtenida: ${lat.toFixed(4)}, ${lon.toFixed(4)}`,
        })
        setLocationResolved(true)
        setIsGettingLocation(false)
      },
      () => {
        setLocationState({
          type: 'error',
          message: '⚠️ No se pudo obtener la ubicación. Verifica los permisos.',
        })
        setLocationResolved(false)
        setIsGettingLocation(false)
      }
    )
  }

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (selectedImages.length === 0) {
      window.alert('⚠️ Debes subir al menos una imagen del problema')
      return
    }

    setIsSubmitting(true)

    window.setTimeout(() => {
      setShowSuccessModal(true)
      setIsSubmitting(false)
    }, 1500)
  }

  return (
    <>
      <div className={styles.mainContent}>
        <div className={styles.formCard}>
          <form className={styles.formContainer} onSubmit={onSubmit} aria-label="Formulario de nuevo reporte">
            <h2 className={styles.sectionTitle}>Información Básica</h2>

            <div className={styles.formGroup}>
              <label htmlFor="titulo">
                Título del Reporte <span className={styles.required}>*</span>
              </label>
              <input
                type="text"
                id="titulo"
                placeholder="Ej: Bache peligroso en Av. Juárez"
                required
                maxLength={100}
                value={titulo}
                onChange={(event) => setTitulo(event.target.value)}
              />
              <div className={`${styles.charCounter} ${titulo.length > 90 ? styles.warning : ''}`}>
                <span>{titulo.length}</span>/100 caracteres
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="categoria">
                Categoría <span className={styles.required}>*</span>
              </label>
              <select
                id="categoria"
                required
                value={categoria}
                onChange={(event) => setCategoria(event.target.value)}
              >
                <option value="">Selecciona una categoría</option>
                <option value="baches">🚧 Baches y Pavimento</option>
                <option value="alumbrado">💡 Alumbrado Público</option>
                <option value="basura">🗑️ Basura y Limpieza</option>
                <option value="agua">💧 Fugas de Agua</option>
                <option value="parques">🌳 Parques y Jardines</option>
                <option value="seguridad">🚨 Seguridad Pública</option>
                <option value="transporte">🚌 Transporte Público</option>
                <option value="otro">📋 Otro</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="descripcion">
                Descripción Detallada <span className={styles.required}>*</span>
              </label>
              <textarea
                id="descripcion"
                placeholder="Describe el problema con el mayor detalle posible: ¿Qué está ocurriendo? ¿Desde cuándo? ¿Qué riesgos representa?"
                required
                maxLength={1000}
                value={descripcion}
                onChange={(event) => setDescripcion(event.target.value)}
              />
              <div className={`${styles.charCounter} ${descripcion.length > 950 ? styles.warning : ''}`}>
                <span>{descripcion.length}</span>/1000 caracteres
              </div>
              <div className={styles.formHelp}>
                💡 Incluye detalles como: tiempo transcurrido, impacto en la comunidad, riesgos potenciales
              </div>
            </div>

            <h2 className={styles.sectionTitle}>Evidencia Fotográfica</h2>

            <div className={styles.formGroup}>
              <label>
                Imágenes <span className={styles.required}>*</span>
              </label>
              <button
                type="button"
                className={`${styles.imageUploadZone} ${isDragOver ? styles.dragover : ''}`}
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(event) => {
                  event.preventDefault()
                  setIsDragOver(true)
                }}
                onDragLeave={() => setIsDragOver(false)}
                onDrop={(event) => {
                  event.preventDefault()
                  setIsDragOver(false)
                  handleFiles(Array.from(event.dataTransfer.files))
                }}
              >
                <div className={styles.uploadIcon} aria-hidden="true">
                  📸
                </div>
                <div className={styles.uploadText}>Click para seleccionar imágenes</div>
                <div className={styles.uploadHint}>o arrastra y suelta aquí (máx. 5 imágenes)</div>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                className={styles.fileInput}
                accept="image/*"
                multiple
                onChange={(event) => {
                  const files = event.target.files ? Array.from(event.target.files) : []
                  handleFiles(files)
                  event.target.value = ''
                }}
              />
              <div className={styles.imagePreviewContainer}>
                {selectedImages.map((image, index) => (
                  <div key={image.id} className={styles.imagePreview}>
                    <img src={image.url} alt={`Vista previa ${index + 1}`} />
                    <button
                      type="button"
                      className={styles.removeImage}
                      onClick={() => removeImage(image.id)}
                      aria-label={`Eliminar imagen ${index + 1}`}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
              <div className={styles.formHelp}>
                💡 Las fotos ayudan a verificar el reporte y a las autoridades a evaluar la situación
              </div>
            </div>

            <h2 className={styles.sectionTitle}>Ubicación del Problema</h2>

            <div className={styles.formGroup}>
              <label htmlFor="direccion">
                Dirección <span className={styles.required}>*</span>
              </label>
              <div className={styles.locationGroup}>
                <input
                  type="text"
                  id="direccion"
                  placeholder="Calle, número, colonia"
                  required
                  value={direccion}
                  onChange={(event) => setDireccion(event.target.value)}
                />
                <button
                  type="button"
                  className={styles.btnLocation}
                  onClick={getCurrentLocation}
                  disabled={isGettingLocation}
                >
                  {isGettingLocation ? (
                    <>
                      <span aria-hidden="true">⏳</span>
                      <span>Obteniendo ubicación...</span>
                    </>
                  ) : locationResolved ? (
                    <>
                      <span aria-hidden="true">✓</span>
                      <span>Ubicación obtenida</span>
                    </>
                  ) : (
                    <>
                      <span aria-hidden="true">📍</span>
                      <span>Usar mi ubicación</span>
                    </>
                  )}
                </button>
              </div>
              <div
                className={`${styles.locationStatus} ${
                  locationState.type ? styles[locationState.type] : ''
                }`}
                role="status"
                aria-live="polite"
              >
                {locationState.message}
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="ciudad">
                Ciudad <span className={styles.required}>*</span>
              </label>
              <select
                id="ciudad"
                required
                value={ciudad}
                onChange={(event) => setCiudad(event.target.value)}
              >
                <option value="">Selecciona tu ciudad</option>
                <option value="puebla">Puebla</option>
                <option value="cdmx">Ciudad de México</option>
                <option value="guadalajara">Guadalajara</option>
                <option value="monterrey">Monterrey</option>
                <option value="queretaro">Querétaro</option>
                <option value="otra">Otra</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="referencia">Referencias Adicionales</label>
              <input
                type="text"
                id="referencia"
                placeholder="Ej: Frente al Oxxo, esquina con 5 de Mayo"
                value={referencia}
                onChange={(event) => setReferencia(event.target.value)}
              />
              <div className={styles.formHelp}>💡 Ayuda a localizar el problema más fácilmente</div>
            </div>

            <h2 className={styles.sectionTitle}>Nivel de Prioridad</h2>

            <div className={styles.formGroup}>
              <div className={styles.prioritySelector}>
                <div className={styles.priorityOption}>
                  <input
                    type="radio"
                    name="prioridad"
                    id="prioridad-alta"
                    value="alta"
                    checked={prioridad === 'alta'}
                    onChange={() => setPrioridad('alta')}
                    required
                  />
                  <label htmlFor="prioridad-alta" className={`${styles.priorityLabel} ${styles.high}`}>
                    <div className={styles.priorityIcon}>🔴</div>
                    <div className={styles.priorityName}>Alta</div>
                    <div className={styles.priorityDesc}>Riesgo inmediato o urgente</div>
                  </label>
                </div>

                <div className={styles.priorityOption}>
                  <input
                    type="radio"
                    name="prioridad"
                    id="prioridad-media"
                    value="media"
                    checked={prioridad === 'media'}
                    onChange={() => setPrioridad('media')}
                    required
                  />
                  <label htmlFor="prioridad-media" className={`${styles.priorityLabel} ${styles.medium}`}>
                    <div className={styles.priorityIcon}>🟡</div>
                    <div className={styles.priorityName}>Media</div>
                    <div className={styles.priorityDesc}>Requiere atención pronto</div>
                  </label>
                </div>

                <div className={styles.priorityOption}>
                  <input
                    type="radio"
                    name="prioridad"
                    id="prioridad-baja"
                    value="baja"
                    checked={prioridad === 'baja'}
                    onChange={() => setPrioridad('baja')}
                    required
                  />
                  <label htmlFor="prioridad-baja" className={`${styles.priorityLabel} ${styles.low}`}>
                    <div className={styles.priorityIcon}>🟢</div>
                    <div className={styles.priorityName}>Baja</div>
                    <div className={styles.priorityDesc}>Puede esperar</div>
                  </label>
                </div>
              </div>
            </div>

            <div className={styles.formActions}>
              <Link href="/public/explore" className={`${styles.btn} ${styles.btnSecondary}`}>
                Cancelar
              </Link>
              <button type="submit" className={`${styles.btn} ${styles.btnPrimary}`} disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <span aria-hidden="true">⏳</span>
                    <span>Creando reporte...</span>
                  </>
                ) : (
                  <>
                    <span>Crear Reporte</span>
                    <span aria-hidden="true">→</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      <CreateReportSuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
      />
    </>
  )
}
