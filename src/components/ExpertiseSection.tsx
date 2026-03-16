"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Film,
  Building2,
  Megaphone,
  Gamepad2,
  Stethoscope,
  Zap,
  Globe2,
} from "lucide-react";
import Link from "next/link";

type Service = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  icon: React.ComponentType<{ size?: number; color?: string; strokeWidth?: number }>;
  color: string;
  deliverables: string[];
  href: string;
};

const services: Service[] = [
  {
    id: "3d-animation",
    title: "3D Animation Production",
    tagline: "Cinematic sequences that captivate and convert.",
    description:
      "From character-led narratives to product animation and studio showreels, we handle the full 3D production pipeline with precision and artistry.",
    icon: Film,
    color: "#C41E3A",
    deliverables: ["Character Animation", "Cinematic Sequences", "Studio Showreels"],
    href: "/services/3d-animation/3d-animation-production",
  },
  {
    id: "arch-viz",
    title: "Architectural Visualization",
    tagline: "Sell the vision before a single brick is laid.",
    description:
      "Photorealistic interior and exterior renders, animated walkthroughs, and day-to-night lighting sequences that turn blueprints into compelling sales tools.",
    icon: Building2,
    color: "#1E6FC4",
    deliverables: ["Interior & Exterior Renders", "Flythrough Animations", "Day-to-Night Lighting"],
    href: "/services/3d-animation/architectural-visualization",
  },
  {
    id: "commercial",
    title: "Commercial & Brand Animation",
    tagline: "Scroll-stopping spots that make your brand unforgettable.",
    description:
      "Product commercials, brand films, and launch campaigns crafted to stop the scroll and move audiences — from concept to final frame.",
    icon: Megaphone,
    color: "#C47C1E",
    deliverables: ["Product Commercials", "Brand Films", "Launch Campaigns"],
    href: "/services/3d-animation/commercial-brand-animation",
  },
  {
    id: "gaming",
    title: "Gaming Environments & Art",
    tagline: "Game assets and cinematic trailers built to impress.",
    description:
      "Production-ready environments, character assets, and high-energy cinematics for mobile, console, and PC — built to meet the demands of modern game pipelines.",
    icon: Gamepad2,
    color: "#7C3AED",
    deliverables: ["Game Environments", "Character Assets", "Cinematic Trailers"],
    href: "/services/3d-animation/gaming-environment",
  },
  {
    id: "medical",
    title: "Medical & Scientific Animation",
    tagline: "Complex science made instantly clear.",
    description:
      "We animate medical devices, surgical procedures, and biological processes with clinical accuracy — for patient education, investor decks, and training.",
    icon: Stethoscope,
    color: "#2563EB",
    deliverables: ["Device Demonstrations", "Surgical Simulations", "Biotech Explainers"],
    href: "/services/3d-animation/medical-scientific-animation",
  },
  {
    id: "motion-graphics",
    title: "Motion Graphics & VFX",
    tagline: "Dynamic motion that brings your brand to life.",
    description:
      "Logo animations, broadcast graphics, and data visualization built for every platform — designed to reinforce brand identity and drive engagement.",
    icon: Zap,
    color: "#DB2777",
    deliverables: ["Logo Animation", "Broadcast Graphics", "Data Visualization"],
    href: "/services/3d-animation/motion-graphics-3d",
  },
  {
    id: "web-apps-ai-systems",
    title: "Web, Apps & AI Systems",
    tagline: "Custom digital products that ship with your stories.",
    description:
      "In-house web and app development that extends your IP beyond the video — from marketing sites and dashboards to AI-powered automations, chatbots, and calling agents.",
    icon: Globe2,
    color: "#0EA5E9",
    deliverables: [
      "Marketing & portfolio websites",
      "Custom web & app experiences",
      "AI automations, chatbots & agents",
    ],
    href: "/services/web-development/web-apps-ai-systems",
  },
];

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: index * 0.08 }}
      viewport={{ once: true }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "2rem",
        borderRadius: "1.25rem",
        backgroundColor: hovered ? "rgba(255,255,255,0.96)" : "rgba(255,255,255,0.88)",
        border: `1px solid ${hovered ? `${service.color}33` : "rgba(255,255,255,0.65)"}`,
        boxShadow: hovered
          ? `0 22px 60px rgba(15,23,42,0.18), 0 0 0 1px ${service.color}22`
          : "0 10px 30px rgba(15,23,42,0.08)",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        transition: "all 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        cursor: "default",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Top color accent bar */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "3px",
          background: `linear-gradient(90deg, ${service.color}, ${service.color}80)`,
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.3s ease",
          borderRadius: "1.25rem 1.25rem 0 0",
        }}
      />

      {/* Icon */}
      <div
        style={{
          width: "56px",
          height: "56px",
          borderRadius: "0.875rem",
          background: hovered ? `${service.color}18` : `${service.color}0d`,
          border: `1px solid ${service.color}25`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "1.5rem",
          transition: "all 0.3s ease",
          boxShadow: hovered ? `0 4px 16px ${service.color}30` : "none",
          flexShrink: 0,
        }}
      >
        <service.icon size={26} color={service.color} strokeWidth={1.75} />
      </div>

      {/* Title */}
      <h3
        style={{
          fontSize: "clamp(1.1rem, 1.5vw, 1.25rem)",
          fontWeight: 700,
          color: "#111",
          marginBottom: "0.5rem",
          fontFamily: "var(--font-headline), sans-serif",
          lineHeight: 1.25,
          letterSpacing: "-0.01em",
        }}
      >
        {service.title}
      </h3>

      {/* Tagline */}
      <p
        style={{
          fontSize: "0.875rem",
          color: service.color,
          fontWeight: 600,
          marginBottom: "0.875rem",
          fontFamily: "var(--font-poppins), sans-serif",
          lineHeight: 1.4,
        }}
      >
        {service.tagline}
      </p>

      {/* Description */}
      <p
        style={{
          fontSize: "0.9rem",
          color: "rgba(26,26,26,0.65)",
          lineHeight: 1.75,
          marginBottom: "1.5rem",
          fontFamily: "var(--font-poppins), sans-serif",
          fontWeight: 400,
          flex: 1,
        }}
      >
        {service.description}
      </p>

      {/* Divider */}
      <div
        style={{
          height: "1px",
          backgroundColor: "rgba(0,0,0,0.07)",
          marginBottom: "1.25rem",
        }}
      />

      {/* Deliverables */}
      <ul
        style={{
          listStyle: "none",
          padding: 0,
          margin: "0 0 1.5rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
        }}
      >
        {service.deliverables.map((d) => (
          <li
            key={d}
            style={{
              fontSize: "0.825rem",
              color: "rgba(26,26,26,0.7)",
              fontFamily: "var(--font-poppins), sans-serif",
              display: "flex",
              alignItems: "center",
              gap: "0.6rem",
              fontWeight: 500,
            }}
          >
            <span
              style={{
                width: "5px",
                height: "5px",
                borderRadius: "50%",
                backgroundColor: service.color,
                flexShrink: 0,
              }}
            />
            {d}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <Link
        href={service.href}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.4rem",
          fontSize: "0.825rem",
          fontWeight: 700,
          color: service.color,
          textDecoration: "none",
          fontFamily: "var(--font-poppins), sans-serif",
          letterSpacing: "0.04em",
          textTransform: "uppercase",
          transition: "gap 0.2s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.gap = "0.7rem";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.gap = "0.4rem";
        }}
      >
        Explore Service
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <path
            d="M5 12h14M12 5l7 7-7 7"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Link>
    </motion.div>
  );
}

export default function ExpertiseSection() {
  return (
    <section
      style={{
        padding: "5.5rem 2rem 6rem",
        background:
          "radial-gradient(circle at top left, #fdf2f8 0, #f7f7fb 38%, #eef2ff 100%)",
        position: "relative",
        zIndex: 10,
      }}
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          style={{ marginBottom: "3.5rem" }}
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
              color: "#C41E3A",
              marginBottom: "0.75rem",
              fontWeight: 700,
              fontFamily: "var(--font-poppins), sans-serif",
            }}
          >
            Our Services
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
                color: "#111",
                margin: 0,
                fontFamily: "var(--font-headline), sans-serif",
                lineHeight: 1.05,
                letterSpacing: "-0.025em",
                maxWidth: "680px",
              }}
            >
              One Studio.{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #C41E3A, #d946ef)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Seven Disciplines.
              </span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              viewport={{ once: true }}
            >
              <Link
                href="/services"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.75rem 1.5rem",
                  borderRadius: "100px",
                  border: "1.5px solid rgba(0,0,0,0.15)",
                  color: "#111",
                  textDecoration: "none",
                  fontWeight: 600,
                  fontSize: "0.875rem",
                  fontFamily: "var(--font-poppins), sans-serif",
                  transition: "all 0.2s",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#C41E3A";
                  e.currentTarget.style.color = "#C41E3A";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(0,0,0,0.15)";
                  e.currentTarget.style.color = "#111";
                }}
              >
                View All Services
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5 12h14M12 5l7 7-7 7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            style={{
              fontSize: "clamp(1rem, 1.4vw, 1.1rem)",
              color: "rgba(26,26,26,0.55)",
              marginTop: "1.25rem",
              maxWidth: "580px",
              fontFamily: "var(--font-poppins), sans-serif",
              fontWeight: 400,
              lineHeight: 1.75,
            }}
          >
            From cinematic 3D animation to architectural visualization and game art — we bring the same level of craft, speed, and creative thinking to every brief.
          </motion.p>
        </motion.div>

        {/* Service Cards Bento Grid */}
        <div
          className="services-bento-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(12, minmax(0, 1fr))",
            gap: "1.1rem",
          }}
        >
          {services.map((service, index) => {
            // Simple bento layout pattern based on index
            let colSpan = 4;
            let rowSpan = 1;
            if (index === 0) {
              colSpan = 7;
              rowSpan = 2;
            } else if (index === 1) {
              colSpan = 5;
              rowSpan = 2;
            } else if (index === 5) {
              colSpan = 6;
              rowSpan = 1;
            } else if (index === 6) {
              colSpan = 6;
              rowSpan = 1;
            }

            return (
              <div
                key={service.id}
                style={{
                  gridColumn: `span ${colSpan}`,
                  gridRow: `span ${rowSpan}`,
                }}
              >
                <ServiceCard service={service} index={index} />
              </div>
            );
          })}
        </div>
      </div>

      {/* Responsive tweaks for bento grid */}
      <style jsx global>{`
        @media (max-width: 1024px) {
          .services-bento-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          }
          .services-bento-grid > * {
            grid-column: span 1 !important;
            grid-row: auto !important;
          }
        }
        @media (max-width: 640px) {
          .services-bento-grid {
            grid-template-columns: minmax(0, 1fr) !important;
          }
          .services-bento-grid > * {
            grid-column: span 1 !important;
            grid-row: auto !important;
          }
        }
      `}</style>
    </section>
  );
}
