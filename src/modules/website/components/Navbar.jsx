import { useState, useEffect } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { MdSportsCricket, MdEmojiEvents, MdGroups, MdVolunteerActivism, MdContactMail } from "react-icons/md";
import { FaTrophy, FaMedal, FaChevronDown } from "react-icons/fa";
import { IoFlash } from "react-icons/io5";

const navLinks = [
  { label: "Home", href: "#home" },
  {
    label: "About",
    href: "#about",
    dropdown: [
      { label: "Our Story", href: "#story", icon: <FaTrophy className="text-orange-500" /> },
      { label: "Mission & Vision", href: "#mission", icon: <IoFlash className="text-orange-500" /> },
      { label: "Our Team", href: "#team", icon: <MdGroups className="text-orange-500" /> },
    ],
  },
  { label: "Sports", href: "#sports", icon: <MdSportsCricket /> },
  {
    label: "Programs",
    href: "#programs",
    dropdown: [
      { label: "Talent Hunt", href: "#talent", icon: <FaMedal className="text-orange-500" /> },
      { label: "Training Camps", href: "#camps", icon: <MdSportsCricket className="text-orange-500" /> },
      { label: "Scholarships", href: "#scholarship", icon: <MdEmojiEvents className="text-orange-500" /> },
    ],
  },
  { label: "Membership", href: "#membership", icon: <MdVolunteerActivism /> },
  { label: "Contact", href: "#contact", icon: <MdContactMail /> },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("Home");
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileExpanded, setMobileExpanded] = useState(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const handleNavClick = (label) => {
    setActiveLink(label);
    setMenuOpen(false);
    setOpenDropdown(null);
    setMobileExpanded(null);
  };

  return (
    <>
      {/* ════════════ NAVBAR ════════════ */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-xl shadow-slate-900/10 border-b border-gray-100"
            : "bg-transparent"
        }`}
      >
        {/* Top orange accent line */}
        <div className="h-[3px] w-full bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-400" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">

            {/* ── LOGO ── */}
            <a
              href="#home"
              className="flex items-center gap-3 group"
              onClick={() => handleNavClick("Home")}
            >
              <div className="relative">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/40 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <FaTrophy className="text-white text-lg lg:text-xl" />
                </div>
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full border-2 border-white" />
              </div>
              <div className="leading-none">
                <p
                  className={`font-black text-xl lg:text-2xl tracking-widest transition-colors duration-300 ${
                    scrolled ? "text-[#0B1E4B]" : "text-white"
                  }`}
                  style={{ fontFamily: "'Bebas Neue', cursive" }}
                >
                  UDI <span className="text-orange-500">Sports</span>
                </p>
                <p
                  className={`text-[10px] font-bold tracking-[3px] uppercase transition-colors duration-300 ${
                    scrolled ? "text-gray-400" : "text-white/50"
                  }`}
                >
                  NGO India
                </p>
              </div>
            </a>

            {/* ── DESKTOP NAV LINKS ── */}
            <ul className="hidden lg:flex items-center gap-1 list-none">
              {navLinks.map((link) => (
                <li
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => link.dropdown && setOpenDropdown(link.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <a
                    href={link.href}
                    onClick={() => handleNavClick(link.label)}
                    className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                      activeLink === link.label
                        ? "bg-orange-500 text-white shadow-md shadow-orange-500/30"
                        : scrolled
                        ? "text-gray-700 hover:text-orange-600 hover:bg-orange-50"
                        : "text-white/90 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {link.label}
                    {link.dropdown && (
                      <FaChevronDown
                        className={`text-[10px] transition-transform duration-200 ${
                          openDropdown === link.label ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </a>

                  {/* ── Dropdown ── */}
                  {link.dropdown && (
                    <div
                      className={`absolute top-full left-0 mt-2 w-52 bg-white rounded-2xl shadow-2xl shadow-gray-900/15 border border-gray-100 py-2 transition-all duration-200 origin-top-left ${
                        openDropdown === link.label
                          ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
                          : "opacity-0 scale-95 -translate-y-1 pointer-events-none"
                      }`}
                    >
                      {/* Dropdown arrow tip */}
                      <span className="absolute -top-1.5 left-6 w-3 h-3 bg-white border-l border-t border-gray-100 rotate-45" />
                      {link.dropdown.map((item) => (
                        <a
                          key={item.label}
                          href={item.href}
                          onClick={() => handleNavClick(link.label)}
                          className="flex items-center gap-3 mx-1.5 px-3 py-2.5 text-sm text-gray-600 font-medium hover:bg-orange-50 hover:text-orange-600 rounded-xl transition-colors"
                        >
                          <span className="text-base">{item.icon}</span>
                          {item.label}
                        </a>
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ul>

            {/* ── DESKTOP CTA ── */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href="#login"
                className={`px-4 py-2 text-sm font-semibold rounded-xl transition-all duration-200 ${
                  scrolled ? "text-[#0B1E4B] hover:bg-gray-100" : "text-white/90 hover:bg-white/10"
                }`}
              >
                Login
              </a>
              <a
                href="#membership"
                onClick={() => handleNavClick("Membership")}
                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm font-bold rounded-xl shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:scale-105 active:scale-95 transition-all duration-200"
              >
                <MdVolunteerActivism className="text-base" />
                Join Now
              </a>
            </div>

            {/* ── MOBILE HAMBURGER ── */}
            <button
              className={`lg:hidden relative w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-200 hover:scale-105 ${
                scrolled ? "bg-gray-100 text-[#0B1E4B]" : "bg-white/10 text-white"
              }`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <span
                className={`absolute transition-all duration-300 ${
                  menuOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 rotate-90 scale-50"
                }`}
              >
                <HiX className="text-xl text-orange-500" />
              </span>
              <span
                className={`absolute transition-all duration-300 ${
                  menuOpen ? "opacity-0 -rotate-90 scale-50" : "opacity-100 rotate-0 scale-100"
                }`}
              >
                <HiMenu className="text-xl" />
              </span>
            </button>

          </div>
        </div>
      </nav>

      {/* ════════════ MOBILE OVERLAY ════════════ */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${
          menuOpen ? "visible" : "invisible"
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-[#0B1E4B]/80 backdrop-blur-sm transition-opacity duration-300 ${
            menuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setMenuOpen(false)}
        />

        {/* Slide Panel */}
        <div
          className={`absolute top-0 right-0 h-full w-[300px] bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Panel top accent */}
          <div className="h-[3px] bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-400" />

          {/* Panel Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center shadow-md shadow-orange-500/30">
                <FaTrophy className="text-white text-sm" />
              </div>
              <span
                className="font-black text-[#0B1E4B] text-lg tracking-widest"
                style={{ fontFamily: "'Bebas Neue', cursive" }}
              >
                UDI <span className="text-orange-500">Sports</span>
              </span>
            </div>
            <button
              onClick={() => setMenuOpen(false)}
              className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-red-100 hover:text-red-500 transition-colors"
            >
              <HiX className="text-base" />
            </button>
          </div>

          {/* Mobile Links */}
          <div className="flex-1 overflow-y-auto py-3 px-3 space-y-0.5">
            {navLinks.map((link) => (
              <div key={link.label}>
                {link.dropdown ? (
                  <>
                    <button
                      onClick={() =>
                        setMobileExpanded(mobileExpanded === link.label ? null : link.label)
                      }
                      className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-all"
                    >
                      <span>{link.label}</span>
                      <FaChevronDown
                        className={`text-xs text-gray-400 transition-transform duration-200 ${
                          mobileExpanded === link.label ? "rotate-180 text-orange-500" : ""
                        }`}
                      />
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        mobileExpanded === link.label ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="pl-3 pb-1 space-y-0.5">
                        {link.dropdown.map((item) => (
                          <a
                            key={item.label}
                            href={item.href}
                            onClick={() => handleNavClick(link.label)}
                            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-gray-600 hover:bg-orange-50 hover:text-orange-600 transition-colors font-medium"
                          >
                            <span className="text-base">{item.icon}</span>
                            {item.label}
                          </a>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <a
                    href={link.href}
                    onClick={() => handleNavClick(link.label)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                      activeLink === link.label
                        ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md shadow-orange-500/25"
                        : "text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                    }`}
                  >
                    {link.icon && (
                      <span
                        className={`text-base ${
                          activeLink === link.label ? "text-white" : "text-orange-500"
                        }`}
                      >
                        {link.icon}
                      </span>
                    )}
                    {link.label}
                  </a>
                )}
              </div>
            ))}
          </div>

          {/* Mobile CTA Footer */}
          <div className="px-4 py-5 border-t border-gray-100 space-y-3 bg-gray-50/50">
            <a
              href="#membership"
              onClick={() => handleNavClick("Membership")}
              className="flex items-center justify-center gap-2 w-full py-3.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-xl shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 active:scale-95 transition-all text-sm"
            >
              <MdVolunteerActivism className="text-lg" />
              Join Now — Become a Member
            </a>
            <a
              href="#login"
              className="flex items-center justify-center w-full py-2.5 border-2 border-gray-200 text-[#0B1E4B] font-semibold rounded-xl text-sm hover:border-orange-300 hover:bg-orange-50 transition-all"
            >
              Admin Login
            </a>
            {/* Social links */}
            <div className="flex items-center justify-center gap-2 pt-1">
              {["facebook", "instagram", "twitter", "youtube"].map((s) => (
                <a
                  key={s}
                  href={`#${s}`}
                  className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500 hover:bg-orange-100 hover:text-orange-600 transition-colors text-xs font-bold uppercase"
                >
                  {s[0].toUpperCase()}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ════════════ DEMO HERO SECTION (for preview) ════════════ */}
      <section
        id="home"
        className="min-h-screen flex items-center justify-center relative"
        style={{ background: "linear-gradient(135deg,#0B1E4B 0%,#152B6B 55%,#1a3560 100%)" }}
      >
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg,transparent,transparent 60px,rgba(255,255,255,1) 60px,rgba(255,255,255,1) 61px),repeating-linear-gradient(90deg,transparent,transparent 60px,rgba(255,255,255,1) 60px,rgba(255,255,255,1) 61px)",
          }}
        />
        {/* Glow blobs */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative text-center px-6 max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/20 border border-orange-500/30 rounded-full text-orange-300 text-sm font-semibold mb-6">
            <IoFlash className="text-orange-400" />
            India's Premier Sports NGO
          </div>

          {/* Headline */}
          <h1
            className="text-5xl md:text-7xl font-black text-white mb-6 leading-none tracking-wider"
            style={{ fontFamily: "'Bebas Neue', cursive" }}
          >
            UNLEASH THE{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-400 to-yellow-400">
              CHAMPION
            </span>{" "}
            WITHIN
          </h1>

          <p className="text-white/60 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
            UDI Sports NGO — Empowering India's talented athletes from grassroots to national glory
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <a
              href="#membership"
              className="flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-2xl shadow-2xl shadow-orange-500/40 hover:scale-105 active:scale-95 transition-transform text-lg"
            >
              <MdVolunteerActivism />
              Join Us Today
            </a>
            <a
              href="#about"
              className="flex items-center justify-center gap-2 px-8 py-4 border-2 border-white/20 text-white font-semibold rounded-2xl hover:bg-white/10 transition-colors text-lg"
            >
              Learn More
            </a>
          </div>

          {/* Stats row */}
          <div className="flex items-center justify-center gap-8 sm:gap-14">
            {[
              { num: "5K+", label: "Athletes" },
              { num: "28", label: "States" },
              { num: "200+", label: "Medals" },
            ].map((stat, i) => (
              <div key={i} className="flex items-center gap-8 sm:gap-14">
                {i > 0 && <div className="w-px h-10 bg-white/20" />}
                <div className="text-center">
                  <div
                    className="text-4xl font-black text-white"
                    style={{ fontFamily: "'Bebas Neue', cursive" }}
                  >
                    {stat.num}
                  </div>
                  <div className="text-white/50 text-sm mt-0.5">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Navbar;