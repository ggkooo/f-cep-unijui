import { apiGet, apiPost, apiPut } from './apiClient'
import type { TrainingTopicResource, TrainingMaterialResource } from './types'

export type { TrainingTopicResource, TrainingMaterialResource }
export const getTrainingTopics = (): Promise<TrainingTopicResource[]> =>
  apiGet<TrainingTopicResource[]>('/api/training-topics')
export const getTrainingMaterials = (): Promise<TrainingMaterialResource[]> =>
  apiGet<TrainingMaterialResource[]>('/api/training-materials')
export const updateTrainingTopics = async (topics: TrainingTopicResource[]): Promise<TrainingTopicResource[]> =>
  Promise.all(
    topics.map((topic) =>
      topic.id > 0
        ? apiPut<TrainingTopicResource>(`/api/training-topics/${topic.id}`, topic)
        : apiPost<TrainingTopicResource>('/api/training-topics', topic),
    ),
  )
export const updateTrainingMaterials = async (materials: TrainingMaterialResource[]): Promise<TrainingMaterialResource[]> =>
  Promise.all(
    materials.map((material) =>
      material.id > 0
        ? apiPut<TrainingMaterialResource>(`/api/training-materials/${material.id}`, material)
        : apiPost<TrainingMaterialResource>('/api/training-materials', material),
    ),
  )
