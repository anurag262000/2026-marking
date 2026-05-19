"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const steps = [
  {
    heading: "WHO I AM 👋",
    text: "A creative developer dedicated to pushing technical boundaries. I blend engineering with artistic vision to create standout digital products that SLAP.",
  },
  {
    heading: "MY STACK 💻",
    text: "Using Next.js, React, and GSAP, I build scalable architectures with cinematic animations that bring digital stories to life with fluid precision. NO CAP.",
  },
  {
    heading: "EXPERIENCE 🚀",
    text: "Successfully partnered with global brands to deliver high-impact digital experiences, from complex SaaS platforms to immersive brand narratives. LEGENDARY.",
  },
  {
    heading: "MY VISION 👁️",
    text: "Bridging imagination and reality through clean code and minimalist aesthetics. I create an interactive, inclusive, and inspiring web experience. BUSSIN.",
  },
  {
    heading: "THE GOAL 🎯",
    text: "Building production-ready applications that leave a lasting digital impression. I strive for perfection, ensuring your presence is innovative. SHEESH.",
  },
  {
    heading: "INNOVATION 💡",
    text: "Constantly experimenting with new technologies to stay ahead. I deliver future-proof solutions by embracing change and challenging the status quo. FR FR.",
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
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      // Start: Step 1 is visible
      gsap.set(stepRefs.current[0], { opacity: 1, y: 0 });

      // Synchronized Steps
      steps.slice(0, -1).forEach((_, index) => {
        const nextIndex = index + 1;
        const rotationAngle = (index + 1) * 60; // Adjusted for 6 steps (360/6)
        
        const transitionDuration = 0.8;

        // 1. Rotate Circle
        tl.to(circleRef.current, {
          rotation: rotationAngle,
          ease: "power2.inOut",
          duration: 1.5,
        }, index === 0 ? 0.2 : ">");

        // 2. Current Step fades out - MOVE UP FURTHER TO CLEAR CENTER
        tl.to(stepRefs.current[index], {
          y: -150,
          opacity: 0,
          duration: transitionDuration * 0.8,
          ease: "power2.in",
        }, "<"); 

        // 3. Next Step fades in - DELAY FURTHER TO PREVENT OVERLAP
        tl.fromTo(stepRefs.current[nextIndex], 
          { y: 150, opacity: 0 },
          { 
            y: 0, 
            opacity: 1, 
            duration: transitionDuration, 
            ease: "power2.out",
          },
          "<0.5" // Increased delay to ensure previous text has moved out
        );
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden flex items-center justify-center"
      style={{ backgroundColor: 'var(--off-white)', color: 'var(--pitch-black)' }}
    >
      {/* Dot pattern background */}
      <div className="absolute inset-0 bg-dot-brutalist pointer-events-none opacity-20" />
      
      {/* Outer Oval - Neo-Brutalist */}
      <div 
        className="absolute w-[95vw] h-[85vh] rounded-[50%] flex items-center justify-center pointer-events-none" 
        style={{ 
          border: '3px dashed var(--pitch-black)',
          opacity: 0.3
        }}
      />

      {/* Inner Rotating Border and Arrows - Neo-Brutalist */}
      <div
        ref={circleRef}
        className="absolute w-[280px] h-[280px] md:w-[500px] md:h-[500px] xl:w-[620px] xl:h-[620px] rounded-full flex items-center justify-center will-change-transform z-0 pointer-events-none"
        style={{ 
          border: '4px solid var(--pitch-black)',
          boxShadow: '0 0 0 8px var(--off-white), 0 0 0 12px var(--pitch-black)'
        }}
      >
        {/* Top Arrow */}
        <div 
          className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-sm" 
          style={{ 
            backgroundColor: 'var(--neon-yellow)',
            border: '2px solid var(--pitch-black)',
            clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'
          }} 
        />
        {/* Bottom Arrow */}
        <div 
          className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-6 h-6 rounded-sm rotate-180" 
          style={{ 
            backgroundColor: 'var(--electric-purple)',
            border: '2px solid var(--pitch-black)',
            clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'
          }} 
        />
        {/* Left Arrow */}
        <div 
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-6 h-6 rounded-sm -rotate-90" 
          style={{ 
            backgroundColor: 'var(--action-pink)',
            border: '2px solid var(--pitch-black)',
            clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'
          }} 
        />
        {/* Right Arrow */}
        <div 
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-6 h-6 rounded-sm rotate-90" 
          style={{ 
            backgroundColor: 'var(--neon-yellow)',
            border: '2px solid var(--pitch-black)',
            clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'
          }} 
        />
      </div>

      {/* Content Container */}
      <div className="relative w-full h-full flex items-center justify-center z-10 pointer-events-none">
        <div className="relative w-full max-w-[800px] h-[400px] flex items-center justify-center">
          {steps.map((step, i) => (
            <div
              key={i}
              ref={(el) => (stepRefs.current[i] = el)}
              className="absolute inset-0 opacity-0 flex flex-col items-center justify-center text-center p-8"
            >
              <h3 
                className="text-lg md:text-2xl font-black tracking-wider uppercase mb-4 font-bebas"
                style={{ color: 'var(--pitch-black)' }}
              >
                {step.heading}
              </h3>
              <p 
                className="text-sm md:text-base leading-relaxed font-space font-medium max-w-[500px] mx-auto"
                style={{ color: 'var(--pitch-black)', opacity: 0.8 }}
              >
                {step.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutInfo;

// test commit