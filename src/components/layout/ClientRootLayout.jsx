"use client";

import { useEffect } from 'react';
import Navbar from '@/components/layout/Navbar/Navbar';
import Footer from '@/components/layout/Footer';
import Preloader from '@/components/layout/Preloader/Preloader';
import SmoothScroll from '@/components/layout/SmoothScroll';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ClientRootLayout({ children }) {
  // Global GSAP cleanup on unmount
  useEffect(() => {
    return () => {
      // Kill all ScrollTrigger instances when component unmounts
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <SmoothScroll>
        <Preloader />
        <Navbar />
        {children}
        <Footer />
    </SmoothScroll>
  );
}
