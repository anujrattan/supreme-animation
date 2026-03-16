"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { X, Play } from "lucide-react";

interface PortfolioItem {
  title: string;
  description: string;
  image?: string;
  video?: string;
  thumbnail?: string;
  client?: string;
  year?: string;
  category?: string;
}

interface PortfolioShowcaseProps {
  items: PortfolioItem[];
  title?: string;
  subtitle?: string;
}

export default function PortfolioShowcase({ 
  items, 
  title = "Featured Work",
  subtitle 
}: PortfolioShowcaseProps) {
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedItem(null);
    document.body.style.overflow = "unset";
  }, []);

  const openModal = useCallback((item: PortfolioItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isModalOpen) {
        closeModal();
      }
    };

    if (isModalOpen) {
      window.addEventListener("keydown", handleEscape);
      return () => {
        window.removeEventListener("keydown", handleEscape);
      };
    }
  }, [isModalOpen, closeModal]);

  return (
    <>
      <section style={{ marginBottom: "4rem" }}>
        <div style={{ marginBottom: "3rem" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem", flexWrap: "wrap", gap: "1rem" }}>
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
          {items.map((item, idx) => (
            <PortfolioCard
              key={idx}
              item={item}
              index={idx}
              onOpen={() => openModal(item)}
            />
          ))}
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {isModalOpen && selectedItem && (
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
                maxWidth: "90vw",
                maxHeight: "90vh",
                width: "100%",
                borderRadius: "1.5rem",
                overflow: "hidden",
                backgroundColor: "#1a1a1a",
                boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5)",
              }}
            >
              {/* Close Button */}
              <button
                onClick={closeModal}
                style={{
                  position: "absolute",
                  top: "1rem",
                  right: "1rem",
                  zIndex: 10000,
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

              {/* Media Content */}
              <div style={{ position: "relative", width: "100%", aspectRatio: "16/9" }}>
                {selectedItem.video ? (
                  <video
                    controls
                    autoPlay
                    playsInline
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                    }}
                  >
                    <source src={selectedItem.video} type="video/mp4" />
                  </video>
                ) : selectedItem.image ? (
                  <Image
                    src={selectedItem.image}
                    alt={selectedItem.title}
                    fill
                    style={{
                      objectFit: "contain",
                    }}
                    sizes="90vw"
                  />
                ) : null}
              </div>

              {/* Caption */}
              <div
                style={{
                  padding: "2rem",
                  backgroundColor: "#1a1a1a",
                  color: "#ffffff",
                }}
              >
                <h3
                  style={{
                    fontSize: "1.5rem",
                    fontFamily: "var(--font-headline), sans-serif",
                    fontWeight: 700,
                    marginBottom: "0.5rem",
                    color: "#ffffff",
                  }}
                >
                  {selectedItem.title}
                </h3>
                <p
                  style={{
                    fontSize: "1rem",
                    color: "rgba(255,255,255,0.8)",
                    fontFamily: "var(--font-poppins), sans-serif",
                    lineHeight: "1.6",
                    marginBottom: "1rem",
                  }}
                >
                  {selectedItem.description}
                </p>
                {(selectedItem.client || selectedItem.year || selectedItem.category) && (
                  <div
                    style={{
                      display: "flex",
                      gap: "1.5rem",
                      flexWrap: "wrap",
                      fontSize: "0.9rem",
                      color: "rgba(255,255,255,0.6)",
                    }}
                  >
                    {selectedItem.client && <span>Client: {selectedItem.client}</span>}
                    {selectedItem.year && <span>Year: {selectedItem.year}</span>}
                    {selectedItem.category && <span>Category: {selectedItem.category}</span>}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

interface PortfolioCardProps {
  item: PortfolioItem;
  index: number;
  onOpen: () => void;
}

function PortfolioCard({ item, index, onOpen }: PortfolioCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const hasMedia = item.image || item.video || item.thumbnail;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onOpen}
      style={{
        borderRadius: "1.5rem",
        overflow: "hidden",
        border: "1px solid rgba(196, 30, 58, 0.15)",
        background: "linear-gradient(135deg, rgba(255, 255, 255, 0.98), rgba(248, 249, 250, 0.98))",
        boxShadow: isHovered
          ? "0 16px 48px rgba(196, 30, 58, 0.2)"
          : "0 4px 24px rgba(196, 30, 58, 0.1)",
        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        transform: isHovered ? "translateY(-8px)" : "translateY(0)",
        cursor: "pointer",
        position: "relative",
      }}
    >
      {/* Media Area */}
      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "16 / 9",
          overflow: "hidden",
          backgroundColor: "#f0f0f0",
        }}
      >
        {hasMedia ? (
          <>
            {item.video || item.thumbnail ? (
              <div style={{ position: "relative", width: "100%", height: "100%" }}>
                {item.thumbnail ? (
                  <Image
                    src={item.thumbnail}
                    alt={item.title}
                    fill
                    style={{
                      objectFit: "cover",
                      transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                      transform: isHovered ? "scale(1.1)" : "scale(1)",
                    }}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
                    <Play
                      size={64}
                      color="#ffffff"
                      style={{
                        opacity: isHovered ? 1 : 0.7,
                        transition: "opacity 0.3s ease",
                      }}
                    />
                  </div>
                )}
                {/* Play overlay */}
                {item.video && (
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: isHovered ? "rgba(0, 0, 0, 0.3)" : "rgba(0, 0, 0, 0.1)",
                      transition: "background 0.3s ease",
                    }}
                  >
                    <motion.div
                      animate={{
                        scale: isHovered ? 1.2 : 1,
                        opacity: isHovered ? 1 : 0.8,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <Play
                        size={isHovered ? 72 : 64}
                        color="#ffffff"
                        fill="#ffffff"
                        style={{
                          filter: "drop-shadow(0 4px 12px rgba(0, 0, 0, 0.3))",
                        }}
                      />
                    </motion.div>
                  </div>
                )}
              </div>
            ) : item.image ? (
              <Image
                src={item.image}
                alt={item.title}
                fill
                style={{
                  objectFit: "cover",
                  transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  transform: isHovered ? "scale(1.1)" : "scale(1)",
                }}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            ) : null}
          </>
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              background: `linear-gradient(135deg, ${["#C41E3A", "#6366f1", "#d946ef"][index % 3]}, ${["#6366f1", "#d946ef", "#06b6d4"][(index + 1) % 3]})`,
              opacity: 0.15,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                fontSize: "3rem",
                opacity: 0.3,
              }}
            >
              🎨
            </div>
          </div>
        )}

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
            background: "linear-gradient(135deg, rgba(196, 30, 58, 0.2), rgba(99, 102, 241, 0.2))",
            pointerEvents: "none",
          }}
        />
      </div>

      {/* Content */}
      <div style={{ padding: "1.75rem" }}>
        <h3
          style={{
            fontSize: "1.25rem",
            fontFamily: "var(--font-headline), sans-serif",
            fontWeight: 700,
            color: "#1a1a1a",
            marginBottom: "0.75rem",
            lineHeight: "1.3",
          }}
        >
          {item.title}
        </h3>
        <p
          style={{
            fontSize: "0.95rem",
            color: "rgba(26,26,26,0.7)",
            fontFamily: "var(--font-poppins), sans-serif",
            lineHeight: "1.6",
            margin: 0,
            marginBottom: item.client || item.year ? "1rem" : 0,
          }}
        >
          {item.description}
        </p>
        {(item.client || item.year) && (
          <div
            style={{
              display: "flex",
              gap: "1rem",
              marginTop: "0.75rem",
              paddingTop: "0.75rem",
              borderTop: "1px solid rgba(196, 30, 58, 0.1)",
              fontSize: "0.85rem",
              color: "rgba(26,26,26,0.6)",
            }}
          >
            {item.client && <span>Client: {item.client}</span>}
            {item.year && <span>• {item.year}</span>}
          </div>
        )}
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
          height: "3px",
          background: "linear-gradient(90deg, #C41E3A, #6366f1, #d946ef)",
        }}
      />
    </motion.div>
  );
}
