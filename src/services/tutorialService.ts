import { apiGet, apiPost, apiPut, apiDelete } from './apiClient'
import type { TutorialResource, TutorialVideoResource, TutorialFaqResource } from './types'

export type { TutorialResource, TutorialVideoResource, TutorialFaqResource }

export type TutorialState = TutorialResource & { uploadFile?: File | null }

const unwrapData = <T>(response: unknown): T => {
    if (response && typeof response === 'object' && 'data' in response) {
        return (response as { data: T }).data
    }
    return response as T
}

export const getTutorials = async (): Promise<TutorialResource[]> => {
    const response = await apiGet<unknown>('/api/tutorials')
    return unwrapData<TutorialResource[]>(response)
}

export const getTutorialVideos = async (): Promise<TutorialVideoResource[]> => {
    const response = await apiGet<unknown>('/api/tutorial-videos')
    return unwrapData<TutorialVideoResource[]>(response)
}

export const getTutorialFaqs = async (): Promise<TutorialFaqResource[]> => {
    const response = await apiGet<unknown>('/api/tutorial-faqs')
    return unwrapData<TutorialFaqResource[]>(response)
}

export const deleteTutorial = (id: number): Promise<void> =>
    apiDelete<void>(`/api/tutorials/${id}`)

export const deleteTutorialVideo = (id: number): Promise<void> =>
    apiDelete<void>(`/api/tutorial-videos/${id}`)

export const deleteTutorialFaq = (id: number): Promise<void> =>
    apiDelete<void>(`/api/tutorial-faqs/${id}`)

export const updateTutorials = async (
    tutorials: TutorialState[],
    deletedIds: number[] = [],
): Promise<TutorialResource[]> => {
    for (const id of deletedIds) {
        if (id > 0) {
            await deleteTutorial(id)
        }
    }

    return Promise.all(
        tutorials.map(async (tutorial) => {
            if (tutorial.uploadFile) {
                const formData = new FormData()
                formData.append('title', tutorial.title)
                formData.append('description', tutorial.description ?? '')
                formData.append('url', tutorial.url ?? '')
                formData.append('sort_order', String(tutorial.sort_order ?? 0))
                formData.append('file', tutorial.uploadFile)

                if (tutorial.id > 0) {
                    formData.append('_method', 'PUT')
                    const res = await apiPost<unknown>(`/api/tutorials/${tutorial.id}`, formData)
                    return unwrapData<TutorialResource>(res)
                }
                const res = await apiPost<unknown>('/api/tutorials', formData)
                return unwrapData<TutorialResource>(res)
            }

            const body = {
                title: tutorial.title,
                description: tutorial.description ?? '',
                url: tutorial.url ?? '',
                sort_order: tutorial.sort_order ?? 0,
            }

            const res =
                tutorial.id > 0
                    ? await apiPut<unknown>(`/api/tutorials/${tutorial.id}`, body)
                    : await apiPost<unknown>('/api/tutorials', body)

            return unwrapData<TutorialResource>(res)
        }),
    )
}

export const updateTutorialVideos = async (
    videos: TutorialVideoResource[],
    deletedIds: number[] = [],
): Promise<TutorialVideoResource[]> => {
    for (const id of deletedIds) {
        if (id > 0) {
            await deleteTutorialVideo(id)
        }
    }

    return Promise.all(
        videos.map(async (video) => {
            const body = {
                title: video.title,
                url: video.url ?? '',
                sort_order: video.sort_order ?? 0,
            }

            const res =
                video.id > 0
                    ? await apiPut<unknown>(`/api/tutorial-videos/${video.id}`, body)
                    : await apiPost<unknown>('/api/tutorial-videos', body)

            return unwrapData<TutorialVideoResource>(res)
        }),
    )
}

export const updateTutorialFaqs = async (
    faqs: TutorialFaqResource[],
    deletedIds: number[] = [],
): Promise<TutorialFaqResource[]> => {
    for (const id of deletedIds) {
        if (id > 0) {
            await deleteTutorialFaq(id)
        }
    }

    return Promise.all(
        faqs.map(async (faq) => {
            const body = {
                question: faq.question,
                answer: faq.answer ?? '',
                sort_order: faq.sort_order ?? 0,
            }

            const res =
                faq.id > 0
                    ? await apiPut<unknown>(`/api/tutorial-faqs/${faq.id}`, body)
                    : await apiPost<unknown>('/api/tutorial-faqs', body)

            return unwrapData<TutorialFaqResource>(res)
        }),
    )
}