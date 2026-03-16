"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";

interface BreadcrumbBackButtonProps {
  href: string;
  label: string;
}

export default function BreadcrumbBackButton({ href, label }: BreadcrumbBackButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href={href}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
        padding: "0.5rem 1rem",
        borderRadius: "1rem",
        background: "linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(248, 249, 250, 0.98))",
        border: isHovered ? "1px solid rgba(196, 30, 58, 0.3)" : "1px solid rgba(196, 30, 58, 0.15)",
        textDecoration: "none",
        fontFamily: "var(--font-poppins), sans-serif",
        fontWeight: 500,
        fontSize: "0.9rem",
        color: "rgba(26,26,26,0.9)",
        transition: "all 0.3s ease",
        position: "relative",
        overflow: "hidden",
        boxShadow: isHovered ? "0 4px 12px rgba(196, 30, 58, 0.15)" : "none",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        animate={{
          rotate: isHovered ? 180 : 0,
        }}
        transition={{
          duration: 0.4,
          ease: [0.4, 0, 0.2, 1],
        }}
        style={{
          width: "32px",
          height: "32px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #C41E3A, #6366f1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          filter: isHovered
            ? "drop-shadow(0 0 8px rgba(196, 30, 58, 0.8)) drop-shadow(0 0 12px rgba(99, 102, 241, 0.6))"
            : "none",
          transition: "filter 0.3s ease",
        }}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ transition: "all 0.3s ease" }}
        >
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </motion.div>
      <span>{label}</span>
    </Link>
  );
}

