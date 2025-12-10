"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const processPhases = [
  {
    id: "pre-production",
    title: "Pre-production",
    inactiveColor: "#C41E3A", // Red for inactive
    activeColor: "#8B1538", // Dark red/burgundy for active (complements red)
    steps: [
      {
        number: "1",
        title: "Discovery & Strategy",
        description:
          "We start with an in-depth conversation to understand your vision, brand identity, target audience, and project goals. This collaborative foundation ensures every creative decision aligns with your objectives and resonates with your viewers.",
      },
      {
        number: "2",
        title: "Script & Narrative",
        description:
          "Our writers craft concise, impactful scripts that deliver your message clearly and memorably. Each script includes visual direction notes, helping bridge the gap between words and imagery before we move into visual development.",
      },
      {
        number: "3",
        title: "Visual Storytelling",
        description:
          "We translate the script into a visual narrative through storyboards. These sequential frames map out camera angles, composition, and pacing, giving you a clear preview of how your story will unfold on screen.",
      },
      {
        number: "4",
        title: "Audio Design",
        description:
          "We curate music and voice talent that matches your brand's personality and amplifies the emotional core of your narrative. The right audio elevates the entire experience.",
      },
      {
        number: "5",
        title: "Style Frames",
        description:
          "We develop key visual moments that define the aesthetic direction of your project. These frames establish color palettes, character designs, and overall visual language before full production begins.",
      },
    ],
  },
  {
    id: "production",
    title: "Production",
    inactiveColor: "#C41E3A", // Red for inactive
    activeColor: "#8B1538", // Dark red/burgundy for active
    steps: [
      {
        number: "6",
        title: "Timing & Motion Preview",
        description:
          "We build a rough animatic that maps out the rhythm, pacing, and flow of your animation. This timing blueprint lets you experience the narrative structure and make adjustments before we invest in full animation.",
      },
      {
        number: "7",
        title: "Art Production",
        description:
          "Every visual element is polished to perfection. We refine character designs, environments, and assets to ensure visual consistency and premium quality throughout the entire piece.",
      },
      {
        number: "8",
        title: "Animation & Motion",
        description:
          "Characters come alive, objects move with purpose, and scenes flow seamlessly. Through careful frame-by-frame work and motion graphics, we transform static visuals into dynamic storytelling.",
      },
    ],
  },
  {
    id: "post-production",
    title: "Post-production",
    inactiveColor: "#C41E3A", // Red for inactive
    activeColor: "#8B1538", // Dark red/burgundy for active
    steps: [
      {
        number: "9",
        title: "Audio Mixing & Sync",
        description:
          "We blend voiceover, music, and sound effects into a cohesive audio experience. Every element is precisely synchronized with the visuals to create seamless audio-visual harmony.",
      },
      {
        number: "10",
        title: "Final Output & Handoff",
        description:
          "Your completed animation is rendered at the highest quality, thoroughly reviewed, and delivered in all the formats you need—ready to launch, share, and make an impact.",
      },
    ],
  },
];

export default function ProcessWorkflow() {
  const [activePhase, setActivePhase] = useState<string>("pre-production");

  return (
    <section
      style={{
        padding: "4rem 2rem",
        backgroundColor: "#f5f5f5",
        position: "relative",
        zIndex: 10,
        fontFamily: "var(--font-poppins), var(--font-manrope), sans-serif",
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
            marginBottom: "3rem",
            maxWidth: "900px",
            margin: "0 auto 3rem auto",
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
            Our Process
          </motion.p>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
            style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 700,
              color: "#1a1a1a",
              marginBottom: "0",
              fontFamily: "var(--font-headline), sans-serif",
              lineHeight: "1.2",
              letterSpacing: "-0.02em",
            }}
          >
            From Concept to Screen
          </motion.h2>
        </motion.div>

        {/* Header with Color-Coded Blocks - Clickable Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            marginBottom: "3rem",
            borderRadius: "0.5rem",
            overflow: "hidden",
          }}
        >
          {processPhases.map((phase, index) => {
            const isActive = activePhase === phase.id;
            return (
              <motion.button
                key={phase.id}
                initial={{ opacity: 0, x: index === 0 ? -20 : index === 2 ? 20 : 0 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                onClick={() => setActivePhase(phase.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  backgroundColor: isActive ? phase.activeColor : phase.inactiveColor,
                  padding: "1.5rem 2rem",
                  textAlign: "center",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  position: "relative",
                  font: "inherit",
                }}
              >
                <h3
                  style={{
                    fontSize: "clamp(1.1rem, 1.5vw, 1.5rem)",
                    fontWeight: 700,
                    color: "#ffffff",
                    margin: 0,
                    fontFamily: "var(--font-headline), sans-serif",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  {phase.title}
                </h3>
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: "4px",
                      backgroundColor: "#ffffff",
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Content Section - Show Only Active Phase */}
        <AnimatePresence mode="wait">
          {processPhases
            .filter((phase) => phase.id === activePhase)
            .map((phase) => (
              <motion.div
                key={phase.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                  gap: "2rem",
                }}
                className="process-content-grid"
              >
                {phase.steps.map((step, stepIndex) => (
                  <motion.div
                    key={step.number}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: stepIndex * 0.1 }}
                    style={{
                      padding: "1.5rem",
                      borderRadius: "0.75rem",
                      backgroundColor: "#ffffff",
                      border: "1px solid rgba(0, 0, 0, 0.05)",
                      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.03)",
                    }}
                  >
                    <h4
                      style={{
                        fontSize: "clamp(1.1rem, 1.3vw, 1.25rem)",
                        fontWeight: 700,
                        color: "#1a1a1a",
                        marginBottom: "0.75rem",
                        fontFamily: "var(--font-headline), sans-serif",
                        lineHeight: "1.3",
                      }}
                    >
                      {step.number}. {step.title}
                    </h4>
                    <p
                      style={{
                        fontSize: "0.95rem",
                        lineHeight: "1.7",
                        color: "rgba(26, 26, 26, 0.75)",
                        margin: 0,
                        fontFamily: "var(--font-poppins), sans-serif",
                        fontWeight: 400,
                      }}
                    >
                      {step.description}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            ))}
        </AnimatePresence>
      </div>

      {/* Responsive Styles */}
      <style jsx global>{`
        @media (max-width: 1023px) {
          .process-content-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .process-content-grid * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </section>
  );
}

