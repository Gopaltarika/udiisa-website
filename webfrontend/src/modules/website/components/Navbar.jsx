// Navbar.jsx — full Tailwind, no inline style

import { useState, useEffect, useRef } from "react"
import { HiMenu, HiX } from "react-icons/hi"
import { FaTrophy, FaChevronDown, FaUsers } from "react-icons/fa"
import { BsStarFill } from "react-icons/bs"
import { MdVolunteerActivism, MdContactMail, MdGroups } from "react-icons/md"
import { committees } from "../pages/committee/committeeData"

export default function Navbar() {
  const [menuOpen,            setMenuOpen]            = useState(false)
  const [active,              setActive]              = useState("Home")
  const [membersDrop,         setMembersDrop]         = useState(false)
  const [committeeDrop,       setCommitteeDrop]       = useState(false)
  const [mobileMembersDrop,   setMobileMembersDrop]   = useState(false)
  const [mobileCommitteeDrop, setMobileCommitteeDrop] = useState(false)

  const membersTimer   = useRef(null)
  const committeeTimer = useRef(null)

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [menuOpen])

  const closeAll = (label) => {
    setActive(label)
    setMenuOpen(false)
    setMobileMembersDrop(false)
    setMobileCommitteeDrop(false)
    setMembersDrop(false)
    setCommitteeDrop(false)
  }

  const onMEnter = () => { clearTimeout(membersTimer.current);   setMembersDrop(true) }
  const onMLeave = () => { membersTimer.current   = setTimeout(() => setMembersDrop(false),   130) }
  const onCEnter = () => { clearTimeout(committeeTimer.current); setCommitteeDrop(true) }
  const onCLeave = () => { committeeTimer.current = setTimeout(() => setCommitteeDrop(false),  130) }

  const memberItems = [
    { label: "General Member", href: "/members/general-members", icon: <FaUsers />,    desc: "Open for everyone"   },
    { label: "Special Member", href: "/members/special-members", icon: <BsStarFill />, desc: "By invitation only" },
  ]

  // Active link colour helper
  const linkCls = (label) =>
    `nl relative flex items-center gap-1.5 rounded-xl no-underline cursor-pointer border-0 bg-transparent transition-all duration-200 !px-[15px] !py-2 text-[14px] font-semibold font-[Plus_Jakarta_Sans] whitespace-nowrap hover:bg-[rgba(240,90,26,.06)] ${active === label ? "on text-[#F05A1A]" : "text-slate-800"}`

  return (
    <>
      <style>{`
        @keyframes shim { 0%{background-position:0% 50%} 100%{background-position:200% 50%} }
        .accent {
          height: 3px;
          background: linear-gradient(90deg,#F05A1A,#FFAD5C,#F05A1A,#FFAD5C);
          background-size: 300% 100%;
          animation: shim 3s linear infinite;
        }
        @keyframes dpIn {
          from { opacity:0; transform:translateX(-50%) translateY(-10px) scale(.96); }
          to   { opacity:1; transform:translateX(-50%) translateY(0)      scale(1); }
        }
        .drop-anim { animation: dpIn .2s cubic-bezier(.16,1,.3,1) both; }

        .nl::after {
          content:''; position:absolute; bottom:4px; left:50%; transform:translateX(-50%);
          width:0; height:2px; background:#F05A1A; border-radius:2px; transition:width .25s;
        }
        .nl:hover::after, .nl.on::after { width: calc(100% - 22px); }

        .acc { overflow:hidden; max-height:0; transition:max-height .32s ease; }
        .acc.open { max-height:600px; }
      `}</style>

      {/* ══ NAVBAR ══ */}
      <nav className="sticky top-0 left-0 right-0 z-[100] bg-white/[.97] transition-all duration-300">
        <div className="accent" />

        <div className="flex items-center justify-between max-w-[1280px] !mx-auto !px-7 h-[70px]">

          {/* LOGO */}
          <a href="/" className="no-underline" onClick={() => closeAll("Home")}>
            <img src="/Logo.png" alt="logo" className="max-h-12 w-auto" />
          </a>

          {/* ── DESKTOP LINKS ── */}
          <div className="hidden lg:flex items-center gap-0.5">

            {/* Home */}
            <a href="/" className={linkCls("Home")} onClick={() => closeAll("Home")}>
              Home
            </a>

            {/* Members dropdown */}
            <div className="relative" onMouseEnter={onMEnter} onMouseLeave={onMLeave}>
              <button className={linkCls("Members")}>
                Members
                <FaChevronDown className={`text-[10px] transition-transform duration-200 ${membersDrop ? "rotate-180 text-[#F05A1A]" : "rotate-0"}`} />
              </button>

              {membersDrop && (
                <div
                  className="drop-anim absolute z-[200] bg-white rounded-[18px] !p-2 min-w-[240px] shadow-[0_24px_60px_rgba(11,30,75,.16),0_4px_16px_rgba(0,0,0,.06)] border border-[#eef2f8] top-[calc(100%+12px)] left-[150%] -translate-x-1/2"
                  onMouseEnter={onMEnter} onMouseLeave={onMLeave}
                >
                  {/* Arrow */}
                  <div className="absolute -top-[6px] left-1/2 -translate-x-1/2 rotate-45 w-3 h-3 bg-white border-l border-t border-[#eef2f8]" />

                  {memberItems.map(item => (
                    <a
                      key={item.label} href={item.href}
                      className="flex items-center gap-3 !px-3 !py-[11px] rounded-xl no-underline text-slate-600 transition-all duration-150 hover:bg-[#FFF3EC] hover:text-[#F05A1A]"
                      onClick={() => closeAll("Members")}
                    >
                      <div className="w-9 h-9 rounded-[10px] flex items-center justify-center flex-shrink-0 bg-[#FFF3EC] text-[#F05A1A] text-[15px]">
                        {item.icon}
                      </div>
                      <div>
                        <div className="text-[13px] font-bold">{item.label}</div>
                        <div className="text-[11px] text-slate-400 !mt-0.5">{item.desc}</div>
                      </div>
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Committee dropdown */}
            <div className="relative" onMouseEnter={onCEnter} onMouseLeave={onCLeave}>
              <button className={linkCls("Committee")}>
                Committee
                <FaChevronDown className={`text-[10px] transition-transform duration-200 ${committeeDrop ? "rotate-180 text-[#F05A1A]" : "rotate-0"}`} />
              </button>

              {committeeDrop && (
                <div
                  className="drop-anim absolute z-[200] bg-white rounded-[18px] !p-2 min-w-[280px] max-h-[420px] overflow-y-auto shadow-[0_24px_60px_rgba(11,30,75,.16),0_4px_16px_rgba(0,0,0,.06)] border border-[#eef2f8] top-[calc(100%+12px)] left-[150%] -translate-x-1/2"
                  onMouseEnter={onCEnter} onMouseLeave={onCLeave}
                >
                  <div className="absolute -top-[6px] left-1/2 -translate-x-1/2 rotate-45 w-3 h-3 bg-white border-l border-t border-[#eef2f8]" />

                  {/* All committees link */}
                  <a
                    href="/committee"
                    className="flex items-center gap-3 !px-3 !py-2.5 rounded-xl no-underline text-[#0B1E4B] transition-all duration-150 hover:bg-[#EFF6FF] !mb-1 border-b border-slate-100"
                    onClick={() => closeAll("Committee")}
                  >
                    <div className="w-8 h-8 rounded-[9px] flex items-center justify-center flex-shrink-0 bg-[#EFF6FF] text-[#0B1E4B]">
                      <MdGroups className="text-[17px]" />
                    </div>
                    <div>
                      <div className="text-[12px] font-bold">All Committees</div>
                      <div className="text-[10px] text-slate-400 !mt-0.5">View full overview</div>
                    </div>
                  </a>

                  {/* Each committee */}
                  {committees.map(c => (
                    <a
                      key={c.slug}
                      href={`/committee#${c.slug}`}
                      className="flex items-center gap-2.5 !px-3 !py-2 rounded-[10px] no-underline text-slate-600 text-[12px] font-semibold font-[Plus_Jakarta_Sans] transition-all duration-150 hover:bg-[#FFF3EC] hover:text-[#F05A1A]"
                      onClick={() => closeAll("Committee")}
                    >
                      <span className="text-[17px] w-6 text-center">{c.icon}</span>
                      {c.shortLabel}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Blogs */}
            <a href="/blogs/" className={linkCls("Blogs")} onClick={() => closeAll("Blogs")}>
              Blogs
            </a>

            {/* Talented Players */}
            <a href="/talented-players" className={linkCls("Talented Players")} onClick={() => closeAll("Talented Players")}>
              Talented Players
            </a>
          </div>

          {/* ── CTA BUTTONS ── */}
          <div className="hidden lg:flex items-center gap-1.5">
            <a
              href="/membership/individual-patron"
              className="flex items-center gap-1.5 !px-[18px] !py-[9px] rounded-[10px] no-underline text-[13px] font-bold font-[Plus_Jakarta_Sans] whitespace-nowrap text-[#0B1E4B] bg-transparent border-0 transition-all duration-200 hover:bg-[#0B1E4B] hover:text-white"
              onClick={() => closeAll("Become a Member")}
            >
              <MdVolunteerActivism className="text-[16px]" />
              Become a Member
            </a>

            <a
              href="/contact-us"
              className="flex items-center gap-1.5 !px-5 !py-2.5 rounded-[10px] no-underline text-[13px] font-bold font-[Plus_Jakarta_Sans] whitespace-nowrap text-white bg-gradient-to-br from-[#F05A1A] to-[#FF7D42] shadow-[0_4px_18px_rgba(240,90,26,.36)] transition-all duration-200 hover:shadow-[0_10px_28px_rgba(240,90,26,.50)] hover:-translate-y-0.5"
              onClick={() => closeAll("Contact")}
            >
              <MdContactMail className="text-[16px]" />
              Contact Us
            </a>
          </div>

          {/* HAMBURGER */}
          <button
            className="lg:hidden flex items-center justify-center w-[42px] h-[42px] rounded-[11px] border-0 cursor-pointer bg-slate-100 transition-all duration-200"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen
              ? <HiX className="text-[22px] text-[#F05A1A]" />
              : <HiMenu className="text-[22px] text-[#0B1E4B]" />
            }
          </button>
        </div>
      </nav>

      {/* ══ MOBILE OVERLAY ══ */}
      <div className={`fixed inset-0 z-[99] transition-all duration-300 ${menuOpen ? "visible opacity-100" : "invisible opacity-0"}`}>

        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-[rgba(11,30,75,.78)] backdrop-blur-[8px]"
          onClick={() => setMenuOpen(false)}
        />

        {/* Drawer */}
        <div className={`absolute top-0 right-0 bottom-0 flex flex-col bg-white w-[300px] shadow-[-10px_0_60px_rgba(0,0,0,.18)] transition-transform duration-300 ${menuOpen ? "translate-x-0" : "translate-x-full"}`}>
          <div className="accent" />

          {/* Mobile header */}
          <div className="flex items-center justify-between !px-5 !py-4 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-[9px] flex items-center justify-center bg-gradient-to-br from-[#F05A1A] to-[#FF7D42] shadow-[0_4px_14px_rgba(240,90,26,.35)]">
                <FaTrophy className="text-white text-[16px]" />
              </div>
              <span className="font-[Bebas_Neue] text-[20px] tracking-[2px] text-[#0B1E4B]">
                UDI <span className="text-[#F05A1A]">SPORTS</span>
              </span>
            </div>
            <button
              onClick={() => setMenuOpen(false)}
              className="w-8 h-8 rounded-lg border-0 cursor-pointer bg-slate-100 flex items-center justify-center"
            >
              <HiX className="text-[17px] text-slate-500" />
            </button>
          </div>

          {/* Links */}
          <div className="flex-1 overflow-y-auto !p-3">

            {/* Home */}
            <a
              href="/"
              className={`flex items-center gap-2.5 !px-[15px] !py-[13px] rounded-xl no-underline text-[14px] font-semibold font-[Plus_Jakarta_Sans] transition-all duration-150 ${active === "Home" ? "text-[#F05A1A] bg-[#FFF3EC]" : "text-slate-600 hover:bg-[#FFF3EC] hover:text-[#F05A1A]"}`}
              onClick={() => closeAll("Home")}
            >
              Home
            </a>

            {/* Members accordion */}
            <div>
              <button
                className={`flex items-center justify-between w-full !px-[15px] !py-[13px] rounded-xl text-[14px] font-semibold font-[Plus_Jakarta_Sans] border-0 cursor-pointer transition-all duration-150 ${active === "Members" ? "text-[#F05A1A] bg-[#FFF3EC]" : "text-slate-600 bg-transparent hover:bg-[#FFF3EC] hover:text-[#F05A1A]"}`}
                onClick={() => setMobileMembersDrop(p => !p)}
              >
                <span>Members</span>
                <FaChevronDown className={`text-[11px] transition-transform duration-200 ${mobileMembersDrop ? "rotate-180 text-[#F05A1A]" : "text-slate-400"}`} />
              </button>
              <div className={`acc ${mobileMembersDrop ? "open" : ""}`}>
                <div className="!pl-2.5">
                  {memberItems.map(item => (
                    <a
                      key={item.label} href={item.href}
                      className="flex items-center gap-2.5 !px-3 !py-3 rounded-[10px] no-underline text-[13px] font-semibold font-[Plus_Jakarta_Sans] text-slate-600 transition-all duration-150 hover:bg-[#FFF3EC] hover:text-[#F05A1A]"
                      onClick={() => closeAll("Members")}
                    >
                      <span className="text-[#F05A1A] text-[14px]">{item.icon}</span>
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Committee accordion */}
            <div>
              <button
                className={`flex items-center justify-between w-full !px-[15px] !py-[13px] rounded-xl text-[14px] font-semibold font-[Plus_Jakarta_Sans] border-0 cursor-pointer transition-all duration-150 ${active === "Committee" ? "text-[#F05A1A] bg-[#FFF3EC]" : "text-slate-600 bg-transparent hover:bg-[#FFF3EC] hover:text-[#F05A1A]"}`}
                onClick={() => setMobileCommitteeDrop(p => !p)}
              >
                <span>Committee</span>
                <FaChevronDown className={`text-[11px] transition-transform duration-200 ${mobileCommitteeDrop ? "rotate-180 text-[#F05A1A]" : "text-slate-400"}`} />
              </button>
              <div className={`acc ${mobileCommitteeDrop ? "open" : ""}`}>
                <div className="!pl-2.5">
                  <a
                    href="/committee"
                    className="flex items-center gap-2.5 !px-3 !py-2.5 rounded-[10px] no-underline text-[12px] font-bold text-[#0B1E4B] border-b border-slate-100 !mb-1 transition-all duration-150 hover:bg-[#EFF6FF]"
                    onClick={() => closeAll("Committee")}
                  >
                    <MdGroups className="text-[16px]" /> All Committees
                  </a>
                  {committees.map(c => (
                    <a
                      key={c.slug}
                      href={`/committee#${c.slug}`}
                      className="flex items-center gap-2.5 !px-3 !py-2.5 rounded-[10px] no-underline text-[12px] font-semibold font-[Plus_Jakarta_Sans] text-slate-600 transition-all duration-150 hover:bg-[#FFF3EC] hover:text-[#F05A1A]"
                      onClick={() => closeAll("Committee")}
                    >
                      <span className="text-[15px]">{c.icon}</span>
                      {c.shortLabel}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Blogs & Talented Players */}
            {[{ label: "Blogs", href: "/blogs/" }, { label: "Talented Players", href: "/talented-players" }].map(item => (
              <a
                key={item.label} href={item.href}
                className={`flex items-center gap-2.5 !px-[15px] !py-[13px] rounded-xl no-underline text-[14px] font-semibold font-[Plus_Jakarta_Sans] transition-all duration-150 ${active === item.label ? "text-[#F05A1A] bg-[#FFF3EC]" : "text-slate-600 hover:bg-[#FFF3EC] hover:text-[#F05A1A]"}`}
                onClick={() => closeAll(item.label)}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Mobile CTAs */}
          <div className="!p-4 border-t border-slate-100 flex flex-col gap-2.5">
            <a
              href="/membership/individual-patron"
              className="flex items-center justify-center gap-2 !p-[13px] rounded-xl no-underline text-[14px] font-bold font-[Plus_Jakarta_Sans] text-[#0B1E4B] border-2 border-[#0B1E4B] transition-all duration-200 hover:bg-[#0B1E4B] hover:text-white"
              onClick={() => closeAll("Become a Member")}
            >
              <MdVolunteerActivism className="text-[18px]" /> Become a Member
            </a>
            <a
              href="/contact-us"
              className="flex items-center justify-center gap-2 !p-[13px] rounded-xl no-underline text-[14px] font-bold font-[Plus_Jakarta_Sans] text-white bg-gradient-to-br from-[#F05A1A] to-[#FF7D42] shadow-[0_4px_16px_rgba(240,90,26,.35)]"
              onClick={() => closeAll("Contact")}
            >
              <MdContactMail className="text-[18px]" /> Contact Us
            </a>
          </div>
        </div>
      </div>
    </>
  )
}