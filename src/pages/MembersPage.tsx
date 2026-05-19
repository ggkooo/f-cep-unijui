import { useEffect, useState } from 'react'
import { getMembers, type MemberResource } from '../services/membersService'

type MemberRow = Omit<MemberResource, 'id' | 'notes' | 'sort_order'> & {
  id?: number
  notes?: string | null
  sort_order?: number
}

// 1. Definimos a ordem de prioridade das categorias
const categoryPriority: Record<string, number> = {
  'Coordenadores': 1,
  'Representantes de Participante de Pesquisa': 2,
  'Membros': 3,
  'Secretaria': 4,
}

// Função auxiliar para ordenar os membros
const sortMembers = (data: MemberRow[]) => {
  return [...data].sort((a, b) => {
    // Primeiro ordena pela prioridade da categoria
    const priorityA = categoryPriority[a.category] || 99
    const priorityB = categoryPriority[b.category] || 99

    if (priorityA !== priorityB) {
      return priorityA - priorityB
    }

    // Se forem da mesma categoria, ordena por nome (alfabética)
    return a.name.localeCompare(b.name)
  })
}

const defaultMembers: MemberRow[] = [
  // ... seus membros aqui ...
]

const categoryStyles: Record<MemberRow['category'], string> = {
  Coordenadores: 'bg-primary/10 text-primary dark:bg-primary/20 dark:text-blue-300',
  Membros: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200',
  'Representantes de Participante de Pesquisa': 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
  Secretaria: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300',
}

export function MembersPage() {
  // Inicializamos já ordenando os dados padrão
  const [members, setMembers] = useState<MemberRow[]>(sortMembers(defaultMembers))
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getMembers()
      .then((data) => {
        // Ordenamos os dados que vem da API antes de salvar no estado
        const sorted = sortMembers(data)
        setMembers(sorted)
      })
      .catch(() => setError('Não foi possível carregar os membros do servidor.'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <section className="mx-auto max-w-7xl px-4 pb-12 pt-10 animate-fade-in-up">
      {/* ... Restante do seu código JSX permanece o mesmo ... */}
      <div className="hero-gradient relative overflow-hidden rounded-3xl p-8 md:p-12">
        <div className="absolute right-0 top-0 h-52 w-52 rounded-full bg-primary/20 blur-3xl" />
        <div className="relative z-10">
          <h1 className="text-3xl font-bold text-white md:text-4xl">Membros do CEP UNIJUÍ</h1>
          <p className="mt-3 max-w-3xl text-slate-300">
            Composição atual dos coordenadores, membros, representantes de participante de pesquisa e secretaria responsável.
          </p>
        </div>
      </div>

      {loading ? (
        <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
          Carregando membros...
        </div>
      ) : null}

      {error ? (
        <div className="mt-8 rounded-2xl border border-rose-200 bg-rose-50 px-5 py-4 text-sm text-rose-900 dark:border-rose-900/40 dark:bg-rose-900/20 dark:text-rose-200">
          {error}
        </div>
      ) : null}

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