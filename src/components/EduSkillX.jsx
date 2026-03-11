import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Sparkles, Brain, GraduationCap, Link2, TrendingUp } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, desc, delay }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="relative group p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-lg overflow-hidden flex flex-col items-start gap-4 transition-all duration-300"
        >
            {/* Hover glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-brand-cyan/20 to-brand-violet/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"></div>

            {/* Animated top border */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-cyan to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>

            <div className="p-3 rounded-lg bg-white/5 border border-white/10 text-brand-cyan group-hover:text-brand-emerald group-hover:bg-brand-emerald/10 transition-colors duration-300">
                <Icon size={24} />
            </div>

            <div>
                <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
            </div>
        </motion.div>
    );
};

export default function EduSkillX() {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);
    const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [15, 0, -15]);

    return (
        <section id="product" ref={sectionRef} className="relative w-full min-h-screen py-32 bg-brand-black overflow-hidden flex flex-col items-center justify-center">

            {/* Background Decorative Mesh/Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-violet/10 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="container mx-auto px-6 lg:px-12 relative z-10 w-full">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="max-w-2xl"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <span className="h-[1px] w-12 bg-brand-cyan"></span>
                            <span className="text-brand-cyan text-sm tracking-widest font-medium uppercase">Flagship Product</span>
                        </div>
                        <h2 className="text-5xl md:text-7xl font-bold font-primary tracking-tight text-white mb-6">
                            EduSkill<span className="text-brand-violet">X</span>
                        </h2>
                        <p className="text-xl text-gray-400 font-light">
                            An AI-powered immersive learning infrastructure designed to bridge the gap between theoretical knowledge and practical execution.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                        <button className="flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 bg-white/5 backdrop-blur-md hover:bg-white/10 transition-colors">
                            <span>View Live System</span>
                            <Sparkles size={16} className="text-brand-cyan" />
                        </button>
                    </motion.div>
                </div>

                {/* Floating 3D Dashboard Mockup / Image Placeholder */}
                <div className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-2xl md:rounded-[2rem] border border-white/10 bg-[#0F172A]/80 backdrop-blur-xl shadow-2xl overflow-hidden mb-24 flex items-center justify-center perspective-1000">

                    <motion.div
                        className="w-full h-full relative"
                        style={{ y, rotateX }}
                    >
                        {/* Abstract UI representation */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent flex items-center justify-center">
                            <div className="w-[80%] h-[70%] border border-white/5 rounded-xl flex flex-col p-6 gap-6">
                                <div className="w-full flex justify-between">
                                    <div className="w-1/3 h-8 bg-white/5 rounded-md"></div>
                                    <div className="flex gap-4">
                                        <div className="w-8 h-8 rounded-full bg-brand-cyan/20"></div>
                                        <div className="w-8 h-8 rounded-full bg-brand-violet/20"></div>
                                    </div>
                                </div>
                                <div className="flex-1 flex gap-6">
                                    <div className="w-2/3 h-full bg-white/5 rounded-lg border border-white/5 relative overflow-hidden">
                                        {/* Chart / Graph Abstract */}
                                        <div className="absolute bottom-0 left-0 w-full h-[60%] bg-gradient-to-t from-brand-cyan/20 to-transparent clip-path-polygon"></div>
                                    </div>
                                    <div className="w-1/3 h-full flex flex-col gap-4">
                                        <div className="flex-1 bg-white/5 rounded-lg border border-white/5"></div>
                                        <div className="flex-1 bg-white/5 rounded-lg border border-white/5"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 mix-blend-overlay pointer-events-none"></div>
                    </motion.div>

                    {/* Glowing effects around the dashboard */}
                    <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-3/4 h-20 bg-brand-cyan/30 blur-[60px] pointer-events-none"></div>
                </div>

                {/* Intelligence Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <FeatureCard
                        icon={Brain}
                        title="AI Mentor Chat"
                        desc="Context-aware conversational agents providing real-time guidance and code reviews."
                        delay={0.1}
                    />
                    <FeatureCard
                        icon={GraduationCap}
                        title="AR/VR Simulations"
                        desc="Immersive spatial computing environments for complex procedural training."
                        delay={0.2}
                    />
                    <FeatureCard
                        icon={Link2}
                        title="Blockchain Certs"
                        desc="Immutable, verifiable on-chain credentials for skill validation."
                        delay={0.3}
                    />
                    <FeatureCard
                        icon={TrendingUp}
                        title="ML Predictions"
                        desc="Predictive modeling of student performance to proactively adapt learning paths."
                        delay={0.4}
                    />
                </div>

            </div>
        </section>
    );
}
