import React, { useState } from 'react'
import { FaChevronDown, FaAngleDoubleRight } from 'react-icons/fa'
import becomeMemberImg from "@/assets/images/member-card-img.png";
import becomeMemberImgMobile from "@/assets/images/become-a-member-small-screen-img.webp";
import becomeMemberBg from "@/assets/images/bg-become_A_Member.png";
import { useNavigate } from 'react-router-dom';

const memberTypes = [
  { value: 'special', label: 'Special Member' },
  { value: 'general', label: 'General Member' },
]

const BecomeAMember = () => {
  const [selected, setSelected] = useState('special')
  const [dropOpen, setDropOpen] = useState(false)

  const selectedLabel = memberTypes.find(m => m.value === selected)?.label

  const routeMap = {
    special: "/membership/special-member",
    general: "/membership/general-member",
  };
  const navigate = useNavigate();
  const handleSubmit = () => {
    navigate(routeMap[selected]);
  };

  return (
    <>
      <style>{`
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

        @keyframes personIn {
          from { opacity:0; transform: translateX(30px); }
          to   { opacity:1; transform: translateX(0); }
        }
        .person-img { animation: personIn .8s cubic-bezier(.16,1,.3,1) .2s both; }

        @keyframes mobileImgIn {
          from { opacity:0; transform: translateY(10px); }
          to   { opacity:1; transform: translateY(0); }
        }
        .mobile-person-img { animation: mobileImgIn .7s cubic-bezier(.16,1,.3,1) .1s both; }

        .chev { transition: transform .25s ease; }
        .chev.open { transform: rotate(180deg); }

        /* ── Mobile ── */
        @media (max-width: 767px) {

          .bam-card {
            border-radius: 18px !important;
          }

          .bam-inner {
            display: flex !important;
            flex-direction: column !important;
            padding: 0 !important;
          }

          .bam-left {
            order: 2 !important;
            padding: 16px 16px 22px 16px !important;
            max-width: 100% !important;
          }

          .bam-mobile-img-wrap {
            order: 1 !important;
            width: 100% !important;
            overflow: hidden !important;
            line-height: 0 !important;
          }

          .bam-mobile-img-wrap img {
            width: 100% !important;
            height: auto !important;
            display: block !important;
            object-fit: cover !important;
            object-position: top center !important;
            max-height: 220px !important;
          }

          /* Dropdown + button stack */
          .bam-form-row {
            flex-direction: column !important;
            gap: 10px !important;
          }

          .bam-dropdown-btn {
            border-radius: 10px !important;
            border-right: 1px solid #e5e7eb !important;
          }

          .submit-btn {
            border-radius: 10px !important;
            width: 100% !important;
            justify-content: center !important;
          }
        }
      `}</style>

      <section className="!py-[28px] sm:!py-[48px] lg:!py-[64px] !px-[12px] sm:!px-[24px] lg:!px-[10px]">
        <div className="!max-w-[1100px] !mx-auto">

          {/* ── Card ── */}
          <div
            className="bam-card rounded-xl max-md:![background:_linear-gradient(54.51deg,_#20569C_3.18%,_#7CA6B1_107.73%)] bg-center bg-no-repeat [background-size:_100%_100%]"
            style={{ backgroundImage: `url(${becomeMemberBg})` }}
          >
            <div className="bam-inner grid grid-cols-1 md:grid-cols-2 md:!p-[0px_2px_85px_20px]">

              {/* ── Mobile Image — only on small screens ── */}
              <div className=" block md:!hidden">
                <img
                  src={becomeMemberImgMobile}
                  alt="Become a Member"
                  className="w-full"
                />
              </div>

              {/* ── Left Content ── */}
              <div
                className="bam-left !relative !z-10 !flex !flex-col !justify-center"
                style={{ padding: '0px 40px 20px 40px', maxWidth: 520, flex: '1 1 auto' }}
              >
                <h2
                  className="!m-0 !mb-3 sm:!mb-4"
                  style={{
                    fontFamily: "'Bebas Neue', cursive",
                    fontSize: 'clamp(32px,5vw,58px)',
                    letterSpacing: 3,
                    lineHeight: 1.05,
                    color: '#fff',
                  }}
                >
                  Become A<br />Member
                </h2>

                <p
                  className="!mt-0 !mb-4 sm:!mb-7"
                  style={{
                    fontSize: 'clamp(12px,1.4vw,14.5px)',
                    color: 'rgba(255,255,255,.72)',
                    lineHeight: 1.75,
                    maxWidth: 400,
                  }}
                >
                  Join our growing family of sports enthusiasts, patrons, and champions.
                  Your membership helps us reach more athletes and change more lives across India.
                </p>

                {/* Dropdown + Submit */}
                <div className="bam-form-row !flex !items-stretch !gap-0" style={{ maxWidth: 420 }}>

                  {/* Dropdown */}
                  <div className="!relative !flex-1">
                    <button
                      className="bam-dropdown-btn !w-full !flex !items-center !justify-between !border-0 !cursor-pointer !outline-none"
                      style={{
                        padding: '13px 18px',
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

                  {/* Submit */}
                  <button
                    className="submit-btn !flex !items-center !gap-2 !border-0 !cursor-pointer !flex-shrink-0"
                    style={{
                      padding: '13px 22px',
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

              {/* ── Desktop Right Image ── */}
              <div className="hidden md:flex items-end justify-center">
                <img
                  src={becomeMemberImg}
                  alt="Member"
                  className="person-img w-full max-h-[432px] !-mb-4 h-[104%]"
                />
              </div>

            </div>
          </div>

        </div>
      </section>
    </>
  )
}

export default BecomeAMember