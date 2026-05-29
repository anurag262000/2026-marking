'use client';

import { useEffect, useMemo, useState } from 'react';
import styles from './Hero.module.css';

const quotes = [
  <>I build <span className={styles.highlight}>full-stack systems</span> with <em>precision, restraint, and intent.</em></>,
  <>From <span className={styles.highlight}>refined interfaces</span> to <span className={styles.highlightSoft}>scalable architecture,</span> every layer serves a purpose.</>,
  <>I shape <span className={styles.highlight}>production-ready products</span> with calm design and decisive engineering.</>,
  <>Elegant in form. <span className={styles.highlightSoft}>Unforgiving in structure.</span></>,
  <>I craft digital systems that feel <em>measured, exact, and sovereign.</em></>,
];

export default function IntroQuotes(): JSX.Element {
  const [activeIndex, setActiveIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = (): void => setReducedMotion(media.matches);

    update();
    media.addEventListener('change', update);

    return () => {
      media.removeEventListener('change', update);
    };
  }, []);

  useEffect(() => {
    if (reducedMotion) return;

    const interval = setInterval(() => {
      setNextIndex((activeIndex + 1) % quotes.length);
      setIsAnimating(true);

      const switchTimer = setTimeout(() => {
        setActiveIndex((prev) => (prev + 1) % quotes.length);
        setIsAnimating(false);
      }, 800);

      return () => clearTimeout(switchTimer);
    }, 5000);

    return () => clearInterval(interval);
  }, [activeIndex, reducedMotion]);

  const currentQuote = useMemo(() => quotes[activeIndex], [activeIndex]);
  const upcomingQuote = useMemo(() => quotes[nextIndex], [nextIndex]);

  if (reducedMotion) {
    return (
      <div className={styles.quoteStage}>
        <p className={`${styles.introText} hero-intro`}>{quotes[0]}</p>
      </div>
    );
  }

  return (
    <div
      className={`${styles.quoteStage} ${isAnimating ? styles.quoteStageActive : ''}`}
      aria-live="polite"
    >
      <div className={styles.quoteScene}>
        <p
          className={`${styles.introText} ${styles.quoteItem} ${styles.quoteCurrent} ${
            isAnimating ? styles.quoteCurrentExit : ''
          } hero-intro`}
        >
          {currentQuote}
        </p>

        <p
          className={`${styles.introText} ${styles.quoteItem} ${styles.quoteIncoming} ${
            isAnimating ? styles.quoteIncomingEnter : ''
          }`}
        >
          {upcomingQuote}
        </p>

        <span className={styles.windMorph} aria-hidden="true" />
      </div>
    </div>
  );
}