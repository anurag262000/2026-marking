import HeroSection from '@/components/HeroSection';

export default function Home() {
  return (
    <main>
      <HeroSection />

      {/* Add more sections below */}
      <section style={{
        minHeight: '100vh',
        background: '#1a1a1a',
        position: 'relative',
        zIndex: 10,
        padding: '100px 40px'
      }}>
        <h2 style={{ color: 'white', fontSize: '3rem', marginBottom: '2rem' }}>
          About Me
        </h2>
        <p style={{ color: 'white', fontSize: '1.2rem', maxWidth: '800px' }}>
          Full Stack Developer specializing in React, Node.js, and modern web technologies.
        </p>
      </section>
    </main>
  );
}
