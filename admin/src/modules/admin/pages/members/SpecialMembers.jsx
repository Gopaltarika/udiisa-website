// admin/pages/members/SpecialMembers.jsx
import { useState, useEffect } from 'react'
import { FaPlus } from 'react-icons/fa'
import Table from '../../components/Table'
import Modal from '../../components/Modal'
import SearchBar from '../../components/SearchBar'
import ActionButtons from '../../components/ActionButtons'
import ConfirmDialog from '../../components/ConfirmDialog'
import PageHeader from '../../components/PageHeader'
import { FormField, Input, PhotoUpload, SubmitBtn, CancelBtn } from '../../components/FormField'
import { useAdminToast } from '../../hooks/ToastContext'
import { useDebounce } from '../../hooks/useDebounce'
import memberService from '../../services/memberService'
import { validateRequired, buildFormData, API_IMG, formatDate } from '../../utils/helpers'

const EMPTY = { name: '', companyName: '', photo: null }

export default function SpecialMembers() {
  const toast = useAdminToast()
  const [members,  setMembers]  = useState([])
  const [loading,  setLoading]  = useState(false)
  const [saving,   setSaving]   = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [search,   setSearch]   = useState('')
  const dSearch = useDebounce(search)
  const [formOpen, setFormOpen] = useState(false)
  const [viewOpen, setViewOpen] = useState(false)
  const [delOpen,  setDelOpen]  = useState(false)
  const [selected, setSelected] = useState(null)
  const [form,     setForm]     = useState(EMPTY)
  const [preview,  setPreview]  = useState(null)
  const [errors,   setErrors]   = useState({})

  useEffect(() => {
    let mounted = true

    const loadSpecialMembers = async () => {
      setLoading(true)
      try {
        const res = await memberService.getSpecialMembers(dSearch ? { search: dSearch } : {})
        const list = Array.isArray(res?.data) ? res.data : []
        if (!mounted) return

        setMembers(
          list.map((m) => ({
            id: m._id,
            name: m.name || '',
            companyName: m.companyName || '',
            photo: m.photo || null,
            createdAt: m.createdAt,
          }))
        )
      } catch (e) {
        if (!mounted) return
        toast.error(e?.response?.data?.message || 'Failed to fetch special members')
      } finally {
        if (mounted) setLoading(false)
      }
    }

    loadSpecialMembers()
    return () => { mounted = false }
  }, [dSearch, toast])

  const openAdd = () => { setSelected(null); setForm(EMPTY); setPreview(null); setErrors({}); setFormOpen(true) }
  const openEdit = (row) => { setSelected(row); setForm({ name: row.name, companyName: row.companyName, photo: null }); setPreview(row.photo ? API_IMG(row.photo) : null); setErrors({}); setFormOpen(true) }

  const handlePhoto = (e) => {
    const file = e.target.files[0]
    if (!file) return
    if (file.size > 5 * 1024 * 1024) { toast.error('Photo must be under 5MB'); return }
    setForm(f => ({ ...f, photo: file }))
    setPreview(URL.createObjectURL(file))
  }

  const handleSave = async () => {
    const err = validateRequired(['name'], form)
    setErrors(err)
    if (Object.keys(err).length > 0) return
    setSaving(true)
    try {
      const payload = buildFormData({
        name: form.name?.trim(),
        companyName: form.companyName?.trim(),
        photo: form.photo || undefined,
      })

      if (selected) {
        const res = await memberService.updateSpecialMember(selected.id, payload)
        const m = res?.data || {}
        const updated = {
          id: m._id || selected.id,
          name: m.name || form.name,
          companyName: m.companyName || form.companyName || '',
          photo: m.photo || selected.photo || null,
          createdAt: m.createdAt || selected.createdAt,
        }
        setMembers(prev => prev.map(item => item.id === selected.id ? updated : item))
        toast.success('Special member updated!')
      } else {
        const res = await memberService.addSpecialMember(payload)
        const m = res?.data || {}
        const created = {
          id: m._id,
          name: m.name || form.name,
          companyName: m.companyName || form.companyName || '',
          photo: m.photo || null,
          createdAt: m.createdAt || new Date().toISOString(),
        }
        setMembers(prev => [created, ...prev])
        toast.success('Special member added!')
      }
      setFormOpen(false)
    } catch (e) {
      toast.error(e?.response?.data?.message || 'Failed to save')
    }
    finally { setSaving(false) }
  }

  const handleDelete = async () => {
    setDeleting(true)
    try {
      await memberService.deleteSpecialMember(selected.id)
      setMembers(prev => prev.filter(m => m.id !== selected.id))
      toast.success('Deleted successfully!')
      setDelOpen(false)
    } catch (e) {
      toast.error(e?.response?.data?.message || 'Failed to delete')
    }
    finally { setDeleting(false) }
  }

  const columns = [
    {
      key: 'photo', label: '#',
      render: (v, row, i) => (
        <div className="flex items-center gap-[10px]">
          {v
            ? <img src={API_IMG(v)} className="w-[36px] h-[36px] rounded-[8px] object-cover" alt="" />
            : <div className="w-[36px] h-[36px] rounded-[8px] bg-gradient-to-br from-[#F05A1A] to-[#0B1E4B] flex items-center justify-center text-white text-[12px] font-extrabold">{row.name?.[0]}</div>
          }
          <span className="text-slate-400 text-[11px]">#{i + 1}</span>
        </div>
      ),
    },
    { key: 'name',        label: 'Name' },
    { key: 'companyName', label: 'Company' },
    { key: 'createdAt',   label: 'Joined', render: (v) => formatDate(v) },
    {
      key: 'act', label: 'Actions',
      render: (_, row) => <ActionButtons onView={() => { setSelected(row); setViewOpen(true) }} onEdit={() => openEdit(row)} onDelete={() => { setSelected(row); setDelOpen(true) }} />,
    },
  ]

  return (
    <div>
      <PageHeader
        title="Special Members"
        subtitle="Manage special / honorary members"
        action={
          <button onClick={openAdd} className="flex items-center gap-[8px] px-[16px] h-[40px] rounded-[10px] bg-gradient-to-r from-[#F05A1A] to-[#FF7D42] text-white text-[13px] font-extrabold shadow-[0_4px_14px_rgba(240,90,26,0.3)] hover:-translate-y-[1px] transition-all">
            <FaPlus className="text-[11px]" /> Add Member
          </button>
        }
      />
      <div className="mb-[16px]"><SearchBar value={search} onChange={setSearch} placeholder="Search special members…" /></div>
      <Table columns={columns} data={members} loading={loading} emptyText="No special members found" />

      {/* Form */}
      <Modal isOpen={formOpen} onClose={() => setFormOpen(false)} title={`${selected ? 'Edit' : 'Add'} Special Member`} size="sm">
        <div className="flex flex-col gap-[14px]">
          <PhotoUpload preview={preview} onChange={handlePhoto} />
          <FormField label="Name" required error={errors.name}>
            <Input placeholder="Full name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} error={errors.name} />
          </FormField>
          <FormField label="Company Name">
            <Input placeholder="Company / Organisation" value={form.companyName} onChange={e => setForm(f => ({ ...f, companyName: e.target.value }))} />
          </FormField>
          <div className="flex gap-[10px] justify-end pt-[6px]">
            <CancelBtn onClick={() => setFormOpen(false)} />
            <SubmitBtn loading={saving} onClick={handleSave}>{selected ? 'Update' : 'Add'}</SubmitBtn>
          </div>
        </div>
      </Modal>

      {/* View */}
      <Modal isOpen={viewOpen} onClose={() => setViewOpen(false)} title="Special Member Details" size="sm">
        {selected && (
          <div className="flex flex-col items-center gap-[16px] text-center">
            {selected.photo
              ? <img src={API_IMG(selected.photo)} className="w-[90px] h-[90px] rounded-[16px] object-cover shadow-lg" alt="" />
              : <div className="w-[90px] h-[90px] rounded-[16px] bg-gradient-to-br from-[#F05A1A] to-[#0B1E4B] flex items-center justify-center text-white text-[30px] font-extrabold shadow-lg">{selected.name?.[0]}</div>
            }
            <div>
              <h3 className="text-[18px] font-extrabold text-[#0B1E4B] m-0">{selected.name}</h3>
              <p className="text-[14px] text-slate-500 m-0">{selected.companyName || '—'}</p>
            </div>
            <div className="w-full bg-slate-50 rounded-[12px] p-[14px] text-left">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.8px] m-0">Joined</p>
              <p className="text-[13px] font-semibold text-slate-700 m-0 mt-[2px]">{formatDate(selected.createdAt)}</p>
            </div>
          </div>
        )}
      </Modal>

      <ConfirmDialog isOpen={delOpen} onClose={() => setDelOpen(false)} onConfirm={handleDelete} loading={deleting} message={`Delete "${selected?.name}"?`} />
    </div>
  )
}