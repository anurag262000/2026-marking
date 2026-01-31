'use client';

import React from 'react';
import { motion } from 'framer-motion';
import './Projects.css';

const projects = [
  {
    id: 1,
    title: 'Business Card CRM',
    category: 'Full Stack',
    stats: { stars: '1.2k', downloads: '5k+' },
    image: 'linear-gradient(135deg, #ff9aa0 0%, #ff6f61 100%)' // Placeholder gradient
  },
  {
    id: 2,
    title: 'Auth System v2',
    category: 'Security',
    stats: { stars: '850', downloads: '10k+' },
    image: 'linear-gradient(135deg, #d6c6ff 0%, #6b5b95 100%)'
  },
  {
    id: 3,
    title: 'Indiefluence App',
    category: 'Mobile',
    stats: { stars: '2k', downloads: '50k+' },
    image: 'linear-gradient(135deg, #ffc6b0 0%, #d96459 100%)'
  },
  {
    id: 4,
    title: '3D Portfolio',
    category: 'Creative',
    stats: { stars: '500', downloads: '1k+' },
    image: 'linear-gradient(135deg, #bdefff 0%, #007acc 100%)'
  },
  {
    id: 5,
    title: 'E-commerce UI',
    category: 'Dashboard',
    stats: { stars: '3.1k', downloads: '12k+' },
    image: 'linear-gradient(135deg, #eecbff 0%, #884dff 100%)'
  },
  {
    id: 6,
    title: 'AI Chat Interface',
    category: 'AI / ML',
    stats: { stars: '4k', downloads: '100k+' },
    image: 'linear-gradient(135deg, #c2f0c2 0%, #2ecc71 100%)'
  },
];

export default function Projects() {
  return (
    <section id="projects" className="projects-section">
      <div className="projects-container">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="section-title font-bitcount"
        >
          Selected Projects
        </motion.h2>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="project-card"
            >
              <div
                className="project-image"
                style={{ background: project.image }}
              />

              <div className="project-content">
                <span className="project-category font-inter">{project.category}</span>
                <h3 className="project-title font-bitcount">{project.title}</h3>
              </div>

              <div className="project-overlay">
                <div className="overlay-content">
                  <p className="overlay-stat font-bitcount">{project.stats.stars} ★</p>
                  <p className="overlay-downloads font-inter">{project.stats.downloads} Users</p>
                  <button className="view-case-btn font-inter">View Case Study</button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
