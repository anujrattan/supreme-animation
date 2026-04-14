"use client";

import { motion } from "framer-motion";
import ContactForm from "./ContactForm";

const trustSignals = [
  { icon: "⚡", label: "Fast turnaround", sublabel: "Brief to kickoff in 5 days" },
  { icon: "🌍", label: "Global clients", sublabel: "Projects across 10+ industries" },
  { icon: "🔒", label: "NDA on request", sublabel: "Your IP stays protected" },
];

export default function Contact() {
  return (
    <section
      id="contact"
      style={{
        position: "relative",
        zIndex: 10,
        background:
          "radial-gradient(circle at top, #f9fafb 0, #f3f4f6 45%, #e5e7eb 100%)",
        overflow: "hidden",
      }}
    >
      {/* Subtle dot texture */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(15,23,42,0.05) 1px, transparent 0)",
          backgroundSize: "40px 40px",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "5.5rem 2rem 6rem",
          position: "relative",
        }}
      >
        {/* ── Top label ── */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          style={{
            fontSize: "0.75rem",
            textTransform: "uppercase",
            letterSpacing: "0.28em",
            color: "#C41E3A",
            marginBottom: "0.875rem",
            fontWeight: 700,
            fontFamily: "var(--font-poppins), sans-serif",
            textAlign: "center",
          }}
        >
          Get in Touch
        </motion.p>

        {/* ── Main headline ── */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          viewport={{ once: true }}
          style={{
            fontSize: "clamp(2.5rem, 5vw, 4.25rem)",
            fontWeight: 800,
            color: "#0f172a",
            fontFamily: "var(--font-headline), sans-serif",
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            textAlign: "center",
            marginBottom: "1.25rem",
          }}
        >
          Let&apos;s build something{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #C41E3A, #d946ef)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            unforgettable.
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          style={{
            fontSize: "clamp(1rem, 1.4vw, 1.1rem)",
            color: "rgba(15,23,42,0.65)",
            maxWidth: "560px",
            margin: "0 auto 3.5rem",
            fontFamily: "var(--font-poppins), sans-serif",
            fontWeight: 400,
            lineHeight: 1.75,
            textAlign: "center",
          }}
        >
          Share your idea, timing, and ambition. We&apos;ll assemble the right
          team and build a production plan around your goals.
        </motion.p>

        {/* ── Trust signals row ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          viewport={{ once: true }}
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "1rem",
            flexWrap: "wrap",
            marginBottom: "4rem",
          }}
        >
          {trustSignals.map((t) => (
            <div
              key={t.label}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                padding: "0.75rem 1.25rem",
                borderRadius: "0.875rem",
                backgroundColor: "#ffffff",
                border: "1px solid rgba(15,23,42,0.06)",
                boxShadow: "0 14px 40px rgba(15,23,42,0.08)",
              }}
            >
              <span style={{ fontSize: "1.1rem", lineHeight: 1 }}>{t.icon}</span>
              <div>
                <p
                  style={{
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    color: "#0f172a",
                    margin: 0,
                    fontFamily: "var(--font-poppins), sans-serif",
                    lineHeight: 1.2,
                  }}
                >
                  {t.label}
                </p>
                <p
                  style={{
                    fontSize: "0.7rem",
                    color: "rgba(15,23,42,0.6)",
                    margin: 0,
                    fontFamily: "var(--font-poppins), sans-serif",
                  }}
                >
                  {t.sublabel}
                </p>
              </div>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.2 }}
          viewport={{ once: true }}
          style={{ width: "100%" }}
        >
          <ContactForm showHeader={false} showForm={true} compact={false} />
        </motion.div>
      </div>
    </section>
  );
}
