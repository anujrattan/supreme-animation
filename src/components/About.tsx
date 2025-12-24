'use client';

import { motion } from 'framer-motion';

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

export default function About() {
    return (
        <section style={{ padding: '3rem 2rem', position: 'relative', zIndex: 10, backgroundColor: '#f9f9f9' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                {/* Origin Story */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true }}
                    style={{ 
                        maxWidth: '900px', 
                        margin: '0 auto 4rem auto', 
                        textAlign: 'center' 
                    }}
                >
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        style={{ 
                            fontSize: 'clamp(2rem, 4vw, 3rem)', 
                            marginBottom: '1.5rem', 
                            color: '#C41E3A',
                            fontFamily: 'var(--font-headline), sans-serif',
                            fontWeight: 700
                        }}
                    >
                        The Studio
                    </motion.h2>
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
                        Supreme Animation Studio was founded in 2016 with a simple goal: create standout animation with the freedom to explore new ways of storytelling — and the discipline to deliver.
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
                        Today, we’re a team of five, bringing 10+ years of combined experience. We embrace AI-enhanced pipelines to move faster and iterate smarter — without losing the soul of great craft.
                    </motion.p>
                </motion.div>

                {/* Our Process */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    viewport={{ once: true }}
                >
                    <h3 style={{
                        fontSize: 'clamp(1.75rem, 3vw, 2.25rem)',
                        color: '#1a1a1a',
                        marginBottom: '2rem',
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
                        marginBottom: '3rem',
                        maxWidth: '700px',
                        margin: '0 auto 3rem auto',
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
