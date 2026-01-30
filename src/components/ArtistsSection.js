'use client';

import { motion } from 'framer-motion';
import './ArtistsSection.css';

export default function ArtistsSection() {
  return (
    <section className="artists-section">
      <motion.h2
        className="section-title-new"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        Featured Artists
      </motion.h2>

      <div className="artists-grid">
        {[1, 2, 3, 4, 5, 6].map((item, index) => (
          <motion.div
            key={index}
            className="artist-card-new"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{
              duration: 0.8,
              delay: index * 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
            whileHover={{ y: -10 }}
          >
            <div className="artist-image-new">
              <span className="artist-emoji">{['🎨', '🖼️', '🎭', '🎪', '🎬', '📸'][index]}</span>
            </div>
            <h3 className="artist-name-new">Artist {item}</h3>
            <p className="artist-category">Category</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
