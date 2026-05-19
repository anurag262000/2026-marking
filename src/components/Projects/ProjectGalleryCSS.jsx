"use client";

import { useRef, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import projects from '@/data/projects.json';

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

  // Mobile detection (Tablet/Mobile fallback up to 1100px)
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1101);
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
            // Neo-brutalist theme
            sidebar.style.background = 'var(--pure-white)';
            sidebar.style.borderColor = 'var(--pitch-black)';
            sidebar.style.color = 'var(--pitch-black)';
        },
        onLeave: () => {
          sidebar.style.background = 'var(--pure-white)';
          sidebar.style.borderColor = 'var(--pitch-black)';
          sidebar.style.color = 'var(--pitch-black)';
        },
        onLeaveBack: () => {
          sidebar.style.background = 'var(--pure-white)';
          sidebar.style.borderColor = 'var(--pitch-black)';
          sidebar.style.color = 'var(--pitch-black)';
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
    <section 
      ref={sectionRef} 
      className="relative z-20" 
      id="projects-gallery"
      style={{ backgroundColor: 'var(--off-white)' }}
    >
      {/* Neo-Brutalist Dot Pattern */}
      <div className="absolute inset-0 bg-dot-brutalist pointer-events-none opacity-10" />

      {/* DESKTOP VIEW (Above 1100px) */}
      <div ref={pinContainerRef} className="hidden desk:block relative w-full h-[100dvh] overflow-hidden">
        <div className="flex relative w-full h-full">

          <div
            ref={sidebarRef}
            className="desktop-sidebar relative z-30 w-[40%] h-full flex flex-col justify-center p-10 border-r-[3px] transition-all duration-700"
            style={{
              background: 'var(--pure-white)',
              borderColor: 'var(--pitch-black)',
              color: 'var(--pitch-black)',
            }}
          >
            {isExploreSlide ? (
               // EXPLORE MORE SIDEBAR CONTENT
               <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="space-y-1">
                    <span 
                      className="inline-block px-3 py-1 rounded-md font-space font-bold text-xs uppercase tracking-wider"
                      style={{
                        backgroundColor: 'var(--electric-purple)',
                        color: 'var(--pure-white)',
                        border: '2px solid var(--pitch-black)',
                        boxShadow: '3px 3px 0px var(--pitch-black)',
                        transform: 'rotate(-2deg)'
                      }}
                    >
                      Archive
                    </span>
                    <h3 className="text-3xl font-bold font-space mt-3" style={{ color: 'var(--pitch-black)' }}>More Work</h3>
                  </div>

                  <div className="space-y-2">
                    <h2 className="text-5xl lg:text-7xl font-bebas uppercase leading-[1.1]" style={{ color: 'var(--pitch-black)' }}>
                      Explore More
                    </h2>
                  </div>

                  <p className="text-base leading-relaxed max-w-md font-space font-medium" style={{ color: 'var(--pitch-black)', opacity: 0.8 }}>
                    This is a curated selection. Dive into my full repository of experiments, open-source contributions, and side projects on GitHub.
                  </p>

                  <div className="flex flex-col gap-4 pt-4">
                    <Link
                      href="/projects"
                      className="inline-block px-8 py-4 font-space font-bold text-sm uppercase tracking-wider rounded-lg transition-all text-center"
                      style={{
                        backgroundColor: 'var(--neon-yellow)',
                        color: 'var(--pitch-black)',
                        border: '2px solid var(--pitch-black)',
                        boxShadow: '4px 4px 0px var(--pitch-black)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translate(2px, 2px)';
                        e.currentTarget.style.boxShadow = '2px 2px 0px var(--pitch-black)';
                        e.currentTarget.style.backgroundColor = 'var(--pitch-black)';
                        e.currentTarget.style.color = 'var(--neon-yellow)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translate(0, 0)';
                        e.currentTarget.style.boxShadow = '4px 4px 0px var(--pitch-black)';
                        e.currentTarget.style.backgroundColor = 'var(--neon-yellow)';
                        e.currentTarget.style.color = 'var(--pitch-black)';
                      }}
                    >
                      View All Projects ↗
                    </Link>
                    <Link
                      href="/contact"
                      className="inline-block px-8 py-4 font-space font-bold text-sm uppercase tracking-wider rounded-lg transition-all text-center"
                      style={{
                        backgroundColor: 'var(--pure-white)',
                        color: 'var(--pitch-black)',
                        border: '2px solid var(--pitch-black)',
                        boxShadow: '4px 4px 0px var(--pitch-black)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translate(2px, 2px)';
                        e.currentTarget.style.boxShadow = '2px 2px 0px var(--pitch-black)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translate(0, 0)';
                        e.currentTarget.style.boxShadow = '4px 4px 0px var(--pitch-black)';
                      }}
                    >
                      Contact Me
                    </Link>
                  </div>
               </div>
            ) : (
               // NORMAL PROJECT CONTENT
               <div className="space-y-8">
                  <div className="space-y-1">
                    <span 
                      className="inline-block px-3 py-1 rounded-md font-space font-bold text-xs uppercase tracking-wider"
                      style={{
                        backgroundColor: 'var(--electric-purple)',
                        color: 'var(--pure-white)',
                        border: '2px solid var(--pitch-black)',
                        boxShadow: '3px 3px 0px var(--pitch-black)',
                        transform: 'rotate(-2deg)'
                      }}
                    >
                      Organization
                    </span>
                    <h3 className="text-3xl font-bold font-space mt-3" style={{ color: 'var(--pitch-black)' }}>{activeProject?.org}</h3>
                  </div>

                  <div className="space-y-2">
                    <span 
                      className="inline-block px-3 py-1 rounded-md font-space font-bold text-xs uppercase tracking-wider"
                      style={{
                        backgroundColor: 'var(--neon-yellow)',
                        color: 'var(--pitch-black)',
                        border: '2px solid var(--pitch-black)',
                        boxShadow: '3px 3px 0px var(--pitch-black)',
                        transform: 'rotate(2deg)'
                      }}
                    >
                      Project
                    </span>
                    <h2 className="text-5xl lg:text-7xl font-bebas uppercase leading-[1.1] mt-3" style={{ color: 'var(--pitch-black)' }}>
                      {activeProject?.title}
                    </h2>
                  </div>

                  <div className="space-y-1">
                    <span 
                      className="inline-block px-3 py-1 rounded-md font-space font-bold text-xs uppercase tracking-wider"
                      style={{
                        backgroundColor: 'var(--action-pink)',
                        color: 'var(--pure-white)',
                        border: '2px solid var(--pitch-black)',
                        boxShadow: '3px 3px 0px var(--pitch-black)',
                        transform: 'rotate(-1deg)'
                      }}
                    >
                      Role
                    </span>
                    <p className="text-2xl font-bold font-space mt-3" style={{ color: 'var(--pitch-black)' }}>{activeProject?.team}</p>
                  </div>

                  <p className="text-base leading-relaxed max-w-md font-space font-medium" style={{ color: 'var(--pitch-black)', opacity: 0.8 }}>
                    {activeProject?.fullDescription}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {activeProject?.technologies.slice(0, 4).map((tech, i) => (
                      <span
                        key={i}
                        className="px-4 py-1.5 text-xs font-space font-bold uppercase tracking-wider rounded-lg"
                        style={{
                          backgroundColor: i % 3 === 0 ? 'var(--neon-yellow)' : i % 3 === 1 ? 'var(--electric-purple)' : 'var(--action-pink)',
                          color: i % 3 === 0 ? 'var(--pitch-black)' : 'var(--pure-white)',
                          border: '2px solid var(--pitch-black)',
                          boxShadow: '2px 2px 0px var(--pitch-black)'
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
                    className="inline-block mt-2 px-6 py-3 font-space font-bold text-xs uppercase tracking-wider rounded-lg transition-all"
                    style={{
                      backgroundColor: 'var(--neon-yellow)',
                      color: 'var(--pitch-black)',
                      border: '2px solid var(--pitch-black)',
                      boxShadow: '4px 4px 0px var(--pitch-black)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translate(2px, 2px)';
                      e.currentTarget.style.boxShadow = '2px 2px 0px var(--pitch-black)';
                      e.currentTarget.style.backgroundColor = 'var(--pitch-black)';
                      e.currentTarget.style.color = 'var(--neon-yellow)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translate(0, 0)';
                      e.currentTarget.style.boxShadow = '4px 4px 0px var(--pitch-black)';
                      e.currentTarget.style.backgroundColor = 'var(--neon-yellow)';
                      e.currentTarget.style.color = 'var(--pitch-black)';
                    }}
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
                <div 
                  className="absolute bottom-8 right-8 font-bebas text-8xl font-bold"
                  style={{ 
                    color: 'var(--neon-yellow)',
                    WebkitTextStroke: '2px var(--pitch-black)',
                    opacity: 0.3
                  }}
                >
                  {String(index + 1).padStart(2, '0')}
                </div>
              </div>
            ))}

            <div
                ref={el => cardsRef.current[limitedProjects.length] = el}
                className="absolute inset-0 w-full h-full flex items-center justify-center p-10"
                style={{
                  zIndex: limitedProjects.length + 1,
                  backgroundColor: 'var(--pitch-black)'
                }}
            >
                <div className="absolute inset-0 opacity-[0.15] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none" />

                <div className="text-center relative z-10">
                   <h1 
                     className="text-6xl desk:text-8xl font-black font-bebas tracking-tighter uppercase mb-4"
                     style={{ 
                       color: 'var(--neon-yellow)',
                       WebkitTextStroke: '2px var(--pitch-black)',
                       opacity: 0.3
                     }}
                   >
                      FIN
                   </h1>
                   <p 
                     className="font-space tracking-widest text-sm uppercase font-bold"
                     style={{ color: 'var(--neon-yellow)', opacity: 0.5 }}
                   >
                      End of Archive
                   </p>
                </div>
            </div>

          </div>
        </div>
      </div>

      {/* MOBILE VIEW — Horizontal Swipe Slider (1100px and below) */}
      <div className="desk:hidden relative py-16" ref={mobileScrollRef}>
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
              className="flex-shrink-0 snap-center rounded-2xl overflow-hidden shadow-2xl transition-all duration-500"
              style={{
                width: '85vw',
                background: 'var(--pure-white)',
                border: '3px solid var(--pitch-black)',
                boxShadow: '6px 6px 0px var(--pitch-black)',
                color: 'var(--pitch-black)',
              }}
            >
              <div className="relative aspect-square">
                <Image
                  src={project.thumbnail}
                  alt={project.title}
                  fill
                  sizes="85vw"
                  className="object-cover"
                />
                {/* Number badge */}
                <div 
                  className="absolute bottom-3 right-4 font-bebas text-5xl font-black"
                  style={{
                    color: 'var(--neon-yellow)',
                    WebkitTextStroke: '2px var(--pitch-black)',
                    opacity: 0.5
                  }}
                >
                  {String(index + 1).padStart(2, '0')}
                </div>
              </div>

              <div className="p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span 
                    className="inline-block px-2 py-1 rounded text-[10px] uppercase tracking-widest font-bold font-space"
                    style={{
                      backgroundColor: 'var(--electric-purple)',
                      color: 'var(--pure-white)',
                      border: '2px solid var(--pitch-black)',
                      boxShadow: '2px 2px 0px var(--pitch-black)'
                    }}
                  >
                    {project.org}
                  </span>
                  <span 
                    className="text-[10px] uppercase tracking-widest font-space font-bold"
                    style={{ color: 'var(--pitch-black)', opacity: 0.5 }}
                  >
                    {project.team}
                  </span>
                </div>

                <h3 className="text-2xl font-bebas uppercase font-bold leading-snug" style={{ color: 'var(--pitch-black)' }}>
                  {project.title}
                </h3>

                <p className="text-xs leading-relaxed line-clamp-2 font-space" style={{ color: 'var(--pitch-black)', opacity: 0.7 }}>
                  {project.fullDescription}
                </p>

                <div className="flex flex-wrap gap-2 pt-1">
                  {project.technologies.slice(0, 3).map((tech, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 text-[9px] font-space font-bold uppercase rounded-lg"
                      style={{
                        backgroundColor: i % 2 === 0 ? 'var(--neon-yellow)' : 'var(--action-pink)',
                        color: i % 2 === 0 ? 'var(--pitch-black)' : 'var(--pure-white)',
                        border: '2px solid var(--pitch-black)',
                        boxShadow: '2px 2px 0px var(--pitch-black)'
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <Link
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block w-full text-center px-4 py-3 font-space font-bold text-[10px] uppercase tracking-wider rounded-lg transition-all mt-2"
                  style={{
                    backgroundColor: 'var(--neon-yellow)',
                    color: 'var(--pitch-black)',
                    border: '2px solid var(--pitch-black)',
                    boxShadow: '4px 4px 0px var(--pitch-black)'
                  }}
                >
                  Launch Site ↗
                </Link>
              </div>
            </div>
          ))}

          {/* MOBILE EXPLORE CARD */}
          <div
             className="flex-shrink-0 snap-center rounded-2xl overflow-hidden flex flex-col items-center justify-center p-8 text-center transition-all duration-500"
             style={{
                width: '85vw',
                backgroundColor: 'var(--pure-white)',
                border: '3px solid var(--pitch-black)',
                boxShadow: '6px 6px 0px var(--pitch-black)',
                color: 'var(--pitch-black)',
             }}
          >
             <h3 className="text-4xl font-bebas uppercase font-bold mb-4">Explore More</h3>
             <p className="text-sm font-space font-medium mb-8 leading-relaxed opacity-75">
               View my complete project history and source code on GitHub.
             </p>
             <Link
                href="/projects"
                className="w-full py-4 text-center font-space font-black text-xs uppercase tracking-widest rounded-xl transition-all mb-3"
                style={{
                  backgroundColor: 'var(--neon-yellow)',
                  color: 'var(--pitch-black)',
                  border: '3px solid var(--pitch-black)',
                  boxShadow: '4px 4px 0px var(--pitch-black)'
                }}
             >
               View All Projects ↗
             </Link>
             <Link
                href="/contact"
                className="w-full py-4 text-center font-space font-black text-xs uppercase tracking-widest rounded-xl transition-all"
                style={{
                  backgroundColor: 'var(--pure-white)',
                  color: 'var(--pitch-black)',
                  border: '3px solid var(--pitch-black)',
                  boxShadow: '4px 4px 0px var(--pitch-black)'
                }}
             >
               Contact Me
             </Link>
          </div>

        </div>

        {/* Scroll hint */}
        <div className="text-center mt-4 text-xs font-space font-black uppercase tracking-wider text-[var(--pitch-black)] opacity-60">
          ← Swipe to explore →
        </div>
      </div>
    </section>
  );
}
