import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function BackgroundBeams() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;

    canvas.width = width;
    canvas.height = height;

    const beams = [];
    const beamCount = 30; // Number of rays

    class Beam {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.angle = (Math.random() - 0.5) * Math.PI * 2; // Random direction
        this.speed = Math.random() * 0.5 + 0.1;
        this.length = Math.random() * 300 + 100;
        this.opacity = Math.random() * 0.5;
        this.width = Math.random() * 2 + 0.5;
        this.color = Math.random() > 0.8 ? '255, 68, 68' : '255, 100, 50'; // Red/Orange mix
      }

      update() {
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
        this.opacity -= 0.002;

        if (this.opacity <= 0 || this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
          this.reset();
          this.opacity = 0; // Fade in gradually
          gsap.to(this, { opacity: Math.random() * 0.5, duration: 1 });
        }
      }

      draw() {
        const gradient = ctx.createLinearGradient(
            this.x,
            this.y,
            this.x - Math.cos(this.angle) * this.length,
            this.y - Math.sin(this.angle) * this.length
        );
        gradient.addColorStop(0, `rgba(${this.color}, 0)`);
        gradient.addColorStop(0.5, `rgba(${this.color}, ${this.opacity})`);
        gradient.addColorStop(1, `rgba(${this.color}, 0)`);

        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(
            this.x - Math.cos(this.angle) * this.length,
            this.y - Math.sin(this.angle) * this.length
        );
        ctx.strokeStyle = gradient;
        ctx.lineWidth = this.width;
        ctx.stroke();
      }
    }

    // Init Beams
    for (let i = 0; i < beamCount; i++) {
        beams.push(new Beam());
    }

    // Animation Loop
    const render = () => {
        ctx.clearRect(0, 0, width, height);
        // Composite lighter for glow effect
        ctx.globalCompositeOperation = 'screen';

        beams.forEach(beam => {
            beam.update();
            beam.draw();
        });

        requestAnimationFrame(render);
    };
    render();

    // Resize Handler
    const handleResize = () => {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    };
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);

  }, []);

  return (
    <canvas
        ref={canvasRef}
        className="background-beams"
        style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: 0,
            opacity: 0.8
        }}
    />
  );
}
