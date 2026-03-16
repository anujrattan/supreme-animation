"use client";

import { motion } from "framer-motion";
import ContactForm from "./ContactForm";

const trustSignals = [
  { icon: "⚡", label: "Fast turnaround", sublabel: "Brief to kickoff in 5 days" },
  { icon: "🌍", label: "Global clients", sublabel: "Projects across 10+ industries" },
  { icon: "🔒", label: "NDA on request", sublabel: "Your IP stays protected" },
];

const socialLinks = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/supreme_animation_studio/",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/supreme-animation-studio",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
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

        {/* ── Two-column: info + form ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.6fr",
            gap: "3rem",
            alignItems: "start",
          }}
          className="contact-layout-grid"
        >
          {/* Left: info panel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, delay: 0.15 }}
            viewport={{ once: true }}
          >
            <div
              style={{
                padding: "2rem",
                borderRadius: "1.25rem",
                backgroundColor: "#ffffff",
                border: "1px solid rgba(15,23,42,0.06)",
                boxShadow: "0 18px 45px rgba(15,23,42,0.10)",
                marginBottom: "1.25rem",
              }}
            >
              <p
                style={{
                  fontSize: "0.65rem",
                  fontWeight: 700,
                  color: "#C41E3A",
                  textTransform: "uppercase",
                  letterSpacing: "0.2em",
                  marginBottom: "1.25rem",
                  fontFamily: "var(--font-poppins), sans-serif",
                }}
              >
                Reach Us Directly
              </p>

              <div
                style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}
              >
                {/* Email */}
                <a
                  href="mailto:info@supremeanimation.com"
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "0.875rem",
                    textDecoration: "none",
                    color: "inherit",
                    transition: "opacity 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.75")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                >
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "0.625rem",
                      backgroundColor: "rgba(196,30,58,0.06)",
                      border: "1px solid rgba(196,30,58,0.25)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                        stroke="#C41E3A"
                        strokeWidth="1.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="m22 6-10 7L2 6"
                        stroke="#C41E3A"
                        strokeWidth="1.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div>
                    <p
                      style={{
                        fontSize: "0.7rem",
                        color: "rgba(15,23,42,0.5)",
                        margin: "0 0 0.1rem",
                        fontFamily: "var(--font-poppins), sans-serif",
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                      }}
                    >
                      Email
                    </p>
                    <p
                      style={{
                        fontSize: "0.9rem",
                        color: "#0f172a",
                        margin: 0,
                        fontFamily: "var(--font-poppins), sans-serif",
                        fontWeight: 500,
                      }}
                    >
                      info@supremeanimation.com
                    </p>
                  </div>
                </a>

                {/* Location */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "0.875rem",
                  }}
                >
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "0.625rem",
                      backgroundColor: "rgba(196,30,58,0.06)",
                      border: "1px solid rgba(196,30,58,0.25)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"
                        stroke="#C41E3A"
                        strokeWidth="1.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <circle
                        cx="12"
                        cy="10"
                        r="3"
                        stroke="#C41E3A"
                        strokeWidth="1.75"
                      />
                    </svg>
                  </div>
                  <div>
                    <p
                      style={{
                        fontSize: "0.7rem",
                        color: "rgba(15,23,42,0.5)",
                        margin: "0 0 0.1rem",
                        fontFamily: "var(--font-poppins), sans-serif",
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                      }}
                    >
                      Studio HQ
                    </p>
                    <p
                      style={{
                        fontSize: "0.9rem",
                        color: "#0f172a",
                        margin: 0,
                        fontFamily: "var(--font-poppins), sans-serif",
                        fontWeight: 500,
                        lineHeight: 1.5,
                      }}
                    >
                      E-190, 4th Floor, Phase 8B<br />
                      Mohali, Punjab — 160055, India
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social links */}
            <div
              style={{
                padding: "1.5rem 2rem",
                borderRadius: "1.25rem",
                backgroundColor: "#ffffff",
                border: "1px solid rgba(15,23,42,0.06)",
                boxShadow: "0 16px 40px rgba(15,23,42,0.10)",
              }}
            >
              <p
                style={{
                  fontSize: "0.65rem",
                  fontWeight: 700,
                  color: "rgba(15,23,42,0.6)",
                  textTransform: "uppercase",
                  letterSpacing: "0.2em",
                  marginBottom: "1rem",
                  fontFamily: "var(--font-poppins), sans-serif",
                }}
              >
                Follow Our Work
              </p>
              <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                {socialLinks.map((s) => (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      padding: "0.55rem 1rem",
                      borderRadius: "0.625rem",
                      backgroundColor: "rgba(15,23,42,0.02)",
                      border: "1px solid rgba(15,23,42,0.08)",
                      color: "rgba(15,23,42,0.7)",
                      textDecoration: "none",
                      fontSize: "0.8rem",
                      fontFamily: "var(--font-poppins), sans-serif",
                      fontWeight: 500,
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "#0f172a";
                      e.currentTarget.style.borderColor =
                        "rgba(15,23,42,0.3)";
                      e.currentTarget.style.backgroundColor =
                        "rgba(15,23,42,0.04)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "rgba(15,23,42,0.7)";
                      e.currentTarget.style.borderColor =
                        "rgba(15,23,42,0.08)";
                      e.currentTarget.style.backgroundColor =
                        "rgba(15,23,42,0.02)";
                    }}
                  >
                    {s.icon}
                    {s.name}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <ContactForm showHeader={false} showForm={true} compact={false} />
          </motion.div>
        </div>
      </div>

      {/* Responsive */}
      <style jsx global>{`
        @media (max-width: 900px) {
          .contact-layout-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
