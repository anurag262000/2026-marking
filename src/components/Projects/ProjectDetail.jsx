"use client";
import React, { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import TextReveal from "./TextReveal";

const ProjectDetail = ({ project, index, isLast = false, isLightTheme = false }) => {
  const sectionRef = useRef(null);
  const isEven = index % 2 === 0;

  // Define theme-aware classes
  const textPrimary = isLightTheme ? 'text-slate-900' : 'text-slate-50';
  const textSecondary = isLightTheme ? 'text-slate-700' : 'text-slate-300';
  const textMuted = isLightTheme ? 'text-slate-600' : 'text-slate-400';
  const borderColor = isLightTheme ? 'border-slate-200' : 'border-white/10';
  const bgCard = isLightTheme ? 'bg-black/5' : 'bg-white/5';
  const bgBorder = isLightTheme ? 'border-slate-300/50' : 'border-white/20';
  const btnBg = isLightTheme ? 'bg-slate-900 hover:bg-slate-800 border-slate-900' : 'bg-white/10 hover:bg-white/20 border-white/20';
  const btnBorder = isLightTheme ? 'hover:border-slate-700' : 'hover:border-white/40';

  return (
    <section
      ref={sectionRef}
      className={`relative min-h-screen flex items-center py-20 transition-colors duration-700 ${isLast ? "" : `border-b ${borderColor}`}`}
    >
      <div className="container mx-auto px-6 md:px-12">
        <div className={`flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"} gap-16 items-center`}>

          <div className="w-full md:w-1/2">
            <div className={`relative aspect-[4/3] rounded-2xl overflow-hidden border ${bgBorder} shadow-2xl group backdrop-blur-md ${bgCard}`}>
              <Image src={project.thumbnail} alt={project.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className={`absolute top-6 left-6 ${bgCard} backdrop-blur-xl border ${bgBorder} rounded-full px-4 py-2`}>
                <span className={`${textPrimary} font-orbitron font-bold text-xs`}>{project.category}</span>
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/2 space-y-8">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-0.5 ${isLightTheme ? 'bg-slate-600' : 'bg-white/40'}`}></div>
              <span className={`${textMuted} font-orbitron text-xs uppercase tracking-widest`}>{project.org}</span>
            </div>

            <h2 className={`text-4xl md:text-6xl font-helvetica italic font-thin ${textPrimary}`}>
              <TextReveal>{project.title}</TextReveal>
            </h2>

            <p className={`text-lg ${textSecondary} font-light leading-relaxed`}>{project.fullDescription}</p>

            <div className={`grid grid-cols-2 gap-6 pt-6 border-t ${borderColor}`}>
              <div>
                <p className={`text-[10px] ${textMuted} opacity-60 uppercase tracking-widest font-orbitron`}>Highlight</p>
                <p className={`text-lg ${textPrimary} italic mt-1`}>{project.keyHighlight}</p>
              </div>
              <div>
                <p className={`text-[10px] ${textMuted} opacity-60 uppercase tracking-widest font-orbitron`}>Timeline</p>
                <p className={`text-lg ${textPrimary} mt-1`}>{project.timeline}</p>
              </div>
            </div>

            <div className="pt-6">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-block px-8 py-4 ${btnBg} ${isLightTheme ? 'text-white' : 'text-white'} border ${btnBorder} font-orbitron text-xs uppercase tracking-[0.2em] rounded-lg transition-all transform hover:scale-105 backdrop-blur-md`}
              >
                Launch Live Site ↗
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectDetail;
