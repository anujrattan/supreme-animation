"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface ProcessStepCardProps {
  step: {
    title: string;
    description: string;
    icon?: string;
  };
  index: number;
}

const gradients = [
  "linear-gradient(135deg, #C41E3A, #991B1B)",
  "linear-gradient(135deg, #6366f1, #4f46e5)",
  "linear-gradient(135deg, #d946ef, #c026d3)",
  "linear-gradient(135deg, #06b6d4, #0891b2)",
  "linear-gradient(135deg, #10b981, #059669)",
  "linear-gradient(135deg, #f59e0b, #d97706)",
];

export default function ProcessStepCard({ step, index }: ProcessStepCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const gradient = gradients[index % gradients.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        padding: "2rem",
        borderRadius: "1.25rem",
        border: "1px solid rgba(196, 30, 58, 0.15)",
        background: "linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(248, 249, 250, 0.98))",
        boxShadow: isHovered
          ? "0 12px 40px rgba(196, 30, 58, 0.15)"
          : "0 4px 20px rgba(196, 30, 58, 0.08)",
        transition: "all 0.3s ease",
        transform: isHovered ? "translateY(-4px)" : "translateY(0)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Animated background gradient on hover */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 0.05 : 0 }}
        transition={{ duration: 0.3 }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: gradient,
          zIndex: 0,
        }}
      />
      <div style={{ position: "relative", zIndex: 1 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            marginBottom: "1rem",
          }}
        >
          <motion.div
            animate={{
              scale: isHovered ? 1.1 : 1,
            }}
            transition={{ duration: 0.3 }}
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "0.75rem",
              background: gradient,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.5rem",
              fontWeight: 700,
              color: "#ffffff",
              fontFamily: "var(--font-headline), sans-serif",
              boxShadow: isHovered
                ? `0 8px 24px ${gradient.includes("#C41E3A") ? "rgba(196, 30, 58, 0.6)" : "rgba(99, 102, 241, 0.6)"}, 0 0 16px ${gradient.includes("#C41E3A") ? "rgba(196, 30, 58, 0.4)" : "rgba(99, 102, 241, 0.4)"}`
                : `0 4px 12px ${gradient.includes("#C41E3A") ? "rgba(196, 30, 58, 0.4)" : "rgba(99, 102, 241, 0.4)"}`,
              flexShrink: 0,
              transition: "box-shadow 0.3s ease, transform 0.3s ease",
            }}
          >
            {step.icon || index + 1}
          </motion.div>
          <h3
            style={{
              fontSize: "1.25rem",
              fontFamily: "var(--font-headline), sans-serif",
              fontWeight: 700,
              color: "#1a1a1a",
              margin: 0,
            }}
          >
            {step.title}
          </h3>
        </div>
        <p
          style={{
            fontSize: "0.95rem",
            color: "rgba(26,26,26,0.8)",
            fontFamily: "var(--font-poppins), sans-serif",
            lineHeight: "1.6",
            margin: 0,
          }}
        >
          {step.description}
        </p>
      </div>
    </motion.div>
  );
}

