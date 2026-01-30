'use client';

import HeroSection from '@/components/HeroSection';
import ArtistsSection from '@/components/ArtistsSection';
import ShowcaseSection from '@/components/ShowcaseSection';
import StatsSection from '@/components/StatsSection';

export default function LandingPage() {
  return (
    <main className="landing-page-new">
      <HeroSection />
      <ArtistsSection />
      <ShowcaseSection />
      <StatsSection />
    </main>
  );
}
