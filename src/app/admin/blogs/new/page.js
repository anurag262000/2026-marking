'use client';

import { createBlog } from '../actions';
import { useState } from 'react';

export default function NewBlogPage() {
  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-12 font-inter">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold font-helvetica mb-8">Create New Article</h1>

        <form action={createBlog} className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Main Content - Left Col */}
          <div className="md:col-span-2 space-y-6">
              <div className="space-y-2">
                <label className="block text-xs font-orbitron uppercase tracking-wider text-white/60">Title</label>
                <input
                  type="text"
                  name="title"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-blue-500 outline-none transition-colors text-xl font-bold"
                  placeholder="Article Title..."
                />
              </div>

               <div className="space-y-2">
                <label className="block text-xs font-orbitron uppercase tracking-wider text-white/60">Slug</label>
                <input
                  type="text"
                  name="slug"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-blue-500 outline-none transition-colors font-mono text-sm"
                  placeholder="article-slug-url"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-orbitron uppercase tracking-wider text-white/60">Excerpt</label>
                <textarea
                  name="excerpt"
                  rows={3}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-blue-500 outline-none transition-colors"
                  placeholder="Short summary for cards..."
                />
              </div>

               <div className="space-y-2">
                <label className="block text-xs font-orbitron uppercase tracking-wider text-white/60">Content (Markdown)</label>
                <textarea
                  name="content"
                  required
                  rows={20}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-blue-500 outline-none transition-colors font-mono text-sm"
                  placeholder="# Heading..."
                />
              </div>
          </div>

          {/* Sidebar - Right Col */}
          <div className="space-y-6">
              <div className="bg-white/5 border border-white/10 rounded-xl p-5 space-y-4">
                  <h3 className="font-bold text-sm uppercase tracking-wider text-white/40">Media</h3>
                   <div className="space-y-2">
                    <label className="block text-xs text-white/60">Cover Image URL</label>
                    <input
                      type="text"
                      name="image_url"
                      className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:border-blue-500 outline-none"
                      placeholder="https://..."
                    />
                  </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-5 space-y-4">
                  <h3 className="font-bold text-sm uppercase tracking-wider text-white/40">Classification</h3>
                   <div className="space-y-2">
                    <label className="block text-xs text-white/60">Tags (comma separated)</label>
                    <input
                      type="text"
                      name="tags"
                      className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:border-blue-500 outline-none"
                      placeholder="Design, React, AI..."
                    />
                  </div>
              </div>

               <div className="bg-white/5 border border-white/10 rounded-xl p-5 space-y-4">
                  <h3 className="font-bold text-sm uppercase tracking-wider text-white/40">SEO Metadata</h3>
                   <div className="space-y-2">
                    <label className="block text-xs text-white/60">SEO Title</label>
                    <input
                      type="text"
                      name="seo_title"
                      className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:border-blue-500 outline-none"
                      placeholder="Same as title if empty"
                    />
                  </div>
                   <div className="space-y-2">
                    <label className="block text-xs text-white/60">SEO Description</label>
                    <textarea
                      name="seo_description"
                      rows={3}
                      className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:border-blue-500 outline-none"
                      placeholder="Meta description for search engines..."
                    />
                  </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-orbitron uppercase tracking-wilder py-4 rounded-lg transition-colors font-bold shadow-lg shadow-blue-500/20"
              >
                Publish Article
              </button>
          </div>

        </form>
      </div>
    </div>
  );
}
