import React from 'react';
import { motion } from 'framer-motion';
import { Award, BookOpen, Code, Trophy, Users, Globe, Calendar, Laptop, Lightbulb, Cpu, Rocket, Box, Network, BarChart, Sparkles } from 'lucide-react';

const milestones = [
    {
        "year": "2023 - Present",
        "title": "B.Tech in Information Technology",
        "organization": "Birla Vishvakarma Mahavidyalaya (BVM)",
        "description": "Pursuing Bachelor of Technology in Information Technology. Exploring modern web technologies, scalable software systems, AI-driven applications, and immersive interfaces.",
        "icon": BookOpen,
        "type": "Education"
    },
    {
        "year": "2023 - Present",
        "title": "Central Developer Team Member",
        "organization": "Birla Vishvakarma Mahavidyalaya",
        "description": "Working as a developer contributing to various institutional platforms and digital initiatives within the college.",
        "icon": Code,
        "type": "Leadership"
    },
    {
        "year": "2023 - Present",
        "title": "NSS Developer Team Member",
        "organization": "National Service Scheme (BVM Unit)",
        "description": "Contributing to development and maintenance of digital platforms supporting NSS activities and events.",
        "icon": Users,
        "type": "Leadership"
    },
    {
        "year": "2023",
        "title": "Participant - TSMUN Conference",
        "organization": "The Space Model United Nations",
        "description": "Participated in Gujarat's first TSMUN conference organized by TSA BVM in collaboration with IPMUN.",
        "icon": Globe,
        "type": "Event"
    },
    {
        "year": "2024",
        "title": "Redesigned - Rage Coffee Website",
        "organization": "Sheriyans Coding School Hackathon",
        "description": "Redesigned and developed a modern frontend redesign for the Rage Coffee website during the hackathon.",
        "icon": Trophy,
        "type": "Hackathon"
    },
    {
        "year": "2024",
        "title": "Redesigned - Ajay's Website",
        "organization": "Sheriyans Coding School Hackathon",
        "description": "Redesigned and developed a modern website for Ajay's, focusing on responsive design and performance.",
        "icon": Laptop,
        "type": "Project"
    },
    {
        "year": "2024",
        "title": "Contributor - NSS BVM Website",
        "organization": "National Service Scheme",
        "description": "Worked on improving the NSS BVM website with modern UI and functionality enhancements.",
        "icon": Globe,
        "type": "Project"
    },
    {
        "year": "2024",
        "title": "Contributor - UDAAN Website",
        "organization": "Birla Vishvakarma Mahavidyalaya",
        "description": "Contributed to development of the official website for the UDAAN techno-cultural festival.",
        "icon": Code,
        "type": "Project"
    },
    {
        "year": "2024",
        "title": "Participant - Smart India Hackathon",
        "organization": "SIH",
        "description": "Participated in Smart India Hackathon working on innovative technology solutions and we are in the top 6 all over India.",
        "icon": Lightbulb,
        "type": "Hackathon"
    },
    {
        "year": "2024",
        "title": "Participant - CVM Hackathon",
        "organization": "Charotar Vidya Mandal",
        "description": "Worked with team members to develop innovative technical solutions during the CVM Hackathon.",
        "icon": Cpu,
        "type": "Hackathon"
    },
    {
        "year": "2025",
        "title": "Alumni Social Media Platform",
        "organization": "Academic Project",
        "description": "Building a full alumni networking platform with scheduling, manpower planning, graphical risk analysis, and project dashboards.",
        "icon": Network,
        "type": "Project"
    },
    {
        "year": "2025",
        "title": "Participant - Smart India Hackathon",
        "organization": "SIH",
        "description": "Participated in Smart India Hackathon working on innovative technology solutions.",
        "icon": Lightbulb,
        "type": "Hackathon"
    },
];

const typeConfig = {
    Education: { color: "brand-cyan", bg: "rgba(0,245,255,0.08)", border: "rgba(0,245,255,0.25)", glow: "rgba(0,245,255,0.15)" },
    Leadership: { color: "brand-violet", bg: "rgba(139,92,246,0.08)", border: "rgba(139,92,246,0.25)", glow: "rgba(139,92,246,0.15)" },
    Event: { color: "brand-emerald", bg: "rgba(0,255,178,0.08)", border: "rgba(0,255,178,0.25)", glow: "rgba(0,255,178,0.15)" },
    Hackathon: { color: "amber-400", bg: "rgba(251,191,36,0.08)", border: "rgba(251,191,36,0.25)", glow: "rgba(251,191,36,0.15)" },
    Project: { color: "brand-cyan", bg: "rgba(0,245,255,0.05)", border: "rgba(0,245,255,0.15)", glow: "rgba(0,245,255,0.10)" },
};

const typeColorClass = {
    Education: "text-brand-cyan",
    Leadership: "text-brand-violet",
    Event: "text-brand-emerald",
    Hackathon: "text-amber-400",
    Project: "text-brand-cyan",
};

export default function Milestones() {
    return (
        <section id="milestones" className="relative w-full py-32 bg-brand-black overflow-hidden">

            {/* Ambient background glows */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-brand-cyan/5 blur-[150px] rounded-full pointer-events-none"></div>
            <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-brand-violet/5 blur-[150px] rounded-full pointer-events-none"></div>

            <div className="container mx-auto px-6 lg:px-16 max-w-7xl">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mb-24 text-center"
                >
                    <p className="text-brand-cyan font-mono text-sm tracking-[0.3em] uppercase mb-4 opacity-70">Journey &amp; Achievements</p>
                    <h2 className="text-5xl md:text-7xl font-bold font-primary mb-6 tracking-tight">
                        My <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-violet">Milestones</span>
                    </h2>
                    <p className="text-gray-400 max-w-xl mx-auto text-lg leading-relaxed">
                        From academic foundations to national-level hackathons — every step of the journey.
                    </p>
                    {/* Decorative line */}
                    <div className="mt-8 mx-auto w-32 h-[1px] bg-gradient-to-r from-transparent via-brand-cyan to-transparent"></div>
                </motion.div>

                {/* Timeline */}
                <div className="relative">
                    {/* Center vertical line */}
                    <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-brand-cyan/0 via-brand-cyan/30 to-brand-cyan/0 hidden lg:block pointer-events-none"></div>

                    <div className="flex flex-col gap-6">
                        {milestones.map((item, index) => {
                            const cfg = typeConfig[item.type] || typeConfig.Project;
                            const colorClass = typeColorClass[item.type] || "text-brand-cyan";
                            const isLeft = index % 2 === 0;

                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{ duration: 0.7, delay: index * 0.07, ease: [0.25, 0.46, 0.45, 0.94] }}
                                    className={`relative flex items-center gap-8 ${isLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'} flex-row`}
                                >
                                    {/* Card — full width on mobile, half on desktop */}
                                    <div className="relative flex-1 w-full group">
                                        <motion.div
                                            whileHover={{ scale: 1.02, y: -4 }}
                                            transition={{ duration: 0.3 }}
                                            className="relative rounded-2xl p-5 md:p-6 overflow-hidden cursor-default"
                                            style={{
                                                background: `linear-gradient(135deg, ${cfg.bg} 0%, rgba(255,255,255,0.02) 100%)`,
                                                border: `1px solid ${cfg.border}`,
                                            }}
                                        >
                                            {/* Hover glow */}
                                            <div
                                                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                                                style={{ boxShadow: `inset 0 0 40px ${cfg.glow}` }}
                                            ></div>

                                            {/* Top row: year badge + type pill */}
                                            <div className="flex items-center gap-3 mb-4 flex-wrap">
                                                <span className="font-mono text-xs text-white/50 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
                                                    {item.year}
                                                </span>
                                                <span className={`text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full ${colorClass}`}
                                                    style={{ background: cfg.bg, border: `1px solid ${cfg.border}` }}>
                                                    {item.type}
                                                </span>
                                            </div>

                                            {/* Title + org */}
                                            <div className="text-left">
                                                <h3 className="text-lg md:text-2xl font-bold text-white mb-1 leading-snug">
                                                    {item.title}
                                                </h3>
                                                <p className={`text-sm font-medium mb-3 ${colorClass} opacity-80`}>
                                                    {item.organization}
                                                </p>
                                                <p className="text-gray-400 text-sm leading-relaxed">
                                                    {item.description}
                                                </p>
                                            </div>

                                            {/* Decorative corner accent */}
                                            <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none">
                                                <div className="w-full h-full opacity-20"
                                                    style={{ background: `radial-gradient(circle at 100% 0%, ${cfg.glow} 0%, transparent 70%)` }}></div>
                                            </div>
                                        </motion.div>
                                    </div>

                                    {/* Center icon node — desktop only */}
                                    <div className="relative z-10 flex-shrink-0 hidden lg:flex">
                                        <motion.div
                                            whileHover={{ scale: 1.15 }}
                                            transition={{ duration: 0.2 }}
                                            className="w-14 h-14 rounded-2xl flex items-center justify-center relative"
                                            style={{
                                                background: `linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)`,
                                                border: `1px solid ${cfg.border}`,
                                                boxShadow: `0 0 24px ${cfg.glow}`,
                                            }}
                                        >
                                            <item.icon size={22} className={colorClass} />
                                            <div className="absolute inset-[-4px] rounded-2xl animate-pulse opacity-30 pointer-events-none"
                                                style={{ border: `1px solid ${cfg.border}` }}></div>
                                        </motion.div>
                                    </div>

                                    {/* Spacer for opposite side — desktop only */}
                                    <div className="flex-1 hidden lg:block"></div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
