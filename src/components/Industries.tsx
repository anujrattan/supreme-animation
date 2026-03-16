"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Baby,
  Building2,
  Gamepad2,
  Stethoscope,
  Megaphone,
  GraduationCap,
  TrendingUp,
  Trophy,
  Shield,
  ShoppingBag,
} from "lucide-react";

type Industry = {
  id: string;
  name: string;
  icon: React.ComponentType<{ size?: number; color?: string; strokeWidth?: number }>;
  color: string;           // primary accent
  gradient: string;        // card background gradient
  description: string;
  useCases: string[];
};

const industries: Industry[] = [
  {
    id: "kids-family",
    name: "Kids & Family Entertainment",
    icon: Baby,
    color: "#10B981",
    gradient: "linear-gradient(145deg, #064e3b 0%, #065f46 35%, #0a0f18 100%)",
    description:
      "Characters kids love, stories parents trust. We bring warmth, energy, and emotional depth to animated series, educational apps, and branded kids content.",
    useCases: ["Animated Series", "Kids Apps", "Educational Content"],
  },
  {
    id: "architecture",
    name: "Architecture & Real Estate",
    icon: Building2,
    color: "#06B6D4",
    gradient: "linear-gradient(145deg, #0c4a6e 0%, #075985 35%, #0a0f18 100%)",
    description:
      "Sell the vision before construction begins. Our photorealistic walkthroughs and renders turn blueprints into compelling sales tools that close deals faster.",
    useCases: ["Property Walkthroughs", "Render Galleries", "Sales Presentations"],
  },
  {
    id: "gaming",
    name: "Gaming & Interactive",
    icon: Gamepad2,
    color: "#8B5CF6",
    gradient: "linear-gradient(145deg, #3b0764 0%, #4c1d95 40%, #0a0f18 100%)",
    description:
      "Level up your game's visual identity. We build production-ready assets, environments, and cinematic trailers that make players look twice and investors take notice.",
    useCases: ["Game Trailers", "Character Art", "AR/VR Experiences"],
  },
  {
    id: "healthcare",
    name: "Healthcare & Medical",
    icon: Stethoscope,
    color: "#F87171",
    gradient: "linear-gradient(145deg, #7f1d1d 0%, #991b1b 35%, #0a0f18 100%)",
    description:
      "Medical accuracy meets visual storytelling. We animate device demos, surgical procedures, and biological processes for patients, surgeons, and investors alike.",
    useCases: ["Device Demonstrations", "Patient Education", "Investor Decks"],
  },
  {
    id: "advertising",
    name: "Advertising & Brands",
    icon: Megaphone,
    color: "#FB923C",
    gradient: "linear-gradient(145deg, #7c2d12 0%, #9a3412 35%, #0a0f18 100%)",
    description:
      "Where brand strategy meets visual spectacle. Product commercials, brand films, and social-first animations designed to stop the scroll and drive real action.",
    useCases: ["Product Launches", "Social Media Content", "TV Commercials"],
  },
  {
    id: "education",
    name: "Education & E-Learning",
    icon: GraduationCap,
    color: "#60A5FA",
    gradient: "linear-gradient(145deg, #1e3a8a 0%, #1d4ed8 35%, #0a0f18 100%)",
    description:
      "Knowledge lands when it moves. We turn complex subjects into engaging explainer videos and course content for learners of every age and background.",
    useCases: ["Explainer Videos", "Course Animations", "App Onboarding"],
  },
  {
    id: "finance",
    name: "Finance & FinTech",
    icon: TrendingUp,
    color: "#FBBF24",
    gradient: "linear-gradient(145deg, #78350f 0%, #92400e 35%, #0a0f18 100%)",
    description:
      "Trust built through clarity. We animate financial products, customer journeys, and investment pitches for banks, fintechs, and independent advisors.",
    useCases: ["Product Explainers", "Pitch Decks", "App Demos"],
  },
  {
    id: "sports",
    name: "Sports & Entertainment",
    icon: Trophy,
    color: "#F472B6",
    gradient: "linear-gradient(145deg, #831843 0%, #9d174d 35%, #0a0f18 100%)",
    description:
      "Motion that matches the moment. From match-day graphics to fan hype reels, we produce high-energy content for leagues, clubs, and broadcasters worldwide.",
    useCases: ["Motion Graphics", "Promo Reels", "Event Visuals"],
  },
  {
    id: "insurance",
    name: "Insurance & InsurTech",
    icon: Shield,
    color: "#818CF8",
    gradient: "linear-gradient(145deg, #1e1b4b 0%, #312e81 35%, #0a0f18 100%)",
    description:
      "Making the intangible tangible. We simplify complex insurance concepts and product benefits into clear, trustworthy visual stories audiences actually understand.",
    useCases: ["Product Explainers", "Claims Animations", "Brand Films"],
  },
  {
    id: "ecommerce",
    name: "Ecommerce & Retail",
    icon: ShoppingBag,
    color: "#2DD4BF",
    gradient: "linear-gradient(145deg, #042f2e 0%, #134e4a 35%, #0a0f18 100%)",
    description:
      "Showcase every detail that matters. Product visualizations and demo animations that drive conversions, reduce returns, and keep customers coming back.",
    useCases: ["Product Videos", "360° Visualizations", "Unboxing Animations"],
  },
];

// Bento layout: 12-col grid, all cards single row height
// Row 1: Kids(5) + Arch(4) + Gaming(3)     = 12
// Row 2: Healthcare(3) + Ads(5) + Edu(4)   = 12
// Row 3: Finance(4) + Sports(4) + Ins(4)   = 12
// Row 4: Ecommerce(12) — full-width closer
const BENTO = [
  { col: 5 },  // Kids
  { col: 4 },  // Architecture
  { col: 3 },  // Gaming
  { col: 3 },  // Healthcare
  { col: 5 },  // Advertising
  { col: 4 },  // Education
  { col: 4 },  // Finance
  { col: 4 },  // Sports
  { col: 4 },  // Insurance
  { col: 12 }, // Ecommerce — wide closing tile
];

// wide = col span ≥ 5, used for slightly larger font/icon
function IndustryCard({
  industry,
  index,
  wide,
}: {
  industry: Industry;
  index: number;
  wide: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.35) }}
      viewport={{ once: true }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        borderRadius: "1.25rem",
        background: industry.gradient,
        border: `1px solid ${hovered ? `${industry.color}55` : `${industry.color}22`}`,
        boxShadow: hovered
          ? `0 18px 55px ${industry.color}28, 0 0 0 1px ${industry.color}22`
          : `0 3px 16px rgba(0,0,0,0.45)`,
        transform: hovered ? "translateY(-4px) scale(1.01)" : "translateY(0) scale(1)",
        transition: "all 0.32s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        cursor: "default",
        overflow: "hidden",
        padding: "1.75rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.85rem",
        height: "100%",
      }}
    >
      {/* Noise grain for depth */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")",
          backgroundSize: "200px 200px",
          opacity: 0.35,
          pointerEvents: "none",
          borderRadius: "1.25rem",
        }}
      />

      {/* Ambient orb top-right */}
      <div
        style={{
          position: "absolute",
          top: "-25%",
          right: "-12%",
          width: "60%",
          aspectRatio: "1",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${industry.color}28 0%, transparent 70%)`,
          filter: "blur(28px)",
          opacity: hovered ? 1 : 0.55,
          transition: "opacity 0.32s ease",
          pointerEvents: "none",
        }}
      />

      {/* Icon badge */}
      <div
        style={{
          width: wide ? "50px" : "44px",
          height: wide ? "50px" : "44px",
          borderRadius: "0.75rem",
          background: `linear-gradient(135deg, ${industry.color}30, ${industry.color}12)`,
          border: `1px solid ${industry.color}45`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          boxShadow: hovered ? `0 4px 18px ${industry.color}38` : "none",
          transition: "box-shadow 0.3s ease",
          position: "relative",
        }}
      >
        <industry.icon
          size={wide ? 24 : 20}
          color={industry.color}
          strokeWidth={1.75}
        />
      </div>

      {/* Name */}
      <h3
        style={{
          fontSize: wide
            ? "clamp(1.05rem, 1.5vw, 1.25rem)"
            : "clamp(0.9rem, 1.2vw, 1.05rem)",
          fontWeight: 800,
          color: "#ffffff",
          margin: 0,
          fontFamily: "var(--font-headline), sans-serif",
          lineHeight: 1.2,
          letterSpacing: "-0.015em",
          position: "relative",
        }}
      >
        {industry.name}
      </h3>

      {/* Description — always visible */}
      <p
        style={{
          fontSize: "0.82rem",
          color: hovered ? "rgba(255,255,255,0.78)" : "rgba(255,255,255,0.52)",
          lineHeight: 1.7,
          margin: 0,
          fontFamily: "var(--font-poppins), sans-serif",
          fontWeight: 400,
          flex: 1,
          position: "relative",
          transition: "color 0.3s ease",
        }}
      >
        {industry.description}
      </p>

      {/* Use Case Pills */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0.35rem",
          position: "relative",
        }}
      >
        {industry.useCases.map((uc) => (
          <span
            key={uc}
            style={{
              padding: "0.2rem 0.6rem",
              borderRadius: "100px",
              background: hovered ? `${industry.color}25` : `${industry.color}15`,
              border: `1px solid ${hovered ? `${industry.color}50` : `${industry.color}30`}`,
              fontSize: "0.65rem",
              color: industry.color,
              fontWeight: 700,
              fontFamily: "var(--font-poppins), sans-serif",
              letterSpacing: "0.04em",
              whiteSpace: "nowrap",
              transition: "all 0.25s ease",
            }}
          >
            {uc}
          </span>
        ))}
      </div>

      {/* Bottom accent line */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "2px",
          background: `linear-gradient(90deg, ${industry.color}90, transparent)`,
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      />
    </motion.div>
  );
}

export default function Industries() {
  return (
    <section
      style={{
        padding: "5.5rem 2rem 6rem",
        background: "linear-gradient(180deg, #07070e 0%, #0d0d1a 100%)",
        position: "relative",
        zIndex: 10,
        overflow: "hidden",
      }}
    >
      {/* Dot grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.028) 1px, transparent 0)",
          backgroundSize: "44px 44px",
          pointerEvents: "none",
        }}
      />

      {/* Central ambient glow */}
      <div
        style={{
          position: "absolute",
          top: "25%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "70%",
          height: "45%",
          background:
            "radial-gradient(ellipse, rgba(196,30,58,0.05) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: "1400px", margin: "0 auto", position: "relative" }}>

        {/* ── Section Header ── */}
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
              marginBottom: "0.875rem",
              fontWeight: 700,
              fontFamily: "var(--font-poppins), sans-serif",
            }}
          >
            Industries We Serve
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
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                viewport={{ once: true }}
                style={{
                  fontSize: "clamp(2.25rem, 4.5vw, 3.75rem)",
                  fontWeight: 800,
                  color: "#fff",
                  margin: "0 0 1rem",
                  fontFamily: "var(--font-headline), sans-serif",
                  lineHeight: 1.05,
                  letterSpacing: "-0.025em",
                  maxWidth: "600px",
                }}
              >
                Your Industry.{" "}
                <span
                  style={{
                    background: "linear-gradient(135deg, #C41E3A, #d946ef)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Our Canvas.
                </span>
              </motion.h2>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.35 }}
                viewport={{ once: true }}
                style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap" }}
              >
                {[
                  { value: "10+", label: "Industries" },
                  { value: "50+", label: "Projects delivered" },
                  { value: "Since 2016", label: "In production" },
                ].map((chip) => (
                  <span
                    key={chip.label}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.4rem",
                      padding: "0.3rem 0.8rem",
                      borderRadius: "100px",
                      backgroundColor: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      fontSize: "0.72rem",
                      fontFamily: "var(--font-poppins), sans-serif",
                    }}
                  >
                    <strong style={{ color: "#C41E3A", fontWeight: 700 }}>
                      {chip.value}
                    </strong>
                    <span style={{ color: "rgba(255,255,255,0.4)" }}>
                      {chip.label}
                    </span>
                  </span>
                ))}
              </motion.div>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              style={{
                fontSize: "clamp(0.95rem, 1.3vw, 1.05rem)",
                color: "rgba(255,255,255,0.45)",
                maxWidth: "420px",
                fontFamily: "var(--font-poppins), sans-serif",
                fontWeight: 400,
                lineHeight: 1.75,
                margin: 0,
              }}
            >
              Whatever your market, we bring the same level of craft, care, and
              creative thinking — from brief to final frame.
            </motion.p>
          </div>
        </motion.div>

        {/* ── Bento Grid ── */}
        <div
          className="industries-bento"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(12, minmax(0, 1fr))",
            gridAutoRows: "auto",
            gap: "1rem",
          }}
        >
          {industries.map((industry, index) => {
            const bento = BENTO[index] ?? { col: 4 };
            const wide = bento.col >= 5;
            return (
              <div
                key={industry.id}
                style={{ gridColumn: `span ${bento.col}` }}
              >
                <IndustryCard
                  industry={industry}
                  index={index}
                  wide={wide}
                />
              </div>
            );
          })}
        </div>

        {/* ── Bottom CTA ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          style={{
            textAlign: "center",
            marginTop: "3.5rem",
            paddingTop: "3rem",
            borderTop: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <p
            style={{
              fontSize: "0.875rem",
              color: "rgba(255,255,255,0.35)",
              fontFamily: "var(--font-poppins), sans-serif",
              letterSpacing: "0.05em",
            }}
          >
            Don&apos;t see your industry?{" "}
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              style={{
                color: "#C41E3A",
                fontWeight: 600,
                textDecoration: "none",
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.75")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              Let&apos;s talk about yours →
            </a>
          </p>
        </motion.div>
      </div>

      {/* Responsive */}
      <style jsx global>{`
        @media (max-width: 1024px) {
          .industries-bento {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
            grid-auto-rows: auto !important;
          }
          .industries-bento > * {
            grid-column: span 1 !important;
            grid-row: auto !important;
          }
        }
        @media (max-width: 640px) {
          .industries-bento {
            grid-template-columns: minmax(0, 1fr) !important;
          }
          .industries-bento > * {
            grid-column: span 1 !important;
            grid-row: auto !important;
          }
        }
      `}</style>
    </section>
  );
}
