export type MemberResource = {
  id: number
  category: string
  role: string
  name: string
  education: string
  qualification: string
  notes: string | null
  sort_order: number
}

export type NormativeItemResource = {
  id: number
  title: string
  file_url: string
  original_filename: string
  sort_order: number
}

export type NormativeSectionResource = {
  id: number
  title: string
  sort_order: number
  items: NormativeItemResource[]
}

export type DocumentItemResource = {
  id: number
  name: string
  description: string
  file_url: string | null
  original_filename: string | null
  sort_order: number
}

export type DocumentSectionResource = {
  id: number
  title: string
  sort_order: number
  items: DocumentItemResource[]
}

export type MeetingScheduleResource = {
  id: number
  submission_deadline: string
  meeting_date: string
  year?: number
  sort_order?: number
}

export type ServiceHourResource = {
  id: number
  weekday: string
  hours: string
  sort_order?: number
}

export type TrainingTopicResource = {
  id: number
  title: string
  sort_order?: number
}

export type TrainingMaterialResource = {
  id: number
  title: string
  description: string
  file_url: string | null
  original_filename: string | null
  sort_order?: number
}

export type TutorialResource = {
  id: number
  title: string
  description?: string
  file_url?: string | null
  sort_order?: number
}

export type TutorialVideoResource = {
  id: number
  title: string
  url?: string | null
  thumbnail_url?: string | null
  sort_order?: number
}

export type TutorialFaqResource = {
  id: number
  question: string
  answer?: string | null
  sort_order?: number
}

export type GuidanceSectionResource = {
  id: number
  title: string
  points: string[]
  warning?: string | null
  important?: string | null
  observation?: string | null
  examples?: string[]
  sort_order?: number
}

export type ContactInfoResource = {
  id: number
  institution_name?: string
  address?: string
  city_state_zip?: string
  phone?: string
  email?: string
  service_hours?: string
  website?: string
  [key: string]: unknown
}
