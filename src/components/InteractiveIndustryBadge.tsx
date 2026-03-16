"use client";

interface InteractiveIndustryBadgeProps {
  industry: string;
  index?: number;
}

const colors = ["#C41E3A", "#6366f1", "#d946ef", "#06b6d4", "#10b981"];

export default function InteractiveIndustryBadge({ industry, index = 0 }: InteractiveIndustryBadgeProps) {
  const color = colors[index % colors.length];
  const nextColor = colors[(index + 1) % colors.length];

  return (
    <span
      style={{
        display: "inline-block",
        padding: "0.5rem 1rem",
        borderRadius: "0.5rem",
        background: `linear-gradient(135deg, ${color}15, ${nextColor}08)`,
        border: `1px solid ${color}40`,
        fontSize: "0.875rem",
        color: color,
        fontFamily: "var(--font-poppins), sans-serif",
        fontWeight: 600,
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow = `0 4px 12px ${color}30`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {industry}
    </span>
  );
}

