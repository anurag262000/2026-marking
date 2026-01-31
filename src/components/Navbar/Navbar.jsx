'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import './Navbar.css';

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Work', path: '/work' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="glass-navbar-container">
      <div className="glass-navbar">
        <div className="logo">
          <Link href="/">
            <span className="logo-text">ANURAG</span>
          </Link>
        </div>

        <ul className="nav-links">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.path}
                className={`nav-item ${pathname === item.path ? 'active' : ''}`}
              >
                <span className="nav-text">{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
