'use client';

import React, { useEffect, useRef, useState } from 'react';
import { getApprovedTestimonials } from '@/app/admin/testimonials/actions';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Helper to generate a long list of testimonials for seamless scrolling
 * without adjacent duplicates.
 */
const getRepeatedTestimonials = (testimonials) => {
  if (!testimonials || testimonials.length === 0) return [];
  
  const shuffle = (array) => {
    const newArr = [...array];
    for (let i = newArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
  };

  let items = [];
  const minItems = 20;
  
  while (items.length < minItems) {
    const batch = shuffle(testimonials);
    if (items.length > 0 && batch[0].id === items[items.length - 1].id && batch.length > 1) {
      [batch[0], batch[1]] = [batch[1], batch[0]];
    }
    items = [...items, ...batch];
  }

  if (items.length > 1 && items[items.length - 1].id === items[0].id && testimonials.length > 1) {
    const lastIdx = items.length - 1;
    [items[lastIdx], items[lastIdx - 1]] = [items[lastIdx - 1], items[lastIdx]];
  }

  return [...items, ...items];
};

/**
 * Single Testimonial Card UI
 */
const TestimonialCard = ({ t, theme = 'light', isMobile = false }) => {
  const isDark = theme === 'dark';
  const wordCount = t.content.split(/\s+/).filter(word => word.length > 0).length;
  const isLongMobile = isMobile && wordCount > 100;
  
  return (
    <div className={`w-full ${isLongMobile ? 'h-[400px]' : 'h-auto'} ${isDark ? 'bg-white/5 border-white/60 hover:bg-white/10' : 'bg-white border-gray-300 hover:shadow-xl'} border rounded-2xl p-6 transition-all duration-500 flex flex-col`}>
      {/* Header info */}
      <div className="flex items-center gap-0 mb-4 flex-shrink-0">
        {t.image_url ? (
          <img src={t.image_url} alt={t.name} className={`w-12 h-12 rounded-full object-cover shadow-md border-2 ${isDark ? 'border-white/20' : 'border-white'}`} />
        ) : (
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-md border-2 border-white">
            {t.name.charAt(0)}
          </div>
        )}
        <div className='ml-4'>
          <h4 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'} text-base leading-tight`}>{t.name}</h4>
          <p className="text-xs text-blue-500 font-bold uppercase tracking-wider">{t.role} {t.company ? `@ ${t.company}` : ''}</p>
        </div>
      </div>

      {/* Content area */}
      <div className={`relative mt-4 ${isLongMobile ? 'flex-1 min-h-0 overflow-hidden' : ''}`}>
        <span className={`absolute -top-2 -left-3 text-5xl ${isDark ? 'text-white/10' : 'text-gray-100'} font-serif leading-none pointer-events-none select-none`}>"</span>
        <div className={`relative z-10 pt-2 ${isLongMobile ? 'h-full overflow-y-auto custom-scrollbar pr-2' : 'h-auto'}`}>
          <p className={`${isDark ? 'text-white/70' : 'text-gray-700'} leading-relaxed text-sm italic`}>
            {t.content}
          </p>
        </div>
      </div>

      {isLongMobile && (
        <style jsx>{`
          .custom-scrollbar::-webkit-scrollbar {
            width: 4px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: ${isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)'};
            border-radius: 10px;
          }
        `}</style>
      )}
    </div>
  );
};

/**
 * Vertical scrolling column for Desktop
 */
const Column = ({ testimonials, speed = 1, theme = 'light' }) => {
  const scrollRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const animationRef = useRef(null);
  
  const repeatedTestimonials = React.useMemo(() => getRepeatedTestimonials(testimonials), [testimonials]);

  useEffect(() => {
    if (!scrollRef.current || repeatedTestimonials.length === 0) return;

    const scrollContainer = scrollRef.current;
    gsap.set(scrollContainer, { y: 0 });
    
    const moveAmount = scrollContainer.scrollHeight / 2;
    const duration = moveAmount / (50 * speed);

    animationRef.current = gsap.to(scrollContainer, {
      y: -moveAmount,
      duration: duration,
      ease: "none",
      repeat: -1,
    });

    if (isHovered) animationRef.current.pause();

    return () => {
      if (animationRef.current) animationRef.current.kill();
    };
  }, [repeatedTestimonials, speed]);

  useEffect(() => {
    if (animationRef.current) {
      if (isHovered) animationRef.current.pause();
      else animationRef.current.play();
    }
  }, [isHovered]);

  return (
    <div 
      className="relative flex-1 h-[85vh] overflow-hidden" 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        maskImage: `linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)`,
        WebkitMaskImage: `linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)`
      }}
    >
      <div className="absolute w-full px-2" ref={scrollRef}>
        {repeatedTestimonials.map((t, i) => (
          <div key={`${t.id}-${i}`} className="mb-6">
            <TestimonialCard t={t} theme={theme} />
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * Swipeable horizontal carousel for Mobile
 */
/**
 * Mobile Vertical scrolling column with Tap-to-Pause
 */
const MobileVerticalColumn = ({ testimonials, theme = 'light', mobilePadding = true }) => {
  const containerRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const isDark = theme === 'dark';
  
  const repeatedTestimonials = React.useMemo(() => getRepeatedTestimonials(testimonials), [testimonials]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || repeatedTestimonials.length === 0) return;

    // Use ticker for smooth, frame-based scroll increment
    const ticker = () => {
      if (isPaused) return;
      
      const moveAmount = container.scrollHeight / 2;
      container.scrollTop += 2.5; // Control speed here
      
      if (container.scrollTop >= moveAmount) {
        container.scrollTop = 0;
      }
    };

    gsap.ticker.add(ticker);
    return () => gsap.ticker.remove(ticker);
  }, [repeatedTestimonials, isPaused]);

  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  return (
    <div className="w-full max-w-sm mx-auto px-0 flex flex-col items-center">
      {/* Interaction Hint */}
      <div className={`mb-4 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest ${isDark ? 'bg-white/10 text-white/50' : 'bg-black/5 text-black/40'} animate-pulse`}>
        {isPaused ? 'Scroll to read • Tap to Resume' : 'Tap to Pause & Scroll'}
      </div>

      <div 
        ref={containerRef}
        className={`relative w-full h-[480px] ${isPaused ? 'overflow-y-auto' : 'overflow-hidden'} cursor-pointer transition-all duration-500`} 
        onClick={togglePause}
        style={{
          maskImage: isPaused
            ? `linear-gradient(to bottom, transparent, black 5%, black 95%, transparent)`
            : `linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)`,
          WebkitMaskImage: isPaused
            ? `linear-gradient(to bottom, transparent, black 5%, black 95%, transparent)`
            : `linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)`
        }}
      >
        <div className="w-full">
          {repeatedTestimonials.map((t, i) => (
            <div key={`${t.id}-${i}`} className={`mb-6 ${mobilePadding ? 'px-4' : 'px-0'}`}>
              <TestimonialCard t={t} theme={theme} isMobile={true} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function HomeTestimonials({ theme = 'light', showHeading = true, className = "", mobilePadding = true }) {
  const [testimonials, setTestimonials] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const isDark = theme === 'dark';

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    async function fetchTestimonials() {
      const data = await getApprovedTestimonials();
      if (data) setTestimonials(data);
    }
    fetchTestimonials();
  }, []);

  if (testimonials.length === 0) return null;

  return (
    <section className={`${className || 'py-12 md:py-24'} relative overflow-hidden transition-colors duration-700 ${isDark ? 'bg-black' : 'bg-white'}`}>
      {showHeading && (
        <div className="relative mb-10 md:mb-24">
          {/* Large Background Text - Primary Heading */}
          <div className="w-full text-center pointer-events-none select-none">
            <h2 className={`text-[12vw] md:text-[12vw] font-black uppercase tracking-tighter leading-none ${isDark ? 'text-white/10' : 'text-black'}`}>
              Testimonials
            </h2>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      {isMobile ? (
        <MobileVerticalColumn testimonials={testimonials} theme={theme} mobilePadding={mobilePadding} />
      ) : (
        <div className="w-full max-w-7xl mx-auto px-4 relative flex flex-col md:flex-row gap-0">
          <Column testimonials={testimonials} speed={2} theme={theme} />
          <Column testimonials={testimonials} speed={1.5} theme={theme} />
          <Column testimonials={testimonials} speed={2.5} theme={theme} />
        </div>
      )}
    </section>
  );
}
