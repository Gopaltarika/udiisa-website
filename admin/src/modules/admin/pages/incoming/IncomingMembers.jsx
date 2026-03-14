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
  { key: 'individual',  label: 'Individual Players'    },
  { key: 'player',      label: 'Individual Patron'     },
  { key: 'corporate',   label: 'Lifetime Corporate'    },
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

const hasValue = (value) => {
  if (value === null || value === undefined) return false
  const str = String(value).trim()
  return str !== '' && str !== '—'
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
  const isCorporateTab = activeTab === 'corporate'

  // ── Reset search when tab changes ──
  useEffect(() => { setSearch('') }, [activeTab])

  // ── Fetch data ──
  useEffect(() => {
    let mounted = true
    const load = async () => {
      setLoading(true)
      try {
        const params = { category: activeTab, ...(dSearch ? { search: dSearch } : {}) }
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
          membershipType: item.membershipType                || '',
          formType:     item.formType                        || '',
          category:     item.category                        || '',
          address:      item.address                         || '—',
          companyName:  item.companyName                     || '',
          aadharNumber: item.aadharNumber                    || '',
          panNumber:    item.panNumber                       || '',
          qualification:item.qualification                   || '',
          sportsInterest:item.sportsInterest                 || '',
          message:      item.message      || item.msg        || '—',
          utr:          item.utr          || item.utrNumber  || '—',
          amount:       item.amount                          || '—',
          paymentSender:item.paymentSender                   || '',
          designation:  item.designation                     || '',
          organization: item.organization                    || '',
          linkedin:     item.linkedin                        || '',
          contribution: item.contribution                    || '',
          termsAccepted: item.termsAccepted ? 'Yes' : '',
          photo:        item.photo                           || null,
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
      key: 'memberType', label: isCorporateTab ? 'Turnover Slab' : 'Member Type',
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
            {(() => {
              const detailRows = [
                { label: 'Phone', value: selected.phone },
                { label: 'Age', value: selected.age },
                { label: 'Gender', value: selected.gender },
                { label: isCorporateTab ? 'Turnover Slab' : 'Member Type', value: selected.memberType || selected.membershipType },
                { label: isCorporateTab ? 'Membership Plan' : 'Membership Type', value: selected.membershipType },
                { label: 'Category', value: selected.category },
                { label: 'UTR Number', value: selected.utr },
                { label: 'Amount Paid', value: selected.amount },
                { label: 'Payment Sender', value: selected.paymentSender },
                { label: 'Company Name', value: selected.companyName },
                { label: 'Organization', value: selected.organization },
                { label: 'Designation', value: selected.designation },
                { label: 'Qualification', value: selected.qualification },
                { label: 'Sports Interest', value: selected.sportsInterest },
                { label: 'Aadhaar Number', value: selected.aadharNumber },
                { label: 'PAN Number', value: selected.panNumber },
                { label: 'LinkedIn', value: selected.linkedin },
                { label: 'Contribution', value: selected.contribution },
                { label: 'Terms Accepted', value: selected.termsAccepted },
                { label: 'Form Type', value: selected.formType },
                { label: 'Submitted', value: formatDate(selected.submittedAt) },
              ].filter(row => hasValue(row.value))

              return (
                <>

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
              {detailRows.map((row) => (
                <DetailRow key={row.label} label={row.label} value={row.value} />
              ))}
            </div>

            {/* Address - full width */}
            <div className="bg-slate-50 rounded-[10px] p-[12px]">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.8px] m-0">Address</p>
              <p className="text-[13px] font-semibold text-slate-700 m-0 mt-[3px]">{selected.address || '—'}</p>
            </div>

            {/* Photo - full width */}
            {selected.photo && (
              <div className="bg-slate-50 rounded-[10px] p-[12px]">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.8px] m-0 mb-[6px]">Uploaded Photo</p>
                <img
                  src={selected.photo}
                  alt={`${selected.name} profile`}
                  className="w-[96px] h-[96px] rounded-[10px] object-cover border border-slate-200"
                />
              </div>
            )}

            {/* Message - full width */}
            <div className="bg-slate-50 rounded-[10px] p-[12px]">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.8px] m-0">Message</p>
              <p className="text-[13px] font-semibold text-slate-700 m-0 mt-[3px] whitespace-pre-wrap">{selected.message || '—'}</p>
            </div>
                </>
              )
            })()}

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