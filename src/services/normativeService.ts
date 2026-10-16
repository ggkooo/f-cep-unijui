import { apiGet, apiPost, apiPut, apiDelete } from './apiClient'
import type { NormativeItemResource, NormativeSectionResource } from './types'

export type { NormativeSectionResource }

const unwrapData = <T>(response: unknown): T => {
  if (response && typeof response === 'object' && 'data' in response) {
    return (response as { data: T }).data
  }
  return response as T
}

export const getNormativeSections = async (): Promise<NormativeSectionResource[]> => {
  const response = await apiGet<unknown>('/api/normative-sections')
  return unwrapData<NormativeSectionResource[]>(response)
}

const buildNormativeItemFormData = (
    item: NormativeItemResource & { uploadFile?: File | null },
): FormData => {
  const formData = new FormData()
  formData.append('title', item.title)
  formData.append('sort_order', String(item.sort_order ?? 0))
  if (item.uploadFile) {
    formData.append('file', item.uploadFile)
  }
  return formData
}

const saveNormativeItem = async (
    sectionId: number,
    item: NormativeItemResource & { uploadFile?: File | null },
): Promise<NormativeItemResource> => {
  let response: unknown

  if (item.uploadFile) {
    const formData = buildNormativeItemFormData(item)
    if (item.id > 0) {
      formData.append('_method', 'PUT')
      response = await apiPost<unknown>(`/api/normative-items/${item.id}`, formData)
    } else {
      response = await apiPost<unknown>(`/api/normative-sections/${sectionId}/items`, formData)
    }
  } else {
    const jsonBody = {
      title: item.title,
      sort_order: item.sort_order ?? 0,
      file_url: item.file_url ?? null,
      original_filename: item.original_filename ?? null,
    }

    response =
        item.id > 0
            ? await apiPut<unknown>(`/api/normative-items/${item.id}`, jsonBody)
            : await apiPost<unknown>(`/api/normative-sections/${sectionId}/items`, jsonBody)
  }

  return unwrapData<NormativeItemResource>(response)
}

const saveNormativeSection = async (
    section: NormativeSectionResource & {
      items: Array<NormativeItemResource & { uploadFile?: File | null }>
    },
): Promise<NormativeSectionResource> => {
  const sectionBody = {
    title: section.title,
    sort_order: section.sort_order ?? 0,
  }

  const rawResponse =
      section.id > 0
          ? await apiPut<unknown>(`/api/normative-sections/${section.id}`, sectionBody)
          : await apiPost<unknown>('/api/normative-sections', sectionBody)

  const savedSection = unwrapData<NormativeSectionResource>(rawResponse)

  const finalSection = {
    ...section,
    ...savedSection,
  }

  const sectionId = finalSection.id
  if (!sectionId || sectionId <= 0) {
    throw new Error('ID da seção de normativa indefinido após salvar a seção.')
  }

  const savedItems = await Promise.all(
      (section.items ?? []).map(async (item) => {
        const savedItem = await saveNormativeItem(sectionId, item)
        return item.id > 0 ? { ...item, ...savedItem, uploadFile: undefined } : savedItem
      }),
  )

  return {
    ...finalSection,
    items: savedItems,
  }
}

export const deleteNormativeSection = (id: number): Promise<void> =>
    apiDelete<void>(`/api/normative-sections/${id}`)

export const deleteNormativeItem = (id: number): Promise<void> =>
    apiDelete<void>(`/api/normative-items/${id}`)

export const updateNormativeSections = async (
    sections: Array<
        NormativeSectionResource & {
      items: Array<NormativeItemResource & { uploadFile?: File | null }>
    }
    >,
    deletedSectionIds: number[] = [],
    deletedItemIds: number[] = [],
): Promise<NormativeSectionResource[]> => {
  for (const itemId of deletedItemIds) {
    if (itemId > 0) {
      await deleteNormativeItem(itemId)
    }
  }

  for (const sectionId of deletedSectionIds) {
    if (sectionId > 0) {
      await deleteNormativeSection(sectionId)
    }
  }

  return Promise.all(sections.map((section) => saveNormativeSection(section)))
}