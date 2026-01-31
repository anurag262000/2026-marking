'use client';

import { useEffect, useState, useRef } from 'react';
import './ZoomLens.css';

export default function ZoomLens({
  isActive = false,
  position = { x: 0, y: 0 },
  targetRef = null,
  size = 250,
  zoomLevel = 2.5
}) {
  const lensRef = useRef(null);
  const [backgroundPosition, setBackgroundPosition] = useState('0px 0px');

  useEffect(() => {
    if (!isActive || !targetRef?.current || !lensRef.current) return;

    const targetElement = targetRef.current;
    const targetRect = targetElement.getBoundingClientRect();

    // Calculate the position within the target element
    const relativeX = position.x - targetRect.left;
    const relativeY = position.y - targetRect.top;

    // Calculate background position for magnification
    const bgX = -(relativeX * zoomLevel - size / 2);
    const bgY = -(relativeY * zoomLevel - size / 2);

    setBackgroundPosition(`${bgX}px ${bgY}px`);
  }, [position, isActive, targetRef, size, zoomLevel]);

  if (!isActive) return null;

  return (
    <div
      ref={lensRef}
      className="zoom-lens-glass"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${size}px`,
        height: `${size}px`,
      }}
    >
      <div
        className="zoom-lens-magnifier"
        style={{
          backgroundPosition: backgroundPosition,
          transform: `scale(${zoomLevel})`,
        }}
      />
    </div>
  );
}
