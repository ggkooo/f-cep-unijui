import { Link } from 'react-router-dom'
import logoCep from '../assets/logo-cep.png'

type FooterLink = {
  label: string
  href: string
  external?: boolean
}

type LinkGroup = {
  title: string
  links: FooterLink[]
}

const linkGroups: LinkGroup[] = [
  {
    title: 'Recursos',
    links: [
      { label: 'Downloads', href: '/documentos' },
      { label: 'Legislação', href: '/normativas' },
      { label: 'Tutoriais', href: '/submissao-projetos' },
      { label: 'Webinários', href: '/capacitacoes' },
    ],
  },
  {
    title: 'Institucional',
    links: [
      { label: 'Sobre o CEP', href: '/' },
      { label: 'Membros', href: '/membros' },
      { label: 'VRPGPG', href: '/contato' },
      { label: 'Contatos', href: '/contato' },
    ],
  },
  {
    title: 'Links Úteis',
    links: [
      { label: 'Plataforma Brasil', href: 'https://plataformabrasil.saude.gov.br/login.jsf', external: true },
      { label: 'CONEP', href: '/normativas' },
      { label: 'Lattes', href: '/membros' },
      { label: 'Portal Periódicos', href: '/capacitacoes' },
    ],
  },
]


export function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-200 bg-slate-50 pb-8 pt-16 dark:border-slate-800 dark:bg-slate-950/50">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-16 grid grid-cols-2 gap-12 md:grid-cols-5">
          <div className="col-span-2">
            <div className="mb-6 flex items-center space-x-2">
              <img alt="Logo CEP UNIJUÍ" className="h-10 w-auto" src={logoCep} />
            </div>
            <p className="mb-8 max-w-xs text-slate-500 dark:text-slate-400">
              Comitê de Ética em Pesquisa da UNIJUÍ. Comprometidos com a excelência ética na produção científica.
            </p>
          </div>

          {linkGroups.map((group) => (
            <div key={group.title}>
              <h4 className="mb-6 font-semibold text-slate-900 dark:text-white">{group.title}</h4>
              <ul className="space-y-4">
                {group.links.map((link) => (
                  <li key={link.label}>
                    {link.external ? (
                      <a
                        className="text-slate-500 transition-colors hover:text-primary dark:text-slate-400"
                        href={link.href}
                        rel="noreferrer"
                        target="_blank"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link className="text-slate-500 transition-colors hover:text-primary dark:text-slate-400" to={link.href}>
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-8 md:flex-row dark:border-slate-800">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            © 2026 UNIJUÍ - Comitê de Ética em Pesquisa. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}