import { Link } from 'react-router-dom'

type QuickAnswer = {
  icon: string
  title: string
  description: string
  href: string
}

const quickAnswers: QuickAnswer[] = [
  {
    icon: 'groups',
    title: 'Membros',
    description: 'Conheça a composição atual do Comitê de Ética em Pesquisa da UNIJUÍ.',
    href: '/membros',
  },
  {
    icon: 'gavel',
    title: 'Normativas',
    description: 'Acesse resoluções, circulares e orientações éticas vigentes.',
    href: '/normativas',
  },
  {
    icon: 'event',
    title: 'Reuniões',
    description: 'Consulte calendário, pautas e prazos das reuniões do CEP.',
    href: '/reunioes',
  },
  {
    icon: 'upload_file',
    title: 'Submissão de Projetos',
    description: 'Guia passo a passo para enviar sua pesquisa para avaliação ética.',
    href: '/submissao-projetos',
  },
  {
    icon: 'description',
    title: 'Documentos',
    description: 'Baixe modelos, formulários e documentos obrigatórios para submissão.',
    href: '/documentos',
  },
  {
    icon: 'school',
    title: 'Capacitações',
    description: 'Acompanhe cursos, materiais e ações formativas sobre ética em pesquisa.',
    href: '/capacitacoes',
  },
  {
    icon: 'help',
    title: 'Dúvidas',
    description: 'Encontre respostas para as perguntas mais frequentes dos pesquisadores.',
    href: '/duvidas',
  },
  {
    icon: 'contact_support',
    title: 'Contato',
    description: 'Telefones, e-mails e horários de atendimento da secretaria do CEP.',
    href: '/contato',
  },
]

function QuickAnswerCard({ icon, title, description, href }: QuickAnswer) {
  const isInternalLink = href.startsWith('/')

  if (isInternalLink) {
    return (
      <Link
        className="group block rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
        to={href}
      >
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-primary transition-transform group-hover:scale-110 dark:bg-blue-900/30 dark:text-blue-400">
          <span className="material-icons-outlined">{icon}</span>
        </div>
        <h3 className="mb-2 font-semibold text-slate-900 dark:text-white">{title}</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400">{description}</p>
      </Link>
    )
  }

  return (
    <a
      className="group block rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
      href={href}
    >
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-primary transition-transform group-hover:scale-110 dark:bg-blue-900/30 dark:text-blue-400">
        <span className="material-icons-outlined">{icon}</span>
      </div>
      <h3 className="mb-2 font-semibold text-slate-900 dark:text-white">{title}</h3>
      <p className="text-sm text-slate-500 dark:text-slate-400">{description}</p>
    </a>
  )
}

export function QuickAnswersSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12" id="quick-access">
      <h2 className="mb-8 text-2xl font-bold text-slate-900 dark:text-white">Respostas Rápidas</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {quickAnswers.map((item) => (
          <QuickAnswerCard key={item.title} {...item} />
        ))}
      </div>
    </section>
  )
}