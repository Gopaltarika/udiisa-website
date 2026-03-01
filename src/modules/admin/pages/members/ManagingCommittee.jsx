// admin/pages/members/ManagingCommittee.jsx
import { useState } from 'react'
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
import { validateRequired, API_IMG, formatDate } from '../../utils/helpers'

const MOCK = [
  { id: 1, name: 'Rajesh Sharma',  position: 'Chairman',        companyName: 'UDI Sports NGO',          photo: null, createdAt: '2024-01-01' },
  { id: 2, name: 'Priya Verma',    position: 'Vice Chairman',   companyName: 'India Sports Foundation', photo: null, createdAt: '2024-01-01' },
  { id: 3, name: 'Amit Gupta',     position: 'Secretary',       companyName: 'Sports Council Delhi',    photo: null, createdAt: '2024-01-01' },
  { id: 4, name: 'Sunita Mehta',   position: 'Treasurer',       companyName: 'FitIndia Trust',          photo: null, createdAt: '2024-01-01' },
]

const POSITIONS = ['Chairman', 'Vice Chairman', 'Secretary', 'Treasurer', 'Director', 'Member', 'Advisor']
const EMPTY = { name: '', position: '', companyName: '', photo: null }

export default function ManagingCommittee() {
  const toast = useAdminToast()
  const [members,  setMembers]  = useState(MOCK)
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

  const filtered = members.filter(m =>
    m.name.toLowerCase().includes(dSearch.toLowerCase()) ||
    m.position.toLowerCase().includes(dSearch.toLowerCase()) ||
    m.companyName.toLowerCase().includes(dSearch.toLowerCase())
  )

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
      if (selected) {
        setMembers(prev => prev.map(m => m.id === selected.id ? { ...m, ...form } : m))
        toast.success('Committee member updated!')
      } else {
        setMembers(prev => [{ id: Date.now(), ...form, photo: null, createdAt: new Date().toISOString() }, ...prev])
        toast.success('Committee member added!')
      }
      setFormOpen(false)
    } catch { toast.error('Failed to save') }
    finally { setSaving(false) }
  }

  const handleDelete = async () => {
    setDeleting(true)
    try {
      setMembers(prev => prev.filter(m => m.id !== selected.id))
      toast.success('Deleted!')
      setDelOpen(false)
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
      <Table columns={columns} data={filtered} loading={loading} emptyText="No committee members found" />

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