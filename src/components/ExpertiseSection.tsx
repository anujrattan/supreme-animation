"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, UserCircle, Gamepad2, Video, Sparkles, Code } from "lucide-react";

type ExpertiseItem = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  deliverables: string[];
  industries: string[];
  icon: React.ComponentType<{ size?: number; color?: string }>;
};

const expertiseItems: ExpertiseItem[] = [
  {
    id: "ai-avatars",
    title: "AI Avatars & Virtual Performers",
    tagline: "Real-time animated characters for streams & branded content.",
    icon: Bot,
    description:
      "We design and rig expressive AI-driven avatars and virtual performers that appear live on streams, events, and interactive experiences. From concept art to lip-sync, we handle the full pipeline.",
    deliverables: [
      "Custom avatar design & style frames",
      "Real-time rigs (virtual streamers, hosts, and performers)",
      "Facial & body motion capture integration",
      "Lip-sync and puppeteering setups",
    ],
    industries: [
      "Streaming & Content Creation",
      "Influencers & Creators",
      "Brands & Campaigns",
      "Events & Experiential",
    ],
  },
  {
    id: "digital-humans",
    title: "Digital Humans",
    tagline: "Photoreal characters powered by motion capture & AI.",
    icon: UserCircle,
    description:
      "We create believable digital humans for film, games, and interactive media. Using motion capture technology and AI, we ensure they move and emote like real people—from clean topology to lifelike facial animation.",
    deliverables: [
      "High-poly and game-ready character models",
      "Facial rigging & blendshape systems",
      "Motion-capture cleanup & retargeting",
      "Lookdev (skin, hair, clothing) and lighting tests",
    ],
    industries: ["Film & Series", "Gaming & XR", "Advertising", "Virtual Assistants"],
  },
  {
    id: "game-art",
    title: "Game Art & Assets",
    tagline: "Premium characters, worlds, and props for interactive worlds.",
    icon: Gamepad2,
    description:
      "From stylised to realistic, we build cohesive art systems for games: characters, environments, props, and UI that feel like they belong in the same world.",
    deliverables: [
      "Character & creature design",
      "Environment concepts & production assets",
      "In-engine ready models (low-poly, baked textures)",
      "Animation cycles & VFX for gameplay",
    ],
    industries: [
      "PC & Console Games",
      "Mobile Games",
      "XR Experiences",
      "Metaverse / Virtual Worlds",
    ],
  },
  {
    id: "virtual-production",
    title: "Virtual Production",
    tagline: "LED volume & XR workflows for film and live content.",
    icon: Video,
    description:
      "We support virtual production pipelines with camera-tracked environments, real-time lighting, and pre-visualization so directors can see final pixels on set.",
    deliverables: [
      "Unreal Engine environments for LED volumes",
      "Previs & techvis for complex shots",
      "Camera tracking & real-time compositing support",
      "On-set graphics & playback assets",
    ],
    industries: ["Film & TV", "Live Events & Broadcast", "XR Stages"],
  },
  {
    id: "kids-animation",
    title: "Kids Animation",
    tagline: "Whimsical worlds for series, apps, and education.",
    icon: Sparkles,
    description:
      "We craft kid-friendly IP with strong characters, simple shapes, and bright palettes. Perfect for animated series, learning apps, and branded content for young audiences.",
    deliverables: [
      "Character & world design for kids IP",
      "Storyboards & animatics",
      "2D/3D animation for episodes & shorts",
      "Songs, lyrics integration, and basic sound direction",
    ],
    industries: [
      "Kids TV & Streaming",
      "Ed-Tech Platforms",
      "Toy & Licensing Brands",
    ],
  },
  {
    id: "web-dev",
    title: "Web & App Development",
    tagline: "Digital products that showcase and support your story.",
    icon: Code,
    description:
      "In partnership with Webcrony Solutions, our trusted studio partner, we deliver comprehensive web and app development services. Webcrony Solutions specializes in web development, mobile applications, AI automations, and AI implementations, allowing us to offer end-to-end digital solutions. Together, we turn your IP into interactive experiences — from portfolio sites and mini-games to companion apps that extend your universe and support campaigns.",
    deliverables: [
      "Marketing & portfolio websites",
      "Landing pages for launches & campaigns",
      "Web & mobile apps with custom front-end",
      "AI automation & implementation solutions",
      "Integration with analytics, auth, and CMS",
    ],
    industries: ["Studios & Agencies", "Brands & Campaigns", "Startups & Products"],
  },
];

export default function ExpertiseSection() {
  const [selectedId, setSelectedId] = useState<string>(expertiseItems[0].id);
  const selectedItem = expertiseItems.find((item) => item.id === selectedId) || expertiseItems[0];

  return (
    <section
      style={{
        padding: "3.5rem 2rem",
        background:
          "linear-gradient(135deg, rgba(250, 250, 250, 0.5) 0%, rgba(255, 255, 255, 0.8) 100%)",
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
            marginBottom: "2.5rem",
          }}
        >
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
            Our Expertise
          </motion.p>
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
            One studio. Many styles. Endless storytelling possibilities.
          </motion.h2>
        </motion.div>

        {/* Main Content - Desktop: Two Column, Mobile: Stacked */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1.8fr)",
            gap: "1.5rem",
            alignItems: "start",
          }}
          className="expertise-grid"
        >
          {/* Left: Expertise Cards Stack */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
            }}
            className="expertise-cards"
          >
            {expertiseItems.map((item, index) => {
              const isSelected = selectedId === item.id;
              return (
                <motion.button
                  key={item.id}
                  onClick={() => setSelectedId(item.id)}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    padding: "1.25rem 1.5rem",
                    borderRadius: "1rem",
                    border: isSelected
                      ? "2px solid transparent"
                      : "1px solid rgba(0, 0, 0, 0.08)",
                    background: isSelected
                      ? "linear-gradient(135deg, rgba(196, 30, 58, 0.1), rgba(196, 30, 58, 0.05))"
                      : "rgba(255, 255, 255, 0.9)",
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "all 0.3s ease",
                    position: "relative",
                    overflow: "hidden",
                    boxShadow: isSelected
                      ? "0 8px 30px rgba(196, 30, 58, 0.15), 0 0 0 1px rgba(196, 30, 58, 0.2)"
                      : "0 2px 8px rgba(0, 0, 0, 0.04)",
                    fontFamily: "var(--font-poppins), var(--font-manrope), sans-serif",
                    font: "inherit",
                  }}
                >
                  {/* Gradient Border for Selected */}
                  {isSelected && (
                    <motion.div
                      layoutId="selectedBorder"
                      style={{
                        position: "absolute",
                        inset: 0,
                        borderRadius: "1rem",
                        padding: "2px",
                        background:
                          "linear-gradient(135deg, #C41E3A, #d946ef, #C41E3A)",
                        WebkitMask:
                          "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                        WebkitMaskComposite: "xor",
                        maskComposite: "exclude",
                        pointerEvents: "none",
                      }}
                    />
                  )}

                  <div style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "flex-start", gap: "1rem" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        minWidth: "48px",
                        height: "48px",
                        borderRadius: "0.75rem",
                        background: isSelected
                          ? "rgba(196, 30, 58, 0.12)"
                          : "rgba(0, 0, 0, 0.04)",
                        padding: "0.75rem",
                        flexShrink: 0,
                      }}
                    >
                      <item.icon
                        size={24}
                        color={isSelected ? "#C41E3A" : "rgba(26, 26, 26, 0.6)"}
                      />
                    </div>
                    <div style={{ flex: 1 }}>
                      <h3
                        style={{
                          fontSize: "clamp(1.1rem, 1.5vw, 1.25rem)",
                          fontWeight: 700,
                          color: "#1a1a1a",
                          marginBottom: "0.5rem",
                          fontFamily: "var(--font-headline), sans-serif",
                        }}
                      >
                        {item.title}
                      </h3>
                      <p
                        style={{
                          fontSize: "0.9rem",
                          color: "rgba(26, 26, 26, 0.6)",
                          lineHeight: 1.5,
                          fontFamily: "var(--font-poppins), sans-serif",
                          fontWeight: 400,
                        }}
                      >
                        {item.tagline}
                      </p>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Right: Detail Panel */}
          <motion.div
            key={selectedId}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
                  style={{
                    padding: "2rem",
              borderRadius: "1.25rem",
              border: "1px solid rgba(0, 0, 0, 0.08)",
              background:
                "linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(250, 250, 250, 0.9))",
              boxShadow: "0 8px 30px rgba(0, 0, 0, 0.06)",
              position: "sticky",
              top: "2rem",
              height: "fit-content",
              fontFamily: "var(--font-poppins), sans-serif",
            }}
            className="detail-panel"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedId}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {/* Service Badge with Icon */}
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "0.4rem 0.75rem",
                    borderRadius: "0.5rem",
                    background: "linear-gradient(135deg, rgba(196, 30, 58, 0.1), rgba(217, 70, 239, 0.1))",
                    border: "1px solid rgba(196, 30, 58, 0.2)",
                        marginBottom: "1.25rem",
                  }}
                >
                  <selectedItem.icon size={18} color="#C41E3A" />
                  <span
                    style={{
                      fontSize: "0.75rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.15em",
                      color: "#C41E3A",
                      fontWeight: 600,
                      fontFamily: "var(--font-headline), sans-serif",
                    }}
                  >
                    Service
                  </span>
                </div>

                {/* Title */}
                <h3
                  style={{
                    fontSize: "clamp(1.75rem, 2.5vw, 2.25rem)",
                    fontWeight: 700,
                    color: "#1a1a1a",
                    marginBottom: "1rem",
                    fontFamily: "var(--font-headline), sans-serif",
                    lineHeight: "1.2",
                  }}
                >
                  {selectedItem.title}
                </h3>

                {/* Description */}
                <p
                  style={{
                    fontSize: "1.05rem",
                    color: "rgba(26, 26, 26, 0.8)",
                    lineHeight: "1.7",
                        marginBottom: "1.5rem",
                    fontFamily: "var(--font-poppins), sans-serif",
                    fontWeight: 400,
                  }}
                >
                  {selectedItem.description}
                </p>

                {/* Deliverables */}
                <div style={{ marginBottom: "2rem" }}>
                  <h4
                    style={{
                      fontSize: "0.75rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.15em",
                      color: "#C41E3A",
                      marginBottom: "1rem",
                      fontWeight: 600,
                      fontFamily: "var(--font-headline), sans-serif",
                    }}
                  >
                    Deliverables
                  </h4>
                  <ul
                    style={{
                      listStyle: "none",
                      padding: 0,
                      margin: 0,
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.75rem",
                      fontFamily: "var(--font-poppins), sans-serif",
                    }}
                  >
                    {selectedItem.deliverables.map((deliverable, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        style={{
                          fontSize: "0.95rem",
                          color: "rgba(26, 26, 26, 0.75)",
                          lineHeight: 1.6,
                          fontFamily: "var(--font-poppins), sans-serif",
                          fontWeight: 400,
                          paddingLeft: "1.5rem",
                          position: "relative",
                        }}
                      >
                        <span
                          style={{
                            position: "absolute",
                            left: 0,
                            top: "0.5em",
                            width: "6px",
                            height: "6px",
                            borderRadius: "50%",
                            background: "linear-gradient(135deg, #C41E3A, #d946ef)",
                          }}
                        />
                        {deliverable}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Industries */}
                <div>
                  <h4
                    style={{
                      fontSize: "0.75rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.15em",
                      color: "#C41E3A",
                      marginBottom: "1rem",
                      fontWeight: 600,
                      fontFamily: "var(--font-headline), sans-serif",
                    }}
                  >
                    Industries
                  </h4>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "0.5rem",
                      fontFamily: "var(--font-poppins), sans-serif",
                    }}
                  >
                    {selectedItem.industries.map((industry, idx) => (
                      <motion.span
                        key={idx}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.05 }}
                        style={{
                          display: "inline-block",
                          padding: "0.5rem 1rem",
                          borderRadius: "0.5rem",
                          background: "rgba(196, 30, 58, 0.08)",
                          border: "1px solid rgba(196, 30, 58, 0.15)",
                          fontSize: "0.875rem",
                          color: "rgba(26, 26, 26, 0.8)",
                          fontFamily: "var(--font-poppins), sans-serif",
                          fontWeight: 500,
                        }}
                      >
                        {industry}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* CTA Link */}
                <motion.a
                  href="#portfolio"
                  whileHover={{ x: 5 }}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    marginTop: "2rem",
                    color: "#C41E3A",
                    fontSize: "0.95rem",
                    fontWeight: 600,
                    textDecoration: "none",
                    fontFamily: "var(--font-headline), sans-serif",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#d946ef";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "#C41E3A";
                  }}
                >
                  View related projects
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    style={{ transition: "transform 0.2s ease" }}
                  >
                    <path
                      d="M7 17L17 7M17 7H7M17 7V17"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.a>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* Responsive Styles */}
      <style jsx global>{`
        /* Force font inheritance for all elements in Expertise section - NO Arial, Times, or system fonts */
        section[style*="Our Expertise"],
        section[style*="Our Expertise"] *,
        .expertise-grid,
        .expertise-grid *,
        .expertise-cards,
        .expertise-cards *,
        .detail-panel,
        .detail-panel * {
          font-family: var(--font-poppins), var(--font-manrope), sans-serif !important;
        }
        .expertise-cards button,
        .expertise-cards button *,
        .expertise-cards h3,
        .expertise-cards p,
        .expertise-cards span {
          font-family: var(--font-poppins), var(--font-manrope), sans-serif !important;
        }
        .detail-panel h3,
        .detail-panel h4,
        .detail-panel p,
        .detail-panel li,
        .detail-panel span,
        .detail-panel a,
        .detail-panel button {
          font-family: var(--font-poppins), var(--font-manrope), sans-serif !important;
        }
        /* Override any browser defaults for headings in expertise section */
        .expertise-cards h3,
        .detail-panel h3,
        .detail-panel h4 {
          font-family: var(--font-headline), sans-serif !important;
        }
        @media (max-width: 968px) {
          .expertise-grid {
            grid-template-columns: 1fr !important;
          }
          .expertise-cards {
            display: flex;
            flex-direction: row;
            overflow-x: auto;
            gap: 1rem;
            padding-bottom: 1rem;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: thin;
          }
          .expertise-cards button {
            min-width: 280px;
            flex-shrink: 0;
          }
          .detail-panel {
            position: relative !important;
            top: 0 !important;
            margin-top: 2rem;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </section>
  );
}

