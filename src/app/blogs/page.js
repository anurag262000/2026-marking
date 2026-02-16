import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';

export const revalidate = 60; // Revalidate every 60 seconds

export default async function BlogsPage() {
  const { data: blogs, error } = await supabase
    .from('blogs')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching blogs:', error);
  }

  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-20">
            <h1 className="text-5xl md:text-7xl font-helvetica font-bold mb-6">Thoughts & <span className="text-orange-500 italic">Insights</span></h1>
            <p className="text-white/60 text-lg max-w-2xl mx-auto font-light">
                Exploring the intersection of design, technology, and creative coding.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs?.map((blog) => (
                <Link href={`/blogs/${blog.slug}`} key={blog.id} className="group">
                    <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden h-full flex flex-col hover:border-orange-500/50 transition-colors duration-300 relative">
                        {blog.image_url && (
                             <div className="aspect-video relative overflow-hidden">
                                <img src={blog.image_url} alt={blog.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
                                <div className="absolute top-4 left-4 flex gap-2">
                                    {blog.tags?.slice(0, 2).map((tag, i) => (
                                        <span key={i} className="bg-black/60 backdrop-blur-md text-white text-[10px] uppercase font-orbitron px-3 py-1 rounded-full border border-white/10">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                             </div>
                        )}
                        <div className="p-8 flex-1 flex flex-col">
                            <div className="mb-4 flex items-center justify-between">
                                <span className="text-xs font-orbitron text-orange-400 tracking-widest uppercase">Article</span>
                                <span className="text-xs text-white/30 font-mono">{blog.views || 0} views</span>
                            </div>
                            <h2 className="text-2xl font-bold font-helvetica mb-4 leading-tight group-hover:text-orange-400 transition-colors">{blog.title}</h2>
                            <p className="text-white/60 mb-8 line-clamp-3 text-sm leading-relaxed flex-1">
                                {blog.excerpt || "Click to read more..."}
                            </p>

                            <div className="flex items-center text-sm font-orbitron uppercase tracking-wider text-white/40 group-hover:text-white transition-colors">
                                <span>Read Article</span>
                                <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </div>
                    </div>
                </Link>
            ))}

            {blogs?.length === 0 && (
                <div className="col-span-full text-center py-20 text-white/40">
                    No articles published yet. Check back soon!
                </div>
            )}
        </div>

      </div>
    </div>
  );
}
