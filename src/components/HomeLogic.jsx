import HeroSection from './sections/Hero.jsx';
import { AuroraCore } from "./ui/AuroraCore.jsx";
import About from './sections/About.jsx';
import ProjectGalleryCSS from './projects/ProjectGalleryCSS.jsx';
import ProjectHeader from './projects/ProjectHeader.jsx';
import Testimonials from './sections/Testimonials.jsx';
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
        <Testimonials />
      </div>
    </main>
  );
}
