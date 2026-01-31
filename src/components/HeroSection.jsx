'use client';

import { useState, useRef } from 'react';
import VariableText from '@/components/VariableText/VariableText';
import HamburgerMenu from '@/components/Navbar/Navbar';
import './HeroSection.css';

export default function HeroSection() {
  const heroText = "DEVELOPER";
  const heroFontClass = "font-helvetica";

  return (
    <section className="hero-section" id="home">
      <div className="liquid-background">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
        <div className="blob blob-4"></div>
      </div>

      {/* Variable Text with Proximity Effect */}
      <VariableText
        text={heroText}
        fontClass={heroFontClass}
      />

      {/* Subtitle Source */}
      <div className="hero-subtitle">
        <p className="font-bitcount subtitle-main">Full Stack Developer</p>
        <p className="subtitle-secondary">React • Node.js • Next.js</p>
      </div>

      {/* Scroll Indicator */}
      <div className="scroll-indicator">
        <span className="scroll-text">Scroll to explore</span>
        <div className="scroll-arrow">↓</div>
      </div>

      {/* Availability Badge */}
      <a
        href="https://indiefluence.in"
        target="_blank"
        rel="noopener noreferrer"
        className="availability-badge"
      >
        <span className="status-dot"></span>
        <span className="status-text ">Working at Indiefluence</span>
      </a>

      {/* Hamburger Menu */}
      <HamburgerMenu />
    </section>
  );
}
