"use client";

import './globals.css';
import { useEffect } from 'react';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer';
import Preloader from '@/components/Preloader/Preloader';
import SmoothScroll from '@/components/SmoothScroll';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function RootLayout({ children }) {
  // Global GSAP cleanup on unmount
  useEffect(() => {
    return () => {
      // Kill all ScrollTrigger instances when component unmounts
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/a-favicon.png" sizes="any" />
      </head>
      <body suppressHydrationWarning>
        <SmoothScroll>
          <Preloader />
          <Navbar />
          {children}
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
