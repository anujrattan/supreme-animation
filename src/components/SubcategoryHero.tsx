"use client";

import { motion } from "framer-motion";
import type { ServiceCategory } from "@/content/services";
import type { Subcategory } from "@/content/subcategories";

interface SubcategoryHeroProps {
  subcategory: Subcategory;
  category: ServiceCategory;
  compact?: boolean;
}

export default function SubcategoryHero({ subcategory, category, compact = false }: SubcategoryHeroProps) {
  if (compact) {
    return (
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ marginBottom: "2rem", textAlign: "center" }}
      >
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{
            textTransform: "uppercase",
            letterSpacing: "0.25em",
            color: "#C41E3A",
            marginBottom: "1rem",
            fontWeight: 700,
            fontFamily: "var(--font-headline), sans-serif",
            fontSize: "0.85rem",
          }}
        >
          {category.name} › {subcategory.name}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
            fontFamily: "var(--font-headline), sans-serif",
            fontWeight: 900,
            lineHeight: "1.1",
            letterSpacing: "-0.02em",
            marginBottom: "1.5rem",
            background: "linear-gradient(135deg, #C41E3A 0%, #6366f1 50%, #d946ef 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {subcategory.name}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{
            color: "rgba(26,26,26,0.8)",
            fontFamily: "var(--font-poppins), sans-serif",
            fontWeight: 500,
            fontSize: "clamp(1.15rem, 1.6vw, 1.4rem)",
            lineHeight: "1.6",
            maxWidth: "800px",
            margin: "0 auto",
          }}
        >
          {subcategory.tagline}
        </motion.p>
      </motion.header>
    );
  }

  return (
    <motion.header
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      style={{ marginBottom: "3rem" }}
    >
      <motion.p
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        style={{
          textTransform: "uppercase",
          letterSpacing: "0.25em",
          color: "#C41E3A",
          marginBottom: "0.75rem",
          fontWeight: 700,
          fontFamily: "var(--font-headline), sans-serif",
          fontSize: "0.9rem",
        }}
      >
        {category.name} › {subcategory.name}
      </motion.p>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        style={{
          fontSize: "clamp(2.5rem, 5vw, 4rem)",
          fontFamily: "var(--font-headline), sans-serif",
          fontWeight: 900,
          lineHeight: "1.2",
          letterSpacing: "-0.02em",
          marginBottom: "1rem",
          paddingBottom: "0.25rem",
          background: "linear-gradient(135deg, #C41E3A 0%, #6366f1 50%, #d946ef 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          overflow: "visible",
        }}
      >
        {subcategory.name}
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        style={{
          color: "rgba(26,26,26,0.8)",
          fontFamily: "var(--font-poppins), sans-serif",
          fontWeight: 500,
          fontSize: "clamp(1.2rem, 1.8vw, 1.5rem)",
          lineHeight: "1.6",
          maxWidth: "900px",
          marginBottom: "1.5rem",
        }}
      >
        {subcategory.tagline}
      </motion.p>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        style={{
          color: "rgba(26,26,26,0.7)",
          fontFamily: "var(--font-poppins), sans-serif",
          fontWeight: 400,
          fontSize: "clamp(1rem, 1.3vw, 1.15rem)",
          lineHeight: "1.7",
          maxWidth: "900px",
        }}
      >
        {subcategory.description}
      </motion.p>
    </motion.header>
  );
}

