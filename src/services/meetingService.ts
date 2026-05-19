import { apiGet, apiPut } from './apiClient'
import type { MeetingScheduleResource, ServiceHourResource } from './types'

export type { MeetingScheduleResource, ServiceHourResource }
export const getMeetingSchedules = (year?: number): Promise<MeetingScheduleResource[]> =>
  apiGet<MeetingScheduleResource[]>(`/api/meeting-schedules${year ? `?year=${year}` : ''}`)
export const getServiceHours = (): Promise<ServiceHourResource[]> => apiGet<ServiceHourResource[]>('/api/service-hours')
export const updateMeetingSchedules = (schedules: MeetingScheduleResource[]): Promise<MeetingScheduleResource[]> =>
  apiPut<MeetingScheduleResource[]>('/api/meeting-schedules', schedules)
export const updateServiceHours = (hours: ServiceHourResource[]): Promise<ServiceHourResource[]> =>
  apiPut<ServiceHourResource[]>('/api/service-hours', hours)
