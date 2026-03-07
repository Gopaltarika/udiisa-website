import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  FaBuilding, FaUserTie, FaStar, FaUsers, FaMapMarkerAlt
} from 'react-icons/fa'
import { MdGroups } from 'react-icons/md'
import { BsPersonFill, BsBuildingsFill, BsShieldFillCheck } from 'react-icons/bs'
import { HiSparkles } from 'react-icons/hi'
import {
  getPublicSpecialMembers,
  getPublicGeneralMembers,
} from '../../../../shared/services/publicApi'

/* ═══════════════════════════════════════════
   DATA — loaded from API in MembersData
═══════════════════════════════════════════ */
const specialMembersFallback = []
const individualMembersFallback = []
const corporateMembersFallback = []

const TABS = [
  { key: 'special-members',    label: 'Special Members',    Icon: FaStar,    route: '/members/special-members' },
  { key: 'general-members',    label: 'General Members',    Icon: FaUsers,   route: '/members/general-members' },
]

/* ═══════════════════════════════════════════
   INJECTED CSS (self-contained, no config changes)
═══════════════════════════════════════════ */
const STYLES = `

/* Shine sweep on committee card */
@keyframes card-shine {
  0%   { transform: translateX(-120%) skewX(-15deg); }
  100% { transform: translateX(280%)  skewX(-15deg); }
}
.ccard { transition: transform .38s cubic-bezier(.34,1.2,.64,1), box-shadow .38s ease, border-color .38s ease; }
.ccard:hover { transform: translateY(-10px) !important; }
.ccard:hover .cshine { animation: card-shine .75s ease forwards; }
.ccard:hover .cimg   { transform: scale(1.08) !important; }
.ccard:hover .cbar   { opacity: 1 !important; }

/* Table row hover */
.trow:hover { background: #FFF6F0 !important; }
.trow:hover .sr-cell { color: #F05A1A !important; }

/* Special card hover */
.spcard { transition: transform .3s cubic-bezier(.34,1.2,.64,1), box-shadow .3s ease, border-color .3s ease; }
.spcard:hover { transform: translateY(-8px); box-shadow: 0 22px 52px rgba(11,30,75,.12), 0 4px 14px rgba(240,90,26,.1) !important; border-color: rgba(240,90,26,.22) !important; }
.spcard:hover .sp-badge { background: #F05A1A !important; color: #fff !important; border-color: #F05A1A !important; }
.spcard:hover .spbar { transform: scaleX(1) !important; }

/* dot-grid bg texture */
.dot-bg {
  background-image: radial-gradient(circle, rgba(11,30,75,0.055) 1px, transparent 1px);
  background-size: 26px 26px;
}
`

/* ═══════════════════════════════════════════
   SECTION HEADING
═══════════════════════════════════════════ */
const SectionHeading = ({ white, orange, Icon, sub }) => (
  <div style={{ marginBottom: 32 }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6 }}>
      <div style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(240,90,26,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <Icon style={{ color: '#F05A1A', fontSize: 18 }} />
      </div>
      <h2 style={{ margin: 0, lineHeight: 1, fontFamily: "'Bebas Neue',cursive", fontSize: 'clamp(26px,4vw,42px)', letterSpacing: 2 }}>
        <span style={{ color: '#0B1E4B' }}>{white} </span>
        <span style={{ color: '#F05A1A' }}>{orange}</span>
      </h2>
      <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg,rgba(240,90,26,.2),transparent)', marginLeft: 8, display: 'none' }} className="sm-show" />
    </div>
    {sub && <p style={{ margin: '0 0 0 52px', color: '#64748b', fontSize: 14, lineHeight: 1.65 }}>{sub}</p>}
  </div>
)


/* ═══════════════════════════════════════════
   SPECIAL CARD
═══════════════════════════════════════════ */
const SpecialCard = ({ member }) => (
  <div className="spcard" style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', background: '#fff', borderRadius: 20, overflow: 'hidden', border: '1.5px solid #f1f5f9', boxShadow: '0 4px 16px rgba(11,30,75,0.07)', cursor: 'default' }}>
    {/* Navy top strip */}
    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 72, background: 'linear-gradient(135deg,#0B1E4B,#1e3a8a)', zIndex: 0 }} />
    <div style={{ position: 'absolute', top: 0, right: 0, width: 80, height: 80, background: 'radial-gradient(circle,rgba(240,90,26,0.22) 0%,transparent 70%)', zIndex: 1, pointerEvents: 'none' }} />

    <div style={{ position: 'relative', zIndex: 10, paddingTop: 28, paddingLeft: 18, paddingRight: 18, paddingBottom: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      {/* Photo with gradient ring */}
      <div style={{ position: 'relative', marginBottom: 10 }}>
        <div style={{ width: 80, height: 80, borderRadius: '50%', padding: 3, background: 'linear-gradient(135deg,#F05A1A,#FF9D42)' }}>
          <div style={{ width: '100%', height: '100%', borderRadius: '50%', overflow: 'hidden', border: '3px solid #fff' }}>
            <img src={member.img} alt={member.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block', transition: 'transform .4s' }}
              onError={e => { e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=F05A1A&color=fff&size=200` }}
            />
          </div>
        </div>
        {/* Star badge */}
        <div style={{ position: 'absolute', bottom: -2, right: -2, width: 22, height: 22, borderRadius: '50%', background: '#F05A1A', border: '2.5px solid #fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <FaStar style={{ color: '#fff', fontSize: 8 }} />
        </div>
      </div>

      <h3 style={{ margin: '4px 0 3px', fontSize: 14.5, fontWeight: 800, color: '#0B1E4B', fontFamily: "'Plus Jakarta Sans',sans-serif", lineHeight: 1.2 }}>
        {member.name}
      </h3>
      <p style={{ margin: '0 0 12px', color: '#94a3b8', fontSize: 11.5, lineHeight: 1.4 }}>{member.designation}</p>

      <span className="sp-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '4px 12px', borderRadius: 999, background: '#FFF3EC', border: '1px solid rgba(240,90,26,0.2)', color: '#F05A1A', fontSize: 9.5, fontWeight: 800, letterSpacing: '1.5px', textTransform: 'uppercase', transition: 'all .2s' }}>
        <FaStar style={{ fontSize: 7 }} /> Special Member
      </span>
    </div>

    {/* Bottom bar */}
    <div className="spbar" style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg,#F05A1A,#FF7D42)', transform: 'scaleX(0)', transformOrigin: 'left', transition: 'transform .3s' }} />
  </div>
)

/* ═══════════════════════════════════════════
   INDIVIDUAL TABLE
═══════════════════════════════════════════ */
const IndividualTable = ({ data = [] }) => (
  <div style={{ width: '100%', overflowX: 'auto', borderRadius: 18, border: '1.5px solid #e8ecf4', boxShadow: '0 4px 24px rgba(11,30,75,0.08)' }}>
    <div style={{ minWidth: 520 }}>
      {/* Header */}
      <div style={{ display: 'grid', gridTemplateColumns: '52px 1fr 1fr 1fr', padding: '13px 22px', background: 'linear-gradient(90deg,#0B1E4B,#1e3a8a)', gap: 10 }}>
        {['#', 'Full Name', 'COMPANY / ORGANIZATION'].map(h => (
          <div key={h} style={{ fontSize: 10, fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{h}</div>
        ))}
      </div>
      {/* Rows */}
      {data.map((m, i) => (
        <div key={m.id} className="trow" style={{ display: 'grid', gridTemplateColumns: '52px 1fr 1fr 1fr', padding: '12px 22px', gap: 10, background: i % 2 === 0 ? '#fff' : '#f9fafb', borderBottom: i < data.length - 1 ? '1px solid #f1f5f9' : 'none', transition: 'background .15s' }}>
          <div className="sr-cell" style={{ fontSize: 12.5, fontWeight: 700, color: '#cbd5e1', transition: 'color .15s', fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{i + 1}</div>
          <div style={{ fontSize: 13.5, fontWeight: 700, color: '#0B1E4B', fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{m.name}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12.5, color: '#64748b', fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
            {m.city}
          </div>
        </div>
      ))}
    </div>
  </div>
)

/* ═══════════════════════════════════════════
   CORPORATE TABLE
═══════════════════════════════════════════ */
const CorporateTable = ({ data = [] }) => (
  <div style={{ width: '100%', overflowX: 'auto', borderRadius: 18, border: '1.5px solid #e8ecf4', boxShadow: '0 4px 24px rgba(11,30,75,0.08)' }}>
    <div style={{ minWidth: 540 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '52px 1fr 1fr 1fr', padding: '13px 22px', background: 'linear-gradient(90deg,#0B1E4B,#1e3a8a)', gap: 10 }}>
        {['#', 'Full Name', 'COMPANY / ORGANIZATION'].map(h => (
          <div key={h} style={{ fontSize: 10, fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{h}</div>
        ))}
      </div>
      {data.map((m, i) => (
        <div key={m.id} className="trow" style={{ display: 'grid', gridTemplateColumns: '52px 1fr 1fr 1fr', padding: '12px 22px', gap: 10, background: i % 2 === 0 ? '#fff' : '#f9fafb', borderBottom: i < data.length - 1 ? '1px solid #f1f5f9' : 'none', transition: 'background .15s' }}>
          <div className="sr-cell" style={{ fontSize: 12.5, fontWeight: 700, color: '#cbd5e1', transition: 'color .15s', fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{i + 1}</div>
          <div style={{ fontSize: 13.5, fontWeight: 700, color: '#0B1E4B', fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{m.name}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12.5, color: '#374151', overflow: 'hidden', fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
            <FaBuilding style={{ color: '#F05A1A', fontSize: 9, flexShrink: 0 }} />
            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{m.company}</span>
          </div>
        </div>
      ))}
    </div>
  </div>
)

/* ═══════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════ */
const MembersData = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [specialMembers, setSpecialMembers] = useState(specialMembersFallback)
  const [individualMembers, setIndividualMembers] = useState(individualMembersFallback)
  const [corporateMembers, setCorporateMembers] = useState(corporateMembersFallback)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)
    Promise.all([
      getPublicSpecialMembers().then((data) => (cancelled ? null : setSpecialMembers(Array.isArray(data) ? data : []))),
      getPublicGeneralMembers('individual').then((data) => (cancelled ? null : setIndividualMembers(Array.isArray(data) ? data : []))),
      getPublicGeneralMembers('corporate').then((data) => (cancelled ? null : setCorporateMembers(Array.isArray(data) ? data : []))),
    ]).catch((err) => {
      if (!cancelled) setError(err?.message || 'Failed to load members')
    }).finally(() => {
      if (!cancelled) setLoading(false)
    })
    return () => { cancelled = true }
  }, [])

  const getTab = () => {
    if (location.pathname.includes('special-members')) return 'special-members'
    if (location.pathname.includes('general-members'))  return 'general-members'
    return 'managing-committee'
  }

  const [activeTab,  setActiveTab]  = useState(getTab)
  const [generalSub, setGeneralSub] = useState('individual')

  useEffect(() => { setActiveTab(getTab()) }, [location.pathname])

  const handleTab = (tab) => { setActiveTab(tab.key); navigate(tab.route) }

  return (
    <div style={{ minHeight: '100vh', background: '#F4F6FB', fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
      <style>{STYLES}</style>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '40px 16px' }}>

        {error && (
          <div style={{ marginBottom: 20, padding: '12px 18px', borderRadius: 12, background: '#FEF2F2', border: '1px solid #FECACA', color: '#B91C1C', fontSize: 13, fontWeight: 600 }}>
            {error}
          </div>
        )}

        {/* ── PAGE HEADER ── */}
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '6px 18px', borderRadius: 999, background: 'rgba(240,90,26,0.08)', border: '1px solid rgba(240,90,26,0.18)', color: '#F05A1A', fontSize: 11, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 14 }}>
            <HiSparkles style={{ fontSize: 12 }} /> UDI Sports NGO
          </div>
          <h1 style={{ fontFamily: "'Bebas Neue',cursive", fontSize: 'clamp(36px,6vw,64px)', letterSpacing: 3, lineHeight: 1, color: '#0B1E4B', marginBottom: 12, marginTop: 0 }}>
            OUR <span style={{ color: '#F05A1A' }}>MEMBERS</span>
          </h1>
          <p style={{ color: '#64748b', fontSize: 15, maxWidth: 480, margin: '0 auto', lineHeight: 1.7 }}>
            Meet the dedicated individuals and organizations powering India's grassroots sports revolution.
          </p>
        </div>

        {/* ── MAIN TABS ── */}
        <div style={{ display: 'flex', alignItems: 'center', borderBottom: '2px solid #e2e8f0', marginBottom: 36, overflowX: 'auto', WebkitOverflowScrolling: 'touch', gap: 0 }}>
          {TABS.map(({ key, label, Icon, route }) => {
            const active = activeTab === key
            return (
              <button key={key}
                onClick={() => handleTab({ key, route })}
                style={{
                  position: 'relative', display: 'flex', alignItems: 'center', gap: 7,
                  padding: '12px 20px', whiteSpace: 'nowrap', flexShrink: 0,
                  fontSize: 13, fontWeight: active ? 800 : 600,
                  color: active ? '#F05A1A' : '#64748b',
                  background: 'transparent', border: 'none', cursor: 'pointer',
                  fontFamily: "'Plus Jakarta Sans',sans-serif",
                  transition: 'color .2s',
                }}
                onMouseEnter={e => { if (!active) e.currentTarget.style.color = '#0B1E4B' }}
                onMouseLeave={e => { if (!active) e.currentTarget.style.color = '#64748b' }}
              >
                <Icon style={{ fontSize: 14, color: active ? '#F05A1A' : '#94a3b8', flexShrink: 0, transition: 'color .2s' }} />
                {label}
                {active && <span style={{ position: 'absolute', left: 0, right: 0, bottom: -2, height: 3, background: 'linear-gradient(90deg,#F05A1A,#FF7D42)', borderRadius: '3px 3px 0 0' }} />}
              </button>
            )
          })}
        </div>

        {/* ════════════════════════════════
            SPECIAL MEMBERS
        ════════════════════════════════ */}
        {activeTab === 'special-members' && (
          <div>
            <SectionHeading
              white="Special" orange="Members" Icon={FaStar}
              sub="Distinguished patrons and ambassadors who champion sports excellence and youth development."
            />
            {loading ? (
              <div style={{ padding: 40, textAlign: 'center', color: '#64748b', fontSize: 14 }}>Loading…</div>
            ) : (
            <div style={{ display: 'grid', gap: 18 }} className="special-grid">
              <style>{`
                .special-grid { grid-template-columns: repeat(5,1fr); }
                @media(max-width:1200px){ .special-grid{ grid-template-columns: repeat(4,1fr) !important; } }
                @media(max-width:900px){  .special-grid{ grid-template-columns: repeat(3,1fr) !important; } }
                @media(max-width:580px){  .special-grid{ grid-template-columns: repeat(2,1fr) !important; } }
              `}</style>
              {specialMembers.map(m => <SpecialCard key={m.id} member={m} />)}
            </div>
            )}
          </div>
        )}

        {/* ════════════════════════════════
            GENERAL MEMBERS
        ════════════════════════════════ */}
        {activeTab === 'general-members' && (
          <div>
            <SectionHeading
              white="General" orange="Members" Icon={FaUsers}
              sub="All registered members forming the backbone of UDI Sports NGO across India."
            />

            {/* Sub-tab toggle */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20, flexWrap: 'wrap' }}>
              {[
                { key: 'individual', label: 'Individual Members', SIcon: BsPersonFill,    count: individualMembers.length },
                { key: 'corporate',  label: 'Body Corporate',     SIcon: BsBuildingsFill, count: corporateMembers.length },
              ].map(st => {
                const isSub = generalSub === st.key
                return (
                  <button key={st.key}
                    onClick={() => setGeneralSub(st.key)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 8,
                      padding: '9px 18px', borderRadius: 11, fontSize: 13,
                      fontWeight: isSub ? 800 : 600, cursor: 'pointer',
                      fontFamily: "'Plus Jakarta Sans',sans-serif",
                      background: isSub ? 'linear-gradient(135deg,#0B1E4B,#1e3a8a)' : '#fff',
                      color: isSub ? '#fff' : '#64748b',
                      border: isSub ? '1.5px solid transparent' : '1.5px solid #e2e8f0',
                      boxShadow: isSub ? '0 6px 20px rgba(11,30,75,0.22)' : '0 2px 8px rgba(11,30,75,0.06)',
                      transition: 'all .22s cubic-bezier(.34,1.2,.64,1)',
                    }}
                  >
                    <st.SIcon style={{ fontSize: 13, color: isSub ? '#FFAD5C' : '#94a3b8', flexShrink: 0 }} />
                    {st.label}
                    <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 21, height: 21, borderRadius: '50%', background: isSub ? 'rgba(255,255,255,0.18)' : '#f1f5f9', color: isSub ? '#FFAD5C' : '#94a3b8', fontSize: 10, fontWeight: 800 }}>
                      {st.count}
                    </span>
                  </button>
                )
              })}

              <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 600, color: '#94a3b8' }}>
                <FaUsers style={{ color: '#F05A1A', fontSize: 12 }} />
                {individualMembers.length + corporateMembers.length} Total Members
              </div>
            </div>

            {/* Context banner */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 16px', borderRadius: 12, marginBottom: 20, background: 'linear-gradient(90deg,rgba(240,90,26,0.06),rgba(240,90,26,0.01))', border: '1px solid rgba(240,90,26,0.12)' }}>
              {generalSub === 'individual'
                ? <><BsPersonFill style={{ color: '#F05A1A', fontSize: 14, flexShrink: 0 }} /><span style={{ fontSize: 12.5, color: '#64748b', fontWeight: 500 }}>Showing individual members registered in their personal capacity.</span></>
                : <><BsBuildingsFill style={{ color: '#F05A1A', fontSize: 14, flexShrink: 0 }} /><span style={{ fontSize: 12.5, color: '#64748b', fontWeight: 500 }}>Showing corporate bodies and organizations registered as institutional members.</span></>
              }
            </div>

            {generalSub === 'individual' ? <IndividualTable data={individualMembers} /> : <CorporateTable data={corporateMembers} />}
          </div>
        )}

      </div>
    </div>
  )
}

export default MembersData