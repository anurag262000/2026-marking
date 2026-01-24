'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const ExperienceSection = () => {
  const sectionRef = useRef(null);
  const lineRef = useRef(null);
  const itemRefs = useRef([]);

  const experiences = [
    {
      year: '2024',
      title: 'Senior Full Stack Developer',
      company: 'Tech Innovations Inc.',
      description: 'Led development of enterprise web applications using React, Node.js, and AWS',
      skills: ['React', 'Node.js', 'AWS', 'TypeScript']
    },
    {
      year: '2022',
      title: 'Frontend Developer',
      company: 'Creative Solutions',
      description: 'Built responsive web applications with modern frameworks and libraries',
      skills: ['Vue.js', 'GSAP', 'Tailwind CSS']
    },
    {
      year: '2020',
      title: 'Junior Developer',
      company: 'StartUp Labs',
      description: 'Developed features for mobile and web applications',
      skills: ['JavaScript', 'React Native', 'Firebase']
    },
    {
      year: '2019',
      title: 'Web Developer Intern',
      company: 'Digital Agency',
      description: 'Collaborated on client projects and learned modern web development',
      skills: ['HTML', 'CSS', 'JavaScript', 'jQuery']
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate timeline line
      gsap.from(lineRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          end: 'bottom 30%',
          scrub: 1
        },
        scaleY: 0,
        transformOrigin: 'top',
        ease: 'none'
      });

      // Animate experience items
      itemRefs.current.forEach((item, i) => {
        if (!item) return;

        const direction = i % 2 === 0 ? -100 : 100;

        gsap.from(item, {
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          },
          opacity: 0,
          x: direction,
          duration: 0.8,
          ease: 'back.out(1.7)'
        });

        // Pulse dot on scroll
        const dot = item.querySelector('.timeline-dot');
        if (dot) {
          gsap.from(dot, {
            scrollTrigger: {
              trigger: item,
              start: 'top 80%',
            },
            scale: 0,
            duration: 0.5,
            ease: 'back.out(2)'
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 bg-black">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-black text-white mb-4">
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">Journey</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Professional experience and milestones
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Vertical Line */}
          <div
            ref={lineRef}
            className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-yellow-500 via-yellow-400 to-yellow-500"
          ></div>

          {/* Timeline Items */}
          <div className="space-y-16">
            {experiences.map((exp, index) => {
              const isLeft = index % 2 === 0;

              return (
                <div
                  key={index}
                  ref={(el) => (itemRefs.current[index] = el)}
                  className={`relative flex items-center ${isLeft ? 'justify-start' : 'justify-end'}`}
                >
                  {/* Content Card */}
                  <div className={`w-full md:w-5/12 ${isLeft ? 'pr-8 md:pr-16' : 'pl-8 md:pl-16'}`}>
                    <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 hover:border-yellow-500/50 hover:shadow-2xl hover:shadow-yellow-500/20 transition-all duration-500 group"
                      style={{ perspective: '1000px' }}
                    >
                      {/* Year Badge */}
                      <div className="inline-block px-4 py-2 bg-yellow-500 text-black font-bold rounded-full mb-4">
                        {exp.year}
                      </div>

                      {/* Title */}
                      <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors">
                        {exp.title}
                      </h3>

                      {/* Company */}
                      <p className="text-yellow-400 font-semibold mb-3">
                        @ {exp.company}
                      </p>

                      {/* Description */}
                      <p className="text-gray-400 mb-4">
                        {exp.description}
                      </p>

                      {/* Skills */}
                      <div className="flex flex-wrap gap-2">
                        {exp.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-3 py-1 bg-gray-800 text-gray-300 text-sm rounded-full border border-gray-700"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Timeline Dot */}
                  <div className="timeline-dot absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-yellow-500 rounded-full border-4 border-black z-10 group-hover:scale-150 transition-transform duration-300"></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
