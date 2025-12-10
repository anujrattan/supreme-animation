"use client";

import { motion } from "framer-motion";
import { Sparkles, Heart, Users } from "lucide-react";

const tiles = [
  {
    id: "what-sets-us-apart",
    title: "What Sets Us Apart",
    description:
      "A rare blend of traditional animation mastery and advanced AI workflows — delivering high-quality results faster, smarter, and with more creative flexibility.",
    icon: Sparkles,
  },
  {
    id: "our-values",
    title: "Our Values",
    description:
      "Craftsmanship, creative freedom, collaboration, and innovation. We push boundaries while staying rooted in excellence and storytelling integrity.",
    icon: Heart,
  },
  {
    id: "our-culture",
    title: "Our Culture",
    description:
      "A tight-knit studio where every artist's voice matters. We combine curiosity, experimentation, and discipline to create meaningful work together.",
    icon: Users,
  },
];

export default function AboutSection() {
  return (
    <section
      style={{
        padding: "5rem 2rem",
        backgroundColor: "#ffffff",
        position: "relative",
        zIndex: 10,
        fontFamily: "var(--font-poppins), var(--font-manrope), sans-serif",
      }}
    >
      <div style={{ maxWidth: "1152px", margin: "0 auto" }}>
        {/* Top Part: Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          style={{
            textAlign: "center",
            marginBottom: "4rem",
            maxWidth: "900px",
            margin: "0 auto 4rem auto",
          }}
        >
          {/* Section Heading */}
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
            About the Studio
          </motion.p>

          {/* Subheading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
            style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 700,
              color: "#1a1a1a",
              marginBottom: "1.5rem",
              fontFamily: "var(--font-headline), sans-serif",
              lineHeight: "1.2",
              letterSpacing: "-0.02em",
            }}
          >
            Where Creative Vision Meets Technical Excellence
          </motion.h2>

          {/* Paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            style={{
              fontSize: "clamp(1rem, 1.3vw, 1.15rem)",
              lineHeight: "1.8",
              color: "rgba(26, 26, 26, 0.8)",
              fontFamily: "var(--font-poppins), sans-serif",
              fontWeight: 400,
            }}
          >
            Supreme Animation blends artistic craftsmanship with innovative
            technology to create stories that move, engage, and inspire. Founded
            in 2021, the studio was built on a passion for creative freedom and
            the desire to explore new ways of storytelling.
            <br />
            <br />
            Our five-member team brings over a decade of combined experience to
            every project — from character-driven narratives to advanced animation
            workflows. With the rise of AI-enhanced pipelines, we're embracing new
            creative possibilities while maintaining the soul and quality of
            traditional artistry.
          </motion.p>
        </motion.div>

        {/* Bottom Part: Three Interactive Tiles */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "1.5rem",
          }}
          className="about-tiles-grid"
        >
          {tiles.map((tile, index) => (
            <motion.div
              key={tile.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -3 }}
              style={{
                padding: "2.5rem",
                borderRadius: "1rem",
                border: "1px solid rgba(0, 0, 0, 0.08)",
                background: "linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(250, 250, 250, 0.9))",
                boxShadow: "0 2px 12px rgba(0, 0, 0, 0.04), 0 0 0 1px rgba(0, 0, 0, 0.02)",
                cursor: "pointer",
                transition: "all 0.3s ease",
                position: "relative",
                overflow: "hidden",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 12px 40px rgba(196, 30, 58, 0.15), 0 0 0 1px rgba(196, 30, 58, 0.2)";
                e.currentTarget.style.borderColor = "rgba(196, 30, 58, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 2px 12px rgba(0, 0, 0, 0.04), 0 0 0 1px rgba(0, 0, 0, 0.02)";
                e.currentTarget.style.borderColor = "rgba(0, 0, 0, 0.08)";
              }}
            >
              {/* Icon */}
              <motion.div
                whileHover={{ rotate: 6 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                style={{
                  width: "64px",
                  height: "64px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "1rem",
                  background:
                    "linear-gradient(135deg, rgba(196, 30, 58, 0.1), rgba(217, 70, 239, 0.1))",
                  marginBottom: "1.5rem",
                }}
              >
                <tile.icon size={32} color="#C41E3A" />
              </motion.div>

              {/* Title */}
              <h3
                style={{
                  fontSize: "clamp(1.25rem, 1.5vw, 1.5rem)",
                  fontWeight: 700,
                  color: "#1a1a1a",
                  marginBottom: "1rem",
                  fontFamily: "var(--font-headline), sans-serif",
                  lineHeight: "1.3",
                }}
              >
                {tile.title}
              </h3>

              {/* Description */}
              <p
                style={{
                  fontSize: "1rem",
                  lineHeight: "1.7",
                  color: "rgba(26, 26, 26, 0.75)",
                  fontFamily: "var(--font-poppins), sans-serif",
                  fontWeight: 400,
                  margin: 0,
                }}
              >
                {tile.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Responsive Styles */}
      <style jsx global>{`
        @media (min-width: 768px) and (max-width: 1023px) {
          .about-tiles-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 767px) {
          .about-tiles-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .about-tiles-grid * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </section>
  );
}

