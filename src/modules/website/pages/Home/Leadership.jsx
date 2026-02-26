import React from 'react'
import { FaStar, FaUserCircle } from 'react-icons/fa'
import { FaQuoteLeft } from 'react-icons/fa6'
import satishjain from "@/assets/images/satishkumarjain.jpeg";
const Leadership = () => {
  return (
    <>
      <style>{`
        /* Gold card glow */
        @keyframes goldPulse {
          0%, 100% { box-shadow: 0 0 24px 4px rgba(234,179,8,.35), 0 0 60px 8px rgba(234,179,8,.12); }
          50%       { box-shadow: 0 0 36px 8px rgba(234,179,8,.55), 0 0 80px 16px rgba(234,179,8,.22); }
        }
        .gold-card { animation: goldPulse 3s ease-in-out infinite; }

        /* Butterfly float */
        @keyframes floatBf {
          0%,100% { transform: translate(0,0) rotate(-5deg); }
          50%      { transform: translate(5px,-8px) rotate(6deg); }
        }
        .butterfly { animation: floatBf 4s ease-in-out infinite; }

        /* Quote icon bounce */
        @keyframes quoteBounce {
          0%,100% { transform: translateY(0); }
          50%      { transform: translateY(-4px); }
        }
        .quote-icon { animation: quoteBounce 3s ease-in-out infinite; }

        /* Button shine */
        .achieve-btn {
          position: relative;
          overflow: hidden;
          transition: transform .25s, box-shadow .25s;
        }
        .achieve-btn::after {
          content: '';
          position: absolute;
          top: 0; left: -75%;
          width: 50%; height: 100%;
          background: linear-gradient(120deg, transparent, rgba(255,255,255,.3), transparent);
          transform: skewX(-20deg);
          transition: left .5s;
        }
        .achieve-btn:hover::after { left: 130%; }
        .achieve-btn:hover { transform: translateY(-2px); box-shadow: 0 12px 32px rgba(234,179,8,.45); }

        /* Corner brackets */
        .corner { position: absolute; width: 18px; height: 18px; border-color: #F59E0B; border-style: solid; }
        .corner-tl { top: 10px; left: 10px; border-width: 2px 0 0 2px; }
        .corner-tr { top: 10px; right: 10px; border-width: 2px 2px 0 0; }
        .corner-bl { bottom: 10px; left: 10px; border-width: 0 0 2px 2px; }
        .corner-br { bottom: 10px; right: 10px; border-width: 0 2px 2px 0; }
      `}</style>

      <section
        className="leadership-section !py-16 !px-4 sm:!px-6 lg:!px-8"
        style={{ background: "linear-gradient(135deg,#0B1E4B 0%,#0f2560 50%,#0B1E4B 100%)" }}
      >
        <div className="w-full max-w-[1280px] !m-[0_auto] !px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

            {/* ══ LEFT — Gold Leadership Card ══ */}
            <div className="flex-shrink-0 flex justify-center w-[34%] ">
              <div
                className="gold-card relative rounded-2xl overflow-hidden w-full max-w-[370px] h-[440px] border-2 border-[#F59E0B] bg-gradient-to-br from-[#1e3a6e] to-[#0B1E4B]"
              >
                {/* Corner brackets */}
                <div className="corner corner-tl" />
                <div className="corner corner-tr" />
                <div className="corner corner-bl" />
                <div className="corner corner-br" />

                {/* Leadership badge top */}
                <div
                  className="absolute top-0 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5 rounded-b-xl"
                  style={{
                    padding: "5px 14px",
                    background: "linear-gradient(90deg,#B45309,#F59E0B,#B45309)",
                    fontSize: 10,
                    fontWeight: 800,
                    letterSpacing: "2.5px",
                    color: "#fff",
                    textTransform: "uppercase",
                  }}
                >
                  <FaStar style={{ fontSize: 8 }} />
                  Leadership
                  <FaStar style={{ fontSize: 8 }} />
                </div>

                {/* Photo */}
                <img
                  src={satishjain}
                  alt="Satish Kumar Jain"
                  className="w-full h-full object-cover object-top"
                />

                {/* Bottom gradient overlay */}
                <div
                  className="absolute bottom-0 left-0 right-0"
                  style={{ height: "30%", background: "linear-gradient(to top,rgba(11,30,75,.85),transparent)" }}
                />
              </div>
            </div>

            {/* ══ RIGHT — Content ══ */}
            <div className="flex-1 w-[66%]">

              {/* "Our Leadership" pill */}
              <div
                className="inline-flex items-center rounded-full !mb-5"
                style={{
                  padding: "6px 18px",
                  background: "rgba(255,255,255,.08)",
                  border: "1px solid rgba(255,255,255,.14)",
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "2.5px",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,.7)",
                }}
              >
                Our Leadership
              </div>

              {/* Quote icon */}
              <div className="quote-icon !mb-3" style={{ color: "#F05A1A", fontSize: 28 }}>
                <FaQuoteLeft />
              </div>

              {/* Founder badge + butterfly row */}
              <div className="flex items-center gap-3 !mb-3 flex-wrap">
              </div>

              {/* Name */}
              <h2
                style={{
                  fontFamily: "'Bebas Neue', cursive",
                  fontSize: "clamp(32px, 5vw, 52px)",
                  letterSpacing: 3,
                  lineHeight: 1,
                  color: "#fff",
                  margin: "0 0 12px 0",
                }}
              >
                Mr.Satish Kumar Jain
              </h2>

              {/* Orange underline */}
              <div
                style={{
                  width: 52, height: 4, borderRadius: 2,
                  background: "linear-gradient(90deg,#F05A1A,#FF7D42)",
                  marginBottom: 22,
                }}
              />

              {/* Description */}
              <p
                className="!mb-8 w-full"
                style={{
                  fontSize: "clamp(14px, 1.5vw, 15.5px)",
                  color: "rgba(255,255,255,.7)",
                  lineHeight: 1.85,
                }}
              >
                Mr. Satish Kumar Jain, aged 76 years, is a prominent and proactive personality who transformed his vision into quality construction work by implementing the latest techniques in developing large-scale buildings into reality at project sites. He has instilled strong values of ethical leadership, responsible decision-making, and a culture of healthy governance. He firmly believes in the Karma theory of hard work and continues to apply his wisdom and vision in all his endeavors. A devoted follower of Jainism, he is deeply committed to nurturing excellence among talented and gifted sports players. He also dedicates his hard-earned resources to noble causes and charitable activities for the betterment of society.
              </p>
            </div>

          </div>
        </div>
      </section>
    </>
  )
}

export default Leadership