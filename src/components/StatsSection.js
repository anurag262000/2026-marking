'use client';

import { motion } from 'framer-motion';
import './StatsSection.css';

export default function StatsSection() {
  return (
    <section className="stats-section-new">
      <div className="stats-container">
        {[
          { number: '10K+', label: 'Artists' },
          { number: '50K+', label: 'Artworks' },
          { number: '100K+', label: 'Collectors' },
          { number: '500+', label: 'Galleries' },
        ].map((stat, index) => (
          <motion.div
            key={index}
            className="stat-box"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              delay: index * 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <div className="stat-num">{stat.number}</div>
            <div className="stat-lbl">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
