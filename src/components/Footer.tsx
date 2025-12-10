"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Globe, Instagram, ArrowUp, MessageCircle } from "lucide-react";

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
            {/* Social Media */}
            <div style={{ display: "flex", gap: "1rem" }}>
              <motion.a
                href="https://instagram.com/supremeanimation"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  width: "40px",
                  height: "40px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "0.5rem",
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  color: "#ffffff",
                  textDecoration: "none",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(196, 30, 58, 0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
                }}
                aria-label="Follow us on Instagram"
              >
                <Instagram size={20} />
              </motion.a>
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
            <nav style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
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
              <a
                href="mailto:hello@supremeanimation.com"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  color: "rgba(255, 255, 255, 0.7)",
                  textDecoration: "none",
                  fontSize: "0.95rem",
                  fontFamily: "var(--font-poppins), sans-serif",
                  fontWeight: 400,
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#C41E3A";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "rgba(255, 255, 255, 0.7)";
                }}
              >
                <Mail size={18} />
                <span>hello@supremeanimation.com</span>
              </a>
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "0.75rem",
                  color: "rgba(255, 255, 255, 0.7)",
                  fontSize: "0.95rem",
                  fontFamily: "var(--font-poppins), sans-serif",
                  fontWeight: 400,
                }}
              >
                <MapPin size={18} style={{ flexShrink: 0, marginTop: "2px" }} />
                <div>
                  <p style={{ margin: 0, lineHeight: "1.6" }}>
                    4800 Meadows Rd, STE 300
                    <br />
                    Lake Oswego, OR 97035
                  </p>
                </div>
              </div>
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
                <Globe size={18} />
                <span>London • Punjab • Ajman • Remote-first</span>
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

