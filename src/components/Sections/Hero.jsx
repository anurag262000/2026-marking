"use client";
import React from "react";
import { motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import Typewriter from "typewriter-effect";
import WeaponRack from "./WeaponRack";

const wordVariant = {
  hidden: { y: 80, opacity: 0, skewY: 6 },
  visible: (i) => ({
    y: 0,
    opacity: 1,
    skewY: 0,
    transition: {
      delay: 0.15 * i,
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative w-full min-h-screen bg-[#fdfdfd] overflow-hidden flex flex-col items-center justify-center px-4 py-10 md:py-16"
    >
      {/* Outer frame */}
      <div className="absolute inset-4 md:inset-8 border-[3px] border-[#111] rounded-[20px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center w-full max-w-6xl px-2 md:px-6">
        {/* Stickers row */}
        <div className="flex items-center justify-between w-full max-w-4xl mb-6">
          <div className="flex items-center gap-3">
            <motion.div
              initial={{ y: -20, opacity: 0, rotate: -6 }}
              animate={{ y: 0, opacity: 1, rotate: -3 }}
              transition={{ duration: 0.5 }}
              className="bg-[#ccff00] border-[2px] border-[#111] shadow-[4px_4px_0px_#111] rounded-[10px] px-3 py-1 -rotate-3"
            >
              <span
                className="text-[10px] md:text-xs font-bold uppercase tracking-[0.25em] text-[#111]"
                style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif" }}
              >
                Not your corporate dev
              </span>
            </motion.div>

            <motion.div
              initial={{ y: -20, opacity: 0, rotate: 6 }}
              animate={{ y: 0, opacity: 1, rotate: 3 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="bg-[#9B30E0] border-[2px] border-[#111] shadow-[3px_3px_0px_#111] rounded-[10px] px-2 py-1 rotate-2"
            >
              <span
                className="text-[9px] md:text-[11px] font-semibold uppercase tracking-[0.2em] text-white"
                style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif" }}
              >
                Indie · systems · chaos
              </span>
            </motion.div>
          </div>

          <span
            className="hidden md:inline-block text-[10px] uppercase tracking-[0.3em] text-[#111]"
            style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif" }}
          >
            Ludhiana / full stack / neo‑brutal
          </span>
        </div>

        {/* BIG headline, awwwards style */}
        <motion.div
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center gap-1 md:gap-2 mb-6 md:mb-8 select-none"
        >
          {["CRAFTING", "THE", "FUTURE"].map((word, i) => (
            <motion.span
              key={word}
              custom={i}
              variants={wordVariant}
              className="uppercase leading-none text-[#111]"
              style={{
                fontFamily: "'Bebas Neue', system-ui, sans-serif",
                fontSize: "clamp(3.5rem, 12vw, 9rem)",
              }}
            >
              <span className="relative inline-block">
                {/* base stroke letters */}
                <span
                  className="text-transparent"
                  style={{ WebkitTextStroke: "3px #111111" }}
                >
                  {word}
                </span>
                {/* neon fill behind, slightly offset */}
                <motion.span
                  aria-hidden
                  className="absolute inset-0 text-[#ccff00]"
                  style={{ zIndex: -1, transform: "translate(4px, 4px)" }}
                  animate={{
                    y: [0, -2, 0],
                  }}
                  transition={{ repeat: Infinity, duration: 4, delay: i * 0.2 }}
                >
                  {word}
                </motion.span>
              </span>
            </motion.span>
          ))}
        </motion.div>

        {/* Tag strip under headline */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.4 }}
          className="inline-flex items-center gap-3 border-[2px] border-[#111] bg-white shadow-[4px_4px_0px_#111] rounded-[999px] px-4 py-2 mb-4"
        >
          <span
            className="text-[9px] md:text-xs font-semibold uppercase tracking-[0.28em] text-[#111]"
            style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif" }}
          >
            Full stack engineer
          </span>
          <span className="h-3 w-[1px] bg-[#111]" />
          <span
            className="text-[9px] md:text-xs font-semibold uppercase tracking-[0.28em] text-[#111]"
            style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif" }}
          >
            <Typewriter
              options={{
                strings: [
                  "turning chaos into shipped apps",
                  "breaking prod then fixing it cleaner",
                  "building loud, unapologetic systems",
                ],
                autoStart: true,
                loop: true,
                delay: 55,
                deleteSpeed: 40,
              }}
            />
          </span>
        </motion.div>

        {/* Subcopy */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.4 }}
          className="text-[11px] md:text-sm lg:text-base text-[#111] max-w-2xl text-center font-medium mb-6 md:mb-8"
          style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif" }}
        >
          Shipping loud, opinionated systems for the real world — from messy
          monoliths that print money to lean services that refuse to crash.
          No fake hustle. No boring SaaS. Just shipping.
        </motion.p>

        {/* Social buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.4 }}
          className="flex items-center gap-4 md:gap-6"
        >
          <a
            href="https://github.com/anurag262000"
            target="_blank"
            className="group border-[2px] border-[#111] bg-[#ccff00] text-[#111] shadow-[4px_4px_0px_#111] rounded-[10px] px-4 py-2 flex items-center gap-2 text-xs md:text-sm font-semibold uppercase tracking-[0.18em] transition-all hover:bg-[#111] hover:text-[#ccff00] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#111]"
            style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif" }}
          >
            <FiGithub className="text-base md:text-lg" />
            <span>Github</span>
          </a>

          <a
            href="https://www.linkedin.com/in/anuragmishra26"
            target="_blank"
            className="group border-[2px] border-[#111] bg-white text-[#111] shadow-[4px_4px_0px_#111] rounded-[10px] px-4 py-2 flex items-center gap-2 text-xs md:text-sm font-semibold uppercase tracking-[0.18em] transition-all hover:bg-[#111] hover:text-[#ccff00] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#111]"
            style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif" }}
          >
            <FiLinkedin className="text-base md:text-lg" />
            <span>LinkedIn</span>
          </a>

          <a
            href="mailto:anuragmishra262000@gmail.com"
            className="group border-[2px] border-[#111] bg-[#9B30E0] text-white shadow-[4px_4px_0px_#111] rounded-[999px] px-4 py-2 flex items-center gap-2 text-[11px] md:text-xs font-semibold uppercase tracking-[0.2em] transition-all hover:bg-[#111] hover:text-[#ccff00] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#111]"
            style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif" }}
          >
            <FiMail className="text-sm md:text-base" />
            <span>Drop a chaotic brief</span>
          </a>
        </motion.div>

        <span
          className="mt-4 text-[9px] md:text-[10px] uppercase tracking-[0.28em] text-[#111]"
          style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif" }}
        >
          open to rogue builds · no boring saas
        </span>
      </div>

      {/* Keep WeaponRack below as separate section */}
      <div className="mt-12 w-full">
        <WeaponRack />
      </div>
    </section>
  );
}