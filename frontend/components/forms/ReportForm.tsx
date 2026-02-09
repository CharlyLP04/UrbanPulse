'use client'
import { useState } from 'react'
export default function ReportForm() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: ''
  })
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    // Esto evita que la página se recargue
  }
  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }
  return (
    <form onSubmit={handleSubmit} aria-label="Formulario de reporte">
      <div>
        <label htmlFor="title">Título del Reporte</label>
        <input
          id="title"
          type="text"
          value={formData.title}
          onChange={(e) => handleChange('title', e.target.value)}
          required
          aria-required="true"
          tabIndex={0}
        />
      </div>
      
      <div>
        <label htmlFor="description">Descripción</label>
        <textarea
          id="description"
          value={formData.description}
          onChange={(e) => handleChange('description', e.target.value)}
          required
          aria-required="true"
          tabIndex={0}
          rows={3}
        />
      </div>
      <div>
        <label htmlFor="location">Ubicación</label>
        <input
          id="location"
          type="text"
          value={formData.location}
          onChange={(e) => handleChange('location', e.target.value)}
          required
          aria-required="true"
          tabIndex={0}
        />
      </div>
      <button type="submit" tabIndex={0}>
        Enviar Reporte
      </button>
    </form>
  )
}
