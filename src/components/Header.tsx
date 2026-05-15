import logoCep from '../assets/logo-cep.png'
import { Link } from 'react-router-dom'


export function Header() {
  const toggleDarkMode = () => {
    document.documentElement.classList.toggle('dark')
  }

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-md dark:border-slate-800 dark:bg-background-dark/80">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">

        <Link to="/" className="flex items-center">
          <img alt="Logo CEP UNIJUÍ" className="h-10 w-auto transition-transform hover:scale-105" src={logoCep} />
        </Link>

        <div className="flex items-center space-x-4">
          <button
            className="p-2 text-slate-500 hover:text-primary dark:text-slate-400 dark:hover:text-white"
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