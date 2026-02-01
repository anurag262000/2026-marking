"use client";
import React from 'react';
import './About.css';
import BackgroundBeams from '@/components/Effects/BackgroundBeams';
import InteractiveTerminal from './InteractiveTerminal';

export default function About() {
  const skills = [
    { name: "Next.js", icon: "N" },
    { name: "React", icon: "R" },
    { name: "Node.js", icon: "Nd" },
    { name: "Typescript", icon: "TS" },
    { name: "Postgres", icon: "PS" },
    { name: "Python", icon: "Py" },
    { name: "GSAP", icon: "An" },
    { name: "Design", icon: "Ui" },
  ];

  return (
    <section id="about-section" className="about-section">
      <BackgroundBeams />

      <div className="about-container bento-dashboard">
        {/* COL 1: IDENTITY */}
        <div className="bento-col identity-col">
            <h1 className="bento-title font-bitcount">
                ANURAG<br/>MISHRA
            </h1>
            <div className="bento-card glow-border highlight-card">
                <div className="card-content">
                    <span className="mono-label">CURRENT_STATUS</span>
                    <h2 className="status-text font-space">BUILDING THE FUTURE</h2>
                    <p className="bio-text">
                        Full-Stack Architect & Technical Lead.
                        Engineering high-performance systems with a focus on
                        <span className="accent"> visual excellence</span>.
                    </p>
                </div>
            </div>
            {/* CORRECTED STATS */}
            <div className="stat-row">
                <div className="bento-card glow-border mini-stat">
                    <span className="stat-number font-bitcount">02+</span>
                    <span className="stat-desc">YEARS EXPERIENCE</span>
                </div>
                 <div className="bento-card glow-border mini-stat">
                    <span className="stat-number font-bitcount">15+</span>
                    <span className="stat-desc">PROJECTS COMPLETED</span>
                </div>
                <div className="bento-card glow-border mini-stat">
                    <span className="stat-number font-bitcount">10+</span>
                    <span className="stat-desc">LEAD PROJECTS</span>
                </div>
            </div>
        </div>

        {/* COL 2: INTERACTIVE TERMINAL */}
        <div className="bento-col stats-col">
            <InteractiveTerminal />
        </div>

        {/* COL 3: SKILL MATRIX */}
        <div className="bento-col skills-col">
            <span className="mono-label header-label">WEAPON_RACK</span>
            <div className="skill-matrix">
                {skills.map((skill, i) => (
                    <div key={i} className="bento-card glow-border skill-card">
                        <div className="moving-border"></div>
                        <div className="card-content centered">
                            <span className="skill-icon font-bitcount">{skill.icon}</span>
                            <span className="skill-name font-space">{skill.name}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </section>
  );
}
