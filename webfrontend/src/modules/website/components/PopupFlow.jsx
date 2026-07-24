import { useEffect, useRef, useState, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { useNavigate, useLocation } from 'react-router-dom'
import { FaTimes } from 'react-icons/fa'
import scannerImage from '../../../assets/images/scanner-img.jpeg'
import { SPORT_OPTIONS } from '@/shared/constants/sports'

const POSTER_URL =
  'https://res.cloudinary.com/dwpvz393k/image/upload/v1782131757/udi_xty1zf.png'

const QR_DELAY_MS = 15000
const GAP_AFTER_QR_MS = 5000

export default function PopupFlow() {
  const [active, setActive] = useState(null) // 'donation' | 'sports'
  const [sport, setSport] = useState('')
  const [mounted, setMounted] = useState(false)
  const timersRef = useRef([])
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    setMounted(true)
  }, [])

  const clearTimers = useCallback(() => {
    timersRef.current.forEach(clearTimeout)
    timersRef.current = []
  }, [])

  const schedule = useCallback((fn, delay) => {
    const id = setTimeout(fn, delay)
    timersRef.current.push(id)
    return id
  }, [])

  const showPopup = useCallback((type) => {
    setActive(type)
  }, [])

  const closePopup = useCallback(() => {
    setActive(null)
  }, [])

  useEffect(() => {
    clearTimers()

    if (location.pathname === '/contact-us') return undefined

    const donationShown = sessionStorage.getItem('donationPopupShown')
    const sportsShown = sessionStorage.getItem('sportsTalentPopupShown')

    const openSports = () => {
      if (sessionStorage.getItem('sportsTalentPopupShown')) return
      showPopup('sports')
      sessionStorage.setItem('sportsTalentPopupShown', 'true')
    }

    const openDonation = () => {
      if (sessionStorage.getItem('donationPopupShown')) return
      showPopup('donation')
      sessionStorage.setItem('donationPopupShown', 'true')
      schedule(openSports, GAP_AFTER_QR_MS)
    }

    if (!donationShown) {
      schedule(openDonation, QR_DELAY_MS)
    } else if (!sportsShown) {
      schedule(openSports, QR_DELAY_MS)
    }

    return clearTimers
  }, [location.pathname, clearTimers, schedule, showPopup])

  const handleRegister = () => {
    if (!sport) return

    const message = `Sports Talent Registration 2026 — I want to register for ${sport}. Please share scholarship and registration details.`
    const params = new URLSearchParams({ message })
    closePopup()
    navigate(`/contact-us?${params.toString()}`)
  }

  if (!mounted || !active) return null

  return createPortal(
    <div
      className="fixed inset-0 z-[10050] flex items-center justify-center bg-black/60 px-3 backdrop-blur-sm sm:px-4"
      onClick={closePopup}
      role="dialog"
      aria-modal="true"
    >
      {/* DONATION / QR POPUP — 15 seconds */}
      {active === 'donation' && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="relative flex w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-[#e6f0ee] shadow-2xl md:min-h-[420px] md:flex-row"
        >
          <div className="flex w-full flex-col justify-center p-4 sm:p-6 md:w-1/2 md:p-8">
            <p className="mb-2 text-[10px] tracking-widest text-gray-500 sm:mb-3 sm:text-xs">
              SUPPORT OUR CAUSE
            </p>
            <h2 className="mb-3 text-xl font-bold leading-tight text-gray-900 sm:mb-4 sm:text-2xl md:text-3xl">
              Help Players Achieve Their Dreams 💚
            </h2>
            <p className="mb-3 text-sm text-gray-600 sm:mb-4 sm:text-base">
              Your contribution helps us provide better training, equipment, and opportunities for talented players.
            </p>
            <p className="mb-4 text-xs text-gray-500 sm:mb-6 sm:text-sm">
              Every donation makes a real impact in shaping the future of athletes.
            </p>
            <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
              <a
                href="/donate-now"
                className="rounded-lg bg-black px-4 py-2.5 text-center text-xs font-semibold text-white transition hover:bg-gray-800 sm:px-6 sm:py-3 sm:text-sm"
              >
                Donate Now
              </a>
              <button
                type="button"
                onClick={closePopup}
                className="rounded-lg border border-gray-400 px-4 py-2.5 text-xs text-gray-700 transition hover:bg-gray-100 sm:px-6 sm:py-3 sm:text-sm"
              >
                Maybe Later
              </button>
            </div>
          </div>

          <div className="relative flex w-full flex-col items-center justify-center bg-[#cfe3df] p-4 sm:p-6 md:w-1/2 md:p-8">
            <img
              src={scannerImage}
              alt="QR Code"
              className="mb-3 h-36 w-36 select-none rounded-xl border bg-white p-2 shadow-lg pointer-events-none sm:mb-4 sm:h-44 sm:w-44 sm:p-3 md:h-56 md:w-56"
            />
            <p className="mb-1 text-xs font-medium text-gray-700 sm:text-sm">Scan to Donate Instantly</p>
            <p className="text-center text-[10px] text-gray-500 sm:text-xs">Fast • Secure • Easy</p>
            <button
              type="button"
              onClick={closePopup}
              className="absolute right-2 top-2 rounded-full bg-white p-1.5 shadow hover:bg-gray-100 sm:right-3 sm:top-3 sm:p-2"
              aria-label="Close popup"
            >
              <FaTimes size={14} />
            </button>
          </div>
        </div>
      )}

      {/* SPORTS REGISTRATION — 5 sec after QR popup */}
      {active === 'sports' && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="relative flex w-full max-w-lg flex-col overflow-hidden rounded-2xl bg-white shadow-2xl sm:max-w-xl"
          aria-labelledby="sports-talent-popup-title"
        >
          <button
            type="button"
            onClick={closePopup}
            className="absolute right-3 top-3 z-10 rounded-full bg-black/50 p-1.5 text-white shadow hover:bg-black/70"
            aria-label="Close popup"
          >
            <FaTimes size={14} />
          </button>

          <div className="w-full shrink-0 bg-[#0d1f14]">
            <img
              src={POSTER_URL}
              alt="Sports Talent Hunt 2026"
              className="block h-auto w-full object-contain"
              loading="eager"
            />
          </div>

          <div className="flex w-full flex-col justify-center p-5 sm:p-6">
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-[#1a6b3a] sm:text-xs">
              Sports Talent Registration
            </p>

            <h2
              id="sports-talent-popup-title"
              className="mb-2 text-lg font-bold leading-snug text-gray-900 sm:text-xl md:text-2xl"
            >
              🎯 Join India&apos;s Biggest Sports Talent Hunt 2026
            </h2>

            <p className="mb-5 text-sm text-gray-600 sm:text-base">
              Register Now &amp; Get Scholarship Opportunities
            </p>

            <label htmlFor="sport-select" className="mb-1.5 text-xs font-medium text-gray-700">
              Select Your Sport <span className="text-red-500">*</span>
            </label>
            <select
              id="sport-select"
              value={sport}
              onChange={(e) => setSport(e.target.value)}
              className="mb-5 w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-800 outline-none transition focus:border-[#1a6b3a] focus:ring-2 focus:ring-[#1a6b3a]/20"
            >
              <option value="">Choose a sport…</option>
              {SPORT_OPTIONS.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>

            <div className="flex flex-col gap-2.5 sm:flex-row">
              <button
                type="button"
                onClick={handleRegister}
                disabled={!sport}
                className="flex-1 rounded-lg bg-[#1a6b3a] py-2.5 text-sm font-semibold text-white transition hover:bg-[#145a2e] disabled:cursor-not-allowed disabled:opacity-50"
              >
                Register Now
              </button>
              <button
                type="button"
                onClick={closePopup}
                className="flex-1 rounded-lg border border-gray-300 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
              >
                Later
              </button>
            </div>
          </div>
        </div>
      )}
    </div>,
    document.body
  )
}
