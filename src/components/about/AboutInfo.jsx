"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const AboutInfo = () => {
  const sectionRef = useRef(null);
  const circleRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Rotation animation for the INNER CIRCLE BORDER
      gsap.to(circleRef.current, {
        rotation: 360,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=2000",
          scrub: true,
          pin: true,
          anticipatePin: 1,
        },
      });

      // Text animation (static position fade in)
      gsap.from(textRef.current, {
        y: 40,
        opacity: 0,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 40%",
          toggleActions: "play none none reverse",
          once: false,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen bg-[#f3efe9] overflow-hidden flex items-center justify-center text-[#222]"
    >
      {/* Outer Oval - Now STATIC and PADDED */}
      <div className="absolute w-[90vw] h-[80vh] border border-dotted border-[#222] rounded-[50%] flex items-center justify-center" />

      {/* Inner Rotating Border and Arrows */}
      <div
        ref={circleRef}
        className="absolute w-[300px] h-[300px] md:w-[583px] md:h-[583px] border border-dotted border-[#222] rounded-full flex items-center justify-center will-change-transform z-0"
      >
        {/* CSS Arrows moved to the inner circle */}
        {/* Top Arrow */}
        <div 
          className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[#222]" 
          style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
        />
        {/* Bottom Arrow */}
        <div 
          className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-4 h-4 bg-[#222] rotate-180" 
          style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
        />
        {/* Left Arrow */}
        <div 
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-[#222] -rotate-90" 
          style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
        />
        {/* Right Arrow */}
        <div 
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-4 h-4 bg-[#222] rotate-90" 
          style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
        />
      </div>

      {/* Inner Static Text Content */}
      <div className="relative w-[300px] h-[300px] md:w-[500px] md:h-[500px] flex items-center justify-center z-10 box-border p-8">
        <div ref={textRef} className="text-center max-w-[400px]">
          {/* Small Icon matching second reference image */}
          <div className="flex justify-center mb-6">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-[#222]"
            >
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M12 16.5V16.5" />
            </svg>
          </div>
          <p className="text-sm md:text-base text-[#222] leading-relaxed font-medium">
            Creative Full-Stack Developer blending technical excellence with cinematic design. Turning complex ideas into fluid, interactive digital experiences that leave a lasting impression. Dedicated to crafting seamless, visually stunning applications that bridge the gap between imagination and reality.
          </p>
          <div className="mt-8 flex justify-center">
            <div className="w-10 h-10 flex items-center justify-center border border-[#222]/30 rounded-full">
               <span className="text-xs">✦</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutInfo;
