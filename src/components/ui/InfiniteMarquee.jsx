"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export const InfiniteMarquee = ({
  items,
  direction = "left",
  speed = "normal",
  pauseOnHover = true,
  className = "",
  renderIcon = false,
}) => {
  const containerRef = useRef(null);
  const scrollerRef = useRef(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    addAnimation();
  }, []);

  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      // Duplicate items for seamless loop
      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }

  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards"
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse"
        );
      }
    }
  };

  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className={`marquee-container-infinite ${className}`}
    >
      <ul
        ref={scrollerRef}
        className={`marquee-scroller ${start ? "animate-scroll" : ""} ${
          pauseOnHover ? "pause-on-hover" : ""
        }`}
      >
        {items.map((item, idx) => {
          const IconComponent = item.icon;
          const isReactIcon = typeof IconComponent === 'function';

          return (
            <li key={idx} className="marquee-item">
              <div className="skill-chip">
                <span className="skill-chip-icon">
                  {isReactIcon ? (
                    <IconComponent style={item.color ? { color: item.color } : undefined} />
                  ) : (
                    item.icon
                  )}
                </span>
                <span className="skill-chip-name">{item.name}</span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default InfiniteMarquee;
