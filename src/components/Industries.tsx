"use client";

import { motion } from "framer-motion";
import {
  Leaf,
  Trophy,
  GraduationCap,
  Gamepad2,
  Shield,
  Heart,
  Stethoscope,
  ShoppingCart,
  DollarSign,
  Home,
} from "lucide-react";

type Industry = {
  id: string;
  name: string;
  icon: React.ComponentType<{ size?: number; color?: string }>;
  color: string;
  iconColor: string;
};

const industries: Industry[] = [
  {
    id: "climate-change",
    name: "Kids Animated Rhymes Videos",
    icon: Leaf,
    color: "#10B981",
    iconColor: "#059669",
  },
  {
    id: "sports",
    name: "Sports Promos & Motion",
    icon: Trophy,
    color: "#F59E0B",
    iconColor: "#D97706",
  },
  {
    id: "education",
    name: "Education Explainer Videos",
    icon: GraduationCap,
    color: "#3B82F6",
    iconColor: "#2563EB",
  },
  {
    id: "video-games",
    name: "Game Trailers & Cinematics",
    icon: Gamepad2,
    color: "#8B5CF6",
    iconColor: "#7C3AED",
  },
  {
    id: "insurance",
    name: "Insurance & InsurTech Explainers",
    icon: Shield,
    color: "#6366F1",
    iconColor: "#4F46E5",
  },
  {
    id: "social-justice",
    name: "Social Impact Storytelling",
    icon: Heart,
    color: "#EC4899",
    iconColor: "#DB2777",
  },
  {
    id: "healthcare",
    name: "Healthcare Explainers & Demos",
    icon: Stethoscope,
    color: "#EF4444",
    iconColor: "#DC2626",
  },
  {
    id: "ecommerce",
    name: "Ecommerce Product Videos",
    icon: ShoppingCart,
    color: "#14B8A6",
    iconColor: "#0D9488",
  },
  {
    id: "finance",
    name: "Finance & FinTech Explainers",
    icon: DollarSign,
    color: "#F97316",
    iconColor: "#EA580C",
  },
  {
    id: "real-estate",
    name: "Real Estate Walkthroughs & ArchViz",
    icon: Home,
    color: "#06B6D4",
    iconColor: "#0891B2",
  },
];

export default function Industries() {

  return (
    <section
      style={{
        padding: "clamp(2.5rem, 5vw, 4rem) clamp(1rem, 3vw, 2rem)",
        backgroundColor: "#f9f9f9",
        position: "relative",
        zIndex: 10,
        fontFamily: "var(--font-poppins), var(--font-manrope), sans-serif",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          style={{
            textAlign: "center",
            marginBottom: "clamp(2rem, 4vw, 4rem)",
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
            Industries We Serve
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
            Diverse Industries, One Mission
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
            We bring animation expertise to a wide range of industries, helping
            brands tell their stories through compelling visual narratives.
          </motion.p>
        </motion.div>

        {/* Floating Bubbles Container - Bento Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gridTemplateRows: "repeat(3, auto)",
            gap: "clamp(1rem, 2vw, 1.5rem)",
            position: "relative",
            margin: "clamp(1.5rem, 3vw, 2rem) 0",
          }}
          className="industries-bento-grid"
        >
          {industries.map((industry, index) => {
            // Create unique floating animation delays and patterns
            const floatDelay = index * 0.3;
            const floatDuration = 5 + (index % 4) * 0.8; // Vary between 5-7.4s for slow, readable motion
            const wobbleDelay = index * 0.25;
            const wobbleDuration = 4 + (index % 3) * 1; // Vary between 4-6s

            // Bento grid sizing - create varied sizes
            const getBentoSize = (idx: number) => {
              const sizes = [
                { col: "span 1", row: "span 1" }, // 0
                { col: "span 1", row: "span 1" }, // 1
                { col: "span 1", row: "span 1" }, // 2
                { col: "span 1", row: "span 1" }, // 3
                { col: "span 2", row: "span 1" }, // 4 - wider
                { col: "span 1", row: "span 1" }, // 5
                { col: "span 1", row: "span 1" }, // 6
                { col: "span 1", row: "span 2" }, // 7 - taller
                { col: "span 1", row: "span 1" }, // 8
                { col: "span 2", row: "span 1" }, // 9 - wider
              ];
              return sizes[idx % sizes.length];
            };

            const bentoSize = getBentoSize(index);

            return (
              <motion.div
                key={industry.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{
                  opacity: 1,
                  // Vertical floating
                  y: [
                    0,
                    -12 + (index % 4) * 2,
                    0,
                    -8 + (index % 3) * 1.5,
                    0,
                  ],
                  // Horizontal wobble (left and right)
                  x: [
                    0,
                    8 - (index % 3) * 2,
                    -6 + (index % 2) * 1.5,
                    6 - (index % 4) * 1,
                    0,
                  ],
                  // Scale up and down (shrink)
                  scale: [
                    1,
                    0.96 - (index % 3) * 0.01,
                    1.02 + (index % 2) * 0.01,
                    0.98 - (index % 4) * 0.005,
                    1,
                  ],
                  // Subtle rotation for wobble effect
                  rotate: [
                    0,
                    -1.5 + (index % 3) * 0.5,
                    1 - (index % 2) * 0.3,
                    -0.8 + (index % 4) * 0.2,
                    0,
                  ],
                }}
                transition={{
                  opacity: { duration: 0.6, delay: index * 0.1 },
                  y: {
                    duration: floatDuration,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: floatDelay,
                  },
                  x: {
                    duration: floatDuration,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: floatDelay,
                  },
                  scale: {
                    duration: floatDuration,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: floatDelay,
                  },
                  rotate: {
                    duration: floatDuration,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: floatDelay,
                  },
                }}
                whileHover={{ scale: 1.08, y: -6 }}
                style={{
                  cursor: "pointer",
                  position: "relative",
                  gridColumn: bentoSize.col,
                  gridRow: bentoSize.row,
                  opacity: 1, // Ensure it stays visible
                }}
              >
                <div
                  style={{
                    padding: "clamp(1.5rem, 3vw, 2rem) clamp(1.25rem, 2.5vw, 1.75rem)",
                    borderRadius: "clamp(1rem, 2vw, 1.5rem)",
                    border: `2px solid ${industry.color}40`,
                    background: `linear-gradient(135deg, ${industry.color}12, ${industry.color}06)`,
                    boxShadow: `0 8px 32px ${industry.color}25, 0 2px 8px rgba(0, 0, 0, 0.08)`,
                    backdropFilter: "blur(10px)",
                    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                    position: "relative",
                    overflow: "hidden",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = `0 16px 48px ${industry.color}40, 0 4px 16px rgba(0, 0, 0, 0.12)`;
                    e.currentTarget.style.borderColor = `${industry.color}70`;
                    e.currentTarget.style.background = `linear-gradient(135deg, ${industry.color}20, ${industry.color}12)`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = `0 8px 32px ${industry.color}25, 0 2px 8px rgba(0, 0, 0, 0.08)`;
                    e.currentTarget.style.borderColor = `${industry.color}40`;
                    e.currentTarget.style.background = `linear-gradient(135deg, ${industry.color}12, ${industry.color}06)`;
                  }}
                >
                  {/* Animated background gradient */}
                  <motion.div
                    animate={{
                      background: [
                        `linear-gradient(135deg, ${industry.color}15, ${industry.color}08)`,
                        `linear-gradient(135deg, ${industry.color}25, ${industry.color}15)`,
                        `linear-gradient(135deg, ${industry.color}15, ${industry.color}08)`,
                      ],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      zIndex: 0,
                      opacity: 0.6,
                    }}
                  />

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "1.25rem",
                      position: "relative",
                      zIndex: 1,
                    }}
                  >
                    {/* Colorful Icon with subtle wobble */}
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.15 }}
                      animate={{
                        rotate: [
                          0,
                          3 - (index % 3) * 1,
                          -2 + (index % 2) * 0.5,
                          0,
                        ],
                        scale: [
                          1,
                          1.03,
                          0.97,
                          1,
                        ],
                      }}
                      transition={{
                        duration: wobbleDuration,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: wobbleDelay,
                      }}
                      style={{
                        width: "clamp(56px, 8vw, 72px)",
                        height: "clamp(56px, 8vw, 72px)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "clamp(0.75rem, 1.5vw, 1.25rem)",
                        background: `linear-gradient(135deg, ${industry.color}, ${industry.iconColor})`,
                        boxShadow: `0 6px 20px ${industry.color}50, 0 2px 8px ${industry.color}30`,
                      }}
                    >
                      <div style={{ width: "clamp(28px, 4.5vw, 36px)", height: "clamp(28px, 4.5vw, 36px)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <industry.icon 
                          size={36} 
                          color="#ffffff"
                        />
                      </div>
                    </motion.div>

                    {/* Industry Name */}
                    <h3
                      style={{
                        fontSize: "clamp(1.1rem, 1.3vw, 1.25rem)",
                        fontWeight: 700,
                        color: "#1a1a1a",
                        margin: 0,
                        lineHeight: "1.3",
                        fontFamily: "var(--font-headline), sans-serif",
                        textAlign: "center",
                      }}
                    >
                      {industry.name}
                    </h3>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Responsive Bento Grid Styles */}
      <style jsx global>{`
        .industries-bento-grid {
          grid-template-columns: repeat(4, 1fr) !important;
        }
        .industries-bento-grid > * {
          min-height: 200px;
        }
        @media (max-width: 1200px) {
          .industries-bento-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
        @media (max-width: 900px) {
          .industries-bento-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 1.25rem !important;
          }
          .industries-bento-grid > * {
            grid-column: span 1 !important;
            grid-row: span 1 !important;
            min-height: 180px;
          }
        }
        @media (max-width: 640px) {
          .industries-bento-grid {
            grid-template-columns: 1fr !important;
            gap: 1rem !important;
          }
          .industries-bento-grid > * {
            grid-column: span 1 !important;
            grid-row: span 1 !important;
            min-height: 160px;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .industries-bento-grid > * {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}

