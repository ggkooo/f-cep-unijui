import { NavLink } from 'react-router-dom'

const adminLinks = [
  { label: 'Contato', to: '/admin/contato' },
  { label: 'Membros', to: '/admin/membros' },
  { label: 'Documentos', to: '/admin/documentos' },
  { label: 'Normativas', to: '/admin/normativas' },
  { label: 'Capacitações', to: '/admin/capacitacoes' },
  { label: 'Dúvidas', to: '/admin/duvidas' },
  { label: 'Reuniões', to: '/admin/reunioes' },
  { label: 'Submissão de Projetos', to: '/admin/submissao-projetos' },
]

export function AdminSidebar() {
  return (
    <aside className="hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/40 dark:border-slate-800 dark:bg-slate-950 dark:shadow-none lg:block">
      <div className="mb-8">
        <p className="text-sm uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">Administração</p>
        <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">Navegação</h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Use o menu para acessar cada área de edição do site.</p>
      </div>

      <nav className="space-y-2">
        {adminLinks.map((link) => (
          <NavLink
            to={link.to}
            key={link.to}
            className={({ isActive }) =>
              `flex items-center rounded-2xl px-4 py-3 text-sm font-medium transition ${
                isActive
                  ? 'bg-primary text-white shadow-sm shadow-primary/20'
                  : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800'
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
