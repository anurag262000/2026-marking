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
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
        <Link href="/blogs" className="text-blue-500 hover:underline">Back to Blogs</Link>
      </div>
    );
  }

  const date = new Date(blog.created_at).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <article className="min-h-screen bg-black text-white pt-32 pb-20">
        {/* Progress Bar (Optional, simpler to just skip complex scroll hooks for now) */}

        <div className="max-w-7xl mx-auto px-6">
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
                        <span>{blog.content ? Math.ceil(blog.content.length / 1000) : 0} min read</span>
                   </div>
                   <div className="ml-auto font-mono text-xs opacity-50">
                        {blog.views || 0} views
                   </div>
                </div>
            </header>

            {blog.image_url && (
                <div className="mb-16 rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                    <img 
                        src={blog.image_url} 
                        alt={blog.title} 
                        className="w-full h-auto" 
                    />
                </div>
            )}

            <div className="prose prose-invert prose-lg max-w-none mb-20 selection:bg-blue-500/30">
                <ReactMarkdown>{blog.content}</ReactMarkdown>
            </div>

            <CommentSection blogSlug={slug} />

        </div>
    </article>
  );
}
