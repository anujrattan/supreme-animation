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
  budget: string;
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
  budget: "",
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
  "AI Avatars & VTubers",
  "Digital Humans / Cinematics",
  "Game Art & Assets",
  "Virtual Production",
  "Kids Animation",
  "Web / App Development",
  "Something Else",
];

const cyclingWords = ["Bold", "Epic", "Iconic"];

export default function Contact() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);

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
    >
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setForm((prev) => ({
      ...prev,
      [name]: type === "radio" ? value : value,
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
      // n8n webhook endpoint - update the path to match your n8n webhook
      const n8nWebhookUrl =
        process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL ||
        "http://localhost:5678/webhook/contact";

      // Prepare payload with first_name, last_name, and whatsapp_same boolean
      // Combine country code and phone number
      const fullPhone = form.phone ? `${form.countryCode}${form.phone}` : null;

      const payload = {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        phone: fullPhone,
        message: form.message,
        service_interest: form.projectNeed,
        whatsapp_same: form.whatsappSame === "yes",
        source: "web_contact_us",
        client_id: "supreme-animation",
        company: form.company || null,
        budget: form.budget || null,
      };

      console.log("Submitting form to:", n8nWebhookUrl);
      console.log("Payload:", payload);

      const response = await fetch(n8nWebhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      console.log("Response status:", response.status);
      console.log(
        "Response headers:",
        Object.fromEntries(response.headers.entries())
      );

      // n8n typically returns 200 OK for successful webhook triggers
      // Adjust response handling based on your n8n workflow response
      if (!response.ok) {
        let errorMessage = `Server error: ${response.status}`;
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorData.message || errorMessage;
          console.error("Error response data:", errorData);
        } catch (parseError) {
          // Response might not be JSON
          const textError = await response.text().catch(() => "");
          console.error("Error response text:", textError);
          errorMessage = textError || errorMessage;
        }
        throw new Error(errorMessage);
      }

      // Try to parse JSON response, but n8n might return empty body
      let data;
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        try {
          data = await response.json();
          console.log("Success response data:", data);
        } catch (parseError) {
          console.warn("Failed to parse JSON response, treating as success");
          data = { success: true };
        }
      } else {
        // Empty body or non-JSON response - still success if status is 200
        console.log("Non-JSON or empty response, treating as success");
        data = { success: true };
      }

      setStatus("sent");
      setForm(initialForm);
      setTimeout(() => setStatus("idle"), 4000);
    } catch (error) {
      console.error("Error submitting form:", error);
      console.error("Error details:", {
        message: error instanceof Error ? error.message : "Unknown error",
        stack: error instanceof Error ? error.stack : undefined,
      });
      setStatus("error");
      const errorMsg =
        error instanceof Error
          ? error.message
          : "Failed to submit form. Please try again.";
      setErrorMessage(errorMsg);
    }
  };

  return (
    <section
      style={{
        padding: "3rem 2rem",
        position: "relative",
        zIndex: 10,
        backgroundColor: "#f9f9f9",
        borderTop: "1px solid rgba(0, 0, 0, 0.1)",
      }}
    >
      <div
        className="contact-container"
        style={{
          maxWidth: "clamp(1200px, 95vw, 1600px)",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "7rem",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          style={{ textAlign: "left" }}
        >
          <h2
            style={{
              fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
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
                width: "clamp(100px, 12vw, 150px)",
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
          <div
            style={{
              color: "rgba(26, 26, 26, 0.65)",
              lineHeight: 1.7,
              fontFamily: "var(--font-poppins), sans-serif",
              fontWeight: 400,
              textAlign: "left",
            }}
          >
            <p>
              <strong>Studio Email:</strong>{" "}
              <a
                href="mailto:info@supremeanimation.com"
                style={{ color: "inherit", textDecoration: "underline" }}
              >
                info@supremeanimation.com
              </a>
            </p>
            <p>
              <strong>HQ:</strong> 4800 Meadows Rd, STE 300, Lake Oswego, OR
              97035
            </p>
            <p>
              <strong>Global:</strong> London • Punjab • Ajman • Remote-first
            </p>
          </div>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="contact-form"
          style={{
            backgroundColor: "#ffffff",
            border: "1px solid rgba(0, 0, 0, 0.1)",
            borderRadius: "1.5rem",
            padding: "1.75rem",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1rem",
            maxWidth: "100%",
            width: "100%",
          }}
        >
          {/* Hidden client_id field */}
          <input type="hidden" name="client_id" value="supreme-animation" />

          {/* Row 1: First Name, Last Name - 2 columns */}
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

          {/* Row 2: Company/Studio, Email - 2 columns */}
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

          {/* Row 3: Phone Number, WhatsApp radio button - 2 columns */}
          <label style={labelStyle}>
            Phone Number
            <div
              style={{
                display: "flex",
                gap: "0.5rem",
                alignItems: "stretch",
              }}
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
                style={{
                  ...inputStyle,
                  flex: 1,
                  minWidth: 0,
                }}
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
                  fontSize: "0.95rem",
                  margin: 0,
                  fontWeight: 400,
                }}
              >
                <input
                  type="radio"
                  name="whatsappSame"
                  value="yes"
                  checked={form.whatsappSame === "yes"}
                  onChange={handleChange}
                  required={!!form.phone}
                  style={{ cursor: "pointer" }}
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
                  fontSize: "0.95rem",
                  margin: 0,
                  fontWeight: 400,
                }}
              >
                <input
                  type="radio"
                  name="whatsappSame"
                  value="no"
                  checked={form.whatsappSame === "no"}
                  onChange={handleChange}
                  required={!!form.phone}
                  style={{ cursor: "pointer" }}
                />
                No
              </label>
            </div>
          </label>

          {/* Row 4: Service Interested in - single row (full width) */}
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

          {/* Row 5: Estimated Budget - single row (full width) */}
          <label style={{ ...labelStyle, gridColumn: "1 / -1" }}>
            Estimated budget (optional)
            <input
              name="budget"
              value={form.budget}
              onChange={handleChange}
              placeholder="$50K – $150K"
              style={inputStyle}
            />
          </label>

          {/* Row 6: Tell us about your project - single row (full width) */}
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
                borderRadius: "0.5rem",
                backgroundColor: "rgba(196, 30, 58, 0.1)",
                border: "1px solid rgba(196, 30, 58, 0.3)",
                color: "#ff6b6b",
                fontSize: "0.9rem",
              }}
            >
              {errorMessage}
            </div>
          )}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
              gridColumn: "1 / -1",
            }}
          >
            <motion.button
              type="submit"
              disabled={status === "sending"}
              whileHover={status !== "sending" ? { scale: 1.01 } : {}}
              whileTap={status !== "sending" ? { scale: 0.98 } : {}}
              style={{
                padding: "1rem 1.5rem",
                borderRadius: "999px",
                border: "none",
                background: status === "sending" ? "#666" : "#C41E3A",
                color: "#ffffff",
                fontWeight: 700,
                fontSize: "1rem",
                cursor: status === "sending" ? "not-allowed" : "pointer",
                opacity: status === "sending" ? 0.7 : 1,
                fontFamily: "var(--font-headline), sans-serif",
                width: "50%",
              }}
            >
              {status === "sending"
                ? "Sending..."
                : status === "sent"
                ? "Message Sent!"
                : "Send Message"}
            </motion.button>
          </div>
        </motion.form>
      </div>
    </section>
  );
}

const labelStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "0.35rem",
  color: "#1a1a1a",
  fontSize: "0.95rem",
  fontWeight: 600,
};

const inputStyle: React.CSSProperties = {
  padding: "0.9rem 1rem",
  borderRadius: "0.75rem",
  border: "1px solid rgba(255,255,255,0.15)",
  backgroundColor: "#fafafa",
  color: "#1a1a1a",
  fontSize: "1rem",
  outline: "none",
};
