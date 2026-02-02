'use client';

import React from 'react';
import { motion } from 'framer-motion';
import InfiniteMarquee from '@/components/ui/InfiniteMarquee';
import './WeaponRack.css';

// Icons from react-icons
import {
  SiNextdotjs,
  SiReact,
  SiNodedotjs,
  SiTypescript,
  SiJavascript,
  SiPostgresql,
  SiPython,
  SiMongodb,
  SiFirebase,
  SiSupabase,
  SiDocker,
  SiGraphql,
  SiRedis,
  SiCloudflare,
  SiGooglecloud,
  SiGit,
  SiGithub,
  SiThreedotjs,
  SiExpress
} from 'react-icons/si';

// Row 1 - Core Stack
const skills1 = [
  { name: "React", icon: SiReact },
  { name: "Next.js", icon: SiNextdotjs },
  { name: "Node.js", icon: SiNodedotjs },
  { name: "Express", icon: SiExpress },
  { name: "TypeScript", icon: SiTypescript },
  { name: "JavaScript", icon: SiJavascript },
  { name: "Python", icon: SiPython },
  { name: "Three.js", icon: SiThreedotjs },
];

// Row 2 - Databases, Cloud & Tools
const skills2 = [
  { name: "PostgreSQL", icon: SiPostgresql },
  { name: "MongoDB", icon: SiMongodb },
  { name: "Supabase", icon: SiSupabase },
  { name: "Firebase", icon: SiFirebase },
  { name: "GraphQL", icon: SiGraphql },
  { name: "Redis", icon: SiRedis },
  { name: "Docker", icon: SiDocker },
  { name: "Git", icon: SiGit },
  { name: "GitHub", icon: SiGithub },
  { name: "Cloudflare", icon: SiCloudflare },
  { name: "Google Cloud", icon: SiGooglecloud },
];

export default function WeaponRack() {
  return (
    <section id="weapon-rack" className="weapon-rack-section">
      <div className="weapon-rack-container">
      

        <div className="marquee-wrapper">
          <InfiniteMarquee
            items={skills1}
            direction="left"
            speed="normal"
            pauseOnHover={true}
          />
          <InfiniteMarquee
            items={skills2}
            direction="right"
            speed="normal"
            pauseOnHover={true}
          />
        </div>
      </div>
    </section>
  );
}
