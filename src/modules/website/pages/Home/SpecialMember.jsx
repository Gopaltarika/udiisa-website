import { useState, useEffect, useRef, useCallback } from "react";
import { BsStarFill } from "react-icons/bs";
import { FaChevronLeft, FaChevronRight, FaArrowRight, FaLinkedin } from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import { HiSparkles } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

const MEMBERS = [
  {
    id: 1,
    name: "Vikram Singh",
    company: "Singh Motors Pvt. Ltd.",
    role: "Chairman & Founder",
    photo: "https://i.pravatar.cc/300?img=12",
    tag: "Platinum Patron",
  },
  {
    id: 2,
    name: "Kavitha Nair",
    company: "Nair Foundation",
    role: "Managing Director",
    photo: "https://i.pravatar.cc/300?img=25",
    tag: "Gold Patron",
  },
  {
    id: 3,
    name: "Rajat Mehta",
    company: "TechSports India",
    role: "CEO & Co-Founder",
    photo: "https://i.pravatar.cc/300?img=52",
    tag: "Platinum Patron",
  },
  {
    id: 4,
    name: "Priya Anand",
    company: "Anand Enterprises",
    role: "Executive Director",
    photo: "https://i.pravatar.cc/300?img=44",
    tag: "Gold Patron",
  },
  {
    id: 5,
    name: "Arjun Kapoor",
    company: "Kapoor Industries",
    role: "President",
    photo: "https://i.pravatar.cc/300?img=33",
    tag: "Platinum Patron",
  },
  {
    id: 6,
    name: "Sunita Reddy",
    company: "Reddy Corp.",
    role: "Vice President",
    photo: "https://i.pravatar.cc/300?img=47",
    tag: "Gold Patron",
  },
  {
    id: 7,
    name: "Rohit Sharma",
    company: "Sharma Holdings",
    role: "Director",
    photo: "https://i.pravatar.cc/300?img=60",
    tag: "Silver Patron",
  },
];

const TAG_STYLES = {
  "Platinum Patron": { bg: "#f0f4ff", color: "#3b5bdb", dot: "#4c6ef5" },
  "Gold Patron":     { bg: "#fff8e1", color: "#e67700", dot: "#f59f00" },
  "Silver Patron":   { bg: "#f4f4f5", color: "#52525b", dot: "#a1a1aa" },
};

function MemberCard({ member, isCenter }) {
  const tag = TAG_STYLES[member.tag] || TAG_STYLES["Silver Patron"];

  return (
    <div
      style={{
        background: isCenter
          ? "linear-gradient(165deg, #0B1E4B 0%, #152B6B 60%, #1a3560 100%)"
          : "#fff",
        borderRadius: 24,
        padding: isCenter ? "32px 24px 28px" : "28px 22px 24px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 0,
        transition: "all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
        transform: isCenter ? "scale(1.06)" : "scale(0.95)",
        opacity: isCenter ? 1 : 0.72,
        boxShadow: isCenter
          ? "0 32px 80px rgba(11,30,75,0.28), 0 8px 32px rgba(240,90,26,0.15)"
          : "0 8px 32px rgba(11,30,75,0.08)",
        border: isCenter
          ? "1.5px solid rgba(240,90,26,0.3)"
          : "1.5px solid #f1f5f9",
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
        minWidth: 0,
        height: "100%",
      }}
    >
      {/* Decorative BG for center card */}
      {isCenter && (
        <>
          <div style={{
            position: "absolute", top: -60, right: -60,
            width: 200, height: 200, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(240,90,26,0.18) 0%, transparent 70%)",
            pointerEvents: "none",
          }} />
          <div style={{
            position: "absolute", bottom: -40, left: -40,
            width: 150, height: 150, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255,173,92,0.12) 0%, transparent 70%)",
            pointerEvents: "none",
          }} />
        </>
      )}

      {/* TAG */}
      <div style={{
        display: "flex", alignItems: "center", gap: 5,
        padding: "4px 12px", borderRadius: 999,
        background: isCenter ? "rgba(255,255,255,0.1)" : tag.bg,
        color: isCenter ? "#FFAD5C" : tag.color,
        fontSize: 10, fontWeight: 800, letterSpacing: "1.5px",
        textTransform: "uppercase", marginBottom: 20,
        border: isCenter ? "1px solid rgba(255,173,92,0.35)" : "none",
        alignSelf: "center",
        position: "relative", zIndex: 1,
      }}>
        <div style={{ width: 5, height: 5, borderRadius: "50%", background: isCenter ? "#FFAD5C" : tag.dot }} />
        {member.tag}
      </div>

      {/* PHOTO */}
      <div style={{
        position: "relative", marginBottom: 20, zIndex: 1,
      }}>
        {/* Ring */}
        <div style={{
          width: isCenter ? 104 : 88,
          height: isCenter ? 104 : 88,
          borderRadius: "50%",
          padding: 3,
          background: isCenter
            ? "linear-gradient(135deg, #F05A1A, #FFAD5C, #F05A1A)"
            : "linear-gradient(135deg, #e2e8f0, #cbd5e1)",
          transition: "all 0.4s",
          flexShrink: 0,
        }}>
          <div style={{
            width: "100%", height: "100%", borderRadius: "50%",
            overflow: "hidden",
            border: `3px solid ${isCenter ? "#0B1E4B" : "#fff"}`,
          }}>
            <img
              src={member.photo}
              alt={member.name}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              onError={e => { e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=F05A1A&color=fff&size=200`; }}
            />
          </div>
        </div>

        {/* Verified badge */}
        {isCenter && (
          <div style={{
            position: "absolute", bottom: 0, right: 0,
            width: 26, height: 26, borderRadius: "50%",
            background: "#F05A1A", border: "2px solid #0B1E4B",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <MdVerified style={{ color: "#fff", fontSize: 14 }} />
          </div>
        )}
      </div>

      {/* NAME */}
      <div style={{
        fontSize: isCenter ? 18 : 16,
        fontWeight: 800,
        color: isCenter ? "#fff" : "#0B1E4B",
        textAlign: "center",
        letterSpacing: "-0.3px",
        marginBottom: 4,
        position: "relative", zIndex: 1,
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        lineHeight: 1.2,
      }}>
        {member.name}
      </div>

      {/* ROLE */}
      <div style={{
        fontSize: 11, fontWeight: 600,
        color: isCenter ? "rgba(255,255,255,0.55)" : "#94a3b8",
        textAlign: "center", marginBottom: 14,
        textTransform: "uppercase", letterSpacing: "1px",
        position: "relative", zIndex: 1,
      }}>
        {member.role}
      </div>

      {/* DIVIDER */}
      <div style={{
        width: "100%",
        height: 1,
        background: isCenter ? "rgba(255,255,255,0.1)" : "#f1f5f9",
        marginBottom: 14,
        position: "relative", zIndex: 1,
      }} />

      {/* COMPANY */}
      <div style={{
        display: "flex", alignItems: "center", gap: 8,
        padding: "8px 14px", borderRadius: 12,
        background: isCenter ? "rgba(255,255,255,0.08)" : "#f8fafc",
        border: isCenter ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f1f5f9",
        width: "100%", justifyContent: "center",
        position: "relative", zIndex: 1,
      }}>
        <div style={{
          width: 28, height: 28, borderRadius: 8,
          background: isCenter ? "rgba(240,90,26,0.25)" : "#FFF3EC",
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
        }}>
          <FaLinkedin style={{ color: isCenter ? "#FFAD5C" : "#F05A1A", fontSize: 13 }} />
        </div>
        <span style={{
          fontSize: 12, fontWeight: 700,
          color: isCenter ? "rgba(255,255,255,0.85)" : "#374151",
          maxWidth: 130,
          overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
          fontFamily: "'Plus Jakarta Sans', sans-serif",
        }}>
          {member.company}
        </span>
      </div>
    </div>
  );
}

export default function SpecialMembersSection() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const autoRef = useRef(null);
  const total = MEMBERS.length;

  const prev = useCallback(() => setCurrent(c => (c - 1 + total) % total), [total]);
  const next = useCallback(() => setCurrent(c => (c + 1) % total), [total]);

  // Auto-play
  useEffect(() => {
    if (!isAutoPlay) return;
    autoRef.current = setInterval(next, 3400);
    return () => clearInterval(autoRef.current);
  }, [isAutoPlay, next]);

  const pause = () => { setIsAutoPlay(false); clearInterval(autoRef.current); };
  const resume = () => setIsAutoPlay(true);

  // Drag/Swipe support
  const handleDragStart = (e) => {
    setIsDragging(true);
    setDragStart(e.touches ? e.touches[0].clientX : e.clientX);
    pause();
  };
  const handleDragEnd = (e) => {
    if (!isDragging) return;
    setIsDragging(false);
    const end = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
    const diff = dragStart - end;
    if (Math.abs(diff) > 50) diff > 0 ? next() : prev();
    resume();
  };

  // Get visible cards: prev, center, next (and extras for smooth look)
  const getVisible = () => {
    const indices = [];
    for (let i = -2; i <= 2; i++) {
      indices.push((current + i + total) % total);
    }
    return indices;
  };

  const visible = getVisible();

  return (
    <section style={{
      background: "linear-gradient(170deg, #f8faff 0%, #ffffff 50%, #fff8f4 100%)",
      padding: "100px 0 80px",
      position: "relative",
      overflow: "hidden",
      fontFamily: "'Plus Jakarta Sans', sans-serif",
    }}>
      <style>{`
       
        /* BG decoration */
        .sms-bg-dot {
          position: absolute; border-radius: 50%; pointer-events: none;
        }

        /* Nav Arrow Buttons */
        .sms-arrow {
          width: 52px; height: 52px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          border: none; cursor: pointer;
          transition: all 0.25s cubic-bezier(0.34,1.56,0.64,1);
          flex-shrink: 0;
        }
        .sms-arrow.prev {
          background: #fff;
          box-shadow: 0 4px 20px rgba(11,30,75,0.10);
          color: #0B1E4B;
          border: 1.5px solid #e8ecf4;
        }
        .sms-arrow.prev:hover {
          background: #0B1E4B; color: #fff;
          box-shadow: 0 8px 28px rgba(11,30,75,0.25);
          transform: scale(1.1);
          border-color: #0B1E4B;
        }
        .sms-arrow.next {
          background: linear-gradient(135deg, #F05A1A, #FF7D42);
          box-shadow: 0 4px 18px rgba(240,90,26,0.35);
          color: #fff;
          border: none;
        }
        .sms-arrow.next:hover {
          transform: scale(1.1);
          box-shadow: 0 10px 28px rgba(240,90,26,0.5);
        }

        /* Dot indicators */
        .sms-dot {
          height: 6px; border-radius: 999px;
          transition: all 0.35s cubic-bezier(0.34,1.56,0.64,1);
          cursor: pointer; border: none;
        }
        .sms-dot.active {
          background: #F05A1A;
          width: 28px;
        }
        .sms-dot.inactive {
          background: #d1d5db;
          width: 6px;
        }
        .sms-dot:hover { background: #F05A1A; opacity: 0.7; }

        /* View All Button */
        .sms-view-all {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 14px 36px; border-radius: 14px;
          font-size: 14px; font-weight: 800;
          color: #fff; text-decoration: none; cursor: pointer;
          background: linear-gradient(135deg, #0B1E4B 0%, #1a3580 100%);
          border: none;
          box-shadow: 0 8px 28px rgba(11,30,75,0.22);
          transition: all 0.3s cubic-bezier(0.34,1.56,0.64,1);
          font-family: 'Plus Jakarta Sans', sans-serif;
          letter-spacing: 0.2px;
        }
        .sms-view-all:hover {
          transform: translateY(-3px);
          box-shadow: 0 16px 40px rgba(11,30,75,0.32);
          background: linear-gradient(135deg, #F05A1A, #FF7D42);
        }
        .sms-view-all:hover .arrow-icon {
          transform: translateX(4px);
        }
        .arrow-icon { transition: transform 0.25s; }

        /* Slider track */
        .sms-track {
          display: flex;
          align-items: center;
          gap: 16px;
          justify-content: center;
          padding: 20px 0 32px;
          transition: none;
          user-select: none;
        }

        /* Card slot */
        .sms-slot {
          flex-shrink: 0;
          transition: all 0.45s cubic-bezier(0.34,1.2,0.64,1);
        }

        @media (max-width: 900px) {
          .sms-slot.side2 { display: none !important; }
        }
        @media (max-width: 640px) {
          .sms-slot.side1 { display: none !important; }
        }

        /* Section badge */
        .sms-section-badge {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 7px 18px; border-radius: 999px;
          background: linear-gradient(135deg, rgba(240,90,26,0.1), rgba(255,173,92,0.1));
          border: 1px solid rgba(240,90,26,0.2);
          color: #F05A1A; font-size: 12px; font-weight: 700;
          letter-spacing: 2px; text-transform: uppercase; margin-bottom: 16px;
        }
      `}</style>

      {/* Background decorations */}
      <div className="sms-bg-dot" style={{ top: -100, right: -100, width: 500, height: 500, background: "radial-gradient(circle, rgba(240,90,26,0.05) 0%, transparent 65%)" }} />
      <div className="sms-bg-dot" style={{ bottom: -60, left: -80, width: 400, height: 400, background: "radial-gradient(circle, rgba(11,30,75,0.05) 0%, transparent 65%)" }} />
      {/* Subtle grid */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.4,
        backgroundImage: "radial-gradient(circle, #d1d5db 1px, transparent 1px)",
        backgroundSize: "32px 32px",
      }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", position: "relative" }}>

        {/* ── SECTION HEADER ── */}
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div className="sms-section-badge">
            <HiSparkles style={{ fontSize: 13 }} />
            Our Distinguished Members
          </div>

          <h2 style={{
            fontFamily: "'Bebas Neue', cursive",
            fontSize: "clamp(38px, 6vw, 62px)",
            letterSpacing: 3, lineHeight: 1,
            color: "#0B1E4B",
            marginBottom: 16,
          }}>
            SPECIAL{" "}
            <span style={{
              background: "linear-gradient(90deg, #F05A1A, #FF9D42)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>
              MEMBERS
            </span> OF UDIISA
          </h2>

          <p style={{
            fontSize: 16, color: "#64748b", maxWidth: 500,
            margin: "0 auto", lineHeight: 1.7, fontWeight: 500,
          }}>
            Visionary leaders and dedicated patrons who champion the cause of sports in India
          </p>
        </div>

        {/* ── SLIDER ── */}
        <div
          style={{ position: "relative", userSelect: "none" }}
          onMouseDown={handleDragStart}
          onMouseUp={handleDragEnd}
          onMouseLeave={() => { if (isDragging) { setIsDragging(false); resume(); } }}
          onTouchStart={handleDragStart}
          onTouchEnd={handleDragEnd}
        >
          {/* Cards track */}
          <div className="sms-track">
            {visible.map((memberIdx, slotIdx) => {
              const isCenter = slotIdx === 2;
              const distFromCenter = Math.abs(slotIdx - 2);
              const isSide1 = distFromCenter === 1;
              const isSide2 = distFromCenter === 2;
              const slotClass = `sms-slot ${isSide2 ? "side2" : isSide1 ? "side1" : ""}`;

              return (
                <div
                  key={`${memberIdx}-${slotIdx}`}
                  className={slotClass}
                  onClick={() => {
                    if (!isCenter) {
                      setCurrent(memberIdx);
                      pause();
                      setTimeout(resume, 3000);
                    }
                  }}
                  style={{
                    width: isCenter ? 260 : isSide1 ? 220 : 195,
                    height: isCenter ? 340 : 300,
                    flexShrink: 0,
                    transition: "all 0.45s cubic-bezier(0.34,1.2,0.64,1)",
                  }}
                >
                  <MemberCard member={MEMBERS[memberIdx]} isCenter={isCenter} />
                </div>
              );
            })}
          </div>

          {/* Left / Right Nav arrows */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            gap: 12, marginBottom: 28,
          }}>
            <button className="sms-arrow prev" onClick={() => { prev(); pause(); setTimeout(resume, 3000); }}>
              <FaChevronLeft style={{ fontSize: 14 }} />
            </button>

            {/* Dot indicators */}
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              {MEMBERS.map((_, i) => (
                <button
                  key={i}
                  className={`sms-dot ${i === current ? "active" : "inactive"}`}
                  onClick={() => { setCurrent(i); pause(); setTimeout(resume, 3000); }}
                />
              ))}
            </div>

            <button className="sms-arrow next" onClick={() => { next(); pause(); setTimeout(resume, 3000); }}>
              <FaChevronRight style={{ fontSize: 14 }} />
            </button>
          </div>

          {/* Counter */}
          <div style={{
            textAlign: "center",
            fontSize: 12, fontWeight: 700,
            color: "#94a3b8", letterSpacing: "1px",
            marginBottom: 36,
          }}>
            <span style={{ color: "#F05A1A", fontSize: 16, fontFamily: "'Bebas Neue', cursive", letterSpacing: 2 }}>
              {String(current + 1).padStart(2, "0")}
            </span>
            {" "}/ {String(MEMBERS.length).padStart(2, "0")}
          </div>
        </div>

        {/* ── VIEW ALL BUTTON ── */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button className="sms-view-all" onClick={() => navigate('/members/special-members')}>
            <BsStarFill style={{ fontSize: 14 }} />
            View All Special Members
            <FaArrowRight className="arrow-icon" style={{ fontSize: 13 }} />
          </button>
        </div>

      </div>
    </section>
  );
}