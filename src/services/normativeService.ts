import { apiGet, apiPost, apiPut } from './apiClient'
import type { NormativeItemResource, NormativeSectionResource } from './types'

export type { NormativeSectionResource }
export const getNormativeSections = (): Promise<NormativeSectionResource[]> =>
  apiGet<NormativeSectionResource[]>('/api/normative-sections')

const buildNormativeItemFormData = (item: NormativeItemResource & { uploadFile?: File | null }): FormData => {
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
  const body = item.uploadFile
    ? buildNormativeItemFormData(item)
    : {
        title: item.title,
        sort_order: item.sort_order,
      }

  if (item.id > 0) {
    return apiPut<NormativeItemResource>(`/api/normative-items/${item.id}`, body)
  }

  if (!item.uploadFile) {
    throw new Error('Novo item normativo precisa de um arquivo antes de salvar.')
  }

  return apiPost<NormativeItemResource>(`/api/normative-sections/${sectionId}/items`, body)
}

const saveNormativeSection = async (
  section: NormativeSectionResource & { items: Array<NormativeItemResource & { uploadFile?: File | null }> },
): Promise<NormativeSectionResource> => {
  const sectionBody = {
    title: section.title,
    sort_order: section.sort_order,
  }

  const savedSection = section.id > 0
    ? await apiPut<NormativeSectionResource>(`/api/normative-sections/${section.id}`, sectionBody)
    : await apiPost<NormativeSectionResource>('/api/normative-sections', sectionBody)

  const finalSection = {
    ...section,
    ...savedSection,
  }

  const sectionId = finalSection.id
  if (!sectionId || sectionId <= 0) {
    throw new Error('ID da seção de normativas indefinido após salvar.')
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

export const updateNormativeSections = async (
  sections: Array<NormativeSectionResource & { items: Array<NormativeItemResource & { uploadFile?: File | null }> }>,
): Promise<NormativeSectionResource[]> => Promise.all(sections.map((section) => saveNormativeSection(section)))
