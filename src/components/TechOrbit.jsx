import React, { useRef, useState, useMemo } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useInView } from 'framer-motion';

const skills = [
    { name: 'MERN Stack', color: '#61DAFB', level: 'E9' },
    { name: 'React.js', color: '#61DAFB', level: 'F2' },
    { name: 'Node.js', color: '#339933', level: 'A4' },
    { name: 'Express.js', color: '#ffffff', level: 'C1' },
    { name: 'MongoDB', color: '#47A248', level: 'D7' },
    { name: 'HTML5', color: '#E34F26', level: 'H1' },
    { name: 'CSS3', color: '#1572B6', level: 'C3' },
    { name: 'JavaScript', color: '#F7DF1E', level: 'J5' },
    { name: 'Tailwind', color: '#06B6D4', level: '82' },
    { name: 'GSAP', color: '#88CE02', level: '77' },
    { name: 'Three.js', color: '#ffffff', level: 'B0' },
    { name: 'AI/ML', color: '#FF5733', level: 'A1' },
    { name: 'AR/VR', color: '#9D00FF', level: 'V8' },
    { name: 'Blockchain', color: '#FFD700', level: 'B2' }
];

// --- Sub-components for the Superior Upgrade ---

const EnergyConduit = ({ radius, speed = 20, active = false }) => (
    <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible" style={{ opacity: active ? 0.4 : 0.1 }}>
        <circle
            cx="50%"
            cy="50%"
            r={radius}
            fill="none"
            stroke="url(#energyGradient)"
            strokeWidth="1"
            strokeDasharray="10 20"
            className="transition-all duration-700"
        >
            <animate
                attributeName="stroke-dashoffset"
                from="0"
                to="100"
                dur={`${speed}s`}
                repeatCount="indefinite"
            />
        </circle>
        <defs>
            <linearGradient id="energyGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#00F5FF" />
                <stop offset="50%" stopColor="#8A2BE2" />
                <stop offset="100%" stopColor="#00F5FF" />
            </linearGradient>
        </defs>
    </svg>
);

const ReactorCore = ({ rotate }) => (
    <div className="relative w-48 h-48 md:w-64 md:h-64 flex items-center justify-center">
        {/* Outer Ring */}
        <motion.div
            style={{ rotate }}
            className="absolute inset-0 border border-brand-cyan/20 rounded-full border-dashed"
        />
        {/* Middle Ring - Counter Rotating */}
        <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute inset-8 border-2 border-brand-violet/20 rounded-full border-t-brand-violet/40"
        />
        {/* Inner Hub */}
        <div className="absolute inset-16 rounded-full bg-brand-black border border-brand-cyan/40 shadow-[0_0_40px_rgba(0,245,255,0.2)] flex flex-col items-center justify-center backdrop-blur-xl z-10">
            <div className="text-[12px] font-mono text-brand-cyan/60 mb-1 tracking-widest">Tech Stack</div>
            {/* <div className="w-12 h-12 rounded-full border-2 border-t-brand-cyan border-r-transparent border-b-transparent border-l-transparent animate-spin" /> */}
            {/* <div className="mt-2 flex gap-1"> */}
            {/* <div className="w-1 h-1 rounded-full bg-brand-cyan animate-pulse" />
                <div className="w-1 h-1 rounded-full bg-brand-cyan animate-pulse delay-75" />
                <div className="w-1 h-1 rounded-full bg-brand-cyan animate-pulse delay-150" /> */}
            {/* </div> */}
        </div>
        {/* Global Glow */}
        <div className="absolute inset-0 bg-brand-cyan/5 rounded-full blur-[100px] animate-pulse" />
    </div>
);

const DataPacket = ({ skillColor }) => (
    <motion.div
        initial={{ x: 0, opacity: 0 }}
        animate={{
            x: -150,
            opacity: [0, 1, 0],
            scale: [1, 0.5, 0]
        }}
        transition={{
            duration: 0.8,
            repeat: Infinity,
            repeatDelay: Math.random() * 0.5,
            ease: "circIn"
        }}
        className="absolute right-full w-2 h-2 rounded-full blur-[2px]"
        style={{ backgroundColor: skillColor }}
    />
);

export default function TechOrbit() {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const containerRef = useRef(null);
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const isInView = useInView(containerRef, { amount: 0.1 });
    const coreRotate = useTransform(scrollYProgress, [0, 1], [0, 720]);

    return (
        <section
            id="tech"
            ref={containerRef}
            className="relative w-full min-h-screen py-32 bg-brand-black overflow-hidden flex flex-col items-center justify-center"
        >

            {/* Parallax Starfield Background - Disabled on mobile */}
            {!isMobile && (
                <div className="absolute inset-0 z-0">
                    {Array.from({ length: 50 }).map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-0.5 h-0.5 bg-white rounded-full opacity-20"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                            }}
                            animate={{
                                opacity: [0.1, 0.4, 0.1],
                                scale: [1, 1.5, 1]
                            }}
                            transition={{
                                duration: 3 + Math.random() * 4,
                                repeat: Infinity,
                            }}
                        />
                    ))}
                </div>
            )}

            <div className="container mx-auto px-6 relative z-10 w-full flex flex-col items-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <div className="mb-4 inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-cyan/20 bg-brand-cyan/5 backdrop-blur-sm shadow-[0_0_15px_rgba(0,245,255,0.1)]">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-ping text-[10px]" />
                        <span className="text-[10px] font-mono tracking-widest text-brand-cyan uppercase">Neural Network Online</span>
                    </div>
                    <h2 className="text-5xl md:text-8xl font-bold font-primary mb-6 tracking-tight text-white leading-none">
                        Tech <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-violet">Stack</span>
                    </h2>
                </motion.div>

                {/* The Superior Orbiting System */}
                <div className="relative w-[300px] h-[300px] md:w-[800px] md:h-[800px] flex items-center justify-center mt-[-50px]">

                    {/* Concentric Energy Conduits - Disabled on mobile to save battery */}
                    {!isMobile && (
                        <>
                            <EnergyConduit radius="25%" speed={15} active={hoveredIndex !== null} />
                            <EnergyConduit radius="35%" speed={25} active={hoveredIndex !== null} />
                            <EnergyConduit radius="48%" speed={35} active={hoveredIndex !== null} />
                        </>
                    )}

                    {/* Reactor Core */}
                    <ReactorCore rotate={coreRotate} />

                    {/* Orbiting Tech Nodes */}
                    {skills.map((skill, index) => {
                        const conduits = [0.25, 0.35, 0.48];
                        const desktopRadius = 800 * conduits[index % conduits.length];
                        const mobileRadius = 300 * conduits[index % conduits.length] + (index % 2 * 10);
                        const radius = isMobile ? mobileRadius : desktopRadius;

                        // Initial angle offset so they are distributed
                        const startAngle = (index / skills.length) * 2 * Math.PI;
                        const duration = 25 + (index % 3) * 10;
                        const direction = index % 2 === 0 ? 1 : -1;

                        // Create circular keyframes for X and Y
                        const steps = 60;
                        const xKeyframes = Array.from({ length: steps + 1 }).map((_, i) =>
                            Math.cos(startAngle + (i / steps) * 2 * Math.PI * direction) * radius
                        );
                        const yKeyframes = Array.from({ length: steps + 1 }).map((_, i) =>
                            Math.sin(startAngle + (i / steps) * 2 * Math.PI * direction) * radius
                        );

                        return (
                            <motion.div
                                key={skill.name}
                                className="absolute top-1/2 left-1/2 pointer-events-auto"
                                style={{
                                    translateX: "-50%",
                                    translateY: "-50%"
                                }}
                                animate={isInView && !isMobile ? {
                                    x: xKeyframes,
                                    y: yKeyframes,
                                    scale: [0.9, 1.1, 0.9],
                                    opacity: [0.8, 1, 0.8]
                                } : { x: xKeyframes[0], y: yKeyframes[0] }}
                                transition={!isMobile ? {
                                    x: { duration, repeat: Infinity, ease: "linear" },
                                    y: { duration, repeat: Infinity, ease: "linear" },
                                    scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                                    opacity: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                                } : {}}
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                            >
                                <div className="relative flex items-center group cursor-crosshair">

                                    {/* HUD Brackets On Hover */}
                                    <AnimatePresence>
                                        {hoveredIndex === index && (
                                            <>
                                                <motion.div
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: -10 }}
                                                    className="absolute -left-4 text-brand-cyan font-mono text-xl"
                                                >[</motion.div>
                                                <motion.div
                                                    initial={{ opacity: 0, x: 10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: 10 }}
                                                    className="absolute -right-4 text-brand-cyan font-mono text-xl"
                                                >]</motion.div>
                                                {/* Data Packets - Disabled on mobile for performance */}
                                                {!isMobile && (
                                                    <>
                                                        <DataPacket skillColor={skill.color} />
                                                        <DataPacket skillColor={skill.color} />
                                                    </>
                                                )}
                                            </>
                                        )}
                                    </AnimatePresence>

                                    {/* The Node */}
                                    <div className="px-6 py-3 rounded-sm border border-white/5 bg-brand-black/40 backdrop-blur-md flex items-center group-hover:border-brand-cyan/50 transition-all duration-300 group-hover:bg-brand-cyan/5">
                                        <div
                                            className="w-2 h-2 rounded-full mr-3 shadow-[0_0_10px_currentColor]"
                                            style={{ color: skill.color, backgroundColor: skill.color }}
                                        />
                                        <div className="flex flex-col">
                                            <span className="text-white text-xs font-mono group-hover:text-brand-cyan">{skill.name}</span>
                                            <span className="text-[8px] text-gray-500 font-mono tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity">
                                                ADDR: 0x{skill.level}F2
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* Bottom Status Bar */}
            <div className="absolute bottom-12 w-full flex justify-center px-10 pointer-events-none">
                <div className="flex gap-8 text-[9px] font-mono text-gray-600 uppercase tracking-widest border-t border-white/5 pt-4 w-full max-w-4xl justify-center">
                    <div className="flex items-center gap-2"><span className="w-1 h-1 bg-brand-cyan rounded-full animate-pulse" />Core State: STABLE</div>
                    <div className="flex items-center gap-2"><span className="w-1 h-1 bg-brand-violet rounded-full animate-pulse" />Sync: ACTIVE</div>
                    <div className="flex items-center gap-2"><span className="w-1 h-1 bg-gray-500 rounded-full animate-pulse" />Protocol: RENDER_OS</div>
                </div>
            </div>
        </section >
    );
}
