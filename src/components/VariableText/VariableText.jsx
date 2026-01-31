'use client';

import { useEffect, useState, useRef } from 'react';
import './VariableText.css';

export default function VariableText({ text = "DEVELOPER", enableZoom = true, onMouseMove, fontClass = "font-helvetica" }) {
  const [windowHeight, setWindowHeight] = useState(typeof window !== 'undefined' ? window.innerHeight : 1080);
  const [letterScales, setLetterScales] = useState([]);
  const letterRefs = useRef([]);

  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
      calculateScales();
    };

    window.addEventListener('resize', handleResize);

    // Initial scale calculation
    setTimeout(calculateScales, 100);

    return () => window.removeEventListener('resize', handleResize);
  }, [text]);

  const calculateScales = () => {
    const scales = letterRefs.current.map((ref) => {
      if (!ref) return 1;

      const container = ref.parentElement;
      const containerWidth = container.offsetWidth;
      const letterWidth = ref.scrollWidth;

      // Calculate scale to fit width
      const scaleX = letterWidth > 0 ? containerWidth / letterWidth : 1;

      return Math.min(scaleX, 1); // Never scale up, only down
    });

    setLetterScales(scales);
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

  return (
    <div
      className="variable-text-container"
      onMouseMove={enableZoom ? onMouseMove : undefined}
    >
      <div className="variable-text">
        {letters.map((letter, index) => {
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
                className={`variable-letter ${fontClass}`}
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
    </div>
  );
}
