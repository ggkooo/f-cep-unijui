import { apiGet, apiPost, apiPut, apiDelete } from './apiClient'
import type { DocumentItemResource, DocumentSectionResource } from './types'

export type { DocumentSectionResource }

export const getDocumentSections = (): Promise<DocumentSectionResource[]> =>
    apiGet<DocumentSectionResource[]>('/api/document-sections')

const buildDocumentItemFormData = (
    item: DocumentItemResource & { uploadFile?: File | null },
): FormData => {
  const formData = new FormData()
  formData.append('name', item.name)
  formData.append('description', item.description ?? '')
  formData.append('sort_order', String(item.sort_order ?? 0))
  if (item.uploadFile) {
    formData.append('file', item.uploadFile)
  }
  return formData
}

const saveDocumentItem = async (
    sectionId: number,
    item: DocumentItemResource & { uploadFile?: File | null },
): Promise<DocumentItemResource> => {
  if (item.uploadFile) {
    const formData = buildDocumentItemFormData(item)
    if (item.id > 0) {
      formData.append('_method', 'PUT')
      return apiPost<DocumentItemResource>(`/api/document-items/${item.id}`, formData)
    }
    return apiPost<DocumentItemResource>(`/api/document-sections/${sectionId}/items`, formData)
  }

  const jsonBody = {
    name: item.name,
    description: item.description ?? '',
    sort_order: item.sort_order,
    file_url: item.file_url,
    original_filename: item.original_filename,
  }

  return item.id > 0
      ? apiPut<DocumentItemResource>(`/api/document-items/${item.id}`, jsonBody)
      : apiPost<DocumentItemResource>(`/api/document-sections/${sectionId}/items`, jsonBody)
}

const saveDocumentSection = async (
    section: DocumentSectionResource & {
      items: Array<DocumentItemResource & { uploadFile?: File | null }>
    },
): Promise<DocumentSectionResource> => {
  const sectionBody = {
    title: section.title,
    sort_order: section.sort_order,
  }

  const savedSection =
      section.id > 0
          ? await apiPut<DocumentSectionResource>(`/api/document-sections/${section.id}`, sectionBody)
          : await apiPost<DocumentSectionResource>('/api/document-sections', sectionBody)

  const finalSection = {
    ...section,
    ...savedSection,
  }

  const sectionId = finalSection.id
  if (!sectionId || sectionId <= 0) {
    throw new Error('ID da seção de documento indefinido após salvar a seção.')
  }

  const savedItems = await Promise.all(
      (section.items ?? []).map(async (item) => {
        const savedItem = await saveDocumentItem(sectionId, item)
        return item.id > 0 ? { ...item, ...savedItem, uploadFile: undefined } : savedItem
      }),
  )

  return {
    ...finalSection,
    items: savedItems,
  }
}

export const deleteDocumentSection = (id: number): Promise<void> =>
    apiDelete<void>(`/api/document-sections/${id}`)

export const deleteDocumentItem = (id: number): Promise<void> =>
    apiDelete<void>(`/api/document-items/${id}`)

export const updateDocumentSections = async (
    sections: Array<
        DocumentSectionResource & {
      items: Array<DocumentItemResource & { uploadFile?: File | null }>
    }
    >,
    deletedSectionIds: number[] = [],
    deletedItemIds: number[] = [],
): Promise<DocumentSectionResource[]> => {
  for (const itemId of deletedItemIds) {
    if (itemId > 0) {
      await deleteDocumentItem(itemId)
    }
  }

  for (const sectionId of deletedSectionIds) {
    if (sectionId > 0) {
      await deleteDocumentSection(sectionId)
    }
  }

  return Promise.all(sections.map((section) => saveDocumentSection(section)))
}