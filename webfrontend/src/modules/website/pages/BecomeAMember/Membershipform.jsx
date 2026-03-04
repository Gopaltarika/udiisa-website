/**
 * MembershipForm.jsx
 * ─────────────────────────────────────────────────────────────
 * Stack  : React + Tailwind CSS + react-icons + react-router-dom
 * Rules  : NO style={} — only className={} with Tailwind classes
 *          !p-[] !m-[] for important padding/margin
 *
 * NEW: OTP Email Verification Popup
 *   - Verify button click → OTP modal opens
 *   - Mock OTP generated (console.log) — replace with API
 *   - 60s countdown timer → Resend option after timer expires
 *   - 6-digit OTP input with individual boxes
 *   - Match → verified ✓ | No match → error shown
 */

import { useState, useRef, useEffect, useCallback } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
    FaUsers, FaStar, FaUpload, FaEnvelope, FaBuilding,
    FaTimesCircle, FaCopy, FaQrcode, FaRupeeSign,
    FaShieldAlt, FaTrophy, FaMedal, FaIdCard,
    FaCheckCircle, FaMapMarkerAlt,
} from 'react-icons/fa'
import { BsStarFill, BsPersonBadge } from 'react-icons/bs'
import {
    MdVerified, MdGroups, MdOutlinePayment, MdCheckCircle,
    MdClose,
} from 'react-icons/md'
import { HiSparkles, HiArrowRight } from 'react-icons/hi'
import { submitMemberForm, sendOtp, verifyOtp } from '../../../../shared/services/publicApi'

/* ════════════════════════════════════════════════════════
   CONSTANTS & CONFIG
════════════════════════════════════════════════════════ */

const PAYMENT_CONFIG = {
    'sports-men': {
        label: 'Sports Men',
        amount: '₹1,200',
        amountNum: 1200,
        upiId: 'udisports@razorpay',
        note: 'Sports Men Membership Fee',
        qrUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=upi://pay?pa=udisports@razorpay%26pn=UDI%20Sports%20NGO%26am=1200%26cu=INR%26tn=Sports%20Men%20Membership',
        badgeCls: 'bg-[#1a6b3a] text-white',
        amtCls: 'bg-[#1a6b3a]',
        textCls: 'text-[#1a6b3a]',
        borderCls: 'border-[#1a6b3a]',
        shadowCls: 'shadow-[0_4px_16px_rgba(26,107,58,0.3)]',
    },
    'general': {
        label: 'General',
        amount: '₹12,000',
        amountNum: 12000,
        upiId: 'udisports@razorpay',
        note: 'General Membership Fee',
        qrUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=upi://pay?pa=udisports@razorpay%26pn=UDI%20Sports%20NGO%26am=12000%26cu=INR%26tn=General%20Membership',
        badgeCls: 'bg-[#0B1E4B] text-white',
        amtCls: 'bg-[#0B1E4B]',
        textCls: 'text-[#0B1E4B]',
        borderCls: 'border-[#0B1E4B]',
        shadowCls: 'shadow-[0_4px_16px_rgba(11,30,75,0.3)]',
    },
}

const MEMBER_TYPE_OPTS = [
    { value: '', label: '— Select Member Type —' },
    { value: 'sports-men', label: 'Sports Men  (₹1,200 / year)' },
    { value: 'general', label: 'General  (₹12,000 / year)' },
]

const GENDER_OPTS = [
    { value: '', label: '— Select Gender —' },
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other / Prefer not to say' },
]

const QUALIFICATION_OPTS = [
    { value: '', label: '— Select Qualification —' },
    { value: 'below-10th', label: 'Below 10th' },
    { value: '10th', label: '10th Pass' },
    { value: '12th', label: '12th / Intermediate' },
    { value: 'graduate', label: 'Graduate (B.A / B.Sc / B.Com / B.Tech…)' },
    { value: 'post-graduate', label: 'Post Graduate' },
    { value: 'doctorate', label: 'Doctorate / PhD' },
    { value: 'other', label: 'Other' },
]

const SPECIAL_BENEFITS = [
    { Icon: BsStarFill, text: 'Exclusive "Special Member" title & framed certificate' },
    { Icon: FaTrophy, text: 'VIP access to all national & state sports events' },
    { Icon: MdGroups, text: 'Invitation to Annual General Body Meeting (AGM)' },
    { Icon: FaShieldAlt, text: 'Lifetime recognition on NGO Hall of Fame wall' },
    { Icon: FaMedal, text: 'Priority mention in media, press & social campaigns' },
    { Icon: FaUsers, text: 'Direct networking with top sports personalities' },
]

const UPI_STEPS = [
    'Scan QR code or copy UPI ID',
    'Enter the exact amount shown above',
    'Note the UTR / Reference number',
    'Enter UTR & your name in the form below',
]

const UPI_APPS = ['GPay', 'PhonePe', 'Paytm', 'BHIM', 'Amazon Pay']

/* ════════════════════════════════════════════════════════
   OTP — request from backend (sendOtp), verify with verifyOtp
   OTP VERIFICATION MODAL
════════════════════════════════════════════════════════ */
const OTPModal = ({ email, onVerified, onClose }) => {
    const OTP_LENGTH = 6
    const RESEND_SECONDS = 60

    const [otpDigits, setOtpDigits] = useState(Array(OTP_LENGTH).fill(''))
    const [timer, setTimer] = useState(RESEND_SECONDS)
    const [canResend, setCanResend] = useState(false)
    const [otpErr, setOtpErr] = useState('')
    const [shake, setShake] = useState(false)
    const [verifying, setVerifying] = useState(false)
    const [otpSent, setOtpSent] = useState(false)
    const inputRefs = useRef([])

    const requestOtp = () => {
        setOtpErr('')
        sendOtp(email).then(() => { setOtpSent(true); setTimer(RESEND_SECONDS); setCanResend(false) })
            .catch((e) => setOtpErr(e?.response?.data?.message || 'Failed to send OTP'))
    }

    useEffect(() => {
        if (email && !otpSent) requestOtp()
    }, [email])

    /* Countdown timer */
    useEffect(() => {
        if (timer <= 0) { setCanResend(true); return }
        const t = setTimeout(() => setTimer(p => p - 1), 1000)
        return () => clearTimeout(t)
    }, [timer])

    /* Auto-focus first input on open */
    useEffect(() => {
        setTimeout(() => inputRefs.current[0]?.focus(), 120)
    }, [])

    const handleDigit = (idx, val) => {
        const digit = val.replace(/\D/g, '').slice(-1)
        const next = [...otpDigits]
        next[idx] = digit
        setOtpDigits(next)
        setOtpErr('')
        if (digit && idx < OTP_LENGTH - 1) {
            inputRefs.current[idx + 1]?.focus()
        }
    }

    const handleKeyDown = (idx, e) => {
        if (e.key === 'Backspace' && !otpDigits[idx] && idx > 0) {
            inputRefs.current[idx - 1]?.focus()
        }
        if (e.key === 'ArrowLeft' && idx > 0) inputRefs.current[idx - 1]?.focus()
        if (e.key === 'ArrowRight' && idx < OTP_LENGTH - 1) inputRefs.current[idx + 1]?.focus()
    }

    const handlePaste = (e) => {
        e.preventDefault()
        const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, OTP_LENGTH)
        const next = Array(OTP_LENGTH).fill('')
        pasted.split('').forEach((ch, i) => { next[i] = ch })
        setOtpDigits(next)
        setOtpErr('')
        const focusIdx = Math.min(pasted.length, OTP_LENGTH - 1)
        inputRefs.current[focusIdx]?.focus()
    }

    const handleResend = () => {
        setOtpDigits(Array(OTP_LENGTH).fill(''))
        setTimer(RESEND_SECONDS)
        setCanResend(false)
        setOtpErr('')
        requestOtp()
        setTimeout(() => inputRefs.current[0]?.focus(), 50)
    }

    const handleVerify = async () => {
        const entered = otpDigits.join('')
        if (entered.length < OTP_LENGTH) {
            setOtpErr('Please enter all 6 digits')
            triggerShake()
            return
        }
        setVerifying(true)
        setOtpErr('')
        verifyOtp(email, entered)
            .then(() => onVerified())
            .catch((e) => {
                setOtpErr(e?.response?.data?.message || 'Incorrect OTP. Please try again.')
                setOtpDigits(Array(OTP_LENGTH).fill(''))
                triggerShake()
                setTimeout(() => inputRefs.current[0]?.focus(), 50)
            })
            .finally(() => setVerifying(false))
    }

    const triggerShake = () => {
        setShake(true)
        setTimeout(() => setShake(false), 500)
    }

    const filled = otpDigits.filter(Boolean).length

    return (
        /* Backdrop */
        <div
            className="fixed inset-0 z-[9999] flex items-center justify-center !p-[16px]"
            style={{ background: 'rgba(11,30,75,0.55)', backdropFilter: 'blur(6px)' }}
            onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
        >
            {/* Modal Card */}
            <div
                className="
                    relative w-full max-w-[420px] bg-white rounded-[24px]
                    shadow-[0_24px_80px_rgba(11,30,75,0.22)]
                    overflow-hidden
                "
                style={{ animation: 'modalPop 0.28s cubic-bezier(0.34,1.56,0.64,1) both' }}
            >
                <style>{`
                    @keyframes modalPop {
                        from { opacity:0; transform:scale(0.88) translateY(16px); }
                        to   { opacity:1; transform:scale(1) translateY(0); }
                    }
                    @keyframes shakeOTP {
                        0%,100%{ transform:translateX(0); }
                        20%    { transform:translateX(-6px); }
                        40%    { transform:translateX(6px); }
                        60%    { transform:translateX(-4px); }
                        80%    { transform:translateX(4px); }
                    }
                    .shake-otp { animation: shakeOTP 0.45s ease; }
                    @keyframes spin360 {
                        to { transform: rotate(360deg); }
                    }
                    .spin { animation: spin360 0.7s linear infinite; }
                `}</style>

                {/* Header */}
                <div className="
                    bg-gradient-to-r from-[#0B1E4B] to-[#1e3a8a]
                    !px-[28px] !py-[26px] text-center relative overflow-hidden
                ">
                    <div className="absolute -top-[30px] -right-[30px] w-[100px] h-[100px] rounded-full bg-[rgba(240,90,26,0.12)]" />
                    <div className="absolute -bottom-[20px] -left-[20px] w-[80px] h-[80px] rounded-full bg-[rgba(255,255,255,0.04)]" />

                    {/* Close button */}
                    <button
                        type="button"
                        onClick={onClose}
                        className="
                            absolute top-[14px] right-[14px] z-10
                            w-[30px] h-[30px] rounded-full
                            bg-white/10 hover:bg-white/20
                            flex items-center justify-center
                            text-white/60 hover:text-white
                            transition-all duration-200
                        "
                    >
                        <MdClose className="text-[16px]" />
                    </button>

                    <div className="relative z-10">
                        <div className="
                            w-[52px] h-[52px] rounded-[16px] !mx-auto !mb-[12px]
                            bg-gradient-to-br from-[#F05A1A] to-[#FF7D42]
                            flex items-center justify-center
                            shadow-[0_8px_24px_rgba(240,90,26,0.4)]
                        ">
                            <FaEnvelope className="text-white text-[22px]" />
                        </div>
                        <h3 className="text-white font-extrabold text-[18px] tracking-[0.5px] !m-0 !mb-[4px]">
                            Verify Your Email
                        </h3>
                        <p className="text-white/50 text-[12.5px] !m-0">
                            OTP sent to <span className="text-white/80 font-semibold">{email}</span>
                        </p>
                    </div>
                </div>

                <div className="!p-[28px] flex flex-col !gap-[20px]">

                    {/* Info note */}
                    <div className="flex items-start !gap-[10px] !px-[14px] !py-[11px] rounded-[12px] bg-[#EFF6FF] border border-blue-100">
                        <FaShieldAlt className="text-blue-400 text-[13px] flex-shrink-0 !mt-[1px]" />
                        <p className="text-[12px] text-blue-600 !m-0 leading-[1.55]">
                            Enter the <strong>6-digit OTP</strong> sent to your email address. Valid for <strong>10 minutes</strong>.
                        </p>
                    </div>

                    {/* OTP Digit Boxes */}
                    <div className="flex flex-col !gap-[10px]">
                        <label className="text-[11px] font-extrabold text-[#0B1E4B] uppercase tracking-[1.3px] !m-0">
                            Enter OTP
                        </label>
                        <div
                            className={`flex justify-between !gap-[8px] ${shake ? 'shake-otp' : ''}`}
                            onPaste={handlePaste}
                        >
                            {otpDigits.map((digit, idx) => (
                                <input
                                    key={idx}
                                    ref={el => inputRefs.current[idx] = el}
                                    type="text"
                                    inputMode="numeric"
                                    maxLength={1}
                                    value={digit}
                                    onChange={e => handleDigit(idx, e.target.value)}
                                    onKeyDown={e => handleKeyDown(idx, e)}
                                    className={`
                                        w-full h-[54px] rounded-[12px] text-center
                                        text-[22px] font-extrabold
                                        border-[2px] bg-white
                                        focus:outline-none transition-all duration-200
                                        caret-transparent select-none
                                        ${otpErr
                                            ? 'border-red-400 text-red-500 bg-red-50 focus:ring-2 focus:ring-red-400/20'
                                            : digit
                                                ? 'border-[#F05A1A] text-[#0B1E4B] bg-[#FFF9F6] shadow-[0_2px_8px_rgba(240,90,26,0.12)]'
                                                : 'border-slate-200 text-[#0B1E4B] focus:border-[#F05A1A] focus:ring-2 focus:ring-[#F05A1A]/10'
                                        }
                                    `}
                                />
                            ))}
                        </div>

                        {/* Progress dots */}
                        <div className="flex justify-center !gap-[6px]">
                            {otpDigits.map((d, i) => (
                                <div
                                    key={i}
                                    className={`
                                        w-[5px] h-[5px] rounded-full transition-all duration-200
                                        ${d ? 'bg-[#F05A1A] scale-110' : 'bg-slate-200'}
                                    `}
                                />
                            ))}
                        </div>

                        {/* Error */}
                        {otpErr && (
                            <div className="flex items-center !gap-[6px] !px-[12px] !py-[9px] rounded-[10px] bg-red-50 border border-red-200">
                                <FaTimesCircle className="text-red-400 text-[13px] flex-shrink-0" />
                                <span className="text-[12px] font-semibold text-red-500">{otpErr}</span>
                            </div>
                        )}
                    </div>

                    {/* Verify Button */}
                    <button
                        type="button"
                        onClick={handleVerify}
                        disabled={filled < OTP_LENGTH || verifying}
                        className="
                            w-full h-[50px] rounded-[14px]
                            bg-gradient-to-r from-[#F05A1A] to-[#FF7D42] text-white
                            text-[14.5px] font-extrabold tracking-[0.5px]
                            flex items-center justify-center !gap-[8px]
                            shadow-[0_6px_24px_rgba(240,90,26,0.35)]
                            hover:shadow-[0_10px_32px_rgba(240,90,26,0.50)]
                            hover:-translate-y-[2px] active:scale-[0.98]
                            disabled:opacity-50 disabled:cursor-not-allowed
                            disabled:hover:translate-y-0 disabled:hover:shadow-none
                            transition-all duration-200
                        "
                    >
                        {verifying ? (
                            <>
                                <div className="w-[18px] h-[18px] border-[2.5px] border-white/30 border-t-white rounded-full spin" />
                                Verifying…
                            </>
                        ) : (
                            <>
                                <MdVerified className="text-[18px]" />
                                Verify OTP
                            </>
                        )}
                    </button>

                    {/* Resend Section */}
                    <div className="text-center !pt-[4px]">
                        {canResend ? (
                            <div className="flex flex-col items-center !gap-[8px]">
                                <p className="text-[12.5px] text-slate-400 !m-0">Didn't receive the code?</p>
                                <button
                                    type="button"
                                    onClick={handleResend}
                                    className="
                                        flex items-center !gap-[6px]
                                        !px-[18px] !py-[8px] rounded-[10px]
                                        bg-[#0B1E4B] text-white
                                        text-[12.5px] font-extrabold
                                        hover:bg-[#152B6B] active:scale-[0.97]
                                        transition-all duration-200
                                    "
                                >
                                    <FaEnvelope className="text-[11px]" />
                                    Resend OTP
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center justify-center !gap-[6px]">
                                <div className="
                                    relative w-[32px] h-[32px] flex-shrink-0
                                ">
                                    {/* Circular timer ring */}
                                    <svg className="w-full h-full -rotate-90" viewBox="0 0 32 32">
                                        <circle cx="16" cy="16" r="13" fill="none" stroke="#f1f5f9" strokeWidth="2.5" />
                                        <circle
                                            cx="16" cy="16" r="13" fill="none"
                                            stroke="#F05A1A" strokeWidth="2.5"
                                            strokeDasharray={`${2 * Math.PI * 13}`}
                                            strokeDashoffset={`${2 * Math.PI * 13 * (1 - timer / RESEND_SECONDS)}`}
                                            strokeLinecap="round"
                                            style={{ transition: 'stroke-dashoffset 1s linear' }}
                                        />
                                    </svg>
                                    <span className="
                                        absolute inset-0 flex items-center justify-center
                                        text-[9px] font-extrabold text-[#F05A1A]
                                    ">{timer}</span>
                                </div>
                                <p className="text-[12px] text-slate-400 !m-0">
                                    Resend OTP in <span className="font-bold text-[#0B1E4B]">{timer}s</span>
                                </p>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    )
}

/* ════════════════════════════════════════════════════════
   TINY REUSABLE ATOMS
════════════════════════════════════════════════════════ */

const Field = ({ label, required, hint, children }) => (
    <div className="flex flex-col !gap-[6px]">
        <label className="text-[11.5px] font-extrabold text-[#0B1E4B] uppercase tracking-[1.3px] leading-none">
            {label}
            {required && <span className="text-[#F05A1A] !ml-[3px]">*</span>}
        </label>
        {children}
        {hint && <p className="text-[11px] text-slate-400 !m-0 leading-snug">{hint}</p>}
    </div>
)

const Input = ({ err, className = '', ...props }) => (
    <input
        className={`
      w-full h-[44px] !px-[14px] rounded-[10px]
      border-[1.5px] bg-white
      text-[#0B1E4B] text-[13.5px] font-medium
      placeholder:text-slate-300 placeholder:font-normal
      focus:outline-none transition-all duration-200
      ${err
                ? 'border-red-400 focus:border-red-400 focus:ring-2 focus:ring-red-400/10'
                : 'border-slate-200 focus:border-[#F05A1A] focus:ring-2 focus:ring-[#F05A1A]/10'
            }
      ${className}
    `}
        {...props}
    />
)

const Select = ({ err, children, className = '', ...props }) => (
    <div className="relative">
        <select
            className={`
        w-full h-[44px] !px-[14px] !pr-[36px] rounded-[10px]
        border-[1.5px] bg-white appearance-none
        text-[#0B1E4B] text-[13.5px] font-medium cursor-pointer
        focus:outline-none transition-all duration-200
        ${err
                    ? 'border-red-400 focus:border-red-400 focus:ring-2 focus:ring-red-400/10'
                    : 'border-slate-200 focus:border-[#F05A1A] focus:ring-2 focus:ring-[#F05A1A]/10'
                }
        ${className}
      `}
            {...props}
        >
            {children}
        </select>
        <div className="absolute right-[12px] top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-[11px]">
            ▼
        </div>
    </div>
)

const Textarea = ({ err, rows = 3, className = '', ...props }) => (
    <textarea
        rows={rows}
        className={`
      w-full !px-[14px] !py-[11px] rounded-[10px]
      border-[1.5px] bg-white resize-none
      text-[#0B1E4B] text-[13.5px] font-medium
      placeholder:text-slate-300 placeholder:font-normal
      focus:outline-none transition-all duration-200
      ${err
                ? 'border-red-400 focus:border-red-400 focus:ring-2 focus:ring-red-400/10'
                : 'border-slate-200 focus:border-[#F05A1A] focus:ring-2 focus:ring-[#F05A1A]/10'
            }
      ${className}
    `}
        {...props}
    />
)

const Err = ({ msg }) => msg ? (
    <span className="flex items-center !gap-[5px] text-[11.5px] text-red-500 font-semibold leading-none !mt-[2px]">
        <FaTimesCircle className="text-[11px] flex-shrink-0" /> {msg}
    </span>
) : null

/* ════════════════════════════════════════════════════════
   EMAIL VERIFY ROW (updated — triggers OTP modal)
════════════════════════════════════════════════════════ */
const EmailVerify = ({ value, verified, onChange, onRequestOTP, err }) => (
    <div className="flex !gap-[8px]">
        <input
            type="email"
            value={value}
            onChange={onChange}
            placeholder="your@email.com"
            disabled={verified}
            className={`
        flex-1 h-[44px] !px-[14px] rounded-[10px]
        border-[1.5px] text-[13.5px] font-medium
        placeholder:text-slate-300 focus:outline-none
        transition-all duration-200
        ${verified
                    ? 'border-[#1a6b3a] bg-[#f0faf4] text-[#1a6b3a] cursor-not-allowed'
                    : err
                        ? 'border-red-400 bg-white text-[#0B1E4B] focus:ring-2 focus:ring-red-400/10'
                        : 'border-slate-200 bg-white text-[#0B1E4B] focus:border-[#F05A1A] focus:ring-2 focus:ring-[#F05A1A]/10'
                }
      `}
        />
        {verified ? (
            <div className="flex items-center !gap-[6px] !px-[14px] h-[44px] rounded-[10px] bg-[#f0faf4] border-[1.5px] border-[#1a6b3a] text-[#1a6b3a] text-[12.5px] font-extrabold flex-shrink-0 whitespace-nowrap">
                <MdVerified className="text-[15px]" /> Verified
            </div>
        ) : (
            <button
                type="button"
                onClick={onRequestOTP}
                disabled={!value || !value.includes('@')}
                className="
          flex items-center !gap-[6px] !px-[14px] h-[44px] rounded-[10px]
          bg-[#0B1E4B] text-white text-[12.5px] font-extrabold flex-shrink-0
          hover:bg-[#152B6B] active:scale-[0.97]
          disabled:opacity-40 disabled:cursor-not-allowed
          transition-all duration-200 whitespace-nowrap
        "
            >
                <FaEnvelope className="text-[11px]" /> Verify
            </button>
        )}
    </div>
)

/* ════════════════════════════════════════════════════════
   QR PAYMENT PANEL
════════════════════════════════════════════════════════ */
const QRPanel = ({ memberType }) => {
    const [copied, setCopied] = useState(false)
    const cfg = PAYMENT_CONFIG[memberType]

    const doCopy = () => {
        navigator.clipboard?.writeText(cfg?.upiId || '')
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    if (!cfg) return (
        <div className="
      bg-white rounded-[20px] border-[2px] border-dashed border-slate-200
      flex flex-col items-center justify-center text-center
      !p-[40px] !gap-[14px]
      min-h-[320px]
    ">
            <FaQrcode className="text-[52px] text-slate-200" />
            <p className="text-slate-400 text-[14px] font-semibold !m-0 max-w-[220px] leading-snug">
                Select a <strong className="text-[#0B1E4B]">Member Type</strong> to view payment QR & details
            </p>
        </div>
    )

    return (
        <div className="bg-white rounded-[20px] border-[1.5px] border-slate-100 shadow-[0_4px_28px_rgba(11,30,75,0.09)] overflow-hidden">
            <div className="bg-gradient-to-r from-[#0B1E4B] to-[#1e3a8a] !px-[24px] !py-[22px] text-center relative overflow-hidden">
                <div className="absolute -top-[30px] -right-[30px] w-[100px] h-[100px] rounded-full bg-[rgba(240,90,26,0.12)]" />
                <div className="relative z-10">
                    <div className="w-[46px] h-[46px] rounded-[13px] bg-white/10 flex items-center justify-center !mx-auto !mb-[12px]">
                        <MdOutlinePayment className="text-white text-[22px]" />
                    </div>
                    <h3 className="text-white text-[16px] font-extrabold tracking-[1.5px] uppercase !m-0 !mb-[4px]">
                        Complete Your Payment
                    </h3>
                    <p className="text-white/50 text-[12px] !m-0">Scan QR to pay membership fee</p>
                </div>
            </div>

            <div className="!p-[20px] flex flex-col !gap-[16px]">
                <div className={`flex items-center justify-center !gap-[6px] !py-[10px] rounded-[12px] text-white font-extrabold ${cfg.amtCls} ${cfg.shadowCls}`}>
                    <FaRupeeSign className="text-[15px]" />
                    <span className="text-[22px] tracking-[1px]">{cfg.amount} / YEAR</span>
                </div>

                <div className="flex items-center justify-center !p-[14px] rounded-[16px] bg-slate-50 border-[1.5px] border-slate-100">
                    <img key={memberType} src={cfg.qrUrl} alt={`${cfg.label} QR`} className="w-[190px] h-[190px] rounded-[8px] transition-opacity duration-500" />
                </div>

                <div className="flex items-center justify-between !px-[14px] !py-[10px] rounded-[10px] bg-slate-50 border-[1.5px] border-slate-200">
                    <div>
                        <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-[1.2px] !m-0 !mb-[2px]">UPI ID</p>
                        <p className={`text-[13px] font-extrabold !m-0 ${cfg.textCls}`}>{cfg.upiId}</p>
                    </div>
                    <button type="button" onClick={doCopy} className={`flex items-center !gap-[5px] !px-[10px] !py-[6px] rounded-[8px] text-[11px] font-extrabold text-white transition-all duration-200 active:scale-95 ${copied ? 'bg-[#1a6b3a]' : 'bg-[#F05A1A] hover:bg-[#d44f15]'}`}>
                        {copied ? <MdCheckCircle className="text-[13px]" /> : <FaCopy className="text-[11px]" />}
                        {copied ? 'Copied!' : 'Copy'}
                    </button>
                </div>

                <div className="flex flex-col !gap-[9px]">
                    {UPI_STEPS.map((step, i) => (
                        <div key={i} className="flex items-start !gap-[10px]">
                            <span className="w-[20px] h-[20px] rounded-full flex-shrink-0 bg-[#F05A1A] text-white text-[10px] font-extrabold flex items-center justify-center !mt-[1px]">{i + 1}</span>
                            <span className="text-[12.5px] text-slate-500 font-medium leading-[1.5]">{step}</span>
                        </div>
                    ))}
                </div>

                <div className="flex items-center justify-center flex-wrap !gap-[6px] !pt-[12px] border-t border-slate-100">
                    {UPI_APPS.map(app => (
                        <span key={app} className="!px-[10px] !py-[4px] rounded-full text-[11px] font-bold text-slate-500 bg-slate-100 border border-slate-200">{app}</span>
                    ))}
                </div>

                <div className="flex items-start !gap-[9px] !p-[12px] rounded-[10px] bg-[#FFF3EC] border border-[rgba(240,90,26,0.2)]">
                    <FaShieldAlt className="text-[#F05A1A] text-[14px] flex-shrink-0 !mt-[1px]" />
                    <p className="text-[11.5px] text-slate-500 !m-0 leading-[1.55]">
                        Payment processed via <strong className="text-[#0B1E4B]">Razorpay</strong>.
                        Membership activated after manual verification within <strong className="text-[#0B1E4B]">24 hrs</strong>.
                    </p>
                </div>
            </div>
        </div>
    )
}

/* ════════════════════════════════════════════════════════
   SPECIAL PANEL
════════════════════════════════════════════════════════ */
const SpecialPanel = () => (
    <div className="flex flex-col !gap-[16px]">
        <div className="relative overflow-hidden rounded-[20px] bg-gradient-to-br from-[#0B1E4B] via-[#152B6B] to-[#1a3560] !p-[28px] text-center">
            <div className="absolute -top-[40px] -right-[40px] w-[140px] h-[140px] rounded-full bg-[radial-gradient(circle,rgba(240,90,26,0.2)_0%,transparent_70%)]" />
            <div className="absolute -bottom-[30px] -left-[30px] w-[110px] h-[110px] rounded-full bg-[radial-gradient(circle,rgba(255,173,92,0.1)_0%,transparent_70%)]" />
            <div className="relative z-10">
                <div className="w-[58px] h-[58px] rounded-[18px] !mx-auto !mb-[14px] bg-gradient-to-br from-[#F05A1A] to-[#FF7D42] flex items-center justify-center shadow-[0_8px_24px_rgba(240,90,26,0.4)]">
                    <BsStarFill className="text-white text-[24px]" />
                </div>
                <h3 className="text-white font-extrabold text-[18px] tracking-[1px] !m-0 !mb-[4px]">Special Membership</h3>
                <p className="text-white/50 text-[12.5px] !m-0">By Invitation · Exclusive · Lifetime Recognition</p>
                <div className="flex justify-center !gap-[24px] !mt-[20px] !pt-[16px] border-t border-white/10">
                    {[['100+', 'Members'], ['28', 'States'], ['10+', 'Yrs Active']].map(([val, lbl]) => (
                        <div key={lbl} className="text-center">
                            <div className="text-[#F05A1A] font-extrabold text-[22px] leading-none">{val}</div>
                            <div className="text-white/40 text-[10px] uppercase tracking-[1px] !mt-[3px]">{lbl}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        <div className="bg-white rounded-[20px] border-[1.5px] border-slate-100 shadow-[0_4px_20px_rgba(11,30,75,0.07)] !p-[22px]">
            <p className="flex items-center !gap-[7px] text-[12px] font-extrabold text-[#0B1E4B] uppercase tracking-[1.5px] !m-0 !mb-[16px]">
                <HiSparkles className="text-[#F05A1A] text-[15px]" /> Member Benefits
            </p>
            <div className="flex flex-col !gap-[12px]">
                {SPECIAL_BENEFITS.map(({ Icon, text }, i) => (
                    <div key={i} className="flex items-start !gap-[11px]">
                        <div className="w-[32px] h-[32px] rounded-[9px] flex-shrink-0 bg-[#FFF3EC] border border-[rgba(240,90,26,0.15)] flex items-center justify-center">
                            <Icon className="text-[#F05A1A] text-[12px]" />
                        </div>
                        <p className="text-[12.5px] text-slate-500 font-medium !m-0 leading-[1.55] !pt-[5px]">{text}</p>
                    </div>
                ))}
            </div>
        </div>

        <div className="flex items-start !gap-[10px] !p-[15px] rounded-[14px] bg-[#FFF3EC] border border-[rgba(240,90,26,0.2)]">
            <FaShieldAlt className="text-[#F05A1A] text-[15px] flex-shrink-0 !mt-[1px]" />
            <div>
                <p className="text-[12px] font-extrabold text-[#0B1E4B] !m-0 !mb-[3px]">Application Review Process</p>
                <p className="text-[12px] text-slate-500 !m-0 leading-[1.6]">
                    Applications are reviewed by the Managing Committee. You will be notified via email within <strong className="text-[#0B1E4B]">7 working days</strong>.
                </p>
            </div>
        </div>
    </div>
)

/* ════════════════════════════════════════════════════════
   SUCCESS SCREEN
════════════════════════════════════════════════════════ */
const SuccessScreen = ({ memberType }) => (
    <div className="flex flex-col items-center justify-center text-center !py-[64px] !px-[32px] !gap-[16px]">
        <div className="w-[80px] h-[80px] rounded-full bg-[#f0faf4] border-[3px] border-[#1a6b3a] flex items-center justify-center shadow-[0_8px_28px_rgba(26,107,58,0.2)]">
            <MdVerified className="text-[#1a6b3a] text-[38px]" />
        </div>
        <div>
            <h3 className="text-[#0B1E4B] font-extrabold text-[22px] tracking-[0.5px] !m-0 !mb-[8px]">Application Submitted!</h3>
            <p className="text-slate-500 text-[14px] max-w-[360px] leading-[1.7] !m-0">
                Your <strong className="text-[#F05A1A]">{memberType}</strong> application has been received.
                Our team will verify and activate your membership within <strong className="text-[#0B1E4B]">24–48 hours</strong>.
            </p>
        </div>
        <div className="flex items-center !gap-[8px] !mt-[8px] !px-[20px] !py-[10px] rounded-[12px] bg-[#FFF3EC] border border-[rgba(240,90,26,0.2)]">
            <FaCheckCircle className="text-[#F05A1A] text-[14px]" />
            <span className="text-[12.5px] font-semibold text-slate-600">Confirmation email will be sent shortly.</span>
        </div>
    </div>
)

/* ════════════════════════════════════════════════════════
   GENERAL MEMBER FORM
════════════════════════════════════════════════════════ */
const GeneralForm = ({ onMemberTypeChange }) => {
    const INIT = {
        memberType: '',
        fullName: '',
        age: '',
        gender: '',
        companyName: '',
        email: '',
        emailVerified: false,
        aadharNumber: '',
        panNumber: '',
        qualification: '',
        fullAddress: '',
        sportsInterest: '',
        utrNumber: '',
        paymentSender: '',
    }

    const [form, setForm] = useState(INIT)
    const [errors, setErrors] = useState({})
    const [done, setDone] = useState(false)
    const [showOTPModal, setShowOTPModal] = useState(false)

    const set = useCallback((k, v) => {
        setForm(p => ({ ...p, [k]: v }))
        if (k === 'memberType') onMemberTypeChange(v)
    }, [onMemberTypeChange])

    const clrErr = (k) => setErrors(p => ({ ...p, [k]: '' }))

    const handleVerified = () => {
        set('emailVerified', true)
        clrErr('email')
        setShowOTPModal(false)
    }

    const validate = () => {
        const e = {}
        if (!form.memberType) e.memberType = 'Please select a member type'
        if (!form.fullName.trim()) e.fullName = 'Full name is required'
        if (!form.age) e.age = 'Age is required'
        if (+form.age < 5 || +form.age > 100) e.age = 'Enter a valid age (5–100)'
        if (!form.gender) e.gender = 'Please select gender'
        if (!form.email.trim()) e.email = 'Email address is required'
        if (!form.emailVerified) e.email = 'Please verify your email first'
        if (!form.fullAddress.trim()) e.fullAddress = 'Full address is required'
        if (!form.utrNumber.trim()) e.utrNumber = 'UTR / Reference number is required'
        if (!form.paymentSender.trim()) e.paymentSender = 'Payment sender name is required'
        return e
    }

    const handleSubmit = (ev) => {
        ev.preventDefault()
        const errs = validate()
        if (Object.keys(errs).length) { setErrors(errs); return }
        const fd = new FormData()
        fd.append('formType', 'general-member')
        fd.append('memberType', form.memberType)
        fd.append('fullName', form.fullName)
        fd.append('age', form.age)
        fd.append('gender', form.gender)
        fd.append('companyName', form.companyName || '')
        fd.append('email', form.email)
        fd.append('aadharNumber', form.aadharNumber || '')
        fd.append('panNumber', form.panNumber || '')
        fd.append('qualification', form.qualification || '')
        fd.append('fullAddress', form.fullAddress)
        fd.append('sportsInterest', form.sportsInterest || '')
        fd.append('utrNumber', form.utrNumber)
        fd.append('paymentSender', form.paymentSender)
        submitMemberForm(fd).then(() => setDone(true))
            .catch((e) => setErrors({ submit: e?.response?.data?.message || 'Failed to submit. Try again.' }))
    }

    if (done) return <SuccessScreen memberType="General Member" />

    return (
        <>
            {showOTPModal && (
                <OTPModal
                    email={form.email}
                    onVerified={handleVerified}
                    onClose={() => setShowOTPModal(false)}
                />
            )}

            <form onSubmit={handleSubmit} noValidate className="flex flex-col !gap-[20px]">

                <div>
                    <h2 className="!m-0 !mb-[6px] leading-none">
                        <span className="font-extrabold text-[#0B1E4B] text-[clamp(20px,3vw,30px)] tracking-[1px]">GENERAL MEMBER </span>
                        <span className="font-extrabold text-[#F05A1A] text-[clamp(20px,3vw,30px)] tracking-[1px]">APPLICATION</span>
                    </h2>
                    <p className="text-slate-400 text-[13px] !m-0 leading-[1.6]">
                        Fill in your details below. General membership includes access to events, newsletters, and community benefits.
                    </p>
                </div>

                <Field label="Member Type" required>
                    <Select err={errors.memberType} value={form.memberType} onChange={e => { set('memberType', e.target.value); clrErr('memberType') }}>
                        {MEMBER_TYPE_OPTS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                    </Select>
                    <Err msg={errors.memberType} />
                    {form.memberType && (
                        <div className={`inline-flex items-center !gap-[6px] !px-[12px] !py-[5px] rounded-full text-[11px] font-extrabold text-white w-fit ${PAYMENT_CONFIG[form.memberType].amtCls}`}>
                            <FaRupeeSign className="text-[10px]" />
                            {PAYMENT_CONFIG[form.memberType].amount} / year selected
                        </div>
                    )}
                </Field>

                <div className="grid grid-cols-1 sm:grid-cols-[1fr_110px] !gap-[14px]">
                    <Field label="Full Name" required>
                        <Input type="text" placeholder="Enter your full name" value={form.fullName} err={errors.fullName} onChange={e => { set('fullName', e.target.value); clrErr('fullName') }} />
                        <Err msg={errors.fullName} />
                    </Field>
                    <Field label="Age" required>
                        <Input type="number" placeholder="e.g. 25" min="5" max="100" value={form.age} err={errors.age} onChange={e => { set('age', e.target.value); clrErr('age') }} />
                        <Err msg={errors.age} />
                    </Field>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 !gap-[14px]">
                    <Field label="Gender" required>
                        <Select err={errors.gender} value={form.gender} onChange={e => { set('gender', e.target.value); clrErr('gender') }}>
                            {GENDER_OPTS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                        </Select>
                        <Err msg={errors.gender} />
                    </Field>
                    <Field label="Company / Organization Name">
                        <Input type="text" placeholder="e.g. UDI Enterprises Pvt. Ltd." value={form.companyName} onChange={e => set('companyName', e.target.value)} />
                    </Field>
                </div>

                <Field label="Email Address" required>
                    <EmailVerify
                        value={form.email}
                        verified={form.emailVerified}
                        err={errors.email}
                        onChange={e => { set('email', e.target.value); set('emailVerified', false); clrErr('email') }}
                        onRequestOTP={() => setShowOTPModal(true)}
                    />
                    <Err msg={errors.email} />
                </Field>

                <div className="grid grid-cols-1 sm:grid-cols-2 !gap-[14px]">
                    <Field label="Aadhaar Number" hint="Optional — will be kept confidential">
                        <Input type="text" placeholder="XXXX XXXX XXXX" maxLength={14} value={form.aadharNumber} onChange={e => set('aadharNumber', e.target.value)} />
                    </Field>
                    <Field label="PAN Number (Optional)">
                        <Input type="text" placeholder="ABCDE1234F" maxLength={10} value={form.panNumber} onChange={e => set('panNumber', e.target.value.toUpperCase())} />
                    </Field>
                </div>

                <Field label="Academic / Qualification">
                    <Select value={form.qualification} onChange={e => set('qualification', e.target.value)}>
                        {QUALIFICATION_OPTS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                    </Select>
                </Field>

                <Field label="Full Address" required>
                    <Input type="text" err={errors.fullAddress} placeholder="House No., Street, Area, City, State – PIN Code" value={form.fullAddress} onChange={e => { set('fullAddress', e.target.value); clrErr('fullAddress') }} />
                    <Err msg={errors.fullAddress} />
                </Field>

                {form.memberType === 'sports-men' && (
                    <Field label="Sport(s) of Interest" hint="Separate multiple sports with a comma — e.g. Cricket, Football, Badminton">
                        <Input type="text" placeholder="Cricket, Football, Athletics…" value={form.sportsInterest} onChange={e => set('sportsInterest', e.target.value)} />
                    </Field>
                )}

                <div className="!p-[18px] rounded-[16px] bg-[#FFF3EC] border border-[rgba(240,90,26,0.22)] flex flex-col !gap-[14px]">
                    <p className="flex items-center !gap-[7px] text-[11px] font-extrabold text-[#F05A1A] uppercase tracking-[1.3px] !m-0">
                        <MdOutlinePayment className="text-[15px]" /> Payment Verification
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 !gap-[14px]">
                        <Field label="Transaction / UTR Reference" required>
                            <Input type="text" err={errors.utrNumber} placeholder="Enter UTR / Ref no. after payment" value={form.utrNumber} onChange={e => { set('utrNumber', e.target.value); clrErr('utrNumber') }} />
                            <Err msg={errors.utrNumber} />
                        </Field>
                        <Field label="Payment Sender Name" required>
                            <Input type="text" err={errors.paymentSender} placeholder="Name as shown in bank / UPI app" value={form.paymentSender} onChange={e => { set('paymentSender', e.target.value); clrErr('paymentSender') }} />
                            <Err msg={errors.paymentSender} />
                        </Field>
                    </div>
                </div>

                {errors.submit && <Err msg={errors.submit} />}
                <button type="submit" className="
          w-full h-[50px] rounded-[14px]
          bg-gradient-to-r from-[#F05A1A] to-[#FF7D42] text-white
          text-[15px] font-extrabold tracking-[0.5px]
          flex items-center justify-center !gap-[8px]
          shadow-[0_6px_24px_rgba(240,90,26,0.38)]
          hover:shadow-[0_10px_32px_rgba(240,90,26,0.52)]
          hover:-translate-y-[2px] active:scale-[0.98]
          transition-all duration-200
        ">
                    <HiArrowRight className="text-[18px]" />
                    Submit Application
                </button>

            </form>
        </>
    )
}

/* ════════════════════════════════════════════════════════
   SPECIAL MEMBER FORM
════════════════════════════════════════════════════════ */
const SpecialForm = () => {
    const INIT = {
        photo: null,
        photoPreview: null,
        fullName: '',
        email: '',
        emailVerified: false,
        designation: '',
        organization: '',
        fullAddress: '',
        linkedin: '',
        contribution: '',
        message: '',
    }

    const [form, setForm] = useState(INIT)
    const [errors, setErrors] = useState({})
    const [done, setDone] = useState(false)
    const [showOTPModal, setShowOTPModal] = useState(false)
    const fileRef = useRef()

    const set = (k, v) => setForm(p => ({ ...p, [k]: v }))
    const clrErr = (k) => setErrors(p => ({ ...p, [k]: '' }))

    const handlePhoto = (e) => {
        const file = e.target.files?.[0]
        if (!file) return
        if (file.size > 5 * 1024 * 1024) { setErrors(p => ({ ...p, photo: 'File must be under 5 MB' })); return }
        set('photo', file)
        clrErr('photo')
        const reader = new FileReader()
        reader.onload = ev => set('photoPreview', ev.target.result)
        reader.readAsDataURL(file)
    }

    const handleVerified = () => {
        set('emailVerified', true)
        clrErr('email')
        setShowOTPModal(false)
    }

    const validate = () => {
        const e = {}
        if (!form.photo) e.photo = 'Profile photo is required'
        if (!form.fullName.trim()) e.fullName = 'Full name is required'
        if (!form.email.trim()) e.email = 'Email is required'
        if (!form.emailVerified) e.email = 'Please verify your email first'
        if (!form.designation.trim()) e.designation = 'Designation / role is required'
        if (!form.organization.trim()) e.organization = 'Organization name is required'
        if (!form.fullAddress.trim()) e.fullAddress = 'Full address is required'
        return e
    }

    const handleSubmit = (ev) => {
        ev.preventDefault()
        const errs = validate()
        if (Object.keys(errs).length) { setErrors(errs); return }
        const fd = new FormData()
        fd.append('formType', 'special-member')
        if (form.photo) fd.append('photo', form.photo)
        fd.append('fullName', form.fullName)
        fd.append('email', form.email)
        fd.append('designation', form.designation)
        fd.append('organization', form.organization)
        fd.append('fullAddress', form.fullAddress)
        fd.append('linkedin', form.linkedin || '')
        fd.append('contribution', form.contribution || '')
        fd.append('message', form.message || '')
        submitMemberForm(fd).then(() => setDone(true))
            .catch((e) => setErrors({ submit: e?.response?.data?.message || 'Failed to submit. Try again.' }))
    }

    if (done) return <SuccessScreen memberType="Special Member" />

    return (
        <>
            {showOTPModal && (
                <OTPModal
                    email={form.email}
                    onVerified={handleVerified}
                    onClose={() => setShowOTPModal(false)}
                />
            )}

            <form onSubmit={handleSubmit} noValidate className="flex flex-col !gap-[20px]">

                <div>
                    <h2 className="!m-0 !mb-[6px] leading-none">
                        <span className="font-extrabold text-[#0B1E4B] text-[clamp(20px,3vw,30px)] tracking-[1px]">SPECIAL MEMBER </span>
                        <span className="font-extrabold text-[#F05A1A] text-[clamp(20px,3vw,30px)] tracking-[1px]">APPLICATION</span>
                    </h2>
                    <p className="text-slate-400 text-[13px] !m-0 leading-[1.6]">
                        Submit your application for consideration. The Managing Committee reviews all applications and responds within 7 working days.
                    </p>
                </div>

                <Field label="Profile Photo" required>
                    <div onClick={() => fileRef.current?.click()} className={`flex items-center !gap-[16px] !p-[14px] rounded-[12px] border-[2px] border-dashed cursor-pointer transition-all duration-200 ${errors.photo ? 'border-red-400 bg-red-50' : form.photoPreview ? 'border-[#1a6b3a] bg-[#f0faf4]' : 'border-slate-200 bg-slate-50 hover:border-[#F05A1A] hover:bg-[#FFF9F6]'}`}>
                        {form.photoPreview ? (
                            <>
                                <img src={form.photoPreview} alt="Preview" className="w-[54px] h-[54px] rounded-[10px] object-cover flex-shrink-0 border-[2px] border-[#1a6b3a]" />
                                <div>
                                    <p className="text-[13px] font-extrabold text-[#1a6b3a] !m-0">Photo uploaded ✓</p>
                                    <p className="text-[11.5px] text-slate-400 !m-0 !mt-[3px]">Click to change</p>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="w-[54px] h-[54px] rounded-[10px] bg-white border-[1.5px] border-slate-200 flex items-center justify-center flex-shrink-0">
                                    <FaUpload className="text-[#F05A1A] text-[20px]" />
                                </div>
                                <div>
                                    <p className="text-[13px] font-extrabold text-[#0B1E4B] !m-0">Click to upload your photo</p>
                                    <p className="text-[11.5px] text-slate-400 !m-0 !mt-[3px]">JPG, PNG or WEBP — Max 5 MB</p>
                                </div>
                            </>
                        )}
                    </div>
                    <input ref={fileRef} type="file" accept="image/*" onChange={handlePhoto} className="hidden" />
                    <Err msg={errors.photo} />
                </Field>

                <Field label="Full Name" required>
                    <Input type="text" placeholder="Enter your full name" value={form.fullName} err={errors.fullName} onChange={e => { set('fullName', e.target.value); clrErr('fullName') }} />
                    <Err msg={errors.fullName} />
                </Field>

                <Field label="Email Address" required>
                    <EmailVerify
                        value={form.email}
                        verified={form.emailVerified}
                        err={errors.email}
                        onChange={e => { set('email', e.target.value); set('emailVerified', false); clrErr('email') }}
                        onRequestOTP={() => setShowOTPModal(true)}
                    />
                    <Err msg={errors.email} />
                </Field>

                <div className="grid grid-cols-1 sm:grid-cols-2 !gap-[14px]">
                    <Field label="Designation / Role" required>
                        <Input type="text" placeholder="e.g. Managing Director" value={form.designation} err={errors.designation} onChange={e => { set('designation', e.target.value); clrErr('designation') }} />
                        <Err msg={errors.designation} />
                    </Field>
                    <Field label="Organization / Company" required>
                        <Input type="text" placeholder="e.g. UDI Foundation" value={form.organization} err={errors.organization} onChange={e => { set('organization', e.target.value); clrErr('organization') }} />
                        <Err msg={errors.organization} />
                    </Field>
                </div>

                <Field label="Full Address" required>
                    <Input type="text" placeholder="House No., Street, Area, City, State – PIN Code" value={form.fullAddress} err={errors.fullAddress} onChange={e => { set('fullAddress', e.target.value); clrErr('fullAddress') }} />
                    <Err msg={errors.fullAddress} />
                </Field>

                <Field label="LinkedIn / Website (Optional)">
                    <Input type="url" placeholder="https://linkedin.com/in/yourprofile" value={form.linkedin} onChange={e => set('linkedin', e.target.value)} />
                </Field>

                <Field label="Contribution to Sports (Optional)" hint="Briefly describe how you have contributed or plan to contribute to sports development in India">
                    <Textarea rows={3} placeholder="Describe your contributions…" value={form.contribution} onChange={e => set('contribution', e.target.value)} />
                </Field>

                <Field label="Message to Committee (Optional)">
                    <Textarea rows={3} placeholder="Any message for the Managing Committee…" value={form.message} onChange={e => set('message', e.target.value)} />
                </Field>

                {errors.submit && <Err msg={errors.submit} />}
                <button type="submit" className="
          w-full h-[50px] rounded-[14px]
          bg-gradient-to-r from-[#0B1E4B] to-[#1e3a8a] text-white
          text-[15px] font-extrabold tracking-[0.5px]
          flex items-center justify-center !gap-[8px]
          shadow-[0_6px_24px_rgba(11,30,75,0.3)]
          hover:shadow-[0_10px_32px_rgba(11,30,75,0.42)]
          hover:-translate-y-[2px] active:scale-[0.98]
          transition-all duration-200
        ">
                    <BsStarFill className="text-[#FFAD5C] text-[14px]" />
                    Submit Special Member Application
                </button>

            </form>
        </>
    )
}

/* ════════════════════════════════════════════════════════
   MAIN EXPORT — MembershipForm
════════════════════════════════════════════════════════ */
export default function MembershipForm() {
    const navigate = useNavigate()
    const location = useLocation()

    const getTab = () =>
        location.pathname.includes('special-member') ? 'special' : 'general'

    const [activeTab, setActiveTab] = useState(getTab)
    const [generalMType, setGeneralMType] = useState('')

    useEffect(() => { setActiveTab(getTab()) }, [location.pathname])

    const switchTab = (tab) => {
        setActiveTab(tab)
        setGeneralMType('')
        navigate(tab === 'general'
            ? '/membership/general-member'
            : '/membership/special-member'
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#F4F6FB] to-white">
            <style>{`@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');* { font-family: 'Plus Jakarta Sans', sans-serif; }`}</style>

            <div className="max-w-[1280px] !mx-auto !px-[16px] sm:!px-[24px] lg:!px-[32px] !py-[40px]">

                <div className="flex items-center !p-[6px] !mb-[32px] bg-white rounded-[16px] border-[1.5px] border-slate-200 shadow-[0_4px_20px_rgba(11,30,75,0.07)] w-full max-w-[500px]">
                    <button type="button" onClick={() => switchTab('general')} className={`flex-1 flex items-center justify-center !gap-[7px] !py-[11px] !px-[14px] rounded-[11px] text-[13px] font-extrabold cursor-pointer transition-all duration-250 ${activeTab === 'general' ? 'bg-[#0B1E4B] text-white shadow-[0_4px_14px_rgba(11,30,75,0.25)]' : 'text-slate-500 hover:text-[#0B1E4B] hover:bg-slate-50'}`}>
                        <FaUsers className={`text-[14px] ${activeTab === 'general' ? 'text-[#FFAD5C]' : 'text-slate-400'}`} />
                        General Member
                        <span className={`!px-[8px] !py-[2px] rounded-full text-[9px] font-extrabold ${activeTab === 'general' ? 'bg-[#F05A1A] text-white' : 'bg-slate-100 text-slate-400'}`}>₹XXX/yr</span>
                    </button>

                    <button type="button" onClick={() => switchTab('special')} className={`flex-1 flex items-center justify-center !gap-[7px] !py-[11px] !px-[14px] rounded-[11px] text-[13px] font-extrabold cursor-pointer transition-all duration-250 ${activeTab === 'special' ? 'bg-gradient-to-r from-[#F05A1A] to-[#FF7D42] text-white shadow-[0_4px_14px_rgba(240,90,26,0.3)]' : 'text-slate-500 hover:text-[#F05A1A] hover:bg-[#FFF9F6]'}`}>
                        <BsStarFill className={`text-[13px] ${activeTab === 'special' ? 'text-white' : 'text-slate-400'}`} />
                        Special Member
                        <span className={`!px-[8px] !py-[2px] rounded-full text-[9px] font-extrabold ${activeTab === 'special' ? 'bg-white/25 text-white' : 'bg-[#FFF3EC] text-[#F05A1A] border border-[rgba(240,90,26,0.2)]'}`}>By Invitation</span>
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[1fr_390px] !gap-[24px] items-start">
                    <div className="bg-white rounded-[24px] border-[1.5px] border-slate-100 shadow-[0_4px_32px_rgba(11,30,75,0.08)] !p-[24px] sm:!p-[32px] lg:!p-[36px]">
                        {activeTab === 'general'
                            ? <GeneralForm onMemberTypeChange={setGeneralMType} />
                            : <SpecialForm />
                        }
                    </div>

                    <div className="lg:sticky lg:top-[24px]">
                        {activeTab === 'general'
                            ? <QRPanel memberType={generalMType} />
                            : <SpecialPanel />
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}