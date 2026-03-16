"use client";

import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Play, Maximize2 } from "lucide-react";
import VideoModal from "./VideoModal";

export interface VideoItem {
  // Primary source (typically used as the base reference)
  src: string;
  // Optional lightweight clip to use for hover playback
  hoverSrc?: string;
  // Optional high-quality / full-duration clip for the modal
  fullSrc?: string;
  alt?: string;
}

interface VideoGalleryProps {
  videos: VideoItem[];
  title?: string;
  subtitle?: string;
}

export default function VideoGallery({
  videos,
  title = "Animation Showcase",
  subtitle,
}: VideoGalleryProps) {
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openVideo = (video: VideoItem) => {
    setSelectedVideo(video);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedVideo(null);
  };

  if (videos.length === 0) {
    return (
      <section style={{ marginBottom: "4rem" }}>
        <div style={{ marginBottom: "3rem" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "1rem",
              flexWrap: "wrap",
              gap: "1rem",
            }}
          >
            <h2
              style={{
                fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                fontFamily: "var(--font-headline), sans-serif",
                fontWeight: 700,
                color: "#1a1a1a",
                margin: 0,
              }}
            >
              {title}
            </h2>
            <div
              style={{
                width: "80px",
                height: "4px",
                background: "linear-gradient(90deg, #C41E3A, #6366f1, #d946ef)",
                borderRadius: "2px",
              }}
            />
          </div>
        </div>
        <div
          style={{
            textAlign: "center",
            padding: "4rem 2rem",
            background: "linear-gradient(135deg, rgba(196, 30, 58, 0.05), rgba(99, 102, 241, 0.05))",
            borderRadius: "1.5rem",
            border: "2px dashed rgba(196, 30, 58, 0.2)",
          }}
        >
          <div
            style={{
              display: "inline-block",
              padding: "1rem 2rem",
              background: "rgba(196, 30, 58, 0.1)",
              borderRadius: "2rem",
              marginBottom: "1rem",
            }}
          >
            <span
              style={{
                fontSize: "1rem",
                fontWeight: 700,
                color: "#C41E3A",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              Coming Soon
            </span>
          </div>
          <p
            style={{
              fontSize: "1.1rem",
              color: "rgba(26,26,26,0.7)",
              fontFamily: "var(--font-poppins), sans-serif",
              margin: 0,
            }}
          >
            Portfolio showcase in progress
          </p>
        </div>
      </section>
    );
  }

  return (
    <>
      <section style={{ marginBottom: "4rem" }}>
        <div style={{ marginBottom: "3rem" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "1rem",
              flexWrap: "wrap",
              gap: "1rem",
            }}
          >
            <h2
              style={{
                fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                fontFamily: "var(--font-headline), sans-serif",
                fontWeight: 700,
                color: "#1a1a1a",
                margin: 0,
              }}
            >
              {title}
            </h2>
            <div
              style={{
                width: "80px",
                height: "4px",
                background: "linear-gradient(90deg, #C41E3A, #6366f1, #d946ef)",
                borderRadius: "2px",
              }}
            />
          </div>
          {subtitle && (
            <p
              style={{
                fontSize: "clamp(1rem, 1.3vw, 1.15rem)",
                color: "rgba(26,26,26,0.7)",
                fontFamily: "var(--font-poppins), sans-serif",
                lineHeight: "1.7",
                maxWidth: "700px",
                margin: 0,
              }}
            >
              {subtitle}
            </p>
          )}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "2rem",
          }}
        >
          {videos.map((video, idx) => (
            <VideoTile
              key={idx}
              video={video}
              index={idx}
              onClick={() => openVideo(video)}
            />
          ))}
        </div>
      </section>

      {/* Modal */}
      {selectedVideo && (
        <VideoModal
          isOpen={isModalOpen}
          onClose={closeModal}
          videoSrc={selectedVideo.fullSrc || selectedVideo.src}
        />
      )}
    </>
  );
}

interface VideoTileProps {
  video: VideoItem;
  index: number;
  onClick: () => void;
}

function VideoTile({ video, index, onClick }: VideoTileProps) {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Play on hover
  useEffect(() => {
    if (videoRef.current) {
      if (isHovered) {
        videoRef.current.play().catch(() => {
          // Autoplay might be blocked, that's okay
        });
      } else {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  }, [isHovered]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      style={{
        borderRadius: "1.5rem",
        overflow: "hidden",
        border: "1px solid rgba(196, 30, 58, 0.15)",
        background: "#0a0a0a",
        boxShadow: isHovered
          ? "0 16px 48px rgba(196, 30, 58, 0.25)"
          : "0 4px 24px rgba(196, 30, 58, 0.12)",
        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        transform: isHovered ? "translateY(-8px) scale(1.02)" : "translateY(0) scale(1)",
        cursor: "pointer",
        position: "relative",
      }}
    >
      {/* Video Container */}
      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "16 / 9",
          overflow: "hidden",
          backgroundColor: "#0a0a0a",
        }}
      >
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="metadata"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            objectPosition: "center",
            transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
            transform: isHovered ? "scale(1.05)" : "scale(1)",
          }}
        >
          <source src={video.hoverSrc || video.src} type="video/mp4" />
          <source src={video.hoverSrc || video.src} type="video/quicktime" />
        </video>

        {/* Play Overlay */}
        <motion.div
          animate={{
            opacity: isHovered ? 0 : 1,
          }}
          transition={{ duration: 0.3 }}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(0, 0, 0, 0.4)",
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              background: "rgba(196, 30, 58, 0.9)",
              boxShadow: "0 8px 32px rgba(196, 30, 58, 0.4)",
            }}
          >
            <Play size={36} color="#ffffff" fill="#ffffff" />
          </div>
        </motion.div>

        {/* Expand Icon on Hover */}
        <motion.div
          animate={{
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
          style={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "48px",
            height: "48px",
            borderRadius: "50%",
            background: "rgba(0, 0, 0, 0.7)",
            backdropFilter: "blur(10px)",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
            pointerEvents: "none",
          }}
        >
          <Maximize2 size={24} color="#ffffff" />
        </motion.div>

        {/* Hover gradient overlay */}
        <motion.div
          animate={{
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "linear-gradient(135deg, rgba(196, 30, 58, 0.1), rgba(99, 102, 241, 0.1))",
            pointerEvents: "none",
          }}
        />
      </div>

      {/* Hover indicator */}
      <motion.div
        animate={{
          width: isHovered ? "100%" : "0%",
        }}
        transition={{ duration: 0.3 }}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          height: "4px",
          background: "linear-gradient(90deg, #C41E3A, #6366f1, #d946ef)",
        }}
      />
    </motion.div>
  );
}
