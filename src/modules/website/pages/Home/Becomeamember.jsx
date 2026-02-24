import React, { useState } from 'react'
import { FaChevronDown, FaAngleDoubleRight } from 'react-icons/fa'

const memberTypes = [
  { value: 'special', label: 'Special Member' },
  { value: 'general', label: 'General Member' },
  { value: 'patron', label: 'Patron Member' },
  { value: 'associate', label: 'Associate Member' },
]

const BecomeAMember = () => {
  const [selected, setSelected] = useState('special')
  const [dropOpen, setDropOpen] = useState(false)

  const selectedLabel = memberTypes.find(m => m.value === selected)?.label

  const handleSubmit = () => {
    alert(`Applying as: ${selectedLabel}`)
    // baad mein API call yahan aayegi
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        .bam-section { font-family: 'Plus Jakarta Sans', sans-serif; }

        /* Grid lines texture */
        .bam-grid {
          background-image:
            repeating-linear-gradient(0deg, transparent, transparent 36px, rgba(255,255,255,.05) 36px, rgba(255,255,255,.05) 37px),
            repeating-linear-gradient(90deg, transparent, transparent 36px, rgba(255,255,255,.05) 36px, rgba(255,255,255,.05) 37px);
        }

        /* Dropdown */
        @keyframes dropSlide {
          from { opacity:0; transform: translateY(-6px); }
          to   { opacity:1; transform: translateY(0); }
        }
        .drop-list { animation: dropSlide .2s cubic-bezier(.16,1,.3,1) both; }

        .drop-item {
          transition: background .15s ease, color .15s ease;
          cursor: pointer;
        }
        .drop-item:hover { background: #EFF6FF !important; color: #1D4ED8 !important; }
        .drop-item.active-item { color: #1D4ED8 !important; font-weight: 700 !important; }

        /* Submit button */
        .submit-btn {
          position: relative; overflow: hidden;
          transition: transform .25s ease, box-shadow .25s ease;
        }
        .submit-btn::after {
          content: '';
          position: absolute; top:0; left:-80%; width:60%; height:100%;
          background: linear-gradient(120deg,transparent,rgba(255,255,255,.18),transparent);
          transform: skewX(-15deg);
          transition: left .4s ease;
        }
        .submit-btn:hover::after { left: 130%; }
        .submit-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 28px rgba(29,78,216,.5) !important;
        }

        /* Person image fade-in */
        @keyframes personIn {
          from { opacity:0; transform: translateX(30px); }
          to   { opacity:1; transform: translateX(0); }
        }
        .person-img { animation: personIn .8s cubic-bezier(.16,1,.3,1) .2s both; }

        /* Chevron rotate */
        .chev { transition: transform .25s ease; }
        .chev.open { transform: rotate(180deg); }

        @media (max-width: 767px) {
          .person-wrap { display: none !important; }
          .bam-card { border-radius: 16px !important; }
        }
      `}</style>

      <section className="bam-section !bg-[#f4f6fb] !py-12 !px-4 sm:!px-6 lg:!px-10">
        <div className="!max-w-[1100px] !mx-auto">

          {/* ── Card ── */}
          <div
            className="bam-card bam-grid !relative !overflow-hidden !flex !items-center !justify-between"
            style={{
              background: 'linear-gradient(120deg,#1a3fad 0%,#1e4fd8 50%,#1a3fad 100%)',
              borderRadius: 22,
              minHeight: 260,
              boxShadow: '0 24px 64px rgba(29,78,216,.28)',
            }}
          >

            {/* Left glow blob */}
            <div
              className="!absolute !pointer-events-none"
              style={{
                top: -60, left: -60, width: 240, height: 240,
                borderRadius: '50%',
                background: 'radial-gradient(circle,rgba(255,255,255,.07) 0%,transparent 70%)',
              }}
            />

            {/* ── Left Content ── */}
            <div
              className="!relative !z-10 !flex !flex-col !justify-center"
              style={{ padding: '44px 40px', maxWidth: 520, flex: '1 1 auto' }}
            >
              {/* Heading */}
              <h2
                className="!m-0 !mb-4"
                style={{
                  fontFamily: "'Bebas Neue', cursive",
                  fontSize: 'clamp(38px,5vw,58px)',
                  letterSpacing: 3,
                  lineHeight: 1.05,
                  color: '#fff',
                }}
              >
                Become A<br />Member
              </h2>

              {/* Subtext */}
              <p
                className="!mb-7 !mt-0"
                style={{
                  fontSize: 'clamp(13px,1.4vw,14.5px)',
                  color: 'rgba(255,255,255,.72)',
                  lineHeight: 1.75,
                  maxWidth: 400,
                }}
              >
                Join our growing family of sports enthusiasts, patrons, and champions.
                Your membership helps us reach more athletes and change more lives across India.
              </p>

              {/* Dropdown + Submit row */}
              <div className="!flex !items-center !gap-0" style={{ maxWidth: 420 }}>

                {/* Custom Dropdown */}
                <div className="!relative !flex-1">
                  <button
                    className="!w-full !flex !items-center !justify-between !border-0 !cursor-pointer !outline-none"
                    style={{
                      padding: '14px 18px',
                      background: '#fff',
                      borderRadius: '12px 0 0 12px',
                      fontSize: 14,
                      fontWeight: 600,
                      color: '#374151',
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      borderRight: '1px solid #e5e7eb',
                    }}
                    onClick={() => setDropOpen(p => !p)}
                  >
                    <span style={{ color: selected ? '#0B1E4B' : '#9ca3af' }}>
                      {selectedLabel || 'Select Member Type'}
                    </span>
                    <FaChevronDown
                      className={`chev ${dropOpen ? 'open' : ''}`}
                      style={{ fontSize: 12, color: '#6b7280', marginLeft: 8, flexShrink: 0 }}
                    />
                  </button>

                  {/* Dropdown list */}
                  {dropOpen && (
                    <div
                      className="drop-list !absolute !left-0 !right-0 !z-50 !bg-white !overflow-hidden"
                      style={{
                        top: 'calc(100% + 6px)',
                        borderRadius: 12,
                        boxShadow: '0 16px 48px rgba(11,30,75,.16)',
                        border: '1px solid #e8ecf4',
                      }}
                    >
                      {memberTypes.map(m => (
                        <div
                          key={m.value}
                          className={`drop-item ${selected === m.value ? 'active-item' : ''}`}
                          style={{
                            padding: '11px 18px',
                            fontSize: 13.5,
                            fontWeight: selected === m.value ? 700 : 500,
                            color: selected === m.value ? '#1D4ED8' : '#374151',
                            background: selected === m.value ? '#EFF6FF' : 'transparent',
                          }}
                          onClick={() => { setSelected(m.value); setDropOpen(false); }}
                        >
                          {m.label}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Submit button */}
                <button
                  className="submit-btn !flex !items-center !gap-2 !border-0 !cursor-pointer !flex-shrink-0"
                  style={{
                    padding: '14px 24px',
                    background: '#1D4ED8',
                    borderRadius: '0 12px 12px 0',
                    fontSize: 14,
                    fontWeight: 700,
                    color: '#fff',
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    boxShadow: '0 4px 16px rgba(29,78,216,.35)',
                    whiteSpace: 'nowrap',
                  }}
                  onClick={handleSubmit}
                >
                  Submit
                  <FaAngleDoubleRight style={{ fontSize: 13 }} />
                </button>
              </div>
            </div>

            {/* ── Right Person Image ── */}
            <div
              className="person-wrap !absolute !right-0 !bottom-0 !z-10 !pointer-events-none"
              style={{ height: '110%', display: 'flex', alignItems: 'flex-end' }}
            >
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&q=85&fit=crop&crop=top"
                alt="Member"
                className="person-img"
                style={{
                  height: '100%',
                  width: 'auto',
                  maxWidth: 380,
                  objectFit: 'cover',
                  objectPosition: 'top',
                  filter: 'drop-shadow(-8px 0 24px rgba(11,30,75,.3))',
                }}
              />
            </div>

            {/* Right glow */}
            <div
              className="!absolute !pointer-events-none"
              style={{
                bottom: -40, right: 300,
                width: 200, height: 200,
                borderRadius: '50%',
                background: 'radial-gradient(circle,rgba(255,255,255,.06) 0%,transparent 70%)',
              }}
            />
          </div>

        </div>
      </section>
    </>
  )
}

export default BecomeAMember