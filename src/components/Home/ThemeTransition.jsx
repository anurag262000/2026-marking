"use client";

import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ThemeTransition() {
  const sphereRef = useRef(null);
  const hasTriggered = useRef(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const sphere = sphereRef.current;
    const gallerySection = document.getElementById('projects-gallery');
    if (!sphere || !gallerySection) return;

    gsap.set(sphere, {
      clipPath: 'circle(0% at 50% 50%)',
      opacity: 1,
    });

    const ctx = gsap.context(() => {
      // Expand sphere as projects section enters viewport
      ScrollTrigger.create({
        trigger: gallerySection,
        start: "top 70%",
        end: "top 30%",
        scrub: 0.8,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const radius = self.progress * 150;
          gsap.set(sphere, {
            clipPath: `circle(${radius}% at 50% 50%)`,
          });
        },
        onEnter: () => {
          hasTriggered.current = true;
          // Add light-theme class when sphere starts expanding
          document.body.classList.add('light-theme');
        },
        onLeaveBack: () => {
          hasTriggered.current = false;
          gsap.set(sphere, { clipPath: 'circle(0% at 50% 50%)' });
          // Remove light-theme when scrolling back above
          document.body.classList.remove('light-theme');
        },
      });

      // Shrink sphere when leaving gallery at the bottom
      ScrollTrigger.create({
        trigger: gallerySection,
        start: "bottom 70%",
        end: "bottom 30%",
        scrub: 0.8,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          if (!hasTriggered.current) return;
          const radius = 150 - (self.progress * 150);
          gsap.set(sphere, {
            clipPath: `circle(${radius}% at 50% 50%)`,
          });
        },
        onLeave: () => {
          gsap.set(sphere, { clipPath: 'circle(0% at 50% 50%)' });
          // Remove light-theme when scrolling past gallery
          document.body.classList.remove('light-theme');
        },
      });
    });

    return () => ctx.revert();
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <div
      ref={sphereRef}
      className="fixed inset-0 pointer-events-none"
      style={{
        zIndex: 5,
        backgroundColor: '#f7f7f5',
        clipPath: 'circle(0% at 50% 50%)',
        willChange: 'clip-path',
      }}
    />
  );
}
