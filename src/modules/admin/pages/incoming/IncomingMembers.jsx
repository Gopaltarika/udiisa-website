// admin/pages/incoming/IncomingMembers.jsx
import { useState, useEffect } from 'react'
import Table from '../../components/Table'
import Modal from '../../components/Modal'
import SearchBar from '../../components/SearchBar'
import ActionButtons from '../../components/ActionButtons'
import ConfirmDialog from '../../components/ConfirmDialog'
import PageHeader from '../../components/PageHeader'
import Badge from '../../components/Badge'
import Spinner from '../../components/Spinner'
import { useAdminToast } from '../../hooks/ToastContext'
import { useDebounce } from '../../hooks/useDebounce'
import incomingService from '../../services/incomingService'
import { formatDate } from '../../utils/helpers'

const MOCK = [
  { id: 1, name: 'Ramesh Yadav',  email: 'ramesh@email.com',  phone: '9876543210', memberType: 'Sports Men', utr: 'UTR123456789', amount: '₹1,200', submittedAt: '2024-12-15' },
  { id: 2, name: 'Pooja Sharma',  email: 'pooja@email.com',   phone: '9123456789', memberType: 'General',    utr: 'UTR987654321', amount: '₹12,000', submittedAt: '2024-12-14' },
  { id: 3, name: 'Suresh Kumar',  email: 'suresh@email.com',  phone: '9988776655', memberType: 'Sports Men', utr: 'UTR111222333', amount: '₹1,200', submittedAt: '2024-12-13' },
  { id: 4, name: 'Anita Singh',   email: 'anita@email.com',   phone: '9901234567', memberType: 'General',    utr: 'UTR444555666', amount: '₹12,000', submittedAt: '2024-12-12' },
]

export default function IncomingMembers() {
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
    f.email.toLowerCase().includes(dSearch.toLowerCase()) ||
    f.memberType.toLowerCase().includes(dSearch.toLowerCase())
  )

  const handleDelete = async () => {
    setDeleting(true)
    try {
      // await incomingService.deleteMemberForm(selected.id)
      setForms(prev => prev.filter(f => f.id !== selected.id))
      toast.success('Form deleted!')
      setDelOpen(false)
    } catch { toast.error('Failed to delete') }
    finally { setDeleting(false) }
  }

  const columns = [
    { key: '#', label: '#', render: (_, __, i) => <span className="text-slate-400 text-[12px]">{i + 1}</span> },
    { key: 'name',   label: 'Name' },
    { key: 'email',  label: 'Email' },
    { key: 'phone',  label: 'Phone' },
    {
      key: 'memberType', label: 'Member Type',
      render: (v) => <Badge variant={v === 'General' ? 'navy' : 'orange'}>{v}</Badge>,
    },
    { key: 'amount', label: 'Amount' },
    { key: 'submittedAt', label: 'Submitted', render: (v) => formatDate(v) },
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
        title="Incoming Member Forms"
        subtitle="Review and manage incoming membership applications"
      />
      <div className="mb-[16px]">
        <SearchBar value={search} onChange={setSearch} placeholder="Search by name, email, type…" />
      </div>
      <Table columns={columns} data={filtered} loading={loading} emptyText="No incoming member forms" />

      {/* View Modal */}
      <Modal isOpen={viewOpen} onClose={() => setViewOpen(false)} title="Member Application Details" size="md">
        {selected && (
          <div className="grid grid-cols-2 gap-[10px]">
            {[
              ['Name',        selected.name],
              ['Email',       selected.email],
              ['Phone',       selected.phone],
              ['Member Type', selected.memberType],
              ['UTR Number',  selected.utr],
              ['Amount Paid', selected.amount],
              ['Submitted',   formatDate(selected.submittedAt)],
            ].map(([label, val]) => (
              <div key={label} className="bg-slate-50 rounded-[10px] p-[12px]">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.8px] m-0">{label}</p>
                <p className="text-[13px] font-semibold text-slate-700 m-0 mt-[3px]">{val || '—'}</p>
              </div>
            ))}
          </div>
        )}
      </Modal>

      <ConfirmDialog isOpen={delOpen} onClose={() => setDelOpen(false)} onConfirm={handleDelete} loading={deleting} message="Delete this membership application?" />
    </div>
  )
}