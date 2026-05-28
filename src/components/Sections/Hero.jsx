"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FiGithub, FiLinkedin, FiMail, FiArrowRight, FiZap, FiCode } from "react-icons/fi";
import Typewriter from "typewriter-effect";
import WeaponRack from "./WeaponRack";

export default function HeroSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative w-full h-screen bg-[#0A0A0A] overflow-hidden"
    >
      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(#00D9FF 2px, transparent 2px),
            linear-gradient(90deg, #00D9FF 2px, transparent 2px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Floating shapes */}
      <motion.div
        animate={{ rotate: 360, scale: [1, 1.1, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-20 right-[10%] w-32 h-32 border-[6px] border-[#00D9FF] opacity-40"
      />
      <motion.div
        animate={{ rotate: -360, y: [0, 30, 0] }}
        transition={{ duration: 15, repeat: Infinity }}
        className="absolute bottom-40 left-[10%] w-24 h-24 bg-[#FF6B35] opacity-30"
      />

      <motion.div style={{ y, opacity }} className="relative z-10 h-screen flex items-center px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto w-full">
          {/* Top stickers */}
          <div className="flex flex-wrap gap-4 mb-8 md:mb-12">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: -6 }}
              transition={{ type: "spring", bounce: 0.5, delay: 0.2 }}
              whileHover={{ scale: 1.1, rotate: -12 }}
              className="bg-[#00D9FF] border-[4px] border-[#00D9FF] shadow-[6px_6px_0px_#00D9FF] px-4 py-2"
            >
              <span className="text-xs md:text-sm font-space font-black uppercase tracking-wider text-[#0A0A0A] flex items-center gap-2">
                <FiZap /> NOT BORING
              </span>
            </motion.div>

            <motion.div
              initial={{ scale: 0, rotate: 180 }}
              animate={{ scale: 1, rotate: 3 }}
              transition={{ type: "spring", bounce: 0.5, delay: 0.3 }}
              whileHover={{ scale: 1.1, rotate: 8 }}
              className="bg-[#FF6B35] border-[4px] border-[#FF6B35] shadow-[6px_6px_0px_#FF6B35] px-4 py-2"
            >
              <span className="text-xs md:text-sm font-space font-black uppercase tracking-wider text-[#0A0A0A] flex items-center gap-2">
                <FiCode /> INDIE DEV
              </span>
            </motion.div>

            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: -3 }}
              transition={{ type: "spring", bounce: 0.5, delay: 0.4 }}
              whileHover={{ scale: 1.1, rotate: -8 }}
              className="bg-[#FFEE32] border-[4px] border-[#FFEE32] shadow-[6px_6px_0px_#FFEE32] px-4 py-2"
            >
              <span className="text-xs md:text-sm font-space font-black uppercase tracking-wider text-[#0A0A0A]">
                🔥 AVAILABLE
              </span>
            </motion.div>
          </div>

          {/* Main content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Left side - Hero text */}
            <div className="lg:col-span-7 space-y-6">
              {/* Massive headline */}
              <div className="space-y-1">
                {["BUILDING", "THE", "FUTURE"].map((word, i) => (
                  <motion.h1
                    key={word}
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 + i * 0.15, type: "spring" }}
                    className="font-bebas uppercase leading-[0.85] text-white"
                    style={{
                      fontSize: "clamp(3.5rem, 14vw, 10rem)",
                      textShadow: i === 1
                        ? "6px 6px 0px #00D9FF, 12px 12px 0px #FF6B35"
                        : "6px 6px 0px #FF6B35, 12px 12px 0px #00D9FF",
                    }}
                  >
                    {word}
                  </motion.h1>
                ))}
              </div>

              {/* Tag with typewriter */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, type: "spring" }}
                className="inline-flex items-center gap-4 bg-[#0A0A0A] border-[4px] border-[#00D9FF] shadow-[6px_6px_0px_#00D9FF] px-6 py-3 -rotate-1"
              >
                <span className="text-sm md:text-base font-space font-black uppercase tracking-wider text-[#00D9FF]">
                  FULL STACK
                </span>
                <div className="h-6 w-[3px] bg-[#00D9FF]" />
                <span className="text-sm md:text-base font-space font-bold text-white min-w-[180px]">
                  <Typewriter
                    options={{
                      strings: [
                        "SHIPPING DAILY",
                        "NO BS CODE",
                        "JUST VIBES",
                        "BREAKING NORMS",
                      ],
                      autoStart: true,
                      loop: true,
                      delay: 50,
                      deleteSpeed: 30,
                    }}
                  />
                </span>
              </motion.div>

              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                className="space-y-3"
              >
                <p className="text-base md:text-lg font-space font-bold text-white leading-relaxed max-w-2xl">
                  I build{" "}
                  <span className="inline-block bg-[#00D9FF] border-[3px] border-[#00D9FF] px-2 py-1 -rotate-1 shadow-[3px_3px_0px_#00D9FF] text-[#0A0A0A]">
                    BOLD
                  </span>
                  ,{" "}
                  <span className="inline-block bg-[#FF6B35] border-[3px] border-[#FF6B35] px-2 py-1 rotate-1 shadow-[3px_3px_0px_#FF6B35] text-[#0A0A0A]">
                    FAST
                  </span>
                  , and{" "}
                  <span className="inline-block bg-[#FFEE32] border-[3px] border-[#FFEE32] px-2 py-1 -rotate-1 shadow-[3px_3px_0px_#FFEE32] text-[#0A0A0A]">
                    LOUD
                  </span>{" "}
                  web experiences that refuse to blend in.
                </p>

                <p className="text-sm md:text-base font-space font-semibold text-white/60 max-w-xl">
                  No corporate vibes. No fake minimalism. Just shipping products that actually work.
                </p>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 }}
                className="flex flex-wrap gap-4 pt-2"
              >
                <motion.a
                  href="https://github.com/anurag262000"
                  target="_blank"
                  whileHover={{ scale: 1.05, x: 2, y: 2 }}
                  whileTap={{ scale: 0.95 }}
                  className="group bg-[#00D9FF] border-[4px] border-[#00D9FF] shadow-[6px_6px_0px_#00D9FF] px-6 py-3 font-space font-black text-sm md:text-base uppercase tracking-wider text-[#0A0A0A] hover:shadow-[3px_3px_0px_#00D9FF] transition-all"
                >
                  <span className="flex items-center gap-2">
                    <FiGithub className="text-lg" />
                    GITHUB
                    <FiArrowRight className="text-lg group-hover:translate-x-1 transition-transform" />
                  </span>
                </motion.a>

                <motion.a
                  href="https://www.linkedin.com/in/anuragmishra26"
                  target="_blank"
                  whileHover={{ scale: 1.05, x: 2, y: 2 }}
                  whileTap={{ scale: 0.95 }}
                  className="group bg-[#0A0A0A] border-[4px] border-white shadow-[6px_6px_0px_white] px-6 py-3 font-space font-black text-sm md:text-base uppercase tracking-wider text-white hover:shadow-[3px_3px_0px_white] transition-all"
                >
                  <span className="flex items-center gap-2">
                    <FiLinkedin className="text-lg" />
                    CONNECT
                    <FiArrowRight className="text-lg group-hover:translate-x-1 transition-transform" />
                  </span>
                </motion.a>

                <motion.a
                  href="mailto:anuragmishra262000@gmail.com"
                  whileHover={{ scale: 1.05, x: 2, y: 2 }}
                  whileTap={{ scale: 0.95 }}
                  className="group bg-[#FF6B35] border-[4px] border-[#FF6B35] shadow-[6px_6px_0px_#FF6B35] px-6 py-3 font-space font-black text-sm md:text-base uppercase tracking-wider text-[#0A0A0A] hover:shadow-[3px_3px_0px_#FF6B35] transition-all"
                >
                  <span className="flex items-center gap-2">
                    <FiMail className="text-lg" />
                    EMAIL
                    <FiArrowRight className="text-lg group-hover:translate-x-1 transition-transform" />
                  </span>
                </motion.a>
              </motion.div>

              {/* Bottom tags */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.6 }}
                className="flex flex-wrap gap-3 pt-2"
              >
                <span className="bg-[#0A0A0A] text-[#FFEE32] border-[3px] border-[#FFEE32] px-3 py-1.5 text-xs font-space font-black uppercase tracking-wider">
                  LUDHIANA
                </span>
                <span className="bg-[#0A0A0A] border-[3px] border-white px-3 py-1.5 text-xs font-space font-black uppercase tracking-wider text-white">
                  FULL STACK
                </span>
                <span className="bg-[#0A0A0A] text-[#00D9FF] border-[3px] border-[#00D9FF] px-3 py-1.5 text-xs font-space font-black uppercase tracking-wider">
                  OPEN TO WORK
                </span>
              </motion.div>
            </div>

            {/* Right side - Stats cards */}
            <div className="lg:col-span-5 space-y-5">
              {/* Large card */}
              <motion.div
                initial={{ opacity: 0, x: 50, rotate: 5 }}
                animate={{ opacity: 1, x: 0, rotate: 2 }}
                transition={{ delay: 0.8, type: "spring" }}
                whileHover={{ rotate: -2, y: -8 }}
                className="bg-[#0A0A0A] border-[4px] border-[#00D9FF] shadow-[8px_8px_0px_#00D9FF] p-6"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="text-6xl md:text-7xl font-bebas text-white">
                    50+
                  </div>
                  <div className="text-3xl">🚀</div>
                </div>
                <p className="text-base md:text-lg font-space font-black uppercase tracking-wider text-[#00D9FF]">
                  PROJECTS
                </p>
                <p className="text-sm font-space font-bold text-white/50 mt-2">
                  SHIPPED & DEPLOYED
                </p>
              </motion.div>

              {/* Two small cards */}
              <div className="grid grid-cols-2 gap-5">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9, type: "spring" }}
                  whileHover={{ rotate: -3, scale: 1.05 }}
                  className="bg-[#0A0A0A] border-[4px] border-[#FF6B35] shadow-[6px_6px_0px_#FF6B35] p-5"
                >
                  <div className="text-5xl font-bebas text-white mb-2">
                    3+
                  </div>
                  <p className="text-xs font-space font-black uppercase tracking-wider text-[#FF6B35]">
                    YEARS
                  </p>
                  <div className="text-2xl mt-2">⚡</div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1, type: "spring" }}
                  whileHover={{ rotate: 3, scale: 1.05 }}
                  className="bg-[#0A0A0A] border-[4px] border-[#FFEE32] shadow-[6px_6px_0px_#FFEE32] p-5"
                >
                  <div className="text-5xl font-bebas text-white mb-2">
                    10+
                  </div>
                  <p className="text-xs font-space font-black uppercase tracking-wider text-[#FFEE32]">
                    STACKS
                  </p>
                  <div className="text-2xl mt-2">💻</div>
                </motion.div>
              </div>

              {/* Quote card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, type: "spring" }}
                whileHover={{ rotate: 1 }}
                className="bg-[#0A0A0A] border-[4px] border-white shadow-[8px_8px_0px_white] p-5"
              >
                <div className="text-2xl mb-2">💡</div>
                <p className="text-base md:text-lg font-space font-black text-white leading-tight mb-2">
                  "CODE THAT SHIPS BEATS CODE THAT'S PERFECT"
                </p>
                <p className="text-xs font-space font-bold text-white/40 uppercase tracking-widest">
                  — PHILOSOPHY
                </p>
              </motion.div>

              {/* Tech badges */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="flex flex-wrap gap-2"
              >
                {["REACT", "NEXT", "NODE", "TS", "TAILWIND"].map((tech, i) => (
                  <motion.span
                    key={tech}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1.3 + i * 0.1, type: "spring", bounce: 0.5 }}
                    whileHover={{ scale: 1.1, y: -3 }}
                    className="bg-[#0A0A0A] border-[3px] border-[#00D9FF] shadow-[3px_3px_0px_#00D9FF] px-3 py-1.5 text-xs font-space font-black uppercase tracking-wider text-[#00D9FF]"
                  >
                    {tech}
                  </motion.span>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* WeaponRack */}
      <div className="relative z-10">
        <WeaponRack />
      </div>
    </section>
  );
}
