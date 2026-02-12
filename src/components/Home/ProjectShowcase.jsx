import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import projects from './projects.json';

const ProjectShowcase = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Duplicate projects to create seamless loop for marquee
  const marqueeProjects = [...projects, ...projects, ...projects];

  const activeProject = projects[activeIndex];

  return (
    <section className="relative h-screen w-full bg-transparent text-white flex flex-col overflow-hidden font-sans">

      {/* BACKGROUND DECORATION */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-10 left-10 w-96 h-96 bg-blue-600 rounded-full blur-[120px]" />
      </div>

      {/* TOP SECTION (65%): Information Display */}
      <div className="flex-[2] flex flex-col justify-center px-6 md:px-24 z-10 pointer-events-none"> {/* Added pointer-events-none to prevent interaction blocking */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeProject.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "circOut" }}
            className="pointer-events-auto" // Re-enable pointer events for text selection if needed
          >
            <div className="flex items-center gap-3 mb-4">
              <span className={`px-3 py-1 text-[10px] md:text-xs font-bold tracking-widest uppercase rounded-sm font-orbitron ${
                activeProject.org === 'Indiefluence' ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30' : 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/30'
              }`}>
                {activeProject.org}
              </span>
              <div className="h-[1px] w-12 bg-white/20" />
              <span className="text-white/40 text-xs font-orbitron tracking-widest">Project {String(activeIndex + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}</span>
            </div>

            <h2 className="text-4xl md:text-7xl font-black mb-6 tracking-tighter font-orbitron uppercase text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/50">
              {activeProject.title}
            </h2>

            <p className="text-blue-200/80 text-lg md:text-2xl max-w-3xl leading-relaxed font-light font-sans border-l-2 border-blue-500/50 pl-6">
              {activeProject.approach}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* CENTER POP-UP: Video Reveal on Hover */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateX: 20 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[80%] max-w-[700px] aspect-video bg-black rounded-sm border border-white/20 shadow-[0_0_80px_rgba(59,130,246,0.3)] overflow-hidden pointer-events-none"
          >
            <video
              src={activeProject.video}
              autoPlay
              loop
              muted
              className="w-full h-full object-cover opacity-80"
            />
            {/* Scanline overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[size:100%_4px] pointer-events-none" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* BOTTOM SECTION (35%): Infinite Marquee */}
      <div className="flex-[1] border-t border-white/10 bg-black/40 backdrop-blur-sm flex items-center relative overflow-hidden group">
        <div
          className="flex gap-6 px-10 animate-scroll hover:[animation-play-state:paused]"
          style={{ width: "max-content" }}
        >
          {marqueeProjects.map((project, index) => (
            <div
              key={`${project.id}-${index}`}
              onMouseEnter={() => {
                setActiveIndex(index % projects.length); // Use modulo to map back to original index
                setIsHovered(true);
              }}
              onMouseLeave={() => {
                setIsHovered(false);
              }}
              className={`w-[280px] h-[150px] flex-shrink-0 rounded-sm overflow-hidden cursor-pointer transition-all duration-300 border border-white/10 relative group/card
                ${(index % projects.length) === activeIndex ? "border-blue-500/80 opacity-100" : "opacity-40 grayscale hover:opacity-100 hover:grayscale-0 hover:border-white/30"}
              `}
            >
              <img
                src={project.thumbnail}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 flex items-end p-4">
                 <span className="text-white font-orbitron text-xs font-bold tracking-wider uppercase">{project.title}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectShowcase;
