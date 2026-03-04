import { useState, useEffect, useRef, useCallback } from "react";
import { HiArrowUp } from "react-icons/hi";
import { HiMiniMusicalNote } from "react-icons/hi2";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";

const INJECTED_STYLES = `
  /* ── PRELOADER ── */
  @keyframes ge-bar-bounce {
    0%, 100% { transform: scaleY(0.3); opacity: 0.4; }
    50%       { transform: scaleY(1);   opacity: 1;   }
  }
  @keyframes ge-logo-pulse {
    0%, 100% { opacity: 0.7; transform: scale(0.97); }
    50%      { opacity: 1;   transform: scale(1);    }
  }
  @keyframes ge-fade-out {
    0%   { opacity: 1; visibility: visible; }
    100% { opacity: 0; visibility: hidden;  }
  }
  @keyframes ge-shimmer {
    0%   { background-position: -200% center; }
    100% { background-position:  200% center; }
  }
  @keyframes ge-ring-spin {
    from { transform: rotate(0deg);   }
    to   { transform: rotate(360deg); }
  }
  @keyframes ge-ring-spin-rev {
    from { transform: rotate(0deg);    }
    to   { transform: rotate(-360deg); }
  }

  /* ── BACK TO TOP ── */
  @keyframes ge-fade-in-up {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0);    }
  }
  @keyframes ge-fade-in {
    from { opacity: 0; }
    to   { opacity: 1; }
  }

  /* ── MUSIC RIPPLE ── */
  @keyframes ge-ripple {
    0%   { transform: scale(1);   opacity: 0.6; }
    100% { transform: scale(2.2); opacity: 0;   }
  }
  @keyframes ge-equalizer {
    0%, 100% { height: 8px;  }
    25%      { height: 18px; }
    50%      { height: 12px; }
    75%      { height: 22px; }
  }

  /* ── APPLIED CLASSES ── */
  .ge-bar { animation: ge-bar-bounce 0.9s ease-in-out infinite; transform-origin: bottom; }
  .ge-bar-1 { animation-delay: 0s;    }
  .ge-bar-2 { animation-delay: 0.15s; }
  .ge-bar-3 { animation-delay: 0.30s; }

  .ge-logo-text {
    background: linear-gradient(90deg, #F05A1A 0%, #FFAD5C 40%, #F05A1A 80%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: ge-shimmer 2s linear infinite, ge-logo-pulse 2.4s ease-in-out infinite;
    font-family: 'Bebas Neue', cursive;
  }

  .ge-ring-outer {
    animation: ge-ring-spin 2.4s linear infinite;
  }
  .ge-ring-inner {
    animation: ge-ring-spin-rev 1.8s linear infinite;
  }

  .ge-preloader-exit {
    animation: ge-fade-out 0.6s ease forwards;
  }

  .ge-fade-in-up {
    animation: ge-fade-in-up 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) both;
  }
  .ge-fade-in {
    animation: ge-fade-in 0.35s ease both;
  }

  .ge-btt-btn {
    transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.25s ease;
  }
  .ge-btt-btn:hover {
    transform: scale(1.12) translateY(-2px);
    box-shadow: 0 12px 32px rgba(240, 90, 26, 0.5) !important;
  }
  .ge-btt-btn:active {
    transform: scale(0.96);
  }

  .ge-music-btn {
    transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.25s ease;
  }
  .ge-music-btn:hover {
    transform: scale(1.1) translateY(-2px);
  }
  .ge-music-btn:active {
    transform: scale(0.94);
  }

  .ge-ripple-ring {
    position: absolute; inset: 0; border-radius: 50%;
    border: 2px solid rgba(240, 90, 26, 0.5);
    animation: ge-ripple 1.8s ease-out infinite;
    pointer-events: none;
  }
  .ge-ripple-ring-2 {
    animation-delay: 0.6s;
  }

  .ge-eq-bar {
    width: 3px; border-radius: 2px;
    background: #F05A1A;
    animation: ge-equalizer 0.8s ease-in-out infinite;
  }
  .ge-eq-1 { animation-delay: 0s;    }
  .ge-eq-2 { animation-delay: 0.2s;  }
  .ge-eq-3 { animation-delay: 0.4s;  }

  /* Smooth scroll for entire page */
  html { scroll-behavior: smooth; }
`;

/* ══════════════════════════════════════════════
   SUB-COMPONENT: Preloader
══════════════════════════════════════════════ */
function Preloader({ onDone }) {
  const [exiting, setExiting] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    // Start exit animation after 1.6s
    const exitTimer = setTimeout(() => setExiting(true), 1600);
    // Fully unmount after exit animation (0.6s)
    const doneTimer = setTimeout(() => {
      setHidden(true);
      onDone?.();
    }, 2250);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
    };
  }, [onDone]);

  if (hidden) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center ${exiting ? "ge-preloader-exit" : ""}`}
      style={{ background: "linear-gradient(135deg, #0B1E4B 0%, #152B6B 55%, #0d1a3e 100%)" }}
      aria-label="Loading"
      role="status"
    >
      {/* Background subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg,transparent,transparent 40px,rgba(255,255,255,1) 40px,rgba(255,255,255,1) 41px)," +
            "repeating-linear-gradient(90deg,transparent,transparent 40px,rgba(255,255,255,1) 40px,rgba(255,255,255,1) 41px)",
        }}
      />

      {/* Glow blobs */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "20%", left: "50%", transform: "translateX(-50%)",
          width: 400, height: 400, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(240,90,26,0.12) 0%, transparent 70%)",
        }}
      />

      {/* ── SPINNER RINGS ── */}
      <div className="relative flex items-center justify-center mb-10" style={{ width: 100, height: 100 }}>
        {/* Outer ring */}
        <div
          className="ge-ring-outer absolute"
          style={{
            width: 100, height: 100, borderRadius: "50%",
            border: "2.5px solid transparent",
            borderTopColor: "#F05A1A",
            borderRightColor: "rgba(240,90,26,0.3)",
          }}
        />
        {/* Inner ring */}
        <div
          className="ge-ring-inner absolute"
          style={{
            width: 72, height: 72, borderRadius: "50%",
            border: "2px solid transparent",
            borderTopColor: "#FFAD5C",
            borderLeftColor: "rgba(255,173,92,0.3)",
          }}
        />
        {/* Center icon */}
        <div
          style={{
            width: 46, height: 46, borderRadius: 13,
          
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >
          <img src="/short-logo.png" alt="logo" />
        </div>
      </div>

      {/* ── 3 ANIMATED BARS ── */}
      <div className="flex items-end gap-2 mb-8" style={{ height: 32 }}>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={`ge-bar ge-bar-${i + 1}`}
            style={{
              width: 6,
              height: 28,
              borderRadius: 4,
              background: i === 1
                ? "linear-gradient(to top, #F05A1A, #FF9D42)"
                : "linear-gradient(to top, rgba(240,90,26,0.5), rgba(255,157,66,0.5))",
            }}
          />
        ))}
      </div>

      {/* ── BRAND TEXT ── */}
      <div className="text-center">
        <div
          className="ge-logo-text"
          style={{ fontSize: 38, letterSpacing: 4 }}
        >
          UDI SPORTS
        </div>
        <div
          style={{
            fontSize: 11, fontWeight: 700,
            color: "rgba(255,255,255,0.4)",
            letterSpacing: "4px", textTransform: "uppercase",
            marginTop: 4, fontFamily: "'Plus Jakarta Sans', sans-serif",
          }}
        >
          NGO · India
        </div>
      </div>

      {/* ── Loading dots ── */}
      <div className="flex items-center gap-1.5 mt-8">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            style={{
              width: 4, height: 4, borderRadius: "50%",
              background: "rgba(240,90,26,0.6)",
              animation: `ge-bar-bounce 1s ease-in-out ${i * 0.15}s infinite`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   SUB-COMPONENT: Back To Top Button
══════════════════════════════════════════════ */
function BackToTopButton({ visible }) {
  const handleClick = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={handleClick}
      aria-label="Back to top"
      className="ge-btt-btn ge-fade-in-up"
      style={{
        position: "fixed",
        bottom: 28,
        right: 28,
        zIndex: 998,
        width: 50,
        height: 50,
        borderRadius: "50%",
        background: "linear-gradient(135deg, #F05A1A 0%, #FF7D42 100%)",
        border: "none",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 6px 24px rgba(240, 90, 26, 0.42), 0 2px 8px rgba(0,0,0,0.15)",
        color: "#fff",
        outline: "none",
      }}
    >
      {/* Subtle glow ring */}
      <div
        style={{
          position: "absolute", inset: -3, borderRadius: "50%",
          border: "1.5px solid rgba(240,90,26,0.25)",
          pointerEvents: "none",
        }}
      />
      <HiArrowUp style={{ fontSize: 20, strokeWidth: 1 }} />
    </button>
  );
}

/* ══════════════════════════════════════════════
   SUB-COMPONENT: Music Toggle Button
══════════════════════════════════════════════ */
function MusicToggleButton({ isPlaying, onToggle, hasInteracted }) {
  return (
    <button
      onClick={onToggle}
      aria-label={isPlaying ? "Pause background music" : "Play background music"}
      className="ge-music-btn ge-fade-in"
      style={{
        position: "fixed",
        bottom: 92,
        right: 28,
        zIndex: 998,
        width: 50,
        height: 50,
        borderRadius: "50%",
        background: "rgba(11, 30, 75, 0.75)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: "1.5px solid rgba(255,255,255,0.18)",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow:
          isPlaying
            ? "0 6px 28px rgba(11,30,75,0.35), inset 0 1px 0 rgba(255,255,255,0.12)"
            : "0 4px 18px rgba(11,30,75,0.25), inset 0 1px 0 rgba(255,255,255,0.08)",
        color: "#fff",
        outline: "none",
        overflow: "visible",
      }}
    >
      {/* Ripple rings when playing */}
      {isPlaying && (
        <>
          <div className="ge-ripple-ring" />
          <div className="ge-ripple-ring ge-ripple-ring-2" />
        </>
      )}

      {/* Equalizer bars (playing state) or static note (paused) */}
      {isPlaying ? (
        <div
          className="flex items-end gap-[3px]"
          style={{ height: 22, alignItems: "flex-end" }}
          aria-hidden="true"
        >
          <div className="ge-eq-bar ge-eq-1" style={{ height: 10 }} />
          <div className="ge-eq-bar ge-eq-2" style={{ height: 18 }} />
          <div className="ge-eq-bar ge-eq-3" style={{ height: 12 }} />
        </div>
      ) : (
        <div style={{ position: "relative", opacity: hasInteracted ? 1 : 0.6 }}>
          <HiMiniMusicalNote style={{ fontSize: 20, color: "rgba(255,255,255,0.8)" }} />
          {/* Slash through note when never interacted (autoplay blocked) */}
          {!hasInteracted && (
            <div
              style={{
                position: "absolute", top: "50%", left: "50%",
                transform: "translate(-50%, -50%) rotate(-45deg)",
                width: 24, height: 1.5,
                background: "rgba(240,90,26,0.8)",
                borderRadius: 2,
              }}
            />
          )}
        </div>
      )}

      {/* Tooltip */}
      <div
        style={{
          position: "absolute",
          right: "calc(100% + 10px)",
          top: "50%",
          transform: "translateY(-50%)",
          background: "rgba(11,30,75,0.92)",
          color: "#fff",
          fontSize: 11,
          fontWeight: 700,
          padding: "5px 10px",
          borderRadius: 8,
          whiteSpace: "nowrap",
          opacity: 0,
          pointerEvents: "none",
          transition: "opacity 0.2s",
          backdropFilter: "blur(8px)",
          border: "1px solid rgba(255,255,255,0.1)",
          fontFamily: "'Plus Jakarta Sans', sans-serif",
        }}
        className="ge-tooltip"
      >
        {isPlaying ? "Pause Music" : "Play Music"}
      </div>
    </button>
  );
}

/* ══════════════════════════════════════════════
   MAIN COMPONENT: GlobalEnhancer
══════════════════════════════════════════════ */
export default function GlobalEnhancer({
  musicSrc = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
}) {
  // ── STATE ──
  const [preloaderDone, setPreloaderDone]     = useState(false);
  const [showBTT,       setShowBTT]           = useState(false);
  const [isPlaying,     setIsPlaying]         = useState(false);
  const [hasInteracted, setHasInteracted]     = useState(false);

  // ── REFS ──
  const audioRef      = useRef(null);
  const scrollListRef = useRef(null);

  // ── AUDIO SETUP ──
  useEffect(() => {
    // Create audio element programmatically (avoids DOM issues)
    const audio = new Audio(musicSrc);
    audio.loop   = true;
    audio.volume = 0.4;
    audioRef.current = audio;

    // Try autoplay (will be blocked in most browsers without interaction)
    const tryAutoplay = async () => {
      try {
        await audio.play();
        setIsPlaying(true);
        setHasInteracted(true);
      } catch {
        // Browser blocked autoplay — user must interact first
        setIsPlaying(false);
      }
    };
    tryAutoplay();

    // Cleanup: pause + remove src on unmount
    return () => {
      audio.pause();
      audio.src = "";
      audioRef.current = null;
    };
  }, [musicSrc]);

  // ── SCROLL LISTENER (Back To Top visibility) ──
  useEffect(() => {
    const handleScroll = () => {
      setShowBTT(window.scrollY > 300);
    };

    // Store ref so we can removeEventListener with the same function
    scrollListRef.current = handleScroll;
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", scrollListRef.current);
    };
  }, []);

  // ── MUSIC TOGGLE ──
  const handleMusicToggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    setHasInteracted(true);

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.warn("Audio play failed:", err);
      });
    }
  }, [isPlaying]);

  // ── PRELOADER DONE ──
  const handlePreloaderDone = useCallback(() => {
    setPreloaderDone(true);
  }, []);

  return (
    <>
      {/* ── INJECT STYLES (self-contained, no tailwind.config.js changes needed) ── */}
      <style dangerouslySetInnerHTML={{ __html: INJECTED_STYLES }} />

      {/* ── TOOLTIP HOVER STYLE ── */}
      <style>{`
        .ge-music-btn:hover .ge-tooltip { opacity: 1 !important; }
      `}</style>

      {/* ══════════ 1. PRELOADER ══════════ */}
      {!preloaderDone && <Preloader onDone={handlePreloaderDone} />}

      {/* ══════════ 2. MUSIC TOGGLE ══════════ */}
      <MusicToggleButton
        isPlaying={isPlaying}
        onToggle={handleMusicToggle}
        hasInteracted={hasInteracted}
      />

      {/* ══════════ 3. BACK TO TOP ══════════ */}
      <BackToTopButton visible={showBTT} />
    </>
  );
}