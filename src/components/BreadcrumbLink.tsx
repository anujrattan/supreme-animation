"use client";

import Link from "next/link";
import { useState } from "react";

interface BreadcrumbLinkProps {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
}

export default function BreadcrumbLink({ href, children, isActive = false }: BreadcrumbLinkProps) {
  const [isHovered, setIsHovered] = useState(false);

  if (isActive) {
    return (
      <span
        style={{
          color: "rgba(26,26,26,0.9)",
          fontFamily: "var(--font-poppins), sans-serif",
          fontWeight: 600,
          fontSize: "0.9rem",
        }}
      >
        {children}
      </span>
    );
  }

  return (
    <Link
      href={href}
      style={{
        color: isHovered ? "#C41E3A" : "rgba(26,26,26,0.7)",
        textDecoration: "none",
        fontFamily: "var(--font-poppins), sans-serif",
        fontWeight: 500,
        fontSize: "0.9rem",
        transition: "color 0.2s ease",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </Link>
  );
}

