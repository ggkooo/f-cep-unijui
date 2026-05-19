import { apiGet, apiPut } from './apiClient'
import type { ContactInfoResource } from './types'

export type { ContactInfoResource }
export const getContactInfo = (): Promise<ContactInfoResource> => apiGet<ContactInfoResource>('/api/contact-info')
export const updateContactInfo = (data: ContactInfoResource): Promise<ContactInfoResource> =>
  apiPut<ContactInfoResource>('/api/contact-info', data)
