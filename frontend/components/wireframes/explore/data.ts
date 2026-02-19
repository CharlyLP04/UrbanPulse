import { Report } from './types'

export const initialReports: Report[] = [
  {
    id: '1',
    emoji: '🚧',
    title: 'Bache peligroso en Av. Juárez esquina con 5 de Mayo',
    description:
      'Bache de aproximadamente 50cm de profundidad que ha causado múltiples accidentes. Ubicado en una zona de alto tráfico vehicular. Requiere atención inmediata.',
    location: 'Centro, Puebla',
    author: 'Carlos López',
    time: 'Hace 2 horas',
    status: 'urgente',
    votes: 342,
  },
  {
    id: '2',
    emoji: '💡',
    title: 'Luminarias sin funcionar en Parque Ecológico',
    description:
      '10 luminarias apagadas desde hace 3 semanas. Zona insegura por las noches. El municipio ya confirmó la reparación programada para esta semana.',
    location: 'Col. Humboldt',
    author: 'Ana Martínez',
    time: 'Hace 5 días',
    status: 'proceso',
    votes: 187,
  },
  {
    id: '3',
    emoji: '🗑️',
    title: 'Acumulación de basura en esquina de Reforma',
    description:
      'Punto de acumulación de basura que generaba malos olores. El servicio de limpia atendió el reporte en 48 horas y estableció recolección diaria.',
    location: 'Col. La Paz',
    author: 'Jorge Ramírez',
    time: 'Hace 1 semana',
    status: 'resuelto',
    votes: 423,
  },
  {
    id: '4',
    emoji: '💧',
    title: 'Fuga de agua en tubería principal',
    description:
      'Fuga constante de agua potable en la esquina. Se está desperdiciando agua 24/7. Esperando respuesta del sistema de agua potable municipal.',
    location: 'Col. Amor',
    author: 'María González',
    time: 'Hace 3 días',
    status: 'pendiente',
    votes: 92,
  },
]
