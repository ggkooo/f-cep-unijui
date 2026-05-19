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
  type TutorialResource,
  type TutorialVideoResource,
  type TutorialFaqResource,
} from '../../services/tutorialService'

export function AdminSubmissaoProjetosPage() {
  const navigate = useNavigate()
  const [tutorials, setTutorials] = useState<TutorialResource[]>([])
  const [videos, setVideos] = useState<TutorialVideoResource[]>([])
  const [faqs, setFaqs] = useState<TutorialFaqResource[]>([])
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

        const [tutorialResult, videoResult, faqResult] = await Promise.all([
          getTutorials(),
          getTutorialVideos(),
          getTutorialFaqs(),
        ])

        setTutorials(tutorialResult)
        setVideos(videoResult)
        setFaqs(faqResult)
      } catch (err) {
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

    try {
      const updatedTutorials = await updateTutorials(tutorials)
      const updatedVideos = await updateTutorialVideos(videos)
      const updatedFaqs = await updateTutorialFaqs(faqs)
      setTutorials(updatedTutorials)
      setVideos(updatedVideos)
      setFaqs(updatedFaqs)
    } catch (err) {
      setError('Erro ao salvar o conteúdo de submissão de projetos.')
    } finally {
      setSaving(false)
    }
  }

  const updateTutorial = (index: number, field: keyof TutorialResource, value: string) => {
    setTutorials((current) =>
      current.map((item, idx) => (idx === index ? { ...item, [field]: value } : item)),
    )
  }

  const updateVideo = (index: number, field: keyof TutorialVideoResource, value: string) => {
    setVideos((current) =>
      current.map((item, idx) => (idx === index ? { ...item, [field]: value } : item)),
    )
  }

  const updateFaq = (index: number, field: keyof TutorialFaqResource, value: string) => {
    setFaqs((current) =>
      current.map((item, idx) => (idx === index ? { ...item, [field]: value } : item)),
    )
  }

  const addTutorial = () => {
    setTutorials((current) => [
      ...current,
      {
        id: -Date.now(),
        title: 'Novo tutorial',
        description: 'Descrição do tutorial',
        file_url: '',
        original_filename: '',
        sort_order: current.length + 1,
      },
    ])
  }

  const addVideo = () => {
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
  }

  const addFaq = () => {
    setFaqs((current) => [
      ...current,
      {
        id: -Date.now(),
        question: 'Nova pergunta',
        answer: 'Resposta da pergunta',
        sort_order: current.length + 1,
      },
    ])
  }

  return (
    <section className="mx-auto max-w-7xl px-4 pb-20 pt-24">
      <div className="grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)]">
        <AdminSidebar />

        {/* Div principal de conteúdo */}
        <div className="flex flex-col gap-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/40 dark:border-slate-800 dark:bg-slate-950 dark:shadow-none">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">Editar Submissão de Projetos</h1>
              <p className="mt-2 text-slate-600 dark:text-slate-300">Altere os tutoriais, vídeos e perguntas frequentes da página de submissão de projetos.</p>
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

          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-2">
              <button type="button" onClick={addTutorial} className="rounded-2xl bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary-dark">
                Adicionar tutorial
              </button>
              <button type="button" onClick={addVideo} className="rounded-2xl bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary-dark">
                Adicionar vídeo
              </button>
              <button type="button" onClick={addFaq} className="rounded-2xl bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary-dark">
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
            {/* Tutoriais */}
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900">
              <h2 className="mb-4 text-2xl font-semibold text-slate-900 dark:text-white">Tutoriais</h2>
              <div className="space-y-5">
                {tutorials.map((item, index) => (
                  <div key={item.id} className="grid gap-5 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-950 md:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Título</label>
                      <input
                        value={item.title}
                        onChange={(event) => updateTutorial(index, 'title', event.target.value)}
                        className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Descrição</label>
                      <input
                        value={item.description ?? ''}
                        onChange={(event) => updateTutorial(index, 'description', event.target.value)}
                        className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Vídeos */}
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900">
              <h2 className="mb-4 text-2xl font-semibold text-slate-900 dark:text-white">Vídeos</h2>
              <div className="space-y-5">
                {videos.map((item, index) => (
                  <div key={item.id} className="grid gap-5 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-950 md:grid-cols-3">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Título</label>
                      <input
                        value={item.title}
                        onChange={(event) => updateVideo(index, 'title', event.target.value)}
                        className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">URL do vídeo</label>
                      <input
                        value={item.url ?? ''}
                        onChange={(event) => updateVideo(index, 'url', event.target.value)}
                        className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                      />
                    </div>
                    <div className="md:col-span-1">
                      <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Thumbnail atual</label>
                      <div className="rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200">
                        {item.thumbnail_url ? (
                          <span>{item.thumbnail_url}</span>
                        ) : (
                          <span>Será gerada automaticamente após salvar.</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Perguntas Frequentes */}
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900">
              <h2 className="mb-4 text-2xl font-semibold text-slate-900 dark:text-white">Perguntas Frequentes</h2>
              <div className="space-y-5">
                {faqs.map((item, index) => (
                  <div key={item.id} className="grid gap-5 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-950 md:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Pergunta</label>
                      <input
                        value={item.question}
                        onChange={(event) => updateFaq(index, 'question', event.target.value)}
                        className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Resposta</label>
                      <input
                        value={item.answer ?? ''}
                        onChange={(event) => updateFaq(index, 'answer', event.target.value)}
                        className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div> {/* Fechamento da div principal */}
      </div> {/* Fechamento da div de grid */}
    </section>
  )
}