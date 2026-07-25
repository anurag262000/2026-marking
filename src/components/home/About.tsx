'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './About.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Text blur-to-visible, scrubbed by scroll
      const lines = gsap.utils.toArray('.about-line-inner');
      
      gsap.fromTo(lines,
        { 
          y: '100%', 
          opacity: 0,
          filter: 'blur(12px)',
          rotation: 2
        },
        {
          y: '0%',
          opacity: 1,
          filter: 'blur(0px)',
          rotation: 0,
          stagger: 0.1,
          ease: 'none',
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 85%',
            end: 'top 35%',
            scrub: 1,
          }
        }
      );

      // 2. Image parallax & fade in (slightly below 1st text)
      gsap.fromTo(imageRef.current,
        {
          y: 150,
          opacity: 0,
          filter: 'blur(20px)',
        },
        {
          y: -100, // Parallax movement
          opacity: 1,
          filter: 'blur(0px)',
          ease: 'none',
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top 90%',
            end: 'bottom 40%',
            scrub: 1,
          }
        }
      );

      // 3. 3rd text (bottom info) appears after
      gsap.fromTo(infoRef.current,
        {
          y: 80,
          opacity: 0,
          filter: 'blur(8px)',
        },
        {
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          ease: 'none',
          scrollTrigger: {
            trigger: infoRef.current,
            start: 'top 85%',
            end: 'top 50%',
            scrub: 1,
          }
        }
      );
      
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className={styles.about}>
      <div className={styles.sideLabel}>
        <div className={styles.sideLabelLine}></div>
        <span>About</span>
      </div>

      <div className={styles.container}>
        <div className={styles.leftCol}>
          <div ref={textRef} className={styles.textBlock}>
            <div className={styles.lineWrapper}>
              <span className={`about-line-inner ${styles.line}`}>As a <em>creative developer</em>, I craft</span>
            </div>
            <div className={styles.lineWrapper}>
              <span className={`about-line-inner ${styles.line}`}>tailor-made web experiences,</span>
            </div>
            <div className={styles.lineWrapper}>
              <span className={`about-line-inner ${styles.line}`}>blending technical precision and</span>
            </div>
            <div className={styles.lineWrapper}>
              <span className={`about-line-inner ${styles.line}`}><em>emotion</em>.</span>
            </div>
          </div>

          <div ref={infoRef} className={styles.bottomInfo}>
            <div className={styles.ageLabel}>
              (24)
            </div>
            <div className={styles.descWrapper}>
              <p className={styles.description}>
                My name is Anurag. A passionate creator and computer science student, I build memorable digital experiences, always seeking the symbiosis between art and information.
              </p>
              <div className={styles.infoLink}>
                INFO
              </div>
            </div>
          </div>
        </div>

        <div className={styles.rightCol}>
          <div ref={imageRef} className={styles.imageWrapper}>
            <img 
              src="/Headshot.png" 
              alt="Anurag Mishra" 
              className={styles.profileImage} 
            />
            <div className={styles.imageOverlay}></div>
          </div>
        </div>
      </div>
    </section>
  );
}
