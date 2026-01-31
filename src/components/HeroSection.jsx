'use client';

import { useState, useRef } from 'react';
import VariableText from '@/components/VariableText/VariableText';
import './HeroSection.css';

export default function HeroSection() {
  const [subtitleLensPosition, setSubtitleLensPosition] = useState({ x: 0, y: 0 });
  const [isSubtitleHovering, setIsSubtitleHovering] = useState(false);
  const subtitleRef = useRef(null);

  const heroText = "DEVELOPER";
  const heroFontClass = "font-helvetica";

  const LENS_SIZE = 120; // Smaller lens size
  const ZOOM_LEVEL = 1.8; // Reduced zoom level

  const handleSubtitleMouseMove = (e) => {
    if (!subtitleRef.current) return;

    setSubtitleLensPosition({ x: e.clientX, y: e.clientY });
  };

  const handleSubtitleMouseEnter = () => {
    setIsSubtitleHovering(true);
  };

  const handleSubtitleMouseLeave = () => {
    setIsSubtitleHovering(false);
  };

  return (
    <section className="hero-section">
      {/* Variable Text with Proximity Effect */}
      <VariableText
        text={heroText}
        fontClass={heroFontClass}
      />

      {/* Subtitle with Glass Zoom Effect */}
      <div
        ref={subtitleRef}
        className="hero-subtitle"
        onMouseMove={handleSubtitleMouseMove}
        onMouseEnter={handleSubtitleMouseEnter}
        onMouseLeave={handleSubtitleMouseLeave}
      >
        <p className="font-bitcount subtitle-main">Full Stack Developer</p>
        <p className="subtitle-secondary">React • Node.js • Next.js</p>
      </div>

      {/* Simplified Real Glass Zoom Lens */}
      {isSubtitleHovering && (
        <div
          className="zoom-lens-glass"
          style={{
            left: `${subtitleLensPosition.x}px`,
            top: `${subtitleLensPosition.y}px`,
            width: `${LENS_SIZE}px`,
            height: `${LENS_SIZE}px`,
          }}
        >
          <div
            className="zoom-content"
            style={{
              transform: `scale(${ZOOM_LEVEL})`,
              left: `${-(subtitleLensPosition.x * ZOOM_LEVEL - LENS_SIZE / 2)}px`,
              top: `${-(subtitleLensPosition.y * ZOOM_LEVEL - LENS_SIZE / 2)}px`,
            }}
          >
            {/* Exact copy of subtitle for magnification */}
            <div style={{
              position: 'fixed',
              bottom: '40px',
              left: '40px',
            }}>
              <p className="font-bitcount" style={{
                fontSize: 'clamp(20px, 3vw, 32px)',
                fontWeight: 300,
                marginBottom: '8px',
                color: 'white',
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
                whiteSpace: 'nowrap',
              }}>
                Full Stack Developer
              </p>
              <p style={{
                fontSize: 'clamp(16px, 2vw, 20px)',
                fontWeight: 400,
                opacity: 0.85,
                letterSpacing: '0.05em',
                color: 'white',
                whiteSpace: 'nowrap',
              }}>
                React • Node.js • Next.js
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
