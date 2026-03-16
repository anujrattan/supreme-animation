"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { createSubcategorySlug } from "@/content/subcategories";

type ServiceCategory = {
  id: string;
  name: string;
  subcategories: string[];
};

const servicesCategories: ServiceCategory[] = [
  {
    id: "3d-animation",
    name: "3D Animation & Modeling",
    subcategories: [
      "Character Design & Modeling",
      "3D Animation Production",
      "Product Visualization",
      "Architectural Visualization",
      "Medical & Scientific Animation",
      "Commercial & Brand Animation",
      "3D Rigging & Setup",
      "Gaming Environment",
      "3D Asset Creation",
      "Motion Graphics 3D",
    ],
  },
  {
    id: "2d-animation",
    name: "2D Animation & Design",
    subcategories: [
      "2D Character Animation",
      "Motion Graphics 2D",
      "Explainer Videos",
      "Whiteboard & Educational Animation",
      "2D Illustration & Design",
      "Storyboard & Concept Art",
    ],
  },
  {
    id: "visual-effects",
    name: "Visual Effects",
    subcategories: [
      "Compositing & Integration",
      "Green Screen & Chroma Key",
      "Rotoscoping & Cleanup",
      "Motion Tracking & Match Moving",
      "CGI Integration",
      "Matte Painting",
      "Wire & Object Removal",
      "Color Grading & Correction",
    ],
  },
  {
    id: "virtual-reality",
    name: "Virtual & Augmented Reality",
    subcategories: [
      "AR Development",
      "VR Experiences",
      "Mixed Reality Solutions",
      "Virtual Production",
      "360° Content Creation",
      "Interactive 3D Experiences",
    ],
  },
  {
    id: "digital-solutions",
    name: "Digital Solutions",
    subcategories: [
      "Web Development",
      "Mobile Applications",
      "Interactive Installations",
      "Digital Marketing Content",
      "E-Learning Platforms",
      "Custom Software Development",
    ],
  },
  {
    id: "intellectual-property",
    name: "Intellectual Property",
    subcategories: [
      "Original Character Creation",
      "Animated Series Development",
      "Brand Identity & IP Design",
      "Content Licensing",
    ],
  },
];

const portfolioItems = [
  "All Projects",
  "2D Work",
  "3D Work",
  "Explainers",
  "Brand Videos",
  "Game / Cinematic",
];

interface ServicesDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

function ServicesDropdown({ isOpen, onClose }: ServicesDropdownProps) {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            marginTop: "0.5rem",
            display: "flex",
            gap: 0,
            zIndex: 1000,
          }}
        >
          {/* First Level - Main Categories */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            style={{
              backgroundColor: "#ffffff",
              borderRadius: hoveredCategory
                ? "0.5rem 0 0 0.5rem"
                : "0.5rem",
              padding: "0.5rem 0",
              minWidth: "200px",
              boxShadow: "0 10px 40px rgba(0, 0, 0, 0.15)",
              border: "1px solid rgba(0, 0, 0, 0.08)",
              borderRight: hoveredCategory ? "none" : "1px solid rgba(0, 0, 0, 0.08)",
            }}
          >
            {servicesCategories.map((category) => (
              <div
                key={category.id}
                data-category-item
                style={{ position: "relative" }}
                onMouseEnter={() => {
                  if (category.subcategories.length > 0) {
                    setHoveredCategory(category.id);
                  }
                }}
              >
                <a
                  href={`/services/${category.id}`}
                  onClick={() => {
                    onClose();
                  }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "0.75rem 1rem",
                    color: hoveredCategory === category.id ? "#ffffff" : "#1a1a1a",
                    fontSize: "0.9rem",
                    textDecoration: "none",
                    transition: "all 0.2s ease",
                    backgroundColor:
                      hoveredCategory === category.id
                        ? "#3b82f6"
                        : "transparent",
                    fontFamily: "var(--font-poppins), sans-serif",
                  }}
                >
                  <span>{category.name}</span>
                  {category.subcategories.length > 0 && (
                    <span style={{ fontSize: "0.75rem", marginLeft: "0.5rem" }}>
                      ▸
                    </span>
                  )}
                </a>
              </div>
            ))}
          </motion.div>

          {/* Second Level - Subcategories */}
          <AnimatePresence>
            {hoveredCategory && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                data-submenu
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: "0 0.5rem 0.5rem 0",
                  padding: "0.5rem 0",
                  minWidth: "250px",
                  boxShadow: "0 10px 40px rgba(0, 0, 0, 0.15)",
                  border: "1px solid rgba(0, 0, 0, 0.08)",
                  borderLeft: "none",
                }}
                onMouseEnter={() => {
                  // Keep submenu open when hovering over it
                  setHoveredCategory(hoveredCategory);
                }}
              >
                {servicesCategories
                  .find((cat) => cat.id === hoveredCategory)
                  ?.subcategories.map((subcategory) => {
                    const subcategorySlug = createSubcategorySlug(subcategory);
                    return (
                      <a
                        key={subcategory}
                        href={`/services/${hoveredCategory}/${subcategorySlug}`}
                        onClick={() => {
                          onClose();
                        }}
                        style={{
                          display: "block",
                          padding: "0.75rem 1rem",
                          color: "#1a1a1a",
                          fontSize: "0.9rem",
                          textDecoration: "none",
                          transition: "all 0.2s ease",
                          fontFamily: "var(--font-poppins), sans-serif",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = "rgba(59, 130, 246, 0.1)";
                          e.currentTarget.style.color = "#3b82f6";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = "transparent";
                          e.currentTarget.style.color = "#1a1a1a";
                        }}
                      >
                        {subcategory}
                      </a>
                    );
                  })}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

interface DropdownProps {
  items: string[];
  isOpen: boolean;
  onClose: () => void;
}

function Dropdown({ items, isOpen, onClose }: DropdownProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            marginTop: "0.5rem",
            minWidth: "200px",
            backgroundColor: "#ffffff",
            border: "1px solid rgba(0, 0, 0, 0.08)",
            borderRadius: "0.5rem",
            padding: "0.5rem 0",
            boxShadow: "0 10px 40px rgba(0, 0, 0, 0.15)",
            zIndex: 1000,
          }}
          onMouseLeave={onClose}
        >
          {items.map((item, index) => (
            <motion.a
              key={item}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onClose();
              }}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.03 }}
              style={{
                display: "block",
                padding: "0.75rem 1rem",
                color: "#1a1a1a",
                fontSize: "0.9rem",
                textDecoration: "none",
                transition: "all 0.2s ease",
                fontFamily: "var(--font-poppins), sans-serif",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(59, 130, 246, 0.1)";
                e.currentTarget.style.color = "#3b82f6";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "#1a1a1a";
              }}
            >
              {item}
            </motion.a>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  scrollToSection: (id: string) => void;
  servicesCategories: ServiceCategory[];
  portfolioItems: string[];
}

function MobileMenu({
  isOpen,
  onClose,
  scrollToSection,
  servicesCategories,
  portfolioItems,
}: MobileMenuProps) {
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  const handleScrollToSection = (id: string) => {
    scrollToSection(id);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.8)",
              zIndex: 999,
            }}
          />
          {/* Menu */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            style={{
              position: "fixed",
              top: 0,
              right: 0,
              bottom: 0,
              width: "85%",
              maxWidth: "400px",
              backgroundColor: "rgba(5, 5, 9, 0.95)",
              backdropFilter: "blur(20px)",
              zIndex: 1000,
              padding: "2rem",
              overflowY: "auto",
              boxShadow: "-10px 0 40px rgba(0, 0, 0, 0.5)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "2rem",
              }}
            >
              <button
                onClick={onClose}
                aria-label="Close menu"
                style={{
                  background: "none",
                  border: "none",
                  color: "#ffffff",
                  fontSize: "1.5rem",
                  cursor: "pointer",
                  padding: "0.5rem",
                }}
              >
                ✕
              </button>
            </div>

            <nav style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <a
                href="#portfolio"
                onClick={(e) => {
                  e.preventDefault();
                  handleScrollToSection("portfolio");
                }}
                style={{
                  padding: "1rem",
                  color: "rgba(255, 255, 255, 0.9)",
                  fontSize: "1.1rem",
                  borderRadius: "0.5rem",
                  transition: "all 0.2s ease",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(99, 102, 241, 0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                Work
              </a>

              {/* Services Accordion */}
              <div>
                <button
                  onClick={() =>
                    setOpenAccordion(openAccordion === "services" ? null : "services")
                  }
                  aria-expanded={openAccordion === "services"}
                  style={{
                    width: "100%",
                    padding: "1rem",
                    background: "none",
                    border: "none",
                    color: "rgba(255, 255, 255, 0.9)",
                    fontSize: "1.1rem",
                    textAlign: "left",
                    cursor: "pointer",
                    borderRadius: "0.5rem",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "rgba(99, 102, 241, 0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                  }}
                >
                  Services
                  <span style={{ fontSize: "1.2rem" }}>
                    {openAccordion === "services" ? "−" : "+"}
                  </span>
                </button>
                <AnimatePresence>
                  {openAccordion === "services" && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      style={{ overflow: "hidden" }}
                    >
                      <div style={{ paddingLeft: "1rem", paddingTop: "0.5rem" }}>
                        {servicesCategories.map((category) => (
                          <div key={category.id}>
                            <a
                              href={`/services/${category.id}`}
                              onClick={() => {
                                onClose();
                              }}
                              style={{
                                display: "block",
                                padding: "0.75rem 1rem",
                                color: "rgba(255, 255, 255, 0.9)",
                                fontSize: "0.95rem",
                                borderRadius: "0.5rem",
                                textDecoration: "none",
                                transition: "all 0.2s ease",
                                fontWeight: 600,
                                fontFamily: "var(--font-poppins), sans-serif",
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor =
                                  "rgba(99, 102, 241, 0.2)";
                                e.currentTarget.style.color = "#ffffff";
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = "transparent";
                                e.currentTarget.style.color = "rgba(255, 255, 255, 0.9)";
                              }}
                            >
                              {category.name}
                            </a>
                            {category.subcategories.length > 0 && (
                              <div style={{ paddingLeft: "1rem", marginTop: "0.25rem" }}>
                                {category.subcategories.map((subcategory) => {
                                  const subcategorySlug = createSubcategorySlug(subcategory);
                                  return (
                                    <a
                                      key={subcategory}
                                      href={`/services/${category.id}/${subcategorySlug}`}
                                      onClick={() => {
                                        onClose();
                                      }}
                                      style={{
                                        display: "block",
                                        padding: "0.5rem 1rem",
                                        color: "rgba(255, 255, 255, 0.7)",
                                        fontSize: "0.875rem",
                                        borderRadius: "0.5rem",
                                        textDecoration: "none",
                                        transition: "all 0.2s ease",
                                        fontFamily: "var(--font-poppins), sans-serif",
                                      }}
                                      onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor =
                                          "rgba(99, 102, 241, 0.15)";
                                        e.currentTarget.style.color = "#ffffff";
                                      }}
                                      onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = "transparent";
                                        e.currentTarget.style.color = "rgba(255, 255, 255, 0.7)";
                                      }}
                                    >
                                      {subcategory}
                                    </a>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Portfolio Accordion */}
              <div>
                <button
                  onClick={() =>
                    setOpenAccordion(openAccordion === "portfolio" ? null : "portfolio")
                  }
                  aria-expanded={openAccordion === "portfolio"}
                  style={{
                    width: "100%",
                    padding: "1rem",
                    background: "none",
                    border: "none",
                    color: "rgba(255, 255, 255, 0.9)",
                    fontSize: "1.1rem",
                    textAlign: "left",
                    cursor: "pointer",
                    borderRadius: "0.5rem",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "rgba(99, 102, 241, 0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                  }}
                >
                  Portfolio
                  <span style={{ fontSize: "1.2rem" }}>
                    {openAccordion === "portfolio" ? "−" : "+"}
                  </span>
                </button>
                <AnimatePresence>
                  {openAccordion === "portfolio" && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      style={{ overflow: "hidden" }}
                    >
                      <div style={{ paddingLeft: "1rem", paddingTop: "0.5rem" }}>
                        {portfolioItems.map((item) => (
                          <a
                            key={item}
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              onClose();
                            }}
                            style={{
                              display: "block",
                              padding: "0.75rem 1rem",
                              color: "rgba(255, 255, 255, 0.7)",
                              fontSize: "0.95rem",
                              borderRadius: "0.5rem",
                              textDecoration: "none",
                              transition: "all 0.2s ease",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor =
                                "rgba(99, 102, 241, 0.15)";
                              e.currentTarget.style.color = "#ffffff";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = "transparent";
                              e.currentTarget.style.color = "rgba(255, 255, 255, 0.7)";
                            }}
                          >
                            {item}
                          </a>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <a
                href="#industries"
                onClick={(e) => {
                  e.preventDefault();
                  handleScrollToSection("industries");
                }}
                style={{
                  padding: "1rem",
                  color: "rgba(255, 255, 255, 0.9)",
                  fontSize: "1.1rem",
                  borderRadius: "0.5rem",
                  transition: "all 0.2s ease",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(99, 102, 241, 0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                Industries
              </a>

              <a
                href="#process"
                onClick={(e) => {
                  e.preventDefault();
                  handleScrollToSection("process");
                }}
                style={{
                  padding: "1rem",
                  color: "rgba(255, 255, 255, 0.9)",
                  fontSize: "1.1rem",
                  borderRadius: "0.5rem",
                  transition: "all 0.2s ease",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(99, 102, 241, 0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                Process
              </a>

              <a
                href="#about"
                onClick={(e) => {
                  e.preventDefault();
                  handleScrollToSection("about");
                }}
                style={{
                  padding: "1rem",
                  color: "rgba(255, 255, 255, 0.9)",
                  fontSize: "1.1rem",
                  borderRadius: "0.5rem",
                  transition: "all 0.2s ease",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(99, 102, 241, 0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                About
              </a>

              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  handleScrollToSection("contact");
                }}
                style={{
                  padding: "1rem",
                  color: "rgba(255, 255, 255, 0.9)",
                  fontSize: "1.1rem",
                  borderRadius: "0.5rem",
                  transition: "all 0.2s ease",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(99, 102, 241, 0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                Contact
              </a>
            </nav>

            <motion.button
              onClick={() => {
                handleScrollToSection("contact");
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              style={{
                width: "100%",
                marginTop: "2rem",
                padding: "1rem 2rem",
                background:
                  "linear-gradient(135deg, #06b6d4 0%, #0891b2 50%, #0e7490 100%)",
                border: "none",
                borderRadius: "9999px",
                color: "#ffffff",
                fontSize: "1rem",
                fontWeight: 600,
                cursor: "pointer",
                boxShadow: "0 4px 20px rgba(6, 182, 212, 0.5)",
                transition: "all 0.3s ease",
              }}
            >
              Get a Quote
            </motion.button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const isHomepage = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          backgroundColor: "#d42e28",
          backdropFilter: "none",
          borderBottom: "1px solid rgba(255, 255, 255, 0.18)",
          transition: "all 0.3s ease",
          boxShadow: "0 10px 28px rgba(0, 0, 0, 0.22)",
          height: "var(--header-height)",
        }}
      >
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            padding: "0 2rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "relative",
            height: "100%",
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            onClick={(e) => {
              if (isHomepage) {
                e.preventDefault();
                scrollToSection("home");
              }
              // If not on homepage, let the Link navigate normally
            }}
            style={{
              position: "absolute",
              left: "2rem",
              top: "50%",
              transform: "translateY(-50%)",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              textDecoration: "none",
            }}
          >
            <Image
              src="/Logo04.png"
              alt="Supreme Animation Studio - Professional 2D & 3D Animation Services Logo"
              width={250}
              height={250}
              priority
              style={{
                width: "clamp(120px, 15vw, 250px)",
                height: "auto",
                objectFit: "contain",
                filter: "drop-shadow(0 6px 16px rgba(0,0,0,0.25))",
              }}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav
            style={{
              display: "none",
              alignItems: "center",
              gap: "2rem",
              marginLeft: "auto",
              marginRight: "auto",
            }}
            className="desktop-nav"
          >
            {/* Services Dropdown */}
            <div
              style={{ position: "relative" }}
              onMouseEnter={() => setOpenDropdown("services")}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button
                style={{
                  background: "none",
                  border: "none",
                  color: "rgba(255, 255, 255, 0.9)",
                  fontSize: "0.95rem",
                  cursor: "pointer",
                  padding: "0.25rem 0 0.5rem 0",
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.25rem",
                  transition: "color 0.2s ease",
                  fontFamily: "var(--font-poppins), sans-serif",
                  fontWeight: 500,
                  letterSpacing: "0.01em",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#ffffff";
                  const underline = e.currentTarget.querySelector(".nav-underline") as HTMLElement;
                  if (underline) underline.style.width = "100%";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "rgba(255, 255, 255, 0.9)";
                  const underline = e.currentTarget.querySelector(".nav-underline") as HTMLElement;
                  if (underline) underline.style.width = "0%";
                }}
                aria-expanded={openDropdown === "services"}
                aria-haspopup="true"
              >
                Services
                <span style={{ fontSize: "0.75rem" }}>▼</span>
                <span
                  className="nav-underline"
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    width: "0%",
                    height: "2px",
                    background:
                      "linear-gradient(90deg, #6366f1 0%, #8b5cf6 50%, #d946ef 100%)",
                    transition: "width 0.3s ease",
                  }}
                />
              </button>
              <ServicesDropdown
                isOpen={openDropdown === "services"}
                onClose={() => setOpenDropdown(null)}
              />
            </div>

            {/* Work (was Portfolio) Dropdown */}
            <div
              style={{ position: "relative" }}
              onMouseEnter={() => setOpenDropdown("portfolio")}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button
                style={{
                  background: "none",
                  border: "none",
                  color: "rgba(255, 255, 255, 0.9)",
                  fontSize: "0.95rem",
                  cursor: "pointer",
                  padding: "0.25rem 0 0.5rem 0",
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.25rem",
                  transition: "color 0.2s ease",
                  fontFamily: "var(--font-poppins), sans-serif",
                  fontWeight: 500,
                  letterSpacing: "0.01em",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#ffffff";
                  const underline = e.currentTarget.querySelector(".nav-underline") as HTMLElement;
                  if (underline) underline.style.width = "100%";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "rgba(255, 255, 255, 0.9)";
                  const underline = e.currentTarget.querySelector(".nav-underline") as HTMLElement;
                  if (underline) underline.style.width = "0%";
                }}
                aria-expanded={openDropdown === "portfolio"}
                aria-haspopup="true"
              >
                Work
                <span style={{ fontSize: "0.75rem" }}>▼</span>
                <span
                  className="nav-underline"
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    width: "0%",
                    height: "2px",
                    background:
                      "linear-gradient(90deg, #6366f1 0%, #8b5cf6 50%, #d946ef 100%)",
                    transition: "width 0.3s ease",
                  }}
                />
              </button>
              <Dropdown
                items={portfolioItems}
                isOpen={openDropdown === "portfolio"}
                onClose={() => setOpenDropdown(null)}
              />
            </div>

            <a
              href="#industries"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("industries");
              }}
              className="nav-link"
              style={{
                color: "rgba(255, 255, 255, 0.9)",
                fontSize: "0.95rem",
                textDecoration: "none",
                position: "relative",
                paddingBottom: "0.5rem",
                transition: "color 0.2s ease",
                fontFamily: "var(--font-poppins), sans-serif",
                fontWeight: 500,
                letterSpacing: "0.01em",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#ffffff";
                const underline = e.currentTarget.querySelector(".nav-underline") as HTMLElement;
                if (underline) underline.style.width = "100%";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "rgba(255, 255, 255, 0.9)";
                const underline = e.currentTarget.querySelector(".nav-underline") as HTMLElement;
                if (underline) underline.style.width = "0%";
              }}
            >
              Industries
              <span
                className="nav-underline"
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  width: "0%",
                  height: "2px",
                  background:
                    "linear-gradient(90deg, #6366f1 0%, #8b5cf6 50%, #d946ef 100%)",
                  transition: "width 0.3s ease",
                }}
              />
            </a>

            <a
              href="#process"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("process");
              }}
              className="nav-link"
              style={{
                color: "rgba(255, 255, 255, 0.9)",
                fontSize: "0.95rem",
                textDecoration: "none",
                position: "relative",
                paddingBottom: "0.5rem",
                transition: "color 0.2s ease",
                fontFamily: "var(--font-poppins), sans-serif",
                fontWeight: 500,
                letterSpacing: "0.01em",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#ffffff";
                const underline = e.currentTarget.querySelector(".nav-underline") as HTMLElement;
                if (underline) underline.style.width = "100%";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "rgba(255, 255, 255, 0.9)";
                const underline = e.currentTarget.querySelector(".nav-underline") as HTMLElement;
                if (underline) underline.style.width = "0%";
              }}
            >
              Process
              <span
                className="nav-underline"
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  width: "0%",
                  height: "2px",
                  background:
                    "linear-gradient(90deg, #6366f1 0%, #8b5cf6 50%, #d946ef 100%)",
                  transition: "width 0.3s ease",
                }}
              />
            </a>

            <a
              href="#about"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("about");
              }}
              className="nav-link"
              style={{
                color: "rgba(255, 255, 255, 0.9)",
                fontSize: "0.95rem",
                textDecoration: "none",
                position: "relative",
                paddingBottom: "0.5rem",
                transition: "color 0.2s ease",
                fontFamily: "var(--font-poppins), sans-serif",
                fontWeight: 500,
                letterSpacing: "0.01em",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#ffffff";
                const underline = e.currentTarget.querySelector(".nav-underline") as HTMLElement;
                if (underline) underline.style.width = "100%";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "rgba(255, 255, 255, 0.9)";
                const underline = e.currentTarget.querySelector(".nav-underline") as HTMLElement;
                if (underline) underline.style.width = "0%";
              }}
            >
              About
              <span
                className="nav-underline"
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  width: "0%",
                  height: "2px",
                  background:
                    "linear-gradient(90deg, #6366f1 0%, #8b5cf6 50%, #d946ef 100%)",
                  transition: "width 0.3s ease",
                }}
              />
            </a>

            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("contact");
              }}
              className="nav-link"
              style={{
                color: "rgba(255, 255, 255, 0.9)",
                fontSize: "0.95rem",
                textDecoration: "none",
                position: "relative",
                paddingBottom: "0.5rem",
                transition: "color 0.2s ease",
                fontFamily: "var(--font-poppins), sans-serif",
                fontWeight: 500,
                letterSpacing: "0.01em",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#ffffff";
                const underline = e.currentTarget.querySelector(".nav-underline") as HTMLElement;
                if (underline) underline.style.width = "100%";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "rgba(255, 255, 255, 0.9)";
                const underline = e.currentTarget.querySelector(".nav-underline") as HTMLElement;
                if (underline) underline.style.width = "0%";
              }}
            >
              Contact
              <span
                className="nav-underline"
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  width: "0%",
                  height: "2px",
                  background:
                    "linear-gradient(90deg, #6366f1 0%, #8b5cf6 50%, #d946ef 100%)",
                  transition: "width 0.3s ease",
                }}
              />
            </a>
          </nav>

          {/* CTA Button - Desktop */}
          <motion.button
            onClick={() => scrollToSection("contact")}
            whileHover={{ scale: 1.05, boxShadow: "0 8px 30px rgba(6, 182, 212, 0.6)" }}
            whileTap={{ scale: 0.98 }}
            style={{
              display: "none",
              padding: "0.75rem 1.5rem",
              background:
                "linear-gradient(135deg, #06b6d4 0%, #0891b2 50%, #0e7490 100%)",
              border: "none",
              borderRadius: "9999px",
              color: "#ffffff",
              fontSize: "0.9rem",
              fontWeight: 600,
              cursor: "pointer",
              boxShadow: "0 4px 20px rgba(6, 182, 212, 0.5)",
              transition: "all 0.3s ease",
            }}
            className="cta-button"
          >
            Get a Quote
          </motion.button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.25rem",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "0.5rem",
            }}
            className="mobile-menu-button"
          >
            <span
              style={{
                width: "24px",
                height: "2px",
                backgroundColor: "#ffffff",
                transition: "all 0.3s ease",
                transform: isMobileMenuOpen
                  ? "rotate(45deg) translateY(8px)"
                  : "none",
              }}
            />
            <span
              style={{
                width: "24px",
                height: "2px",
                backgroundColor: "#ffffff",
                transition: "all 0.3s ease",
                opacity: isMobileMenuOpen ? 0 : 1,
              }}
            />
            <span
              style={{
                width: "24px",
                height: "2px",
                backgroundColor: "#ffffff",
                transition: "all 0.3s ease",
                transform: isMobileMenuOpen
                  ? "rotate(-45deg) translateY(-8px)"
                  : "none",
              }}
            />
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        scrollToSection={scrollToSection}
        servicesCategories={servicesCategories}
        portfolioItems={portfolioItems}
      />

      {/* CSS for responsive behavior */}
      <style jsx global>{`
        @media (min-width: 768px) {
          .desktop-nav {
            display: flex !important;
          }
          .cta-button {
            display: block !important;
          }
          .mobile-menu-button {
            display: none !important;
          }
        }
        @media (max-width: 767px) {
          .desktop-nav {
            display: none !important;
          }
          .cta-button {
            display: none !important;
          }
          .mobile-menu-button {
            display: flex !important;
          }
        }
        .desktop-nav a:hover .nav-underline,
        .desktop-nav button:hover + * .nav-underline {
          width: 100%;
        }
      `}</style>
    </>
  );
}

