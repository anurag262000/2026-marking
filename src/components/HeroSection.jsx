'use client';
// testing branch 2
import { useState, useRef } from 'react';
import VariableText from '@/components/VariableText/VariableText';
// import HamburgerMenu from '@/components/Navbar/Navbar';
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

      {/* Hero Image Placeholder - Now with Real Image */}
      <div className="hero-image-placeholder">
        <img src="/Headshot.png" alt="Anurag" className="hero-headshot" />
      </div>

      {/* Subtitle Source */}
      <div className="hero-subtitle">
        <p className="font-bitcount subtitle-main">Full Stack Developer</p>
        <div className="marquee-container">
          <div className="marquee-content font-bitcount">
            <span>React • Next.js • Node.js • TypeScript • JavaScript • GSAP • Framer Motion • MongoDB • Postgres • Supabase • Firebase • React Native •&nbsp;</span>
            <span>React • Next.js • Node.js • TypeScript • JavaScript • GSAP • Framer Motion • MongoDB • Postgres • Supabase • Firebase • React Native •&nbsp;</span>
          </div>
        </div>
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

      {/* Hamburger Menu Removed (Global) */}
    </section>
  );
}
