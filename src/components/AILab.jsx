import React from 'react';
import { motion } from 'framer-motion';
import DigitalDNA from './DigitalDNA';

// Neural network background simulation
const NeuralGrid = ({ isMobile }) => {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
            {!isMobile && <DigitalDNA />}
            <div
                className="w-full h-full bg-[linear-gradient(rgba(0,245,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,245,255,0.1)_1px,transparent_1px)]"
                style={{ backgroundSize: '40px 40px' }}
            ></div>
            {/* Animated nodes and connections (abstracted via CSS gradients and movement) */}
            {!isMobile && (
                <>
                    <motion.div
                        animate={{
                            y: [0, -20, 0],
                            opacity: [0.3, 0.6, 0.3]
                        }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-1/4 left-1/4 w-32 h-32 bg-brand-cyan/20 rounded-full blur-[40px]"
                    />
                    <motion.div
                        animate={{
                            x: [0, 30, 0],
                            opacity: [0.2, 0.5, 0.2]
                        }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                        className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-brand-violet/20 rounded-full blur-[60px]"
                    />
                </>
            )}
        </div>
    )
}

const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
}

export default function AILab() {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

    return (
        <section id="lab" className="relative w-full min-h-screen py-32 bg-[#05060A] overflow-hidden flex flex-col items-center justify-center">

            <NeuralGrid isMobile={isMobile} />

            {/* Main Core Viewport */}
            <div className="container mx-auto px-6 relative z-10 text-center">

                <div className="mb-16 inline-flex border border-white/10 rounded-full px-4 py-2 bg-white/5 backdrop-blur-md">
                    <span className="text-brand-violet text-sm tracking-widest font-bold uppercase flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-brand-violet animate-pulse"></span>
                        The AI Lab
                    </span>
                </div>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={{
                        visible: { transition: { staggerChildren: 0.3 } }
                    }}
                    className="flex flex-col items-center gap-6"
                >
                    <motion.h2 variants={textVariants} className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight text-white/50">
                        Exploring <span className="font-bold text-white">AI/ML Integration.</span>
                    </motion.h2>

                    <motion.h2 variants={textVariants} className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight text-white/50">
                        Designing <span className="font-bold text-white">AR/VR Experiences.</span>
                    </motion.h2>

                    <motion.h2 variants={textVariants} className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight text-white/50">
                        Building <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-emerald">Blockchain Distributed Systems.</span>
                    </motion.h2>
                </motion.div>

                {/* Abstract Data Flow visualization */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 1 }}
                    className="mt-24 w-full h-[1px] bg-white/10 relative"
                >
                    {/* Moving data packets - Disabled on mobile */}
                    {!isMobile && (
                        <>
                            <motion.div
                                className="absolute top-1/2 left-0 w-24 h-1 bg-gradient-to-r from-transparent via-brand-cyan to-transparent -translate-y-1/2"
                                animate={{ left: ['-10%', '110%'] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                            ></motion.div>
                            <motion.div
                                className="absolute top-1/2 left-0 w-16 h-[2px] bg-gradient-to-r from-transparent via-brand-violet to-transparent -translate-y-1/2"
                                animate={{ left: ['-10%', '110%'] }}
                                transition={{ duration: 2.5, repeat: Infinity, ease: "linear", delay: 1.5 }}
                            ></motion.div>
                        </>
                    )}
                </motion.div>

            </div>
        </section>
    );
}
