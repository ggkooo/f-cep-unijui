import { apiGet, apiPut } from './apiClient'
import type { TutorialResource, TutorialVideoResource, TutorialFaqResource } from './types'

export type { TutorialResource, TutorialVideoResource, TutorialFaqResource }
export const getTutorials = (): Promise<TutorialResource[]> => apiGet<TutorialResource[]>('/api/tutorials')
export const getTutorialVideos = (): Promise<TutorialVideoResource[]> => apiGet<TutorialVideoResource[]>('/api/tutorial-videos')
export const getTutorialFaqs = (): Promise<TutorialFaqResource[]> => apiGet<TutorialFaqResource[]>('/api/tutorial-faqs')
export const updateTutorials = (tutorials: TutorialResource[]): Promise<TutorialResource[]> =>
  apiPut<TutorialResource[]>('/api/tutorials', tutorials)
export const updateTutorialVideos = (videos: TutorialVideoResource[]): Promise<TutorialVideoResource[]> =>
  apiPut<TutorialVideoResource[]>('/api/tutorial-videos', videos)
export const updateTutorialFaqs = (faqs: TutorialFaqResource[]): Promise<TutorialFaqResource[]> =>
  apiPut<TutorialFaqResource[]>('/api/tutorial-faqs', faqs)
