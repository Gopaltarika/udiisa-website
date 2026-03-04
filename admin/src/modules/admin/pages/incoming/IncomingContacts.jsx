// admin/pages/incoming/IncomingContacts.jsx
import { useState } from 'react'
import Table from '../../components/Table'
import Modal from '../../components/Modal'
import SearchBar from '../../components/SearchBar'
import ActionButtons from '../../components/ActionButtons'
import ConfirmDialog from '../../components/ConfirmDialog'
import PageHeader from '../../components/PageHeader'
import { useAdminToast } from '../../hooks/ToastContext'
import { useDebounce } from '../../hooks/useDebounce'
import { formatDate } from '../../utils/helpers'

const MOCK = [
  { id: 1, name: 'Kiran Bedi',   email: 'kiran@email.com',  phone: '9876543210', subject: 'Membership Enquiry',      message: 'I want to know about membership fees and benefits for individual members.', submittedAt: '2024-12-15' },
  { id: 2, name: 'Raj Malhotra', email: 'raj@email.com',    phone: '9123456789', subject: 'Sponsorship Opportunity',  message: 'Our company is interested in sponsoring your upcoming talent hunt event.', submittedAt: '2024-12-14' },
  { id: 3, name: 'Neha Joshi',   email: 'neha@email.com',   phone: '9988776655', subject: 'Volunteer Registration',   message: 'I would like to volunteer for UDI Sports events. Please guide me through the process.', submittedAt: '2024-12-13' },
]

export default function IncomingContacts() {
  const toast = useAdminToast()
  const [forms,    setForms]   = useState(MOCK)
  const [loading,  setLoading] = useState(false)
  const [deleting, setDeleting]= useState(false)
  const [search,   setSearch]  = useState('')
  const dSearch = useDebounce(search)
  const [viewOpen, setViewOpen]= useState(false)
  const [delOpen,  setDelOpen] = useState(false)
  const [selected, setSelected]= useState(null)

  const filtered = forms.filter(f =>
    f.name.toLowerCase().includes(dSearch.toLowerCase()) ||
    f.subject.toLowerCase().includes(dSearch.toLowerCase()) ||
    f.email.toLowerCase().includes(dSearch.toLowerCase())
  )

  const handleDelete = async () => {
    setDeleting(true)
    try {
      setForms(prev => prev.filter(f => f.id !== selected.id))
      toast.success('Contact form deleted!')
      setDelOpen(false)
    } catch { toast.error('Failed to delete') }
    finally { setDeleting(false) }
  }

  const columns = [
    { key: '#', label: '#', render: (_, __, i) => <span className="text-slate-400 text-[12px]">{i + 1}</span> },
    { key: 'name',    label: 'Name' },
    { key: 'email',   label: 'Email' },
    { key: 'phone',   label: 'Phone' },
    { key: 'subject', label: 'Subject', render: (v) => <span className="line-clamp-1 max-w-[180px] block">{v}</span> },
    { key: 'submittedAt', label: 'Date', render: (v) => formatDate(v) },
    {
      key: 'act', label: 'Actions',
      render: (_, row) => (
        <ActionButtons
          onView={() => { setSelected(row); setViewOpen(true) }}
          onDelete={() => { setSelected(row); setDelOpen(true) }}
        />
      ),
    },
  ]

  return (
    <div>
      <PageHeader
        title="Incoming Contact Forms"
        subtitle="Review and manage contact form submissions"
      />
      <div className="mb-[16px]">
        <SearchBar value={search} onChange={setSearch} placeholder="Search by name, email, subject…" />
      </div>
      <Table columns={columns} data={filtered} loading={loading} emptyText="No contact form submissions" />

      {/* View Modal */}
      <Modal isOpen={viewOpen} onClose={() => setViewOpen(false)} title="Contact Form Details" size="md">
        {selected && (
          <div className="flex flex-col gap-[12px]">
            <div className="grid grid-cols-2 gap-[10px]">
              {[
                ['Name',      selected.name],
                ['Email',     selected.email],
                ['Phone',     selected.phone],
                ['Submitted', formatDate(selected.submittedAt)],
              ].map(([label, val]) => (
                <div key={label} className="bg-slate-50 rounded-[10px] p-[12px]">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.8px] m-0">{label}</p>
                  <p className="text-[13px] font-semibold text-slate-700 m-0 mt-[3px]">{val || '—'}</p>
                </div>
              ))}
            </div>
            <div className="bg-slate-50 rounded-[10px] p-[12px]">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.8px] m-0">Subject</p>
              <p className="text-[13px] font-semibold text-slate-700 m-0 mt-[3px]">{selected.subject}</p>
            </div>
            <div className="bg-slate-50 rounded-[10px] p-[12px]">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.8px] m-0">Message</p>
              <p className="text-[13.5px] text-slate-700 m-0 mt-[6px] leading-relaxed">{selected.message}</p>
            </div>
          </div>
        )}
      </Modal>

      <ConfirmDialog isOpen={delOpen} onClose={() => setDelOpen(false)} onConfirm={handleDelete} loading={deleting} message="Delete this contact form submission?" />
    </div>
  )
}