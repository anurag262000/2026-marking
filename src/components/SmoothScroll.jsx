"use client";

import { ReactLenis } from "@studio-freight/react-lenis";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";

export default function SmoothScroll({ children }) {
  const lenisRef = useRef();
  const pathname = usePathname();

  useEffect(() => {
    // Sync Lenis scroll with GSAP's ScrollTrigger
    function update(time) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }

    gsap.ticker.add(update);

    return () => {
      gsap.ticker.remove(update);
    };
  }, []);

  useEffect(() => {
    // Reset scroll position on route change
    if (lenisRef.current?.lenis) {
        // Immediate scroll to top
        lenisRef.current.lenis.scrollTo(0, { immediate: true });

        // Refresh ScrollTrigger after a slight delay to ensure DOM is ready and layout is stable
        setTimeout(() => {
            ScrollTrigger.refresh();
        }, 100);
    }
  }, [pathname]);

  return (
    <ReactLenis
      root
      ref={lenisRef}
      autoRaf={false} // We handle raf manually for GSAP sync
      options={{
        lerp: 0.1,
        duration: 1.2,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
      }}
    >
      {children}
    </ReactLenis>
  );
}
