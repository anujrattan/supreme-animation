"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const partnerships = [
  {
    id: 1,
    name: "Partner 1",
    color: "#C41E3A", // Red
  },
  {
    id: 2,
    name: "Partner 2",
    color: "#1a1a1a", // Dark gray/black
  },
  {
    id: 3,
    name: "Partner 3",
    color: "#2563eb", // Blue
  },
  {
    id: 4,
    name: "Partner 4",
    color: "#059669", // Green
  },
  {
    id: 5,
    name: "Partner 5",
    color: "#7c3aed", // Purple
  },
  {
    id: 6,
    name: "Partner 6",
    color: "#dc2626", // Dark red
  },
];

export default function Partnerships() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-rotate carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % partnerships.length);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section
      style={{
        padding: "3rem 2rem",
        backgroundColor: "#fafafa",
        position: "relative",
        zIndex: 10,
        fontFamily: "var(--font-poppins), var(--font-manrope), sans-serif",
      }}
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        {/* Section Header with proper hierarchy */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          style={{
            textAlign: "center",
            marginBottom: "2.5rem",
          }}
        >
          {/* Eyebrow Text */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            style={{
              fontSize: "0.9rem",
              textTransform: "uppercase",
              letterSpacing: "0.25em",
              color: "#C41E3A",
              marginBottom: "0.75rem",
              fontWeight: 600,
              fontFamily: "var(--font-headline), sans-serif",
            }}
          >
            Our Partnerships
          </motion.p>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
            style={{
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              fontWeight: 700,
              color: "#1a1a1a",
              marginBottom: "0.75rem",
              fontFamily: "var(--font-headline), sans-serif",
              lineHeight: "1.2",
              letterSpacing: "-0.02em",
            }}
          >
            Trusted by Leading Brands
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            style={{
              fontSize: "clamp(1rem, 1.5vw, 1.25rem)",
              color: "rgba(26, 26, 26, 0.7)",
              maxWidth: "700px",
              margin: "0 auto",
              fontFamily: "var(--font-poppins), sans-serif",
              fontWeight: 400,
              lineHeight: "1.6",
            }}
          >
            We collaborate with innovative brands and studios worldwide to bring
            their creative visions to life.
          </motion.p>
        </motion.div>

        {/* Carousel */}
        <div
          style={{
            position: "relative",
            width: "100%",
            maxWidth: "1200px",
            margin: "0 auto",
            overflow: "hidden",
            borderRadius: "1.5rem",
          }}
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              paddingBottom: "56.25%", // 16:9 aspect ratio
              overflow: "hidden",
            }}
          >
            <AnimatePresence mode="wait">
              {partnerships.map((partner, index) => {
                if (index !== currentIndex) return null;

                return (
                  <motion.div
                    key={partner.id}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.5 }}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: partner.color,
                      borderRadius: "1.5rem",
                    }}
                  >
                    {/* Placeholder Image/Logo Area */}
                    <div
                      style={{
                        width: "80%",
                        maxWidth: "400px",
                        height: "60%",
                        backgroundColor: "rgba(255, 255, 255, 0.15)",
                        borderRadius: "1rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backdropFilter: "blur(10px)",
                        border: "2px solid rgba(255, 255, 255, 0.3)",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "clamp(2rem, 4vw, 3rem)",
                          fontWeight: 700,
                          color: "#ffffff",
                          fontFamily: "var(--font-headline), sans-serif",
                          textShadow: "0 2px 10px rgba(0, 0, 0, 0.3)",
                        }}
                      >
                        {partner.name}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Navigation Dots */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "0.75rem",
              marginTop: "2rem",
            }}
          >
            {partnerships.map((partner, index) => (
              <button
                key={partner.id}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
                style={{
                  width: currentIndex === index ? "2.5rem" : "0.75rem",
                  height: "0.75rem",
                  borderRadius: "999px",
                  border: "none",
                  backgroundColor:
                    currentIndex === index ? "#C41E3A" : "rgba(26, 26, 26, 0.2)",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  padding: 0,
                }}
                onMouseEnter={(e) => {
                  if (currentIndex !== index) {
                    e.currentTarget.style.backgroundColor = "rgba(26, 26, 26, 0.4)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (currentIndex !== index) {
                    e.currentTarget.style.backgroundColor = "rgba(26, 26, 26, 0.2)";
                  }
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

