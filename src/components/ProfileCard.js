'use client';

import { motion } from 'framer-motion';
import './ProfileCard.css';

export default function ProfileCard({ name, title, image, rotation, position, delay }) {
  return (
    <motion.div
      className="profile-card"
      style={{
        position: 'absolute',
        ...position,
      }}
      initial={{ opacity: 0, scale: 0.8, rotateZ: 0 }}
      animate={{
        opacity: 1,
        scale: 1,
        rotateZ: rotation
      }}
      transition={{
        duration: 1,
        delay: delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{
        scale: 1.1,
        rotateZ: rotation + 5,
        zIndex: 100,
      }}
    >
      <div className="card-content">
        <div className="card-image">{image}</div>
        <div className="card-info">
          <h3 className="card-name">{name}</h3>
          <p className="card-title">{title}</p>
        </div>
      </div>
      <div className="card-accent-line"></div>
    </motion.div>
  );
}
