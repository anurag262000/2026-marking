'use client';

import React from 'react';
import { motion } from 'framer-motion';
import './Experience.css';

const experiences = [
  {
    id: 1,
    role: 'Technical Lead',
    company: 'Indiefluence Garage',
    period: '2024 - Present',
    description: 'Led a team of 5 developers to build a creator economy platform. Architected the microservices backend using Node.js and gRPC.',
    tech: ['Node.js', 'React', 'AWS', 'Redis']
  },
  {
    id: 2,
    role: 'Senior Frontend Developer',
    company: 'TechCorp Solutions',
    period: '2022 - 2024',
    description: 'Spearheaded the migration of a legacy dashboard to Next.js, improving load times by 40%. Implemented a custom design system.',
    tech: ['Next.js', 'TypeScript', 'Storybook']
  },
  {
    id: 3,
    role: 'Full Stack Engineer',
    company: 'StartUp Inc',
    period: '2020 - 2022',
    description: 'Built and deployed 3 MVP products from scratch. Managed database schema design and API integrations.',
    tech: ['MERN Stack', 'PostgreSQL', 'Docker']
  },
];

export default function Experience() {
  return (
    <section id="experience" className="experience-section">
      <div className="experience-container">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="section-title font-bitcount"
        >
          Experience
        </motion.h2>

        <div className="timeline">
          <div className="timeline-line"></div>

          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              className="timeline-item"
            >
              <div className="timeline-dot"></div>
              <div className="timeline-period font-bitcount">{exp.period}</div>

              <div className="timeline-content">
                <h3 className="role-title font-inter">{exp.role}</h3>
                <h4 className="company-name font-bitcount">{exp.company}</h4>
                <p className="role-desc font-inter">{exp.description}</p>
                <div className="tech-tags">
                  {exp.tech.map(t => (
                    <span key={t} className="tech-tag font-inter">{t}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
