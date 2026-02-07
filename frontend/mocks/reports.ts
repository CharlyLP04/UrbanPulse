export interface Report {
  id: string;
  title: string;
  description: string;
  status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED';
  votes: number;
}

export const MOCK_REPORTS: Report[] = [
  {
    id: '1',
    title: 'Bache en Av. Central',
    description: 'Hay un bache grande en el carril derecho dirección norte.',
    status: 'OPEN',
    votes: 5,
  },
  {
    id: '2',
    title: 'Farola fundida',
    description: 'La farola frente al parque no enciende por la noche.',
    status: 'OPEN',
    votes: 2,
  },
  {
    id: '3',
    title: 'Semáforo averiado',
    description: 'El semáforo del cruce peatonal está parpadeando en rojo.',
    status: 'IN_PROGRESS',
    votes: 10,
  },
  {
    id: '4',
    title: 'Basura acumulada',
    description: 'Los contenedores de la calle 5 están desbordados.',
    status: 'RESOLVED',
    votes: 8,
  },
  {
    id: '5',
    title: 'Banco roto',
    description: 'Un banco en la plaza principal tiene el respaldo roto.',
    status: 'OPEN',
    votes: 1,
  },
];
