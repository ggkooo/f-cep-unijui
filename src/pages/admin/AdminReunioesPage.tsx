import { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { logout, isLoggedIn, validateAuthToken } from '../../services/authService'
import { AdminSidebar } from './AdminSidebar'
import {
  getMeetingSchedules,
  getServiceHours,
  updateMeetingSchedules,
  updateServiceHours,
  type MeetingScheduleResource,
  type ServiceHourResource,
} from '../../services/meetingService'

export function AdminReunioesPage() {
  const navigate = useNavigate()
  const [meetingSchedules, setMeetingSchedules] = useState<MeetingScheduleResource[]>([])
  const [serviceHours, setServiceHours] = useState<ServiceHourResource[]>([])
  const [deletedScheduleIds, setDeletedScheduleIds] = useState<number[]>([])
  const [deletedHourIds, setDeletedHourIds] = useState<number[]>([])

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [isAuthValid, setIsAuthValid] = useState<boolean | null>(null)

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      try {
        const valid = await validateAuthToken()
        setIsAuthValid(valid)
        if (!valid) return

        const schedules = await getMeetingSchedules()
        const hours = await getServiceHours()

        setMeetingSchedules(schedules)
        setServiceHours(hours)
      } catch {
        setError('Não foi possível carregar os dados de reuniões.')
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  if (isAuthValid === false || !isLoggedIn()) {
    return <Navigate to="/admin/login" replace />
  }

  const handleLogout = async () => {
    try {
      await logout()
    } finally {
      navigate('/admin/login', { replace: true })
    }
  }

  const handleSave = async () => {
    setSaving(true)
    setError(null)
    setSuccess(null)

    try {
      const updatedSchedules = await updateMeetingSchedules(meetingSchedules, deletedScheduleIds)
      const updatedHours = await updateServiceHours(serviceHours, deletedHourIds)

      setMeetingSchedules(updatedSchedules)
      setServiceHours(updatedHours)
      setDeletedScheduleIds([])
      setDeletedHourIds([])
      setSuccess('Cronograma de reuniões e horários de atendimento salvos com sucesso.')
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const resErr = err as { response?: { data?: { message?: string } } }
        setError(resErr.response?.data?.message || 'Erro ao salvar os dados de reunião e atendimento.')
      } else if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('Erro ao salvar os dados de reunião e atendimento.')
      }
    } finally {
      setSaving(false)
    }
  }

  const updateSchedule = (
      index: number,
      field: keyof MeetingScheduleResource,
      value: string | number,
  ) => {
    setSuccess(null)
    setError(null)
    setMeetingSchedules((current) =>
        current.map((schedule, idx) =>
            idx === index
                ? {
                  ...schedule,
                  [field]: field === 'year' ? Number(value) || value : value,
                }
                : schedule,
        ),
    )
  }

  const removeSchedule = (index: number) => {
    const target = meetingSchedules[index]
    if (target.id > 0) {
      setDeletedScheduleIds((prev) => [...prev, target.id])
    }
    setMeetingSchedules((current) => current.filter((_, idx) => idx !== index))
    setSuccess('Reunião removida. Clique em "Salvar alterações" para confirmar a exclusão.')
  }

  const updateHour = (
      index: number,
      field: keyof ServiceHourResource,
      value: string | number,
  ) => {
    setSuccess(null)
    setError(null)
    setServiceHours((current) =>
        current.map((hour, idx) => (idx === index ? { ...hour, [field]: value } : hour)),
    )
  }

  const removeServiceHour = (index: number) => {
    const target = serviceHours[index]
    if (target.id > 0) {
      setDeletedHourIds((prev) => [...prev, target.id])
    }
    setServiceHours((current) => current.filter((_, idx) => idx !== index))
    setSuccess('Horário removido. Clique em "Salvar alterações" para confirmar a exclusão.')
  }

  const addSchedule = () => {
    setSuccess(null)
    setError(null)
    setMeetingSchedules((current) => [
      ...current,
      {
        id: -Date.now(),
        year: new Date().getFullYear(),
        meeting_date: '01/01/2025',
        submission_deadline: '01/01/2025',
        sort_order: current.length + 1,
      },
    ])
    setSuccess('Nova reunião adicionada. Clique em "Salvar alterações" para confirmar.')
  }

  const addServiceHour = () => {
    setSuccess(null)
    setError(null)
    setServiceHours((current) => [
      ...current,
      {
        id: -Date.now(),
        weekday: 'Segunda a sexta',
        hours: '08:00 às 12:00',
        sort_order: current.length + 1,
      },
    ])
    setSuccess('Novo horário de atendimento adicionado. Clique em "Salvar alterações".')
  }

  return (
      <section className="mx-auto max-w-7xl px-4 pb-20 pt-24">
        <div className="grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)]">
          <AdminSidebar />

          <div className="flex flex-col gap-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/40 dark:border-slate-800 dark:bg-slate-950 dark:shadow-none">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">
                  Editar Reuniões
                </h1>
                <p className="mt-2 text-slate-600 dark:text-slate-300">
                  Atualize o cronograma de reuniões e os horários de atendimento da coordenação.
                </p>
              </div>

              <button
                  type="button"
                  onClick={handleLogout}
                  className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                Sair
              </button>
            </div>

            {loading ? (
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
                  Carregando horários e agenda de reuniões...
                </div>
            ) : null}

            {error ? (
                <div className="rounded-2xl border border-rose-200 bg-rose-50 px-5 py-4 text-sm text-rose-900 dark:border-rose-900/40 dark:bg-rose-900/20 dark:text-rose-200">
                  {error}
                </div>
            ) : null}

            {success ? (
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm text-emerald-900 dark:border-emerald-900/40 dark:bg-emerald-900/20 dark:text-emerald-200">
                  {success}
                </div>
            ) : null}

            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap gap-2">
                <button
                    type="button"
                    onClick={addSchedule}
                    className="rounded-2xl bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary-dark"
                >
                  Adicionar reunião
                </button>
                <button
                    type="button"
                    onClick={addServiceHour}
                    className="rounded-2xl bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary-dark"
                >
                  Adicionar atendimento
                </button>
              </div>

              <button
                  type="button"
                  onClick={handleSave}
                  disabled={saving}
                  className="rounded-2xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving ? 'Salvando...' : 'Salvar alterações'}
              </button>
            </div>

            <div className="space-y-8">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900">
                <h2 className="mb-4 text-2xl font-semibold text-slate-900 dark:text-white">
                  Cronograma de Reuniões
                </h2>
                <div className="space-y-5">
                  {meetingSchedules.map((schedule, index) => (
                      <div
                          key={schedule.id}
                          className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-950"
                      >
                        <div className="grid gap-5 md:grid-cols-3">
                          <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                              Ano
                            </label>
                            <input
                                type="number"
                                value={schedule.year ?? ''}
                                onChange={(event) =>
                                    updateSchedule(index, 'year', event.target.value)
                                }
                                className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                            />
                          </div>
                          <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                              Data da reunião
                            </label>
                            <input
                                value={schedule.meeting_date}
                                onChange={(event) =>
                                    updateSchedule(index, 'meeting_date', event.target.value)
                                }
                                className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                            />
                          </div>
                          <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                              Prazo de submissão
                            </label>
                            <input
                                value={schedule.submission_deadline}
                                onChange={(event) =>
                                    updateSchedule(index, 'submission_deadline', event.target.value)
                                }
                                className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                            />
                          </div>
                        </div>
                        <div className="flex justify-end">
                          <button
                              type="button"
                              onClick={() => removeSchedule(index)}
                              className="rounded-xl bg-rose-100 px-3 py-1.5 text-xs font-semibold text-rose-700 transition hover:bg-rose-200 dark:bg-rose-900/30 dark:text-rose-300"
                          >
                            Excluir reunião
                          </button>
                        </div>
                      </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900">
                <h2 className="mb-4 text-2xl font-semibold text-slate-900 dark:text-white">
                  Horários de Atendimento
                </h2>
                <div className="space-y-5">
                  {serviceHours.map((hour, index) => (
                      <div
                          key={hour.id}
                          className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-950"
                      >
                        <div className="grid gap-5 md:grid-cols-3">
                          <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                              Dia da semana
                            </label>
                            <input
                                value={hour.weekday}
                                onChange={(event) => updateHour(index, 'weekday', event.target.value)}
                                className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                            />
                          </div>
                          <div className="md:col-span-2">
                            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                              Horário
                            </label>
                            <input
                                value={hour.hours}
                                onChange={(event) => updateHour(index, 'hours', event.target.value)}
                                className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                            />
                          </div>
                        </div>
                        <div className="flex justify-end">
                          <button
                              type="button"
                              onClick={() => removeServiceHour(index)}
                              className="rounded-xl bg-rose-100 px-3 py-1.5 text-xs font-semibold text-rose-700 transition hover:bg-rose-200 dark:bg-rose-900/30 dark:text-rose-300"
                          >
                            Excluir horário
                          </button>
                        </div>
                      </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  )
}