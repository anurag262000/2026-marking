"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { FiBookOpen, FiCode, FiZap, FiTarget, FiCoffee } from "react-icons/fi";

const skills = [
  { icon: <FiCode />, label: "Full-Stack", color: "var(--neon-yellow)" },
  { icon: <FiZap />, label: "UI/UX", color: "var(--electric-purple)" },
  { icon: <FiTarget />, label: "Leadership", color: "var(--action-pink)" },
  { icon: <FiCoffee />, label: "Problem Solving", color: "var(--neon-yellow)" },
];

const stats = [
  { value: "02+", label: "Exp Years" },
  { value: "15+", label: "Projects" },
  { value: "10+", label: "Lead Roles" },
  { value: "100K+", label: "Lines/Code" },
];

export default function AboutCombined() {
  return (
    <section 
      className="relative w-full mt-[-100px] md:mt-0 py-0 md:py-24 overflow-hidden" 
      id="about"
      style={{ backgroundColor: 'var(--off-white)' }}
    >
      {/* Neo-Brutalist Dot Pattern Background */}
      <div className="absolute inset-0 bg-dot-brutalist pointer-events-none" />

      <div className="container mx-auto  px-4 md:px-6 relative z-10 py-16 md:py-0">
        <div className="grid lg:grid-cols-12 gap-8 md:gap-12 items-start">

          {/* LEFT COLUMN: The Visual Profile (4/12 width) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-24"
          >
            <div className="relative group">
              {/* Mobile Title */}
              <div className="block md:hidden mb-6">
                <span 
                  className="inline-block px-4 py-2 rounded-xl font-space font-black text-xs uppercase tracking-wider mb-3"
                  style={{ 
                    backgroundColor: 'var(--electric-purple)',
                    color: 'var(--pure-white)',
                    border: '3px solid var(--pitch-black)',
                    boxShadow: '4px 4px 0px var(--pitch-black)',
                    transform: 'rotate(-2deg)'
                  }}
                >
                  🎯 WHO I AM
                </span>
                <h3 
                  className="text-4xl md:text-6xl font-black font-bebas uppercase leading-none mt-3"
                  style={{ color: 'var(--pitch-black)' }}
                >
                  ANURAG MISHRA
                </h3>
                <div 
                  className="w-24 h-2 mt-3 rounded-full"
                  style={{ backgroundColor: 'var(--neon-yellow)' }}
                />
              </div>

              {/* Brutalist Image Frame */}
              <div 
                className="relative aspect-[4/5] overflow-hidden rounded-xl transition-all duration-300"
                style={{ 
                  border: '3px solid var(--pitch-black)',
                  boxShadow: '8px 8px 0px var(--pitch-black)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translate(3px, 3px)';
                  e.currentTarget.style.boxShadow = '5px 5px 0px var(--pitch-black)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translate(0, 0)';
                  e.currentTarget.style.boxShadow = '8px 8px 0px var(--pitch-black)';
                }}
              >
                <Image
                  src="/Headshot.png"
                  alt="Anurag Mishra"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  priority
                />
              </div>

              {/* Status Sticker */}
              <div 
                className="absolute -bottom-4 -right-4 flex items-center gap-2 px-5 py-3 rounded-xl font-space font-black text-xs uppercase tracking-wider"
                style={{ 
                  backgroundColor: 'var(--neon-yellow)',
                  color: 'var(--pitch-black)',
                  border: '3px solid var(--pitch-black)',
                  boxShadow: '6px 6px 0px var(--pitch-black)',
                  transform: 'rotate(4deg)'
                }}
              >
                <div 
                  className="w-3 h-3 rounded-full animate-pulse"
                  style={{ backgroundColor: 'var(--action-pink)' }}
                />
                <span>AVAILABLE 🔥</span>
              </div>
            </div>

            {/* Education Card */}
            <div className="mt-8">
              <div 
                className="flex items-start gap-4 p-4 rounded-xl transition-all"
                style={{ 
                  border: '2px solid var(--pitch-black)',
                  backgroundColor: 'var(--pure-white)',
                  boxShadow: '4px 4px 0px var(--pitch-black)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translate(2px, 2px)';
                  e.currentTarget.style.boxShadow = '2px 2px 0px var(--pitch-black)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translate(0, 0)';
                  e.currentTarget.style.boxShadow = '4px 4px 0px var(--pitch-black)';
                }}
              >
                <FiBookOpen 
                  className="mt-1 shrink-0" 
                  size={20}
                  style={{ color: 'var(--electric-purple)' }}
                />
                <div className="flex flex-col">
                  <span 
                    className="text-sm font-bold font-space leading-snug"
                    style={{ color: 'var(--pitch-black)' }}
                  >
                    Bachelor of Computer Applications
                  </span>
                  <span 
                    className="text-sm font-medium font-space leading-snug mt-1"
                    style={{ color: 'var(--pitch-black)', opacity: 0.7 }}
                  >
                    Seth Jai Prakash Mukand Lal Institute
                  </span>
                  <span 
                    className="text-xs font-space mt-1"
                    style={{ color: 'var(--pitch-black)', opacity: 0.5 }}
                  >
                    Kurukshetra, India
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: The Data & Bio (8/12 width) */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-12">

            {/* 1. Header & Bio */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
            >
              {/* Desktop Title */}
              <div className="hidden md:block mb-8">
                <span 
                  className="inline-block px-4 py-2 rounded-xl font-space font-black text-xs uppercase tracking-wider mb-4"
                  style={{ 
                    backgroundColor: 'var(--electric-purple)',
                    color: 'var(--pure-white)',
                    border: '3px solid var(--pitch-black)',
                    boxShadow: '4px 4px 0px var(--pitch-black)',
                    transform: 'rotate(-2deg)'
                  }}
                >
                  🎯 WHO I AM
                </span>
                <h3 
                  className="text-5xl md:text-7xl font-black font-bebas uppercase leading-none mt-4"
                  style={{ color: 'var(--pitch-black)' }}
                >
                  ANURAG MISHRA
                </h3>
                <div 
                  className="w-32 h-2 mt-4 rounded-full"
                  style={{ backgroundColor: 'var(--neon-yellow)' }}
                />
              </div>

              <div 
                className="space-y-5 md:space-y-6 text-base md:text-lg leading-relaxed max-w-3xl font-space font-medium"
                style={{ color: 'var(--pitch-black)' }}
              >
                <p>
                  Yo! I'm a{' '}
                  <span 
                    className="font-black px-2 py-1 rounded-md inline-block"
                    style={{ 
                      backgroundColor: 'var(--neon-yellow)',
                      color: 'var(--pitch-black)',
                      transform: 'rotate(-1deg)'
                    }}
                  >
                    Full-Stack Developer
                  </span>
                  {' '}who turns caffeine into code and ideas into reality. I build stuff that doesn't just work—it{' '}
                  <span 
                    className="font-black px-2 py-1 rounded-md inline-block"
                    style={{ 
                      backgroundColor: 'var(--electric-purple)',
                      color: 'var(--pure-white)',
                      transform: 'rotate(1deg)'
                    }}
                  >
                    SLAPS
                  </span>
                  .
                </p>
                <p>
                  From sleek frontends to bulletproof backends, I've got the full stack on lock. Whether it's React, Next.js, Node, or whatever's next—I'm here for it. Let's build something{' '}
                  <span 
                    className="font-black px-2 py-1 rounded-md inline-block"
                    style={{ 
                      backgroundColor: 'var(--action-pink)',
                      color: 'var(--pure-white)',
                      transform: 'rotate(-2deg)'
                    }}
                  >
                    LEGENDARY
                  </span>
                  .
                </p>
              </div>
            </motion.div>

            {/* 2. Skills Grid (Neo-Brutalist Cards) */}
            <div className="space-y-6">
              <span 
                className="inline-block px-4 py-2 rounded-xl font-space font-black text-xs uppercase tracking-wider"
                style={{ 
                  backgroundColor: 'var(--pitch-black)',
                  color: 'var(--neon-yellow)',
                  border: '3px solid var(--pitch-black)',
                  boxShadow: '4px 4px 0px var(--pitch-black)'
                }}
              >
                💪 MY SUPERPOWERS
              </span>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {skills.map((skill, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ y: -3 }}
                    className="p-4 rounded-xl flex flex-col items-center gap-3 text-center transition-all"
                    style={{ 
                      border: '2px solid var(--pitch-black)',
                      backgroundColor: 'var(--pure-white)',
                      boxShadow: '4px 4px 0px var(--pitch-black)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translate(2px, 2px)';
                      e.currentTarget.style.boxShadow = '2px 2px 0px var(--pitch-black)';
                      e.currentTarget.style.backgroundColor = skill.color;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translate(0, 0)';
                      e.currentTarget.style.boxShadow = '4px 4px 0px var(--pitch-black)';
                      e.currentTarget.style.backgroundColor = 'var(--pure-white)';
                    }}
                  >
                    <div 
                      className="text-2xl transition-colors"
                      style={{ color: skill.color }}
                    >
                      {skill.icon}
                    </div>
                    <span 
                      className="text-[11px] font-space font-bold tracking-wider uppercase"
                      style={{ color: 'var(--pitch-black)' }}
                    >
                      {skill.label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* 3. Stats Grid (Brutalist Dashboard) */}
            <div 
              className="pt-8 mt-8"
              style={{ borderTop: '4px solid var(--pitch-black)' }}
            >
              <span 
                className="inline-block px-4 py-2 rounded-xl font-space font-black text-xs uppercase tracking-wider mb-6"
                style={{ 
                  backgroundColor: 'var(--action-pink)',
                  color: 'var(--pure-white)',
                  border: '3px solid var(--pitch-black)',
                  boxShadow: '4px 4px 0px var(--pitch-black)',
                  transform: 'rotate(-2deg)'
                }}
              >
                📊 BY THE NUMBERS
              </span>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
                {stats.map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className="space-y-2"
                  >
                    <div 
                      className="text-5xl md:text-6xl font-black font-bebas"
                      style={{ 
                        color: 'var(--neon-yellow)',
                        WebkitTextStroke: '2px var(--pitch-black)'
                      }}
                    >
                      {stat.value}
                    </div>
                    <div 
                      className="text-xs tracking-wider uppercase font-black font-space"
                      style={{ color: 'var(--pitch-black)', opacity: 0.7 }}
                    >
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
