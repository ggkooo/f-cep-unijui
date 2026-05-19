import { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { logout, isLoggedIn, validateAuthToken } from '../../services/authService'
import { AdminSidebar } from './AdminSidebar'
import { getTrainingTopics, updateTrainingTopics, type TrainingTopicResource } from '../../services/trainingService'

export function AdminCapacitacoesPage() {
  const navigate = useNavigate()
  const [topics, setTopics] = useState<TrainingTopicResource[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isAuthValid, setIsAuthValid] = useState<boolean | null>(null)

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      try {
        const valid = await validateAuthToken()
        setIsAuthValid(valid)
        if (!valid) return

        const result = await getTrainingTopics()
        setTopics(result)
      } catch (err) {
        setError('Não foi possível carregar os itens de capacitação.')
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
    try {
      const updated = await updateTrainingTopics(topics)
      setTopics(updated)
    } catch (err) {
      setError('Erro ao salvar os temas de capacitação.')
    } finally {
      setSaving(false)
    }
  }

  const updateTopic = (index: number, field: keyof TrainingTopicResource, value: string | number) => {
    setTopics((current) =>
      current.map((topic, idx) => (idx === index ? { ...topic, [field]: value } : topic)),
    )
  }

  const addTopic = () => {
    setTopics((current) => [
      ...current,
      {
        id: Date.now(),
        title: 'Novo tema',
        sort_order: current.length + 1,
      },
    ])
  }

  return (
    <section className="mx-auto max-w-7xl px-4 pb-20 pt-24">
      <div className="grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)]">
        <AdminSidebar />

        <div className="flex flex-col gap-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/40 dark:border-slate-800 dark:bg-slate-950 dark:shadow-none">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">Editar Capacitações</h1>
              <p className="mt-2 text-slate-600 dark:text-slate-300">Atualize os temas e descrições apresentados na página de capacitações.</p>
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
              Carregando temas de capacitação...
            </div>
          ) : null}

          {error ? (
            <div className="rounded-2xl border border-rose-200 bg-rose-50 px-5 py-4 text-sm text-rose-900 dark:border-rose-900/40 dark:bg-rose-900/20 dark:text-rose-200">
              {error}
            </div>
          ) : null}

          <div className="flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={addTopic}
              className="rounded-2xl bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary-dark"
            >
              Adicionar tema
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="rounded-2xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? 'Salvando...' : 'Salvar alterações'}
            </button>
          </div>

          <div className="space-y-6">
            {topics.map((topic, index) => (
              <div key={topic.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900">
                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Título do tema</label>
                    <input
                      value={topic.title}
                      onChange={(event) => updateTopic(index, 'title', event.target.value)}
                      className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Ordem</label>
                    <input
                      type="number"
                      value={topic.sort_order}
                      onChange={(event) => updateTopic(index, 'sort_order', Number(event.target.value))}
                      className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div> {/* Fechamento da div de conteúdo flex */}
      </div> {/* Fechamento da div grid principal */}
    </section>
  )
}