export function ContatoPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-12 pt-10">
      <div className="hero-gradient relative overflow-hidden rounded-3xl p-8 md:p-12">
        <div className="absolute right-0 top-0 h-52 w-52 rounded-full bg-primary/20 blur-3xl" />
        <div className="relative z-10">
          <h1 className="text-3xl font-bold text-white md:text-4xl">Contato</h1>
          <p className="mt-3 max-w-3xl text-slate-300">Entre em contato com o Comitê de Ética em Pesquisa da UNIJUÍ.</p>
        </div>
      </div>

      <div className="mt-8">
        <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <header className="border-b border-slate-200 px-5 py-4 dark:border-slate-800">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Informações de Contato</h2>
          </header>

          <div className="space-y-5 p-5 text-sm text-slate-700 dark:text-slate-200">
            <p className="text-base font-medium text-slate-900 dark:text-white">Comitê de Ética em Pesquisa da UNIJUÍ</p>

            <div>
              <p className="font-semibold text-slate-900 dark:text-white">Endereço:</p>
              <p>Rua do Comércio, 3000 - Bairro Universitário</p>
              <p>Ijuí/RS - CEP 98700-000</p>
            </div>

            <div>
              <p className="font-semibold text-slate-900 dark:text-white">Telefone:</p>
              <p>(55) 3332-0200</p>
            </div>

            <div>
              <p className="font-semibold text-slate-900 dark:text-white">E-mail:</p>
              <p>cep@unijui.edu.br</p>
            </div>

            <div>
              <p className="font-semibold text-slate-900 dark:text-white">Horário de atendimento:</p>
              <p>Segunda a sexta-feira: 8h às 11h30 e 13h30 às 17h</p>
            </div>
          </div>
        </article>
      </div>
    </section>
  )
}