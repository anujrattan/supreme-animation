import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getServiceCategoryById, getAllServiceCategories } from "@/content/services";
import { getSubcategoryById, createSubcategorySlug, getAllSubcategories, generateSubcategoryFromCategory } from "@/content/subcategories";
import pageStyles from "../../servicePage.module.css";
import ProjectCTAButton from "@/components/ProjectCTAButton";
import InteractiveLink from "@/components/InteractiveLink";
import BreadcrumbLink from "@/components/BreadcrumbLink";
import InteractiveCard from "@/components/InteractiveCard";
import InteractiveIndustryBadge from "@/components/InteractiveIndustryBadge";
import InteractiveCTAButton from "@/components/InteractiveCTAButton";
import InteractiveDeliverable from "@/components/InteractiveDeliverable";
import Header from "@/components/Header";
import MinimalFooter from "@/components/MinimalFooter";
import SubcategoryHero from "@/components/SubcategoryHero";
import ProcessStepCard from "@/components/ProcessStepCard";
import FeatureCard from "@/components/FeatureCard";
import PortfolioCategoryTiles from "@/components/PortfolioCategoryTiles";
import VideoGallery from "@/components/VideoGallery";
import ImageGallery from "@/components/ImageGallery";

export function generateStaticParams() {
  const allCategories = getAllServiceCategories();
  const params: { category: string; subcategory: string }[] = [];
  
  // Generate params for all subcategories that have detailed data
  const allSubcategories = getAllSubcategories();
  allSubcategories.forEach((sub) => {
    params.push({
      category: sub.categoryId,
      subcategory: sub.id,
    });
  });
  
  // Generate params for all subcategories from category data (fallback)
  allCategories.forEach((category) => {
    category.subcategories.forEach((subcategoryName) => {
      const subcategorySlug = createSubcategorySlug(subcategoryName);
      // Only add if not already in params (avoid duplicates)
      if (!params.some(p => p.category === category.id && p.subcategory === subcategorySlug)) {
        params.push({
          category: category.id,
          subcategory: subcategorySlug,
        });
      }
    });
  });
  
  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ category: string; subcategory: string }> }): Promise<Metadata> {
  const { category, subcategory } = await params;
  const categoryData = getServiceCategoryById(category);
  if (!categoryData) return {};
  
  let subcategoryData = getSubcategoryById(category, subcategory);
  if (!subcategoryData) {
    const subcategoryName = categoryData.subcategories.find(
      sub => createSubcategorySlug(sub) === subcategory
    );
    if (!subcategoryName) return {};
    subcategoryData = generateSubcategoryFromCategory(categoryData, subcategoryName);
  }

  const title = subcategoryData.seoMeta?.title || `${subcategoryData.name} | Supreme Animation Studio`;
  const description = subcategoryData.seoMeta?.description || subcategoryData.description;

  return {
    title,
    description,
    keywords: subcategoryData.seoMeta?.keywords || [],
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

export default async function SubcategoryPage({ params }: { params: Promise<{ category: string; subcategory: string }> }) {
  const { category, subcategory } = await params;
  const categoryData = getServiceCategoryById(category);
  
  if (!categoryData) notFound();
  
  // Try to find the subcategory in our data
  let subcategoryData = getSubcategoryById(category, subcategory);
  
  // If not found, check if it's a valid subcategory name from the category
  if (!subcategoryData) {
    const subcategoryName = categoryData.subcategories.find(
      sub => createSubcategorySlug(sub) === subcategory
    );
    
    if (!subcategoryName) notFound();
    
    // Generate subcategory data from category (fallback)
    subcategoryData = generateSubcategoryFromCategory(categoryData, subcategoryName);
  }

  // Generate structured data for SEO
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://supremeanimation.com';
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": subcategoryData.name,
    "name": subcategoryData.name,
    "description": subcategoryData.description,
    "provider": {
      "@type": "Organization",
      "name": "Supreme Animation Studio",
      "url": baseUrl,
    },
    "areaServed": "Worldwide",
    "availableChannel": {
      "@type": "ServiceChannel",
      "serviceUrl": `${baseUrl}/services/${category}/${subcategory}`,
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
        "name": categoryData.name,
        "item": `${baseUrl}/services/${category}`
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": subcategoryData.name,
        "item": `${baseUrl}/services/${category}/${subcategory}`
      }
    ]
  };

  return (
    <>
      <Header />
      <main
        style={{
          minHeight: "100vh",
          background: "linear-gradient(180deg, #ffffff 0%, #f8f9fa 50%, #f0f4ff 100%)",
          color: "#1a1a1a",
          padding: "clamp(2rem, 4vw, 3rem) clamp(1rem, 3vw, 2rem)",
          paddingTop: `calc(var(--header-height) + clamp(2rem, 4vw, 3rem))`,
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
        <div style={{ maxWidth: "1200px", margin: "0 auto" }} className={pageStyles.container}>
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
                <BreadcrumbLink href={`/services/${category}`}>
                  {categoryData.name}
                </BreadcrumbLink>
              </li>
              <li style={{ color: "rgba(26,26,26,0.4)", fontSize: "0.9rem" }}>›</li>
              <li>
                <BreadcrumbLink href={`/services/${category}/${subcategory}`} isActive={true}>
                  {subcategoryData.name}
                </BreadcrumbLink>
              </li>
            </ol>
          </nav>

          {/* Hero Section - Cleaner, More Spacious */}
          <div
            style={{
              marginBottom: "5rem",
              paddingBottom: "3rem",
              borderBottom: "1px solid rgba(196, 30, 58, 0.1)",
            }}
          >
            <SubcategoryHero subcategory={subcategoryData} category={categoryData} compact={true} />
          </div>

          {/* Portfolio Images - For flat image galleries (no categories) */}
          {subcategoryData.portfolioImages && subcategoryData.portfolioImages.length > 0 && (
            <ImageGallery
              images={subcategoryData.portfolioImages}
              title="Portfolio Showcase"
              subtitle="Explore our product visualization work. Click any image to view in full screen."
            />
          )}

          {/* Portfolio Videos - For animation showcases */}
          {subcategoryData.portfolioVideos && subcategoryData.portfolioVideos.length > 0 && (
            <VideoGallery
              videos={subcategoryData.portfolioVideos}
              title="Animation Showcase"
              subtitle="Explore our recent animation projects. Hover to preview, click to watch in full screen."
            />
          )}

          {/* Portfolio Categories - For image-based portfolios with categories */}
          {subcategoryData.portfolioCategories && subcategoryData.portfolioCategories.length > 0 && (
            <PortfolioCategoryTiles
              categories={subcategoryData.portfolioCategories.map(cat => ({
                id: cat.id,
                name: cat.name,
                description: cat.description,
                thumbnail: cat.thumbnail,
                imageCount: cat.images.length,
                images: cat.images.map(img => ({
                  src: img.src,
                  alt: img.alt,
                  type: img.type,
                  thumbnail: img.thumbnail,
                  title: img.title,
                  description: img.description,
                })),
              }))}
              title="Our Work"
              subtitle="Explore our character design portfolio across different categories. Click to view full galleries."
            />
          )}

          {/* YouTube Embed Showcase */}
          {subcategoryData.youtubeEmbed && (
            <section style={{ marginBottom: "5rem" }}>
              <div style={{ marginBottom: "3rem" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem", flexWrap: "wrap", gap: "1rem" }}>
                  <h2
                    style={{
                      fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                      fontFamily: "var(--font-headline), sans-serif",
                      fontWeight: 700,
                      color: "#1a1a1a",
                      margin: 0,
                    }}
                  >
                    {subcategoryData.youtubeEmbed.title}
                  </h2>
                  <div
                    style={{
                      width: "80px",
                      height: "4px",
                      background: "linear-gradient(90deg, #C41E3A, #6366f1, #d946ef)",
                      borderRadius: "2px",
                    }}
                  />
                </div>
                {subcategoryData.youtubeEmbed.description && (
                  <p
                    style={{
                      fontSize: "clamp(1rem, 1.3vw, 1.15rem)",
                      color: "rgba(26,26,26,0.7)",
                      fontFamily: "var(--font-poppins), sans-serif",
                      lineHeight: "1.7",
                      maxWidth: "700px",
                      margin: 0,
                    }}
                  >
                    {subcategoryData.youtubeEmbed.description}
                  </p>
                )}
              </div>
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  paddingBottom: "56.25%", // 16:9 aspect ratio
                  borderRadius: "1.5rem",
                  overflow: "hidden",
                  boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                  border: "1px solid rgba(196, 30, 58, 0.15)",
                  background: "#0a0a0a",
                }}
              >
                <iframe
                  src={
                    subcategoryData.youtubeEmbed.type === 'channel'
                      ? `https://www.youtube.com/embed/videoseries?list=${(subcategoryData.youtubeEmbed.url.split('/').pop() || '').replace(/^UC/, 'UU')}`
                      : `https://www.youtube.com/embed/${subcategoryData.youtubeEmbed.url.split('v=').pop()?.split('&')[0]}`
                  }
                  title={subcategoryData.youtubeEmbed.title}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    border: 0,
                  }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
            </section>
          )}
          
          {/* Fallback: Portfolio Examples (if categories not available) */}
          {(!subcategoryData.portfolioCategories || subcategoryData.portfolioCategories.length === 0) && 
           subcategoryData.portfolioExamples && subcategoryData.portfolioExamples.length > 0 && (
            <section style={{ marginBottom: "4rem" }}>
              <div style={{ marginBottom: "3rem" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem", flexWrap: "wrap", gap: "1rem" }}>
                  <h2
                    style={{
                      fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                      fontFamily: "var(--font-headline), sans-serif",
                      fontWeight: 700,
                      color: "#1a1a1a",
                      margin: 0,
                    }}
                  >
                    Featured Work
                  </h2>
                  <div
                    style={{
                      width: "80px",
                      height: "4px",
                      background: "linear-gradient(90deg, #C41E3A, #6366f1, #d946ef)",
                      borderRadius: "2px",
                    }}
                  />
                </div>
                <p
                  style={{
                    fontSize: "clamp(1rem, 1.3vw, 1.15rem)",
                    color: "rgba(26,26,26,0.7)",
                    fontFamily: "var(--font-poppins), sans-serif",
                    lineHeight: "1.7",
                    maxWidth: "700px",
                    margin: 0,
                  }}
                >
                  Explore our recent projects, showcasing the quality and creativity we bring to every engagement.
                </p>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                  gap: "1.5rem",
                }}
              >
                {subcategoryData.portfolioExamples.map((example, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: "2rem",
                      background: "linear-gradient(135deg, rgba(255, 255, 255, 0.98), rgba(248, 249, 250, 0.98))",
                      borderRadius: "1.5rem",
                      border: "1px solid rgba(196, 30, 58, 0.15)",
                    }}
                  >
                    <h3
                      style={{
                        fontSize: "1.25rem",
                        fontFamily: "var(--font-headline), sans-serif",
                        fontWeight: 700,
                        marginBottom: "0.75rem",
                        color: "#1a1a1a",
                      }}
                    >
                      {example.title}
                    </h3>
                    <p
                      style={{
                        fontSize: "0.95rem",
                        color: "rgba(26,26,26,0.7)",
                        fontFamily: "var(--font-poppins), sans-serif",
                        lineHeight: "1.6",
                        margin: 0,
                      }}
                    >
                      {example.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Key Features - Compact Grid */}
          <section style={{ marginBottom: "5rem", paddingTop: "2rem" }}>
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
              <h2
                style={{
                  fontSize: "clamp(2rem, 3.5vw, 2.75rem)",
                  fontFamily: "var(--font-headline), sans-serif",
                  fontWeight: 700,
                  color: "#1a1a1a",
                  margin: "0 0 1rem 0",
                }}
              >
                Why Choose Us
              </h2>
              <div
                style={{
                  width: "80px",
                  height: "4px",
                  background: "linear-gradient(90deg, #C41E3A, #6366f1, #d946ef)",
                  borderRadius: "2px",
                  margin: "0 auto",
                }}
              />
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "1.5rem",
                maxWidth: "1400px",
                margin: "0 auto",
              }}
            >
              {subcategoryData.keyFeatures.map((feature, idx) => (
                <FeatureCard key={idx} feature={feature} index={idx} />
              ))}
            </div>
          </section>

          {/* What We Deliver - Simplified */}
          <section style={{ marginBottom: "5rem", background: "linear-gradient(135deg, rgba(196, 30, 58, 0.03), rgba(99, 102, 241, 0.03))", borderRadius: "2rem", padding: "3rem clamp(2rem, 4vw, 4rem)" }}>
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
              <h2
                style={{
                  fontSize: "clamp(2rem, 3.5vw, 2.75rem)",
                  fontFamily: "var(--font-headline), sans-serif",
                  fontWeight: 700,
                  color: "#1a1a1a",
                  margin: "0 0 1rem 0",
                }}
              >
                Deliverables
              </h2>
              <div
                style={{
                  width: "80px",
                  height: "4px",
                  background: "linear-gradient(90deg, #C41E3A, #6366f1, #d946ef)",
                  borderRadius: "2px",
                  margin: "0 auto",
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                position: "relative",
                paddingLeft: "2.5rem",
              }}
            >
              {/* Vertical line - centered at 0.75rem from left */}
              <div
                style={{
                  position: "absolute",
                  left: "0.75rem",
                  top: "0.75rem",
                  bottom: "0.75rem",
                  width: "2px",
                  background: "linear-gradient(180deg, #C41E3A, #6366f1, #d946ef)",
                  borderRadius: "1px",
                }}
              />
              {subcategoryData.deliverables.map((deliverable, idx) => (
                <div
                  key={idx}
                  style={{
                    position: "relative",
                  }}
                >
                  {/* Dot on timeline - centered on the line at 0.75rem from container left */}
                  <div
                    style={{
                      position: "absolute",
                      left: "-1.75rem",
                      top: "1.5rem",
                      width: "12px",
                      height: "12px",
                      borderRadius: "50%",
                      background: `linear-gradient(135deg, ${["#C41E3A", "#6366f1", "#d946ef", "#06b6d4"][idx % 4]}, ${["#6366f1", "#d946ef", "#06b6d4", "#10b981"][(idx + 1) % 4]})`,
                      border: "3px solid #ffffff",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                      zIndex: 2,
                      transform: "translate(-50%, -50%)",
                    }}
                  />
                  <InteractiveDeliverable deliverable={deliverable} index={idx} />
                </div>
              ))}
            </div>
          </section>

          {/* Industries & Use Cases - Streamlined */}
          <section style={{ marginBottom: "5rem" }}>
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
              <h2
                style={{
                  fontSize: "clamp(2rem, 3.5vw, 2.75rem)",
                  fontFamily: "var(--font-headline), sans-serif",
                  fontWeight: 700,
                  color: "#1a1a1a",
                  margin: "0 0 1rem 0",
                }}
              >
                Who We Serve
              </h2>
              <div
                style={{
                  width: "80px",
                  height: "4px",
                  background: "linear-gradient(90deg, #C41E3A, #6366f1, #d946ef)",
                  borderRadius: "2px",
                  margin: "0 auto",
                }}
              />
            </div>
            <div className={pageStyles.twoCol} style={{ gap: "2rem" }}>
              <InteractiveCard
                style={{
                  padding: "2rem",
                  background: "linear-gradient(135deg, rgba(196, 30, 58, 0.05), rgba(99, 102, 241, 0.03))",
                  border: "1px solid rgba(196, 30, 58, 0.15)",
                }}
              >
                <h3
                  style={{
                    fontSize: "1.25rem",
                    fontFamily: "var(--font-headline), sans-serif",
                    fontWeight: 700,
                    marginBottom: "1.5rem",
                    color: "#1a1a1a",
                  }}
                >
                  Industries
                </h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
                  {subcategoryData.industries.map((industry, idx) => (
                    <InteractiveIndustryBadge key={idx} industry={industry} index={idx} />
                  ))}
                </div>
              </InteractiveCard>

              <InteractiveCard
                style={{
                  padding: "2rem",
                  background: "linear-gradient(135deg, rgba(99, 102, 241, 0.05), rgba(217, 70, 239, 0.03))",
                  border: "1px solid rgba(99, 102, 241, 0.15)",
                }}
              >
                <h3
                  style={{
                    fontSize: "1.25rem",
                    fontFamily: "var(--font-headline), sans-serif",
                    fontWeight: 700,
                    marginBottom: "1.5rem",
                    color: "#1a1a1a",
                  }}
                >
                  Use Cases
                </h3>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "1rem" }}>
                  {subcategoryData.useCases.map((useCase, idx) => {
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
              </InteractiveCard>
            </div>
          </section>

          {/* Our Process - Clean Grid */}
          <section style={{ marginBottom: "5rem", background: "linear-gradient(135deg, rgba(99, 102, 241, 0.03), rgba(217, 70, 239, 0.03))", borderRadius: "2rem", padding: "3rem clamp(2rem, 4vw, 4rem)" }}>
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
              <h2
                style={{
                  fontSize: "clamp(2rem, 3.5vw, 2.75rem)",
                  fontFamily: "var(--font-headline), sans-serif",
                  fontWeight: 700,
                  color: "#1a1a1a",
                  margin: "0 0 1rem 0",
                }}
              >
                Our Process
              </h2>
              <div
                style={{
                  width: "80px",
                  height: "4px",
                  background: "linear-gradient(90deg, #C41E3A, #6366f1, #d946ef)",
                  borderRadius: "2px",
                  margin: "0 auto",
                }}
              />
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "1.5rem",
              }}
            >
              {subcategoryData.processSteps.map((step, idx) => (
                <ProcessStepCard key={idx} step={step} index={idx} />
              ))}
            </div>
          </section>


          {/* CTA Section */}
          <section style={{ marginBottom: "4rem" }}>
            <div 
              style={{ 
                background: "linear-gradient(135deg, rgba(196, 30, 58, 0.08), rgba(99, 102, 241, 0.08))", 
                borderRadius: "2rem", 
                padding: "4rem clamp(2rem, 4vw, 4rem)", 
                textAlign: "center",
                border: "1px solid rgba(196, 30, 58, 0.15)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Decorative element */}
              <div
                style={{
                  position: "absolute",
                  top: "-20%",
                  right: "-10%",
                  width: "300px",
                  height: "300px",
                  borderRadius: "50%",
                  background: "radial-gradient(circle, rgba(196, 30, 58, 0.15), transparent 70%)",
                  pointerEvents: "none",
                }}
              />
              <div style={{ position: "relative", zIndex: 1, maxWidth: "700px", margin: "0 auto" }}>
                <h2
                  style={{
                    fontSize: "clamp(2.25rem, 4vw, 3.25rem)",
                    fontFamily: "var(--font-headline), sans-serif",
                    fontWeight: 900,
                    marginBottom: "1.5rem",
                    color: "#1a1a1a",
                    lineHeight: "1.2",
                  }}
                >
                  Let's Create Something Amazing
                </h2>
                <p
                  style={{
                    fontSize: "clamp(1.1rem, 1.4vw, 1.25rem)",
                    color: "rgba(26,26,26,0.8)",
                    fontFamily: "var(--font-poppins), sans-serif",
                    fontWeight: 500,
                    marginBottom: "2.5rem",
                    lineHeight: "1.7",
                  }}
                >
                  Ready to bring your characters to life? Get in touch and let's discuss your project.
                </p>
                <div style={{ display: "flex", gap: "1.25rem", justifyContent: "center", alignItems: "center", flexWrap: "wrap" }}>
                  <ProjectCTAButton href="/#contact">Start Your Project</ProjectCTAButton>
                  <InteractiveCTAButton href="/#portfolio" variant="light">View More Work</InteractiveCTAButton>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <MinimalFooter />
    </>
  );
}

