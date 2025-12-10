'use client';

import { motion } from 'framer-motion';

const highlights = [
    {
        title: "What Sets Us Apart",
        description: "We combine traditional animation mastery with cutting-edge AI tools, creating a unique blend of artistic excellence and technological innovation that delivers exceptional results faster.",
    },
    {
        title: "Our Values",
        description: "Excellence in craft, creative freedom, collaborative partnership, and continuous innovation drive everything we do. We believe in pushing boundaries while maintaining the highest quality standards.",
    },
    {
        title: "Our Culture",
        description: "A tight-knit team of five passionate artists and creators, we foster a collaborative environment where every voice matters. With over a decade of combined experience, we balance creative experimentation with professional discipline.",
    },
];

const processSteps = [
    {
        phase: "Pre-Production",
        steps: [
            "Kick-off Call & Strategy",
            "Script Development",
            "Storyboard Creation",
            "Music & Voice Over Selection",
            "Key Illustrations"
        ]
    },
    {
        phase: "Production",
        steps: [
            "Animatic/Stillomatic",
            "Final Illustrations",
            "Animation Production"
        ]
    },
    {
        phase: "Post-Production",
        steps: [
            "Sound Post-Production",
            "Final Render & Delivery"
        ]
    }
];

const stats = [
    { value: "10+", label: "Years of Combined Experience" },
    { value: "5", label: "Team Members" },
    { value: "10+", label: "Countries Collaborated With" },
    { value: "50+", label: "Projects Delivered" },
];

export default function StudioImpact() {
    return (
        <section style={{ padding: '3rem 2rem', backgroundColor: '#ffffff', position: 'relative', zIndex: 10 }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true }}
                    style={{ marginBottom: '3rem', textAlign: 'center' }}
                >
                    <p style={{
                        textTransform: 'uppercase',
                        letterSpacing: '0.25em',
                        color: '#C41E3A',
                        fontSize: '0.9rem',
                        marginBottom: '0.75rem',
                        fontFamily: 'var(--font-headline), sans-serif',
                        fontWeight: 600
                    }}>
                        About the Studio
                    </p>
                    <h2 style={{
                        fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                        color: '#1a1a1a',
                        marginBottom: '0.75rem',
                        fontFamily: 'var(--font-headline), sans-serif',
                        fontWeight: 700
                    }}>
                        Where Creative Vision Meets Technical Excellence
                    </h2>
                    <p style={{
                        color: 'rgba(26, 26, 26, 0.7)',
                        fontSize: 'clamp(1rem, 1.5vw, 1.25rem)',
                        maxWidth: '760px',
                        margin: '0 auto',
                        fontFamily: 'var(--font-poppins), sans-serif',
                        fontWeight: 400
                    }}>
                        We blend artistic mastery with innovative technology, creating animations that captivate audiences and bring stories to life. Our collaborative, iterative approach ensures every project exceeds expectations.
                    </p>
                </motion.div>

                {/* Origin Story */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                    viewport={{ once: true }}
                    style={{ 
                        maxWidth: '900px', 
                        margin: '0 auto 3rem auto', 
                        textAlign: 'center' 
                    }}
                >
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                        style={{ 
                            fontSize: 'clamp(1.1rem, 1.5vw, 1.3rem)', 
                            lineHeight: '1.8', 
                            color: 'rgba(26, 26, 26, 0.8)',
                            fontFamily: 'var(--font-poppins), sans-serif',
                            fontWeight: 400,
                            marginBottom: '1.5rem'
                        }}
                    >
                        Supreme Animation Studio was founded in 2021 by a co-founder who, after working at a leading animation studio for four to five years, decided to build something independent. Driven by a passion for creative freedom and the desire to work on his own terms, he established a studio that combines artistic excellence with innovative technology.
                    </motion.p>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        viewport={{ once: true }}
                        style={{ 
                            fontSize: 'clamp(1rem, 1.3vw, 1.15rem)', 
                            lineHeight: '1.7', 
                            color: 'rgba(26, 26, 26, 0.7)',
                            fontFamily: 'var(--font-poppins), sans-serif',
                            fontWeight: 400
                        }}
                    >
                        Today, we're a team of five dedicated artists and creators, bringing over a decade of combined experience to every project. We're particularly excited about the advancement of AI in animation and how it can benefit both artists and clients, enabling us to push creative boundaries while maintaining the highest quality standards.
                    </motion.p>
                </motion.div>

                {/* Highlights Cards */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '1rem',
                    marginBottom: '3rem'
                }}>
                    {highlights.map((item, idx) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            viewport={{ once: true }}
                            style={{
                                padding: '1.5rem',
                                borderRadius: '1.25rem',
                                border: '1px solid rgba(0, 0, 0, 0.08)',
                                background: 'linear-gradient(135deg, rgba(250, 250, 250, 0.8), rgba(255, 255, 255, 0.95))',
                                minHeight: '200px'
                            }}
                        >
                            <h3 style={{ 
                                color: '#1a1a1a', 
                                fontSize: '1.2rem', 
                                marginBottom: '0.5rem',
                                fontFamily: 'var(--font-headline), sans-serif',
                                fontWeight: 600
                            }}>{item.title}</h3>
                            <p style={{ 
                                color: 'rgba(26, 26, 26, 0.7)', 
                                lineHeight: 1.6,
                                fontFamily: 'var(--font-poppins), sans-serif',
                                fontWeight: 400
                            }}>{item.description}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Our Process */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    viewport={{ once: true }}
                    style={{ marginBottom: '3rem' }}
                >
                    <h3 style={{
                        fontSize: 'clamp(1.75rem, 3vw, 2.25rem)',
                        color: '#1a1a1a',
                        marginBottom: '1rem',
                        textAlign: 'center',
                        fontFamily: 'var(--font-headline), sans-serif',
                        fontWeight: 700
                    }}>
                        Our Collaborative Process
                    </h3>
                    <p style={{
                        fontSize: '1rem',
                        color: 'rgba(26, 26, 26, 0.7)',
                        textAlign: 'center',
                        marginBottom: '2.5rem',
                        maxWidth: '700px',
                        margin: '0 auto 2.5rem auto',
                        fontFamily: 'var(--font-poppins), sans-serif',
                        fontWeight: 400
                    }}>
                        We work collaboratively with regular feedback loops, ensuring your vision is realized through an iterative, transparent process.
                    </p>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: '1.5rem',
                        marginBottom: '3rem'
                    }}>
                        {processSteps.map((phase, idx) => (
                            <motion.div
                                key={phase.phase}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: idx * 0.15 }}
                                viewport={{ once: true }}
                                style={{
                                    padding: '2rem',
                                    borderRadius: '1.25rem',
                                    border: '1px solid rgba(0, 0, 0, 0.08)',
                                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(250, 250, 250, 0.9))',
                                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)'
                                }}
                            >
                                <h4 style={{
                                    fontSize: '1.5rem',
                                    color: '#C41E3A',
                                    marginBottom: '1.25rem',
                                    fontFamily: 'var(--font-headline), sans-serif',
                                    fontWeight: 700
                                }}>
                                    {phase.phase}
                                </h4>
                                <ul style={{
                                    listStyle: 'none',
                                    padding: 0,
                                    margin: 0
                                }}>
                                    {phase.steps.map((step, stepIdx) => (
                                        <li key={stepIdx} style={{
                                            padding: '0.5rem 0',
                                            paddingLeft: '1.5rem',
                                            position: 'relative',
                                            fontSize: '0.95rem',
                                            color: 'rgba(26, 26, 26, 0.8)',
                                            lineHeight: '1.6',
                                            fontFamily: 'var(--font-poppins), sans-serif',
                                            fontWeight: 400
                                        }}>
                                            <span style={{
                                                position: 'absolute',
                                                left: 0,
                                                top: '0.65em',
                                                width: '6px',
                                                height: '6px',
                                                borderRadius: '50%',
                                                background: 'linear-gradient(135deg, #C41E3A, #d946ef)'
                                            }} />
                                            {step}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Stats */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                    gap: '0.75rem',
                    marginBottom: '3rem'
                }}>
                    {stats.map((stat, idx) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: idx * 0.05 }}
                            viewport={{ once: true }}
                            style={{
                                padding: '1.25rem',
                                borderRadius: '1rem',
                                border: '1px solid rgba(0, 0, 0, 0.1)',
                                backgroundColor: '#fafafa'
                            }}
                        >
                            <p style={{ 
                                fontSize: '2rem', 
                                color: '#C41E3A', 
                                marginBottom: '0.15rem', 
                                fontWeight: 700,
                                fontFamily: 'var(--font-headline), sans-serif'
                            }}>
                                {stat.value}
                            </p>
                            <p style={{ 
                                color: 'rgba(26, 26, 26, 0.7)', 
                                fontSize: '0.95rem',
                                fontFamily: 'var(--font-poppins), sans-serif',
                                fontWeight: 400
                            }}>{stat.label}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Achievements Placeholder */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.4 }}
                    viewport={{ once: true }}
                    style={{
                        textAlign: 'center',
                        padding: '2rem',
                        borderRadius: '1rem',
                        border: '2px dashed rgba(196, 30, 58, 0.2)',
                        backgroundColor: 'rgba(196, 30, 58, 0.05)'
                    }}
                >
                    <p style={{
                        fontSize: '1rem',
                        color: 'rgba(26, 26, 26, 0.6)',
                        fontFamily: 'var(--font-poppins), sans-serif',
                        fontWeight: 400,
                        fontStyle: 'italic'
                    }}>
                        Achievements & Milestones — Content to be added after client review
                    </p>
                </motion.div>
            </div>
        </section>
    );
}

