"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { Maximize2 } from "lucide-react";
import PortfolioCategoryModal from "./PortfolioCategoryModal";

export interface ImageItem {
  src: string;
  alt?: string;
  type?: "image" | "video";
}

interface ImageGalleryProps {
  images: ImageItem[];
  title?: string;
  subtitle?: string;
}

export default function ImageGallery({
  images,
  title = "Portfolio Showcase",
  subtitle,
}: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (index: number) => {
    setSelectedIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (images.length === 0) {
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
          {subtitle && (
            <p
              style={{
                fontSize: "1.1rem",
                color: "rgba(26,26,26,0.7)",
                fontFamily: "var(--font-poppins), sans-serif",
                margin: 0,
              }}
            >
              {subtitle}
            </p>
          )}
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

  // Convert images to the format expected by PortfolioCategoryModal
  const portfolioItems = images.map((img, index) => ({
    src: img.src,
    alt: img.alt || `Product visualization ${index + 1}`,
    type: img.type || "image",
  }));

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
        {subtitle && (
          <p
            style={{
              fontSize: "1.1rem",
              color: "rgba(26,26,26,0.7)",
              fontFamily: "var(--font-poppins), sans-serif",
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
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "1.5rem",
        }}
      >
        {images.map((image, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            whileHover={{ scale: 1.02 }}
            style={{
              position: "relative",
              aspectRatio: "4/3",
              borderRadius: "1rem",
              overflow: "hidden",
              cursor: "pointer",
              background: "#f5f5f5",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
            onClick={() => openModal(index)}
          >
            <Image
              src={image.src}
              alt={image.alt || `Product visualization ${index + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{
                objectFit: "contain",
                objectPosition: "center",
              }}
            />
            
            {/* Overlay on hover */}
            <motion.div
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "opacity 0.3s",
              }}
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                style={{
                  background: "rgba(196, 30, 58, 0.9)",
                  borderRadius: "50%",
                  padding: "1rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Maximize2 size={24} color="#ffffff" />
              </motion.div>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {isModalOpen && (
        <PortfolioCategoryModal
          isOpen={isModalOpen}
          onClose={closeModal}
          categoryName={title}
          images={portfolioItems}
          initialIndex={selectedIndex}
        />
      )}
    </section>
  );
}
