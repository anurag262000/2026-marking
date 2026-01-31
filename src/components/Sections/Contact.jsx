'use client';

import React from 'react';
import { motion } from 'framer-motion';
import './Contact.css';

export default function Contact() {
  return (
    <section id="contact" className="contact-section">
      <div className="contact-container">

        <div className="contact-left">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="contact-title font-bitcount"
          >
            Let's Start a<br/>Project Together
          </motion.h2>

          <p className="contact-desc font-inter">
            Have an idea? I'm currently available for freelance work and open to new opportunities.
          </p>

          <div className="contact-info">
             <div className="info-item">
               <span className="info-label font-inter">Email</span>
               <a href="mailto:anuragmishra262000@gmail.com" className="info-value font-inter">anuragmishra262000@gmail.com</a>
             </div>
             <div className="info-item">
               <span className="info-label font-inter">Phone / WhatsApp</span>
               <p className="info-value font-inter">+91 999 999 9999</p>
             </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="contact-form-wrapper"
        >
          <form className="contact-form">
            <div className="form-group">
              <label className="font-inter">Name</label>
              <input type="text" placeholder="John Doe" className="font-inter" />
            </div>

            <div className="form-group">
              <label className="font-inter">Email</label>
              <input type="email" placeholder="john@example.com" className="font-inter" />
            </div>

            <div className="form-group">
              <label className="font-inter">Message</label>
              <textarea placeholder="Tell me about your project..." rows="4" className="font-inter"></textarea>
            </div>

            <button type="submit" className="submit-btn font-bitcount">
              Send Message
              <span className="btn-arrow">→</span>
            </button>
          </form>
        </motion.div>

      </div>
    </section>
  );
}
