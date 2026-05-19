import { useEffect, useState } from 'react'
import { getDocumentSections } from '../services/documentService'

type DocumentRow = {
  name: string
  description: string
  file?: string | null
}

type DocumentSection = {
  title: string
  items: DocumentRow[]
}

const defaultSections: DocumentSection[] = [
  {
    title: 'Termos de Consentimento e Assentimento',
    items: [
      {
        name: 'TCLE - Termo de Consentimento Livre e Esclarecido',
        description: 'Modelo para participantes adultos com autonomia plena',
        file: '#',
      },
      {
        name: 'TCLE - Representante Legal',
        description: 'Modelo para ser assinado pelo responsável legal de participantes sem autonomia',
        file: '#',
      },
      {
        name: 'TALE - Termo de Assentimento Livre e Esclarecido',
        description: 'Modelo para participantes menores de idade ou legalmente incapazes',
        file: '#',
      },
      {
        name: 'TALE Lúdico',
        description: 'Modelo visual para crianças (7 a 12 anos)',
        file: '#',
      },
      {
        name: 'TCLE - Pesquisa Online',
        description: 'Modelo adaptado para pesquisas realizadas em ambiente virtual',
        file: '#',
      },
    ],
  },
  {
    title: 'Autorizações e Declarações',
    items: [
      {
        name: 'Declaração de Instituição e Infraestrutura',
        description: 'Documento para comprovação de autorização da instituição onde será realizada a pesquisa',
        file: '#',
      },
      {
        name: 'Declaração de Compromisso do Pesquisador',
        description: 'Compromisso com o cumprimento dos aspectos éticos e normativas aplicáveis',
        file: '#',
      },
      {
        name: 'Autorização para Uso de Banco de Dados',
        description: 'Documento para solicitação de autorização para uso de dados institucionais',
        file: '#',
      },
      {
        name: 'Termo de Confidencialidade',
        description: 'Compromisso de sigilo e confidencialidade das informações coletadas',
        file: '#',
      },
    ],
  },
  {
    title: 'Orientações para submissão',
    items: [
      {
        name: 'Checklist para Submissão',
        description: 'Lista de verificação dos documentos necessários para submissão ao CEP',
        file: '#',
      },
      {
        name: 'Modelo de Projeto Detalhado',
        description: 'Estrutura sugerida para elaboração do projeto detalhado',
        file: '#',
      },
      {
        name: 'Guia para Elaboração do Relatório Final',
        description: 'Orientações para elaboração do relatório final da pesquisa',
        file: '#',
      },
      {
        name: 'Carta de Resposta a Pendências',
        description: 'Modelo para responder às pendências apontadas pelo CEP',
        file: '#',
      },
    ],
  },
]

export function DocumentosPage() {
  const [sections, setSections] = useState<DocumentSection[]>(defaultSections)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getDocumentSections()
      .then((results) => {
        setSections(
          results.map((result) => ({
            title: result.title,
            items: result.items.map((item) => ({
              name: item.name,
              description: item.description,
              file: item.file_url,
            })),
          })),
        )
      })
      .catch(() => setError('Não foi possível carregar os modelos de documentos.'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <section className="mx-auto max-w-7xl px-4 pb-12 pt-10 animate-fade-in-up">
      <div className="hero-gradient relative overflow-hidden rounded-3xl p-8 md:p-12">
        <div className="absolute right-0 top-0 h-52 w-52 rounded-full bg-primary/20 blur-3xl" />
        <div className="relative z-10">
          <h1 className="text-3xl font-bold text-white md:text-4xl">Modelos de Documentos</h1>
          <p className="mt-3 max-w-4xl text-slate-300">
            Esta página disponibiliza modelos de documentos essenciais para a submissão de projetos de pesquisa ao CEP/UNIJUÍ. Estes modelos foram
            elaborados para auxiliar os pesquisadores na preparação dos documentos necessários, em conformidade com as exigências éticas e normativas
            do Sistema CEP/CONEP.
          </p>
        </div>
      </div>

      <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-900 dark:border-amber-900/40 dark:bg-amber-900/20 dark:text-amber-200">
        <p>
          Importante: os modelos serão apenas sugestões que podem ser adaptados conforme as especificidades de cada pesquisa, desde que mantenham os
          elementos essenciais exigidos pela legislação e pelas normas éticas.
        </p>
      </div>

      {loading ? (
        <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
          Carregando documentos...
        </div>
      ) : null}

      {error ? (
        <div className="mt-8 rounded-2xl border border-rose-200 bg-rose-50 px-5 py-4 text-sm text-rose-900 dark:border-rose-900/40 dark:bg-rose-900/20 dark:text-rose-200">
          {error}
        </div>
      ) : null}

      <div className="mt-8 space-y-8">
        {sections.map((section) => (
          <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900" key={section.title}>
            <header className="border-b border-slate-200 px-5 py-4 dark:border-slate-800">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">{section.title}</h2>
            </header>

            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse">
                <thead className="bg-slate-50 dark:bg-slate-900">
                  <tr>
                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Documento</th>
                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Descrição</th>
                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Download</th>
                  </tr>
                </thead>
                <tbody>
                  {section.items.map((item) => (
                    <tr className="border-t border-slate-200 align-top transition-colors hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/40" key={item.name}>
                      <td className="px-5 py-4 text-sm font-medium text-slate-800 dark:text-slate-100">{item.name}</td>
                      <td className="px-5 py-4 text-sm text-slate-600 dark:text-slate-300">{item.description}</td>
                      <td className="px-5 py-4 text-sm">
                        <a
                          className={`inline-flex items-center gap-2 rounded-lg border border-primary/30 bg-primary/10 px-3 py-2 font-medium text-primary transition-colors hover:border-primary hover:bg-primary hover:text-white dark:border-primary/40 dark:bg-primary/20 dark:text-blue-300 dark:hover:text-white ${!item.file ? 'cursor-not-allowed opacity-50' : ''}`}
                          download={Boolean(item.file)}
                          href={item.file ?? '#'}
                          aria-disabled={!item.file}
                        >
                          <span className="material-icons-outlined text-base">download</span>
                          Download
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>
        ))}
      </div>

      <article className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <header className="border-b border-slate-200 px-5 py-4 dark:border-slate-800">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Dúvidas sobre os documentos?</h2>
        </header>

        <div className="space-y-4 px-5 py-4 text-sm text-slate-700 dark:text-slate-200">
          <p>
            Se você tiver dúvidas sobre como preencher ou adaptar algum dos modelos acima, entre em contato com o CEP/UNIJUÍ pelo telefone (55)
            3332-0301 ou pelo e-mail cep@unijui.edu.br.
          </p>
          <p>Recomendamos também consultar as Perguntas Frequentes e as Normativas aplicáveis às pesquisas com seres humanos.</p>
        </div>
      </article>
    </section>
  )
}