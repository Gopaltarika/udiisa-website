import React from 'react'
import { FaArrowRight } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import deepakgarg from "@/assets/images/deepak-garg.jpeg";
import manishgupta from "@/assets/images/manish-gupta.jpeg";
import sahiljindal from "@/assets/images/sahil-jindal.jpeg";
import ankurjain from "@/assets/images/ankur-jain.jpeg";
import shyamsunder from "@/assets/images/shyam-sunder.jpeg";

// ── Data (baad mein API se replace karein) ──
const members = [
  {
    id: 1,
    name: 'Mr. Deepak Garg',
    role: 'Chairman',
    roleColor: '#F05A1A',
    img: deepakgarg,
  },
  {
    id: 2,
    name: 'Mr. Manish Gupta',
    role: 'Vice Chairman',
    roleColor: '#F05A1A',
    img: manishgupta,
  },
  {
    id: 3,
    name: 'Mr. Sahil Jindal',
    role: 'Joint Secretary',
    roleColor: '#64748b',
    img: sahiljindal,
  },
  {
    id: 4,
    name: 'Mr. ankur jain',
    role: 'Secretary',
    roleColor: '#F05A1A',
    img: ankurjain,
  },
  {
    id: 5,
    name: 'Mr. Shyam Sunder Kocher',
    role: 'Treasurer',
    roleColor: '#64748b',
    img: shyamsunder,
  },
]

const ManagingCommittee = () => {
  const navigate = useNavigate()

  return (
    <>
      <style>{`

        /* Card */
        .mc-card {
          transition: transform .3s cubic-bezier(.16,1,.3,1), box-shadow .3s ease;
          cursor: default;
        }
        .mc-card:hover {
          transform: translateY(-8px) !important;
          box-shadow: 0 20px 48px rgba(11,30,75,.13) !important;
        }

        /* Photo wrapper */
        .mc-photo-wrap {
          transition: .3s ease;
          overflow: hidden;
          box-shadow: 0 8px 28px rgba(240,90,26,.22) !important;
        }
        .mc-card:hover .mc-photo-wrap {
          box-shadow: 0 8px 28px rgba(240,90,26,.22) !important;
        }

        /* Photo zoom */
        .mc-photo {
          transition: transform .4s cubic-bezier(.16,1,.3,1);
        }
        .mc-card:hover .mc-photo {
          transform: scale(1.07);
        }

        /* Orange underline on name */
        .mc-name-line {
          position: relative;
          display: inline-block;
        }
        .mc-name-line::after {
          content: '';
          position: absolute;
          bottom: -3px; left: 50%;
          transform: translateX(-50%);
          width: 0; height: 2px;
          background: linear-gradient(90deg,#F05A1A,#FF7D42);
          border-radius: 2px;
          transition: width .3s ease;
        }
        .mc-card:hover .mc-name-line::after { width: 100%; }

        /* View All button */
        .view-btn {
          position: relative;
          overflow: hidden;
          transition: all .28s cubic-bezier(.16,1,.3,1);
        }
        .view-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg,#1e40af,#2563EB);
          opacity: 0;
          transition: opacity .28s ease;
          z-index: 0;
        }
        .view-btn:hover::before { opacity: 1; }
        .view-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 32px rgba(37,99,235,.4) !important;
        }
        .view-btn span, .view-btn svg { position: relative; z-index: 1; }
        .view-btn:hover .btn-arrow { transform: translateX(4px); }
        .btn-arrow { transition: transform .25s ease; }
      `}</style>

      <section className="mc-section !bg-white !py-20 !px-4 sm:!px-6 lg:!px-8">
        <div className="!max-w-[1280px] !mx-auto">

          {/* ── Header ── */}
          <div className="!text-center !mb-12">
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
              Our Committee
            </div>
            <h2
              className="!m-0"
              style={{
                fontFamily: "'Bebas Neue', cursive",
                fontSize: 'clamp(36px,6vw,62px)',
                letterSpacing: 4,
                lineHeight: 1.05,
                color: '#0B1E4B',
              }}
            >
              Managing{' '}
              <span style={{ color: '#F05A1A' }}>Committee</span> of UDIISA
            </h2>
          </div>

          {/* ── Cards ── */}
          <div className="!grid !grid-cols-2 sm:!grid-cols-3 lg:!grid-cols-5 !gap-5 !mb-10">
            {members.slice(0, 5).map((m) => (
              <div
                key={m.id}
                className="mc-card !flex !flex-col !items-center !text-center !bg-white rounded-2xl !p-3 !shadow-[0_8px_12px_rgba(11,30,75,.07)]"
              >
                {/* Photo */}
                <div
                  className="mc-photo-wrap !rounded-2xl !w-full !mb-4"
                  style={{
                    aspectRatio: '3/3.5',
                    border: '1px solid #e8ecf4',
                    boxShadow: '0 4px 16px rgba(11,30,75,.07)',
                  }}
                >
                  <img
                    src={m.img}
                    alt={m.name}
                    className="mc-photo !w-full !h-full !object-cover !object-top !rounded-2xl"
                  />
                </div>

                {/* Name */}
                <h3
                  className="!mt-0 !mb-1"
                  style={{
                    fontSize: 'clamp(13px,1.4vw,15px)',
                    fontWeight: 700,
                    color: '#0B1E4B',
                    lineHeight: 1.3,
                  }}
                >
                  <span className="mc-name-line">{m.name}</span>
                </h3>

                {/* Role */}
                <p
                  className="!m-0"
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: m.roleColor,
                    letterSpacing: '0.3px',
                    textTransform: 'capitalize',
                  }}
                >
                  {m.role}
                </p>
              </div>
            ))}
          </div>

          {/* ── View All Button ── */}
          <div className="!flex !justify-center">
            <button
              className="view-btn !flex !items-center !gap-2.5 !rounded-xl !border-0 !cursor-pointer"
              style={{
                padding: '13px 32px',
                background: '#2563EB',
                fontSize: 14,
                fontWeight: 700,
                color: '#fff',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                boxShadow: '0 6px 20px rgba(37,99,235,.32)',
                letterSpacing: '0.3px',
              }}
              onClick={() => navigate('/members/managing-committee')}
            >
              <span>View all</span>
              <FaArrowRight className="btn-arrow" style={{ fontSize: 13 }} />
            </button>
          </div>

        </div>
      </section>
    </>
  )
}

export default ManagingCommittee