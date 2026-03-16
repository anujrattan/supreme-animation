"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContactModal } from "@/contexts/ContactModalContext";

export default function ProjectCTAButton({ href, children }: { href: string; children: React.ReactNode }) {
  const pathname = usePathname();
  const { openModal } = useContactModal();
  const isHomepage = pathname === "/";

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // If not on homepage and href is /#contact, open modal instead
    if (!isHomepage && href === "/#contact") {
      e.preventDefault();
      openModal();
    }
    // Otherwise, let the link work normally
  };

  return (
    <Link
      href={href}
      onClick={handleClick}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem 2rem",
        borderRadius: "999px",
        background: "linear-gradient(135deg, #C41E3A, #991B1B)",
        color: "#ffffff",
        textDecoration: "none",
        fontFamily: "var(--font-headline), sans-serif",
        fontWeight: 700,
        letterSpacing: "0.05em",
        textTransform: "uppercase",
        fontSize: "0.9rem",
        boxShadow: "0 4px 16px rgba(196, 30, 58, 0.25)",
        transition: "all 0.3s ease",
        flex: "1 1 auto",
        minWidth: "200px",
        cursor: "pointer",
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

