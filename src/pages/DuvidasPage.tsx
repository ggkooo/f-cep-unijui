type GuidanceSection = {
  title: string
  points: string[]
  warning?: string
  important?: string
  observation?: string
  examples?: string[]
}

const sections: GuidanceSection[] = [
  {
    title: 'Uniformizar as informações',
    points: [
      'É importante padronizar as informações em todos os documentos do protocolo de pesquisa.',
      'Descreva benefícios, riscos e formas de minimização de riscos de maneira idêntica ou semelhante em todos os documentos em que esses itens aparecem.',
    ],
  },
  {
    title: 'Pesquisas em ambientes virtuais',
    points: [
      'Para estas pesquisas, é importante ler as duas orientações da Conep: Carta Circular nº 01/2021 e Ofício Circular nº 23/2022.',
      'Incluir o link de acesso ao questionário (Google Forms, por exemplo) no documento “projeto detalhado” e também nas “informações básicas do projeto” na Plataforma Brasil.',
      'Inserir a versão impressa da ferramenta de pesquisa no anexo do “projeto detalhado” (acessar o formulário e salvar em PDF).',
      'Na abertura do questionário, incluir o TCLE (versão para ambiente virtual) ou o link para o participante acessar, salvar ou imprimir o documento.',
    ],
  },
  {
    title: 'Equipe de pesquisa',
    points: ['Citar, nos documentos, todos os pesquisadores envolvidos.'],
  },
  {
    title: 'Orçamento',
    points: ['Informar e descrever o orçamento, mesmo que com valores aproximados.'],
    warning:
      'Não existe pesquisa com custo “zero”, pois mesmo pesquisas em ambiente virtual apresentam custos, como acesso à internet.',
  },
  {
    title: 'Instituição proponente e coparticipante',
    points: [
      'Evitar erro na identificação da instituição proponente (de onde parte a pesquisa) e coparticipante (onde será realizada parte ou toda a pesquisa).',
      'Se a pesquisa parte de um campus da UNIJUÍ e ocorre em outro campus da UNIJUÍ, não é coparticipante, pois integra a mesma instituição.',
      'Se a pesquisa parte de um campus da UNIJUÍ e ocorre na FUMSSAR, por exemplo, trata-se de outra instituição e, portanto, coparticipante.',
    ],
    warning: 'Revise sempre os campos institucionais antes da submissão final na Plataforma Brasil.',
  },
  {
    title: 'Infraestrutura adequada',
    points: [
      'Informar e descrever se o local da pesquisa possui infraestrutura adequada para sua realização.',
      'Quando o tema exigir maior confidencialidade, descrever a existência de sala reservada e indicar que a coleta ocorrerá nesse espaço.',
    ],
  },
  {
    title: 'Abordagem e obtenção do consentimento',
    points: [
      'Descrever a forma de abordagem e convite aos participantes da pesquisa.',
      'Detalhar como será o processo de obtenção do consentimento ou assentimento, especialmente no documento “projeto detalhado”.',
    ],
  },
  {
    title: 'Situação de vulnerabilidade',
    points: [
      'Quando for o caso, indicar se os participantes se encontram em situação de vulnerabilidade.',
      'Nessas situações, descrever formas adequadas de abordagem e obtenção do consentimento ou assentimento.',
      'Exemplos: relação professor-aluno, mulheres vítimas de violência, populações indígenas, pessoas com autonomia reduzida, entre outros.',
    ],
  },
  {
    title: 'Critérios de exclusão',
    points: [
      'Não descrever critérios de exclusão apenas como o inverso dos critérios de inclusão.',
      'Critérios de exclusão devem indicar condições que podem retirar da pesquisa participantes que, inicialmente, estavam incluídos na população de estudo.',
      'Não assinar o TCLE não é critério de exclusão, pois sem consentimento o participante nem chega a ser incluído no estudo.',
    ],
    important:
      'A depender da metodologia, pesquisas de Ciências Humanas e Sociais podem não prever critérios de exclusão. Nesses casos, pode-se indicar “Não se aplica”.',
    examples: [
      'Exemplo 1: em estudo com homens de 50 a 70 anos, “mulher” não é exclusão (já não atende inclusão). Já histórico de cirurgia de retirada de tumor na próstata pode ser critério de exclusão, pois recai sobre a população elegível.',
      'Exemplo 2: para ser excluído, o participante já precisa ter sido incluído no estudo.',
    ],
  },
  {
    title: 'Questionário ou roteiro de entrevistas',
    points: [
      'A análise ética também considera questionários e roteiros de entrevista, que devem ser postados como arquivos separados na Plataforma Brasil.',
      'Justificar situações em que haja coleta de dados identificáveis (nome, série, curso etc.).',
      'Verificar se existem perguntas que possam causar constrangimento e avaliar supressão ou substituição.',
    ],
  },
  {
    title: 'Pesquisas com grupos controle',
    points: [
      'Explicitar e garantir que participantes do grupo controle receberão a mesma intervenção/metodologia aplicada ao grupo experimental, caso haja resultados favoráveis.',
    ],
  },
  {
    title: 'Pesquisas realizadas nas escolas e nos campi da UNIJUÍ',
    points: [
      'Priorizar horários de contraturno para que os participantes não sejam privados das aulas e demais atividades de ensino.',
      'Se a pesquisa ocorrer em horário de aula, informar como será o atendimento dos estudantes que não desejarem participar.',
      'Se a pesquisa ocorrer no contraturno, observar o ressarcimento de possíveis despesas dos participantes.',
    ],
    important:
      'O participante não pode ter gastos com a pesquisa; as despesas decorrentes da participação são responsabilidade do pesquisador e/ou patrocinador.',
  },
  {
    title: 'TCLE, TALE, RCLE e RALE',
    points: [
      'Sugere-se consultar os modelos disponibilizados no roteiro de documentos e adaptá-los conforme a necessidade do pesquisador.',
      'Redigir em linguagem acessível, evitando termos técnicos; quando inevitáveis, explicar claramente os termos utilizados.',
      'Descrever o que o participante fará caso aceite participar e indicar a duração prevista de cada etapa.',
      'TCLE e RCLE dirigidos a responsáveis devem usar linguagem adaptada ao responsável, e não ao participante.',
      'Em pesquisas virtuais, TCLE/TALE/RCLE/RALE devem estar adaptados para a coleta de assinatura ou aceite eletrônico.',
    ],
    observation:
      'Conforme a faixa etária, pode-se utilizar o TALE lúdico, com imagens para favorecer a compreensão. O CEP/UNIJUÍ sugere modelo no roteiro de documentos.',
  },
  {
    title: 'Formas de divulgação dos resultados da pesquisa',
    points: [
      'Indicar como os resultados serão devolvidos aos participantes, em linguagem acessível, caso desejem receber.',
      'Informar também as formas de publicização dos resultados.',
    ],
    observation:
      'Nem sempre o participante terá acesso efetivo a artigo, TCC ou defesa, e mesmo quando houver acesso, a linguagem pode ser técnica. Por isso, descreva no projeto como será feita a devolutiva aos interessados.',
  },
]

export function DuvidasPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-12 pt-10 animate-fade-in-up">
      <div className="hero-gradient relative overflow-hidden rounded-3xl p-8 md:p-12">
        <div className="absolute right-0 top-0 h-52 w-52 rounded-full bg-primary/20 blur-3xl" />
        <div className="relative z-10">
          <h1 className="text-3xl font-bold text-white md:text-4xl">Como evitar as principais pendências nos protocolos de pesquisa?</h1>
          <p className="mt-3 max-w-4xl text-slate-300">
            Guia prático com orientações para melhorar a qualidade dos protocolos submetidos ao CEP/UNIJUÍ e evitar pendências recorrentes na análise
            ética.
          </p>
        </div>
      </div>

      <div className="mt-8 space-y-6">
        {sections.map((section) => (
          <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900" key={section.title}>
            <header className="border-b border-slate-200 px-5 py-4 dark:border-slate-800">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">{section.title}</h2>
            </header>

            <div className="space-y-4 px-5 py-4">
              <ul className="space-y-3">
                {section.points.map((point) => (
                  <li className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-200" key={point}>
                    <span className="material-icons-outlined mt-0.5 text-base text-primary">check_circle</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              {section.warning ? (
                <p className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900 dark:border-amber-900/40 dark:bg-amber-900/20 dark:text-amber-200">
                  <strong>Atenção:</strong> {section.warning}
                </p>
              ) : null}

              {section.important ? (
                <p className="rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-900 dark:border-blue-900/40 dark:bg-blue-900/20 dark:text-blue-200">
                  <strong>Importante:</strong> {section.important}
                </p>
              ) : null}

              {section.observation ? (
                <p className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900 dark:border-emerald-900/40 dark:bg-emerald-900/20 dark:text-emerald-200">
                  <strong>Observação:</strong> {section.observation}
                </p>
              ) : null}

              {section.examples ? (
                <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-800 dark:bg-slate-800/50">
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">Exemplos</p>
                  <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-slate-700 dark:text-slate-200">
                    {section.examples.map((example) => (
                      <li key={example}>{example}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}