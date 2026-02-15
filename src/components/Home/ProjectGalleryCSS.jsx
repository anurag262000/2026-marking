"use client";

import { useRef, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import projects from './projectsExtended.json';

gsap.registerPlugin(ScrollTrigger);

export default function ProjectGalleryCSS() {
  const pathname = usePathname();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const sectionRef = useRef(null);
  const pinContainerRef = useRef(null);
  const sidebarRef = useRef(null);
  const cardsRef = useRef([]);
  const mobileScrollRef = useRef(null);
  const activeIndexRef = useRef(0);


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

          // Direct DOM manipulation for performance
            // Dark mode (default)
            sidebar.style.background = 'rgba(10, 10, 10, 0.4)';
            sidebar.style.borderColor = 'rgba(255, 255, 255, 0.1)';
            sidebar.style.color = 'white';
        },
        onLeave: () => {
          sidebar.style.background = 'rgba(10, 10, 10, 0.4)';
          sidebar.style.borderColor = 'rgba(255, 255, 255, 0.1)';
          sidebar.style.color = 'white';
        },
        onLeaveBack: () => {
          sidebar.style.background = 'rgba(10, 10, 10, 0.4)';
          sidebar.style.borderColor = 'rgba(255, 255, 255, 0.1)';
          sidebar.style.color = 'white';
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile]);

  const limitedProjects = projects.slice(0, 4);
  const totalSlides = limitedProjects.length + 1; // +1 for Explore More
  const activeProject = activeIndex < limitedProjects.length ? limitedProjects[activeIndex] : null;
  const isExploreSlide = activeIndex === limitedProjects.length;

  return (
    <section ref={sectionRef} className="relative z-20 bg-transparent" id="projects-gallery">

      {/* DESKTOP VIEW */}
      <div ref={pinContainerRef} className="hidden md:block relative w-full h-[100dvh] overflow-hidden">
        <div className="flex relative w-full h-full">

          <div
            ref={sidebarRef}
            className="desktop-sidebar relative z-30 w-[40%] h-full flex flex-col justify-center p-10 border-r transition-all duration-700 backdrop-blur-xl"
            style={{
              background: 'rgba(10, 10, 10, 0.4)',
              borderColor: 'rgba(255, 255, 255, 0.1)',
              color: 'white',
            }}
          >
            {isExploreSlide ? (
               // EXPLORE MORE SIDEBAR CONTENT
               <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="space-y-1">
                    <span className="text-sm tracking-widest uppercase font-bold opacity-50">Archive</span>
                    <h3 className="text-3xl font-semibold italic">More Work</h3>
                  </div>

                  <div className="space-y-2">
                    <h2 className="text-5xl lg:text-7xl font-helvetica italic font-normal leading-[1.1]">
                      Explore More
                    </h2>
                  </div>

                  <p className="text-base leading-relaxed opacity-80 max-w-md">
                    This is a curated selection. Dive into my full repository of experiments, open-source contributions, and side projects on GitHub.
                  </p>

                  <div className="flex flex-col gap-4 pt-4">
                    <Link
                      href="/projects"
                      className={`inline-block px-8 py-4 bg-white text-black hover:bg-gray-200 font-orbitron text-sm uppercase tracking-[0.2em] rounded-lg transition-all transform hover:scale-105 text-center`}
                    >
                      View All Projects ↗
                    </Link>
                    <Link
                      href="/contact"
                      className="inline-block px-8 py-4 border border-current hover:opacity-50 font-orbitron text-sm uppercase tracking-[0.2em] rounded-lg transition-all text-center"
                    >
                      Contact Me
                    </Link>
                  </div>
               </div>
            ) : (
               // NORMAL PROJECT CONTENT
               <div className="space-y-8">
                  <div className="space-y-1">
                    <span className="text-sm tracking-widest uppercase font-bold opacity-50">Organization</span>
                    <h3 className="text-3xl font-semibold italic">{activeProject?.org}</h3>
                  </div>

                  <div className="space-y-2">
                    <span className="text-sm tracking-widest uppercase font-bold opacity-50">Project</span>
                    <h2 className="text-5xl lg:text-7xl font-helvetica italic font-normal leading-[1.1]">
                      {activeProject?.title}
                    </h2>
                  </div>

                  <div className="space-y-1">
                    <span className="text-sm tracking-widest uppercase font-bold opacity-50">Role</span>
                    <p className="text-2xl italic font-semibold">{activeProject?.team}</p>
                  </div>

                  <p className="text-base leading-relaxed opacity-80 max-w-md">
                    {activeProject?.fullDescription}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {activeProject?.technologies.slice(0, 4).map((tech, i) => (
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
                    href={activeProject?.liveUrl || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-block mt-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-orbitron text-xs uppercase tracking-[0.2em] rounded-lg transition-all transform hover:scale-105`}
                  >
                    Launch Site ↗
                  </Link>
                </div>
            )}
          </div>

          {/* Right Gallery - Stacking Cards */}
          <div className="relative w-[60%] h-full" style={{ clipPath: 'inset(0)' }}>
            {limitedProjects.map((project, index) => (
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

            {/* EXPLORE MORE CARD (Final Slide) */}
            <div
                ref={el => cardsRef.current[limitedProjects.length] = el}
                className="absolute inset-0 w-full h-full bg-[#050505] flex items-center justify-center p-10"
                style={{
                  zIndex: limitedProjects.length + 1,
                }}
            >
                <div className="absolute inset-0 opacity-[0.15] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-purple-900/20" />

                <div className="text-center relative z-10">
                   <h1 className="text-6xl md:text-8xl font-black text-white/10 font-orbitron tracking-tighter uppercase mb-4">
                      FIN
                   </h1>
                   <p className="text-white/40 font-mono tracking-widest text-sm uppercase">
                      End of Archive
                   </p>
                </div>
            </div>

          </div>
        </div>
      </div>

      {/* MOBILE VIEW — Horizontal Swipe Slider */}
      <div className="md:hidden relative py-16" ref={mobileScrollRef}>
        {/* Slider Container */}
        <div
          className="flex gap-5 overflow-x-auto snap-x snap-mandatory px-6 pb-6 no-scrollbar"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {limitedProjects.map((project, index) => (
            <div
              key={project.id}
              className="flex-shrink-0 snap-center rounded-2xl overflow-hidden border shadow-2xl transition-all duration-500"
              style={{
                width: '85vw',
                background: 'rgba(0,0,0,0.7)',
                borderColor: 'rgba(255,255,255,0.08)',
                color: 'white',
              }}
            >
              <div className="relative aspect-[16/10]">
                <Image
                  src={project.thumbnail}
                  alt={project.title}
                  fill
                  sizes="85vw"
                  className="object-cover"
                />
                {/* Number badge */}
                <div className="absolute bottom-3 right-4 font-orbitron text-white/15 text-5xl font-black">
                  {String(index + 1).padStart(2, '0')}
                </div>
              </div>

              <div className="p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-widest opacity-50 font-bold">{project.org}</span>
                  <span className="text-[10px] uppercase tracking-widest opacity-50">{project.team}</span>
                </div>

                <h3 className="text-2xl font-helvetica italic font-semibold leading-snug">{project.title}</h3>

                <p className="text-xs leading-relaxed opacity-60 line-clamp-2">
                  {project.fullDescription}
                </p>

                <div className="flex flex-wrap gap-2 pt-1">
                  {project.technologies.slice(0, 3).map((tech, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 text-[9px] font-orbitron uppercase rounded-full border border-white/20 opacity-60"
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

          {/* MOBILE EXPLORE CARD */}
          <div
             className="flex-shrink-0 snap-center rounded-2xl overflow-hidden border shadow-2xl transition-all duration-500 bg-[#0a0a0a] flex flex-col items-center justify-center p-8 text-center"
             style={{
                width: '85vw',
                borderColor: 'rgba(255,255,255,0.08)',
                color: 'white',
             }}
          >
             <h3 className="text-3xl font-helvetica font-bold mb-4">Explore More</h3>
             <p className="text-sm text-white/60 mb-8 leading-relaxed">
               View my complete project history and source code on GitHub.
             </p>
             <Link
                href="https://github.com/anuragmishra262000"
                target="_blank"
                className="w-full py-4 bg-white text-black font-orbitron text-xs uppercase tracking-widest rounded-lg font-bold mb-3"
             >
               GitHub
             </Link>
             <Link
                href="/contact"
                className="w-full py-4 border border-white/20 text-white font-orbitron text-xs uppercase tracking-widest rounded-lg font-bold"
             >
               Contact
             </Link>
          </div>

        </div>

        {/* Scroll hint */}
        <div className="text-center mt-4 text-xs text-white/30 font-inter tracking-wider">
          ← Swipe to explore →
        </div>
      </div>
    </section>
  );
}
