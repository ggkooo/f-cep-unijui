import { apiPost } from './apiClient'
import { clearStoredAuthToken, getStoredAuthToken, setStoredAuthToken } from './authToken'

export type AuthUser = {
  id: number
  name: string
  email: string
}

export type AuthResponse = {
  token: string
  user: AuthUser
}

export const login = async (email: string, password: string): Promise<AuthResponse> =>
  apiPost<AuthResponse>('/api/auth/login', {
    email,
    password,
  })

export const logout = async (): Promise<void> => {
  try {
    await apiPost<{ message: string }>('/api/auth/logout', {})
  } finally {
    clearStoredAuthToken()
  }
}

export const validateAuthToken = async (): Promise<boolean> => {
  const token = getStoredAuthToken()
  return Boolean(token)
}

export const saveAuthToken = (token: string): void => {
  setStoredAuthToken(token)
}

export const clearAuthToken = (): void => {
  clearStoredAuthToken()
}

export const isLoggedIn = (): boolean => Boolean(getStoredAuthToken())
