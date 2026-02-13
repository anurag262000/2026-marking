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
  const progressRef = useRef(0);

  useEffect(() => {
    let ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: componentRef.current,
        start: "top top",
        end: "6000",
        pin: pinRef.current,
        scrub: 1,
        onUpdate: (self) => {
          progressRef.current = self.progress;

          // Handle Theme Switch
          const shouldBeLight = self.progress > 0.05 && self.progress < 0.95;
          setLocalIsLight(shouldBeLight);
          if (setLightTheme) setLightTheme(shouldBeLight);
        },
        onLeave: () => {
          setLocalIsLight(false);
          if (setLightTheme) setLightTheme(false);
        },
        onLeaveBack: () => {
          setLocalIsLight(false);
          if (setLightTheme) setLightTheme(false);
        },
      });
    }, componentRef);

    return () => ctx.revert();
  }, [setLightTheme]);

  const activeProject = projects[activeIndex];

  return (
    <section ref={componentRef} className="relative z-20 bg-transparent" id="projects-3d">

      {/* --- DESKTOP VIEW (Pinned 3D) --- */}
      <div ref={pinRef} className="hidden md:flex relative w-full h-screen overflow-hidden flex-row">

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
          className={`
                relative z-10 w-[40%] h-full flex flex-col justify-center p-16 md:p-4 lg:p-6 xl:p-10 border-r transition-colors duration-500
                ${localIsLight ? "bg-white/80 border-black/10 text-black" : "bg-zinc-900/80 border-white/10 text-white"}
                backdrop-blur-xl
            `}
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
                <div className={`border-b pb-4 mb-6 flex justify-between items-center ${localIsLight ? "border-black/20" : "border-white/30"}`}>
                  <span className={`text-sm font-bold tracking-[0.25em] uppercase font-orbitron ${localIsLight ? "text-black/70" : "text-white/90"}`}>
                    {String(activeIndex + 1).padStart(2, '0')} / {CONFIG.slideCount < 10 ? `0${CONFIG.slideCount}` : CONFIG.slideCount}
                  </span>
                  <span className={`text-[10px] uppercase tracking-widest font-bold hidden md:block ${localIsLight ? "text-black/50" : "text-white/70"}`}>
                    Scroll to Explore
                  </span>
                </div>

                <h2 className={`text-5xl xl:text-7xl font-helvetica font-thin italic mb-6 leading-tight tracking-tight ${localIsLight ? "text-black drop-shadow-none" : "text-white drop-shadow-lg"}`}>
                  {activeProject.title}
                </h2>

                <p className={`text-lg font-light leading-relaxed mb-10 font-sans max-w-xl ${localIsLight ? "text-black/80" : "text-white/95 text-shadow-sm"}`}>
                  {activeProject.approach}
                </p>

                <div className={`grid grid-cols-[100px_1fr] gap-y-4 border-t pt-6 font-sans ${localIsLight ? "border-black/20" : "border-white/30"}`}>
                  <span className={`text-xs tracking-widest uppercase font-bold self-center ${localIsLight ? "text-black/60" : "text-white/70"}`}>Org</span>
                  <span className={`text-xl italic font-medium ${localIsLight ? "text-black" : "text-white"}`}>{activeProject.org}</span>

                  <span className={`text-xs tracking-widest uppercase font-bold self-center ${localIsLight ? "text-black/60" : "text-white/70"}`}>Role</span>
                  <span className={`text-xl italic font-medium ${localIsLight ? "text-black" : "text-white"}`}>Full-Stack</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Side Empty */}
        <div className="hidden md:block w-[60%] h-full pointer-events-none" />

      </div>


      {/* --- MOBILE VIEW (Horizontal Scroll Cards) --- */}
      <div className="md:hidden w-full h-auto py-12 flex flex-col gap-8 bg-zinc-900">
        <div className="px-6 mb-4">
          <h2 className="text-3xl font-orbitron text-white opacity-80 uppercase tracking-widest">Projects</h2>
          <p className="text-white/50 text-sm mt-2">Swipe to explore →</p>
        </div>

        {/* Snap Scroll Container */}
        <div className="w-full overflow-x-auto flex gap-6 px-6 pb-12 snap-x snap-mandatory hide-scrollbar">
          {projects.map((project, idx) => (
            <div key={project.id} className="min-w-[85vw] snap-center flex flex-col bg-white/5 border border-white/10 rounded-2xl overflow-hidden shadow-2xl">

              {/* Image Area (Top 50% approx) */}
              <div className="relative h-64 w-full bg-black/50">
                <Image
                  src={project.thumbnail}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white/50 text-xs font-bold tracking-widest uppercase font-orbitron">
                  {String(idx + 1).padStart(2, '0')}
                </div>
              </div>

              {/* Text Area (Bottom) */}
              <div className="p-6 flex flex-col justify-between flex-1 bg-black/20 backdrop-blur-md">
                <div>
                  <h3 className="text-2xl font-sans font-light italic text-white mb-3">
                    {project.title}
                  </h3>
                  <p className="text-sm text-white/70 font-light leading-relaxed mb-6">
                    {project.approach}
                  </p>
                </div>

                <div className="grid grid-cols-[60px_1fr] gap-y-2 text-sm border-t border-white/10 pt-4">
                  <span className="text-white/40 uppercase font-bold text-[10px] self-center">Org</span>
                  <span className="text-white italic">{project.org}</span>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
