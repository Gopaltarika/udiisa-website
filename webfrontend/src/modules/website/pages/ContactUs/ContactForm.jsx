import { useState, useRef, useEffect, useCallback } from 'react'
import {
    FaEnvelope, FaPhone, FaMapMarkerAlt, FaTimesCircle,
    FaCheckCircle, FaShieldAlt, FaWhatsapp, FaInstagram,
    FaFacebookF, FaTwitter, FaLinkedinIn, FaIdCard,
    FaUserAlt, FaClock,
} from 'react-icons/fa'
import {
    MdVerified, MdClose, MdCheckCircle, MdSend,
} from 'react-icons/md'
import { HiSparkles, HiArrowRight } from 'react-icons/hi'
import { BsBuilding } from 'react-icons/bs'
import { submitContact, sendOtp, verifyOtp } from '../../../../shared/services/publicApi'

/* ════════════════════════════════════════════════════════
   CONFIG
════════════════════════════════════════════════════════ */

const ORG_INFO = {
    address: '123, Sports Complex Road,\nSector 18, Noida,\nUttar Pradesh – 201301',
    whatsapp: '+91 98765 43210',
    email: 'info@udisports.org',
    supportEmail: 'support@udisports.org',
}

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

/** Contact form submissions go to backend via submitContact() */

/* ════════════════════════════════════════════════════════
   OTP MODAL
════════════════════════════════════════════════════════ */
const OTPModal = ({ email, onVerified, onClose }) => {
    const OTP_LEN = 6
    const RESEND_SEC = 60

    const [digits, setDigits]     = useState(Array(OTP_LEN).fill(''))
    const [timer, setTimer]       = useState(RESEND_SEC)
    const [canResend, setCanResend] = useState(false)
    const [err, setErr]           = useState('')
    const [shake, setShake]       = useState(false)
    const [loading, setLoading]   = useState(false)
    const [otpSent, setOtpSent]   = useState(false)
    const refs = useRef([])
    const inFlightRef = useRef(false)
    const sentForEmailRef = useRef('')
    const normalizedEmail = (email || '').trim().toLowerCase()

    useEffect(() => {
        setTimeout(() => refs.current[0]?.focus(), 120)
    }, [])

    const requestOtp = useCallback(async (force = false) => {
        if (!normalizedEmail || inFlightRef.current) return
        if (!force && sentForEmailRef.current === normalizedEmail) return

        inFlightRef.current = true
        setErr('')
        try {
            await sendOtp(normalizedEmail)
            sentForEmailRef.current = normalizedEmail
            setOtpSent(true)
            setTimer(RESEND_SEC)
            setCanResend(false)
        } catch (e) {
            sentForEmailRef.current = ''
            setErr(e?.response?.data?.message || 'Failed to send OTP')
        } finally {
            inFlightRef.current = false
        }
    }, [normalizedEmail])

    useEffect(() => {
        if (normalizedEmail && !otpSent) requestOtp()
    }, [normalizedEmail, otpSent, requestOtp])

    useEffect(() => {
        if (timer <= 0) { setCanResend(true); return }
        const t = setTimeout(() => setTimer(p => p - 1), 1000)
        return () => clearTimeout(t)
    }, [timer])

    const setDigit = (i, val) => {
        const d = val.replace(/\D/g, '').slice(-1)
        const next = [...digits]; next[i] = d
        setDigits(next); setErr('')
        if (d && i < OTP_LEN - 1) refs.current[i + 1]?.focus()
    }

    const onKey = (i, e) => {
        if (e.key === 'Backspace' && !digits[i] && i > 0) refs.current[i - 1]?.focus()
        if (e.key === 'ArrowLeft' && i > 0) refs.current[i - 1]?.focus()
        if (e.key === 'ArrowRight' && i < OTP_LEN - 1) refs.current[i + 1]?.focus()
    }

    const onPaste = (e) => {
        e.preventDefault()
        const p = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, OTP_LEN)
        const next = Array(OTP_LEN).fill('')
        p.split('').forEach((c, i) => { next[i] = c })
        setDigits(next); setErr('')
        refs.current[Math.min(p.length, OTP_LEN - 1)]?.focus()
    }

    const resend = () => {
        setDigits(Array(OTP_LEN).fill(''))
        setTimer(RESEND_SEC)
        setCanResend(false)
        setErr('')
        requestOtp(true)
        setTimeout(() => refs.current[0]?.focus(), 50)
    }

    const verify = async () => {
        const entered = digits.join('')
        if (entered.length < OTP_LEN) { setErr('Please enter all 6 digits'); doShake(); return }
        setLoading(true)
        setErr('')
        verifyOtp(normalizedEmail, entered)
            .then(() => { onVerified() })
            .catch((e) => {
                setErr(e?.response?.data?.message || 'Incorrect OTP. Please try again.')
                setDigits(Array(OTP_LEN).fill(''))
                doShake()
                setTimeout(() => refs.current[0]?.focus(), 50)
            })
            .finally(() => setLoading(false))
    }

    const doShake = () => { setShake(true); setTimeout(() => setShake(false), 500) }
    const filled = digits.filter(Boolean).length

    return (
        <div
            className="fixed inset-0 z-[9999] flex items-center justify-center !p-[16px]"
            style={{ background: 'rgba(11,30,75,0.55)', backdropFilter: 'blur(6px)' }}
            onClick={e => { if (e.target === e.currentTarget) onClose() }}
        >
            <div
                className="relative w-full max-w-[420px] bg-white rounded-[24px] shadow-[0_24px_80px_rgba(11,30,75,0.22)] overflow-hidden"
                style={{ animation: 'modalPop 0.28s cubic-bezier(0.34,1.56,0.64,1) both' }}
            >
                <style>{`
                    @keyframes modalPop {
                        from { opacity:0; transform:scale(0.88) translateY(16px); }
                        to   { opacity:1; transform:scale(1) translateY(0); }
                    }
                    @keyframes shakeIt {
                        0%,100%{ transform:translateX(0); }
                        20%    { transform:translateX(-6px); }
                        40%    { transform:translateX(6px); }
                        60%    { transform:translateX(-4px); }
                        80%    { transform:translateX(4px); }
                    }
                    .do-shake { animation: shakeIt 0.45s ease; }
                    @keyframes spin360 { to { transform: rotate(360deg); } }
                    .spin-loader { animation: spin360 0.7s linear infinite; }
                `}</style>

                {/* Header */}
                <div className="bg-gradient-to-r from-[#0B1E4B] to-[#1e3a8a] !px-[28px] !py-[26px] text-center relative overflow-hidden">
                    <div className="absolute -top-[30px] -right-[30px] w-[100px] h-[100px] rounded-full bg-[rgba(240,90,26,0.12)]" />
                    <button
                        type="button" onClick={onClose}
                        className="absolute top-[14px] right-[14px] z-10 w-[30px] h-[30px] rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/60 hover:text-white transition-all duration-200"
                    >
                        <MdClose className="text-[16px]" />
                    </button>
                    <div className="relative z-10">
                        <div className="w-[52px] h-[52px] rounded-[16px] !mx-auto !mb-[12px] bg-gradient-to-br from-[#F05A1A] to-[#FF7D42] flex items-center justify-center shadow-[0_8px_24px_rgba(240,90,26,0.4)]">
                            <FaEnvelope className="text-white text-[22px]" />
                        </div>
                        <h3 className="text-white font-extrabold text-[18px] tracking-[0.5px] !m-0 !mb-[4px]">Verify Your Email</h3>
                        <p className="text-white/50 text-[12.5px] !m-0">
                            OTP sent to <span className="text-white/80 font-semibold">{email}</span>
                        </p>
                    </div>
                </div>

                <div className="!p-[28px] flex flex-col !gap-[20px]">
                    <div className="flex items-start !gap-[10px] !px-[14px] !py-[11px] rounded-[12px] bg-[#EFF6FF] border border-blue-100">
                        <FaShieldAlt className="text-blue-400 text-[13px] flex-shrink-0 !mt-[1px]" />
                        <p className="text-[12px] text-blue-600 !m-0 leading-[1.55]">
                            Enter the <strong>6-digit OTP</strong> sent to your email address. It is valid for <strong>10 minutes</strong>.
                        </p>
                    </div>

                    <div className="flex flex-col !gap-[10px]">
                        <label className="text-[11px] font-extrabold text-[#0B1E4B] uppercase tracking-[1.3px] !m-0">Enter OTP</label>
                        <div className={`flex justify-between !gap-[8px] ${shake ? 'do-shake' : ''}`} onPaste={onPaste}>
                            {digits.map((d, i) => (
                                <input
                                    key={i}
                                    ref={el => refs.current[i] = el}
                                    type="text" inputMode="numeric" maxLength={1}
                                    value={d}
                                    onChange={e => setDigit(i, e.target.value)}
                                    onKeyDown={e => onKey(i, e)}
                                    className={`
                                        flex-1 h-[54px] rounded-[12px] text-center
                                        text-[22px] font-extrabold border-[2px] bg-white
                                        focus:outline-none transition-all duration-200 caret-transparent
                                        ${err
                                            ? 'border-red-400 text-red-500 bg-red-50 focus:ring-2 focus:ring-red-400/20'
                                            : d
                                                ? 'border-[#F05A1A] text-[#0B1E4B] bg-[#FFF9F6] shadow-[0_2px_8px_rgba(240,90,26,0.12)]'
                                                : 'border-slate-200 text-[#0B1E4B] focus:border-[#F05A1A] focus:ring-2 focus:ring-[#F05A1A]/10'
                                        }
                                    `}
                                />
                            ))}
                        </div>

                        <div className="flex justify-center !gap-[6px]">
                            {digits.map((d, i) => (
                                <div key={i} className={`w-[5px] h-[5px] rounded-full transition-all duration-200 ${d ? 'bg-[#F05A1A] scale-110' : 'bg-slate-200'}`} />
                            ))}
                        </div>

                        {err && (
                            <div className="flex items-center !gap-[6px] !px-[12px] !py-[9px] rounded-[10px] bg-red-50 border border-red-200">
                                <FaTimesCircle className="text-red-400 text-[13px] flex-shrink-0" />
                                <span className="text-[12px] font-semibold text-red-500">{err}</span>
                            </div>
                        )}
                    </div>

                    <button
                        type="button" onClick={verify}
                        disabled={filled < OTP_LEN || loading}
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
                        {loading ? (
                            <><div className="w-[18px] h-[18px] border-[2.5px] border-white/30 border-t-white rounded-full spin-loader" /> Verifying...</>
                        ) : (
                            <><MdVerified className="text-[18px]" /> OTP Verify Karein</>
                        )}
                    </button>

                    <div className="text-center !pt-[4px]">
                        {canResend ? (
                            <div className="flex flex-col items-center !gap-[8px]">
                                <p className="text-[12.5px] text-slate-400 !m-0">Didn't receive the OTP?</p>
                                <button
                                    type="button" onClick={resend}
                                    className="flex items-center !gap-[6px] !px-[18px] !py-[8px] rounded-[10px] bg-[#0B1E4B] text-white text-[12.5px] font-extrabold hover:bg-[#152B6B] active:scale-[0.97] transition-all duration-200"
                                >
                                    <FaEnvelope className="text-[11px]" /> Resend OTP
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center justify-center !gap-[6px]">
                                <div className="relative w-[32px] h-[32px] flex-shrink-0">
                                    <svg className="w-full h-full -rotate-90" viewBox="0 0 32 32">
                                        <circle cx="16" cy="16" r="13" fill="none" stroke="#f1f5f9" strokeWidth="2.5" />
                                        <circle cx="16" cy="16" r="13" fill="none" stroke="#F05A1A" strokeWidth="2.5"
                                            strokeDasharray={`${2 * Math.PI * 13}`}
                                            strokeDashoffset={`${2 * Math.PI * 13 * (1 - timer / RESEND_SEC)}`}
                                            strokeLinecap="round"
                                            style={{ transition: 'stroke-dashoffset 1s linear' }}
                                        />
                                    </svg>
                                    <span className="absolute inset-0 flex items-center justify-center text-[9px] font-extrabold text-[#F05A1A]">{timer}</span>
                                </div>
                                <p className="text-[12px] text-slate-400 !m-0">
                                    Resend in <span className="font-bold text-[#0B1E4B]">{timer}s</span>
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
   TINY ATOMS (same as MembershipForm)
════════════════════════════════════════════════════════ */
const Field = ({ label, required, hint, children }) => (
    <div className="flex flex-col !gap-[6px]">
        <label className="text-[11.5px] font-extrabold text-[#0B1E4B] uppercase tracking-[1.3px] leading-none">
            {label}{required && <span className="text-[#F05A1A] !ml-[3px]">*</span>}
        </label>
        {children}
        {hint && <p className="text-[11px] text-slate-400 !m-0 leading-snug">{hint}</p>}
    </div>
)

const Input = ({ err, className = '', ...props }) => (
    <input className={`
        w-full h-[44px] !px-[14px] rounded-[10px]
        border-[1.5px] bg-white text-[#0B1E4B] text-[13.5px] font-medium
        placeholder:text-slate-300 placeholder:font-normal
        focus:outline-none transition-all duration-200
        ${err ? 'border-red-400 focus:border-red-400 focus:ring-2 focus:ring-red-400/10'
               : 'border-slate-200 focus:border-[#F05A1A] focus:ring-2 focus:ring-[#F05A1A]/10'}
        ${className}
    `} {...props} />
)

const Select = ({ err, children, className = '', ...props }) => (
    <div className="relative">
        <select className={`
            w-full h-[44px] !px-[14px] !pr-[36px] rounded-[10px]
            border-[1.5px] bg-white appearance-none
            text-[#0B1E4B] text-[13.5px] font-medium cursor-pointer
            focus:outline-none transition-all duration-200
            ${err ? 'border-red-400 focus:border-red-400 focus:ring-2 focus:ring-red-400/10'
                   : 'border-slate-200 focus:border-[#F05A1A] focus:ring-2 focus:ring-[#F05A1A]/10'}
            ${className}
        `} {...props}>{children}</select>
        <div className="absolute right-[12px] top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-[11px]">▼</div>
    </div>
)

const Textarea = ({ err, rows = 4, className = '', ...props }) => (
    <textarea rows={rows} className={`
        w-full !px-[14px] !py-[11px] rounded-[10px]
        border-[1.5px] bg-white resize-none
        text-[#0B1E4B] text-[13.5px] font-medium
        placeholder:text-slate-300 placeholder:font-normal
        focus:outline-none transition-all duration-200
        ${err ? 'border-red-400 focus:border-red-400 focus:ring-2 focus:ring-red-400/10'
               : 'border-slate-200 focus:border-[#F05A1A] focus:ring-2 focus:ring-[#F05A1A]/10'}
        ${className}
    `} {...props} />
)

const Err = ({ msg }) => msg ? (
    <span className="flex items-center !gap-[5px] text-[11.5px] text-red-500 font-semibold leading-none !mt-[2px]">
        <FaTimesCircle className="text-[11px] flex-shrink-0" /> {msg}
    </span>
) : null

/* ════════════════════════════════════════════════════════
   EMAIL VERIFY ROW
════════════════════════════════════════════════════════ */
const EmailVerify = ({ value, verified, onChange, onRequestOTP, err }) => (
    <div className="flex !gap-[8px]">
        <input
            type="email" value={value} onChange={onChange}
            placeholder="your@email.com" disabled={verified}
            className={`
                flex-1 h-[44px] !px-[14px] rounded-[10px]
                border-[1.5px] text-[13.5px] font-medium
                placeholder:text-slate-300 focus:outline-none transition-all duration-200
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
                type="button" onClick={onRequestOTP}
                disabled={!value || !value.includes('@')}
                className="flex items-center !gap-[6px] !px-[14px] h-[44px] rounded-[10px] bg-[#0B1E4B] text-white text-[12.5px] font-extrabold flex-shrink-0 hover:bg-[#152B6B] active:scale-[0.97] disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 whitespace-nowrap"
            >
                <FaEnvelope className="text-[11px]" /> Verify
            </button>
        )}
    </div>
)

/* ════════════════════════════════════════════════════════
   LEFT INFO PANEL
════════════════════════════════════════════════════════ */
const InfoPanel = () => (
    <div className="flex flex-col !gap-[16px] h-full ">
        {/* Contact details card */}
        <div className="bg-white rounded-[20px] border-[1.5px] border-slate-100 shadow-[0_4px_20px_rgba(11,30,75,0.07)] !p-[22px] flex flex-col !gap-[16px]">
            <p className="flex items-center !gap-[7px] text-[12px] font-extrabold text-[#0B1E4B] uppercase tracking-[1.5px] !m-0">
                <HiSparkles className="text-[#F05A1A] text-[15px]" /> Get In Touch
            </p>

            {/* Address */}
            <div className="flex items-start !gap-[12px]">
                <div className="w-[36px] h-[36px] rounded-[10px] flex-shrink-0 bg-[#FFF3EC] border border-[rgba(240,90,26,0.15)] flex items-center justify-center">
                    <FaMapMarkerAlt className="text-[#F05A1A] text-[13px]" />
                </div>
                <div>
                    <p className="text-[10.5px] font-extrabold text-slate-400 uppercase tracking-[1.2px] !m-0 !mb-[3px]">Address</p>
                    <p className="text-[13px] font-semibold text-[#0B1E4B] !m-0 leading-[1.6] whitespace-pre-line">{ORG_INFO.address}</p>
                </div>
            </div>

            <div className="border-t border-slate-100" />

            {/* WhatsApp */}
            <div className="flex items-center !gap-[12px]">
                <div className="w-[36px] h-[36px] rounded-[10px] flex-shrink-0 bg-[#f0faf4] border border-[rgba(26,107,58,0.15)] flex items-center justify-center">
                    <FaWhatsapp className="text-[#1a6b3a] text-[15px]" />
                </div>
                <div>
                    <p className="text-[10.5px] font-extrabold text-slate-400 uppercase tracking-[1.2px] !m-0 !mb-[2px]">WhatsApp</p>
                    <a href={`https://wa.me/${ORG_INFO.whatsapp.replace(/\s+/g,'')}`} target="_blank" rel="noreferrer"
                        className="text-[13.5px] font-extrabold text-[#1a6b3a] !m-0 hover:underline">
                        {ORG_INFO.whatsapp}
                    </a>
                </div>
            </div>

            <div className="border-t border-slate-100" />

            {/* Email */}
            <div className="flex items-center !gap-[12px]">
                <div className="w-[36px] h-[36px] rounded-[10px] flex-shrink-0 bg-[#EFF6FF] border border-blue-100 flex items-center justify-center">
                    <FaEnvelope className="text-blue-400 text-[13px]" />
                </div>
                <div>
                    <p className="text-[10.5px] font-extrabold text-slate-400 uppercase tracking-[1.2px] !m-0 !mb-[2px]">Email</p>
                    <a href={`mailto:${ORG_INFO.email}`} className="text-[13px] font-extrabold text-[#0B1E4B] hover:text-[#F05A1A] transition-colors duration-200">
                        {ORG_INFO.email}
                    </a>
                </div>
            </div>
        </div>

        {/* Quick response note */}
        <div className="flex items-start !gap-[10px] !p-[15px] rounded-[14px] bg-[#FFF3EC] border border-[rgba(240,90,26,0.2)]">
            <FaShieldAlt className="text-[#F05A1A] text-[15px] flex-shrink-0 !mt-[1px]" />
            <div>
                <p className="text-[12px] font-extrabold text-[#0B1E4B] !m-0 !mb-[3px]">Quick Response</p>
                <p className="text-[12px] text-slate-500 !m-0 leading-[1.6]">
                    We respond to your message within <strong className="text-[#0B1E4B]">24 hours</strong>.
                    For urgent matters, please call us directly.
                </p>
            </div>
        </div>

    </div>
)

/* ════════════════════════════════════════════════════════
   SUCCESS SCREEN
════════════════════════════════════════════════════════ */
const SuccessScreen = ({ name }) => (
    <div className="flex flex-col items-center justify-center text-center !py-[64px] !px-[32px] !gap-[16px]">
        <div className="w-[80px] h-[80px] rounded-full bg-[#f0faf4] border-[3px] border-[#1a6b3a] flex items-center justify-center shadow-[0_8px_28px_rgba(26,107,58,0.2)]">
            <MdVerified className="text-[#1a6b3a] text-[38px]" />
        </div>
        <div>
            <h3 className="text-[#0B1E4B] font-extrabold text-[22px] tracking-[0.5px] !m-0 !mb-[8px]">
                Message Sent Successfully! 🎉
            </h3>
            <p className="text-slate-500 text-[14px] max-w-[360px] leading-[1.7] !m-0">
                Thank you <strong className="text-[#F05A1A]">{name}</strong>! We have received your message.
                We will get back to you within <strong className="text-[#0B1E4B]">24 hours</strong>.
            </p>
        </div>
        <div className="flex items-center !gap-[8px] !mt-[8px] !px-[20px] !py-[10px] rounded-[12px] bg-[#FFF3EC] border border-[rgba(240,90,26,0.2)]">
            <FaCheckCircle className="text-[#F05A1A] text-[14px]" />
            <span className="text-[12.5px] font-semibold text-slate-600">A confirmation email will be sent shortly.</span>
        </div>
    </div>
)

/* ════════════════════════════════════════════════════════
   CONTACT FORM
════════════════════════════════════════════════════════ */
const ContactForm = () => {
    const INIT = {
        fullName: '',
        email: '',
        emailVerified: false,
        address: '',
        age: '',
        aadharNumber: '',
        qualification: '',
        gender: '',
        message: '',
    }

    const [form, setForm] = useState(INIT)
    const [errors, setErrors] = useState({})
    const [done, setDone] = useState(false)
    const [showOTP, setShowOTP] = useState(false)

    const set = (k, v) => setForm(p => ({ ...p, [k]: v }))
    const clrErr = k => setErrors(p => ({ ...p, [k]: '' }))

    const handleVerified = () => {
        set('emailVerified', true)
        clrErr('email')
        setShowOTP(false)
    }

    const validate = () => {
        const e = {}
        if (!form.fullName.trim())    e.fullName = 'Full name is required'
        if (!form.email.trim())       e.email = 'Email address is required'
        if (!form.emailVerified)      e.email = 'Please verify your email first'
        if (!form.address.trim())     e.address = 'Address is required'
        if (!form.age)                e.age = 'Age is required'
        if (+form.age < 5 || +form.age > 100) e.age = 'Enter a valid age (5–100)'
        if (!form.gender)             e.gender = 'Please select gender'
        if (!form.message.trim())     e.message = 'Message is required'
        return e
    }

    const handleSubmit = ev => {
        ev.preventDefault()
        const errs = validate()
        if (Object.keys(errs).length) { setErrors(errs); return }
        submitContact({
            fullName: form.fullName.trim(),
            email: form.email.trim(),
            phone: '',
            address: form.address.trim(),
            age: form.age ? Number(form.age) : undefined,
            aadharNumber: form.aadharNumber.trim() || undefined,
            qualification: form.qualification || undefined,
            gender: form.gender || undefined,
            message: form.message.trim(),
        }).then(() => setDone(true))
            .catch((e) => setErrors({ submit: e?.response?.data?.message || 'Failed to send. Try again.' }))
    }

    if (done) return <SuccessScreen name={form.fullName} />

    return (
        <>
            {showOTP && (
                <OTPModal
                    email={form.email}
                    onVerified={handleVerified}
                    onClose={() => setShowOTP(false)}
                />
            )}

            <form onSubmit={handleSubmit} noValidate className="flex flex-col !gap-[20px]">

                {/* Title */}
                <div>
                    <h2 className="!m-0 !mb-[6px] leading-none">
                        <span className="font-extrabold text-[#0B1E4B] text-[clamp(20px,3vw,28px)] tracking-[1px]">GET IN </span>
                        <span className="font-extrabold text-[#F05A1A] text-[clamp(20px,3vw,28px)] tracking-[1px]">TOUCH WITH US</span>
                    </h2>
                    <p className="text-slate-400 text-[13px] !m-0 leading-[1.6]">
                        Send us a message — we'll get back to you as soon as possible.
                    </p>
                </div>

                {/* ── FULL NAME ── */}
                <Field label="Full Name" required>
                    <Input
                        type="text" placeholder="Enter your full name"
                        value={form.fullName} err={errors.fullName}
                        onChange={e => { set('fullName', e.target.value); clrErr('fullName') }}
                    />
                    <Err msg={errors.fullName} />
                </Field>

                {/* ── EMAIL VERIFY ── */}
                <Field label="Email Address" required>
                    <EmailVerify
                        value={form.email}
                        verified={form.emailVerified}
                        err={errors.email}
                        onChange={e => { set('email', e.target.value); set('emailVerified', false); clrErr('email') }}
                        onRequestOTP={() => setShowOTP(true)}
                    />
                    <Err msg={errors.email} />
                </Field>

                {/* ── AGE + GENDER ── */}
                <div className="grid grid-cols-1 sm:grid-cols-[110px_1fr] !gap-[14px]">
                    <Field label="Age" required>
                        <Input
                            type="number" placeholder="e.g. 25" min="5" max="100"
                            value={form.age} err={errors.age}
                            onChange={e => { set('age', e.target.value); clrErr('age') }}
                        />
                        <Err msg={errors.age} />
                    </Field>
                    <Field label="Gender" required>
                        <Select err={errors.gender} value={form.gender} onChange={e => { set('gender', e.target.value); clrErr('gender') }}>
                            {GENDER_OPTS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                        </Select>
                        <Err msg={errors.gender} />
                    </Field>
                </div>

                {/* ── QUALIFICATION ── */}
                <Field label="Academic Qualification">
                    <Select value={form.qualification} onChange={e => set('qualification', e.target.value)}>
                        {QUALIFICATION_OPTS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                    </Select>
                </Field>

                {/* ── ADDRESS ── */}
                <Field label="Full Address" required>
                    <Input
                        type="text" err={errors.address}
                        placeholder="House No., Street, Area, City, State – PIN Code"
                        value={form.address}
                        onChange={e => { set('address', e.target.value); clrErr('address') }}
                    />
                    <Err msg={errors.address} />
                </Field>

                {/* ── AADHAR (optional) ── */}
                <Field label="Aadhar Number" hint="Optional — will be kept confidential">
                    <div className="relative">
                        <Input
                            type="text" placeholder="XXXX XXXX XXXX" maxLength={14}
                            value={form.aadharNumber}
                            onChange={e => set('aadharNumber', e.target.value)}
                            className="!pl-[42px]"
                        />
                        <FaIdCard className="absolute left-[14px] top-1/2 -translate-y-1/2 text-slate-300 text-[15px] pointer-events-none" />
                    </div>
                </Field>

                {/* ── MESSAGE ── */}
                <Field label="Your Message" required>
                    <Textarea
                        rows={4}
                        placeholder="Write your question, suggestion or any query here…"
                        err={errors.message}
                        value={form.message}
                        onChange={e => { set('message', e.target.value); clrErr('message') }}
                    />
                    <Err msg={errors.message} />
                </Field>

                {errors.submit && <Err msg={errors.submit} />}
                {/* ── SUBMIT ── */}
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
                    <MdSend className="text-[18px]" />
                    Send Message
                </button>

            </form>
        </>
    )
}

/* ════════════════════════════════════════════════════════
   MAIN EXPORT — ContactUs
════════════════════════════════════════════════════════ */
export default function ContactUs() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-[#F4F6FB] to-white">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
                * { font-family: 'Plus Jakarta Sans', sans-serif; }
            `}</style>

            <div className="max-w-[1280px] !mx-auto !px-[16px] sm:!px-[24px] lg:!px-[32px] !py-[40px]">

                {/* ── TWO COLUMN LAYOUT (50 / 50) ── */}
                <div className="grid grid-cols-1 lg:grid-cols-2 !gap-[24px] items-start">

                    {/* LEFT — Info Panel */}
                    <div className="lg:sticky lg:top-[24px]">
                        <InfoPanel />
                    </div>

                    {/* RIGHT — Contact Form */}
                    <div className="
                        bg-white rounded-[24px]
                        border-[1.5px] border-slate-100
                        shadow-[0_4px_32px_rgba(11,30,75,0.08)]
                        !p-[24px] sm:!p-[32px] lg:!p-[36px]
                    ">
                        <ContactForm />
                    </div>

                </div>
            </div>
        </div>
    )
}