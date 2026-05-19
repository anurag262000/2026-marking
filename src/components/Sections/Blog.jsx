'use client';

import React from 'react';
import { motion } from 'framer-motion';
import './Blog.css';

const articles = [
  {
    id: 1,
    title: 'React Native Auth Best Practices',
    date: 'Oct 24, 2025',
    readTime: '5 min read',
    excerpt: 'Implementing secure authentication flows using context API and interceptors.',
    tags: ['React Native', 'Security']
  },
  {
    id: 2,
    title: 'Optimizing Node.js Performance',
    date: 'Sep 12, 2025',
    readTime: '8 min read',
    excerpt: 'Techniques to handle high concurrency and avoid event loop blocking in varied workloads.',
    tags: ['Node.js', 'Backend']
  },
  {
    id: 3,
    title: 'The Future of Web Interactivity',
    date: 'Aug 05, 2025',
    readTime: '6 min read',
    excerpt: 'Exploring how WebGL and Framer Motion are reshaping modern web experiences.',
    tags: ['Design', 'Frontend']
  }
];

export default function Blog() {
  return (
    <section 
      id="blog" 
      className="relative py-16 md:py-24 overflow-hidden"
      style={{ backgroundColor: 'var(--off-white)' }}
    >
      {/* Dot pattern background */}
      <div className="absolute inset-0 bg-dot-brutalist pointer-events-none opacity-20" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 md:mb-16 gap-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-6xl md:text-8xl font-black uppercase tracking-tight leading-none font-bebas"
            style={{ 
              color: 'var(--pitch-black)',
              WebkitTextStroke: '2px var(--pitch-black)',
              WebkitTextFillColor: 'transparent'
            }}
          >
            📝 LATEST WRITING
          </motion.h2>
          
          <motion.a 
            href="/blogs"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="px-6 py-3 rounded-lg font-space font-bold uppercase tracking-wider transition-all whitespace-nowrap"
            style={{
              backgroundColor: 'var(--neon-yellow)',
              color: 'var(--pitch-black)',
              border: '3px solid var(--pitch-black)',
              boxShadow: '5px 5px 0px var(--pitch-black)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translate(2px, 2px)';
              e.currentTarget.style.boxShadow = '3px 3px 0px var(--pitch-black)';
              e.currentTarget.style.backgroundColor = 'var(--pitch-black)';
              e.currentTarget.style.color = 'var(--neon-yellow)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translate(0, 0)';
              e.currentTarget.style.boxShadow = '5px 5px 0px var(--pitch-black)';
              e.currentTarget.style.backgroundColor = 'var(--neon-yellow)';
              e.currentTarget.style.color = 'var(--pitch-black)';
            }}
          >
            View All →
          </motion.a>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {articles.map((article, index) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="rounded-xl overflow-hidden transition-all duration-300 flex flex-col"
              style={{
                backgroundColor: 'var(--pure-white)',
                border: '3px solid var(--pitch-black)',
                boxShadow: '6px 6px 0px var(--pitch-black)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translate(2px, 2px)';
                e.currentTarget.style.boxShadow = '4px 4px 0px var(--pitch-black)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translate(0, 0)';
                e.currentTarget.style.boxShadow = '6px 6px 0px var(--pitch-black)';
              }}
            >
              {/* Card Content */}
              <div className="p-6 flex flex-col flex-1">
                {/* Meta */}
                <div className="flex items-center gap-2 mb-4 font-space font-bold text-xs uppercase tracking-wider" style={{ color: 'var(--electric-purple)' }}>
                  <span>{article.date}</span>
                  <span>•</span>
                  <span>{article.readTime}</span>
                </div>

                {/* Title */}
                <h3 
                  className="text-2xl md:text-3xl font-black uppercase leading-tight mb-3 font-bebas"
                  style={{ color: 'var(--pitch-black)' }}
                >
                  {article.title}
                </h3>

                {/* Excerpt */}
                <p 
                  className="text-sm leading-relaxed mb-4 flex-1 font-space"
                  style={{ color: 'var(--pitch-black)', opacity: 0.7 }}
                >
                  {article.excerpt}
                </p>

                {/* Tags as Stickers */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {article.tags.map((tag, i) => (
                    <span 
                      key={tag}
                      className="inline-block px-3 py-1 rounded-md font-space font-bold text-xs uppercase tracking-wider"
                      style={{
                        backgroundColor: i % 2 === 0 ? 'var(--electric-purple)' : 'var(--neon-yellow)',
                        color: i % 2 === 0 ? 'var(--pure-white)' : 'var(--pitch-black)',
                        border: '2px solid var(--pitch-black)',
                        boxShadow: '3px 3px 0px var(--pitch-black)',
                        transform: `rotate(${Math.random() * 4 - 2}deg)`
                      }}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Read More Button */}
                <button 
                  className="w-full px-4 py-3 rounded-lg font-space font-bold uppercase tracking-wider transition-all text-sm"
                  style={{
                    backgroundColor: 'var(--pitch-black)',
                    color: 'var(--neon-yellow)',
                    border: '2px solid var(--pitch-black)',
                    boxShadow: '4px 4px 0px var(--pitch-black)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translate(2px, 2px)';
                    e.currentTarget.style.boxShadow = '2px 2px 0px var(--pitch-black)';
                    e.currentTarget.style.backgroundColor = 'var(--neon-yellow)';
                    e.currentTarget.style.color = 'var(--pitch-black)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translate(0, 0)';
                    e.currentTarget.style.boxShadow = '4px 4px 0px var(--pitch-black)';
                    e.currentTarget.style.backgroundColor = 'var(--pitch-black)';
                    e.currentTarget.style.color = 'var(--neon-yellow)';
                  }}
                >
                  Read More →
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
