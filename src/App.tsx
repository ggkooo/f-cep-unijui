import { Header } from './components/Header'
import { HeroSection } from './components/HeroSection'
import { QuickAnswersSection } from './components/QuickAnswersSection'
import { Footer } from './components/Footer'
import { MembersPage } from './pages/MembersPage'
import { NormativasPage } from './pages/NormativasPage'
import { ReunioesPage } from './pages/ReunioesPage'
import { SubmissaoProjetosPage } from './pages/SubmissaoProjetosPage'
import { DocumentosPage } from './pages/DocumentosPage'
import { CapacitacoesPage } from './pages/CapacitacoesPage'
import { DuvidasPage } from './pages/DuvidasPage'
import { ContatoPage } from './pages/ContatoPage'
import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'

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
      <Header />
      <main className="pt-16">
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
      </main>
      <Footer />
    </div>
  )
}

export default App
