import { useState, useEffect, useRef } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { FaTrophy, FaChevronDown, FaUsers, FaMedal } from "react-icons/fa";
import { BsStarFill } from "react-icons/bs";
import { MdVolunteerActivism, MdContactMail, MdGroups } from "react-icons/md";
import { IoFlash } from "react-icons/io5";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("Home");
  const [dropOpen, setDropOpen] = useState(false);
  const [mobileDropOpen, setMobileDropOpen] = useState(false);
  const hoverTimer = useRef(null);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const closeAll = (label) => {
    setActive(label);
    setMenuOpen(false);
    setMobileDropOpen(false);
    setDropOpen(false);
  };

  const onEnter = () => { clearTimeout(hoverTimer.current); setDropOpen(true); };
  const onLeave = () => { hoverTimer.current = setTimeout(() => setDropOpen(false), 130); };

  const dropItems = [
    { label: "General Member", href: "#general", icon: <FaUsers />, desc: "Open for everyone" },
    { label: "Special Member", href: "#special", icon: <BsStarFill />, desc: "By invitation only" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Plus Jakarta Sans', sans-serif; }

        @keyframes shim { 0%{background-position:0% 50%} 100%{background-position:200% 50%} }
        .accent {
          height: 3px;
          background: linear-gradient(90deg,#F05A1A,#FFAD5C,#F05A1A,#FFAD5C);
          background-size: 300% 100%;
          animation: shim 3s linear infinite;
        }

        @keyframes dpIn {
          from { opacity:0; transform:translateX(-50%) translateY(-10px) scale(.96); }
          to   { opacity:1; transform:translateX(-50%) translateY(0) scale(1); }
        }
        .drop-anim { animation: dpIn .2s cubic-bezier(.16,1,.3,1) both; }

        @keyframes hup {
          from { opacity:0; transform:translateY(40px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .hero-anim { animation: hup .9s cubic-bezier(.16,1,.3,1) both; }

        @keyframes sb {
          0%,100%{transform:translateY(0);opacity:1}
          60%{transform:translateY(10px);opacity:.2}
        }
        .scroll-dot { animation: sb 2s ease-in-out infinite; }

        .nl::after {
          content: '';
          position: absolute;
          bottom: 4px;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 2px;
          background: #F05A1A;
          border-radius: 2px;
          transition: width .25s;
        }
        .nl:hover::after, .nl.on::after { width: calc(100% - 22px); }

        .acc { overflow: hidden; max-height: 0; transition: max-height .32s ease; }
        .acc.open { max-height: 200px; }

        .hero-grid {
          position: absolute;
          inset: 0;
          background-image:
            repeating-linear-gradient(0deg,transparent,transparent 60px,rgba(255,255,255,.028) 60px,rgba(255,255,255,.028) 61px),
            repeating-linear-gradient(90deg,transparent,transparent 60px,rgba(255,255,255,.028) 60px,rgba(255,255,255,.028) 61px);
        }

        @media(max-width:1024px){
          .dlinks { display: none !important; }
          .ham { display: flex !important; }
        }
        @media(max-width:640px){
          .stats-bar { padding: 20px 24px !important; }
          .stat-div { margin: 0 20px !important; height: 40px !important; }
        }
      `}</style>

      {/* ══════════════ NAVBAR ══════════════ */}
      <nav
        className="fixed top-0 left-0 right-0 z-[100] bg-[rgba(255,255,255,.97)]"
        style={{
          transition: "background .4s, box-shadow .4s",
        }}
      >
        <div className="accent" />
        <div
          className="dlinks-wrapper flex items-center justify-between"
          style={{ maxWidth: 1280, margin: "0 auto", padding: "0 28px", height: 70 }}
        >

          {/* LOGO */}
          <a
            href="/"
            className="flex items-center gap-3 no-underline group"
            style={{ textDecoration: "none" }}
            onClick={() => closeAll("Home")}
          >
            <img src="./src/assets/images/Logo.png" alt="logo" className="w-full max-w-2/3" /></a>


          {/* DESKTOP LINKS */}
          <div className="dlinks flex items-center" style={{ gap: 2 }}>

            <a
              href="#home"
              className={`nl relative flex items-center gap-1.5 rounded-xl no-underline cursor-pointer border-0 bg-transparent transition-all duration-200 ${active === "Home" ? "on" : ""}`}
              style={{
                padding: "8px 15px", fontSize: 14, fontWeight: 600,
                fontFamily: "'Plus Jakarta Sans', sans-serif", whiteSpace: "nowrap",
                color: active === "Home"
                  ? "#F05A1A"
                  : "#1e293b"
              }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(240,90,26,.06)"}
              onMouseLeave={e => e.currentTarget.style.background = "transparent"}
              onClick={() => closeAll("Home")}
            >
              Home
            </a>

            {/* MEMBERS DROPDOWN */}
            <div className="relative" onMouseEnter={onEnter} onMouseLeave={onLeave}>
              <button
                className={`nl relative flex items-center gap-1.5 rounded-xl cursor-pointer border-0 bg-transparent transition-all duration-200 ${active === "Members" ? "on" : ""}`}
                style={{
                  padding: "8px 15px", fontSize: 14, fontWeight: 600,
                  fontFamily: "'Plus Jakarta Sans', sans-serif", whiteSpace: "nowrap",
                  color: active === "Blogs"
                    ? "#F05A1A"
                    : "#1e293b"
                }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(240,90,26,.06)"}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}
              >
                Members
                <FaChevronDown style={{
                  fontSize: 10, transition: "transform .25s",
                  transform: dropOpen ? "rotate(180deg)" : "rotate(0)",
                  color: dropOpen ? "#F05A1A" : "inherit",
                }} />
              </button>

              {dropOpen && (
                <div
                  className="drop-anim absolute z-[200] bg-white rounded-[18px]"
                  style={{
                    top: "calc(100% + 12px)", left: "50%",
                    transform: "translateX(-50%)",
                    padding: 8, minWidth: 240,
                    boxShadow: "0 24px 60px rgba(11,30,75,.16), 0 4px 16px rgba(0,0,0,.06)",
                    border: "1px solid #eef2f8",
                  }}
                  onMouseEnter={onEnter}
                  onMouseLeave={onLeave}
                >
                  <div style={{
                    position: "absolute", top: -6, left: "50%",
                    transform: "translateX(-50%) rotate(45deg)",
                    width: 12, height: 12, background: "#fff",
                    borderLeft: "1px solid #eef2f8", borderTop: "1px solid #eef2f8",
                  }} />
                  {dropItems.map(item => (
                    <a
                      key={item.label}
                      href={item.href}
                      className="flex items-center gap-3 rounded-xl no-underline transition-all duration-150 group/di"
                      style={{ padding: "11px 12px", color: "#374151", textDecoration: "none" }}
                      onMouseEnter={e => { e.currentTarget.style.background = "#FFF3EC"; e.currentTarget.style.color = "#F05A1A"; }}
                      onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#374151"; }}
                      onClick={() => closeAll("Members")}
                    >
                      <div
                        className="flex-shrink-0 flex items-center justify-center rounded-[10px] transition-colors duration-150"
                        style={{ width: 36, height: 36, background: "#FFF3EC", color: "#F05A1A", fontSize: 15 }}
                      >
                        {item.icon}
                      </div>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 700 }}>{item.label}</div>
                        <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 1 }}>{item.desc}</div>
                      </div>
                    </a>
                  ))}
                </div>
              )}
            </div>

            <a
              href="#blogs"
              className={`nl relative flex items-center gap-1.5 rounded-xl no-underline cursor-pointer border-0 bg-transparent transition-all duration-200 ${active === "Blogs" ? "on" : ""}`}
              style={{
                padding: "8px 15px", fontSize: 14, fontWeight: 600,
                fontFamily: "'Plus Jakarta Sans', sans-serif", whiteSpace: "nowrap",
                color: active === "Blogs"
                  ? "#F05A1A"
                  : "#1e293b"
              }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(240,90,26,.06)"}
              onMouseLeave={e => e.currentTarget.style.background = "transparent"}
              onClick={() => closeAll("Blogs")}
            >
              Blogs
            </a>

            <a
              href="#players"
              className={` relative flex items-center gap-1.5 rounded-xl no-underline cursor-pointer border-0 bg-transparent transition-all duration-200 ${active === "Talented Players" ? "on" : ""}`}
              style={{
                padding: "8px 15px", fontSize: 14, fontWeight: 600,
                fontFamily: "'Plus Jakarta Sans', sans-serif", whiteSpace: "nowrap",
                color: active === "Talented Players"
                  ? "#F05A1A"
                  : "#1e293b"
              }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(240,90,26,.06)"}
              onMouseLeave={e => e.currentTarget.style.background = "transparent"}
              onClick={() => closeAll("Talented Players")}
            >
              Talented Players
            </a>


          </div>
          <div className="dlinks flex items-center" style={{ gap: 2 }}>
            {/* BECOME A MEMBER */}
            <a
              href="#become"
              className="flex items-center gap-1.5 rounded-[10px] no-underline cursor-pointer transition-all duration-[250ms]"
              style={{
                padding: "9px 18px", fontSize: 13, fontWeight: 700,
                fontFamily: "'Plus Jakarta Sans', sans-serif", whiteSpace: "nowrap",
                marginLeft: 6,
                color: "#0B1E4B",
                background: "transparent",
                textDecoration: "none",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = "#0B1E4B";
                e.currentTarget.style.color = "#fff";
                e.currentTarget.style.borderColor = "#0B1E4B";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "#0B1E4B";
                e.currentTarget.style.borderColor = "#0B1E4B";
              }}
              onClick={() => closeAll("Become a Member")}
            >
              <MdVolunteerActivism style={{ fontSize: 16 }} />
              Become a Special Member
            </a>

            {/* CONTACT US */}
            <a
              href="#contact"
              className="flex items-center gap-1.5 rounded-[10px] no-underline cursor-pointer transition-all duration-[250ms] hover:-translate-y-0.5"
              style={{
                padding: "10px 20px", fontSize: 13, fontWeight: 700,
                fontFamily: "'Plus Jakarta Sans', sans-serif", whiteSpace: "nowrap",
                color: "#fff",
                background: "linear-gradient(135deg,#F05A1A,#FF7D42)",
                boxShadow: "0 4px 18px rgba(240,90,26,.36)",
                textDecoration: "none",
              }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = "0 10px 28px rgba(240,90,26,.50)"}
              onMouseLeave={e => e.currentTarget.style.boxShadow = "0 4px 18px rgba(240,90,26,.36)"}
              onClick={() => closeAll("Contact")}
            >
              <MdContactMail style={{ fontSize: 16 }} />
              Contact Us
            </a>
          </div>
          {/* HAMBURGER */}
          <button
            className="ham hidden items-center justify-center rounded-[11px] border-0 cursor-pointer transition-all duration-200"
            style={{
              width: 42, height: 42,
              background: "#F3F4F6"
            }}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen
              ? <HiX style={{ fontSize: 22, color: "#F05A1A" }} />
              : <HiMenu style={{ fontSize: 22, color: "#0B1E4B" }} />
            }
          </button>
        </div>
      </nav>

      {/* ══════════════ MOBILE MENU ══════════════ */}
      <div
        className="fixed inset-0 z-[99] transition-all duration-300"
        style={{ visibility: menuOpen ? "visible" : "hidden", opacity: menuOpen ? 1 : 0 }}
      >
        <div
          className="absolute inset-0"
          style={{ background: "rgba(11,30,75,.78)", backdropFilter: "blur(8px)" }}
          onClick={() => setMenuOpen(false)}
        />
        <div
          className="absolute top-0 right-0 bottom-0 flex flex-col bg-white"
          style={{
            width: 300,
            boxShadow: "-10px 0 60px rgba(0,0,0,.18)",
            transform: menuOpen ? "translateX(0)" : "translateX(100%)",
            transition: "transform .32s cubic-bezier(.4,0,.2,1)",
          }}
        >
          <div className="accent" />

          <div className="flex items-center justify-between" style={{ padding: "16px 20px", borderBottom: "1px solid #F1F5F9" }}>
            <div className="flex items-center" style={{ gap: 10 }}>
              <div
                className="flex items-center justify-center rounded-[9px]"
                style={{ width: 36, height: 36, background: "linear-gradient(135deg,#F05A1A,#FF7D42)", boxShadow: "0 4px 14px rgba(240,90,26,.35)" }}
              >
                <FaTrophy style={{ color: "#fff", fontSize: 16 }} />
              </div>
              <span style={{ fontFamily: "'Bebas Neue',cursive", fontSize: 20, letterSpacing: 2, color: "#0B1E4B" }}>
                UDI <span style={{ color: "#F05A1A" }}>SPORTS</span>
              </span>
            </div>
            <button
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-center rounded-lg border-0 cursor-pointer"
              style={{ width: 32, height: 32, background: "#F3F4F6" }}
            >
              <HiX style={{ fontSize: 17, color: "#6B7280" }} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto" style={{ padding: 12 }}>
            <a
              href="#home"
              className={`flex items-center w-full rounded-xl no-underline border-0 cursor-pointer transition-all duration-150 ${active === "Home" ? "is-active" : ""}`}
              style={{
                gap: 10, padding: "13px 15px", fontSize: 14, fontWeight: 600,
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                color: active === "Home" ? "#F05A1A" : "#374151",
                background: active === "Home" ? "#FFF3EC" : "transparent",
                textDecoration: "none",
              }}
              onMouseEnter={e => { if (active !== "Home") { e.currentTarget.style.background = "#FFF3EC"; e.currentTarget.style.color = "#F05A1A"; } }}
              onMouseLeave={e => { if (active !== "Home") { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#374151"; } }}
              onClick={() => closeAll("Home")}
            >
              Home
            </a>

            <div>
              <button
                className="flex items-center justify-between w-full rounded-xl border-0 cursor-pointer transition-all duration-150"
                style={{
                  gap: 10, padding: "13px 15px", fontSize: 14, fontWeight: 600,
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  color: active === "Members" ? "#F05A1A" : "#374151",
                  background: active === "Members" ? "#FFF3EC" : "transparent",
                }}
                onMouseEnter={e => { e.currentTarget.style.background = "#FFF3EC"; e.currentTarget.style.color = "#F05A1A"; }}
                onMouseLeave={e => { e.currentTarget.style.background = active === "Members" ? "#FFF3EC" : "transparent"; e.currentTarget.style.color = active === "Members" ? "#F05A1A" : "#374151"; }}
                onClick={() => setMobileDropOpen(p => !p)}
              >
                <span>Members</span>
                <FaChevronDown style={{
                  fontSize: 11, color: mobileDropOpen ? "#F05A1A" : "#94a3b8",
                  transition: "transform .25s",
                  transform: mobileDropOpen ? "rotate(180deg)" : "rotate(0)",
                }} />
              </button>
              <div className={`acc ${mobileDropOpen ? "open" : ""}`}>
                <div style={{ paddingLeft: 10 }}>
                  {dropItems.map(item => (
                    <a
                      key={item.label}
                      href={item.href}
                      className="flex items-center rounded-xl no-underline transition-all duration-150"
                      style={{
                        gap: 10, padding: "13px 12px", fontSize: 13, fontWeight: 600,
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        color: "#374151", textDecoration: "none",
                      }}
                      onMouseEnter={e => { e.currentTarget.style.background = "#FFF3EC"; e.currentTarget.style.color = "#F05A1A"; }}
                      onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#374151"; }}
                      onClick={() => closeAll("Members")}
                    >
                      <span style={{ color: "#F05A1A", fontSize: 14 }}>{item.icon}</span>
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {["Blogs", "Talented Players"].map((label) => (
              <a
                key={label}
                href={`#${label.toLowerCase().replace(" ", "-")}`}
                className="flex items-center w-full rounded-xl no-underline border-0 cursor-pointer transition-all duration-150"
                style={{
                  gap: 10, padding: "13px 15px", fontSize: 14, fontWeight: 600,
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  color: active === label ? "#F05A1A" : "#374151",
                  background: active === label ? "#FFF3EC" : "transparent",
                  textDecoration: "none",
                }}
                onMouseEnter={e => { if (active !== label) { e.currentTarget.style.background = "#FFF3EC"; e.currentTarget.style.color = "#F05A1A"; } }}
                onMouseLeave={e => { if (active !== label) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#374151"; } }}
                onClick={() => closeAll(label)}
              >
                {label}
              </a>
            ))}
          </div>

          <div className="flex flex-col" style={{ padding: 16, borderTop: "1px solid #F1F5F9", gap: 10 }}>
            <a
              href="#become"
              className="flex items-center justify-center rounded-xl no-underline transition-all duration-200"
              style={{
                gap: 8, padding: 13, fontSize: 14, fontWeight: 700,
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                color: "#0B1E4B", border: "2px solid #0B1E4B",
                textDecoration: "none",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "#0B1E4B"; e.currentTarget.style.color = "#fff"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#0B1E4B"; }}
              onClick={() => closeAll("Become a Member")}
            >
              <MdVolunteerActivism style={{ fontSize: 18 }} /> Become a Special Member
            </a>
            <a
              href="#contact"
              className="flex items-center justify-center rounded-xl no-underline"
              style={{
                gap: 8, padding: 13, fontSize: 14, fontWeight: 700,
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                color: "#fff",
                background: "linear-gradient(135deg,#F05A1A,#FF7D42)",
                boxShadow: "0 4px 16px rgba(240,90,26,.35)",
                textDecoration: "none",
              }}
              onClick={() => closeAll("Contact")}
            >
              <MdContactMail style={{ fontSize: 18 }} /> Contact Us
            </a>
          </div>
        </div>
      </div>
    </>
  );
}