import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

export const revalidate = 60; // Revalidate every 60 seconds

export default async function BlogsPage() {
  const { data: blogs, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching blogs:", error);
  }

  console.log("Fetched Blogs Count:", blogs?.length);

  return (
    <div className="min-h-screen bg-[var(--off-white)] text-[var(--pitch-black)] pt-32 pb-20 px-6 relative">
      {/* Brutalist Dot Pattern */}
      <div className="absolute inset-0 bg-dot-brutalist pointer-events-none opacity-20 z-0" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <h1 className="text-6xl md:text-8xl font-black font-bebas tracking-tight mb-6 text-[var(--pitch-black)]">
            Thoughts & <span className="px-4 py-1.5 inline-block bg-[var(--neon-yellow)] border-[3px] border-[var(--pitch-black)] shadow-[4px_4px_0px_var(--pitch-black)] rotate-[-2deg]">Insights</span>
          </h1>
          <p className="text-[var(--pitch-black)] text-lg max-w-2xl mx-auto font-space font-medium opacity-80 mt-6">
            Exploring the intersection of design, technology, and creative coding.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs?.map((blog) => (
            <Link href={`/blogs/${blog.slug}`} key={blog.id} className="group">
              <div className="bg-[var(--pure-white)] border-[3px] border-[var(--pitch-black)] rounded-2xl overflow-hidden h-full flex flex-col shadow-[6px_6px_0px_var(--pitch-black)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_var(--pitch-black)] transition-all duration-300 relative">
                {blog.image_url && (
                  <div className="aspect-video relative overflow-hidden border-b-[3px] border-[var(--pitch-black)]">
                    <img
                      src={blog.image_url}
                      alt={blog.title}
                      className="w-full h-full object-cover object-top transform group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 flex gap-2">
                      {blog.tags?.slice(0, 2).map((tag, i) => (
                        <span
                          key={i}
                          className="bg-[var(--neon-yellow)] text-[var(--pitch-black)] text-[10px] uppercase font-space font-black px-3 py-1.5 rounded-md border-[2px] border-[var(--pitch-black)] shadow-[2px_2px_0px_var(--pitch-black)]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                <div className="p-8 flex-1 flex flex-col bg-[var(--pure-white)]">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-xs font-space font-black text-[var(--electric-purple)] tracking-wider uppercase">
                      Article
                    </span>
                    <span className="text-xs text-[var(--pitch-black)] font-space font-bold opacity-60">
                      {blog.views || 0} views
                    </span>
                  </div>
                  <h2 className="text-3xl font-black font-bebas uppercase mb-4 leading-tight text-[var(--pitch-black)] group-hover:text-[var(--action-pink)] transition-colors">
                    {blog.title}
                  </h2>
                  <p className="text-[var(--pitch-black)] opacity-85 mb-8 line-clamp-3 text-sm leading-relaxed font-space font-medium flex-1">
                    {blog.excerpt || "Click to read more..."}
                  </p>

                  <div className="flex items-center text-sm font-space font-black uppercase tracking-wider text-[var(--pitch-black)] group-hover:text-[var(--action-pink)] transition-colors">
                    <span>Read Article</span>
                    <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          ))}

          {blogs?.length === 0 && (
            <div className="col-span-full text-center py-20 text-[var(--pitch-black)] opacity-60 font-space font-bold">
              No articles published yet. Check back soon!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
