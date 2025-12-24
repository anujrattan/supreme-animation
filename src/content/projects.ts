export type ProjectMedia =
  | {
      kind: "image";
      src: string;
      alt: string;
    }
  | {
      kind: "video";
      src: string;
      poster?: string;
    };

export type Project = {
  slug: string;
  title: string;
  clientLabel: string; // anonymized by default (NDA-safe)
  industry: string;
  deliverableLabel: string; // what we made
  services: string[];
  year: string;
  featured?: boolean;
  thumb?: ProjectMedia;
  gallery?: ProjectMedia[];
  summary: string;
  highlights: string[];
  ctaLabel?: string;
  ctaHref?: string;
  caseStudy?: {
    /** Short 2–3 line context. Keep NDA-safe. */
    challenge: string;
    /** Bullet steps describing how we executed. */
    approach: string[];
    /** Concrete outputs. */
    deliverables: string[];
    /** Placeholder metrics/results; replace with real numbers later. */
    results: { label: string; value: string }[];
  };
};

/**
 * Go-live note:
 * - Keep clientLabel anonymized unless you have explicit permission to name/logo.
 * - Add media under /public/portfolio/... and reference via `src` like "/portfolio/foo.jpg".
 */
export const projects: Project[] = [
  {
    slug: "insurtech-product-explainer",
    title: "InsurTech Product Explainer",
    clientLabel: "Global InsurTech Platform",
    industry: "Insurance & InsurTech",
    deliverableLabel: "2D/3D Explainer Video",
    services: ["Script support", "Storyboards", "Design", "Animation", "Sound"],
    year: "2025",
    featured: true,
    summary:
      "A conversion-focused explainer built to simplify a complex product and drive sign-ups across web and paid channels.",
    highlights: [
      "Clear problem → solution narrative with tight pacing",
      "Modular scenes for easy future updates",
      "Delivered in multiple aspect ratios for ads and landing pages",
    ],
    caseStudy: {
      challenge:
        "Explain a complex product in under 90 seconds, align stakeholders, and produce a version that can be repurposed across ads, web, and sales decks.",
      approach: [
        "Messaging workshop + script support",
        "Storyboard + styleframes for early alignment",
        "Animation in modular scenes for fast iteration",
        "Final sound mix + multi-format delivery",
      ],
      deliverables: [
        "Main explainer (16:9)",
        "Social cutdowns (9:16, 1:1)",
        "Editable captions + end-cards",
      ],
      results: [
        { label: "Turnaround", value: "— (replace)" },
        { label: "Formats delivered", value: "— (replace)" },
        { label: "Performance uplift", value: "— (replace)" },
      ],
    },
    ctaLabel: "Discuss an explainer",
    ctaHref: "/#contact",
  },
  {
    slug: "real-estate-archviz-walkthrough",
    title: "ArchViz Walkthrough & Elevations",
    clientLabel: "Luxury Real Estate Developer",
    industry: "Real Estate & Architecture",
    deliverableLabel: "3D Walkthrough + Elevation Renders",
    services: ["Lookdev", "Lighting", "3D animation", "Rendering", "Edit"],
    year: "2025",
    featured: true,
    summary:
      "Photoreal visualization to sell a development pre-build—walkthrough, hero shots, and elevation renders for pitch decks.",
    highlights: [
      "Day/night lighting variants",
      "Cinematic camera moves for premium feel",
      "Still renders for brochures and hoardings",
    ],
    caseStudy: {
      challenge:
        "Showcase a premium property pre-build with photoreal visuals that sell the space, materials, and lifestyle—without overcomplicating approvals.",
      approach: [
        "Lookdev for materials + lighting",
        "Cinematic camera blocking for key moments",
        "Day/night variants and still render set",
        "Final grade + export for web and pitch decks",
      ],
      deliverables: [
        "3D walkthrough video",
        "Elevation renders (set)",
        "Hero stills for brochures",
      ],
      results: [
        { label: "Renders", value: "— (replace)" },
        { label: "Video length", value: "— (replace)" },
        { label: "Stakeholder approval cycles", value: "— (replace)" },
      ],
    },
    ctaLabel: "Request ArchViz pricing",
    ctaHref: "/#contact",
  },
  {
    slug: "healthcare-procedure-animation",
    title: "Healthcare Procedure Animation",
    clientLabel: "Healthcare Innovation Team",
    industry: "Healthcare & MedTech",
    deliverableLabel: "Medical Explainer + Product Demo",
    services: ["Research alignment", "Storyboards", "3D animation", "Compositing"],
    year: "2024",
    summary:
      "An accuracy-first animation explaining a procedure and device benefits for patients, sales teams, and conferences.",
    highlights: [
      "Clinically informed visuals with clear labeling",
      "Cutdowns for social and booth screens",
      "Delivered with editable captions",
    ],
    caseStudy: {
      challenge:
        "Communicate a procedure and device benefits with clarity and accuracy for mixed audiences (patients, sales, and conferences).",
      approach: [
        "Reference alignment + terminology lock",
        "Storyboard with medical callouts",
        "3D animation + compositing pass",
        "Cutdowns + caption-ready exports",
      ],
      deliverables: ["Main explainer", "Short cutdowns", "Caption file + safe-area versions"],
      results: [
        { label: "Review rounds", value: "— (replace)" },
        { label: "Versions", value: "— (replace)" },
        { label: "Use cases", value: "— (replace)" },
      ],
    },
    ctaLabel: "Plan a healthcare video",
    ctaHref: "/#contact",
  },
  {
    slug: "ecommerce-product-promo",
    title: "Ecommerce Product Promo",
    clientLabel: "DTC Ecommerce Brand",
    industry: "Ecommerce",
    deliverableLabel: "Product Video Ads",
    services: ["Concepts", "Design", "Motion", "Edits", "Cutdowns"],
    year: "2024",
    summary:
      "A set of product-led ads optimized for performance marketing—fast hooks, bold typography, and benefit-first messaging.",
    highlights: [
      "Multiple hooks for testing",
      "Platform-native cuts (Reels/TikTok/YouTube)",
      "Deliverables packaged for rapid iteration",
    ],
    caseStudy: {
      challenge:
        "Create performance-ready creatives that highlight benefits fast, with multiple variants for hook testing and rapid iteration.",
      approach: [
        "Concept + hook options",
        "Typography-led motion system",
        "Batch exports per platform specs",
        "Variant packaging for testing",
      ],
      deliverables: ["Ad set (multiple hooks)", "Platform cuts", "Editable end-cards"],
      results: [
        { label: "Variants", value: "— (replace)" },
        { label: "Platforms", value: "— (replace)" },
        { label: "Iteration speed", value: "— (replace)" },
      ],
    },
    ctaLabel: "Create product ads",
    ctaHref: "/#contact",
  },
  {
    slug: "game-trailer-cinematics",
    title: "Game Trailer Cinematics",
    clientLabel: "Indie Game Studio",
    industry: "Gaming",
    deliverableLabel: "Trailer + Cinematic Shots",
    services: ["Cinematics", "Animation", "VFX", "Edit", "Sound"],
    year: "2024",
    summary:
      "A cinematic trailer designed to communicate gameplay tone and world-building while maintaining release-date flexibility.",
    highlights: [
      "Trailer structure optimized for retention",
      "Cinematic shots reusable for store pages",
      "Deliverables for Steam and social",
    ],
    caseStudy: {
      challenge:
        "Build hype with a cinematic trailer while keeping the pipeline flexible for last-minute gameplay changes and release-date updates.",
      approach: [
        "Beat sheet + trailer structure",
        "Cinematics + VFX passes",
        "Edit + sound design",
        "Exports for store + socials",
      ],
      deliverables: ["Main trailer", "Store cut", "Social teasers"],
      results: [
        { label: "Shots created", value: "— (replace)" },
        { label: "Deliverables", value: "— (replace)" },
        { label: "Revision turnaround", value: "— (replace)" },
      ],
    },
    ctaLabel: "Plan a trailer",
    ctaHref: "/#contact",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}


