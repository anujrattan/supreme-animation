"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  countryCode: string;
  phone: string;
  company: string;
  projectNeed: string;
  message: string;
  whatsappSame: string;
};

const initialForm: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  countryCode: "+91",
  phone: "",
  company: "",
  projectNeed: "",
  message: "",
  whatsappSame: "yes",
};

// Country codes with flags (India first)
const countryCodes = [
  { code: "+91", flag: "🇮🇳", country: "India" },
  { code: "+1", flag: "🇺🇸", country: "United States" },
  { code: "+44", flag: "🇬🇧", country: "United Kingdom" },
  { code: "+971", flag: "🇦🇪", country: "UAE" },
  { code: "+61", flag: "🇦🇺", country: "Australia" },
  { code: "+86", flag: "🇨🇳", country: "China" },
  { code: "+81", flag: "🇯🇵", country: "Japan" },
  { code: "+49", flag: "🇩🇪", country: "Germany" },
  { code: "+33", flag: "🇫🇷", country: "France" },
  { code: "+39", flag: "🇮🇹", country: "Italy" },
  { code: "+34", flag: "🇪🇸", country: "Spain" },
  { code: "+31", flag: "🇳🇱", country: "Netherlands" },
  { code: "+65", flag: "🇸🇬", country: "Singapore" },
  { code: "+60", flag: "🇲🇾", country: "Malaysia" },
  { code: "+66", flag: "🇹🇭", country: "Thailand" },
  { code: "+82", flag: "🇰🇷", country: "South Korea" },
  { code: "+55", flag: "🇧🇷", country: "Brazil" },
  { code: "+52", flag: "🇲🇽", country: "Mexico" },
  { code: "+27", flag: "🇿🇦", country: "South Africa" },
  { code: "+20", flag: "🇪🇬", country: "Egypt" },
];

const projectNeeds = [
  "3D Animation Production",
  "Architectural Visualization",
  "Commercial & Brand Animation",
  "Gaming Environments & Art",
  "Medical & Scientific Animation",
  "Motion Graphics & VFX",
  "Web, App & AI Development",
  "Multiple Services",
  "Something Else",
];

interface ContactFormProps {
  showHeader?: boolean;
  showForm?: boolean;
  compact?: boolean;
}

export default function ContactForm({
  showHeader = true,
  showForm = true,
  compact = false,
}: ContactFormProps) {
  const [form, setForm] = useState<FormState>(initialForm);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);

  const cyclingWords = ["Bold", "Epic", "Iconic"];

  // Cycle through words every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % cyclingWords.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (status === "error") {
      setStatus("idle");
      setErrorMessage("");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    try {
      const leadEndpoint =
        process.env.NEXT_PUBLIC_LEAD_ENDPOINT ||
        "http://localhost:54321/functions/v1/submit-lead"; // dev fallback

      const fullPhone = form.phone ? `${form.countryCode}${form.phone}` : null;

      const payload = {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        phone: fullPhone,
        message: form.message,
        service_need: form.projectNeed,
        whatsapp_same: form.whatsappSame === "yes",
        source: "web_contact_us",
        client_id: "supreme-animation",
        company: form.company || null,
      };

      const response = await fetch(leadEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        let errorMessage = `Server error: ${response.status}`;
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorData.message || errorMessage;
        } catch (parseError) {
          const textError = await response.text().catch(() => "");
          errorMessage = textError || errorMessage;
        }
        throw new Error(errorMessage);
      }

      setStatus("sent");
      setForm(initialForm);
      setTimeout(() => setStatus("idle"), 4000);
    } catch (error) {
      setStatus("error");
      const errorMsg =
        error instanceof Error
          ? error.message
          : "Failed to submit form. Please try again.";
      setErrorMessage(errorMsg);
    }
  };

  return (
    <>
      {showHeader && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            marginBottom: compact ? "1.5rem" : "2rem",
            textAlign: "left",
          }}
        >
          <h2
            style={{
              fontSize: compact
                ? "clamp(1.75rem, 3vw, 2.25rem)"
                : "clamp(2.5rem, 5vw, 3.5rem)",
              marginBottom: "0.75rem",
              color: "#1a1a1a",
              fontFamily: "var(--font-headline), sans-serif",
              fontWeight: 700,
              textAlign: "left",
              lineHeight: "1.2",
              display: "inline-block",
            }}
          >
            Let's Create Something -{" "}
            <span
              style={{
                display: "inline-block",
                width: compact
                  ? "clamp(80px, 10vw, 120px)"
                  : "clamp(100px, 12vw, 150px)",
                position: "relative",
                verticalAlign: "baseline",
                height: "1em",
                lineHeight: "1.2",
              }}
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={cyclingWords[currentWordIndex]}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  style={{
                    color: "#C41E3A",
                    display: "inline-block",
                    whiteSpace: "nowrap",
                    position: "absolute",
                    left: 0,
                    top: 0,
                    lineHeight: "1.2",
                    fontSize: "inherit",
                    fontWeight: "inherit",
                    fontFamily: "inherit",
                  }}
                >
                  {cyclingWords[currentWordIndex]}
                </motion.span>
              </AnimatePresence>
            </span>
          </h2>
          <p
            style={{
              color: "rgba(26, 26, 26, 0.75)",
              lineHeight: 1.7,
              marginBottom: "1.25rem",
              fontFamily: "var(--font-poppins), sans-serif",
              fontWeight: 400,
              textAlign: "left",
            }}
          >
            Share your idea, timing, and ambition. We'll assemble the right team
            and production plan to bring it to life.
          </p>
        </motion.div>
      )}

      {showForm && (
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: showHeader ? 0.1 : 0 }}
          style={{
            backgroundColor: "#ffffff",
            border: "1px solid rgba(15,23,42,0.08)",
            borderRadius: "1.5rem",
            padding: compact ? "1.5rem" : "2rem",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1rem",
            maxWidth: "100%",
            width: "100%",
            boxShadow: "0 18px 45px rgba(15,23,42,0.08)",
          }}
        >
          <input type="hidden" name="client_id" value="supreme-animation" />

          <label style={labelStyle}>
            First Name *
            <input
              required
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              placeholder="Jane"
              style={inputStyle}
            />
          </label>
          <label style={labelStyle}>
            Last Name *
            <input
              required
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              placeholder="Doe"
              style={inputStyle}
            />
          </label>

          <label style={labelStyle}>
            Company / Studio
            <input
              name="company"
              value={form.company}
              onChange={handleChange}
              placeholder="Studio / Brand"
              style={inputStyle}
            />
          </label>
          <label style={labelStyle}>
            Email *
            <input
              required
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@brand.com"
              style={inputStyle}
            />
          </label>

          <label style={labelStyle}>
            Phone Number
            <div
              style={{ display: "flex", gap: "0.5rem", alignItems: "stretch" }}
            >
              <select
                name="countryCode"
                value={form.countryCode}
                onChange={handleChange}
                style={{
                  ...inputStyle,
                  width: "130px",
                  flexShrink: 0,
                  padding: "0.75rem 0.5rem",
                  cursor: "pointer",
                }}
              >
                {countryCodes.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.flag} {country.code}
                  </option>
                ))}
              </select>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Enter Phone Number"
                style={{ ...inputStyle, flex: 1, minWidth: 0 }}
              />
            </div>
          </label>
          <label style={labelStyle}>
            <span>Is this number also your WhatsApp number? *</span>
            <div
              style={{
                display: "flex",
                gap: "1.5rem",
                alignItems: "center",
                marginTop: "0.25rem",
              }}
            >
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  cursor: "pointer",
                fontFamily: "var(--font-poppins), sans-serif",
                fontSize: "0.9rem",
                margin: 0,
                fontWeight: 400,
                color: "#111827",
                }}
              >
                <input
                  type="radio"
                  name="whatsappSame"
                  value="yes"
                  checked={form.whatsappSame === "yes"}
                  onChange={handleChange}
                  required={!!form.phone}
                  style={{ cursor: "pointer", accentColor: "#C41E3A" }}
                />
                Yes
              </label>
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  cursor: "pointer",
                fontFamily: "var(--font-poppins), sans-serif",
                fontSize: "0.9rem",
                margin: 0,
                fontWeight: 400,
                color: "#111827",
                }}
              >
                <input
                  type="radio"
                  name="whatsappSame"
                  value="no"
                  checked={form.whatsappSame === "no"}
                  onChange={handleChange}
                  required={!!form.phone}
                  style={{ cursor: "pointer", accentColor: "#C41E3A" }}
                />
                No
              </label>
            </div>
          </label>

          <label style={{ ...labelStyle, gridColumn: "1 / -1" }}>
            Service Interested in *
            <select
              required
              name="projectNeed"
              value={form.projectNeed}
              onChange={handleChange}
              style={inputStyle}
            >
              <option value="" disabled>
                Select an option
              </option>
              {projectNeeds.map((need) => (
                <option key={need} value={need}>
                  {need}
                </option>
              ))}
            </select>
          </label>

          <label style={{ ...labelStyle, gridColumn: "1 / -1" }}>
            Tell us about your project *
            <textarea
              required
              name="message"
              value={form.message}
              onChange={handleChange}
              rows={4}
              placeholder="Drop key details, timelines, reference links..."
              style={{ ...inputStyle, resize: "vertical" }}
            />
          </label>

          {errorMessage && (
            <div
              style={{
                padding: "0.75rem 1rem",
                borderRadius: "0.625rem",
                backgroundColor: "rgba(196, 30, 58, 0.12)",
                border: "1px solid rgba(196, 30, 58, 0.3)",
                color: "#ff8a8a",
                fontSize: "0.875rem",
                gridColumn: "1 / -1",
                fontFamily: "var(--font-poppins), sans-serif",
              }}
            >
              {errorMessage}
            </div>
          )}

          {status === "sent" && (
            <div
              style={{
                padding: "0.875rem 1rem",
                borderRadius: "0.625rem",
                backgroundColor: "rgba(16,185,129,0.12)",
                border: "1px solid rgba(16,185,129,0.3)",
                color: "#6ee7b7",
                fontSize: "0.875rem",
                gridColumn: "1 / -1",
                fontFamily: "var(--font-poppins), sans-serif",
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              ✓ &nbsp;Message sent! We&apos;ll be in touch within 1 business
              day.
            </div>
          )}

          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              width: "100%",
              gridColumn: "1 / -1",
              gap: "1rem",
              alignItems: "center",
            }}
          >
            <motion.button
              type="submit"
              disabled={status === "sending" || status === "sent"}
              whileHover={status === "idle" ? { scale: 1.02 } : {}}
              whileTap={status === "idle" ? { scale: 0.98 } : {}}
              style={{
                padding: "0.95rem 2.25rem",
                borderRadius: "100px",
                border: "none",
                background:
                  status === "sent"
                    ? "rgba(16,185,129,0.12)"
                    : status === "sending"
                      ? "rgba(196,30,58,0.7)"
                      : "#C41E3A",
                color: "#ffffff",
                fontWeight: 700,
                fontSize: "0.9rem",
                cursor:
                  status === "sending" || status === "sent"
                    ? "not-allowed"
                    : "pointer",
                fontFamily: "var(--font-poppins), sans-serif",
                letterSpacing: "0.04em",
                boxShadow:
                  status === "idle"
                    ? "0 6px 24px rgba(196,30,58,0.35)"
                    : "none",
                transition: "all 0.25s ease",
                display: "flex",
                alignItems: "center",
                gap: "0.6rem",
              }}
            >
              {status === "sending" ? (
                "Sending…"
              ) : status === "sent" ? (
                "✓ Sent!"
              ) : (
                <>
                  Send Message
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M5 12h14M12 5l7 7-7 7"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </>
              )}
            </motion.button>
            <p
              style={{
                fontSize: "0.72rem",
                color: "rgba(15,23,42,0.45)",
                fontFamily: "var(--font-poppins), sans-serif",
                margin: 0,
                lineHeight: 1.5,
              }}
            >
              No spam, ever.
              <br />
              NDA available on request.
            </p>
          </div>
        </motion.form>
      )}
    </>
  );
}

const labelStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "0.35rem",
  color: "#111827",
  fontSize: "0.9rem",
  fontWeight: 600,
  fontFamily: "var(--font-poppins), sans-serif",
};

const inputStyle: React.CSSProperties = {
  padding: "0.85rem 1rem",
  borderRadius: "0.75rem",
  border: "1px solid rgba(15,23,42,0.12)",
  backgroundColor: "#f9fafb",
  color: "#0f172a",
  fontSize: "0.95rem",
  outline: "none",
  fontFamily: "var(--font-poppins), sans-serif",
  transition: "border-color 0.2s ease, box-shadow 0.2s ease",
};
