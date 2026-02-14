'use client';

import { useState, useEffect } from "react";
import HeroSection from '@/components/Home/HeroSection';
import { AuroraCore } from "@/components/ui/AuroraCore";
import ScrollController from '@/components/ScrollController/ScrollScenes';
import About from '@/components/Home/About';
import Blog from '@/components/Sections/Blog';
import Contact from '@/components/Sections/Contact';
import ProjectGalleryCSS from '@/components/Home/ProjectGalleryCSS';
import ProjectHeader from '@/components/Home/ProjectHeader';

export default function Home() {
  const [isLightTheme, setIsLightTheme] = useState(false);

  // Apply light theme class to body
  useEffect(() => {
    if (isLightTheme) {
      document.body.classList.add('light-theme');
    } else {
      document.body.classList.remove('light-theme');
    }
  }, [isLightTheme]);

  return (
    <main id="smooth-scroll-container" className="relative w-full overflow-clip">
      <ScrollController />

      {/* Shared Background - Scrolls with page, extends into About */}
      <div className="absolute top-0 left-0 w-full h-[140vh] z-0 pointer-events-none">
        <AuroraCore
          id="tsparticleshero"
          background="transparent"
          particleDensity={8}
          className="w-full h-full"
        />
        {/* Seamless fade to black */}
        <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-black via-black/80 to-transparent" />
      </div>

      <div className="relative z-10">
        <HeroSection />
        <About />
        <ProjectHeader isLightTheme={isLightTheme} />

        <ProjectGalleryCSS setLightTheme={setIsLightTheme} />

        {/* <Projects /> */}
        {/* <Testimonials /> */}
        <Blog />
        <Contact />
      </div>
    </main>
  );
}
