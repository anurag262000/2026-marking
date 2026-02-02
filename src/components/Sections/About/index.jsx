"use client";
import React from 'react';
import './About.css';
import BackgroundBeams from '@/components/Effects/BackgroundBeams';
import InteractiveTerminal from './InteractiveTerminal';

export default function About() {
  return (
    <section
      id="about-section"
      className="about-section"
    >
      <BackgroundBeams />

      <div className="about-container">
        {/* MAIN BENTO GRID - 2 Columns */}
        <div className="bento-dashboard">
          {/* COL 1: IDENTITY */}
          <div className="bento-col identity-col">
            <h1 className="bento-title font-bitcount">
              ANURAG MISHRA
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
            {/* STATS ROW */}
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
          <div className="bento-col terminal-col">
            <InteractiveTerminal />
          </div>
        </div>
      </div>
    </section>
  );
}
