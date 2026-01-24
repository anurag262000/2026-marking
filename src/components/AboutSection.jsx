'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const AboutSection = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  const skills = [
    { name: 'React', icon: '⚛️', level: 95, color: 'from-blue-400 to-cyan-400' },
    { name: 'Next.js', icon: '▲', level: 90, color: 'from-gray-700 to-gray-900' },
    { name: 'TypeScript', icon: 'TS', level: 88, color: 'from-blue-500 to-blue-700' },
    { name: 'Node.js', icon: '🟢', level: 85, color: 'from-green-500 to-green-700' },
    { name: 'GSAP', icon: '🎨', level: 82, color: 'from-lime-400 to-green-500' },
    { name: 'Three.js', icon: '🎲', level: 78, color: 'from-purple-400 to-pink-500' },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Stagger reveal animation on scroll
      gsap.from(cardsRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 100,
        rotateX: -30,
        duration: 0.8,
        stagger: 0.1,
        ease: 'back.out(1.7)'
      });

      // Animate skill bars on scroll
      cardsRef.current.forEach((card, i) => {
        const bar = card?.querySelector('.skill-bar');
        if (bar) {
          gsap.from(bar, {
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
            },
            width: 0,
            duration: 1.5,
            ease: 'power3.out',
            delay: i * 0.1
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-black text-white mb-4">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">Me</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Full-stack developer specializing in creating stunning web experiences with modern technologies
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill, index) => (
            <div
              key={skill.name}
              ref={(el) => (cardsRef.current[index] = el)}
              className="group relative"
              style={{ perspective: '1000px' }}
            >
              {/* 3D Card */}
              <div className="relative bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-6 transform transition-all duration-500 hover:scale-105 hover:-rotate-y-6 hover:shadow-2xl hover:shadow-yellow-500/20"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: 'rotateY(0deg)'
                }}
              >
                {/* Glow Effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${skill.color} opacity-0 group-hover:opacity-20 rounded-2xl blur-xl transition-opacity duration-500`}></div>

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <div className="text-6xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                    {skill.icon}
                  </div>

                  {/* Skill Name */}
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {skill.name}
                  </h3>

                  {/* Skill Level */}
                  <div className="mb-2">
                    <div className="flex justify-between text-sm text-gray-400 mb-2">
                      <span>Proficiency</span>
                      <span>{skill.level}%</span>
                    </div>

                    {/* Progress Bar */}
                    <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div
                        className={`skill-bar h-full bg-gradient-to-r ${skill.color} rounded-full`}
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* 3D Corner Accent */}
                  <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-yellow-500/20 to-transparent rounded-bl-full transform translate-x-4 -translate-y-4 group-hover:scale-150 transition-transform duration-500"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
