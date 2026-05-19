import { clearStoredAuthToken, getStoredAuthToken } from './authToken'

const API_BASE_URL = import.meta.env.DEV
  ? ''
  : (import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000').replace(/\/+$/g, '')
const API_KEY = import.meta.env.VITE_API_KEY ?? ''

function buildHeaders(customHeaders?: HeadersInit): Headers {
  const headers = new Headers(customHeaders)
  headers.set('Accept', 'application/json')

  if (API_KEY) {
    headers.set('X-API-KEY', API_KEY)
  }

  const authToken = getStoredAuthToken()
  if (authToken) {
    headers.set('Authorization', `Bearer ${authToken}`)
  }

  return headers
}

async function apiRequest<T>(path: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE_URL}${path}`
  const response = await fetch(url, {
    ...options,
    headers: buildHeaders(options.headers),
  })

  if (response.status === 401) {
    clearStoredAuthToken()
    throw new Error('Unauthorized')
  }

  if (!response.ok) {
    const body = await response.text().catch(() => '')
    throw new Error(`Erro ao carregar ${url}: ${response.status} ${response.statusText} ${body}`)
  }

  return response.json()
}

export const apiGet = <T>(path: string): Promise<T> => apiRequest<T>(path)
export const apiPost = <T>(path: string, body: unknown, options: RequestInit = {}): Promise<T> =>
  apiRequest<T>(path, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string> | undefined),
    },
    ...options,
  })
export const apiPut = <T>(path: string, body: unknown, options: RequestInit = {}): Promise<T> =>
  apiRequest<T>(path, {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string> | undefined),
    },
    ...options,
  })
export const apiPatch = <T>(path: string, body: unknown, options: RequestInit = {}): Promise<T> =>
  apiRequest<T>(path, {
    method: 'PATCH',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string> | undefined),
    },
    ...options,
  })
export const apiDelete = <T>(path: string, options: RequestInit = {}): Promise<T> =>
  apiRequest<T>(path, { method: 'DELETE', ...options })
