"use client";
import React, { useState, useRef, useEffect } from 'react';
import './About.css';

const INITIAL_LOGS = [
    { type: 'output', text: '> init_sequence_start' },
    { type: 'output', text: '> loading_modules... 100%' },
    { type: 'output', text: '> projects_completed: 15+' },
    { type: 'output', text: '> stack_verified: MERN' },
    { type: 'output', text: '> optimization: ENABLED' },
    { type: 'output', text: '> location: DELHI_NCR' },
    { type: 'output', text: '> degree: BCA_JMIT' },
    { type: 'output', text: '> type "help" for commands' },
];

export default function InteractiveTerminal() {
  const [history, setHistory] = useState(INITIAL_LOGS);
  const [inputVal, setInputVal] = useState('');
  const logContainerRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom using scrollTop
  useEffect(() => {
    if (logContainerRef.current) {
        logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [history]);

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
      const newHistory = [...history, { type: 'input', text: `> ${inputVal}` }];

      let response = '';
      switch (cmd) {
        case 'help':
          response = 'AVAILABLE COMMANDS: stack, experience, contact, clear, status, projects, about';
          break;
        case 'stack':
          response = 'CORE: React, Next.js, Node.js, TypeScript, PostgreSQL, Python.';
          break;
        case 'experience':
          response = 'Total Exp: 2+ Years. Lead Projects: 10+. Impact: High.';
          break;
        case 'contact':
          response = 'Email: anurag@example.com (Replace with actual)';
          break;
        case 'projects':
          response = 'Key Projects: E-Commerce Engine, AI Dashboard, Fintech App.';
          break;
        case 'about':
          response = 'Anurag Mishra. Technical Lead. Visual Architect. Building digital experiences that matter.';
          break;
        case 'status':
          response = 'System Operational. All systems go.';
          break;
        case 'clear':
          // Keep the initial logs, just clear the user session history?
          // user asked: "clear cmand shuld not clear everything it shuld keep the default information"
          setHistory(INITIAL_LOGS);
          setInputVal('');
          return;
        case '':
          response = '';
          break;
        default:
          response = `Command not found: ${cmd}. Type "help".`;
      }

      if (response) {
        newHistory.push({ type: 'output', text: `> ${response}` });
      }

      setHistory(newHistory);
      setInputVal('');
    }
  };

  const focusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <div className="bento-card glow-border tall-card" onClick={focusInput} style={{ cursor: 'text' }}>
        {/* Added specific class terminal-content for CSS targeting */}
        <div className="card-content terminal-content">
            <span className="mono-label">INTERACTIVE_TERMINAL</span>

            {/* Scrollable Container */}
            <div
                className="log-stream font-space"
                ref={logContainerRef}
            >
                {history.map((line, i) => (
                    <p
                        key={i}
                        className={line.type === 'input' ? 'term-input-line' : 'term-output-line'}
                    >
                        {line.text}
                    </p>
                ))}

                {/* Input Line */}
                <div className="input-line" style={{ display: 'flex', alignItems: 'center', marginTop: '2px', flexShrink: 0 }}>
                    <span className="prompt" style={{ marginRight: '8px', color: 'rgba(255, 255, 255, 0.5)' }}>&gt;</span>

                    {/* Visual Text */}
                    <span className="typed-text" style={{ color: 'var(--primary-color)' }}>{inputVal}</span>

                    {/* Blinking Cursor */}
                    <span className="cursor blink" style={{
                        display: 'inline-block',
                        width: '8px',
                        height: '16px',
                        backgroundColor: 'var(--primary-color)',
                        marginLeft: '2px',
                        verticalAlign: 'middle'
                    }}></span>

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
