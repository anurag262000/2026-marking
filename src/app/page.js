import HeroSection from '@/components/HeroSection';
import Navbar from '@/components/Navbar';
import AboutSection from '@/components/AboutSection';
import ProjectsSection from '@/components/ProjectsSection';
import ExperienceSection from '@/components/ExperienceSection';
import ContactSection from '@/components/ContactSection';
import OceanSunset from '@/components/OceanSunset';

export default function Home() {
  return (
    <>
      <div className="relative">
        <Navbar />

        {/* Main Content */}
        <main className="relative z-10">
          <HeroSection />
          <AboutSection />
          <ProjectsSection />
          <ExperienceSection />
          <ContactSection />
        </main>

        {/* Ocean Sunset Footer */}
        <OceanSunset />

        {/* Scroll container for ocean animation */}
        <div className="scroll-container"></div>
      </div>
    </>
  );
}
