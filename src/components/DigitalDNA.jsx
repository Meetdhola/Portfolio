import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const DNA_COLUMNS = 15;
const CHARS = "010101ABCDEF";

const Column = ({ index, isMobile }) => {
    const adjustedLength = isMobile ? 15 : 40;
    const chars = useMemo(() =>
        Array.from({ length: adjustedLength }).map(() => CHARS[Math.floor(Math.random() * CHARS.length)]),
        [adjustedLength]);

    const xPos = (index / DNA_COLUMNS) * 100;
    const speed = 8 + Math.random() * 12;
    const delay = Math.random() * 5;

    return (
        <div
            className="absolute top-0 h-full flex flex-col items-center"
            style={{ left: `${xPos}%`, width: '1px' }}
        >
            <motion.div
                className="flex flex-col gap-2 items-center"
                animate={{ y: ['-100%', '100%'] }}
                transition={{
                    duration: speed,
                    repeat: Infinity,
                    ease: "linear",
                    delay: delay
                }}
            >
                {chars.map((char, i) => (
                    <span
                        key={i}
                        className="text-[9px] font-mono text-brand-cyan/10 select-none leading-none"
                    >
                        {char}
                    </span>
                ))}
            </motion.div>

            {/* Interactive Glow Node */}
            <motion.div
                className="absolute w-[1px] h-32 bg-gradient-to-b from-transparent via-brand-cyan/20 to-transparent"
                animate={{
                    y: ['-100%', '400%'],
                }}
                transition={{
                    duration: speed * 0.7,
                    repeat: Infinity,
                    ease: "linear",
                    delay: delay
                }}
            />
        </div>
    );
};

export default function DigitalDNA() {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const adjustedColumns = isMobile ? 6 : DNA_COLUMNS;

    if (isMobile) return null;

    return (
        <div
            className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-40"
            style={{
                maskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)',
                WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)'
            }}
        >
            {Array.from({ length: adjustedColumns }).map((_, i) => (
                <Column key={i} index={i} isMobile={isMobile} />
            ))}
        </div>
    );
}
