"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Data ─────────────────────────────────────────────────────
const phases = [
  {
    id: "pre-production",
    label: "Pre-production",
    number: "01",
    shortDesc: "Brief → Script → Visuals",
    steps: [
      {
        number: "01",
        title: "Discovery & Strategy",
        description:
          "We start with an in-depth conversation to understand your vision, brand identity, target audience, and project goals. This collaborative foundation ensures every creative decision aligns with your objectives.",
      },
      {
        number: "02",
        title: "Script & Narrative",
        description:
          "Our writers craft concise, impactful scripts that deliver your message clearly and memorably. Each script includes visual direction notes, bridging the gap between words and imagery.",
      },
      {
        number: "03",
        title: "Visual Storytelling",
        description:
          "We translate the script into a visual narrative through storyboards — sequential frames that map out camera angles, composition, and pacing before a single frame is animated.",
      },
      {
        number: "04",
        title: "Audio Design",
        description:
          "We curate music and voice talent that match your brand's personality and amplify the emotional core of the narrative. The right audio elevates the entire experience.",
      },
      {
        number: "05",
        title: "Style Frames",
        description:
          "Key visual moments that define the aesthetic direction — establishing colour palettes, character designs, and visual language before full production begins.",
      },
    ],
  },
  {
    id: "production",
    label: "Production",
    number: "02",
    shortDesc: "Animatic → Art → Motion",
    steps: [
      {
        number: "06",
        title: "Timing & Motion Preview",
        description:
          "A rough animatic maps the rhythm, pacing, and flow of your animation. This timing blueprint lets you experience the structure and make adjustments before we commit to full animation.",
      },
      {
        number: "07",
        title: "Art Production",
        description:
          "Every visual element is polished to perfection. We refine character designs, environments, and assets to ensure visual consistency and premium quality throughout.",
      },
      {
        number: "08",
        title: "Animation & Motion",
        description:
          "Characters come alive, objects move with purpose, scenes flow seamlessly. Through frame-by-frame work and motion graphics, we transform static visuals into dynamic storytelling.",
      },
    ],
  },
  {
    id: "post-production",
    label: "Post-production",
    number: "03",
    shortDesc: "Mix → Grade → Deliver",
    steps: [
      {
        number: "09",
        title: "Audio Mixing & Sync",
        description:
          "We blend voiceover, music, and sound effects into a cohesive audio experience. Every element is precisely synchronised with the visuals to create seamless audio-visual harmony.",
      },
      {
        number: "10",
        title: "Final Output & Handoff",
        description:
          "Your completed animation is rendered at the highest quality, thoroughly reviewed, and delivered in all formats you need — ready to launch, share, and make an impact.",
      },
    ],
  },
];

const ACCENT = "#C41E3A";

// ─── Step Row (inside left panel) ─────────────────────────────
function StepRow({
  step,
  index,
  total,
  isActive,
  onClick,
}: {
  step: (typeof phases)[0]["steps"][0];
  index: number;
  total: number;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "1rem",
        width: "100%",
        textAlign: "left",
        background: "none",
        border: "none",
        cursor: "pointer",
        padding: "0",
        position: "relative",
      }}
    >
      {/* Connector line + circle */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flexShrink: 0,
          width: "28px",
        }}
      >
        <div
          style={{
            width: "28px",
            height: "28px",
            borderRadius: "50%",
            border: `2px solid ${isActive ? ACCENT : "rgba(255,255,255,0.18)"}`,
            backgroundColor: isActive ? ACCENT : "transparent",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.25s ease",
            boxShadow: isActive ? `0 0 14px ${ACCENT}60` : "none",
            flexShrink: 0,
          }}
        >
          <span
            style={{
              fontSize: "0.6rem",
              fontWeight: 800,
              color: isActive ? "#fff" : "rgba(255,255,255,0.4)",
              fontFamily: "var(--font-headline), sans-serif",
              lineHeight: 1,
            }}
          >
            {step.number}
          </span>
        </div>
        {/* vertical line between steps */}
        {index < total - 1 && (
          <div
            style={{
              width: "1px",
              flex: 1,
              minHeight: "20px",
              backgroundColor: isActive
                ? `${ACCENT}50`
                : "rgba(255,255,255,0.07)",
              marginTop: "3px",
              transition: "background 0.25s ease",
            }}
          />
        )}
      </div>

      {/* Step title */}
      <div style={{ paddingBottom: index < total - 1 ? "1.25rem" : 0 }}>
        <p
          style={{
            fontSize: "0.875rem",
            fontWeight: isActive ? 700 : 500,
            color: isActive ? "#ffffff" : "rgba(255,255,255,0.45)",
            fontFamily: "var(--font-poppins), sans-serif",
            margin: 0,
            lineHeight: 1.35,
            transition: "color 0.25s ease",
          }}
        >
          {step.title}
        </p>
      </div>
    </button>
  );
}

// ─── Main Component ────────────────────────────────────────────
export default function ProcessWorkflow() {
  const [activePhase, setActivePhase] = useState(phases[0].id);
  const [activeStep, setActiveStep] = useState(phases[0].steps[0].number);

  const currentPhase = phases.find((p) => p.id === activePhase)!;
  const currentStep =
    currentPhase.steps.find((s) => s.number === activeStep) ||
    currentPhase.steps[0];

  const handlePhaseChange = (id: string) => {
    const phase = phases.find((p) => p.id === id)!;
    setActivePhase(id);
    setActiveStep(phase.steps[0].number);
  };

  return (
    <section
      style={{
        padding: "5.5rem 2rem 6rem",
        background: "linear-gradient(180deg, #0d0d1a 0%, #07070e 100%)",
        position: "relative",
        zIndex: 10,
        overflow: "hidden",
      }}
    >
      {/* Dot grid texture */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.025) 1px, transparent 0)",
          backgroundSize: "48px 48px",
          pointerEvents: "none",
        }}
      />
      {/* Ambient glow */}
      <div
        style={{
          position: "absolute",
          bottom: "-10%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "70%",
          height: "50%",
          background:
            "radial-gradient(ellipse, rgba(196,30,58,0.05) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{ maxWidth: "1400px", margin: "0 auto", position: "relative" }}
      >
        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          style={{ marginBottom: "4rem" }}
        >
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            style={{
              fontSize: "0.75rem",
              textTransform: "uppercase",
              letterSpacing: "0.28em",
              color: ACCENT,
              marginBottom: "0.875rem",
              fontWeight: 700,
              fontFamily: "var(--font-poppins), sans-serif",
            }}
          >
            Our Process
          </motion.p>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              flexWrap: "wrap",
              gap: "1.5rem",
            }}
          >
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              viewport={{ once: true }}
              style={{
                fontSize: "clamp(2.25rem, 4.5vw, 3.75rem)",
                fontWeight: 800,
                color: "#fff",
                margin: 0,
                fontFamily: "var(--font-headline), sans-serif",
                lineHeight: 1.05,
                letterSpacing: "-0.025em",
              }}
            >
              From Concept{" "}
              <span
                style={{
                  background: `linear-gradient(135deg, ${ACCENT}, #d946ef)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                to Screen.
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              style={{
                fontSize: "clamp(0.9rem, 1.2vw, 1rem)",
                color: "rgba(255,255,255,0.4)",
                maxWidth: "420px",
                fontFamily: "var(--font-poppins), sans-serif",
                fontWeight: 400,
                lineHeight: 1.75,
                margin: 0,
              }}
            >
              A rigorous 10-step pipeline from brief to broadcast-ready — on
              time, on brief, and above expectation.
            </motion.p>
          </div>
        </motion.div>

        {/* ── Phase selector tabs ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "0.75rem",
            marginBottom: "3rem",
          }}
          className="process-phase-tabs"
        >
          {phases.map((phase, i) => {
            const isActive = activePhase === phase.id;
            return (
              <button
                key={phase.id}
                onClick={() => handlePhaseChange(phase.id)}
                style={{
                  padding: "1.25rem 1.5rem",
                  borderRadius: "1rem",
                  border: `1px solid ${isActive ? `${ACCENT}50` : "rgba(255,255,255,0.07)"}`,
                  backgroundColor: isActive
                    ? `${ACCENT}12`
                    : "rgba(255,255,255,0.025)",
                  backdropFilter: "blur(12px)",
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "all 0.25s ease",
                  boxShadow: isActive
                    ? `0 4px 24px ${ACCENT}20, inset 0 1px 0 ${ACCENT}18`
                    : "none",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Active glow stripe at top */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "2px",
                    background: isActive
                      ? `linear-gradient(90deg, ${ACCENT}, ${ACCENT}50)`
                      : "transparent",
                    transition: "background 0.25s ease",
                  }}
                />
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    marginBottom: "0.35rem",
                  }}
                >
                  <span
                    style={{
                      fontSize: "0.7rem",
                      fontWeight: 800,
                      color: isActive ? ACCENT : "rgba(255,255,255,0.2)",
                      fontFamily: "var(--font-headline), sans-serif",
                      letterSpacing: "0.06em",
                      transition: "color 0.25s ease",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div
                    style={{
                      flex: 1,
                      height: "1px",
                      backgroundColor: isActive
                        ? `${ACCENT}35`
                        : "rgba(255,255,255,0.07)",
                    }}
                  />
                </div>
                <p
                  style={{
                    fontSize: "clamp(0.95rem, 1.3vw, 1.05rem)",
                    fontWeight: 700,
                    color: isActive ? "#fff" : "rgba(255,255,255,0.4)",
                    fontFamily: "var(--font-headline), sans-serif",
                    margin: "0 0 0.2rem",
                    transition: "color 0.25s ease",
                  }}
                >
                  {phase.label}
                </p>
                <p
                  style={{
                    fontSize: "0.75rem",
                    color: isActive
                      ? "rgba(255,255,255,0.45)"
                      : "rgba(255,255,255,0.2)",
                    fontFamily: "var(--font-poppins), sans-serif",
                    margin: 0,
                    transition: "color 0.25s ease",
                  }}
                >
                  {phase.shortDesc}
                </p>
              </button>
            );
          })}
        </motion.div>

        {/* ── Main two-column panel ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activePhase}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            style={{
              display: "grid",
              gridTemplateColumns: "280px 1fr",
              gap: "2rem",
              alignItems: "start",
            }}
            className="process-main-grid"
          >
            {/* Left: step stepper */}
            <div
              style={{
                padding: "1.75rem",
                borderRadius: "1.25rem",
                background: "rgba(255,255,255,0.025)",
                border: "1px solid rgba(255,255,255,0.07)",
                backdropFilter: "blur(12px)",
                position: "sticky",
                top: "120px",
              }}
            >
              <p
                style={{
                  fontSize: "0.65rem",
                  fontWeight: 700,
                  color: ACCENT,
                  textTransform: "uppercase",
                  letterSpacing: "0.18em",
                  marginBottom: "1.5rem",
                  fontFamily: "var(--font-poppins), sans-serif",
                }}
              >
                {currentPhase.label} — {currentPhase.steps.length} Steps
              </p>

              <div style={{ display: "flex", flexDirection: "column" }}>
                {currentPhase.steps.map((step, idx) => (
                  <StepRow
                    key={step.number}
                    step={step}
                    index={idx}
                    total={currentPhase.steps.length}
                    isActive={activeStep === step.number}
                    onClick={() => setActiveStep(step.number)}
                  />
                ))}
              </div>
            </div>

            {/* Right: step detail */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.28 }}
                style={{
                  padding: "2.5rem",
                  borderRadius: "1.25rem",
                  background: "rgba(255,255,255,0.03)",
                  border: `1px solid rgba(255,255,255,0.07)`,
                  backdropFilter: "blur(16px)",
                  minHeight: "280px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Ambient glow on detail card */}
                <div
                  style={{
                    position: "absolute",
                    top: "-30%",
                    right: "-15%",
                    width: "50%",
                    height: "70%",
                    background: `radial-gradient(ellipse, ${ACCENT}0d 0%, transparent 70%)`,
                    pointerEvents: "none",
                  }}
                />

                <div style={{ position: "relative" }}>
                  {/* Big step number */}
                  <span
                    style={{
                      display: "block",
                      fontSize: "clamp(3.5rem, 6vw, 5rem)",
                      fontWeight: 900,
                      color: `${ACCENT}25`,
                      fontFamily: "var(--font-headline), sans-serif",
                      lineHeight: 1,
                      marginBottom: "1.25rem",
                      letterSpacing: "-0.04em",
                    }}
                  >
                    {currentStep.number}
                  </span>

                  {/* Phase badge */}
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.4rem",
                      padding: "0.25rem 0.75rem",
                      borderRadius: "100px",
                      border: `1px solid ${ACCENT}35`,
                      backgroundColor: `${ACCENT}10`,
                      fontSize: "0.68rem",
                      fontWeight: 700,
                      color: ACCENT,
                      textTransform: "uppercase",
                      letterSpacing: "0.12em",
                      fontFamily: "var(--font-poppins), sans-serif",
                      marginBottom: "1rem",
                    }}
                  >
                    <span
                      style={{
                        width: "5px",
                        height: "5px",
                        borderRadius: "50%",
                        backgroundColor: ACCENT,
                        boxShadow: `0 0 6px ${ACCENT}`,
                      }}
                    />
                    {currentPhase.label}
                  </span>

                  <h3
                    style={{
                      fontSize: "clamp(1.5rem, 2.5vw, 2.1rem)",
                      fontWeight: 800,
                      color: "#fff",
                      marginBottom: "1.25rem",
                      fontFamily: "var(--font-headline), sans-serif",
                      lineHeight: 1.15,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {currentStep.title}
                  </h3>

                  <p
                    style={{
                      fontSize: "clamp(0.95rem, 1.3vw, 1.05rem)",
                      color: "rgba(255,255,255,0.6)",
                      lineHeight: 1.8,
                      fontFamily: "var(--font-poppins), sans-serif",
                      fontWeight: 400,
                      maxWidth: "560px",
                    }}
                  >
                    {currentStep.description}
                  </p>
                </div>

                {/* Step navigation arrows */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginTop: "2rem",
                    paddingTop: "1.5rem",
                    borderTop: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <button
                    onClick={() => {
                      const idx = currentPhase.steps.findIndex(
                        (s) => s.number === activeStep
                      );
                      if (idx > 0)
                        setActiveStep(currentPhase.steps[idx - 1].number);
                    }}
                    disabled={
                      currentPhase.steps.findIndex(
                        (s) => s.number === activeStep
                      ) === 0
                    }
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      padding: "0.5rem 1rem",
                      borderRadius: "100px",
                      border: "1px solid rgba(255,255,255,0.1)",
                      backgroundColor: "transparent",
                      color: "rgba(255,255,255,0.4)",
                      fontSize: "0.8rem",
                      fontFamily: "var(--font-poppins), sans-serif",
                      cursor: "pointer",
                      transition: "all 0.2s",
                      opacity:
                        currentPhase.steps.findIndex(
                          (s) => s.number === activeStep
                        ) === 0
                          ? 0.3
                          : 1,
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M19 12H5M12 19l-7-7 7-7"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Previous
                  </button>

                  <span
                    style={{
                      fontSize: "0.75rem",
                      color: "rgba(255,255,255,0.2)",
                      fontFamily: "var(--font-poppins), sans-serif",
                    }}
                  >
                    {currentPhase.steps.findIndex(
                      (s) => s.number === activeStep
                    ) + 1}{" "}
                    / {currentPhase.steps.length}
                  </span>

                  <button
                    onClick={() => {
                      const idx = currentPhase.steps.findIndex(
                        (s) => s.number === activeStep
                      );
                      if (idx < currentPhase.steps.length - 1)
                        setActiveStep(currentPhase.steps[idx + 1].number);
                    }}
                    disabled={
                      currentPhase.steps.findIndex(
                        (s) => s.number === activeStep
                      ) ===
                      currentPhase.steps.length - 1
                    }
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      padding: "0.5rem 1rem",
                      borderRadius: "100px",
                      border: `1px solid ${ACCENT}40`,
                      backgroundColor: `${ACCENT}10`,
                      color: ACCENT,
                      fontSize: "0.8rem",
                      fontFamily: "var(--font-poppins), sans-serif",
                      cursor: "pointer",
                      transition: "all 0.2s",
                      opacity:
                        currentPhase.steps.findIndex(
                          (s) => s.number === activeStep
                        ) ===
                        currentPhase.steps.length - 1
                          ? 0.35
                          : 1,
                    }}
                  >
                    Next
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M5 12h14M12 5l7 7-7 7"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>

        {/* ── Bottom CTA ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          style={{
            textAlign: "center",
            marginTop: "4.5rem",
            paddingTop: "3rem",
            borderTop: "1px solid rgba(255,255,255,0.06)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1.25rem",
          }}
        >
          <p
            style={{
              fontSize: "0.9rem",
              color: "rgba(255,255,255,0.35)",
              fontFamily: "var(--font-poppins), sans-serif",
            }}
          >
            We typically begin within{" "}
            <strong style={{ color: "rgba(255,255,255,0.6)", fontWeight: 600 }}>
              5 business days
            </strong>{" "}
            of receiving your brief.
          </p>
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
              gap: "0.6rem",
              padding: "0.9rem 2.25rem",
              borderRadius: "100px",
              backgroundColor: ACCENT,
              color: "#fff",
              textDecoration: "none",
              fontWeight: 700,
              fontSize: "0.9rem",
              letterSpacing: "0.04em",
              fontFamily: "var(--font-poppins), sans-serif",
              boxShadow: `0 8px 30px ${ACCENT}45`,
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = `0 14px 40px ${ACCENT}60`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = `0 8px 30px ${ACCENT}45`;
            }}
          >
            Start Your Project
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M5 12h14M12 5l7 7-7 7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </motion.div>
      </div>

      {/* Responsive */}
      <style jsx global>{`
        @media (max-width: 900px) {
          .process-phase-tabs {
            grid-template-columns: 1fr !important;
          }
          .process-main-grid {
            grid-template-columns: 1fr !important;
          }
          .process-main-grid > :first-child {
            position: static !important;
          }
        }
        @media (max-width: 640px) {
          .process-phase-tabs {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
