const API_URL = process.env.NEXT_PUBLIC_API_URL || ''

export interface Report {
  id: string
  title: string
  description: string
  location?: string
  status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED'
  userId: string
  categoryId?: string
  createdAt: string
  updatedAt: string
  user?: {
    id: string
    name: string
    email: string
  }
  category?: {
    id: string
    name: string
    color: string
  }
  _count?: {
    comments: number
    votes: number
  }
}

export const getReports = async (): Promise<Report[]> => {
  const res = await fetch('/api/reports', { cache: 'no-store' })
  if (!res.ok) throw new Error('Error al obtener reportes')
  return res.json()
}

export const getReportById = async (id: string): Promise<Report> => {
  const res = await fetch(`/api/reports/${id}`, { cache: 'no-store' })
  if (!res.ok) throw new Error('Error al obtener reporte')
  return res.json()
}

export const createReport = async (
  data: { 
    title: string
    description: string
    location?: string
    userId: string
    categoryId?: string
  }
): Promise<Report> => {
  const res = await fetch('/api/reports', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Error al crear reporte')
  return res.json()
}
