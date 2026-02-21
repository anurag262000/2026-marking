import HeroSection from '@/components/Sections/Hero';
import { AuroraCore } from '@/components/ui/AuroraCore';
import About from '@/components/Sections/About';
import ProjectGalleryCSS from '@/components/Projects/ProjectGalleryCSS';
import ProjectHeader from '@/components/Projects/ProjectHeader';
import HomeTestimonials from '@/components/Sections/HomeTestimonials';
// test commit

export default function HomeLogic() {
  return (
    <main className="relative w-full overflow-hidden bg-black text-white">
      {/* Background aurora effect */}
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
        {/* Theme Comparison: One white, one black */}
        <HomeTestimonials theme="light" />
        <HomeTestimonials theme="dark" />
      </div>
    </main>
  );
}
