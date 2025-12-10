"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";

// Cycling Title Component - Typewriter Animation
function CyclingTitle() {
  const cyclingWords = ["ideas", "brands", "the future"];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [showCursor, setShowCursor] = useState(true);

  // Reset displayed text when word changes
  useEffect(() => {
    setDisplayedText("");
    setIsTyping(true);
  }, [currentIndex]);

  // Typewriter effect
  useEffect(() => {
    const currentWord = cyclingWords[currentIndex];
    if (!currentWord) return;

    let timeoutId: NodeJS.Timeout;

    if (isTyping) {
      // Typing phase: add one letter at a time
      if (displayedText.length < currentWord.length) {
        timeoutId = setTimeout(() => {
          setDisplayedText(currentWord.slice(0, displayedText.length + 1));
        }, 100); // Typing speed: 100ms per letter
      } else {
        // Finished typing, wait a bit before erasing
        timeoutId = setTimeout(() => {
          setIsTyping(false);
        }, 1500); // Pause after typing complete
      }
    } else {
      // Erasing phase: remove one letter at a time (2x speed)
      if (displayedText.length > 0) {
        timeoutId = setTimeout(() => {
          setDisplayedText((prev) => prev.slice(0, -1));
        }, 50); // Erasing speed: 50ms per letter (2x faster)
      } else {
        // Finished erasing, move to next word
        setCurrentIndex((prev) => (prev + 1) % cyclingWords.length);
        setIsTyping(true);
      }
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [currentIndex, displayedText, isTyping]);

  // Blinking cursor animation
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530); // Blink every 530ms

    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <motion.h1
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.2 }}
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
      <span style={{ color: "#ffffff" }}>
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

export default function Overlay() {
  return (
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
      {/* Logo - Top Left - Static and Animated Side by Side */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        style={{
          position: "absolute",
          top: "clamp(1rem, 3vw, 2rem)",
          left: "clamp(1rem, 3vw, 2rem)",
          zIndex: 20,
          pointerEvents: "auto",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "1.5rem",
          flexWrap: "nowrap",
        }}
      >
        {/* Static Logo */}
        <motion.a
          href="#"
          whileHover={{ scale: 1.05 }}
          style={{
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <Image
            src="/Supreme Animation - Logo - No bg.png"
            alt="Supreme Animation Studio Logo - Static"
            width={150}
            height={60}
            style={{
              width: "clamp(100px, 15vw, 150px)",
              height: "auto",
              objectFit: "contain",
              filter: "drop-shadow(0 2px 10px rgba(0, 0, 0, 0.3))",
              display: "block",
            }}
            priority
          />
        </motion.a>
      </motion.div>
      <div
        style={{
          textAlign: "center",
          pointerEvents: "auto",
          maxWidth: "1200px",
          width: "100%",
        }}
      >
        {/* Cycling Title - Smooth & Modern */}
        <CyclingTitle />

        {/* Subtitle - With Red Accent */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{
            fontSize: "clamp(1.1rem, 2.2vw, 1.5rem)",
            marginBottom: "2.5rem",
            maxWidth: "800px",
            marginLeft: "auto",
            marginRight: "auto",
            lineHeight: "1.7",
            fontWeight: 400,
            fontFamily: "var(--font-poppins), sans-serif",
            color: "#ffffff",
          }}
        >
          Blending AI and artistry to move{" "}
          <span style={{ color: "#C41E3A", fontWeight: 600 }}>
            Supreme Animation
          </span>{" "}
          Studio brings ideas to life with emotion, turning vision into
          captivating motion.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          style={{
            display: "flex",
            gap: "1.5rem",
            justifyContent: "center",
            flexWrap: "wrap",
            marginBottom: "2rem",
          }}
        >
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0 15px 50px rgba(196, 30, 58, 0.6)",
            }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              // Add showreel video action here
            }}
            style={{
              padding: "1.25rem 2.5rem",
              fontSize: "clamp(1rem, 1.5vw, 1.125rem)",
              fontWeight: 700,
              color: "#ffffff",
              background: "linear-gradient(135deg, #C41E3A, #991B1B)",
              border: "none",
              borderRadius: "50px",
              cursor: "pointer",
              transition: "all 0.3s ease",
              letterSpacing: "0.05em",
              boxShadow:
                "0 8px 30px rgba(196, 30, 58, 0.4), 0 0 40px rgba(196, 30, 58, 0.2)",
              position: "relative",
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
            }}
          >
            <motion.svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2 }}
            >
              <path
                d="M8 5V19L19 12L8 5Z"
                fill="#ffffff"
                stroke="#ffffff"
                strokeWidth="1"
              />
            </motion.svg>
            <span style={{ position: "relative", zIndex: 1 }}>
              Watch Showreel 2024
            </span>
          </motion.button>

          <motion.button
            whileHover={{
              scale: 1.05,
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              boxShadow: "0 10px 40px rgba(255, 255, 255, 0.2)",
            }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              const contactSection = document.getElementById("contact");
              if (contactSection) {
                const targetPosition = contactSection.offsetTop;
                const startPosition = window.pageYOffset;
                const distance = targetPosition - startPosition;
                const duration = 1000; // 1 second for smooth scroll
                let start: number | null = null;

                const easeInOutCubic = (t: number): number => {
                  return t < 0.5
                    ? 4 * t * t * t
                    : 1 - Math.pow(-2 * t + 2, 3) / 2;
                };

                const animateScroll = (timestamp: number) => {
                  if (!start) start = timestamp;
                  const progress = timestamp - start;
                  const progressRatio = Math.min(progress / duration, 1);
                  const easedProgress = easeInOutCubic(progressRatio);

                  window.scrollTo(0, startPosition + distance * easedProgress);

                  if (progress < duration) {
                    requestAnimationFrame(animateScroll);
                  }
                };

                requestAnimationFrame(animateScroll);
              }
            }}
            style={{
              padding: "1.25rem 2.5rem",
              fontSize: "clamp(1rem, 1.5vw, 1.125rem)",
              fontWeight: 600,
              color: "#ffffff",
              backgroundColor: "rgba(255, 255, 255, 0.15)",
              border: "2px solid rgba(255, 255, 255, 0.4)",
              borderRadius: "50px",
              cursor: "pointer",
              transition: "all 0.3s ease",
              backdropFilter: "blur(10px)",
              boxShadow: "0 4px 20px rgba(255, 255, 255, 0.1)",
              textShadow: "0 2px 10px rgba(0, 0, 0, 0.3)",
            }}
          >
            Let's Talk
          </motion.button>
        </motion.div>

        {/* Social Media Link - Like Studio Pigeon */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          style={{
            marginTop: "1rem",
          }}
        >
          <motion.a
            href="https://instagram.com/supremeanimation"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              color: "rgba(255, 255, 255, 0.8)",
              textDecoration: "none",
              fontSize: "clamp(0.9rem, 1.2vw, 1rem)",
              fontWeight: 500,
            }}
          >
            <span>Get regular, moving updates on our work –</span>
            <span style={{ color: "#C41E3A", fontWeight: 600 }}>
              follow us on Instagram
            </span>
            <motion.svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              whileHover={{ rotate: 15 }}
            >
              <path
                d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
                fill="currentColor"
              />
            </motion.svg>
          </motion.a>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
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
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{
              fontSize: "0.875rem",
              color: "rgba(255, 255, 255, 0.6)",
              textTransform: "uppercase",
              letterSpacing: "0.2em",
            }}
          >
            Scroll
          </motion.p>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{
              width: "2px",
              height: "30px",
              background: "linear-gradient(to bottom, transparent, #C41E3A)",
              borderRadius: "2px",
            }}
          />
        </motion.div>
      </div>
    </div>
  );
}
