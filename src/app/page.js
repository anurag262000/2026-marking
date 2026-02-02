'use client';

import HeroSection from '@/components/HeroSection';
import ScrollController from '@/components/ScrollController/ScrollScenes';
import About from '@/components/Sections/About';
import WeaponRack from '@/components/Sections/WeaponRack';
import Projects from '@/components/Sections/Projects';
import Skills from '@/components/Sections/Skills';
import Experience from '@/components/Sections/Experience';
import Blog from '@/components/Sections/Blog';
import Contact from '@/components/Sections/Contact';

export default function Home() {
  return (
    <main id="smooth-scroll-container">
      <ScrollController />

      <HeroSection />
      <About />
      <WeaponRack />
      <Projects />
      <Skills />
      <Experience />
      <Blog />
      <Contact />
    </main>
  );
}
