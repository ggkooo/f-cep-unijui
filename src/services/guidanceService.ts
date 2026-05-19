import { apiGet, apiPut } from './apiClient'
import type { GuidanceSectionResource } from './types'

export type { GuidanceSectionResource }
export const getGuidanceSections = (): Promise<GuidanceSectionResource[]> =>
  apiGet<GuidanceSectionResource[]>('/api/guidance-sections')
export const updateGuidanceSections = (sections: GuidanceSectionResource[]): Promise<GuidanceSectionResource[]> =>
  apiPut<GuidanceSectionResource[]>('/api/guidance-sections', sections)
