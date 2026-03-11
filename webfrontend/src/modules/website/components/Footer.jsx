import React from 'react'
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaLinkedinIn, FaMapMarkerAlt, FaPhone, FaEnvelope, FaChevronRight } from 'react-icons/fa'
import { VscInfo } from "react-icons/vsc";

const quickLinks = [
  { label: 'Home',            href: '/' },
  { label: 'Members',         href: '/members/special-members' },
  { label: 'Blogs',           href: '/blogs/' },
  { label: 'Players',         href: '/talented-players' },
  { label: 'Contact',         href: '/contact-us' },
  { label: 'Become a member', href: '/membership/individual-patron' },
]

const programs = [
  { label: 'Managing Committee', href: '/committee#managing-community' },
  { label: 'About us',           href: '/about-us' },
  { label: 'Terms & Conditions', href: '/terms-and-conditions' },
]

const contactInfo = [
  { icon: <FaMapMarkerAlt />, value: '5091, 6th Floor, Tower 5, Parker Residency, Tehsil Rai, District Sonepat, Haryana' },
  { icon: <FaPhone />,        value: '+91 83075 98050' },
  { icon: <FaEnvelope />,     value: 'info@udisports.in' },
]

const socials = [
  { icon: <FaFacebookF />,  href: '#' },
  { icon: <FaTwitter />,    href: '#' },
  { icon: <FaInstagram />,  href: 'https://www.instagram.com/udisports.in/' },
  { icon: <FaYoutube />,    href: '#' },
  { icon: <FaLinkedinIn />, href: '#' },
]

const developers = [
  {
    name: 'Gopal',
    role: 'Full Stack Developer',
    linkedin: 'https://www.linkedin.com/in/gopal-tarika-b3a156326/',
    initials: 'G',
    color: '#0A66C2',
  },
  {
    name: 'Aryan',
    role: 'Frontend Developer',
    linkedin: ' https://www.linkedin.com/in/aryansaini870/',
    initials: 'A',
    color: '#0A66C2',
  },
]

const Footer = () => {
  return (
    <>
      <style>{`
        .f-link {
          transition: color .2s ease, transform .2s ease;
          cursor: pointer;
          display: flex; align-items: center; gap: 6px;
          text-decoration: none;
        }
        .f-link:hover { color: #F05A1A !important; transform: translateX(4px); }
        .f-link:hover .f-chevron { color: #F05A1A !important; }

        .soc-btn { transition: all .25s cubic-bezier(.16,1,.3,1); cursor: pointer; }
        .soc-btn:hover {
          background: linear-gradient(135deg,#F05A1A,#FF7D42) !important;
          border-color: transparent !important; color: #fff !important;
          transform: translateY(-3px) scale(1.1);
          box-shadow: 0 8px 20px rgba(240,90,26,.4) !important;
        }

        .c-item { transition: transform .2s ease; }
        .c-item:hover { transform: translateX(4px); }
        .c-item:hover .c-icon { color: #FF7D42 !important; }

        @keyframes shim {
          0%   { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        .footer-shimmer {
          height: 3px;
          background: linear-gradient(90deg,#F05A1A,#FFAD5C,#F05A1A,#FFAD5C);
          background-size: 300% 100%;
          animation: shim 3s linear infinite;
        }

        @media (max-width: 639px) {
          .footer-links-row {
            display: grid !important;
            grid-template-columns: 1fr 1fr !important;
            gap: 20px !important;
          }
        }

        /* ── Developer card hover ── */
        .dev-card {
          transition: all .35s cubic-bezier(.16,1,.3,1);
          text-decoration: none !important;
          position: relative;
          overflow: hidden;
          cursor: pointer;
        }
        /* shimmer sweep */
        .dev-card::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.06) 50%, transparent 70%);
          transform: translateX(-100%);
          transition: transform .5s ease;
          border-radius: inherit;
          pointer-events: none;
        }
        .dev-card:hover::after {
          transform: translateX(100%);
        }
        /* glow border on hover */
        .dev-card:hover {
          transform: translateY(-4px) scale(1.03);
          border-color: rgba(240,90,26,.55) !important;
          box-shadow:
            0 12px 32px rgba(240,90,26,.2),
            0 0 0 1px rgba(240,90,26,.25),
            inset 0 1px 0 rgba(255,255,255,.08) !important;
          background: linear-gradient(135deg, rgba(240,90,26,.12), rgba(255,125,66,.06)) !important;
        }
        .dev-card:hover .dev-name {
          color: #fff !important;
        }
        .dev-card:hover .dev-role {
          color: #FFAD5C !important;
        }
        .dev-card:hover .dev-avatar {
          transform: scale(1.1) rotate(-4deg);
          box-shadow: 0 6px 18px rgba(240,90,26,.4) !important;
          border-color: #F05A1A !important;
        }
        .dev-card:hover .dev-li-icon {
          background: linear-gradient(135deg, #0A66C2, #0077B5) !important;
          transform: scale(1.15) rotate(5deg);
          box-shadow: 0 4px 14px rgba(10,102,194,.55) !important;
          color: #fff !important;
        }
        .dev-avatar {
          transition: all .35s cubic-bezier(.16,1,.3,1);
          border: 1.5px solid rgba(255,255,255,.15);
        }
        .dev-li-icon {
          transition: all .35s cubic-bezier(.16,1,.3,1);
        }

        /* Pulse dot */
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: .6; transform: scale(1.5); }
        }
        .pulse-dot { animation: pulse-dot 2s ease-in-out infinite; }

        /* Credits separator shimmer */
        .credits-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(240,90,26,.4), rgba(255,173,92,.4), rgba(240,90,26,.4), transparent);
          background-size: 200% 100%;
          animation: shim 4s linear infinite;
        }

        /* dev section label */
        @keyframes float-label {
          0%,100% { opacity: .35; }
          50%      { opacity: .6; }
        }
        .dev-label { animation: float-label 3s ease infinite; }
      `}</style>

      <footer style={{ background: 'linear-gradient(160deg,#0B1E4B 0%,#0d2258 50%,#0B1E4B 100%)' }}>

        <div className="footer-shimmer" />

        <div className="!max-w-[1280px] !mx-auto" style={{ padding: '40px 16px 36px' }}>
          <div className="!grid !grid-cols-1 sm:!grid-cols-2 lg:!grid-cols-4 !gap-[28px] sm:!gap-[32px] lg:!gap-[40px]">

            {/* Col 1 — Brand */}
            <div className="sm:col-span-2 lg:!col-span-1">
              <a href="/" className="flex items-center gap-3 no-underline" style={{ textDecoration: 'none' }}>
                <img src="/white-logo.png" alt="logo" className="w-full max-w-[180px] sm:max-w-[200px]" />
              </a>
              <p className="!mt-[12px] !mb-[16px]" style={{ fontSize: 12.5, color: 'rgba(255,255,255,.55)', lineHeight: 1.75, maxWidth: 280 }}>
                A non-profit organization dedicated to identifying, nurturing and empowering talented athletes across India. Building champions, changing lives.
              </p>
              <div className="!flex !items-center !gap-[8px] !flex-wrap">
                {socials.map((s, i) => (
                  <a key={i} href={s.href} target="_blank" rel="noreferrer"
                    className="soc-btn !flex !items-center !justify-center !rounded-xl !no-underline"
                    style={{ width: 34, height: 34, background: 'rgba(255,255,255,.08)', border: '1px solid rgba(255,255,255,.12)', color: 'rgba(255,255,255,.7)', fontSize: 13 }}>
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Col 2+3 — Quick Links + Info */}
            <div className="footer-links-row sm:!contents">
              <div>
                <h4 className="!mt-0 !mb-[12px] sm:!mb-[16px]" style={{ fontSize: 10.5, fontWeight: 800, letterSpacing: '2.5px', textTransform: 'uppercase', color: '#fff' }}>
                  Quick Links
                </h4>
                <ul className="!m-0 !p-0 !list-none !flex !flex-col !gap-[9px] sm:!gap-[11px]">
                  {quickLinks.map((link) => (
                    <li key={link.label}>
                      <a href={link.href} className="f-link" style={{ fontSize: 12.5, color: 'rgba(255,255,255,.55)', fontWeight: 500 }}>
                        <FaChevronRight className="f-chevron" style={{ fontSize: 8, color: '#F05A1A', flexShrink: 0 }} />
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="!mt-0 !mb-[12px] sm:!mb-[16px]" style={{ fontSize: 10.5, fontWeight: 800, letterSpacing: '2.5px', textTransform: 'uppercase', color: '#fff' }}>
                  Info
                </h4>
                <ul className="!m-0 !p-0 !list-none !flex !flex-col !gap-[9px] sm:!gap-[11px]">
                  {programs.map((link) => (
                    <li key={link.label}>
                      <a href={link.href} className="f-link" style={{ fontSize: 12.5, color: 'rgba(255,255,255,.55)', fontWeight: 500 }}>
                        <FaChevronRight className="f-chevron" style={{ fontSize: 8, color: '#F05A1A', flexShrink: 0 }} />
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Col 4 — Contact Info */}
            <div>
              <h4 className="!mt-0 !mb-[12px] sm:!mb-[16px]" style={{ fontSize: 10.5, fontWeight: 800, letterSpacing: '2.5px', textTransform: 'uppercase', color: '#fff' }}>
                Contact Info
              </h4>
              <div className="!flex !flex-col !gap-[12px] sm:!gap-[14px]">
                {contactInfo.map((item, i) => (
                  <div key={i} className="c-item !flex !items-start !gap-[10px]">
                    <span className="c-icon !flex-shrink-0 !mt-[2px]" style={{ color: '#F05A1A', fontSize: 13, transition: 'color .2s ease' }}>
                      {item.icon}
                    </span>
                    <span style={{ fontSize: 12.5, color: 'rgba(255,255,255,.55)', lineHeight: 1.6 }}>
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* ── Credits Divider ── */}
        <div className="credits-divider" />

        {/* ── Designed & Developed By ── */}
        <div style={{ background: 'rgba(0,0,0,.2)', padding: '14px 16px' }}>
          <div className="!max-w-[1200px] !mx-auto !flex !items-center !justify-center !gap-[8px] !flex-wrap">
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,.3)', letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: 600 }}>
              Designed &amp; Developed by
            </span>
            {developers.map((dev, i) => (
              <React.Fragment key={dev.name}>
                <a
                  href={dev.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="dev-card !flex !items-center !gap-[5px]"
                  style={{
                    padding: '3px 10px 3px 6px',
                    border: '1px solid rgba(255,255,255,.1)',
                    borderRadius: 999,
                    background: 'rgba(255,255,255,.04)',
                    textDecoration: 'none',
                  }}
                >
                  <div
                    className="dev-li-icon !flex !items-center !justify-center !flex-shrink-0"
                    style={{
                      width: 18, height: 18, borderRadius: '50%',
                      background: 'rgba(10,102,194,.3)',
                      color: 'rgba(10,102,194,.9)',
                      fontSize: 10,
                    }}
                  >
                    <FaLinkedinIn />
                  </div>
                  <span className="dev-name" style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,.6)', transition: 'color .3s', whiteSpace: 'nowrap' }}>
                    {dev.name}
                  </span>
                </a>
                {i < developers.length - 1 && (
                  <span style={{ color: 'rgba(240,90,26,.4)', fontSize: 12 }}>&amp;</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* ── Copyright Bar ── */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,.06)' }}>
          <div
            className="!max-w-[1200px] !mx-auto !flex !items-center !justify-between !flex-wrap !gap-[8px]"
            style={{ padding: '12px 16px' }}
          >
            <p className="!m-0" style={{ fontSize: 11.5, color: 'rgba(255,255,255,.3)', fontWeight: 400 }}>
              © {new Date().getFullYear()} UDIISA NGO. All rights reserved.
            </p>
            <p className="!m-0" style={{ fontSize: 11, color: 'rgba(255,255,255,.2)' }}>
              CIN No. U94990HR2026NPL141182
            </p>
          </div>
        </div>

      </footer>
    </>
  )
}

export default Footer