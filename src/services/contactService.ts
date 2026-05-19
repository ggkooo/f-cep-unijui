import { apiGet, apiPut } from './apiClient'
import type { ContactInfoResource } from './types'

export type { ContactInfoResource }
const unwrapContactInfoResponse = (response: ContactInfoResource | { data: ContactInfoResource }): ContactInfoResource => {
  const payload = response as { data?: ContactInfoResource }
  return payload.data ? payload.data : (response as ContactInfoResource)
}

export const getContactInfo = async (): Promise<ContactInfoResource> => {
  const response = await apiGet<ContactInfoResource | { data: ContactInfoResource }>('/api/contact-info')
  return unwrapContactInfoResponse(response)
}

export const updateContactInfo = async (data: ContactInfoResource): Promise<ContactInfoResource> => {
  const response = await apiPut<ContactInfoResource | { data: ContactInfoResource }>('/api/contact-info', data)
  return unwrapContactInfoResponse(response)
}
