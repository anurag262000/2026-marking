"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import TextReveal from "./TextReveal";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * ProjectDetail Component
 * Individual project section with scroll-triggered animations
 *
 * @param {Object} props
 * @param {Object} props.project - Project data object
 * @param {number} props.index - Project index for alternating layouts
 * @param {boolean} props.isLast - Whether this is the last project
 */
const ProjectDetail = ({ project, index, isLast = false }) => {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);

  const isEven = index % 2 === 0;
  const layoutClass = isEven ? "md:flex-row" : "md:flex-row-reverse";

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Image animation
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          {
            x: isEven ? -100 : 100,
            opacity: 0,
          },
          {
            x: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: imageRef.current,
              start: "top 75%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Content container fade in
      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current,
          {
            opacity: 0,
          },
          {
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: contentRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Tech stack stagger animation
      const techItems = sectionRef.current.querySelectorAll(".tech-item");
      if (techItems.length > 0) {
        gsap.fromTo(
          techItems,
          {
            opacity: 0,
            y: 10,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.05,
            ease: "power2.out",
            scrollTrigger: {
              trigger: techItems[0],
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [isEven]);

  return (
    <section
      ref={sectionRef}
      className={`relative min-h-screen flex items-center py-20 md:py-32 ${isLast ? "" : "border-b border-white/10"
        }`}
    >
      <div className="container mx-auto px-6 md:px-12">
        <div className={`flex flex-col ${layoutClass} gap-12 md:gap-16 items-center`}>

          {/* Image Section */}
          <div ref={imageRef} className="w-full md:w-1/2">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden group">
              <Image
                src={project.images?.[0] || project.thumbnail}
                alt={project.title}
                fill
                priority={index === 0}
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />

              {/* Project number badge */}
              <div className="absolute top-6 left-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2">
                <span className="text-white font-orbitron font-bold text-sm tracking-wider">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div ref={contentRef} className="w-full md:w-1/2 space-y-8">

            {/* Organization */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-0.5 bg-gradient-to-r from-orange-500 to-transparent"></div>
              <span className="text-orange-400 font-orbitron text-sm uppercase tracking-widest">
                {project.org}
              </span>
            </div>

            {/* Title with text reveal */}
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-helvetica font-thin italic leading-tight">
              <TextReveal mode="words" stagger={0.05} duration={0.8}>
                {project.title}
              </TextReveal>
            </h2>

            {/* Description with text reveal */}
            <div className="text-lg md:text-xl text-white/80 leading-relaxed space-y-4">
              <TextReveal mode="words" stagger={0.02} duration={0.6} trigger="top 85%">
                {project.fullDescription?.split("\n\n")[0] || project.approach}
              </TextReveal>
            </div>

            {/* Project metadata grid */}
            <div className="grid grid-cols-2 gap-6 pt-6 border-t border-white/10">
              {project.timeline && (
                <div>
                  <p className="text-xs text-white/50 uppercase tracking-widest mb-2 font-orbitron">Timeline</p>
                  <p className="text-lg font-medium">{project.timeline}</p>
                </div>
              )}
              {project.team && (
                <div>
                  <p className="text-xs text-white/50 uppercase tracking-widest mb-2 font-orbitron">Team</p>
                  <p className="text-lg font-medium">{project.team}</p>
                </div>
              )}
            </div>

            {/* Technologies */}
            {project.technologies && project.technologies.length > 0 && (
              <div className="space-y-4">
                <p className="text-xs text-white/50 uppercase tracking-widest font-orbitron">Technologies</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.slice(0, 8).map((tech, i) => (
                    <span
                      key={i}
                      className="tech-item px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-sm font-medium hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Outcomes */}
            {project.outcomes && (
              <div className="bg-gradient-to-br from-orange-500/10 to-transparent border border-orange-500/20 rounded-xl p-6 backdrop-blur-sm">
                <p className="text-xs text-orange-400 uppercase tracking-widest mb-3 font-orbitron">Key Outcomes</p>
                <p className="text-white/90 leading-relaxed">{project.outcomes}</p>
              </div>
            )}

          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectDetail;
