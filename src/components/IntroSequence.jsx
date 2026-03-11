import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial, Float, Environment, Text } from '@react-three/drei';
import * as THREE from 'three';

// --- Particle Background (Optimized) ---
function IntroParticles({ count = 500 }) {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const adjustedCount = isMobile ? 50 : count;
    const points = useRef();

    const particlePositions = React.useMemo(() => {
        const pos = new Float32Array(adjustedCount * 3);
        for (let i = 0; i < count; i++) {
            const distance = Math.random() * 15;
            const theta = THREE.MathUtils.randFloatSpread(360);
            const phi = THREE.MathUtils.randFloatSpread(360);
            pos[i * 3] = distance * Math.sin(theta) * Math.cos(phi);
            pos[i * 3 + 1] = distance * Math.sin(theta) * Math.sin(phi);
            pos[i * 3 + 2] = distance * Math.cos(theta);
        }
        return pos;
    }, [adjustedCount]);

    useFrame((state, delta) => {
        if (points.current) {
            points.current.rotation.y += delta * 0.05;
        }
    });

    return (
        <Points ref={points} positions={particlePositions} stride={3} frustumCulled={false}>
            <PointMaterial transparent color="#00F5FF" size={isMobile ? 0.04 : 0.02} opacity={0.4} depthWrite={false} />
        </Points>
    );
}

// --- Placeholder Avatar & Holographics ---
function AvatarScene({ stage }) {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const group = useRef();
    const { camera } = useThree();

    // Camera animation based on the current sequence stage
    useFrame((state, delta) => {
        if (stage === 1) {
            // Scene 1: Start far back
            camera.position.lerp(new THREE.Vector3(0, 0, isMobile ? 12 : 8), 0.02);
        } else if (stage === 2) {
            // Scene 2: Move slightly closer
            camera.position.lerp(new THREE.Vector3(0, 0, 5), 0.02);
        } else if (stage === 3) {
            // Scene 3: Zoom slowly towards avatar
            camera.position.lerp(new THREE.Vector3(0, 0.5, 3.5), 0.02);
        } else if (stage === 4) {
            // Scene 4: Slight rotation
            camera.position.lerp(new THREE.Vector3(1, 0.5, 3), 0.02);
            camera.lookAt(0, 0, 0);
        }
    });

    return (
        <group ref={group}>
            {/* Lighting: Blue rim light, soft front light */}
            <ambientLight intensity={0.2} />
            <directionalLight position={[0, 2, 5]} intensity={1.5} color="#ffffff" />
            <spotLight position={[-3, 3, -3]} angle={0.5} penumbra={1} intensity={5} color="#00F5FF" /> {/* Left rim */}
            <spotLight position={[3, 3, -3]} angle={0.5} penumbra={1} intensity={5} color="#7C3AED" /> {/* Right rim */}

            {/* Avatar Placeholder - To be replaced with .glb later */}
            <Float speed={isMobile ? 0.8 : 1.5} rotationIntensity={0.2} floatIntensity={0.5}>
                <mesh position={[0, -1, 0]}>
                    <capsuleGeometry args={[0.4, 1, isMobile ? 1 : 2, isMobile ? 2 : 8]} />
                    <meshStandardMaterial color="#0F172A" roughness={0.4} metalness={0.8} />
                </mesh>

                {/* Head placeholder */}
                <mesh position={[0, 0.8, 0]}>
                    <sphereGeometry args={[0.3, isMobile ? 4 : 8, isMobile ? 4 : 8]} />
                    <meshStandardMaterial color="#ffffff" roughness={0.6} metalness={0.1} />
                </mesh>
            </Float>
        </group>
    );
}


// --- Main Intro Component ---
export default function IntroSequence({ onComplete }) {
    const [stage, setStage] = useState(0);

    // Orchestrate the timing
    useEffect(() => {
        // Start empty
        const t0 = setTimeout(() => setStage(1), 500); // Scene 1: 0-2s "The future is not built by chance"
        const t1 = setTimeout(() => setStage(2), 2500); // Scene 2: 2-5s "It is engineered"
        const t2 = setTimeout(() => setStage(3), 5500); // Scene 3: 5-9s "I engineer intelligent digital systems"
        const t3 = setTimeout(() => setStage(4), 9500); // Scene 4: 9-12.5s "Welcome to my systems"
        const t4 = setTimeout(() => onComplete(), 13000); // FADE OUT AND START WEBSITE

        return () => {
            clearTimeout(t0);
            clearTimeout(t1);
            clearTimeout(t2);
            clearTimeout(t3);
            clearTimeout(t4);
        };
    }, [onComplete]);

    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1.5, ease: "easeInOut" } }}
            className="fixed inset-0 z-[999] bg-brand-black flex items-center justify-center overflow-hidden font-primary"
        >
            {/* 3D Background & Avatar */}
            <div className="absolute inset-0">
                <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
                    <color attach="background" args={['#05060A']} />
                    <IntroParticles />
                    {(stage >= 2) && <AvatarScene stage={stage} />}
                    <Environment preset="city" resolution={isMobile ? 64 : 256} />
                </Canvas>
            </div>

            {/* Cinematic Text Overlay Orchestration */}
            <div className="relative z-10 w-full h-full flex flex-col items-center justify-center text-center pointer-events-none">
                <AnimatePresence mode="wait">

                    {/* Scene 1 Text */}
                    {stage === 1 && (
                        <motion.h2
                            key="scene1"
                            initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
                            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                            exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)', transition: { duration: 1 } }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            className="text-3xl md:text-5xl font-light text-white tracking-widest pl-2"
                        >
                            The future is not built by chance.
                        </motion.h2>
                    )}

                    {/* Scene 2 Text */}
                    {stage === 2 && (
                        <motion.h2
                            key="scene2"
                            initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                            exit={{ opacity: 0, y: -20, filter: 'blur(10px)', transition: { duration: 1 } }}
                            transition={{ duration: 1.2, ease: "easeOut" }}
                            className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-white tracking-tight"
                        >
                            It is engineered.
                        </motion.h2>
                    )}

                    {/* Scene 3 Text (Split lines) */}
                    {stage === 3 && (
                        <motion.div
                            key="scene3"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, transition: { duration: 0.8 } }}
                            className="flex flex-col items-center gap-4 mt-40"
                        >
                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1 }}
                                className="text-xl md:text-2xl text-gray-400 font-light"
                            >
                                I don’t just build websites.
                            </motion.p>
                            <motion.h2
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1, delay: 0.8 }}
                                className="text-2xl md:text-4xl font-bold text-white tracking-wide"
                            >
                                I engineer intelligent digital systems.
                            </motion.h2>
                        </motion.div>
                    )}

                    {/* Scene 4 Text */}
                    {stage === 4 && (
                        <motion.h1
                            key="scene4"
                            initial={{ opacity: 0, scale: 1.1, filter: 'blur(20px)' }}
                            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                            exit={{ opacity: 0, scale: 0.9, transition: { duration: 1 } }}
                            transition={{ duration: 2, ease: "easeOut" }}
                            className="text-5xl md:text-7xl font-bold text-white tracking-tighter drop-shadow-[0_0_30px_rgba(0,245,255,0.4)] mt-[30vh]" // Positioned lower so avatar is visible
                        >
                            Welcome to my systems.
                        </motion.h1>
                    )}

                </AnimatePresence>
            </div>

            {/* Skip Button */}
            <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3, duration: 2 }}
                onClick={onComplete}
                className="absolute bottom-10 right-10 text-xs font-mono tracking-widest text-gray-500 hover:text-brand-cyan transition-colors z-50 pointer-events-auto border border-gray-800 rounded-full px-4 py-2 hover:border-brand-cyan/50 backdrop-blur-sm"
            >
                SKIP_SEQUENCE [↵]
            </motion.button>

        </motion.div>
    );
}
