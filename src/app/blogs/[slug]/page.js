import LikeButton from '@/components/blog/LikeButton';
import CommentSection from '@/components/blog/CommentSection';

// ... existing imports ...

export default async function BlogPostPage({ params }) {
  // ... existing code ...

  return (
    <article className="min-h-screen bg-black text-white pt-32 pb-20">
        {/* Progress Bar (Optional, simpler to just skip complex scroll hooks for now) */}

        <div className="max-w-3xl mx-auto px-6">
            <Link href="/blogs" className="inline-flex items-center text-white/40 hover:text-white mb-12 transition-colors font-orbitron text-xs uppercase tracking-widest">
                <FiArrowLeft className="mr-2" /> Back to Articles
            </Link>

            <header className="mb-10">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                    <div className="flex flex-wrap gap-2">
                        {blog.tags?.map((tag, i) => (
                            <span key={i} className="text-[10px] font-orbitron uppercase tracking-wider text-blue-500 border border-blue-500/30 px-3 py-1 rounded-full bg-blue-500/5">
                                {tag}
                            </span>
                        ))}
                    </div>
                    <LikeButton blogSlug={slug} />
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

            <div className="prose prose-invert prose-lg max-w-none mb-20">
                {/*
                  CAUTION: This renders raw HTML if the user typed it, or just text.
                  For a real blog, you'd want a Markdown renderer like 'react-markdown'.
                  For now, we'll just display it as text with line breaks preserved.
                */}
                <div className="whitespace-pre-wrap font-light leading-relaxed text-white/80">
                    {blog.content}
                </div>
            </div>

            <CommentSection blogSlug={slug} />

        </div>
    </article>
  );
}
