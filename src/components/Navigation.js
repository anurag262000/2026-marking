'use client';

import { motion } from 'framer-motion';
import './Navigation.css';

export default function Navigation() {
  return (
    <nav className="main-nav">
      <div className="nav-logo">FOLLOW.ART</div>
      <div className="nav-links">
        <a href="#about">About</a>
        <a href="#nexus">Nexus Card</a>
        <a href="#community">Community Board</a>
        <a href="#pricing">Pricing</a>
        <a href="#faq">FAQ</a>
      </div>
      <div className="nav-actions">
        <button className="nav-login">Login</button>
        <button className="nav-join">Join</button>
      </div>
    </nav>
  );
}
