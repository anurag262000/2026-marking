import { getBlogBySlug } from '@/actions/blogs';
import Link from 'next/link';
import { FiArrowLeft, FiCalendar, FiClock } from 'react-icons/fi';
import LikeButton from '@/components/blog/LikeButton';
import CommentSection from '@/components/blog/CommentSection';
import ReactMarkdown from 'react-markdown';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function BlogPostPage({ params }) {
  const { slug } = await params;

  const blog = await getBlogBySlug(slug);

  if (!blog) {
    return (
      <div className="min-h-screen bg-[var(--off-white)] text-[var(--pitch-black)] flex flex-col items-center justify-center relative">
        <div className="absolute inset-0 bg-dot-brutalist pointer-events-none opacity-20 z-0" />
        <div className="relative z-10 text-center">
          <h1 className="text-4xl font-bebas font-black uppercase mb-6">Article Not Found</h1>
          <Link 
            href="/blogs" 
            className="inline-block px-6 py-3 bg-[var(--neon-yellow)] text-[var(--pitch-black)] font-space font-black uppercase text-xs border-[3px] border-[var(--pitch-black)] rounded-xl shadow-[4px_4px_0px_var(--pitch-black)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_var(--pitch-black)] transition-all"
          >
            Back to Blogs
          </Link>
        </div>
      </div>
    );
  }

  const date = new Date(blog.created_at).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <article className="min-h-screen bg-[var(--off-white)] text-[var(--pitch-black)] pt-32 pb-20 relative">
        {/* Brutalist Dot Pattern */}
        <div className="absolute inset-0 bg-dot-brutalist pointer-events-none opacity-20 z-0" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
            <Link 
              href="/blogs" 
              className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--pure-white)] text-[var(--pitch-black)] font-space font-black text-xs uppercase tracking-wider border-[2px] border-[var(--pitch-black)] rounded-md shadow-[2px_2px_0px_var(--pitch-black)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_var(--pitch-black)] transition-all mb-12"
            >
                <FiArrowLeft className="text-lg" /> Back to Articles
            </Link>

            <header className="mb-10">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                    <div className="flex flex-wrap gap-2">
                        {blog.tags?.map((tag, i) => (
                            <span 
                              key={i} 
                              className="text-[10px] font-space font-black uppercase tracking-wider text-[var(--pitch-black)] bg-[var(--neon-yellow)] border-[2px] border-[var(--pitch-black)] px-3 py-1.5 rounded-md shadow-[2px_2px_0px_var(--pitch-black)]"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                    <LikeButton blogSlug={slug} />
                </div>
                <h1 className="text-5xl md:text-7xl font-black font-bebas uppercase mb-8 leading-[1.1] text-[var(--pitch-black)]">{blog.title}</h1>

                <div className="flex flex-wrap items-center gap-6 text-sm text-[var(--pitch-black)] font-space font-bold border-t-[3px] border-b-[3px] border-[var(--pitch-black)] py-6">
                   <div className="flex items-center gap-2">
                        <FiCalendar className="text-[var(--electric-purple)] text-lg" />
                        <span>{date}</span>
                   </div>
                   <div className="flex items-center gap-2">
                        <FiClock className="text-[var(--action-pink)] text-lg" />
                        <span>{blog.content ? Math.ceil(blog.content.length / 1000) : 0} min read</span>
                   </div>
                   <div className="sm:ml-auto font-mono text-xs opacity-70">
                        {blog.views || 0} views
                   </div>
                </div>
            </header>

            {blog.image_url && (
                <div className="mb-16 rounded-2xl overflow-hidden border-[3px] border-[var(--pitch-black)] shadow-[6px_6px_0px_var(--pitch-black)]">
                    <img 
                        src={blog.image_url} 
                        alt={blog.title} 
                        className="w-full h-auto" 
                    />
                </div>
            )}

            <div className="prose prose-lg max-w-none mb-20 selection:bg-[var(--neon-yellow)] prose-headings:text-[var(--pitch-black)] prose-headings:font-bebas prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tight prose-p:text-[var(--pitch-black)] prose-p:font-space prose-p:font-medium prose-p:opacity-90 prose-p:leading-relaxed prose-strong:text-[var(--pitch-black)] prose-strong:font-black prose-code:text-[var(--pitch-black)] prose-code:bg-[var(--pure-white)] prose-code:border-[2px] prose-code:border-[var(--pitch-black)] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-blockquote:border-l-[4px] prose-blockquote:border-[var(--pitch-black)] prose-blockquote:italic prose-a:text-[var(--electric-purple)] prose-a:underline prose-li:text-[var(--pitch-black)] prose-li:font-space prose-li:font-medium">
                <ReactMarkdown>
                    {blog.content?.replace(/^#\s+.*(\r?\n|$)/, '')}
                </ReactMarkdown>
            </div>

            <CommentSection blogSlug={slug} />

        </div>
    </article>
  );
}
