import { apiGet, apiPut } from './apiClient'
import type { TrainingTopicResource, TrainingMaterialResource } from './types'

export type { TrainingTopicResource, TrainingMaterialResource }
export const getTrainingTopics = (): Promise<TrainingTopicResource[]> =>
  apiGet<TrainingTopicResource[]>('/api/training-topics')
export const getTrainingMaterials = (): Promise<TrainingMaterialResource[]> =>
  apiGet<TrainingMaterialResource[]>('/api/training-materials')
export const updateTrainingTopics = (topics: TrainingTopicResource[]): Promise<TrainingTopicResource[]> =>
  apiPut<TrainingTopicResource[]>('/api/training-topics', topics)
export const updateTrainingMaterials = (materials: TrainingMaterialResource[]): Promise<TrainingMaterialResource[]> =>
  apiPut<TrainingMaterialResource[]>('/api/training-materials', materials)
