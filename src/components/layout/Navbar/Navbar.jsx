'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
import './Navbar.css';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: 'Home', number: '00', href: '/', type: 'link' },
    { name: 'Projects', number: '01', href: '/projects', type: 'link' },
    { name: 'Review', number: '02', href: '/review', type: 'link' },
    { name: 'About', number: '03', href: '/about', type: 'link' },
    { name: 'Contact', number: '04', href: '/contact', type: 'link' },
  ];

// ... (skipping some lines for brevity in instruction, but replacing the whole block)

            <div className="discover-block">
              <p className="discover-title">Featured Projects</p>
              <div className="experience-pills">
                {projectItems.map((proj) => (
                  <Link
                    key={proj.label}
                    href={`/projects?id=${proj.id}`}
                    scroll={false}
                    onClick={() => setIsOpen(false)}
                    className={`experience-pill ${proj.color}`}
                  >
                    <span className="experience-pill-label">{proj.label}</span>
                  </Link>
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
              {/* <a
                href="#blog"
                className="footer-text-link"
                onClick={(e) => {
                  e.preventDefault();
                  setIsOpen(false);
                  document.getElementById('blog')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Blog
              </a> */}
              <Link
                href="/contact"
                className="footer-text-link"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
              <a
                href="/Aburag-mishra-Resumes-1.pdf"
                className="footer-text-link"
                target="_blank"
                rel="noreferrer"
                onClick={() => setIsOpen(false)}
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
