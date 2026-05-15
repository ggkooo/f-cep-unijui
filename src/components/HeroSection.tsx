export function HeroSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-12 pt-8 animate-fade-in-up">
      <div className="hero-gradient relative overflow-hidden rounded-3xl p-12 text-center md:p-20">
        <div className="absolute -mr-20 -mt-20 h-64 w-64 rounded-full bg-primary/20 blur-3xl animate-float-gentle" />
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 h-48 w-48 rounded-full bg-secondary/10 blur-3xl animate-float-gentle stagger-2" />
        <div className="absolute right-1/4 top-12 h-24 w-24 rounded-full bg-white/10 blur-2xl animate-pulse-soft stagger-3" />

        <div className="relative z-10 mx-auto max-w-3xl">
          <h1 className="mb-6 text-4xl font-bold text-white md:text-6xl animate-fade-in-up">
            Comitê de Ética em Pesquisa com Seres Humanos da UNIJUÍ
          </h1>
          <p className="mb-10 text-lg text-slate-300 animate-fade-in-up stagger-1">
            Precisa de ajuda com seu projeto? Explore nossa base de conhecimento e diretrizes éticas atualizadas.
          </p>

          <div className="relative mx-auto max-w-xl animate-fade-in-up stagger-2">
            
          </div>
        </div>
      </div>
    </section>
  )
}