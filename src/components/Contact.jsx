import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Mail, Send, Terminal } from 'lucide-react';

const socialLinks = [
    { name: 'LinkedIn', icon: Linkedin, url: 'https://www.linkedin.com/in/meet-dhola-0863a4284', color: 'hover:text-[#0077b5] hover:border-[#0077b5]/50 hover:bg-[#0077b5]/10' },
    { name: 'GitHub', icon: Github, url: 'https://github.com/Meetdhola', color: 'hover:text-white hover:border-white/50 hover:bg-white/10' },
    { name: 'Twitter / X', icon: Twitter, url: '#', color: 'hover:text-[#1DA1F2] hover:border-[#1DA1F2]/50 hover:bg-[#1DA1F2]/10' },
    { name: 'Email', icon: Mail, url: 'mailto:meetdhol28@gmail.com', color: 'hover:text-brand-emerald hover:border-brand-emerald/50 hover:bg-brand-emerald/10' },
];

export default function Contact() {
    const [formState, setFormState] = useState({ name: '', email: '', message: '' });
    const [isFocused, setIsFocused] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate sending
        console.log("Transmission sent:", formState);
    };

    return (
        <section id="contact" className="relative w-full min-h-screen py-32 bg-brand-black overflow-hidden flex flex-col items-center justify-center -mt-16">

            {/* Abstract Background Elements */}
            <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[500px] bg-brand-cyan/5 rounded-[100%] blur-[120px] pointer-events-none transform -rotate-12"></div>

            <div className="container mx-auto px-6 relative z-10 max-w-5xl">

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Left Side: Copy & Socials */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="flex items-center gap-3 mb-6 text-brand-cyan">
                            <Terminal size={20} />
                            <span className="text-sm tracking-widest font-mono uppercase">System_Communication</span>
                        </div>

                        <h2 className="text-5xl md:text-7xl font-bold font-primary mb-6 tracking-tight text-white">
                            Let's Build <br /> The <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-violet">Future.</span>
                        </h2>

                        <p className="text-gray-400 text-lg font-light mb-12 max-w-md">
                            Looking for a founder-level engineer to architect your next digital ecosystem? Initialize contact sequences below.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            {socialLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.url}
                                    className={`flex items-center justify-center w-14 h-14 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-gray-400 transition-all duration-300 ${link.color}`}
                                    aria-label={link.name}
                                >
                                    <link.icon size={22} />
                                </a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right Side: Premium Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <form
                            onSubmit={handleSubmit}
                            className="relative p-8 rounded-3xl bg-[#0F172A]/40 border border-white/10 backdrop-blur-xl shadow-2xl overflow-hidden"
                        >
                            {/* Animated Neon Focus Glow within form */}
                            <div
                                className={`absolute -inset-1 bg-gradient-to-r from-brand-cyan/20 to-brand-violet/20 blur-xl opacity-0 transition-opacity duration-500 pointer-events-none ${isFocused ? 'opacity-100' : ''}`}
                            ></div>

                            <div className="relative z-10 space-y-6">
                                <div className="relative group">
                                    <input
                                        type="text"
                                        id="name"
                                        required
                                        className="w-full bg-brand-black/50 border border-white/10 rounded-xl px-5 py-4 text-white outline-none focus:border-brand-cyan/50 focus:ring-1 focus:ring-brand-cyan/50 transition-all peer placeholder-transparent"
                                        placeholder="Name"
                                        value={formState.name}
                                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                        onFocus={() => setIsFocused('name')}
                                        onBlur={() => setIsFocused(null)}
                                    />
                                    <label
                                        htmlFor="name"
                                        className="absolute left-5 top-4 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-brand-cyan peer-focus:bg-[#0F172A] peer-focus:px-2 peer-valid:-top-2.5 peer-valid:text-xs peer-valid:bg-[#0F172A] peer-valid:px-2"
                                    >
                                        IDENTITY_ID (Name)
                                    </label>
                                </div>

                                <div className="relative group">
                                    <input
                                        type="email"
                                        id="email"
                                        required
                                        className="w-full bg-brand-black/50 border border-white/10 rounded-xl px-5 py-4 text-white outline-none focus:border-brand-violet/50 focus:ring-1 focus:ring-brand-violet/50 transition-all peer placeholder-transparent"
                                        placeholder="Email"
                                        value={formState.email}
                                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                                        onFocus={() => setIsFocused('email')}
                                        onBlur={() => setIsFocused(null)}
                                    />
                                    <label
                                        htmlFor="email"
                                        className="absolute left-5 top-4 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-brand-violet peer-focus:bg-[#0F172A] peer-focus:px-2 peer-valid:-top-2.5 peer-valid:text-xs peer-valid:bg-[#0F172A] peer-valid:px-2"
                                    >
                                        RETURN_ADDRESS (Email)
                                    </label>
                                </div>

                                <div className="relative group">
                                    <textarea
                                        id="message"
                                        required
                                        rows={4}
                                        className="w-full bg-brand-black/50 border border-white/10 rounded-xl px-5 py-4 text-white outline-none focus:border-brand-emerald/50 focus:ring-1 focus:ring-brand-emerald/50 transition-all peer placeholder-transparent resize-none"
                                        placeholder="Message"
                                        value={formState.message}
                                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                                        onFocus={() => setIsFocused('message')}
                                        onBlur={() => setIsFocused(null)}
                                    ></textarea>
                                    <label
                                        htmlFor="message"
                                        className="absolute left-5 top-4 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-brand-emerald peer-focus:bg-[#0F172A] peer-focus:px-2 peer-valid:-top-2.5 peer-valid:text-xs peer-valid:bg-[#0F172A] peer-valid:px-2"
                                    >
                                        TRANSMIT_PAYLOAD (Message)
                                    </label>
                                </div>

                                <button
                                    type="submit"
                                    className="group relative w-full flex justify-center items-center gap-2 px-8 py-4 bg-white/5 border border-brand-cyan/30 text-brand-cyan rounded-xl hover:bg-brand-cyan hover:text-brand-black transition-all duration-300 font-bold tracking-widest uppercase overflow-hidden"
                                >
                                    <div className="absolute inset-0 w-1/4 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-20deg] group-hover:animate-shine translate-x-[-150%]"></div>
                                    <span>Transmit</span>
                                    <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                </button>
                            </div>
                        </form>
                    </motion.div>

                </div>

                {/* Footer */}
                <div className="mt-32 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600 font-mono">
                    <p>© {new Date().getFullYear()} MEET DHOLA. ALL SYSTEMS OP.</p>
                    <p className="mt-2 md:mt-0 flex items-center gap-2">
                        STATUS: <span className="w-2 h-2 rounded-full bg-brand-emerald animate-pulse"></span> ONLINE
                    </p>
                </div>

            </div>
        </section>
    );
}
