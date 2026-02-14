"use client";

import './globals.css';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer';
import Preloader from '@/components/Preloader/Preloader';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function RootLayout({ children }) {
  const pathname = usePathname();

  // Refresh ScrollTrigger on route changes to prevent animation glitches
  useEffect(() => {
    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => clearTimeout(timer);
  }, [pathname]);

  // Global GSAP cleanup on unmount
  useEffect(() => {
    return () => {
      // Kill all ScrollTrigger instances when component unmounts
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <Preloader />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
