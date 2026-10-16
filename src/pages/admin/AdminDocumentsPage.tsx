import { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { logout, isLoggedIn, validateAuthToken } from '../../services/authService'
import { AdminSidebar } from './AdminSidebar'
import {
  getDocumentSections,
  updateDocumentSections,
} from '../../services/documentService'
import type { DocumentItemResource, DocumentSectionResource } from '../../services/types'

type DocumentItemState = DocumentItemResource & { uploadFile?: File | null }
type DocumentSectionState = DocumentSectionResource & { items: DocumentItemState[] }

const defaultSection: DocumentSectionState = {
  id: -Date.now(),
  title: 'Nova seção',
  sort_order: 0,
  items: [],
}

export function AdminDocumentsPage() {
  const navigate = useNavigate()
  const [sections, setSections] = useState<DocumentSectionState[]>([])
  const [deletedSectionIds, setDeletedSectionIds] = useState<number[]>([])
  const [deletedItemIds, setDeletedItemIds] = useState<number[]>([])

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [isAuthValid, setIsAuthValid] = useState<boolean | null>(null)

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      try {
        const valid = await validateAuthToken()
        setIsAuthValid(valid)
        if (!valid) return

        const results = await getDocumentSections()
        setSections(results as DocumentSectionState[])
      } catch {
        setError('Não foi possível carregar as seções de documentos.')
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

  const handleSave = async () => {
    setSaving(true)
    setError(null)
    setSuccess(null)

    try {
      await updateDocumentSections(sections, deletedSectionIds, deletedItemIds)
      const refreshedSections = await getDocumentSections()
      setSections(refreshedSections as DocumentSectionState[])
      setDeletedSectionIds([])
      setDeletedItemIds([])
      setSuccess('Seções e documentos salvos com sucesso.')
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const resErr = err as { response?: { data?: { message?: string } } }
        setError(resErr.response?.data?.message || 'Erro ao salvar as seções de documentos.')
      } else if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('Erro ao salvar as seções de documentos.')
      }
    } finally {
      setSaving(false)
    }
  }

  const updateSection = (index: number, next: Partial<DocumentSectionResource>) => {
    setSuccess(null)
    setError(null)
    setSections((current) =>
        current.map((section, idx) => (idx === index ? { ...section, ...next } : section)),
    )
  }

  const removeSection = (index: number) => {
    const targetSection = sections[index]

    if (targetSection.items && targetSection.items.length > 0) {
      setSuccess(null)
      setError(
          `Não é possível remover a seção "${targetSection.title}" pois ela possui ${targetSection.items.length} documento(s) atrelado(s). Remova os documentos da seção primeiro.`,
      )
      return
    }

    if (targetSection.id > 0) {
      setDeletedSectionIds((prev) => [...prev, targetSection.id])
    }
    setSections((current) => current.filter((_, idx) => idx !== index))
    setError(null)
    setSuccess('Seção removida. Clique em "Salvar alterações" para confirmar a exclusão.')
  }

  const updateItem = (
      sectionIndex: number,
      itemIndex: number,
      field: keyof DocumentItemResource | 'uploadFile',
      value: string | File | null,
  ) => {
    setSuccess(null)
    setError(null)
    setSections((current) =>
        current.map((section, idx) => {
          if (idx !== sectionIndex) return section
          return {
            ...section,
            items: section.items.map((item: DocumentItemState, itemIdx: number) =>
                itemIdx === itemIndex
                    ? {
                      ...item,
                      [field]: value,
                    }
                    : item,
            ),
          }
        }),
    )
  }

  const removeItem = (sectionIndex: number, itemIndex: number) => {
    const targetItem = sections[sectionIndex].items[itemIndex]

    if (targetItem.id > 0) {
      setDeletedItemIds((prev) => [...prev, targetItem.id])
    }

    setSections((current) =>
        current.map((section, idx) => {
          if (idx !== sectionIndex) return section
          return {
            ...section,
            items: section.items.filter((_: DocumentItemState, iIdx: number) => iIdx !== itemIndex),
          }
        }),
    )

    setError(null)
    setSuccess('Documento removido. Clique em "Salvar alterações" para confirmar a exclusão.')
  }

  const addSection = () => {
    setError(null)
    setSections((current) => [
      ...current,
      {
        ...defaultSection,
        id: -Date.now(),
        title: `Nova seção ${current.length + 1}`,
        sort_order: current.length + 1,
        items: [],
      },
    ])
    setSuccess('Seção adicionada. Clique em "Salvar alterações" para confirmar.')
  }

  const addItem = (sectionIndex: number) => {
    setError(null)
    setSections((current) =>
        current.map((section, idx) =>
            idx !== sectionIndex
                ? section
                : {
                  ...section,
                  items: [
                    ...section.items,
                    {
                      id: -Date.now(),
                      name: 'Novo documento',
                      description: '',
                      file_url: '',
                      original_filename: '',
                      sort_order: section.items.length + 1,
                    },
                  ],
                },
        ),
    )
    setSuccess('Documento adicionado. Clique em "Salvar alterações" para confirmar.')
  }

  return (
      <section className="mx-auto max-w-7xl px-4 pb-20 pt-24">
        <div className="grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)]">
          <AdminSidebar />

          <div className="flex flex-col gap-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/40 dark:border-slate-800 dark:bg-slate-950 dark:shadow-none">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">
                  Editar Documentos
                </h1>
                <p className="mt-2 text-slate-600 dark:text-slate-300">
                  Gerencie seções, documentos e links que aparecem na página de modelos de
                  documentos.
                </p>
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
                  Carregando seções de documentos...
                </div>
            ) : null}

            {error ? (
                <div className="rounded-2xl border border-rose-200 bg-rose-50 px-5 py-4 text-sm text-rose-900 dark:border-rose-900/40 dark:bg-rose-900/20 dark:text-rose-200">
                  {error}
                </div>
            ) : null}

            {success ? (
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm text-emerald-900 dark:border-emerald-900/40 dark:bg-emerald-900/20 dark:text-emerald-200">
                  {success}
                </div>
            ) : null}

            <div className="flex flex-wrap items-center justify-between gap-3">
              <button
                  type="button"
                  onClick={addSection}
                  className="rounded-2xl bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary-dark"
              >
                Adicionar seção
              </button>
              <button
                  type="button"
                  onClick={handleSave}
                  disabled={saving}
                  className="rounded-2xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving ? 'Salvando...' : 'Salvar alterações'}
              </button>
            </div>

            <div className="space-y-8">
              {sections.map((section, sectionIndex) => (
                  <div
                      key={section.id}
                      className="rounded-3xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900"
                  >
                    <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                      <div className="flex-1">
                        <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                          Título da seção
                        </label>
                        <input
                            value={section.title}
                            onChange={(event) =>
                                updateSection(sectionIndex, { title: event.target.value })
                            }
                            className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                        />
                      </div>
                      <div className="flex gap-2">
                        <button
                            type="button"
                            onClick={() => addItem(sectionIndex)}
                            className="rounded-2xl bg-primary px-4 py-3 text-sm font-semibold text-white transition hover:bg-primary-dark"
                        >
                          Adicionar documento
                        </button>
                        <button
                            type="button"
                            onClick={() => removeSection(sectionIndex)}
                            className="rounded-2xl bg-rose-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-rose-700"
                        >
                          Excluir seção
                        </button>
                      </div>
                    </div>

                    <div className="space-y-5">
                      {section.items.map((item: DocumentItemState, itemIndex: number) => (
                          <div
                              key={item.id}
                              className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-950"
                          >
                            <div className="grid gap-5 md:grid-cols-2">
                              <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                                  Nome do documento
                                </label>
                                <input
                                    value={item.name}
                                    onChange={(event) =>
                                        updateItem(
                                            sectionIndex,
                                            itemIndex,
                                            'name',
                                            event.target.value,
                                        )
                                    }
                                    className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                                />
                              </div>
                              <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                                  Descrição
                                </label>
                                <input
                                    value={item.description || ''}
                                    onChange={(event) =>
                                        updateItem(
                                            sectionIndex,
                                            itemIndex,
                                            'description',
                                            event.target.value,
                                        )
                                    }
                                    className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                                />
                              </div>
                            </div>

                            <div className="mt-5 grid gap-5 md:grid-cols-2 md:items-center">
                              <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                                  Upload do arquivo
                                </label>
                                <input
                                    type="file"
                                    accept="*"
                                    onChange={(event) => {
                                      const file = event.target.files?.[0] ?? null
                                      updateItem(sectionIndex, itemIndex, 'uploadFile', file)
                                      if (file) {
                                        updateItem(
                                            sectionIndex,
                                            itemIndex,
                                            'original_filename',
                                            file.name,
                                        )
                                      }
                                    }}
                                    className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition file:mr-4 file:rounded-full file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                                />
                              </div>
                              <div className="flex items-center justify-between gap-2">
                                <div>
                                  {item.uploadFile ? (
                                      <p className="text-sm text-slate-500 dark:text-slate-400">
                                        Novo arquivo: {item.uploadFile.name}
                                      </p>
                                  ) : item.original_filename ? (
                                      <p className="text-sm text-slate-500 dark:text-slate-400">
                                        Arquivo atual: {item.original_filename}
                                      </p>
                                  ) : (
                                      <p className="text-sm text-slate-500 dark:text-slate-400">
                                        Nenhum arquivo carregado.
                                      </p>
                                  )}
                                </div>
                                <button
                                    type="button"
                                    onClick={() => removeItem(sectionIndex, itemIndex)}
                                    className="rounded-xl bg-rose-100 px-3 py-1.5 text-xs font-semibold text-rose-700 transition hover:bg-rose-200 dark:bg-rose-900/30 dark:text-rose-300"
                                >
                                  Remover documento
                                </button>
                              </div>
                            </div>
                          </div>
                      ))}
                    </div>
                  </div>
              ))}
            </div>
          </div>
        </div>
      </section>
  )
}