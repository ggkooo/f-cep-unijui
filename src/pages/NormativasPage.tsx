import { useEffect, useState } from 'react'
import { getNormativeSections } from '../services/normativeService'

type NormativeItem = {
  title: string
  file: string
}

type NormativeSection = {
  title: string
  items: NormativeItem[]
}

const defaultSections: NormativeSection[] = [
  {
    title: 'Normativas',
    items: [
      { title: 'Regimento do CEP UNIJUÍ', file: '#' },
    ],
  },
]

export function NormativasPage() {
  const [sections, setSections] = useState<NormativeSection[]>(defaultSections)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getNormativeSections()
        .then((sectionsData) => {
          setSections(
              sectionsData.map((section) => ({
                title: section.title,
                items: section.items.map((item) => ({
                  title: item.title,
                  file: item.file_url,
                })),
              })),
          )
        })
        .catch(() => setError('Não foi possível carregar as normas do servidor.'))
        .finally(() => setLoading(false))
  }, [])

  /**
   * Monta a URL final usando sempre a Base URL do .env
   */
  const getViewUrl = (fileUrl: string | null | undefined) => {
    if (!fileUrl || fileUrl === '#') return '#';

    const baseUrl = import.meta.env.VITE_API_BASE_URL || '';
    let path = fileUrl;

    try {
      // Se vier com http, extrai apenas o path para reconstruir com a URL do .env
      if (fileUrl.startsWith('http')) {
        const urlObj = new URL(fileUrl);
        path = urlObj.pathname + urlObj.search;
      }
    } catch (e) {
      console.error("Erro ao processar URL:", e);
    }

    const cleanedBaseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
    const cleanedPath = path.startsWith('/') ? path.slice(1) : path;

    return `${cleanedBaseUrl}/${cleanedPath}`;
  };

  return (
      <section className="mx-auto max-w-7xl px-4 pb-12 pt-10 animate-fade-in-up">
        <div className="hero-gradient relative overflow-hidden rounded-3xl p-8 md:p-12">
          <div className="absolute right-0 top-0 h-52 w-52 rounded-full bg-primary/20 blur-3xl" />
          <div className="relative z-10">
            <h1 className="text-3xl font-bold text-white md:text-4xl">Normativas do CEP UNIJUÍ</h1>
            <p className="mt-3 max-w-3xl text-slate-300">
              Consulte as normas, resoluções e ofícios do Sistema CEP/Conep.
            </p>
          </div>
        </div>

        {loading && (
            <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-700 dark:bg-slate-900 dark:text-slate-300">
              Carregando normativas...
            </div>
        )}

        {error && (
            <div className="mt-8 rounded-2xl border border-rose-200 bg-rose-50 px-5 py-4 text-sm text-rose-900 dark:bg-rose-900/20 dark:text-rose-200">
              {error}
            </div>
        )}

        <div className="mt-8 space-y-8">
          {sections.map((section) => (
              <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900" key={section.title}>
                <header className="border-b border-slate-200 px-5 py-4 dark:border-slate-800">
                  <h2 className="text-lg font-semibold text-slate-900 dark:text-white">{section.title}</h2>
                </header>

                <ul className="divide-y divide-slate-200 dark:divide-slate-800">
                  {section.items.map((item) => {
                    const viewUrl = getViewUrl(item.file);
                    const hasFile = item.file && item.file !== '#';

                    return (
                        <li className="flex flex-col gap-4 px-5 py-4 md:flex-row md:items-start md:justify-between" key={`${section.title}-${item.title}`}>
                          <p className="max-w-5xl text-sm leading-relaxed text-slate-700 dark:text-slate-200">
                            {item.title}
                          </p>

                          <a
                              href={viewUrl}
                              target="_blank" // Abre em nova aba
                              rel="noopener noreferrer" // Segurança para links externos
                              className={`inline-flex shrink-0 items-center gap-2 self-start rounded-lg border border-primary/30 bg-primary/10 px-3 py-2 text-sm font-medium text-primary transition-colors hover:border-primary hover:bg-primary hover:text-white dark:border-primary/40 dark:bg-primary/20 dark:text-blue-300 dark:hover:text-white ${!hasFile ? 'pointer-events-none opacity-50' : ''}`}
                              onClick={(e) => {
                                if (!hasFile) e.preventDefault();
                              }}
                          >
                            <span className="material-icons-outlined text-base">visibility</span>
                            Visualizar
                          </a>
                        </li>
                    );
                  })}
                </ul>
              </article>
          ))}
        </div>
      </section>
  );
}