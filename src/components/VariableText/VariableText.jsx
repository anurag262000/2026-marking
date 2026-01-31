'use client';

import { useEffect, useState, useRef } from 'react';
import './VariableText.css';

export default function VariableText({ text = "DEVELOPER", fontClass = "font-helvetica" }) {
  const [windowHeight, setWindowHeight] = useState(typeof window !== 'undefined' ? window.innerHeight : 1080);
  const [letterScales, setLetterScales] = useState([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const letterRefs = useRef([]);
  const containerRef = useRef(null);

  const PROXIMITY_RADIUS = 700; // 700px radius of effect

  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
      calculateScales();
    };

    window.addEventListener('resize', handleResize);
    setTimeout(calculateScales, 100);

    return () => window.removeEventListener('resize', handleResize);
  }, [text]);

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

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX,
      y: e.clientY
    });
  };

  const letters = text.split('');
  const characterWidth = 100 / letters.length;

  const getHeightPercentage = (index, total) => {
    const mid = Math.floor(total / 2);
    const distanceFromEdge = Math.min(index, total - 1 - index);
    const maxHeight = 80;
    const minHeight = 55;
    const step = (maxHeight - minHeight) / mid;
    return maxHeight - (distanceFromEdge * step);
  };

  // Calculate height modification based on cursor proximity
  const getProximityScale = (letterRect) => {
    if (!letterRect) return 1;

    const letterCenterX = letterRect.left + letterRect.width / 2;
    const letterCenterY = letterRect.top + letterRect.height / 2;

    const distance = Math.sqrt(
      Math.pow(mousePosition.x - letterCenterX, 2) +
      Math.pow(mousePosition.y - letterCenterY, 2)
    );

    if (distance > PROXIMITY_RADIUS) return 1;

    // Calculate influence: 1 (no effect) to 1.3 (max stretch) based on distance
    const influence = 1 - (distance / PROXIMITY_RADIUS);
    const heightChange = 0.3; // 30% max height change

    return 1 + (influence * heightChange);
  };

  return (
    <div
      ref={containerRef}
      className="variable-text-container"
      onMouseMove={handleMouseMove}
    >
      <div className="variable-text">
        {letters.map((letter, index) => {
          const heightPercentage = getHeightPercentage(index, letters.length);
          const baseFontSize = (windowHeight * heightPercentage) / 100;
          const scaleX = letterScales[index] || 1;

          const letterRef = letterRefs.current[index];
          const letterRect = letterRef?.getBoundingClientRect();
          const proximityScale = getProximityScale(letterRect);

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
                className={`variable-letter ${fontClass}`}
                style={{
                  fontSize: `${baseFontSize}px`,
                  transform: `scaleX(${scaleX}) scaleY(${proximityScale})`,
                }}
              >
                {letter}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
