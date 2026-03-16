"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";
import ContactForm from "./ContactForm";

interface ContactFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactFormModal({ isOpen, onClose }: ContactFormModalProps) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.6)",
              backdropFilter: "blur(4px)",
              zIndex: 9998,
            }}
          />

          {/* Modal */}
          <div
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "90%",
              maxWidth: "800px",
              maxHeight: "90vh",
              zIndex: 9999,
              pointerEvents: "none",
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              style={{
                width: "100%",
                maxHeight: "90vh",
                backgroundColor: "#ffffff",
                borderRadius: "1.5rem",
                padding: "2rem",
                overflowY: "auto",
                boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
                pointerEvents: "auto",
              }}
            >
            {/* Close Button */}
            <motion.button
              onClick={onClose}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              style={{
                position: "absolute",
                top: "1rem",
                right: "1rem",
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                border: "none",
                backgroundColor: "rgba(196, 30, 58, 0.1)",
                color: "#C41E3A",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.2s ease",
                zIndex: 10000,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(196, 30, 58, 0.2)";
                e.currentTarget.style.filter = "drop-shadow(0 0 8px rgba(196, 30, 58, 0.8)) drop-shadow(0 0 12px rgba(99, 102, 241, 0.6))";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(196, 30, 58, 0.1)";
                e.currentTarget.style.filter = "none";
              }}
              aria-label="Close modal"
            >
              <X size={20} />
            </motion.button>

              {/* Form Content */}
              <div style={{ paddingRight: "2rem" }}>
                <ContactForm showHeader={true} showForm={true} compact={true} />
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

