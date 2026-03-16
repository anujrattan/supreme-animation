"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Heart, Users } from "lucide-react";

const stats = [
  { value: "2016", label: "Founded" },
  { value: "50+", label: "Projects Delivered" },
  { value: "5+", label: "Studio Specialists" },
  { value: "10+", label: "Industries Served" },
];

const values = [
  {
    id: "apart",
    icon: Sparkles,
    title: "What Sets Us Apart",
    description:
      "Traditional animation craft meets AI-enhanced workflows. The result: premium output, faster turnarounds, and more creative flexibility than studios twice our size.",
  },
  {
    id: "values",
    icon: Heart,
    title: "Our Values",
    description:
      "Craftsmanship, creative freedom, collaboration, and relentless innovation. We push boundaries while staying rooted in storytelling integrity and respect for our clients.",
  },
  {
    id: "culture",
    icon: Users,
    title: "Our Culture",
    description:
      "A tight-knit studio where every artist's voice matters. We combine curiosity, experimentation, and discipline to create meaningful work — and to genuinely enjoy doing it.",
  },
];

function StatBox({ stat, index }: { stat: (typeof stats)[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 + index * 0.08 }}
      viewport={{ once: true }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "1.25rem 1rem",
        borderRadius: "0.875rem",
        backgroundColor: hovered ? "#fafafa" : "#f5f5f8",
        border: `1px solid ${hovered ? "rgba(196,30,58,0.25)" : "rgba(0,0,0,0.07)"}`,
        boxShadow: hovered ? "0 8px 24px rgba(196,30,58,0.1)" : "none",
        transform: hovered ? "translateY(-3px)" : "none",
        transition: "all 0.3s ease",
        textAlign: "center",
      }}
    >
      <span
        style={{
          display: "block",
          fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
          fontWeight: 800,
          color: hovered ? "#C41E3A" : "#111",
          fontFamily: "var(--font-headline), sans-serif",
          lineHeight: 1.1,
          transition: "color 0.3s",
        }}
      >
        {stat.value}
      </span>
      <span
        style={{
          display: "block",
          fontSize: "0.72rem",
          color: "rgba(26,26,26,0.5)",
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          fontFamily: "var(--font-poppins), sans-serif",
          fontWeight: 500,
          marginTop: "0.3rem",
        }}
      >
        {stat.label}
      </span>
    </motion.div>
  );
}

function ValueRow({
  value,
  index,
}: {
  value: (typeof values)[0];
  index: number;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, x: 16 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
      viewport={{ once: true }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        gap: "1.1rem",
        padding: "1.25rem",
        borderRadius: "0.875rem",
        background: hovered
          ? "rgba(255,255,255,0.07)"
          : "rgba(255,255,255,0.03)",
        border: `1px solid ${hovered ? "rgba(196,30,58,0.3)" : "rgba(255,255,255,0.08)"}`,
        transition: "all 0.3s ease",
        cursor: "default",
      }}
    >
      <div
        style={{
          width: "40px",
          height: "40px",
          borderRadius: "0.625rem",
          background: hovered
            ? "rgba(196,30,58,0.2)"
            : "rgba(196,30,58,0.1)",
          border: "1px solid rgba(196,30,58,0.2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          transition: "all 0.3s ease",
        }}
      >
        <value.icon size={18} color="#C41E3A" strokeWidth={1.75} />
      </div>
      <div>
        <h4
          style={{
            fontSize: "0.9rem",
            fontWeight: 700,
            color: "#fff",
            margin: "0 0 0.35rem",
            fontFamily: "var(--font-headline), sans-serif",
          }}
        >
          {value.title}
        </h4>
        <p
          style={{
            fontSize: "0.825rem",
            color: hovered ? "rgba(255,255,255,0.65)" : "rgba(255,255,255,0.45)",
            lineHeight: 1.65,
            margin: 0,
            fontFamily: "var(--font-poppins), sans-serif",
            transition: "color 0.3s",
          }}
        >
          {value.description}
        </p>
      </div>
    </motion.div>
  );
}

export default function AboutSection() {
  return (
    <section
      style={{
        padding: "5.5rem 2rem 6rem",
        backgroundColor: "#ffffff",
        position: "relative",
        zIndex: 10,
      }}
    >
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "5rem",
          alignItems: "center",
        }}
        className="about-layout-grid"
      >
        {/* ── Left Column ── */}
        <div>
          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            style={{
              fontSize: "0.75rem",
              textTransform: "uppercase",
              letterSpacing: "0.28em",
              color: "#C41E3A",
              marginBottom: "0.875rem",
              fontWeight: 700,
              fontFamily: "var(--font-poppins), sans-serif",
            }}
          >
            About the Studio
          </motion.p>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
            style={{
              fontSize: "clamp(2rem, 3.5vw, 3.25rem)",
              fontWeight: 800,
              color: "#111",
              marginBottom: "1.5rem",
              fontFamily: "var(--font-headline), sans-serif",
              lineHeight: 1.1,
              letterSpacing: "-0.025em",
            }}
          >
            Built for Craft.{" "}
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #C41E3A, #d946ef)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Driven by Vision.
            </span>
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            style={{
              fontSize: "clamp(1rem, 1.3vw, 1.1rem)",
              lineHeight: 1.85,
              color: "rgba(26,26,26,0.65)",
              fontFamily: "var(--font-poppins), sans-serif",
              fontWeight: 400,
              marginBottom: "1.75rem",
            }}
          >
            Supreme Animation Studio is a specialist 3D animation house, founded in 2016. We&apos;re a lean, creative team of artists who move fast without sacrificing quality — combining deep technical skill with genuine storytelling passion.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            viewport={{ once: true }}
            style={{
              fontSize: "clamp(1rem, 1.3vw, 1.1rem)",
              lineHeight: 1.85,
              color: "rgba(26,26,26,0.65)",
              fontFamily: "var(--font-poppins), sans-serif",
              fontWeight: 400,
              marginBottom: "2.5rem",
            }}
          >
            We use AI-enhanced workflows to move faster without losing the human touch — giving clients premium results at competitive timelines. Alongside animation, we also build custom web and app experiences and AI-powered systems in-house, so clients can keep strategy, storytelling, and development under one roof.
          </motion.p>

          {/* Stats Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "0.75rem",
            }}
            className="about-stats-grid"
          >
            {stats.map((stat, i) => (
              <StatBox key={stat.label} stat={stat} index={i} />
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            viewport={{ once: true }}
            style={{ marginTop: "2rem" }}
          >
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                color: "#C41E3A",
                fontFamily: "var(--font-poppins), sans-serif",
                fontWeight: 700,
                fontSize: "0.875rem",
                textDecoration: "none",
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                transition: "gap 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.gap = "0.8rem";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.gap = "0.5rem";
              }}
            >
              Work With Us
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 12h14M12 5l7 7-7 7"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </motion.div>
        </div>

        {/* ── Right Column: Studio DNA Card ── */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.75, delay: 0.25 }}
          viewport={{ once: true }}
          style={{
            backgroundColor: "#09090f",
            borderRadius: "1.5rem",
            padding: "2.25rem",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 24px 64px rgba(0,0,0,0.18)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Ambient glow inside card */}
          <div
            style={{
              position: "absolute",
              top: "-20%",
              right: "-20%",
              width: "60%",
              height: "60%",
              background:
                "radial-gradient(ellipse, rgba(196,30,58,0.12) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />

          {/* Card Header */}
          <div style={{ position: "relative", marginBottom: "1.75rem" }}>
            <p
              style={{
                fontSize: "0.65rem",
                textTransform: "uppercase",
                letterSpacing: "0.25em",
                color: "#C41E3A",
                marginBottom: "0.4rem",
                fontWeight: 700,
                fontFamily: "var(--font-poppins), sans-serif",
              }}
            >
              Studio DNA
            </p>
            <h3
              style={{
                fontSize: "clamp(1.25rem, 2vw, 1.6rem)",
                fontWeight: 700,
                color: "#fff",
                margin: 0,
                fontFamily: "var(--font-headline), sans-serif",
                letterSpacing: "-0.015em",
              }}
            >
              What We Believe In
            </h3>
          </div>

          {/* Value Rows */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
              position: "relative",
            }}
          >
            {values.map((value, index) => (
              <ValueRow key={value.id} value={value} index={index} />
            ))}
          </div>

          {/* Bottom tag */}
          <div
            style={{
              marginTop: "1.75rem",
              paddingTop: "1.5rem",
              borderTop: "1px solid rgba(255,255,255,0.07)",
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
            }}
          >
            <span
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor: "#10B981",
                boxShadow: "0 0 8px #10B981",
                flexShrink: 0,
              }}
            />
            <p
              style={{
                fontSize: "0.8rem",
                color: "rgba(255,255,255,0.35)",
                margin: 0,
                fontFamily: "var(--font-poppins), sans-serif",
              }}
            >
              Actively taking on new projects — Est. 2016
            </p>
          </div>
        </motion.div>
      </div>

      {/* Responsive styles */}
      <style jsx global>{`
        @media (max-width: 900px) {
          .about-layout-grid {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
          .about-stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 480px) {
          .about-stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </section>
  );
}
