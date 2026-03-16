"use client";

import Link from "next/link";

interface InteractiveLinkProps {
  href: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export default function InteractiveLink({ href, children, style }: InteractiveLinkProps) {
  return (
    <Link
      href={href}
      style={{
        ...style,
        transition: "color 0.2s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = "#C41E3A";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = style?.color as string || "rgba(26,26,26,0.7)";
      }}
    >
      {children}
    </Link>
  );
}

