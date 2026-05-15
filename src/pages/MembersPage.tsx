type MemberRow = {
  category: 'Coordenadores' | 'Membros' | 'Representantes de Participante de Pesquisa' | 'Secretaria'
  role: string
  name: string
  education: string
  qualification: string
  notes?: string
}

const members: MemberRow[] = [
  {
    category: 'Coordenadores',
    role: 'Coordenador',
    name: 'Prof. Dr. Aldemir Berwig',
    education: 'Direito e Administração',
    qualification: 'Doutorado em Educação nas Ciências - UNIJUÍ',
  },
  {
    category: 'Coordenadores',
    role: 'Coordenador-Adjunto',
    name: 'Prof. Dr. Matias Nunes Frizzo',
    education: 'Farmácia',
    qualification: 'Doutorado em Biologia Celular e Molecular - PPGAIS/UNIJUÍ',
  },
  {
    category: 'Membros',
    role: 'Membro',
    name: 'Prof. Dr. Airton Adelar Mueller',
    education: 'História',
    qualification: 'Doutorado em Sociologia - PPGDR/UNIJUÍ',
  },
  {
    category: 'Membros',
    role: 'Membro',
    name: 'Profa. Dra. Christiane de Fátima Colet',
    education: 'Farmácia',
    qualification: 'Doutorado em Ciências Farmacêuticas - PPGAIS/UNIJUÍ',
  },
  {
    category: 'Membros',
    role: 'Membro',
    name: 'Prof. Dr. Daniel Claudy da Silveira',
    education: 'Economia',
    qualification: 'Doutorado em Desenvolvimento Regional - UNIJUÍ',
  },
  {
    category: 'Membros',
    role: 'Membro',
    name: 'Prof. Dr. Doglas Cesar Lucas',
    education: 'Direito',
    qualification: 'Pós-Doutorado em Direito - PPGD/UNIJUÍ',
  },
  {
    category: 'Membros',
    role: 'Membro',
    name: 'Profa. Dra. Eliane Roseli Winkelmann',
    education: 'Fisioterapia',
    qualification: 'Pós-Doutorado em Ciências da Saúde - PPGAIS/UNIJUÍ',
  },
  {
    category: 'Membros',
    role: 'Membro',
    name: 'Prof. Dr. José Antonio Gonzalez da Silva',
    education: 'Agronomia',
    qualification: 'Doutorado em Agronomia - PPGSAS/UNIJUÍ',
  },
  {
    category: 'Membros',
    role: 'Membro',
    name: 'Profa. Dr. José Pedro Boufleuer',
    education: 'Filosofia',
    qualification: 'Doutorado em Educação - PPGEC/UNIJUÍ',
  },
  {
    category: 'Membros',
    role: 'Membro',
    name: 'Profa. Dra. Luciana Moro de Souza',
    education: 'Ciências Contábeis',
    qualification: 'Doutorado em Desenvolvimento Regional - UNIJUÍ',
  },
  {
    category: 'Membros',
    role: 'Membro',
    name: 'Profa. Dra. Marcia Regina Conceição de Almeida',
    education: 'Comunicação Social',
    qualification: 'Doutorado em Comunicação - UNIJUÍ',
  },
  {
    category: 'Membros',
    role: 'Membro',
    name: 'Profa. Dra. Moane Marchesan Krug',
    education: 'Fisioterapia e Educação Física',
    qualification: 'Doutorado em Educação Física - UNIJUÍ',
  },
  {
    category: 'Membros',
    role: 'Membro',
    name: 'Profa. Dra. Taciana Enderle',
    education: 'Engenharia Elétrica',
    qualification: 'Doutorado em Modelagem Matemática - PPGSAS/UNIJUÍ',
  },
  {
    category: 'Membros',
    role: 'Membro',
    name: 'Prof. Dr. Vitor Antunes de Oliveira',
    education: 'Biomedicina',
    qualification: 'Doutorado em Ciências Biológicas - Bioquímica Toxicológica - UNIJUÍ',
  },
  {
    category: 'Membros',
    role: 'Membro',
    name: 'Profa. Dra. Leonir Terezinha Uhde',
    education: 'Agronomia',
    qualification: 'Doutorado em Ciência do solo - UNIJUÍ',
  },
  {
    category: 'Representantes de Participante de Pesquisa',
    role: 'Representante',
    name: 'Rosane Simon',
    education: 'Direito',
    qualification: 'Indicada pelo Conselho Municipal de Saúde de Ijuí',
  },
  {
    category: 'Representantes de Participante de Pesquisa',
    role: 'Representante',
    name: 'Marcia Andrea Ullmann',
    education: 'Nutrição',
    qualification: 'Indicada pelo Conselho Municipal de Saúde de Ijuí',
  },
  {
    category: 'Representantes de Participante de Pesquisa',
    role: 'Representante',
    name: 'Eliana Elisa Rehfeld Gheno',
    education: 'Enfermagem e Obstetrícia',
    qualification: 'Mestrado em Atenção Integral à Saúde',
    notes: 'Indicada pelo Conselho Municipal de Saúde de Ijuí',
  },
  {
    category: 'Secretaria',
    role: 'Secretária Responsável',
    name: 'Amália Iracema Pasche',
    education: '-',
    qualification: 'Telefone: (55) 3332-0301',
  },
]

const categoryStyles: Record<MemberRow['category'], string> = {
  Coordenadores: 'bg-primary/10 text-primary dark:bg-primary/20 dark:text-blue-300',
  Membros: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200',
  'Representantes de Participante de Pesquisa': 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
  Secretaria: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300',
}

export function MembersPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-12 pt-10">
      <div className="hero-gradient relative overflow-hidden rounded-3xl p-8 md:p-12">
        <div className="absolute right-0 top-0 h-52 w-52 rounded-full bg-primary/20 blur-3xl" />
        <div className="relative z-10">
          <h1 className="text-3xl font-bold text-white md:text-4xl">Membros do CEP UNIJUÍ</h1>
          <p className="mt-3 max-w-3xl text-slate-300">
            Composição atual dos coordenadores, membros, representantes de participante de pesquisa e secretaria responsável.
          </p>
        </div>
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead className="bg-slate-50 dark:bg-slate-900">
              <tr>
                <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Categoria</th>
                <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Função</th>
                <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Nome</th>
                <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Formação</th>
                <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Titulação / Observações</th>
              </tr>
            </thead>
            <tbody>
              {members.map((member) => (
                <tr className="border-t border-slate-200 align-top transition-colors hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/40" key={`${member.category}-${member.name}`}>
                  <td className="px-4 py-4">
                    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${categoryStyles[member.category]}`}>
                      {member.category}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm font-medium text-slate-700 dark:text-slate-200">{member.role}</td>
                  <td className="px-4 py-4 text-sm font-semibold text-slate-900 dark:text-white">{member.name}</td>
                  <td className="px-4 py-4 text-sm text-slate-600 dark:text-slate-300">{member.education}</td>
                  <td className="px-4 py-4 text-sm text-slate-600 dark:text-slate-300">
                    <p>{member.qualification}</p>
                    {member.notes ? <p className="mt-1 text-slate-500 dark:text-slate-400">{member.notes}</p> : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}