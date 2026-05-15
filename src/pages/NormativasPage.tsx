type NormativeItem = {
  title: string
  file: string
}

type NormativeSection = {
  title: string
  items: NormativeItem[]
}

const sections: NormativeSection[] = [
  {
    title: 'Normativas',
    items: [
      { title: 'Regimento do CEP UNIJUÍ', file: '/normativas/item-001.txt' },
      {
        title:
          'Lei nº 14.874, de 28 de maio de 2024. Dispõe sobre a pesquisa com seres humanos e institui o Sistema Nacional de Ética em Pesquisa com Seres Humanos.',
        file: '/normativas/item-002.txt',
      },
      {
        title:
          'Portaria MS nº 2.201, de 14 de setembro de 2011. Estabelece as Diretrizes Nacionais para Biorrepositório e Biobanco de Material Biológico Humano com Finalidade de Pesquisa.',
        file: '/normativas/item-003.txt',
      },
    ],
  },
  {
    title: 'Resoluções',
    items: [
      {
        title:
          'Resolução nº 251, de 07 de agosto de 1997. Aprova normas de pesquisa envolvendo seres humanos para a área temática de pesquisa com novos fármacos, medicamentos, vacinas e testes diagnósticos.',
        file: '/normativas/item-004.txt',
      },
      {
        title:
          'Resolução nº 292, de 08 de julho de 1999. Pesquisas coordenadas do exterior ou com participação estrangeira e pesquisas que envolvam remessa de material biológico para o exterior.',
        file: '/normativas/item-005.txt',
      },
      {
        title: 'Resolução nº 304, de 09 de agosto de 2000. Normas para pesquisas envolvendo seres humanos área de povos indígenas.',
        file: '/normativas/item-006.txt',
      },
      {
        title:
          'Resolução nº 340, de 8 de julho de 2004. Diretrizes para Análise Ética e Tramitação dos Projetos de Pesquisa da Área Temática Especial de Genética Humana.',
        file: '/normativas/item-007.txt',
      },
      {
        title: 'Resolução nº 346, de 13 de janeiro de 2005. Tramitação de projetos de pesquisa multicêntricos.',
        file: '/normativas/item-008.txt',
      },
      {
        title:
          'Resolução CNS nº 441, de 12 de maio de 2011. Armazenamento de material biológico humano ou uso de material armazenado em pesquisas anteriores.',
        file: '/normativas/item-009.txt',
      },
      {
        title: 'Resolução nº 466, de 12 de dezembro de 2012. Diretrizes e normas regulamentadoras de pesquisas envolvendo seres humanos.',
        file: '/normativas/item-010.txt',
      },
      {
        title: 'Resolução nº 506, de 03 de fevereiro de 2016. Acreditação dos Comitês de Ética em Pesquisa.',
        file: '/normativas/item-011.txt',
      },
      {
        title: 'Resolução nº 510, de 07 de abril de 2016. Normas aplicáveis a pesquisas em Ciências Humanas e Sociais.',
        file: '/normativas/item-012.txt',
      },
      {
        title: 'Resolução nº 563, de 10 de novembro de 2017. Direito do participante de pesquisa com doenças ultrarraras.',
        file: '/normativas/item-013.txt',
      },
      {
        title: 'Resolução nº 580, de 22 de março de 2018. Pesquisas Estratégicas para SUS.',
        file: '/normativas/item-014.txt',
      },
      {
        title:
          'Resolução nº 647, de 12 de outubro de 2020. Dispõe sobre as regras referentes à regulamentação do processo de designação e atuação dos membros de CEP indicados por entidades do controle social.',
        file: '/normativas/item-015.txt',
      },
      {
        title: 'Resolução nº 674, de 6 de maio de 2022. Dispõe sobre a tipificação da pesquisa e a tramitação dos protocolos de pesquisa no Sistema CEP/Conep.',
        file: '/normativas/item-016.txt',
      },
      {
        title:
          'Resolução nº 706, de 16 de fevereiro de 2023. Dispõe sobre registro, credenciamento, renovação, alteração, suspensão e cancelamento do registro de Comitês de Ética em Pesquisa (CEPs) junto ao Sistema CEP/Conep, entre outras disposições.',
        file: '/normativas/item-017.txt',
      },
      {
        title:
          'Resolução nº 738, de 01 de fevereiro de 2024. Dispõe sobre uso de bancos de dados com finalidade de pesquisa científica envolvendo seres humanos.',
        file: '/normativas/item-018.txt',
      },
      {
        title:
          'Norma Operacional CNS nº 001/2013. Organização e funcionamento do Sistema CEP/CONEP, e sobre os procedimentos para submissão, avaliação e acompanhamento da pesquisa e de desenvolvimento envolvendo seres humanos no Brasil.',
        file: '/normativas/item-019.txt',
      },
      {
        title:
          'Ofício Circular Conep nº 11, de 26 de julho de 2023. Orientações relacionadas ao processo de obtenção do assentimento de participantes de pesquisa menores de 18 anos e de pessoas com "ausência de autonomia", permanente ou temporária, para consentir.',
        file: '/normativas/item-020.txt',
      },
      {
        title: 'Ofício Circular Conep nº 16, de 4 de julho de 2022. Tramitação de Protocolos de Pesquisa relativos ao SARS-CoV-2 (Covid-19).',
        file: '/normativas/item-021.txt',
      },
      {
        title: 'Ofício Circular Conep nº 17, de 5 de julho de 2022. Orientações acerca do artigo 1º da Resolução CNS n.º 510, de 7 de abril de 2016.',
        file: '/normativas/item-022.txt',
      },
      {
        title:
          'Ofício Circular Conepnº 23, de 17 de outubro de 2022. Normatização do uso de consentimento e assentimento eletrônico para participantes de pesquisa e de Biobancos.',
        file: '/normativas/item-023.txt',
      },
      {
        title: 'Ofício Circular Conep nº 24, de 17 de outubro de 2022. Orientações gerais para a condução de ensaios clínicos.',
        file: '/normativas/item-024.txt',
      },
      {
        title: 'Ofício Circular Conep nº 25, de 17 de outubro de 2022. Realização de reuniões do Sistema CEP/Conep em ambiente virtual.',
        file: '/normativas/item-025.txt',
      },
      {
        title: 'Ofício Circular Conep nº 26, de 01 de dezembro de 2022. Orientações para estudos com corpos ou peças anatômicas humanas.',
        file: '/normativas/item-026.txt',
      },
      {
        title:
          'Ofício Circular Conep nº 34/2021. Orientações para nova tramitação dos protocolos de desenvolvimento de biobancos para fins de pesquisa através da versão atual da Plataforma Brasil.',
        file: '/normativas/item-027.txt',
      },
      {
        title: 'Ofício Circular Conep nº 16, de 4 de julho de 2022. Tramitação de Protocolos de Pesquisa relativos ao SARS-CoV-2 (Covid-19).',
        file: '/normativas/item-028.txt',
      },
      {
        title:
          'Ofício Circular Conep nº 51, de 26 de novembro de 2024. Orientações sobre aspectos relacionados à aplicação da Lei nº 14.874, de 28 de maio de 2024.',
        file: '/normativas/item-029.txt',
      },
      {
        title: 'Ofício Circular Conep nº 60, de 5 de maio de 2012. Citação de bases de registro de ensaios clínicos em protocolos de pesquisa.',
        file: '/normativas/item-030.txt',
      },
      { title: 'Outras resoluções Conep', file: '/normativas/item-031.txt' },
      { title: 'Normas Operacionais Conep', file: '/normativas/item-032.txt' },
      { title: 'Cartas circulares Conep', file: '/normativas/item-033.txt' },
      { title: 'Ofícios circulares Conep', file: '/normativas/item-034.txt' },
    ],
  },
]

export function NormativasPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-12 pt-10 animate-fade-in-up">
      <div className="hero-gradient relative overflow-hidden rounded-3xl p-8 md:p-12">
        <div className="absolute right-0 top-0 h-52 w-52 rounded-full bg-primary/20 blur-3xl" />
        <div className="relative z-10">
          <h1 className="text-3xl font-bold text-white md:text-4xl">Normativas do CEP UNIJUÍ</h1>
          <p className="mt-3 max-w-3xl text-slate-300">
            Consulte as normas, resoluções e ofícios do Sistema CEP/Conep. Cada item está disponível para download.
          </p>
        </div>
      </div>

      <div className="mt-8 space-y-8">
        {sections.map((section) => (
          <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900" key={section.title}>
            <header className="border-b border-slate-200 px-5 py-4 dark:border-slate-800">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">{section.title}</h2>
            </header>

            <ul className="divide-y divide-slate-200 dark:divide-slate-800">
              {section.items.map((item) => (
                <li className="flex flex-col gap-4 px-5 py-4 md:flex-row md:items-start md:justify-between" key={`${section.title}-${item.title}`}>
                  <p className="max-w-5xl text-sm leading-relaxed text-slate-700 dark:text-slate-200">{item.title}</p>

                  <a
                    className="inline-flex shrink-0 items-center gap-2 self-start rounded-lg border border-primary/30 bg-primary/10 px-3 py-2 text-sm font-medium text-primary transition-colors hover:border-primary hover:bg-primary hover:text-white dark:border-primary/40 dark:bg-primary/20 dark:text-blue-300 dark:hover:text-white"
                    download
                    href={item.file}
                  >
                    <span className="material-icons-outlined text-base">download</span>
                    Download
                  </a>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  )
}