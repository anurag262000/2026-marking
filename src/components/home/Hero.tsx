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
  const videoContainerRef = useRef(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Wait for video to load before setting up animations
    const video = videoRef.current;
    if (!video) return;

    const handleVideoLoaded = () => {
      // Set video to loop and start paused
      video.pause();
      video.currentTime = 0;
      
      console.log('Video loaded. Duration:', video.duration);

      const ctx = gsap.context(() => {
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

        // Scroll-triggered animations
        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: '+=8000vh', // Reduced for 4-second video
            scrub: 1, // Reduced scrub for more responsive feel
            pin: true,
            anticipatePin: 1,
            onUpdate: (self) => {
              const progress = self.progress;
              
              // Video plays during expansion phase (25% to 87.5%)
              const videoStartProgress = 0.25;
              const videoEndProgress = 0.875;
              
              if (progress >= videoStartProgress && progress <= videoEndProgress) {
                // Map scroll progress to video time for scrubbing effect
                const videoPhaseProgress = (progress - videoStartProgress) / (videoEndProgress - videoStartProgress);
                const targetTime = videoPhaseProgress * video.duration;
                
                // Update video time based on scroll position
                if (Math.abs(video.currentTime - targetTime) > 0.1) {
                  video.currentTime = targetTime;
                }
              } else if (progress < videoStartProgress) {
                video.currentTime = 0;
              }
            },
          },
        });

        scrollTl
          .to('.hero-intro', {
            opacity: 0,
            y: -40,
            duration: 1.0,
            ease: 'power2.in',
          }, 0)
          .fromTo(firstNameRef.current, 
            { y: 0 },
            {
              y: '-30vh',
              duration: 3.0,
              ease: 'power1.inOut',
            }, 1.0)
          .fromTo(lastNameRef.current,
            { y: 0 },
            {
              y: '-30vh',
              duration: 3.0,
              ease: 'power1.inOut',
            }, 1.0)
          .to(videoContainerRef.current, {
            opacity: 1,
            duration: 0.5,
            ease: 'none',
          }, 4.0)
          .to(videoContainerRef.current, {
            width: '80vw',
            height: '80vh',
            duration: 10.0,
            ease: 'power2.out',
          }, 4.0)
          .to(firstNameRef.current, {
            x: '-100vw',
            duration: 3.0,
            ease: 'power2.inOut',
          }, 10.0)
          .to(lastNameRef.current, {
            x: '100vw',
            duration: 3.0,
            ease: 'power2.inOut',
          }, 10.0);

      }, heroRef);

      return () => ctx.revert();
    };
    
    if (video.readyState >= 2) {
      // Video already loaded
      handleVideoLoaded();
    } else {
      // Wait for video to load
      video.addEventListener('loadedmetadata', handleVideoLoaded);
      return () => video.removeEventListener('loadedmetadata', handleVideoLoaded);
    }
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

        {/* Video Container - Scroll Controlled */}
        <div ref={videoContainerRef} className={styles.videoContainer}>
          <video
            ref={videoRef}
            className={styles.video}
            muted
            playsInline
            preload="auto"
          >
            <source src="/hero/animate2.mp4" type="video/mp4" />
          </video>
        </div>
      </section>
    </>
  );
}
