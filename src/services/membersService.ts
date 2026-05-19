import { apiDelete, apiGet, apiPost, apiPut } from './apiClient'
import type { MemberResource } from './types'

export type { MemberResource }
export const getMembers = (): Promise<MemberResource[]> => apiGet<MemberResource[]>('/api/members')
export const createMember = (member: Omit<MemberResource, 'id'>): Promise<MemberResource> =>
  apiPost<MemberResource>('/api/members', member)
export const updateMember = (id: number, member: Omit<MemberResource, 'id'>): Promise<MemberResource> =>
  apiPut<MemberResource>(`/api/members/${id}`, member)
export const deleteMember = (id: number): Promise<void> => apiDelete<void>(`/api/members/${id}`)
