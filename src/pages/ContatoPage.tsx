import { useEffect, useState } from 'react'
import { getContactInfo, type ContactInfoResource } from '../services/contactService'

const defaultContactInfo: ContactInfoResource = {
  id: 1,
  institution_name: 'Comitê de Ética em Pesquisa da UNIJUÍ',
  address: 'Rua do Comércio, 3000 - Bairro Universitário',
  city_state_zip: 'Ijuí/RS - CEP 98700-000',
  phone: '(55) 3332-0200',
  email: 'cep@unijui.edu.br',
  service_hours: 'Segunda a sexta-feira: 8h às 11h30 e 13h30 às 17h',
}

export function ContatoPage() {
  const [contactInfo, setContactInfo] = useState<ContactInfoResource | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getContactInfo()
      .then((info) => setContactInfo(info))
      .catch(() => setError('Não foi possível carregar os dados de contato.'))
      .finally(() => setLoading(false))
  }, [])

  const info = contactInfo ?? defaultContactInfo

  return (
    <section className="mx-auto max-w-7xl px-4 pb-12 pt-10 animate-fade-in-up">
      <div className="hero-gradient relative overflow-hidden rounded-3xl p-8 md:p-12">
        <div className="absolute right-0 top-0 h-52 w-52 rounded-full bg-primary/20 blur-3xl" />
        <div className="relative z-10">
          <h1 className="text-3xl font-bold text-white md:text-4xl">Contato</h1>
          <p className="mt-3 max-w-3xl text-slate-300">Entre em contato com o Comitê de Ética em Pesquisa da UNIJUÍ.</p>
        </div>
      </div>

      {loading ? (
        <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
          Carregando informações de contato...
        </div>
      ) : null}

      {error ? (
        <div className="mt-8 rounded-2xl border border-rose-200 bg-rose-50 px-5 py-4 text-sm text-rose-900 dark:border-rose-900/40 dark:bg-rose-900/20 dark:text-rose-200">
          {error}
        </div>
      ) : null}

      <div className="mt-8">
        <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <header className="border-b border-slate-200 px-5 py-4 dark:border-slate-800">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Informações de Contato</h2>
          </header>

          <div className="space-y-5 p-5 text-sm text-slate-700 dark:text-slate-200">
            <p className="text-base font-medium text-slate-900 dark:text-white">
              {info.institution_name ?? 'Comitê de Ética em Pesquisa da UNIJUÍ'}
            </p>

            <div>
              <p className="font-semibold text-slate-900 dark:text-white">Endereço:</p>
              <p>{info.address ?? 'Rua do Comércio, 3000 - Bairro Universitário'}</p>
            </div>
            <div>
              <p className="font-semibold text-slate-900 dark:text-white">Cidade / Estado / CEP:</p>
              <p>{info.city_state_zip ?? 'Ijuí/RS - CEP 98700-000'}</p>
            </div>

            <div>
              <p className="font-semibold text-slate-900 dark:text-white">Telefone:</p>
              <p>{info.phone ?? '(55) 3332-0200'}</p>
            </div>

            <div>
              <p className="font-semibold text-slate-900 dark:text-white">E-mail:</p>
              <p>{info.email ?? 'cep@unijui.edu.br'}</p>
            </div>

            <div>
              <p className="font-semibold text-slate-900 dark:text-white">Horário de atendimento:</p>
              <p>{info.service_hours ?? 'Segunda a sexta-feira: 8h às 11h30 e 13h30 às 17h'}</p>
            </div>
          </div>
        </article>
      </div>
    </section>
  )
}