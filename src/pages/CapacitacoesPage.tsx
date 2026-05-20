import { useEffect, useState } from 'react'
import { getTrainingTopics, type TrainingTopicResource } from '../services/trainingService'

/**
 * Nota: Este componente depende que o TrainingTopicResource
 * no arquivo de tipos use 'text: string'.
 */
type TopicItem = TrainingTopicResource;

export function CapacitacoesPage() {
    const [topics, setTopics] = useState<TopicItem[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        // Buscamos apenas os tópicos. O estado 'materials' foi removido por não estar em uso.
        getTrainingTopics()
            .then((topicItems) => {
                setTopics(
                    topicItems.map((item) => ({
                        id: item.id,
                        text: item.text, // Mapeamento direto do campo 'text' do backend
                        sort_order: item.sort_order
                    }))
                )
            })
            .catch((err) => {
                console.error("Erro ao carregar tópicos:", err);
                setError('Não foi possível carregar os materiais de capacitação.')
            })
            .finally(() => setLoading(false))
    }, [])

    if (loading) {
        return (
            <section className="mx-auto max-w-7xl px-4 pb-12 pt-10 animate-fade-in-up">
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
                    Carregando materiais de capacitação...
                </div>
            </section>
        )
    }

    if (error) {
        return (
            <section className="mx-auto max-w-7xl px-4 pb-12 pt-10 animate-fade-in-up">
                <div className="rounded-3xl border border-rose-200 bg-rose-50 p-8 text-rose-900 dark:border-rose-900/40 dark:bg-rose-950/40 dark:text-rose-200">
                    {error}
                </div>
            </section>
        )
    }

    return (
        <section className="mx-auto max-w-7xl px-4 pb-12 pt-10 animate-fade-in-up">
            {/* Hero Section */}
            <div className="hero-gradient relative overflow-hidden rounded-3xl p-8 md:p-12">
                <div className="absolute right-0 top-0 h-52 w-52 rounded-full bg-primary/20 blur-3xl" />
                <div className="relative z-10">
                    <h1 className="text-3xl font-bold text-white md:text-4xl">Educa CEPs</h1>
                    <p className="mt-3 max-w-4xl text-slate-300">
                        O Programa Educa CEPs, desenvolvido pela CONEP, é uma iniciativa educativa que visa capacitar e orientar os membros dos Comitês de Ética
                        em Pesquisa (CEPs).
                    </p>
                    <p className="mt-3 max-w-4xl text-slate-300">
                        Através de vídeos e documentos, o programa aborda temas fundamentais para a atuação dos CEPs.
                    </p>
                </div>
            </div>

            {/* Lista de Tópicos (Temas) */}
            <article className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <header className="border-b border-slate-200 px-5 py-4 dark:border-slate-800">
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Temas abordados</h2>
                </header>

                <ul className="divide-y divide-slate-200 dark:divide-slate-800">
                    {topics.map((item) => (
                        <li className="flex items-start gap-3 px-5 py-4 text-sm text-slate-700 dark:text-slate-200" key={item.id}>
                            <span className="material-icons-outlined mt-0.5 text-base text-primary">check_circle</span>
                            <span>{item.text}</span>
                        </li>
                    ))}
                </ul>
            </article>

            {/* Informação Adicional */}
            <article className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <div className="px-5 py-4 text-sm text-slate-700 dark:text-slate-200">
                    O CEP/UNIJUÍ disponibiliza materiais educativos para pesquisadores, contribuindo para o aprimoramento da análise ética.
                </div>
            </article>
        </section>
    )
}