import { apiGet, apiPost, apiPut } from './apiClient'
import type { TutorialResource, TutorialVideoResource, TutorialFaqResource } from './types'

export type { TutorialResource, TutorialVideoResource, TutorialFaqResource }
export const getTutorials = (): Promise<TutorialResource[]> => apiGet<TutorialResource[]>('/api/tutorials')
export const getTutorialVideos = (): Promise<TutorialVideoResource[]> => apiGet<TutorialVideoResource[]>('/api/tutorial-videos')
export const getTutorialFaqs = (): Promise<TutorialFaqResource[]> => apiGet<TutorialFaqResource[]>('/api/tutorial-faqs')
export const updateTutorials = async (tutorials: TutorialResource[]): Promise<TutorialResource[]> =>
  Promise.all(
    tutorials.map((tutorial) =>
      tutorial.id > 0
        ? apiPut<TutorialResource>(`/api/tutorials/${tutorial.id}`, tutorial)
        : apiPost<TutorialResource>('/api/tutorials', tutorial),
    ),
  )
export const updateTutorialVideos = async (videos: TutorialVideoResource[]): Promise<TutorialVideoResource[]> =>
  Promise.all(
    videos.map((video) =>
      video.id > 0
        ? apiPut<TutorialVideoResource>(`/api/tutorial-videos/${video.id}`, video)
        : apiPost<TutorialVideoResource>('/api/tutorial-videos', video),
    ),
  )
export const updateTutorialFaqs = async (faqs: TutorialFaqResource[]): Promise<TutorialFaqResource[]> =>
  Promise.all(
    faqs.map((faq) =>
      faq.id > 0
        ? apiPut<TutorialFaqResource>(`/api/tutorial-faqs/${faq.id}`, faq)
        : apiPost<TutorialFaqResource>('/api/tutorial-faqs', faq),
    ),
  )
