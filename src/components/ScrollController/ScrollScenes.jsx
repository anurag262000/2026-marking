'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';
import AboutTransition from './AboutTransition';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollController() {
  const lenisRef = useRef(null);

  useEffect(() => {
    // Initialize Lenis AFTER DOM ready
    lenisRef.current = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
    });

    lenisRef.current.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenisRef.current?.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value) {
        if (arguments.length) {
          lenisRef.current?.scrollTo(value, { immediate: true });
        }
        return lenisRef.current?.scroll;
      },
      getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
      },
      pinType: 'transform',
    });

    // HeroAboutBridge will auto-init here
    const bridge = new AboutTransition();

    return () => {
      lenisRef.current?.destroy();
      bridge?.destroy();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return null;
}
