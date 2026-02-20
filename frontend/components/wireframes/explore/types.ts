export type Report = {
  id: string
  emoji: string
  title: string
  description: string
  location: string
  author: string
  time: string
  status: 'urgente' | 'proceso' | 'resuelto' | 'pendiente'
  votes: number
}
