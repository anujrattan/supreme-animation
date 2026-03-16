import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getServiceCategoryById, getAllServiceCategories } from "@/content/services";
import { createSubcategorySlug } from "@/content/subcategories";
import pageStyles from "../servicePage.module.css";
import ProjectCTAButton from "@/components/ProjectCTAButton";
import InteractiveLink from "@/components/InteractiveLink";
import BreadcrumbLink from "@/components/BreadcrumbLink";
import InteractiveCard from "@/components/InteractiveCard";
import InteractiveDeliverable from "@/components/InteractiveDeliverable";
import InteractiveIndustryBadge from "@/components/InteractiveIndustryBadge";
import InteractiveCTAButton from "@/components/InteractiveCTAButton";
import Header from "@/components/Header";
import MinimalFooter from "@/components/MinimalFooter";

function PlaceholderHero() {
  return (
    <div
      style={{
        width: "100%",
        aspectRatio: "16 / 9",
        borderRadius: "1.25rem",
        border: "2px dashed rgba(196, 30, 58, 0.3)",
        background:
          "linear-gradient(135deg, rgba(196, 30, 58, 0.08) 0%, rgba(99, 102, 241, 0.08) 50%, rgba(217, 70, 239, 0.08) 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 8px 32px rgba(196, 30, 58, 0.1)",
      }}
    >
      <p style={{ color: "rgba(26,26,26,0.5)", fontSize: "1rem", fontFamily: "var(--font-poppins), sans-serif" }}>
        Hero Image/Video Placeholder
      </p>
    </div>
  );
}

export function generateStaticParams() {
  return getAllServiceCategories().map((category) => ({
    category: category.id,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params;
  const service = getServiceCategoryById(category);
  if (!service) return {};

  const title = service.seoMeta?.title || `${service.name} | Supreme Animation Studio`;
  const description = service.seoMeta?.description || service.description;

  return {
    title,
    description,
    keywords: service.seoMeta?.keywords || [],
    openGraph: {
      title,
      description,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function ServiceCategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const service = getServiceCategoryById(category);
  if (!service) notFound();

  // Generate Service structured data for SEO
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://supremeanimation.com';
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": service.name,
    "name": service.name,
    "description": service.description,
    "provider": {
      "@type": "Organization",
      "name": "Supreme Animation Studio",
      "url": baseUrl,
    },
    "areaServed": "Worldwide",
    "availableChannel": {
      "@type": "ServiceChannel",
      "serviceUrl": `${baseUrl}/services/${service.id}`,
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": baseUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Services",
        "item": `${baseUrl}/#services`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": service.name,
        "item": `${baseUrl}/services/${service.id}`
      }
    ]
  };

  return (
    <>
      <Header />
      <main
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #f8f9fa 0%, #ffffff 50%, #f0f4ff 100%)",
          color: "#1a1a1a",
          padding: "clamp(2.5rem, 5vw, 4rem) clamp(1rem, 3vw, 2rem)",
          paddingTop: `calc(var(--header-height) + clamp(2.5rem, 5vw, 4rem))`,
        }}
        className={pageStyles.page}
      >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div style={{ maxWidth: "1100px", margin: "0 auto" }} className={pageStyles.container}>
        {/* Breadcrumbs */}
        <nav style={{ marginBottom: "2rem" }} aria-label="Breadcrumb">
          <ol style={{ display: "flex", alignItems: "center", gap: "0.5rem", listStyle: "none", padding: 0, margin: 0, flexWrap: "wrap" }}>
            <li>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </li>
            <li style={{ color: "rgba(26,26,26,0.4)", fontSize: "0.9rem" }}>›</li>
            <li>
              <BreadcrumbLink href="/#services">Services</BreadcrumbLink>
            </li>
            <li style={{ color: "rgba(26,26,26,0.4)", fontSize: "0.9rem" }}>›</li>
            <li>
              <BreadcrumbLink href={`/services/${category}`} isActive={true}>
                {service.name}
              </BreadcrumbLink>
            </li>
          </ol>
        </nav>

        {/* Header */}
        <header style={{ marginBottom: "2rem", overflow: "visible" }}>
          <p
            style={{
              textTransform: "uppercase",
              letterSpacing: "0.25em",
              color: "#C41E3A",
              marginBottom: "0.75rem",
              fontWeight: 700,
              fontFamily: "var(--font-headline), sans-serif",
              fontSize: "0.9rem",
            }}
          >
            Service Category
          </p>
          <h1
            style={{
              fontSize: "clamp(2.25rem, 4.5vw, 3.5rem)",
              fontFamily: "var(--font-headline), sans-serif",
              fontWeight: 900,
              lineHeight: "1.2",
              letterSpacing: "-0.02em",
              marginBottom: "0.75rem",
              paddingBottom: "0.25rem",
              background: "linear-gradient(135deg, #C41E3A 0%, #6366f1 50%, #d946ef 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              overflow: "visible",
            }}
          >
            {service.name}
          </h1>
          <p
            style={{
              color: "rgba(26,26,26,0.8)",
              fontFamily: "var(--font-poppins), sans-serif",
              fontWeight: 500,
              fontSize: "clamp(1.1rem, 1.5vw, 1.3rem)",
              lineHeight: "1.6",
              maxWidth: "800px",
            }}
          >
            {service.tagline}
          </p>
        </header>

        {/* Hero + Sidebar */}
        <section className={pageStyles.heroGrid} style={{ marginBottom: "3rem" }}>
          <div style={{ position: "relative" }}>
            {service.heroMedia ? (
              service.heroMedia.type === 'image' ? (
                <Image
                  src={service.heroMedia.src}
                  alt={service.heroMedia.alt || `${service.name} - Supreme Animation Studio`}
                  width={1600}
                  height={900}
                  priority
                  style={{
                    width: "100%",
                    height: "auto",
                    borderRadius: "1.25rem",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <video
                  controls
                  playsInline
                  preload="metadata"
                  style={{
                    width: "100%",
                    borderRadius: "1.25rem",
                    backgroundColor: "rgba(255,255,255,0.06)",
                  }}
                >
                  <source src={service.heroMedia.src} type="video/mp4" />
                </video>
              )
            ) : (
              <PlaceholderHero />
            )}
          </div>

          <aside className={`${pageStyles.card} ${pageStyles.cardPad}`} style={{ position: "sticky", top: "calc(var(--header-height) + 2rem)" }}>
            {/* Quick Info Section */}
            <div style={{ marginBottom: "1.5rem" }}>
              <div
                style={{
                  fontSize: "0.75rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.15em",
                  color: "#C41E3A",
                  fontFamily: "var(--font-headline), sans-serif",
                  fontWeight: 700,
                  marginBottom: "1rem",
                }}
              >
                Quick Info
              </div>
              {service.quickInfo && (
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  {service.quickInfo.timeline && (
                    <div>
                      <div
                        style={{
                          fontSize: "0.75rem",
                          textTransform: "uppercase",
                          letterSpacing: "0.1em",
                          color: "rgba(26,26,26,0.6)",
                          fontFamily: "var(--font-headline), sans-serif",
                          fontWeight: 600,
                          marginBottom: "0.25rem",
                        }}
                      >
                        Timeline
                      </div>
                      <div
                        style={{
                          fontFamily: "var(--font-poppins), sans-serif",
                          fontWeight: 600,
                          color: "#1a1a1a",
                          fontSize: "0.95rem",
                        }}
                      >
                        {service.quickInfo.timeline}
                      </div>
                    </div>
                  )}
                  {service.quickInfo.typicalProject && (
                    <div>
                      <div
                        style={{
                          fontSize: "0.75rem",
                          textTransform: "uppercase",
                          letterSpacing: "0.1em",
                          color: "rgba(26,26,26,0.6)",
                          fontFamily: "var(--font-headline), sans-serif",
                          fontWeight: 600,
                          marginBottom: "0.25rem",
                        }}
                      >
                        Typical Project
                      </div>
                      <div
                        style={{
                          fontFamily: "var(--font-poppins), sans-serif",
                          fontWeight: 500,
                          color: "rgba(26,26,26,0.85)",
                          fontSize: "0.9rem",
                          lineHeight: "1.4",
                        }}
                      >
                        {service.quickInfo.typicalProject}
                      </div>
                    </div>
                  )}
                  {service.quickInfo.keyHighlight && (
                    <div>
                      <div
                        style={{
                          fontSize: "0.75rem",
                          textTransform: "uppercase",
                          letterSpacing: "0.1em",
                          color: "rgba(26,26,26,0.6)",
                          fontFamily: "var(--font-headline), sans-serif",
                          fontWeight: 600,
                          marginBottom: "0.25rem",
                        }}
                      >
                        Key Highlight
                      </div>
                      <div
                        style={{
                          fontFamily: "var(--font-poppins), sans-serif",
                          fontWeight: 500,
                          color: "#C41E3A",
                          fontSize: "0.9rem",
                          lineHeight: "1.4",
                        }}
                      >
                        {service.quickInfo.keyHighlight}
                      </div>
                    </div>
                  )}
                </div>
              )}
              {!service.quickInfo && (
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  <div>
                    <div
                      style={{
                        fontSize: "0.75rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                        color: "rgba(26,26,26,0.6)",
                        fontFamily: "var(--font-headline), sans-serif",
                        fontWeight: 600,
                        marginBottom: "0.25rem",
                      }}
                    >
                      Timeline
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-poppins), sans-serif",
                        fontWeight: 600,
                        color: "#1a1a1a",
                        fontSize: "0.95rem",
                      }}
                    >
                      Custom
                    </div>
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: "0.75rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                        color: "rgba(26,26,26,0.6)",
                        fontFamily: "var(--font-headline), sans-serif",
                        fontWeight: 600,
                        marginBottom: "0.25rem",
                      }}
                    >
                      Pricing
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-poppins), sans-serif",
                        fontWeight: 500,
                        color: "rgba(26,26,26,0.85)",
                        fontSize: "0.9rem",
                      }}
                    >
                      Project-based
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Divider */}
            <div style={{ 
              height: "1px", 
              background: "rgba(196, 30, 58, 0.15)", 
              marginBottom: "1.5rem" 
            }} />

            {/* Subservices Section */}
            <div style={{ marginBottom: "1.5rem" }}>
              <div
                style={{
                  fontSize: "0.75rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.15em",
                  color: "#C41E3A",
                  fontFamily: "var(--font-headline), sans-serif",
                  fontWeight: 700,
                  marginBottom: "1rem",
                }}
              >
                Subservices
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
                {service.subcategories.slice(0, 5).map((sub) => {
                  const subcategorySlug = createSubcategorySlug(sub);
                  return (
                    <InteractiveLink
                      key={sub}
                      href={`/services/${service.id}/${subcategorySlug}`}
                      style={{
                        fontSize: "0.875rem",
                        color: "rgba(26,26,26,0.85)",
                        fontFamily: "var(--font-poppins), sans-serif",
                        paddingLeft: "1rem",
                        position: "relative",
                        lineHeight: "1.5",
                        textDecoration: "none",
                      }}
                    >
                      <span
                        style={{
                          position: "absolute",
                          left: 0,
                          top: "0.55em",
                          width: "5px",
                          height: "5px",
                          borderRadius: "50%",
                          background: "#C41E3A",
                        }}
                      />
                      {sub}
                    </InteractiveLink>
                  );
                })}
                {service.subcategories.length > 5 && (
                  <div style={{ 
                    fontSize: "0.8rem", 
                    color: "rgba(26,26,26,0.6)", 
                    fontFamily: "var(--font-poppins), sans-serif", 
                    marginTop: "0.25rem",
                    paddingLeft: "1rem",
                  }}>
                    +{service.subcategories.length - 5} more
                  </div>
                )}
              </div>
            </div>

            {/* Divider */}
            <div style={{ 
              height: "1px", 
              background: "rgba(196, 30, 58, 0.15)", 
              marginBottom: "1.5rem" 
            }} />

            {/* CTA Button Section */}
            <div>
              <ProjectCTAButton href="/#contact">Get a Quote</ProjectCTAButton>
            </div>
          </aside>
        </section>

        {/* Service Overview */}
        <section className={pageStyles.card} style={{ padding: "2.5rem", marginBottom: "2rem" }}>
          <h2
            style={{
              fontSize: "clamp(1.75rem, 3vw, 2.25rem)",
              fontFamily: "var(--font-headline), sans-serif",
              fontWeight: 700,
              marginTop: 0,
              marginBottom: "1.5rem",
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              color: "#1a1a1a",
            }}
          >
            <span
              style={{
                width: "4px",
                height: "2rem",
                background: "linear-gradient(135deg, #C41E3A, #6366f1, #d946ef)",
                borderRadius: "2px",
              }}
            />
            Service Overview
          </h2>
          <div
            style={{
              fontSize: "clamp(1rem, 1.3vw, 1.15rem)",
              lineHeight: "1.8",
              color: "rgba(26,26,26,0.85)",
              fontFamily: "var(--font-poppins), sans-serif",
              whiteSpace: "pre-line",
            }}
          >
            {service.description}
          </div>
          {service.id === "intellectual-property" && (
            <div
              style={{
                marginTop: "2rem",
                padding: "1.5rem 1.75rem",
                borderRadius: "1rem",
                background:
                  "linear-gradient(135deg, rgba(59,130,246,0.06), rgba(14,165,233,0.06))",
                border: "1px solid rgba(59,130,246,0.18)",
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              <p
                style={{
                  fontSize: "0.78rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.16em",
                  color: "rgba(37,99,235,0.9)",
                  fontFamily: "var(--font-headline), sans-serif",
                  fontWeight: 700,
                  margin: 0,
                }}
              >
                Featured In-House IP
              </p>
              <h3
                style={{
                  fontSize: "1.05rem",
                  fontFamily: "var(--font-headline), sans-serif",
                  fontWeight: 700,
                  margin: 0,
                  color: "#0f172a",
                }}
              >
                LittleChamps Rhymes – Original Kids IP
              </h3>
              <p
                style={{
                  fontSize: "0.9rem",
                  color: "rgba(15,23,42,0.8)",
                  fontFamily: "var(--font-poppins), sans-serif",
                  lineHeight: 1.7,
                  margin: 0,
                }}
              >
                An ongoing nursery rhymes and kids content channel fully produced by
                Supreme Animation Studio — from character development and visual
                style to animation, music, and publishing strategy. It serves as a
                living example of how we think about building and sustaining
                long-term IP.
              </p>
              <div style={{ marginTop: "0.75rem" }}>
                <a
                  href="https://www.youtube.com/@LittleChampsrhymes"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.4rem",
                    padding: "0.6rem 1.1rem",
                    borderRadius: "999px",
                    background:
                      "linear-gradient(135deg, #ef4444 0%, #f97316 50%, #facc15 100%)",
                    color: "#ffffff",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    fontFamily: "var(--font-poppins), sans-serif",
                    textDecoration: "none",
                    boxShadow: "0 6px 18px rgba(239,68,68,0.45)",
                  }}
                >
                  View LittleChamps Rhymes on YouTube
                  <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>
          )}
        </section>

        {/* Key Benefits */}
        <section className={pageStyles.card} style={{ padding: "2.5rem", marginBottom: "2rem" }}>
          <h2
            style={{
              fontSize: "clamp(1.75rem, 3vw, 2.25rem)",
              fontFamily: "var(--font-headline), sans-serif",
              fontWeight: 700,
              marginTop: 0,
              marginBottom: "1.5rem",
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              color: "#1a1a1a",
            }}
          >
            <span
              style={{
                width: "4px",
                height: "2rem",
                background: "linear-gradient(135deg, #C41E3A, #6366f1, #d946ef)",
                borderRadius: "2px",
              }}
            />
            Key Benefits
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1rem" }}>
            {service.keyBenefits.map((benefit, idx) => {
              const gradients = [
                "linear-gradient(135deg, rgba(196, 30, 58, 0.1), rgba(99, 102, 241, 0.1))",
                "linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(217, 70, 239, 0.1))",
                "linear-gradient(135deg, rgba(217, 70, 239, 0.1), rgba(196, 30, 58, 0.1))",
                "linear-gradient(135deg, rgba(6, 182, 212, 0.1), rgba(99, 102, 241, 0.1))",
              ];
              return (
                <InteractiveCard
                  key={idx}
                  borderColor="rgba(196, 30, 58, 0.2)"
                  style={{
                    padding: "1.25rem",
                    borderRadius: "0.75rem",
                    border: "1px solid rgba(196, 30, 58, 0.2)",
                    background: gradients[idx % gradients.length],
                    boxShadow: "0 4px 16px rgba(196, 30, 58, 0.08)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "0.75rem",
                    }}
                  >
                    <div
                      style={{
                        width: "28px",
                        height: "28px",
                        borderRadius: "0.5rem",
                        background: "linear-gradient(135deg, #C41E3A, #6366f1)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        marginTop: "0.1rem",
                        boxShadow: "0 2px 8px rgba(196, 30, 58, 0.3)",
                      }}
                    >
                      <span style={{ color: "#ffffff", fontSize: "0.85rem", fontWeight: 700 }}>✓</span>
                    </div>
                    <p
                      style={{
                        fontSize: "0.95rem",
                        color: "rgba(26,26,26,0.9)",
                        fontFamily: "var(--font-poppins), sans-serif",
                        lineHeight: "1.6",
                        margin: 0,
                        fontWeight: 500,
                      }}
                    >
                      {benefit}
                    </p>
                  </div>
                </InteractiveCard>
              );
            })}
          </div>
        </section>

        {/* What We Deliver */}
        <section className={pageStyles.card} style={{ padding: "2.5rem", marginBottom: "2rem" }}>
          <h2
            style={{
              fontSize: "clamp(1.75rem, 3vw, 2.25rem)",
              fontFamily: "var(--font-headline), sans-serif",
              fontWeight: 700,
              marginTop: 0,
              marginBottom: "1.5rem",
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              color: "#1a1a1a",
            }}
          >
            <span
              style={{
                width: "4px",
                height: "2rem",
                background: "linear-gradient(135deg, #C41E3A, #6366f1, #d946ef)",
                borderRadius: "2px",
              }}
            />
            What We Deliver
          </h2>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "0.75rem",
            }}
          >
            {service.deliverables.map((deliverable, idx) => (
              <InteractiveDeliverable key={idx} deliverable={deliverable} index={idx} />
            ))}
          </ul>
        </section>

        {/* Industries & Use Cases */}
        <section className={pageStyles.twoCol} style={{ marginBottom: "2rem", gap: "1.5rem" }}>
          <div className={pageStyles.card} style={{ padding: "2.5rem" }}>
            <h2
              style={{
                fontSize: "clamp(1.5rem, 2.5vw, 1.75rem)",
                fontFamily: "var(--font-headline), sans-serif",
                fontWeight: 700,
                marginTop: 0,
                marginBottom: "1.25rem",
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
              }}
            >
              <span
                style={{
                  width: "4px",
                  height: "1.5rem",
                  background: "linear-gradient(135deg, #C41E3A, #991B1B)",
                  borderRadius: "2px",
                }}
              />
              Industries We Serve
            </h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {service.industries.map((industry, idx) => (
                <span
                  key={idx}
                  style={{
                    display: "inline-block",
                    padding: "0.5rem 1rem",
                    borderRadius: "0.5rem",
                    background: "rgba(196, 30, 58, 0.12)",
                    border: "1px solid rgba(196, 30, 58, 0.3)",
                    fontSize: "0.875rem",
                    color: "#C41E3A",
                    fontFamily: "var(--font-poppins), sans-serif",
                    fontWeight: 600,
                  }}
                >
                  {industry}
                </span>
              ))}
            </div>
          </div>

          <div className={pageStyles.card} style={{ padding: "2.5rem" }}>
            <h2
              style={{
                fontSize: "clamp(1.5rem, 2.5vw, 1.75rem)",
                fontFamily: "var(--font-headline), sans-serif",
                fontWeight: 700,
                marginTop: 0,
                marginBottom: "1.25rem",
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
              }}
            >
              <span
                style={{
                  width: "4px",
                  height: "1.5rem",
                  background: "linear-gradient(135deg, #C41E3A, #991B1B)",
                  borderRadius: "2px",
                }}
              />
              Use Cases
            </h2>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
              }}
            >
              {service.useCases.map((useCase, idx) => {
                const colors = ["#C41E3A", "#6366f1", "#d946ef", "#06b6d4"];
                return (
                  <li
                    key={idx}
                    style={{
                      fontSize: "0.95rem",
                      color: "rgba(26,26,26,0.9)",
                      fontFamily: "var(--font-poppins), sans-serif",
                      paddingLeft: "1.5rem",
                      position: "relative",
                      lineHeight: "1.6",
                      fontWeight: 500,
                    }}
                  >
                    <span
                      style={{
                        position: "absolute",
                        left: 0,
                        top: "0.5em",
                        width: "8px",
                        height: "8px",
                        borderRadius: "50%",
                        background: `linear-gradient(135deg, ${colors[idx % colors.length]}, ${colors[(idx + 1) % colors.length]})`,
                        boxShadow: `0 2px 6px ${colors[idx % colors.length]}40`,
                      }}
                    />
                    {useCase}
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        {/* Our Process */}
        <section className={pageStyles.card} style={{ padding: "2.5rem", marginBottom: "2rem" }}>
          <h2
            style={{
              fontSize: "clamp(1.75rem, 3vw, 2.25rem)",
              fontFamily: "var(--font-headline), sans-serif",
              fontWeight: 700,
              marginTop: 0,
              marginBottom: "2rem",
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              color: "#1a1a1a",
            }}
          >
            <span
              style={{
                width: "4px",
                height: "2rem",
                background: "linear-gradient(135deg, #C41E3A, #6366f1, #d946ef)",
                borderRadius: "2px",
              }}
            />
            Our Process
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
            {service.processSteps.map((step, idx) => {
              const gradients = [
                "linear-gradient(135deg, #C41E3A, #6366f1)",
                "linear-gradient(135deg, #6366f1, #d946ef)",
                "linear-gradient(135deg, #d946ef, #06b6d4)",
                "linear-gradient(135deg, #06b6d4, #10b981)",
                "linear-gradient(135deg, #10b981, #C41E3A)",
                "linear-gradient(135deg, #C41E3A, #d946ef)",
              ];
              const bgGradients = [
                "linear-gradient(135deg, rgba(196, 30, 58, 0.08), rgba(99, 102, 241, 0.08))",
                "linear-gradient(135deg, rgba(99, 102, 241, 0.08), rgba(217, 70, 239, 0.08))",
                "linear-gradient(135deg, rgba(217, 70, 239, 0.08), rgba(6, 182, 212, 0.08))",
                "linear-gradient(135deg, rgba(6, 182, 212, 0.08), rgba(16, 185, 129, 0.08))",
                "linear-gradient(135deg, rgba(16, 185, 129, 0.08), rgba(196, 30, 58, 0.08))",
                "linear-gradient(135deg, rgba(196, 30, 58, 0.08), rgba(217, 70, 239, 0.08))",
              ];
              return (
                <InteractiveCard
                  key={idx}
                  borderColor={gradients[idx % gradients.length].includes("#C41E3A") ? "rgba(196, 30, 58, 0.2)" : "rgba(99, 102, 241, 0.2)"}
                  hoverTransform="translateY(-4px)"
                  style={{
                    padding: "1.5rem",
                    borderRadius: "1rem",
                    border: `1px solid ${gradients[idx % gradients.length].includes("#C41E3A") ? "rgba(196, 30, 58, 0.2)" : "rgba(99, 102, 241, 0.2)"}`,
                    background: bgGradients[idx % bgGradients.length],
                    position: "relative",
                    boxShadow: "0 4px 16px rgba(196, 30, 58, 0.08)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                      marginBottom: "0.75rem",
                    }}
                  >
                    <div
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "0.5rem",
                        background: gradients[idx % gradients.length],
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#ffffff",
                        fontSize: "1.1rem",
                        fontWeight: 700,
                        fontFamily: "var(--font-headline), sans-serif",
                        flexShrink: 0,
                        boxShadow: `0 4px 12px ${gradients[idx % gradients.length].includes("#C41E3A") ? "rgba(196, 30, 58, 0.4)" : "rgba(99, 102, 241, 0.4)"}`,
                      }}
                    >
                      {idx + 1}
                    </div>
                    <h3
                      style={{
                        fontSize: "1.1rem",
                        fontFamily: "var(--font-headline), sans-serif",
                        fontWeight: 700,
                        color: "#1a1a1a",
                        margin: 0,
                      }}
                    >
                      {step.title}
                    </h3>
                  </div>
                  <p
                    style={{
                      fontSize: "0.9rem",
                      color: "rgba(26,26,26,0.8)",
                      fontFamily: "var(--font-poppins), sans-serif",
                      lineHeight: "1.6",
                      margin: 0,
                      paddingLeft: "calc(40px + 0.75rem)",
                    }}
                  >
                    {step.description}
                  </p>
                </InteractiveCard>
              );
            })}
          </div>
        </section>

        {/* CTA Section */}
        <section
          style={{
            padding: "3rem 2rem",
            borderRadius: "1.5rem",
            background: "linear-gradient(135deg, #C41E3A 0%, #6366f1 50%, #d946ef 100%)",
            border: "none",
            textAlign: "center",
            marginBottom: "2rem",
            boxShadow: "0 12px 40px rgba(196, 30, 58, 0.25)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "-50%",
              right: "-20%",
              width: "300px",
              height: "300px",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.1)",
              filter: "blur(60px)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "-30%",
              left: "-10%",
              width: "250px",
              height: "250px",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.08)",
              filter: "blur(50px)",
            }}
          />
          <div style={{ position: "relative", zIndex: 1 }}>
            <h2
              style={{
                fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                fontFamily: "var(--font-headline), sans-serif",
                fontWeight: 700,
                marginBottom: "1rem",
                color: "#ffffff",
              }}
            >
              Ready to Get Started?
            </h2>
            <p
              style={{
                fontSize: "clamp(1rem, 1.3vw, 1.15rem)",
                color: "rgba(255,255,255,0.95)",
                fontFamily: "var(--font-poppins), sans-serif",
                marginBottom: "2rem",
                maxWidth: "600px",
                margin: "0 auto 2rem auto",
                fontWeight: 500,
              }}
            >
              Let's discuss how we can bring your vision to life with our {service.name.toLowerCase()} services.
            </p>
            <div style={{ 
              display: "flex", 
              gap: "1rem", 
              justifyContent: "center", 
              alignItems: "center",
              flexWrap: "wrap",
              maxWidth: "700px",
              margin: "0 auto",
            }}>
              <ProjectCTAButton href="/#contact">Get a Quote</ProjectCTAButton>
              <InteractiveCTAButton href="/#portfolio">
                View Portfolio
              </InteractiveCTAButton>
            </div>
          </div>
        </section>
      </div>
      <MinimalFooter />
    </main>
    </>
  );
}

