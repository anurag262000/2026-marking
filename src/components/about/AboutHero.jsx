"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const AboutHero = () => {
  return (
    <section 
      className="relative w-full pt-32 pb-20 px-6 sm:px-12 md:px-24 overflow-hidden"
      style={{ backgroundColor: 'var(--off-white)' }}
    >
      {/* Dot pattern background */}
      <div className="absolute inset-0 bg-dot-brutalist pointer-events-none opacity-20" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Right-aligned large heading - Neo-Brutalist */}
        <div className="flex justify-end mb-16">
          <motion.h1 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-[12vw] md:text-[12vw] xl:text-[15vw] font-black leading-none uppercase tracking-tighter font-bebas"
            style={{ 
              color: 'var(--pitch-black)',
              WebkitTextStroke: '2px var(--pitch-black)',
              WebkitTextFillColor: 'transparent'
            }}
          >
            ABOUT 👤
          </motion.h1>
        </div>

        {/* Wide Image below - Neo-Brutalist Frame */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative w-full aspect-[21/10] overflow-hidden rounded-2xl transition-all duration-300"
          style={{
            border: '4px solid var(--pitch-black)',
            boxShadow: '12px 12px 0px var(--pitch-black)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translate(4px, 4px)';
            e.currentTarget.style.boxShadow = '8px 8px 0px var(--pitch-black)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translate(0, 0)';
            e.currentTarget.style.boxShadow = '12px 12px 0px var(--pitch-black)';
          }}
        >
          <div className="absolute inset-0 z-10" style={{ background: 'linear-gradient(to top, rgba(17, 17, 17, 0.3), transparent)' }} />
          
          <Image
            src="/coding.png"
            alt="About Hero"
            fill
            className="object-cover object-top"
          />
          
          {/* Floating sticker on image */}
          <div 
            className="absolute top-6 right-6 px-4 py-2 rounded-lg font-space font-black text-xs uppercase tracking-wider z-20"
            style={{
              backgroundColor: 'var(--neon-yellow)',
              color: 'var(--pitch-black)',
              border: '3px solid var(--pitch-black)',
              boxShadow: '5px 5px 0px var(--pitch-black)',
              transform: 'rotate(-3deg)'
            }}
          >
            🔥 THAT'S ME
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutHero;
