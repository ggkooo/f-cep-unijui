import { apiGet, apiPost, apiPut } from './apiClient'
import type { MeetingScheduleResource, ServiceHourResource } from './types'

export type { MeetingScheduleResource, ServiceHourResource }
export const getMeetingSchedules = (year?: number): Promise<MeetingScheduleResource[]> =>
  apiGet<MeetingScheduleResource[]>(`/api/meeting-schedules${year ? `?year=${year}` : ''}`)
export const getServiceHours = (): Promise<ServiceHourResource[]> => apiGet<ServiceHourResource[]>('/api/service-hours')
export const updateMeetingSchedules = async (schedules: MeetingScheduleResource[]): Promise<MeetingScheduleResource[]> =>
  Promise.all(
    schedules.map((schedule) =>
      schedule.id > 0
        ? apiPut<MeetingScheduleResource>(`/api/meeting-schedules/${schedule.id}`, schedule)
        : apiPost<MeetingScheduleResource>('/api/meeting-schedules', schedule),
    ),
  )
export const updateServiceHours = async (hours: ServiceHourResource[]): Promise<ServiceHourResource[]> =>
  Promise.all(
    hours.map((hour) =>
      hour.id > 0
        ? apiPut<ServiceHourResource>(`/api/service-hours/${hour.id}`, hour)
        : apiPost<ServiceHourResource>('/api/service-hours', hour),
    ),
  )
