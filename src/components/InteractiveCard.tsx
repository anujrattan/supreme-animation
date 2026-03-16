"use client";

import { ReactNode } from "react";

interface InteractiveCardProps {
  children: ReactNode;
  gradient?: string;
  borderColor?: string;
  style?: React.CSSProperties;
  className?: string;
  hoverTransform?: string; // e.g., "translateY(-2px)" or "translateY(-4px)"
}

export default function InteractiveCard({ 
  children, 
  gradient, 
  borderColor = "rgba(196, 30, 58, 0.2)",
  style,
  className,
  hoverTransform = "translateY(-2px)"
}: InteractiveCardProps) {
  return (
    <div
      className={className}
      style={{
        ...style,
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = hoverTransform;
        const shadowColor = borderColor?.replace('0.2', '0.15') || "rgba(196, 30, 58, 0.15)";
        e.currentTarget.style.boxShadow = `0 8px 24px ${shadowColor}`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = (style?.boxShadow as string) || "0 4px 16px rgba(196, 30, 58, 0.08)";
      }}
    >
      {children}
    </div>
  );
}

