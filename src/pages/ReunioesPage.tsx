import { useEffect, useState } from 'react'
import { getMeetingSchedules, getServiceHours } from '../services/meetingService'

type MeetingScheduleRow = {
  submissionDeadline: string
  meetingDate: string
}

type ServiceHourRow = {
  weekday: string
  hours: string
}

const defaultMeetingSchedule: MeetingScheduleRow[] = [
  { submissionDeadline: 'Recesso do CEP', meetingDate: 'Janeiro/2025' },
  { submissionDeadline: 'Até 20 de janeiro', meetingDate: '28 de fevereiro' },
  { submissionDeadline: 'Até 14 de fevereiro', meetingDate: '14 de março' },
  { submissionDeadline: 'Até 07 de março', meetingDate: '11 de abril' },
  { submissionDeadline: 'Até 08 de abril', meetingDate: '09 de maio' },
  { submissionDeadline: 'Até 05 de maio', meetingDate: '06 de junho' },
  { submissionDeadline: 'Até 03 de junho', meetingDate: '04 de julho' },
  { submissionDeadline: 'Até 08 de julho', meetingDate: '08 de agosto' },
  { submissionDeadline: 'Até 02 de setembro', meetingDate: '03 de outubro' },
  { submissionDeadline: 'Até 07 de outubro', meetingDate: '07 de novembro' },
  { submissionDeadline: 'Até 05 de novembro', meetingDate: '05 de dezembro' },
]

const defaultServiceHours: ServiceHourRow[] = [
  { weekday: 'Segunda-feira', hours: '7h45min às 11h30min e das 13h30min às 17h15min' },
  { weekday: 'Terça-feira', hours: '7h45min às 11h30min e das 13h30min às 17h15min' },
  { weekday: 'Quarta-feira', hours: '7h45min às 11h30min e das 13h30min às 17h15min' },
  { weekday: 'Quinta-feira', hours: '7h45min às 11h30min e das 13h30min às 17h15min' },
  { weekday: 'Sexta-feira', hours: '7h45min às 11h30min' },
]

export function ReunioesPage() {
  const [meetingSchedule, setMeetingSchedule] = useState<MeetingScheduleRow[]>(defaultMeetingSchedule)
  const [serviceHours, setServiceHours] = useState<ServiceHourRow[]>(defaultServiceHours)
  const [loadingSchedule, setLoadingSchedule] = useState(true)
  const [loadingHours, setLoadingHours] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getMeetingSchedules(2025)
      .then((items) =>
        setMeetingSchedule(
          items.map((item) => ({
            submissionDeadline: item.submission_deadline,
            meetingDate: item.meeting_date,
          })),
        ),
      )
      .catch(() => setError('Não foi possível carregar o calendário de reuniões.'))
      .finally(() => setLoadingSchedule(false))

    getServiceHours()
      .then((items) =>
        setServiceHours(
          items.map((item) => ({
            weekday: item.weekday,
            hours: item.hours,
          })),
        ),
      )
      .catch(() =>
        setError((prev) =>
          prev
            ? `${prev} Não foi possível carregar o horário de atendimento.`
            : 'Não foi possível carregar o horário de atendimento.',
        ),
      )
      .finally(() => setLoadingHours(false))
  }, [])

  if (loadingSchedule || loadingHours) {
    return (
      <section className="mx-auto max-w-7xl px-4 pb-12 pt-10 animate-fade-in-up">
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
          Carregando calendário e horários de atendimento...
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="mx-auto max-w-7xl px-4 pb-12 pt-10 animate-fade-in-up">
        <div className="rounded-3xl border border-rose-200 bg-rose-50 p-8 text-rose-900 dark:border-rose-900/40 dark:bg-rose-950/40 dark:text-rose-200">
          {error}
        </div>
      </section>
    )
  }

  return (
    <section className="mx-auto max-w-7xl px-4 pb-12 pt-10 animate-fade-in-up">
      <div className="hero-gradient relative overflow-hidden rounded-3xl p-8 md:p-12">
        <div className="absolute right-0 top-0 h-52 w-52 rounded-full bg-primary/20 blur-3xl" />
        <div className="relative z-10">
          <h1 className="text-3xl font-bold text-white md:text-4xl">Calendário de Reuniões CEP 2025</h1>
          <p className="mt-3 max-w-3xl text-slate-300">
            Consulte os prazos para submissão de projetos na Plataforma Brasil e as datas previstas para análise dos projetos pelo CEP.
          </p>
        </div>
      </div>

      <article className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <header className="border-b border-slate-200 px-5 py-4 dark:border-slate-800">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Reuniões do CEP</h2>
        </header>

        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead className="bg-slate-50 dark:bg-slate-900">
              <tr>
                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Prazo para inserir projetos na Plataforma Brasil*
                </th>
                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Data da reunião (Análise dos projetos pelo CEP)
                </th>
              </tr>
            </thead>
            <tbody>
              {meetingSchedule.map((row) => (
                <tr className="border-t border-slate-200 transition-colors hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/40" key={row.submissionDeadline}>
                  <td className="px-5 py-4 text-sm font-medium text-slate-700 dark:text-slate-200">{row.submissionDeadline}</td>
                  <td className="px-5 py-4 text-sm text-slate-600 dark:text-slate-300">{row.meetingDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="border-t border-slate-200 px-5 py-4 text-sm text-slate-600 dark:border-slate-800 dark:text-slate-300">
          * Reuniões extraordinárias: se houver necessidade de mais uma reunião no mês, os membros do CEP serão consultados para definir a data.
        </p>
      </article>

      <article className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <header className="border-b border-slate-200 px-5 py-4 dark:border-slate-800">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Horário de funcionamento e atendimento</h2>
        </header>

        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead className="bg-slate-50 dark:bg-slate-900">
              <tr>
                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Dia da semana</th>
                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Horário de funcionamento</th>
              </tr>
            </thead>
            <tbody>
              {serviceHours.map((row) => (
                <tr className="border-t border-slate-200 transition-colors hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/40" key={row.weekday}>
                  <td className="px-5 py-4 text-sm font-medium text-slate-700 dark:text-slate-200">{row.weekday}</td>
                  <td className="px-5 py-4 text-sm text-slate-600 dark:text-slate-300">{row.hours}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </article>
    </section>
  )
}