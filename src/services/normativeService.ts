import { apiGet, apiPut } from './apiClient'
import type { NormativeSectionResource } from './types'

export type { NormativeSectionResource }
export const getNormativeSections = (): Promise<NormativeSectionResource[]> =>
  apiGet<NormativeSectionResource[]>('/api/normative-sections')
export const updateNormativeSections = (sections: NormativeSectionResource[]): Promise<NormativeSectionResource[]> =>
  apiPut<NormativeSectionResource[]>('/api/normative-sections', sections)
