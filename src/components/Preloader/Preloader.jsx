'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Preloader.module.css';

const Preloader = () => {
    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log("Preloader: mounted, loading:", loading);
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
        console.log("Preloader: starting interval");
        const interval = setInterval(() => {
            setCount((prev) => {
                if (prev >= 100) {
                    console.log("Preloader: done");
                    clearInterval(interval);
                    setTimeout(() => setLoading(false), 500);
                    return 100;
                }
                return prev + 1;
            });
        }, 40); // Slightly slower for visibility

        return () => clearInterval(interval);
    }, [setLoading]);

    return (
        <AnimatePresence>
            {loading && (
                <motion.div
                    className={styles.preloader}
                    initial={{ opacity: 1 }}
                    exit={{
                        y: '-100%',
                        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 }
                    }}
                >
                    <div className={styles.preloaderContent}>
                        <motion.div
                            className={styles.counter}
                            initial={{ opacity: 1, y: 0 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            {count}
                            <span className={styles.percentage}>%</span>
                        </motion.div>

                        <div className={styles.barContainer}>
                            <motion.div
                                className={styles.bar}
                                initial={{ width: '0%' }}
                                animate={{ width: `${count}%` }}
                                transition={{ duration: 0.1 }}
                            />
                        </div>

                        <motion.p
                            className="mt-4 text-white/50 font-bitcount tracking-widest text-sm uppercase"
                            initial={{ opacity: 1 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                        >
                            Initializing Experience
                        </motion.p>
                    </div>

                    {/* Secondary reveal overlay */}
                    <motion.div
                        className={styles.overlay}
                        exit={{
                            y: '-100%',
                            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
                        }}
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Preloader;
