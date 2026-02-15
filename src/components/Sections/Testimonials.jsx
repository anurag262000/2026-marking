'use client';

import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';

const testimonials = [
  {
    id: 1,
    name: 'Priya',
    role: 'Frontend Developer',
    company: 'Indiefluence',
    image: '/testimonials/priya.jpg',
    quote: 'Anurag leads from the front. His architectural clarity and structured thinking make complex projects manageable for the entire team. Working under his guidance significantly improved my approach to scalable frontend systems.'
  },
  {
    id: 2,
    name: 'Yogesh',
    role: 'Full Stack Developer',
    company: 'Indiefluence',
    image: '/testimonials/yogesh.jpg',
    quote: 'Anurag combines leadership with deep hands-on involvement. He does not just design systems — he actively codes critical components, ensuring architectural integrity across projects.'
  },
  {
    id: 3,
    name: 'Sumit',
    role: 'UI/UX Designer',
    company: 'Indiefluence',
    image: '/testimonials/sumit.jpg',
    quote: 'Collaborating with Anurag ensures design ideas are executed with technical precision. He respects design systems while optimizing for performance and scalability.'
  },
  {
    id: 4,
    name: 'Riya Sharma',
    role: 'Full Stack Intern',
    company: 'Indiefluence',
    image: '/testimonials/riya.jpg',
    quote: 'As an intern, I learned how production-grade systems are architected. Anurag encourages ownership and explains architectural decisions clearly, which accelerated my growth.'
  },
  {
    id: 5,
    name: 'Yash Choudhary',
    role: 'Full Stack Developer (Ex-Intern)',
    company: 'Indiefluence',
    image: '/testimonials/yash.jpg',
    quote: 'Anurag sets high engineering standards while remaining approachable. His mentorship played a key role in shaping my understanding of scalable backend architecture.'
  },
  {
    id: 6,
    name: 'Aayushi Verma',
    role: 'Content Strategist',
    company: 'Independent Client',
    image: '/testimonials/aayushi.jpg',
    quote: 'Anurag developed my portfolio with exceptional attention to structure and performance. His ability to translate creative vision into a fast and elegant website is impressive.'
  }
];

export default function Testimonials() {
    const carouselRef = useRef(null);
    const containerRef = useRef(null);
    const animationRef = useRef(null);
    const [isPaused, setIsPaused] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const dragStateRef = useRef({
        isDragging: false,
        startX: 0,
        currentX: 0,
        dragOffset: 0
    });

    useEffect(() => {
        // Detect mobile device
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => {
            window.removeEventListener('resize', checkMobile);
        };
    }, []);

    useEffect(() => {
        if (!carouselRef.current) return;

        const carousel = carouselRef.current;
        const cards = carousel.children;

        if (cards.length === 0) return;

        // Calculate total width
        const cardWidth = cards[0].offsetWidth;
        const gap = 32; // 2rem gap
        const totalWidth = (cardWidth + gap) * testimonials.length;

        // Clone testimonials for seamless loop
        const clonedTestimonials = Array.from(cards).map(card => card.cloneNode(true));
        clonedTestimonials.forEach(clone => carousel.appendChild(clone));

        // Only enable auto-scroll on desktop (not mobile)
        if (!isMobile) {
            animationRef.current = gsap.to(carousel, {
                x: -totalWidth,
                duration: 30,
                ease: 'none',
                repeat: -1,
                modifiers: {
                    x: gsap.utils.unitize(x => parseFloat(x) % totalWidth)
                }
            });
        } else {
            // On mobile, set initial position but no animation
            gsap.set(carousel, { x: 0 });
        }

        return () => {
            if (animationRef.current) {
                animationRef.current.kill();
            }
        };
    }, [isMobile]);

    const handleMouseEnter = () => {
        setIsPaused(true);
        if (animationRef.current) {
            gsap.to(animationRef.current, { timeScale: 0, duration: 0.5, ease: 'power2.out' });
        }
    };

    const handleMouseLeave = () => {
        setIsPaused(false);
        if (animationRef.current) {
            gsap.to(animationRef.current, { timeScale: 1, duration: 0.5, ease: 'power2.in' });
        }
    };

    // Touch/Drag handlers
    const handleDragStart = (e) => {
        const clientX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
        dragStateRef.current.isDragging = true;
        dragStateRef.current.startX = clientX;

        // Only pause animation on desktop (where animation exists)
        if (animationRef.current && !isMobile) {
            gsap.to(animationRef.current, { timeScale: 0, duration: 0.3, ease: 'power2.out' });
        }
    };

    const handleDragMove = (e) => {
        if (!dragStateRef.current.isDragging) return;

        const clientX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
        const diff = clientX - dragStateRef.current.startX;
        dragStateRef.current.dragOffset = diff;

        // Apply drag offset to carousel
        if (carouselRef.current) {
            const currentX = gsap.getProperty(carouselRef.current, 'x');
            gsap.set(carouselRef.current, { x: currentX + diff * 0.5 });
            dragStateRef.current.startX = clientX;
        }
    };

    const handleDragEnd = () => {
        if (!dragStateRef.current.isDragging) return;

        dragStateRef.current.isDragging = false;

        // Only resume animation on desktop
        if (animationRef.current && !isMobile) {
            gsap.to(animationRef.current, { timeScale: 1, duration: 0.5, ease: 'power2.in' });
        }

        dragStateRef.current.dragOffset = 0;
    };

    return (
        <section
            id="testimonials"
            className="relative w-full py-32 bg-gradient-to-b from-black to-[#0a0a0a] overflow-hidden"
        >
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] opacity-30 pointer-events-none" />

            <div className="max-w-[1400px] mx-auto px-8 md:px-6 relative z-10">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-6xl font-black uppercase bg-gradient-to-br from-white to-blue-400 bg-clip-text font-weight-200 text-transparent mb-4 tracking-tight font-bitcount">
                        Client Testimonials
                    </h2>
                    <p className="text-lg text-white/60 font-light font-inter">
                        What people say about working with me
                    </p>
                </div>

                {/* Carousel Container */}
                <div
                    ref={containerRef}
                    className="relative w-full overflow-hidden cursor-grab active:cursor-grabbing py-8 touch-pan-y"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onMouseDown={handleDragStart}
                    onMouseMove={handleDragMove}
                    onMouseUp={handleDragEnd}
                    onTouchStart={handleDragStart}
                    onTouchMove={handleDragMove}
                    onTouchEnd={handleDragEnd}
                >
                    <div ref={carouselRef} className="flex gap-8 will-change-transform">
                        {testimonials.map((testimonial) => (
                            <div
                                key={testimonial.id}
                                className="group relative flex-shrink-0 w-[450px] min-h-[320px] p-10 bg-white/[0.02] backdrop-blur-md border border-white/10 rounded-lg overflow-hidden transition-all duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-2 hover:border-blue-400/40 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4),0_0_40px_rgba(96,165,250,0.1)]"
                            >
                                {/* Gradient Overlay on Hover */}
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none" />

                                {/* Glow Effect */}
                                <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-[radial-gradient(circle,rgba(96,165,250,0.15)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none" />

                                {/* Quote Icon */}
                                <div className="text-blue-400/20 mb-6 w-10 h-8">
                                    <svg width="40" height="32" viewBox="0 0 40 32" fill="none">
                                        <path d="M0 32V16C0 7.168 5.824 0 17.92 0v6.4C11.776 7.168 8.96 10.752 8.96 16h8.96v16H0zm21.12 0V16c0-8.832 5.824-16 17.92-16v6.4c-6.144.768-8.96 4.352-8.96 9.6h8.96v16H21.12z" fill="currentColor" />
                                    </svg>
                                </div>

                                {/* Quote Text */}
                                <p className="text-lg leading-relaxed text-white/90 mb-8 font-light font-inter relative z-10">
                                    {testimonial.quote}
                                </p>

                                {/* Author Info */}
                                <div className="flex items-center gap-4 mt-auto relative z-10">
                                    <div className="flex-shrink-0">
                                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center text-xl font-bold text-white font-orbitron border-2 border-white/10">
                                            {testimonial.name.split(' ').map(n => n[0]).join('')}
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-base font-bold text-white mb-1 tracking-wider font-orbitron">
                                            {testimonial.name}
                                        </h4>
                                        <p className="text-sm text-white/60 font-light font-inter">
                                            {testimonial.role} <span className="mx-2 text-blue-400/60">•</span> {testimonial.company}
                                        </p>
                                    </div>
                                </div>

                                {/* Corner Accents */}
                                <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-blue-400/30 transition-all duration-400 group-hover:border-blue-400/80 group-hover:w-4 group-hover:h-4" />
                                <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-blue-400/30 transition-all duration-400 group-hover:border-blue-400/80 group-hover:w-4 group-hover:h-4" />
                                <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-blue-400/30 transition-all duration-400 group-hover:border-blue-400/80 group-hover:w-4 group-hover:h-4" />
                                <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-blue-400/30 transition-all duration-400 group-hover:border-blue-400/80 group-hover:w-4 group-hover:h-4" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Hint */}
                <div className="text-center mt-12 flex items-center justify-center gap-2 text-sm text-white/40 font-inter">
                    <span className="text-xl text-blue-400/60 animate-[slideHint_2s_ease-in-out_infinite]">↔</span>
                    <span className="hidden md:inline">Hover to pause • Auto-scrolling</span>
                    <span className="md:hidden">Swipe to explore testimonials</span>
                </div>
            </div>

            <style jsx>{`
                @keyframes slideHint {
                    0%, 100% {
                        transform: translateX(-4px);
                    }
                    50% {
                        transform: translateX(4px);
                    }
                }
            `}</style>
        </section>
    );
}
