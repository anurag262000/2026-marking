"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
// import TextReveal from "@/components/Projects/TextReveal";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

import { sendEmail } from "./actions"; // Import Server Action

// ... (existing helper code if needed could stay, but we are replacing the component mostly)

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "", // Added phone field
    company: "",
    message: "",
  });

  const [formStatus, setFormStatus] = useState({
    submitting: false,
    submitted: false,
    error: false,
    errorMessage: "", // Added to show specific errors
  });

  const [showSuccessPopup, setShowSuccessPopup] = useState(false); // State for popup

  const [focusedField, setFocusedField] = useState(null);
  const canvasRef = useRef(null);
  const formRef = useRef(null);

  // ... (Particles and GSAP effects remain the same, preserving them)
  // Animated particle background implementation...
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 50;

    const emojis = ["🔥", "💻", "🚀", "💀", "💯", "💅", "✨", "👾", "✌️", "💸", "😎"];

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.fontSize = Math.random() * 16 + 12; // 12px to 28px
        this.speedX = Math.random() * 0.4 - 0.2;
        this.speedY = Math.random() * 0.4 - 0.2;
        this.opacity = Math.random() * 0.3 + 0.1;
        this.emoji = emojis[Math.floor(Math.random() * emojis.length)];
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = Math.random() * 0.02 - 0.01;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.rotation += this.rotationSpeed;

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.font = `${this.fontSize}px sans-serif`;
        ctx.fillText(this.emoji, -this.fontSize / 2, this.fontSize / 2);
        ctx.restore();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });
      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Form animations
  useEffect(() => {
    if (!formRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".form-field", {
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: formRef.current,
          start: "top 70%",
        },
      });
    }, formRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Only allow numbers for phone field
    if (name === 'phone') {
      const numericValue = value.replace(/\D/g, '');
      // Limit to 10 digits
      if (numericValue.length <= 10) {
        setFormData({
          ...formData,
          [name]: numericValue,
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({ submitting: true, submitted: false, error: false, errorMessage: "" });

    // validate phone number
    if (formData.phone.length !== 10) {
      setFormStatus({
        submitting: false,
        submitted: false,
        error: true,
        errorMessage: "Please enter a valid 10-digit phone number."
      });
      return;
    }

    try {
      // Call Server Action
      const result = await sendEmail({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        message: formData.message,
      });

      if (result.success) {
        console.log("Form submitted successfully");
        setFormStatus({ submitting: false, submitted: true, error: false, errorMessage: "" });
        setShowSuccessPopup(true); // Show success popup

        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          message: "",
        });
      } else {
        throw new Error(result.message || "Failed to send message.");
      }

    } catch (error) {
      console.error("FAILED...", error);
      setFormStatus({
        submitting: false,
        submitted: false,
        error: true,
        errorMessage: error.message || "Failed to send message. Please try again later."
      });
    }
  };

  const closePopup = () => {
    setShowSuccessPopup(false);
    setFormStatus({ ...formStatus, submitted: false });
  };

  return (
    <div className="relative min-h-screen overflow-hidden" style={{ backgroundColor: 'var(--off-white)', color: 'var(--pitch-black)' }}>
      {/* Neo-brutalist dot pattern background */}
      <div className="absolute inset-0 bg-dot-brutalist pointer-events-none opacity-20" />
      
      {/* Animated particles - keep for subtle movement */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
        style={{ opacity: 0.15 }}
      />

      {/* Success Popup - Neo-Brutalist */}
      <AnimatePresence>
        {showSuccessPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: 'rgba(17, 17, 17, 0.8)', backdropFilter: 'blur(8px)' }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="rounded-2xl p-8 md:p-10 max-w-md w-full text-center relative overflow-hidden"
              style={{
                backgroundColor: 'var(--pure-white)',
                border: '4px solid var(--pitch-black)',
                boxShadow: '12px 12px 0px var(--pitch-black)'
              }}
            >
              <div 
                className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                style={{
                  backgroundColor: 'var(--neon-yellow)',
                  border: '3px solid var(--pitch-black)',
                  boxShadow: '5px 5px 0px var(--pitch-black)'
                }}
              >
                <svg className="w-10 h-10" fill="none" stroke="var(--pitch-black)" strokeWidth={3} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>

              <h3 className="text-4xl md:text-5xl font-black font-bebas uppercase mb-4" style={{ color: 'var(--pitch-black)' }}>
                VIBE RECEIVED! 📡
              </h3>
              <p className="mb-8 font-space font-medium text-base leading-relaxed" style={{ color: 'var(--pitch-black)', opacity: 0.7 }}>
                Yo! Thanks for hitting me up.<br />
                I will review your message ASAP. No cap! 💯
              </p>

              <button
                onClick={closePopup}
                className="w-full font-space font-black uppercase tracking-wider py-4 rounded-xl transition-all"
                style={{
                  backgroundColor: 'var(--pitch-black)',
                  color: 'var(--neon-yellow)',
                  border: '3px solid var(--pitch-black)',
                  boxShadow: '5px 5px 0px var(--pitch-black)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translate(2px, 2px)';
                  e.currentTarget.style.boxShadow = '3px 3px 0px var(--pitch-black)';
                  e.currentTarget.style.backgroundColor = 'var(--neon-yellow)';
                  e.currentTarget.style.color = 'var(--pitch-black)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translate(0, 0)';
                  e.currentTarget.style.boxShadow = '5px 5px 0px var(--pitch-black)';
                  e.currentTarget.style.backgroundColor = 'var(--pitch-black)';
                  e.currentTarget.style.color = 'var(--neon-yellow)';
                }}
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10">
        {/* Hero Section - Neo-Brutalist */}
        <section className="relative min-h-[60vh] flex items-center justify-center pt-32 pb-20">
          <div className="container mx-auto px-6 md:px-12 text-center">
            {/* Back button - Brutalist */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="absolute top-24 left-6 md:left-12"
            >
              <Link
                href="/"
                className="flex items-center gap-2 px-4 py-2 rounded-lg font-space font-bold uppercase tracking-wider text-sm transition-all"
                style={{
                  backgroundColor: 'var(--pure-white)',
                  color: 'var(--pitch-black)',
                  border: '2px solid var(--pitch-black)',
                  boxShadow: '4px 4px 0px var(--pitch-black)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translate(2px, 2px)';
                  e.currentTarget.style.boxShadow = '2px 2px 0px var(--pitch-black)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translate(0, 0)';
                  e.currentTarget.style.boxShadow = '4px 4px 0px var(--pitch-black)';
                }}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Back
              </Link>
            </motion.div>

            {/* Title */}
            <div className="flex justify-center mb-8">
              <div 
                className="w-24 h-1 rounded-full"
                style={{ backgroundColor: 'var(--neon-yellow)' }}
              />
            </div>

            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black uppercase leading-none mb-6 font-bebas" style={{ color: 'var(--pitch-black)' }}>
              LET'S COOK<br />SOMETHING FIRE 🔥
            </h1>

            <p className="text-lg md:text-xl font-space font-bold uppercase tracking-widest max-w-2xl mx-auto" style={{ color: 'var(--electric-purple)' }}>
              GOT AN IDEA? LET'S MAKE IT LEGENDARY FR
            </p>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="relative py-20 ">
          <div className="container mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">

              {/* Left Side - Info - Neo-Brutalist */}
              <div className="lg:col-span-2 space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <h3 className="text-4xl md:text-5xl font-black uppercase leading-tight mb-4 font-bebas" style={{ color: 'var(--pitch-black)' }}>
                    GET IN TOUCH 📬
                  </h3>
                  <p className="leading-relaxed font-space font-medium" style={{ color: 'var(--pitch-black)', opacity: 0.7 }}>
                    I'm currently available for freelance work and new opportunities.
                    Whether you have a question or just want to say hi, I'll try my
                    best to get back to you!
                  </p>
                </motion.div>

                {/* Contact Info Cards */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="space-y-4"
                >
                  <div 
                    className="p-4 rounded-xl transition-all"
                    style={{
                      border: '3px solid var(--pitch-black)',
                      backgroundColor: 'var(--pure-white)',
                      boxShadow: '5px 5px 0px var(--pitch-black)'
                    }}
                  >
                    <p className="text-xs uppercase tracking-widest font-space font-bold mb-2" style={{ color: 'var(--electric-purple)' }}>
                      📧 Email
                    </p>
                    <a
                      href="mailto:anuragmishra262000@gmail.com"
                      className="text-base font-space font-bold transition-colors hover:underline"
                      style={{ color: 'var(--pitch-black)' }}
                    >
                      anuragmishra262000@gmail.com
                    </a>
                  </div>

                  <div 
                    className="p-4 rounded-xl transition-all"
                    style={{
                      border: '3px solid var(--pitch-black)',
                      backgroundColor: 'var(--pure-white)',
                      boxShadow: '5px 5px 0px var(--pitch-black)'
                    }}
                  >
                    <p className="text-xs uppercase tracking-widest font-space font-bold mb-2" style={{ color: 'var(--electric-purple)' }}>
                      📍 Location
                    </p>
                    <p className="text-base font-space font-bold" style={{ color: 'var(--pitch-black)' }}>
                      Kurukshetra, India
                    </p>
                  </div>

                  <div 
                    className="p-4 rounded-xl transition-all"
                    style={{
                      border: '3px solid var(--pitch-black)',
                      backgroundColor: 'var(--pure-white)',
                      boxShadow: '5px 5px 0px var(--pitch-black)'
                    }}
                  >
                    <p className="text-xs uppercase tracking-widest font-space font-bold mb-3" style={{ color: 'var(--electric-purple)' }}>
                      🔗 Social
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <a
                        href="https://github.com/anurag262000"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-lg font-space font-bold text-xs uppercase tracking-wider transition-all"
                        style={{
                          backgroundColor: 'var(--neon-yellow)',
                          color: 'var(--pitch-black)',
                          border: '2px solid var(--pitch-black)',
                          boxShadow: '3px 3px 0px var(--pitch-black)'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'translate(1px, 1px)';
                          e.currentTarget.style.boxShadow = '2px 2px 0px var(--pitch-black)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'translate(0, 0)';
                          e.currentTarget.style.boxShadow = '3px 3px 0px var(--pitch-black)';
                        }}
                      >
                        GitHub
                      </a>
                      <a
                        href="https://www.linkedin.com/in/anuragmishra26"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-lg font-space font-bold text-xs uppercase tracking-wider transition-all"
                        style={{
                          backgroundColor: 'var(--electric-purple)',
                          color: 'var(--pure-white)',
                          border: '2px solid var(--pitch-black)',
                          boxShadow: '3px 3px 0px var(--pitch-black)'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'translate(1px, 1px)';
                          e.currentTarget.style.boxShadow = '2px 2px 0px var(--pitch-black)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'translate(0, 0)';
                          e.currentTarget.style.boxShadow = '3px 3px 0px var(--pitch-black)';
                        }}
                      >
                        LinkedIn
                      </a>
                      <a
                        href="https://twitter.com/anuragmishra"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-lg font-space font-bold text-xs uppercase tracking-wider transition-all"
                        style={{
                          backgroundColor: 'var(--action-pink)',
                          color: 'var(--pure-white)',
                          border: '2px solid var(--pitch-black)',
                          boxShadow: '3px 3px 0px var(--pitch-black)'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'translate(1px, 1px)';
                          e.currentTarget.style.boxShadow = '2px 2px 0px var(--pitch-black)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'translate(0, 0)';
                          e.currentTarget.style.boxShadow = '3px 3px 0px var(--pitch-black)';
                        }}
                      >
                        Twitter
                      </a>
                    </div>
                  </div>
                </motion.div>

                {/* Availability Badge - Neo-Brutalist */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="inline-flex items-center gap-3 px-6 py-3 rounded-full"
                  style={{
                    backgroundColor: 'var(--neon-yellow)',
                    border: '3px solid var(--pitch-black)',
                    boxShadow: '4px 4px 0px var(--pitch-black)',
                    transform: 'rotate(-2deg)'
                  }}
                >
                  <div className="w-3 h-3 rounded-full animate-pulse" style={{ backgroundColor: 'var(--action-pink)' }} />
                  <span className="text-sm font-space font-black uppercase" style={{ color: 'var(--pitch-black)' }}>
                    Available for work 💼
                  </span>
                </motion.div>
              </div>

              {/* Right Side - Form - Neo-Brutalist */}
              <div className="lg:col-span-3" ref={formRef}>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="rounded-2xl p-8 md:p-12 relative overflow-hidden"
                  style={{
                    backgroundColor: 'var(--pure-white)',
                    border: '4px solid var(--pitch-black)',
                    boxShadow: '8px 8px 0px var(--pitch-black)'
                  }}
                >
                  <form onSubmit={handleSubmit} className="space-y-6 relative z-10">

                    {/* Error Message Display */}
                    {formStatus.error && (
                      <div 
                        className="px-4 py-3 rounded-lg text-sm font-space font-bold"
                        style={{
                          backgroundColor: 'var(--action-pink)',
                          color: 'var(--pure-white)',
                          border: '2px solid var(--pitch-black)',
                          boxShadow: '4px 4px 0px var(--pitch-black)'
                        }}
                      >
                        {formStatus.errorMessage}
                      </div>
                    )}

                    {/* Name Field */}
                    <div className="form-field">
                      <label
                        htmlFor="name"
                        className="block text-sm font-space font-bold uppercase tracking-wider mb-2"
                        style={{ color: 'var(--pitch-black)' }}
                      >
                        Who are you? *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onFocus={(e) => {
                          setFocusedField("name");
                          e.currentTarget.style.boxShadow = '6px 6px 0px var(--pitch-black)';
                          e.currentTarget.style.transform = 'translate(-2px, -2px)';
                        }}
                        onBlur={(e) => {
                          setFocusedField(null);
                          e.currentTarget.style.boxShadow = '3px 3px 0px var(--pitch-black)';
                          e.currentTarget.style.transform = 'translate(0, 0)';
                        }}
                        required
                        className="w-full px-4 py-3 rounded-xl font-space font-semibold transition-all"
                        style={{
                          border: '3px solid var(--pitch-black)',
                          backgroundColor: 'var(--off-white)',
                          color: 'var(--pitch-black)',
                          boxShadow: '3px 3px 0px var(--pitch-black)'
                        }}
                        placeholder="Chad / Stacy"
                      />
                    </div>

                    {/* Email Field */}
                    <div className="form-field">
                      <label
                        htmlFor="email"
                        className="block text-sm font-space font-bold uppercase tracking-wider mb-2"
                        style={{ color: 'var(--pitch-black)' }}
                      >
                        Where can I spam you? *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={(e) => {
                          setFocusedField("email");
                          e.currentTarget.style.boxShadow = '6px 6px 0px var(--pitch-black)';
                          e.currentTarget.style.transform = 'translate(-2px, -2px)';
                        }}
                        onBlur={(e) => {
                          setFocusedField(null);
                          e.currentTarget.style.boxShadow = '3px 3px 0px var(--pitch-black)';
                          e.currentTarget.style.transform = 'translate(0, 0)';
                        }}
                        required
                        className="w-full px-4 py-3 rounded-xl font-space font-semibold transition-all"
                        style={{
                          border: '3px solid var(--pitch-black)',
                          backgroundColor: 'var(--off-white)',
                          color: 'var(--pitch-black)',
                          boxShadow: '3px 3px 0px var(--pitch-black)'
                        }}
                        placeholder="chad@example.com"
                      />
                    </div>

                    {/* Phone Field */}
                    <div className="form-field">
                      <label
                        htmlFor="phone"
                        className="block text-sm font-space font-bold uppercase tracking-wider mb-2"
                        style={{ color: 'var(--pitch-black)' }}
                      >
                        Digits? *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        onFocus={(e) => {
                          setFocusedField("phone");
                          e.currentTarget.style.boxShadow = '6px 6px 0px var(--pitch-black)';
                          e.currentTarget.style.transform = 'translate(-2px, -2px)';
                        }}
                        onBlur={(e) => {
                          setFocusedField(null);
                          e.currentTarget.style.boxShadow = '3px 3px 0px var(--pitch-black)';
                          e.currentTarget.style.transform = 'translate(0, 0)';
                        }}
                        required
                        className="w-full px-4 py-3 rounded-xl font-space font-semibold transition-all"
                        style={{
                          border: '3px solid var(--pitch-black)',
                          backgroundColor: 'var(--off-white)',
                          color: 'var(--pitch-black)',
                          boxShadow: '3px 3px 0px var(--pitch-black)'
                        }}
                        placeholder="10 digit number fr fr"
                      />
                    </div>

                    {/* Company Field */}
                    <div className="form-field">
                      <label
                        htmlFor="company"
                        className="block text-sm font-space font-bold uppercase tracking-wider mb-2"
                        style={{ color: 'var(--pitch-black)' }}
                      >
                        Your Crew / Gang
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        onFocus={(e) => {
                          setFocusedField("company");
                          e.currentTarget.style.boxShadow = '6px 6px 0px var(--pitch-black)';
                          e.currentTarget.style.transform = 'translate(-2px, -2px)';
                        }}
                        onBlur={(e) => {
                          setFocusedField(null);
                          e.currentTarget.style.boxShadow = '3px 3px 0px var(--pitch-black)';
                          e.currentTarget.style.transform = 'translate(0, 0)';
                        }}
                        className="w-full px-4 py-3 rounded-xl font-space font-semibold transition-all"
                        style={{
                          border: '3px solid var(--pitch-black)',
                          backgroundColor: 'var(--off-white)',
                          color: 'var(--pitch-black)',
                          boxShadow: '3px 3px 0px var(--pitch-black)'
                        }}
                        placeholder="Slay Inc."
                      />
                    </div>

                    {/* Message Field */}
                    <div className="form-field">
                      <label
                        htmlFor="message"
                        className="block text-sm font-space font-bold uppercase tracking-wider mb-2"
                        style={{ color: 'var(--pitch-black)' }}
                      >
                        What's the tea? *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        onFocus={(e) => {
                          setFocusedField("message");
                          e.currentTarget.style.boxShadow = '6px 6px 0px var(--pitch-black)';
                          e.currentTarget.style.transform = 'translate(-2px, -2px)';
                        }}
                        onBlur={(e) => {
                          setFocusedField(null);
                          e.currentTarget.style.boxShadow = '3px 3px 0px var(--pitch-black)';
                          e.currentTarget.style.transform = 'translate(0, 0)';
                        }}
                        required
                        rows={6}
                        className="w-full px-4 py-3 rounded-xl font-space font-semibold transition-all resize-none"
                        style={{
                          border: '3px solid var(--pitch-black)',
                          backgroundColor: 'var(--off-white)',
                          color: 'var(--pitch-black)',
                          boxShadow: '3px 3px 0px var(--pitch-black)'
                        }}
                        placeholder="Spill the tea... (min. 10 characters or you get filtered)"
                      />
                    </div>

                    {/* Submit Button */}
                    <motion.button
                      type="submit"
                      disabled={formStatus.submitting}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full font-space font-black uppercase tracking-wider py-4 rounded-xl flex items-center justify-center gap-3 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{
                        backgroundColor: 'var(--neon-yellow)',
                        color: 'var(--pitch-black)',
                        border: '3px solid var(--pitch-black)',
                        boxShadow: '5px 5px 0px var(--pitch-black)'
                      }}
                      onMouseEnter={(e) => {
                        if (!formStatus.submitting) {
                          e.currentTarget.style.transform = 'translate(2px, 2px)';
                          e.currentTarget.style.boxShadow = '3px 3px 0px var(--pitch-black)';
                          e.currentTarget.style.backgroundColor = 'var(--pitch-black)';
                          e.currentTarget.style.color = 'var(--neon-yellow)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translate(0, 0)';
                        e.currentTarget.style.boxShadow = '5px 5px 0px var(--pitch-black)';
                        e.currentTarget.style.backgroundColor = 'var(--neon-yellow)';
                        e.currentTarget.style.color = 'var(--pitch-black)';
                      }}
                    >
                      {formStatus.submitting ? (
                        <>
                          <div 
                            className="w-5 h-5 rounded-full animate-spin"
                            style={{
                              border: '3px solid var(--pitch-black)',
                              borderTopColor: 'transparent'
                            }}
                          />
                          VIBING...
                        </>
                      ) : (
                        <>
                          SEND IT! 🚀
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M14 5l7 7m0 0l-7 7m7-7H3"
                            />
                          </svg>
                        </>
                      )}
                    </motion.button>
                  </form>
                </motion.div>
              </div>

            </div>
          </div>
        </section>

        {/* Footer - Neo-Brutalist */}
        <section className="relative py-16" style={{ borderTop: '3px solid var(--pitch-black)' }}>
          <div className="container mx-auto px-6 md:px-12 text-center">
            <p className="text-sm font-space font-bold uppercase tracking-wider" style={{ color: 'var(--pitch-black)', opacity: 0.5 }}>
              © 2026 Anurag Mishra. All rights reserved. 💯
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ContactPage;

// test
