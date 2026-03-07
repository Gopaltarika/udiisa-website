import React from "react";
import { FaUsers, FaMedal } from "react-icons/fa";
import { MdGroups, MdVolunteerActivism, MdContactMail } from "react-icons/md";
import { IoFlash } from "react-icons/io5";

const HeroSection = () => {
  return (
    <section
      className="relative flex items-center justify-center overflow-hidden min-h-[85vh]"
      id="home"
    >
      {/* Background Image */}
      <img
        className="absolute inset-0 w-full h-full object-cover object-top"
        src="https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1920&q=85&fit=crop"
        alt="Sports"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[rgba(11,30,75,0.93)] via-[rgba(11,30,75,0.74)] to-[rgba(21,43,107,0.86)]" />

      {/* Grid dots bg */}
      <div className="hero-grid absolute inset-0" />

      {/* Glow circles */}
      <div className="absolute rounded-full pointer-events-none top-[18%] right-[12%] w-[260px] h-[260px] sm:w-[400px] sm:h-[400px] lg:w-[520px] lg:h-[520px] bg-[radial-gradient(circle,rgba(240,90,26,.14)_0%,transparent_70%)]" />
      <div className="absolute rounded-full pointer-events-none bottom-[8%] left-[6%] w-[160px] h-[160px] sm:w-[240px] sm:h-[240px] lg:w-[320px] lg:h-[320px] bg-[radial-gradient(circle,rgba(255,157,66,.10)_0%,transparent_70%)]" />

      {/* Content */}
      <div className="hero-anim relative z-10 text-center w-full !mx-auto flex flex-col items-center !px-[16px] sm:!px-[24px] !pt-[90px] sm:!pt-[100px] !pb-[48px] sm:!pb-[72px] lg:!pb-[80px] max-w-[920px]">

        {/* Badge */}
        <div className="inline-flex items-center !gap-[7px] rounded-full !px-[14px] sm:!px-[20px] !py-[7px] sm:!py-[8px] !mb-[20px] sm:!mb-[28px] bg-[rgba(240,90,26,.16)] border border-[rgba(240,90,26,.38)] text-[#FFAB7A] text-[10px] sm:text-[12px] font-extrabold tracking-[2px] uppercase">
          <IoFlash className="text-[12px] sm:text-[14px]" />
          India's Premier Sports NGO
        </div>

        {/* Heading */}
        <h1
          className="text-white !m-0 !mb-[16px] sm:!mb-[24px] leading-[0.95] tracking-[3px] sm:tracking-[4px]"
          style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "clamp(44px,9vw,100px)" }}
        >
          UNITED FOR{" "}
          <span style={{ color: "transparent", WebkitTextStroke: "2px #F05A1A" }}>
            DYNAMIC
          </span>
          <br />
          <span
            style={{
              background: "linear-gradient(90deg,#FF9D42 0%,#F05A1A 60%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            iNDIA
          </span>
        </h1>

        {/* Description */}
        <p
          className="!mx-auto !m-0 !mb-[28px] sm:!mb-[40px] lg:!mb-[44px] max-w-[340px] sm:max-w-[500px] lg:max-w-[600px]"
          style={{
            fontSize: "clamp(13px,2vw,18px)",
            color: "rgba(255,255,255,.62)",
            lineHeight: 1.75,
          }}
        >
      An Unleasing Dream Industry' where talented players in
          sports will achieve their goal at the level of National &amp;
          International.
        </p>

        {/* Shine animation styles */}
        <style>{`
          @keyframes shine-sweep {
            0%   { transform: translateX(-100%) skewX(-15deg); }
            100% { transform: translateX(250%) skewX(-15deg); }
          }
          .btn-shine { position: relative; overflow: hidden; }
          .btn-shine::after {
            content: '';
            position: absolute;
            top: 0; left: 0;
            width: 40%; height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent);
            transform: translateX(-100%) skewX(-15deg);
          }
          .btn-shine:hover::after {
            animation: shine-sweep 0.55s ease forwards;
          }
          .btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 12px 40px rgba(240,90,26,.60) !important;
          }
          .btn-secondary:hover {
            background: rgba(255,255,255,.12) !important;
            border-color: rgba(255,255,255,.55) !important;
            transform: translateY(-2px);
          }
          @media (max-width: 480px) {
            .hero-btns { flex-direction: column; align-items: stretch; }
            .hero-btns a { justify-content: center; }
          }
        `}</style>

        {/* CTA Buttons */}
        <div className="hero-btns flex justify-center flex-wrap !gap-[10px] sm:!gap-[14px] !mb-[36px] sm:!mb-[52px] lg:!mb-[64px] w-full sm:w-auto">
          <a
            href="/membership/individual-patron"
            className="btn-shine btn-primary flex items-center no-underline transition-all duration-[250ms] !gap-[8px] sm:!gap-[9px] !px-[22px] sm:!px-[34px] !py-[12px] sm:!py-[15px] rounded-[12px] sm:rounded-[14px] text-[13px] sm:text-[15px] font-extrabold text-white"
            style={{
              background: "linear-gradient(135deg,#F05A1A,#FF7D42)",
              boxShadow: "0 8px 32px rgba(240,90,26,.44)",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              textDecoration: "none",
            }}
          >
            <MdContactMail className="text-[18px] sm:text-[20px] flex-shrink-0" />
            Become a Member
          </a>

          <a
            href="/donate-now"
            className="btn-shine btn-secondary flex items-center no-underline transition-all duration-[250ms] !gap-[8px] sm:!gap-[9px] !px-[22px] sm:!px-[34px] !py-[12px] sm:!py-[15px] rounded-[12px] sm:rounded-[14px] text-[13px] sm:text-[15px] font-bold text-white border-[2px] border-[rgba(255,255,255,.32)] bg-[rgba(255,255,255,.06)] backdrop-blur-[8px]"
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              textDecoration: "none",
            }}
          >
            
            <MdVolunteerActivism className="text-[18px] sm:text-[20px] flex-shrink-0" />
            Donate Now
          </a>
        </div>

        {/* Stats Bar */}
        <div className="stats-bar flex justify-center items-center flex-wrap !mx-auto !px-[20px] sm:!px-[40px] lg:!px-[48px] !py-[18px] sm:!py-[22px] lg:!py-[26px] w-full max-w-[320px] sm:max-w-[480px] lg:max-w-[600px] bg-[rgba(255,255,255,.07)] backdrop-blur-[14px] border border-[rgba(255,255,255,.12)] rounded-[16px] sm:rounded-[22px]">
          {[
            { icon: <FaUsers />, num: "5,000+", lbl: "Athletes" },
            { icon: <MdGroups />, num: "28",     lbl: "States" },
            { icon: <FaMedal />, num: "200+",   lbl: "Medals Won" },
          ].map((s, i) => (
            <React.Fragment key={s.lbl}>
              <div className="text-center !px-[6px] sm:!px-[0px]">
                <div
                  className="flex justify-center !mb-[4px] sm:!mb-[6px] text-[#FF9D42]"
                  style={{ fontSize: "clamp(15px,3vw,20px)" }}
                >
                  {s.icon}
                </div>
                <div
                  className="text-white"
                  style={{
                    fontFamily: "'Bebas Neue', cursive",
                    fontSize: "clamp(26px,5vw,38px)",
                    letterSpacing: 2,
                  }}
                >
                  {s.num}
                </div>
                <div
                  className="font-semibold !mt-[3px] sm:!mt-[5px]"
                  style={{
                    fontSize: "clamp(9px,1.5vw,11px)",
                    color: "rgba(255,255,255,.48)",
                  }}
                >
                  {s.lbl}
                </div>
              </div>

              {i < 2 && (
                <div className="!mx-[14px] sm:!mx-[24px] lg:!mx-[32px] flex-shrink-0 w-[1px] h-[40px] sm:h-[48px] lg:h-[52px] bg-[rgba(255,255,255,.14)]" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;