import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default class AboutTransition {
  constructor() {
    this.init();
  }

  init() {
    console.log('AboutTransition: Initializing Swap Logic...');
    const hero = document.querySelector('.hero-section');
    const aboutSection = document.getElementById('about-section');
    const glassCard = document.querySelector('.hero-image-placeholder');
    const heroImage = document.querySelector('.hero-headshot');
    const letterContainers = document.querySelectorAll('.variable-letter-container');
    const aboutContent = document.querySelector('.about-container');

    if (!hero || !aboutSection || !glassCard) return;

    // --- SETUP: 10x10 PIXEL GRID ---
    let pixelGrid = document.querySelector('.pixel-transition-grid');
    if (!pixelGrid) {
        pixelGrid = document.createElement('div');
        pixelGrid.className = 'pixel-transition-grid';
        for (let i = 0; i < 100; i++) {
            const pixel = document.createElement('div');
            pixel.className = 'transition-pixel';
            pixelGrid.appendChild(pixel);
        }
        hero.appendChild(pixelGrid);
    }

    // --- SETUP: CIRCLE WIPE OVERLAY (GPU Accelerated) ---
    let circleWipe = document.querySelector('.circle-wipe-overlay');
    if (!circleWipe) {
        circleWipe = document.createElement('div');
        circleWipe.className = 'circle-wipe-overlay';
        hero.appendChild(circleWipe);
    }

    // --- NESTING: Move About inside Hero for pinned transition ---
    if (aboutSection.parentElement !== hero) {
        hero.appendChild(aboutSection);
    }

    // Initial States
    gsap.set(aboutSection, { autoAlpha: 0 });
    gsap.set(aboutContent, { y: 30, autoAlpha: 0 });
    gsap.set(glassCard, { zIndex: 15, opacity: 1 });
    gsap.set('.transition-pixel', { scale: 0, opacity: 0 });
    gsap.set(circleWipe, { scale: 0, opacity: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: hero,
        start: 'top top',
        end: '+=300%', // 3x viewport height of scroll distance
        scrub: 0.5,    // Smooth scrubbing tied to scroll
        pin: true,     // Pin hero while animating
        anticipatePin: 1,
        onUpdate: (self) => {
            const isPastHero = self.progress > 0.15;
            // Enable pointer-events on About after 15% progress
            aboutSection.classList.toggle('active', isPastHero);
            // Disable pointer-events on Hero interactive elements
            if (glassCard) glassCard.style.pointerEvents = isPastHero ? 'none' : 'auto';
            const heroInteractiveElements = document.querySelectorAll('.availability-badge, .scroll-indicator, .hero-subtitle, .variable-text-container');
            heroInteractiveElements.forEach(el => {
                el.style.pointerEvents = isPastHero ? 'none' : 'auto';
                el.style.visibility = isPastHero ? 'hidden' : 'visible';
            });
        }
      }
    });

    // --- PHASE 1: SCATTER HERO (Time: 0 → 0.5) ---
    // Letters fly off screen with random x/y/rotation
    if (letterContainers.length > 0) {
        tl.to(letterContainers, {
          x: (i) => (Math.random() - 0.5) * window.innerWidth * 1.5,
          y: (i) => (Math.random() - 0.5) * window.innerHeight * 1.5,
          opacity: 0,
          scale: 0.8,
          rotation: (i) => (Math.random() - 0.5) * 90,
          stagger: { amount: 0.2, from: "center" },
          duration: 0.5,
          ease: "power1.inOut",
        }, 0);
    }

    // Badge, subtitle, scroll indicator fade out
    tl.to('.scroll-indicator, .availability-badge, .hero-subtitle', {
      opacity: 0,
      y: -20,
      duration: 0.2
    }, 0);

    // Hero headshot fades
    if (heroImage) {
        tl.to(heroImage, { opacity: 0, duration: 0.3 }, 0);
    }

    // --- PHASE 2: WIPE EFFECT (Time: 0.1 → 1.5) ---
    // Solid black sphere expands from center → covers screen (GPU accelerated)
    gsap.set(circleWipe, { opacity: 1 }); // Start solid, never transparent
    tl.to(circleWipe, {
        scale: 1.5,
        duration: 1.4,
        ease: "power2.inOut"
    }, 0.1);

    // Pixel grid animates from center outward
    const pixels = document.querySelectorAll('.transition-pixel');
    tl.to(pixels, {
        scale: 1.05,
        opacity: 1,
        backgroundColor: '#0a0a0a',
        stagger: {
            grid: [10, 10],
            from: "center",
            amount: 0.4
        },
        duration: 0.5,
        ease: "power2.in"
    }, 0.2);

    // Glass card fades and shrinks
    tl.fromTo(glassCard,
      {
        width: '300px',
        height: '400px',
        borderRadius: '20px',
        top: '50%',
        left: '50%',
        xPercent: -50,
        yPercent: -50,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
      },
      {
        width: '100vw',
        height: '100vh',
        borderRadius: '0px',
        backgroundColor: '#000000',
        backdropFilter: 'none',
        border: 'none',
        duration: 1.0,
        ease: "power2.out"
      }, 0.2);

    // --- PHASE 3: ABOUT REVEALS (Time: 1.5 → 2.6) ---
    // About section becomes visible
    tl.to(aboutSection, { autoAlpha: 1, duration: 0.1 }, 1.5);

    // Hide the glass card
    tl.to(glassCard, { autoAlpha: 0, duration: 0.1 }, 1.5);

    // Hide circle wipe
    tl.to(circleWipe, { autoAlpha: 0, duration: 0.1 }, 1.5);

    // Content slides up and fades in
    if (aboutContent) {
        tl.to(aboutContent, {
          y: 0,
          autoAlpha: 1,
          duration: 1.1,
          ease: "power2.out"
        }, 1.5);
    }

    // --- PHASE 4: HOLD position before unpin ---
    tl.to({}, { duration: 0.4 }, 2.6);
  }

  destroy() {
    ScrollTrigger.getAll().forEach(t => t.kill());
    const grid = document.querySelector('.pixel-transition-grid');
    if (grid) grid.remove();
    const circleWipe = document.querySelector('.circle-wipe-overlay');
    if (circleWipe) circleWipe.remove();
  }
}
