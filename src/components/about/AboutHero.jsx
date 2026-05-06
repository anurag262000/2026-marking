"use client";

import React from "react";
import Image from "next/image";

const AboutHero = () => {
  return (
    <section className="relative w-full pt-32 pb-20 px-6 sm:px-12 md:px-24">
      <div className="max-w-7xl mx-auto">
        {/* Right-aligned large heading */}
        <div className="flex justify-end mb-16">
          <h1 className="hero-line text-[12vw] md:text-[12vw] xl:text-[15vw] font-bold leading-none uppercase tracking-tighter text-white">
            about
          </h1>
        </div>

        {/* Wide Image below */}
        <div className="hero-img relative w-full aspect-[21/10] overflow-hidden border border-white/10 group">
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10" />
          {/* Using a placeholder for now as requested */}
          <div className="w-full h-full bg-[#111] flex items-center justify-center">
            <span className="text-white/20 text-xl font-medium tracking-widest uppercase">
              Project Image Placeholder
            </span>
          </div>
          {/* Optional: Add a real image if you have one, or use next/image with a placeholder */}
          <Image
            src="/coding.png"
            alt="About Hero"
            fill
            className="object-cover object-top "
          />
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
