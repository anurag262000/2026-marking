"use client";
import React, { useState, useRef, useEffect, useCallback } from 'react';
import './About.css';

const INITIAL_LOGS = [
    { type: 'system', text: '╭──────────────────────────────────────╮' },
    { type: 'system', text: '│      ANURAG MISHRA - TERMINAL v2.0   │' },
    { type: 'system', text: '╰──────────────────────────────────────╯' },
    { type: 'output', text: '' },
    { type: 'output', text: '  [*] Initializing system...' },
    { type: 'success', text: '  [+] Core modules loaded' },
    { type: 'success', text: '  [+] Authentication verified' },
    { type: 'success', text: '  [+] Database connected' },
    { type: 'output', text: '' },
    { type: 'data', text: '┌─ PROFILE ──────────────────────────────┐' },
    { type: 'data', text: '│  Name:        Anurag Mishra            │' },
    { type: 'data', text: '│  Role:        Technical Lead           │' },
    { type: 'data', text: '│  Location:    Kurukshetra, India       │' },
    { type: 'data', text: '│  Education:   BCA - JMIT               │' },
    { type: 'data', text: '│  Experience:  2+ Years                 │' },
    { type: 'data', text: '└────────────────────────────────────────┘' },
    { type: 'output', text: '' },
    { type: 'data', text: '┌─ STACK ────────────────────────────────┐' },
    { type: 'data', text: '│  Frontend:    React, Next.js, Three.js │' },
    { type: 'data', text: '│  Backend:     Node.js, Express, Python │' },
    { type: 'data', text: '│  Languages:   JavaScript, TypeScript   │' },
    { type: 'data', text: '│  Database:    PostgreSQL, MongoDB      │' },
    { type: 'data', text: '│  Cloud:       Supabase, Firebase, GCP  │' },
    { type: 'data', text: '│  Tools:       Git, GitHub, GraphQL     │' },
    { type: 'data', text: '└────────────────────────────────────────┘' },
    { type: 'output', text: '' },
    { type: 'data', text: '┌─ STATS ─────────────────────────────────┐' },
    { type: 'data', text: '│  Projects Completed:    15+             │' },
    { type: 'data', text: '│  Lead Projects:         10+             │' },
    { type: 'data', text: '│  Lines of Code:         100K+           │' },
    { type: 'data', text: '│  Cups of Coffee:        ∞               │' },
    { type: 'data', text: '└─────────────────────────────────────────┘' },
    { type: 'output', text: '' },
    { type: 'success', text: '  [STATUS] OPERATIONAL' },
    { type: 'output', text: '  Type "help" for available commands' },
    { type: 'output', text: '' },
];

export default function InteractiveTerminal() {
  const [history, setHistory] = useState(INITIAL_LOGS);
  const [inputVal, setInputVal] = useState('');
  const logContainerRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom when history changes
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [history]);

  // Smart scroll handler - captures scroll when terminal has content to scroll
  // Passes through to page when at boundaries
  const handleWheel = useCallback((e) => {
    const el = logContainerRef.current;
    if (!el) return;

    const { scrollTop, scrollHeight, clientHeight } = el;
    const hasScrollableContent = scrollHeight > clientHeight;

    // If no scrollable content, let page handle it
    if (!hasScrollableContent) {
      return;
    }

    const isAtTop = scrollTop <= 1;
    const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1;
    const isScrollingUp = e.deltaY < 0;
    const isScrollingDown = e.deltaY > 0;

    // At top and scrolling up - let page handle
    if (isAtTop && isScrollingUp) {
      return;
    }

    // At bottom and scrolling down - let page handle
    if (isAtBottom && isScrollingDown) {
      return;
    }

    // Terminal has room to scroll - capture the event and scroll manually
    e.stopPropagation();
    e.preventDefault();
    el.scrollTop += e.deltaY;
  }, []);

  const handleCommand = (e) => {
    if (['Enter', 'Tab', 'ArrowUp', 'ArrowDown', ' '].includes(e.key)) {
        if (e.key === ' ' && inputVal.length > 0) {
            // Allow space
        } else {
            e.preventDefault();
            e.stopPropagation();
        }
    }

    if (e.key === 'Enter') {
      e.preventDefault();
      const cmd = inputVal.trim().toLowerCase();
      const newHistory = [...history, { type: 'input', text: `$ ${inputVal}` }];

      let responses = [];
      switch (cmd) {
        case 'help':
          responses = [
            { type: 'output', text: '' },
            { type: 'data', text: '┌─ AVAILABLE COMMANDS ────────────────────┐' },
            { type: 'data', text: '│  stack      - View tech stack          │' },
            { type: 'data', text: '│  experience - Work history             │' },
            { type: 'data', text: '│  contact    - Get in touch             │' },
            { type: 'data', text: '│  projects   - Featured work            │' },
            { type: 'data', text: '│  about      - Who am I?                │' },
            { type: 'data', text: '│  status     - System status            │' },
            { type: 'data', text: '│  clear      - Reset terminal           │' },
            { type: 'data', text: '└─────────────────────────────────────────┘' },
          ];
          break;
        case 'stack':
          responses = [
            { type: 'output', text: '' },
            { type: 'success', text: '  [Frontend]  React, Next.js, TypeScript, Three.js' },
            { type: 'success', text: '  [Backend]   Node.js, Express, Python' },
            { type: 'success', text: '  [Database]  PostgreSQL, MongoDB, Redis' },
            { type: 'success', text: '  [Cloud]     Supabase, Firebase, GCP, Cloudflare' },
            { type: 'success', text: '  [Mobile]    React Native' },
            { type: 'success', text: '  [Tools]     Git, GitHub, GraphQL, Docker' },
          ];
          break;
        case 'experience':
          responses = [
            { type: 'output', text: '' },
            { type: 'data', text: '┌─ EXPERIENCE ───────────────────────────┐' },
            { type: 'data', text: '│  2024-Now   Technical Lead @ Startup   │' },
            { type: 'data', text: '│  2023-2024  Full-Stack Dev @ Agency    │' },
            { type: 'data', text: '│  2022-2023  Freelance Developer        │' },
            { type: 'data', text: '└─────────────────────────────────────────┘' },
          ];
          break;
        case 'contact':
          responses = [
            { type: 'output', text: '' },
            { type: 'success', text: '  [Email]     hello@anuragmishra.dev' },
            { type: 'success', text: '  [GitHub]    github.com/anurag262000' },
            { type: 'success', text: '  [LinkedIn]  linkedin.com/in/anurag' },
          ];
          break;
        case 'projects':
          responses = [
            { type: 'output', text: '' },
            { type: 'data', text: '┌─ FEATURED PROJECTS ─────────────────────┐' },
            { type: 'data', text: '│  Business Card CRM - Full Stack        │' },
            { type: 'data', text: '│  Indiefluence App - React Native       │' },
            { type: 'data', text: '│  E-Commerce Platform - Next.js         │' },
            { type: 'data', text: '│  AI Analytics Dashboard - React        │' },
            { type: 'data', text: '└─────────────────────────────────────────┘' },
          ];
          break;
        case 'about':
          responses = [
            { type: 'output', text: '' },
            { type: 'output', text: '  I\'m Anurag Mishra, a Full-Stack Architect' },
            { type: 'output', text: '  based in Kurukshetra, India. I build' },
            { type: 'output', text: '  high-performance digital experiences' },
            { type: 'output', text: '  with focus on visual excellence.' },
            { type: 'output', text: '' },
            { type: 'success', text: '  "Code is poetry in motion."' },
          ];
          break;
        case 'status':
          responses = [
            { type: 'output', text: '' },
            { type: 'success', text: '  [+] CPU: 12% | Memory: 4.2GB | Uptime: 99.9%' },
            { type: 'success', text: '  [+] All systems operational' },
            { type: 'success', text: '  [+] Ready to collaborate!' },
          ];
          break;
        case 'clear':
          setHistory(INITIAL_LOGS);
          setInputVal('');
          return;
        case '':
          responses = [];
          break;
        default:
          responses = [
            { type: 'error', text: `  [-] Command not found: "${cmd}"` },
            { type: 'output', text: '  Type "help" for available commands' },
          ];
      }

      responses.forEach(res => newHistory.push(res));
      setHistory(newHistory);
      setInputVal('');
    }
  };

  const focusInput = () => {
    inputRef.current?.focus();
  };

  const getLineClass = (type) => {
    switch(type) {
      case 'success': return 'term-success-line';
      case 'error': return 'term-error-line';
      case 'data': return 'term-data-line';
      case 'system': return 'term-system-line';
      case 'input': return 'term-input-line';
      default: return 'term-output-line';
    }
  };

  return (
    <div className="bento-card glow-border terminal-card" onClick={focusInput}>
        <div className="card-content terminal-content">
            {/* Linux-style Terminal Header */}
            <div className="terminal-header linux-style">
                <span className="terminal-user">anurag@portfolio</span>
                <span className="terminal-separator">:</span>
                <span className="terminal-path">~</span>
                <span className="terminal-separator">$</span>
            </div>

            {/* Scrollable Container with smart scroll passthrough */}
            <div
                className="log-stream font-space"
                ref={logContainerRef}
                onWheel={handleWheel}
            >
                {history.map((line, i) => (
                    <p
                        key={i}
                        className={getLineClass(line.type)}
                    >
                        {line.text}
                    </p>
                ))}

                {/* Input Line */}
                <div className="input-line">
                    <span className="prompt">$</span>
                    <span className="typed-text">{inputVal}</span>
                    <span className="cursor blink"></span>

                    {/* Invisible Input */}
                    <input
                        ref={inputRef}
                        type="text"
                        value={inputVal}
                        onChange={(e) => setInputVal(e.target.value)}
                        onKeyDown={handleCommand}
                        className="hidden-input"
                        autoComplete="off"
                        autoFocus
                    />
                </div>
            </div>
        </div>
    </div>
  );
}
