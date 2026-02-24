import React from 'react'
import { FaSearch, FaBullseye, FaMoneyBillWave, FaBrain, FaSchool, FaFemale, FaBullhorn, FaTrophy } from 'react-icons/fa'

const services = [
  {
    icon: <FaSearch />,
    title: 'Talent Identification',
    desc: 'Nationwide grassroots scouting to discover exceptional athletic talent across all disciplines.',
  },
  {
    icon: <FaBullseye />,
    title: 'Player Selection',
    desc: 'Rigorous evaluation process ensuring only the most deserving athletes receive our support.',
  },
  {
    icon: <FaMoneyBillWave />,
    title: 'Financial Assistance',
    desc: 'Comprehensive financial support covering training, equipment, travel, and participation fees.',
  },
  {
    icon: <FaBrain />,
    title: 'Mentorship & Guidance',
    desc: 'One-on-one mentoring from former national athletes and industry professionals.',
  },
  {
    icon: <FaSchool />,
    title: 'Academy Placement',
    desc: 'Direct placement in top-tier sports academies and training centers across India.',
  },
  {
    icon: <FaFemale />,
    title: 'Girl Player Empowerment',
    desc: 'Dedicated programs to support and empower female athletes in breaking barriers.',
  },
  {
    icon: <FaBullhorn />,
    title: 'Social Media Promotion',
    desc: "Amplifying athletes' stories and achievements across digital platforms for maximum exposure.",
  },
  {
    icon: <FaTrophy />,
    title: 'Organizing Sports Events',
    desc: 'Annual tournaments and championship events that provide competitive exposure to our athletes.',
  },
]

const WhatWeDo = () => {
  return (
    <>
      <style>{`
        .svc-card {
          position: relative;
          overflow: hidden;
          transition: transform .32s cubic-bezier(.16,1,.3,1),
                      box-shadow .32s ease,
                      border-color .25s ease,
                      background .25s ease;
          cursor: default;
        }

        /* Bottom orange bar */
        .svc-card::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg,#F05A1A,#FF7D42);
          border-radius: 0 0 16px 16px;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform .35s cubic-bezier(.16,1,.3,1);
        }
        .svc-card:hover::after { transform: scaleX(1); }

        /* Shimmer sweep */
        .svc-card::before {
          content: '';
          position: absolute;
          top: 0; left: -80%;
          width: 60%; height: 100%;
          background: linear-gradient(120deg,transparent,rgba(255,255,255,.05),transparent);
          transform: skewX(-15deg);
          transition: left .5s ease;
          pointer-events: none;
          z-index: 1;
        }
        .svc-card:hover::before { left: 130%; }

        /* Hover state */
        .svc-card:hover {
          transform: translateY(-8px) !important;
          box-shadow: 0 24px 56px rgba(240,90,26,.22) !important;
          border-color: rgba(240,90,26,.6) !important;
          background: rgba(240,90,26,.06) !important;
        }

        /* Icon */
        .svc-icon {
          transition: transform .32s cubic-bezier(.16,1,.3,1), box-shadow .3s ease;
        }
        .svc-card:hover .svc-icon {
          transform: scale(1.15) rotate(-6deg);
          box-shadow: 0 12px 32px rgba(240,90,26,.4) !important;
        }

        /* Icon inner svg color on hover */
        .svc-card:hover .svc-icon svg,
        .svc-card:hover .svc-icon-inner { color: #fff !important; }

        /* Title color on hover */
        .svc-card:hover .svc-title { color: #FF8C5A !important; }

        /* Glow top-right */
        .svc-glow {
          position: absolute;
          top: -40px; right: -40px;
          width: 120px; height: 120px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(240,90,26,.15) 0%, transparent 70%);
          opacity: 0;
          transition: opacity .3s ease;
          pointer-events: none;
        }
        .svc-card:hover .svc-glow { opacity: 1; }
      `}</style>

      <section
        className="wwd-section !py-20 !px-4 sm:!px-6 lg:!px-8"
        style={{ background: 'linear-gradient(160deg,#0B1E4B 0%,#0d2258 50%,#0B1E4B 100%)' }}
      >
        <div className="!max-w-[1240px] !mx-auto">

          {/* ── Header ── */}
          <div className="!text-center !mb-14">
            <div
              className="inline-flex items-center !rounded-full !mb-5"
              style={{
                padding: '6px 20px',
                background: 'rgba(240,90,26,.15)',
                border: '1.5px solid rgba(240,90,26,.45)',
                fontSize: 11, fontWeight: 700,
                letterSpacing: '2.5px', textTransform: 'uppercase',
                color: '#FF8C5A',
              }}
            >
              Our Services
            </div>

            <h2
              className="!m-0 !mb-4"
              style={{
                fontFamily: "'Bebas Neue', cursive",
                fontSize: 'clamp(42px,7vw,72px)',
                letterSpacing: 4, lineHeight: 1, color: '#fff',
              }}
            >
              What We <span style={{ color: '#F05A1A' }}>Do</span>
            </h2>

            <div
              className="!mx-auto"
              style={{
                width: 56, height: 4, borderRadius: 2,
                background: 'linear-gradient(90deg,#F05A1A,#FF7D42)',
              }}
            />
          </div>

          {/* ── Grid ── */}
          <div className="!grid !grid-cols-1 sm:!grid-cols-2 lg:!grid-cols-4 !gap-5">
            {services.map((s) => (
              <div
                key={s.title}
                className="svc-card !flex !flex-col !items-center !text-center !rounded-2xl !p-7"
                style={{
                  background: 'rgba(255,255,255,.04)',
                  border: '1px solid rgba(255,255,255,.08)',
                  boxShadow: '0 2px 16px rgba(0,0,0,.18)',
                }}
              >
                {/* Glow */}
                <div className="svc-glow" />

                {/* Icon box */}
                <div
                  className="svc-icon !flex !items-center !justify-center !rounded-2xl !mb-6 !flex-shrink-0"
                  style={{
                    width: 72, height: 72,
                    background: 'linear-gradient(135deg,#1e2d5a,#2a3d70)',
                    boxShadow: '0 4px 16px rgba(0,0,0,.3)',
                  }}
                >
                  <span
                    className="svc-icon-inner"
                    style={{ color: '#F05A1A', fontSize: 28, display: 'flex', alignItems: 'center' }}
                  >
                    {s.icon}
                  </span>
                </div>

                {/* Title */}
                <h3
                  className="svc-title !mb-3 !mt-0"
                  style={{
                    fontSize: 15, fontWeight: 800,
                    color: '#fff', lineHeight: 1.3, letterSpacing: '0.2px',
                    transition: 'color .25s ease',
                  }}
                >
                  {s.title}
                </h3>

                {/* Desc */}
                <p
                  className="!m-0"
                  style={{ fontSize: 13, color: 'rgba(255,255,255,.52)', lineHeight: 1.75 }}
                >
                  {s.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  )
}

export default WhatWeDo