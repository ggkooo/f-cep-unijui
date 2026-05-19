import { apiGet, apiPost, apiPut } from './apiClient'
import type { GuidanceSectionResource } from './types'

export type { GuidanceSectionResource }
export const getGuidanceSections = (): Promise<GuidanceSectionResource[]> =>
  apiGet<GuidanceSectionResource[]>('/api/guidance-sections')
export const updateGuidanceSections = async (sections: GuidanceSectionResource[]): Promise<GuidanceSectionResource[]> =>
  Promise.all(
    sections.map((section) =>
      section.id > 0
        ? apiPut<GuidanceSectionResource>(`/api/guidance-sections/${section.id}`, section)
        : apiPost<GuidanceSectionResource>('/api/guidance-sections', section),
    ),
  )
