import { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { logout, isLoggedIn, validateAuthToken } from '../../services/authService'
import { AdminSidebar } from './AdminSidebar'
import { getContactInfo, updateContactInfo, type ContactInfoResource } from '../../services/contactService'

const defaultContactInfo: ContactInfoResource = {
  id: 1,
  institution_name: '',
  address: '',
  city_state_zip: '',
  phone: '',
  email: '',
  service_hours: '',
}

export function AdminContactPage() {
  const navigate = useNavigate()
  const [contactInfo, setContactInfo] = useState<ContactInfoResource>(defaultContactInfo)
  const [loading, setLoading] = useState(true)
  const [savingContact, setSavingContact] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [isAuthValid, setIsAuthValid] = useState<boolean | null>(null)

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      try {
        const valid = await validateAuthToken()
        setIsAuthValid(valid)

        if (!valid) {
          return
        }

        const contact = await getContactInfo()
        setContactInfo(contact)
      } catch (error) {
        setErrorMessage('Não foi possível carregar as informações de contato.')
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  if (isAuthValid === false || !isLoggedIn()) {
    return <Navigate to="/admin/login" replace />
  }

  const handleLogout = async () => {
    try {
      await logout()
    } finally {
      navigate('/admin/login', { replace: true })
    }
  }

  const handleContactSave = async () => {
    setSavingContact(true)
    setErrorMessage(null)

    try {
      await updateContactInfo(contactInfo)
      const refreshedContactInfo = await getContactInfo()
      setContactInfo(refreshedContactInfo)
    } catch (error) {
      setErrorMessage('Erro ao salvar informações de contato.')
    } finally {
      setSavingContact(false)
    }
  }

  return (
    <section className="mx-auto max-w-7xl px-4 pb-20 pt-24">
      <div className="grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)]">
        <AdminSidebar />

        <div className="flex flex-col gap-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/40 dark:border-slate-800 dark:bg-slate-950 dark:shadow-none">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">Editar informações de contato</h1>
              <p className="mt-2 text-slate-600 dark:text-slate-300">Atualize o endereço, telefone, e-mail e horário de atendimento do CEP UNIJUÍ.</p>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              Sair
            </button>
          </div>

          {loading ? (
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
              Carregando informações de contato...
            </div>
          ) : null}

          {errorMessage ? (
            <div className="rounded-2xl border border-rose-200 bg-rose-50 px-5 py-4 text-sm text-rose-900 dark:border-rose-900/40 dark:bg-rose-900/20 dark:text-rose-200">
              {errorMessage}
            </div>
          ) : null}

          {!loading ? (
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900">
              <form className="space-y-5" onSubmit={(event) => event.preventDefault()}>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Nome da instituição</label>
                  <input
                    value={contactInfo.institution_name ?? ''}
                    onChange={(event) => setContactInfo({ ...contactInfo, institution_name: event.target.value })}
                    className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                    placeholder="Comitê de Ética em Pesquisa da UNIJUÍ"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Endereço</label>
                  <input
                    value={contactInfo.address ?? ''}
                    onChange={(event) => setContactInfo({ ...contactInfo, address: event.target.value })}
                    className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                    placeholder="Rua, número, bairro"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Cidade / Estado / CEP</label>
                  <input
                    value={contactInfo.city_state_zip ?? ''}
                    onChange={(event) => setContactInfo({ ...contactInfo, city_state_zip: event.target.value })}
                    className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                    placeholder="Ijuí/RS - CEP 98700-000"
                  />
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Telefone</label>
                    <input
                      value={contactInfo.phone ?? ''}
                      onChange={(event) => setContactInfo({ ...contactInfo, phone: event.target.value })}
                      className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                      placeholder="(55) 3332-0200"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">E-mail</label>
                    <input
                      value={contactInfo.email ?? ''}
                      onChange={(event) => setContactInfo({ ...contactInfo, email: event.target.value })}
                      className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                      placeholder="cep@unijui.edu.br"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Horário de atendimento</label>
                  <textarea
                    value={contactInfo.service_hours ?? ''}
                    onChange={(event) => setContactInfo({ ...contactInfo, service_hours: event.target.value })}
                    className="min-h-[120px] w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                    placeholder="Segunda a sexta-feira: 8h às 11h30 e 13h30 às 17h"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleContactSave}
                  disabled={savingContact}
                  className="inline-flex items-center justify-center rounded-2xl bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {savingContact ? 'Salvando...' : 'Salvar contato'}
                </button>
              </form>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}
