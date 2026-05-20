import { useEffect, useState } from 'react'
import { getTutorialFaqs, type TutorialFaqResource } from '../services/tutorialService'

export function DuvidasPage() {
  const [faqs, setFaqs] = useState<TutorialFaqResource[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getTutorialFaqs()
      .then((items) => {
        setFaqs(items)
      })
      .catch((err) => {
        console.error("Failed to load FAQs:", err);
        setError('Não foi possível carregar as dúvidas frequentes.')
      })
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <section className="mx-auto max-w-7xl px-4 pb-12 pt-10 animate-fade-in-up">
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
          Carregando dúvidas frequentes...
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
          <h1 className="text-3xl font-bold text-white md:text-4xl">Dúvidas Frequentes</h1>
          <p className="mt-3 max-w-4xl text-slate-300">
            Encontre respostas para as perguntas mais comuns sobre o Comitê de Ética em Pesquisa da UNIJUÍ.
          </p>
        </div>
      </div>

      <div className="mt-8 space-y-6">
        {faqs.map((faq) => (
          <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900" key={faq.id}>
            <header className="border-b border-slate-200 px-5 py-4 dark:border-slate-800">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">{faq.question}</h2>
            </header>

            <div className="space-y-4 px-5 py-4">
              <p className="text-sm text-slate-700 dark:text-slate-200">{faq.answer}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}