'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const ContactSection = () => {
  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Stagger form inputs
      gsap.from(formRef.current.querySelectorAll('.form-field'), {
        scrollTrigger: {
          trigger: formRef.current,
          start: 'top 80%',
        },
        opacity: 0,
        y: 50,
        duration: 0.6,
        stagger: 0.1,
        ease: 'back.out(1.7)'
      });

      // Floating background elements
      gsap.to('.float-element', {
        y: '+=30',
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: {
          each: 0.5,
          from: 'random'
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Animate button on submit
    gsap.to(e.target.querySelector('button'), {
      scale: 0.9,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: 'power2.inOut'
    });

    console.log('Form submitted:', formData);
    // Add your form submission logic here
  };

  return (
    <section ref={sectionRef} className="relative py-24 bg-gradient-to-b from-black via-gray-900 to-black overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="float-element absolute top-1/4 left-10 w-32 h-32 bg-yellow-500/10 rounded-full blur-2xl"></div>
        <div className="float-element absolute top-1/2 right-20 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="float-element absolute bottom-1/4 left-1/3 w-40 h-40 bg-purple-500/10 rounded-full blur-2xl"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-black text-white mb-4">
            Get In <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">Touch</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Let's work together to create something amazing
          </p>
        </div>

        {/* Contact Form */}
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          {/* Name Input */}
          <div className="form-field">
            <label htmlFor="name" className="block text-sm font-semibold text-gray-300 mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-6 py-4 bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all duration-300"
              placeholder="Your name"
              required
            />
          </div>

          {/* Email Input */}
          <div className="form-field">
            <label htmlFor="email" className="block text-sm font-semibold text-gray-300 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-6 py-4 bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all duration-300"
              placeholder="your@email.com"
              required
            />
          </div>

          {/* Message Textarea */}
          <div className="form-field">
            <label htmlFor="message" className="block text-sm font-semibold text-gray-300 mb-2">
              Message
            </label>
            <textarea
              id="message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              rows={6}
              className="w-full px-6 py-4 bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all duration-300 resize-none"
              placeholder="Tell me about your project..."
              required
            />
          </div>

          {/* Submit Button */}
          <div className="form-field">
            <button
              type="submit"
              className="group relative w-full px-8 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-bold text-lg rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-yellow-500/50"
              style={{ perspective: '1000px' }}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Send Message
                <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-700 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
            </button>
          </div>
        </form>

        {/* Social Links */}
        <div className="mt-12 flex justify-center gap-6">
          {[
            { name: 'GitHub', icon: '⚡', href: '#' },
            { name: 'LinkedIn', icon: '💼', href: '#' },
            { name: 'Twitter', icon: '🐦', href: '#' },
            { name: 'Email', icon: '✉️', href: '#' },
          ].map((social) => (
            <a
              key={social.name}
              href={social.href}
              className="group relative w-14 h-14 bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-full flex items-center justify-center hover:border-yellow-500 hover:shadow-lg hover:shadow-yellow-500/20 transition-all duration-300 hover:scale-110"
              style={{ perspective: '500px' }}
              title={social.name}
            >
              <span className="text-2xl transform group-hover:scale-125 transition-transform">
                {social.icon}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
