"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

type ServiceCard = {
  id: number;
  title: string;
  description: string;
  deliverables: string;
  industries: string;
  tagline?: string;
  icon: (props: { color: string; size?: number }) => React.ReactElement;
};

// 3D-style customizable SVG icons
const IconAI = ({ color, size = 24 }: { color: string; size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 2L2 7L12 12L22 7L12 2Z" fill={color} opacity="0.9" />
    <path d="M2 17L12 22L22 17" stroke={color} strokeWidth="2" fill="none" />
    <path d="M2 12L12 17L22 12" stroke={color} strokeWidth="2" fill="none" />
    <circle cx="12" cy="7" r="1.5" fill={color} />
  </svg>
);

const IconHuman = ({ color, size = 24 }: { color: string; size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12" cy="8" r="3" fill={color} opacity="0.9" />
    <path
      d="M6 21C6 17 8.5 14 12 14C15.5 14 18 17 18 21"
      stroke={color}
      strokeWidth="2"
      fill="none"
    />
    <path d="M12 8V14" stroke={color} strokeWidth="2" />
    <circle cx="10" cy="6" r="0.8" fill={color} />
    <circle cx="14" cy="6" r="0.8" fill={color} />
  </svg>
);

const IconGame = ({ color, size = 24 }: { color: string; size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="3"
      y="3"
      width="18"
      height="18"
      rx="2"
      fill={color}
      opacity="0.9"
    />
    <rect
      x="6"
      y="6"
      width="12"
      height="12"
      fill="none"
      stroke={color}
      strokeWidth="1.5"
    />
    <circle cx="9" cy="9" r="1" fill={color} />
    <circle cx="15" cy="9" r="1" fill={color} />
    <path d="M9 15L12 12L15 15" stroke={color} strokeWidth="1.5" fill="none" />
  </svg>
);

const IconProduction = ({
  color,
  size = 24,
}: {
  color: string;
  size?: number;
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="2"
      y="6"
      width="20"
      height="12"
      rx="1"
      fill={color}
      opacity="0.9"
    />
    <circle cx="7" cy="12" r="2" fill="none" stroke={color} strokeWidth="1.5" />
    <circle
      cx="17"
      cy="12"
      r="2"
      fill="none"
      stroke={color}
      strokeWidth="1.5"
    />
    <path d="M12 2L12 6M12 18L12 22" stroke={color} strokeWidth="2" />
    <path d="M9 12L15 12" stroke={color} strokeWidth="1.5" />
  </svg>
);

const IconAnimation = ({
  color,
  size = 24,
}: {
  color: string;
  size?: number;
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 2L3 7L12 12L21 7L12 2Z" fill={color} opacity="0.9" />
    <path d="M3 12L12 17L21 12" stroke={color} strokeWidth="2" fill="none" />
    <path d="M3 17L12 22L21 17" stroke={color} strokeWidth="2" fill="none" />
    <circle cx="12" cy="7" r="1" fill={color} />
    <circle cx="12" cy="12" r="1" fill={color} />
    <circle cx="12" cy="17" r="1" fill={color} />
  </svg>
);

const IconWeb = ({ color, size = 24 }: { color: string; size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="3"
      y="4"
      width="18"
      height="16"
      rx="2"
      fill={color}
      opacity="0.9"
    />
    <path d="M3 8H21" stroke={color} strokeWidth="1.5" />
    <circle cx="7" cy="6" r="0.8" fill={color} />
    <circle cx="9" cy="6" r="0.8" fill={color} />
    <circle cx="11" cy="6" r="0.8" fill={color} />
    <rect
      x="6"
      y="11"
      width="12"
      height="7"
      rx="1"
      fill="none"
      stroke={color}
      strokeWidth="1.5"
    />
  </svg>
);

const services: ServiceCard[] = [
  {
    id: 1,
    title: "AI Avatars & VTubers",
    tagline: "Real-time performers for streams & events",
    description:
      "Real-time performers, branded hosts, and interactive characters ready for streams, events, and virtual assistants.",
    deliverables:
      "Custom rigs, real-time puppeteering systems, lip-sync pipelines, performance direction.",
    industries: "Streaming • Events • Education • Customer Experience",
    icon: IconAI,
  },
  {
    id: 2,
    title: "Digital Humans",
    tagline: "Photoreal humans powered by mocap & AI",
    description:
      "Photoreal humans powered by mocap and AI, designed for marketing films, product demos, and experiential campaigns.",
    deliverables:
      "Head & body scans, facial rigs, motion capture passes, cinematic renders.",
    industries: "Advertising • Fashion • Enterprise Training",
    icon: IconHuman,
  },
  {
    id: 3,
    title: "Game Art & Assets",
    tagline: "Premium characters, environments & props",
    description:
      "Stylized or realistic characters, environments, props, and UI elements crafted for premium gameplay.",
    deliverables:
      "Hero characters, modular environments, FX-ready assets, Unity/Unreal integration.",
    industries: "Gaming • Metaverse • Simulation",
    icon: IconGame,
  },
  {
    id: 4,
    title: "Virtual Production",
    tagline: "LED volumes & XR workflows for film",
    description:
      "LED volumes, previs, and on-set XR workflows that merge physical shoots with digital worlds.",
    deliverables:
      "Virtual sets, camera tracking profiles, lighting looks, render-ready scenes.",
    industries: "Film • Broadcast • Live Events",
    icon: IconProduction,
  },
  {
    id: 5,
    title: "Kids Animation",
    tagline: "Whimsical storytelling for series & apps",
    description:
      "Whimsical storytelling for series, apps, and educational content with age-specific writing and design.",
    deliverables:
      "Character bibles, animatics, episodic cuts, localized versions.",
    industries: "EdTech • Networks • Publishers",
    icon: IconAnimation,
  },
  {
    id: 6,
    title: "Web & App Development",
    tagline: "Full-stack teams building digital products",
    description:
      "Full-stack teams building high-performance digital products with embedded 3D/interactive layers.",
    deliverables:
      "Product strategy, UI systems, front/back-end builds, deployments.",
    industries: "Startups • Consumer Brands • Enterprise",
    icon: IconWeb,
  },
];

export default function Services() {
  const [selectedService, setSelectedService] = useState<number>(1);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 968);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section
      style={{
        padding: "6rem 2rem",
        backgroundColor: "#ffffff",
        position: "relative",
        zIndex: 10,
      }}
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          style={{
            textAlign: "center",
            marginBottom: "4rem",
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
              marginBottom: "1rem",
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
              marginBottom: "1.5rem",
              fontFamily: "var(--font-headline), sans-serif",
              lineHeight: "1.2",
              letterSpacing: "-0.02em",
            }}
          >
            End-to-End Production Across Physical & Digital Worlds
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            viewport={{ once: true }}
            style={{
              fontSize: "clamp(1rem, 1.5vw, 1.25rem)",
              color: "rgba(26, 26, 26, 0.7)",
              marginBottom: "0",
              maxWidth: "760px",
              marginLeft: "auto",
              marginRight: "auto",
              lineHeight: "1.7",
              fontFamily: "var(--font-poppins), sans-serif",
            }}
          >
            From AI-born characters to enterprise-grade applications, our teams
            plug in at any point in the pipeline to accelerate delivery.
          </motion.p>
        </motion.div>

        {/* Desktop: Split View | Mobile: Accordion */}
        {!isMobile ? (
          <div
            className="services-split-view"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "2rem",
              marginTop: "3rem",
            }}
          >
            {/* Left: Vertical Strips */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
              }}
            >
              {services.map((service) => {
                const isActive = selectedService === service.id;
                return (
                  <motion.button
                    key={service.id}
                    onClick={() => setSelectedService(service.id)}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: service.id * 0.05 }}
                    viewport={{ once: true }}
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                      padding: "1.75rem 2rem",
                      borderRadius: "1rem",
                      border: isActive
                        ? "1px solid #C41E3A"
                        : "1px solid rgba(0, 0, 0, 0.08)",
                      background: isActive
                        ? "linear-gradient(135deg, rgba(196, 30, 58, 0.08), rgba(196, 30, 58, 0.03))"
                        : "linear-gradient(135deg, rgba(250, 250, 250, 0.8), rgba(255, 255, 255, 0.95))",
                      cursor: "pointer",
                      textAlign: "left",
                      transition: "all 0.3s ease",
                      position: "relative",
                      overflow: "hidden",
                      boxShadow: isActive
                        ? "0 4px 20px rgba(196, 30, 58, 0.1)"
                        : "0 2px 8px rgba(0, 0, 0, 0.03)",
                    }}
                  >
                    {/* Active indicator line */}
                    {isActive && (
                      <motion.div
                        layoutId="activeIndicator"
                        style={{
                          position: "absolute",
                          left: 0,
                          top: 0,
                          bottom: 0,
                          width: "3px",
                          background: "#C41E3A",
                        }}
                      />
                    )}

                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "1rem",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          minWidth: "48px",
                          height: "48px",
                          borderRadius: "0.75rem",
                          background: isActive
                            ? "rgba(196, 30, 58, 0.12)"
                            : "rgba(0, 0, 0, 0.04)",
                          padding: "0.5rem",
                        }}
                      >
                        {service.icon({
                          color: isActive ? "#C41E3A" : "rgba(26, 26, 26, 0.6)",
                          size: 24,
                        })}
                      </div>
                      <div style={{ flex: 1 }}>
                        <h3
                          style={{
                            fontSize: "clamp(1.25rem, 2vw, 1.5rem)",
                            color: "#1a1a1a",
                            marginBottom: "0.5rem",
                            fontWeight: 700,
                            fontFamily: "var(--font-headline), sans-serif",
                          }}
                        >
                          {service.title}
                        </h3>
                        {service.tagline && (
                          <p
                            style={{
                              fontSize: "0.9rem",
                              color: "rgba(26, 26, 26, 0.6)",
                              lineHeight: 1.4,
                            }}
                          >
                            {service.tagline}
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Right: Details Panel */}
            <div
              className="services-details-panel"
              style={{
                position: "sticky",
                top: "2rem",
                height: "fit-content",
                maxHeight: "calc(100vh - 4rem)",
                overflowY: "hidden",
              }}
            >
              <AnimatePresence mode="wait">
                {services
                  .filter((service) => service.id === selectedService)
                  .map((service) => (
                    <motion.div
                      key={service.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      style={{
                        padding: "2.5rem",
                        borderRadius: "1.25rem",
                        border: "1px solid rgba(0, 0, 0, 0.08)",
                        background:
                          "linear-gradient(135deg, rgba(250, 250, 250, 0.8), rgba(255, 255, 255, 0.95))",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.04)",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "1rem",
                          marginBottom: "1.5rem",
                          paddingBottom: "1.5rem",
                          borderBottom: "1px solid rgba(0, 0, 0, 0.08)",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "56px",
                            height: "56px",
                            borderRadius: "0.75rem",
                            background: "rgba(196, 30, 58, 0.12)",
                            padding: "0.75rem",
                          }}
                        >
                          {service.icon({ color: "#C41E3A", size: 32 })}
                        </div>
                        <h3
                          style={{
                            fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
                            color: "#1a1a1a",
                            fontWeight: 700,
                            margin: 0,
                            flex: 1,
                            fontFamily: "var(--font-headline), sans-serif",
                          }}
                        >
                          {service.title}
                        </h3>
                      </div>

                      <p
                        style={{
                          fontSize: "1rem",
                          color: "rgba(26, 26, 26, 0.85)",
                          lineHeight: 1.6,
                          marginBottom: "1.5rem",
                          flex: "0 0 auto",
                        }}
                      >
                        {service.description}
                      </p>

                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "1.25rem",
                          flex: "1 1 auto",
                          overflow: "hidden",
                        }}
                      >
                        <div>
                          <h4
                            style={{
                              fontSize: "0.85rem",
                              textTransform: "uppercase",
                              letterSpacing: "0.15em",
                              color: "#C41E3A",
                              marginBottom: "0.5rem",
                              fontWeight: 600,
                            }}
                          >
                            Deliverables
                          </h4>
                          <p
                            style={{
                              fontSize: "0.9rem",
                              color: "rgba(26, 26, 26, 0.75)",
                              lineHeight: 1.5,
                            }}
                          >
                            {service.deliverables}
                          </p>
                        </div>

                        <div>
                          <h4
                            style={{
                              fontSize: "0.85rem",
                              textTransform: "uppercase",
                              letterSpacing: "0.15em",
                              color: "#C41E3A",
                              marginBottom: "0.5rem",
                              fontWeight: 600,
                            }}
                          >
                            Industries
                          </h4>
                          <p
                            style={{
                              fontSize: "0.9rem",
                              color: "rgba(26, 26, 26, 0.75)",
                              lineHeight: 1.5,
                            }}
                          >
                            {service.industries}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
              </AnimatePresence>
            </div>
          </div>
        ) : (
          /* Mobile: Accordion Layout */
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
              marginTop: "3rem",
            }}
          >
            {services.map((service) => {
              const isActive = selectedService === service.id;
              return (
                <div key={service.id}>
                  <motion.button
                    onClick={() =>
                      setSelectedService(isActive ? 0 : service.id)
                    }
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: service.id * 0.05 }}
                    viewport={{ once: true }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                      width: "100%",
                      padding: "1.25rem 1.5rem",
                      borderRadius: "0.75rem",
                        border: isActive
                        ? "1px solid #C41E3A"
                        : "1px solid rgba(0, 0, 0, 0.1)",
                      background: isActive
                        ? "linear-gradient(135deg, rgba(196, 30, 58, 0.15), rgba(196, 30, 58, 0.05))"
                        : "rgba(255, 255, 255, 0.02)",
                      cursor: "pointer",
                      textAlign: "left",
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "1rem",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          minWidth: "40px",
                          height: "40px",
                          borderRadius: "0.5rem",
                          background: isActive
                            ? "rgba(196, 30, 58, 0.15)"
                            : "rgba(0, 0, 0, 0.03)",
                          padding: "0.5rem",
                        }}
                      >
                        {service.icon({
                          color: isActive ? "#C41E3A" : "rgba(26, 26, 26, 0.6)",
                          size: 20,
                        })}
                      </div>
                      <div style={{ flex: 1 }}>
                        <h3
                          style={{
                            fontSize: "1.1rem",
                            color: "#1a1a1a",
                            marginBottom: "0.25rem",
                            fontWeight: 700,
                          }}
                        >
                          {service.title}
                        </h3>
                        {service.tagline && (
                          <p
                            style={{
                              fontSize: "0.8rem",
                              color: "rgba(26, 26, 26, 0.6)",
                              lineHeight: 1.3,
                            }}
                          >
                            {service.tagline}
                          </p>
                        )}
                      </div>
                      <motion.div
                        animate={{ rotate: isActive ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        style={{
                          fontSize: "1.5rem",
                          color: isActive ? "#C41E3A" : "rgba(26, 26, 26, 0.4)",
                        }}
                      >
                        ▼
                      </motion.div>
                    </div>
                  </motion.button>

                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        style={{ overflow: "hidden" }}
                      >
                        <div
                          style={{
                            padding: "1.5rem",
                            marginTop: "0.75rem",
                            borderRadius: "0.75rem",
                            border: "1px solid rgba(0, 0, 0, 0.08)",
                            background:
                              "linear-gradient(135deg, rgba(196, 30, 58, 0.05), rgba(255, 255, 255, 0.9))",
                          }}
                        >
                          <p
                            style={{
                              fontSize: "0.95rem",
                              color: "rgba(26, 26, 26, 0.85)",
                              lineHeight: 1.6,
                              marginBottom: "1.5rem",
                            }}
                          >
                            {service.description}
                          </p>

                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              gap: "1rem",
                            }}
                          >
                            <div>
                              <h4
                                style={{
                                  fontSize: "0.8rem",
                                  textTransform: "uppercase",
                                  letterSpacing: "0.15em",
                                  color: "#C41E3A",
                                  marginBottom: "0.5rem",
                                  fontWeight: 600,
                                }}
                              >
                                Deliverables
                              </h4>
                              <p
                                style={{
                                  fontSize: "0.85rem",
                                  color: "rgba(26, 26, 26, 0.75)",
                                  lineHeight: 1.5,
                                }}
                              >
                                {service.deliverables}
                              </p>
                            </div>

                            <div>
                              <h4
                                style={{
                                  fontSize: "0.8rem",
                                  textTransform: "uppercase",
                                  letterSpacing: "0.15em",
                                  color: "#C41E3A",
                                  marginBottom: "0.5rem",
                                  fontWeight: 600,
                                }}
                              >
                                Industries
                              </h4>
                              <p
                                style={{
                                  fontSize: "0.85rem",
                                  color: "rgba(26, 26, 26, 0.75)",
                                  lineHeight: 1.5,
                                }}
                              >
                                {service.industries}
                              </p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
