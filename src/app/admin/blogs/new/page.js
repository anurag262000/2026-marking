'use client';

import { createBlog } from '@/actions/blogs';
import { useState } from 'react';

export default function NewBlogPage() {
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [status, setStatus] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: 'info', message: 'Optimizing and publishing article...' });
    
    const formData = new FormData(e.target);
    const result = await createBlog(formData);

    if (result && !result.success) {
      setStatus({ type: 'error', message: result.message || 'Failed to create article' });
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-12 font-inter">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold font-helvetica mb-2">Create New Article</h1>
        <p className="text-white/40 text-sm mb-8">Fill in the details below to publish your story.</p>

        {status && (
          <div className={`mb-8 p-4 rounded-lg flex items-center gap-3 border ${
            status.type === 'error' ? 'bg-red-500/10 border-red-500/20 text-red-400' : 'bg-blue-500/10 border-blue-500/20 text-blue-400'
          }`}>
            <div className={`w-2 h-2 rounded-full ${status.type === 'error' ? 'bg-red-500' : 'bg-blue-500 animate-pulse'}`} />
            <span className="text-sm font-medium">{status.message}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-8">

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
                   <div className="space-y-4">
                    <label className="block text-xs text-white/60">Cover Image</label>
                    <div className="relative group aspect-video bg-black/50 border border-dashed border-white/10 rounded-lg overflow-hidden flex flex-col items-center justify-center cursor-pointer hover:border-blue-500/50 transition-colors">
                      {previewUrl ? (
                        <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                      ) : (
                        <div className="text-center p-4">
                          <div className="text-2xl mb-2 text-white/20">+</div>
                          <div className="text-[10px] text-white/40">Drop image here or click to upload</div>
                        </div>
                      )}
                      <input
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setPreviewUrl(URL.createObjectURL(file));
                          }
                        }}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                      />
                    </div>
                    <p className="text-[10px] text-white/30 italic">Images will be converted to .webp automatically</p>
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
                disabled={isSubmitting}
                className="w-full bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white font-orbitron uppercase tracking-wilder py-4 rounded-lg transition-colors font-bold shadow-lg shadow-blue-500/20"
              >
                {isSubmitting ? 'Publishing...' : 'Publish Article'}
              </button>
          </div>

        </form>
      </div>
    </div>
  );
}
