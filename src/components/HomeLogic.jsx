import HeroSection from '@/components/Sections/Hero';
import { AuroraCore } from '@/components/ui/AuroraCore';
import About from '@/components/Sections/About';
import ProjectGalleryCSS from '@/components/Projects/ProjectGalleryCSS';
import ProjectHeader from '@/components/Projects/ProjectHeader';
import HomeTestimonials from '@/components/Sections/HomeTestimonials';
// test commit

export default function HomeLogic() {
  return (
    <main className="relative w-full overflow-hidden" style={{ backgroundColor: 'var(--off-white)', color: 'var(--pitch-black)' }}>
      {/* Background aurora effect - subtle for neo-brutalist theme */}
      <div className="absolute top-0 left-0 w-full h-[110vh] lg:h-[130vh] z-0 pointer-events-none opacity-20">
        <AuroraCore
          id="tsparticleshero"
          background="transparent"
          particleDensity={8}
          className="w-full h-full"
        />
        {/* Seamless fade to off-white */}
        <div className="absolute bottom-0 left-0 w-full h-64" style={{ background: 'linear-gradient(to top, var(--off-white), transparent)' }} />
      </div>

      <div className="relative z-10">
        <HeroSection />
        <About />
        <ProjectHeader />
        <ProjectGalleryCSS />
        <HomeTestimonials theme="light" />
      </div>
    </main>
  );
}

// switch branch