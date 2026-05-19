'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import styles from './Preloader.module.css';

const NUM_BARS = 7;

// Uneven stagger delays for each bar — creates the staircase look
const barDelays = [0.3, 0.1, 0.45, 0, 0.25, 0.15, 0.4];

// Gen Z status messages based on percentage ranges
const getGenZStatus = (count) => {
    if (count <= 20) return "GETTING THE DRIP READY... 💧";
    if (count <= 40) return "COOKING EXTRA SAUCE... 🍳";
    if (count <= 60) return "LOADING THE DRIP FR FR... 💅";
    if (count <= 80) return "NO CAP, WE ARE COOKING... ⚡";
    if (count <= 95) return "SLAYING THE PORTFOLIO... ✨";
    if (count < 100) return "CLEANING THE CACHE FR... 💀";
    return "WE ARE SO BACK! 🔥";
};

// Shutter column colors
const barColors = [
    'var(--neon-yellow)',
    'var(--electric-purple)',
    'var(--action-pink)',
    'var(--pitch-black)',
    'var(--pure-white)',
    'var(--neon-yellow)',
    'var(--electric-purple)'
];

const Preloader = () => {
    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [exitAnimation, setExitAnimation] = useState(false);
    const preloaderRef = useRef(null);

    useEffect(() => {
        if (loading) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [loading]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => setExitAnimation(true), 400);
                    return 100;
                }
                return prev + 1;
            });
        }, 30); // slightly faster count up

        return () => clearInterval(interval);
    }, []);

    // When exit starts, make preloader bg transparent so bars reveal content
    useEffect(() => {
        if (exitAnimation && preloaderRef.current) {
            preloaderRef.current.style.backgroundColor = 'transparent';
        }
    }, [exitAnimation]);

    // Remove preloader from DOM after bars finish
    useEffect(() => {
        if (exitAnimation) {
            const maxDelay = Math.max(...barDelays);
            const totalTime = (maxDelay + 0.8) * 1000 + 200;
            const timer = setTimeout(() => setLoading(false), totalTime);
            return () => clearTimeout(timer);
        }
    }, [exitAnimation]);

    if (!loading) return null;

    return (
        <div ref={preloaderRef} className={styles.preloader}>
            {/* Neo-Brutalist Dot Pattern */}
            <div className="absolute inset-0 bg-dot-brutalist pointer-events-none opacity-20 z-0" />
            
            {/* Counter content — hidden during exit */}
            {!exitAnimation && (
                <div className={styles.preloaderContent}>
                    {/* Rotating "Vibe Check" sticker */}
                    <motion.div
                        animate={{ rotate: [3, -3, 3] }}
                        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                        className="mb-8 px-4 py-2 font-space font-black uppercase text-xs tracking-wider rounded-md z-10"
                        style={{
                            backgroundColor: 'var(--action-pink)',
                            color: 'var(--pure-white)',
                            border: '3px solid var(--pitch-black)',
                            boxShadow: '4px 4px 0px var(--pitch-black)',
                            transform: 'rotate(4deg)'
                        }}
                    >
                        VIBE CHECK IN PROGRESS 🔍
                    </motion.div>

                    <div className={`${styles.counter} font-bebas`}>
                        {count}
                        <span className={styles.percentage}>%</span>
                    </div>

                    <div className={styles.barContainer}>
                        <motion.div
                            className={styles.bar}
                            initial={{ width: '0%' }}
                            animate={{ width: `${count}%` }}
                            transition={{ duration: 0.1 }}
                        />
                    </div>

                    <p className="mt-6 font-space font-black text-center uppercase tracking-widest text-xs md:text-sm text-[var(--pitch-black)] z-10 max-w-[280px] md:max-w-md h-8">
                        {getGenZStatus(count)}
                    </p>
                </div>
            )}

            {/* Vertical bars — each slides up independently */}
            {exitAnimation && (
                <div className={styles.barsOverlay}>
                    {Array.from({ length: NUM_BARS }).map((_, i) => (
                        <motion.div
                            key={i}
                            className={styles.verticalBar}
                            style={{
                                backgroundColor: barColors[i],
                                borderLeft: i > 0 ? '2px solid var(--pitch-black)' : 'none',
                                borderRight: i < NUM_BARS - 1 ? '2px solid var(--pitch-black)' : 'none',
                            }}
                            initial={{ y: '0%' }}
                            animate={{ y: '-100%' }}
                            transition={{
                                duration: 0.8,
                                delay: barDelays[i],
                                ease: [0.76, 0, 0.24, 1],
                            }}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Preloader;
