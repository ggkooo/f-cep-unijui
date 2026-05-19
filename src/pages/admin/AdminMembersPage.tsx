import type { FormEvent } from 'react'
import { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { logout, isLoggedIn, validateAuthToken } from '../../services/authService'
import { AdminSidebar } from './AdminSidebar'
import { createMember, deleteMember, getMembers, type MemberResource, updateMember } from '../../services/membersService'

const defaultMemberForm = {
  category: 'Membros',
  role: '',
  name: '',
  education: '',
  qualification: '',
  notes: '',
  sort_order: 0,
}

export function AdminMembersPage() {
  const navigate = useNavigate()
  const [members, setMembers] = useState<MemberResource[]>([])
  const [memberForm, setMemberForm] = useState(defaultMemberForm)
  const [editingMemberId, setEditingMemberId] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)
  const [memberActionLoading, setMemberActionLoading] = useState(false)
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

        const memberList = await getMembers()
        setMembers(memberList)
      } catch (error) {
        setErrorMessage('Não foi possível carregar os membros.')
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

  const resetMemberForm = () => {
    setEditingMemberId(null)
    setMemberForm(defaultMemberForm)
  }

  const handleMemberSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setMemberActionLoading(true)
    setErrorMessage(null)

    try {
      if (editingMemberId) {
        const updatedMember = await updateMember(editingMemberId, memberForm)
        setMembers((current) => current.map((item) => (item.id === updatedMember.id ? updatedMember : item)))
      } else {
        const createdMember = await createMember(memberForm)
        setMembers((current) => [...current, createdMember])
      }
      resetMemberForm()
    } catch (error) {
      setErrorMessage('Erro ao salvar o membro.')
    } finally {
      setMemberActionLoading(false)
    }
  }

  const handleEditMember = (member: MemberResource) => {
    setEditingMemberId(member.id)
    setMemberForm({
      category: member.category,
      role: member.role,
      name: member.name,
      education: member.education,
      qualification: member.qualification,
      notes: member.notes ?? '',
      sort_order: member.sort_order,
    })
  }

  const handleDeleteMember = async (memberId: number) => {
    setMemberActionLoading(true)
    setErrorMessage(null)

    try {
      await deleteMember(memberId)
      setMembers((current) => current.filter((item) => item.id !== memberId))
      if (editingMemberId === memberId) {
        resetMemberForm()
      }
    } catch (error) {
      setErrorMessage('Erro ao remover o membro.')
    } finally {
      setMemberActionLoading(false)
    }
  }

  return (
    <section className="mx-auto max-w-7xl px-4 pb-20 pt-24">
      <div className="grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)]">
        <AdminSidebar />

        <div className="flex flex-col gap-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/40 dark:border-slate-800 dark:bg-slate-950 dark:shadow-none">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">Cadastrar / editar membros</h1>
              <p className="mt-2 text-slate-600 dark:text-slate-300">Gerencie a composição do CEP UNIJUÍ com membros, coordenadores e participantes de pesquisa.</p>
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
            Carregando membros...
          </div>
        ) : null}

        {errorMessage ? (
          <div className="rounded-2xl border border-rose-200 bg-rose-50 px-5 py-4 text-sm text-rose-900 dark:border-rose-900/40 dark:bg-rose-900/20 dark:text-rose-200">
            {errorMessage}
          </div>
        ) : null}

        {!loading ? (
          <div className="grid gap-8">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Formulário de membro</h2>
              <form className="mt-6 space-y-5" onSubmit={handleMemberSubmit}>
                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Categoria</label>
                    <select
                      value={memberForm.category}
                      onChange={(event) => setMemberForm({ ...memberForm, category: event.target.value })}
                      className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                    >
                      <option>Coordenadores</option>
                      <option>Membros</option>
                      <option>Representantes de Participante de Pesquisa</option>
                      <option>Secretaria</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Função</label>
                    <input
                      value={memberForm.role}
                      onChange={(event) => setMemberForm({ ...memberForm, role: event.target.value })}
                      className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                    />
                  </div>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Nome</label>
                    <input
                      value={memberForm.name}
                      onChange={(event) => setMemberForm({ ...memberForm, name: event.target.value })}
                      className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Formação</label>
                    <input
                      value={memberForm.education}
                      onChange={(event) => setMemberForm({ ...memberForm, education: event.target.value })}
                      className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Titulação / Observações</label>
                  <textarea
                    value={memberForm.qualification}
                    onChange={(event) => setMemberForm({ ...memberForm, qualification: event.target.value })}
                    className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                    rows={3}
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Notas</label>
                  <textarea
                    value={memberForm.notes}
                    onChange={(event) => setMemberForm({ ...memberForm, notes: event.target.value })}
                    className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                    rows={2}
                  />
                </div>

                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <button
                    type="submit"
                    disabled={memberActionLoading}
                    className="inline-flex items-center justify-center rounded-2xl bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {memberActionLoading ? (editingMemberId ? 'Atualizando...' : 'Salvando...') : editingMemberId ? 'Atualizar membro' : 'Adicionar membro'}
                  </button>
                  {editingMemberId ? (
                    <button
                      type="button"
                      onClick={resetMemberForm}
                      className="rounded-2xl border border-slate-200 bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                    >
                      Cancelar edição
                    </button>
                  ) : null}
                </div>
              </form>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Lista de membros</h2>
                <span className="rounded-full bg-slate-200 px-3 py-1 text-sm font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300">{members.length}</span>
              </div>

              <div className="mt-6 space-y-4">
                {members.length === 0 ? (
                  <p className="text-sm text-slate-600 dark:text-slate-300">Nenhum membro encontrado.</p>
                ) : (
                  members.map((member) => (
                    <div key={member.id} className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-950">
                      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div>
                          <p className="text-sm font-semibold text-slate-900 dark:text-white">{member.name}</p>
                          <p className="text-sm text-slate-600 dark:text-slate-400">{member.category} • {member.role}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleEditMember(member)}
                            className="rounded-2xl border border-slate-200 bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                          >
                            Editar
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteMember(member.id)}
                            disabled={memberActionLoading}
                            className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-700 transition hover:bg-rose-100 disabled:cursor-not-allowed disabled:opacity-60 dark:border-rose-900/40 dark:bg-rose-950/20 dark:text-rose-200 dark:hover:bg-rose-900/30"
                          >
                            Remover
                          </button>
                        </div>
                      </div>
                      <div className="mt-3 text-sm text-slate-600 dark:text-slate-400">
                        <p>{member.education}</p>
                        <p>{member.qualification}</p>
                        {member.notes ? <p className="mt-1 italic">{member.notes}</p> : null}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        ) : null}
        </div>
      </div>
    </section>
  )
}
