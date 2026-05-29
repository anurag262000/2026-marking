'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SilkAurora from '@/components/ui/SilkAurora';
import IntroQuotes from './IntroQuotes';
import styles from './Hero.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef(null);
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoContainerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial entrance animation
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        delay: 0.15,
      });

      tl.fromTo(
        '.hero-intro',
        { opacity: 0, y: 18, filter: 'blur(8px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.0 }
      )
        .fromTo(
          '.hero-first',
          { opacity: 0, y: 90, filter: 'blur(12px)' },
          { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.35, ease: 'power4.out' },
          '-=0.55'
        )
        .fromTo(
          '.hero-last',
          { opacity: 0, y: 90, filter: 'blur(12px)' },
          { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.35, ease: 'power4.out' },
          '-=1.0'
        )
        .fromTo(
          '.hero-divider',
          { scaleX: 0, transformOrigin: 'left center' },
          { scaleX: 1, duration: 1.0, ease: 'power2.inOut' },
          '-=0.85'
        )
        .fromTo(
          '.hero-footer-item',
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.05 },
          '-=0.55'
        );

      // Scroll-triggered animations - ULTRA SLOW
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: '+=3000vh', // 30x viewport height = ULTRA SLOW
          scrub: 2, // More lag for smoother feel
          pin: true,
          anticipatePin: 1,
        },
      });

      // Phase 1: Fade out intro only (0% - 5%)
      scrollTl
        .to('.hero-intro', {
          opacity: 0,
          y: -40,
          duration: 0.5,
          ease: 'power2.in',
        }, 0)
        // Footer stays visible - no animation
        
        // Phase 2: Move names UP from their current position to center (5% - 40%)
        // Names are already at bottom, so we move them UP (negative y)
        .fromTo(firstNameRef.current, 
          { y: 0 }, // Start from current position (bottom)
          {
            y: '-30vh', // Move UP to center
            duration: 4.0,
            ease: 'power1.inOut',
          }, 0.5)
        .fromTo(lastNameRef.current,
          { y: 0 }, // Start from current position (bottom)
          {
            y: '-30vh', // Move UP to center
            duration: 4.0,
            ease: 'power1.inOut',
          }, 0.5)
        
        // Phase 3: Show video container and start growing from 0x0 (40% - 70%)
        .to(videoContainerRef.current, {
          opacity: 1,
          duration: 0.3,
          ease: 'none',
        }, 4.5)
        .to(videoContainerRef.current, {
          width: '90vw',
          height: '90vh',
          duration: 4.0, // Much slower growth
          ease: 'power2.out',
        }, 4.5)
        
        // Phase 4: Split names apart (starts at 55%, overlaps with video growth)
        .to(firstNameRef.current, {
          x: '-100vw',
          duration: 4.0,
          ease: 'power2.inOut',
        }, 6.0)
        .to(lastNameRef.current, {
          x: '100vw',
          duration: 4.0,
          ease: 'power2.inOut',
        }, 6.0);

      // Video playback - use playback rate to sync with scroll
      if (videoRef.current) {
        const video = videoRef.current;
        let lastProgress = 0;
        
        ScrollTrigger.create({
          trigger: heroRef.current,
          start: 'top top',
          end: '+=3000vh',
          scrub: true,
          onUpdate: (self) => {
            const videoPlayStartProgress = 0.5;
            
            if (self.progress >= videoPlayStartProgress && video.duration) {
              // Calculate target time based on scroll position
              const adjustedProgress = (self.progress - videoPlayStartProgress) / (1 - videoPlayStartProgress);
              const targetTime = adjustedProgress * video.duration;
              
              // Calculate scroll velocity
              const progressDelta = self.progress - lastProgress;
              lastProgress = self.progress;
              
              // If scrolling forward significantly, play video
              if (progressDelta > 0.0001) {
                if (video.paused) {
                  video.play().catch(() => {});
                }
                // Adjust playback rate based on scroll speed
                video.playbackRate = Math.abs(progressDelta) * 1000;
              } else if (progressDelta < -0.0001) {
                // Scrolling backward
                if (video.paused) {
                  video.play().catch(() => {});
                }
                video.playbackRate = -Math.abs(progressDelta) * 1000;
              }
              
              // Keep video synced to scroll position
              const timeDiff = Math.abs(video.currentTime - targetTime);
              if (timeDiff > 0.1) {
                video.currentTime = targetTime;
              }
            } else {
              // Before video play start
              video.pause();
              video.currentTime = 0;
              lastProgress = self.progress;
            }
          },
        });

        // Ensure video is loaded
        video.load();
        video.addEventListener('loadedmetadata', () => {
          video.currentTime = 0;
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section ref={heroRef} className={styles.hero}>
        <div className={styles.bg}>
          <SilkAurora />
        </div>

        <div className={styles.grain} />
        <div className={styles.vignette} />

        <div className={styles.content}>
          <div className={styles.intro}>
            <IntroQuotes />
          </div>

          <div className={styles.lockup}>
            <h1 ref={firstNameRef} className={`${styles.firstName} hero-first`}>Anurag</h1>
            <h1 ref={lastNameRef} className={`${styles.lastName} hero-last`}>Mishra.</h1>
          </div>

          <footer className={styles.footer}>
            <div className={`${styles.divider} hero-divider`} />
            <div className={styles.footerRow}>
              <div className={`${styles.version} hero-footer-item`}>→ V1.0</div>

              <nav className={styles.centerNav} aria-label="Social links">
                <a href="#" className={`${styles.navLink} hero-footer-item`}>BEHANCE</a>
                <span className={`${styles.slash} hero-footer-item`}>/</span>
                <a href="#" className={`${styles.navLink} hero-footer-item`}>LINKEDIN</a>
                <span className={`${styles.slash} hero-footer-item`}>/</span>
                <a href="#" className={`${styles.navLink} hero-footer-item`}>GITHUB</a>
              </nav>

              <nav className={styles.rightNav} aria-label="Primary links">
                <a href="#projects" className={`${styles.navLink} hero-footer-item`}>WORK</a>
                <a href="#about" className={`${styles.navLink} hero-footer-item`}>INFO</a>
                <a href="#contact" className={`${styles.navLink} hero-footer-item`}>CONTACT</a>
              </nav>
            </div>
          </footer>
        </div>

        {/* Video Container */}
        <div ref={videoContainerRef} className={styles.videoContainer}>
          <video
            ref={videoRef}
            className={styles.video}
            muted
            playsInline
            preload="auto"
          >
            <source src="/hero/animate.mp4" type="video/mp4" />
          </video>
        </div>
      </section>
    </>
  );
}