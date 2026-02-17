import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FiArrowLeft, FiCalendar, FiClock } from 'react-icons/fi';

export const revalidate = 60;

import { incrementBlogView } from '@/app/admin/blogs/actions';

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const { data: blog } = await supabase
        .from('blogs')
        .select('title, excerpt, seo_title, seo_description, tags, image_url')
        .eq('slug', slug)
        .single();

    if (!blog) return { title: 'Blog Not Found' };

    return {
        title: blog.seo_title || blog.title,
        description: blog.seo_description || blog.excerpt,
        keywords: blog.tags,
        openGraph: {
            title: blog.seo_title || blog.title,
            description: blog.seo_description || blog.excerpt,
            images: blog.image_url ? [{ url: blog.image_url }] : [],
            type: 'article',
            tags: blog.tags
        }
    };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;

  // Increment view (fire and forget)
  incrementBlogView(slug);

  const { data: blog, error } = await supabase
    .from('blogs')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !blog) {
    notFound();
  }

  // Simple date formatting
  const date = new Date(blog.created_at).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
  });

  return (
    <article className="min-h-screen bg-black text-white pt-32 pb-20">
        {/* Progress Bar (Optional, simpler to just skip complex scroll hooks for now) */}

        <div className="max-w-3xl mx-auto px-6">
            <Link href="/blogs" className="inline-flex items-center text-white/40 hover:text-white mb-12 transition-colors font-orbitron text-xs uppercase tracking-widest">
                <FiArrowLeft className="mr-2" /> Back to Articles
            </Link>

            <header className="mb-10">
                <div className="flex flex-wrap gap-2 mb-6">
                    {blog.tags?.map((tag, i) => (
                        <span key={i} className="text-[10px] font-orbitron uppercase tracking-wider text-blue-500 border border-blue-500/30 px-3 py-1 rounded-full bg-blue-500/5">
                            {tag}
                        </span>
                    ))}
                </div>
                <h1 className="text-4xl md:text-6xl font-black font-helvetica mb-8 leading-tight">{blog.title}</h1>

                <div className="flex items-center gap-6 text-sm text-white/40 font-orbitron border-t border-b border-white/10 py-6">
                   <div className="flex items-center gap-2">
                        <FiCalendar />
                        <span>{date}</span>
                   </div>
                   <div className="flex items-center gap-2">
                        <FiClock />
                        <span>{Math.ceil(blog.content.length / 1000)} min read</span>
                   </div>
                   <div className="ml-auto font-mono text-xs opacity-50">
                        {blog.views || 0} views
                   </div>
                </div>
            </header>

            {blog.image_url && (
                <div className="mb-16 rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-blue-500/5">
                    <img src={blog.image_url} alt={blog.title} className="w-full h-auto" />
                </div>
            )}

            <div className="prose prose-invert prose-lg max-w-none">
                {/*
                  CAUTION: This renders raw HTML if the user typed it, or just text.
                  For a real blog, you'd want a Markdown renderer like 'react-markdown'.
                  For now, we'll just display it as text with line breaks preserved.
                */}
                <div className="whitespace-pre-wrap font-light leading-relaxed text-white/80">
                    {blog.content}
                </div>
            </div>

        </div>
    </article>
  );
}
