import { lazy, Suspense, useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Header } from './components/Header'
import { HeroSection } from './components/HeroSection'
import { QuickAnswersSection } from './components/QuickAnswersSection'
import { Footer } from './components/Footer'
import { BackButton } from './components/BackButton'

const MembersPage = lazy(() => import('./pages/MembersPage').then(m => ({ default: m.MembersPage })))
const NormativasPage = lazy(() => import('./pages/NormativasPage').then(m => ({ default: m.NormativasPage })))
const ReunioesPage = lazy(() => import('./pages/ReunioesPage').then(m => ({ default: m.ReunioesPage })))
const SubmissaoProjetosPage = lazy(() => import('./pages/SubmissaoProjetosPage').then(m => ({ default: m.SubmissaoProjetosPage })))
const DocumentosPage = lazy(() => import('./pages/DocumentosPage').then(m => ({ default: m.DocumentosPage })))
const CapacitacoesPage = lazy(() => import('./pages/CapacitacoesPage').then(m => ({ default: m.CapacitacoesPage })))
const DuvidasPage = lazy(() => import('./pages/DuvidasPage').then(m => ({ default: m.DuvidasPage })))
const ContatoPage = lazy(() => import('./pages/ContatoPage').then(m => ({ default: m.ContatoPage })))

function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const elementId = hash.replace('#', '')
      requestAnimationFrame(() => {
        const target = document.getElementById(elementId)
        if (target) {
          target.scrollIntoView({ behavior: 'auto', block: 'start' })
        }
      })

      return
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [pathname, hash])

  return null
}

function App() {
  return (
    <div className="min-h-screen bg-background-light text-slate-900 transition-colors duration-200 dark:bg-background-dark dark:text-slate-100">
      <ScrollToTop />
      <BackButton />
      <Header />
      <main className="pt-16">
        <Suspense fallback={null}>
          <Routes>
          <Route
            element={
              <>
                <HeroSection />
                <QuickAnswersSection />
              </>
            }
            path="/"
          />
          <Route element={<MembersPage />} path="/membros" />
          <Route element={<NormativasPage />} path="/normativas" />
          <Route element={<ReunioesPage />} path="/reunioes" />
          <Route element={<SubmissaoProjetosPage />} path="/submissao-projetos" />
          <Route element={<DocumentosPage />} path="/documentos" />
          <Route element={<CapacitacoesPage />} path="/capacitacoes" />
          <Route element={<DuvidasPage />} path="/duvidas" />
          <Route element={<ContatoPage />} path="/contato" />
          <Route
            element={
              <>
                <HeroSection />
                <QuickAnswersSection />
              </>
            }
            path="*"
          />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}

export default App
