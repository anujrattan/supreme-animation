"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useCallback } from "react";
import { X } from "lucide-react";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoSrc: string;
}

export default function VideoModal({ isOpen, onClose, videoSrc }: VideoModalProps) {
  const closeModal = useCallback(() => {
    onClose();
    document.body.style.overflow = "unset";
  }, [onClose]);

  const openModal = useCallback(() => {
    document.body.style.overflow = "hidden";
  }, []);

  useEffect(() => {
    if (isOpen) {
      openModal();
    } else {
      closeModal();
    }
  }, [isOpen, openModal, closeModal]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "Escape") {
        closeModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeModal]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={closeModal}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.95)",
          zIndex: 9999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
          cursor: "pointer",
        }}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          style={{
            position: "relative",
            maxWidth: "95vw",
            maxHeight: "95vh",
            width: "100%",
            borderRadius: "1.5rem",
            overflow: "hidden",
            backgroundColor: "#0a0a0a",
            boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5)",
            cursor: "default",
          }}
        >
          {/* Header */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              zIndex: 10000,
              background: "linear-gradient(180deg, rgba(0,0,0,0.8) 0%, transparent 100%)",
              padding: "2rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              style={{
                background: "rgba(0, 0, 0, 0.7)",
                border: "none",
                borderRadius: "50%",
                width: "48px",
                height: "48px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: "#ffffff",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(196, 30, 58, 0.9)";
                e.currentTarget.style.transform = "scale(1.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(0, 0, 0, 0.7)";
                e.currentTarget.style.transform = "scale(1)";
              }}
              aria-label="Close modal"
            >
              <X size={24} />
            </button>
          </div>

          {/* Video Content */}
          <div
            style={{
              position: "relative",
              width: "100%",
              aspectRatio: "16/9",
              backgroundColor: "#0a0a0a",
            }}
          >
            <video
              key={videoSrc}
              controls
              autoPlay
              playsInline
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
            >
              <source src={videoSrc} type="video/mp4" />
              <source src={videoSrc} type="video/quicktime" />
            </video>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
