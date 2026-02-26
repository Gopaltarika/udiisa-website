import React from 'react'
import { FaSearch, FaHandHoldingHeart, FaGraduationCap } from 'react-icons/fa'
import about1 from "./../../../../assets/images/about1.png";
import about2 from "./../../../../assets/images/about2.png";
import about3 from "./../../../../assets/images/about3.png";
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
  return (
    <>
      <style>{`

        /* image stack hover */
        .img-card { transition: transform .3s ease, box-shadow .3s ease; }
        .img-card:hover { transform: translateY(-4px); box-shadow: 0 20px 48px rgba(11,30,75,.16); }

        /* feature card hover */
        .feat-card { transition: all .25s ease; }
        .feat-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 36px rgba(240,90,26,.12);
          border-color: rgba(240,90,26,.3);
        }
        .feat-card:hover .feat-icon-wrap { background: linear-gradient(135deg,#F05A1A,#FF7D42); }
        .feat-card:hover .feat-icon-wrap svg { color: #fff; }

        /* review badge pop */
        @keyframes badgePop {
          0%,100% { transform: translateY(0); }
          50%      { transform: translateY(-6px); }
        }
        .review-badge { animation: badgePop 3.5s ease-in-out infinite; }

        /* butterfly float */
        @keyframes floatBf {
          0%,100% { transform: translate(0,0) rotate(-5deg); }
          50%      { transform: translate(6px,-10px) rotate(5deg); }
        }
        .butterfly { animation: floatBf 4s ease-in-out infinite; }

        /* underline accent */
        .title-underline {
          display: block;
          width: 52px; height: 4px; border-radius: 2px;
          background: linear-gradient(90deg,#F05A1A,#FF7D42);
          margin-top: 14px; margin-bottom: 22px;
        }
      `}</style>

      <section className="about-section bg-[#F7F9FD] !py-16 !px-4 sm:!px-6 lg:!px-8 overflow-hidden">
        <div className="w-full max-w-[1280px] !m-[0_auto] px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 ">

         {/* ══ LEFT — Image Stack (2 + 1 Layout) ══ */}
<div className="w-[50%] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 items-center">

  {/* LEFT COLUMN — 2 Images */}
  <div className="flex flex-col gap-6">

    {/* Top Image */}
    <div
      className="rounded-2xl overflow-hidden shadow-[0_8px_32px_rgba(11,30,75,.12)]"
      style={{ aspectRatio: "4/3" }}
    >
      <img
        src={about1}
        alt="Team collaboration"
        className="w-full h-full object-cover"
      />
    </div>

    {/* Bottom Image */}
    <div
      className="rounded-2xl overflow-hidden shadow-[0_8px_32px_rgba(11,30,75,.12)]"
      style={{ aspectRatio: "4/3" }}
    >
      <img
        src={about2}
        alt="Planning session"
        className="w-full h-full object-cover"
      />
    </div>
  </div>

  {/* RIGHT COLUMN — 1 Center Image */}
  <div className="relative flex justify-center h-full items-center">

    <div
      className="rounded-2xl overflow-hidden shadow-[0_8px_32px_rgba(11,30,75,.14)] w-[85%]"
      style={{ aspectRatio: "4/3" }}
    >
      <img
        src={about3}
        alt="Team high five"
        className="w-full h-full object-cover"
      />
    </div>

    {/* Review Badge */}
    <div
      className="absolute bottom-[10%] left-0 bg-white rounded-2xl shadow-[0_8px_32px_rgba(11,30,75,.14)] flex items-center gap-3"
      style={{ padding: "14px 20px", minWidth: 180 }}
    >
      <div
        className="flex items-center justify-center rounded-xl"
        style={{
          width: 44,
          height: 44,
          background: "linear-gradient(135deg,#F05A1A,#FF7D42)"
        }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
      </div>

      <div>
        <div style={{ fontSize: 11, color: "#94a3b8", fontWeight: 600 }}>
          User Review
        </div>
        <div style={{ fontSize: 22, fontWeight: 800, color: "#0B1E4B" }}>
          650.00+
        </div>
      </div>
    </div>

  </div>
</div>

            {/* ══ RIGHT — Content ══ */}
            <div className="flex-1 w-full">

              {/* Badge */}
              <div
                className="inline-flex items-center rounded-full border !mb-5"
                style={{
                  padding: "5px 16px",
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  color: "#F05A1A",
                  borderColor: "rgba(240,90,26,.35)",
                  background: "rgba(240,90,26,.06)",
                }}
              >
                About Us
              </div>

              {/* Heading */}
              <h2
                style={{
                  fontFamily: "'Bebas Neue', cursive",
                  fontSize: "clamp(34px, 5vw, 52px)",
                  letterSpacing: 2,
                  lineHeight: 1.05,
                  color: "#0B1E4B",
                  margin: 0,
                }}
              >Where Talent Meets                 <span style={{ color: "#F05A1A" }}>Opportunity</span> 
          
              </h2>

              {/* Underline accent */}
              <span className="title-underline" />

              {/* Description */}
              <p
                className="!mb-7"
                style={{
                  fontSize: "clamp(14px, 1.6vw, 15.5px)",
                  color: "#475569",
                  lineHeight: 1.6,
                  maxWidth: 520,
                }}
              >
         UDIISA works at the grassroots level to discover hidden sporting talent and provide structured support including coaching, mentorship, financial assistance, and academy placements. Our mission is to bridge the gap between talent and opportunity, ensuring that no athlete’s dream goes unnoticed or unsupported.
              </p>

              {/* Feature Cards */}
              <div className="flex flex-col gap-3">
                {features.map((f) => (
                  <div
                    key={f.title}
                    className="feat-card flex items-center gap-4 bg-white rounded-2xl border border-transparent cursor-default"
                    style={{
                      padding: "16px 20px",
                      boxShadow: "0 2px 12px rgba(11,30,75,.06)",
                    }}
                  >
                    {/* Icon */}
                    <div
                      className="feat-icon-wrap flex items-center justify-center flex-shrink-0 rounded-xl transition-all duration-300"
                      style={{
                        width: 44,
                        height: 44,
                        background: "rgba(240,90,26,.10)",
                      }}
                    >
                      <span style={{ color: "#F05A1A", fontSize: 18 }}>{f.icon}</span>
                    </div>

                    {/* Text */}
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: "#0B1E4B", marginBottom: 3 }}>
                        {f.title}
                      </div>
                      <div style={{ fontSize: 12.5, color: "#64748b", lineHeight: 1.5 }}>
                        {f.desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default AboutUs