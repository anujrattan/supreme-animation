'use client';

import { motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import Link from "next/link";
import { projects as allProjects } from "@/content/projects";

function pad2(n: number) {
  return String(n).padStart(2, "0");
}

export default function Portfolio() {
    const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);
    const projects = useMemo(() => {
        // Featured first (if any), then by year desc
        return [...allProjects].sort((a, b) => {
            const af = a.featured ? 1 : 0;
            const bf = b.featured ? 1 : 0;
            if (bf !== af) return bf - af;
            return Number(b.year) - Number(a.year);
        });
    }, []);

    return (
        <section style={{ 
            padding: '3rem 2rem', 
            minHeight: '100vh', 
            backgroundColor: '#09090f', 
            position: 'relative', 
            zIndex: 10 
        }}>
            <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true }}
                    style={{ 
                        marginBottom: '2rem'
                    }}
                >
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                        style={{
                            fontSize: '0.95rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.25em',
                            color: '#C41E3A',
                            marginBottom: '0.75rem'
                        }}
                    >
                        Our Portfolio
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        viewport={{ once: true }}
                        style={{
                            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                            fontWeight: 800,
                            color: '#fff',
                            marginBottom: '0.75rem',
                            fontFamily: 'var(--font-headline), sans-serif'
                        }}
                    >
                        Selected Works
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        viewport={{ once: true }}
                        style={{
                            fontSize: 'clamp(1rem, 1.5vw, 1.25rem)',
                            color: 'rgba(255, 255, 255, 0.7)',
                            marginBottom: '3rem',
                            maxWidth: '700px',
                            fontFamily: 'var(--font-poppins), sans-serif',
                            fontWeight: 400
                        }}
                    >
                        A curated selection of projects across explainer videos, product promos, trailers, and ArchViz—built with craftsmanship, speed, and modern pipelines.
                    </motion.p>
                </motion.div>

                {/* Projects Grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '1.25rem',
                    marginTop: '3rem',
                    maxWidth: '1100px',
                    margin: '3rem auto 0'
                }}>
                    {projects.map((project, index) => {
                        const number = pad2(index + 1);
                        const color = "#C41E3A";

                        return (
                        <motion.article
                            key={project.slug}
                            initial={{ opacity: 0, y: 60 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.15 }}
                            viewport={{ once: true }}
                            onMouseEnter={() => setHoveredSlug(project.slug)}
                            onMouseLeave={() => setHoveredSlug(null)}
                            style={{
                                position: 'relative',
                                aspectRatio: '1/1',
                                cursor: 'pointer',
                                overflow: 'hidden',
                                borderRadius: '1.5rem'
                            }}
                        >
                            <Link
                              href={`/portfolio/${project.slug}`}
                              style={{ display: "block", width: "100%", height: "100%", textDecoration: "none" }}
                              aria-label={`Open project: ${project.title}`}
                            >
                              {/* Card Background */}
                              <motion.div
                                  animate={{
                                      backgroundColor: hoveredSlug === project.slug 
                                          ? 'rgba(255, 255, 255, 0.08)' 
                                          : 'rgba(255, 255, 255, 0.03)',
                                      borderColor: hoveredSlug === project.slug 
                                          ? color 
                                          : 'rgba(255, 255, 255, 0.1)'
                                  }}
                                  transition={{ duration: 0.3 }}
                                  style={{
                                      width: '100%',
                                      height: '100%',
                                      border: '1px solid',
                                      borderRadius: '1.5rem',
                                      padding: '2.1rem',
                                      display: 'flex',
                                      flexDirection: 'column',
                                      justifyContent: 'space-between',
                                      position: 'relative',
                                      overflow: 'hidden'
                                  }}
                              >
                                  {/* Animated Gradient Background */}
                                  <motion.div
                                      animate={{
                                          opacity: hoveredSlug === project.slug ? 0.8 : 0.3,
                                          scale: hoveredSlug === project.slug ? 1.1 : 1
                                      }}
                                      transition={{ duration: 0.4 }}
                                      style={{
                                          position: 'absolute',
                                          top: '50%',
                                          left: '50%',
                                          transform: 'translate(-50%, -50%)',
                                          width: '200%',
                                          height: '200%',
                                          background: `radial-gradient(circle, ${color}40 0%, transparent 70%)`,
                                          pointerEvents: 'none'
                                      }}
                                  />

                                  {/* Glow Effect on Hover */}
                                  {hoveredSlug === project.slug && (
                                      <motion.div
                                          initial={{ opacity: 0 }}
                                          animate={{ opacity: 1 }}
                                          exit={{ opacity: 0 }}
                                          style={{
                                              position: 'absolute',
                                              top: '-50%',
                                              left: '-50%',
                                              width: '200%',
                                              height: '200%',
                                              background: `radial-gradient(circle, ${color}20 0%, transparent 60%)`,
                                              filter: 'blur(40px)',
                                              pointerEvents: 'none'
                                          }}
                                      />
                                  )}

                                  {/* Project Number */}
                                  <div style={{ position: 'relative', zIndex: 2 }}>
                                      <motion.p
                                          animate={{
                                              color: hoveredSlug === project.slug ? color : 'rgba(255, 255, 255, 0.2)',
                                              scale: hoveredSlug === project.slug ? 1.1 : 1
                                          }}
                                          transition={{ duration: 0.3 }}
                                          style={{
                                              fontSize: 'clamp(3.5rem, 7vw, 6.25rem)',
                                              fontWeight: 900,
                                              lineHeight: 1,
                                              fontFamily: 'var(--font-headline), sans-serif',
                                              marginBottom: '0.9rem'
                                          }}
                                      >
                                          {number}
                                      </motion.p>
                                  </div>

                                  {/* Project Info */}
                                  <div style={{ position: 'relative', zIndex: 2 }}>
                                      <motion.h3
                                          animate={{
                                              color: hoveredSlug === project.slug ? '#fff' : 'rgba(255, 255, 255, 0.9)',
                                              x: hoveredSlug === project.slug ? 5 : 0
                                          }}
                                          transition={{ duration: 0.3 }}
                                          style={{
                                              fontSize: 'clamp(1.35rem, 2.2vw, 1.9rem)',
                                              fontWeight: 700,
                                              marginBottom: '0.65rem',
                                              letterSpacing: '-0.02em',
                                              fontFamily: 'var(--font-headline), sans-serif',
                                              lineHeight: 1.12,
                                              display: '-webkit-box',
                                              WebkitBoxOrient: 'vertical',
                                              WebkitLineClamp: 2,
                                              overflow: 'hidden'
                                          }}
                                      >
                                          {project.title}
                                      </motion.h3>
                                      <motion.p
                                          animate={{
                                              color: hoveredSlug === project.slug ? color : 'rgba(255, 255, 255, 0.5)',
                                              x: hoveredSlug === project.slug ? 5 : 0
                                          }}
                                          transition={{ duration: 0.3 }}
                                          style={{
                                              fontSize: 'clamp(0.82rem, 1vw, 0.95rem)',
                                              textTransform: 'uppercase',
                                              letterSpacing: '0.15em',
                                              fontWeight: 500,
                                              fontFamily: 'var(--font-poppins), sans-serif',
                                              lineHeight: 1.35
                                          }}
                                      >
                                          {project.deliverableLabel}
                                      </motion.p>
                                      {/* Show client label + year on hover */}
                                      {hoveredSlug === project.slug && project.clientLabel && (
                                          <motion.p
                                              initial={{ opacity: 0, y: 10 }}
                                              animate={{ opacity: 1, y: 0 }}
                                              style={{
                                                  fontSize: 'clamp(0.75rem, 1vw, 0.875rem)',
                                                  color: 'rgba(255, 255, 255, 0.45)',
                                                  marginTop: '0.5rem',
                                                  fontStyle: 'italic'
                                              }}
                                          >
                                              {project.clientLabel} • {project.year}
                                          </motion.p>
                                      )}

                                      {/* View Project Arrow */}
                                      <motion.div
                                          animate={{
                                              opacity: hoveredSlug === project.slug ? 1 : 0,
                                              x: hoveredSlug === project.slug ? 0 : -10
                                          }}
                                          transition={{ duration: 0.3 }}
                                          style={{
                                              marginTop: '1.5rem',
                                              display: 'flex',
                                              alignItems: 'center',
                                              gap: '0.5rem'
                                          }}
                                      >
                                          <span style={{
                                              fontSize: '0.875rem',
                                              color: color,
                                              fontWeight: 600,
                                              textTransform: 'uppercase',
                                              letterSpacing: '0.1em'
                                          }}>
                                              View Project
                                          </span>
                                          <motion.svg
                                              animate={{ x: hoveredSlug === project.slug ? 5 : 0 }}
                                              transition={{ duration: 0.3, repeat: hoveredSlug === project.slug ? Infinity : 0, repeatType: 'reverse' }}
                                              width="20"
                                              height="20"
                                              viewBox="0 0 20 20"
                                              fill="none"
                                              style={{ color: color }}
                                          >
                                              <path
                                                  d="M7.5 15L12.5 10L7.5 5"
                                                  stroke="currentColor"
                                                  strokeWidth="2"
                                                  strokeLinecap="round"
                                                  strokeLinejoin="round"
                                              />
                                          </motion.svg>
                                      </motion.div>
                                  </div>

                                  {/* Corner Accent */}
                                  <motion.div
                                      animate={{
                                          opacity: hoveredSlug === project.slug ? 1 : 0.3,
                                          scale: hoveredSlug === project.slug ? 1 : 0.8
                                      }}
                                      transition={{ duration: 0.3 }}
                                      style={{
                                          position: 'absolute',
                                          top: '1.5rem',
                                          right: '1.5rem',
                                          width: '60px',
                                          height: '60px',
                                          border: `2px solid ${color}`,
                                          borderBottom: 'none',
                                          borderLeft: 'none',
                                          borderRadius: '0 1.5rem 0 0',
                                          opacity: 0.3
                                      }}
                                  />
                              </motion.div>
                            </Link>
                        </motion.article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
