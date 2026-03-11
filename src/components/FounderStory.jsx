import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

function DigitalIdentity({ src }) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 50, damping: 30 });
    const mouseYSpring = useSpring(y, { stiffness: 50, damping: 30 });

    // Background spotlight parallax (moves opposite to mouse)
    const bgX = useTransform(mouseXSpring, [-0.5, 0.5], ["5%", "-5%"]);
    const bgY = useTransform(mouseYSpring, [-0.5, 0.5], ["5%", "-5%"]);

    // Portrait parallax (moves with mouse)
    const fgX = useTransform(mouseXSpring, [-0.5, 0.5], ["-2%", "2%"]);
    const fgY = useTransform(mouseYSpring, [-0.5, 0.5], ["-2%", "2%"]);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - rect.left) / rect.width - 0.5);
        y.set((e.clientY - rect.top) / rect.height - 0.5);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="cinematic-scene absolute inset-0 w-full h-full overflow-hidden flex flex-col items-center justify-end z-0"
        >
            {/* Eclipse Spotlight Background */}
            <motion.div
                style={{ x: bgX, y: bgY }}
                className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none"
            >
                {/* Core cyan glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-brand-cyan rounded-full blur-[120px] opacity-40 mix-blend-screen"></div>
                {/* Cooler center highlight */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[25vw] h-[25vw] max-w-[350px] max-h-[350px] bg-white rounded-full blur-[80px] opacity-20 mix-blend-screen"></div>
                {/* Wide ambient base */}
                <div className="absolute inset-[-50%] bg-[radial-gradient(circle_at_center,rgba(0,245,255,0.12)_0%,transparent_60%)]"></div>
            </motion.div>

            {/* Cinematic Portrait */}
            <motion.div
                style={{ x: fgX, y: fgY }}
                className="relative z-10 h-[85vh] w-full max-w-4xl flex items-end justify-center pointer-events-none"
            >
                <img
                    src={src}
                    alt="Meet Dhola"
                    className="h-full w-auto object-contain object-bottom drop-shadow-[0_0_40px_rgba(0,0,0,0.9)] brightness-95 contrast-110"
                />
                {/* Bottom fade so portrait blends into section */}
                <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-brand-black via-brand-black/60 to-transparent"></div>
            </motion.div>

            {/* Cinematic vignette edges */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(2,4,8,0.9)_100%)] pointer-events-none z-20"></div>
        </div>
    );
}

export default function FounderStory() {
    const containerRef = useRef(null);
    const text1Ref = useRef(null);
    const text2Ref = useRef(null);
    const text3Ref = useRef(null);
    const sceneRef = useRef(null);

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "+=300%",
                    pin: true,
                    scrub: 1.2,
                }
            });

            // Phase 1 — everything is visible (Scene 1: portrait + "Meet Dhola")
            // After a moment, fade out Scene 1 text + portrait together
            tl.to([text1Ref.current, sceneRef.current], {
                opacity: 0,
                y: -20,
                filter: "blur(10px)",
                duration: 1.5,
                stagger: 0,
            }, "+=0.8")

                // Phase 2 — Scene 2 fades in (no portrait)
                .fromTo(text2Ref.current,
                    { opacity: 0, y: 40, filter: "blur(10px)" },
                    { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.5 }, "<0.5")

                // Hold, then fade out Scene 2
                .to(text2Ref.current, { opacity: 1, duration: 0.8 })
                .to(text2Ref.current, { opacity: 0, y: -20, filter: "blur(10px)", duration: 1.2 })

                // Phase 3 — Scene 3 fades in
                .fromTo(text3Ref.current,
                    { opacity: 0, y: 40, filter: "blur(10px)" },
                    { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.5 }, "<0.3")
                .to(text3Ref.current, { opacity: 1, duration: 0.8 });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            id="story"
            ref={containerRef}
            className="relative w-full h-[120vh] bg-brand-black overflow-hidden"
        >
            {/* Cinematic photo + background — hidden in scenes 2 & 3 via GSAP */}
            <div ref={sceneRef} className="absolute inset-0 z-999">
                <DigitalIdentity src="/Profile3.png" />
            </div>

            {/* All text scenes — layered above portrait */}
            <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none">

                {/* Scene 1: Meet Dhola */}
                <div ref={text1Ref} className="absolute flex flex-col items-center text-center px-6">
                    <h2 className="text-7xl md:text-[20vh] font-bold font-primary tracking-tight text-white mb-4 drop-shadow-2xl">
                        Meet Dhola.
                    </h2>
                    <p className="text-xl md:text-2xl text-brand-cyan font-light tracking-widest uppercase drop-shadow-lg md:mb-[25vh]">
                        Engineering Student
                    </p>
                </div>

                {/* Scene 2: Education */}
                <div ref={text2Ref} className="absolute opacity-0 flex flex-col items-center text-center px-6">
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-medium font-primary tracking-tight text-white">
                        Birla Vishvakarma Mahavidyalaya
                    </h2>
                    <p className="text-lg md:text-xl text-brand-violet font-light tracking-widest uppercase md:mb-[20vh]">
                        3rd Year IT Engineering
                    </p>
                </div>

                {/* Scene 3: Mission */}
                <div ref={text3Ref} className="absolute opacity-0 flex flex-col items-center text-center px-6 md:mb-[20vh]">
                    <h2 className="text-4xl md:text-6xl lg:text-8xl font-bold font-primary tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-white leading-tight">
                        Engineering the future <br /> of digital systems.
                    </h2>
                </div>

            </div>

            {/* Bottom gradient fade into next section */}
            <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-brand-black to-transparent z-40"></div>
        </section>
    );
}
