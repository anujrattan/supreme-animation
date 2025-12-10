'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

// PORTFOLIO DATA STRUCTURE
// Replace these placeholders with actual project data from client questionnaire
const projects = [
    { 
        id: 1, 
        title: "[PROJECT_TITLE_1]", // e.g., "Neon Genesis"
        category: "[PROJECT_CATEGORY_1]", // e.g., "3D Animation"
        description: "[PROJECT_DESCRIPTION_1]", // Brief 1-2 sentence description
        client: "[CLIENT_NAME_1]", // Optional: Client/company name
        year: "[YEAR_1]", // e.g., "2024"
        thumbnail: "[THUMBNAIL_URL_1]", // Image/video URL for project preview
        caseStudyUrl: "[CASE_STUDY_URL_1]", // Optional: Link to detailed case study
        color: "#C41E3A",
        number: "01"
    },
    { 
        id: 2, 
        title: "[PROJECT_TITLE_2]",
        category: "[PROJECT_CATEGORY_2]",
        description: "[PROJECT_DESCRIPTION_2]",
        client: "[CLIENT_NAME_2]",
        year: "[YEAR_2]",
        thumbnail: "[THUMBNAIL_URL_2]",
        caseStudyUrl: "[CASE_STUDY_URL_2]",
        color: "#C41E3A",
        number: "02"
    },
    { 
        id: 3, 
        title: "[PROJECT_TITLE_3]",
        category: "[PROJECT_CATEGORY_3]",
        description: "[PROJECT_DESCRIPTION_3]",
        client: "[CLIENT_NAME_3]",
        year: "[YEAR_3]",
        thumbnail: "[THUMBNAIL_URL_3]",
        caseStudyUrl: "[CASE_STUDY_URL_3]",
        color: "#C41E3A",
        number: "03"
    },
    { 
        id: 4, 
        title: "[PROJECT_TITLE_4]",
        category: "[PROJECT_CATEGORY_4]",
        description: "[PROJECT_DESCRIPTION_4]",
        client: "[CLIENT_NAME_4]",
        year: "[YEAR_4]",
        thumbnail: "[THUMBNAIL_URL_4]",
        caseStudyUrl: "[CASE_STUDY_URL_4]",
        color: "#C41E3A",
        number: "04"
    },
];

export default function Portfolio() {
    const [hoveredProject, setHoveredProject] = useState<number | null>(null);

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
                        [PORTFOLIO_SECTION_DESCRIPTION]
                        {/* Replace with: Brief description of your portfolio/work philosophy */}
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
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 60 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.15 }}
                            viewport={{ once: true }}
                            onMouseEnter={() => setHoveredProject(project.id)}
                            onMouseLeave={() => setHoveredProject(null)}
                            style={{
                                position: 'relative',
                                aspectRatio: '1/1',
                                cursor: 'pointer',
                                overflow: 'hidden',
                                borderRadius: '1.5rem'
                            }}
                        >
                            {/* Card Background */}
                            <motion.div
                                animate={{
                                    backgroundColor: hoveredProject === project.id 
                                        ? 'rgba(255, 255, 255, 0.08)' 
                                        : 'rgba(255, 255, 255, 0.03)',
                                    borderColor: hoveredProject === project.id 
                                        ? project.color 
                                        : 'rgba(255, 255, 255, 0.1)'
                                }}
                                transition={{ duration: 0.3 }}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    border: '1px solid',
                                    borderRadius: '1.5rem',
                                    padding: '2.5rem',
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
                                        opacity: hoveredProject === project.id ? 0.8 : 0.3,
                                        scale: hoveredProject === project.id ? 1.1 : 1
                                    }}
                                    transition={{ duration: 0.4 }}
                                    style={{
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                        width: '200%',
                                        height: '200%',
                                        background: `radial-gradient(circle, ${project.color}40 0%, transparent 70%)`,
                                        pointerEvents: 'none'
                                    }}
                                />

                                {/* Glow Effect on Hover */}
                                {hoveredProject === project.id && (
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
                                            background: `radial-gradient(circle, ${project.color}20 0%, transparent 60%)`,
                                            filter: 'blur(40px)',
                                            pointerEvents: 'none'
                                        }}
                                    />
                                )}

                                {/* Project Number */}
                                <div style={{ position: 'relative', zIndex: 2 }}>
                                    <motion.p
                                        animate={{
                                            color: hoveredProject === project.id ? project.color : 'rgba(255, 255, 255, 0.2)',
                                            scale: hoveredProject === project.id ? 1.1 : 1
                                        }}
                                        transition={{ duration: 0.3 }}
                                        style={{
                                            fontSize: 'clamp(4rem, 8vw, 7rem)',
                                            fontWeight: 900,
                                            lineHeight: 1,
                                            fontFamily: 'var(--font-headline), sans-serif',
                                            marginBottom: '1rem'
                                        }}
                                    >
                                        {project.number}
                                    </motion.p>
                                </div>

                                {/* Project Info */}
                                <div style={{ position: 'relative', zIndex: 2 }}>
                                    <motion.h3
                                        animate={{
                                            color: hoveredProject === project.id ? '#fff' : 'rgba(255, 255, 255, 0.9)',
                                            x: hoveredProject === project.id ? 5 : 0
                                        }}
                                        transition={{ duration: 0.3 }}
                                        style={{
                                            fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                                            fontWeight: 700,
                                            marginBottom: '0.75rem',
                                            letterSpacing: '-0.02em',
                                            fontFamily: 'var(--font-headline), sans-serif'
                                        }}
                                    >
                                        {project.title}
                                    </motion.h3>
                                    <motion.p
                                        animate={{
                                            color: hoveredProject === project.id ? project.color : 'rgba(255, 255, 255, 0.5)',
                                            x: hoveredProject === project.id ? 5 : 0
                                        }}
                                        transition={{ duration: 0.3 }}
                                        style={{
                                            fontSize: 'clamp(0.875rem, 1.2vw, 1rem)',
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.15em',
                                            fontWeight: 500,
                                            fontFamily: 'var(--font-poppins), sans-serif'
                                        }}
                                    >
                                        {project.category}
                                    </motion.p>
                                    {/* Optional: Show client name and year on hover */}
                                    {hoveredProject === project.id && project.client && (
                                        <motion.p
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            style={{
                                                fontSize: 'clamp(0.75rem, 1vw, 0.875rem)',
                                                color: 'rgba(255, 255, 255, 0.4)',
                                                marginTop: '0.5rem',
                                                fontStyle: 'italic'
                                            }}
                                        >
                                            {project.client} • {project.year}
                                        </motion.p>
                                    )}

                                    {/* View Project Arrow */}
                                    <motion.div
                                        animate={{
                                            opacity: hoveredProject === project.id ? 1 : 0,
                                            x: hoveredProject === project.id ? 0 : -10
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
                                            color: project.color,
                                            fontWeight: 600,
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.1em'
                                        }}>
                                            View Project
                                        </span>
                                        <motion.svg
                                            animate={{ x: hoveredProject === project.id ? 5 : 0 }}
                                            transition={{ duration: 0.3, repeat: hoveredProject === project.id ? Infinity : 0, repeatType: 'reverse' }}
                                            width="20"
                                            height="20"
                                            viewBox="0 0 20 20"
                                            fill="none"
                                            style={{ color: project.color }}
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
                                        opacity: hoveredProject === project.id ? 1 : 0.3,
                                        scale: hoveredProject === project.id ? 1 : 0.8
                                    }}
                                    transition={{ duration: 0.3 }}
                                    style={{
                                        position: 'absolute',
                                        top: '1.5rem',
                                        right: '1.5rem',
                                        width: '60px',
                                        height: '60px',
                                        border: `2px solid ${project.color}`,
                                        borderBottom: 'none',
                                        borderLeft: 'none',
                                        borderRadius: '0 1.5rem 0 0',
                                        opacity: 0.3
                                    }}
                                />
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
