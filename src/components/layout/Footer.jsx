"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const FooterLink = ({ href, children, isExternal = false }) => {
  const linkStyle = {
    color: 'var(--pitch-black)',
    opacity: 0.7
  };

  const linkClass = "block transition-all duration-200 font-space font-medium text-sm md:text-base mb-2 uppercase tracking-wide hover:opacity-100";

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClass}
        style={linkStyle}
        onMouseEnter={(e) => {
          e.currentTarget.style.opacity = '1';
          e.currentTarget.style.transform = 'translateX(4px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.opacity = '0.7';
          e.currentTarget.style.transform = 'translateX(0)';
        }}
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className={linkClass}
      style={linkStyle}
      onMouseEnter={(e) => {
        e.currentTarget.style.opacity = '1';
        e.currentTarget.style.transform = 'translateX(4px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.opacity = '0.7';
        e.currentTarget.style.transform = 'translateX(0)';
      }}
    >
      {children}
    </Link>
  );
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer 
      className="relative w-full pt-20 pb-10 px-4 md:px-8 overflow-hidden z-20"
      style={{ backgroundColor: 'var(--off-white)' }}
    >
      {/* Neo-Brutalist Dot Pattern */}
      <div className="absolute inset-0 bg-dot-brutalist pointer-events-none opacity-50" />

      {/* 1. Giant Headline Section */}
      <div className="w-full max-w-[2000px] mx-auto flex flex-col items-center justify-center mb-16 select-none relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center items-baseline gap-4 md:gap-8 leading-[0.8]"
        >
          <span 
            className="text-[12vw] md:text-[12rem] lg:text-[14rem] font-black font-bebas tracking-tight"
            style={{ color: 'var(--pitch-black)' }}
          >
            LET'S
          </span>
          <span 
            className="text-[12vw] md:text-[12rem] lg:text-[14rem] font-black font-bebas tracking-tight"
            style={{ 
              WebkitTextStroke: '3px var(--pitch-black)',
              WebkitTextFillColor: 'transparent',
              position: 'relative'
            }}
          >
            BUILD
            <span 
              className="absolute left-2 top-2 -z-10"
              style={{ 
                WebkitTextStroke: '0',
                WebkitTextFillColor: 'var(--electric-purple)',
                color: 'var(--electric-purple)'
              }}
            >
              BUILD
            </span>
          </span>
          <span 
            className="text-[15vw] md:text-[12rem] lg:text-[14rem] font-black font-bebas"
            style={{ 
              color: 'var(--neon-yellow)',
              WebkitTextStroke: '3px var(--pitch-black)'
            }}
          >
            !
          </span>
        </motion.div>
        
        {/* Subtitle sticker */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-8"
        >
          <span 
            className="inline-block px-6 py-3 rounded-xl font-space font-black text-sm md:text-base uppercase tracking-wider"
            style={{
              backgroundColor: 'var(--action-pink)',
              color: 'var(--pure-white)',
              border: '3px solid var(--pitch-black)',
              boxShadow: '6px 6px 0px var(--pitch-black)',
              transform: 'rotate(-2deg)'
            }}
          >
            🚀 Got a project? Hit me up!
          </span>
        </motion.div>
      </div>

      {/* 2. Wide Banner / Marquee Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="w-full max-w-[1800px] mx-auto h-[120px] md:h-[200px] rounded-3xl relative overflow-hidden mb-20 group"
        style={{ 
          backgroundColor: 'var(--pitch-black)',
          border: '4px solid var(--pitch-black)',
          boxShadow: '10px 10px 0px var(--pitch-black)'
        }}
      >
        {/* Animated Marquee Text */}
        <div className="absolute inset-0 flex items-center overflow-hidden">
          <div className="whitespace-nowrap flex items-center gap-10 animate-marquee-slow">
            {[...Array(6)].map((_, i) => (
              <span
                key={i}
                className="font-bebas font-bold text-[4rem] md:text-[8rem] uppercase tracking-tight transition-all duration-500 select-none"
                style={{ 
                  color: 'var(--neon-yellow)',
                  WebkitTextStroke: '2px var(--pitch-black)'
                }}
              >
                LET'S COLLAB • HIRE ME • MAKE MAGIC •
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* 3. Three Column Footer Content */}
      <div className="w-full max-w-[1600px] mx-auto grid grid-cols-2 md:grid-cols-3 gap-12 md:gap-8 mb-20 px-4 relative z-10">

        {/* Column 1: Explore */}
        <div className="flex flex-col gap-4">
          <h3 
            className="font-black font-bebas text-3xl md:text-4xl uppercase tracking-tight mb-2 flex items-center gap-2"
            style={{ color: 'var(--pitch-black)' }}
          >
            <span>🗺️</span> EXPLORE
          </h3>
          <div className="flex flex-col gap-2">
            <FooterLink href="/">Home</FooterLink>
            <FooterLink href="/#about">About</FooterLink>
            <FooterLink href="/projects">Projects</FooterLink>
            <FooterLink href="/blogs">Blogs</FooterLink>
            <FooterLink href="/contact">Contact</FooterLink>
          </div>
        </div>

        {/* Column 2: Follow */}
        <div className="flex flex-col gap-4">
          <h3 
            className="font-black font-bebas text-3xl md:text-4xl uppercase tracking-tight mb-2 flex items-center gap-2"
            style={{ color: 'var(--pitch-black)' }}
          >
            <span>🔥</span> FOLLOW
          </h3>
          <div className="flex flex-col gap-2">
            <FooterLink href="https://github.com/anurag262000" isExternal>GitHub</FooterLink>
            <FooterLink href="https://www.linkedin.com/in/anuragmishra26" isExternal>LinkedIn</FooterLink>
          </div>
        </div>

        {/* Column 3: Contact */}
        <div className="col-span-2 md:col-span-1">
          <div className="flex flex-col gap-4">
            <h3 
              className="font-black font-bebas text-3xl md:text-4xl uppercase tracking-tight mb-2 flex items-center gap-2"
              style={{ color: 'var(--pitch-black)' }}
            >
              <span>📧</span> HIT ME UP
            </h3>
            <a 
              href="mailto:anuragmishra262000@gmail.com" 
              className="text-lg md:text-xl font-bold font-space break-all transition-all inline-block px-3 py-2 rounded-lg"
              style={{ color: 'var(--pitch-black)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--neon-yellow)';
                e.currentTarget.style.transform = 'rotate(-1deg)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.transform = 'rotate(0deg)';
              }}
            >
              anuragmishra262000@gmail.com
            </a>
          </div>
        </div>

      </div>

      {/* 4. Bottom Bar */}
      <div 
        className="w-full max-w-[1900px] mx-auto flex flex-col md:flex-row items-center justify-between pt-8 gap-4 px-4 relative z-10"
        style={{ borderTop: '4px solid var(--pitch-black)' }}
      >
        <p 
          className="text-xs md:text-sm font-space font-black uppercase tracking-wider text-center md:text-left"
          style={{ color: 'var(--pitch-black)', opacity: 0.6 }}
        >
          © {currentYear} ANURAG MISHRA • ALL RIGHTS RESERVED
        </p>
        <p 
          className="text-xs md:text-sm font-space font-black uppercase tracking-wider text-center md:text-right"
          style={{ color: 'var(--pitch-black)', opacity: 0.6 }}
        >
          BUILT WITH 💜 BY ANURAG
        </p>
      </div>

    </footer>
  );
}
