import { useState, useCallback, useEffect, useMemo } from "react";
import { BsStarFill } from "react-icons/bs";
import { FaArrowRight } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { getPublicSpecialMembers } from "../../../../shared/services/publicApi";

const EMPTY_GROUPS = { diamond: [], gold: [], silver: [] };

// ─── Themes ───────────────────────────────────────────────────────────────────
const TABS = [
  {
    key: "diamond",
    label: "Diamond",
    emoji: "💎",
    tabActiveBg: "linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)",
    tabActiveBorder: "#3b82f6",
    tabActiveText: "#fff",
    tabActiveShadow: "0 8px 28px rgba(37,99,235,0.35)",
    cardBg: "linear-gradient(145deg, #ffffff 0%, #eff6ff 60%, #dbeafe 100%)",
    cardBorder: "#bfdbfe",
    cardShadow: "0 20px 60px rgba(37,99,235,0.13), 0 4px 20px rgba(37,99,235,0.08)",
    cardTopBar: "linear-gradient(90deg, #1e3a8a, #3b82f6, #60a5fa)",
    ringGrad: "conic-gradient(from 0deg, #1d4ed8, #60a5fa, #bfdbfe, #60a5fa, #1d4ed8)",
    accentColor: "#2563eb",
    accentLight: "#dbeafe",
    badgeBg: "linear-gradient(135deg, #dbeafe, #eff6ff)",
    badgeBorder: "#93c5fd",
    badgeText: "#1e40af",
    verifiedBg: "linear-gradient(135deg, #1e3a8a, #2563eb)",
    companyColor: "#2563eb",
    dotActive: "#2563eb",
    dotShadow: "rgba(37,99,235,0.4)",
  },
  {
    key: "gold",
    label: "Gold",
    emoji: "🥇",
    tabActiveBg: "linear-gradient(135deg, #92400e 0%, #d97706 100%)",
    tabActiveBorder: "#f59e0b",
    tabActiveText: "#fff",
    tabActiveShadow: "0 8px 28px rgba(217,119,6,0.35)",
    cardBg: "linear-gradient(145deg, #ffffff 0%, #fffbeb 60%, #fef3c7 100%)",
    cardBorder: "#fcd34d",
    cardShadow: "0 20px 60px rgba(217,119,6,0.13), 0 4px 20px rgba(217,119,6,0.08)",
    cardTopBar: "linear-gradient(90deg, #92400e, #d97706, #fbbf24)",
    ringGrad: "conic-gradient(from 0deg, #92400e, #fbbf24, #fef3c7, #fbbf24, #92400e)",
    accentColor: "#d97706",
    accentLight: "#fef3c7",
    badgeBg: "linear-gradient(135deg, #fef3c7, #fffbeb)",
    badgeBorder: "#fcd34d",
    badgeText: "#92400e",
    verifiedBg: "linear-gradient(135deg, #92400e, #d97706)",
    companyColor: "#d97706",
    dotActive: "#d97706",
    dotShadow: "rgba(217,119,6,0.4)",
  },
  {
    key: "silver",
    label: "Silver",
    emoji: "🥈",
    tabActiveBg: "linear-gradient(135deg, #334155 0%, #64748b 100%)",
    tabActiveBorder: "#94a3b8",
    tabActiveText: "#fff",
    tabActiveShadow: "0 8px 28px rgba(100,116,139,0.3)",
    cardBg: "linear-gradient(145deg, #ffffff 0%, #f8fafc 60%, #f1f5f9 100%)",
    cardBorder: "#cbd5e1",
    cardShadow: "0 20px 60px rgba(100,116,139,0.1), 0 4px 20px rgba(100,116,139,0.06)",
    cardTopBar: "linear-gradient(90deg, #334155, #64748b, #94a3b8)",
    ringGrad: "conic-gradient(from 0deg, #334155, #94a3b8, #e2e8f0, #94a3b8, #334155)",
    accentColor: "#64748b",
    accentLight: "#f1f5f9",
    badgeBg: "linear-gradient(135deg, #f1f5f9, #f8fafc)",
    badgeBorder: "#cbd5e1",
    badgeText: "#334155",
    verifiedBg: "linear-gradient(135deg, #334155, #64748b)",
    companyColor: "#475569",
    dotActive: "#64748b",
    dotShadow: "rgba(100,116,139,0.35)",
  },
];

// ─── Tab Button ───────────────────────────────────────────────────────────────
function TabButton({ tab, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        position: "relative",
        padding: "13px 28px",
        borderRadius: 16,
        border: `1.5px solid ${isActive ? tab.tabActiveBorder : "#e2e8f0"}`,
        background: isActive ? tab.tabActiveBg : "#fff",
        color: isActive ? tab.tabActiveText : "#64748b",
        fontSize: 13,
        fontWeight: 700,
        letterSpacing: "0.8px",
        textTransform: "uppercase",
        cursor: "pointer",
        transition: "all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)",
        boxShadow: isActive ? tab.tabActiveShadow : "0 2px 8px rgba(0,0,0,0.05)",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        display: "flex",
        alignItems: "center",
        gap: 9,
        transform: isActive ? "translateY(-3px)" : "translateY(0)",
        overflow: "hidden",
        minWidth: 148,
        justifyContent: "center",
      }}
    >
      {isActive && (
        <div style={{
          position: "absolute", top: 0, left: "-100%", width: "60%", height: "100%",
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.22), transparent)",
          animation: "tabShimmer 2.5s ease-in-out infinite",
          pointerEvents: "none",
        }} />
      )}
      <span style={{ fontSize: 18 }}>{tab.emoji}</span>
      <span style={{ position: "relative", zIndex: 1 }}>{tab.label}</span>
      <span style={{
        background: isActive ? "rgba(255,255,255,0.22)" : "#f1f5f9",
        color: isActive ? "#fff" : "#94a3b8",
        fontSize: 10, fontWeight: 800,
        padding: "2px 9px", borderRadius: 999,
        letterSpacing: "0.5px",
      }}>
        {tab.count}
      </span>
    </button>
  );
}

// ─── Member Card ──────────────────────────────────────────────────────────────
function MemberCard({ member, isCenter, theme }) {
  if (!member) return null;
  return (
    <div style={{
      background: isCenter ? theme.cardBg : "#fff",
      borderRadius: 24,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      transition: "all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
      transform: isCenter ? "scale(1.05)" : "scale(0.93)",
      opacity: isCenter ? 1 : 0.6,
      boxShadow: isCenter ? theme.cardShadow : "0 4px 20px rgba(0,0,0,0.05)",
      border: `1.5px solid ${isCenter ? theme.cardBorder : "#f0f4f8"}`,
      cursor: "pointer",
      position: "relative",
      overflow: "hidden",
      minWidth: 0,
      height: "100%",
    }}>
      {/* Top color bar */}
      <div style={{
        width: "100%", height: isCenter ? 5 : 3, flexShrink: 0,
        background: isCenter ? theme.cardTopBar : "#f1f5f9",
      }} />

      <div style={{
        padding: isCenter ? "26px 22px 24px" : "20px 16px 18px",
        display: "flex", flexDirection: "column", alignItems: "center",
        width: "100%", flex: 1, boxSizing: "border-box",
      }}>
        {/* BG tint blob */}
        {isCenter && (
          <div style={{
            position: "absolute", top: -30, right: -30, width: 160, height: 160,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${theme.accentLight}90 0%, transparent 70%)`,
            pointerEvents: "none",
          }} />
        )}

        {/* BADGE */}
        <div style={{
          display: "flex", alignItems: "center", gap: 6,
          padding: "5px 14px", borderRadius: 999,
          background: isCenter ? theme.badgeBg : "#f8faff",
          border: `1px solid ${isCenter ? theme.badgeBorder : "#e8ecf4"}`,
          color: isCenter ? theme.badgeText : "#94a3b8",
          fontSize: 9, fontWeight: 800, letterSpacing: "2px",
          textTransform: "uppercase", marginBottom: 20,
          position: "relative", zIndex: 1,
        }}>
          <span style={{ fontSize: 11 }}>{theme.emoji}</span>
          {theme.label} Member
        </div>

        {/* PHOTO */}
        <div style={{ position: "relative", marginBottom: 16, zIndex: 1 }}>
          <div style={{
            width: isCenter ? 104 : 86,
            height: isCenter ? 104 : 86,
            borderRadius: "50%", padding: 3,
            background: isCenter ? theme.ringGrad : "linear-gradient(135deg, #e2e8f0, #cbd5e1)",
            flexShrink: 0,
          }}>
            <div style={{
              width: "100%", height: "100%", borderRadius: "50%",
              overflow: "hidden", border: "3px solid #fff", background: "#fff",
            }}>
              <img
                src={member.photo}
                className="object-top"
                alt={member.name}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                onError={e => {
                  e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=f1f5f9&color=475569&size=200&bold=true`;
                }}
              />
            </div>
          </div>

          {/* Glow halo */}
          {isCenter && (
            <div style={{
              position: "absolute", inset: -6, borderRadius: "50%",
              background: `radial-gradient(circle, ${theme.accentLight} 0%, transparent 65%)`,
              zIndex: -1, animation: "haloBreath 3s ease-in-out infinite",
            }} />
          )}

          {/* Verified */}
          {isCenter && (
            <div style={{
              position: "absolute", bottom: 2, right: 2,
              width: 24, height: 24, borderRadius: "50%",
              background: theme.verifiedBg,
              border: "2px solid #fff",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: `0 2px 8px ${theme.accentColor}50`,
            }}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  stroke="#fff" strokeWidth="2.5" fill="none"
                  strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          )}
        </div>

        {/* NAME */}
        <div style={{
          fontSize: isCenter ? 17 : 14, fontWeight: 800,
          color: "#0f172a", textAlign: "center",
          letterSpacing: "-0.3px", marginBottom: 5,
          position: "relative", zIndex: 1,
          fontFamily: "'Plus Jakarta Sans', sans-serif", lineHeight: 1.2,
        }}>
          {member.name}
        </div>

        {/* COMPANY */}
        <div style={{
          fontSize: 11, fontWeight: 700,
          color: isCenter ? theme.companyColor : "#F05A1A",
          textAlign: "center", marginBottom: 4,
          letterSpacing: "0.2px",
          position: "relative", zIndex: 1,
          maxWidth: "100%", overflow: "hidden",
          textOverflow: "ellipsis", whiteSpace: "nowrap",
        }}>
          {member.company}
        </div>

        {/* ROLE */}
        <div style={{
          fontSize: 10, fontWeight: 600, color: "#94a3b8",
          textAlign: "center", marginBottom: 18,
          textTransform: "uppercase", letterSpacing: "1.5px",
          position: "relative", zIndex: 1,
        }}>
          {member.role}
        </div>

        {/* Bottom accent line */}
        <div style={{
          width: isCenter ? "55%" : "35%", height: 2, borderRadius: 999,
          background: isCenter
            ? `linear-gradient(90deg, transparent, ${theme.accentColor}, transparent)`
            : "linear-gradient(90deg, transparent, #e2e8f0, transparent)",
          position: "relative", zIndex: 1,
        }} />
      </div>
    </div>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────
export default function SpecialMembersSection() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("diamond");
  const [current, setCurrent] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const [memberGroups, setMemberGroups] = useState(EMPTY_GROUPS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    getPublicSpecialMembers()
      .then((list) => {
        if (cancelled) return;
        const groups = { diamond: [], gold: [], silver: [] };
        const items = Array.isArray(list) ? list : [];
        items.forEach((item) => {
          const categoryRaw = String(item.membershipCategory || item.membershipType || "").toLowerCase();
          const key = categoryRaw.includes("diamond")
            ? "diamond"
            : categoryRaw.includes("gold")
              ? "gold"
              : "silver";
          groups[key].push({
            id: item.id || `${key}-${Math.random()}`,
            name: item.name || "Member",
            company: item.companyName || "",
            role: item.designation || "Special Member",
            photo:
              item.img ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(item.name || "Member")}&background=f1f5f9&color=475569&size=200&bold=true`,
          });
        });
        setMemberGroups(groups);
      })
      .catch(() => {
        if (!cancelled) setMemberGroups(EMPTY_GROUPS);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const tabConfig = useMemo(
    () => TABS.map((tab) => ({ ...tab, count: memberGroups[tab.key]?.length || 0 })),
    [memberGroups]
  );
  const theme = tabConfig.find((t) => t.key === activeTab) || tabConfig[0];
  const members = memberGroups[activeTab] || [];
  const total = members.length;

  useEffect(() => {
    if (loading) return;
    if (total > 0) return;
    const fallback = tabConfig.find((tab) => (memberGroups[tab.key] || []).length > 0);
    if (fallback && fallback.key !== activeTab) {
      setActiveTab(fallback.key);
      setCurrent(0);
    }
  }, [activeTab, loading, memberGroups, tabConfig, total]);

  const switchTab = (key) => {
    setActiveTab(key);
    setCurrent(0);
    setAnimKey(k => k + 1);
  };

  const prev = useCallback(() => {
    if (total <= 1) return;
    setCurrent(c => (c - 1 + total) % total);
  }, [total]);

  const next = useCallback(() => {
    if (total <= 1) return;
    setCurrent(c => (c + 1) % total);
  }, [total]);

  const handleDragStart = (e) => {
    setIsDragging(true);
    setDragStart(e.touches ? e.touches[0].clientX : e.clientX);
  };
  const handleDragEnd = (e) => {
    if (!isDragging) return;
    setIsDragging(false);
    const end = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
    const diff = dragStart - end;
    if (Math.abs(diff) > 50) diff > 0 ? next() : prev();
  };

  const getVisible = () => {
    if (total === 0) return [];
    return [-2, -1, 0, 1, 2].map(i => (current + i + total) % total);
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
        @keyframes tabShimmer {
          0% { left: -100%; }
          60%, 100% { left: 200%; }
        }
        @keyframes spinRing {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes haloBreath {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.1); }
        }
        @keyframes trackFade {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes headReveal {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .sms-arrow {
          width: 46px; height: 46px; border-radius: 14px;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; border: none;
          transition: all 0.25s cubic-bezier(0.34,1.56,0.64,1);
          flex-shrink: 0; font-size: 20px; font-weight: 700; line-height: 1;
        }
        .sms-arrow:disabled { opacity: 0.3; cursor: not-allowed; }

        .sms-dot {
          height: 5px; border-radius: 999px;
          transition: all 0.35s cubic-bezier(0.34,1.56,0.64,1);
          cursor: pointer; border: none; padding: 0;
        }

        .sms-track {
          display: flex; align-items: center; gap: 16px;
          justify-content: center; padding: 12px 0 24px;
          user-select: none;
        }
        .sms-slot {
          flex-shrink: 0;
          transition: all 0.45s cubic-bezier(0.34,1.2,0.64,1);
        }

        @media (max-width: 900px) { .sms-slot.side2 { display: none !important; } }
        @media (max-width: 640px) { .sms-slot.side1 { display: none !important; } }
      `}</style>

      {/* Background */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "radial-gradient(circle, #d1d5db 1px, transparent 1px)",
        backgroundSize: "32px 32px", opacity: 0.35,
      }} />
      <div style={{
        position: "absolute", top: -120, right: -100, width: 500, height: 500,
        borderRadius: "50%", pointerEvents: "none",
        background: "radial-gradient(circle, rgba(240,90,26,0.05) 0%, transparent 65%)",
      }} />
      <div style={{
        position: "absolute", bottom: -80, left: -80, width: 400, height: 400,
        borderRadius: "50%", pointerEvents: "none",
        background: "radial-gradient(circle, rgba(11,30,75,0.04) 0%, transparent 65%)",
      }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", position: "relative" }}>

        {/* ── HEADER ── */}
        <div style={{ textAlign: "center", marginBottom: 44, animation: "headReveal 0.7s ease both" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "7px 20px", borderRadius: 999,
            background: "linear-gradient(135deg, rgba(240,90,26,0.08), rgba(255,173,92,0.08))",
            border: "1px solid rgba(240,90,26,0.18)",
            color: "#F05A1A", fontSize: 11, fontWeight: 700,
            letterSpacing: "2.5px", textTransform: "uppercase", marginBottom: 18,
          }}>
            <HiSparkles style={{ fontSize: 13 }} />
            Our Distinguished Members
          </div>

          <h2 style={{
            fontFamily: "'Bebas Neue', cursive",
            fontSize: "clamp(40px, 6.5vw, 58px)",
            letterSpacing: 3, lineHeight: 1,
            color: "#0B1E4B", margin: "0 0 14px",
          }}>
            SPECIAL{" "}
            <span style={{
              background: "linear-gradient(90deg, #F05A1A, #FF9D42)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}> {theme.label}              MEMBERS
            </span>{" "}OF UDIISA
          </h2>

          <p style={{
            fontSize: 15, color: "#64748b", maxWidth: 480,
            margin: "12px auto 0", lineHeight: 1.8, fontWeight: 500,
          }}>
            Visionary leaders and dedicated patrons who champion the cause of sports in India
          </p>
        </div>

        {/* ── TABS ── */}
        <div style={{
          display: "flex", justifyContent: "center", gap: 12,
          flexWrap: "wrap", marginBottom: 44,
          animation: "headReveal 0.7s 0.1s ease both",
        }}>
          {tabConfig.map(tab => (
            <TabButton
              key={tab.key}
              tab={tab}
              isActive={activeTab === tab.key}
              onClick={() => switchTab(tab.key)}
            />
          ))}
        </div>

        {/* ── SLIDER ── */}
        <div
          style={{ position: "relative", userSelect: "none" }}
          onMouseDown={handleDragStart}
          onMouseUp={handleDragEnd}
          onMouseLeave={() => isDragging && setIsDragging(false)}
          onTouchStart={handleDragStart}
          onTouchEnd={handleDragEnd}
        >
          <div className="sms-track" key={animKey} style={{ animation: "trackFade 0.4s ease both" }}>
            {visible.map((memberIdx, slotIdx) => {
              const isCenter = slotIdx === 2;
              const dist = Math.abs(slotIdx - 2);
              return (
                <div
                  key={`${activeTab}-${memberIdx}-${slotIdx}`}
                  className={`sms-slot ${dist === 2 ? "side2" : dist === 1 ? "side1" : ""}`}
                  onClick={() => !isCenter && setCurrent(memberIdx)}
                  style={{
                    width: isCenter ? 252 : dist === 1 ? 212 : 188,
                    height: isCenter ? 308 : 268,
                  }}
                >
                  <MemberCard member={members[memberIdx]} isCenter={isCenter} theme={theme} />
                </div>
              );
            })}
          </div>

          {/* NAV */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            gap: 14, marginBottom: 22,
          }}>
            <button
              className="sms-arrow"
              disabled={total <= 1}
              onClick={prev}
              style={{
                background: "#fff", border: "1.5px solid #e2e8f0",
                color: "#64748b", boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = "#0B1E4B";
                e.currentTarget.style.color = "#fff";
                e.currentTarget.style.transform = "scale(1.08)";
                e.currentTarget.style.borderColor = "#0B1E4B";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = "#fff";
                e.currentTarget.style.color = "#64748b";
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.borderColor = "#e2e8f0";
              }}
            >
              ‹
            </button>

            <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
              {members.map((_, i) => (
                <button
                  key={i}
                  className="sms-dot"
                  onClick={() => setCurrent(i)}
                  style={{
                    width: i === current ? 28 : 6,
                    background: i === current ? theme.dotActive : "#e2e8f0",
                    boxShadow: i === current ? `0 0 8px ${theme.dotShadow}` : "none",
                  }}
                />
              ))}
            </div>

            <button
              className="sms-arrow"
              disabled={total <= 1}
              onClick={next}
              style={{
                background: theme.tabActiveBg,
                color: "#fff", border: "none",
                boxShadow: theme.tabActiveShadow,
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.1)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; }}
            >
              ›
            </button>
          </div>

          {/* Counter */}
          <div style={{
            textAlign: "center", fontSize: 12, fontWeight: 700,
            color: "#94a3b8", letterSpacing: "2px", marginBottom: 40,
          }}>
            <span style={{
              color: theme.accentColor, fontSize: 18,
              fontFamily: "'Bebas Neue', cursive", letterSpacing: 3,
            }}>
              {String(current + 1).padStart(2, "0")}
            </span>
            {" "}/ {String(total).padStart(2, "0")}
          </div>
        </div>

        {/* VIEW ALL */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button
            onClick={() => navigate("/members/special-members")}
            style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              padding: "14px 38px", borderRadius: 16,
              background: theme.tabActiveBg, border: "none",
              color: "#fff", fontSize: 13, fontWeight: 800,
              letterSpacing: "1px", textTransform: "uppercase",
              cursor: "pointer", boxShadow: theme.tabActiveShadow,
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              transition: "all 0.3s cubic-bezier(0.34,1.56,0.64,1)",
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "none"; }}
          >
            <BsStarFill style={{ fontSize: 13 }} />
            View All {theme.label} Members
            <FaArrowRight style={{ fontSize: 12 }} />
          </button>
        </div>

      </div>
    </section>
  );
}