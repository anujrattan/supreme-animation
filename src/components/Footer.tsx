"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Phone, Instagram, ArrowUp, Linkedin, Youtube } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const targetPosition = element.offsetTop;
      const startPosition = window.pageYOffset;
      const distance = targetPosition - startPosition;
      const duration = 1000;
      let start: number | null = null;

      const easeInOutCubic = (t: number): number => {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      };

      const animateScroll = (timestamp: number) => {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        const progressRatio = Math.min(progress / duration, 1);
        const easedProgress = easeInOutCubic(progressRatio);

        window.scrollTo(0, startPosition + distance * easedProgress);

        if (progress < duration) {
          requestAnimationFrame(animateScroll);
        }
      };

      requestAnimationFrame(animateScroll);
    }
  };

  const quickLinks = [
    { label: "Home", id: "home" },
    { label: "Portfolio", id: "portfolio" },
    { label: "Services", id: "services" },
    { label: "Partnerships", id: "clients" },
    { label: "Industries", id: "industries" },
    { label: "About", id: "about" },
    { label: "Contact", id: "contact" },
  ];

  const SocialGlyph = ({ text }: { text: string }) => (
    <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
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
        {text}
      </text>
    </svg>
  );

  const socials = [
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/satnam-sidhu/",
      gradient: "linear-gradient(135deg, #0a66c2, #1d4ed8)",
      icon: <Linkedin size={20} />,
    },
    {
      label: "ArtStation",
      href: "https://www.artstation.com/supremeanimation",
      gradient: "linear-gradient(135deg, #13aff0, #0b3a5a)",
      icon: <SocialGlyph text="AS" />,
    },
    {
      label: "Instagram",
      href: "https://www.instagram.com/supreme_animation_studio?igsh=MjRiYXR5NW9ueXA4&utm_source=qr",
      gradient: "linear-gradient(135deg, #f58529, #dd2a7b, #8134af)",
      icon: <Instagram size={20} />,
    },
    {
      label: "YouTube (Studio)",
      href: "https://www.youtube.com/@supremeanimationstudio",
      gradient: "linear-gradient(135deg, #ff0033, #b91c1c)",
      icon: <Youtube size={20} />,
    },
    {
      label: "YouTube – LittleChamps Rhymes",
      href: "https://www.youtube.com/@LittleChampsrhymes",
      gradient: "linear-gradient(135deg, #f97316, #ec4899)",
      icon: <Youtube size={20} />,
    },
    {
      label: "Behance",
      href: "https://www.behance.net/supremeanimation",
      gradient: "linear-gradient(135deg, #1769ff, #0ea5e9)",
      icon: <SocialGlyph text="Be" />,
    },
    {
      label: "Vimeo",
      href: "https://vimeo.com/supremeanimation",
      gradient: "linear-gradient(135deg, #1ab7ea, #0284c7)",
      icon: <SocialGlyph text="V" />,
    },
  ] as const;

  return (
    <footer
      style={{
        backgroundColor: "#1a1a1a",
        color: "#ffffff",
        position: "relative",
        zIndex: 10,
        fontFamily: "var(--font-poppins), var(--font-manrope), sans-serif",
      }}
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "4rem 2rem 2rem 2rem" }}>
        {/* Main Footer Content */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "3rem",
            marginBottom: "3rem",
          }}
        >
          {/* Brand Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3
              style={{
                fontSize: "1.5rem",
                fontWeight: 700,
                marginBottom: "1rem",
                fontFamily: "var(--font-headline), sans-serif",
                color: "#ffffff",
              }}
            >
              Supreme Animation
            </h3>
            <p
              style={{
                fontSize: "0.95rem",
                lineHeight: "1.7",
                color: "rgba(255, 255, 255, 0.7)",
                marginBottom: "1.5rem",
                fontFamily: "var(--font-poppins), sans-serif",
                fontWeight: 400,
              }}
            >
              Blending AI and artistry to move ideas with emotion, turning
              vision into captivating motion.
            </p>
            {/* Logo + Social Media */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.9rem" }}>
              <div
                style={{
                  width: "clamp(120px, 15vw, 250px)",
                  height: "auto",
                  borderRadius: "1.25rem",
                  backgroundColor: "#d42e28",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "1rem",
                  boxShadow: "0 14px 34px rgba(0,0,0,0.35)",
                  border: "1px solid rgba(255,255,255,0.18)",
                }}
              >
                <Image
                  src="/Logo04.png"
                  alt="Supreme Animation Studio - Professional Animation Services Logo"
                  width={250}
                  height={250}
                  style={{ width: "100%", height: "auto", objectFit: "contain" }}
                />
              </div>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
              {socials.map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={s.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                  whileHover={{ scale: 1.08, y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  style={{
                    width: "42px",
                    height: "42px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "0.85rem",
                    background: s.gradient,
                    color: "#ffffff",
                    textDecoration: "none",
                    boxShadow:
                      "0 10px 26px rgba(0, 0, 0, 0.30), inset 0 1px 0 rgba(255, 255, 255, 0.20)",
                    border: "1px solid rgba(255, 255, 255, 0.18)",
                    transform: "translateZ(0)",
                    transition: "all 0.25s ease",
                  }}
                  aria-label={s.label}
                  title={s.label}
                >
                  {s.icon}
                </motion.a>
              ))}
            </div>
            </div>
          </motion.div>

          {/* Quick Links Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4
              style={{
                fontSize: "1rem",
                fontWeight: 600,
                marginBottom: "1.25rem",
                fontFamily: "var(--font-headline), sans-serif",
                color: "#ffffff",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              Quick Links
            </h4>
            <nav
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                gap: "0.75rem 1.25rem",
                alignItems: "start",
              }}
            >
              {quickLinks.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.id);
                  }}
                  style={{
                    color: "rgba(255, 255, 255, 0.7)",
                    textDecoration: "none",
                    fontSize: "0.95rem",
                    fontFamily: "var(--font-poppins), sans-serif",
                    fontWeight: 400,
                    transition: "all 0.2s ease",
                    display: "inline-block",
                    width: "fit-content",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#C41E3A";
                    e.currentTarget.style.transform = "translateX(4px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "rgba(255, 255, 255, 0.7)";
                    e.currentTarget.style.transform = "translateX(0)";
                  }}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </motion.div>

          {/* Contact Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4
              style={{
                fontSize: "1rem",
                fontWeight: 600,
                marginBottom: "1.25rem",
                fontFamily: "var(--font-headline), sans-serif",
                color: "#ffffff",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              Get in Touch
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  color: "rgba(255, 255, 255, 0.7)",
                  fontSize: "0.95rem",
                  fontFamily: "var(--font-poppins), sans-serif",
                  fontWeight: 400,
                }}
              >
                <Phone size={18} style={{ flexShrink: 0 }} />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.25rem",
                  }}
                >
                  <a
                    href="tel:+919646168597"
                    style={{
                      color: "rgba(255, 255, 255, 0.8)",
                      textDecoration: "none",
                      fontSize: "0.95rem",
                      wordBreak: "keep-all",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "#ffffff";
                      e.currentTarget.style.textDecoration = "underline";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "rgba(255, 255, 255, 0.8)";
                      e.currentTarget.style.textDecoration = "none";
                    }}
                  >
                    +91-9646168597
                  </a>
                  <a
                    href="tel:+919988966688"
                    style={{
                      color: "rgba(255, 255, 255, 0.8)",
                      textDecoration: "none",
                      fontSize: "0.95rem",
                      wordBreak: "keep-all",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "#ffffff";
                      e.currentTarget.style.textDecoration = "underline";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "rgba(255, 255, 255, 0.8)";
                      e.currentTarget.style.textDecoration = "none";
                    }}
                  >
                    +91-9988966688
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            paddingTop: "2rem",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          className="footer-bottom"
        >
          <p
            style={{
              fontSize: "0.875rem",
              color: "rgba(255, 255, 255, 0.5)",
              margin: 0,
              fontFamily: "var(--font-poppins), sans-serif",
              fontWeight: 400,
              textAlign: "center",
            }}
          >
            © {new Date().getFullYear()} Supreme Animation Studio. All rights
            reserved.
          </p>
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Scroll to top"
            style={{
              width: "44px",
              height: "44px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "0.5rem",
              backgroundColor: "rgba(196, 30, 58, 0.2)",
              border: "1px solid rgba(196, 30, 58, 0.3)",
              color: "#C41E3A",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(196, 30, 58, 0.3)";
              e.currentTarget.style.borderColor = "rgba(196, 30, 58, 0.5)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(196, 30, 58, 0.2)";
              e.currentTarget.style.borderColor = "rgba(196, 30, 58, 0.3)";
            }}
          >
            <ArrowUp size={20} />
          </motion.button>
        </div>
      </div>

      {/* Responsive Styles */}
      <style jsx global>{`
        @media (min-width: 768px) {
          .footer-bottom {
            flex-direction: row !important;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .footer-bottom * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </footer>
  );
}

