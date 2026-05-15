import { Link } from 'react-router-dom'

type TutorialItem = {
  title: string
  description: string
}

type VideoItem = {
  title: string
}

type FaqItem = {
  question: string
}

const tutorials: TutorialItem[] = [
  {
    title: 'Como se cadastrar na Plataforma Brasil',
    description:
      'Tutorial passo a passo para realizar o cadastro inicial na Plataforma Brasil, incluindo a criação de conta e validação de dados.',
  },
  {
    title: 'Manual do Pesquisador',
    description: 'Guia completo desenvolvido pela CONEP para orientar os pesquisadores na utilização da Plataforma Brasil.',
  },
]

const videos: VideoItem[] = [
  { title: 'Plataforma Brasil | Apresentação' },
  { title: 'Plataforma Brasil | Cadastro de Usuário' },
  { title: 'Plataforma Brasil | Cadastro Instituição' },
  { title: 'Plataforma Brasil | Pesquisadores Assistentes' },
  { title: 'Plataforma Brasil | Como Submeter um Projeto I' },
  { title: 'Plataforma Brasil | Como Submeter um Projeto II' },
  { title: 'Plataforma Brasil | Solicitação de alteração de Pesquisador Responsável' },
  { title: 'Plataforma Brasil | Resposta de Pendência' },
  { title: 'Plataforma Brasil | Submissão da Emenda I' },
  { title: 'Plataforma Brasil | Solicitação de retirada de Projetos de Pesquisa' },
  { title: 'Plataforma Brasil | Envio de Notificação' },
  { title: 'Plataforma Brasil | Submissão de Projeto III' },
  { title: 'Plataforma Brasil | Submissão de Recursos em projetos' },
  { title: 'Plataforma Brasil | Alerta sobre dados divergentes' },
  { title: 'Plataforma Brasil | Prasos de Tramitação' },
  { title: 'Plataforma Brasil | Tutorial de Submissão de Projetos de pesquisa' },
]

const faqs: FaqItem[] = [
  { question: 'Como recuperar minha senha da Plataforma Brasil?' },
  { question: 'Quais documentos são obrigatórios para a submissão de um projeto?' },
  { question: 'Quanto tempo leva para receber o parecer do CEP?' },
  { question: 'Posso iniciar minha pesquisa enquanto aguardo o parecer do CEP?' },
]

export function SubmissaoProjetosPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-12 pt-10 animate-fade-in-up">
      <div className="hero-gradient relative overflow-hidden rounded-3xl p-8 md:p-12">
        <div className="absolute right-0 top-0 h-52 w-52 rounded-full bg-primary/20 blur-3xl" />
        <div className="relative z-10">
          <h1 className="text-3xl font-bold text-white md:text-4xl">Tutoriais e Orientações</h1>
          <p className="mt-3 max-w-4xl text-slate-300">
            Nesta página, você encontrará tutoriais e orientações para auxiliar na submissão de projetos de pesquisa ao CEP/UNIJUÍ através da
            Plataforma Brasil. Os materiais disponibilizados visam facilitar o processo de cadastro e submissão, além de esclarecer dúvidas comuns
            enfrentadas pelos pesquisadores.
          </p>
        </div>
      </div>

      <article className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <header className="border-b border-slate-200 px-5 py-4 dark:border-slate-800">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Cadastro na Plataforma Brasil</h2>
        </header>

        <div className="grid grid-cols-1 gap-4 p-5 md:grid-cols-2">
          {tutorials.map((item) => (
            <div className="rounded-xl border border-slate-200 p-4 dark:border-slate-800" key={item.title}>
              <h3 className="text-base font-semibold text-slate-900 dark:text-white">{item.title}</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{item.description}</p>
            </div>
          ))}
        </div>
      </article>

      <article className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <header className="border-b border-slate-200 px-5 py-4 dark:border-slate-800">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Vídeos Tutoriais</h2>
        </header>

        <div className="grid grid-cols-1 gap-4 p-5 md:grid-cols-2 xl:grid-cols-3">
          {videos.map((video) => (
            <div className="rounded-xl border border-slate-200 p-4 dark:border-slate-800" key={video.title}>
              <div className="flex h-36 items-center justify-center rounded-lg bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                <span className="material-icons-outlined mr-2">play_circle</span>
                Thumbnail do vídeo
              </div>
              <p className="mt-3 text-sm font-medium text-slate-700 dark:text-slate-200">{video.title}</p>
            </div>
          ))}
        </div>
      </article>

      <article className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <header className="border-b border-slate-200 px-5 py-4 dark:border-slate-800">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Perguntas Frequentes sobre a Plataforma Brasil</h2>
        </header>

        <ul className="divide-y divide-slate-200 dark:divide-slate-800">
          {faqs.map((item) => (
            <li className="px-5 py-4 text-sm text-slate-700 dark:text-slate-200" key={item.question}>
              {item.question}
            </li>
          ))}
        </ul>
      </article>

      <article className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <header className="border-b border-slate-200 px-5 py-4 dark:border-slate-800">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Precisa de ajuda adicional?</h2>
        </header>

        <div className="space-y-4 px-5 py-4 text-sm text-slate-700 dark:text-slate-200">
          <p>
            Se você tiver dúvidas que não foram respondidas pelos tutoriais e materiais disponíveis, entre em contato com o CEP/UNIJUÍ pelo telefone
            (55) 3332-0301 ou pelo e-mail cep@unijui.edu.br.
          </p>
          <p>
            Consulte também nossas páginas de <Link className="font-medium text-primary hover:underline" to="/documentos">Modelos de Documentos</Link>{' '}
            e <Link className="font-medium text-primary hover:underline" to="/#faq">Perguntas Frequentes</Link>.
          </p>
        </div>
      </article>
    </section>
  )
}