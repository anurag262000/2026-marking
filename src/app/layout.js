// app/layout.js - YOUR ORIGINAL (perfect!)
import './globals.css';
import Navbar from '@/components/Navbar/Navbar';
import Lenis from '@studio-freight/lenis';  // ✅ KEEP THIS

export const metadata = {
  title: 'Developer Portfolio',
  description: 'Full Stack Developer Portfolio - React, Node.js, Next.js',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
