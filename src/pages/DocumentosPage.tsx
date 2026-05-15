type DocumentRow = {
  name: string
  description: string
  file: string
}

type DocumentSection = {
  title: string
  items: DocumentRow[]
}

const sections: DocumentSection[] = [
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
        description: 'Modelo para ser assinado pelo responsÃ¡vel legal de participantes sem autonomia',
        file: '#',
      },
      {
        name: 'TALE - Termo de Assentimento Livre e Esclarecido',
        description: 'Modelo para participantes menores de idade ou legalmente incapazes',
        file: '#',
      },
      {
        name: 'TALE LÃºdico',
        description: 'Modelo visual para crianÃ§as (7 a 12 anos)',
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
    title: 'AutorizaÃ§Ãµes e DeclaraÃ§Ãµes',
    items: [
      {
        name: 'DeclaraÃ§Ã£o de InstituiÃ§Ã£o e Infraestrutura',
        description: 'Documento para comprovaÃ§Ã£o de autorizaÃ§Ã£o da instituiÃ§Ã£o onde serÃ¡ realizada a pesquisa',
        file: '#',
      },
      {
        name: 'DeclaraÃ§Ã£o de Compromisso do Pesquisador',
        description: 'Compromisso com o cumprimento dos aspectos Ã©ticos e normativas aplicÃ¡veis',
        file: '#',
      },
      {
        name: 'AutorizaÃ§Ã£o para Uso de Banco de Dados',
        description: 'Documento para solicitaÃ§Ã£o de autorizaÃ§Ã£o para uso de dados institucionais',
        file: '#',
      },
      {
        name: 'Termo de Confidencialidade',
        description: 'Compromisso de sigilo e confidencialidade das informaÃ§Ãµes coletadas',
        file: '#',
      },
    ],
  },
  {
    title: 'OrientaÃ§Ãµes para submissÃ£o',
    items: [
      {
        name: 'Checklist para SubmissÃ£o',
        description: 'Lista de verificaÃ§Ã£o dos documentos necessÃ¡rios para submissÃ£o ao CEP',
        file: '#',
      },
      {
        name: 'Modelo de Projeto Detalhado',
        description: 'Estrutura sugerida para elaboraÃ§Ã£o do projeto detalhado',
        file: '#',
      },
      {
        name: 'Guia para ElaboraÃ§Ã£o do RelatÃ³rio Final',
        description: 'OrientaÃ§Ãµes para elaboraÃ§Ã£o do relatÃ³rio final da pesquisa',
        file: '#',
      },
      {
        name: 'Carta de Resposta a PendÃªncias',
        description: 'Modelo para responder Ã s pendÃªncias apontadas pelo CEP',
        file: '#',
      },
    ],
  },
]

export function DocumentosPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-12 pt-10 animate-fade-in-up">
      <div className="hero-gradient relative overflow-hidden rounded-3xl p-8 md:p-12">
        <div className="absolute right-0 top-0 h-52 w-52 rounded-full bg-primary/20 blur-3xl" />
        <div className="relative z-10">
          <h1 className="text-3xl font-bold text-white md:text-4xl">Modelos de Documentos</h1>
          <p className="mt-3 max-w-4xl text-slate-300">
            Esta pÃ¡gina disponibiliza modelos de documentos essenciais para a submissÃ£o de projetos de pesquisa ao CEP/UNIJUÃ. Estes modelos foram
            elaborados para auxiliar os pesquisadores na preparaÃ§Ã£o dos documentos necessÃ¡rios, em conformidade com as exigÃªncias Ã©ticas e normativas
            do Sistema CEP/CONEP.
          </p>
        </div>
      </div>

      <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-900 dark:border-amber-900/40 dark:bg-amber-900/20 dark:text-amber-200">
        <p>
          Importante: os modelos sÃ£o apenas sugestÃµes que podem ser adaptados conforme as especificidades de cada pesquisa, desde que mantenham os
          elementos essenciais exigidos pela legislaÃ§Ã£o e pelas normas Ã©ticas.
        </p>
      </div>

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
                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">DescriÃ§Ã£o</th>
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
                          className="inline-flex items-center gap-2 rounded-lg border border-primary/30 bg-primary/10 px-3 py-2 font-medium text-primary transition-colors hover:border-primary hover:bg-primary hover:text-white dark:border-primary/40 dark:bg-primary/20 dark:text-blue-300 dark:hover:text-white"
                          download
                          href={item.file}
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
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">DÃºvidas sobre os documentos?</h2>
        </header>

        <div className="space-y-4 px-5 py-4 text-sm text-slate-700 dark:text-slate-200">
          <p>
            Se vocÃª tiver dÃºvidas sobre como preencher ou adaptar algum dos modelos acima, entre em contato com o CEP/UNIJUÃ pelo telefone (55)
            3332-0301 ou pelo e-mail cep@unijui.edu.br.
          </p>
          <p>Recomendamos tambÃ©m consultar as Perguntas Frequentes e as Normativas aplicÃ¡veis Ã s pesquisas com seres humanos.</p>
        </div>
      </article>
    </section>
  )
}