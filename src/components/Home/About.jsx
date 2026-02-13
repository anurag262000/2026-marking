"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { FiMapPin, FiBookOpen, FiCode, FiZap, FiTarget, FiCoffee } from "react-icons/fi";

const skills = [
  { icon: <FiCode />, label: "Full-Stack Dev" },
  { icon: <FiZap />, label: "UI/UX Design" },
  { icon: <FiTarget />, label: "Leadership" },
  { icon: <FiCoffee />, label: "Problem Solving" },
];

const stats = [
  { value: "02+", label: "Exp Years" },
  { value: "15+", label: "Projects" },
  { value: "10+", label: "Lead Roles" },
  { value: "100K+", label: "Lines/Code" },
];

export default function AboutCombined() {
  return (
    <section className="relative w-full mt-[-100px] md:mt-0 py-0 md:py-24 bg-transparent overflow-hidden" id="about">
      {/* Background: Subtle tech grid to match Hero */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-size-[40px_40px] pointer-events-none" />

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
              <h2 className="text-blue-400 block md:hidden font-orbitron tracking-[0.4em] text-xs font-bold mb-4 uppercase drop-shadow-[0_0_10px_rgba(96,165,250,0.3)]">
                // ROOT_IDENTITY
              </h2>
              <h3 className="text-4xl block md:hidden md:text-6xl font-black text-white font-orbitron uppercase leading-none mb-8 tracking-tighter">
                ANURAG <span className="stroke-text">MISHRA</span>
              </h3>
              {/* Corner Accents */}
              <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-blue-500/50" />
              <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-blue-500/50" />

              <div className="relative aspect-[4/5] overflow-hidden border border-white/10 bg-black/40 backdrop-blur-sm grayscale hover:grayscale-0 transition-all duration-700 rounded-sm">
                <Image
                  src="/Headshot.png"
                  alt="Anurag Mishra"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  priority
                />
                {/* Scanline overlay */}
                <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%)] bg-[size:100%_4px]" />
              </div>

              {/* Status Indicator */}
              <div className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-1 bg-black/60 backdrop-blur-md border border-white/10 rounded-full">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                <span className="text-[10px] text-white/90 font-orbitron tracking-widest uppercase">System.Active</span>
              </div>
            </div>

            {/* Quick Specs (Location/Education) */}
            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-4 text-white/70 font-light text-sm p-3 border border-white/5 bg-white/[0.02] rounded-lg hover:border-blue-500/30 transition-colors">
                <FiMapPin className="text-blue-400" /> <span>Kurukshetra, India</span>
              </div>
              <div className="flex items-center gap-4 text-white/70 font-light text-sm p-3 border border-white/5 bg-white/[0.02] rounded-lg hover:border-blue-500/30 transition-colors">
                <FiBookOpen className="text-blue-400" /> <span>BCA - JMIT</span>
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
              <h2 className="text-blue-400 hidden md:block font-orbitron tracking-[0.4em] text-xs font-bold mb-4 uppercase drop-shadow-[0_0_10px_rgba(96,165,250,0.3)]">
                // ROOT_IDENTITY
              </h2>
              <h3 className="text-4xl hidden md:block md:text-6xl font-black text-white font-orbitron uppercase leading-none mb-8 tracking-tighter">
                ANURAG <span className="stroke-text">MISHRA</span>
              </h3>

              <div className="space-y-4 md:space-y-6 text-white/80 text-base md:text-lg leading-relaxed max-w-3xl font-light font-sans">
                <p>
                  Full-Stack Architect & Technical Lead engineering high-performance systems with a focus on <span className="text-blue-400 font-medium italic">visual excellence</span>. I specialize in transforming complex business challenges into elegant, user-centric solutions.
                </p>
                <p>
                  With expertise spanning from modern frontend frameworks to scalable backend architectures, I blend technical precision with creative innovation to build the next generation of digital experiences.
                </p>
              </div>
            </motion.div>

            {/* 2. Skills Grid (Minimalist Industrial) */}
            <div className="space-y-6">
              <h4 className="text-white/40 font-orbitron text-[10px] tracking-[0.3em] uppercase">Core_Strengths</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {skills.map((skill, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ y: -5, backgroundColor: "rgba(255, 255, 255, 0.05)" }}
                    className="p-4 border border-white/10 bg-white/[0.02] backdrop-blur-sm flex flex-col items-center gap-3 text-center group hover:border-blue-500/50 transition-all rounded-sm"
                  >
                    <div className="text-blue-400 text-2xl group-hover:scale-110 group-hover:drop-shadow-[0_0_15px_rgba(96,165,250,0.5)] transition-all">{skill.icon}</div>
                    <span className="text-[11px] text-white/80 font-orbitron tracking-wider uppercase">{skill.label}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* 3. Stats Grid (Dashboard Look) */}
            <div className="pt-12 border-t border-white/10">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {stats.map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className="space-y-2"
                  >
                    <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 font-orbitron">{stat.value}</div>
                    <div className="text-[10px] tracking-[0.2em] text-blue-400/80 uppercase font-bold font-orbitron">{stat.label}</div>
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
