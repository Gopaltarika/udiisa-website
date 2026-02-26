import React from "react";
import { FaUsers, FaMedal } from "react-icons/fa";
import { MdGroups, MdVolunteerActivism, MdContactMail } from "react-icons/md";
import { IoFlash } from "react-icons/io5";

const HeroSection = () => {
  return (
    <section
      className="relative flex items-center justify-center overflow-hidden"
      style={{ minHeight: "100vh" }}
      id="home"
    >
      <img
        className="absolute inset-0 w-full h-full object-cover object-top"
        src="https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1920&q=85&fit=crop"
        alt="Sports"
      />
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(120deg,rgba(11,30,75,.93) 0%,rgba(11,30,75,.74) 55%,rgba(21,43,107,.86) 100%)" }}
      />
      <div className="hero-grid" />

      <div
        className="absolute rounded-full pointer-events-none"
        style={{ top: "18%", right: "12%", width: 520, height: 520, background: "radial-gradient(circle,rgba(240,90,26,.14) 0%,transparent 70%)" }}
      />
      <div
        className="absolute rounded-full pointer-events-none"
        style={{ bottom: "8%", left: "6%", width: 320, height: 320, background: "radial-gradient(circle,rgba(255,157,66,.10) 0%,transparent 70%)" }}
      />

      <div
        className="hero-anim relative z-10 text-center mx-auto flex align-center flex-col items-center"
        style={{ padding: "100px 24px 80px", maxWidth: 920 }}
      >
        <div
          className="inline-flex items-center gap-2 rounded-full"
          style={{
            padding: "8px 20px",
            marginBottom: 28,
            background: "rgba(240,90,26,.16)",
            border: "1px solid rgba(240,90,26,.38)",
            color: "#FFAB7A",
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          <IoFlash /> India's Premier Sports NGO
        </div>

        <h1
          className="text-white"
          style={{
            fontFamily: "'Bebas Neue',cursive",
            fontSize: "clamp(52px,9vw,100px)",
            letterSpacing: 4,
            lineHeight: .95,
            marginBottom: 24,
          }}
        >
          UNITED FOR{" "}
          <span style={{ color: "transparent", WebkitTextStroke: "3px #F05A1A" }}>
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

        <p
          className="mx-auto"
          style={{
            fontSize: "clamp(15px,2vw,18px)",
            color: "rgba(255,255,255,.62)",
            lineHeight: 1.75,
            maxWidth: 600,
            marginBottom: 44,
          }}
        >
         This is like an unleasing Dream industry' where talented players in sports will achieve their goal  at the level of National & International.
        </p>

       {/* CSS inject karo ek baar apne component ke top ya global styles mein */}
<style>{`
  @keyframes shine-sweep {
    0%   { transform: translateX(-100%) skewX(-15deg); }
    100% { transform: translateX(250%) skewX(-15deg); }
  }
  .btn-shine {
    position: relative;
    overflow: hidden;
  }
  .btn-shine::after {
    content: '';
    position: absolute;
    top: 0; left: 0;
    width: 40%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255,255,255,0.35),
      transparent
    );
    transform: translateX(-100%) skewX(-15deg);
    transition: none;
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
`}</style>

<div className="flex justify-center flex-wrap" style={{ gap: 14, marginBottom: 64 }}>
  <a    href="#become"
    className="btn-shine btn-primary flex items-center no-underline transition-all duration-[250ms]"
    style={{
      gap: 9,
      padding: "15px 34px",
      borderRadius: 14,
      fontSize: 15,
      fontWeight: 800,
      color: "#fff",
      background: "linear-gradient(135deg,#F05A1A,#FF7D42)",
      boxShadow: "0 8px 32px rgba(240,90,26,.44)",
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      textDecoration: "none",
    }}
  >
    <MdVolunteerActivism style={{ fontSize: 20 }} /> Become a Special Member
  </a>

  <a
    href="#contact"
    className="btn-shine btn-secondary flex items-center no-underline transition-all duration-[250ms]"
    style={{
      gap: 9,
      padding: "15px 34px",
      borderRadius: 14,
      fontSize: 15,
      fontWeight: 700,
      color: "#fff",
      border: "2px solid rgba(255,255,255,.32)",
      background: "rgba(255,255,255,.06)",
      backdropFilter: "blur(8px)",
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      textDecoration: "none",
    }}
  >
    <MdContactMail style={{ fontSize: 20 }} /> Contact Us
  </a>
</div>
        {/* Stats */}
        <div
          className="stats-bar flex justify-center items-center flex-wrap mx-auto"
          style={{
            background: "rgba(255,255,255,.07)",
            backdropFilter: "blur(14px)",
            border: "1px solid rgba(255,255,255,.12)",
            borderRadius: 22,
            padding: "26px 48px",
            maxWidth: 600,
          }}
        >
          {[
            { icon: <FaUsers />, num: "5,000+", lbl: "Athletes" },
            { icon: <MdGroups />, num: "28", lbl: "States" },
            { icon: <FaMedal />, num: "200+", lbl: "Medals Won" },
          ].map((s, i) => (
            <React.Fragment key={s.lbl}>
              <div className="text-center">
                <div className="flex justify-center" style={{ color: "#FF9D42", fontSize: 20, marginBottom: 6 }}>
                  {s.icon}
                </div>
                <div style={{ fontFamily: "'Bebas Neue',cursive", fontSize: 38, letterSpacing: 2, color: "#fff" }}>
                  {s.num}
                </div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,.48)", marginTop: 5, fontWeight: 600 }}>
                  {s.lbl}
                </div>
              </div>
              {i < 2 && (
                <div style={{ width: 1, height: 52, background: "rgba(255,255,255,.14)", margin: "0 32px" }} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;