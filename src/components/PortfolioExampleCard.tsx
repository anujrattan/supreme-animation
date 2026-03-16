"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface PortfolioExampleCardProps {
  example: {
    title: string;
    description: string;
    image?: string;
  };
  index: number;
}

const gradients = [
  "linear-gradient(135deg, #C41E3A, #6366f1)",
  "linear-gradient(135deg, #6366f1, #d946ef)",
  "linear-gradient(135deg, #d946ef, #06b6d4)",
];

export default function PortfolioExampleCard({ example, index }: PortfolioExampleCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const gradient = gradients[index % gradients.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        borderRadius: "1.25rem",
        overflow: "hidden",
        border: "1px solid rgba(196, 30, 58, 0.15)",
        background: "linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(248, 249, 250, 0.98))",
        boxShadow: isHovered
          ? "0 12px 40px rgba(196, 30, 58, 0.15)"
          : "0 4px 20px rgba(196, 30, 58, 0.08)",
        transition: "all 0.3s ease",
        transform: isHovered ? "translateY(-4px)" : "translateY(0)",
        position: "relative",
      }}
    >
      {/* Placeholder image area with gradient */}
      <motion.div
        animate={{
          scale: isHovered ? 1.05 : 1,
        }}
        transition={{ duration: 0.3 }}
        style={{
          width: "100%",
          aspectRatio: "16 / 9",
          background: gradient,
          opacity: 0.15,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontSize: "3rem",
            opacity: 0.3,
          }}
        >
          🎨
        </div>
      </motion.div>
      <div style={{ padding: "1.5rem" }}>
        <h3
          style={{
            fontSize: "1.1rem",
            fontFamily: "var(--font-headline), sans-serif",
            fontWeight: 700,
            color: "#1a1a1a",
            marginBottom: "0.5rem",
          }}
        >
          {example.title}
        </h3>
        <p
          style={{
            fontSize: "0.9rem",
            color: "rgba(26,26,26,0.7)",
            fontFamily: "var(--font-poppins), sans-serif",
            lineHeight: "1.6",
            margin: 0,
          }}
        >
          {example.description}
        </p>
      </div>
    </motion.div>
  );
}

