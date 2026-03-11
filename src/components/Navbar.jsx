import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Menu, X, ArrowUpRight } from 'lucide-react';

const navLinks = [
    { name: 'Story', href: '#story' },
    { name: 'Milestones', href: '#milestones' },
    { name: 'Tech', href: '#tech' },
    { name: 'Vault', href: '#vault' },
    { name: 'Lab', href: '#lab' },
];

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);

            // Intersection logic for active section
            const sections = ['home', 'story', 'milestones', 'tech', 'vault', 'lab', 'contact'];
            const current = sections.find(section => {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    return rect.top <= 100 && rect.bottom >= 100;
                }
                return false;
            });
            if (current) setActiveSection(current);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (e, href) => {
        e.preventDefault();
        const element = document.querySelector(href);
        if (element) {
            const offset = 80;
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = element.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
            setMobileMenuOpen(false);
        }
    };

    return (
        <nav className="fixed top-0 left-0 w-full z-[1000] pointer-events-none p-6">
            <div className="container mx-auto flex justify-between items-center relative gap-4">

                {/* Logo - Floating Glass */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="pointer-events-auto"
                >
                    <a
                        href="#home"
                        onClick={(e) => scrollToSection(e, '#home')}
                        className="group flex items-center gap-3 p-2 pr-6 rounded-2xl bg-[#0F172A]/40 backdrop-blur-2xl border border-white/10 hover:border-brand-cyan/50 transition-all duration-500 shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:shadow-[0_0_30px_rgba(0,245,255,0.2)]"
                    >
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-cyan to-brand-emerald flex items-center justify-center text-brand-black font-bold shadow-lg shadow-brand-cyan/20 group-hover:scale-110 transition-transform">
                            MD
                        </div>
                        <div className="flex flex-col">
                            <span className="text-white font-bold tracking-tight leading-none text-sm uppercase">Meet Dhola</span>
                            <span className="text-[10px] text-brand-cyan font-mono tracking-widest leading-tight uppercase opacity-70">IT Engineer</span>
                        </div>
                    </a>
                </motion.div>

                {/* Main Nav Link Island - Floating Center */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`hidden lg:flex items-center gap-1 p-2 rounded-2xl bg-[#0F172A]/40 backdrop-blur-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)] pointer-events-auto transition-all duration-500 ${isScrolled ? 'px-6' : 'px-4'}`}
                >
                    {navLinks.map((link, i) => (
                        <a
                            key={link.name}
                            href={link.href}
                            onClick={(e) => scrollToSection(e, link.href)}
                            className={`relative px-4 py-2 text-xs font-semibold tracking-widest uppercase transition-all duration-300 group ${activeSection === link.href.substring(1) ? 'text-white' : 'text-gray-400 hover:text-white'
                                }`}
                        >
                            <span className="relative z-10">{link.name}</span>
                            {activeSection === link.href.substring(1) && (
                                <motion.div
                                    layoutId="activeNav"
                                    className="absolute inset-0 bg-white/5 rounded-xl border border-white/10"
                                    initial={false}
                                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                />
                            )}
                            <div className="absolute -bottom-px left-0 w-0 h-px bg-gradient-to-r from-transparent via-brand-cyan to-transparent group-hover:w-full transition-all duration-500"></div>
                        </a>
                    ))}
                </motion.div>

                {/* Action Buttons - Right Side */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-3 pointer-events-auto"
                >
                    {/* Socials - Glass Circles */}
                    <div className="hidden sm:flex items-center gap-2 mr-2">
                        {[
                            { icon: Github, url: 'https://github.com/meetdhola' },
                            { icon: Linkedin, url: 'https://www.linkedin.com/in/meet-dhola-0863a4284' }
                        ].map((social, i) => (
                            <a
                                key={i}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 border border-white/10 text-gray-400 hover:text-brand-cyan hover:bg-brand-cyan/5 hover:border-brand-cyan/30 transition-all duration-300"
                            >
                                <social.icon size={18} />
                            </a>
                        ))}
                    </div>

                    {/* Main CTA - Glowing Button - Hidden on mobile, moved to menu */}
                    <a
                        href="#contact"
                        onClick={(e) => scrollToSection(e, '#contact')}
                        className="hidden lg:flex relative group px-6 py-3 rounded-2xl bg-white text-brand-black font-bold text-xs tracking-widest uppercase overflow-hidden shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all duration-500 hover:scale-105 active:scale-95"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-brand-cyan to-brand-emerald opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-500">
                            Let's Connect <ArrowUpRight size={14} className="group-hover:rotate-45 transition-transform duration-500" />
                        </span>
                    </a>

                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="lg:hidden w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-colors relative z-[1001]"
                    >
                        {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </motion.div>
            </div>

            {/* Immersive Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-brand-black/95 backdrop-blur-3xl lg:hidden flex flex-col pt-32 px-10 pointer-events-auto overflow-y-auto pb-10"
                    >
                        <div className="flex flex-col gap-8 relative z-10">
                            {navLinks.map((link, i) => (
                                <motion.a
                                    key={link.name}
                                    href={link.href}
                                    onClick={(e) => scrollToSection(e, link.href)}
                                    initial={{ opacity: 0, x: -30, rotateX: -45 }}
                                    animate={{
                                        opacity: 1,
                                        x: 0,
                                        rotateX: 0,
                                        transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" }
                                    }}
                                    className="group flex items-end gap-4"
                                >
                                    <span className="text-brand-cyan/30 font-mono text-sm mb-2 group-hover:text-brand-cyan transition-colors">0{i + 1}</span>
                                    <span className="text-4xl sm:text-5xl md:text-7xl font-bold text-white tracking-tighter group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-brand-cyan transition-all duration-300">
                                        {link.name}
                                    </span>
                                </motion.a>
                            ))}

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                                className="mt-12 pt-12 border-t border-white/10"
                            >
                                <div className="flex flex-col gap-6 mt-8">
                                    <div className="flex gap-8">
                                        <a href="https://github.com/meetdhola" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 font-mono text-sm tracking-widest uppercase">
                                            <Github size={18} /> Github
                                        </a>
                                        <a href="https://www.linkedin.com/in/meet-dhola-0863a4284" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 font-mono text-sm tracking-widest uppercase">
                                            <Linkedin size={18} /> LinkedIn
                                        </a>
                                    </div>
                                    <a
                                        href="#contact"
                                        onClick={(e) => scrollToSection(e, '#contact')}
                                        className="w-full py-5 rounded-2xl bg-gradient-to-r from-brand-cyan to-brand-emerald text-brand-black font-bold text-center tracking-widest uppercase shadow-[0_0_30px_rgba(0,245,255,0.3)] touch-none active:scale-95 transition-transform"
                                    >
                                        Let's Connect
                                    </a>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
