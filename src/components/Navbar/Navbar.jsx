'use client';

import { useState } from 'react';
import './Navbar.css';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: 'Home', number: '01', href: '#home' },
    { name: 'Work', number: '02', href: '#work' },
    { name: 'About', number: '03', href: '#about' },
    { name: 'Contact', number: '04', href: '#contact' },
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleMenuClick = (href) => {
    setIsOpen(false);
    // Smooth scroll to section
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Hamburger Button - Bottom Right */}
      <button
        className={`hamburger-button ${isOpen ? 'active' : ''}`}
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <div className="hamburger-icon">
          <span className="bar bar-1"></span>
          <span className="bar bar-2"></span>
          <span className="bar bar-3"></span>
        </div>
        <span className="menu-label">{isOpen ? 'Close' : 'Menu'}</span>
      </button>

      {/* Fullscreen Overlay Menu - Opens Bottom to Top */}
      <div className={`fullscreen-menu ${isOpen ? 'open' : ''}`}>
        {/* Animated Background Shapes */}
        <div className="menu-bg-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </div>

        {/* Menu Content */}
        <nav className="menu-content">
          <ul className="menu-list">
            {menuItems.map((item, index) => (
              <li
                key={item.number}
                className="menu-item"
                style={{
                  transitionDelay: isOpen ? `${index * 0.1 + 0.2}s` : `${(3 - index) * 0.05}s`
                }}
              >
                <a
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleMenuClick(item.href);
                  }}
                  className="menu-link"
                >
                  <span className="menu-number">{item.number}</span>
                  <span className="menu-name">{item.name}</span>
                  <span className="menu-arrow">→</span>
                </a>
              </li>
            ))}
          </ul>

          {/* Menu Footer Info */}
          <div className="menu-footer">
            <div className="menu-footer-item">
              <span className="footer-label">Email</span>
              <a href="mailto:hello@example.com" className="footer-link">hello@example.com</a>
            </div>
            <div className="menu-footer-item">
              <span className="footer-label">Follow</span>
              <div className="social-links">
                <a href="#" className="social-link">Twitter</a>
                <a href="#" className="social-link">LinkedIn</a>
                <a href="#" className="social-link">GitHub</a>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
