import { useLocation, Link } from 'react-router-dom'

export function BackButton() {
  const { pathname } = useLocation()

  // Não mostrar o botão na página inicial
  if (pathname === '/') {
    return null
  }

  const getPageTitle = () => {
    switch (pathname) {
      case '/membros':
        return 'Membros'
      case '/normativas':
        return 'Normativas'
      case '/reunioes':
        return 'Reuniões'
      case '/submissao-projetos':
        return 'Submissão de Projetos'
      case '/documentos':
        return 'Documentos'
      case '/capacitacoes':
        return 'Capacitações'
      case '/duvidas':
        return 'Dúvidas Frequentes'
      case '/contato':
        return 'Contato'
      default:
        return 'Página'
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-4 pt-[4.5rem] pb-1 mt-16">
      <div className="flex items-center justify-between gap-4 rounded-lg border-l-4 border-primary bg-gradient-to-r from-primary/5 to-primary/0 px-4 py-2.5 dark:from-primary/10 dark:to-primary/0">
        <div className="flex items-center gap-3">
          <span className="material-icons-outlined text-primary">folder_open</span>
          <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{getPageTitle()}</span>
        </div>
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-primary/90 hover:shadow-md dark:hover:bg-primary/80"
        >
          <span className="material-icons-outlined text-base">home</span>
          Voltar ao Início
        </Link>
      </div>
    </div>
  )
}
