"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Import Section Components
import AboutHero from "./AboutHero";
import AboutEducation from "./AboutEducation";
import AboutExperience from "./AboutExperience";
import AboutFreelancing from "./AboutFreelancing";
import AboutTechStack from "./AboutTechStack";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AboutPage() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animations
      gsap.from(".hero-line", {
        opacity: 0,
        y: 60,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        delay: 0.1,
      });
      gsap.from(".hero-img", {
        opacity: 0,
        x: 60,
        scale: 0.95,
        duration: 1,
        ease: "power3.out",
        delay: 0.25,
      });
      gsap.from(".hero-badge", {
        opacity: 0,
        y: -16,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        delay: 0.5,
      });

      // Section reveals
      gsap.utils.toArray(".reveal-section").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 50,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 82%",
            once: true,
          },
        });
      });

      // Timeline cards stagger
      gsap.utils.toArray(".timeline-card").forEach((el, i) => {
        gsap.from(el, {
          opacity: 0,
          x: -40,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            once: true,
          },
          delay: i * 0.1,
        });
      });

      // Freelance cards
      gsap.utils.toArray(".free-card").forEach((el, i) => {
        gsap.from(el, {
          opacity: 0,
          y: 40,
          scale: 0.97,
          duration: 0.65,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            once: true,
          },
          delay: i * 0.1,
        });
      });

      // Stack rows
      gsap.utils.toArray(".stack-row").forEach((el, i) => {
        gsap.from(el, {
          opacity: 0,
          x: -24,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            once: true,
          },
          delay: i * 0.08,
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden">
      {/* ─── Bg Accents ─── */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none z-0" />
      <div className="fixed top-0 left-1/3 w-[500px] h-[500px] bg-blue-600/6 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="fixed bottom-1/4 right-0 w-[400px] h-[400px] bg-purple-600/6 rounded-full blur-[100px] pointer-events-none z-0" />

      <div className="relative z-10">
        <AboutHero />
        <AboutEducation />
        <AboutExperience />
        <AboutFreelancing />
        <AboutTechStack />
      </div>
    </div>
  );
}
