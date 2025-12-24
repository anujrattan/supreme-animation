"use client";

import { motion } from "framer-motion";

export default function WhatsAppButton() {
  const phoneNumber = "919646168597"; // +91 96461 68597 without spaces and country code prefix
  const whatsappUrl = `https://wa.me/${phoneNumber}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      style={{
        position: "fixed",
        bottom: "2rem",
        right: "2rem",
        width: "70px",
        height: "70px",
        borderRadius: "50%",
        backgroundColor: "#25D366",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 4px 20px rgba(37, 211, 102, 0.4)",
        zIndex: 1000,
        textDecoration: "none",
        color: "#ffffff",
        transition: "all 0.3s ease",
        overflow: "visible",
        fontFamily: "var(--font-poppins), sans-serif",
        fontWeight: 600,
        fontSize: "0.65rem",
        lineHeight: "1",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "0 8px 30px rgba(37, 211, 102, 0.6)";
        e.currentTarget.style.backgroundColor = "#20BA5A";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "0 4px 20px rgba(37, 211, 102, 0.4)";
        e.currentTarget.style.backgroundColor = "#25D366";
      }}
      aria-label="Contact us on WhatsApp"
    >
      {/* Pulsating ring effect */}
      <motion.div
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.55, 0.25, 0.55],
        }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          position: "absolute",
          width: "74%",
          height: "74%",
          borderRadius: "50%",
          border: "2px solid rgba(255, 255, 255, 0.85)",
          top: "13%",
          left: "13%",
          boxShadow:
            "0 0 0 1px rgba(37, 211, 102, 0.35), 0 0 18px rgba(37, 211, 102, 0.55), 0 0 38px rgba(37, 211, 102, 0.25)",
          filter: "blur(0.2px)",
          pointerEvents: "none",
        }}
      />
      
      {/* Curved text inside the green bubble using SVG */}
      <svg
        width="70"
        height="70"
        viewBox="0 0 70 70"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          overflow: "visible",
        }}
      >
        <defs>
          {/* Outer arcs - tuned so text sits evenly around the icon */}
          <path
            id="topArc"
            d="M 7,35 A 28,28 0 0,1 63,35"
            fill="none"
          />
          <path
            id="bottomArc"
            d="M 7,35 A 28,28 0 0,0 63,35"
            fill="none"
          />
        </defs>
        {/* Top half: "Click to" at exact top, centered */}
        <text
          fontSize="8"
          fontWeight="900"
          fill="#ffffff"
          fontFamily="var(--font-poppins), sans-serif"
          letterSpacing="0.3px"
          dominantBaseline="middle"
        >
          <textPath href="#topArc" startOffset="50%" textAnchor="middle" dy="-1">
            Click to
          </textPath>
        </text>
        {/* Bottom half: "WhatsApp" at exact bottom, reading left to right, curving upward */}
        <text
          fontSize="8"
          fontWeight="900"
          fill="#ffffff"
          fontFamily="var(--font-poppins), sans-serif"
          letterSpacing="0.3px"
          dominantBaseline="middle"
        >
          <textPath href="#bottomArc" startOffset="50%" textAnchor="middle" dy="1">
            WhatsApp
          </textPath>
        </text>
      </svg>

      {/* WhatsApp Icon */}
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 1,
        }}
      >
        <path
          d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"
          fill="currentColor"
        />
      </svg>
    </motion.a>
  );
}

