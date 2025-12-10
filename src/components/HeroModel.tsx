'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Stars, Float, Dodecahedron, TorusKnot, Octahedron, Sphere } from '@react-three/drei';
import * as THREE from 'three';

// Nebula particle system component
function NebulaParticles() {
    const particlesRef = useRef<THREE.Points>(null);
    const particleCount = 2000;

    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    
    // Brand colors: deep red (#C41E3A), dark blue, purple
    const colorPalette = [
        new THREE.Color(0xC41E3A), // Brand red
        new THREE.Color(0x1a1a3a), // Deep blue
        new THREE.Color(0x4a1a6a), // Purple
        new THREE.Color(0x2a2a5a), // Dark blue-purple
    ];

    for (let i = 0; i < particleCount; i++) {
        // Create a cloud-like distribution
        const radius = 15 + Math.random() * 25;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI;
        
        positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        positions[i * 3 + 2] = radius * Math.cos(phi);

        // Random color from palette
        const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
        colors[i * 3] = color.r;
        colors[i * 3 + 1] = color.g;
        colors[i * 3 + 2] = color.b;
    }

    useFrame((state, delta) => {
        if (particlesRef.current) {
            // Slow rotation for nebula effect
            particlesRef.current.rotation.y += delta * 0.05;
        }
    });

    return (
        <points ref={particlesRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={particleCount}
                    array={positions}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-color"
                    count={particleCount}
                    array={colors}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.15}
                vertexColors
                transparent
                opacity={0.6}
                sizeAttenuation
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}

// Geometric shape components with enhanced materials
function DodecahedronShape({ position, scale, rotationSpeed, color, emissive }: {
    position: [number, number, number];
    scale: number;
    rotationSpeed: number;
    color: string;
    emissive: string;
}) {
    const ref = useRef<THREE.Mesh>(null);

    useFrame((state, delta) => {
        if (ref.current) {
            ref.current.rotation.x += delta * rotationSpeed;
            ref.current.rotation.y += delta * rotationSpeed * 0.7;
            ref.current.rotation.z += delta * rotationSpeed * 0.5;
        }
    });

    return (
        <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.8}>
            <mesh ref={ref} position={position} scale={scale}>
                <Dodecahedron args={[1, 0]} />
                <meshStandardMaterial
                    color={color}
                    emissive={emissive}
                    emissiveIntensity={0.4}
                    roughness={0.3}
                    metalness={0.8}
                    side={THREE.FrontSide}
                />
            </mesh>
        </Float>
    );
}

function TorusKnotShape({ position, scale, rotationSpeed, color, emissive }: {
    position: [number, number, number];
    scale: number;
    rotationSpeed: number;
    color: string;
    emissive: string;
}) {
    const ref = useRef<THREE.Mesh>(null);

    useFrame((state, delta) => {
        if (ref.current) {
            ref.current.rotation.x += delta * rotationSpeed;
            ref.current.rotation.y += delta * rotationSpeed * 0.7;
            ref.current.rotation.z += delta * rotationSpeed * 0.5;
        }
    });

    return (
        <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.8}>
            <mesh ref={ref} position={position} scale={scale}>
                <TorusKnot args={[1, 0.3, 128, 16]} />
                <meshStandardMaterial
                    color={color}
                    emissive={emissive}
                    emissiveIntensity={0.4}
                    roughness={0.3}
                    metalness={0.8}
                    side={THREE.FrontSide}
                />
            </mesh>
        </Float>
    );
}

function OctahedronShape({ position, scale, rotationSpeed, color, emissive }: {
    position: [number, number, number];
    scale: number;
    rotationSpeed: number;
    color: string;
    emissive: string;
}) {
    const ref = useRef<THREE.Mesh>(null);

    useFrame((state, delta) => {
        if (ref.current) {
            ref.current.rotation.x += delta * rotationSpeed;
            ref.current.rotation.y += delta * rotationSpeed * 0.7;
            ref.current.rotation.z += delta * rotationSpeed * 0.5;
        }
    });

    return (
        <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.8}>
            <mesh ref={ref} position={position} scale={scale}>
                <Octahedron args={[1, 0]} />
                <meshStandardMaterial
                    color={color}
                    emissive={emissive}
                    emissiveIntensity={0.4}
                    roughness={0.3}
                    metalness={0.8}
                    side={THREE.FrontSide}
                />
            </mesh>
        </Float>
    );
}

function SphereShape({ position, scale, rotationSpeed, color, emissive }: {
    position: [number, number, number];
    scale: number;
    rotationSpeed: number;
    color: string;
    emissive: string;
}) {
    const ref = useRef<THREE.Mesh>(null);

    useFrame((state, delta) => {
        if (ref.current) {
            ref.current.rotation.x += delta * rotationSpeed;
            ref.current.rotation.y += delta * rotationSpeed * 0.7;
            ref.current.rotation.z += delta * rotationSpeed * 0.5;
        }
    });

    return (
        <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.8}>
            <mesh ref={ref} position={position} scale={scale}>
                <Sphere args={[1, 32, 32]} />
                <meshStandardMaterial
                    color={color}
                    emissive={emissive}
                    emissiveIntensity={0.4}
                    roughness={0.3}
                    metalness={0.8}
                    side={THREE.FrontSide}
                />
            </mesh>
        </Float>
    );
}

export default function HeroModel() {
    const groupRef = useRef<THREE.Group>(null);
    const lightRef = useRef<THREE.PointLight>(null);

    useFrame((state, delta) => {
        if (groupRef.current) {
            // Subtle overall rotation
            groupRef.current.rotation.y += delta * 0.05;
        }

        // Animate light color/intensity
        if (lightRef.current) {
            const time = state.clock.elapsedTime;
            lightRef.current.intensity = 40 + Math.sin(time * 0.5) * 10;
        }
    });

    return (
        <>
            {/* Ambient light - subtle */}
            <ambientLight intensity={0.2} />
            
            {/* Dynamic point lights with color shifts */}
            <pointLight 
                ref={lightRef}
                position={[10, 5, 10]} 
                intensity={40} 
                color="#C41E3A" 
                distance={50}
                decay={2}
            />
            <pointLight 
                position={[-10, -5, -10]} 
                intensity={30} 
                color="#4a1a6a" 
                distance={50}
                decay={2}
            />
            <pointLight 
                position={[0, 10, -15]} 
                intensity={25} 
                color="#1a1a3a" 
                distance={40}
                decay={2}
            />

            {/* Rim lighting for depth */}
            <spotLight 
                position={[0, 15, 10]} 
                intensity={50} 
                angle={0.6} 
                penumbra={0.5} 
                color="#C41E3A"
                castShadow={false}
            />

            <group ref={groupRef}>
                {/* Background Stars */}
                <Stars 
                    radius={100} 
                    depth={50} 
                    count={4000} 
                    factor={4} 
                    saturation={0} 
                    fade 
                    speed={0.5} 
                />

                {/* Nebula Particle System */}
                <NebulaParticles />

                {/* Main Geometric Shapes - Large, impressive, well-positioned */}
                <DodecahedronShape
                    position={[-4, 2, -8]}
                    scale={2.5}
                    rotationSpeed={0.15}
                    color="#C41E3A"
                    emissive="#C41E3A"
                />

                <TorusKnotShape
                    position={[5, -1, -12]}
                    scale={1.8}
                    rotationSpeed={0.2}
                    color="#4a1a6a"
                    emissive="#6a2a8a"
                />

                <OctahedronShape
                    position={[0, 4, -10]}
                    scale={1.5}
                    rotationSpeed={0.1}
                    color="#1a1a3a"
                    emissive="#2a2a5a"
                />

                {/* Smaller accent shapes */}
                <SphereShape
                    position={[-7, -3, -6]}
                    scale={0.8}
                    rotationSpeed={0.25}
                    color="#C41E3A"
                    emissive="#C41E3A"
                />

                <DodecahedronShape
                    position={[6, 3, -7]}
                    scale={0.6}
                    rotationSpeed={0.3}
                    color="#4a1a6a"
                    emissive="#6a2a8a"
                />
            </group>
        </>
    );
}
