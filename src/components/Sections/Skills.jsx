'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './Skills.css';

const skills = [
  { name: 'React Native', value: 95, angle: 0 },
  { name: 'Node.js', value: 90, angle: 90 },
  { name: 'TypeScript', value: 88, angle: 180 },
  { name: 'PostgreSQL', value: 85, angle: 270 },
];

const projectsBySkill = {
  'React Native': ['Indiefluence App', 'Business Card CRM'],
  'Node.js': ['Auth System v2', 'API Gateway'],
  'TypeScript': ['3D Portfolio', 'E-commerce Dashboard'],
  'PostgreSQL': ['Data Warehouse', 'User Analytics'],
};

export default function Skills() {
  const [activeSkill, setActiveSkill] = useState(null);

  const getPoint = (value, angle) => {
    const radius = (value / 100) * 120;
    const rad = (angle - 90) * (Math.PI / 180);
    return `${Math.cos(rad) * radius + 150},${Math.sin(rad) * radius + 150}`;
  };

  const points = skills.map(s => getPoint(s.value, s.angle)).join(' ');

  return (
    <section id="skills" className="skills-section">
      <div className="skills-container">

        <div className="skills-content">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="section-title font-bitcount text-left"
          >
            Technical<br/>Proficiency
          </motion.h2>

          <p className="skills-desc font-inter">
            Click on a skill node to explore related projects and experience.
          </p>

          <div className="skill-details">
            {activeSkill ? (
              <motion.div
                key={activeSkill}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="active-skill-info"
              >
                <h3 className="active-skill-title font-bitcount">{activeSkill}</h3>
                <ul className="active-skill-list font-inter">
                  {projectsBySkill[activeSkill]?.map(project => (
                    <li key={project}>{project}</li>
                  ))}
                </ul>
              </motion.div>
            ) : (
                <div className="empty-skill-state font-inter">
                     Select a skill from the chart
                </div>
            )}
          </div>
        </div>

        <div className="skills-chart-wrapper">
          <svg viewBox="0 0 300 300" className="radial-chart">
            {/* Background Circles */}
            {[40, 80, 120].map((r, i) => (
              <circle key={i} cx="150" cy="150" r={r} className="chart-bg-circle" />
            ))}

            {/* Axes */}
            {skills.map((s, i) => {
               const p = getPoint(100, s.angle);
               return <line key={i} x1="150" y1="150" x2={p.split(',')[0]} y2={p.split(',')[1]} className="chart-axis" />;
            })}

            {/* Polygon */}
            <motion.polygon
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 0.6 }}
              transition={{ duration: 1 }}
              points={points}
              className="chart-polygon"
            />

            {/* Vertices/Labels */}
            {skills.map((s, i) => {
               const [x, y] = getPoint(120, s.angle).split(',');
               let tx = parseFloat(x);
               let ty = parseFloat(y);
               // Simple label positioning adjustments
               if (s.angle === 0) ty -= 20;
               if (s.angle === 180) ty += 30;
               if (s.angle === 90) tx += 50;
               if (s.angle === 270) tx -= 50;

               return (
                <g
                    key={i}
                    onClick={() => setActiveSkill(s.name === activeSkill ? null : s.name)}
                    className={`chart-node-group ${activeSkill === s.name ? 'active' : ''}`}
                >
                   <circle cx={getPoint(s.value, s.angle).split(',')[0]} cy={getPoint(s.value, s.angle).split(',')[1]} r="6" className="chart-node-point" />
                   <text x={tx} y={ty} textAnchor="middle" className="chart-label font-bitcount">
                     {s.name}
                   </text>
                   <text x={tx} y={ty + 15} textAnchor="middle" className="chart-value font-inter">{s.value}%</text>
                 </g>
               );
            })}
          </svg>
        </div>

      </div>
    </section>
  );
}
