'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

type FormState = {
    name: string;
    email: string;
    company: string;
    projectNeed: string;
    budget: string;
    message: string;
};

const initialForm: FormState = {
    name: '',
    email: '',
    company: '',
    projectNeed: '',
    budget: '',
    message: '',
};

const projectNeeds = [
    'AI Avatars & VTubers',
    'Digital Humans / Cinematics',
    'Game Art & Assets',
    'Virtual Production',
    'Kids Animation',
    'Web / App Development',
    'Something Else',
];

const cyclingWords = ['Bold', 'Epic', 'Iconic'];

export default function Contact() {
    const [form, setForm] = useState<FormState>(initialForm);
    const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);

    // Cycle through words every 3 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentWordIndex((prev) => (prev + 1) % cyclingWords.length);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        // Clear error when user starts typing
        if (status === 'error') {
            setStatus('idle');
            setErrorMessage('');
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('sending');
        setErrorMessage('');

        try {
            const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';
            const response = await fetch(`${backendUrl}/api/contact/submit`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to submit form');
            }

            setStatus('sent');
            setForm(initialForm);
            setTimeout(() => setStatus('idle'), 4000);
        } catch (error) {
            console.error('Error submitting form:', error);
            setStatus('error');
            setErrorMessage(error instanceof Error ? error.message : 'Failed to submit form. Please try again.');
        }
    };

    return (
        <section style={{ padding: '3rem 2rem', position: 'relative', zIndex: 10, backgroundColor: '#f9f9f9', borderTop: '1px solid rgba(0, 0, 0, 0.1)' }}>
            <div style={{ maxWidth: 'clamp(1100px, 90vw, 1400px)', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '7rem' }}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    style={{ textAlign: 'left' }}
                >
                    <h2 style={{ 
                        fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', 
                        marginBottom: '0.75rem', 
                        color: '#1a1a1a',
                        fontFamily: 'var(--font-headline), sans-serif',
                        fontWeight: 700,
                        textAlign: 'left',
                        lineHeight: '1.2',
                        display: 'inline-block'
                    }}>
                        Let's Create Something -{' '}
                        <span style={{ 
                            display: 'inline-block',
                            width: 'clamp(100px, 12vw, 150px)',
                            position: 'relative',
                            verticalAlign: 'baseline',
                            height: '1em',
                            lineHeight: '1.2'
                        }}>
                            <AnimatePresence mode="wait">
                                <motion.span
                                    key={cyclingWords[currentWordIndex]}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.5 }}
                                    style={{
                                        color: '#C41E3A',
                                        display: 'inline-block',
                                        whiteSpace: 'nowrap',
                                        position: 'absolute',
                                        left: 0,
                                        top: 0,
                                        lineHeight: '1.2',
                                        fontSize: 'inherit',
                                        fontWeight: 'inherit',
                                        fontFamily: 'inherit'
                                    }}
                                >
                                    {cyclingWords[currentWordIndex]}
                                </motion.span>
                            </AnimatePresence>
                        </span>
                    </h2>
                    <p style={{ 
                        color: 'rgba(26, 26, 26, 0.75)', 
                        lineHeight: 1.7, 
                        marginBottom: '1.25rem',
                        fontFamily: 'var(--font-poppins), sans-serif',
                        fontWeight: 400,
                        textAlign: 'left'
                    }}>
                        Share your idea, timing, and ambition. We'll assemble the right team and production plan to bring it to life.
                    </p>
                    <div style={{ 
                        color: 'rgba(26, 26, 26, 0.65)', 
                        lineHeight: 1.7,
                        fontFamily: 'var(--font-poppins), sans-serif',
                        fontWeight: 400,
                        textAlign: 'left'
                    }}>
                        <p><strong>Studio Email:</strong> hello@supremeanimation.com</p>
                        <p><strong>HQ:</strong> 4800 Meadows Rd, STE 300, Lake Oswego, OR 97035</p>
                        <p><strong>Global:</strong> London • Punjab • Ajman • Remote-first</p>
                    </div>
                </motion.div>

                <motion.form
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    viewport={{ once: true }}
                    style={{
                        backgroundColor: '#ffffff',
                        border: '1px solid rgba(0, 0, 0, 0.1)',
                        borderRadius: '1.5rem',
                        padding: '1.75rem',
                        display: 'grid',
                        gap: '1rem'
                    }}
                >
                    <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
                        <label style={labelStyle}>
                            Name *
                            <input
                                required
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="Jane Doe"
                                style={inputStyle}
                            />
                        </label>
                        <label style={labelStyle}>
                            Email *
                            <input
                                required
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="you@brand.com"
                                style={inputStyle}
                            />
                        </label>
                    </div>
                    <label style={labelStyle}>
                        Company / Studio
                        <input
                            name="company"
                            value={form.company}
                            onChange={handleChange}
                            placeholder="Studio / Brand"
                            style={inputStyle}
                        />
                    </label>
                    <label style={labelStyle}>
                        What do you need? *
                        <select
                            required
                            name="projectNeed"
                            value={form.projectNeed}
                            onChange={handleChange}
                            style={inputStyle}
                        >
                            <option value="" disabled>Select an option</option>
                            {projectNeeds.map((need) => (
                                <option key={need} value={need}>{need}</option>
                            ))}
                        </select>
                    </label>
                    <label style={labelStyle}>
                        Estimated budget (optional)
                        <input
                            name="budget"
                            value={form.budget}
                            onChange={handleChange}
                            placeholder="$50K – $150K"
                            style={inputStyle}
                        />
                    </label>
                    <label style={labelStyle}>
                        Tell us about your project *
                        <textarea
                            required
                            name="message"
                            value={form.message}
                            onChange={handleChange}
                            rows={4}
                            placeholder="Drop key details, timelines, reference links..."
                            style={{ ...inputStyle, resize: 'vertical' }}
                        />
                    </label>
                    {errorMessage && (
                        <div style={{
                            padding: '0.75rem 1rem',
                            borderRadius: '0.5rem',
                            backgroundColor: 'rgba(196, 30, 58, 0.1)',
                            border: '1px solid rgba(196, 30, 58, 0.3)',
                            color: '#ff6b6b',
                            fontSize: '0.9rem'
                        }}>
                            {errorMessage}
                        </div>
                    )}
                    <motion.button
                        type="submit"
                        disabled={status === 'sending'}
                        whileHover={status !== 'sending' ? { scale: 1.01 } : {}}
                        whileTap={status !== 'sending' ? { scale: 0.98 } : {}}
                        style={{
                            padding: '1rem 1.5rem',
                            borderRadius: '999px',
                            border: 'none',
                            background: status === 'sending' ? '#666' : '#C41E3A',
                            color: '#ffffff',
                            fontWeight: 700,
                            fontSize: '1rem',
                            cursor: status === 'sending' ? 'not-allowed' : 'pointer',
                            opacity: status === 'sending' ? 0.7 : 1,
                            fontFamily: 'var(--font-headline), sans-serif'
                        }}
                    >
                        {status === 'sending' ? 'Sending...' : status === 'sent' ? 'Message Sent!' : 'Send Message'}
                    </motion.button>
                </motion.form>
            </div>
        </section>
    );
}

const labelStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.35rem',
    color: '#1a1a1a',
    fontSize: '0.95rem'
};

const inputStyle: React.CSSProperties = {
    padding: '0.9rem 1rem',
    borderRadius: '0.75rem',
    border: '1px solid rgba(255,255,255,0.15)',
    backgroundColor: '#fafafa',
    color: '#1a1a1a',
    fontSize: '1rem',
    outline: 'none'
};
