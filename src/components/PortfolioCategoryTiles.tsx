"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { Play, Image as ImageIcon } from "lucide-react";
import PortfolioCategoryModal, { type PortfolioImage } from "./PortfolioCategoryModal";

export interface PortfolioCategory {
  id: string;
  name: string;
  description?: string;
  thumbnail?: string;
  imageCount: number;
  images: PortfolioImage[];
}

interface PortfolioCategoryTilesProps {
  categories: PortfolioCategory[];
  title?: string;
  subtitle?: string;
}

export default function PortfolioCategoryTiles({
  categories,
  title = "Portfolio Categories",
  subtitle,
}: PortfolioCategoryTilesProps) {
  const [selectedCategory, setSelectedCategory] = useState<PortfolioCategory | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openCategory = (category: PortfolioCategory) => {
    if (category.images.length === 0) return;
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCategory(null);
  };

  if (categories.length === 0) return null;

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
            gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
            gap: "2.5rem",
          }}
        >
          {categories.map((category, idx) => (
            <CategoryTile
              key={category.id}
              category={category}
              index={idx}
              onClick={() => openCategory(category)}
            />
          ))}
        </div>
      </section>

      {/* Modal */}
      {selectedCategory && (
        <PortfolioCategoryModal
          isOpen={isModalOpen}
          onClose={closeModal}
          categoryName={selectedCategory.name}
          images={selectedCategory.images}
        />
      )}
    </>
  );
}

interface CategoryTileProps {
  category: PortfolioCategory;
  index: number;
  onClick: () => void;
}

function CategoryTile({ category, index, onClick }: CategoryTileProps) {
  const [isHovered, setIsHovered] = useState(false);
  const hasImages = category.images.length > 0;
  const hasThumbnail = category.thumbnail !== undefined;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={hasImages ? onClick : undefined}
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
        cursor: hasImages ? "pointer" : "default",
        position: "relative",
        opacity: hasImages ? 1 : 0.6,
      }}
    >
      {/* Thumbnail Area */}
      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "16 / 9",
          overflow: "hidden",
          backgroundColor: "#f0f0f0",
        }}
      >
        {hasThumbnail ? (
          <Image
            src={category.thumbnail!}
            alt={category.name}
            fill
            style={{
              objectFit: "contain",
              objectPosition: "center",
              transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
              transform: isHovered ? "scale(1.05)" : "scale(1)",
            }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              background: `linear-gradient(135deg, ${["#C41E3A", "#6366f1", "#d946ef", "#06b6d4"][index % 4]}, ${["#6366f1", "#d946ef", "#06b6d4", "#10b981"][(index + 1) % 4]})`,
              opacity: 0.15,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ImageIcon
              size={64}
              color="rgba(26,26,26,0.3)"
              style={{
                opacity: 0.5,
              }}
            />
          </div>
        )}

        {/* Overlay with image count */}
        <motion.div
          animate={{
            opacity: isHovered ? 1 : 0.8,
            backgroundColor: isHovered ? "rgba(0, 0, 0, 0.6)" : "rgba(0, 0, 0, 0.4)",
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
            flexDirection: "column",
            gap: "0.5rem",
          }}
        >
          {hasImages ? (
            <>
              <motion.div
                animate={{
                  scale: isHovered ? 1.2 : 1,
                }}
                transition={{ duration: 0.3 }}
              >
                <Play
                  size={isHovered ? 56 : 48}
                  color="#ffffff"
                  fill="#ffffff"
                  style={{
                    filter: "drop-shadow(0 4px 12px rgba(0, 0, 0, 0.3))",
                  }}
                />
              </motion.div>
              <p
                style={{
                  color: "#ffffff",
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  margin: 0,
                  textShadow: "0 2px 8px rgba(0, 0, 0, 0.5)",
                }}
              >
                {category.imageCount} {category.imageCount === 1 ? "Item" : "Items"}
              </p>
            </>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "0.75rem",
              }}
            >
              <div
                style={{
                  padding: "0.5rem 1.25rem",
                  background: "rgba(196, 30, 58, 0.9)",
                  borderRadius: "2rem",
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  boxShadow: "0 4px 12px rgba(196, 30, 58, 0.5)",
                }}
              >
                Coming Soon
              </div>
              <p
                style={{
                  color: "rgba(255,255,255,0.8)",
                  fontSize: "0.8rem",
                  fontWeight: 500,
                  margin: 0,
                  textShadow: "0 2px 8px rgba(0, 0, 0, 0.5)",
                }}
              >
                Portfolio in progress
              </p>
            </div>
          )}
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
            background: "linear-gradient(135deg, rgba(196, 30, 58, 0.2), rgba(99, 102, 241, 0.2))",
            pointerEvents: "none",
          }}
        />
      </div>

      {/* Content */}
      <div style={{ padding: "2rem" }}>
        <h3
          style={{
            fontSize: "1.5rem",
            fontFamily: "var(--font-headline), sans-serif",
            fontWeight: 700,
            color: "#1a1a1a",
            marginBottom: "0.75rem",
            lineHeight: "1.3",
          }}
        >
          {category.name}
        </h3>
        {category.description && (
          <p
            style={{
              fontSize: "1rem",
              color: "rgba(26,26,26,0.7)",
              fontFamily: "var(--font-poppins), sans-serif",
              lineHeight: "1.7",
              margin: 0,
            }}
          >
            {category.description}
          </p>
        )}
      </div>

      {/* Hover indicator */}
      {hasImages && (
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
      )}
    </motion.div>
  );
}
