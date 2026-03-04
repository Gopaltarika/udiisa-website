// admin/pages/members/GeneralMembers.jsx
import { useState, useEffect } from 'react'
import { FaPlus } from 'react-icons/fa'
import Table from '../../components/Table'
import Modal from '../../components/Modal'
import SearchBar from '../../components/SearchBar'
import ActionButtons from '../../components/ActionButtons'
import ConfirmDialog from '../../components/ConfirmDialog'
import PageHeader from '../../components/PageHeader'
import { FormField, Input, Select, SubmitBtn, CancelBtn } from '../../components/FormField'
import Badge from '../../components/Badge'
import { useAdminToast } from '../../hooks/ToastContext'
import { useDebounce } from '../../hooks/useDebounce'
import memberService from '../../services/memberService'
import { validateRequired, formatDate } from '../../utils/helpers'

// ── Mock data ─────────────────────────────────
const MOCK_INDIVIDUAL = [
  { id: 1, name: 'Rahul Verma',   email: 'rahul@email.com',  phone: '9876543210', createdAt: '2024-12-01' },
  { id: 2, name: 'Sunita Devi',   email: 'sunita@email.com', phone: '9123456789', createdAt: '2024-11-25' },
  { id: 3, name: 'Vikash Kumar',  email: 'vikash@email.com', phone: '9988776655', createdAt: '2024-11-18' },
]
const MOCK_CORPORATE = [
  { id: 4, name: 'Sports Inc.',    companyName: 'Sports Inc. Pvt. Ltd.',    contactPerson: 'Amit Shah',    createdAt: '2024-12-10' },
  { id: 5, name: 'FitLife Corp.',  companyName: 'FitLife Corporation',      contactPerson: 'Neha Gupta',   createdAt: '2024-11-30' },
]
// ─────────────────────────────────────────────

const TABS = ['Individual', 'Body Corporate']

const EMPTY_IND  = { name: '', email: '', phone: '' }
const EMPTY_CORP = { name: '', companyName: '', contactPerson: '' }

function MemberTable({ data, loading, onView, onEdit, onDelete, type }) {
  const indCols = [
    { key: '#',  label: '#',    render: (_, __, i) => <span className="text-slate-400 text-[12px]">{i + 1}</span> },
    { key: 'name',  label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone' },
    { key: 'createdAt', label: 'Joined', render: (v) => formatDate(v) },
    { key: 'act', label: 'Actions', render: (_, row) => <ActionButtons onView={() => onView(row)} onEdit={() => onEdit(row)} onDelete={() => onDelete(row)} /> },
  ]
  const corpCols = [
    { key: '#', label: '#', render: (_, __, i) => <span className="text-slate-400 text-[12px]">{i + 1}</span> },
    { key: 'name',          label: 'Name' },
    { key: 'companyName',   label: 'Company' },
    { key: 'contactPerson', label: 'Contact Person' },
    { key: 'createdAt',     label: 'Joined', render: (v) => formatDate(v) },
    { key: 'act', label: 'Actions', render: (_, row) => <ActionButtons onView={() => onView(row)} onEdit={() => onEdit(row)} onDelete={() => onDelete(row)} /> },
  ]
  return <Table columns={type === 'Individual' ? indCols : corpCols} data={data} loading={loading} />
}

export default function GeneralMembers() {
  const toast = useAdminToast()
  const [activeTab, setActiveTab]   = useState('Individual')
  const [data,      setData]        = useState({ Individual: MOCK_INDIVIDUAL, 'Body Corporate': MOCK_CORPORATE })
  const [loading,   setLoading]     = useState(false)
  const [saving,    setSaving]      = useState(false)
  const [deleting,  setDeleting]    = useState(false)
  const [search,    setSearch]      = useState('')
  const dSearch = useDebounce(search)
  const [formOpen,  setFormOpen]    = useState(false)
  const [viewOpen,  setViewOpen]    = useState(false)
  const [delOpen,   setDelOpen]     = useState(false)
  const [selected,  setSelected]    = useState(null)
  const [form,      setForm]        = useState(EMPTY_IND)
  const [errors,    setErrors]      = useState({})

  const currentData = (data[activeTab] || []).filter(m =>
    Object.values(m).some(v => String(v).toLowerCase().includes(dSearch.toLowerCase()))
  )

  const emptyForm = activeTab === 'Individual' ? EMPTY_IND : EMPTY_CORP

  const openAdd = () => {
    setSelected(null)
    setForm(emptyForm)
    setErrors({})
    setFormOpen(true)
  }

  const openEdit = (row) => {
    setSelected(row)
    setForm({ ...row })
    setErrors({})
    setFormOpen(true)
  }

  const validate = () => {
    const required = activeTab === 'Individual' ? ['name', 'email'] : ['name', 'companyName']
    const err = validateRequired(required, form)
    setErrors(err)
    return Object.keys(err).length === 0
  }

  const handleSave = async () => {
    if (!validate()) return
    setSaving(true)
    try {
      if (selected) {
        setData(d => ({ ...d, [activeTab]: d[activeTab].map(m => m.id === selected.id ? { ...m, ...form } : m) }))
        toast.success('Member updated!')
      } else {
        const newM = { id: Date.now(), ...form, createdAt: new Date().toISOString() }
        setData(d => ({ ...d, [activeTab]: [newM, ...d[activeTab]] }))
        toast.success('Member added!')
      }
      setFormOpen(false)
    } catch { toast.error('Failed to save') }
    finally { setSaving(false) }
  }

  const handleDelete = async () => {
    setDeleting(true)
    try {
      setData(d => ({ ...d, [activeTab]: d[activeTab].filter(m => m.id !== selected.id) }))
      toast.success('Member deleted!')
      setDelOpen(false)
    } catch { toast.error('Failed to delete') }
    finally { setDeleting(false) }
  }

  return (
    <div>
      <PageHeader
        title="General Members"
        subtitle="Manage Individual and Body Corporate members"
        action={
          <button onClick={openAdd} className="flex items-center gap-[8px] px-[16px] h-[40px] rounded-[10px] bg-gradient-to-r from-[#F05A1A] to-[#FF7D42] text-white text-[13px] font-extrabold shadow-[0_4px_14px_rgba(240,90,26,0.3)] hover:-translate-y-[1px] transition-all duration-200">
            <FaPlus className="text-[11px]" /> Add Member
          </button>
        }
      />

      {/* Tabs */}
      <div className="flex gap-[4px] bg-white rounded-[12px] p-[4px] border border-slate-100 shadow-[0_2px_8px_rgba(11,30,75,0.05)] mb-[20px] w-fit">
        {TABS.map(tab => (
          <button
            key={tab}
            onClick={() => { setActiveTab(tab); setSearch('') }}
            className={`
              px-[20px] h-[36px] rounded-[10px] text-[13px] font-extrabold
              transition-all duration-200
              ${activeTab === tab
                ? 'bg-gradient-to-r from-[#0B1E4B] to-[#152B6B] text-white shadow-[0_4px_12px_rgba(11,30,75,0.25)]'
                : 'text-slate-500 hover:text-[#0B1E4B]'
              }
            `}
          >
            {tab}
            <span className={`ml-[6px] text-[10px] px-[6px] py-[1px] rounded-full font-extrabold ${activeTab === tab ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'}`}>
              {data[tab]?.length || 0}
            </span>
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="mb-[16px]">
        <SearchBar value={search} onChange={setSearch} placeholder={`Search ${activeTab.toLowerCase()} members…`} />
      </div>

      <MemberTable
        data={currentData}
        loading={loading}
        type={activeTab}
        onView={row => { setSelected(row); setViewOpen(true) }}
        onEdit={openEdit}
        onDelete={row => { setSelected(row); setDelOpen(true) }}
      />

      {/* Form Modal */}
      <Modal isOpen={formOpen} onClose={() => setFormOpen(false)} title={`${selected ? 'Edit' : 'Add'} ${activeTab} Member`} size="sm">
        <div className="flex flex-col gap-[14px]">
          <FormField label="Name" required error={errors.name}>
            <Input placeholder="Full name" value={form.name || ''} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} error={errors.name} />
          </FormField>
          {activeTab === 'Individual' ? (
            <>
              <FormField label="Email" error={errors.email} required>
                <Input type="email" placeholder="Email address" value={form.email || ''} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} error={errors.email} />
              </FormField>
              <FormField label="Phone">
                <Input type="tel" placeholder="Phone number" value={form.phone || ''} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
              </FormField>
            </>
          ) : (
            <>
              <FormField label="Company Name" required error={errors.companyName}>
                <Input placeholder="Company name" value={form.companyName || ''} onChange={e => setForm(f => ({ ...f, companyName: e.target.value }))} error={errors.companyName} />
              </FormField>
              <FormField label="Contact Person">
                <Input placeholder="Contact person name" value={form.contactPerson || ''} onChange={e => setForm(f => ({ ...f, contactPerson: e.target.value }))} />
              </FormField>
            </>
          )}
          <div className="flex gap-[10px] justify-end pt-[6px]">
            <CancelBtn onClick={() => setFormOpen(false)} />
            <SubmitBtn loading={saving} onClick={handleSave}>{selected ? 'Update' : 'Add Member'}</SubmitBtn>
          </div>
        </div>
      </Modal>

      {/* View Modal */}
      <Modal isOpen={viewOpen} onClose={() => setViewOpen(false)} title="Member Details" size="sm">
        {selected && (
          <div className="grid grid-cols-2 gap-[12px]">
            {Object.entries(selected).filter(([k]) => k !== 'id').map(([k, v]) => (
              <div key={k} className="bg-slate-50 rounded-[10px] p-[12px]">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.8px] m-0">{k}</p>
                <p className="text-[13px] font-semibold text-slate-700 m-0 mt-[3px]">{formatDate(v) !== '—' && k.includes('At') ? formatDate(v) : v || '—'}</p>
              </div>
            ))}
          </div>
        )}
      </Modal>

      <ConfirmDialog isOpen={delOpen} onClose={() => setDelOpen(false)} onConfirm={handleDelete} loading={deleting} message={`Delete "${selected?.name}"?`} />
    </div>
  )
}