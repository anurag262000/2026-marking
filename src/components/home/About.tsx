'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './About.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Smooth fade in for entire section
      gsap.fromTo(
        sectionRef.current,
        {
          opacity: 0,
        },
        {
          opacity: 1,
          duration: 1.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 90%',
            end: 'top 60%',
            scrub: 1,
          },
        }
      );

      // Stagger content elements
      gsap.fromTo(
        '.about-content',
        {
          opacity: 0,
          y: 60,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'top 50%',
            scrub: 1.5,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className={styles.about}>
      <div className={styles.container}>
        <div className={`${styles.header} about-content`}>
          <h2 className={styles.title}>About Me</h2>
          <div className={styles.divider} />
        </div>

        <div className={`${styles.content} about-content`}>
          <p className={styles.text}>
            I'm <span className={styles.highlight}>Anurag Mishra</span>, a passionate developer and designer 
            crafting digital experiences that blend creativity with functionality. With a keen eye for detail 
            and a love for clean code, I transform ideas into elegant solutions.
          </p>
          
          <p className={styles.text}>
            My journey in tech has been driven by curiosity and a constant desire to learn. 
            I specialize in building modern web applications using cutting-edge technologies, 
            always pushing the boundaries of what's possible on the web.
          </p>

          <div className={styles.skills}>
            <div className={styles.skillCategory}>
              <h3 className={styles.skillTitle}>Development</h3>
              <div className={styles.skillTags}>
                <span className={styles.tag}>React</span>
                <span className={styles.tag}>Next.js</span>
                <span className={styles.tag}>TypeScript</span>
                <span className={styles.tag}>Node.js</span>
              </div>
            </div>

            <div className={styles.skillCategory}>
              <h3 className={styles.skillTitle}>Design</h3>
              <div className={styles.skillTags}>
                <span className={styles.tag}>UI/UX</span>
                <span className={styles.tag}>Animation</span>
                <span className={styles.tag}>3D Graphics</span>
                <span className={styles.tag}>Prototyping</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
