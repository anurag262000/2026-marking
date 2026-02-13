"use client";

import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * TextReveal Component
 * Animates text with character-by-character or word-by-word reveal on scroll
 *
 * @param {Object} props
 * @param {string} props.children - Text content to animate
 * @param {string} props.className - Additional CSS classes
 * @param {'chars' | 'words'} props.mode - Animation mode (default: 'words')
 * @param {number} props.stagger - Stagger delay between elements (default: 0.03)
 * @param {number} props.duration - Animation duration per element (default: 0.6)
 * @param {string} props.trigger - ScrollTrigger trigger point (default: 'top 80%')
 */
const TextReveal = ({
  children,
  className = "",
  mode = "words",
  stagger = 0.03,
  duration = 0.6,
  trigger = "top 80%",
  ...props
}) => {
  const textRef = useRef(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || !textRef.current) return;

    const element = textRef.current;
    const text = children;

    // Split text into words or characters
    const splitText = mode === "chars"
      ? text.split("")
      : text.split(" ");

    // Clear existing content
    element.innerHTML = "";

    // Create span elements for each unit
    const spans = splitText.map((unit, index) => {
      const span = document.createElement("span");
      span.style.display = "inline-block";
      span.style.opacity = "0";
      span.style.transform = "translateY(20px)";

      // For word mode, add space after each word except the last
      if (mode === "words" && index < splitText.length - 1) {
        span.textContent = unit + " ";
      } else {
        span.textContent = unit;
      }

      element.appendChild(span);
      return span;
    });

    // GSAP animation with ScrollTrigger
    const ctx = gsap.context(() => {
      gsap.fromTo(
        spans,
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: duration,
          stagger: stagger,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: trigger,
            toggleActions: "play none none none",
          },
        }
      );
    }, element);

    return () => {
      ctx.revert();
    };
  }, [children, isClient, mode, stagger, duration, trigger]);

  return (
    <span ref={textRef} className={className} {...props}>
      {!isClient && children}
    </span>
  );
};

export default TextReveal;
