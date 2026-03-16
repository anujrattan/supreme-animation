"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useCallback, useMemo, useEffect } from "react";
import { getCdnUrl } from "../lib/constants";

// ─── Data ────────────────────────────────────────────────────
type PortfolioItem = {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  thumbnailSrc: string;
  fullSrc: string;
};

const CATEGORY_ORDER = [
  "3D Animation",
  "Architectural Visualization",
  "Gaming",
  "Commercial",
  "Rigging",
  "Medical",
  "Motion Graphics",
] as const;

const PORTFOLIO_ITEMS: PortfolioItem[] = [
  // 3D Animation Production
  {
    id: "thor",
    title: "Thor VS Hanuman",
    subtitle: "Epic Character Animation",
    category: "3D Animation",
    thumbnailSrc:
      getCdnUrl("/portfolio/3d-animation/3d-animation-production/Thumbnail-Thor VS Hanuman_Final2.mp4"),
    fullSrc:
      getCdnUrl("/portfolio/3d-animation/3d-animation-production/compressed/Thor VS Hanuman_Final2.mp4"),
  },
  {
    id: "billu",
    title: "Billu The Dog",
    subtitle: "Character Animation",
    category: "3D Animation",
    thumbnailSrc:
      getCdnUrl("/portfolio/3d-animation/3d-animation-production/Thumbnail-Billu The Dog _ Supreme Animation Studio.mp4"),
    fullSrc:
      getCdnUrl("/portfolio/3d-animation/3d-animation-production/compressed/Billu The Dog _ Supreme Animation Studio.mp4"),
  },
  {
    id: "children-song",
    title: "Children's Song Animation",
    subtitle: "Musical 3D Animation",
    category: "3D Animation",
    thumbnailSrc:
      getCdnUrl("/portfolio/3d-animation/3d-animation-production/Thumbnail-Children song 2d 3d- Final.mp4"),
    fullSrc:
      getCdnUrl("/portfolio/3d-animation/3d-animation-production/compressed/Children song 2d 3d- Final.mp4"),
  },
  {
    id: "cam-active",
    title: "Camera Animation Showcase",
    subtitle: "3D Camera Motion",
    category: "3D Animation",
    thumbnailSrc:
      getCdnUrl("/portfolio/3d-animation/3d-animation-production/Thumbnail-Cam_Active_19_08_Final.mp4"),
    fullSrc:
      getCdnUrl("/portfolio/3d-animation/3d-animation-production/compressed/Cam_Active_19_08_Final.mp4"),
  },
  {
    id: "product-showreel",
    title: "Product Animation Showreel",
    subtitle: "Product Visualization",
    category: "3D Animation",
    thumbnailSrc:
      getCdnUrl("/portfolio/3d-animation/3d-animation-production/Thumbnail-product animation showreel.mp4"),
    fullSrc:
      getCdnUrl("/portfolio/3d-animation/3d-animation-production/compressed/product animation showreel.mp4"),
  },
  {
    id: "studio-reel",
    title: "Studio Portfolio Reel",
    subtitle: "Animation Reel",
    category: "3D Animation",
    thumbnailSrc:
      getCdnUrl("/portfolio/3d-animation/3d-animation-production/Thumbnail-Portfolio.mp4"),
    fullSrc:
      getCdnUrl("/portfolio/3d-animation/3d-animation-production/compressed/Portfolio.mp4"),
  },
  // Architectural Visualization
  {
    id: "arch-4",
    title: "Architectural Flythrough",
    subtitle: "Exterior Visualization",
    category: "Architectural Visualization",
    thumbnailSrc:
      getCdnUrl("/portfolio/3d-animation/architectural-visualization/Thumbnail-architecture_4.mp4"),
    fullSrc:
      getCdnUrl("/portfolio/3d-animation/architectural-visualization/compressed/architecture_4.mp4"),
  },
  {
    id: "archiviz-day-night",
    title: "Day to Night Transition",
    subtitle: "Lighting Animation",
    category: "Architectural Visualization",
    thumbnailSrc:
      getCdnUrl("/portfolio/3d-animation/architectural-visualization/Thumbnail-archiviz day to night.mp4"),
    fullSrc:
      getCdnUrl("/portfolio/3d-animation/architectural-visualization/compressed/archiviz day to night.mp4"),
  },
  {
    id: "podlabs",
    title: "Podlabs Interior Walkthrough",
    subtitle: "Interior Visualization",
    category: "Architectural Visualization",
    thumbnailSrc:
      getCdnUrl("/portfolio/3d-animation/architectural-visualization/Thumbnail-Podlabs Walkthrough Draft.mp4"),
    fullSrc:
      getCdnUrl("/portfolio/3d-animation/architectural-visualization/compressed/Podlabs Walkthrough Draft.mp4"),
  },
  {
    id: "oculus-vr",
    title: "Oculus VR Experience",
    subtitle: "VR Walkthrough",
    category: "Architectural Visualization",
    thumbnailSrc:
      getCdnUrl("/portfolio/3d-animation/architectural-visualization/Thumbnail-Oculus VR Screen Recording.mp4"),
    fullSrc:
      getCdnUrl("/portfolio/3d-animation/architectural-visualization/compressed/Oculus VR Screen Recording.mp4"),
  },
  {
    id: "unreal-arch",
    title: "Unreal Engine ArchViz",
    subtitle: "Real-time Visualization",
    category: "Architectural Visualization",
    thumbnailSrc:
      getCdnUrl("/portfolio/3d-animation/architectural-visualization/Thumbnail-Unreal.mp4"),
    fullSrc:
      getCdnUrl("/portfolio/3d-animation/architectural-visualization/compressed/Unreal.mp4"),
  },
  // Gaming
  {
    id: "montage-trailer",
    title: "Game Trailer Montage",
    subtitle: "Cinematic Trailer",
    category: "Gaming",
    thumbnailSrc:
      getCdnUrl("/portfolio/3d-animation/gaming-environment/Thumbnail-Montage_Trailler_4.mp4"),
    fullSrc:
      getCdnUrl("/portfolio/3d-animation/gaming-environment/compressed/Montage_Trailler_4.mp4"),
  },
  {
    id: "highway-racer",
    title: "Highway Racer",
    subtitle: "Racing Game Environment",
    category: "Gaming",
    thumbnailSrc:
      getCdnUrl("/portfolio/3d-animation/gaming-environment/Thumbnail-Highway Racer.mp4"),
    fullSrc:
      getCdnUrl("/portfolio/3d-animation/gaming-environment/compressed/Highway Racer.mp4"),
  },
  {
    id: "bike-stunt",
    title: "Bike Stunt Game",
    subtitle: "Mobile Game Art",
    category: "Gaming",
    thumbnailSrc:
      getCdnUrl("/portfolio/3d-animation/gaming-environment/Thumbnail-Bike Stunt Game.mp4"),
    fullSrc:
      getCdnUrl("/portfolio/3d-animation/gaming-environment/compressed/Bike Stunt Game.mp4"),
  },
  {
    id: "solar",
    title: "SolAR Experience",
    subtitle: "AR Application",
    category: "Gaming",
    thumbnailSrc:
      getCdnUrl("/portfolio/3d-animation/gaming-environment/Thumbnail-SolAR.mp4"),
    fullSrc:
      getCdnUrl("/portfolio/3d-animation/gaming-environment/compressed/SolAR.mp4"),
  },
  {
    id: "dino-game",
    title: "Dinosaur Adventure Game",
    subtitle: "Mobile Game Art",
    category: "Gaming",
    thumbnailSrc:
      getCdnUrl("/portfolio/3d-animation/gaming-environment/Thumbnail-Dino_Game - Main_Menu - Android - Unity 2020.3.0f1 Personal _DX11_ 2021-06-14 20-48-16-1.mp4"),
    fullSrc:
      getCdnUrl("/portfolio/3d-animation/gaming-environment/compressed/Dino_Game - Main_Menu - Android - Unity 2020.3.0f1 Personal _DX11_ 2021-06-14 20-48-16-1.mp4"),
  },
  {
    id: "kids-animal",
    title: "Kids Animal Game",
    subtitle: "Educational Game",
    category: "Gaming",
    thumbnailSrc:
      getCdnUrl("/portfolio/3d-animation/gaming-environment/Thumbnail-Kids Animal Game.mp4"),
    fullSrc:
      getCdnUrl("/portfolio/3d-animation/gaming-environment/compressed/Kids Animal Game.mp4"),
  },
  {
    id: "2d-animation",
    title: "2D Animation Showcase",
    subtitle: "2D Game Animation",
    category: "Gaming",
    thumbnailSrc:
      getCdnUrl("/portfolio/3d-animation/gaming-environment/Thumbnail-2D Animation.mp4"),
    fullSrc:
      getCdnUrl("/portfolio/3d-animation/gaming-environment/compressed/2D Animation.mp4"),
  },
  {
    id: "solo-gameplay",
    title: "Solo Game Play",
    subtitle: "Game Environment",
    category: "Gaming",
    thumbnailSrc:
      getCdnUrl("/portfolio/3d-animation/gaming-environment/Thumbnail-Solo Game Play.mp4"),
    fullSrc:
      getCdnUrl("/portfolio/3d-animation/gaming-environment/compressed/Solo Game Play.mp4"),
  },
  // Commercial
  {
    id: "mad-croc",
    title: "Mad Croc Commercial",
    subtitle: "Brand Commercial",
    category: "Commercial",
    thumbnailSrc:
      getCdnUrl("/portfolio/3d-animation/3d-animation-production/Thumbnail-Mad Croc-comertial.mp4"),
    fullSrc:
      getCdnUrl("/portfolio/3d-animation/3d-animation-production/compressed/Mad Croc-comertial.mp4"),
  },
  {
    id: "lock-animation",
    title: "Lock Animation",
    subtitle: "Product Commercial",
    category: "Commercial",
    thumbnailSrc:
      getCdnUrl("/portfolio/3d-animation/commercial-brand-animation/Thumbnail-Lock_animation.mp4"),
    fullSrc:
      getCdnUrl("/portfolio/3d-animation/commercial-brand-animation/compressed/Lock_animation.mp4"),
  },
  {
    id: "projection-mapping",
    title: "Projection Mapping",
    subtitle: "Brand Experience",
    category: "Commercial",
    thumbnailSrc:
      getCdnUrl("/portfolio/3d-animation/commercial-brand-animation/Thumbnail-projection mapping.mp4"),
    fullSrc:
      getCdnUrl("/portfolio/3d-animation/commercial-brand-animation/compressed/projection mapping.mp4"),
  },
  // Rigging
  {
    id: "radha-krishna",
    title: "Radha Krishna Rig",
    subtitle: "Character Rigging",
    category: "Rigging",
    thumbnailSrc:
      getCdnUrl("/portfolio/3d-animation/3d-rigging-setup/Thumbnail-RadhaKrishna_Rig.mp4"),
    fullSrc:
      getCdnUrl("/portfolio/3d-animation/3d-rigging-setup/compressed/RadhaKrishna_Rig.mp4"),
  },
  {
    id: "anime-girl",
    title: "Anime Girl Character Rig",
    subtitle: "Character Rigging",
    category: "Rigging",
    thumbnailSrc:
      getCdnUrl("/portfolio/3d-animation/3d-rigging-setup/Thumbnail-anime_Girl.mp4"),
    fullSrc:
      getCdnUrl("/portfolio/3d-animation/3d-rigging-setup/compressed/anime_Girl.mp4"),
  },
  {
    id: "lawrence-rig",
    title: "Lawrence Character Rig",
    subtitle: "Character Rigging",
    category: "Rigging",
    thumbnailSrc:
      getCdnUrl("/portfolio/3d-animation/3d-rigging-setup/Thumbnail-Lawrence_Rig.mp4"),
    fullSrc:
      getCdnUrl("/portfolio/3d-animation/3d-rigging-setup/compressed/Lawrence_Rig.mp4"),
  },
  // Medical
  {
    id: "medical-render",
    title: "Medical Visualization",
    subtitle: "Scientific Animation",
    category: "Medical",
    thumbnailSrc:
      getCdnUrl("/portfolio/3d-animation/medical-scientific-animation/Thumbnail-Final_Render_05.mp4"),
    fullSrc:
      getCdnUrl("/portfolio/3d-animation/medical-scientific-animation/compressed/Final_Render_05.mp4"),
  },
  {
    id: "medical-pillow",
    title: "Medical Pillow Animation",
    subtitle: "Product Animation",
    category: "Medical",
    thumbnailSrc:
      getCdnUrl("/portfolio/3d-animation/medical-scientific-animation/Thumbnail-Medical pillow animation-Final.mp4"),
    fullSrc:
      getCdnUrl("/portfolio/3d-animation/medical-scientific-animation/compressed/Medical pillow animation-Final.mp4"),
  },
  // Motion Graphics
  {
    id: "bank-of-america",
    title: "Bank of America Motion",
    subtitle: "Motion Graphics",
    category: "Motion Graphics",
    thumbnailSrc:
      getCdnUrl("/portfolio/3d-animation/motion-graphics-3d/Thumbnail-Animation for Bank of america.mp4"),
    fullSrc:
      getCdnUrl("/portfolio/3d-animation/motion-graphics-3d/compressed/Animation for Bank of america.mp4"),
  },
  {
    id: "earth-rotation",
    title: "Earth Rotation Animation",
    subtitle: "Motion Graphics",
    category: "Motion Graphics",
    thumbnailSrc:
      getCdnUrl("/portfolio/3d-animation/motion-graphics-3d/Thumbnail-Earth rotation animation_V3.mp4"),
    fullSrc:
      getCdnUrl("/portfolio/3d-animation/motion-graphics-3d/compressed/Earth rotation animation_V3.mp4"),
  },
];

// ─── Category badge colors ────────────────────────────────────
const CATEGORY_COLORS: Record<string, string> = {
  "3D Animation": "#C41E3A",
  "Architectural Visualization": "#1E6FC4",
  Gaming: "#7C3AED",
  Commercial: "#C47C1E",
  Rigging: "#1E9C6B",
  Medical: "#2563EB",
  "Motion Graphics": "#DB2777",
};

// ─── VideoCard ────────────────────────────────────────────────
function VideoCard({
  item,
  index,
  onClick,
}: {
  item: PortfolioItem;
  index: number;
  onClick: (item: PortfolioItem) => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const color = CATEGORY_COLORS[item.category] ?? "#C41E3A";

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    videoRef.current?.play().catch(() => { });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.04 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onClick(item)}
      style={{
        position: "relative",
        aspectRatio: "16/9",
        overflow: "hidden",
        borderRadius: "0.875rem",
        cursor: "pointer",
        backgroundColor: "#0d0d16",
        border: "1px solid rgba(255,255,255,0.06)",
        flexShrink: 0,
      }}
    >
      {/* Video */}
      <video
        ref={videoRef}
        src={item.thumbnailSrc}
        muted
        loop
        playsInline
        preload="metadata"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
          transform: isHovered ? "scale(1.06)" : "scale(1)",
          transition: "transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        }}
      />

      {/* Dark base overlay for readability */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)",
          pointerEvents: "none",
        }}
      />

      {/* Category badge */}
      <div
        style={{
          position: "absolute",
          top: "0.875rem",
          left: "0.875rem",
          padding: "0.2rem 0.65rem",
          borderRadius: "100px",
          fontSize: "0.65rem",
          fontWeight: 700,
          color: "#fff",
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          backgroundColor: color,
          boxShadow: `0 2px 12px ${color}60`,
          fontFamily: "var(--font-poppins), sans-serif",
          zIndex: 2,
        }}
      >
        {item.category}
      </div>

      {/* Hover overlay */}
      <motion.div
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.25 }}
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.4) 55%, transparent 100%)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "1.25rem",
          zIndex: 2,
        }}
      >
        <p
          style={{
            fontSize: "0.7rem",
            color: "rgba(255,255,255,0.55)",
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            marginBottom: "0.3rem",
            fontFamily: "var(--font-poppins), sans-serif",
          }}
        >
          {item.subtitle}
        </p>
        <h3
          style={{
            fontSize: "clamp(0.95rem, 1.5vw, 1.15rem)",
            fontWeight: 700,
            color: "#fff",
            margin: "0 0 0.75rem",
            fontFamily: "var(--font-headline), sans-serif",
            lineHeight: 1.2,
          }}
        >
          {item.title}
        </h3>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.4rem",
          }}
        >
          <div
            style={{
              width: "1.75rem",
              height: "1.75rem",
              borderRadius: "50%",
              backgroundColor: color,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
              <path d="M8 5V19L19 12L8 5Z" fill="#fff" />
            </svg>
          </div>
          <span
            style={{
              fontSize: "0.75rem",
              color: "rgba(255,255,255,0.7)",
              fontWeight: 600,
              letterSpacing: "0.06em",
              fontFamily: "var(--font-poppins), sans-serif",
            }}
          >
            Watch Project
          </span>
        </div>
      </motion.div>

      {/* Subtle play icon when not hovered */}
      <motion.div
        animate={{ opacity: isHovered ? 0 : 0.65 }}
        transition={{ duration: 0.2 }}
        style={{
          position: "absolute",
          bottom: "0.875rem",
          right: "0.875rem",
          width: "2.25rem",
          height: "2.25rem",
          borderRadius: "50%",
          backgroundColor: "rgba(0,0,0,0.55)",
          border: "1px solid rgba(255,255,255,0.25)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backdropFilter: "blur(8px)",
          zIndex: 2,
        }}
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
          <path d="M8 5V19L19 12L8 5Z" fill="rgba(255,255,255,0.9)" />
        </svg>
      </motion.div>
    </motion.div>
  );
}

// ─── Video Modal ──────────────────────────────────────────────
function VideoModal({
  item,
  onClose,
}: {
  item: PortfolioItem | null;
  onClose: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (item) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [item, onClose]);

  useEffect(() => {
    if (item) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [item]);

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 10000,
            backgroundColor: "rgba(0, 0, 0, 0.96)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem",
          }}
        >
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 16 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 16 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            style={{ width: "100%", maxWidth: "1100px" }}
          >
            {/* Modal header */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: "1rem",
              }}
            >
              <div>
                <p
                  style={{
                    fontSize: "0.7rem",
                    color: CATEGORY_COLORS[item.category] ?? "#C41E3A",
                    textTransform: "uppercase",
                    letterSpacing: "0.15em",
                    marginBottom: "0.3rem",
                    fontFamily: "var(--font-poppins), sans-serif",
                    fontWeight: 600,
                  }}
                >
                  {item.subtitle}
                </p>
                <h3
                  style={{
                    fontSize: "clamp(1.1rem, 2vw, 1.4rem)",
                    fontWeight: 700,
                    color: "#fff",
                    margin: 0,
                    fontFamily: "var(--font-headline), sans-serif",
                  }}
                >
                  {item.title}
                </h3>
              </div>
              <button
                onClick={onClose}
                style={{
                  width: "2.5rem",
                  height: "2.5rem",
                  borderRadius: "50%",
                  backgroundColor: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  color: "#fff",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.5rem",
                  lineHeight: "1",
                  flexShrink: 0,
                  transition: "background 0.2s",
                  marginLeft: "1rem",
                }}
                aria-label="Close modal"
              >
                ×
              </button>
            </div>

            {/* Video */}
            <div
              style={{
                aspectRatio: "16/9",
                borderRadius: "0.75rem",
                overflow: "hidden",
                backgroundColor: "#000",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <video
                ref={videoRef}
                src={item.fullSrc}
                controls
                autoPlay
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Main Portfolio Component ─────────────────────────────────
export default function Portfolio() {
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

  const itemsByCategory = useMemo(() => {
    return CATEGORY_ORDER.reduce((acc, cat) => {
      acc[cat] = PORTFOLIO_ITEMS.filter((item) => item.category === cat);
      return acc;
    }, {} as Record<string, PortfolioItem[]>);
  }, []);

  return (
    <section
      style={{
        padding: "5rem 2rem 6rem",
        backgroundColor: "#07070e",
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
          style={{ marginBottom: "3rem" }}
        >
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            viewport={{ once: true }}
            style={{
              fontSize: "0.8rem",
              textTransform: "uppercase",
              letterSpacing: "0.28em",
              color: "#C41E3A",
              marginBottom: "0.75rem",
              fontFamily: "var(--font-poppins), sans-serif",
              fontWeight: 600,
            }}
          >
            Our Work
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            viewport={{ once: true }}
            style={{
              fontSize: "clamp(2.25rem, 5vw, 3.75rem)",
              fontWeight: 800,
              color: "#fff",
              marginBottom: "1rem",
              fontFamily: "var(--font-headline), sans-serif",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
            }}
          >
            Selected Projects
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            viewport={{ once: true }}
            style={{
              fontSize: "clamp(1rem, 1.4vw, 1.15rem)",
              color: "rgba(255,255,255,0.55)",
              maxWidth: "620px",
              fontFamily: "var(--font-poppins), sans-serif",
              fontWeight: 400,
              lineHeight: 1.75,
            }}
          >
            Hover to preview. Click to watch. From cinematic 3D animation to
            architectural walkthroughs and gaming environments.
          </motion.p>
        </motion.div>
        {/* Videos grouped by category */}
        <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
          {CATEGORY_ORDER.map((category) => {
            const items = itemsByCategory[category];
            if (!items || items.length === 0) return null;
            const color = CATEGORY_COLORS[category] ?? "#C41E3A";
            return (
              <section key={category}>
                {/* Category heading */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    justifyContent: "space-between",
                    gap: "1rem",
                    marginBottom: "1.25rem",
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                    <div
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.4rem",
                        padding: "0.25rem 0.75rem",
                        borderRadius: "999px",
                        backgroundColor: `${color}20`,
                        border: `1px solid ${color}60`,
                      }}
                    >
                      <span
                        style={{
                          width: "8px",
                          height: "8px",
                          borderRadius: "999px",
                          backgroundColor: color,
                          boxShadow: `0 0 8px ${color}`,
                        }}
                      />
                      <span
                        style={{
                          fontSize: "0.75rem",
                          textTransform: "uppercase",
                          letterSpacing: "0.16em",
                          fontWeight: 700,
                          color: "#fff",
                          fontFamily: "var(--font-poppins), sans-serif",
                        }}
                      >
                        {category}
                      </span>
                    </div>
                    <span
                      style={{
                        fontSize: "0.8rem",
                        color: "rgba(255,255,255,0.5)",
                        fontFamily: "var(--font-poppins), sans-serif",
                      }}
                    >
                      {items.length} project{items.length > 1 ? "s" : ""} in{" "}
                      {category.toLowerCase()}
                    </span>
                  </div>
                </motion.div>

                {/* Grid for this category */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  viewport={{ once: true }}
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fill, minmax(min(340px, 100%), 1fr))",
                    gap: "0.875rem",
                  }}
                >
                  {items.map((item, index) => (
                    <VideoCard
                      key={item.id}
                      item={item}
                      index={index}
                      onClick={setSelectedItem}
                    />
                  ))}
                </motion.div>
              </section>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          style={{
            textAlign: "center",
            marginTop: "4.5rem",
            paddingTop: "3rem",
            borderTop: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <p
            style={{
              fontSize: "0.95rem",
              color: "rgba(255,255,255,0.4)",
              marginBottom: "1.5rem",
              fontFamily: "var(--font-poppins), sans-serif",
            }}
          >
            Ready to add your project to this collection?
          </p>
          <div
            style={{
              display: "flex",
              gap: "1rem",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
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
                padding: "0.875rem 2rem",
                borderRadius: "100px",
                backgroundColor: "#C41E3A",
                color: "#fff",
                textDecoration: "none",
                fontWeight: 700,
                fontSize: "0.9rem",
                letterSpacing: "0.04em",
                fontFamily: "var(--font-poppins), sans-serif",
                boxShadow: "0 8px 30px rgba(196,30,58,0.35)",
                transition: "all 0.2s ease",
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
            <a
              href="/services"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.6rem",
                padding: "0.875rem 2rem",
                borderRadius: "100px",
                backgroundColor: "transparent",
                border: "1px solid rgba(255,255,255,0.15)",
                color: "rgba(255,255,255,0.75)",
                textDecoration: "none",
                fontWeight: 500,
                fontSize: "0.9rem",
                letterSpacing: "0.04em",
                fontFamily: "var(--font-poppins), sans-serif",
                transition: "all 0.2s ease",
              }}
            >
              Explore Our Services
            </a>
          </div>
        </motion.div>
      </div>

      {/* Video Modal */}
      <VideoModal item={selectedItem} onClose={() => setSelectedItem(null)} />
    </section>
  );
}
