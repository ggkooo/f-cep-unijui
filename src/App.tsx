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
const AdminLoginPage = lazy(() => import('./pages/admin').then(m => ({ default: m.AdminLoginPage })))
const AdminPage = lazy(() => import('./pages/admin').then(m => ({ default: m.AdminPage })))
const AdminContactPage = lazy(() => import('./pages/admin').then(m => ({ default: m.AdminContactPage })))
const AdminMembersPage = lazy(() => import('./pages/admin').then(m => ({ default: m.AdminMembersPage })))
const AdminDocumentsPage = lazy(() => import('./pages/admin').then(m => ({ default: m.AdminDocumentsPage })))
const AdminNormativasPage = lazy(() => import('./pages/admin').then(m => ({ default: m.AdminNormativasPage })))
const AdminCapacitacoesPage = lazy(() => import('./pages/admin').then(m => ({ default: m.AdminCapacitacoesPage })))
const AdminDuvidasPage = lazy(() => import('./pages/admin').then(m => ({ default: m.AdminDuvidasPage })))
const AdminReunioesPage = lazy(() => import('./pages/admin').then(m => ({ default: m.AdminReunioesPage })))
const AdminSubmissaoProjetosPage = lazy(() => import('./pages/admin').then(m => ({ default: m.AdminSubmissaoProjetosPage })))

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
  const isAdminRoute = useLocation().pathname.startsWith('/admin')

  return (
    <div className="min-h-screen bg-background-light text-slate-900 transition-colors duration-200 dark:bg-background-dark dark:text-slate-100">
      <ScrollToTop />
      {!isAdminRoute ? <BackButton /> : null}
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
          <Route element={<AdminLoginPage />} path="/admin/login" />
          <Route element={<AdminPage />} path="/admin" />
          <Route element={<AdminContactPage />} path="/admin/contato" />
          <Route element={<AdminMembersPage />} path="/admin/membros" />
          <Route element={<AdminDocumentsPage />} path="/admin/documentos" />
          <Route element={<AdminNormativasPage />} path="/admin/normativas" />
          <Route element={<AdminCapacitacoesPage />} path="/admin/capacitacoes" />
          <Route element={<AdminDuvidasPage />} path="/admin/duvidas" />
          <Route element={<AdminReunioesPage />} path="/admin/reunioes" />
          <Route element={<AdminSubmissaoProjetosPage />} path="/admin/submissao-projetos" />
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
      {!isAdminRoute ? <Footer /> : null}
    </div>
  )
}

export default App
