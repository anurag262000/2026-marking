'use client';

import { useEffect, useRef } from 'react';

const PosterComponent = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = 490;
    canvas.height = 757;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Create gradient for main background (black with subtle gradient for depth)
    const bgGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    bgGradient.addColorStop(0, '#000000');
    bgGradient.addColorStop(1, '#111111');
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Vertical yellow bar on right (creates 3D extrusion effect)
    const barGradient = ctx.createLinearGradient(canvas.width - 120, 0, canvas.width, 0);
    barGradient.addColorStop(0, '#FFD700'); // Bright yellow highlight
    barGradient.addColorStop(0.5, '#FFA500'); // Orange mid
    barGradient.addColorStop(1, '#FFD700'); // Yellow shadow
    ctx.fillStyle = barGradient;
    ctx.fillRect(canvas.width - 120, 0, 120, canvas.height);

    // Add 3D bevel to bar (top-left light, bottom-right shadow)
    const topLight = ctx.createLinearGradient(canvas.width - 120, 0, canvas.width - 100, 20);
    topLight.addColorStop(0, 'rgba(255,255,255,0.4)');
    topLight.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = topLight;
    ctx.fillRect(canvas.width - 120, 0, 20, 40);

    const sideShadow = ctx.createLinearGradient(0, 0, 20, 0);
    sideShadow.addColorStop(0, 'rgba(0,0,0,0.3)');
    sideShadow.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = sideShadow;
    ctx.fillRect(canvas.width - 120, 0, 20, canvas.height);

    // Spotlight beam (diagonal yellow ray for dramatic 3D light effect)
    const beamGradient = ctx.createRadialGradient(canvas.width * 0.6, canvas.height * 0.3, 0, canvas.width * 0.6, canvas.height * 0.3, 200);
    beamGradient.addColorStop(0, 'rgba(255, 215, 0, 0.8)');
    beamGradient.addColorStop(0.3, 'rgba(255, 165, 0, 0.4)');
    beamGradient.addColorStop(1, 'rgba(255, 255, 0, 0)');
    ctx.fillStyle = beamGradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // "SPOT ME" text with inverted 3D extrusion (embossed effect)
    ctx.font = 'bold 80px Arial, sans-serif';
    ctx.fillStyle = '#FFFFFF'; // White highlight for 3D top
    ctx.shadowColor = 'rgba(255,255,255,0.5)';
    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
    ctx.fillText('SPOT', 80, 220);
    ctx.fillText('ME', 80, 320);
    ctx.shadowColor = 'rgba(0,0,0,0.8)';
    ctx.shadowBlur = 15;
    ctx.shadowOffsetX = -3;
    ctx.shadowOffsetY = -3;
    ctx.fillStyle = '#FFD700'; // Yellow base
    ctx.fillText('SPOT', 80, 220);
    ctx.fillText('ME', 80, 320);
    ctx.shadowBlur = 0; // Reset shadow

    // "Advertising + Graphic Design Portfolio Show is coming to town." with glow
    ctx.font = 'bold 24px Arial, sans-serif';
    ctx.fillStyle = '#FFD700';
    ctx.shadowColor = 'rgba(255, 215, 0, 0.8)';
    ctx.shadowBlur = 8;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.fillText('Advertising + Graphic Design', 40, 400);
    ctx.fillText('Portfolio Show is coming', 40, 430);
    ctx.fillText('to town.', 40, 460);
    ctx.shadowBlur = 0;

    // Event details (top-left, subtle shadow for depth)
    ctx.font = 'bold 20px Arial, sans-serif';
    ctx.fillStyle = '#FFFFFF';
    ctx.shadowColor = 'rgba(0,0,0,0.5)';
    ctx.shadowBlur = 3;
    ctx.shadowOffsetX = 1;
    ctx.shadowOffsetY = 1;
    ctx.fillText('Charlotte Trolley Museum', 30, 60);
    ctx.fillText('1507 Camden Road', 30, 85);
    ctx.fillText('December 7th', 30, 110);
    ctx.fillText('6:00-9:00 PM', 30, 135);
    ctx.fillText('Central Piedmont', 30, 160);
    ctx.fillText('Community College', 30, 185);
    ctx.shadowBlur = 0;

    // Yellow "Creativity Piedmont" text (bottom-right, integrated with bar)
    ctx.font = 'bold 32px Arial, sans-serif';
    ctx.fillStyle = '#FFD700';
    ctx.shadowColor = 'rgba(0,0,0,0.6)';
    ctx.shadowBlur = 5;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
    ctx.fillText('Creativity', canvas.width - 300, canvas.height - 100);
    ctx.fillText('Piedmont', canvas.width - 300, canvas.height - 65);
    ctx.shadowBlur = 0;

    // Invert effect simulation with overall overlay for "3D invert look" (darken highlights, lighten shadows)
    const invertOverlay = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    invertOverlay.addColorStop(0, 'rgba(128, 128, 128, 0.1)'); // Subtle desaturation
    invertOverlay.addColorStop(1, 'rgba(0, 0, 0, 0.2)');
    ctx.fillStyle = invertOverlay;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

  }, []);

  return (
    <div style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}>
      <canvas
        ref={canvasRef}
        style={{
          width: '490px',
          height: '757px',
          borderRadius: '8px',
          boxShadow: `
            0 20px 40px rgba(0,0,0,0.5),
            inset 0 2px 10px rgba(255,255,255,0.1),
            inset 0 -2px 10px rgba(0,0,0,0.3)
          `,
          transform: 'rotateY(5deg) rotateX(2deg) translateZ(0)',
          filter: 'contrast(1.1) saturate(1.2) brightness(0.95)' // Enhance 3D invert look
        }}
      />
    </div>
  );
};

export default PosterComponent;
