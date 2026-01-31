'use client';

import { useState, useRef, useEffect } from 'react';
import VariableText from '@/components/VariableText/VariableText';
import ZoomLens from '@/components/cursers/ZoomLens/ZoomLens';
import './HeroSection.css';

export default function HeroSection() {
  const [lensPosition, setLensPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [letterScales, setLetterScales] = useState([]);
  const letterRefs = useRef([]);

  const heroText = "DEVELOPER";
  const heroFontClass = "font-helvetica";

  const handleMouseMove = (e) => {
    setLensPosition({ x: e.clientX, y: e.clientY });
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  useEffect(() => {
    const calculateScales = () => {
      const scales = letterRefs.current.map((ref) => {
        if (!ref) return 1;

        const container = ref.parentElement;
        const containerWidth = container.offsetWidth;
        const letterWidth = ref.scrollWidth;

        const scaleX = letterWidth > 0 ? containerWidth / letterWidth : 1;
        return Math.min(scaleX, 1);
      });

      setLetterScales(scales);
    };

    setTimeout(calculateScales, 100);
    window.addEventListener('resize', calculateScales);

    return () => window.removeEventListener('resize', calculateScales);
  }, [heroText]);

  const getHeightPercentage = (index, total) => {
    const mid = Math.floor(total / 2);
    const distanceFromEdge = Math.min(index, total - 1 - index);
    const maxHeight = 80;
    const minHeight = 55;
    const step = (maxHeight - minHeight) / mid;
    return maxHeight - (distanceFromEdge * step);
  };

  const letters = heroText.split('');
  const characterWidth = 100 / letters.length;

  return (
    <section className="hero-section" onMouseLeave={handleMouseLeave}>
      <VariableText
        text={heroText}
        enableZoom={true}
        onMouseMove={handleMouseMove}
        fontClass={heroFontClass}
      />

      <ZoomLens
        isActive={isHovering}
        position={lensPosition}
        size={220}
        zoomLevel={2.5}
      >
        <div className="variable-text" style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100vw',
          display: 'flex',
          alignItems: 'flex-start',
          overflow: 'visible',
        }}>
          {letters.map((letter, index) => {
            const windowHeight = typeof window !== 'undefined' ? window.innerHeight : 1080;
            const heightPercentage = getHeightPercentage(index, letters.length);
            const fontSize = (windowHeight * heightPercentage) / 100;
            const scaleX = letterScales[index] || 1;

            return (
              <div
                key={index}
                className="variable-letter-container"
                style={{
                  width: `${characterWidth}vw`,
                }}
              >
                <span
                  ref={(el) => (letterRefs.current[index] = el)}
                  className={`variable-letter ${heroFontClass}`}
                  style={{
                    fontSize: `${fontSize}px`,
                    transform: `scaleX(${scaleX})`,
                  }}
                >
                  {letter}
                </span>
              </div>
            );
          })}
        </div>
      </ZoomLens>

      <div className="hero-subtitle">
        <p className="font-bitcount ">Full Stack Developer</p>
        <p className="subtitle-secondary">React • Node.js • Next.js</p>
      </div>
    </section>
  );
}
