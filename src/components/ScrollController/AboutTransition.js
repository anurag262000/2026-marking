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

    pixelGrid.style.gridTemplateColumns = 'repeat(10, 1fr)';
    pixelGrid.style.gridTemplateRows = 'repeat(10, 1fr)';

    // --- NESTING ---
    if (aboutSection.parentElement !== hero) {
        hero.appendChild(aboutSection);
    }

    // Initial States
    gsap.set(aboutSection, { autoAlpha: 0 }); // Starts invisible
    gsap.set(aboutContent, { y: 30, autoAlpha: 0 });
    gsap.set(glassCard, { zIndex: 15, opacity: 1 });
    gsap.set('.transition-pixel', { scale: 0, opacity: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: hero,
        start: 'top top',
        end: '+=100%', // Reduced from 500% to 200% as requested
        scrub: 0.5,
        pin: true,
        anticipatePin: 1,
        onUpdate: (self) => {
            aboutSection.classList.toggle('active', self.progress > 0.15);
        }
    }
    });

    // --- PHASE 1: SCATTER HERO (Time: 0 -> 0.5) ---
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
          clearProps: "x,y,opacity,filter,scale,rotation,transform"
        }, 0);
    }

    tl.to('.scroll-indicator, .availability-badge, .hero-subtitle', {
      opacity: 0,
       y: -20,
      duration: 0.2
    }, 0);

    if (heroImage) {
        tl.to(heroImage, { opacity: 0, duration: 0.3 }, 0);
    }

    // --- PHASE 2: WIPE EFFECT (The Card Expands as the Reference) ---
    // It expands to full screen to "wipe" the hero away
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
        backgroundColor: '#000000', // Solid Black Wipe
        backdropFilter: 'none',
        border: 'none',
        duration: 0.7,
        ease: "power2.out"
      }, 0);

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
    }, 0.1);


    // --- PHASE 3: THE SWAP (Refrence Discarded) ---
    // 1. Reveal the About Section (which has its own Black BG) directly ON TOP of the expanded card
    tl.to(aboutSection, { autoAlpha: 1, duration: 0.1 }, 0.65);

    // 2. Hide the Glass Card (Discard it) - it's no longer needed
    tl.to(glassCard, { autoAlpha: 0, duration: 0.1 }, 0.7);

    // 3. Reveal the Content inside (Beams are already part of the section body)
    if (aboutContent) {
        tl.to(aboutContent, {
          y: 0,
          autoAlpha: 1,
          duration: 0.4,
          ease: "power2.out"
        }, 0.7);
    }

    // --- PHASE 4: THE HOLD ---
    tl.to({}, { duration: 4.0 });
  }

  destroy() {
    ScrollTrigger.getAll().forEach(t => t.kill());
    const grid = document.querySelector('.pixel-transition-grid');
    if (grid) grid.remove();
  }
}
