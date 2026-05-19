import { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { logout, isLoggedIn, validateAuthToken } from '../../services/authService'
import { AdminSidebar } from './AdminSidebar'
import { getGuidanceSections, updateGuidanceSections, type GuidanceSectionResource } from '../../services/guidanceService'

export function AdminDuvidasPage() {
  const navigate = useNavigate()
  const [sections, setSections] = useState<GuidanceSectionResource[]>([])
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

        const data = await getGuidanceSections()
        setSections(data)
      } catch (err) {
        setError('Não foi possível carregar as dúvidas frequentes.')
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
      const updated = await updateGuidanceSections(sections)
      setSections(updated)
    } catch (err) {
      setError('Erro ao salvar as dúvidas frequentes.')
    } finally {
      setSaving(false)
    }
  }

  const updateSection = (index: number, field: keyof GuidanceSectionResource, value: string) => {
    setSections((current) =>
      current.map((section, idx) => (idx === index ? { ...section, [field]: value } : section)),
    )
  }

  const updateListItem = (sectionIndex: number, listKey: 'points' | 'examples', itemIndex: number, value: string) => {
    setSections((current) =>
      current.map((section, idx) => {
        if (idx !== sectionIndex) return section
        const list = section[listKey] ?? []
        return {
          ...section,
          [listKey]: list.map((item, i) => (i === itemIndex ? value : item)),
        }
      }),
    )
  }

  const addSection = () => {
    setSections((current) => [
      ...current,
      {
        id: Date.now(),
        title: 'Nova pergunta',
        warning: '',
        points: ['Nova resposta'],
        important: '',
        examples: [],
        observation: '',
        sort_order: current.length + 1,
      },
    ])
  }

  const addPoint = (sectionIndex: number) => {
    setSections((current) =>
      current.map((section, idx) =>
        idx !== sectionIndex
          ? section
          : {
              ...section,
              points: [...(section.points ?? []), 'Nova resposta'],
            },
      ),
    )
  }

  const addExample = (sectionIndex: number) => {
    setSections((current) =>
      current.map((section, idx) =>
        idx !== sectionIndex
          ? section
          : {
              ...section,
              examples: [...(section.examples ?? []), 'Novo exemplo'],
            },
      ),
    )
  }

  return (
    <section className="mx-auto max-w-7xl px-4 pb-20 pt-24">
      <div className="grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)]">
        <AdminSidebar />

        <div className="flex flex-col gap-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/40 dark:border-slate-800 dark:bg-slate-950 dark:shadow-none">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">Editar Dúvidas</h1>
              <p className="mt-2 text-slate-600 dark:text-slate-300">Atualize as perguntas e respostas exibidas em dúvidas frequentes.</p>
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
              Carregando o conteúdo de dúvidas...
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
              onClick={addSection}
              className="rounded-2xl bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary-dark"
            >
              Adicionar pergunta
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

          <div className="space-y-8">
            {sections.map((section, sectionIndex) => (
              <div key={section.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900">
                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Pergunta</label>
                    <input
                      value={section.title}
                      onChange={(event) => updateSection(sectionIndex, 'title', event.target.value)}
                      className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Observação</label>
                    <input
                      value={section.observation ?? ''}
                      onChange={(event) => updateSection(sectionIndex, 'observation', event.target.value)}
                      className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                    />
                  </div>
                </div>

                <div className="mt-6 grid gap-5 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Pontos de resposta</label>
                    <div className="space-y-3 rounded-3xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-950">
                      {(section.points ?? []).map((point, pointIndex) => (
                        <input
                          key={`${section.id}-point-${pointIndex}`}
                          value={point}
                          onChange={(event) => updateListItem(sectionIndex, 'points', pointIndex, event.target.value)}
                          className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                        />
                      ))}
                      <button
                        type="button"
                        onClick={() => addPoint(sectionIndex)}
                        className="rounded-2xl bg-primary px-4 py-3 text-sm font-semibold text-white transition hover:bg-primary-dark"
                      >
                        Adicionar ponto
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Exemplos</label>
                    <div className="space-y-3 rounded-3xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-950">
                      {(section.examples ?? []).map((example, exampleIndex) => (
                        <input
                          key={`${section.id}-example-${exampleIndex}`}
                          value={example}
                          onChange={(event) => updateListItem(sectionIndex, 'examples', exampleIndex, event.target.value)}
                          className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                        />
                      ))}
                      <button
                        type="button"
                        onClick={() => addExample(sectionIndex)}
                        className="rounded-2xl bg-primary px-4 py-3 text-sm font-semibold text-white transition hover:bg-primary-dark"
                      >
                        Adicionar exemplo
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div> {/* <-- Esta era a DIV que estava faltando fechar! */}
    </section>
  )
}