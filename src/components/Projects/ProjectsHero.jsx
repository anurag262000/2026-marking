"use client";
import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextReveal from "./TextReveal";

const ProjectsHero = () => {
  const heroRef = useRef(null);
  const scrollIndicatorRef = useRef(null);

  useEffect(() => {
    if (!heroRef.current) return;
    const ctx = gsap.context(() => {
      if (scrollIndicatorRef.current) {
        gsap.to(scrollIndicatorRef.current, { y: 10, duration: 1.5, repeat: -1, yoyo: true, ease: "power1.inOut" });
      }
      gsap.to(heroRef.current, { opacity: 0, scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom top", scrub: 1 } });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-6 md:px-12 text-center">
        {/* Updated: Blue decorative line */}
        <div className="flex justify-center mb-8">
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-9xl font-helvetica font-thin italic mb-6 leading-tight">
          <TextReveal mode="words" stagger={0.08} duration={1}>Selected Works</TextReveal>
        </h1>

        <p className="text-lg md:text-xl text-blue-400/80 font-orbitron uppercase tracking-widest mb-12">
          <TextReveal mode="chars" stagger={0.02} duration={0.5}>Architecting Future-Proof Systems</TextReveal>
        </p>

        <div ref={scrollIndicatorRef} className="absolute bottom-12 left-1/2 -translate-x-1/2">
          <div className="flex flex-col items-center gap-3">
            <span className="text-xs text-white/40 uppercase tracking-widest font-orbitron">Scroll</span>
            <div className="w-6 h-10 border-2 border-blue-500/20 rounded-full flex items-start justify-center p-2">
              <div className="w-1 h-3 bg-blue-500/40 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
      {/* Updated: Blue-themed background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black via-blue-950/10 to-black pointer-events-none"></div>
    </section>
  );
};
export default ProjectsHero;
