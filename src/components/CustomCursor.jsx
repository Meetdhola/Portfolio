import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const updateMousePosition = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        const handleMouseOver = (e) => {
            if (
                e.target.tagName.toLowerCase() === 'button' ||
                e.target.tagName.toLowerCase() === 'a' ||
                e.target.closest('button') ||
                e.target.closest('a')
            ) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener('mousemove', updateMousePosition);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, []);

    const variants = {
        default: {
            x: mousePosition.x - 16,
            y: mousePosition.y - 16,
            scale: 1,
            transition: {
                type: 'spring',
                stiffness: 700,
                damping: 30,
                mass: 0.5,
            },
        },
        hover: {
            x: mousePosition.x - 32,
            y: mousePosition.y - 32,
            scale: 1.5,
            backgroundColor: 'rgba(0, 245, 255, 0.1)',
            border: '1px solid rgba(0, 245, 255, 0.5)',
            mixBlendMode: 'screen',
            transition: {
                type: 'spring',
                stiffness: 300,
                damping: 20,
            },
        },
    };

    if (isMobile) return null;

    return (
        <>
            {/* Outer Glow Cursor */}
            <motion.div
                className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-50 border border-brand-cyan/30 flex items-center justify-center backdrop-blur-sm"
                variants={variants}
                animate={isHovering ? 'hover' : 'default'}
            >
                {/* Inner Dot */}
                <motion.div
                    className="w-1.5 h-1.5 bg-brand-cyan rounded-full"
                    animate={{ scale: isHovering ? 0 : 1 }}
                    transition={{ duration: 0.2 }}
                />
            </motion.div>
        </>
    );
}
