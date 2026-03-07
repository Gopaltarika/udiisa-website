// admin/pages/incoming/IncomingMembers.jsx
import { useState, useEffect } from 'react'
import Table from '../../components/Table'
import Modal from '../../components/Modal'
import SearchBar from '../../components/SearchBar'
import ActionButtons from '../../components/ActionButtons'
import ConfirmDialog from '../../components/ConfirmDialog'
import PageHeader from '../../components/PageHeader'
import Badge from '../../components/Badge'
import { useAdminToast } from '../../hooks/ToastContext'
import { useDebounce } from '../../hooks/useDebounce'
import incomingService from '../../services/incomingService'
import { formatDate } from '../../utils/helpers'

// ─── Tab definitions ───────────────────────────────────────────────────────────
const TABS = [
  { key: 'individual_player',  label: 'Individual Players'    },
  { key: 'individual_patron',  label: 'Individual Patron'     },
  { key: 'lifetime_corporate', label: 'Lifetime Corporate'    },
]

// ─── Detail row helper used inside the view modal ─────────────────────────────
function DetailRow({ label, value }) {
  return (
    <div className="bg-slate-50 rounded-[10px] p-[12px]">
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.8px] m-0">{label}</p>
      <p className="text-[13px] font-semibold text-slate-700 m-0 mt-[3px] break-words">{value || '—'}</p>
    </div>
  )
}

// ─── Main page ─────────────────────────────────────────────────────────────────
export default function IncomingMembers() {
  const toast = useAdminToast()

  const [activeTab, setActiveTab] = useState(TABS[0].key)
  const [forms,    setForms]      = useState([])
  const [loading,  setLoading]    = useState(false)
  const [deleting, setDeleting]   = useState(false)
  const [search,   setSearch]     = useState('')
  const dSearch = useDebounce(search)

  const [viewOpen, setViewOpen] = useState(false)
  const [delOpen,  setDelOpen]  = useState(false)
  const [selected, setSelected] = useState(null)

  // ── Reset search when tab changes ──
  useEffect(() => { setSearch('') }, [activeTab])

  // ── Fetch data ──
  useEffect(() => {
    let mounted = true
    const load = async () => {
      setLoading(true)
      try {
        const params = { memberType: activeTab, ...(dSearch ? { search: dSearch } : {}) }
        const res  = await incomingService.getMemberForms(params)
        const list = Array.isArray(res?.data) ? res.data : []
        if (!mounted) return
        setForms(list.map(item => ({
          id:           item._id,
          name:         item.name         || item.fullName    || '—',
          email:        item.email                            || '—',
          phone:        item.phone                            || '—',
          age:          item.age                              || '—',
          gender:       item.gender                          || '—',
          memberType:   item.memberType                      || '—',
          address:      item.address                         || '—',
          message:      item.message      || item.msg        || '—',
          utr:          item.utr          || item.utrNumber  || '—',
          amount:       item.amount                          || '—',
          submittedAt:  item.submittedAt  || item.createdAt,
        })))
      } catch (e) {
        if (!mounted) return
        toast.error(e?.response?.data?.message || 'Failed to fetch forms')
      } finally {
        if (mounted) setLoading(false)
      }
    }
    load()
    return () => { mounted = false }
  }, [activeTab, dSearch, toast])

  // ── Delete ──
  const handleDelete = async () => {
    setDeleting(true)
    try {
      await incomingService.deleteMemberForm(selected.id)
      setForms(prev => prev.filter(f => f.id !== selected.id))
      toast.success('Form deleted!')
      setDelOpen(false)
    } catch (e) {
      toast.error(e?.response?.data?.message || 'Failed to delete')
    } finally {
      setDeleting(false)
    }
  }

  // ── Table columns ──
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
    { key: 'name',  label: 'Name'  },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone' },
    { key: 'age',   label: 'Age'   },
    {
      key: 'gender', label: 'Gender',
      render: (v) => (
        <Badge variant={v === 'Male' ? 'navy' : v === 'Female' ? 'orange' : 'default'}>{v}</Badge>
      ),
    },
    {
      key: 'memberType', label: 'Member Type',
      render: (v) => <Badge variant="navy">{v}</Badge>,
    },
    {
      key: 'submittedAt', label: 'Submitted',
      render: (v) => formatDate(v),
    },
    {
      key: 'act', label: 'Actions',
      render: (_, row) => (
        <ActionButtons
          onView={()   => { setSelected(row); setViewOpen(true) }}
          onDelete={() => { setSelected(row); setDelOpen(true)  }}
        />
      ),
    },
  ]

  const activeLabel = TABS.find(t => t.key === activeTab)?.label

  // ────────────────────────────────────────────────────────────────────────────
  return (
    <div>
      <PageHeader
        title="Incoming Member Forms"
        subtitle="Review and manage incoming membership applications"
      />

      {/* ── Tabs ── */}
      <div className="flex items-center gap-[6px] mb-[20px] bg-white border border-slate-100 rounded-[14px] p-[5px] shadow-[0_2px_8px_rgba(11,30,75,0.05)] w-fit">
        {TABS.map(tab => {
          const isActive = activeTab === tab.key
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`
                px-[16px] h-[36px] rounded-[10px] text-[12.5px] font-extrabold
                transition-all duration-200 whitespace-nowrap
                ${isActive
                  ? 'bg-gradient-to-r from-[#0B1E4B] to-[#152B6B] text-white shadow-[0_3px_10px_rgba(11,30,75,0.25)]'
                  : 'text-slate-500 hover:text-[#0B1E4B] hover:bg-slate-50'
                }
              `}
            >
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* ── Search ── */}
      <div className="mb-[16px]">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder={`Search in ${activeLabel}…`}
        />
      </div>

      {/* ── Table ── */}
      <Table
        columns={columns}
        data={forms}
        loading={loading}
        emptyText={`No ${activeLabel} forms found`}
      />

      {/* ── View Modal ── */}
      <Modal
        isOpen={viewOpen}
        onClose={() => setViewOpen(false)}
        title="Member Application Details"
        size="md"
      >
        {selected && (
          <div className="flex flex-col gap-[12px]">

            {/* Top name banner */}
            <div className="flex items-center gap-[12px] bg-gradient-to-r from-[#0B1E4B] to-[#152B6B] rounded-[12px] p-[14px] mb-[4px]">
              <div className="w-[42px] h-[42px] rounded-full bg-white/20 flex items-center justify-center text-white text-[18px] font-extrabold flex-shrink-0">
                {selected.name?.[0]?.toUpperCase() || 'U'}
              </div>
              <div>
                <p className="text-[15px] font-extrabold text-white m-0">{selected.name}</p>
                <p className="text-[12px] text-white/70 m-0">{selected.email}</p>
              </div>
              <div className="ml-auto">
                <Badge variant="orange">{selected.memberType}</Badge>
              </div>
            </div>

            {/* Details grid */}
            <div className="grid grid-cols-2 gap-[10px]">
              <DetailRow label="Phone"       value={selected.phone}      />
              <DetailRow label="Age"         value={selected.age}        />
              <DetailRow label="Gender"      value={selected.gender}     />
              <DetailRow label="Member Type" value={selected.memberType} />
              <DetailRow label="UTR Number"  value={selected.utr}        />
              <DetailRow label="Amount Paid" value={selected.amount}     />
              <DetailRow label="Submitted"   value={formatDate(selected.submittedAt)} />
            </div>

            {/* Address - full width */}
            <div className="bg-slate-50 rounded-[10px] p-[12px]">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.8px] m-0">Address</p>
              <p className="text-[13px] font-semibold text-slate-700 m-0 mt-[3px]">{selected.address || '—'}</p>
            </div>

            {/* Message - full width */}
            <div className="bg-slate-50 rounded-[10px] p-[12px]">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.8px] m-0">Message</p>
              <p className="text-[13px] font-semibold text-slate-700 m-0 mt-[3px] whitespace-pre-wrap">{selected.message || '—'}</p>
            </div>

          </div>
        )}
      </Modal>

      {/* ── Confirm Delete ── */}
      <ConfirmDialog
        isOpen={delOpen}
        onClose={() => setDelOpen(false)}
        onConfirm={handleDelete}
        loading={deleting}
        message="Delete this membership application? This action cannot be undone."
      />
    </div>
  )
}