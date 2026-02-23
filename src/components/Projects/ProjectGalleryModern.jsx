'use client';

import { useRef, useEffect, useState, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
<<<<<<< Updated upstream
import projects from '@/data/projects.json';
import { LuArrowUpRight } from 'react-icons/lu';
// import { useLenis } from '@studio-freight/react-lenis'; // Removed to avoid re-render conflict
=======
import projects from '@/components/Home/projectsExtended.json';
import { LuArrowUpRight, LuGithub, LuGlobe, LuLayers, LuCpu, LuZap, LuBox } from 'react-icons/lu';
>>>>>>> Stashed changes

gsap.registerPlugin(ScrollTrigger);

function ProjectGalleryContent({ setLightTheme }) {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const searchParams = useSearchParams();
  const initialId = searchParams.get('id');
<<<<<<< Updated upstream
  // const lenis = useLenis(); // Removed
=======
>>>>>>> Stashed changes

  // Handle deep linking to specific project
  useEffect(() => {
    if (initialId && projects.length > 0) {
      const index = projects.findIndex(p => p.id === initialId);
      if (index !== -1) {
<<<<<<< Updated upstream
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
=======
        // Delay to allow layout and ScrollTrigger to initialize
        // Hero section (100vh) + Hero pin spacer (100vh) = 200vh start offset
        // plus index * 100vh per slide
        setTimeout(() => {
           const targetScroll = window.innerHeight * (2 + index);
           window.scrollTo({
             top: targetScroll,
             behavior: 'smooth'
           });
        }, 800);
>>>>>>> Stashed changes
      }
    }
  }, [initialId]);

  useEffect(() => {
<<<<<<< Updated upstream
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
                    Math.floor(self.progress * totalSlides)
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
    <div ref={containerRef} className="relative w-full bg-black desk:h-screen">
      {projects.map((project, index) => (
        <div
          key={project.id}
          id={`project-${project.id}`}
          className="project-slide relative w-full flex flex-col desk:flex-row bg-[#0a0a0a] min-h-[auto] desk:h-screen desk:absolute desk:top-0 desk:left-0 desk:w-full"
        >

          {/* --- MOBILE HEADER (Visible only on mobile/tablet) --- */}
          <div className="desk:hidden w-full p-6 pb-4 pt-12 bg-[#0a0a0a]">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-orbitron text-blue-500 text-xs tracking-widest">{String(index + 1).padStart(2, '0')}</span>
              <div className="h-px w-8 bg-blue-500/30" />
              <span className="font-inter text-blue-400/80 text-[10px] uppercase tracking-wider">{project.category}</span>
            </div>
            <h2 className="text-4xl font-bold font-bitcount text-white leading-none">{project.title}</h2>
          </div>

          {/* --- MAIN CONTENT (Desktop Left / Mobile Bottom) --- */}
          <div className="w-full desk:w-1/2 p-6 desk:p-20 flex flex-col justify-center relative z-20 desk:border-r desk:border-white/5 bg-[#0a0a0a] order-3 desk:order-1">

            {/* Desktop Header (Hidden on Mobile/Tablet) */}
            <div className="hidden desk:block mb-12">
              <div className="flex items-center gap-3 text-sm font-orbitron tracking-[0.2em] text-blue-400 mb-4 opacity-80">
                <span>{String(index + 1).padStart(2, '0')}</span>
                <span className="w-8 h-[1px] bg-blue-400/50"></span>
                <span className="uppercase">{project.category}</span>
              </div>
              <h2 className="text-6xl 4xl:text-[8rem] font-helvetica font-bold leading-[0.9] tracking-tight mb-2">
                {project.title}
              </h2>
              <p className="text-2xl 4xl:text-5xl text-white/40 font-light italic">{project.org}</p>
            </div>

            {/* Shared Content (Description, Tech, Links) */}
            <div className="space-y-6 md:space-y-8">
              {/* Mobile/Tablet Org Label */}
              <p className="desk:hidden text-lg text-white/40 font-light italic mb-4">{project.org}</p>

              <p className="text-sm md:text-base 4xl:text-4xl leading-relaxed text-white/90">{project.fullDescription}</p>

              <div className="space-y-4">
                <h3 className="text-xs 4xl:text-2xl uppercase tracking-widest text-white/30 font-bold">The Challenge</h3>
                <p className="text-sm md:text-base 4xl:text-3xl leading-relaxed text-white/80 border-l-2 border-blue-500/30 pl-4">{project.challenge}</p>
              </div>

              <div className="flex flex-wrap gap-2 pt-4">
                {project.technologies.slice(0, 5).map(tech => (
                  <span key={tech} className="px-3 py-1 text-[10px] 4xl:text-lg font-orbitron uppercase tracking-wider border border-white/10 rounded-full text-white/60">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="pt-6">
                <Link
                  href={project.liveUrl || '#'}
                  target="_blank"
                  className="inline-flex items-center gap-3 px-6 py-3 4xl:px-12 4xl:py-6 bg-white text-black font-bold font-orbitron text-xs 4xl:text-lg uppercase tracking-widest hover:bg-blue-500 hover:text-white transition-all w-full desk:w-auto justify-center"
                >
                  <span>View Project</span>
                  <LuArrowUpRight className="w-4 h-4 4xl:w-6 4xl:h-6" />
                </Link>
              </div>
            </div>
          </div>

          {/* --- IMAGE SECTION (Desktop Right / Mobile Middle) --- */}
          <div className="relative w-full desk:w-1/2 aspect-square desk:aspect-auto desk:h-full overflow-hidden order-2 desk:order-2">
            <Image
              src={project.thumbnail || project.image}
              alt={project.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-40 desk:hidden"></div>
          </div>

        </div>
      ))}

      {/* GLOBAL CONTROLS / PROGRESS */}
      <div className="hidden desk:flex absolute bottom-8 right-8 z-50 flex-col items-end pointer-events-none mix-blend-difference">
        <div className="text-6xl font-orbitron font-bold text-white opacity-20">
          {String(activeIndex + 1).padStart(2, '0')}<span className="text-2xl align-top opacity-50">/{projects.length}</span>
        </div>
      </div>
=======
    const ctx = gsap.context(() => {
      const slides = gsap.utils.toArray('.project-slide'); // All slides
      const totalSlides = slides.length;

      // MASTER TIMELINE:
      // We pin the container and then animate the slides within that pinned state.
      // The timeline's duration is determined by the scroll distance.

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: `+=${totalSlides * 100}%`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          onUpdate: (self) => {
             // Calculate active index based on the timeline's progress
             // The timeline moves slides 1..N-1, so we map progress to 0..N-1
             const progress = self.progress;
             const idx = Math.min(
               totalSlides - 1,
               Math.floor(progress * totalSlides)
             );
             setActiveIndex(idx);
          }
        }
      });

      // We want to animate slides 1 through Last (0 is already visible).
      // For each slide, we translate it from y:100% to y:0%.
      // IMPORTANT: We add these to the MASTER timeline `tl`, not create new ScrollTriggers.

      slides.forEach((slide, i) => {
        if (i === 0) return; // Skip first slide

        // 1. Initial State: Hiding below
        gsap.set(slide, { yPercent: 100, zIndex: i + 1 });

        // 2. Add animation to the master timeline
        // We want the slides to come in one after another.
        // We use the position parameter (i - 1) to sequence them relative to the "duration" unit.
        // Since we want the whole sequence to cover the scroll distance, we don't need absolute times,
        // just relative ordering.

        tl.to(slide, {
          yPercent: 0,
          ease: "none", // Linear movement tied to scroll
          duration: 1,  // Equal weight for each slide
        }, (i - 1));    // Start this animation at relative time (i-1)

        // Optional: Parallax inner image
        const img = slide.querySelector('.slide-image');
        if(img) {
          gsap.fromTo(img,
            { scale: 1.2 },
            { scale: 1, ease: "none", duration: 1 },
            (i - 1) // Sync with the slide entry
          );
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, [setLightTheme]);

  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-black text-white">

      {/* GLOBAL BACKGROUND / NOISE */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0"
           style={{ backgroundImage: 'url("/noise.png")' }}></div>

      {/* SLIDES CONTAINER */}
      <div className="relative w-full h-full z-10">
        {projects.map((project, index) => (
          <div
            key={project.id}
            className="project-slide absolute inset-0 w-full h-full flex flex-col md:flex-row bg-[#0a0a0a]"
            style={{ zIndex: index }}
          >

            {/* LEFT: CONTENT (40-50%) */}
            <div className="relative w-full md:w-1/2 h-full p-8 md:p-20 flex flex-col justify-center z-20 border-r border-white/5 bg-[#0a0a0a]">

              {/* Header Info */}
              <div className="mb-auto pt-10 md:pt-0">
                <div className="flex items-center gap-3 text-xs md:text-sm font-orbitron tracking-[0.2em] text-blue-400 mb-4 opacity-80">
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <span className="w-8 h-[1px] bg-blue-400/50"></span>
                  <span className="uppercase">{project.category}</span>
                </div>

                <h2 className="text-4xl md:text-6xl font-helvetica font-bold leading-[0.9] tracking-tight mb-2">
                  {project.title}
                </h2>
                <p className="text-xl md:text-2xl text-white/40 font-light italic">
                  {project.org}
                </p>
              </div>

              {/* Core Details */}
              <div className="space-y-8 my-8">

                <div className="space-y-4">
                  <p className="text-sm md:text-base leading-relaxed text-white/90">
                    {project.fullDescription}
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xs uppercase tracking-widest text-white/30 font-bold">The Challenge</h3>
                  <p className="text-sm md:text-base leading-relaxed text-white/80 border-l-2 border-blue-500/30 pl-4">
                    {project.challenge}
                  </p>
                </div>

                <div className="space-y-4">
                   <h3 className="text-xs uppercase tracking-widest text-white/30 font-bold">The Solution & Impact</h3>
                   <div className="grid grid-cols-2 gap-4">
                      {project.metric && (
                        <div className="bg-white/5 p-4 rounded-lg border border-white/5">
                            <div className="text-2xl md:text-3xl font-orbitron text-blue-400 mb-1">{project.metric}</div>
                            <div className="text-[10px] uppercase tracking-wider text-white/50">{project.metricLabel}</div>
                        </div>
                      )}

                      <div className="bg-white/5 p-4 rounded-lg border border-white/5">
                          <LuCpu className="w-6 h-6 text-purple-400 mb-2" />
                          <div className="text-[10px] uppercase tracking-wider text-white/50">{project.keyHighlight}</div>
                      </div>
                   </div>
                </div>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2">
                  {project.technologies.slice(0, 5).map(tech => (
                    <span key={tech} className="px-3 py-1 text-[10px] font-orbitron uppercase tracking-wider border border-white/10 rounded-full text-white/60 hover:text-white hover:border-white/30 transition-colors">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action */}
              <div className="mt-auto">
                <Link
                  href={project.liveUrl}
                  target="_blank"
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-bold font-orbitron text-sm uppercase tracking-widest hover:bg-blue-500 hover:text-white transition-all duration-300"
                >
                  <span>View Project</span>
                  <LuArrowUpRight className="w-4 h-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                </Link>
              </div>

            </div>

            {/* RIGHT: VISUAL (50-60%) */}
            <div className="relative w-full md:w-1/2 h-full overflow-hidden">
               <div className="absolute inset-0 w-full h-full bg-black/20 z-10"></div> {/* Overlay */}

               <Image
                 src={project.thumbnail}
                 alt={project.title}
                 fill
                 className="slide-image object-cover"
                 priority={index === 0}
               />

               {/* Decorative Gradient */}
               <div className="absolute inset-0 bg-gradient-to-l from-transparent via-black/10 to-[#0a0a0a] z-10"></div>
            </div>

          </div>
        ))}
      </div>

      {/* GLOBAL CONTROLS / PROGRESS (Optional) */}
      <div className="absolute bottom-8 right-8 z-50 flex flex-col items-end pointer-events-none mix-blend-difference">
         <div className="text-6xl font-orbitron font-bold text-white opacity-20">
            {String(activeIndex + 1).padStart(2, '0')}<span className="text-2xl align-top opacity-50">/{projects.length}</span>
         </div>
      </div>

>>>>>>> Stashed changes
    </div>
  );
}

export default function ProjectGalleryModern({ setLightTheme }) {
  return (
    <Suspense fallback={<div className="w-full h-screen bg-black" />}>
<<<<<<< Updated upstream
      <ProjectGalleryContent setLightTheme={setLightTheme} />
=======
       <ProjectGalleryContent setLightTheme={setLightTheme} />
>>>>>>> Stashed changes
    </Suspense>
  );
}
