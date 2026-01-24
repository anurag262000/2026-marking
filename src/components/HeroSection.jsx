'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const HeroSection = () => {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Split text into characters for animation
      const titleChars = titleRef.current.children;
      const subtitleChars = subtitleRef.current.children;

      // Initial state - hidden
      gsap.set([titleChars, subtitleChars, ctaRef.current], {
        opacity: 0,
        y: 50
      });

      // Create timeline for entrance animation
      const tl = gsap.timeline({ delay: 0.5 });

      // Animate title characters with stagger
      tl.to(titleChars, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.05,
        ease: 'back.out(1.7)'
      });

      // Animate subtitle
      tl.to(subtitleChars, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.03,
        ease: 'power3.out'
      }, '-=0.4');

      // Animate CTA button
      tl.to(ctaRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'back.out(1.7)'
      }, '-=0.3');

      // Mouse parallax effect
      const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const xPos = (clientX / window.innerWidth - 0.5) * 20;
        const yPos = (clientY / window.innerHeight - 0.5) * 20;

        gsap.to(titleRef.current, {
          x: xPos,
          y: yPos,
          duration: 0.5,
          ease: 'power2.out'
        });

        gsap.to(subtitleRef.current, {
          x: xPos * 0.5,
          y: yPos * 0.5,
          duration: 0.7,
          ease: 'power2.out'
        });
      };

      window.addEventListener('mousemove', handleMouseMove);

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const splitText = (text) => {
    return text.split('').map((char, i) => (
      <span key={i} className="inline-block">
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-black via-gray-900 to-black"
    >
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Main Title */}
        <h1
          ref={titleRef}
          className="text-6xl md:text-8xl font-black mb-6 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-400"
          style={{ perspective: '1000px' }}
        >
          {splitText('DEVELOPER')}
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="text-2xl md:text-4xl font-light text-white/90 mb-12"
        >
          {splitText('Building the Future')}
        </p>

        {/* CTA Button */}
        <div ref={ctaRef}>
          <button className="group relative px-8 py-4 bg-yellow-500 text-black font-bold text-lg rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-yellow-500/50">
            <span className="relative z-10">View My Work</span>
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
          </button>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
