const AUTH_TOKEN_STORAGE_KEY = 'cep-unijui-auth-token'

export function getStoredAuthToken(): string | null {
  if (typeof window === 'undefined') {
    return null
  }
  return localStorage.getItem(AUTH_TOKEN_STORAGE_KEY)
}

export function setStoredAuthToken(token: string): void {
  if (typeof window === 'undefined') {
    return
  }
  localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, token)
}

export function clearStoredAuthToken(): void {
  if (typeof window === 'undefined') {
    return
  }
  localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY)
}
