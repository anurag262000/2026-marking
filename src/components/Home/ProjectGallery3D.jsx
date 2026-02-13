"use client";

import React, { useRef, useState, useEffect, useMemo, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import projects from "./projects.json";
import Image from "next/image";
import Link from "next/link";

// Register GSAP ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// --- Configuration ---
const CONFIG = {
  slideCount: projects.length,
  spacingX: 23,
  pWidth: 14,
  pHeight: 18,
  camZ: 30,
  wallAngleY: -0.25,
  lerpSpeed: 0.08,
  indexOffset: 15,
};

// Total width to scroll (Finite)
const totalScrollWidth =
  (CONFIG.slideCount - 1) * CONFIG.spacingX +
  CONFIG.pWidth * 1.5;

// --- Individual Project Item (Handles Texture Loading Safely) ---
const ProjectItem = ({ project, index }) => {
  const [texture, setTexture] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.crossOrigin = "Anonymous";

    loader.load(
      project.thumbnail,
      (loadedTexture) => {
        loadedTexture.colorSpace = THREE.SRGBColorSpace;
        setTexture(loadedTexture);
      },
      undefined,
      () => {
        console.warn(`Failed to load texture: ${project.thumbnail}`);
        setError(true);
      }
    );

    return () => {
      if (texture) texture.dispose();
    };
  }, [project.thumbnail]);

  return (
    <group position={[index * CONFIG.spacingX, 0, 0]}>
      <mesh>
        <planeGeometry args={[CONFIG.pWidth, CONFIG.pHeight]} />
        <meshBasicMaterial
          map={texture || null}
          color={texture ? "white" : "#333"}
          transparent={!texture}
          opacity={texture ? 1 : 0.5}
        />
      </mesh>
      <lineSegments>
        <edgesGeometry args={[new THREE.PlaneGeometry(CONFIG.pWidth, CONFIG.pHeight)]} />
        <lineBasicMaterial color="#444" linewidth={2} />
      </lineSegments>
      <lineSegments position={[0, 0, -0.5]}>
        <bufferGeometry>
          <float32BufferAttribute
            attach="attributes-position"
            count={4}
            array={new Float32Array([
              -CONFIG.pWidth / 2, 10, -1,
              -CONFIG.pWidth / 2, CONFIG.pHeight / 2, -1,
              CONFIG.pWidth / 2, 10, -1,
              CONFIG.pWidth / 2, CONFIG.pHeight / 2, -1
            ])}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#666" />
      </lineSegments>
      <mesh position={[0.5, -0.5, -0.2]}>
        <planeGeometry args={[CONFIG.pWidth, CONFIG.pHeight]} />
        <meshBasicMaterial color="black" transparent opacity={0.3} />
      </mesh>
    </group>
  );
};

// --- 3D Scene Component ---
const Scene = ({ activeIndex, setActiveIndex, progressRef }) => {
  const { camera } = useThree();
  const galleryGroup = useRef();
  const currentScroll = useRef(0);

  useFrame(() => {
    // Reach the last project at 70% scroll to allow a 30% "hold" buffer at the end
    const adjustedProgress = progressRef.current;
    const targetScroll = adjustedProgress * totalScrollWidth;
    currentScroll.current += (targetScroll - currentScroll.current) * CONFIG.lerpSpeed;

    const rawIndex = Math.floor(
      (currentScroll.current - CONFIG.indexOffset + CONFIG.spacingX / 2) / CONFIG.spacingX
    );
    const safeIndex = Math.max(0, Math.min(CONFIG.slideCount - 1, rawIndex));

    if (safeIndex !== activeIndex) {
      setActiveIndex(safeIndex);
    }

    const xMove = currentScroll.current * Math.cos(CONFIG.wallAngleY);
    const zMove = currentScroll.current * Math.sin(CONFIG.wallAngleY);

    camera.position.x = xMove;
    camera.position.z = CONFIG.camZ - zMove;

    // ✅ Calculate dynamic focus based on actual slide center
    const focusX =
      safeIndex * CONFIG.spacingX * Math.cos(CONFIG.wallAngleY);

    const focusZ =
      safeIndex * CONFIG.spacingX * Math.sin(CONFIG.wallAngleY);

    camera.lookAt(focusX + 15, 0, -focusZ - 20);
    camera.rotation.y = CONFIG.wallAngleY * -1.5;

    if (galleryGroup.current) {
      galleryGroup.current.rotation.y = CONFIG.wallAngleY;
      galleryGroup.current.position.x = 15;
    }
  });

  return (
    <group ref={galleryGroup}>
      {projects.map((project, i) => (
        <ProjectItem key={project.id} project={project} index={i} />
      ))}
    </group>
  );
};

// --- Main Component ---
export default function ProjectGallery3D({ setLightTheme }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [localIsLight, setLocalIsLight] = useState(false);

  const componentRef = useRef(null);
  const pinRef = useRef(null);
  const mobileCardsRef = useRef(null);
  const mobileContainerRef = useRef(null);
  const progressRef = useRef(0);
  const desktopSidebarRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // 1. Base ScrollTrigger for Pinning
      const mainST = ScrollTrigger.create({
        trigger: componentRef.current,
        start: "top top",
        end: "6000",
        pin: pinRef.current,
        scrub: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          progressRef.current = self.progress;

          // --- DIRECT DOM THEME TOGGLE (Extreme Performance) ---
          const shouldBeLight = self.progress > 0.02 && self.progress < 0.98;

          const toggleLightMode = (isLight) => {
            if (mobileContainerRef.current) {
              if (isLight) mobileContainerRef.current.classList.add("is-light-mode");
              else mobileContainerRef.current.classList.remove("is-light-mode");
            }
            if (desktopSidebarRef.current) {
              if (isLight) desktopSidebarRef.current.classList.add("is-light-mode");
              else desktopSidebarRef.current.classList.remove("is-light-mode");
            }
            if (setLightTheme) setLightTheme(isLight);
          };

          toggleLightMode(shouldBeLight);
          // -----------------------------------------------------
        },
        onLeave: () => {
          if (mobileContainerRef.current) mobileContainerRef.current.classList.remove("is-light-mode");
          if (desktopSidebarRef.current) desktopSidebarRef.current.classList.remove("is-light-mode");
          if (setLightTheme) setLightTheme(false);
        },
        onLeaveBack: () => {
          if (mobileContainerRef.current) mobileContainerRef.current.classList.remove("is-light-mode");
          if (desktopSidebarRef.current) desktopSidebarRef.current.classList.remove("is-light-mode");
          if (setLightTheme) setLightTheme(false);
        },
      });

      // 2. Mobile Movement Timeline (Hardware Accelerated)
      if (mobileCardsRef.current && window.innerWidth < 768) {
        const container = mobileCardsRef.current;
        const scrollWidth = container.scrollWidth - window.innerWidth;

        gsap.to(container, {
          x: -scrollWidth,
          ease: "none",
          force3D: true,
          scrollTrigger: {
            trigger: componentRef.current,
            start: "top top",
            end: "6000",
            scrub: 0.05, // Smoother response
            invalidateOnRefresh: true,
          }
        });

      }
    }, componentRef);

    return () => ctx.revert();
  }, [setLightTheme]);

  const activeProject = projects[activeIndex];

  return (
    <section ref={componentRef} className="relative z-20 bg-transparent" id="projects-3d">

      {/* --- SHARED PINNED CONTAINER --- */}
      <div ref={pinRef} className="relative w-full h-screen overflow-hidden">

        {/* --- DESKTOP VIEW (3D) --- */}
        <div className="hidden md:flex relative w-full h-full flex-row">

          {/* 3D Canvas Layer */}
          <div className="absolute inset-0 z-0 bg-transparent">
            <Canvas
              camera={{ position: [0, 0, CONFIG.camZ], fov: 45 }}
              gl={{ antialias: true, alpha: true }}
              onCreated={({ gl }) => {
                gl.setClearColor(new THREE.Color(0x000000), 0);
              }}
            >
              <ambientLight intensity={1.2} />
              <directionalLight position={[10, 20, 10]} intensity={1} />
              <fog attach="fog" args={['#f7f7f5', 10, 80]} />
              <Suspense fallback={null}>
                <Scene activeIndex={activeIndex} setActiveIndex={setActiveIndex} progressRef={progressRef} />
              </Suspense>
            </Canvas>
          </div>

          {/* Left Text Panel - Desktop (40% width) */}
          <div
            ref={desktopSidebarRef}
            className="relative z-10 w-[40%] h-full flex flex-col justify-center p-16 md:p-4 lg:p-6 xl:p-10 border-r transition-colors duration-500 backdrop-blur-xl desktop-sidebar sidebar-border"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProject.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="pointer-events-auto w-full"
              >
                <div className="relative z-10">
                  <div className="border-b pb-4 mb-6 flex justify-between items-center sidebar-border-inner">
                    <span className="text-sm font-bold tracking-[0.25em] uppercase font-orbitron sidebar-counter">
                      {String(activeIndex + 1).padStart(2, '0')} / {CONFIG.slideCount < 10 ? `0${CONFIG.slideCount}` : CONFIG.slideCount}
                    </span>
                    <span className="text-[10px] uppercase tracking-widest font-bold hidden md:block sidebar-helper">
                      Scroll to Explore
                    </span>
                  </div>

                  <h2 className="text-5xl xl:text-7xl font-helvetica font-thin italic mb-6 leading-tight tracking-tight sidebar-title">
                    {activeProject.title}
                  </h2>

                  <p className="text-lg font-light leading-relaxed mb-10 font-sans max-w-xl sidebar-desc">
                    {activeProject.approach}
                  </p>

                  <div className="grid grid-cols-[100px_1fr] gap-y-4 border-t pt-6 font-sans sidebar-border-inner">
                    <span className="text-xs tracking-widest uppercase font-bold self-center sidebar-label">Org</span>
                    <span className="text-xl italic font-medium sidebar-value">{activeProject.org}</span>

                    <span className="text-xs tracking-widest uppercase font-bold self-center sidebar-label">Role</span>
                    <span className="text-xl italic font-medium sidebar-value">Full-Stack</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Side Empty */}
          <div className="hidden md:block w-[60%] h-full pointer-events-none" />

        </div>


        {/* --- MOBILE VIEW (Vertical-to-Horizontal Scroll) --- */}
        <div
          ref={mobileContainerRef}
          className="md:hidden w-full h-full relative overflow-hidden transition-colors duration-500 mobile-gallery-container"
          style={{
            '--bg-color': localIsLight ? 'rgba(255,255,255,0.9)' : '#18181b', // Initial values
            '--text-primary': localIsLight ? '#000000' : '#ffffff',
            '--text-secondary': localIsLight ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.5)',
            '--card-bg': localIsLight ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.05)',
            '--card-border': localIsLight ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)',
          }}
        >
          {/* Internal Styles for Extreme Performance Theme Toggling */}
          <style jsx>{`
            .desktop-sidebar {
              background-color: var(--sidebar-bg);
              border-color: var(--sidebar-border);
              color: var(--sidebar-text);
            }
            .sidebar-border { border-color: var(--sidebar-border); }
            .sidebar-border-inner { border-color: var(--sidebar-border-inner); }
            .sidebar-title { color: var(--sidebar-text); }
            .sidebar-desc { color: var(--sidebar-text-muted); }
            .sidebar-counter { color: var(--sidebar-text-muted); }
            .sidebar-helper { color: var(--sidebar-text-muted); }
            .sidebar-label { color: var(--sidebar-text-muted); }
            .sidebar-value { color: var(--sidebar-text); }

            .desktop-sidebar:not(.is-light-mode) {
              --sidebar-bg: rgba(24, 24, 27, 0.8);
              --sidebar-border: rgba(255, 255, 255, 0.1);
              --sidebar-border-inner: rgba(255, 255, 255, 0.3);
              --sidebar-text: #ffffff;
              --sidebar-text-muted: rgba(255, 255, 255, 0.9);
            }

            .desktop-sidebar.is-light-mode {
              --sidebar-bg: #ffffff;
              --sidebar-border: rgba(0, 0, 0, 0.1);
              --sidebar-border-inner: rgba(0, 0, 0, 0.2);
              --sidebar-text: #000000;
              --sidebar-text-muted: rgba(0, 0, 0, 0.7);
            }

            .mobile-gallery-container {
              background-color: var(--bg-color);
            }
            .mobile-gallery-container.is-light-mode {
              --bg-color: #f7f7f5 !important;
              --text-primary: #000000 !important;
              --text-secondary: rgba(0,0,0,0.5) !important;
              --card-bg: rgba(0,0,0,0.05) !important;
              --card-border: rgba(0,0,0,0.1) !important;
            }
            .mobile-gallery-container:not(.is-light-mode) {
              --bg-color: #18181b !important;
              --text-primary: #ffffff !important;
              --text-secondary: rgba(255,255,255,0.5) !important;
              --card-bg: rgba(255,255,255,0.05) !important;
              --card-border: rgba(255,255,255,0.1) !important;
            }
            .mobile-text-primary { color: var(--text-primary); transition: color 0.5s ease; }
            .mobile-text-secondary { color: var(--text-secondary); transition: color 0.5s ease; }
            .mobile-card {
              background-color: var(--card-bg);
              border-color: var(--card-border);
              transition: transform 0.4s cubic-bezier(0.2, 0, 0.2, 1), background-color 0.5s ease;
              will-change: transform;
            }
            .mobile-card:active {
              transform: scale(0.98);
            }
          `}</style>

          {/* Animating Cards Container */}
          <div className="absolute inset-0 flex items-center overflow-hidden">
            <div
              ref={mobileCardsRef}
              className="flex gap-4 px-6 will-change-transform"
              style={{
                backfaceVisibility: "hidden",
                perspective: 1000
              }}
            >
              {projects.map((project, idx) => (
                <div key={project.id} className="min-w-[85vw] h-[85vh] flex flex-col border rounded-3xl overflow-hidden shadow-2xl mobile-card">

                  {/* Image Area */}
                  <div className="relative flex-[1.4] w-full bg-zinc-900">
                    <Image
                      src={project.thumbnail}
                      alt={project.title}
                      fill
                      className="object-cover"
                      priority={idx < 2}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                    <div className="absolute bottom-6 left-6 text-white/40 text-[10px] font-bold tracking-[0.3em] uppercase font-orbitron">
                      {String(idx + 1).padStart(2, '0')}
                    </div>
                  </div>

                  {/* Text Area */}
                  <div className="p-8 flex flex-col  relative z-10">
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-helvetica font-light italic mb-3 leading-tight mobile-text-primary tracking-tight">
                        {project.title}
                      </h3>
                      <p className="text-sm font-light leading-relaxed mb-6 mobile-text-secondary line-clamp-3">
                        {project.approach}
                      </p>
                    </div>

                    <div className="grid grid-cols-[60px_1fr] gap-y-2 text-sm border-t pt-4 border-current opacity-30 mobile-text-primary">
                      <span className="uppercase font-bold text-[9px] tracking-widest self-center opacity-60 font-orbitron">Org</span>
                      <span className="italic font-medium">{project.org}</span>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

    </section>
  );
}
