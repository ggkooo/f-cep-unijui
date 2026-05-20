import { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { logout, isLoggedIn, validateAuthToken } from '../../services/authService'
import { AdminSidebar } from './AdminSidebar'
import {
  getTutorialFaqs,
  updateTutorialFaqs,
  deleteTutorialFaq,
  type TutorialFaqResource,
} from '../../services/tutorialService'

export function AdminDuvidasPage() {
  const navigate = useNavigate()
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

        const data = await getTutorialFaqs()
        setFaqs(data)
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
      const newFaqs = faqs.filter((faq) => faq.id < 0)
      const existingFaqs = faqs.filter((faq) => faq.id > 0)

      // Removi a atribuição de variáveis não lidas para evitar erro TS6133
      await Promise.all(
          existingFaqs.map((faq) =>
              updateTutorialFaqs([faq]).then((res) => res[0]),
          ),
      )
      await Promise.all(
          newFaqs.map((faq) =>
              updateTutorialFaqs([faq]).then((res) => res[0]),
          ),
      )

      const result = await getTutorialFaqs()
      setFaqs(result)
    } catch (err) {
      setError('Erro ao salvar as dúvidas frequentes.')
    } finally {
      setSaving(false)
    }
  }

  const handleDeleteFaq = async (id: number) => {
    if (!window.confirm('Tem certeza que deseja remover esta dúvida frequente?')) {
      return
    }

    setSaving(true)
    setError(null)
    try {
      await deleteTutorialFaq(id)
      setFaqs((current) => current.filter((faq) => faq.id !== id))
    } catch (err) {
      setError('Erro ao remover a dúvida frequente.')
    } finally {
      setSaving(false)
    }
  }

  const updateFaq = (index: number, field: keyof TutorialFaqResource, value: string | number) => {
    setFaqs((current) =>
        current.map((faq, idx) => (idx === index ? { ...faq, [field]: value } : faq)),
    )
  }

  const addFaq = () => {
    setFaqs((current) => [
      ...current,
      {
        id: -Date.now(),
        question: 'Nova pergunta',
        answer: 'Nova resposta',
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
                <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">Editar Dúvidas Frequentes</h1>
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
                  Carregando as dúvidas frequentes...
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
                  onClick={addFaq}
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
              {faqs.map((faq, index) => (
                  <div key={faq.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900">
                    <div className="grid gap-5 md:grid-cols-2">
                      <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Pergunta</label>
                        <input
                            value={faq.question}
                            onChange={(event) => updateFaq(index, 'question', event.target.value)}
                            className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Resposta</label>
                        <textarea
                            // CORREÇÃO AQUI: Garante que o valor nunca seja null para evitar erro TS2322
                            value={faq.answer ?? ''}
                            onChange={(event) => updateFaq(index, 'answer', event.target.value)}
                            rows={3}
                            className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                        />
                      </div>
                    </div>
                    <div className="mt-4 flex justify-end">
                      <button
                          type="button"
                          onClick={() => handleDeleteFaq(faq.id)}
                          disabled={saving}
                          className="rounded-2xl bg-rose-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        Remover
                      </button>
                    </div>
                  </div>
              ))}
            </div>
          </div>
        </div>
      </section>
  )
}