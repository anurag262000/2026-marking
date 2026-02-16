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

import emailjs from "@emailjs/browser"; // Import EmailJS

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

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random() * 0.5 + 0.2;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }

      draw() {
        ctx.fillStyle = `rgba(251, 146, 60, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
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

    // EmailJS Configuration
    const serviceId = "service_9nh1qbx"; // Replace with actual Service ID
    const templateId = "template_enrie8m"; // Replace with actual Template ID
    const publicKey = "-OQAEjLTyf0-nLXIc"; // Replace with actual Public Key

    // Template parameters matching the user's template
    const templateParams = {
      user_name: formData.name,
      user_email: formData.email,
      user_phone: formData.phone,
      user_company: formData.company,
      user_message: formData.message,
    };

    try {
      await emailjs.send(serviceId, templateId, templateParams, publicKey);

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

    } catch (error) {
      console.error("FAILED...", error);
      setFormStatus({
        submitting: false,
        submitted: false,
        error: true,
        errorMessage: "Failed to send message. Please try again later."
      });
    }
  };

  const closePopup = () => {
    setShowSuccessPopup(false);
    setFormStatus({ ...formStatus, submitted: false });
  };

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Animated background and gradients ... */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
        style={{ opacity: 0.3 }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-purple-500/10 z-0" />
      <div className="absolute inset-0 bg-dot-thick-neutral-800 z-0" />

      {/* Success Popup */}
      <AnimatePresence>
        {showSuccessPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-zinc-950/90 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 max-w-md w-full text-center shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-purple-500/10 pointer-events-none" />

              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>

              <h3 className="text-3xl md:text-4xl font-helvetica font-light mb-4 text-white">Message Sent!</h3>
              <p className="text-white/80 mb-8 font-orbitron text-0.9rem tracking-wider leading-relaxed">
                Thank you for reaching out.<br />
                I'll get back to you as soon as possible.
              </p>

              <button
                onClick={closePopup}
                className="w-full bg-white text-black font-orbitron uppercase tracking-widest py-4 rounded-xl hover:bg-gray-200 transition-colors font-bold shadow-lg"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10">
        {/* ... Hero Section code ... */}
        <section className="relative min-h-[60vh] flex items-center justify-center pt-32 pb-20">
          <div className="container mx-auto px-6 md:px-12 text-center">
            {/* Back button */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="absolute top-24 left-6 md:left-12"
            >
              <Link
                href="/"
                className="flex items-center gap-2 text-white/60 hover:text-white transition-colors group"
              >
                <svg
                  className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                <span className="font-orbitron text-sm uppercase tracking-wider">
                  Back
                </span>
              </Link>
            </motion.div>

            {/* Title */}
            <div className="flex justify-center mb-8">
              <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-orange-500 to-transparent"></div>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-helvetica font-thin italic mb-6 leading-tight">
              Let's Work Together
            </h1>

            <p className="text-lg md:text-xl text-white/60 font-orbitron uppercase tracking-widest max-w-2xl mx-auto">
              Have a project in mind? Let's talk
            </p>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="relative py-20">
          <div className="container mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">

              {/* Left Side - Info */}
              <div className="lg:col-span-2 space-y-8">
                {/* ... Intro text ... */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <h3 className="text-3xl md:text-4xl font-helvetica font-thin italic mb-4">
                    Get in Touch
                  </h3>
                  <p className="text-white/70 leading-relaxed">
                    I'm currently available for freelance work and new opportunities.
                    Whether you have a question or just want to say hi, I'll try my
                    best to get back to you!
                  </p>
                </motion.div>

                {/* Contact Info */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="space-y-6"
                >
                  <div className="space-y-2">
                    <p className="text-xs text-white/40 uppercase tracking-widest font-orbitron">
                      Email
                    </p>
                    <a
                      href="mailto:anuragmishra262000@gmail.com"
                      className="text-lg text-white hover:text-orange-400 transition-colors"
                    >
                      anuragmishra262000@gmail.com
                    </a>
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs text-white/40 uppercase tracking-widest font-orbitron">
                      Location
                    </p>
                    <p className="text-lg text-white/80">
                      Kurukshetra, India
                    </p>
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs text-white/40 uppercase tracking-widest font-orbitron">
                      Social
                    </p>
                    <div className="flex gap-4">
                      {/* ... Social Links ... */}
                      <a
                        href="https://github.com/anurag262000"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/60 hover:text-orange-400 transition-colors"
                      >
                        GitHub
                      </a>
                      <a
                        href="https://www.linkedin.com/in/anuragmishra26"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/60 hover:text-orange-400 transition-colors"
                      >
                        LinkedIn
                      </a>
                      <a
                        href="https://twitter.com/anuragmishra"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/60 hover:text-orange-400 transition-colors"
                      >
                        Twitter
                      </a>
                    </div>
                  </div>
                </motion.div>

                {/* Availability Badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="inline-flex items-center gap-3 px-6 py-3 bg-green-500/10 border border-green-500/20 rounded-full"
                >
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-sm text-green-400 font-orbitron">
                    Available for work
                  </span>
                </motion.div>
              </div>

              {/* Right Side - Form */}
              <div className="lg:col-span-3" ref={formRef}>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 md:p-12 relative overflow-hidden group"
                >
                  {/* Animated border glow */}
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 via-orange-500/20 to-orange-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  <form onSubmit={handleSubmit} className="space-y-6 relative z-10">

                    {/* Explicit Error Message Display */}
                    {formStatus.error && (
                      <div className="bg-red-500/10 border border-red-500/20 text-red-500 px-4 py-3 rounded-lg text-sm font-orbitron">
                        {formStatus.errorMessage}
                      </div>
                    )}

                    {/* Name Field */}
                    <div className="form-field">
                      <label
                        htmlFor="name"
                        className="block text-sm font-orbitron uppercase tracking-wider text-white/70 mb-2"
                      >
                        Your Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("name")}
                        onBlur={() => setFocusedField(null)}
                        required
                        className={`w-full bg-white/5 border ${focusedField === "name"
                          ? "border-orange-500"
                          : "border-white/20"
                          } rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-orange-500 transition-all duration-300`}
                        placeholder="John Doe"
                      />
                    </div>

                    {/* Email Field */}
                    <div className="form-field">
                      <label
                        htmlFor="email"
                        className="block text-sm font-orbitron uppercase tracking-wider text-white/70 mb-2"
                      >
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("email")}
                        onBlur={() => setFocusedField(null)}
                        required
                        className={`w-full bg-white/5 border ${focusedField === "email"
                          ? "border-orange-500"
                          : "border-white/20"
                          } rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-orange-500 transition-all duration-300`}
                        placeholder="john@example.com"
                      />
                    </div>

                    {/* Phone Field */}
                    <div className="form-field">
                      <label
                        htmlFor="phone"
                        className="block text-sm font-orbitron uppercase tracking-wider text-white/70 mb-2"
                      >
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("phone")}
                        onBlur={() => setFocusedField(null)}
                        required
                        className={`w-full bg-white/5 border ${focusedField === "phone"
                          ? "border-orange-500"
                          : "border-white/20"
                          } rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-orange-500 transition-all duration-300`}
                        placeholder="9876543210"
                      />
                    </div>

                    {/* Company Field */}
                    <div className="form-field">
                      {/* Wrapper to match layout */}
                      <label
                        htmlFor="company"
                        className="block text-sm font-orbitron uppercase tracking-wider text-white/70 mb-2"
                      >
                        Company / Organization
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("company")}
                        onBlur={() => setFocusedField(null)}
                        className={`w-full bg-white/5 border ${focusedField === "company"
                          ? "border-orange-500"
                          : "border-white/20"
                          } rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-orange-500 transition-all duration-300`}
                        placeholder="Your Company"
                      />
                    </div>


                    {/* Message Field */}
                    <div className="form-field">
                      <label
                        htmlFor="message"
                        className="block text-sm font-orbitron uppercase tracking-wider text-white/70 mb-2"
                      >
                        Your Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("message")}
                        onBlur={() => setFocusedField(null)}
                        required
                        rows={6}
                        className={`w-full bg-white/5 border ${focusedField === "message"
                          ? "border-orange-500"
                          : "border-white/20"
                          } rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-orange-500 transition-all duration-300 resize-none`}
                        placeholder="Tell me about your project..."
                      />
                    </div>

                    {/* Submit Button */}
                    <motion.button
                      type="submit"
                      disabled={formStatus.submitting}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-orbitron uppercase tracking-wider py-4 rounded-lg flex items-center justify-center gap-3 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
                    >
                      {formStatus.submitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <svg
                            className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M14 5l7 7m0 0l-7 7m7-7H3"
                            />
                          </svg>
                        </>
                      )}
                    </motion.button>
                  </form>
                </motion.div>
              </div> // End right side

            </div>
          </div>
        </section>

        {/* Footer */}
        <section className="relative py-16 border-t border-white/10">
          <div className="container mx-auto px-6 md:px-12 text-center">
            <p className="text-white/40 text-sm">
              © 2026 Anurag Mishra. All rights reserved.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ContactPage;
