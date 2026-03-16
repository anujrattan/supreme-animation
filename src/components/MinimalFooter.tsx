"use client";

import Link from "next/link";
import Image from "next/image";
import { Linkedin, Youtube, Instagram } from "lucide-react";

export default function MinimalFooter() {
  const socials = [
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/satnam-sidhu/",
      icon: <Linkedin size={18} />,
    },
    {
      label: "ArtStation",
      href: "https://www.artstation.com/supremeanimation",
      icon: (
        <svg width="18" height="18" viewBox="0 0 20 20" aria-hidden="true">
          <rect x="0" y="0" width="20" height="20" rx="6" ry="6" fill="transparent" />
          <text
            x="10"
            y="10.5"
            textAnchor="middle"
            dominantBaseline="middle"
            fontFamily="var(--font-headline), sans-serif"
            fontSize="9"
            fontWeight="900"
            fill="currentColor"
            letterSpacing="-0.02em"
          >
            AS
          </text>
        </svg>
      ),
    },
    {
      label: "Instagram",
      href: "https://www.instagram.com/supreme_animation_studio?igsh=MjRiYXR5NW9ueXA4&utm_source=qr",
      icon: <Instagram size={18} />,
    },
    {
      label: "YouTube",
      href: "https://youtube.com/@supremeanimationstudio?si=vXdH8wJXAE3SNhf3",
      icon: <Youtube size={18} />,
    },
    {
      label: "Behance",
      href: "https://www.behance.net/supremeanimation",
      icon: (
        <svg width="18" height="18" viewBox="0 0 20 20" aria-hidden="true">
          <rect x="0" y="0" width="20" height="20" rx="6" ry="6" fill="transparent" />
          <text
            x="10"
            y="10.5"
            textAnchor="middle"
            dominantBaseline="middle"
            fontFamily="var(--font-headline), sans-serif"
            fontSize="9"
            fontWeight="900"
            fill="currentColor"
            letterSpacing="-0.02em"
          >
            B
          </text>
        </svg>
      ),
    },
    {
      label: "Vimeo",
      href: "https://vimeo.com/supremeanimation",
      icon: (
        <svg width="18" height="18" viewBox="0 0 20 20" aria-hidden="true">
          <rect x="0" y="0" width="20" height="20" rx="6" ry="6" fill="transparent" />
          <text
            x="10"
            y="10.5"
            textAnchor="middle"
            dominantBaseline="middle"
            fontFamily="var(--font-headline), sans-serif"
            fontSize="9"
            fontWeight="900"
            fill="currentColor"
            letterSpacing="-0.02em"
          >
            V
          </text>
        </svg>
      ),
    },
  ] as const;

  const quickLinks = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/#services" },
    { label: "Portfolio", href: "/#portfolio" },
    { label: "Contact", href: "/#contact" },
  ];

  return (
    <footer
      style={{
        borderTop: "1px solid rgba(196, 30, 58, 0.15)",
        padding: "1rem clamp(1rem, 3vw, 2rem)",
        marginTop: "4rem",
        backgroundColor: "transparent",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
        }}
      >
        {/* Main Footer Row: Logo | Quick Links | Social */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1.5rem",
          }}
        >
          {/* Logo - Left */}
          <Link href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none", flexShrink: 0 }}>
              <div
                style={{
                  width: "clamp(100px, 12vw, 180px)",
                  height: "auto",
                  borderRadius: "1rem",
                  backgroundColor: "#d42e28",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "0.5rem",
                  boxShadow: "0 4px 16px rgba(212, 46, 40, 0.2)",
                }}
              >
              <Image
                src="/Logo04.png"
                alt="Supreme Animation Studio"
                width={180}
                height={72}
                style={{ width: "100%", height: "auto", objectFit: "contain" }}
              />
            </div>
          </Link>

          {/* Quick Links - Center */}
          <nav
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "1rem",
              justifyContent: "center",
              alignItems: "center",
              flex: "1 1 auto",
            }}
          >
            {quickLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  fontSize: "0.875rem",
                  color: "rgba(26, 26, 26, 0.7)",
                  textDecoration: "none",
                  fontFamily: "var(--font-poppins), sans-serif",
                  fontWeight: 500,
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#C41E3A")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(26, 26, 26, 0.7)")}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Social Links - Right */}
          <div
            style={{
              display: "flex",
              gap: "0.5rem",
              alignItems: "center",
              justifyContent: "flex-end",
              flexShrink: 0,
            }}
          >
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "0.5rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "rgba(26, 26, 26, 0.7)",
                  backgroundColor: "rgba(196, 30, 58, 0.08)",
                  border: "1px solid rgba(196, 30, 58, 0.15)",
                  textDecoration: "none",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#C41E3A";
                  e.currentTarget.style.backgroundColor = "rgba(196, 30, 58, 0.12)";
                  e.currentTarget.style.borderColor = "rgba(196, 30, 58, 0.25)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "rgba(26, 26, 26, 0.7)";
                  e.currentTarget.style.backgroundColor = "rgba(196, 30, 58, 0.08)";
                  e.currentTarget.style.borderColor = "rgba(196, 30, 58, 0.15)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Copyright - Bottom */}
        <div
          style={{
            fontSize: "0.75rem",
            color: "rgba(26, 26, 26, 0.5)",
            fontFamily: "var(--font-poppins), sans-serif",
            textAlign: "center",
            paddingTop: "0.25rem",
            marginTop: "0",
          }}
        >
          © {new Date().getFullYear()} Supreme Animation Studio. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

