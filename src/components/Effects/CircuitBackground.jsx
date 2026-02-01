import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function CircuitBackground() {
  const containerRef = useRef(null);
  const svgsRef = useRef([]);

  useEffect(() => {
    if (!containerRef.current) return;

    // Create random paths
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Animate the paths
    gsap.fromTo('.circuit-path',
      { strokeDasharray: 1000, strokeDashoffset: 1000, opacity: 0 },
      {
        strokeDashoffset: 0,
        opacity: 0.3,
        duration: 3,
        stagger: 0.2,
        ease: "power2.out"
      }
    );

    // Create "Pulses" that travel along the paths
    const paths = document.querySelectorAll('.circuit-path');
    paths.forEach((path, i) => {
        // Random duration and delay for organic feel
        const duration = 2 + Math.random() * 3;
        const delay = Math.random() * 2;

        // Clone path for the glow effect
        const length = path.getTotalLength();

        gsap.to(path, {
            strokeDashoffset: -length,
            repeat: -1,
            duration: duration,
            delay: delay,
            ease: "none",
            onStart: () => {
                path.style.strokeDasharray = `${length/5} ${length}`; // Short dash
            }
        });
    });

  }, []);

  return (
    <div ref={containerRef} className="circuit-background">
      <svg width="100%" height="100%" viewBox="0 0 100% 100%" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <defs>
            <linearGradient id="trace-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(255, 100, 50, 0)" />
                <stop offset="50%" stopColor="rgba(255, 100, 50, 0.8)" />
                <stop offset="100%" stopColor="rgba(255, 100, 50, 0)" />
            </linearGradient>
            <filter id="glow">
                <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
                <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                </feMerge>
            </filter>
        </defs>

        {/* Abstract Tech Paths - Manually defined for aesthetics or random gen */}
        {/* Center to Left */}
        <path className="circuit-path" d="M 50% 50% L 20% 50% L 10% 80%" stroke="url(#trace-grad)" strokeWidth="2" fill="none" filter="url(#glow)" />
        <path className="circuit-path" d="M 50% 50% L 80% 50% L 90% 20%" stroke="url(#trace-grad)" strokeWidth="2" fill="none" filter="url(#glow)" />

        {/* Top/Bottom Lines */}
        <path className="circuit-path" d="M 10% 10% L 90% 10%" stroke="rgba(255,255,255,0.1)" strokeWidth="1" fill="none" />
        <path className="circuit-path" d="M 10% 90% L 90% 90%" stroke="rgba(255,255,255,0.1)" strokeWidth="1" fill="none" />

        {/* Connecting Skills */}
        <path className="circuit-path" d="M 50% 20% L 50% 80%" stroke="url(#trace-grad)" strokeWidth="1" fill="none" opacity="0.5" />
      </svg>
    </div>
  );
}
