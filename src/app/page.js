import HeroSection from '@/components/HeroSection';
import Projects from '@/components/Sections/Projects';
import Skills from '@/components/Sections/Skills';
import Experience from '@/components/Sections/Experience';
import Blog from '@/components/Sections/Blog';
import Contact from '@/components/Sections/Contact';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <Projects />
      <Skills />
      <Experience />
      <Blog />
      <Contact />
    </main>
  );
}
