"use client";

import Link from "next/link";

interface InteractiveCTAButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: "light" | "dark";
}

export default function InteractiveCTAButton({ href, children, variant = "light" }: InteractiveCTAButtonProps) {
  const isLight = variant === "light";
  
  return (
    <Link
      href={href}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem 2rem",
        borderRadius: "999px",
        background: isLight 
          ? "rgba(26, 26, 26, 0.08)" 
          : "rgba(255,255,255,0.2)",
        border: isLight
          ? "1px solid rgba(196, 30, 58, 0.2)"
          : "1px solid rgba(255,255,255,0.3)",
        color: isLight ? "#1a1a1a" : "#ffffff",
        textDecoration: "none",
        fontFamily: "var(--font-headline), sans-serif",
        fontWeight: 600,
        fontSize: "0.9rem",
        transition: "all 0.3s ease",
        backdropFilter: isLight ? "none" : "blur(10px)",
        flex: "1 1 auto",
        minWidth: "200px",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = isLight
          ? "rgba(196, 30, 58, 0.1)"
          : "rgba(255,255,255,0.3)";
        e.currentTarget.style.borderColor = isLight
          ? "rgba(196, 30, 58, 0.3)"
          : "rgba(255,255,255,0.4)";
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow = isLight
          ? "0 8px 24px rgba(196, 30, 58, 0.15)"
          : "0 8px 24px rgba(0,0,0,0.2)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = isLight
          ? "rgba(26, 26, 26, 0.08)"
          : "rgba(255,255,255,0.2)";
        e.currentTarget.style.borderColor = isLight
          ? "rgba(196, 30, 58, 0.2)"
          : "rgba(255,255,255,0.3)";
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {children}
    </Link>
  );
}

