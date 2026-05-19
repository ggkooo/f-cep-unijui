import logoCep from '../assets/logo-cep.png'
import { Link } from 'react-router-dom'


export function Header() {
  const toggleDarkMode = () => {
    document.documentElement.classList.toggle('dark')
  }

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-md dark:border-slate-800 dark:bg-background-dark/80">
      <nav className="mx-auto flex h-26 max-w-7xl items-center justify-between px-4">

        <Link to="/" className="flex items-center">
          <img alt="Logo CEP UNIJUÍ" className="h-26 w-auto transition-transform hover:scale-105" src={logoCep} />
        </Link>

        <div className="flex items-center space-x-4">
          <button
            className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
            onClick={toggleDarkMode}
            type="button"
          >
            <span className="material-icons-outlined">dark_mode</span>
          </button>
        </div>
      </nav>
    </header>
  )
}