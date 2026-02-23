"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  FiArrowRight, 
  FiMapPin, 
  FiBookOpen, 
  FiCode, 
  FiZap, 
  FiTarget, 
  FiTerminal,
  FiCpu,
  FiGlobe,
  FiLayers,
  FiMonitor,
  FiFigma,
  FiSmartphone
} from "react-icons/fi";

// Register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const stats = [
  { value: 2, label: "Exp Years", suffix: "+" },
  { value: 15, label: "Projects", suffix: "+" },
  { value: 10, label: "Lead Roles", suffix: "+" },
  { value: 100, label: "Lines of Code", suffix: "K+" },
];

const experienceTimeline = [
  {
    role: "Team Leader",
    period: "2025 - Present",
    company: "Indiefluence.in",
    description: "Orchestrating complex software ecosystems. I lead multi-functional teams across Full Stack and React Native development. My role involves strategic coordination with UI/UX, Graphics, Video Editing, and Content teams to ensure high-fidelity product delivery.",
    skills: ["Full Stack", "React Native", "Cross-Team Leadership", "Product Lifecycle"]
  },
  {
    role: "Senior Backend Developer",
    period: "2024 - 2025",
    company: "Indiefluence.in",
    description: "Focused on high-performance backend architecture. Spearheaded the migration of legacy systems to modern, scalable microservices while maintaining 99.9% system uptime.",
    skills: ["Architecture", "Scalability", "Node.js", "System Design"]
  },
  {
    role: "Backend Developer Intern",
    period: "2023 - 2024",
    company: "Indiefluence.in",
    description: "Initiated professional career by building core backend modules. Gained deep insights into database optimization and server-side logic in a fast-paced environment.",
    skills: ["JavaScript", "Express", "Database Management", "Git"]
  }
];

const freelanceServices = [
  {
    title: "Full-Stack Web Systems",
    icon: <FiGlobe />,
    description: "Building production-ready, scalable web applications with robust backend architectures and high-performance frontends.",
    tech: ["Next.js", "Node.js", "PostgreSQL", "System Design"],
    color: "from-blue-500/20"
  },
  {
    title: "Mobile (React Native)",
    icon: <FiSmartphone />,
    description: "Developing cross-platform mobile experiences that feel native, with a focus on smooth performance and clean UI.",
    tech: ["React Native", "Expo", "Performance Tuning"],
    color: "from-purple-500/20"
  },
  {
    title: "Personal Branding (Portfolios)",
    icon: <FiMonitor />,
    description: "Crafting unique, cinematic portfolios for clients to showcase their skills with heavy animations and premium aesthetics.",
    tech: ["GSAP", "Framer Motion", "Storytelling"],
    color: "from-orange-500/20"
  },
  {
    title: "UI Design (Figma)",
    icon: <FiFigma />,
    description: "Designing end-to-end user interfaces in Figma, creating complete design systems and interactive prototypes based on client requirements.",
    tech: ["Figma", "Design Systems", "UX Research"],
    color: "from-green-500/20"
  }
];

const coreSkills = [
  { name: "Full-Stack Dev", icon: <FiCode /> },
  { name: "System Architecture", icon: <FiCpu /> },
  { name: "Software Engineering", icon: <FiTerminal /> },
  { name: "Technical Leadership", icon: <FiTarget /> },
  { name: "Cloud Integration", icon: <FiGlobe /> },
  { name: "Mobile Ecosystems", icon: <FiSmartphone /> },
];

export default function AboutPageContent() {
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const statsRef = useRef(null);
  const timelineRef = useRef(null);
  const freelanceRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Animation
      const heroTl = gsap.timeline();
      heroTl.from(".hero-title span", {
        y: 100,
        opacity: 0,
        rotateX: -45,
        stagger: 0.1,
        duration: 1.2,
        ease: "power4.out"
      })
      .from(".hero-subtitle", {
        opacity: 0,
        y: 20,
        duration: 0.8
      }, "-=0.6")
      .from(".hero-image-wrap", {
        scale: 1.1,
        opacity: 0,
        duration: 2,
        ease: "power2.out"
      }, 0);

      // Stats Animation + Counter
      gsap.from(".stat-item", {
        scrollTrigger: {
          trigger: statsRef.current,
          start: "top 85%",
        },
        y: 50,
        opacity: 0,
        stagger: 0.15,
        duration: 1,
        ease: "power3.out"
      });

      // Counter Animation
      const counters = document.querySelectorAll(".stat-number");
      counters.forEach(counter => {
        const targetValue = parseInt(counter.getAttribute("data-target"));
        const obj = { value: 0 };
        gsap.to(obj, {
          value: targetValue,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 85%",
          },
          onUpdate: () => {
            counter.innerText = Math.floor(obj.value);
          }
        });
      });

      // Timeline Animation
      gsap.from(".timeline-item", {
        scrollTrigger: {
          trigger: timelineRef.current,
          start: "top 75%",
        },
        x: -60,
        opacity: 0,
        stagger: 0.25,
        duration: 1.2,
        ease: "power2.out"
      });

      // Freelance Service Animation
      gsap.from(".service-card", {
        scrollTrigger: {
          trigger: freelanceRef.current,
          start: "top 80%",
        },
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power2.out"
      });

      // Parallax effect on backgrounds
      gsap.to(".parallax-bg", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true
        },
        y: 200,
        ease: "none"
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-black text-white selection:bg-blue-500/30">
      
      {/* 1. HERO SECTION */}
      <section ref={heroRef} className="relative min-h-[90vh] flex items-center pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(59,130,246,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-size-[40px_40px] pointer-events-none" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-12 xl:col-span-8">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm"
              >
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                <span className="text-[10px] uppercase tracking-[0.3em] font-orbitron text-white/60">Software Engineer_</span>
              </motion.div>
              
              <h1 className="hero-title text-5xl md:text-8xl lg:text-9xl font-black font-orbitron leading-none tracking-tighter mb-8">
                <span className="inline-block">ANURAG</span><br />
                <span className="inline-block stroke-text">MISHRA</span>
              </h1>
              
              <div className="hero-subtitle space-y-6 max-w-3xl">
                <p className="text-xl md:text-2xl text-white/80 font-light leading-relaxed">
                  A high-performance <span className="text-white font-medium italic underline decoration-blue-500 underline-offset-4">Software Engineer</span> who speaks fluent JavaScript and slightly broken "Team Leader-ese". I architect systems that work harder than I do after my third cup of coffee.
                </p>
                <p className="text-white/50 text-base md:text-lg font-light leading-relaxed">
                  Armed with a <span className="font-orbitron text-white/70 underline underline-offset-8">Bachelor of Computer Application</span> from the prestigious <span className="text-white/80 font-medium">Seth Jai Parkash Mukand Lal Institute of Engineering & Technology, Radaur</span> (Affiliated to <span className="text-blue-400 italic">Kurukshetra University</span>). I've evolved from a Backend Intern to a Team Leader, specializing in turning complex problems into elegant code and "it works on my machine" into "it works for everyone."
                </p>
                <div className="flex flex-wrap gap-6 pt-6">
                  <div className="flex items-center gap-2 text-white/40 text-xs font-orbitron tracking-widest uppercase">
                    <FiMapPin className="text-blue-500" /> Yamunanagar, Haryana
                  </div>
                  <div className="flex items-center gap-2 text-white/40 text-xs font-orbitron tracking-widest uppercase">
                    <FiBookOpen className="text-blue-500" /> JMIT Radaur Alumnus
                  </div>
                </div>
              </div>
            </div>

            <div className="hidden xl:block xl:col-span-4">
              <div className="hero-image-wrap relative aspect-[4/5] overflow-hidden border border-white/10 group">
                <div className="absolute inset-0 bg-blue-500/10 z-10 mix-blend-overlay group-hover:opacity-0 transition-opacity duration-700" />
                <Image 
                  src="/Headshot.png"
                  alt="Anurag Mishra"
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-8 left-8">
                   <p className="text-[10px] uppercase tracking-[0.5em] font-orbitron text-blue-500/80">V_Identity_2.6</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. STATS BAR */}
      <div ref={statsRef} className="border-y border-white/5 bg-white/[0.01] backdrop-blur-2xl">
        <div className="container mx-auto px-6 py-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
            {stats.map((stat, i) => (
              <div key={i} className="stat-item flex flex-col items-center text-center">
                <div className="flex items-baseline">
                   <span className="stat-number text-5xl md:text-7xl lg:text-8xl font-black font-orbitron bg-clip-text text-transparent bg-gradient-to-b from-white to-white/20" data-target={stat.value}>0</span>
                   <span className="text-2xl md:text-4xl font-bold font-orbitron text-blue-500 ml-1">{stat.suffix}</span>
                </div>
                <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/30 font-orbitron mt-4">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. PROFESSIONAL EVOLUTION */}
      <section ref={timelineRef} className="py-32 md:py-48 relative overflow-hidden">
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="mb-24 flex flex-col items-center text-center">
            <h2 className="text-4xl md:text-7xl font-black font-orbitron uppercase stroke-text italic mb-6">Career Timeline</h2>
            <div className="w-48 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
          </div>

          <div className="space-y-16 max-w-5xl mx-auto">
            {experienceTimeline.map((exp, i) => (
              <div key={i} className="timeline-item group relative pl-12 md:pl-24 py-10 border-l border-blue-500/20 hover:border-blue-500 transition-colors">
                <div className="absolute top-12 left-[-6px] w-3 h-3 bg-blue-500 rounded-full" />
                
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="md:col-span-1">
                    <span className="text-2xl font-orbitron text-blue-500 font-bold">{exp.period}</span>
                    <p className="text-[10px] uppercase tracking-widest text-white/20 font-bold mt-2">{exp.company}</p>
                  </div>
                  <div className="md:col-span-2 space-y-4">
                    <h3 className="text-3xl md:text-5xl font-black font-orbitron uppercase tracking-tighter leading-none">{exp.role}</h3>
                    <p className="text-white/50 text-base md:text-lg font-light leading-relaxed">
                      {exp.description}
                    </p>
                    <div className="flex flex-wrap gap-2 pt-4">
                      {exp.skills.map((skill, idx) => (
                        <span key={idx} className="px-3 py-1 bg-white/5 border border-white/5 text-[9px] uppercase tracking-widest font-orbitron text-white/30 group-hover:text-blue-400 group-hover:border-blue-500/30 transition-all duration-300">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FREELANCE & SERVICES - CINEMATIC UI */}
      <section ref={freelanceRef} className="py-32 md:py-48 bg-white/[0.01] border-y border-white/5 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.015] select-none pointer-events-none parallax-bg flex items-center justify-center">
           <span className="text-[25vw] font-black font-orbitron whitespace-nowrap text-white/50">MISSION_CORE</span>
        </div>

        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-32 gap-12">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-8xl font-black font-orbitron uppercase leading-none">Service_Stack</h2>
              <p className="text-blue-500 font-orbitron tracking-[0.5em] uppercase text-xs">High-Fidelity Project Execution</p>
            </div>
            <div className="text-right md:max-w-sm">
               <p className="text-white/30 text-xs md:text-sm font-light italic uppercase tracking-wider leading-relaxed">
                 Engineering elite digital products at the intersection of performance and cinematic visual identity.
               </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {freelanceServices.map((service, i) => (
              <div key={i} className="service-card group relative p-12 bg-black/90 backdrop-blur-3xl border border-white/10 hover:border-blue-500 transition-all duration-700 shadow-2xl">
                {/* Gradient Accent Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
                
                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-start justify-between mb-10">
                    <div className="text-5xl text-blue-500 group-hover:text-white group-hover:scale-110 transition-all duration-500">
                      {service.icon}
                    </div>
                    <div className="text-[10px] font-orbitron text-white/20 group-hover:text-white/50 uppercase tracking-[0.4em]">
                      Service_0{i + 1}
                    </div>
                  </div>
                  
                  <h3 className="text-3xl font-black font-orbitron mb-6 uppercase leading-tight tracking-tighter group-hover:text-blue-400 transition-colors">
                    {service.title}
                  </h3>
                  
                  <p className="text-white/60 text-base font-light mb-10 group-hover:text-white transition-colors leading-relaxed">
                    {service.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-3 mt-auto">
                    {service.tech.map((t, idx) => (
                      <span key={idx} className="text-[9px] uppercase font-bold tracking-[0.2em] text-white/40 group-hover:text-white transition-colors">
                        / {t}
                      </span>
                    ))}
                  </div>
                </div>
                {/* Decorative scanning line */}
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-blue-500/0 group-hover:bg-blue-500 transition-all duration-1000" />
              </div>
            ))}
          </div>

          <div className="mt-32 text-center">
            <Link 
              href="/projects" 
              className="inline-flex items-center gap-8 px-14 py-7 bg-white text-black font-black font-orbitron uppercase tracking-[0.3em] text-xs hover:bg-blue-600 hover:text-white transition-all group"
            >
              Analyze Field Operations <FiArrowRight className="group-hover:translate-x-4 transition-transform duration-500" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. ARSENAL (Skills) */}
      <section className="py-32 md:py-48">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <div className="mb-24 space-y-6">
            <h2 className="text-5xl md:text-9xl font-black font-orbitron uppercase italic stroke-text-thick leading-none">The Arsenal</h2>
            <p className="text-white/20 tracking-[0.8em] text-[10px] font-orbitron uppercase">Technical Hegemony Index</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {coreSkills.map((skill, i) => (
              <div 
                key={i}
                className="group relative p-12 border border-white/5 bg-white/[0.01] flex flex-col items-center gap-8 hover:bg-blue-500/10 hover:border-blue-500/30 transition-all duration-500 overflow-hidden"
              >
                <div className="text-5xl text-white/10 group-hover:text-blue-500 group-hover:rotate-12 group-hover:scale-125 transition-all duration-700">
                   {skill.icon}
                </div>
                <span className="text-[10px] font-orbitron uppercase tracking-[0.4em] font-bold text-white/20 group-hover:text-white transition-colors">
                  {skill.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION */}
      <section className="py-40 border-t border-white/5 bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.08),transparent_70%)] relative">
        <div className="container mx-auto px-6 text-center">
          <h3 className="text-4xl md:text-7xl font-black font-orbitron uppercase mb-20 leading-tight">
            Initiate <span className="stroke-text">Collaboration</span>
          </h3>
          <Link 
            href="/contact"
            className="group relative inline-flex items-center gap-6 text-2xl md:text-4xl font-light italic font-orbitron tracking-[0.3em] text-white/30 hover:text-blue-400 transition-all"
          >
            TRANSMIT REQUEST
            <div className="absolute -bottom-4 left-0 w-0 h-px bg-blue-500 group-hover:w-full transition-all duration-1000" />
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-16 border-t border-white/5 bg-black">
        <div className="container mx-auto px-6 text-center">
          <p className="text-[9px] font-orbitron text-white/10 uppercase tracking-[1em]">
            ANURAG MISHRA // ENGINEERED FOR THE FUTURE // 2026_EST.
          </p>
        </div>
      </footer>

    </div>
  );
}
