// admin/pages/members/GeneralMembers.jsx
import { useState, useEffect } from 'react'
import { FaPlus } from 'react-icons/fa'
import Table from '../../components/Table'
import Modal from '../../components/Modal'
import SearchBar from '../../components/SearchBar'
import ActionButtons from '../../components/ActionButtons'
import ConfirmDialog from '../../components/ConfirmDialog'
import PageHeader from '../../components/PageHeader'
import { FormField, Input, SubmitBtn, CancelBtn } from '../../components/FormField'
import { useAdminToast } from '../../hooks/ToastContext'
import { useDebounce } from '../../hooks/useDebounce'
import memberService from '../../services/memberService'
import { validateRequired, formatDate } from '../../utils/helpers'

const TABS = ['Individual', 'Body Corporate']

const EMPTY_IND  = { name: '', email: '', phone: '' }
const EMPTY_CORP = { name: '', companyName: '', contactPerson: '' }
const TYPE_BY_TAB = { Individual: 'individual', 'Body Corporate': 'body-corporate' }

function MemberTable({ data, loading, onView, onEdit, onDelete, type }) {
  const indCols = [
    {
      key: '__serial',
      label: '#',
      render: (_, __, i) => (
        <span className="inline-flex min-w-[28px] h-[22px] items-center justify-center rounded-[6px] bg-slate-100 text-slate-700 text-[11px] font-extrabold">
          {String(i + 1).padStart(2, '0')}
        </span>
      ),
    },
    { key: 'name',  label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone' },
    { key: 'createdAt', label: 'Joined', render: (v) => formatDate(v) },
    { key: 'act', label: 'Actions', render: (_, row) => <ActionButtons onView={() => onView(row)} onEdit={() => onEdit(row)} onDelete={() => onDelete(row)} /> },
  ]
  const corpCols = [
    {
      key: '__serial',
      label: '#',
      render: (_, __, i) => (
        <span className="inline-flex min-w-[28px] h-[22px] items-center justify-center rounded-[6px] bg-slate-100 text-slate-700 text-[11px] font-extrabold">
          {String(i + 1).padStart(2, '0')}
        </span>
      ),
    },
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
  const [data,      setData]        = useState({ Individual: [], 'Body Corporate': [] })
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

  const currentData = data[activeTab] || []

  const emptyForm = activeTab === 'Individual' ? EMPTY_IND : EMPTY_CORP

  useEffect(() => {
    let mounted = true

    const loadMembers = async () => {
      setLoading(true)
      try {
        const params = {
          type: TYPE_BY_TAB[activeTab],
          ...(dSearch ? { search: dSearch } : {}),
        }
        const res = await memberService.getGeneralMembers(params)
        const list = Array.isArray(res?.data) ? res.data : []
        if (!mounted) return

        const mapped = list.map((m) => ({
          id: m._id,
          name: m.name || '',
          email: m.email || '',
          phone: m.phone || '',
          companyName: m.companyName || '',
          contactPerson: m.contactPerson || '',
          createdAt: m.createdAt,
          type: m.type || TYPE_BY_TAB[activeTab],
        }))
        setData((prev) => ({ ...prev, [activeTab]: mapped }))
      } catch (e) {
        if (!mounted) return
        toast.error(e?.response?.data?.message || 'Failed to fetch members')
      } finally {
        if (mounted) setLoading(false)
      }
    }

    loadMembers()
    return () => { mounted = false }
  }, [activeTab, dSearch, toast])

  const openAdd = () => {
    setSelected(null)
    setForm(emptyForm)
    setErrors({})
    setFormOpen(true)
  }

  const openEdit = (row) => {
    setSelected(row)
    setForm(
      activeTab === 'Individual'
        ? { name: row.name || '', email: row.email || '', phone: row.phone || '' }
        : { name: row.name || '', companyName: row.companyName || '', contactPerson: row.contactPerson || '' }
    )
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
      const payload = {
        type: TYPE_BY_TAB[activeTab],
        name: form.name?.trim(),
        email: activeTab === 'Individual' ? (form.email || '').trim() : '',
        phone: activeTab === 'Individual' ? (form.phone || '').trim() : '',
        companyName: activeTab === 'Body Corporate' ? (form.companyName || '').trim() : '',
        contactPerson: activeTab === 'Body Corporate' ? (form.contactPerson || '').trim() : '',
      }

      if (selected) {
        const res = await memberService.updateGeneralMember(selected.id, payload)
        const m = res?.data || {}
        const updated = {
          id: m._id || selected.id,
          name: m.name || payload.name,
          email: m.email || '',
          phone: m.phone || '',
          companyName: m.companyName || '',
          contactPerson: m.contactPerson || '',
          createdAt: m.createdAt || selected.createdAt,
          type: m.type || payload.type,
        }
        setData(d => ({ ...d, [activeTab]: d[activeTab].map(item => item.id === selected.id ? updated : item) }))
        toast.success('Member updated!')
      } else {
        const res = await memberService.addGeneralMember(payload)
        const m = res?.data || {}
        const created = {
          id: m._id,
          name: m.name || payload.name,
          email: m.email || '',
          phone: m.phone || '',
          companyName: m.companyName || '',
          contactPerson: m.contactPerson || '',
          createdAt: m.createdAt || new Date().toISOString(),
          type: m.type || payload.type,
        }
        setData(d => ({ ...d, [activeTab]: [created, ...d[activeTab]] }))
        toast.success('Member added!')
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
      await memberService.deleteGeneralMember(selected.id)
      setData(d => ({ ...d, [activeTab]: d[activeTab].filter(m => m.id !== selected.id) }))
      toast.success('Member deleted!')
      setDelOpen(false)
    } catch (e) {
      toast.error(e?.response?.data?.message || 'Failed to delete')
    }
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