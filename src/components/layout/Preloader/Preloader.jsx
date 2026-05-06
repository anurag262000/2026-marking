'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import styles from './Preloader.module.css';

const NUM_BARS = 7;

// Uneven stagger delays for each bar — creates the staircase look
const barDelays = [0.3, 0.1, 0.45, 0, 0.25, 0.15, 0.4];

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
                    setTimeout(() => setExitAnimation(true), 300);
                    return 100;
                }
                return prev + 1;
            });
        }, 40);

        return () => clearInterval(interval);
    }, []);

    // When exit starts, make preloader bg transparent so bars reveal content
    useEffect(() => {
        if (exitAnimation && preloaderRef.current) {
            // Make the main preloader background transparent
            // The bars themselves are the black columns hiding the content
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
            {/* Counter content — hidden during exit */}
            {!exitAnimation && (
                <div className={styles.preloaderContent}>
                    <div className={styles.counter}>
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

                    <p className="mt-4 text-white/50 font-bitcount tracking-widest text-sm uppercase">
                        Initializing Experience
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
