"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface FeatureCardProps {
  feature: string;
  index: number;
}

const colors = ["#C41E3A", "#6366f1", "#d946ef", "#06b6d4", "#10b981", "#f59e0b"];

export default function FeatureCard({ feature, index }: FeatureCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const color = colors[index % colors.length];
  const nextColor = colors[(index + 1) % colors.length];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        padding: "1.5rem",
        borderRadius: "1rem",
        border: `1px solid ${color}30`,
        background: `linear-gradient(135deg, ${color}08, ${nextColor}05)`,
        boxShadow: isHovered
          ? `0 8px 24px ${color}20`
          : "0 2px 8px rgba(0,0,0,0.05)",
        transition: "all 0.3s ease",
        transform: isHovered ? "translateY(-3px) scale(1.02)" : "translateY(0) scale(1)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Animated accent line */}
      <motion.div
        animate={{
          width: isHovered ? "100%" : "4px",
        }}
        transition={{ duration: 0.3 }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "4px",
          background: `linear-gradient(90deg, ${color}, ${nextColor})`,
          borderRadius: "4px 0 0 0",
        }}
      />
      <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
        <motion.div
          animate={{
            scale: isHovered ? 1.2 : 1,
          }}
          transition={{ duration: 0.3 }}
          style={{
            width: "24px",
            height: "24px",
            borderRadius: "50%",
            background: `linear-gradient(135deg, ${color}, ${nextColor})`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            marginTop: "0.125rem",
            filter: isHovered
              ? `drop-shadow(0 0 8px ${color}80) drop-shadow(0 0 12px ${nextColor}60)`
              : "none",
            transition: "filter 0.3s ease, transform 0.3s ease",
          }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path
              d="M2 6L5 9L10 3"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
        <p
          style={{
            fontSize: "0.95rem",
            color: "rgba(26,26,26,0.9)",
            fontFamily: "var(--font-poppins), sans-serif",
            fontWeight: 500,
            lineHeight: "1.5",
            margin: 0,
            flex: 1,
          }}
        >
          {feature}
        </p>
      </div>
    </motion.div>
  );
}

