"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";

// ============================================================
// SHOWREEL CONFIGURATION
// Set the path to your showreel video file placed in /public
// e.g., "/showreel-2025.mp4"
// Leave empty string to show the "coming soon" placeholder.
// ============================================================
const SHOWREEL_VIDEO_SRC = "";

const STUDIO_STATS = [
  { value: "Est. 2016", label: "Studio Founded" },
  { value: "50+", label: "Projects Delivered" },
  { value: "10+", label: "Industries Served" },
];

// ─── Showreel Modal ──────────────────────────────────────────
function ShowreelModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!isOpen) {
      videoRef.current?.pause();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 10000,
            backgroundColor: "rgba(0, 0, 0, 0.96)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem",
          }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            style={{ width: "100%", maxWidth: "1100px", position: "relative" }}
          >
            {/* Header */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "1rem",
              }}
            >
              <div>
                <p
                  style={{
                    fontSize: "0.7rem",
                    color: "#C41E3A",
                    textTransform: "uppercase",
                    letterSpacing: "0.2em",
                    marginBottom: "0.25rem",
                    fontFamily: "var(--font-poppins), sans-serif",
                  }}
                >
                  Supreme Animation Studio
                </p>
                <h3
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: 700,
                    color: "#fff",
                    margin: 0,
                    fontFamily: "var(--font-headline), sans-serif",
                  }}
                >
                  Studio Showreel
                </h3>
              </div>
              <button
                onClick={onClose}
                style={{
                  width: "2.5rem",
                  height: "2.5rem",
                  borderRadius: "50%",
                  backgroundColor: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  color: "#fff",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.5rem",
                  lineHeight: "1",
                  transition: "background 0.2s",
                  flexShrink: 0,
                }}
              >
                ×
              </button>
            </div>

            {/* Video or Placeholder */}
            <div
              style={{
                aspectRatio: "16/9",
                borderRadius: "0.75rem",
                overflow: "hidden",
                backgroundColor: "#0a0a10",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              {SHOWREEL_VIDEO_SRC ? (
                <video
                  ref={videoRef}
                  src={SHOWREEL_VIDEO_SRC}
                  controls
                  autoPlay
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
              ) : (
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "1.25rem",
                  }}
                >
                  <div
                    style={{
                      width: "5rem",
                      height: "5rem",
                      borderRadius: "50%",
                      border: "2px solid rgba(196,30,58,0.4)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                      <path d="M8 5V19L19 12L8 5Z" fill="rgba(196,30,58,0.7)" />
                    </svg>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <p
                      style={{
                        fontSize: "1.125rem",
                        fontWeight: 600,
                        color: "rgba(255,255,255,0.8)",
                        marginBottom: "0.4rem",
                        fontFamily: "var(--font-headline), sans-serif",
                      }}
                    >
                      Showreel Coming Soon
                    </p>
                    <p
                      style={{
                        fontSize: "0.875rem",
                        color: "rgba(255,255,255,0.35)",
                        fontFamily: "var(--font-poppins), sans-serif",
                      }}
                    >
                      Browse our work below to see what we can create for you
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    style={{
                      padding: "0.6rem 1.5rem",
                      borderRadius: "100px",
                      border: "1px solid rgba(196,30,58,0.5)",
                      backgroundColor: "rgba(196,30,58,0.1)",
                      color: "#C41E3A",
                      cursor: "pointer",
                      fontSize: "0.875rem",
                      fontWeight: 600,
                      letterSpacing: "0.05em",
                      fontFamily: "var(--font-poppins), sans-serif",
                    }}
                  >
                    Browse Our Work
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Cycling Title ───────────────────────────────────────────
function CyclingTitle() {
  const cyclingWords = ["ideas", "brands", "the future"];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    setDisplayedText("");
    setIsTyping(true);
  }, [currentIndex]);

  useEffect(() => {
    const currentWord = cyclingWords[currentIndex];
    if (!currentWord) return;
    let timeoutId: NodeJS.Timeout;
    if (isTyping) {
      if (displayedText.length < currentWord.length) {
        timeoutId = setTimeout(() => {
          setDisplayedText(currentWord.slice(0, displayedText.length + 1));
        }, 100);
      } else {
        timeoutId = setTimeout(() => setIsTyping(false), 1500);
      }
    } else {
      if (displayedText.length > 0) {
        timeoutId = setTimeout(() => {
          setDisplayedText((prev) => prev.slice(0, -1));
        }, 50);
      } else {
        setCurrentIndex((prev) => (prev + 1) % cyclingWords.length);
        setIsTyping(true);
      }
    }
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [currentIndex, displayedText, isTyping]);

  useEffect(() => {
    const cursorInterval = setInterval(() => setShowCursor((p) => !p), 530);
    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <motion.h1
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.3 }}
      style={{
        fontSize: "clamp(3rem, 7vw, 6rem)",
        fontWeight: 700,
        letterSpacing: "-0.03em",
        marginBottom: "1.5rem",
        lineHeight: "1.1",
        fontFamily: "var(--font-headline), sans-serif",
        position: "relative",
        display: "inline-block",
      }}
    >
      <span
        style={{
          color: "#ffffff",
          WebkitTextStroke: "2px #000000",
          textShadow:
            "-1px -1px 0 #000000, 1px -1px 0 #000000, -1px 1px 0 #000000, 1px 1px 0 #000000",
        }}
      >
        We animate{" "}
        <span
          style={{
            display: "inline-block",
            width: "clamp(180px, 22vw, 260px)",
            textAlign: "left",
            verticalAlign: "baseline",
            position: "relative",
          }}
        >
          <span
            style={{
              display: "inline-block",
              color: "#C41E3A",
              fontWeight: 700,
              whiteSpace: "nowrap",
              borderBottom: "3px solid #C41E3A",
              paddingBottom: "0.05em",
              minHeight: "1.2em",
              minWidth: displayedText.length > 0 ? "auto" : "3px",
            }}
          >
            {displayedText}
            <span
              style={{
                display: "inline-block",
                width: "3px",
                height: "0.9em",
                backgroundColor: "#C41E3A",
                marginLeft: "2px",
                verticalAlign: "baseline",
                lineHeight: "1",
                opacity: showCursor ? 1 : 0,
                transition: "opacity 0.1s ease",
              }}
            />
          </span>
        </span>
      </span>
    </motion.h1>
  );
}

// ─── Main Hero Overlay ───────────────────────────────────────
export default function Overlay() {
  const [showreelOpen, setShowreelOpen] = useState(false);

  return (
    <>
      <ShowreelModal
        isOpen={showreelOpen}
        onClose={() => setShowreelOpen(false)}
      />

      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 10,
          padding: "1.5rem",
        }}
      >
        <div
          style={{
            textAlign: "center",
            pointerEvents: "auto",
            maxWidth: "1200px",
            width: "100%",
          }}
        >
          {/* Eyebrow label */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.6rem",
              marginBottom: "1.5rem",
              padding: "0.4rem 1.1rem",
              borderRadius: "100px",
              border: "1px solid rgba(196, 30, 58, 0.4)",
              backgroundColor: "rgba(196, 30, 58, 0.08)",
              backdropFilter: "blur(12px)",
            }}
          >
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                backgroundColor: "#C41E3A",
                display: "inline-block",
                boxShadow: "0 0 6px #C41E3A",
              }}
            />
            <span
              style={{
                fontSize: "0.75rem",
                fontWeight: 600,
                color: "rgba(255,255,255,0.85)",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                fontFamily: "var(--font-poppins), sans-serif",
              }}
            >
              3D Animation &amp; Visual Production Studio
            </span>
          </motion.div>

          {/* Cycling Title */}
          <CyclingTitle />

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            style={{
              fontSize: "clamp(1.05rem, 2vw, 1.35rem)",
              marginBottom: "2.5rem",
              maxWidth: "700px",
              marginLeft: "auto",
              marginRight: "auto",
              lineHeight: "1.75",
              fontWeight: 400,
              fontFamily: "var(--font-poppins), sans-serif",
              color: "rgba(255,255,255,0.75)",
            }}
          >
            We craft cinematic animation, explainer videos, and digital
            characters that help brands tell unforgettable stories.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            style={{
              display: "flex",
              gap: "1.25rem",
              justifyContent: "center",
              flexWrap: "wrap",
              marginBottom: "2.5rem",
            }}
          >
            {/* Primary: Watch Showreel */}
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 15px 50px rgba(196, 30, 58, 0.6)",
              }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowreelOpen(true)}
              style={{
                padding: "1.1rem 2.25rem",
                fontSize: "clamp(0.95rem, 1.4vw, 1.1rem)",
                fontWeight: 700,
                color: "#ffffff",
                background: "linear-gradient(135deg, #C41E3A, #991B1B)",
                border: "none",
                borderRadius: "50px",
                cursor: "pointer",
                letterSpacing: "0.05em",
                boxShadow:
                  "0 8px 30px rgba(196, 30, 58, 0.4), 0 0 40px rgba(196, 30, 58, 0.15)",
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                fontFamily: "var(--font-poppins), sans-serif",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M8 5V19L19 12L8 5Z"
                  fill="#ffffff"
                  stroke="#ffffff"
                  strokeWidth="1"
                />
              </svg>
              Watch Showreel
            </motion.button>

            {/* Secondary: Let's Talk */}
            <motion.button
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(255, 255, 255, 0.18)",
                boxShadow: "0 10px 40px rgba(255, 255, 255, 0.15)",
              }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                const contactSection = document.getElementById("contact");
                if (contactSection) {
                  const targetPosition = contactSection.offsetTop;
                  const startPosition = window.pageYOffset;
                  const distance = targetPosition - startPosition;
                  const duration = 1000;
                  let start: number | null = null;
                  const easeInOutCubic = (t: number) =>
                    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
                  const animateScroll = (timestamp: number) => {
                    if (!start) start = timestamp;
                    const progress = timestamp - start;
                    const ratio = easeInOutCubic(Math.min(progress / duration, 1));
                    window.scrollTo(0, startPosition + distance * ratio);
                    if (progress < duration) requestAnimationFrame(animateScroll);
                  };
                  requestAnimationFrame(animateScroll);
                }
              }}
              style={{
                padding: "1.1rem 2.25rem",
                fontSize: "clamp(0.95rem, 1.4vw, 1.1rem)",
                fontWeight: 600,
                color: "#ffffff",
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                border: "1.5px solid rgba(255, 255, 255, 0.35)",
                borderRadius: "50px",
                cursor: "pointer",
                backdropFilter: "blur(10px)",
                boxShadow: "0 4px 20px rgba(255, 255, 255, 0.06)",
                fontFamily: "var(--font-poppins), sans-serif",
              }}
            >
              Start a Project
            </motion.button>
          </motion.div>

          {/* Studio Stats */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            style={{
              display: "flex",
              gap: "0",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "1.75rem",
              flexWrap: "wrap",
            }}
          >
            {STUDIO_STATS.map((stat, i) => (
              <div
                key={stat.value}
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    textAlign: "center",
                    padding: "0 1.5rem",
                  }}
                >
                  <span
                    style={{
                      fontSize: "clamp(1.1rem, 1.8vw, 1.4rem)",
                      fontWeight: 800,
                      color: "#fff",
                      fontFamily: "var(--font-headline), sans-serif",
                      display: "block",
                      lineHeight: 1.1,
                    }}
                  >
                    {stat.value}
                  </span>
                  <span
                    style={{
                      fontSize: "0.65rem",
                      color: "rgba(255,255,255,0.4)",
                      textTransform: "uppercase",
                      letterSpacing: "0.12em",
                      fontFamily: "var(--font-poppins), sans-serif",
                      display: "block",
                      marginTop: "0.2rem",
                    }}
                  >
                    {stat.label}
                  </span>
                </div>
                {i < STUDIO_STATS.length - 1 && (
                  <div
                    style={{
                      width: "1px",
                      height: "2rem",
                      backgroundColor: "rgba(255,255,255,0.12)",
                    }}
                  />
                )}
              </div>
            ))}
          </motion.div>

          {/* Instagram Link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.1 }}
          >
            <motion.a
              href="https://www.instagram.com/supreme_animation_studio/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                color: "rgba(255, 255, 255, 0.6)",
                textDecoration: "none",
                fontSize: "clamp(0.82rem, 1.1vw, 0.9rem)",
                fontWeight: 500,
                fontFamily: "var(--font-poppins), sans-serif",
              }}
            >
              <span>See our latest work on</span>
              <span style={{ color: "#C41E3A", fontWeight: 600 }}>
                Instagram
              </span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
                  fill="currentColor"
                />
              </svg>
            </motion.a>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
          style={{
            position: "absolute",
            bottom: "3rem",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <motion.p
            animate={{ opacity: [0.4, 0.9, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{
              fontSize: "0.75rem",
              color: "rgba(255, 255, 255, 0.5)",
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              fontFamily: "var(--font-poppins), sans-serif",
            }}
          >
            Scroll
          </motion.p>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{
              width: "2px",
              height: "28px",
              background: "linear-gradient(to bottom, transparent, #C41E3A)",
              borderRadius: "2px",
            }}
          />
        </motion.div>
      </div>
    </>
  );
}
