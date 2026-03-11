import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Github, ExternalLink } from 'lucide-react';

const projects = [
    {
        title: "Event Management Platform",
        category: "Current Project — Full Stack",
        description: "A full-stack event management system with role-based access (Admin/Manager/User), event creation, approval workflows, QR-based check-in, real-time chat, and a premium dark-mode UI.",
        image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800",
        tags: ["React", "Node.js", "MongoDB", "Express", "JWT", "Tailwind"],
        codelink: "https://github.com/Meetdhola/Event-Management",
        featured: true,
    },
    {
        title: "Alumni Social Media App",
        category: "Full Stack (PHP)",
        description: "Advanced networking platform with social feeds, scheduling, manpower planning, and graph-based risk analysis.",
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800",
        tags: ["PHP", "MySQL", "Graph Analytics", "Project Management"],
        link: "https://github.com/Meetdhola/Alumini-"
    },
    // {
    //     title: "Linked List 3D Visualizer",
    //     category: "Interactive 3D",
    //     description: "A 3D data structure visualization tool built with React and Three.js featuring animated nodes.",
    //     image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=800",
    //     tags: ["React", "Three.js", "Data Structures", "Animation"]
    // },
    {
        title: "Rage Coffee Redesign",
        category: "Hackathon Project",
        description: "Rebuilt and redesigned the Rage Coffee interface during a hackathon for improved UI/UX. Hosted on Vercel.",
        image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=800",
        tags: ["Frontend", "UI/UX", "Vercel", "Vite"],
        codelink: "https://github.com/Meetdhola/-Gathiya-Aur-Code-ReimagineRound1",
        websitelink: "https://ragecoffeereimagine-meetdholas-projects.vercel.app/"
    },
    {
        title: "Ajay's Website",
        category: "Web Development",
        description: "Custom business website built and deployed on Vercel with a focus on premium aesthetics.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
        tags: ["React", "Tailwind", "Vercel"],
        codelink: "https://github.com/Meetdhola/-Gathiya-Aur-Code-ReimagineRound2",
        websitelink: "https://ajaysreimagine-meetdholas-projects.vercel.app/"
    },
    {
        title: "NSS BVM Contribution",
        category: "Community/Web",
        description: "Developer for the National Service Scheme (NSS) unit website at Birla Vishvakarma Mahavidyalaya.",
        image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800",
        tags: ["Community", "Development", "Teamwork"],
        codelink: "https://github.com/nssbvm/NSSBVM23"
    },
    {
        title: "ZRCMS",
        category: "Summer Internship — 2nd Year",
        description: "Built during my 2nd year summer internship. A comprehensive CMS-based system collaborating with a team, focusing on real-world backend development and system architecture.",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800",
        tags: ["CMS", "Internship", "Backend", "Teamwork"],
        codelink: "https://github.com/AgrimaS003/ZRCMS"
    },
];

const ProjectCard = ({ project, index }) => {
    // Normalise: if only `link` is set (old format), treat it as codelink
    const codelink = project.codelink || project.link || null;
    const websitelink = project.websitelink || null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className={`group relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 ${project.featured ? 'md:col-span-2 md:row-span-2' : ''}`}
        >
            {/* Image Container with Parallax Effect */}
            <div className="absolute inset-0 overflow-hidden">
                <div
                    className="w-full h-full bg-cover bg-center transition-transform duration-1000 group-hover:scale-110 opacity-40 group-hover:opacity-60"
                    style={{ backgroundImage: `url(${project.image})` }}
                ></div>
                {/* Dark overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/50 to-transparent"></div>
            </div>

            {/* Content */}
            <div className="relative h-full min-h-[300px] p-8 flex flex-col justify-end">
                <div className="flex justify-between items-end gap-4">
                    <div className="flex-1 min-w-0">
                        <span className="text-brand-cyan text-sm tracking-wider font-medium mb-2 block font-primary">{project.category}</span>
                        <h3 className="text-2xl md:text-3xl font-bold font-primary text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-brand-cyan transition-colors">
                            {project.title}
                        </h3>
                        <p className="text-gray-400 text-sm mt-2 leading-relaxed line-clamp-2">{project.description}</p>
                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mt-3">
                            {project.tags?.map(tag => (
                                <span key={tag} className="text-[10px] font-mono px-2 py-0.5 rounded-full border border-white/10 text-gray-400 bg-white/5">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Link Buttons */}
                    <div className="flex flex-col gap-2 flex-shrink-0 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                        {codelink && (
                            <a
                                href={codelink}
                                target="_blank"
                                rel="noopener noreferrer"
                                title="View Source Code"
                                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center bg-white/5 backdrop-blur-md hover:border-brand-cyan/60 hover:bg-brand-cyan/10 transition-all duration-300"
                            >
                                <Github size={16} className="text-white hover:text-brand-cyan transition-colors" />
                            </a>
                        )}
                        {websitelink && (
                            <a
                                href={websitelink}
                                target="_blank"
                                rel="noopener noreferrer"
                                title="Visit Live Site"
                                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center bg-white/5 backdrop-blur-md hover:border-brand-violet/60 hover:bg-brand-violet/10 transition-all duration-300"
                            >
                                <ExternalLink size={16} className="text-white hover:text-brand-violet transition-colors" />
                            </a>
                        )}
                        {!codelink && !websitelink && (
                            <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center bg-white/5 backdrop-blur-md">
                                <ArrowUpRight size={16} className="text-white" />
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Animated Focus Frame */}
            <div className="absolute inset-0 border-2 border-brand-cyan/0 group-hover:border-brand-cyan/30 rounded-2xl transition-colors duration-500 pointer-events-none"></div>
        </motion.div>
    );
};

export default function ProjectVault() {
    return (
        <section id="vault" className="relative w-full py-32 bg-brand-black z-10 selection:bg-brand-violet selection:text-white">
            <div className="container mx-auto px-6 lg:px-12">

                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-4xl md:text-6xl font-bold font-primary mb-4 tracking-tight">
                            Project <span className="font-light italic text-transparent bg-clip-text bg-gradient-to-r from-brand-violet to-brand-cyan">Vault</span>
                        </h2>
                        <p className="text-gray-400 max-w-xl text-lg font-light">
                            A curated selection of high-performance technical architectures.
                        </p>
                    </motion.div>

                    <motion.button
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="group flex items-center gap-2 text-white hover:text-brand-cyan transition-colors font-medium border-b border-white/20 hover:border-brand-cyan pb-1"
                    >
                        <span>View Full Archive</span>
                        <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </motion.button>
                </div>

                {/* CSS Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[300px]">
                    {projects.map((project, index) => (
                        <ProjectCard key={project.title} project={project} index={index} />
                    ))}
                </div>

            </div>
        </section>
    );
}
