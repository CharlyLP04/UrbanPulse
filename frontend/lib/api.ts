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
let refreshSubscribers: ((success: boolean) => void)[] = [];

const onRefreshResponse = (success: boolean) => {
  refreshSubscribers.forEach(cb => cb(success));
  refreshSubscribers = [];
}

const addRefreshSubscriber = (cb: (success: boolean) => void) => {
  refreshSubscribers.push(cb);
}

let isRedirecting = false;
const triggerSessionExpired = () => {
  if (isRedirecting) return;
  isRedirecting = true;
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('session-expired'));
    window.location.href = '/auth/login';
  }
}

const handleRefresh = async (): Promise<boolean> => {
  if (isRefreshing) {
    return new Promise(resolve => {
      addRefreshSubscriber(resolve);
    })
  }

  isRefreshing = true;

  try {
    const res = await fetch('/api/auth/refresh', { method: 'POST' });
    const success = res.ok;
    onRefreshResponse(success);
    isRefreshing = false;

    if (!success) {
      triggerSessionExpired();
    }

    return success;
  } catch (error) {
    onRefreshResponse(false);
    isRefreshing = false;
    triggerSessionExpired();
    return false;
  }
}

const customFetch = async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
  let res = await fetch(input, init);

  if (res.status === 401) {
    const refreshSuccess = await handleRefresh();

    if (refreshSuccess) {
      res = await fetch(input, init);
    } else {
      triggerSessionExpired();
      return res;
    }
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
