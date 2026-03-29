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

let isRefreshing = false;
let refreshPromise: Promise<boolean> | null = null;
const channel = typeof window !== 'undefined' ? new BroadcastChannel('auth-channel') : null;

let isRedirecting = false;
const triggerSessionExpired = () => {
  if (isRedirecting) return;
  isRedirecting = true;
  if (channel) {
    channel.postMessage('session-expired');
  }
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('session-expired'));
  }
}

const performRefresh = async (): Promise<boolean> => {
  try {
    const res = await fetch('/api/auth/refresh', { method: 'POST' });
    const success = res.ok;
    if (!success) {
      triggerSessionExpired();
    }
    return success;
  } catch (error) {
    triggerSessionExpired();
    return false;
  }
}

const handleRefresh = async (): Promise<boolean> => {
  if (isRefreshing && refreshPromise) {
    // Si ya estamos refrescando en ESTA pestaña, esperamos a la promesa
    return refreshPromise;
  }
  
  isRefreshing = true;

  // Creamos la promesa del refresh usando Web Locks si está disponible
  refreshPromise = new Promise<boolean>(async (resolve) => {
    try {
      if (typeof navigator !== 'undefined' && navigator.locks) {
        // Bloqueo entre pestañas para asegurar un solo refresh simultáneo
        await navigator.locks.request('auth-refresh-lock', async () => {
          // Volver a verificar sesión porque otra pestaña pudo haberla renovado
          // idealmente haríamos un fetch a algo rápido o confiamos en el endpoint
          const result = await performRefresh();
          resolve(result);
        });
      } else {
        // Fallback si no hay soporte de Web Locks
        const result = await performRefresh();
        resolve(result);
      }
    } catch (e) {
      triggerSessionExpired();
      resolve(false);
    } finally {
      isRefreshing = false;
      refreshPromise = null;
    }
  });

  return refreshPromise;
}

const customFetch = async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
  let res = await fetch(input, init);

  if (res.status === 401) {
    // Evita retries infinitos si ya estamos redirigiendo
    if (isRedirecting) return res;

    const refreshSuccess = await handleRefresh();

    if (refreshSuccess) {
      res = await fetch(input, init);
    }
    // Si falla, el triggerSessionExpired ya maneja la redirección a través del evento o BroadcastChannel
  }

  return res;
}

export const getReports = async (): Promise<Report[]> => {
  const res = await customFetch('/api/reports', { cache: 'no-store' })
  if (!res.ok) throw new Error('Error al obtener reportes')
  return res.json()
}

export const getReportById = async (id: string): Promise<Report> => {
  const res = await customFetch(`/api/reports/${id}`, { cache: 'no-store' })
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
  const res = await customFetch('/api/reports', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Error al crear reporte')
  return res.json()
}
