'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import SkillCard from '../SkillCard/SkillCard';
import './SkillsMarquee.css';

export default function SkillsMarquee() {
  const pathRef = useRef(null);

  const skills = [
    { skill: "React", description: "Frontend Library", icon: "⚛️", color: "#61dafb" },
    { skill: "Node.js", description: "Backend Runtime", icon: "🟢", color: "#68a063" },
    { skill: "Next.js", description: "React Framework", icon: "▲", color: "#000000" },
    { skill: "TypeScript", description: "Type-Safe JS", icon: "TS", color: "#3178c6" },
    { skill: "MongoDB", description: "NoSQL Database", icon: "🍃", color: "#47a248" },
    { skill: "PostgreSQL", description: "SQL Database", icon: "🐘", color: "#336791" },
    { skill: "Docker", description: "Containerization", icon: "🐳", color: "#2496ed" },
    { skill: "Git", description: "Version Control", icon: "📦", color: "#f05032" },
    { skill: "Three.js", description: "3D Graphics", icon: "🎨", color: "#000000" },
    { skill: "GraphQL", description: "API Query Language", icon: "◈", color: "#e10098" },
  ];

  useEffect(() => {
    if (!pathRef.current) return;

    // Calculate curve path for CSS animation
    const updateCurvePath = () => {
      const startX = -20; // Start from bottom left (off-screen)
      const startY = window.innerHeight + 100;
      const endX = window.innerWidth / 2; // End at top center
      const endY = -100;

      // Create bezier curve path
      const path = `M ${startX},${startY} Q ${window.innerWidth * 0.3},${window.innerHeight * 0.5} ${endX},${endY}`;

      pathRef.current.style.setProperty('--start-x', `${startX}px`);
      pathRef.current.style.setProperty('--start-y', `${startY}px`);
      pathRef.current.style.setProperty('--end-x', `${endX}px`);
      pathRef.current.style.setProperty('--end-y', `${endY}px`);
    };

    updateCurvePath();
    window.addEventListener('resize', updateCurvePath);

    return () => window.removeEventListener('resize', updateCurvePath);
  }, []);

  return (
    <div className="skills-marquee-wrapper" ref={pathRef}>
      <svg className="curve-path" width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none', opacity: 0 }}>
        <defs>
          <path
            id="curvePath"
            d={`M -20,${typeof window !== 'undefined' ? window.innerHeight + 100 : 1000} Q ${typeof window !== 'undefined' ? window.innerWidth * 0.3 : 600},${typeof window !== 'undefined' ? window.innerHeight * 0.5 : 500} ${typeof window !== 'undefined' ? window.innerWidth / 2 : 960},-100`}
            fill="none"
          />
        </defs>
      </svg>

      <div className="skills-marquee">
        <div className="skills-track">
          {/* First set */}
          {skills.map((skill, index) => (
            <div
              key={`skill-1-${index}`}
              className="skill-item"
              style={{
                animationDelay: `${index * -2}s`,
              }}
            >
              <SkillCard {...skill} />
            </div>
          ))}

          {/* Duplicate set for seamless loop */}
          {skills.map((skill, index) => (
            <div
              key={`skill-2-${index}`}
              className="skill-item"
              style={{
                animationDelay: `${(index + skills.length) * -2}s`,
              }}
            >
              <SkillCard {...skill} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
