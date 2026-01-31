'use client';

import { useEffect, useState } from 'react';
import './ZoomLens.css';

export default function ZoomLens({
  isActive = false,
  position = { x: 0, y: 0 },
  size = 200,
  zoomLevel = 2.5,
  children
}) {
  const [lensStyle, setLensStyle] = useState({});

  useEffect(() => {
    setLensStyle({
      left: `${position.x}px`,
      top: `${position.y}px`,
      width: `${size}px`,
      height: `${size}px`,
    });
  }, [position, size]);

  return (
    <div
      className={`zoom-lens ${isActive ? 'active' : ''}`}
      style={lensStyle}
    >
      <div
        className="zoom-lens-content"
        style={{
          transform: `translate(-50%, -50%) scale(${zoomLevel})`,
        }}
      >
        {children}
      </div>
    </div>
  );
}
