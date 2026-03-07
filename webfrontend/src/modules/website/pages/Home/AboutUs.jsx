import React from 'react'
import { FaSearch, FaHandHoldingHeart, FaGraduationCap, FaArrowRight } from 'react-icons/fa'
import about1 from "@/assets/images/about1.png"
import about2 from "@/assets/images/about2.png"
import about3 from "@/assets/images/about3.png"
import { useNavigate } from 'react-router-dom'
import { BsStarFill } from 'react-icons/bs'

const features = [
  {
    icon: <FaSearch />,
    title: 'Talent Identification',
    desc: 'Grassroots scouting across 28 states to discover hidden gems.',
  },
  {
    icon: <FaHandHoldingHeart />,
    title: 'Holistic Support',
    desc: 'Financial, mental and technical support for selected athletes.',
  },
  {
    icon: <FaGraduationCap />,
    title: 'Academy Placements',
    desc: 'Direct placement in top sports academies nationwide.',
  },
]

const AboutUs = () => {
    const navigate = useNavigate();
  return (
    <>
      <style>{`
        /* image card hover */
        .img-card { transition: transform .3s ease, box-shadow .3s ease; }
        .img-card:hover { transform: translateY(-4px); box-shadow: 0 20px 48px rgba(11,30,75,.16); }

        /* feature card hover */
        .feat-card { transition: all .25s ease; }
        .feat-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 36px rgba(240,90,26,.12);
          border-color: rgba(240,90,26,.3) !important;
        }
        .feat-card:hover .feat-icon-wrap {
          background: linear-gradient(135deg,#F05A1A,#FF7D42) !important;
        }
        .feat-card:hover .feat-icon-wrap svg { color: #fff !important; }

        /* review badge float */
        @keyframes badgePop {
          0%,100% { transform: translateY(0); }
          50%      { transform: translateY(-6px); }
        }
        .review-badge { animation: badgePop 3.5s ease-in-out infinite; }

        /* underline accent */
        .title-underline {
          display: block;
          width: 52px; height: 4px; border-radius: 2px;
          background: linear-gradient(90deg,#F05A1A,#FF7D42);
        }

        /* aspect ratio fallback */
        .aspect-4-3 { aspect-ratio: 4/3; }
      `}</style>

      <section className="about-section bg-[#F7F9FD] !py-[48px] sm:!py-[64px] lg:!py-[80px] !px-[16px] sm:!px-[24px] lg:!px-[32px] overflow-hidden">
        <div className="w-full max-w-[1280px] !mx-auto">

          <div className="flex flex-col lg:flex-row items-center !gap-[36px] sm:!gap-[48px] lg:!gap-[64px]">

            {/* ══ LEFT — Image Stack ══ */}
            <div className="w-full sm:w-[80%] lg:w-[50%] !mx-auto lg:!mx-[0] grid grid-cols-2 !gap-[12px] sm:!gap-[16px] lg:!gap-[20px] items-center flex-shrink-0">

              {/* LEFT COLUMN — 2 stacked images */}
              <div className="flex flex-col !gap-[12px] sm:!gap-[16px] lg:!gap-[20px]">

                <div className="img-card rounded-[14px] sm:rounded-[18px] overflow-hidden shadow-[0_8px_32px_rgba(11,30,75,.12)] aspect-4-3">
                  <img
                    src={about1}
                    alt="Team collaboration"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="img-card rounded-[14px] sm:rounded-[18px] overflow-hidden shadow-[0_8px_32px_rgba(11,30,75,.12)] aspect-4-3">
                  <img
                    src={about2}
                    alt="Planning session"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* RIGHT COLUMN — 1 tall centered image + badge */}
              <div className="relative flex justify-center h-full items-center">

                <div className="img-card rounded-[14px] sm:rounded-[18px] overflow-hidden shadow-[0_8px_32px_rgba(11,30,75,.14)] w-[88%] aspect-4-3">
                  <img
                    src={about3}
                    alt="Team high five"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Review Badge */}
                <div className="review-badge absolute bottom-[8%] -left-[8px] sm:-left-[12px] bg-white rounded-[14px] sm:rounded-[18px] shadow-[0_8px_32px_rgba(11,30,75,.14)] flex items-center !gap-[8px] sm:!gap-[10px] !px-[10px] sm:!px-[16px] lg:!px-[20px] !py-[8px] sm:!py-[11px] lg:!py-[14px] min-w-[120px] sm:min-w-[160px] lg:min-w-[180px]">

                  {/* Heart icon box */}
                  <div className="flex items-center justify-center rounded-[10px] sm:rounded-[12px] flex-shrink-0 w-[32px] h-[32px] sm:w-[38px] sm:h-[38px] lg:w-[44px] lg:h-[44px] bg-gradient-to-br from-[#F05A1A] to-[#FF7D42]">
                    <svg
                      width="16" height="16"
                      className="sm:w-[18px] sm:h-[18px] lg:w-[22px] lg:h-[22px]"
                      viewBox="0 0 24 24" fill="white"
                    >
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                  </div>

                  <div>
                    <div className="text-slate-400 font-semibold text-[9px] sm:text-[10px] lg:text-[11px] leading-none !mb-[2px]">
                      User Review
                    </div>
                    <div className="text-[#0B1E4B] font-extrabold text-[16px] sm:text-[19px] lg:text-[22px] leading-none">
                      650+
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* ══ RIGHT — Content ══ */}
            <div className="flex-1 w-full">

              {/* Badge */}
              <div className="inline-flex items-center rounded-full border border-[rgba(240,90,26,.35)] bg-[rgba(240,90,26,.06)] text-[#F05A1A] !px-[14px] sm:!px-[16px] !py-[5px] sm:!py-[6px] text-[10px] sm:text-[11px] font-extrabold tracking-[2px] uppercase !mb-[14px] sm:!mb-[18px] lg:!mb-[20px]">
                About Us
              </div>

              {/* Heading */}
              <h2
                className="text-[#0B1E4B] !m-0 leading-[1.05] tracking-[2px]"
                style={{
                  fontFamily: "'Bebas Neue', cursive",
                  fontSize: "clamp(30px, 5vw, 52px)",
                }}
              >
                Where Talent Meets{' '}
                <span className="text-[#F05A1A]">Opportunity</span>
              </h2>

              {/* Underline accent */}
              <span className="title-underline !mt-[10px] sm:!mt-[14px] !mb-[16px] sm:!mb-[22px]" />

              {/* Description */}
              <p className="text-[#475569] !m-0 !mb-[20px] sm:!mb-[28px] lg:!mb-[28px] max-w-[520px] leading-[1.65] text-[clamp(13px,1.6vw,15.5px)]">
                UDIISA works at the grassroots level to discover hidden sporting
                talent and provide structured support including coaching, mentorship,
                financial assistance, and academy placements. Our mission is to
                bridge the gap between talent and opportunity, ensuring that no
                athlete's dream goes unnoticed or unsupported.
              </p>

              {/* Feature Cards */}
              <div className="flex flex-col !gap-[10px] sm:!gap-[12px] lg:!gap-[14px]">
                {features.map((f) => (
                  <div
                    key={f.title}
                    className="feat-card flex items-center !gap-[12px] sm:!gap-[14px] lg:!gap-[16px] bg-white rounded-[14px] sm:rounded-[18px] border border-transparent cursor-default shadow-[0_2px_12px_rgba(11,30,75,.06)] !px-[14px] sm:!px-[18px] lg:!px-[20px] !py-[12px] sm:!py-[14px] lg:!py-[16px]"
                  >
                    {/* Icon */}
                    <div className="feat-icon-wrap flex items-center justify-center flex-shrink-0 rounded-[10px] sm:rounded-[12px] transition-all duration-300 bg-[rgba(240,90,26,.10)] w-[36px] h-[36px] sm:w-[40px] sm:h-[40px] lg:w-[44px] lg:h-[44px]">
                      <span className="text-[#F05A1A] text-[15px] sm:text-[17px] lg:text-[18px]">
                        {f.icon}
                      </span>
                    </div>

                    {/* Text */}
                    <div>
                      <div className="text-[#0B1E4B] font-extrabold text-[13px] sm:text-[14px] !mb-[2px] sm:!mb-[3px]">
                        {f.title}
                      </div>
                      <div className="text-slate-500 text-[11.5px] sm:text-[12.5px] leading-[1.5]">
                        {f.desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
{/* ── VIEW ALL BUTTON ── */}
        <div className="mt-[18px] sm:mt-[28px] lg:mt-[30px]">
          <button className="sms-view-all" onClick={() => navigate('/about-us')}>
            <BsStarFill style={{ fontSize: 14 }} />
            View More
            <FaArrowRight className="arrow-icon" style={{ fontSize: 13 }} />
          </button>
        </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default AboutUs