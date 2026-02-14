"use client";
import React from "react";
import { motion } from "framer-motion";
import { AuroraCore } from "@/components/ui/AuroraCore";
import { FiGithub, FiLinkedin, FiInstagram, FiTwitter, FiMail } from "react-icons/fi";

const FooterLink = ({ href, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="block text-white/60 hover:text-white transition-colors duration-300 font-inter text-sm md:text-base mb-2 uppercase tracking-wider"
  >
    {children}
  </a>
);

const FooterSection = ({ title, children }) => (
  <div className="flex flex-col gap-4">
    <h3 className="text-white font-black font-orbitron text-xl md:text-2xl uppercase tracking-widest mb-2">
      {title}
    </h3>
    <div className="flex flex-col gap-1">
      {children}
    </div>
  </div>
);

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full bg-black text-white pt-20 pb-10 px-4 md:px-8 overflow-hidden z-20">

      {/* 1. Giant Headline Section */}
      <div className="w-full max-w-[2000px] mx-auto flex flex-col items-center justify-center mb-10 select-none">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center items-baseline gap-2 md:gap-8 leading-[0.8]"
        >
          <span className="text-[15vw] md:text-[12rem] lg:text-[14rem] font-black font-orbitron tracking-tighter text-white">
            LET'S
          </span>
           {/* Stylized 'DO' - using italic/accent color to mimic handwriting/difference */}
          <span className="text-[15vw] md:text-[12rem] lg:text-[14rem]  font-orbitron italic text-white/80 tracking-tighter relative z-10 ">
            WORK
          </span>
          <span className="text-[15vw] md:text-[12rem] lg:text-[14rem] font-black font-orbitron text-accent stroke-text-active">
            !
          </span>
        </motion.div>
      </div>

      {/* 2. Wide Banner / Visual Separator */}
      {/* 2. Wide Banner / Visual Separator */}
      {/* Background Aurora Effect */}


      {/* 2. Wide Banner / Visual Separator */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="w-full max-w-[1800px] mx-auto h-[200px] md:h-[400px] rounded-[3rem] bg-[#111] relative overflow-hidden mb-20 group border border-white/5 z-10"
      >
      {/* Background Aurora Effect */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none opacity-50 blur-3xl">
          <AuroraCore
            id="tsparticlesfooter"
            background="transparent"
            particleDensity={5}
            className="w-full h-full"

            blur={100}
            speed={0.5}
          />

      </div>
        {/* Texture Overlay */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none" />

        {/* Animated Drift Text (CSS Marquee for Smoothness) */}
        <div className="absolute inset-0 flex items-center overflow-hidden">
          <div className="whitespace-nowrap flex items-center gap-10 animate-marquee-slow">
             {/* Repeat text to ensure coverage */}
             {[...Array(6)].map((_, i) => (
                <span
                    key={i}
                    className="font-orbitron font-bold text-gray-500 text-[6rem] md:text-[10rem] lg:text-[12rem] uppercase tracking-tighter transition-all duration-500 group-hover:text-[#333] group-hover:tracking-widest group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] select-none"
                    style={{ willChange: "transform" }}
                >
                    CREATE SOMETHING EPIC
                </span>
             ))}
          </div>
        </div>

        {/* Light Sweep Animation */}
         <motion.div
            animate={{ x: ["-100%", "200%"] }}
            transition={{
                duration: 1.5,
                ease: "easeInOut",
                repeat: Infinity,
                repeatDelay: 10 // Runs every ~11.5s
            }}
            className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-[-20deg] pointer-events-none mix-blend-overlay"
        />

        {/* Center overlay text (Optional, if we want static readable text on top, but user asked for the banner text itself to be the focus.
            The user said "centered headline... Animate the headline with a very slow... drift".
            So the drifting text IS the headline. I will utilize the drifting text as the main focus.)
        */}

      </motion.div>

      {/* 3. Three Column Footer Content */}
      <div className="w-full max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mb-20 px-4">

        {/* Column 1: Explore */}
        <FooterSection title="Explore">
          <FooterLink href="#home">Home</FooterLink>
          <FooterLink href="#about">About</FooterLink>
          <FooterLink href="#projects">Work</FooterLink>
          <FooterLink href="#blog">Notes</FooterLink>
        </FooterSection>

        {/* Column 2: Follow */}
        <FooterSection title="Follow">
          <FooterLink href="https://instagram.com/yourhandle">Instagram</FooterLink>
          <FooterLink href="https://linkedin.com/in/anuragmishra26">LinkedIn</FooterLink>
          <FooterLink href="https://github.com/anurag262000">GitHub</FooterLink>
          <FooterLink href="https://twitter.com/yourhandle">X / Twitter</FooterLink>
        </FooterSection>

        {/* Column 3: Contact */}
        <FooterSection title="Contact">
           <a href="mailto:anuragmishra262000@gmail.com" className="text-xl md:text-2xl font-bold font-orbitron text-white hover:text-blue-400 transition-colors break-all">
             anuragmishra262000<br/>@gmail.com
           </a>
        </FooterSection>

      </div>

      {/* 4. Bottom Bar */}
      <div className="w-full max-w-[1900px] mx-auto flex flex-col md:flex-row items-center justify-between border-t border-white/10 pt-8 gap-4 px-4">
        <p className="text-white/40 text-xs md:text-sm font-inter uppercase tracking-widest text-center md:text-left">
           © {currentYear} Anurag Mishra. All Rights Reserved.
        </p>
        <p className="text-white/40 text-xs md:text-sm font-inter uppercase tracking-widest text-center md:text-right">
            Site by Anurag
        </p>
      </div>

    </footer>
  );
}
