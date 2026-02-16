'use client';

import HeroSection from '@/components/sections/Hero';
import { AuroraCore } from "@/components/ui/AuroraCore";
import About from '@/components/sections/About';
import ProjectGalleryCSS from '@/components/projects/ProjectGalleryCSS';
import ProjectHeader from '@/components/projects/ProjectHeader';
import Testimonials from '@/components/sections/Testimonials';

export default function HomeLogic() {
  return (
    <main className="relative w-full overflow-y-clip">

      {/* Shared Background - Scrolls with page, extends into About */}
      <div className="absolute top-0 left-0 w-full h-[110vh] lg:h-[130vh] z-0 pointer-events-none">
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
      </div>
    </main>
  );
}
