import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { FaBuilding, FaMapMarkerAlt } from 'react-icons/fa'
import { MdVerified } from 'react-icons/md'
import { HiSparkles } from 'react-icons/hi'
/* ═══════════════════════════════════════════
   STATIC DATA
═══════════════════════════════════════════ */
const STATIC_DATA = {
  diamond: [
    { id: 1, name: 'Rajesh Kumar Singh',               company: 'RK Industries Ltd'        },
    { id: 2, name: 'Priya Sharma',                             company: 'Sharma Enterprises'},
    { id: 3, name: 'Anil Mehta',         company: 'Mehta Group',              city: 'Pune' },
    { id: 4, name: 'Sunita Verma',       company: 'Verma Foundation',         city: 'Jaipur' },
    { id: 5, name: 'Vikram Patel',       company: 'Patel Corp',               city: 'Ahmedabad' },
    { id: 6, name: 'Neha Gupta',         company: 'Gupta Welfare Trust',      city: 'Lucknow' },
  ],
  gold: [
    { id: 1, name: 'Amit Joshi',         company: 'Joshi Traders',            city: 'Nagpur' },
    { id: 2, name: 'Rekha Nair',         company: 'Nair Exports',             city: 'Kochi' },
    { id: 3, name: 'Suresh Yadav',       company: 'Yadav Sports Club',        city: 'Kanpur' },
    { id: 4, name: 'Pooja Reddy',        company: 'Reddy Foundation',         city: 'Hyderabad' },
    { id: 5, name: 'Manish Tiwari',      company: 'Tiwari & Sons',            city: 'Bhopal' },
  ],
  silver: [
    { id: 1, name: 'Kavita Sharma',      company: 'Sharma Textiles',          city: 'Surat' },
    { id: 2, name: 'Deepak Rao',         company: 'Rao Sports Academy',       city: 'Bangalore' },
    { id: 3, name: 'Anita Desai',        company: 'Desai NGO',                city: 'Vadodara' },
    { id: 4, name: 'Rahul Chandra',      company: 'Chandra Associates',       city: 'Chennai' },
  ],
  dignitaries: [
    { id: 1, name: 'Dr. S.K. Mishra',    company: 'Govt. of India',           city: 'Delhi' },
    { id: 2, name: 'Justice R.P. Saxena',company: 'Allahabad High Court',     city: 'Allahabad' },
    { id: 3, name: 'Dr. Meena Agarwal',  company: 'SAI',                      city: 'Delhi' },
    { id: 4, name: 'Brig. A.K. Chauhan', company: 'Indian Army',              city: 'Dehradun' },
    { id: 5, name: 'Prof. R.N. Tripathi',company: 'Lucknow University',       city: 'Lucknow' },
  ],
  corporate: [
    { id: 1, name: 'Mahendra Singh',     company: 'MS Steel Pvt Ltd',         city: 'Raipur' },
    { id: 2, name: 'Lata Kapoor',        company: 'Kapoor Industries',        city: 'Noida' },
    { id: 3, name: 'Rajiv Bansal',       company: 'Bansal Infra Ltd',         city: 'Gurgaon' },
    { id: 4, name: 'Sonia Malhotra',     company: 'Malhotra & Associates',    city: 'Chandigarh' },
    { id: 5, name: 'Harish Dubey',       company: 'Dubey Constructions',      city: 'Indore' },
    { id: 6, name: 'Nisha Pandey',       company: 'Pandey Welfare Group',     city: 'Varanasi' },
  ],
}

/* ═══════════════════════════════════════════
   SPECIAL SUB-TABS CONFIG (5 tabs)
═══════════════════════════════════════════ */
const SPECIAL_TABS = [
  {
    key: 'diamond',
    label: 'Diamond',
    emoji: '💎',
    membershipKey: 'diamond',
    activeBg:     'linear-gradient(135deg,#e0f2ff,#bfdbfe)',
    activeBorder: '#3b82f6',
    activeColor:  '#1d4ed8',
    activeShadow: '0 6px 28px rgba(59,130,246,0.28)',
    accentColor:  '#1e40af',
    accentLight:  '#eff6ff',
    accentBorder: 'rgba(59,130,246,0.22)',
    accentGlow:   'rgba(59,130,246,0.13)',
    ringFrom:     '#93c5fd',
    ringTo:       '#3b82f6',
    badgeBg:      '#dbeafe',
    badgeColor:   '#1e40af',
    badgeBorder:  'rgba(30,64,175,0.22)',
    stripFrom:    '#3b82f6',
    stripTo:      '#93c5fd',
    dotColor:     '#3b82f6',
    tagLabel:     'Diamond Member',
    cardGradTop:  'linear-gradient(160deg,#dbeafe 0%,#eff6ff 60%,#fff 100%)',
  },
  {
    key: 'gold',
    label: 'Gold',
    emoji: '🥇',
    membershipKey: 'gold',
    activeBg:     'linear-gradient(135deg,#fef9c3,#fef08a)',
    activeBorder: '#eab308',
    activeColor:  '#854d0e',
    activeShadow: '0 6px 28px rgba(234,179,8,0.28)',
    accentColor:  '#a16207',
    accentLight:  '#fefce8',
    accentBorder: 'rgba(234,179,8,0.25)',
    accentGlow:   'rgba(234,179,8,0.13)',
    ringFrom:     '#fde047',
    ringTo:       '#eab308',
    badgeBg:      '#fef9c3',
    badgeColor:   '#854d0e',
    badgeBorder:  'rgba(133,77,14,0.22)',
    stripFrom:    '#eab308',
    stripTo:      '#fde047',
    dotColor:     '#ca8a04',
    tagLabel:     'Gold Member',
    cardGradTop:  'linear-gradient(160deg,#fef9c3 0%,#fefce8 60%,#fff 100%)',
  },
  {
    key: 'silver',
    label: 'Silver',
    emoji: '🥈',
    membershipKey: 'silver',
    activeBg:     'linear-gradient(135deg,#f1f5f9,#e2e8f0)',
    activeBorder: '#94a3b8',
    activeColor:  '#334155',
    activeShadow: '0 6px 28px rgba(100,116,139,0.22)',
    accentColor:  '#475569',
    accentLight:  '#f8fafc',
    accentBorder: 'rgba(148,163,184,0.3)',
    accentGlow:   'rgba(148,163,184,0.12)',
    ringFrom:     '#cbd5e1',
    ringTo:       '#94a3b8',
    badgeBg:      '#f1f5f9',
    badgeColor:   '#334155',
    badgeBorder:  'rgba(51,65,85,0.18)',
    stripFrom:    '#94a3b8',
    stripTo:      '#cbd5e1',
    dotColor:     '#64748b',
    tagLabel:     'Silver Member',
    cardGradTop:  'linear-gradient(160deg,#e2e8f0 0%,#f8fafc 60%,#fff 100%)',
  },
  {
    key: 'dignitaries',
    label: 'Dignitaries',
    emoji: '👑',
    membershipKey: 'dignitaries',
    activeBg:     'linear-gradient(135deg,#fdf4ff,#f3e8ff)',
    activeBorder: '#a855f7',
    activeColor:  '#6b21a8',
    activeShadow: '0 6px 28px rgba(168,85,247,0.28)',
    accentColor:  '#7e22ce',
    accentLight:  '#fdf4ff',
    accentBorder: 'rgba(168,85,247,0.22)',
    accentGlow:   'rgba(168,85,247,0.13)',
    ringFrom:     '#d8b4fe',
    ringTo:       '#a855f7',
    badgeBg:      '#f3e8ff',
    badgeColor:   '#6b21a8',
    badgeBorder:  'rgba(107,33,168,0.22)',
    stripFrom:    '#a855f7',
    stripTo:      '#d8b4fe',
    dotColor:     '#9333ea',
    tagLabel:     'Dignitary',
    cardGradTop:  'linear-gradient(160deg,#f3e8ff 0%,#fdf4ff 60%,#fff 100%)',
  },
  {
    key: 'corporate',
    label: 'Body Corporate',
    emoji: '🏢',
    membershipKey: 'corporate',
    activeBg:     'linear-gradient(135deg,#ecfdf5,#d1fae5)',
    activeBorder: '#10b981',
    activeColor:  '#064e3b',
    activeShadow: '0 6px 28px rgba(16,185,129,0.25)',
    accentColor:  '#065f46',
    accentLight:  '#ecfdf5',
    accentBorder: 'rgba(16,185,129,0.22)',
    accentGlow:   'rgba(16,185,129,0.12)',
    ringFrom:     '#6ee7b7',
    ringTo:       '#10b981',
    badgeBg:      '#d1fae5',
    badgeColor:   '#064e3b',
    badgeBorder:  'rgba(6,78,59,0.2)',
    stripFrom:    '#10b981',
    stripTo:      '#6ee7b7',
    dotColor:     '#059669',
    tagLabel:     'Corporate Member',
    cardGradTop:  'linear-gradient(160deg,#d1fae5 0%,#ecfdf5 60%,#fff 100%)',
  },
]


/* ═══════════════════════════════════════════
   STATIC GENERAL DATA
═══════════════════════════════════════════ */
const GENERAL_STATIC_DATA = {
  individual: [
    { id: 1, name: 'Arjun Sharma',       company: 'Sharma & Sons Pvt Ltd' },
    { id: 2, name: 'Priya Singh',        company: 'Singh Enterprises' },
    { id: 3, name: 'Rahul Verma',        company: 'Verma Industries' },
    { id: 4, name: 'Neha Gupta',         company: 'Gupta Traders' },
    { id: 5, name: 'Amit Kumar',         company: 'Kumar Associates' },
    { id: 6, name: 'Sunita Yadav',       company: 'Yadav Foundation' },
    { id: 7, name: 'Vikram Mehta',       company: 'Mehta Constructions' },
    { id: 8, name: 'Kavita Reddy',       company: 'Reddy Exports' },
  ],
  players: [
    { id: 1, name: 'Rohit Patel',        company: 'Rajasthan Athletics Club' },
    { id: 2, name: 'Anjali Tiwari',      company: 'Delhi Sports Academy' },
    { id: 3, name: 'Suresh Nair',        company: 'Kerala Sports Federation' },
    { id: 4, name: 'Pooja Joshi',        company: 'Maharashtra Athletics' },
    { id: 5, name: 'Deepak Chauhan',     company: 'Punjab Sports Council' },
    { id: 6, name: 'Ritu Agarwal',       company: 'UP Sports Academy' },
    { id: 7, name: 'Manoj Dubey',        company: 'MP Athletics Club' },
  ],
}

/* ═══════════════════════════════════════════
   INJECTED CSS
═══════════════════════════════════════════ */
const STYLES = `
@keyframes card-shine {
  0%   { transform: translateX(-130%) skewX(-15deg); }
  100% { transform: translateX(300%)  skewX(-15deg); }
}
@keyframes spTabFade {
  from { opacity: 0; transform: translateY(14px) scale(0.98); }
  to   { opacity: 1; transform: translateY(0)    scale(1); }
}
@keyframes float {
  0%,100% { transform: translateY(0px); }
  50%     { transform: translateY(-6px); }
}
@keyframes pulseRing {
  0%   { box-shadow: 0 0 0 0 rgba(240,90,26,0.25); }
  70%  { box-shadow: 0 0 0 10px rgba(240,90,26,0); }
  100% { box-shadow: 0 0 0 0 rgba(240,90,26,0); }
}
@keyframes gradShift {
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
@keyframes barSlide {
  from { transform: scaleX(0); }
  to   { transform: scaleX(1); }
}
@keyframes fadeUp {
  from { opacity:0; transform: translateY(20px); }
  to   { opacity:1; transform: translateY(0); }
}

/* ── BIG PREMIUM CARD ── */
.pmcard {
  transition: transform .42s cubic-bezier(.34,1.18,.64,1),
              box-shadow .42s ease;
  cursor: default;
}
.pmcard:hover .pmcard-shine { animation: card-shine .8s ease forwards; }
.pmcard:hover .pmcard-bar   {
  animation: barSlide .38s ease forwards;
}
.pmcard:hover .pmcard-avatar {
  animation: float 3s ease-in-out infinite;
}

.sp3tab-btn {
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border-radius: 14px;
  font-size: 12.5px;
  font-weight: 700;
  cursor: pointer;
  font-family: 'Plus Jakarta Sans', sans-serif;
  letter-spacing: 0.3px;
  transition: all .3s cubic-bezier(.34,1.3,.64,1);
  overflow: hidden;
  white-space: nowrap;
  flex-shrink: 0;
}
.dot-bg {
  background-image: radial-gradient(circle, rgba(11,30,75,0.06) 1px, transparent 1px);
  background-size: 28px 28px;
}

/* Scroll fade in cards */
.card-reveal {
  animation: fadeUp .45s ease both;
}
`

/* ═══════════════════════════════════════════
   SPECIAL TAB BUTTON
═══════════════════════════════════════════ */
const SpecialTabBtn = ({ tab, isActive, onClick, count }) => (
  <button className="sp3tab-btn" onClick={onClick}
    style={{
      background: isActive ? tab.activeBg : '#fff',
      border: `1.5px solid ${isActive ? tab.activeBorder : '#e2e8f0'}`,
      color: isActive ? tab.activeColor : '#64748b',
      boxShadow: isActive ? tab.activeShadow : '0 2px 10px rgba(11,30,75,0.06)',
    }}
  >
    {isActive && (
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        background: 'linear-gradient(105deg,transparent 35%,rgba(255,255,255,0.55) 50%,transparent 65%)',
        animation: 'card-shine 2.8s ease-in-out infinite',
        pointerEvents: 'none',
      }} />
    )}
    <span style={{ fontSize: 17, position: 'relative', zIndex: 1 }}>{tab.emoji}</span>
    <span style={{ position: 'relative', zIndex: 1, fontWeight: 800 }}>{tab.label}</span>
    <span style={{
      position: 'relative', zIndex: 1,
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      minWidth: 22, height: 22, borderRadius: 999,
      background: isActive ? `${tab.activeBorder}22` : '#f1f5f9',
      border: `1px solid ${isActive ? tab.activeBorder + '55' : '#e2e8f0'}`,
      color: isActive ? tab.activeColor : '#94a3b8',
      fontSize: 10, fontWeight: 800, padding: '0 6px',
    }}>
      {count}
    </span>
  </button>
)

/* ═══════════════════════════════════════════
   BIG PREMIUM MEMBER CARD
═══════════════════════════════════════════ */
const PremiumMemberCard = ({ member, theme, idx }) => (
  <div
    className="pmcard card-reveal"
    style={{
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      background: '#fff',
      borderRadius: 28,
      overflow: 'hidden',
      border: `1.5px solid ${theme.accentBorder}`,
      boxShadow: `0 10px 40px ${theme.accentGlow}, 0 2px 10px rgba(11,30,75,0.07)`,
      animationDelay: `${idx * 0.07}s`,
      minHeight: 420,
    }}
  >
    {/* Shine overlay */}
    <div className="pmcard-shine" style={{
      position: 'absolute', inset: 0,
      background: 'linear-gradient(105deg,transparent 30%,rgba(255,255,255,0.6) 50%,transparent 70%)',
      transform: 'translateX(-130%) skewX(-15deg)',
      pointerEvents: 'none', zIndex: 20,
    }} />

    {/* Top gradient bg */}
    <div style={{
      position: 'absolute', top: 0, left: 0, right: 0, height: 220,
      background: theme.cardGradTop,
      zIndex: 0,
    }} />

    {/* Decorative circles */}
    <div style={{
      position: 'absolute', top: -30, right: -30,
      width: 120, height: 120, borderRadius: '50%',
      background: `radial-gradient(circle, ${theme.accentGlow} 0%, transparent 70%)`,
      pointerEvents: 'none', zIndex: 1,
    }} />
    <div style={{
      position: 'absolute', top: 20, left: -20,
      width: 80, height: 80, borderRadius: '50%',
      background: `radial-gradient(circle, ${theme.accentGlow} 0%, transparent 70%)`,
      pointerEvents: 'none', zIndex: 1,
    }} />

    {/* Top accent strip */}
    <div style={{
      position: 'absolute', top: 0, left: 0, right: 0, height: 5,
      background: `linear-gradient(90deg, ${theme.stripFrom}, ${theme.stripTo}, ${theme.stripFrom})`,
      backgroundSize: '200% 100%',
      animation: 'gradShift 3s ease infinite',
      zIndex: 3,
    }} />

    {/* Content */}
    <div style={{
      position: 'relative', zIndex: 10,
      paddingTop: 20, paddingBottom: 24,
      paddingLeft: 14, paddingRight: 14,
      display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%',
      flex: 1,
    }}>

      {/* AVATAR — large square */}
      <div className="pmcard-avatar" style={{ position: 'relative', marginBottom: 18, width: '100%' }}>
        <div style={{
          width: '100%',
          position: 'relative',
          borderRadius: 18,
          padding: 3,
          background: `linear-gradient(135deg, ${theme.ringFrom}, ${theme.ringTo}, ${theme.ringFrom})`,
          backgroundSize: '200% 200%',
          animation: 'gradShift 4s ease infinite',
          boxShadow: `0 12px 40px ${theme.accentGlow}, 0 4px 16px rgba(11,30,75,0.1)`,
        }}>
          <div style={{
            width: '100%',
            paddingTop: '100%',
            position: 'relative',
            borderRadius: 16,
            overflow: 'hidden',
            background: theme.accentLight,
            border: '3px solid #fff',
          }}>
            <img
              src={member.img || member.photo}
              alt={member.name}
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', display: 'block' }}
              onError={e => {
                e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=${theme.ringTo.replace('#','')}&color=fff&size=400&bold=true&length=2`
              }}
            />
          </div>
        </div>

        {/* Emoji badge corner */}
        <div style={{
          position: 'absolute', bottom: -8, right: -8,
          width: 36, height: 36, borderRadius: 10,
          background: `linear-gradient(135deg, ${theme.ringFrom}, ${theme.ringTo})`,
          border: '3px solid #fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 15, boxShadow: `0 4px 14px ${theme.accentGlow}`,
          zIndex: 2,
        }}>
          {theme.emoji}
        </div>
      </div>

      {/* NAME */}
      <h3 style={{
        margin: '0 0 4px',
        fontSize: 16.5, fontWeight: 900,
        color: '#0B1E4B',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        lineHeight: 1.2,
        letterSpacing: '-0.2px',
      }}>
        {member.name}
      </h3>

      {/* COMPANY */}
      {(member.company || member.organization) && (
        <p style={{
          margin: '0 0 16px',
          fontSize: 11.5, fontWeight: 500,
          color: '#94a3b8',
          lineHeight: 1.4,
          maxWidth: '100%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        }}>
          <FaBuilding style={{ fontSize: 9, marginRight: 4, verticalAlign: 'middle', color: '#cbd5e1' }} />
          {member.company || member.organization}
        </p>
      )}


      {/* Spacer */}
      <div style={{ flex: 1 }} />

      {/* BADGE PILL */}
      <span style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        padding: '6px 16px', borderRadius: 999,
        background: theme.badgeBg,
        border: `1.5px solid ${theme.badgeBorder}`,
        color: theme.badgeColor,
        fontSize: 10, fontWeight: 800,
        letterSpacing: '1.8px', textTransform: 'uppercase',
        marginTop: 'auto',
      }}>
        <MdVerified style={{ fontSize: 12 }} />
        {theme.tagLabel}
      </span>
    </div>

    {/* Bottom bar — animates on hover */}
    <div className="pmcard-bar" style={{
      position: 'absolute', bottom: 0, left: 0, right: 0, height: 4,
      background: `linear-gradient(90deg, ${theme.stripFrom}, ${theme.stripTo})`,
      transform: 'scaleX(0)', transformOrigin: 'left',
      transition: 'transform .35s ease',
    }} />
  </div>
)

/* ═══════════════════════════════════════════
   ROUTE MAP  →  /members/special-members/:tab
═══════════════════════════════════════════ */
const TAB_ROUTES = {
  diamond:     '/members/special-members/diamond',
  gold:        '/members/special-members/gold',
  silver:      '/members/special-members/silver',
  dignitaries: '/members/special-members/dignitaries',
  corporate:   '/members/special-members/corporate',
}

const VALID_KEYS = Object.keys(TAB_ROUTES)

/** Read active tab from current pathname */
const getTabFromPath = (pathname) => {
  const seg = pathname.split('/').pop()            // last segment
  return VALID_KEYS.includes(seg) ? seg : 'diamond'
}

/* ═══════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════ */
const MembersData = () => {
  const navigate = useNavigate()
  const location = useLocation()

  // ── Main tab: special | general ──
  const isGeneralPath = location.pathname.includes('/general-members')
  const [mainTab, setMainTab] = useState(isGeneralPath ? 'general' : 'special')

  // ── Special sub-tab from URL ──
  const specialSub = (() => {
    const seg = location.pathname.split('/').pop()
    return VALID_KEYS.includes(seg) ? seg : 'diamond'
  })()
  const [subAnimKey, setSubAnimKey] = useState(0)

  // ── General sub-tab ──
  const [generalSub, setGeneralSub] = useState('individual')

  // Redirect bare /members/special-members → .../diamond
  useEffect(() => {
    if (mainTab === 'special' && !VALID_KEYS.includes(location.pathname.split('/').pop())) {
      navigate(TAB_ROUTES.diamond, { replace: true })
    }
  }, [])

  const switchSpecialTab = (key) => {
    setSubAnimKey(k => k + 1)
    navigate(TAB_ROUTES[key])
  }

  const switchMainTab = (tab) => {
    setMainTab(tab)
    if (tab === 'special') navigate(TAB_ROUTES[specialSub])
    else navigate('/members/general-members')
  }

  const currentTheme = SPECIAL_TABS.find(t => t.key === specialSub)
  const currentData  = STATIC_DATA[specialSub] || []
  const generalData  = GENERAL_STATIC_DATA[generalSub] || []
  const isLoading    = false
  const isError      = null

  return (
    <div style={{ minHeight: '100vh', background: '#F4F6FB', fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
      <style>{STYLES}</style>
      <style>{`
        .pmgrid { grid-template-columns: repeat(4, 1fr); }
        @media(max-width:1200px){ .pmgrid{ grid-template-columns: repeat(3,1fr) !important; } }
        @media(max-width:860px){  .pmgrid{ grid-template-columns: repeat(2,1fr) !important; } }
        @media(max-width:500px){  .pmgrid{ grid-template-columns: 1fr !important; } }

        .tabs-scroll {
          display: flex; gap: 10px; overflow-x: auto;
          padding-bottom: 4px; -webkit-overflow-scrolling: touch; scrollbar-width: none;
        }
        .tabs-scroll::-webkit-scrollbar { display: none; }

        /* Main tabs */
        .main-tab-btn {
          background: transparent; border: none; cursor: pointer;
          padding: 12px 22px; font-size: 14px; font-weight: 700;
          font-family: 'Plus Jakarta Sans', sans-serif;
          position: relative; color: #64748b;
          transition: color .2s ease;
        }
        .main-tab-btn.active { color: #0B1E4B; }
        .main-tab-btn::after {
          content: ''; position: absolute; bottom: -2px; left: 0; right: 0;
          height: 3px; border-radius: 3px 3px 0 0;
          background: linear-gradient(90deg, #F05A1A, #FF7D42);
          transform: scaleX(0); transition: transform .25s ease;
        }
        .main-tab-btn.active::after { transform: scaleX(1); }

        /* General table row hover */
        .gm-row:hover { background: #FFF6F0 !important; }
        .gm-row:hover .gm-sr { color: #F05A1A !important; }

        /* Tab content animation */
        @keyframes tabFadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .tab-content { animation: tabFadeIn .3s ease both; }

        /* General sub tab */
        .gen-sub-btn {
          background: transparent; border: none; border-bottom: 3px solid transparent;
          cursor: pointer; padding: 10px 18px 12px; font-size: 13px; font-weight: 600;
          font-family: 'Plus Jakarta Sans', sans-serif; color: #64748b;
          display: flex; align-items: center; gap: 8px;
          transition: color .2s; margin-bottom: -2px;
        }
        .gen-sub-btn.active {
          color: #0B1E4B; font-weight: 800;
          border-bottom-color: #F05A1A;
        }
      `}</style>

      {/* Dot bg */}
      <div className="dot-bg" style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, opacity: 0.6 }} />

      <div style={{ maxWidth: 1340, margin: '0 auto', padding: '44px 20px', position: 'relative', zIndex: 1 }}>

        {/* ── PAGE HEADER ── */}
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 7,
            padding: '6px 18px', borderRadius: 999,
            background: 'rgba(240,90,26,0.08)', border: '1px solid rgba(240,90,26,0.2)',
            color: '#F05A1A', fontSize: 11, fontWeight: 700,
            letterSpacing: '2.5px', textTransform: 'uppercase', marginBottom: 14,
          }}>
            <HiSparkles style={{ fontSize: 13 }} /> UDI Sports NGO
          </div>

          <h1 style={{
            fontFamily: "'Bebas Neue',cursive",
            fontSize: 'clamp(42px,7vw,76px)',
            letterSpacing: 4, lineHeight: 1, color: '#0B1E4B',
            marginBottom: 14, marginTop: 0,
          }}>
            OUR <span style={{ color: '#F05A1A' }}>MEMBERS</span>
          </h1>

          <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 10 }}>
            <div style={{ height: 3, width: 40, borderRadius: 3, background: 'linear-gradient(90deg,#F05A1A,#FF7D42)' }} />
            <div style={{ height: 3, width: 12, borderRadius: 3, background: '#e2e8f0' }} />
            <div style={{ height: 3, width: 6, borderRadius: 3, background: '#e2e8f0' }} />
          </div>

          <p style={{ color: '#64748b', fontSize: 15, maxWidth: 520, margin: '0 auto', lineHeight: 1.75 }}>
            Meet the dedicated individuals and organizations powering India's grassroots sports revolution.
          </p>
        </div>

        {/* ══ MAIN TABS: Special | General ══ */}
        <div style={{
          display: 'flex', justifyContent: 'center',
          borderBottom: '2px solid #e2e8f0', marginBottom: 36,
        }}>
          {[
            { key: 'special', label: 'Special Members' },
            { key: 'general', label: 'General Members' },
          ].map(t => (
            <button
              key={t.key}
              className={`main-tab-btn ${mainTab === t.key ? 'active' : ''}`}
              onClick={() => switchMainTab(t.key)}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* ════════════════════════════
            SPECIAL MEMBERS
        ════════════════════════════ */}
        {mainTab === 'special' && (
          <div className="tab-content">

            {/* 5 sub-tabs */}
            <div className="tabs-scroll" style={{ marginBottom: 28 }}>
              {SPECIAL_TABS.map(tab => (
                <SpecialTabBtn
                  key={tab.key}
                  tab={tab}
                  isActive={specialSub === tab.key}
                  onClick={() => switchSpecialTab(tab.key)}
                  count={STATIC_DATA[tab.key]?.length ?? 0}
                />
              ))}
            </div>

            {/* Context banner */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '12px 20px', borderRadius: 14, marginBottom: 30,
              background: `linear-gradient(90deg, ${currentTheme.accentLight}, rgba(255,255,255,0))`,
              border: `1.5px solid ${currentTheme.accentBorder}`,
              transition: 'all 0.3s ease',
            }}>
              <span style={{ fontSize: 20 }}>{currentTheme.emoji}</span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 800, color: currentTheme.accentColor, marginBottom: 2 }}>
                  {currentTheme.label} Members
                </div>
                <div style={{ fontSize: 12, color: '#64748b', fontWeight: 500 }}>
                  {specialSub === 'diamond'     ? 'Our most prestigious patrons with the highest level of contribution to sports.' :
                   specialSub === 'gold'        ? 'Gold patrons who significantly support our national sports initiatives.' :
                   specialSub === 'silver'      ? 'Silver members who actively contribute to our growing sports community.' :
                   specialSub === 'dignitaries' ? 'Eminent personalities, officials and leaders who grace our organization.' :
                   'Corporate bodies and organizations registered as institutional members.'}
                </div>
              </div>
              <div style={{ marginLeft: 'auto', fontSize: 13, fontWeight: 800, color: currentTheme.accentColor }}>
                {currentData.length} Members
              </div>
            </div>

            {/* Cards grid */}
            {currentData.length === 0 ? (
              <div style={{ padding: 80, textAlign: 'center' }}>
                <div style={{ fontSize: 44, marginBottom: 14 }}>{currentTheme.emoji}</div>
                <div style={{ color: '#94a3b8', fontSize: 14, fontWeight: 600 }}>No {currentTheme.label} members found.</div>
              </div>
            ) : (
              <div key={subAnimKey} className="pmgrid" style={{ display: 'grid', gap: 24 }}>
                {currentData.map((m, i) => (
                  <PremiumMemberCard key={m.id} member={m} theme={currentTheme} idx={i} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* ════════════════════════════
            GENERAL MEMBERS
        ════════════════════════════ */}
        {mainTab === 'general' && (
          <div className="tab-content">

            {/* Individual | Players sub-tabs */}
            <div style={{ display: 'flex', alignItems: 'center', borderBottom: '2px solid #e2e8f0', marginBottom: 20 }}>
              {[
                { key: 'individual', label: 'Individual', count: GENERAL_STATIC_DATA.individual.length },
                { key: 'players',    label: 'Players',    count: GENERAL_STATIC_DATA.players.length },
              ].map(st => (
                <button
                  key={st.key}
                  className={`gen-sub-btn ${generalSub === st.key ? 'active' : ''}`}
                  onClick={() => setGeneralSub(st.key)}
                >
                  {st.label}
                  <span style={{
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    width: 20, height: 20, borderRadius: '50%',
                    background: generalSub === st.key ? '#F05A1A' : '#f1f5f9',
                    color: generalSub === st.key ? '#fff' : '#94a3b8',
                    fontSize: 10, fontWeight: 800, flexShrink: 0,
                  }}>{st.count}</span>
                </button>
              ))}
            </div>

            {/* Table */}
            <div style={{ borderRadius: 18, overflow: 'hidden', border: '1px solid #e2e8f0', boxShadow: '0 4px 24px rgba(11,30,75,0.08)' }}>

              {/* Header */}
              <div style={{ display: 'grid', gridTemplateColumns: '52px 1fr 1fr', padding: '13px 22px', gap: 10, background: 'linear-gradient(90deg,#0B1E4B,#1e3a8a)' }}>
                {['SR.', 'NAME', 'COMPANY / ORGANIZATION'].map(h => (
                  <div key={h} style={{ fontSize: 10, fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.65)', fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{h}</div>
                ))}
              </div>

              {/* Rows */}
              {generalData.length === 0 ? (
                <div style={{ padding: 28, textAlign: 'center', color: '#94a3b8', fontSize: 13, background: '#fff' }}>No members available.</div>
              ) : generalData.map((m, i) => (
                <div
                  key={m.id}
                  className="gm-row"
                  style={{ display: 'grid', gridTemplateColumns: '52px 1fr 1fr', padding: '12px 22px', gap: 10, background: i % 2 === 0 ? '#fff' : '#f9fafb', borderBottom: i < generalData.length - 1 ? '1px solid #f1f5f9' : 'none' }}
                >
                  <div className="gm-sr" style={{ fontSize: 12.5, fontWeight: 700, color: '#cbd5e1', transition: 'color .15s', fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{i + 1}</div>
                  <div style={{ fontSize: 13.5, fontWeight: 700, color: '#0B1E4B', fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{m.name}</div>
                  <div style={{ fontSize: 12.5, color: '#64748b', fontFamily: "'Plus Jakarta Sans',sans-serif", overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{m.company || m.organization || '-'}</div>
                </div>
              ))}
            </div>

          </div>
        )}

      </div>
    </div>
  )
}

export default MembersData