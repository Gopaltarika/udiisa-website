import React, { useState } from 'react'
import { FaArrowRight, FaTimes } from 'react-icons/fa'

const chairmen = [
  {
    name: 'Sunil Jalan',
    role: 'Advisory Board Chairman',
    roleBadege: 'Chairman',
    desc: 'A visionary leader with 25+ years in sports administration and philanthropy, bringing unparalleled expertise to our strategic direction.',
    img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=85&fit=crop&crop=face',
    modalTitle: 'Visionary Leader of Sports Administration',
    modalContent: [
      'Sunil Jalan brings over 25 years of unmatched experience in sports administration and philanthropy to SportForce NGO. His journey began on the fields of grassroots cricket, where he witnessed firsthand the struggles of talented athletes without financial backing.',
      'His contribution spans across policy-making, athlete welfare programs, and establishing national-level sports infrastructure. He has been instrumental in designing frameworks that ensure long-term sustainability for underprivileged athletes across 28 states.',
      'A former state-level player himself, Sunil ensures that every decision made at the board level reflects the ground realities faced by aspiring champions at the grassroots level.',
    ],
  },
  {
    name: 'Suresh Jindal',
    role: 'Advisory Board Vice Chairman',
    roleBadege: ' Vice Chairman',
    desc: 'A seasoned industrialist and sports patron, instrumental in establishing financial frameworks that support athletes at every stage.',
    img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=85&fit=crop&crop=face',
    modalTitle: 'Industrial Patron of Sports Excellence',
    modalContent: [
      'Suresh Jindal brings the discipline and vision of a seasoned industrialist to the world of sports welfare. With a successful manufacturing empire spanning 30 years, he recognized that the principles of identifying talent, investing wisely, and nurturing growth apply equally to sports and business.',
      'His contribution goes beyond financial patronage — Suresh has established direct pipelines to corporate sponsors, helped create job placement programs for retired athletes, and championed girl athletes in regions where cultural barriers remain high.',
      'A former state-level cricket player himself, Suresh ensures our programs remain grounded in the practical realities athletes face at the grassroots level.',
    ],
  },
]

const AdvisoryBoard = () => {
  const [selected, setSelected] = useState(null)

  return (
    <>
      <style>{`
        .chair-card { transition: transform .3s ease, box-shadow .3s ease; }
        .chair-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 24px 56px rgba(11,30,75,.14) !important;
        }

        .show-btn { transition: all .25s ease; position: relative; overflow: hidden; }
        .show-btn:hover {
          background: #0B1E4B !important;
          color: #fff !important;
          border-color: #0B1E4B !important;
        }
        .show-btn:hover .btn-arrow { transform: translateX(4px); }
        .btn-arrow { transition: transform .25s ease; }

        @keyframes ringPulse {
          0%,100% { box-shadow: 0 0 0 4px rgba(240,90,26,.2), 0 0 0 8px rgba(240,90,26,.07); }
          50%      { box-shadow: 0 0 0 6px rgba(240,90,26,.3), 0 0 0 12px rgba(240,90,26,.1); }
        }
        .photo-ring { animation: ringPulse 3s ease-in-out infinite; }

        @keyframes modalIn {
          from { opacity:0; transform: scale(.94) translateY(16px); }
          to   { opacity:1; transform: scale(1) translateY(0); }
        }
        .modal-box { animation: modalIn .28s cubic-bezier(.16,1,.3,1) both; }

        @keyframes overlayIn { from{opacity:0} to{opacity:1} }
        .modal-overlay { animation: overlayIn .2s ease both; }

        .close-btn { transition: all .22s ease; }
        .close-btn:hover {
          background: #0B1E4B !important;
          color: #fff !important;
          transform: rotate(90deg);
        }
      `}</style>

      <section className="advisory-section !bg-white !py-20 !px-4 sm:!px-6 lg:!px-8">
        <div className="!max-w-[1000px] !mx-auto">

          {/* Header */}
          <div className="!text-center !mb-14">
            <div
              className="inline-flex items-center !rounded-full !mb-5"
              style={{
                padding: '5px 18px',
                border: '1.5px solid rgba(240,90,26,.4)',
                background: 'rgba(240,90,26,.05)',
                fontSize: 11, fontWeight: 700,
                letterSpacing: '2.5px', textTransform: 'uppercase', color: '#F05A1A',
              }}
            >
              Advisory Board
            </div>

            <h2
              className="!m-0 !mb-2.5"
              style={{
                fontFamily: "'Bebas Neue', cursive",
                fontSize: 'clamp(36px,6vw,58px)',
                letterSpacing: 3, lineHeight: 1.05, color: '#0B1E4B',
              }}
            >
               Board Of Advisory<span style={{ color: '#F05A1A' }}>Commitee</span>
            </h2>

            <div
              className="!mx-auto !mb-4"
              style={{ width: 52, height: 4, borderRadius: 2, background: 'linear-gradient(90deg,#F05A1A,#FF7D42)' }}
            />

            <p className="!m-0" style={{ fontSize: 15, color: '#64748b', lineHeight: 1.7 }}>
              Distinguished leaders guiding our mission with wisdom and expertise.
            </p>
          </div>

          {/* Cards */}
          <div className="!grid !grid-cols-1 sm:!grid-cols-2 !gap-8">
            {chairmen.map((c) => (
              <div
                key={c.name}
                className="chair-card !flex !flex-col !items-center !text-center !rounded-2xl !bg-white"
                style={{
                  padding: '40px 36px 36px',
                  boxShadow: '0 4px 24px rgba(11,30,75,.08)',
                  border: '1px solid #f1f5f9',
                }}
              >
                {/* Photo */}
                <div className="!relative !mb-8">
                  <div className="photo-ring !rounded-full !overflow-hidden" style={{ width: 140, height: 140 }}>
                    <img src={c.img} alt={c.name} className="!w-full !h-full !object-cover object-top" />
                  </div>
                  <div
                    className="!absolute -bottom-3 !left-1/2 -translate-x-1/2 !whitespace-nowrap !rounded-full"
                    style={{
                      padding: '4px 14px',
                      background: 'linear-gradient(90deg,#F05A1A,#FF7D42)',
                      fontSize: 10.5, fontWeight: 700, color: '#fff',
                    }}
                  >
                    {c.roleBadege}
                  </div>
                </div>

                {/* Name */}
                <h3
                  className="!mt-2 !mb-1"
                  style={{
                    fontFamily: "'Bebas Neue', cursive",
                    fontSize: 28, letterSpacing: 2.5, color: '#0B1E4B',
                  }}
                >
                  {c.name}
                </h3>

                {/* Role */}
                <p
                  className="!mb-3"
                  style={{
                    fontSize: 10.5, fontWeight: 700, letterSpacing: '2px',
                    textTransform: 'uppercase', color: '#94a3b8',
                  }}
                >
                  {c.role}
                </p>

                {/* Desc */}
                <p className="!mb-6" style={{ fontSize: 14, color: '#475569', lineHeight: 1.75, maxWidth: 320 }}>
                  {c.desc}
                </p>

                {/* Button */}
                <button
                  className="show-btn !flex !items-center !gap-2 !rounded-full !cursor-pointer"
                  style={{
                    padding: '11px 26px',
                    border: '1.5px solid #0B1E4B',
                    background: 'transparent',
                    fontSize: 13.5, fontWeight: 700,
                    color: '#0B1E4B',
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                  }}
                  onClick={() => setSelected(c)}
                >
                  Show More
                  <FaArrowRight className="btn-arrow" style={{ fontSize: 12 }} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ MODAL POPUP ══ */}
      {selected && (
        <div
          className="modal-overlay !fixed !inset-0 !z-[999] !flex !items-center !justify-center !px-4"
          style={{ background: 'rgba(11,30,75,.65)', backdropFilter: 'blur(6px)' }}
          onClick={() => setSelected(null)}
        >
          <div
            className="modal-box !relative !bg-white !rounded-2xl !w-full !overflow-hidden"
            style={{ maxWidth: 700, boxShadow: '0 32px 80px rgba(11,30,75,.3)' }}
            onClick={e => e.stopPropagation()}
          >
            <div className="!flex">

              {/* Left dark panel */}
              <div
                className="!flex-shrink-0 !flex !flex-col !items-center !justify-center !py-10 !px-6"
                style={{
                  width: 190,
                  background: 'linear-gradient(160deg,#1e3a6e,#0B1E4B)',
                }}
              >
                <div
                  className="photo-ring !rounded-full !overflow-hidden !mb-4"
                  style={{ width: 100, height: 100 }}
                >
                  <img
                    src={selected.img}
                    alt={selected.name}
                    className="!w-full !h-full !object-cover object-top"
                  />
                </div>
                <h4
                  className="!text-center !mb-1 !mt-0"
                  style={{
                    fontFamily: "'Bebas Neue', cursive",
                    fontSize: 20, letterSpacing: 2, color: '#fff',
                  }}
                >
                  {selected.name}
                </h4>
                <p
                  className="!text-center !m-0"
                  style={{
                    fontSize: 9, fontWeight: 700, letterSpacing: '1.5px',
                    textTransform: 'uppercase', color: 'rgba(255,255,255,.5)',
                    lineHeight: 1.6,
                  }}
                >
                  {selected.role}
                </p>
              </div>

              {/* Right content */}
              <div
                className="!flex-1 !overflow-y-auto"
                style={{ padding: '32px 48px 32px 32px', maxHeight: '80vh' }}
              >
                <h3
                  className="!mt-0 !mb-5"
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: 22, fontWeight: 800, color: '#0B1E4B', lineHeight: 1.3,
                  }}
                >
                  {selected.modalTitle}
                </h3>
                {selected.modalContent.map((para, i) => (
                  <p
                    key={i}
                    className="!mb-4"
                    style={{ fontSize: 14, color: '#475569', lineHeight: 1.85 }}
                  >
                    {para}
                  </p>
                ))}
              </div>
            </div>

            {/* Close X button */}
            <button
              className="close-btn !absolute !top-3 !right-3 !flex !items-center !justify-center !rounded-full !border-0 !cursor-pointer"
              style={{
                width: 32, height: 32,
                background: '#f1f5f9',
                color: '#64748b',
              }}
              onClick={() => setSelected(null)}
            >
              <FaTimes style={{ fontSize: 13 }} />
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default AdvisoryBoard