'use client';

import React, { useEffect, useRef, useState } from 'react';
import { getApprovedTestimonials } from '@/app/admin/testimonials/actions';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TestimonialCard = ({ t, theme = 'light' }) => {
  const isDark = theme === 'dark';
  
  return (
    <div className={`w-full ${isDark ? 'bg-white/5 border-white/60 hover:bg-white/10' : 'bg-white border-gray-300 hover:shadow-xl'} border rounded-2xl p-6 mb-6 transition-all duration-500 hover:scale-[1.02]`}>
      <div className="flex items-center gap-0 mb-4">
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
      <div className="relative">
        <span className={`absolute -top-2 -left-2 text-4xl ${isDark ? 'text-white/5' : 'text-gray-100'} font-serif leading-none pointer-events-none`}>"</span>
        <p className={`${isDark ? 'text-white/70' : 'text-gray-700'} leading-relaxed text-sm relative z-10 italic`}>
          {t.content}
        </p>
      </div>
    </div>
  );
};

const Column = ({ testimonials, speed = 1, theme = 'light' }) => {
  const scrollRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const isDark = theme === 'dark';
  const animationRef = useRef(null);
  
  const repeatedTestimonials = React.useMemo(() => {
    if (testimonials.length === 0) return [];
    
    const shuffle = (array) => {
      const newArr = [...array];
      for (let i = newArr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
      }
      return newArr;
    };

    let items = [];
    // Ensure we have enough items for a smooth scroll loop (at least 15-20)
    const minItems = 20;
    
    while (items.length < minItems) {
      const batch = shuffle(testimonials);
      
      // If the first item of the new batch matches the last item of the current list, swap it
      if (items.length > 0 && batch[0].id === items[items.length - 1].id && batch.length > 1) {
        [batch[0], batch[1]] = [batch[1], batch[0]];
      }
      
      items = [...items, ...batch];
    }

    // Final check: ensure the very last item doesn't match the very first item
    // because GSAP loops by duplicating this entire list and resetting half-way
    if (items.length > 1 && items[items.length - 1].id === items[0].id && testimonials.length > 1) {
      // Swap last item with second-to-last
      const lastIdx = items.length - 1;
      [items[lastIdx], items[lastIdx - 1]] = [items[lastIdx - 1], items[lastIdx]];
    }

    return [...items, ...items];
  }, [testimonials]);

  useEffect(() => {
    if (!scrollRef.current || repeatedTestimonials.length === 0) return;

    const scrollContainer = scrollRef.current;
    
    // Reset position before creating new animation to avoid offset issues
    gsap.set(scrollContainer, { y: 0 });
    
    const moveAmount = scrollContainer.scrollHeight / 2;
    const duration = moveAmount / (50 * speed);

    animationRef.current = gsap.to(scrollContainer, {
      y: -moveAmount,
      duration: duration,
      ease: "none",
      repeat: -1,
    });

    // Apply current hover state to new animation
    if (isHovered) {
      animationRef.current.pause();
    }

    return () => {
      if (animationRef.current) {
        animationRef.current.kill();
      }
    };
  }, [repeatedTestimonials, speed]);

  useEffect(() => {
    if (animationRef.current) {
      if (isHovered) {
        animationRef.current.pause();
      } else {
        animationRef.current.play();
      }
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
          <TestimonialCard key={`${t.id}-${i}`} t={t} theme={theme} />
        ))}
      </div>
    </div>
  );
};

export default function HomeTestimonials({ theme = 'light' }) {
  const [testimonials, setTestimonials] = useState([]);
  const isDark = theme === 'dark';

  useEffect(() => {
    async function fetchTestimonials() {
      const data = await getApprovedTestimonials();
      if (data) setTestimonials(data);
    }
    fetchTestimonials();
  }, []);

  if (testimonials.length === 0) return null;

  return (
    <section className={`py-24 ${isDark ? 'bg-black' : 'bg-white'} relative overflow-hidden flex flex-col items-center`}>
      <div className="w-full max-w-[1920px] px-6 mb-12 relative">
        <h2 className={`text-[12vw] md:text-[12vw] font-black ${isDark ? 'text-white/12' : 'text-gray-900/5'} text-center tracking-tighter uppercase leading-[0.7] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full pointer-events-none select-none`}>
          Testimonials
        </h2>
        <h2 className={`text-5xl md:text-8xl font-black ${isDark ? 'text-white' : 'text-gray-900'} text-center tracking-tighter uppercase leading-[0.8] relative z-10 py-10`}>
          Reviews
        </h2>
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 relative flex flex-col md:flex-row gap-0">
        <Column testimonials={testimonials} speed={2} theme={theme} />
        <Column testimonials={testimonials} speed={1.5} theme={theme} />
        <Column testimonials={testimonials} speed={2.5} theme={theme} />
      </div>
    </section>
  );
}
