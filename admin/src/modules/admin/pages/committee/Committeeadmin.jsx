import { useState, useEffect, useRef, useCallback } from "react"
import { Ic, Spin, Toast, ConfirmDialog, Btn } from "./Committeeutils"
import { CommitteeModal, MembersPanel, CommitteeItem } from "./CommitteeComponents"

export default function CommitteeAdmin() {
  const [data,       setData]       = useState([])
  const [loading,    setLoading]    = useState(true)
  const [selected,   setSelected]   = useState(null)
  const [search,     setSearch]     = useState("")
  const [showModal,  setShowModal]  = useState(false)
  const [editTarget, setEditTarget] = useState(null)
  const [saving,     setSaving]     = useState(false)
  const [confirmDel, setConfirmDel] = useState(null)
  const [delBusy,    setDelBusy]    = useState(false)
  const [toast,      setToast]      = useState(null)
  const [mobileView, setMobileView] = useState("sidebar")
  const timer = useRef()

  const showToast = useCallback((msg, type="success") => {
    clearTimeout(timer.current)
    setToast({ msg, type })
    timer.current = setTimeout(() => setToast(null), 3000)
  }, [])

  const refresh = useCallback(async () => {
    try {
      const d = await API.getAll()
      setData(d)
      setSelected(prev => prev ? (d.find(c => c._id===prev._id) || d[0] || null) : (d[0] || null))
    } catch { showToast("Failed to load", "error") }
  }, [showToast])

  useEffect(() => { refresh().finally(() => setLoading(false)) }, [refresh])

  const handleSave = async (form) => {
    setSaving(true)
    try {
      editTarget ? await API.update(editTarget._id, form) : await API.create(form)
      await refresh()
      showToast(editTarget ? "Committee updated!" : "Committee created!")
      setShowModal(false)
      setEditTarget(null)
    } catch { showToast("Save failed", "error") }
    finally { setSaving(false) }
  }

  const handleDel = async () => {
    setDelBusy(true)
    try { await API.delete(confirmDel._id); await refresh(); showToast("Deleted."); setConfirmDel(null) }
    catch { showToast("Delete failed", "error") }
    finally { setDelBusy(false) }
  }

  const handleMemberAdded   = async (cid, d)     => { await API.addMember(cid, d);         await refresh(); showToast("Member added!") }
  const handleMemberDel     = async (cid, mid)    => { await API.deleteMember(cid, mid);     await refresh(); showToast("Member removed.") }
  const handleMemberUpdated = async (cid, mid, d) => { await API.updateMember(cid, mid, d);  await refresh(); showToast("Member updated!") }

  const selectCommittee = (c) => { setSelected(c); setMobileView("detail") }

  const filtered = data.filter(c =>
    c.label.toLowerCase().includes(search.toLowerCase()) ||
    c.role.toLowerCase().includes(search.toLowerCase())
  )
  const totalM = data.reduce((a, c) => a + c.members.length, 0)

  return (
    <>
      <style>{`
        @keyframes toastIn { from { opacity:0; transform:translateY(10px) } to { opacity:1; transform:translateY(0) } }
        .admin-scroll::-webkit-scrollbar { width: 5px; }
        .admin-scroll::-webkit-scrollbar-track { background: transparent; }
        .admin-scroll::-webkit-scrollbar-thumb { background: #E2E8F0; border-radius: 10px; }
        @keyframes spin { to { transform: rotate(360deg); } }
        .animate-spin { animation: spin .8s linear infinite; }
      `}</style>

      <div className="min-h-screen bg-slate-50 font-[Plus_Jakarta_Sans,sans-serif]">

        {/* TOP BAR */}
        <header className="bg-white border-b border-slate-100 h-16 !px-4 sm:!px-7 flex items-center gap-4 shadow-[0_1px_8px_rgba(0,0,0,.04)]">
          {mobileView==="detail" && (
            <button
              onClick={() => setMobileView("sidebar")}
              className="sm:hidden w-9 h-9 rounded-xl border-none bg-slate-100 flex items-center justify-center text-slate-600 cursor-pointer flex-shrink-0"
            >
              <div className="w-5 h-5"><Ic.Back /></div>
            </button>
          )}
          <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 shadow-[0_4px_14px_rgba(240,90,26,.32)]" style={{background:"linear-gradient(135deg,#F05A1A,#FF7D42)"}}>
            <div className="text-white w-5 h-5"><Ic.Users /></div>
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="!m-0 text-sm sm:text-base font-extrabold text-[#0B1E4B] truncate">Committee Management</h1>
            <p className="!m-0 text-[11px] text-slate-400 hidden sm:block">{data.length} committees · {totalM} total members</p>
          </div>
          <Btn primary onClick={() => { setEditTarget(null); setShowModal(true) }}>
            <div className="w-3.5 h-3.5"><Ic.Plus /></div>
            <span className="hidden sm:inline">Add Committee</span>
            <span className="sm:hidden">Add</span>
          </Btn>
        </header>

        {/* LAYOUT */}
        <div className="flex" style={{height:"calc(100vh - 64px)"}}>

          {/* SIDEBAR */}
          <aside className={`${mobileView==="sidebar" ? "flex" : "hidden"} sm:flex w-full sm:w-[296px] flex-shrink-0 border-r border-slate-100 bg-white flex-col overflow-hidden`}>
            <div className="!px-3.5 !py-3 border-b border-slate-100 flex-shrink-0">
              <div className="flex items-center gap-2 !px-3 !py-2 rounded-xl bg-slate-50 border-[1.5px] border-slate-200">
                <div className="text-slate-400 w-3.5 h-3.5 flex-shrink-0"><Ic.Search /></div>
                <input
                  type="text" placeholder="Search committees…" value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="flex-1 border-none bg-transparent outline-none text-[13px] text-slate-600 font-[Plus_Jakarta_Sans,sans-serif] !p-0"
                />
                {search && (
                  <button onClick={() => setSearch("")} className="border-none bg-transparent cursor-pointer text-slate-400 flex !p-0">
                    <div className="w-3 h-3"><Ic.X /></div>
                  </button>
                )}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto !p-2.5 admin-scroll">
              {loading ? (
                <div className="flex justify-center !pt-10"><Spin size={24}/></div>
              ) : filtered.length===0 ? (
                <div className="text-center !px-4 !py-10">
                  <p className="!m-0 text-[13px] text-slate-400 font-[Plus_Jakarta_Sans,sans-serif]">{search ? "No matches" : "No committees yet"}</p>
                </div>
              ) : filtered.map(c => (
                <CommitteeItem
                  key={c._id} committee={c}
                  active={selected?._id===c._id}
                  onClick={() => selectCommittee(c)}
                  onEdit={() => { setEditTarget(c); setShowModal(true) }}
                  onDelete={() => setConfirmDel(c)}
                />
              ))}
            </div>

            <div className="!px-4 !py-2.5 border-t border-slate-100 bg-slate-50 flex-shrink-0">
              <p className="!m-0 text-[11px] text-slate-400 font-[Plus_Jakarta_Sans,sans-serif]">Showing {filtered.length} of {data.length}</p>
            </div>
          </aside>

          {/* RIGHT PANEL */}
          <main className={`${mobileView==="detail" ? "flex" : "hidden"} sm:flex flex-1 overflow-y-auto bg-slate-50 admin-scroll flex-col`}>
            {!selected && !loading ? (
              <div className="h-full flex flex-col items-center justify-center gap-3.5 !p-8">
                <div className="w-16 h-16 rounded-[20px] bg-slate-100 flex items-center justify-center text-slate-300">
                  <div className="w-8 h-8"><Ic.Users /></div>
                </div>
                <p className="!m-0 text-base font-bold text-slate-400 font-[Plus_Jakarta_Sans,sans-serif]">Select a committee</p>
                <p className="!m-0 text-[13px] text-slate-300 font-[Plus_Jakarta_Sans,sans-serif]">Choose from the sidebar to manage its members</p>
              </div>
            ) : selected ? (
              <div className="h-full bg-white">
                <MembersPanel
                  key={selected._id}
                  committee={selected}
                  onMemberAdded={handleMemberAdded}
                  onMemberDeleted={handleMemberDel}
                  onMemberUpdated={handleMemberUpdated}
                />
              </div>
            ) : null}
          </main>
        </div>

        {/* MODALS */}
        {showModal && (
          <CommitteeModal
            initial={editTarget}
            onSave={handleSave}
            onClose={() => { setShowModal(false); setEditTarget(null) }}
            saving={saving}
          />
        )}
        {confirmDel && (
          <ConfirmDialog
            title="Delete Committee"
            msg={`Delete "${confirmDel.label}" and all its members? This cannot be undone.`}
            busy={delBusy}
            onConfirm={handleDel}
            onCancel={() => setConfirmDel(null)}
          />
        )}
        <Toast data={toast}/>
      </div>
    </>
  )
}

// ════════════════════════════════════════════════════════════════════════════════
//  MOCK API — Replace with your real API calls (axios/fetch)
// ════════════════════════════════════════════════════════════════════════════════
let _db = [
  {
    _id:"c1", slug:"managing-community", label:"Managing Community", shortLabel:"Managing",
    icon:"🏛️", role:"Strategic Leadership & Governance",
    description:"The apex governing body of UDIISA.", cardVariant:"orange",
    members:[
      { _id:"m1", name:"Deepak Garg",         role:"Member", company:"", image:null },
      { _id:"m2", name:"Manish Gupta",         role:"Member", company:"", image:null },
      { _id:"m3", name:"Shyam Sunder Kochar", role:"Member", company:"", image:null },
    ],
  },
  {
    _id:"c2", slug:"sports-community", label:"Sports Community", shortLabel:"Sports",
    icon:"⚽", role:"Sports Development & Excellence",
    description:"Drives development of sport at all levels under UDIISA.", cardVariant:"lime",
    members:[
      { _id:"m4", name:"Sanjay Bharatwas", role:"Member", company:"", image:null },
      { _id:"m5", name:"Joginder Sharma",  role:"Member", company:"", image:null },
    ],
  },
]
let _nid = 200
const wait = () => new Promise(r => setTimeout(r, 300))

const API = {
  getAll:       async ()           => { await wait(); return JSON.parse(JSON.stringify(_db)) },
  create:       async (d)          => { await wait(); const n={...d,_id:`c${++_nid}`,members:[]}; _db.push(n); return n },
  update:       async (id, d)      => { await wait(); _db=_db.map(c=>c._id===id?{...c,...d}:c); return _db.find(c=>c._id===id) },
  delete:       async (id)         => { await wait(); _db=_db.filter(c=>c._id!==id) },
  addMember:    async (cid, d)     => { await wait(); const m={...d,_id:`m${++_nid}`}; _db=_db.map(c=>c._id===cid?{...c,members:[...c.members,m]}:c); return m },
  updateMember: async (cid,mid, d) => { await wait(); _db=_db.map(c=>c._id===cid?{...c,members:c.members.map(m=>m._id===mid?{...m,...d}:m)}:c) },
  deleteMember: async (cid, mid)   => { await wait(); _db=_db.map(c=>c._id===cid?{...c,members:c.members.filter(m=>m._id!==mid)}:c) },
}