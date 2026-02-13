"use client";
import React, { useId, useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { cn } from "@/lib/utils";
import { motion, useAnimation } from "framer-motion";

export const AuroraCore = ({
  id,
  className,
  background = "transparent",
  // Soft Pastel Palette: Baby Blue, Misty Pink, Mint Green, Soft Lilac
  colors = ["#00f2ff", "#7000ff", "#00ff95"],
  speed = 0.5,
  fullScreen = false,
  particleDensity = 6,
  particleColor = null, // Optional override for all particles
  blur = 80,
}) => {
  const [init, setInit] = useState(false);
  const controls = useAnimation();
  const generatedId = useId();

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setInit(true));
  }, []);

  const particlesLoaded = async (container) => {
    if (container) {
      controls.start({ opacity: 1, transition: { duration: 2 } });
    }
  };

  return (
    <motion.div
      animate={controls}
      className={cn("opacity-0 relative overflow-hidden", className)}
    >
      {/* Aurora Blur Overlay - Heavy blur for pastel softness */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ backdropFilter: `blur(${blur}px)` }}
      />

      {init && (
        <Particles
          id={id || generatedId}
          className="h-full w-full"
          particlesLoaded={particlesLoaded}
          options={{
            background: { color: { value: background } },
            fullScreen: { enable: fullScreen, zIndex: 0 },
            fpsLimit: 60,
            particles: {
              number: { value: particleDensity, density: { enable: false } },
              color: { value: particleColor ? particleColor : colors },
              shape: { type: "circle" },
              opacity: {
                value: 0.4, // Constant opacity to avoid flashing/pulsing
                animation: { enable: false }
              },
              size: {
                // Desktop Sizes - subtle movement, less "breathing"
                value: { min: 150, max: 250 },
                animation: { enable: true, speed: 0.5, sync: false }
              },
              move: {
                enable: true,
                speed: speed,
                direction: "none",
                random: true,
                outModes: { default: "out" },
              },
              shadow: {
                enable: true,
                blur: blur,
                color: { value: particleColor ? particleColor : colors[0] }
              }
            },
            // Responsive Overrides for Mobile
            responsive: [
              {
                maxWidth: 768,
                options: {
                  particles: {
                    size: {
                      // Smaller blobs for mobile screens
                      value: { min: 50, max: 150 }
                    },
                    number: {
                      // Slightly fewer particles to avoid clutter
                      value: Math.max(2, Math.floor(particleDensity / 2))
                    }
                  }
                }
              }
            ],
            detectRetina: true,
          }}
        />
      )}
    </motion.div>
  );
};
