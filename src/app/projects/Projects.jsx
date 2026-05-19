"use client";

import React, { useEffect, useState } from "react";
import ProjectGalleryModern from "@/components/Projects/ProjectGalleryModern";
import { ReactLenis } from "@studio-freight/react-lenis";
import Link from "next/link";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { AuroraCore } from "@/components/ui/AuroraCore";

gsap.registerPlugin(ScrollTrigger);

/**
 * Main Projects Page Component
 * Features scroll-triggered animations and fancy gallery layout
 */
export default function ProjectsPage() {
  const [isLightTheme, setIsLightTheme] = useState(false);
  const heroRef = useRef(null);
  const bannerRef = useRef(null);

  useLayoutEffect(() => {
    let ctx;

    // delaying the animation initialization to allow the navbar close transition to finish
    // and the DOM to stabilize (prevents race condition with overflow changes)
    const timer = setTimeout(() => {
        ScrollTrigger.refresh();

        ctx = gsap.context(() => {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: heroRef.current,
              start: "top top",
              end: "+=150%", // Increased distance for more breathing room after expansion
              pin: true,
              scrub: 1,
              anticipatePin: 1
            }
          });

          // Set initial state
          gsap.set(bannerRef.current, { scale: 0.65, borderRadius: "3rem" });

          // Animate banner to full screen
          tl.to(bannerRef.current, {
            scale: 1,
            borderRadius: "0rem",
            ease: "power2.inOut",
            duration: 1
          });

          // Add a "dead scroll" at the end of the hero timeline
          // to ensure it stays locked for a bit before gallery starts
          tl.to({}, { duration: 0.5 });

        }, heroRef);
    }, 100); // Small delay to allow layout to settle

    return () => {
        clearTimeout(timer);
        if (ctx) ctx.revert();
    };
  }, []);

  // Sync with body class for global theming
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsLightTheme(document.body.classList.contains('light-theme'));
    });

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['class']
    });

    // Initial check
    setIsLightTheme(document.body.classList.contains('light-theme'));

    return () => observer.disconnect();
  }, []);

  return (
    <ReactLenis root options={{ lerp: 0.05, duration: 1.2, smoothWheel: true }}>
      <main className="relative w-full min-h-screen bg-[var(--off-white)] text-[var(--pitch-black)] overflow-x-hidden transition-colors duration-700">

        {/* HERO SECTION: EXPANDING BANNER */}
        <section ref={heroRef} className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-[var(--off-white)] z-20">
            <div
                ref={bannerRef}
                style={{
                    willChange: "transform, border-radius",
                    width: "100%",
                    height: "100%",
                    transformOrigin: "center center",
                }}
                className="relative w-full h-full bg-[var(--pure-white)] overflow-hidden border-[3px] border-[var(--pitch-black)] z-10 shadow-[6px_6px_0px_var(--pitch-black)]"
            >
                {/* Neo-Brutalist Dot Pattern */}
                <div className="absolute inset-0 bg-dot-brutalist pointer-events-none opacity-25 z-0" />

                {/* Texture Overlay */}
                <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none" />

                {/* Static Hero Text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden z-10">
                    {/* Rotating sticker above heading */}
                    <div 
                      className="mb-4 px-4 py-2 font-space font-black uppercase text-xs md:text-sm tracking-wider rounded-md border-[3px] border-[var(--pitch-black)] shadow-[4px_4px_0px_var(--pitch-black)] rotate-[-4deg]"
                      style={{ backgroundColor: 'var(--action-pink)', color: 'var(--pure-white)' }}
                    >
                      WORK ARCHIVE 📁
                    </div>

                    <h1
                        className="font-bebas font-black text-[var(--pitch-black)] text-[12vw] md:text-[8rem] lg:text-[10rem] uppercase tracking-tighter select-none text-center leading-none"
                        style={{
                            textShadow: "6px 6px 0px var(--neon-yellow)"
                        }}
                    >
                        PROJECT SHOWCASE
                    </h1>

                    <div 
                      className="mt-6 px-4 py-2 font-space font-black uppercase text-xs md:text-sm tracking-wider rounded-md border-[3px] border-[var(--pitch-black)] shadow-[4px_4px_0px_var(--pitch-black)] rotate-[3deg]"
                      style={{ backgroundColor: 'var(--electric-purple)', color: 'var(--pure-white)' }}
                    >
                      100% AUTHENTIC 🔌
                    </div>
                </div>
            </div>
        </section>

        {/* The New Gallery takes over the main display */}
        <ProjectGalleryModern setLightTheme={setIsLightTheme} />
      </main>
    </ReactLenis>
  );
}
