'use client';

import { useState, useEffect } from "react";
import HeroSection from '@/components/Home/HeroSection';
import { AuroraCore } from "@/components/ui/AuroraCore";
import About from '@/components/Home/About';
import Blog from '@/components/Sections/Blog';
import Contact from '@/components/Sections/Contact';
import ProjectGalleryCSS from '@/components/Home/ProjectGalleryCSS';
import ProjectHeader from '@/components/Home/ProjectHeader';
import Testimonials from '@/components/Sections/Testimonials';

export default function Home() {
  return (
    <main className="relative w-full overflow-y-clip">

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
        <ProjectHeader />

        <ProjectGalleryCSS />

        <Testimonials />

        {/* <Projects /> */}
        {/* <Testimonials /> */}
        {/* <Blog /> */}
        {/* <Contact /> */}
      </div>
    </main>
  );
}
