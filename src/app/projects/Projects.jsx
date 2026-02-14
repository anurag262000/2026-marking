"use client";

import React, { useEffect, useRef, useState } from "react";
import ProjectsHero from "@/components/Projects/ProjectsHero";
import ProjectDetail from "@/components/Projects/ProjectDetail";
import projects from "@/components/Home/projectsExtended.json";
import { ReactLenis } from "@studio-freight/react-lenis";
import Link from "next/link";

/**
 * Main Projects Page Component
 * Features scroll-triggered animations and fancy gallery layout
 */
export default function ProjectsPage() {
  const [isLightTheme, setIsLightTheme] = useState(false);

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

  // Theme-aware classes
  const textPrimary = isLightTheme ? 'text-slate-900' : 'text-white';
  const textSecondary = isLightTheme ? 'text-slate-700' : 'text-white/60';
  const borderColor = isLightTheme ? 'border-slate-200' : 'border-white/10';
  const bgMain = isLightTheme ? 'bg-slate-50' : 'bg-black';

  return (
    <ReactLenis root options={{ lerp: 0.05, duration: 1.2, smoothWheel: true }}>
      <main className={`relative w-full min-h-screen ${bgMain} ${textPrimary} overflow-x-hidden transition-colors duration-700`}>

        {/* Background effects */}
        <div className="fixed inset-0 -z-10">
          <div className={`absolute inset-0 ${isLightTheme ? 'bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.08),transparent_50%)]' : 'bg-[radial-gradient(circle_at_50%_50%,rgba(251,146,60,0.05),transparent_50%)]'}`}></div>
          <div className={isLightTheme ? 'absolute inset-0 bg-dot-thick-neutral-300' : 'absolute inset-0 bg-dot-thick-neutral-800'}></div>
        </div>

        {/* Hero Section */}
        <ProjectsHero />

        {/* Projects Gallery */}
        <div className="relative z-10">
          {projects.map((project, index) => (
            <ProjectDetail
              key={project.id}
              project={project}
              index={index}
              isLast={index === projects.length - 1}
              isLightTheme={isLightTheme}
            />
          ))}
        </div>

        {/* Footer CTA */}
        <section className={`relative py-32 border-t ${borderColor}`}>
          <div className="container mx-auto px-6 md:px-12 text-center">
            <h2 className={`text-4xl md:text-6xl font-helvetica font-thin italic mb-6 ${textPrimary}`}>
              Let's Build Something Amazing
            </h2>
            <p className={`text-lg ${textSecondary} mb-12 max-w-2xl mx-auto`}>
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
                className={`px-8 py-4 ${isLightTheme ? 'bg-slate-200 hover:bg-slate-300 text-slate-900' : 'bg-white/5 hover:bg-white/10 text-white'} border ${isLightTheme ? 'border-slate-300' : 'border-white/20'} hover:border-opacity-40 rounded-lg font-orbitron uppercase tracking-wider text-sm transition-all duration-300`}
              >
                Back to Home
              </Link>
            </div>
          </div>
        </section>
      </main>
    </ReactLenis>
  );
}
