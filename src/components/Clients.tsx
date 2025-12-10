'use client';

import { motion } from 'framer-motion';

const clients = [
    "Netflix", "Nike", "Apple", "Sony", "Red Bull", "Spotify", "Google", "Samsung", "Adobe", "Microsoft"
];

export default function Clients() {
    return (
        <section style={{ padding: '3rem 0', backgroundColor: '#020203', overflow: 'hidden', position: 'relative', zIndex: 10 }}>
            <h2 style={{
                textAlign: 'center',
                fontSize: '1rem',
                textTransform: 'uppercase',
                letterSpacing: '0.2em',
                color: '#666',
                marginBottom: '3rem'
            }}>
                Trusted By
            </h2>
            <div style={{ display: 'flex', whiteSpace: 'nowrap' }}>
                <motion.div
                    animate={{ x: [0, -1000] }}
                    transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                    style={{ display: 'flex', gap: '4rem', paddingRight: '4rem' }}
                >
                    {[...clients, ...clients, ...clients].map((client, index) => (
                        <span key={index} style={{
                            fontSize: '3rem',
                            fontWeight: 800,
                            color: 'transparent',
                            WebkitTextStroke: '1px #444',
                            textTransform: 'uppercase'
                        }}>
                            {client}
                        </span>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
