'use client';

import { useRef, useEffect } from 'react';

export default function Scene() {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        // Ensure video plays
        if (videoRef.current) {
            videoRef.current.play().catch(() => {
                // Autoplay was prevented, but video will play on user interaction
            });
        }
    }, []);

    return (
        <div style={{ 
            width: '100%', 
            height: '100%', 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            zIndex: 0,
            overflow: 'hidden',
            backgroundColor: '#0a0a0a'
        }}>
            <video
                ref={videoRef}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center'
                }}
            >
                <source src="/banner/pixar_style_cinematic_outer_space_scene_a_beautiful_extended.mp4" type="video/mp4" />
            </video>
        </div>
    );
}
