'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Navigation from './Navigation';
import ProfileCard from './ProfileCard';
import './HeroSection.css';

export default function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const heroText = 'FOLLOWART';
  const letters = heroText.split('');

  return (
    <motion.section ref={ref} className="hero-section-new" style={{ opacity }}>
      <Navigation />

      <div className="hero-main">
        <motion.h1 className="hero-massive-text" style={{ y }}>
          {letters.map((letter, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: index * 0.05,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {letter}
            </motion.span>
          ))}
        </motion.h1>

        {/* Floating Profile Cards */}
        <ProfileCard
          name="Thomas"
          title="Besselhof"
          image="👨‍🎨"
          rotation={-8}
          position={{ left: '15%', top: '35%' }}
          delay={0.6}
        />

        <ProfileCard
          name="Isabela"
          title="Galvano"
          image="👩‍🎨"
          rotation={-15}
          position={{ left: '35%', top: '25%' }}
          delay={0.8}
        />

        <ProfileCard
          name="Danny"
          title="Van der Est"
          image="🎭"
          rotation={-12}
          position={{ right: '25%', top: '30%' }}
          delay={1.0}
        />

        {/* Nexus of Section */}
        <motion.div
          className="nexus-text"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          Nexus of
        </motion.div>

        {/* Join Button */}
        <motion.button
          className="hero-join-btn"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ scale: 1.05 }}
        >
          Join
          <span className="join-close">×</span>
        </motion.button>
      </div>
    </motion.section>
  );
}
