"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const steps = [
  {
    text: "Creative Full-Stack Developer blending technical excellence with cinematic design.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M12 16.5V16.5" />
      </svg>
    )
  },
  {
    text: "Expertise in modern frameworks like Next.js, React, and high-performance GSAP animations.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    )
  },
  {
    text: "Passionate about crafting fluid, interactive digital experiences that tell a compelling story.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 19l7-7 3 3-7 7-3-3z" />
        <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
        <path d="M2 2l7.5 1.5" />
        <path d="M7 11l5-5" />
      </svg>
    )
  },
  {
    text: "Bridging the gap between imagination and reality through clean code and smooth aesthetics.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    )
  },
  {
    text: "Focused on building production-ready applications that leave a lasting digital impression.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    )
  },
  {
    text: "Dedicated to push the boundaries of modern web design and user interaction.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
         <circle cx="12" cy="12" r="10" />
         <path d="M12 2a7 7 0 0 1 7 7c0 2.38-1.19 4.47-3 5.74V17a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 0 1 7-7z" />
         <line x1="9" y1="21" x2="15" y2="21" />
      </svg>
    )
  }
];

const AboutInfo = () => {
  const sectionRef = useRef(null);
  const circleRef = useRef(null);
  const stepRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=5000",
          scrub: true,
          pin: true,
          anticipatePin: 1,
        },
      });

      // Start: Step 1 is visible
      gsap.set(stepRefs.current[0], { opacity: 1, y: 0 });

      // Synchronized Steps
      steps.slice(0, -1).forEach((_, index) => {
        const nextIndex = index + 1;
        const rotationAngle = (index + 1) * 72;
        
        // durations for transition
        const duration = 0.5;

        // 1. Rotate Circle
        tl.to(circleRef.current, {
          rotation: rotationAngle,
          ease: "none",
          duration: 1,
        }, index === 0 ? 0.1 : ">"); // Slight delay for first rotation

        // 2. Current Step fades out
        tl.to(stepRefs.current[index], {
          y: -50,
          opacity: 0,
          duration: duration,
          ease: "power2.inOut",
        }, "<"); // Sync with beginning of rotation

        // 3. Next Step fades in AT THE SAME TIME (preventing blank space)
        // But with Y offset to prevent overlap
        tl.fromTo(stepRefs.current[nextIndex], 
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: duration, ease: "power2.inOut" },
          "<" // Start exactly when fade-out starts
        );
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen bg-[#f3efe9] overflow-hidden flex items-center justify-center text-[#222]"
    >
      {/* Outer Oval - STATIC and PADDED */}
      <div className="absolute w-[90vw] h-[80vh] border border-dotted border-[#222] rounded-[50%] flex items-center justify-center" />

      {/* Inner Rotating Border and Arrows */}
      <div
        ref={circleRef}
        className="absolute w-[300px] h-[300px] md:w-[583px] md:h-[583px] border border-dotted border-[#222] rounded-full flex items-center justify-center will-change-transform z-0"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[#222]" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-4 h-4 bg-[#222] rotate-180" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />
        <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-[#222] -rotate-90" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-4 h-4 bg-[#222] rotate-90" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />
      </div>

      <div className="relative w-[300px] h-[300px] md:w-[500px] md:h-[500px] flex items-center justify-center z-10 box-border p-8">
        <div className="text-center w-full relative h-full flex items-center justify-center">
          
          {/* Combined Icons and Text Blocks */}
          <div className="relative w-full h-full flex items-center justify-center">
            {steps.map((step, i) => (
              <div
                key={i}
                ref={(el) => (stepRefs.current[i] = el)}
                className="absolute opacity-0 pointer-events-none flex flex-col items-center gap-6"
              >
                <div className="text-[#222] scale-125 mb-2">
                  {step.icon}
                </div>
                <p className="text-sm md:text-base text-[#222] leading-relaxed font-medium max-w-[400px] text-center">
                  {step.text}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutInfo;

// test commit