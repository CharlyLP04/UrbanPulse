import { CommentItem } from './types'

export const initialComments: CommentItem[] = [
  {
    id: '1',
    author: 'Ana Martínez',
    avatar: 'AM',
    time: 'Hace 1 hora',
    text: 'Confirmo que este bache es muy peligroso. Ayer casi sufro un accidente tratando de esquivarlo.',
    likes: 24,
  },
  {
    id: '2',
    author: 'Jorge Ramírez',
    avatar: 'JR',
    time: 'Hace 30 min',
    text: 'He reportado este mismo bache 3 veces en el portal del municipio y nunca recibí respuesta.',
    likes: 15,
  },
  {
    id: '3',
    author: 'María González',
    avatar: 'MG',
    time: 'Hace 15 min',
    text: 'Ya compartí este reporte en mi grupo de vecinos. Todos vamos a votar para que tenga más visibilidad.',
    likes: 32,
  },
]
