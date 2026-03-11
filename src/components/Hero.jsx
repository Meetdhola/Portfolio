import React, { useRef, useMemo, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, Points, PointMaterial, MeshTransmissionMaterial, ContactShadows, Environment } from '@react-three/drei'
import * as THREE from 'three'
import { motion } from 'framer-motion'
import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing'

// Advanced starfield particle system
function ParticleSystem({ count = 800, isMobile = false }) {
    const adjustedCount = isMobile ? 20 : count;
    const points = useRef()

    // Generate random points in a sphere
    const particlesPosition = useMemo(() => {
        const positions = new Float32Array(count * 3)
        for (let i = 0; i < count; i++) {
            const distance = Math.random() * 12 + 3
            const theta = THREE.MathUtils.randFloatSpread(360)
            const phi = THREE.MathUtils.randFloatSpread(360)

            let x = distance * Math.sin(theta) * Math.cos(phi)
            let y = distance * Math.sin(theta) * Math.sin(phi)
            let z = distance * Math.cos(theta)

            positions[i * 3] = x
            positions[i * 3 + 1] = y
            positions[i * 3 + 2] = z
        }
        return positions
    }, [adjustedCount])

    useFrame((state, delta) => {
        if (points.current) {
            points.current.rotation.x -= delta / 20
            points.current.rotation.y -= delta / 30
        }
    })

    return (
        <Points ref={points} positions={particlesPosition} stride={3} frustumCulled={false}>
            <PointMaterial transparent color="#00F5FF" size={isMobile ? 0.03 : 0.015} sizeAttenuation={true} depthWrite={false} opacity={0.6} />
        </Points>
    )
}

// A high-end glass-like animated torus knot
function CoreStructure({ isMobile = false }) {
    const mesh = useRef()

    useFrame((state, delta) => {
        if (mesh.current) {
            mesh.current.rotation.x += delta * 0.15
            mesh.current.rotation.y += delta * 0.2
            mesh.current.rotation.z += delta * 0.1
        }
    })

    return (
        <Float speed={isMobile ? 1 : 2} rotationIntensity={isMobile ? 0.5 : 1} floatIntensity={isMobile ? 1 : 2}>
            <mesh ref={mesh} scale={isMobile ? 0.8 : 1.2}>
                <torusKnotGeometry args={[1, 0.3, isMobile ? 32 : 64, isMobile ? 8 : 16]} />
                {/* Advanced thick glass material for premium look */}
                {isMobile ? (
                    <meshStandardMaterial
                        color="#bcf2f4ff"
                        emissive="#bcf2f4ff"
                        emissiveIntensity={0.5}
                        roughness={0.1}
                        metalness={0.9}
                    />
                ) : (
                    <MeshTransmissionMaterial
                        backside
                        samples={4}
                        resolution={128}
                        transmission={1}
                        roughness={0.1}
                        thickness={0.5}
                        ior={1.5}
                        chromaticAberration={0.05}
                        anisotropy={0.1}
                        distortion={0.1}
                        distortionScale={0.1}
                        temporalDistortion={0}
                        color="#bcf2f4ff"
                        attenuationDistance={0.5}
                        attenuationColor="#bcf2f4ff"
                    />
                )}
            </mesh>

            {/* Glowing inner core - Removed purple ball */}
            {/* <mesh scale={0.8}>
                <icosahedronGeometry args={[1, 2]} />
                <meshBasicMaterial color="#00F5FF" wireframe={true} transparent opacity={0.1} />
            </mesh> */}
        </Float>
    )
}

// Camera parallax effect based on mouse movement
function Rig() {
    const { camera, mouse } = useThree()
    const vec = new THREE.Vector3()

    return useFrame(() => {
        camera.position.lerp(vec.set(mouse.x * 1.5, mouse.y * 1.5, camera.position.z), 0.05)
        camera.lookAt(0, 0, 0)
    })
}

export default function Hero() {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            const offset = 80; // Account for navbar height
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = element.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    return (
        <section id="home" className="relative w-full h-screen overflow-hidden flex items-center justify-center">

            {/* 3D Background */}
            <div className="absolute inset-0 z-0">
                <React.Suspense fallback={<div className="w-full h-full flex items-center justify-center text-brand-cyan/50 animate-pulse font-mono tracking-widest text-sm">INITIALIZING_WEBGL_CONTEXT...</div>}>
                    <Canvas camera={{ position: [0, 0, 7], fov: 50 }} dpr={[1, 2]}>
                        <color attach="background" args={['#020408']} />

                        {/* Lighting - Removed purple light */}
                        <ambientLight intensity={0.2} />
                        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} color="#00F5FF" />
                        <spotLight position={[-10, -10, -10]} angle={0.15} penumbra={1} intensity={1} color="#00FFB2" />

                        {/* Scene Objects */}
                        <ParticleSystem isMobile={isMobile} />
                        <CoreStructure isMobile={isMobile} />
                        {!isMobile && <Rig />}

                        {/* Environment for reflections */}
                        <Environment preset="city" resolution={isMobile ? 64 : 128} />

                        {/* High-end post processing pipeline - Disabled on mobile to prevent overheating */}
                        {!isMobile && (
                            <EffectComposer disableNormalPass multisampling={0}>
                                <Bloom luminanceThreshold={1} mipmapBlur intensity={0.5} />
                                <Noise opacity={0.02} />
                                <Vignette eskil={false} offset={0.1} darkness={1.1} />
                            </EffectComposer>
                        )}

                    </Canvas>
                </React.Suspense>
            </div>

            {/* Hero Content */}
            <div className="relative z-10 container mx-auto px-6 lg:px-12 flex flex-col items-center text-center mt-20 pointer-events-none">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="mb-8 flex flex-col items-center"
                >
                    <div className="px-5 py-2 rounded-full border border-brand-cyan/20 bg-[#0F172A]/40 backdrop-blur-xl mb-8 flex items-center shadow-[0_0_30px_rgba(0,245,255,0.15)] pointer-events-auto">
                        <span className="w-2 h-2 rounded-full bg-brand-cyan animate-pulse mr-3 shadow-[0_0_10px_rgba(0,245,255,0.8)]"></span>
                        <span className="text-xs md:text-sm text-brand-cyan font-semibold tracking-[0.2em] uppercase font-mono">System Online</span>
                    </div>

                    <h1 className="text-6xl md:text-8xl lg:text-[7rem] font-bold font-primary mb-6 leading-[1.1] tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white/90 to-white/40 drop-shadow-2xl">
                        Engineering <br className="hidden md:block" /> Intelligent
                        <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan via-brand-cyan to-brand-emerald relative inline-block mt-2">
                            Ecosystems.
                            {/* Text Glow */}
                            <div className="absolute inset-0 bg-gradient-to-r from-brand-cyan to-brand-emerald blur-[80px] opacity-30 -z-10 w-full h-full"></div>
                        </span>
                    </h1>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="text-lg md:text-2xl text-gray-300 max-w-3xl mb-14 font-light tracking-wide drop-shadow-md"
                >
                    AI <span className="text-brand-cyan mx-3 font-bold">•</span> MERN Stack <span className="text-brand-emerald mx-3 font-bold">•</span> Immersive Graphics
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
                    className="flex flex-col sm:flex-row gap-6 pointer-events-auto"
                >
                    <button
                        onClick={() => scrollToSection('story')}
                        className="group relative px-10 py-5 rounded-xl bg-white text-brand-black font-bold tracking-widest uppercase overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.2)]"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-brand-cyan to-brand-emerald opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <span className="relative z-10 group-hover:text-white transition-colors duration-300">Enter My Systems</span>
                    </button>

                    {/* <button
                        onClick={() => scrollToSection('product')}
                        className="px-10 py-5 rounded-xl border border-white/20 text-white backdrop-blur-md font-semibold tracking-widest uppercase transition-all hover:bg-white/10 hover:border-white/40 duration-300 shadow-xl"
                    >
                        Explore Flagship Product
                    </button> */}
                </motion.div>
            </div>

            {/* Vignette Overlay for cinematic feel */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#020408_150%)] z-10 pointer-events-none"></div>

        </section>
    )
}
