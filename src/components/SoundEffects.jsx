import React, { useEffect, useState, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export default function SoundEffects() {
    const [isMuted, setIsMuted] = useState(true);
    const audioCtxRef = useRef(null);

    useEffect(() => {
        // Initialize Web Audio API on first interaction or mount (but stay muted until unmuted)
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;

        audioCtxRef.current = new AudioContext();

        // Setup Hover Listener globally
        const playHoverSound = () => {
            if (isMuted || !audioCtxRef.current) return;

            const ctx = audioCtxRef.current;
            if (ctx.state === 'suspended') ctx.resume();

            const osc = ctx.createOscillator();
            const gainNode = ctx.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(800, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.1);

            gainNode.gain.setValueAtTime(0, ctx.currentTime);
            gainNode.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 0.02);
            gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);

            osc.connect(gainNode);
            gainNode.connect(ctx.destination);

            osc.start();
            osc.stop(ctx.currentTime + 0.1);
        };

        const handleMouseOver = (e) => {
            if (
                e.target.tagName.toLowerCase() === 'button' ||
                e.target.tagName.toLowerCase() === 'a' ||
                e.target.closest('button') ||
                e.target.closest('a') ||
                e.target.closest('.group')
            ) {
                playHoverSound();
            }
        };

        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mouseover', handleMouseOver);
            if (audioCtxRef.current) {
                audioCtxRef.current.close();
            }
        };
    }, [isMuted]);

    const toggleMute = () => {
        setIsMuted(!isMuted);
        if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
            audioCtxRef.current.resume();
        }
    };

    return (
        <button
            onClick={toggleMute}
            className="fixed bottom-6 left-6 w-12 h-12 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-gray-400 hover:text-brand-emerald hover:border-brand-emerald/50 backdrop-blur-md z-40 shadow-lg transition-all"
            title="Toggle Ambient Audio"
        >
            {isMuted ? (
                <VolumeX size={20} className="opacity-50" />
            ) : (
                <Volume2 size={20} className="text-brand-emerald" />
            )}
        </button>
    );
}
