import { apiGet, apiPut } from './apiClient'
import type { DocumentSectionResource } from './types'

export type { DocumentSectionResource }
export const getDocumentSections = (): Promise<DocumentSectionResource[]> =>
  apiGet<DocumentSectionResource[]>('/api/document-sections')
export const updateDocumentSections = (sections: DocumentSectionResource[]): Promise<DocumentSectionResource[]> =>
  apiPut<DocumentSectionResource[]>('/api/document-sections', sections)
