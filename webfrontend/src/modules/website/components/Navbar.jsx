// Navbar.jsx — full Tailwind, no inline style

import { useState, useEffect, useRef } from "react"
import { useLocation } from "react-router-dom"
import { HiMenu, HiX, HiSparkles } from "react-icons/hi"
import { FaTrophy, FaChevronDown, FaUsers, FaArrowRight } from "react-icons/fa"
import { BsStarFill, BsDiamondFill, BsPersonFill, BsBuildingsFill } from "react-icons/bs"
import { GiLaurelsTrophy } from "react-icons/gi"
import { MdVolunteerActivism, MdContactMail, MdGroups } from "react-icons/md"
import { RiVipCrownFill } from "react-icons/ri"
import { getPublicCommittees } from "../../../shared/services/publicApi"

export default function Navbar() {
  const [menuOpen,            setMenuOpen]            = useState(false)
  const [membersDrop,         setMembersDrop]         = useState(false)
  const [specialDrop,         setSpecialDrop]         = useState(false)
  const [committeeDrop,       setCommitteeDrop]       = useState(false)
  const [mobileMembersDrop,   setMobileMembersDrop]   = useState(false)
  const [mobileSpecialDrop,   setMobileSpecialDrop]   = useState(false)
  const [mobileCommitteeDrop, setMobileCommitteeDrop] = useState(false)
  const [committees,          setCommittees]          = useState([])
  const [committeesLoaded,    setCommitteesLoaded]    = useState(false)
  const location = useLocation()

  const membersTimer   = useRef(null)
  const specialTimer   = useRef(null)
  const committeeTimer = useRef(null)

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [menuOpen])

  const loadCommittees = () => {
    if (committeesLoaded) return
    getPublicCommittees()
      .then((list) => {
        const items = Array.isArray(list) ? list : []
        setCommittees(items)
        setCommitteesLoaded(true)
      })
      .catch(() => {
        setCommittees([])
        setCommitteesLoaded(false)
      })
  }

  const closeAll = () => {
    setMenuOpen(false)
    setMobileMembersDrop(false)
    setMobileSpecialDrop(false)
    setMobileCommitteeDrop(false)
    setMembersDrop(false)
    setSpecialDrop(false)
    setCommitteeDrop(false)
  }

  const getActiveKey = (pathname) => {
    if (pathname === "/") return "Home"
    if (pathname.startsWith("/about-us")) return "About Us"
    if (pathname.startsWith("/members/special-members")) return "Special Member"
    if (pathname.startsWith("/members/")) return "Members"
    if (pathname.startsWith("/committee")) return "Committees"
    if (pathname.startsWith("/blogs")) return "Blogs"
    if (pathname.startsWith("/talented-players")) return "Talented Players"
    return ""
  }
  const activeKey = getActiveKey(location.pathname)

  const onMEnter = () => { clearTimeout(membersTimer.current);   setMembersDrop(true) }
  const onMLeave = () => { membersTimer.current   = setTimeout(() => setMembersDrop(false),   130) }
  const onSEnter = () => { clearTimeout(specialTimer.current);   setSpecialDrop(true) }
  const onSLeave = () => { specialTimer.current   = setTimeout(() => setSpecialDrop(false),   220) }
  const onCEnter = () => { clearTimeout(committeeTimer.current); loadCommittees(); setCommitteeDrop(true) }
  const onCLeave = () => { committeeTimer.current = setTimeout(() => setCommitteeDrop(false),  130) }

  // Members dropdown: General Member + Talented Players
  const memberItems = [
    { label: "General Member",   href: "/members/general-members",   icon: <FaUsers />,         desc: "Open for everyone"       },
    { label: "Talented Players", href: "/talented-players",          icon: <GiLaurelsTrophy />, desc: "Our star performers"     },
  ]

  // Special Member mega menu
  const specialItems = [
    {
      label: "Diamond Member",
      href: "/members/special-members/diamond",
      icon: <BsDiamondFill />,
      desc: "Our most prestigious patrons",
      color: "#2563eb",
      iconBg: "linear-gradient(135deg,#dbeafe,#93c5fd)",
      cardBg: "linear-gradient(160deg,#eff6ff 0%,#fff 70%)",
      border: "#bfdbfe",
    },
    {
      label: "Corporate Members",
      href: "/members/special-members/corporate",
      icon: <BsBuildingsFill />,
      desc: "Institutions backing UDIISA",
      color: "#059669",
      iconBg: "linear-gradient(135deg,#d1fae5,#6ee7b7)",
      cardBg: "linear-gradient(160deg,#ecfdf5 0%,#fff 70%)",
      border: "#a7f3d0",
    },
    {
      label: "Gold Member",
      href: "/members/special-members/gold",
      icon: <BsStarFill />,
      desc: "Top-tier sports patrons",
      color: "#d97706",
      iconBg: "linear-gradient(135deg,#fef3c7,#fbbf24)",
      cardBg: "linear-gradient(160deg,#fffbeb 0%,#fff 70%)",
      border: "#fde68a",
    },
    {
      label: "Silver Member",
      href: "/members/special-members/silver",
      icon: <BsStarFill />,
      desc: "Distinguished contributors",
      color: "#64748b",
      iconBg: "linear-gradient(135deg,#f1f5f9,#cbd5e1)",
      cardBg: "linear-gradient(160deg,#f8fafc 0%,#fff 70%)",
      border: "#e2e8f0",
    },
    {
      label: "Dignitaries",
      href: "/members/special-members/dignitaries",
      icon: <BsPersonFill />,
      desc: "Leaders & eminent guests",
      color: "#7c3aed",
      iconBg: "linear-gradient(135deg,#ede9fe,#c4b5fd)",
      cardBg: "linear-gradient(160deg,#f5f3ff 0%,#fff 70%)",
      border: "#ddd6fe",
    },
    {
      label: "Celebrity",
      href: "/members/special-members/celebrity",
      icon: <RiVipCrownFill />,
      desc: "Stars & public figures",
      color: "#db2777",
      iconBg: "linear-gradient(135deg,#fce7f3,#f9a8d4)",
      cardBg: "linear-gradient(160deg,#fdf2f8 0%,#fff 70%)",
      border: "#fbcfe8",
    },
  ]

  // Active link colour helper
  const linkCls = (label) =>
    `nl relative flex items-center gap-1.5 rounded-xl no-underline cursor-pointer border-0 bg-transparent transition-all duration-200 !px-[15px] !py-2 text-[14px] font-semibold font-[Plus_Jakarta_Sans] whitespace-nowrap hover:bg-[rgba(240,90,26,.06)] ${activeKey === label ? "on text-[#F05A1A]" : "text-slate-800"}`

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

        @keyframes megaIn {
          from { opacity:0; transform:translateX(-50%) translateY(8px) scale(.98); }
          to   { opacity:1; transform:translateX(-50%) translateY(0) scale(1); }
        }
        .mega-anim { animation: megaIn .22s cubic-bezier(.16,1,.3,1) both; }
        .mega-card { transition: transform .2s ease, box-shadow .2s ease, border-color .2s ease; }
        .mega-card:hover { transform: translateY(-3px); box-shadow: 0 12px 28px rgba(11,30,75,.10); }
      `}</style>

      {/* ══ NAVBAR ══ */}
      <nav className="sticky top-0 left-0 right-0 z-[100] bg-white/[.97] transition-all duration-300">
        <div className="accent" />

        <div className="flex items-center justify-between max-w-7xl mx-auto! !px-7 h-17.5">

          {/* LOGO */}
          <a href="/" className="no-underline" onClick={closeAll}>
            <img
              src="/Logo.webp"
              alt="UDIISA logo"
              className="max-h-12 w-auto"
              fetchPriority="high"
              decoding="async"
            />
          </a>

          {/* ── DESKTOP LINKS ── */}
          <div className="hidden lg:flex items-center gap-0.5">

            {/* Home */}
            <a href="/" className={linkCls("Home")} onClick={closeAll}>
              Home
            </a>

            {/* Members dropdown */}
            <div className="relative" onMouseEnter={onMEnter} onMouseLeave={onMLeave}>
              <button className={linkCls("Members")}>
                Community
                <FaChevronDown className={`text-[10px] transition-transform duration-200 ${membersDrop ? "rotate-180 text-[#F05A1A]" : "rotate-0"}`} />
              </button>

              {membersDrop && (
                <div
                  className="drop-anim absolute z-[200] bg-white rounded-[18px] !p-2 min-w-[240px] shadow-[0_24px_60px_rgba(11,30,75,.16),0_4px_16px_rgba(0,0,0,.06)] border border-[#eef2f8] top-[calc(100%+12px)] left-[150%] -translate-x-1/2"
                  onMouseEnter={onMEnter} onMouseLeave={onMLeave}
                >
                  <div className="absolute -top-[6px] left-1/2 -translate-x-1/2 rotate-45 w-3 h-3 bg-white border-l border-t border-[#eef2f8]" />
                  {memberItems.map(item => (
                    <a
                      key={item.label} href={item.href}
                      className="flex items-center gap-3 !px-3 !py-[11px] rounded-xl no-underline text-slate-600 transition-all duration-150 hover:bg-[#FFF3EC] hover:text-[#F05A1A]"
                      onClick={closeAll}
                    >
                      <div className="w-9 h-9 rounded-[10px] flex items-center justify-center shrink-0 bg-[#FFF3EC] text-[#F05A1A] text-[15px]">
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

            {/* Special Member mega menu */}
            <div className="relative" onMouseEnter={onSEnter} onMouseLeave={onSLeave}>
              <button className={linkCls("Special Member")} aria-expanded={specialDrop} aria-haspopup="true">
                Special Member
                <FaChevronDown className={`text-[10px] transition-transform duration-200 ${specialDrop ? "rotate-180 text-[#F05A1A]" : "rotate-0"}`} />
              </button>

              {specialDrop && (
                <div
                  className="mega-anim absolute z-[200] w-[min(92vw,560px)] bg-white rounded-[18px] overflow-hidden shadow-[0_24px_56px_rgba(11,30,75,.16),0_4px_16px_rgba(0,0,0,.06)] border border-[#eef2f8] top-[calc(100%+12px)] left-1/2"
                  onMouseEnter={onSEnter} onMouseLeave={onSLeave}
                >
                  <div className="absolute -top-[5px] left-1/2 -translate-x-1/2 rotate-45 w-2.5 h-2.5 bg-[#0B1E4B] border-l border-t border-[#0B1E4B]" />

                  <div className="relative overflow-hidden bg-gradient-to-r from-[#0B1E4B] via-[#152B6B] to-[#0B1E4B] !px-3.5 !py-3">
                    <div className="pointer-events-none absolute -right-6 -top-8 h-20 w-20 rounded-full bg-[#F05A1A]/20 blur-2xl" />
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-[1.4px] text-[#FFAD5C]">
                          <HiSparkles className="text-[12px]" /> Elite Circle
                        </div>
                        <div className="!mt-0.5 font-[Bebas_Neue] text-[20px] leading-none tracking-[0.8px] text-white">
                          Special Members
                        </div>
                        <p className="!mt-1 !mb-0 max-w-[280px] text-[11px] font-medium leading-snug text-white/65">
                          Patrons, institutions, dignitaries and celebrities who strengthen UDIISA.
                        </p>
                      </div>
                      <a
                        href="/members/special-members"
                        onClick={closeAll}
                        className="shrink-0 flex items-center gap-1.5 !px-2.5 !py-1.5 rounded-lg no-underline text-[11px] font-bold text-[#0B1E4B] bg-white hover:bg-[#FFF3EC] transition-colors"
                      >
                        View all <FaArrowRight className="text-[9px]" />
                      </a>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-1.5 !p-2.5">
                    {specialItems.map((item) => {
                      const isOn = location.pathname === item.href
                      return (
                        <a
                          key={item.label}
                          href={item.href}
                          onClick={closeAll}
                          className="mega-card group flex flex-col gap-1.5 !px-2.5 !py-2.5 rounded-[12px] no-underline border"
                          style={{
                            background: item.cardBg,
                            borderColor: isOn ? item.color : item.border,
                            boxShadow: isOn ? `0 6px 16px ${item.color}22` : "none",
                          }}
                        >
                          <div
                            className="w-8 h-8 rounded-[9px] flex items-center justify-center text-[13px] text-white shadow-sm"
                            style={{ background: item.iconBg, color: item.color }}
                          >
                            {item.icon}
                          </div>
                          <div>
                            <div className="text-[12px] font-extrabold text-[#0B1E4B] group-hover:text-[#F05A1A] transition-colors">
                              {item.label}
                            </div>
                            <div className="text-[10px] text-slate-500 !mt-0.5 leading-snug">
                              {item.desc}
                            </div>
                          </div>
                        </a>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Committee dropdown */}
            <div className="relative" onMouseEnter={onCEnter} onMouseLeave={onCLeave}>
              <button className={linkCls("All Committees")}>
                Committees
                <FaChevronDown className={`text-[10px] transition-transform duration-200 ${committeeDrop ? "rotate-180 text-[#F05A1A]" : "rotate-0"}`} />
              </button>

              {committeeDrop && (
                <div
                  className="drop-anim absolute z-[200] bg-white rounded-[18px] !p-2 min-w-[280px] max-h-[420px] overflow-y-auto shadow-[0_24px_60px_rgba(11,30,75,.16),0_4px_16px_rgba(0,0,0,.06)] border border-[#eef2f8] top-[calc(100%+12px)] left-[150%] -translate-x-1/2"
                  onMouseEnter={onCEnter} onMouseLeave={onCLeave}
                >
                  <div className="absolute -top-[6px] left-1/2 -translate-x-1/2 rotate-45 w-3 h-3 bg-white border-l border-t border-[#eef2f8]" />
                  <a
                    href="/committee"
                    className="flex items-center gap-3 !px-3 !py-2.5 rounded-xl no-underline text-[#0B1E4B] transition-all duration-150 hover:bg-[#EFF6FF] !mb-1 border-b border-slate-100"
                    onClick={closeAll}
                  >
                    <div className="w-8 h-8 rounded-[9px] flex items-center justify-center flex-shrink-0 bg-[#EFF6FF] text-[#0B1E4B]">
                      <MdGroups className="text-[17px]" />
                    </div>
                    <div>
                      <div className="text-[12px] font-bold">All Committees</div>
                      <div className="text-[10px] text-slate-400 !mt-0.5">View full overview</div>
                    </div>
                  </a>
                  {committees.map(c => (
                    <a
                      key={c.slug}
                      href={`/committee#${c.slug}`}
                      className="flex items-center gap-2.5 !px-3 !py-2 rounded-[10px] no-underline text-slate-600 text-[12px] font-semibold font-[Plus_Jakarta_Sans] transition-all duration-150 hover:bg-[#FFF3EC] hover:text-[#F05A1A]"
                      onClick={closeAll}
                    >
                      <span className="text-[17px] w-6 text-center">{c.icon}</span>
                      {c.shortLabel || c.label}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Blogs */}
            <a href="/blogs/" className={linkCls("Blogs")} onClick={closeAll}>
              Blogs
            </a>

            {/* About */}
            <a href="/about-us" className={linkCls("About Us")} onClick={closeAll}>
              About Us
            </a>
          </div>

          {/* ── CTA BUTTONS ── */}
          <div className="hidden lg:flex items-center gap-1.5">
            <a
              href="/membership/individual-patron"
              className="flex items-center gap-1.5 !px-[18px] !py-[9px] rounded-[10px] no-underline text-[13px] font-bold font-[Plus_Jakarta_Sans] whitespace-nowrap text-[#0B1E4B] bg-transparent border-0 transition-all duration-200 hover:bg-[#0B1E4B] hover:text-white"
              onClick={closeAll}
            >
              <MdVolunteerActivism className="text-[16px]" />
              Become a Member
            </a>
            <a
              href="/contact-us"
              className="flex items-center gap-1.5 !px-5 !py-2.5 rounded-[10px] no-underline text-[13px] font-bold font-[Plus_Jakarta_Sans] whitespace-nowrap text-white bg-gradient-to-br from-[#F05A1A] to-[#FF7D42] shadow-[0_4px_18px_rgba(240,90,26,.36)] transition-all duration-200 hover:shadow-[0_10px_28px_rgba(240,90,26,.50)] hover:-translate-y-0.5"
              onClick={closeAll}
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
              className={`flex items-center gap-2.5 !px-[15px] !py-[13px] rounded-xl no-underline text-[14px] font-semibold font-[Plus_Jakarta_Sans] transition-all duration-150 ${activeKey === "Home" ? "text-[#F05A1A] bg-[#FFF3EC]" : "text-slate-600 hover:bg-[#FFF3EC] hover:text-[#F05A1A]"}`}
              onClick={closeAll}
            >
              Home
            </a>

            {/* Members accordion */}
            <div>
              <button
                className={`flex items-center justify-between w-full !px-[15px] !py-[13px] rounded-xl text-[14px] font-semibold font-[Plus_Jakarta_Sans] border-0 cursor-pointer transition-all duration-150 ${activeKey === "Members" ? "text-[#F05A1A] bg-[#FFF3EC]" : "text-slate-600 bg-transparent hover:bg-[#FFF3EC] hover:text-[#F05A1A]"}`}
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
                      onClick={closeAll}
                    >
                      <span className="text-[#F05A1A] text-[14px]">{item.icon}</span>
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Special Member accordion */}
            <div>
              <button
                className={`flex items-center justify-between w-full !px-[15px] !py-[13px] rounded-xl text-[14px] font-semibold font-[Plus_Jakarta_Sans] border-0 cursor-pointer transition-all duration-150 ${activeKey === "Special Member" ? "text-[#F05A1A] bg-[#FFF3EC]" : "text-slate-600 bg-transparent hover:bg-[#FFF3EC] hover:text-[#F05A1A]"}`}
                onClick={() => setMobileSpecialDrop(p => !p)}
              >
                <span>Special Member</span>
                <FaChevronDown className={`text-[11px] transition-transform duration-200 ${mobileSpecialDrop ? "rotate-180 text-[#F05A1A]" : "text-slate-400"}`} />
              </button>
              <div className={`acc ${mobileSpecialDrop ? "open" : ""}`}>
                <div className="!pl-1.5 !pr-1 !pb-1 flex flex-col gap-1">
                  {specialItems.map(item => (
                    <a
                      key={item.label} href={item.href}
                      className="flex items-center gap-2.5 !px-2.5 !py-2.5 rounded-[12px] no-underline text-[13px] font-semibold font-[Plus_Jakarta_Sans] text-slate-700 transition-all duration-150"
                      style={{ background: item.cardBg, border: `1px solid ${item.border}` }}
                      onClick={closeAll}
                    >
                      <span
                        className="w-8 h-8 rounded-[9px] flex items-center justify-center text-[13px] shrink-0"
                        style={{ background: item.iconBg, color: item.color }}
                      >
                        {item.icon}
                      </span>
                      <span className="flex-1">{item.label}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Committee accordion */}
            <div>
              <button
                className={`flex items-center justify-between w-full !px-[15px] !py-[13px] rounded-xl text-[14px] font-semibold font-[Plus_Jakarta_Sans] border-0 cursor-pointer transition-all duration-150 ${activeKey === "All Committees" ? "text-[#F05A1A] bg-[#FFF3EC]" : "text-slate-600 bg-transparent hover:bg-[#FFF3EC] hover:text-[#F05A1A]"}`}
                onClick={() => { loadCommittees(); setMobileCommitteeDrop(p => !p) }}
              >
                <span>Committees</span>
                <FaChevronDown className={`text-[11px] transition-transform duration-200 ${mobileCommitteeDrop ? "rotate-180 text-[#F05A1A]" : "text-slate-400"}`} />
              </button>
              <div className={`acc ${mobileCommitteeDrop ? "open" : ""}`}>
                <div className="!pl-2.5">
                  <a
                    href="/committee"
                    className="flex items-center gap-2.5 !px-3 !py-2.5 rounded-[10px] no-underline text-[12px] font-bold text-[#0B1E4B] border-b border-slate-100 !mb-1 transition-all duration-150 hover:bg-[#EFF6FF]"
                    onClick={closeAll}
                  >
                    <MdGroups className="text-[16px]" /> All Committees
                  </a>
                  {committees.map(c => (
                    <a
                      key={c.slug}
                      href={`/committee#${c.slug}`}
                      className="flex items-center gap-2.5 !px-3 !py-2.5 rounded-[10px] no-underline text-[12px] font-semibold font-[Plus_Jakarta_Sans] text-slate-600 transition-all duration-150 hover:bg-[#FFF3EC] hover:text-[#F05A1A]"
                      onClick={closeAll}
                    >
                      <span className="text-[15px]">{c.icon}</span>
                      {c.shortLabel || c.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Blogs & About Us */}
            {[{ label: "Blogs", href: "/blogs/" }, { label: "About Us", href: "/about-us" }].map(item => (
              <a
                key={item.label} href={item.href}
                className={`flex items-center gap-2.5 !px-[15px] !py-[13px] rounded-xl no-underline text-[14px] font-semibold font-[Plus_Jakarta_Sans] transition-all duration-150 ${activeKey === item.label ? "text-[#F05A1A] bg-[#FFF3EC]" : "text-slate-600 hover:bg-[#FFF3EC] hover:text-[#F05A1A]"}`}
                onClick={closeAll}
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
              onClick={closeAll}
            >
              <MdVolunteerActivism className="text-[18px]" /> Become a Member
            </a>
            <a
              href="/contact-us"
              className="flex items-center justify-center gap-2 !p-[13px] rounded-xl no-underline text-[14px] font-bold font-[Plus_Jakarta_Sans] text-white bg-gradient-to-br from-[#F05A1A] to-[#FF7D42] shadow-[0_4px_16px_rgba(240,90,26,.35)]"
              onClick={closeAll}
            >
              <MdContactMail className="text-[18px]" /> Contact Us
            </a>
          </div>
        </div>
      </div>
    </>
  )
}