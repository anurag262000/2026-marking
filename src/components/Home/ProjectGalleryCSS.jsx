"use client";

import { useRef, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import projects from './projectsExtended.json';

gsap.registerPlugin(ScrollTrigger);

export default function ProjectGalleryCSS({ setLightTheme }) {
  const pathname = usePathname();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileIsLight, setMobileIsLight] = useState(false);

  const sectionRef = useRef(null);
  const pinContainerRef = useRef(null);
  const sidebarRef = useRef(null);
  const cardsRef = useRef([]);
  const mobileScrollRef = useRef(null);
  const activeIndexRef = useRef(0);
  const setLightThemeRef = useRef(setLightTheme);

  // Keep refs in sync
  useEffect(() => {
    setLightThemeRef.current = setLightTheme;
  }, [setLightTheme]);

  // Route change handler
  useEffect(() => {
    const timer = setTimeout(() => {
      ScrollTrigger.refresh(true);
    }, 200);
    return () => clearTimeout(timer);
  }, [pathname]);

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Desktop: Stacking card effect
  useEffect(() => {
    if (isMobile) return;

    const section = sectionRef.current;
    const sidebar = sidebarRef.current;
    const pinContainer = pinContainerRef.current;
    const cards = cardsRef.current.filter(Boolean);

    if (!section || !sidebar || !pinContainer || cards.length === 0) return;

    const ctx = gsap.context(() => {
      const totalCards = cards.length;
      const scrollPerCard = window.innerHeight * 1.2;
      const totalScroll = scrollPerCard * totalCards;

      // Pin the section for the entire scroll duration
      ScrollTrigger.create({
        trigger: section,
        pin: pinContainer,
        start: "top top",
        end: () => `+=${totalScroll}`,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      });

      // Animate each card (except first) to slide in from right
      cards.forEach((card, index) => {
        if (index === 0) return; // first card is already visible

        // Start each card off-screen to the right
        gsap.set(card, { xPercent: 100 });

        // Slide card in from right to cover previous
        gsap.to(card, {
          xPercent: 0,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: section,
            start: () => `top+=${scrollPerCard * index} top`,
            end: () => `top+=${scrollPerCard * (index + 0.6)} top`,
            scrub: 0.5,
            invalidateOnRefresh: true,
          }
        });
      });

      // Master progress tracker for sidebar updates + theme
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: () => `+=${totalScroll}`,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const progress = self.progress;
          const rawIndex = Math.floor(progress * totalCards);
          const newIndex = Math.max(0, Math.min(totalCards - 1, rawIndex));

          if (newIndex !== activeIndexRef.current) {
            activeIndexRef.current = newIndex;
            setActiveIndex(newIndex);
          }

          // Theme
          const shouldBeLight = progress > 0.02 && progress < 0.95;
          if (shouldBeLight) {
            sidebar.classList.add("is-light-mode");
          } else {
            sidebar.classList.remove("is-light-mode");
          }
          if (setLightThemeRef.current) {
            setLightThemeRef.current(shouldBeLight);
          }
        },
        onLeave: () => {
          sidebar.classList.remove("is-light-mode");
          if (setLightThemeRef.current) setLightThemeRef.current(false);
        },
        onLeaveBack: () => {
          sidebar.classList.remove("is-light-mode");
          if (setLightThemeRef.current) setLightThemeRef.current(false);
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile]);

  // Mobile: IntersectionObserver for theme
  useEffect(() => {
    if (!isMobile) return;
    const el = mobileScrollRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isLight = entry.isIntersecting;
        setMobileIsLight(isLight);
        if (setLightThemeRef.current) setLightThemeRef.current(isLight);
      },
      { threshold: 0.8 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [isMobile]);

  const activeProject = projects[activeIndex];

  return (
    <section ref={sectionRef} className="relative z-20 bg-transparent" id="projects-gallery">

      {/* DESKTOP VIEW */}
      <div ref={pinContainerRef} className="hidden md:block relative w-full h-[100dvh] overflow-hidden">
        <div className="flex relative w-full h-full">

          {/* Left Sidebar */}
          <div
            ref={sidebarRef}
            className="desktop-sidebar relative z-30 w-[40%] h-full flex flex-col justify-center p-10 border-r transition-colors duration-700 backdrop-blur-xl"
          >
            <style jsx>{`
              .desktop-sidebar {
                background: rgba(10, 10, 10, 0.4);
                border-color: rgba(255, 255, 255, 0.1);
                color: white;
              }
              .desktop-sidebar.is-light-mode {
                background: rgba(247, 247, 245, 0.9);
                border-color: rgba(0, 0, 0, 0.1);
                color: #0f172a;
              }
            `}</style>

            <div className="space-y-8">
              <div className="space-y-1">
                <span className="text-sm tracking-widest uppercase font-bold opacity-50">Organization</span>
                <h3 className="text-3xl font-semibold italic">{activeProject.org}</h3>
              </div>

              <div className="space-y-2">
                <span className="text-sm tracking-widest uppercase font-bold opacity-50">Project</span>
                <h2 className="text-5xl lg:text-7xl font-helvetica italic font-normal leading-[1.1]">
                  {activeProject.title}
                </h2>
              </div>

              <div className="space-y-1">
                <span className="text-sm tracking-widest uppercase font-bold opacity-50">Role</span>
                <p className="text-2xl italic font-semibold">{activeProject.team}</p>
              </div>

              <p className="text-base leading-relaxed opacity-80 max-w-md">
                {activeProject.fullDescription}
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                {activeProject.technologies.slice(0, 4).map((tech, i) => (
                  <span
                    key={i}
                    className="px-4 py-1.5 text-xs font-orbitron uppercase tracking-wider rounded-full border opacity-70"
                    style={{
                      background: 'rgba(255,255,255,0.05)',
                      borderColor: 'currentColor'
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <Link
                href={activeProject.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-orbitron text-xs uppercase tracking-[0.2em] rounded-lg transition-all transform hover:scale-105"
              >
                Launch Site ↗
              </Link>
            </div>
          </div>

          {/* Right Gallery - Stacking Cards */}
          <div className="relative w-[60%] h-full" style={{ clipPath: 'inset(0)' }}>
            {projects.map((project, index) => (
              <div
                key={project.id}
                ref={el => cardsRef.current[index] = el}
                className="absolute inset-0 w-full h-full"
                style={{
                  zIndex: index + 1,
                }}
              >
                <Image
                  src={project.thumbnail}
                  alt={project.title}
                  fill
                  sizes="60vw"
                  className="object-cover"
                  priority={index < 2}
                />
                {/* Dark gradient for depth */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(to top, rgba(0,0,0,0.2) 0%, transparent 40%)',
                  }}
                />
                {/* Project number */}
                <div className="absolute bottom-8 right-8 font-orbitron text-white/20 text-8xl font-bold">
                  {String(index + 1).padStart(2, '0')}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MOBILE VIEW */}
      <div className="md:hidden relative min-h-screen py-20">
        <div ref={mobileScrollRef} className="space-y-12 px-6">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="mobile-card rounded-2xl overflow-hidden border shadow-xl transition-all duration-500"
              style={{
                background: mobileIsLight ? 'rgba(255,255,255,0.9)' : 'rgba(0,0,0,0.6)',
                borderColor: mobileIsLight ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)',
                color: mobileIsLight ? '#0f172a' : 'white'
              }}
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={project.thumbnail}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw"
                  className="object-cover"
                />
              </div>

              <div className="p-6 space-y-4 backdrop-blur-xl">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider opacity-60">{project.org}</span>
                  <span className="text-xs opacity-60">{project.team}</span>
                </div>

                <h3 className="text-2xl font-helvetica italic font-thin">{project.title}</h3>

                <p className="text-xs leading-relaxed opacity-70 line-clamp-2">
                  {project.fullDescription}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.technologies.slice(0, 3).map((tech, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 text-[9px] font-orbitron uppercase rounded-full border opacity-50"
                      style={{ borderColor: 'currentColor' }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <Link
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block w-full text-center px-4 py-3 bg-blue-600 hover:bg-blue-500 text-white font-orbitron text-[10px] uppercase tracking-[0.2em] rounded-lg transition-all mt-2"
                >
                  Launch Site ↗
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
