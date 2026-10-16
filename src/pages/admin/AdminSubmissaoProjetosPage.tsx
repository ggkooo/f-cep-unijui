import { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { logout, isLoggedIn, validateAuthToken } from '../../services/authService'
import { AdminSidebar } from './AdminSidebar'
import {
  getTutorials,
  getTutorialVideos,
  getTutorialFaqs,
  updateTutorials,
  updateTutorialVideos,
  updateTutorialFaqs,
  type TutorialState,
  type TutorialVideoResource,
  type TutorialFaqResource,
} from '../../services/tutorialService'

export function AdminSubmissaoProjetosPage() {
  const navigate = useNavigate()
  const [tutorials, setTutorials] = useState<TutorialState[]>([])
  const [videos, setVideos] = useState<TutorialVideoResource[]>([])
  const [faqs, setFaqs] = useState<TutorialFaqResource[]>([])

  const [deletedTutorialIds, setDeletedTutorialIds] = useState<number[]>([])
  const [deletedVideoIds, setDeletedVideoIds] = useState<number[]>([])
  const [deletedFaqIds, setDeletedFaqIds] = useState<number[]>([])

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

        const [tutorialResult, videoResult, faqResult] = await Promise.all([
          getTutorials(),
          getTutorialVideos(),
          getTutorialFaqs(),
        ])

        setTutorials(tutorialResult)
        setVideos(videoResult)
        setFaqs(faqResult)
      } catch {
        setError('Não foi possível carregar o conteúdo de submissão de projetos.')
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
      const updatedTutorials = await updateTutorials(tutorials, deletedTutorialIds)
      const updatedVideos = await updateTutorialVideos(videos, deletedVideoIds)
      const updatedFaqs = await updateTutorialFaqs(faqs, deletedFaqIds)

      setTutorials(updatedTutorials)
      setVideos(updatedVideos)
      setFaqs(updatedFaqs)

      setDeletedTutorialIds([])
      setDeletedVideoIds([])
      setDeletedFaqIds([])

      setSuccess('Conteúdo de submissão de projetos salvo com sucesso.')
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const resErr = err as { response?: { data?: { message?: string } } }
        setError(
            resErr.response?.data?.message ||
            'Erro ao salvar o conteúdo de submissão de projetos.',
        )
      } else if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('Erro ao salvar o conteúdo de submissão de projetos.')
      }
    } finally {
      setSaving(false)
    }
  }

  const updateTutorial = (
      index: number,
      field: keyof TutorialState,
      value: string | File | null,
  ) => {
    setSuccess(null)
    setError(null)
    setTutorials((current) =>
        current.map((item: TutorialState, idx: number) =>
            idx === index ? { ...item, [field]: value } : item,
        ),
    )
  }

  const removeTutorial = (index: number) => {
    const target = tutorials[index]
    if (target.id > 0) {
      setDeletedTutorialIds((prev) => [...prev, target.id])
    }
    setTutorials((current) => current.filter((_, idx) => idx !== index))
    setSuccess('Tutorial removido. Clique em "Salvar alterações" para confirmar a exclusão.')
  }

  const updateVideo = (
      index: number,
      field: keyof TutorialVideoResource,
      value: string,
  ) => {
    setSuccess(null)
    setError(null)
    setVideos((current) =>
        current.map((item: TutorialVideoResource, idx: number) =>
            idx === index ? { ...item, [field]: value } : item,
        ),
    )
  }

  const removeVideo = (index: number) => {
    const target = videos[index]
    if (target.id > 0) {
      setDeletedVideoIds((prev) => [...prev, target.id])
    }
    setVideos((current) => current.filter((_, idx) => idx !== index))
    setSuccess('Vídeo removido. Clique em "Salvar alterações" para confirmar a exclusão.')
  }

  const updateFaq = (
      index: number,
      field: keyof TutorialFaqResource,
      value: string,
  ) => {
    setSuccess(null)
    setError(null)
    setFaqs((current) =>
        current.map((item: TutorialFaqResource, idx: number) =>
            idx === index ? { ...item, [field]: value } : item,
        ),
    )
  }

  const removeFaq = (index: number) => {
    const target = faqs[index]
    if (target.id > 0) {
      setDeletedFaqIds((prev) => [...prev, target.id])
    }
    setFaqs((current) => current.filter((_, idx) => idx !== index))
    setSuccess('Pergunta removida. Clique em "Salvar alterações" para confirmar a exclusão.')
  }

  const addTutorial = () => {
    setSuccess(null)
    setError(null)
    setTutorials((current) => [
      ...current,
      {
        id: -Date.now(),
        title: 'Novo tutorial',
        description: 'Descrição do tutorial',
        file_url: '',
        url: '',
        sort_order: current.length + 1,
      },
    ])
    setSuccess('Novo tutorial adicionado. Clique em "Salvar alterações" para confirmar.')
  }

  const addVideo = () => {
    setSuccess(null)
    setError(null)
    setVideos((current) => [
      ...current,
      {
        id: -Date.now(),
        title: 'Novo vídeo',
        url: '',
        thumbnail_url: '',
        sort_order: current.length + 1,
      },
    ])
    setSuccess('Novo vídeo adicionado. Clique em "Salvar alterações" para confirmar.')
  }

  const addFaq = () => {
    setSuccess(null)
    setError(null)
    setFaqs((current) => [
      ...current,
      {
        id: -Date.now(),
        question: 'Nova pergunta',
        answer: 'Resposta da pergunta',
        sort_order: current.length + 1,
      },
    ])
    setSuccess('Nova pergunta adicionada. Clique em "Salvar alterações" para confirmar.')
  }

  return (
      <section className="mx-auto max-w-7xl px-4 pb-20 pt-24">
        <div className="grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)]">
          <AdminSidebar />

          <div className="flex flex-col gap-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/40 dark:border-slate-800 dark:bg-slate-950 dark:shadow-none">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">
                  Editar Submissão de Projetos
                </h1>
                <p className="mt-2 text-slate-600 dark:text-slate-300">
                  Altere os tutoriais, vídeos e perguntas frequentes da página de submissão de
                  projetos.
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
                  Carregando o conteúdo de submissão de projetos...
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
                    onClick={addTutorial}
                    className="rounded-2xl bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary-dark"
                >
                  Adicionar tutorial
                </button>
                <button
                    type="button"
                    onClick={addVideo}
                    className="rounded-2xl bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary-dark"
                >
                  Adicionar vídeo
                </button>
                <button
                    type="button"
                    onClick={addFaq}
                    className="rounded-2xl bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary-dark"
                >
                  Adicionar pergunta
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
                  Tutoriais
                </h2>
                <div className="space-y-5">
                  {tutorials.map((item: TutorialState, index: number) => (
                      <div
                          key={item.id}
                          className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-950"
                      >
                        <div className="grid gap-5 md:grid-cols-2">
                          <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                              Título
                            </label>
                            <input
                                value={item.title}
                                onChange={(event) =>
                                    updateTutorial(index, 'title', event.target.value)
                                }
                                className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                            />
                          </div>
                          <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                              Descrição
                            </label>
                            <input
                                value={item.description ?? ''}
                                onChange={(event) =>
                                    updateTutorial(index, 'description', event.target.value)
                                }
                                className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                            />
                          </div>
                          <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                              URL Externa do Tutorial
                            </label>
                            <input
                                value={item.url ?? ''}
                                onChange={(event) =>
                                    updateTutorial(index, 'url', event.target.value)
                                }
                                className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                                placeholder="Ex: https://www.exemplo.com/tutorial"
                            />
                          </div>
                          <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                              ou Upload do arquivo (PDF/DOC)
                            </label>
                            <input
                                type="file"
                                accept=".pdf,.doc,.docx"
                                onChange={(event) => {
                                  const file = event.target.files?.[0] ?? null
                                  updateTutorial(index, 'uploadFile', file)
                                }}
                                className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition file:mr-4 file:rounded-full file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                            />
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="text-sm text-slate-500 dark:text-slate-400">
                            {item.uploadFile ? (
                                <p>Novo arquivo: {item.uploadFile.name}</p>
                            ) : item.file_url ? (
                                <p>Possui arquivo em anexo</p>
                            ) : null}
                          </div>
                          <button
                              type="button"
                              onClick={() => removeTutorial(index)}
                              className="rounded-xl bg-rose-100 px-3 py-1.5 text-xs font-semibold text-rose-700 transition hover:bg-rose-200 dark:bg-rose-900/30 dark:text-rose-300"
                          >
                            Excluir tutorial
                          </button>
                        </div>
                      </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900">
                <h2 className="mb-4 text-2xl font-semibold text-slate-900 dark:text-white">
                  Vídeos
                </h2>
                <div className="space-y-5">
                  {videos.map((item: TutorialVideoResource, index: number) => (
                      <div
                          key={item.id}
                          className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-950"
                      >
                        <div className="grid gap-5 md:grid-cols-3">
                          <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                              Título
                            </label>
                            <input
                                value={item.title}
                                onChange={(event) =>
                                    updateVideo(index, 'title', event.target.value)
                                }
                                className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                            />
                          </div>
                          <div className="md:col-span-2">
                            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                              URL do vídeo
                            </label>
                            <input
                                value={item.url ?? ''}
                                onChange={(event) =>
                                    updateVideo(index, 'url', event.target.value)
                                }
                                className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                            />
                          </div>
                        </div>
                        <div className="flex justify-end">
                          <button
                              type="button"
                              onClick={() => removeVideo(index)}
                              className="rounded-xl bg-rose-100 px-3 py-1.5 text-xs font-semibold text-rose-700 transition hover:bg-rose-200 dark:bg-rose-900/30 dark:text-rose-300"
                          >
                            Excluir vídeo
                          </button>
                        </div>
                      </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900">
                <h2 className="mb-4 text-2xl font-semibold text-slate-900 dark:text-white">
                  Perguntas Frequentes
                </h2>
                <div className="space-y-5">
                  {faqs.map((item: TutorialFaqResource, index: number) => (
                      <div
                          key={item.id}
                          className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-950"
                      >
                        <div className="grid gap-5 md:grid-cols-2">
                          <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                              Pergunta
                            </label>
                            <input
                                value={item.question}
                                onChange={(event) =>
                                    updateFaq(index, 'question', event.target.value)
                                }
                                className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                            />
                          </div>
                          <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                              Resposta
                            </label>
                            <input
                                value={item.answer ?? ''}
                                onChange={(event) =>
                                    updateFaq(index, 'answer', event.target.value)
                                }
                                className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                            />
                          </div>
                        </div>
                        <div className="flex justify-end">
                          <button
                              type="button"
                              onClick={() => removeFaq(index)}
                              className="rounded-xl bg-rose-100 px-3 py-1.5 text-xs font-semibold text-rose-700 transition hover:bg-rose-200 dark:bg-rose-900/30 dark:text-rose-300"
                          >
                            Excluir pergunta
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