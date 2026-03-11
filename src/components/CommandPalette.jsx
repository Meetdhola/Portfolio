import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Terminal, Home, User, Briefcase, Code, Mail } from 'lucide-react';

export default function CommandPalette() {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const inputRef = useRef(null);

    const [selectedIndex, setSelectedIndex] = useState(0);
    const listRef = useRef(null);

    const scrollToSection = (id) => {
        const sections = {
            hero: 0,
            about: 'Meet Dhola',
            tech: 'Full Stack',
            projects: 'The Engineering',
            contact: 'Transmission'
        };

        if (id === 'hero') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        const targetText = sections[id];
        const el = Array.from(document.querySelectorAll('h2, h1, p')).find(
            h => h.textContent.toLowerCase().includes(targetText.toLowerCase())
        );

        if (el) {
            const yOffset = -100;
            const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    };

    const commands = [
        { id: 'hero', name: 'Initialize System (Home)', icon: Home, action: () => scrollToSection('hero') },
        { id: 'about', name: 'Founder Profile', icon: User, action: () => scrollToSection('about') },
        { id: 'tech', name: 'Tech Orbit (Skills)', icon: Code, action: () => scrollToSection('tech') },
        { id: 'projects', name: 'Project Vault', icon: Briefcase, action: () => scrollToSection('projects') },
        { id: 'contact', name: 'Transmit Message', icon: Mail, action: () => scrollToSection('contact') },
    ];

    const filteredCommands = commands.filter(cmd =>
        cmd.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSelect = (action) => {
        action();
        setIsOpen(false);
        setSearchQuery('');
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setIsOpen((prev) => !prev);
            }
            if (e.key === 'Escape') {
                setIsOpen(false);
            }

            if (isOpen) {
                if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    setSelectedIndex((prev) => (prev + 1) % filteredCommands.length);
                }
                if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length);
                }
                if (e.key === 'Enter') {
                    e.preventDefault();
                    if (filteredCommands[selectedIndex]) {
                        handleSelect(filteredCommands[selectedIndex].action);
                    }
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, filteredCommands, selectedIndex]);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
            setSelectedIndex(0);
        }
    }, [isOpen]);

    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-brand-black/90 backdrop-blur-md z-[1000]"
                        />

                        {/* Palette Modal */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.98, y: -20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.98, y: -20 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className="fixed top-[15%] left-1/2 -translate-x-1/2 w-[95%] max-w-xl bg-[#0A0C10] border border-white/10 rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.5)] z-[1001] overflow-hidden"
                        >
                            {/* Header / Input */}
                            <div className="flex items-center px-5 border-b border-white/10 bg-white/5">
                                <Search className="text-brand-cyan/50 mr-4" size={20} />
                                <input
                                    ref={inputRef}
                                    type="text"
                                    placeholder="Execute command..."
                                    className="w-full bg-transparent text-white py-5 outline-none placeholder-gray-600 text-lg font-primary"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <div className="hidden sm:flex items-center gap-1.5">
                                    <kbd className="text-[10px] text-gray-500 font-mono border border-white/10 rounded px-1.5 py-0.5 bg-brand-black">ESC</kbd>
                                </div>
                            </div>

                            {/* Command List */}
                            <div ref={listRef} className="max-h-[50vh] overflow-y-auto p-2 scrollbar-none">
                                {filteredCommands.length > 0 ? (
                                    filteredCommands.map((cmd, index) => (
                                        <button
                                            key={cmd.id}
                                            onClick={() => handleSelect(cmd.action)}
                                            onMouseEnter={() => setSelectedIndex(index)}
                                            className={`w-full text-left flex items-center px-4 py-3.5 rounded-lg transition-all duration-200 group ${selectedIndex === index
                                                ? 'bg-brand-cyan/10 border-l-2 border-brand-cyan'
                                                : 'bg-transparent border-l-2 border-transparent hover:bg-white/5'
                                                }`}
                                        >
                                            <cmd.icon
                                                className={`mr-4 transition-colors ${selectedIndex === index ? 'text-brand-cyan' : 'text-gray-500'}`}
                                                size={18}
                                            />
                                            <div className="flex flex-col">
                                                <span className={`font-medium tracking-tight ${selectedIndex === index ? 'text-white' : 'text-gray-400'}`}>
                                                    {cmd.name}
                                                </span>
                                            </div>
                                            {selectedIndex === index && (
                                                <motion.span
                                                    layoutId="enter"
                                                    className="ml-auto text-[10px] font-mono text-brand-cyan opacity-50"
                                                >
                                                    ENTER ↵
                                                </motion.span>
                                            )}
                                        </button>
                                    ))
                                ) : (
                                    <div className="py-12 text-center text-gray-600 flex flex-col items-center">
                                        <Terminal size={32} className="mb-3 opacity-20" />
                                        <p className="text-sm font-mono tracking-widest uppercase opacity-50">System: Command Not Found</p>
                                    </div>
                                )}
                            </div>

                            {/* Footer */}
                            <div className="px-4 py-2 border-t border-white/5 bg-brand-black/30 flex justify-between items-center text-xs text-gray-500">
                                <div className="flex gap-4">
                                    <span className="flex items-center gap-1"><kbd className="font-mono bg-white/5 px-1 rounded">↑↓</kbd> to navigate</span>
                                    <span className="flex items-center gap-1"><kbd className="font-mono bg-white/5 px-1 rounded">↵</kbd> to select</span>
                                </div>
                                <span>Founder OS</span>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Persistent Toggle Button */}
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 w-12 h-12 bg-white/5 border border-white/10 rounded-full flex flex-col items-center justify-center text-gray-400 hover:text-brand-cyan hover:border-brand-cyan/50 backdrop-blur-md z-40 shadow-lg group transition-all"
                title="Command Palette (⌘K)"
            >
                <Terminal size={20} className="group-hover:scale-110 transition-transform" />
                <span className="text-[9px] font-mono mt-0.5 opacity-50 group-hover:opacity-100">⌘K</span>
            </button>
        </>
    );
}
