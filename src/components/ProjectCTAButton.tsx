"use client";

import Link from "next/link";

export default function ProjectCTAButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.1rem 2rem",
        borderRadius: "999px",
        background: "linear-gradient(135deg, #C41E3A, #991B1B)",
        color: "#ffffff",
        textDecoration: "none",
        fontFamily: "var(--font-headline), sans-serif",
        fontWeight: 900,
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        fontSize: "0.95rem",
        boxShadow: "0 10px 30px rgba(196, 30, 58, 0.35), 0 0 40px rgba(196, 30, 58, 0.15)",
        transition: "all 0.3s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow =
          "0 14px 40px rgba(196, 30, 58, 0.45), 0 0 50px rgba(196, 30, 58, 0.25)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 10px 30px rgba(196, 30, 58, 0.35), 0 0 40px rgba(196, 30, 58, 0.15)";
      }}
    >
      {children}
    </Link>
  );
}

