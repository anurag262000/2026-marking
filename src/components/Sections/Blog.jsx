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
    <section id="blog" className="blog-section">
      <div className="blog-container">
        <div className="blog-header">
           <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-title font-bitcount"
          >
            Latest Writing
          </motion.h2>
          <a href="/blog" className="view-all-link font-inter">View all →</a>
        </div>

        <div className="blog-grid">
          {articles.map((article, index) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="blog-card"
            >
              <div className="blog-meta font-inter">
                <span>{article.date}</span>
                <span className="dot">•</span>
                <span>{article.readTime}</span>
              </div>

              <h3 className="blog-title font-bitcount">{article.title}</h3>
              <p className="blog-excerpt font-inter">{article.excerpt}</p>

              <div className="blog-tags">
                {article.tags.map(tag => (
                  <span key={tag} className="blog-tag font-inter">#{tag}</span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
