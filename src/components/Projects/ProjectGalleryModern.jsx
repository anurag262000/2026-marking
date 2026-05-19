'use client';

import { useRef, useEffect, useState, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import projects from '@/components/Home/projectsExtended.json';
import { LuArrowUpRight, LuGithub, LuGlobe, LuLayers, LuCpu, LuZap, LuBox } from 'react-icons/lu';

gsap.registerPlugin(ScrollTrigger);

function ProjectGalleryContent({ setLightTheme }) {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const searchParams = useSearchParams();
  const initialId = searchParams.get('id');

  // Handle deep linking to specific project
  useEffect(() => {
    if (initialId && projects.length > 0) {
      const index = projects.findIndex(p => p.id === initialId);
      if (index !== -1) {
        // Poll for lenis instance availability
        const checkLenis = setInterval(() => {
          const lenis = window.lenis;
          // Also check if layout is ready (e.g., container height > window height)
          const isLayoutReady = document.body.scrollHeight > window.innerHeight;

          if (lenis && isLayoutReady) {
            clearInterval(checkLenis);
            const isMobile = window.innerWidth < 768;

            if (isMobile) {
              const element = document.getElementById(`project-${initialId}`);
              if (element) {
                lenis.scrollTo(element, { duration: 2, lock: true });
              }
            } else {
              const targetScroll = window.innerHeight * (2 + index);
              lenis.scrollTo(targetScroll, { duration: 2, lock: true });
            }
          }
        }, 100);

        // Clear interval after 3 seconds to avoid infinite loop
        setTimeout(() => clearInterval(checkLenis), 3000);
      }
    }
  }, [initialId]);

  useEffect(() => {
    let ctx;

    // Small delay to ensure DOM is ready and hero animation has settled
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();

      ctx = gsap.context(() => {

        ScrollTrigger.matchMedia({
          // DESKTOP: Pinned Stacking Layout (Above 1100px)
          "(min-width: 1101px)": function () {
            const slides = gsap.utils.toArray('.project-slide');
            const totalSlides = slides.length;

            // Clear any existing transforms to prevent conflicts
            slides.forEach((slide) => {
              gsap.set(slide, { clearProps: "transform" });
            });

            // Set initial state for all slides BEFORE creating timeline
            slides.forEach((slide, i) => {
              gsap.set(slide, {
                yPercent: i === 0 ? 0 : 100,  // First slide visible, rest below
                zIndex: 10 + i,                // Ascending z-index for proper stacking
              });
            });

            const scrollDistance = (totalSlides - 1) * window.innerHeight;

            // Create timeline with ScrollTrigger
            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: () => `+=${scrollDistance}px`,
                pin: true,
                scrub: 1,
                anticipatePin: 1,
                invalidateOnRefresh: true,
                onUpdate: (self) => {
                  const newIndex = Math.min(
                    totalSlides - 1,
                    Math.floor(self.progress * (totalSlides))
                  );

                  // Use functional update to avoid stale closure
                  setActiveIndex(prev => {
                    if (prev !== newIndex) {
                      return newIndex;
                    }
                    return prev;
                  });
                }
              }
            });

            // Add slide-up animations (skip first slide)
            slides.forEach((slide, i) => {
              if (i === 0) return;

              tl.to(slide, {
                yPercent: 0,
                ease: "none",
                duration: 1,
              }, i - 1);  // Position in timeline: 0, 1, 2, 3...
            });
          },

          // MOBILE: Normal Vertical Layout (1100px and below)
          "(max-width: 1100px)": function () {
            const cards = gsap.utils.toArray('.project-slide');

            // Clear any desktop styles
            cards.forEach((card) => {
              gsap.set(card, { clearProps: "all" });
            });

            // Create scroll triggers for each card
            cards.forEach((card, i) => {
              ScrollTrigger.create({
                trigger: card,
                start: "top 40%",
                end: "bottom 40%",
                onEnter: () => setActiveIndex(i),
                onEnterBack: () => setActiveIndex(i),
              });
            });
          }
        });

      }, containerRef);
    }, 100); // Small delay to ensure DOM is ready

    return () => {
      clearTimeout(timer);
      if (ctx) ctx.revert();
    };
  }, []); // Empty dependency array - only initialize once on mount

  return (
    <div ref={containerRef} className="relative w-full bg-[var(--off-white)] desk:h-screen">
      {projects.map((project, index) => (
        <div
          key={project.id}
          id={`project-${project.id}`}
          className="project-slide relative w-full flex flex-col desk:flex-row bg-[var(--off-white)] min-h-[auto] desk:h-screen desk:absolute desk:top-0 desk:left-0 desk:w-full"
        >

          {/* --- MOBILE HEADER (Visible only on mobile/tablet) --- */}
          <div className="desk:hidden w-full p-6 pb-4 pt-12 bg-[var(--off-white)] border-b-[3px] border-[var(--pitch-black)]">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-space font-black text-[var(--electric-purple)] text-xs tracking-wider">{String(index + 1).padStart(2, '0')}</span>
              <div className="h-[2px] w-8 bg-[var(--pitch-black)]" />
              <span className="font-space font-black text-[var(--pitch-black)] text-[10px] uppercase tracking-wider">{project.category}</span>
            </div>
            <h2 className="text-4xl font-black font-bebas text-[var(--pitch-black)] leading-none">{project.title}</h2>
          </div>

          {/* --- MAIN CONTENT (Desktop Left / Mobile Bottom) --- */}
          <div className="w-full desk:w-1/2 p-6 desk:p-20 flex flex-col justify-center relative z-20 desk:border-r-[3px] desk:border-[var(--pitch-black)] bg-[var(--off-white)] order-3 desk:order-1">

            {/* Desktop Header (Hidden on Mobile/Tablet) */}
            <div className="hidden desk:block mb-12">
              <div className="flex items-center gap-3 text-sm font-space font-black tracking-wider text-[var(--electric-purple)] mb-4">
                <span>{String(index + 1).padStart(2, '0')}</span>
                <span className="w-8 h-[2px] bg-[var(--pitch-black)]"></span>
                <span className="uppercase">{project.category}</span>
              </div>
              <h2 className="text-6xl 4xl:text-[8rem] font-bebas font-black leading-[0.9] tracking-tight mb-2 text-[var(--pitch-black)]">
                {project.title}
              </h2>
              <p className="text-2xl 4xl:text-5xl text-[var(--pitch-black)] opacity-60 font-space font-bold uppercase tracking-wider">{project.org}</p>
            </div>

            {/* Shared Content (Description, Tech, Links) */}
            <div className="space-y-6 md:space-y-8">
              {/* Mobile/Tablet Org Label */}
              <p className="desk:hidden text-lg text-[var(--pitch-black)] opacity-60 font-space font-bold uppercase tracking-wider mb-4">{project.org}</p>

              <p className="text-sm md:text-base 4xl:text-4xl leading-relaxed text-[var(--pitch-black)] font-space font-medium opacity-90">{project.fullDescription}</p>

              <div className="space-y-4">
                <h3 className="text-xs 4xl:text-2xl uppercase tracking-widest text-[var(--pitch-black)] opacity-60 font-space font-black">The Challenge</h3>
                <p className="text-sm md:text-base 4xl:text-3xl leading-relaxed text-[var(--pitch-black)] font-space font-medium border-l-[3px] border-[var(--pitch-black)] pl-4">{project.challenge}</p>
              </div>

              {/* Added Solution & Impact block from stash */}
              <div className="space-y-4">
                 <h3 className="text-xs uppercase tracking-widest text-[var(--pitch-black)] opacity-60 font-space font-black">The Solution & Impact</h3>
                 <div className="grid grid-cols-2 gap-4">
                    {project.metric && (
                      <div className="bg-[var(--pure-white)] p-4 border-[3px] border-[var(--pitch-black)] rounded-xl shadow-[3px_3px_0px_var(--pitch-black)]">
                          <div className="text-3xl md:text-4xl font-bebas font-black text-[var(--action-pink)] mb-1">{project.metric}</div>
                          <div className="text-[10px] font-space font-bold uppercase tracking-wider text-[var(--pitch-black)] opacity-70">{project.metricLabel}</div>
                      </div>
                    )}

                    <div className="bg-[var(--pure-white)] p-4 border-[3px] border-[var(--pitch-black)] rounded-xl shadow-[3px_3px_0px_var(--pitch-black)]">
                        <LuCpu className="w-6 h-6 text-[var(--electric-purple)] mb-2" />
                        <div className="text-[10px] font-space font-bold uppercase tracking-wider text-[var(--pitch-black)] opacity-70">{project.keyHighlight}</div>
                    </div>
                 </div>
              </div>

              <div className="flex flex-wrap gap-2 pt-4">
                {project.technologies.slice(0, 5).map(tech => (
                  <span key={tech} className="px-4 py-1.5 text-[10px] font-space font-black uppercase tracking-wider border-[2px] border-[var(--pitch-black)] rounded-md text-[var(--pitch-black)] bg-[var(--pure-white)] shadow-[2px_2px_0px_var(--pitch-black)]">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="pt-6">
                <Link
                  href={project.liveUrl || '#'}
                  target="_blank"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-[var(--neon-yellow)] text-[var(--pitch-black)] font-black font-space text-xs uppercase tracking-widest border-[3px] border-[var(--pitch-black)] rounded-xl shadow-[4px_4px_0px_var(--pitch-black)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_var(--pitch-black)] transition-all w-full desk:w-auto justify-center"
                >
                  <span>View Project</span>
                  <LuArrowUpRight className="w-4 h-4 4xl:w-6 4xl:h-6" />
                </Link>
              </div>
            </div>
          </div>

          {/* --- IMAGE SECTION (Desktop Right / Mobile Middle) --- */}
          <div className="relative w-full desk:w-1/2 aspect-square desk:aspect-auto desk:h-full overflow-hidden order-2 desk:order-2 desk:border-l-[3px] border-b-[3px] desk:border-b-0 border-[var(--pitch-black)]">
            <Image
              src={project.thumbnail || project.image}
              alt={project.title}
              fill
              className="object-cover"
            />
          </div>

        </div>
      ))}

      {/* GLOBAL CONTROLS / PROGRESS */}
      <div className="hidden desk:flex absolute bottom-8 right-8 z-50 flex-col items-end pointer-events-none">
        <div 
          className="font-bebas text-6xl text-[var(--pitch-black)] border-[3px] border-[var(--pitch-black)] bg-[var(--neon-yellow)] px-6 py-2 rounded-xl shadow-[4px_4px_0px_var(--pitch-black)] rotate-[-3deg] select-none"
          style={{ pointerEvents: 'none' }}
        >
          {String(activeIndex + 1).padStart(2, '0')} <span className="text-3xl">/ {projects.length}</span>
        </div>
      </div>
    </div>
  );
}

export default function ProjectGalleryModern({ setLightTheme }) {
  return (
    <Suspense fallback={<div className="w-full h-screen bg-black" />}>
      <ProjectGalleryContent setLightTheme={setLightTheme} />
    </Suspense>
  );
}
