// admin/pages/members/ManagingCommittee.jsx
import { useEffect, useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import Table from '../../components/Table'
import Modal from '../../components/Modal'
import SearchBar from '../../components/SearchBar'
import ActionButtons from '../../components/ActionButtons'
import ConfirmDialog from '../../components/ConfirmDialog'
import PageHeader from '../../components/PageHeader'
import { FormField, Input, PhotoUpload, SubmitBtn, CancelBtn } from '../../components/FormField'
import Badge from '../../components/Badge'
import { useAdminToast } from '../../hooks/ToastContext'
import { useDebounce } from '../../hooks/useDebounce'
import memberService from '../../services/memberService'
import { validateRequired, API_IMG, buildFormData } from '../../utils/helpers'

const POSITIONS = ['Chairman', 'Vice Chairman', 'Secretary', 'Treasurer', 'Director', 'Member', 'Advisor']
const EMPTY = { name: '', position: '', companyName: '', photo: null }

export default function ManagingCommittee() {
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

    const loadCommittee = async () => {
      setLoading(true)
      try {
        const res = await memberService.getCommittee(dSearch ? { search: dSearch } : {})
        const list = Array.isArray(res?.data) ? res.data : []
        if (!mounted) return
        setMembers(list.map((m) => ({
          id: m._id,
          name: m.name || '',
          position: m.position || '',
          companyName: m.companyName || '',
          photo: m.photo || null,
          createdAt: m.createdAt,
        })))
      } catch (e) {
        if (!mounted) return
        toast.error(e?.response?.data?.message || 'Failed to fetch committee members')
      } finally {
        if (mounted) setLoading(false)
      }
    }

    loadCommittee()
    return () => { mounted = false }
  }, [dSearch, toast])

  const openAdd  = () => { setSelected(null); setForm(EMPTY); setPreview(null); setErrors({}); setFormOpen(true) }
  const openEdit = (row) => { setSelected(row); setForm({ name: row.name, position: row.position, companyName: row.companyName, photo: null }); setPreview(row.photo ? API_IMG(row.photo) : null); setErrors({}); setFormOpen(true) }

  const handlePhoto = (e) => {
    const file = e.target.files[0]
    if (!file) return
    if (file.size > 5 * 1024 * 1024) { toast.error('Max 5MB'); return }
    setForm(f => ({ ...f, photo: file }))
    setPreview(URL.createObjectURL(file))
  }

  const handleSave = async () => {
    const err = validateRequired(['name', 'position'], form)
    setErrors(err)
    if (Object.keys(err).length > 0) return
    setSaving(true)
    try {
      const payload = buildFormData({
        name: form.name?.trim(),
        position: form.position,
        companyName: form.companyName?.trim(),
        photo: form.photo || undefined,
      })

      if (selected) {
        const res = await memberService.updateCommittee(selected.id, payload)
        const m = res?.data || {}
        const updated = {
          id: m._id || selected.id,
          name: m.name || form.name,
          position: m.position || form.position,
          companyName: m.companyName || form.companyName || '',
          photo: m.photo || selected.photo || null,
          createdAt: m.createdAt || selected.createdAt,
        }
        setMembers(prev => prev.map(item => item.id === selected.id ? updated : item))
        toast.success('Committee member updated!')
      } else {
        const res = await memberService.addCommittee(payload)
        const m = res?.data || {}
        const created = {
          id: m._id,
          name: m.name || form.name,
          position: m.position || form.position,
          companyName: m.companyName || form.companyName || '',
          photo: m.photo || null,
          createdAt: m.createdAt || new Date().toISOString(),
        }
        setMembers(prev => [created, ...prev])
        toast.success('Committee member added!')
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
      await memberService.deleteCommittee(selected.id)
      setMembers(prev => prev.filter(m => m.id !== selected.id))
      toast.success('Deleted!')
      setDelOpen(false)
    } catch (e) {
      toast.error(e?.response?.data?.message || 'Failed to delete')
    } finally { setDeleting(false) }
  }

  const POSITION_COLORS = {
    'Chairman': 'orange', 'Vice Chairman': 'navy',
    'Secretary': 'blue', 'Treasurer': 'green',
    'Director': 'purple', 'default': 'slate',
  }

  const columns = [
    {
      key: 'photo', label: '#',
      render: (v, row, i) => (
        <div className="flex items-center gap-[10px]">
          {v
            ? <img src={API_IMG(v)} className="w-[36px] h-[36px] rounded-full object-cover border-2 border-white shadow-md" alt="" />
            : <div className="w-[36px] h-[36px] rounded-full bg-gradient-to-br from-[#0B1E4B] to-[#1565C0] flex items-center justify-center text-white text-[13px] font-extrabold shadow-md">{row.name?.[0]}</div>
          }
          <span className="text-slate-400 text-[11px]">#{i + 1}</span>
        </div>
      ),
    },
    { key: 'name', label: 'Name' },
    {
      key: 'position', label: 'Position',
      render: (v) => <Badge variant={POSITION_COLORS[v] || 'slate'}>{v}</Badge>,
    },
    { key: 'companyName', label: 'Company / Org.' },
    {
      key: 'act', label: 'Actions',
      render: (_, row) => <ActionButtons onView={() => { setSelected(row); setViewOpen(true) }} onEdit={() => openEdit(row)} onDelete={() => { setSelected(row); setDelOpen(true) }} />,
    },
  ]

  return (
    <div>
      <PageHeader
        title="Managing Committee"
        subtitle="Manage committee members and their roles"
        action={
          <button onClick={openAdd} className="flex items-center gap-[8px] px-[16px] h-[40px] rounded-[10px] bg-gradient-to-r from-[#F05A1A] to-[#FF7D42] text-white text-[13px] font-extrabold shadow-[0_4px_14px_rgba(240,90,26,0.3)] hover:-translate-y-[1px] transition-all">
            <FaPlus className="text-[11px]" /> Add Member
          </button>
        }
      />
      <div className="mb-[16px]"><SearchBar value={search} onChange={setSearch} placeholder="Search committee…" /></div>
      <Table columns={columns} data={members} loading={loading} emptyText="No committee members found" />

      {/* Form */}
      <Modal isOpen={formOpen} onClose={() => setFormOpen(false)} title={`${selected ? 'Edit' : 'Add'} Committee Member`} size="sm">
        <div className="flex flex-col gap-[14px]">
          <PhotoUpload preview={preview} onChange={handlePhoto} />
          <FormField label="Name" required error={errors.name}>
            <Input placeholder="Full name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} error={errors.name} />
          </FormField>
          <FormField label="Position" required error={errors.position}>
            <select
              value={form.position}
              onChange={e => setForm(f => ({ ...f, position: e.target.value }))}
              className={`w-full h-[42px] px-[12px] rounded-[10px] border border-slate-200 bg-white text-[13.5px] font-medium text-slate-700 focus:outline-none focus:border-[#F05A1A] focus:ring-2 focus:ring-[#F05A1A]/10 transition-all ${errors.position ? 'border-red-400' : ''}`}
            >
              <option value="">Select position</option>
              {POSITIONS.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </FormField>
          <FormField label="Company / Organisation">
            <Input placeholder="Company or organisation" value={form.companyName} onChange={e => setForm(f => ({ ...f, companyName: e.target.value }))} />
          </FormField>
          <div className="flex gap-[10px] justify-end pt-[6px]">
            <CancelBtn onClick={() => setFormOpen(false)} />
            <SubmitBtn loading={saving} onClick={handleSave}>{selected ? 'Update' : 'Add'}</SubmitBtn>
          </div>
        </div>
      </Modal>

      {/* View */}
      <Modal isOpen={viewOpen} onClose={() => setViewOpen(false)} title="Committee Member" size="sm">
        {selected && (
          <div className="flex flex-col items-center gap-[16px] text-center">
            {selected.photo
              ? <img src={API_IMG(selected.photo)} className="w-[90px] h-[90px] rounded-full object-cover border-4 border-white shadow-lg" alt="" />
              : <div className="w-[90px] h-[90px] rounded-full bg-gradient-to-br from-[#0B1E4B] to-[#1565C0] flex items-center justify-center text-white text-[30px] font-extrabold shadow-lg">{selected.name?.[0]}</div>
            }
            <div>
              <h3 className="text-[18px] font-extrabold text-[#0B1E4B] m-0">{selected.name}</h3>
              <Badge variant={POSITION_COLORS[selected.position] || 'slate'}>{selected.position}</Badge>
              {selected.companyName && <p className="text-[13px] text-slate-500 m-0 mt-[4px]">{selected.companyName}</p>}
            </div>
          </div>
        )}
      </Modal>

      <ConfirmDialog isOpen={delOpen} onClose={() => setDelOpen(false)} onConfirm={handleDelete} loading={deleting} message={`Remove "${selected?.name}" from committee?`} />
    </div>
  )
}