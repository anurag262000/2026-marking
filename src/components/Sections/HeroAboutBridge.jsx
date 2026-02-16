// components/ScrollScenes/HeroAboutBridge.jsx
'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HeroAboutBridge() {
  useEffect(() => {
    const hero = document.querySelector('.hero-section');
    const about = document.querySelector('.about-section');
    const glass = document.querySelector('.hero-image-placeholder');
    const devTextLetters = document.querySelectorAll('.variable-letter');

    if (!hero || !about) return;

    // Start with About sitting under hero
    gsap.set(about, { yPercent: 20, opacity: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: hero,
        start: 'top top',
        end: '+=120%',          // how long the transition lasts
        scrub: true,
        pin: true,              // pin hero while we transition to about
        anticipatePin: 1,
      },
    });

    // 1) Fade/scale DEVELOPER out slightly
    tl.to(devTextLetters, {
      opacity: 0.1,
      yPercent: -10,
      stagger: 0.03,
      ease: 'power2.out',
    }, 0);

    // 2) Push glass card down and morph into About card position
    tl.to(glass, {
      yPercent: 40,
      scale: 1.05,
      borderRadius: 28,
      ease: 'power2.inOut',
    }, 0);

    // 3) Bring About section up over hero
    tl.to(about, {
      yPercent: 0,
      opacity: 1,
      ease: 'power2.out',
    }, 0.25);

    // 4) Darken background slightly to signal "new chapter" but same page
    tl.to(hero, {
      filter: 'brightness(0.9) saturate(1.1)',
      ease: 'none',
    }, 0);

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
      tl.kill();
    };
  }, []);

  return null;
}
