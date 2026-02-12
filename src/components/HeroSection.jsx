"use client";
import React from "react";
import { AuroraCore } from "./ui/AuroraCore";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import Typewriter from "typewriter-effect";
import WeaponRack from "./Sections/WeaponRack";

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-screen bg-black overflow-hidden flex flex-col items-center justify-center py-20" id="home">
      {/* Background Sparkles */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <AuroraCore
          id="tsparticleshero"
          background="transparent"
          particleDensity={25}
          className="w-full h-full"
          particleColor="#ffffffff"
        />
      </div>

      {/* <div className="absolute inset-0 w-full h-full bg-dot-thick-neutral-800 opacity-80 pointer-events-none" /> */}

      <div className="relative z-10 mb-10 flex flex-col items-center justify-center px-6 w-full min-w-[300px] max-w-[2500px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center w-full"
        >


          {/* Separated Main Headline */}
          <div className="flex flex-col items-center select-none max-w-[2500px] mb-10 md:mb-14">
            <h1 className="flex  flex-col items-center max-w-[2500px]">
              <motion.span
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 1 }}
                className="text-[66px]  md:text-[126px] lg:text-[176px] xl:text-[212px] 2xl:text-[270px] font-black text-white leading-[0.9] font-orbitron tracking-tighter uppercase block"
              >
                CRAFTING
              </motion.span>

              <motion.span
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 1 }}
                className="text-[66px] md:text-[126px] lg:text-[176px] xl:text-[212px] 2xl:text-[270px] font-black leading-[0.9] font-orbitron tracking-tighter uppercase stroke-text block"
              >
                THE
              </motion.span>

              <span className="text-[60px] md:text-[116px] lg:text-[156px] xl:text-[212px] 2xl:text-[270px] font-black leading-none font-orbitron tracking-tighter uppercase text-white drop-shadow-[0_0_20px_rgba(249,115,22,0.3)] mt-1 md:mt-0">
                <Typewriter
                  options={{
                    strings: ['FUTURE', 'BOLD', 'SCALABLE', 'UNIQUE'],
                    autoStart: true,
                    loop: true,
                    delay: 75,
                    deleteSpeed: 50,
                  }}
                />
              </span>
            </h1>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.0, duration: 1 }}
            className="flex items-center gap-4 md:gap-8"
          >
            <div className="hidden md:block h-[1px] w-20 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <p className="text-white/20 text-[9px] md:text-sm font-bold tracking-[0.4em] md:tracking-[0.6em] uppercase font-orbitron">
              Full Stack Engineer & System Architect
            </p>
            <div className="hidden md:block h-[1px] w-20 bg-gradient-to-l from-transparent via-white/10 to-transparent" />
          </motion.div>

          {/* Social Links Replacing Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.2, duration: 0.5 }}
            className="flex items-center gap-6 md:gap-12 mt-12"
          >
            <a href="https://github.com/anurag262000" target="_blank" className="text-white/40 hover:text-white transition-all hover:scale-110">
              <FiGithub size={32} />
            </a>
            <a href="www.linkedin.com/in/anuragmishra26" target="_blank" className="text-white/40 hover:text-white transition-all hover:scale-110">
              <FiLinkedin size={32} />
            </a>
            <a href="mailto:anuragmiahra262000@gmail.com" className="text-white/40 hover:text-white transition-all hover:scale-110">
              <FiMail size={32} />
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[9px] uppercase tracking-[0.2em] text-white/20 font-medium font-orbitron">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-1 h-1 rounded-full bg-blue-500/50"
        />
      </motion.div> */}
      <WeaponRack/>
    </section>
  );
}
