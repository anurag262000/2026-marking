'use client';

import { motion } from 'framer-motion';
import './ShowcaseSection.css';

export default function ShowcaseSection() {
  const artworks = Array.from({ length: 12 }, (_, i) => i + 1);

  return (
    <section className="showcase-section">
      <motion.h2
        className="section-title-new"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        Artwork Showcase
      </motion.h2>

      <div className="showcase-wrapper">
        <motion.div
          className="showcase-track"
          animate={{
            x: [0, -2400],
          }}
          transition={{
            x: {
              duration: 50,
              repeat: Infinity,
              ease: 'linear',
            },
          }}
        >
          {[...artworks, ...artworks].map((item, index) => (
            <motion.div
              key={index}
              className="showcase-item"
              whileHover={{ scale: 1.05 }}
            >
              <div className="showcase-number">{(index % 12) + 1}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
