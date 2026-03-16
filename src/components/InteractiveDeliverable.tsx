"use client";

interface InteractiveDeliverableProps {
  deliverable: string;
  index: number;
}

const colors = ["#C41E3A", "#6366f1", "#d946ef", "#06b6d4"];

export default function InteractiveDeliverable({ deliverable, index }: InteractiveDeliverableProps) {
  const color = colors[index % colors.length];
  const nextColor = colors[(index + 1) % colors.length];

  return (
    <li
      style={{
        padding: "1rem 1.25rem",
        borderRadius: "0.75rem",
        border: `1px solid ${color}40`,
        background: `linear-gradient(135deg, ${color}15, ${nextColor}08)`,
        fontSize: "0.95rem",
        color: "rgba(26,26,26,0.9)",
        fontFamily: "var(--font-poppins), sans-serif",
        paddingLeft: "2rem",
        position: "relative",
        fontWeight: 500,
        lineHeight: "1.5",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        minHeight: "3rem",
        display: "flex",
        alignItems: "center",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateX(4px)";
        e.currentTarget.style.boxShadow = `0 4px 12px ${color}30`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateX(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <span
        style={{
          position: "absolute",
          left: "1rem",
          top: "50%",
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          background: `linear-gradient(135deg, ${color}, ${nextColor})`,
          boxShadow: `0 2px 6px ${color}50`,
          transform: "translateY(-50%)",
        }}
      />
      <span>{deliverable}</span>
    </li>
  );
}

