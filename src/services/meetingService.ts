import { apiGet, apiPost, apiPut, apiDelete } from './apiClient'
import type { MeetingScheduleResource, ServiceHourResource } from './types'

export type { MeetingScheduleResource, ServiceHourResource }

const unwrapData = <T>(response: unknown): T => {
    if (response && typeof response === 'object' && 'data' in response) {
        return (response as { data: T }).data
    }
    return response as T
}

export const getMeetingSchedules = async (year?: number): Promise<MeetingScheduleResource[]> => {
    const response = await apiGet<unknown>(
        `/api/meeting-schedules${year ? `?year=${year}` : ''}`,
    )
    return unwrapData<MeetingScheduleResource[]>(response)
}

export const getServiceHours = async (): Promise<ServiceHourResource[]> => {
    const response = await apiGet<unknown>('/api/service-hours')
    return unwrapData<ServiceHourResource[]>(response)
}

export const deleteMeetingSchedule = (id: number): Promise<void> =>
    apiDelete<void>(`/api/meeting-schedules/${id}`)

export const deleteServiceHour = (id: number): Promise<void> =>
    apiDelete<void>(`/api/service-hours/${id}`)

export const updateMeetingSchedules = async (
    schedules: MeetingScheduleResource[],
    deletedScheduleIds: number[] = [],
): Promise<MeetingScheduleResource[]> => {
    for (const scheduleId of deletedScheduleIds) {
        if (scheduleId > 0) {
            await deleteMeetingSchedule(scheduleId)
        }
    }

    const savedSchedules = await Promise.all(
        schedules.map(async (schedule) => {
            const payload = {
                year: Number(schedule.year) || new Date().getFullYear(),
                submission_deadline: schedule.submission_deadline,
                meeting_date: schedule.meeting_date,
                sort_order: schedule.sort_order ?? 0,
            }

            const rawResponse =
                schedule.id > 0
                    ? await apiPut<unknown>(`/api/meeting-schedules/${schedule.id}`, payload)
                    : await apiPost<unknown>('/api/meeting-schedules', payload)

            return unwrapData<MeetingScheduleResource>(rawResponse)
        }),
    )

    return savedSchedules
}

export const updateServiceHours = async (
    hours: ServiceHourResource[],
    deletedHourIds: number[] = [],
): Promise<ServiceHourResource[]> => {
    for (const hourId of deletedHourIds) {
        if (hourId > 0) {
            await deleteServiceHour(hourId)
        }
    }

    const savedHours = await Promise.all(
        hours.map(async (hour) => {
            const payload = {
                weekday: hour.weekday,
                hours: hour.hours,
                sort_order: hour.sort_order ?? 0,
            }

            const rawResponse =
                hour.id > 0
                    ? await apiPut<unknown>(`/api/service-hours/${hour.id}`, payload)
                    : await apiPost<unknown>('/api/service-hours', payload)

            return unwrapData<ServiceHourResource>(rawResponse)
        }),
    )

    return savedHours
}