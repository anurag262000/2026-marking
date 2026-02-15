'use client';

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AuroraCore } from '@/components/ui/AuroraCore';
import { LuArrowRight, LuMail, LuPhone, LuLinkedin, LuGithub, LuTwitter } from 'react-icons/lu';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const containerRef = useRef(null);

  return (
    <section id="contact" ref={containerRef} className="relative w-full min-h-screen flex items-center justify-center bg-black py-20 overflow-hidden">

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
                                <p className="font-orbitron text-sm md:text-base tracking-wider">+91 999 999 9999</p>
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

                 <form className="relative z-10 space-y-6">
                    <div className="space-y-2">
                        <label className="text-xs uppercase tracking-widest text-white/50 font-orbitron ml-1">Your Name</label>
                        <input
                            type="text"
                            className="w-full bg-white/5 border border-white/10 rounded-lg p-4 text-white placeholder-white/20 focus:outline-none focus:border-blue-500/50 focus:bg-blue-500/5 transition-all font-inter"
                            placeholder="John Doe"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs uppercase tracking-widest text-white/50 font-orbitron ml-1">Email Address</label>
                        <input
                            type="email"
                            className="w-full bg-white/5 border border-white/10 rounded-lg p-4 text-white placeholder-white/20 focus:outline-none focus:border-blue-500/50 focus:bg-blue-500/5 transition-all font-inter"
                            placeholder="john@example.com"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs uppercase tracking-widest text-white/50 font-orbitron ml-1">Message</label>
                        <textarea
                            rows="5"
                            className="w-full bg-white/5 border border-white/10 rounded-lg p-4 text-white placeholder-white/20 focus:outline-none focus:border-blue-500/50 focus:bg-blue-500/5 transition-all font-inter resize-none"
                            placeholder="Tell me about your project..."
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-5 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold font-orbitron uppercase tracking-widest rounded-lg hover:shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2"
                    >
                        Send Message
                        <LuArrowRight className="w-5 h-5" />
                    </button>
                 </form>
            </div>

        </div>
    </section>
  );
}
