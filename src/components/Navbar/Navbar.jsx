'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import './Navbar.css';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: 'Projects', number: '01', href: '/projects', type: 'link' },
    { name: 'About', number: '02', href: '/#about', type: 'scroll' },
    { name: 'Contact', number: '03', href: '/contact', type: 'link' },
  ];

  const socialItems = [
    { label: 'GitHub', href: 'https://github.com/anuragmishra262000' },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/anuragmishra262000' },
    { label: 'Portfolio', href: 'https://anurag.dev' },
  ];



  const projectItems = [
    { label: 'Business Card CRM', color: 'exp-pill-1' },
    { label: 'Auth System v2', color: 'exp-pill-2' },
    { label: 'Indiefluence App', color: 'exp-pill-3' },
    { label: '3D Portfolio', color: 'exp-pill-4' },
  ];

  const toggleMenu = () => setIsOpen(o => !o);

  const handleMenuClick = (item) => {
    setIsOpen(false);

    if (item.type === 'scroll') {
      // Extract hash from href (e.g., '/#about' -> '#about')
      const hash = item.href.split('#')[1];
      if (hash) {
        // If we're on home page, scroll to section
        if (window.location.pathname === '/') {
          const element = document.getElementById(hash);
          element?.scrollIntoView({ behavior: 'smooth' });
        } else {
          // If on another page, navigate to home then scroll
          window.location.href = item.href;
        }
      }
    }
  };

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      <button
        className={`hamburger-button ${isOpen ? 'active' : ''}`}
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <span className="nav-logo font-bitcount">ANURAG</span>
        <div className="hamburger-icon">
          <span className="bar bar-1" />
          <span className="bar bar-2" />
          <span className="bar bar-3" />
        </div>
      </button>

      <div className={`fullscreen-menu ${isOpen ? 'open' : ''}`}>
        <div className="menu-bg" />

        <div className="menu-shell">
          <aside className="menu-left">

            <div className="discover-block">
              <p className="discover-title">Featured Projects</p>
              <div className="experience-pills">
                {projectItems.map((proj) => (
                  <button
                    key={proj.label}
                    className={`experience-pill ${proj.color}`}
                  >
                    <span className="experience-pill-label">{proj.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="discover-block social-block">
              <p className="discover-title">Follow</p>
              <div className="social-pill-row">
                {socialItems.map((item, i) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className={`experience-pill social-pill social-pill-${i + 1}`}
                  >
                    <span className="experience-pill-label">
                      {item.label}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </aside>

          <main className="menu-main">
            <nav className="menu-main-nav">
              <ul className="menu-main-list">
                {menuItems.map((item, index) => (
                  <li
                    key={item.number}
                    className="menu-main-item"
                    style={{
                      transitionDelay: isOpen
                        ? `${index * 0.08 + 0.2}s`
                        : '0s',
                    }}
                  >
                    {item.type === 'link' ? (
                      <Link
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="menu-main-link"
                      >
                        <span className="menu-main-number">
                          {item.number}
                        </span>
                        <span className="menu-main-name font-bitcount">
                          {item.name}
                        </span>
                        <span className="menu-main-arrow">→</span>
                      </Link>
                    ) : (
                      <a
                        href={item.href}
                        onClick={(e) => {
                          e.preventDefault();
                          handleMenuClick(item);
                        }}
                        className="menu-main-link"
                      >
                        <span className="menu-main-number">
                          {item.number}
                        </span>
                        <span className="menu-main-name font-bitcount">
                          {item.name}
                        </span>
                        <span className="menu-main-arrow">→</span>
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </nav>

            <footer className="menu-footer-row">
              <Link
                href="/projects"
                className="footer-text-link"
                onClick={() => setIsOpen(false)}
              >
                Projects
              </Link>
              <a
                href="#blog"
                className="footer-text-link"
                onClick={(e) => {
                  e.preventDefault();
                  setIsOpen(false);
                  document.getElementById('blog')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Blog
              </a>
              <Link
                href="/contact"
                className="footer-text-link"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
              <a
                href="#"
                className="footer-text-link"
                target="_blank"
                rel="noreferrer"
              >
                Resume
              </a>
            </footer>
          </main>
        </div>
      </div>
    </>
  );
}
