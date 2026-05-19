import { useEffect, useState } from 'react'
import { getTrainingTopics, getTrainingMaterials } from '../services/trainingService'

type TopicItem = {
  text: string
}

type MaterialItem = {
  title: string
  description: string
}

const defaultTopics: TopicItem[] = [
  { text: 'Diretrizes éticas nacionais e internacionais' },
  { text: 'Procedimentos operacionais do Sistema CEP/CONEP' },
  { text: 'Avaliação de protocolos de pesquisa' },
  { text: 'Análise de riscos e benefícios' },
  { text: 'Elaboração de pareceres consubstanciados' },
  { text: 'Proteção dos participantes de pesquisa' },
]

const defaultMaterials: MaterialItem[] = [
  {
    title: 'Plano de Capacitação CEP/UNIJUÍ',
    description: 'Conheça o plano de capacitação do CEP/UNIJUÍ para membros e pesquisadores.',
  },
  {
    title: 'Documentos e Manuais',
    description: 'Guias, manuais e documentos orientadores para a análise ética de protocolos de pesquisa.',
  },
]

export function CapacitacoesPage() {
  const [topics, setTopics] = useState<TopicItem[]>(defaultTopics)
  const [materials, setMaterials] = useState<MaterialItem[]>(defaultMaterials)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    Promise.all([getTrainingTopics(), getTrainingMaterials()])
      .then(([topicItems, materialItems]) => {
        setTopics(topicItems.map((item) => ({ text: item.title ?? '' })))
        setMaterials(
          materialItems.map((item) => ({
            title: item.title ?? '',
            description: item.description ?? '',
          })),
        )
      })
      .catch(() => setError('Não foi possível carregar os materiais de capacitação.'))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <section className="mx-auto max-w-7xl px-4 pb-12 pt-10 animate-fade-in-up">
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
          Carregando materiais de capacitação...
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
          <h1 className="text-3xl font-bold text-white md:text-4xl">Educa CEPs</h1>
          <p className="mt-3 max-w-4xl text-slate-300">
            O Programa Educa CEPs, desenvolvido pela CONEP, é uma iniciativa educativa que visa capacitar e orientar os membros dos Comitês de Ética
            em Pesquisa (CEPs) sobre as normas e procedimentos relacionados à análise ética de projetos de pesquisa envolvendo seres humanos.
          </p>
          <p className="mt-3 max-w-4xl text-slate-300">
            Através de vídeos, documentos e materiais educativos, o programa aborda temas fundamentais para a atuação dos CEPs.
          </p>
        </div>
      </div>

      <article className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <header className="border-b border-slate-200 px-5 py-4 dark:border-slate-800">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Temas abordados</h2>
        </header>

        <ul className="divide-y divide-slate-200 dark:divide-slate-800">
          {topics.map((item) => (
            <li className="flex items-start gap-3 px-5 py-4 text-sm text-slate-700 dark:text-slate-200" key={item.text}>
              <span className="material-icons-outlined mt-0.5 text-base text-primary">check_circle</span>
              <span>{item.text}</span>
            </li>
          ))}
        </ul>
      </article>

      <article className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <header className="border-b border-slate-200 px-5 py-4 dark:border-slate-800">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Materiais disponíveis</h2>
        </header>

        <div className="grid grid-cols-1 gap-4 p-5 md:grid-cols-2">
          {materials.map((item) => (
            <div className="rounded-xl border border-slate-200 p-4 dark:border-slate-800" key={item.title}>
              <h3 className="text-base font-semibold text-slate-900 dark:text-white">{item.title}</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{item.description}</p>
            </div>
          ))}
        </div>
      </article>

      <article className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="px-5 py-4 text-sm text-slate-700 dark:text-slate-200">
          O CEP/UNIJUÍ disponibiliza aqui materiais educativos e orientações para pesquisadores e membros do Comitê, contribuindo para o
          aprimoramento da análise ética das pesquisas e para a proteção dos direitos e do bem-estar dos participantes.
        </div>
      </article>
    </section>
  )
}