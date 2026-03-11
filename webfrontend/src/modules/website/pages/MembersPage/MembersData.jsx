import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  FaBuilding, FaUserTie, FaStar, FaUsers, FaMapMarkerAlt
} from 'react-icons/fa'
import { MdGroups } from 'react-icons/md'
import { BsPersonFill, BsBuildingsFill, BsShieldFillCheck, BsGem } from 'react-icons/bs'
import { HiSparkles } from 'react-icons/hi'
import {
  getPublicSpecialMembers,
  getPublicGeneralMembers,
} from '../../../../shared/services/publicApi'

/* ═══════════════════════════════════════════
   TABS CONFIG
═══════════════════════════════════════════ */
const TABS = [
  { key: 'special-members', label: 'Special Members', Icon: FaStar,  route: '/members/special-members' },
  { key: 'general-members', label: 'General Members', Icon: FaUsers, route: '/members/general-members' },
]

/* ═══════════════════════════════════════════
   SPECIAL MEMBER SUB-TABS (Diamond / Gold / Silver)
═══════════════════════════════════════════ */
const SPECIAL_TABS = [
  {
    key: 'diamond',
    label: 'Diamond',
    emoji: '💎',
    membershipKey: 'diamond',
    // Tab active colors
    activeBg:     'linear-gradient(135deg, #e8f4ff 0%, #dbeeff 100%)',
    activeBorder: '#5ab4ff',
    activeColor:  '#1565c0',
    activeShadow: '0 4px 20px rgba(90,180,255,0.25)',
    // Card accent
    accentColor:  '#1e88e5',
    accentLight:  '#e3f2fd',
    accentBorder: 'rgba(30,136,229,0.2)',
    accentGlow:   'rgba(30,136,229,0.12)',
    ringFrom:     '#5ab4ff',
    ringTo:       '#1e88e5',
    badgeBg:      '#e3f2fd',
    badgeColor:   '#1565c0',
    badgeBorder:  'rgba(21,101,192,0.2)',
    stripFrom:    '#1e88e5',
    stripTo:      '#5ab4ff',
    dotColor:     '#1e88e5',
    tagLabel:     'Diamond Member',
  },
  {
    key: 'gold',
    label: 'Gold',
    emoji: '🥇',
    membershipKey: 'gold',
    activeBg:     'linear-gradient(135deg, #fffbea 0%, #fff3cc 100%)',
    activeBorder: '#f0b429',
    activeColor:  '#92610a',
    activeShadow: '0 4px 20px rgba(240,180,41,0.25)',
    accentColor:  '#d4900a',
    accentLight:  '#fff8e1',
    accentBorder: 'rgba(212,144,10,0.22)',
    accentGlow:   'rgba(212,144,10,0.1)',
    ringFrom:     '#FFD700',
    ringTo:       '#f0a500',
    badgeBg:      '#fff8e1',
    badgeColor:   '#92610a',
    badgeBorder:  'rgba(146,97,10,0.2)',
    stripFrom:    '#f0a500',
    stripTo:      '#FFD700',
    dotColor:     '#d4900a',
    tagLabel:     'Gold Member',
  },
  {
    key: 'silver',
    label: 'Silver',
    emoji: '🥈',
    membershipKey: 'silver',
    activeBg:     'linear-gradient(135deg, #f5f5f7 0%, #ebebef 100%)',
    activeBorder: '#9e9e9e',
    activeColor:  '#424242',
    activeShadow: '0 4px 20px rgba(100,100,100,0.18)',
    accentColor:  '#616161',
    accentLight:  '#f5f5f5',
    accentBorder: 'rgba(97,97,97,0.18)',
    accentGlow:   'rgba(97,97,97,0.08)',
    ringFrom:     '#bdbdbd',
    ringTo:       '#9e9e9e',
    badgeBg:      '#f5f5f5',
    badgeColor:   '#424242',
    badgeBorder:  'rgba(66,66,66,0.15)',
    stripFrom:    '#9e9e9e',
    stripTo:      '#bdbdbd',
    dotColor:     '#757575',
    tagLabel:     'Silver Member',
  },
]

/* ═══════════════════════════════════════════
   INJECTED CSS
═══════════════════════════════════════════ */
const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Bebas+Neue&display=swap');

@keyframes card-shine {
  0%   { transform: translateX(-120%) skewX(-15deg); }
  100% { transform: translateX(280%)  skewX(-15deg); }
}
@keyframes spTabFade {
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes ringPulse {
  0%,100% { box-shadow: 0 0 0 0 rgba(90,180,255,0); }
  50%     { box-shadow: 0 0 0 6px rgba(90,180,255,0.12); }
}
@keyframes barSlide {
  from { transform: scaleX(0); }
  to   { transform: scaleX(1); }
}

.ccard { transition: transform .38s cubic-bezier(.34,1.2,.64,1), box-shadow .38s ease; }
.ccard:hover { transform: translateY(-10px) !important; }

/* special sub-tab card hover */
.sp3card {
  transition: transform .32s cubic-bezier(.34,1.2,.64,1),
              box-shadow .32s ease,
              border-color .32s ease;
}
.sp3card:hover {
  transform: translateY(-8px) scale(1.02);
}
.sp3card:hover .sp3bar {
  animation: barSlide .35s ease forwards;
}
.sp3card:hover .sp3shine {
  animation: card-shine .7s ease forwards;
}

.trow:hover { background: #FFF6F0 !important; }
.trow:hover .sr-cell { color: #F05A1A !important; }

.dot-bg {
  background-image: radial-gradient(circle, rgba(11,30,75,0.055) 1px, transparent 1px);
  background-size: 26px 26px;
}

/* Special sub-tab pill button */
.sp3tab-btn {
  position: relative;
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 11px 24px;
  border-radius: 14px;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  font-family: 'Plus Jakarta Sans', sans-serif;
  letter-spacing: 0.4px;
  transition: all .28s cubic-bezier(.34,1.4,.64,1);
  overflow: hidden;
  white-space: nowrap;
}
.sp3tab-btn:hover {
  transform: translateY(-2px);
}
`

/* ═══════════════════════════════════════════
   SECTION HEADING
═══════════════════════════════════════════ */
const SectionHeading = ({ white, orange, Icon, sub }) => (
  <div style={{ marginBottom: 28 }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6 }}>
      <div style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(240,90,26,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <Icon style={{ color: '#F05A1A', fontSize: 18 }} />
      </div>
      <h2 style={{ margin: 0, lineHeight: 1, fontFamily: "'Bebas Neue',cursive", fontSize: 'clamp(26px,4vw,42px)', letterSpacing: 2 }}>
        <span style={{ color: '#0B1E4B' }}>{white} </span>
        <span style={{ color: '#F05A1A' }}>{orange}</span>
      </h2>
    </div>
    {sub && <p style={{ margin: '0 0 0 52px', color: '#64748b', fontSize: 14, lineHeight: 1.65 }}>{sub}</p>}
  </div>
)

/* ═══════════════════════════════════════════
   SPECIAL SUB-TAB BUTTON
═══════════════════════════════════════════ */
const SpecialTabBtn = ({ tab, isActive, onClick, count }) => (
  <button
    className="sp3tab-btn"
    onClick={onClick}
    style={{
      background: isActive ? tab.activeBg : '#fff',
      border: isActive ? `1.5px solid ${tab.activeBorder}` : '1.5px solid #e2e8f0',
      color: isActive ? tab.activeColor : '#64748b',
      boxShadow: isActive ? tab.activeShadow : '0 2px 8px rgba(11,30,75,0.05)',
    }}
  >
    {/* Shimmer on active */}
    {isActive && (
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.5) 50%, transparent 65%)',
        animation: 'card-shine 2.5s ease-in-out infinite',
        pointerEvents: 'none',
      }} />
    )}
    <span style={{ fontSize: 18, position: 'relative', zIndex: 1 }}>{tab.emoji}</span>
    <span style={{ position: 'relative', zIndex: 1, fontWeight: 800 }}>{tab.label}</span>
    {/* count badge */}
    <span style={{
      position: 'relative', zIndex: 1,
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      minWidth: 22, height: 22, borderRadius: 999,
      background: isActive ? `${tab.activeBorder}22` : '#f1f5f9',
      border: isActive ? `1px solid ${tab.activeBorder}55` : '1px solid #e2e8f0',
      color: isActive ? tab.activeColor : '#94a3b8',
      fontSize: 10, fontWeight: 800, padding: '0 6px',
    }}>
      {count}
    </span>
  </button>
)

/* ═══════════════════════════════════════════
   PREMIUM MEMBER CARD (Diamond / Gold / Silver)
═══════════════════════════════════════════ */
const PremiumMemberCard = ({ member, theme }) => (
  <div
    className="sp3card"
    style={{
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      background: '#fff',
      borderRadius: 22,
      overflow: 'hidden',
      border: `1.5px solid ${theme.accentBorder}`,
      boxShadow: `0 6px 24px ${theme.accentGlow}, 0 2px 8px rgba(11,30,75,0.06)`,
      cursor: 'default',
    }}
  >
    {/* Shine overlay */}
    <div
      className="sp3shine"
      style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.55) 50%, transparent 70%)',
        transform: 'translateX(-120%) skewX(-15deg)',
        pointerEvents: 'none',
        zIndex: 20,
      }}
    />

    {/* Top accent strip */}
    <div style={{
      position: 'absolute', top: 0, left: 0, right: 0, height: 4,
      background: `linear-gradient(90deg, ${theme.stripFrom}, ${theme.stripTo})`,
      zIndex: 2,
    }} />

    {/* Soft tinted top bg */}
    <div style={{
      position: 'absolute', top: 0, left: 0, right: 0, height: 90,
      background: `linear-gradient(180deg, ${theme.accentLight} 0%, transparent 100%)`,
      zIndex: 0,
    }} />

    {/* Corner glow dot */}
    <div style={{
      position: 'absolute', top: 8, right: 8,
      width: 50, height: 50, borderRadius: '50%',
      background: `radial-gradient(circle, ${theme.accentGlow} 0%, transparent 70%)`,
      pointerEvents: 'none', zIndex: 1,
    }} />

    <div style={{
      position: 'relative', zIndex: 10,
      paddingTop: 26, paddingBottom: 22,
      paddingLeft: 16, paddingRight: 16,
      display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%',
    }}>

      {/* PHOTO */}
      <div style={{ position: 'relative', marginBottom: 12 }}>
        {/* Gradient ring */}
        <div style={{
          width: 80, height: 80, borderRadius: '50%', padding: 3,
          background: `linear-gradient(135deg, ${theme.ringFrom}, ${theme.ringTo}, ${theme.ringFrom})`,
          flexShrink: 0,
        }}>
          <div style={{
            width: '100%', height: '100%', borderRadius: '50%',
            overflow: 'hidden', border: '3px solid #fff',
            background: theme.accentLight,
          }}>
            <img
              src={member.img || member.photo}
              alt={member.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block' }}
              onError={e => {
                e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=${theme.ringFrom.replace('#','')}&color=fff&size=200&bold=true`
              }}
            />
          </div>
        </div>

        {/* Category badge on photo */}
        <div style={{
          position: 'absolute', bottom: -2, right: -4,
          width: 24, height: 24, borderRadius: '50%',
          background: `linear-gradient(135deg, ${theme.ringFrom}, ${theme.ringTo})`,
          border: '2.5px solid #fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 11, boxShadow: `0 2px 8px ${theme.accentGlow}`,
        }}>
          {theme.emoji}
        </div>
      </div>

      {/* NAME */}
      <h3 style={{
        margin: '2px 0 3px',
        fontSize: 14.5, fontWeight: 800,
        color: '#0B1E4B',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        lineHeight: 1.2,
      }}>
        {member.name}
      </h3>

      {/* COMPANY */}
      {(member.company || member.organization) && (
        <p style={{
          margin: '0 0 4px',
          fontSize: 11.5, fontWeight: 600,
          color: theme.accentColor,
          lineHeight: 1.3,
          maxWidth: '100%',
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        }}>
          {member.company || member.organization}
        </p>
      )}

      {/* DESIGNATION */}
      <p style={{
        margin: '0 0 14px',
        color: '#94a3b8', fontSize: 11,
        lineHeight: 1.4, fontWeight: 500,
      }}>
        {member.designation || member.role || 'Special Member'}
      </p>

      {/* BADGE PILL */}
      <span style={{
        display: 'inline-flex', alignItems: 'center', gap: 5,
        padding: '4px 13px', borderRadius: 999,
        background: theme.badgeBg,
        border: `1px solid ${theme.badgeBorder}`,
        color: theme.badgeColor,
        fontSize: 9.5, fontWeight: 800,
        letterSpacing: '1.5px', textTransform: 'uppercase',
      }}>
        <span style={{ fontSize: 10 }}>{theme.emoji}</span>
        {theme.tagLabel}
      </span>
    </div>

    {/* Bottom bar — reveals on hover */}
    <div
      className="sp3bar"
      style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 3,
        background: `linear-gradient(90deg, ${theme.stripFrom}, ${theme.stripTo})`,
        transform: 'scaleX(0)', transformOrigin: 'left',
        transition: 'transform .3s ease',
      }}
    />
  </div>
)

/* ═══════════════════════════════════════════
   INDIVIDUAL TABLE
═══════════════════════════════════════════ */
const IndividualTable = ({ data = [] }) => (
  <div style={{ width: '100%', overflowX: 'auto', borderRadius: 18, border: '1.5px solid #e8ecf4', boxShadow: '0 4px 24px rgba(11,30,75,0.08)' }}>
    <div style={{ minWidth: 520 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '52px 1fr 1fr', padding: '13px 22px', background: 'linear-gradient(90deg,#0B1E4B,#1e3a8a)', gap: 10 }}>
        {['#', 'Full Name', 'Company / Organization'].map(h => (
          <div key={h} style={{ fontSize: 10, fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{h}</div>
        ))}
      </div>
      {data.map((m, i) => (
        <div key={m.id} className="trow" style={{ display: 'grid', gridTemplateColumns: '52px 1fr 1fr', padding: '12px 22px', gap: 10, background: i % 2 === 0 ? '#fff' : '#f9fafb', borderBottom: i < data.length - 1 ? '1px solid #f1f5f9' : 'none', transition: 'background .15s' }}>
          <div className="sr-cell" style={{ fontSize: 12.5, fontWeight: 700, color: '#cbd5e1', transition: 'color .15s', fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{i + 1}</div>
          <div style={{ fontSize: 13.5, fontWeight: 700, color: '#0B1E4B', fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{m.name}</div>
          <div style={{ fontSize: 12.5, color: '#64748b', fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{m.company || m.city || '-'}</div>
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
      <div style={{ display: 'grid', gridTemplateColumns: '52px 1fr 1fr', padding: '13px 22px', background: 'linear-gradient(90deg,#0B1E4B,#1e3a8a)', gap: 10 }}>
        {['#', 'Full Name', 'Company / Organization'].map(h => (
          <div key={h} style={{ fontSize: 10, fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{h}</div>
        ))}
      </div>
      {data.map((m, i) => (
        <div key={m.id} className="trow" style={{ display: 'grid', gridTemplateColumns: '52px 1fr 1fr', padding: '12px 22px', gap: 10, background: i % 2 === 0 ? '#fff' : '#f9fafb', borderBottom: i < data.length - 1 ? '1px solid #f1f5f9' : 'none', transition: 'background .15s' }}>
          <div className="sr-cell" style={{ fontSize: 12.5, fontWeight: 700, color: '#cbd5e1', transition: 'color .15s', fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{i + 1}</div>
          <div style={{ fontSize: 13.5, fontWeight: 700, color: '#0B1E4B', fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{m.name}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12.5, color: '#374151', fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
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
  const navigate  = useNavigate()
  const location  = useLocation()

  const [specialMembers,    setSpecialMembers]    = useState([])
  const [individualMembers, setIndividualMembers] = useState([])
  const [corporateMembers,  setCorporateMembers]  = useState([])
  const [loading,  setLoading]  = useState(true)
  const [error,    setError]    = useState(null)

  // Special sub-tab: diamond / gold / silver
  const [specialSub, setSpecialSub] = useState('diamond')
  const [subAnimKey, setSubAnimKey] = useState(0)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)

    Promise.all([
      getPublicSpecialMembers()
        .then(data => { if (!cancelled) setSpecialMembers(Array.isArray(data) ? data : []) }),
      getPublicGeneralMembers('individual')
        .then(data => { if (!cancelled) setIndividualMembers(Array.isArray(data) ? data : []) }),
      getPublicGeneralMembers('corporate')
        .then(data => { if (!cancelled) setCorporateMembers(Array.isArray(data) ? data : []) }),
    ])
      .catch(err => { if (!cancelled) setError(err?.message || 'Failed to load members') })
      .finally(() => { if (!cancelled) setLoading(false) })

    return () => { cancelled = true }
  }, [])

  const getTab = () => {
    if (location.pathname.includes('special-members')) return 'special-members'
    if (location.pathname.includes('general-members')) return 'general-members'
    return 'special-members'
  }

  const [activeTab, setActiveTab] = useState(getTab)
  const [generalSub, setGeneralSub] = useState('individual')

  useEffect(() => { setActiveTab(getTab()) }, [location.pathname])

  const handleTab = (tab) => { setActiveTab(tab.key); navigate(tab.route) }

  // Filter special members by membershipType
  const filteredSpecial = specialMembers.filter(m => {
    const t = (m.membershipType || m.membership_type || m.tag || '').toLowerCase()
    if (specialSub === 'diamond') return t.includes('diamond')
    if (specialSub === 'gold')    return t.includes('gold')
    return t.includes('silver') || (!t.includes('diamond') && !t.includes('gold'))
  })

  const countOf = (key) => specialMembers.filter(m => {
    const t = (m.membershipType || m.membership_type || m.tag || '').toLowerCase()
    if (key === 'diamond') return t.includes('diamond')
    if (key === 'gold')    return t.includes('gold')
    return t.includes('silver') || (!t.includes('diamond') && !t.includes('gold'))
  }).length

  const currentTheme = SPECIAL_TABS.find(t => t.key === specialSub)

  const switchSpecialTab = (key) => {
    setSpecialSub(key)
    setSubAnimKey(k => k + 1)
  }

  return (
    <div style={{ minHeight: '100vh', background: '#F4F6FB', fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
      <style>{STYLES}</style>
      <style>{`
        .sp3grid { grid-template-columns: repeat(5, 1fr); }
        @media(max-width:1200px){ .sp3grid{ grid-template-columns: repeat(4,1fr) !important; } }
        @media(max-width:960px){  .sp3grid{ grid-template-columns: repeat(3,1fr) !important; } }
        @media(max-width:640px){  .sp3grid{ grid-template-columns: repeat(2,1fr) !important; } }
        @media(max-width:400px){  .sp3grid{ grid-template-columns: 1fr !important; } }
      `}</style>

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

            {/* ── 3 SUB-TABS: Diamond / Gold / Silver ── */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 10,
              flexWrap: 'wrap', marginBottom: 28,
            }}>
              {SPECIAL_TABS.map(tab => (
                <SpecialTabBtn
                  key={tab.key}
                  tab={tab}
                  isActive={specialSub === tab.key}
                  onClick={() => switchSpecialTab(tab.key)}
                  count={loading ? '…' : countOf(tab.key)}
                />
              ))}

              {/* Total count */}
              <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 600, color: '#94a3b8' }}>
                <FaStar style={{ color: '#F05A1A', fontSize: 11 }} />
                {loading ? '…' : specialMembers.length} Total Special Members
              </div>
            </div>

            {/* Context banner */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '10px 16px', borderRadius: 12, marginBottom: 24,
              background: `linear-gradient(90deg, ${currentTheme.accentLight}, rgba(255,255,255,0))`,
              border: `1px solid ${currentTheme.accentBorder}`,
              transition: 'all 0.3s ease',
            }}>
              <span style={{ fontSize: 16 }}>{currentTheme.emoji}</span>
              <span style={{ fontSize: 12.5, color: '#475569', fontWeight: 500 }}>
                Showing <strong style={{ color: currentTheme.accentColor }}>{currentTheme.label} Members</strong> — {
                  specialSub === 'diamond' ? 'Our most prestigious patrons with highest level of contribution.' :
                  specialSub === 'gold'    ? 'Gold level patrons who significantly support our sports initiatives.' :
                  'Silver level members who actively contribute to our sports community.'
                }
              </span>
            </div>

            {/* ── CARDS GRID ── */}
            {loading ? (
              <div style={{ padding: 60, textAlign: 'center', color: '#64748b', fontSize: 14 }}>
                <div style={{ fontSize: 32, marginBottom: 10 }}>{currentTheme.emoji}</div>
                Loading members…
              </div>
            ) : filteredSpecial.length === 0 ? (
              <div style={{ padding: 60, textAlign: 'center', color: '#94a3b8', fontSize: 14 }}>
                <div style={{ fontSize: 40, marginBottom: 10 }}>{currentTheme.emoji}</div>
                No {currentTheme.label} members found.
              </div>
            ) : (
              <div
                key={subAnimKey}
                className="sp3grid"
                style={{
                  display: 'grid', gap: 18,
                  animation: 'spTabFade 0.35s ease both',
                }}
              >
                {filteredSpecial.map(m => (
                  <PremiumMemberCard key={m.id} member={m} theme={currentTheme} />
                ))}
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

            {generalSub === 'individual'
              ? <IndividualTable data={individualMembers} />
              : <CorporateTable  data={corporateMembers}  />
            }
          </div>
        )}

      </div>
    </div>
  )
}

export default MembersData