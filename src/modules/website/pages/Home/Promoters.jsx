import React from 'react'
import { BsStarFill } from 'react-icons/bs'

// ── Data (baad mein API se replace karein) ──
const promoters = [
  {
    id: 1,
    name: 'Sh. Chander Kanta',
    role: 'Senior founder & promotor',
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=85&fit=crop&crop=face',
  },
  {
    id: 2,
    name: 'Mr. Lakshaya',
    role: 'Young Founder & Promoter',
    img: 'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?w=600&q=85&fit=crop&crop=top',
  },
  {
    id: 3,
    name: 'Mrs. Udita',
    role: 'Young Promoter',
    img: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=600&q=85&fit=crop&crop=face',
  },
]

const Promoters = () => {
  return (
    <>
      <style>{`
        /* Card */
        .promo-card {
          transition: transform .32s cubic-bezier(.16,1,.3,1), box-shadow .32s ease;
          cursor: default;
        }
        .promo-card:hover {
          transform: translateY(-8px) !important;
          box-shadow: 0 24px 56px rgba(11,30,75,.13) !important;
        }

        /* Photo zoom on hover */
        .promo-photo {
          transition: transform .4s cubic-bezier(.16,1,.3,1);
        }
        .promo-card:hover .promo-photo {
          transform: scale(1.06);
        }

        /* Bottom gradient overlay always visible, intensifies on hover */
        .promo-overlay {
          transition: opacity .3s ease;
          opacity: 0.45;
        }
        .promo-card:hover .promo-overlay {
          opacity: 0.65;
        }

        /* Orange badge */
        .promo-badge {
          transition: transform .3s cubic-bezier(.16,1,.3,1), box-shadow .3s ease;
        }
        .promo-card:hover .promo-badge {
          transform: scale(1.08);
          box-shadow: 0 6px 20px rgba(240,90,26,.45) !important;
        }

        /* Name underline on hover */
        .promo-name {
          position: relative;
          display: inline-block;
        }
        .promo-name::after {
          content: '';
          position: absolute;
          bottom: -2px; left: 0;
          width: 0; height: 2px;
          background: linear-gradient(90deg,#F05A1A,#FF7D42);
          border-radius: 2px;
          transition: width .3s ease;
        }
        .promo-card:hover .promo-name::after { width: 100%; }
      `}</style>

      <section className="promoters-section !bg-white !py-20 !px-4 sm:!px-6 lg:!px-8">
        <div className="!max-w-[1100px] !mx-auto">

          {/* ── Header ── */}
          <div className="!text-center !mb-12">

            {/* Pill badge */}
            <div
              className="inline-flex items-center !rounded-full !mb-5"
              style={{
                padding: '5px 18px',
                border: '1.5px solid rgba(240,90,26,.4)',
                background: 'rgba(240,90,26,.05)',
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '2.5px',
                textTransform: 'uppercase',
                color: '#F05A1A',
              }}
            >
              Our Promoters
            </div>

            {/* Heading */}
            <h2
              className="!m-0 !mb-3"
              style={{
                fontFamily: "'Bebas Neue', cursive",
                fontSize: 'clamp(36px,6vw,62px)',
                letterSpacing: 3,
                lineHeight: 1.05,
                color: '#0B1E4B',
              }}
            >
              Champions{' '}
              <span style={{ color: '#F05A1A' }}>Behind</span>{' '}
              Champions
            </h2>

            {/* Underline accent */}
            <div
              className="!mx-auto"
              style={{
                width: 52,
                height: 4,
                borderRadius: 2,
                background: 'linear-gradient(90deg,#F05A1A,#FF7D42)',
              }}
            />
          </div>

          {/* ── Cards Grid ── */}
          <div className="!grid !grid-cols-1 sm:!grid-cols-2 lg:!grid-cols-3 !gap-6">
            {promoters.map((p) => (
              <div
                key={p.id}
                className="promo-card !rounded-2xl !overflow-hidden !bg-white"
                style={{
                  boxShadow: '0 4px 20px rgba(11,30,75,.08)',
                  border: '1px solid #f1f5f9',
                }}
              >
                {/* ── Photo Area ── */}
                <div className="!relative !overflow-hidden" style={{ aspectRatio: '4/3.2' }}>

                  {/* Photo */}
                  <img
                    src={p.img}
                    alt={p.name}
                    className="promo-photo !w-full !h-full !object-cover !object-top"
                  />

                  {/* Bottom fade overlay */}
                  <div
                    className="promo-overlay !absolute !inset-0"
                    style={{
                      background: 'linear-gradient(to top, rgba(11,30,75,.55) 0%, transparent 55%)',
                    }}
                  />

                  {/* Promoter badge — top left */}
                  <div
                    className="promo-badge !absolute !top-4 !left-4 !flex !items-center !gap-1.5 !rounded-full"
                    style={{
                      padding: '6px 14px',
                      background: 'linear-gradient(90deg,#F05A1A,#FF7D42)',
                      fontSize: 11.5,
                      fontWeight: 700,
                      color: '#fff',
                      letterSpacing: '0.3px',
                      boxShadow: '0 4px 14px rgba(240,90,26,.38)',
                    }}
                  >
                    <BsStarFill style={{ fontSize: 9, color: '#FFE4B5' }} />
                    Promoter
                  </div>
                </div>

                {/* ── Info Area ── */}
                <div className="!px-5 !py-4">
                  <h3
                    className="!mt-0 !mb-1"
                    style={{
                      fontSize: 17,
                      fontWeight: 800,
                      color: '#0B1E4B',
                      lineHeight: 1.3,
                    }}
                  >
                    <span className="promo-name">{p.name}</span>
                  </h3>
                  <p
                    className="!m-0"
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: '#F05A1A',
                      letterSpacing: '0.2px',
                    }}
                  >
                    {p.role}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  )
}

export default Promoters