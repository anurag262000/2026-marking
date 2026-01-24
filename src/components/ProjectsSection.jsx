'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const ProjectsSection = () => {
  const sectionRef = useRef(null);
  const projectRefs = useRef([]);

  const projects = [
    {
      title: 'E-Commerce Platform',
      description: 'Full-stack e-commerce solution with real-time inventory and payment processing',
      tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      image: '🛒',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      title: 'AI Dashboard',
      description: 'Analytics dashboard with machine learning insights and predictive models',
      tech: ['Next.js', 'Python', 'TensorFlow', 'D3.js'],
      image: '🤖',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Social Media App',
      description: 'Real-time social platform with messaging, posts, and live notifications',
      tech: ['React Native', 'Firebase', 'Socket.io'],
      image: '💬',
      gradient: 'from-green-500 to-teal-500'
    },
    {
      title: '3D Portfolio',
      description: 'Interactive 3D portfolio with WebGL animations and shader effects',
      tech: ['Three.js', 'GSAP', 'WebGL', 'Shaders'],
      image: '🎨',
      gradient: 'from-yellow-500 to-orange-500'
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      projectRefs.current.forEach((project, i) => {
        if (!project) return;

        // Reveal animation
        gsap.from(project, {
          scrollTrigger: {
            trigger: project,
            start: 'top 85%',
            end: 'bottom 15%',
            toggleActions: 'play none none reverse'
          },
          opacity: 0,
          y: 100,
          scale: 0.8,
          duration: 0.8,
          ease: 'back.out(1.7)'
        });

        // Parallax effect on scroll
        gsap.to(project.querySelector('.project-image'), {
          scrollTrigger: {
            trigger: project,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1
          },
          y: -50,
          ease: 'none'
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 bg-gradient-to-b from-black via-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-black text-white mb-4">
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">Projects</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Showcase of my recent work and creative experiments
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.title}
              ref={(el) => (projectRefs.current[index] = el)}
              className="group relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl overflow-hidden hover:border-yellow-500/50 transition-all duration-500"
              style={{ perspective: '1000px' }}
            >
              {/* Project Image/Icon */}
              <div className={`project-image relative h-64 bg-gradient-to-br ${project.gradient} flex items-center justify-center overflow-hidden`}>
                <div className="text-9xl transform group-hover:scale-125 transition-transform duration-500">
                  {project.image}
                </div>

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <button className="px-6 py-3 bg-white text-black font-bold rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    View Project
                  </button>
                </div>
              </div>

              {/* Project Info */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-yellow-400 transition-colors">
                  {project.title}
                </h3>

                <p className="text-gray-400 mb-4">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-gray-800 text-gray-300 text-sm rounded-full border border-gray-700 hover:border-yellow-500 hover:text-yellow-400 transition-colors duration-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* 3D Corner Effect */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-yellow-500/20 to-transparent transform translate-x-16 -translate-y-16 group-hover:translate-x-8 group-hover:-translate-y-8 transition-transform duration-500"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
