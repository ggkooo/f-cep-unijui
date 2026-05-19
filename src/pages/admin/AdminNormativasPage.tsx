import { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { logout, isLoggedIn, validateAuthToken } from '../../services/authService'
import { AdminSidebar } from './AdminSidebar'
import { getNormativeSections, updateNormativeSections, type NormativeSectionResource } from '../../services/normativeService'
import type { NormativeItemResource } from '../../services/types'

type NormativeItemState = NormativeItemResource & { uploadFile?: File | null }
type NormativeSectionState = NormativeSectionResource & { items: NormativeItemState[] }

const defaultSection: NormativeSectionState = {
  id: -Date.now(),
  title: 'Nova seção',
  sort_order: 0,
  items: [],
}

export function AdminNormativasPage() {
  const navigate = useNavigate()
  const [sections, setSections] = useState<NormativeSectionState[]>([])
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

        const results = await getNormativeSections()
        setSections(results)
      } catch (err) {
        setError('Não foi possível carregar as seções de normativas.')
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
      await updateNormativeSections(sections)
      const refreshedSections = await getNormativeSections()
      setSections(refreshedSections)
      setSuccess('Seções e normativas salvas com sucesso.')
    } catch (err) {
      setError('Erro ao salvar as seções de normativas.')
    } finally {
      setSaving(false)
    }
  }

  const updateSection = (index: number, next: Partial<NormativeSectionState>) => {
    setSuccess(null)
    setSections((current) =>
      current.map((section, idx) => (idx === index ? { ...section, ...next } : section)),
    )
  }

  const updateItem = (
    sectionIndex: number,
    itemIndex: number,
    field: keyof NormativeItemState,
    value: string | File | null,
  ) => {
    setSuccess(null)
    setSections((current) =>
      current.map((section, idx) => {
        if (idx !== sectionIndex) return section
        return {
          ...section,
          items: section.items.map((item, itemIdx) =>
            itemIdx === itemIndex
              ? {
                  ...item,
                  [field]: value,
                }
              : item,
          ),
        }
      }),
    )
  }

  const addSection = () => {
    setSections((current) => [
      ...current,
      {
        ...defaultSection,
        id: -Date.now(),
        title: `Nova seção ${current.length + 1}`,
        sort_order: current.length + 1,
      },
    ])
  }

  const addItem = (sectionIndex: number) => {
    setSections((current) =>
      current.map((section, idx) =>
        idx !== sectionIndex
          ? section
          : {
              ...section,
              items: [
                ...section.items,
                {
                  id: -Date.now(),
                  title: 'Nova normativa',
                  file_url: '',
                  original_filename: '',
                  sort_order: section.items.length + 1,
                  uploadFile: null,
                },
              ],
            },
      ),
    )
    setSuccess('Normativa adicionada. Selecione um arquivo e clique em salvar para confirmar.')
  }

  return (
    <section className="mx-auto max-w-7xl px-4 pb-20 pt-24">
      <div className="grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)]">
        <AdminSidebar />

        <div className="flex flex-col gap-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/40 dark:border-slate-800 dark:bg-slate-950 dark:shadow-none">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">Editar Normativas</h1>
              <p className="mt-2 text-slate-600 dark:text-slate-300">Gerencie as normas, resoluções e ofícios exibidos no site.</p>
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
              Carregando seções de normativas...
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
            <button
              type="button"
              onClick={addSection}
              className="rounded-2xl bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary-dark"
            >
              Adicionar seção
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
                <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                  <div className="flex-1">
                    <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Título da seção</label>
                    <input
                      value={section.title}
                      onChange={(event) => updateSection(sectionIndex, { title: event.target.value })}
                      className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => addItem(sectionIndex)}
                    className="self-end rounded-2xl bg-primary px-4 py-3 text-sm font-semibold text-white transition hover:bg-primary-dark md:self-auto"
                  >
                    Adicionar normativa
                  </button>
                </div>

                <div className="space-y-5">
                  {section.items.map((item: NormativeItemState, itemIndex) => (
                    <div key={item.id} className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-950">
                      <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Título</label>
                        <input
                          value={item.title}
                          onChange={(event) => updateItem(sectionIndex, itemIndex, 'title', event.target.value)}
                          className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                        />
                      </div>

                      <div className="mt-5 grid gap-4 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
                        <div>
                          <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Upload do arquivo</label>
                          <input
                            type="file"
                            accept=".pdf,.doc,.docx,.txt"
                            onChange={(event) => {
                              const file = event.target.files?.[0] ?? null
                              updateItem(sectionIndex, itemIndex, 'uploadFile', file)
                            }}
                            className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition file:mr-4 file:rounded-full file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                          />
                        </div>
                        <div className="flex items-center text-sm text-slate-500 dark:text-slate-400">
                          {item.uploadFile ? (
                            <p>Arquivo selecionado: {item.uploadFile.name}</p>
                          ) : item.original_filename ? (
                            <p>Arquivo atual: {item.original_filename}</p>
                          ) : (
                            <p>Nenhum arquivo carregado. Selecione um arquivo antes de salvar.</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div> {/* Fechamento do container de conteúdo */}
      </div> {/* Fechamento do grid principal */}
    </section>
  )
}