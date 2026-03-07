import { useState, useRef, useEffect, useCallback } from 'react'
import {
  FaUser, FaRunning, FaBuilding, FaCheckCircle, FaTimesCircle,
  FaFileAlt, FaEnvelope, FaShieldAlt,
  FaTrophy, FaMedal, FaUsers, FaGlobe, FaIdCard,
  FaCertificate, FaHandshake, FaMicrophone,
} from 'react-icons/fa'
import { MdVerified, MdClose, MdGroups } from 'react-icons/md'
import { HiSparkles, HiArrowRight } from 'react-icons/hi'
import { BsStarFill, BsBuildingsFill } from 'react-icons/bs'
import { GiDiamondTrophy, GiLaurelCrown } from 'react-icons/gi'
// ── CHANGE 1: added useNavigate, useLocation ──────────────────────────────────
import { useNavigate, useLocation } from 'react-router-dom'
import { sendOtp, verifyOtp, submitMemberForm } from '../../../../shared/services/publicApi'

/* ════════════════════════════════════════════════════════
   EXACT MEMBERSHIP DATA FROM SPREADSHEET
════════════════════════════════════════════════════════ */
const MEMBERSHIP_DATA = {

  individual: {
    id: 'individual',
    label: 'Individual Players Membership',
    shortLabel: 'Individual',
    Icon: FaUser,
    accentColor: '#0B1E4B',
    accentLight: '#EEF2FF',
    tagline: 'For sports enthusiasts, officials & volunteers',
    description:
      'Individual Players Membership is open to any person who has an interest in the promotion and development of sports in India. It provides direct access to UDIISA events, training programmes, and community networks.',
    eligibility: [
      'Indian citizen aged 18 years or above',
      'Genuine interest in sports development or administration',
      'Not serving any ban or suspension from a recognised sports body',
      'Membership is subject to approval by Governing Body',
    ],
    documents: [
      'Recent passport-size photograph',
      'Copy of Aadhaar / Passport / Voter ID',
      'PAN Card copy',
      'Brief letter of intent (100–200 words)',
    ],
    feeTable: [
      { subType: 'BPL',     amount: '₹1,200',  amountNum: 1200,  benefits: ['Membership Certificate', 'Membership ID Card'], badgeCls: 'bg-emerald-600 text-white', rowBg: '' },
      { subType: 'General', amount: '₹2,500',  amountNum: 2500,  benefits: ['Membership Certificate', 'Membership ID Card'], badgeCls: 'bg-[#0B1E4B] text-white',   rowBg: 'bg-blue-50/40' },
    ],
    notes: [
      'Subscription valid till 31 March 2027 on first-cum-first-served basis.',
      'Subscription for FY 2027-28 may be revised as per UDIISA decision.',
      'Membership is subject to approval by Governing Body.',
      'Membership rights are non-transferable.',
      'GST 18% extra applicable.',
    ],
    benefits: [
      { icon: FaCertificate, text: 'Official UDIISA Membership Certificate' },
      { icon: FaIdCard,      text: 'Personalised Membership ID Card' },
      { icon: FaTrophy,      text: 'Access to UDIISA national & state sports events' },
      { icon: MdGroups,      text: 'Invitation to Annual General Body Meeting (AGM)' },
      { icon: HiSparkles,    text: 'Monthly sports newsletter & knowledge bulletins' },
      { icon: FaShieldAlt,   text: 'Grievance redressal & member support helpline' },
    ],
    membershipOpts: ['— Select Sub-Type —', 'BPL (₹1,200)', 'General (₹2,500)'],
  },

  player: {
    id: 'player',
    label: 'Individual Patron Membership',
    shortLabel: 'Patron',
    Icon: FaRunning,
    accentColor: '#F05A1A',
    accentLight: '#FFF3EC',
    tagline: 'For active athletes, patrons & sports leaders',
    description:
      'Individual Patron Membership is designed for active athletes, ex-sportspersons, and dedicated patrons of sports. Each higher tier automatically includes all privileges of the preceding lower tiers.',
    eligibility: [
      'Active or retired sportsperson / sports administrator',
      'Genuine commitment to sports development in India',
      'Membership is subject to approval by Governing Body',
      'Age: 14 years and above (guardian consent required under 18)',
    ],
    documents: [
      'Recent passport-size photograph',
      'Copy of Aadhaar / Passport / Voter ID',
      'Sports federation certificate or achievement proof (if applicable)',
      'PAN Card copy',
    ],
    feeTable: [
      { subType: 'BPL',      amount: '₹5,000',    amountNum: 5000,   benefits: ['Membership Certificate', 'ID Card'],                                      badgeCls: 'bg-emerald-600 text-white', rowBg: '' },
      { subType: 'Ex Sports', amount: '₹12,500',  amountNum: 12500,  benefits: ['Membership Certificate', 'ID Card'],                                      badgeCls: 'bg-slate-600 text-white',   rowBg: 'bg-slate-50/60' },
      { subType: 'General',  amount: '₹25,000',   amountNum: 25000,  benefits: ['Certificate', 'ID Card', 'Speaker Opportunity'],                          badgeCls: 'bg-[#F05A1A] text-white',   rowBg: 'bg-orange-50/40' },
      { subType: 'Silver',   amount: '₹50,000',   amountNum: 50000,  benefits: ['Certificate', 'ID', 'Speaker Opp.', 'Advisory Panel Access'],             badgeCls: 'bg-slate-400 text-white',   rowBg: 'bg-slate-50' },
      { subType: 'Gold',     amount: '₹75,000',   amountNum: 75000,  benefits: ['All Silver benefits', 'Governing Council Access'],                        badgeCls: 'bg-amber-500 text-white',   rowBg: 'bg-amber-50/40' },
      { subType: 'Diamond',  amount: '₹1,00,000', amountNum: 100000, benefits: ['All Gold benefits', 'Founder Member Category'],                           badgeCls: 'bg-indigo-600 text-white',  rowBg: 'bg-indigo-50/40' },
    ],
    notes: [
      'Each higher membership tier automatically includes all privileges of the preceding lower tiers.',
      'Subscription valid till 31 March 2027 on first-cum-first-served basis.',
      'Subscription for FY 2027-28 may be revised as per UDIISA decision.',
      'Membership is subject to approval by Governing Body.',
      'Membership rights are non-transferable.',
      'GST 18% extra applicable.',
    ],
    benefits: [
      { icon: FaCertificate,   text: 'Official UDIISA Membership Certificate & ID Card' },
      { icon: FaMicrophone,    text: 'Speaker Opportunity at UDIISA events (General & above)' },
      { icon: FaHandshake,     text: 'Advisory Panel Access (Silver & above)' },
      { icon: GiLaurelCrown,   text: 'Governing Council Access (Gold & above)' },
      { icon: GiDiamondTrophy, text: 'Founder Member Category recognition (Diamond)' },
      { icon: FaTrophy,        text: 'Priority access to national sports events & programmes' },
    ],
    membershipOpts: [
      '— Select Sub-Type —',
      'BPL (₹5,000)',
      'Ex Sports (₹12,500)',
      'General (₹25,000)',
      'Silver (₹50,000)',
      'Gold (₹75,000)',
      'Diamond (₹1,00,000)',
    ],
  },

  corporate: {
    id: 'corporate',
    label: 'Lifetime Corporate Membership',
    shortLabel: 'Corporate',
    Icon: FaBuilding,
    accentColor: '#1a6b3a',
    accentLight: '#F0FAF4',
    tagline: 'For companies, associations & sports organisations',
    description:
      'Lifetime Corporate Membership is available to companies and organisations whose objectives align with sports promotion. Each higher tier includes all privileges of preceding tiers. Valid till 31 March 2027 on first-cum-first-served basis.',
    eligibility: [
      'Registered company, LLP, partnership firm, trust, NGO, or association in India',
      'Aims & objectives aligned with sports development or athlete welfare',
      'Minimum 2 years of existence (date of incorporation)',
      'Membership is subject to approval by Governing Body',
    ],
    documents: [
      'Certificate of Incorporation / Registration',
      'Memorandum & Articles of Association / Trust Deed',
      'Latest audited Balance Sheet / Annual Report',
      'GST Certificate copy',
      'PAN & Aadhaar of authorised signatory',
      'List of Directors / Trustees with full addresses',
    ],
    feeTable: [
      { subType: 'Up to ₹1 Cr',        amount: '₹2,50,000',  amountNum: 250000,  benefits: ['Website Listing'],                                               badgeCls: 'bg-emerald-600 text-white', rowBg: '' },
      { subType: '₹1 Cr – ₹5 Cr',      amount: '₹5,00,000',  amountNum: 500000,  benefits: ['Website Listing', 'Event Branding'],                             badgeCls: 'bg-teal-600 text-white',    rowBg: 'bg-teal-50/30' },
      { subType: '₹5 Cr – ₹25 Cr',     amount: '₹10,00,000', amountNum: 1000000, benefits: ['Website Listing', 'Event Branding', 'Speaking Opportunity'],      badgeCls: 'bg-[#1a6b3a] text-white',   rowBg: 'bg-green-50/40' },
      { subType: '₹25 Cr – ₹50 Cr',    amount: '₹20,00,000', amountNum: 2000000, benefits: ['All above', 'Advisory Panel Access'],                             badgeCls: 'bg-slate-500 text-white',   rowBg: 'bg-slate-50/60' },
      { subType: '₹50 Cr – ₹100 Cr',   amount: '₹35,00,000', amountNum: 3500000, benefits: ['All above', 'Governing Council Access'],                          badgeCls: 'bg-amber-600 text-white',   rowBg: 'bg-amber-50/40' },
      { subType: 'Above ₹100 Cr',       amount: '₹50,00,000', amountNum: 5000000, benefits: ['All above', 'Strategic Corporate Partner'],                       badgeCls: 'bg-indigo-700 text-white',  rowBg: 'bg-indigo-50/40' },
    ],
    notes: [
      'Each higher membership tier automatically includes all privileges of preceding lower tiers.',
      'Lifetime subscription valid till 31 March 2027 on first-cum-first-served basis.',
      'Subscription for FY 2027-28 may be revised as per UDIISA decision.',
      'Membership is subject to approval by Governing Body.',
      'Membership rights are non-transferable.',
      'GST 18% extra applicable.',
    ],
    benefits: [
      { icon: FaGlobe,         text: 'Brand listing on official UDIISA website' },
      { icon: BsBuildingsFill, text: 'Event branding at UDIISA national events' },
      { icon: FaMicrophone,    text: 'Speaking opportunity at major sports summits' },
      { icon: FaHandshake,     text: 'Advisory Panel Access (₹25 Cr+ slab & above)' },
      { icon: GiLaurelCrown,   text: 'Governing Council Access (₹50 Cr+ slab & above)' },
      { icon: BsStarFill,      text: 'Strategic Corporate Partner (Above ₹100 Cr slab)' },
    ],
    membershipOpts: [
      '— Select Turnover Slab —',
      'Up to ₹1 Cr (₹2,50,000)',
      '₹1 Cr – ₹5 Cr (₹5,00,000)',
      '₹5 Cr – ₹25 Cr (₹10,00,000)',
      '₹25 Cr – ₹50 Cr (₹20,00,000)',
      '₹50 Cr – ₹100 Cr (₹35,00,000)',
      'Above ₹100 Cr (₹50,00,000)',
    ],
  },
}

const TABS = [
  { id: 'individual', label: 'Individual Players',  shortLabel: 'Individual', Icon: FaUser },
  { id: 'player',     label: 'Individual Patron',   shortLabel: 'Patron',     Icon: FaRunning },
  { id: 'corporate',  label: 'Lifetime Corporate',  shortLabel: 'Corporate',  Icon: FaBuilding },
]

// ── CHANGE 2: Path <-> tabId mapping (must match BecomeAMember paths) ─────────
const PATH_TO_TAB = {
  '/membership/individual-player':  'individual',
  '/membership/individual-patron':  'player',
  '/membership/lifetime-corporate': 'corporate',
}
const TAB_TO_PATH = {
  individual: '/membership/individual-player',
  player:     '/membership/individual-patron',
  corporate:  '/membership/lifetime-corporate',
}

const GENDER_OPTS = ['', 'Male', 'Female', 'Other / Prefer not to say']

/* ════════════════════════════════════════════════════════
   OTP MODAL
════════════════════════════════════════════════════════ */
function OTPModal({ email, onVerified, onClose }) {
  const LEN = 6, SEC = 60
  const [digits,    setDigits]    = useState(Array(LEN).fill(''))
  const [timer,     setTimer]     = useState(SEC)
  const [canResend, setCanResend] = useState(false)
  const [err,       setErr]       = useState('')
  const [shake,     setShake]     = useState(false)
  const [busy,      setBusy]      = useState(false)
  const [sent,      setSent]      = useState(false)
  const refs    = useRef([])
  const flying  = useRef(false)
  const sentFor = useRef('')
  const norm    = (email || '').trim().toLowerCase()

  const doSend = useCallback(async (force = false) => {
    if (!norm || flying.current) return
    if (!force && sentFor.current === norm) return
    flying.current = true; setErr('')
    try {
      await sendOtp(norm)
      sentFor.current = norm; setSent(true)
      setTimer(SEC); setCanResend(false)
    } catch (e) {
      sentFor.current = ''; setErr(e?.response?.data?.message || 'Failed to send OTP')
    } finally { flying.current = false }
  }, [norm])

  useEffect(() => { if (norm && !sent) doSend() }, [norm, sent, doSend])
  useEffect(() => {
    if (timer <= 0) { setCanResend(true); return }
    const t = setTimeout(() => setTimer(p => p - 1), 1000)
    return () => clearTimeout(t)
  }, [timer])
  useEffect(() => { setTimeout(() => refs.current[0]?.focus(), 120) }, [])

  const handleDigit = (i, val) => {
    const ch = val.replace(/\D/g,'').slice(-1)
    const next = [...digits]; next[i] = ch; setDigits(next); setErr('')
    if (ch && i < LEN - 1) refs.current[i+1]?.focus()
  }
  const handleKey = (i, e) => {
    if (e.key==='Backspace' && !digits[i] && i>0) refs.current[i-1]?.focus()
    if (e.key==='ArrowLeft'  && i>0)      refs.current[i-1]?.focus()
    if (e.key==='ArrowRight' && i<LEN-1)  refs.current[i+1]?.focus()
  }
  const handlePaste = (e) => {
    e.preventDefault()
    const p = e.clipboardData.getData('text').replace(/\D/g,'').slice(0,LEN)
    const n = Array(LEN).fill('')
    p.split('').forEach((c,i) => { n[i] = c })
    setDigits(n)
    refs.current[Math.min(p.length, LEN-1)]?.focus()
  }
  const handleVerify = async () => {
    const code = digits.join('')
    if (code.length < LEN) { setErr('Please enter all 6 digits'); doShake(); return }
    setBusy(true); setErr('')
    verifyOtp(norm, code)
      .then(() => onVerified())
      .catch(e => {
        setErr(e?.response?.data?.message || 'Incorrect OTP. Please try again.')
        setDigits(Array(LEN).fill('')); doShake()
        setTimeout(() => refs.current[0]?.focus(), 50)
      })
      .finally(() => setBusy(false))
  }
  const doShake = () => { setShake(true); setTimeout(() => setShake(false), 500) }
  const masked  = email.replace(/(.{2}).+(@.+)/, '$1***$2')
  const filled  = digits.filter(Boolean).length

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center !p-4 bg-[rgba(11,30,75,0.6)] backdrop-blur-[6px]"
      onClick={e => { if (e.target === e.currentTarget) onClose() }}>
      <style>{`
        @keyframes modalPop{from{opacity:0;transform:scale(.86) translateY(18px)}to{opacity:1;transform:scale(1) translateY(0)}}
        @keyframes shakeX{0%,100%{transform:translateX(0)}20%{transform:translateX(-7px)}40%{transform:translateX(7px)}60%{transform:translateX(-4px)}80%{transform:translateX(4px)}}
        .modal-pop{animation:modalPop .28s cubic-bezier(.34,1.56,.64,1) both}
        .shake-x{animation:shakeX .45s ease}
        @keyframes spinR{to{transform:rotate(360deg)}} .spinR{animation:spinR .7s linear infinite}
      `}</style>
      <div className="relative w-full max-w-[410px] bg-white rounded-[24px] shadow-[0_28px_90px_rgba(11,30,75,.24)] overflow-hidden modal-pop">
        <div className="bg-gradient-to-r from-[#0B1E4B] to-[#1e3a8a] !px-7 !py-6 text-center relative overflow-hidden">
          <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-[rgba(240,90,26,.12)]" />
          <button onClick={onClose} className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/60 hover:text-white transition-all">
            <MdClose className="text-[15px]" />
          </button>
          <div className="relative z-10">
            <div className="w-12 h-12 rounded-2xl !mx-auto !mb-3 bg-gradient-to-br from-[#F05A1A] to-[#FF7D42] flex items-center justify-center shadow-[0_8px_24px_rgba(240,90,26,.4)]">
              <FaEnvelope className="text-white text-xl" />
            </div>
            <h3 className="text-white font-extrabold text-[17px] !m-0 !mb-1">Verify Your Email</h3>
            <p className="text-white/50 text-[12px] !m-0">OTP sent to <span className="text-white/80 font-semibold">{masked}</span></p>
          </div>
        </div>

        <div className="!p-7 flex flex-col !gap-5">
          <div className="flex items-start !gap-2.5 !px-3.5 !py-3 rounded-xl bg-blue-50 border border-blue-100">
            <FaShieldAlt className="text-blue-400 text-[12px] flex-shrink-0 !mt-px" />
            <p className="text-[12px] text-blue-600 !m-0 leading-[1.55]">Enter the <strong>6-digit OTP</strong> sent to your email. Valid for <strong>10 minutes</strong>.</p>
          </div>

          <div className="flex flex-col !gap-2.5">
            <label className="text-[11px] font-extrabold text-[#0B1E4B] uppercase tracking-[1.3px]">Enter OTP</label>
            <div className={`flex justify-between !gap-2 ${shake ? 'shake-x' : ''}`} onPaste={handlePaste}>
              {digits.map((d,i) => (
                <input key={i} ref={el => refs.current[i] = el}
                  type="text" inputMode="numeric" maxLength={1} value={d}
                  onChange={e => handleDigit(i, e.target.value)}
                  onKeyDown={e => handleKey(i, e)}
                  className={`w-full h-[52px] rounded-xl text-center text-[20px] font-extrabold border-2 bg-white focus:outline-none transition-all caret-transparent select-none
                    ${err ? 'border-red-400 text-red-500 bg-red-50'
                       : d  ? 'border-[#F05A1A] text-[#0B1E4B] bg-[#FFF9F6] shadow-[0_2px_8px_rgba(240,90,26,.1)]'
                            : 'border-slate-200 text-[#0B1E4B] focus:border-[#F05A1A] focus:ring-2 focus:ring-[#F05A1A]/10'}`}
                />
              ))}
            </div>
            <div className="flex justify-center !gap-1.5">
              {digits.map((d,i) => <div key={i} className={`w-1.5 h-1.5 rounded-full transition-all ${d ? 'bg-[#F05A1A] scale-125' : 'bg-slate-200'}`} />)}
            </div>
            {err && (
              <div className="flex items-center !gap-1.5 !px-3 !py-2 rounded-[10px] bg-red-50 border border-red-200">
                <FaTimesCircle className="text-red-400 text-[12px] flex-shrink-0" />
                <span className="text-[11.5px] font-semibold text-red-500">{err}</span>
              </div>
            )}
          </div>

          <button onClick={handleVerify} disabled={filled < LEN || busy}
            className="w-full h-[48px] rounded-[13px] bg-gradient-to-r from-[#F05A1A] to-[#FF7D42] text-white text-[14px] font-extrabold flex items-center justify-center !gap-2 shadow-[0_6px_24px_rgba(240,90,26,.35)] hover:shadow-[0_10px_32px_rgba(240,90,26,.5)] hover:-translate-y-px disabled:opacity-50 disabled:cursor-not-allowed transition-all">
            {busy ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full spinR" />Verifying…</> : <><MdVerified className="text-[17px]" />Verify OTP</>}
          </button>

          <div className="text-center">
            {canResend ? (
              <div className="flex flex-col items-center !gap-2">
                <p className="text-[12px] text-slate-400 !m-0">Didn't receive the code?</p>
                <button onClick={() => { setDigits(Array(LEN).fill('')); setTimer(SEC); setCanResend(false); setErr(''); doSend(true); setTimeout(() => refs.current[0]?.focus(), 50) }}
                  className="flex items-center !gap-1.5 !px-4 !py-2 rounded-[10px] bg-[#0B1E4B] text-white text-[12.5px] font-extrabold hover:bg-[#152B6B] transition-all">
                  <FaEnvelope className="text-[11px]" /> Resend OTP
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-center !gap-2">
                <div className="relative w-8 h-8 flex-shrink-0">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 32 32">
                    <circle cx="16" cy="16" r="13" fill="none" stroke="#f1f5f9" strokeWidth="2.5" />
                    <circle cx="16" cy="16" r="13" fill="none" stroke="#F05A1A" strokeWidth="2.5"
                      strokeDasharray={`${2*Math.PI*13}`}
                      strokeDashoffset={`${2*Math.PI*13*(1-timer/SEC)}`}
                      strokeLinecap="round" style={{ transition: 'stroke-dashoffset 1s linear' }} />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center text-[9px] font-extrabold text-[#F05A1A]">{timer}</span>
                </div>
                <p className="text-[12px] text-slate-400 !m-0">Resend in <span className="font-bold text-[#0B1E4B]">{timer}s</span></p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ════════════════════════════════════════════════════════
   QUERY FORM MODAL
════════════════════════════════════════════════════════ */
function QueryFormModal({ tabData, onClose }) {
  const [form, setForm] = useState({
    fullName: '', email: '', emailVerified: false,
    phone: '', gender: '', age: '',
    address: '', membershipType: '', message: '', terms: false,
  })
  const [errors,  setErrors]  = useState({})
  const [showOTP, setShowOTP] = useState(false)
  const [success, setSuccess] = useState(false)
  const [busy,    setBusy]    = useState(false)

  const set = (k, v) => { setForm(p => ({ ...p, [k]: v })); setErrors(e => ({ ...e, [k]: '' })) }

  const validate = () => {
    const e = {}
    if (!form.fullName.trim())  e.fullName       = 'Full name is required'
    if (!form.email.trim())     e.email          = 'Email is required'
    if (!form.emailVerified)    e.email          = 'Please verify your email first'
    if (!form.phone.trim())     e.phone          = 'Phone number is required'
    if (!form.gender)           e.gender         = 'Please select gender'
    if (!form.age)              e.age            = 'Age is required'
    if (+form.age < 5 || +form.age > 100) e.age  = 'Enter valid age (5–100)'
    if (!form.address.trim())   e.address        = 'Address is required'
    if (!form.membershipType || form.membershipType.startsWith('—'))
                                e.membershipType = 'Please select membership type'
    if (!form.terms)            e.terms          = 'Please accept the terms & conditions'
    return e
  }

  const handleSubmit = async () => {
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setBusy(true)
    try {
      const payload = new FormData()
      payload.append('formType', 'membership-query')
      payload.append('category', tabData.id)
      payload.append('fullName', form.fullName.trim())
      payload.append('email', form.email.trim().toLowerCase())
      payload.append('phone', form.phone.trim())
      payload.append('gender', form.gender)
      payload.append('age', String(form.age))
      payload.append('address', form.address.trim())
      payload.append('membershipType', form.membershipType)
      payload.append('message', form.message.trim())
      payload.append('termsAccepted', form.terms ? 'true' : 'false')

      await submitMemberForm(payload)
      setSuccess(true)
    } catch (e) {
      setErrors({ submit: e?.response?.data?.message || 'Submission failed. Please try again.' })
    } finally { setBusy(false) }
  }

  const ac = tabData.accentColor

  /* Success screen */
  if (success) return (
    <div className="fixed inset-0 z-[9997] flex items-center justify-center !p-4 bg-[rgba(11,30,75,.6)] backdrop-blur-[6px]">
      <div className="bg-white rounded-[24px] shadow-2xl !p-10 max-w-[380px] w-full text-center flex flex-col items-center !gap-5">
        <div className="w-20 h-20 rounded-full bg-[#f0faf4] border-4 border-[#1a6b3a] flex items-center justify-center">
          <MdVerified className="text-[#1a6b3a] text-[40px]" />
        </div>
        <div>
          <h3 className="text-[#0B1E4B] font-extrabold text-[20px] !m-0 !mb-2">Query Submitted!</h3>
          <p className="text-slate-500 text-[13.5px] leading-relaxed !m-0">
            Thank you for your interest in <span className="font-bold text-[#F05A1A]">{tabData.label}</span>.<br/>
            Our team will contact you within <strong className="text-[#0B1E4B]">48 hours</strong>.
          </p>
        </div>
        <div className="flex items-center !gap-2 !px-4 !py-2.5 rounded-xl bg-[#FFF3EC] border border-[rgba(240,90,26,.2)]">
          <FaCheckCircle className="text-[#F05A1A] text-[13px]" />
          <span className="text-[12.5px] font-semibold text-slate-600">Confirmation email will be sent shortly.</span>
        </div>
        <button onClick={onClose} className="w-full h-11 rounded-xl bg-gradient-to-r from-[#0B1E4B] to-[#152B6B] text-white font-extrabold text-[13.5px] hover:shadow-lg transition-all">
          Close
        </button>
      </div>
    </div>
  )

  return (
    <>
      {showOTP && (
        <OTPModal email={form.email}
          onVerified={() => { set('emailVerified', true); setShowOTP(false) }}
          onClose={() => setShowOTP(false)}
        />
      )}

      <div className="fixed inset-0 z-[9997] flex items-center justify-center !p-4 bg-[rgba(11,30,75,.6)] backdrop-blur-[6px]"
        onClick={e => { if (e.target === e.currentTarget) onClose() }}>
        <style>{`
          @keyframes slideUp{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}
          .slide-up{animation:slideUp .3s cubic-bezier(.16,1,.3,1) both}
          @keyframes spinR{to{transform:rotate(360deg)}} .spinR{animation:spinR .7s linear infinite}
        `}</style>

        <div className="relative bg-white rounded-[28px] w-full max-w-[540px] max-h-[92vh] flex flex-col shadow-[0_32px_100px_rgba(11,30,75,.22)] overflow-hidden slide-up">

          {/* top accent */}
          <div className="h-[5px] w-full" style={{ background: `linear-gradient(90deg,#0B1E4B,${ac},#0B1E4B)` }} />

          {/* header */}
          <div className="!px-7 !pt-5 !pb-4 border-b border-slate-100 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center !gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: tabData.accentLight }}>
                <tabData.Icon style={{ color: ac }} className="text-[17px]" />
              </div>
              <div>
                <h3 className="!m-0 text-[15px] font-extrabold text-[#0B1E4B]">Query Form For Membership</h3>
                <p className="!m-0 text-[11px] text-slate-400">{tabData.label}</p>
              </div>
            </div>
            <button onClick={onClose} className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-colors">
              <MdClose className="text-[16px]" />
            </button>
          </div>

          {/* scrollable body */}
          <div className="flex-1 overflow-y-auto !px-7 !py-5 flex flex-col !gap-4" style={{ scrollbarWidth: 'thin' }}>

            <QField label="Full Name" required error={errors.fullName}>
              <QInput type="text" placeholder="Enter your full name" value={form.fullName}
                onChange={e => set('fullName', e.target.value)} err={errors.fullName} />
            </QField>

            {/* Email + Verify button → OTP popup */}
            <QField label="Email Address" required error={errors.email}>
              <div className="flex !gap-2">
                <input type="email" placeholder="your@email.com" value={form.email}
                  disabled={form.emailVerified}
                  onChange={e => { set('email', e.target.value); set('emailVerified', false) }}
                  className={`flex-1 h-11 !px-3.5 rounded-xl border-[1.5px] text-[13.5px] font-medium placeholder:text-slate-300 focus:outline-none transition-all
                    ${form.emailVerified ? 'border-[#1a6b3a] bg-[#f0faf4] text-[#1a6b3a] cursor-not-allowed'
                    : errors.email      ? 'border-red-400 bg-white text-[#0B1E4B]'
                    : 'border-slate-200 bg-white text-[#0B1E4B] focus:border-[#F05A1A] focus:ring-2 focus:ring-[#F05A1A]/10'}`}
                />
                {form.emailVerified ? (
                  <div className="flex items-center !gap-1.5 !px-4 h-11 rounded-xl bg-[#f0faf4] border-[1.5px] border-[#1a6b3a] text-[#1a6b3a] text-[12px] font-extrabold flex-shrink-0 whitespace-nowrap">
                    <MdVerified className="text-[14px]" /> Verified
                  </div>
                ) : (
                  <button type="button" onClick={() => setShowOTP(true)}
                    disabled={!form.email || !form.email.includes('@')}
                    className="flex items-center !gap-1.5 !px-4 h-11 rounded-xl bg-[#0B1E4B] text-white text-[12px] font-extrabold flex-shrink-0 hover:bg-[#152B6B] disabled:opacity-40 disabled:cursor-not-allowed transition-all whitespace-nowrap">
                    <FaEnvelope className="text-[10px]" /> Verify
                  </button>
                )}
              </div>
            </QField>

            <div className="grid grid-cols-1 sm:grid-cols-2 !gap-3">
              <QField label="Phone Number" required error={errors.phone}>
                <QInput type="tel" placeholder="+91 9876543210" value={form.phone}
                  onChange={e => set('phone', e.target.value)} err={errors.phone} />
              </QField>
              <QField label="Gender" required error={errors.gender}>
                <QSelect value={form.gender} onChange={e => set('gender', e.target.value)} err={errors.gender}>
                  {GENDER_OPTS.map(g => <option key={g} value={g}>{g || '— Select Gender —'}</option>)}
                </QSelect>
              </QField>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 !gap-3">
              <QField label="Age" required error={errors.age}>
                <QInput type="number" placeholder="e.g. 28" min="5" max="100"
                  value={form.age} onChange={e => set('age', e.target.value)} err={errors.age} />
              </QField>
              <QField label="Membership Type" required error={errors.membershipType}>
                <QSelect value={form.membershipType} onChange={e => set('membershipType', e.target.value)} err={errors.membershipType}>
                  {tabData.membershipOpts.map(o => <option key={o} value={o}>{o}</option>)}
                </QSelect>
              </QField>
            </div>

            <QField label="Full Address" required error={errors.address}>
              <QInput type="text" placeholder="House No., Street, Area, City, State – PIN Code"
                value={form.address} onChange={e => set('address', e.target.value)} err={errors.address} />
            </QField>

            <QField label="Message / Query (Optional)">
              <textarea rows={3} placeholder="Any questions or additional details…"
                value={form.message} onChange={e => set('message', e.target.value)}
                className="w-full !px-3.5 !py-2.5 rounded-xl border-[1.5px] border-slate-200 bg-white resize-none text-[13.5px] font-medium text-[#0B1E4B] placeholder:text-slate-300 placeholder:font-normal focus:outline-none focus:border-[#F05A1A] focus:ring-2 focus:ring-[#F05A1A]/10 transition-all" />
            </QField>

            {/* Terms & Conditions */}
            <div>
              <label className="flex items-start !gap-2.5 cursor-pointer">
                <input type="checkbox" checked={form.terms} onChange={e => set('terms', e.target.checked)}
                  className="!mt-1 w-4 h-4 accent-[#F05A1A] flex-shrink-0 cursor-pointer" />
                <span className="text-[12.5px] text-slate-600 leading-relaxed">
                  I accept the{' '}
                  <a href="#" className="text-[#F05A1A] font-bold underline">Terms &amp; Conditions</a>
                  {' '}and{' '}
                  <a href="#" className="text-[#F05A1A] font-bold underline">Privacy Policy</a>
                  {' '}of UDIISA. I confirm all information provided is accurate.
                </span>
              </label>
              {errors.terms && <p className="text-[11.5px] text-red-500 font-semibold !mt-1 !ml-6">{errors.terms}</p>}
            </div>

            {errors.submit && (
              <div className="flex items-center !gap-2 !px-3 !py-2.5 rounded-xl bg-red-50 border border-red-200">
                <FaTimesCircle className="text-red-400 text-[13px]" />
                <span className="text-[12px] text-red-500 font-semibold">{errors.submit}</span>
              </div>
            )}
          </div>

          {/* footer buttons */}
          <div className="!px-7 !py-4 border-t border-slate-100 flex !gap-3 justify-end flex-shrink-0">
            <button onClick={onClose} className="!px-5 !py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 text-[13px] font-bold transition-all">
              Cancel
            </button>
            <button onClick={handleSubmit} disabled={busy}
              className="flex items-center !gap-2 !px-6 !py-2.5 rounded-xl text-white text-[13px] font-extrabold disabled:opacity-60 disabled:cursor-not-allowed transition-all hover:shadow-lg hover:-translate-y-px"
              style={{ background: `linear-gradient(135deg,${ac},${ac}cc)`, boxShadow: `0 4px 14px ${ac}40` }}>
              {busy ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full spinR" /> : <HiArrowRight className="text-[15px]" />}
              {busy ? 'Submitting…' : 'Submit Query'}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

/* tiny form atoms */
function QField({ label, required, error, children }) {
  return (
    <div className="flex flex-col !gap-1.5">
      {label && <label className="text-[11px] font-extrabold text-[#0B1E4B] uppercase tracking-[1.3px]">
        {label}{required && <span className="text-[#F05A1A] !ml-0.5">*</span>}
      </label>}
      {children}
      {error && <span className="flex items-center !gap-1 text-[11.5px] text-red-500 font-semibold">
        <FaTimesCircle className="text-[10px]" />{error}
      </span>}
    </div>
  )
}
function QInput({ err, ...props }) {
  return <input className={`w-full h-11 !px-3.5 rounded-xl border-[1.5px] bg-white text-[13.5px] font-medium text-[#0B1E4B] placeholder:text-slate-300 placeholder:font-normal focus:outline-none transition-all
    ${err ? 'border-red-400 focus:ring-2 focus:ring-red-400/10' : 'border-slate-200 focus:border-[#F05A1A] focus:ring-2 focus:ring-[#F05A1A]/10'}`} {...props} />
}
function QSelect({ err, children, ...props }) {
  return (
    <div className="relative">
      <select className={`w-full h-11 !px-3.5 !pr-9 rounded-xl border-[1.5px] bg-white appearance-none text-[13.5px] font-medium text-[#0B1E4B] cursor-pointer focus:outline-none transition-all
        ${err ? 'border-red-400' : 'border-slate-200 focus:border-[#F05A1A] focus:ring-2 focus:ring-[#F05A1A]/10'}`} {...props}>
        {children}
      </select>
      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-[10px]">▼</div>
    </div>
  )
}

/* ════════════════════════════════════════════════════════
   TAB CONTENT COMPONENT
════════════════════════════════════════════════════════ */
function TabContent({ data, onFillOnline }) {
  const ac = data.accentColor

  return (
    <div className="flex flex-col !gap-8">

      <p className="text-slate-600 text-[14px] leading-[1.8] !m-0 max-w-[820px]">{data.description}</p>

      {/* Eligibility + Documents */}
      <div className="grid grid-cols-1 md:grid-cols-2 !gap-5">
        <div className="bg-white rounded-[20px] border border-slate-100 shadow-[0_4px_20px_rgba(11,30,75,.06)] !p-6">
          <h4 className="flex items-center !gap-2.5 !m-0 !mb-5 text-[12.5px] font-extrabold text-[#0B1E4B] uppercase tracking-wider">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: data.accentLight }}>
              <FaCheckCircle style={{ color: ac }} className="text-[12px]" />
            </div>
            Eligibility
          </h4>
          <ul className="flex flex-col !gap-3 !m-0 !p-0 list-none">
            {data.eligibility.map((item, i) => (
              <li key={i} className="flex items-start !gap-2.5">
                <div className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center !mt-0.5" style={{ background: data.accentLight }}>
                  <span className="text-[9px] font-extrabold" style={{ color: ac }}>{i+1}</span>
                </div>
                <span className="text-[13px] text-slate-600 leading-[1.65]">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-[20px] border border-slate-100 shadow-[0_4px_20px_rgba(11,30,75,.06)] !p-6">
          <h4 className="flex items-center !gap-2.5 !m-0 !mb-5 text-[12.5px] font-extrabold text-[#0B1E4B] uppercase tracking-wider">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: data.accentLight }}>
              <FaFileAlt style={{ color: ac }} className="text-[12px]" />
            </div>
            Documents Required
          </h4>
          <ul className="flex flex-col !gap-3 !m-0 !p-0 list-none">
            {data.documents.map((doc, i) => (
              <li key={i} className="flex items-start !gap-2.5">
                <div className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center !mt-0.5 bg-[#FFF3EC]">
                  <FaCheckCircle className="text-[#F05A1A] text-[9px]" />
                </div>
                <span className="text-[13px] text-slate-600 leading-[1.65]">{doc}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

     <div className="overflow-x-auto">
  <table className="w-full text-left border border-slate-200">
    <thead>
      <tr className="border-b border-slate-200">
        <th className="!px-5 !py-3 text-[12px] font-semibold text-slate-700">
          {data.id === 'corporate' ? 'Company Turnover Range' : 'Membership Sub-Type'}
        </th>
        <th className="!px-5 !py-3 text-[12px] font-semibold text-right text-slate-700">
          Subscription Amount
        </th>
        <th className="!px-5 !py-3 text-[12px] font-semibold hidden md:table-cell text-slate-700">
          Key Benefits
        </th>
      </tr>
    </thead>

    <tbody>
      {data.feeTable.map((row, i) => (
        <tr key={i} className="border-b border-slate-100">
          <td className="!px-5 !py-3 text-[13px] text-slate-800">
            {row.subType}
          </td>

          <td className="!px-5 !py-3 text-right">
            <span className="text-[13px] font-semibold text-[#0B1E4B]">
              {row.amount}
            </span>
            <span className="text-[10px] text-slate-400 !ml-1">
              + GST
            </span>
          </td>

          <td className="!px-5 !py-3 hidden md:table-cell">
            <div className="flex flex-wrap !gap-1">
              {row.benefits.map((b, j) => (
                <span key={j} className="text-[11px] text-slate-600">
                  {b}
                </span>
              ))}
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

      {/* Benefits Grid */}
      <div className="bg-white rounded-[20px] border border-slate-100 shadow-[0_4px_20px_rgba(11,30,75,.06)] !p-6">
        <h4 className="flex items-center !gap-2.5 !m-0 !mb-5 text-[12.5px] font-extrabold text-[#0B1E4B] uppercase tracking-wider">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: data.accentLight }}>
            <BsStarFill style={{ color: ac }} className="text-[11px]" />
          </div>
          Benefits to Members
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 !gap-4">
          {data.benefits.map(({ icon: Icon, text }, i) => (
            <div key={i} className="flex items-start !gap-3 !p-4 rounded-[14px] border border-slate-100 bg-slate-50/60 hover:bg-white hover:border-slate-200 hover:shadow-sm transition-all">
              <div className="w-9 h-9 rounded-[10px] flex-shrink-0 flex items-center justify-center" style={{ background: data.accentLight }}>
                <Icon style={{ color: ac }} className="text-[14px]" />
              </div>
              <p className="text-[12.5px] text-slate-600 font-medium leading-[1.55] !m-0 !pt-1.5">{text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA — Fill Online */}
      <div className="flex flex-wrap items-center justify-between !gap-5 !px-6 !py-5 rounded-[20px] border-2 border-dashed"
        style={{ borderColor: `${ac}35`, background: data.accentLight }}>
        <div>
          <p className="!m-0 text-[14px] font-extrabold text-[#0B1E4B]">Ready to apply for {data.label}?</p>
          <p className="!m-0 !mt-1 text-[12.5px] text-slate-500">Fill the online query form and our team will respond within 48 hours.</p>
        </div>
        <div className="flex !gap-3 flex-wrap">
          <button onClick={onFillOnline}
            className="flex items-center !gap-2 !px-5 !py-2.5 rounded-xl text-white text-[13px] font-extrabold transition-all hover:shadow-lg hover:-translate-y-px"
            style={{ background: `linear-gradient(135deg,${ac},${ac}dd)`, boxShadow: `0 4px 14px ${ac}30` }}>
            <HiArrowRight className="text-[15px]" /> Fill Online
          </button>
        </div>
      </div>

    </div>
  )
}

/* ════════════════════════════════════════════════════════
   MAIN EXPORT — MembershipDetail
════════════════════════════════════════════════════════ */
export default function MembershipDetail() {
  // ── CHANGE 3: URL-based active tab ───────────────────────────────────────────
  const navigate        = useNavigate()
  const { pathname }    = useLocation()
  const activeTab       = PATH_TO_TAB[pathname] || 'individual'
  const [showForm, setShowForm] = useState(false)
  const tabData = MEMBERSHIP_DATA[activeTab]

  // ── CHANGE 4: tab click navigates to new path & closes any open form ─────────
  const handleTabChange = (tabId) => {
    setShowForm(false)
    navigate(TAB_TO_PATH[tabId])
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F4F6FB] to-white">
      <style>{`
        @keyframes fadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
        .fade-up{animation:fadeUp .35s ease both}
      `}</style>

      <div className="max-w-[1280px] !mx-auto !px-4 sm:!px-6 lg:!px-8 !py-10">

        {/* ── TAB BAR ── */}
        <div className="flex flex-col sm:flex-row !gap-2 !mb-8 bg-white rounded-[18px] border border-slate-200 !p-2 shadow-[0_4px_20px_rgba(11,30,75,.07)]">
          {TABS.map(tab => {
            const m      = MEMBERSHIP_DATA[tab.id]
            const active = activeTab === tab.id
            return (
              <button key={tab.id}
                onClick={() => handleTabChange(tab.id)}   // ← CHANGE 4 applied here
                className={`flex-1 flex items-center justify-center !gap-2.5 !py-3 !px-4 rounded-[13px] text-[13px] font-extrabold cursor-pointer transition-all duration-200
                  ${active ? 'text-white shadow-md' : 'text-slate-500 hover:text-[#0B1E4B] hover:bg-slate-50'}`}
                style={active
                  ? { background: `linear-gradient(135deg,${m.accentColor},${m.accentColor}cc)`, boxShadow: `0 4px 14px ${m.accentColor}35` }
                  : {}}>
                <tab.Icon className={`text-[15px] ${active ? 'text-white opacity-90' : 'text-slate-400'}`} />
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">{tab.shortLabel}</span>
              </button>
            )
          })}
        </div>

        {/* ── TAB HEADING ── */}
        <div className="flex items-center !gap-3 !mb-7 fade-up" key={activeTab + 'h'}>
          <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: tabData.accentLight }}>
            <tabData.Icon style={{ color: tabData.accentColor }} className="text-[17px]" />
          </div>
          <div>
            <h2 className="!m-0 text-[clamp(18px,2.5vw,22px)] font-extrabold text-[#0B1E4B] leading-tight">{tabData.label}</h2>
            <p className="!m-0 text-[12.5px] text-slate-400">{tabData.tagline}</p>
          </div>
        </div>

        {/* ── TAB CONTENT ── */}
        <div className="fade-up" key={activeTab + 'c'}>
          <TabContent data={tabData} onFillOnline={() => setShowForm(true)} />
        </div>

      </div>

      {/* ── QUERY FORM MODAL ── */}
      {showForm && <QueryFormModal tabData={tabData} onClose={() => setShowForm(false)} />}
    </div>
  )
}