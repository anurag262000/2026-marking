"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const steps = [
  {
    heading: "WHO WE ARE",
    text: "A collective of creative developers dedicated to pushing technical boundaries. We blend engineering with artistic vision to create standout digital products.",
  },
  {
    heading: "OUR STACK",
    text: "Using Next.js, React, and GSAP, we build scalable architectures with cinematic animations that bring digital stories to life with fluid precision.",
  },
  {
    heading: "EXPERIENCE",
    text: "Successfully partnered with global brands to deliver high-impact digital experiences, from complex SaaS platforms to immersive brand narratives.",
  },
  {
    heading: "OUR VISION",
    text: "Bridging imagination and reality through clean code and minimalist aesthetics. We create an interactive, inclusive, and inspiring web experience.",
  },
  {
    heading: "THE GOAL",
    text: "Building production-ready applications that leave a lasting digital impression. We strive for perfection, ensuring your presence is innovative.",
  },
  {
    heading: "INNOVATION",
    text: "Constantly experimenting with new technologies to stay ahead. We deliver future-proof solutions by embracing change and challenging the status quo.",
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
      className="relative w-full h-screen bg-[#ffffff] overflow-hidden flex items-center justify-center text-[#000000]"
    >
      {/* Outer Oval - STATIC and PADDED */}
      <div className="absolute w-[95vw] h-[85vh] border border-dotted border-[#000000] rounded-[50%] flex items-center justify-center pointer-events-none" />

      {/* Inner Rotating Border and Arrows - SMALLER TO INCREASE GAP */}
      <div
        ref={circleRef}
        className="absolute w-[280px] h-[280px] md:w-[500px] md:h-[500px] xl:w-[620px] xl:h-[620px] border border-dotted border-[#000000] rounded-full flex items-center justify-center will-change-transform z-0 pointer-events-none"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[#000000]" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-4 h-4 bg-[#000000] rotate-180" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />
        <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-[#000000] -rotate-90" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-4 h-4 bg-[#000000] rotate-90" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />
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
              <h3 className="text-base md:text-xl font-extrabold tracking-[0.4em] text-[#000000] uppercase mb-4">
                {step.heading}
              </h3>
              <p className="text-sm md:text-base text-[#000000] leading-relaxed font-medium max-w-[400px] mx-auto">
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