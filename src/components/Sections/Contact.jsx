'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AuroraCore } from '@/components/ui/AuroraCore';
import { LuArrowRight, LuMail, LuPhone, LuLinkedin, LuGithub, LuTwitter } from 'react-icons/lu';
import { FiCheckCircle, FiAlertCircle, FiLoader } from 'react-icons/fi';
import { sendEmail } from '@/app/contact/actions';

export default function Contact() {
  const containerRef = useRef(null);
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [errorMessage, setErrorMessage] = useState('');
  const [isPageLoading, setIsPageLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsPageLoading(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  async function handleSubmit(formData) {
    setStatus('loading');
    setErrorMessage('');

    try {
        const result = await sendEmail(formData);

        if (result.success) {
            setStatus('success');
        } else {
            setStatus('error');
            setErrorMessage(result.message || 'Failed to send message.');
        }
    } catch (e) {
        setStatus('error');
        setErrorMessage('An unexpected error occurred.');
    }
  }

  return (
    <>
      {/* Page Entry Loader */}
      <AnimatePresence>
        {isPageLoading && (
          <motion.div
            key="contact-loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black"
          >
            {/* Animated ring */}
            <div className="relative mb-8">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1.4, repeat: Infinity, ease: 'linear' }}
                className="w-20 h-20 rounded-full border-2 border-transparent border-t-blue-500 border-r-blue-500/40"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-2 rounded-full border-2 border-transparent border-t-purple-500 border-r-purple-500/40"
              />
              {/* Center icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <LuMail className="w-6 h-6 text-white/80" />
              </div>
            </div>

            {/* Label */}
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="font-orbitron text-xs uppercase tracking-[0.4em] text-white/50 mb-6"
            >
              Contact
            </motion.p>

            {/* Progress bar */}
            <div className="w-40 h-0.5 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ scaleX: 0, originX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.5, ease: 'easeInOut' }}
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <section id="contact" ref={containerRef} className="relative w-full min-h-screen flex items-center justify-center bg-black pb-20 overflow-hidden pt-28">

        {/* Background Aurora - Reused for consistency */}
        <div className="absolute inset-0 w-full h-full pointer-events-none opacity-30 blur-3xl">
            <AuroraCore
                id="tsparticlescontact"
                background="transparent"
                particleDensity={3}
                className="w-full h-full"
                blur={80}
                speed={0.3}
            />
        </div>

        <div className="relative w-[95%] max-w-7xl bg-[#0a0a0a] rounded-[2rem] border border-white/10 overflow-hidden shadow-2xl flex flex-col md:flex-row z-10">

            {/* Left: Content & Info */}
            <div className="w-full md:w-1/2 p-8 md:p-16 relative flex flex-col justify-between min-h-[500px]">
                {/* Decorative gradients */}
                <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-blue-500/5 blur-3xl pointer-events-none" />

                <div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-3 mb-6"
                    >
                        <div className="h-px w-10 bg-blue-500" />
                        <span className="font-orbitron text-blue-500 text-sm tracking-widest uppercase">Get in Touch</span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-bitcount font-bold text-white mb-6 leading-[0.9]"
                    >
                        LET'S START A <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">PROJECT.</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-white/60 text-lg font-light max-w-md leading-relaxed"
                    >
                        Have an idea or a project in mind? I'm currently open to new opportunities and freelance work. Let's build something extraordinary together.
                    </motion.p>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="mt-12 space-y-8"
                >
                    <div className="flex flex-col gap-6">
                        <a href="mailto:anuragmishra262000@gmail.com" className="group flex items-center gap-4 text-white/80 hover:text-white transition-colors">
                            <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-blue-500/20 group-hover:border-blue-500/40 transition-all">
                                <LuMail className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-xs uppercase tracking-widest text-white/40 mb-1">Email</p>
                                <p className="font-orbitron text-sm md:text-base tracking-wider">anuragmishra262000@gmail.com</p>
                            </div>
                        </a>

                        <div className="flex items-center gap-4 text-white/80">
                            <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                                <LuPhone className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-xs uppercase tracking-widest text-white/40 mb-1">Phone</p>
                                <p className="font-orbitron text-sm md:text-base tracking-wider">+91 8818094811</p>
                            </div>
                        </div>
                    </div>

                    {/* Socials */}
                    <div className="flex gap-4 pt-4 border-t border-white/10">
                        <a href="#" className="p-3 bg-white/5 rounded-full hover:bg-white/10 hover:text-blue-400 transition-all"><LuLinkedin className="w-5 h-5" /></a>
                        <a href="#" className="p-3 bg-white/5 rounded-full hover:bg-white/10 hover:text-blue-400 transition-all"><LuGithub className="w-5 h-5" /></a>
                        <a href="#" className="p-3 bg-white/5 rounded-full hover:bg-white/10 hover:text-blue-400 transition-all"><LuTwitter className="w-5 h-5" /></a>
                    </div>
                </motion.div>
            </div>

            {/* Right: Form */}
            <div className="w-full md:w-1/2 bg-white/[0.02] p-8 md:p-16 border-t md:border-t-0 md:border-l border-white/10 relative">
                 <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none" />

                 {status === 'success' ? (
                    <div className="relative z-10 h-full flex flex-col items-center justify-center text-center space-y-6 animate-in fade-in zoom-in duration-500">
                        <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center border border-green-500/20">
                            <FiCheckCircle className="w-10 h-10 text-green-500" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold font-helvetica text-white mb-2">Message Sent!</h3>
                            <p className="text-white/60 max-w-xs mx-auto">Thanks for reaching out. I'll get back to you as soon as possible.</p>
                        </div>
                        <button
                            onClick={() => setStatus('idle')}
                            className="text-sm font-orbitron text-blue-400 hover:text-blue-300 uppercase tracking-widest"
                        >
                            Send another
                        </button>
                    </div>
                 ) : (
                     <form action={handleSubmit} className="relative z-10 space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs uppercase tracking-widest text-white/50 font-orbitron ml-1">Your Name</label>
                            <input
                                name="name"
                                type="text"
                                required
                                className="w-full bg-white/5 border border-white/10 rounded-lg p-4 text-white placeholder-white/20 focus:outline-none focus:border-blue-500/50 focus:bg-blue-500/5 transition-all font-inter"
                                placeholder="John Doe"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs uppercase tracking-widest text-white/50 font-orbitron ml-1">Email Address</label>
                            <input
                                name="email"
                                type="email"
                                required
                                className="w-full bg-white/5 border border-white/10 rounded-lg p-4 text-white placeholder-white/20 focus:outline-none focus:border-blue-500/50 focus:bg-blue-500/5 transition-all font-inter"
                                placeholder="john@example.com"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs uppercase tracking-widest text-white/50 font-orbitron ml-1">Phone Number</label>
                                <input
                                    name="phone"
                                    type="tel"
                                    className="w-full bg-white/5 border border-white/10 rounded-lg p-4 text-white placeholder-white/20 focus:outline-none focus:border-blue-500/50 focus:bg-blue-500/5 transition-all font-inter"
                                    placeholder="+1 (555) 000-0000"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs uppercase tracking-widest text-white/50 font-orbitron ml-1">Company (Optional)</label>
                                <input
                                    name="company"
                                    type="text"
                                    className="w-full bg-white/5 border border-white/10 rounded-lg p-4 text-white placeholder-white/20 focus:outline-none focus:border-blue-500/50 focus:bg-blue-500/5 transition-all font-inter"
                                    placeholder="Company Name"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs uppercase tracking-widest text-white/50 font-orbitron ml-1">Message</label>
                            <textarea
                                name="message"
                                rows="5"
                                required
                                className="w-full bg-white/5 border border-white/10 rounded-lg p-4 text-white placeholder-white/20 focus:outline-none focus:border-blue-500/50 focus:bg-blue-500/5 transition-all font-inter resize-none"
                                placeholder="Tell me about your project..."
                            ></textarea>
                        </div>

                        {status === 'error' && (
                            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-3 text-red-400 text-sm">
                                <FiAlertCircle className="w-5 h-5 flex-shrink-0" />
                                <p>{errorMessage}</p>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={status === 'loading'}
                            className="w-full py-5 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold font-orbitron uppercase tracking-widest rounded-lg hover:shadow-[0_0_20px_rgba(37,99,235,0.3)] disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2"
                        >
                            {status === 'loading' ? (
                                <>
                                    <FiLoader className="w-5 h-5 animate-spin" /> Sending...
                                </>
                            ) : (
                                <>
                                    Send Message
                                    <LuArrowRight className="w-5 h-5" />
                                </>
                            )}
                        </button>
                     </form>
                 )}
            </div>

        </div>
    </section>
    </>
  );
}
