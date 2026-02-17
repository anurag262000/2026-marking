'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getApprovedTestimonials } from '@/app/admin/testimonials/actions';

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    async function fetchTestimonials() {
      const data = await getApprovedTestimonials();
      if (data) setTestimonials(data);
    }
    fetchTestimonials();
  }, []);

  if (testimonials.length === 0) return null;

  return (
    <section className="py-20 md:py-32 bg-[#050505] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
            <h2 className="text-3xl md:text-5xl font-black font-helvetica text-white mb-6 uppercase">
                Client <span className="text-blue-500">Feedback</span>
            </h2>
            <div className="h-1 w-24 bg-white/20 mx-auto rounded-full" />
        </div>

        {/* Marquee Wrapper */}
        <div className="relative w-full overflow-hidden">

            {/* Gradients to fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />

            <div className="flex gap-6 animate-marquee-slow hover:[animation-play-state:paused] w-max px-4">
                {[...testimonials, ...testimonials].map((t, i) => ( // Duplicate for seamless loop
                     <div
                        key={`${t.id}-${i}`}
                        className="w-[300px] md:w-[400px] bg-white/5 border border-white/10 rounded-2xl p-8 flex-shrink-0 backdrop-blur-sm hover:bg-white/10 transition-colors"
                     >
                        <div className="flex items-center gap-4 mb-6">
                            {t.image_url ? (
                                <img src={t.image_url} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
                            ) : (
                                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-500 to-purple-600" />
                            )}
                            <div>
                                <h4 className="font-bold text-white text-lg">{t.name}</h4>
                                <p className="text-xs text-white/50 uppercase tracking-wider">{t.role} @ {t.company}</p>
                            </div>
                        </div>
                        <p className="text-white/70 italic leading-relaxed text-sm">
                            "{t.content}"
                        </p>
                     </div>
                ))}
            </div>
        </div>
    </section>
  );
}
