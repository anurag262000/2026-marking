"use client";

import React, { useEffect, useState } from "react";
import ProjectGalleryModern from "@/components/Projects/ProjectGalleryModern";
<<<<<<< Updated upstream
=======
import { ReactLenis } from "@studio-freight/react-lenis";
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
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
=======
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "+=100%", // Pin for 100vh worth of scroll
          pin: true,
          scrub: 1, // Smooth scrub
          anticipatePin: 1
        }
      });

      // Animate banner from "container" style to "full screen" style
      tl.to(bannerRef.current, {
        width: "100%",
        maxWidth: "100%", // Force full width expansion
        height: "100vh",
        borderRadius: "0rem",
        ease: "none",
        duration: 1
      });

    }, heroRef);
    return () => ctx.revert();
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
=======
    <ReactLenis root options={{ lerp: 0.05, duration: 1.2, smoothWheel: true }}>
>>>>>>> Stashed changes
      <main className="relative w-full min-h-screen bg-black text-white overflow-x-hidden transition-colors duration-700">

        {/* HERO SECTION: EXPANDING BANNER */}
        {/* Initially full viewport height, but content centered */}
<<<<<<< Updated upstream
        {/* HERO SECTION: EXPANDING BANNER */}
        {/* Reduced height as requested */}
        {/* HERO SECTION: EXPANDING BANNER */}
        {/* Initially full viewport height, container pins and inner element expands */}
=======
>>>>>>> Stashed changes
        <section ref={heroRef} className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-black z-20">
            <div
                ref={bannerRef}
                style={{
<<<<<<< Updated upstream
                    willChange: "transform, border-radius",
                    width: "100%",
                    height: "100%",
                    transformOrigin: "center center",
                }}
                className="relative w-full h-full bg-[#111] overflow-hidden border border-white/5 z-10 shadow-2xl"
=======
                    willChange: "width, height, borderRadius",
                    transform: "translate3d(0,0,0)",
                    backfaceVisibility: "hidden"
                }}
                className="relative w-[90%] max-w-[1400px] h-[50vh] md:h-[60vh] rounded-[3rem] bg-[#111] overflow-hidden border border-white/5 z-10 shadow-2xl"
>>>>>>> Stashed changes
            >
                {/* Background Aurora Effect */}
                <div className="absolute inset-0 w-full h-full z-0 pointer-events-none opacity-50 blur-3xl transform-gpu">
                    <AuroraCore
                        id="tsparticleshero"
                        background="transparent"
                        particleDensity={5}
                        className="w-full h-full"
                        blur={100}
                        speed={0.5}
                    />
                </div>

                {/* Texture Overlay */}
                <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none" />

                {/* Static Hero Text */}
                <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                    <h1
<<<<<<< Updated upstream
                        className="font-orbitron font-bold text-white text-[10vw] md:text-[6rem] lg:text-[8rem] uppercase tracking-tighter select-none text-center leading-none"
=======
                        className="font-orbitron font-bold text-white text-[12vw] md:text-[8rem] lg:text-[10rem] uppercase tracking-tighter select-none text-center leading-none"
>>>>>>> Stashed changes
                        style={{
                            textShadow: "0 0 30px rgba(255,255,255,0.1)"
                        }}
                    >
                        PROJECT SHOWCASE
                    </h1>
                </div>
<<<<<<< Updated upstream

                {/* Light Sweep Animation */}
                <motion.div
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{
                        duration: 1.5,
                        ease: "easeInOut",
                        repeat: Infinity,
                        repeatDelay: 10 // Runs every ~11.5s
                    }}
                    className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-[-20deg] pointer-events-none mix-blend-overlay"
                />
            </div>
        </section>

        {/* The New Gallery takes over the main display */}
        <ProjectGalleryModern setLightTheme={setIsLightTheme} />

=======

                {/* Light Sweep Animation */}
                <motion.div
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{
                        duration: 1.5,
                        ease: "easeInOut",
                        repeat: Infinity,
                        repeatDelay: 10 // Runs every ~11.5s
                    }}
                    className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-[-20deg] pointer-events-none mix-blend-overlay"
                />
            </div>
        </section>

        {/* The New Gallery takes over the main display */}
        <ProjectGalleryModern setLightTheme={setIsLightTheme} />

        {/* Footer CTA */}
        {/* <section className="relative py-32 border-t border-white/10 bg-black">
          <div className="container mx-auto px-6 md:px-12 text-center">
            <h2 className="text-4xl md:text-6xl font-helvetica font-thin italic mb-6 text-white">
              Let's Build Something Amazing
            </h2>
            <p className="text-lg text-white/60 mb-12 max-w-2xl mx-auto">
              Interested in working together? Let's discuss how I can help bring your project to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/#contact"
                className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-orbitron uppercase tracking-wider text-sm transition-all duration-300 hover:scale-105"
              >
                Get In Touch
              </Link>
              <Link
                href="/"
                className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/20 hover:border-opacity-40 rounded-lg font-orbitron uppercase tracking-wider text-sm transition-all duration-300"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </section> */}
>>>>>>> Stashed changes
      </main>
  );
}
