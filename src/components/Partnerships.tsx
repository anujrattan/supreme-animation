"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { projects } from "@/content/projects";

export default function Partnerships() {
  const partnershipItems = projects.map((p) => ({
    key: p.slug,
    clientLabel: p.clientLabel,
    deliverableLabel: p.deliverableLabel,
    industry: p.industry,
    href: `/portfolio/${p.slug}`,
  }));

  // duplicate for seamless marquee loop
  const trackItems = [...partnershipItems, ...partnershipItems];

  return (
    <section
      style={{
        padding: "3rem 2rem",
        backgroundColor: "#fafafa",
        position: "relative",
        zIndex: 10,
        fontFamily: "var(--font-poppins), var(--font-manrope), sans-serif",
        overflow: "hidden",
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

        {/* Scrolling tiles marquee */}
        <div
          style={{
            position: "relative",
            width: "100%",
            maxWidth: "1400px",
            margin: "0 auto",
          }}
        >
          {/* Soft edge fades */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              background:
                "linear-gradient(90deg, #fafafa 0%, rgba(250,250,250,0) 10%, rgba(250,250,250,0) 90%, #fafafa 100%)",
              zIndex: 2,
            }}
          />

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            style={{
              position: "relative",
              zIndex: 1,
              overflow: "hidden",
              borderRadius: "1.25rem",
              padding: "0.75rem 0",
            }}
          >
            <div className="partnerships-marquee" role="list" aria-label="Client partnerships">
              <div className="partnerships-track">
                {trackItems.map((item, idx) => (
                  <Link
                    key={`${item.key}-${idx}`}
                    href={item.href}
                    className="partnerships-tile"
                    role="listitem"
                  >
                    <div className="partnerships-tileInner">
                      <div className="partnerships-client">{item.clientLabel}</div>
                      <div className="partnerships-deliverable">{item.deliverableLabel}</div>
                      <div className="partnerships-chip">{item.industry}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <style jsx global>{`
        .partnerships-marquee {
          width: 100%;
          overflow: hidden;
        }

        .partnerships-track {
          display: flex;
          align-items: stretch;
          gap: 1rem;
          width: max-content;
          animation: partnershipsScroll 28s linear infinite;
          will-change: transform;
          padding: 0.25rem 0.75rem;
        }

        .partnerships-marquee:hover .partnerships-track {
          animation-play-state: paused;
        }

        .partnerships-tile {
          text-decoration: none;
          color: inherit;
          display: block;
          min-width: 280px;
        }

        .partnerships-tileInner {
          height: 100%;
          padding: 1.25rem 1.25rem;
          border-radius: 1.25rem;
          border: 1px solid rgba(0, 0, 0, 0.08);
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.95),
            rgba(250, 250, 250, 0.85)
          );
          box-shadow: 0 6px 24px rgba(0, 0, 0, 0.06);
          transition: transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease;
          display: grid;
          gap: 0.35rem;
          align-content: center;
        }

        .partnerships-tile:hover .partnerships-tileInner {
          transform: translateY(-2px);
          box-shadow: 0 12px 40px rgba(196, 30, 58, 0.12);
          border-color: rgba(196, 30, 58, 0.25);
        }

        .partnerships-client {
          font-family: var(--font-headline), sans-serif;
          font-weight: 800;
          font-size: 1.05rem;
          color: #1a1a1a;
          letter-spacing: -0.01em;
        }

        .partnerships-deliverable {
          font-family: var(--font-poppins), sans-serif;
          font-weight: 500;
          font-size: 0.95rem;
          color: rgba(26, 26, 26, 0.75);
        }

        .partnerships-chip {
          display: inline-flex;
          width: fit-content;
          margin-top: 0.35rem;
          padding: 0.35rem 0.6rem;
          border-radius: 999px;
          border: 1px solid rgba(196, 30, 58, 0.18);
          background: rgba(196, 30, 58, 0.06);
          color: rgba(196, 30, 58, 0.95);
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          font-family: var(--font-headline), sans-serif;
        }

        @keyframes partnershipsScroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        @media (max-width: 640px) {
          .partnerships-tile {
            min-width: 240px;
          }
          .partnerships-track {
            gap: 0.75rem;
            padding: 0.25rem 0.5rem;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .partnerships-track {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}

