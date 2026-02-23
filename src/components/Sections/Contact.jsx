'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AuroraCore } from '@/components/ui/AuroraCore';
import { LuArrowRight, LuMail, LuPhone, LuLinkedin, LuGithub, LuMapPin, LuSend } from 'react-icons/lu';
import { FiCheckCircle, FiAlertCircle, FiLoader } from 'react-icons/fi';
import { sendEmail } from '@/app/contact/actions';

const contactCards = [
  {
    icon: LuMail,
    label: 'Email',
    value: 'anuragmishra262000@gmail.com',
    href: 'mailto:anuragmishra262000@gmail.com',
    color: 'blue',
    breakAll: true,
  },
  {
    icon: LuPhone,
    label: 'WhatsApp',
    value: '+91 8818094811',
    href: 'https://wa.me/918818094811',
    color: 'green',
    external: true,
  },
  {
    icon: LuMapPin,
    label: 'Location',
    value: 'Kurukshetra, India',
    href: null,
    color: 'purple',
  },
];

const colorMap = {
  blue:   { glow: 'group-hover:shadow-blue-500/20',   icon: 'group-hover:bg-blue-500/20 group-hover:border-blue-500/50 group-hover:text-blue-400',  dot: 'bg-blue-500' },
  green:  { glow: 'group-hover:shadow-green-500/20',  icon: 'group-hover:bg-green-500/20 group-hover:border-green-500/50 group-hover:text-green-400', dot: 'bg-green-500' },
  purple: { glow: 'group-hover:shadow-purple-500/20', icon: 'group-hover:bg-purple-500/20 group-hover:border-purple-500/50 group-hover:text-purple-400',dot: 'bg-purple-500' },
};

export default function Contact() {
  const containerRef = useRef(null);
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [focused, setFocused] = useState(null);

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

  const inputClass = (name) =>
    `w-full bg-white/[0.04] border rounded-xl px-4 py-3.5 text-white placeholder-white/20 focus:outline-none transition-all duration-300 font-light text-sm ${
      focused === name
        ? 'border-blue-500/60 bg-blue-500/5 shadow-[0_0_0_3px_rgba(59,130,246,0.08)]'
        : 'border-white/10 hover:border-white/20'
    }`;

  return (
    <>
      {/* ── Page Entry Loader ── */}
      <AnimatePresence>
        {isPageLoading && (
          <motion.div
            key="contact-loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black"
          >
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
              <div className="absolute inset-0 flex items-center justify-center">
                <LuMail className="w-6 h-6 text-white/80" />
              </div>
            </div>
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="font-orbitron text-xs uppercase tracking-[0.4em] text-white/50 mb-6"
            >
              Contact
            </motion.p>
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

      {/* ── Main Section ── */}
      <section
        id="contact"
        ref={containerRef}
        className="relative w-full min-h-screen flex items-center justify-center bg-black pb-24 overflow-hidden pt-28"
      >
        {/* Background aurora */}
        <div className="absolute inset-0 w-full h-full pointer-events-none opacity-25 blur-3xl">
          <AuroraCore
            id="tsparticlescontact"
            background="transparent"
            particleDensity={3}
            className="w-full h-full"
            blur={80}
            speed={0.3}
          />
        </div>

        {/* Extra glow blobs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative w-[95%] max-w-6xl z-10">

          {/* ── Section header ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/5 text-blue-400 font-orbitron text-xs uppercase tracking-widest mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              Available for work
            </span>
            <h2 className="text-5xl md:text-7xl font-bitcount font-bold text-white leading-[0.95] mb-4">
              LET'S BUILD{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-[length:200%] animate-gradient">
                SOMETHING
              </span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                EXTRAORDINARY.
              </span>
            </h2>
            <p className="text-white/50 text-base md:text-lg font-light max-w-lg mx-auto leading-relaxed">
              Have an idea? I'm open to freelance work and new opportunities.
            </p>
          </motion.div>

          {/* ── Card grid ── */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

            {/* Left panel */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-2 flex flex-col gap-4"
            >
              {/* Contact cards */}
              {contactCards.map(({ icon: Icon, label, value, href, color, external, breakAll }) => {
                const c = colorMap[color];
                const inner = (
                  <motion.div
                    whileHover={{ y: -2 }}
                    className={`group flex items-center gap-4 p-5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-sm cursor-pointer transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06] hover:shadow-xl ${c.glow}`}
                  >
                    <div className={`w-12 h-12 min-w-[3rem] min-h-[3rem] rounded-full bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 text-white/60 transition-all duration-300 ${c.icon}`}>
                      <Icon className="w-5 h-5 flex-shrink-0" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] uppercase tracking-widest text-white/35 mb-0.5 font-orbitron">{label}</p>
                      <p className={`text-sm text-white/90 font-orbitron tracking-wide leading-snug ${breakAll ? 'break-all' : ''}`}>
                        {value}
                      </p>
                    </div>
                  </motion.div>
                );

                return href ? (
                  <a
                    key={label}
                    href={href}
                    target={external ? '_blank' : undefined}
                    rel={external ? 'noopener noreferrer' : undefined}
                  >
                    {inner}
                  </a>
                ) : (
                  <div key={label}>{inner}</div>
                );
              })}

              {/* Socials */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="p-5 rounded-2xl bg-white/[0.03] border border-white/10"
              >
                <p className="text-[10px] uppercase tracking-widest text-white/35 mb-4 font-orbitron">Find me on</p>
                <div className="flex gap-3">
                  {[
                    { icon: LuLinkedin, href: 'https://www.linkedin.com/in/anuragmishra26', label: 'LinkedIn', color: 'hover:bg-blue-500/20 hover:border-blue-500/40 hover:text-blue-400' },
                    { icon: LuGithub,   href: 'https://github.com/anurag262000', label: 'GitHub',   color: 'hover:bg-white/10 hover:border-white/30 hover:text-white' },
                  ].map(({ icon: Icon, href, label, color }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className={`group flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white/50 transition-all duration-300 ${color}`}
                    >
                      <Icon className="w-4 h-4 flex-shrink-0" />
                      <span className="text-xs font-orbitron tracking-wider">{label}</span>
                    </a>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Right panel — Form */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-3"
            >
              {/* Glowing border wrapper */}
              <div className="relative rounded-2xl p-[1px] bg-gradient-to-br from-blue-500/30 via-purple-500/20 to-transparent">
                <div className="relative rounded-2xl bg-[#08080f] p-7 md:p-10 overflow-hidden">
                  {/* Noise texture */}
                  <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none rounded-2xl" />
                  {/* Inner glow */}
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />

                  {status === 'success' ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col items-center justify-center text-center space-y-6 py-16"
                    >
                      <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center border border-green-500/20">
                        <FiCheckCircle className="w-10 h-10 text-green-400" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold font-helvetica text-white mb-2">Message Sent!</h3>
                        <p className="text-white/50 max-w-xs mx-auto text-sm leading-relaxed">
                          Thanks for reaching out. I'll get back to you as soon as possible.
                        </p>
                      </div>
                      <button
                        onClick={() => setStatus('idle')}
                        className="text-xs font-orbitron text-blue-400 hover:text-blue-300 uppercase tracking-widest border border-blue-500/30 px-5 py-2 rounded-full hover:bg-blue-500/10 transition-all"
                      >
                        Send another
                      </button>
                    </motion.div>
                  ) : (
                    <form action={handleSubmit} className="relative z-10 space-y-5">
                      <div className="mb-2">
                        <h3 className="text-lg font-bold text-white font-helvetica">Send a Message</h3>
                        <p className="text-white/35 text-xs mt-1">Fill in the details and I'll get back to you shortly.</p>
                      </div>

                      {/* Name + Email row */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-[10px] uppercase tracking-widest text-white/40 font-orbitron">Your Name *</label>
                          <input
                            name="name" type="text" required
                            placeholder="John Doe"
                            className={inputClass('name')}
                            onFocus={() => setFocused('name')}
                            onBlur={() => setFocused(null)}
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] uppercase tracking-widest text-white/40 font-orbitron">Email Address *</label>
                          <input
                            name="email" type="email" required
                            placeholder="john@example.com"
                            className={inputClass('email')}
                            onFocus={() => setFocused('email')}
                            onBlur={() => setFocused(null)}
                          />
                        </div>
                      </div>

                      {/* Phone + Company row */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-[10px] uppercase tracking-widest text-white/40 font-orbitron">Phone Number</label>
                          <input
                            name="phone" type="tel"
                            placeholder="+91 98765 43210"
                            className={inputClass('phone')}
                            onFocus={() => setFocused('phone')}
                            onBlur={() => setFocused(null)}
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] uppercase tracking-widest text-white/40 font-orbitron">Company</label>
                          <input
                            name="company" type="text"
                            placeholder="Your Company"
                            className={inputClass('company')}
                            onFocus={() => setFocused('company')}
                            onBlur={() => setFocused(null)}
                          />
                        </div>
                      </div>

                      {/* Message */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase tracking-widest text-white/40 font-orbitron">Your Message *</label>
                        <textarea
                          name="message" rows="5" required
                          placeholder="Tell me about your project..."
                          className={`${inputClass('message')} resize-none`}
                          onFocus={() => setFocused('message')}
                          onBlur={() => setFocused(null)}
                        />
                      </div>

                      {/* Error */}
                      {status === 'error' && (
                        <motion.div
                          initial={{ opacity: 0, y: -6 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-400 text-sm"
                        >
                          <FiAlertCircle className="w-5 h-5 flex-shrink-0" />
                          <p>{errorMessage}</p>
                        </motion.div>
                      )}

                      {/* Submit */}
                      <motion.button
                        type="submit"
                        disabled={status === 'loading'}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        className="group w-full relative py-4 rounded-xl font-orbitron uppercase tracking-widest text-sm font-bold overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {/* gradient bg */}
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 transition-opacity duration-300" />
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        {/* top shine */}
                        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                        <span className="relative z-10 flex items-center justify-center gap-2 text-white">
                          {status === 'loading' ? (
                            <>
                              <FiLoader className="w-4 h-4 animate-spin" />
                              Sending...
                            </>
                          ) : (
                            <>
                              Send Message
                              <LuSend className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                            </>
                          )}
                        </span>
                      </motion.button>
                    </form>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
