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

export default function IncomingMembers() {
  const toast = useAdminToast()
  const [forms,    setForms]   = useState([])
  const [loading,  setLoading] = useState(false)
  const [deleting, setDeleting]= useState(false)
  const [search,   setSearch]  = useState('')
  const dSearch = useDebounce(search)
  const [viewOpen, setViewOpen]= useState(false)
  const [delOpen,  setDelOpen] = useState(false)
  const [selected, setSelected]= useState(null)

  useEffect(() => {
    let mounted = true

    const loadMembers = async () => {
      setLoading(true)
      try {
        const res = await incomingService.getMemberForms(dSearch ? { search: dSearch } : {})
        const list = Array.isArray(res?.data) ? res.data : []
        if (!mounted) return

        setForms(
          list.map((item) => ({
            id: item._id,
            name: item.name || item.fullName || '—',
            email: item.email || '—',
            phone: item.phone || '—',
            memberType: item.memberType || '—',
            utr: item.utr || item.utrNumber || '—',
            amount: item.amount || '—',
            submittedAt: item.submittedAt || item.createdAt,
          }))
        )
      } catch (e) {
        if (!mounted) return
        toast.error(e?.response?.data?.message || 'Failed to fetch incoming member forms')
      } finally {
        if (mounted) setLoading(false)
      }
    }

    loadMembers()
    return () => { mounted = false }
  }, [dSearch, toast])

  const handleDelete = async () => {
    setDeleting(true)
    try {
      await incomingService.deleteMemberForm(selected.id)
      setForms(prev => prev.filter(f => f.id !== selected.id))
      toast.success('Form deleted!')
      setDelOpen(false)
    } catch (e) {
      toast.error(e?.response?.data?.message || 'Failed to delete')
    }
    finally { setDeleting(false) }
  }

  const columns = [
    {
      key: '__serial',
      label: '#',
      render: (_, __, i) => (
        <span className="inline-flex min-w-[28px] h-[22px] items-center justify-center rounded-[6px] bg-slate-100 text-slate-700 text-[11px] font-extrabold">
          {String(i + 1).padStart(2, '0')}
        </span>
      ),
    },
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
      <Table columns={columns} data={forms} loading={loading} emptyText="No incoming member forms" />

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