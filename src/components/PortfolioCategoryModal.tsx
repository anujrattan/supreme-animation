"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Play } from "lucide-react";

export interface PortfolioImage {
  src: string;
  alt: string;
  type: "image" | "video";
  thumbnail?: string;
  title?: string;
  description?: string;
}

interface PortfolioCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  categoryName: string;
  images: PortfolioImage[];
  initialIndex?: number;
}

export default function PortfolioCategoryModal({
  isOpen,
  onClose,
  categoryName,
  images,
  initialIndex = 0,
}: PortfolioCategoryModalProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isLoading, setIsLoading] = useState(true);

  // Set to initial index when modal opens
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(Math.max(0, Math.min(initialIndex, images.length - 1)));
      setIsLoading(true);
    }
  }, [isOpen, initialIndex, images.length]);

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
      } else if (e.key === "ArrowLeft") {
        goToPrevious();
      } else if (e.key === "ArrowRight") {
        goToNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeModal]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  const currentImage = images[currentIndex];

  if (!isOpen || images.length === 0) return null;

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
            backgroundColor: "#1a1a1a",
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
              justifyContent: "space-between",
            }}
          >
            <div>
              <h3
                style={{
                  fontSize: "1.5rem",
                  fontFamily: "var(--font-headline), sans-serif",
                  fontWeight: 700,
                  color: "#ffffff",
                  margin: 0,
                  marginBottom: "0.25rem",
                }}
              >
                {categoryName}
              </h3>
              <p
                style={{
                  fontSize: "0.9rem",
                  color: "rgba(255,255,255,0.7)",
                  margin: 0,
                }}
              >
                {currentIndex + 1} of {images.length}
              </p>
            </div>

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

          {/* Media Content */}
          <div
            style={{
              position: "relative",
              width: "100%",
              aspectRatio: "16/9",
              backgroundColor: "#0a0a0a",
            }}
          >
            {currentImage.type === "video" ? (
              <video
                key={currentIndex}
                controls
                autoPlay
                playsInline
                onLoadedData={() => setIsLoading(false)}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                }}
              >
                <source src={currentImage.src} type="video/mp4" />
              </video>
            ) : (
              <Image
                key={currentIndex}
                src={currentImage.src}
                alt={currentImage.alt}
                fill
                style={{
                  objectFit: "contain",
                }}
                sizes="95vw"
                onLoad={() => setIsLoading(false)}
                priority
              />
            )}

            {/* Loading indicator */}
            {isLoading && (
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  color: "#ffffff",
                  fontSize: "1.2rem",
                }}
              >
                Loading...
              </div>
            )}

            {/* Navigation Arrows */}
            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    goToPrevious();
                  }}
                  style={{
                    position: "absolute",
                    left: "1rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "rgba(0, 0, 0, 0.7)",
                    border: "none",
                    borderRadius: "50%",
                    width: "56px",
                    height: "56px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    color: "#ffffff",
                    transition: "all 0.3s ease",
                    zIndex: 10001,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(196, 30, 58, 0.9)";
                    e.currentTarget.style.transform = "translateY(-50%) scale(1.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(0, 0, 0, 0.7)";
                    e.currentTarget.style.transform = "translateY(-50%) scale(1)";
                  }}
                  aria-label="Previous image"
                >
                  <ChevronLeft size={28} />
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    goToNext();
                  }}
                  style={{
                    position: "absolute",
                    right: "1rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "rgba(0, 0, 0, 0.7)",
                    border: "none",
                    borderRadius: "50%",
                    width: "56px",
                    height: "56px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    color: "#ffffff",
                    transition: "all 0.3s ease",
                    zIndex: 10001,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(196, 30, 58, 0.9)";
                    e.currentTarget.style.transform = "translateY(-50%) scale(1.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(0, 0, 0, 0.7)";
                    e.currentTarget.style.transform = "translateY(-50%) scale(1)";
                  }}
                  aria-label="Next image"
                >
                  <ChevronRight size={28} />
                </button>
              </>
            )}
          </div>

          {/* Footer with image info */}
          {(currentImage.title || currentImage.description) && (
            <div
              style={{
                padding: "2rem",
                backgroundColor: "#1a1a1a",
                color: "#ffffff",
                borderTop: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              {currentImage.title && (
                <h4
                  style={{
                    fontSize: "1.25rem",
                    fontFamily: "var(--font-headline), sans-serif",
                    fontWeight: 700,
                    marginBottom: "0.5rem",
                    color: "#ffffff",
                  }}
                >
                  {currentImage.title}
                </h4>
              )}
              {currentImage.description && (
                <p
                  style={{
                    fontSize: "1rem",
                    color: "rgba(255,255,255,0.8)",
                    fontFamily: "var(--font-poppins), sans-serif",
                    lineHeight: "1.6",
                    margin: 0,
                  }}
                >
                  {currentImage.description}
                </p>
              )}
            </div>
          )}

          {/* Thumbnail Strip (if multiple images) */}
          {images.length > 1 && (
            <div
              style={{
                position: "absolute",
                bottom: currentImage.title || currentImage.description ? "80px" : "1rem",
                left: "50%",
                transform: "translateX(-50%)",
                display: "flex",
                gap: "0.75rem",
                padding: "0.75rem",
                background: "rgba(0, 0, 0, 0.7)",
                borderRadius: "0.75rem",
                backdropFilter: "blur(10px)",
                zIndex: 10001,
                maxWidth: "90%",
                overflowX: "auto",
              }}
            >
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentIndex(idx);
                    setIsLoading(true);
                  }}
                  style={{
                    position: "relative",
                    width: "80px",
                    height: "45px",
                    borderRadius: "0.5rem",
                    overflow: "hidden",
                    border: currentIndex === idx ? "3px solid #C41E3A" : "2px solid transparent",
                    cursor: "pointer",
                    opacity: currentIndex === idx ? 1 : 0.7,
                    transition: "all 0.3s ease",
                    background: "#0a0a0a",
                    padding: 0,
                  }}
                  onMouseEnter={(e) => {
                    if (currentIndex !== idx) {
                      e.currentTarget.style.opacity = "1";
                      e.currentTarget.style.transform = "scale(1.1)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (currentIndex !== idx) {
                      e.currentTarget.style.opacity = "0.7";
                      e.currentTarget.style.transform = "scale(1)";
                    }
                  }}
                  aria-label={`View image ${idx + 1}`}
                >
                  {img.type === "video" ? (
                    <>
                      {img.thumbnail ? (
                        <Image
                          src={img.thumbnail}
                          alt={img.alt}
                          fill
                          style={{ objectFit: "cover" }}
                          sizes="80px"
                        />
                      ) : (
                        <div
                          style={{
                            width: "100%",
                            height: "100%",
                            background: "linear-gradient(135deg, #C41E3A, #6366f1)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Play size={20} color="#ffffff" />
                        </div>
                      )}
                    </>
                  ) : (
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      style={{ objectFit: "cover" }}
                      sizes="80px"
                    />
                  )}
                </button>
              ))}
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
