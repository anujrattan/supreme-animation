import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectBySlug, projects, type ProjectMedia } from "@/content/projects";
import pageStyles from "../projectPage.module.css";
import ProjectCTAButton from "@/components/ProjectCTAButton";

function Media({ media }: { media: ProjectMedia }) {
  if (media.kind === "image") {
    return (
      <Image
        src={media.src}
        alt={media.alt}
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
    );
  }

  return (
    <video
      controls
      playsInline
      preload="metadata"
      poster={media.poster}
      style={{
        width: "100%",
        borderRadius: "1.25rem",
        backgroundColor: "rgba(255,255,255,0.06)",
      }}
    >
      <source src={media.src} type="video/mp4" />
    </video>
  );
}

function PlaceholderHero() {
  return (
    <div
      style={{
        width: "100%",
        aspectRatio: "16 / 9",
        borderRadius: "1.25rem",
        border: "1px solid rgba(255,255,255,0.12)",
        background:
          "radial-gradient(circle at 30% 30%, rgba(196, 30, 58, 0.35), transparent 55%), radial-gradient(circle at 70% 60%, rgba(217, 70, 239, 0.20), transparent 60%), rgba(255,255,255,0.03)",
      }}
    />
  );
}

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  return {
    title: `${project.title} | Supreme Animation`,
    description: project.summary,
    openGraph: {
      title: `${project.title} | Supreme Animation`,
      description: project.summary,
    },
  };
}

export default async function PortfolioProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const currentIndex = projects.findIndex((p) => p.slug === project.slug);
  const nextProject = currentIndex >= 0 ? projects[(currentIndex + 1) % projects.length] : undefined;
  const caseStudy = project.caseStudy ?? {
    challenge: "Add a short, NDA-safe description of the problem you were solving for this client.",
    approach: [
      "Step 1 (replace): Discovery + direction",
      "Step 2 (replace): Storyboard + design",
      "Step 3 (replace): Animation + sound",
      "Step 4 (replace): Delivery + cutdowns",
    ],
    deliverables: ["Deliverable A (replace)", "Deliverable B (replace)", "Deliverable C (replace)"],
    results: [
      { label: "Metric 1", value: "— (replace)" },
      { label: "Metric 2", value: "— (replace)" },
      { label: "Metric 3", value: "— (replace)" },
    ],
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#09090f",
        color: "#ffffff",
        padding: "clamp(2.5rem, 5vw, 4rem) clamp(1rem, 3vw, 2rem)",
      }}
      className={pageStyles.page}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }} className={pageStyles.container}>
        <div style={{ marginBottom: "1.25rem" }}>
          <Link
            href="/#portfolio"
            style={{
              color: "rgba(255,255,255,0.7)",
              textDecoration: "none",
              fontFamily: "var(--font-poppins), sans-serif",
              fontWeight: 500,
            }}
          >
            ← Back to portfolio
          </Link>
        </div>

        <header style={{ marginBottom: "1.25rem" }}>
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
            {project.clientLabel} • {project.year}
          </p>
          <h1
            style={{
              fontSize: "clamp(2.25rem, 4.5vw, 3.5rem)",
              fontFamily: "var(--font-headline), sans-serif",
              fontWeight: 900,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              marginBottom: "0.75rem",
            }}
          >
            {project.title}
          </h1>
          <p
            style={{
              color: "rgba(255,255,255,0.75)",
              fontFamily: "var(--font-poppins), sans-serif",
              fontWeight: 400,
              fontSize: "clamp(1rem, 1.4vw, 1.15rem)",
              lineHeight: 1.75,
              maxWidth: "800px",
            }}
          >
            {project.summary}
          </p>
        </header>

        {/* Hero + sidebar */}
        <section className={pageStyles.heroGrid} style={{ marginBottom: "3rem" }}>
          <div style={{ position: "relative" }}>
            {project.thumb ? <Media media={project.thumb} /> : <PlaceholderHero />}
          </div>

          <aside className={`${pageStyles.card} ${pageStyles.cardPad}`} style={{ position: "sticky", top: "calc(var(--header-height) + 2rem)" }}>
            <div style={{ marginBottom: "1rem" }}>
              <div
                style={{
                  fontSize: "0.8rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.18em",
                  color: "rgba(255,255,255,0.55)",
                  fontFamily: "var(--font-headline), sans-serif",
                  fontWeight: 700,
                  marginBottom: "0.35rem",
                }}
              >
                Industry
              </div>
              <div
                style={{
                  fontFamily: "var(--font-poppins), sans-serif",
                  fontWeight: 600,
                  color: "rgba(255,255,255,0.9)",
                }}
              >
                {project.industry}
              </div>
            </div>

            <div style={{ marginBottom: "1.25rem" }}>
              <div
                style={{
                  fontSize: "0.8rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.18em",
                  color: "rgba(255,255,255,0.55)",
                  fontFamily: "var(--font-headline), sans-serif",
                  fontWeight: 700,
                  marginBottom: "0.35rem",
                }}
              >
                Services
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {project.services.map((s) => (
                  <span
                    key={s}
                    style={{
                      padding: "0.4rem 0.65rem",
                      borderRadius: "999px",
                      border: "1px solid rgba(196,30,58,0.25)",
                      background: "rgba(196,30,58,0.10)",
                      color: "rgba(255,255,255,0.9)",
                      fontFamily: "var(--font-poppins), sans-serif",
                      fontSize: "0.85rem",
                      fontWeight: 500,
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <Link
              href={project.ctaHref ?? "/#contact"}
              style={{
                display: "inline-flex",
                justifyContent: "center",
                width: "100%",
                padding: "0.95rem 1rem",
                borderRadius: "999px",
                background: "linear-gradient(135deg, #C41E3A, #991B1B)",
                color: "#ffffff",
                textDecoration: "none",
                fontFamily: "var(--font-headline), sans-serif",
                fontWeight: 800,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                boxShadow:
                  "0 10px 30px rgba(196, 30, 58, 0.35), 0 0 40px rgba(196, 30, 58, 0.15)",
              }}
            >
              {project.ctaLabel ?? "Start a project"}
            </Link>
          </aside>
        </section>

        {/* Key Highlights */}
        {project.highlights && project.highlights.length > 0 && (
          <section className={`${pageStyles.card} ${pageStyles.cardPad}`} style={{ marginBottom: "2rem" }}>
            <h2
              style={{
                fontFamily: "var(--font-headline), sans-serif",
                fontWeight: 900,
                fontSize: "1.5rem",
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
                  height: "2rem",
                  background: "linear-gradient(135deg, #C41E3A, #991B1B)",
                  borderRadius: "2px",
                }}
              />
              Key Highlights
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "1rem",
              }}
            >
              {project.highlights.map((highlight, idx) => (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    gap: "0.75rem",
                    alignItems: "flex-start",
                  }}
                >
                  <div
                    style={{
                      flexShrink: 0,
                      width: "24px",
                      height: "24px",
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #C41E3A, #991B1B)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginTop: "0.15rem",
                    }}
                  >
                    <span
                      style={{
                        color: "#ffffff",
                        fontSize: "0.75rem",
                        fontWeight: 900,
                        fontFamily: "var(--font-headline), sans-serif",
                      }}
                    >
                      ✓
                    </span>
                  </div>
                  <p
                    style={{
                      color: "rgba(255,255,255,0.85)",
                      fontFamily: "var(--font-poppins), sans-serif",
                      lineHeight: 1.7,
                      margin: 0,
                      fontSize: "0.95rem",
                    }}
                  >
                    {highlight}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Case study blocks (placeholder-friendly) */}
        <section className={pageStyles.twoCol} style={{ marginBottom: "2rem" }}>
          <div className={`${pageStyles.card} ${pageStyles.cardPad}`}>
            <h2
              style={{
                fontFamily: "var(--font-headline), sans-serif",
                fontWeight: 900,
                fontSize: "1.35rem",
                marginBottom: "0.5rem",
              }}
            >
              The challenge
            </h2>
            <p
              style={{
                color: "rgba(255,255,255,0.78)",
                fontFamily: "var(--font-poppins), sans-serif",
                lineHeight: 1.75,
                margin: 0,
              }}
            >
              {caseStudy.challenge}
            </p>
          </div>

          <div className={`${pageStyles.card} ${pageStyles.cardPad}`}>
            <h2
              style={{
                fontFamily: "var(--font-headline), sans-serif",
                fontWeight: 900,
                fontSize: "1.35rem",
                marginBottom: "0.5rem",
              }}
            >
              What we delivered
            </h2>
            <p
              style={{
                color: "rgba(255,255,255,0.85)",
                fontFamily: "var(--font-poppins), sans-serif",
                marginTop: 0,
                marginBottom: "0.75rem",
              }}
            >
              {project.deliverableLabel}
            </p>
            <ul
              style={{
                margin: 0,
                paddingLeft: "1.25rem",
                color: "rgba(255,255,255,0.78)",
                fontFamily: "var(--font-poppins), sans-serif",
                lineHeight: 1.7,
              }}
            >
              {caseStudy.deliverables.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className={`${pageStyles.card} ${pageStyles.cardPad}`} style={{ marginBottom: "2rem" }}>
          <h2
            style={{
              fontFamily: "var(--font-headline), sans-serif",
              fontWeight: 900,
              fontSize: "1.5rem",
              marginTop: 0,
              marginBottom: "1.5rem",
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
            }}
          >
            <span
              style={{
                width: "4px",
                height: "2rem",
                background: "linear-gradient(135deg, #C41E3A, #991B1B)",
                borderRadius: "2px",
              }}
            />
            Our Approach
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "0.75rem",
            }}
          >
            {caseStudy.approach.map((step, idx) => (
              <div
                key={step}
                style={{
                  border: "1px solid rgba(255,255,255,0.10)",
                  background: "rgba(255,255,255,0.02)",
                  borderRadius: "1rem",
                  padding: "1rem",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-headline), sans-serif",
                    fontWeight: 900,
                    color: "rgba(255,255,255,0.35)",
                    letterSpacing: "-0.02em",
                    fontSize: "1.5rem",
                    lineHeight: 1,
                    marginBottom: "0.5rem",
                  }}
                >
                  {String(idx + 1).padStart(2, "0")}
                </div>
                <div style={{ fontFamily: "var(--font-poppins), sans-serif", color: "rgba(255,255,255,0.82)", lineHeight: 1.6 }}>
                  {step}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className={`${pageStyles.card} ${pageStyles.cardPad}`} style={{ marginBottom: "2rem" }}>
          <h2
            style={{
              fontFamily: "var(--font-headline), sans-serif",
              fontWeight: 900,
              fontSize: "1.5rem",
              marginTop: 0,
              marginBottom: "1.5rem",
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
            }}
          >
            <span
              style={{
                width: "4px",
                height: "2rem",
                background: "linear-gradient(135deg, #C41E3A, #991B1B)",
                borderRadius: "2px",
              }}
            />
            Results
          </h2>
          <div className={pageStyles.metricsGrid}>
            {caseStudy.results.map((r) => (
              <div key={r.label} className={pageStyles.metric}>
                <div
                  style={{
                    fontFamily: "var(--font-headline), sans-serif",
                    fontWeight: 900,
                    fontSize: "1.5rem",
                    letterSpacing: "-0.02em",
                    marginBottom: "0.15rem",
                  }}
                >
                  {r.value}
                </div>
                <div style={{ fontFamily: "var(--font-poppins), sans-serif", color: "rgba(255,255,255,0.65)" }}>
                  {r.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: "3rem" }}>
          <h2
            style={{
              fontFamily: "var(--font-headline), sans-serif",
              fontWeight: 900,
              fontSize: "1.5rem",
              marginBottom: "1.5rem",
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
            }}
          >
            <span
              style={{
                width: "4px",
                height: "2rem",
                background: "linear-gradient(135deg, #C41E3A, #991B1B)",
                borderRadius: "2px",
              }}
            />
            Project Gallery
          </h2>

          {project.gallery && project.gallery.length > 0 ? (
            <div className={pageStyles.galleryGrid}>
              {project.gallery.map((m, idx) => (
                <div key={`${project.slug}-g-${idx}`}>
                  <Media media={m} />
                </div>
              ))}
            </div>
          ) : (
            <div className={pageStyles.galleryGrid}>
              {[0, 1, 2].map((i) => (
                <div
                  key={`ph-${i}`}
                  style={{
                    aspectRatio: "16 / 10",
                    borderRadius: "1.25rem",
                    border: "1px dashed rgba(255,255,255,0.16)",
                    background: "rgba(255,255,255,0.02)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "1.25rem",
                    textAlign: "center",
                    color: "rgba(255,255,255,0.55)",
                    fontFamily: "var(--font-poppins), sans-serif",
                    lineHeight: 1.6,
                  }}
                >
                  Add gallery media here (frames, renders, before/after, BTS).
                </div>
              ))}
            </div>
          )}
        </section>

        {/* CTA Section */}
        <section
          style={{
            marginBottom: "2rem",
            paddingTop: "2rem",
            borderTop: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <div className={pageStyles.navRow}>
            <ProjectCTAButton href="/#contact">Start Your Project</ProjectCTAButton>

            {nextProject && (
              <Link href={`/portfolio/${nextProject.slug}`} className={pageStyles.nextCard}>
                <div
                  style={{
                    fontFamily: "var(--font-headline), sans-serif",
                    fontWeight: 800,
                    color: "rgba(255,255,255,0.55)",
                    textTransform: "uppercase",
                    letterSpacing: "0.2em",
                    fontSize: "0.75rem",
                    marginBottom: "0.4rem",
                  }}
                >
                  Next project
                </div>
                <div style={{ fontFamily: "var(--font-headline), sans-serif", fontWeight: 900, fontSize: "1.25rem" }}>
                  {nextProject.title}
                </div>
                <div style={{ fontFamily: "var(--font-poppins), sans-serif", color: "rgba(255,255,255,0.7)", marginTop: "0.25rem" }}>
                  {nextProject.deliverableLabel}
                </div>
              </Link>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}


