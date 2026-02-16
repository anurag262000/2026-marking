import { supabase } from '@/lib/supabase';
import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import Link from 'next/link';
import { FiEye, FiFileText, FiMessageSquare, FiTrendingUp, FiCheckCircle, FiTrash2 } from 'react-icons/fi';
import { deleteBlog } from './blogs/actions';
import { deleteTestimonial, toggleTestimonialApproval } from './testimonials/actions';

export const revalidate = 0;

export default async function AdminDashboard() {
  const user = await currentUser();

  // 1. Fetch Stats & Data
  const { data: blogs } = await supabase.from('blogs').select('*').order('created_at', { ascending: false });
  const { data: testimonials } = await supabase.from('testimonials').select('*').order('created_at', { ascending: false });

  const totalViews = blogs?.reduce((acc, blog) => acc + (blog.views || 0), 0) || 0;
  const totalBlogs = blogs?.length || 0;
  const totalTestimonials = testimonials?.length || 0;
  const pendingTestimonials = testimonials?.filter(t => !t.approved).length || 0;

  return (
    <div className="min-h-screen bg-[#050505] text-white p-6 md:p-12 font-inter selection:bg-orange-500/30">

        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-6">
            <div>
                <span className="text-orange-500 font-orbitron text-xs uppercase tracking-[0.2em] mb-2 block">System Command</span>
                <h1 className="text-4xl md:text-5xl font-black font-helvetica tracking-tight">Admin<span className="text-white/20">Panel</span></h1>
            </div>
            <div className="flex items-center gap-6 bg-white/5 px-6 py-3 rounded-full border border-white/10 backdrop-blur-md">
                <span className="text-sm text-white/60">Logged as <span className="text-white font-bold">{user?.firstName}</span></span>
                <UserButton afterSignOutUrl="/" />
            </div>
        </header>

        {/* Analytics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 relative overflow-hidden group hover:border-orange-500/30 transition-colors">
                <div className="absolute top-0 right-0 p-32 bg-orange-500/10 blur-[80px] rounded-full pointer-events-none" />
                <div className="relative z-10">
                    <div className="flex items-center gap-3 text-white/40 mb-2">
                        <FiEye /> <span className="text-xs uppercase tracking-widest font-orbitron">Total Views</span>
                    </div>
                    <div className="text-4xl font-bold font-helvetica">{totalViews.toLocaleString()}</div>
                    <div className="mt-4 h-1 w-full bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-orange-500 w-[70%]" />
                    </div>
                </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 relative overflow-hidden group hover:border-blue-500/30 transition-colors">
                <div className="absolute top-0 right-0 p-32 bg-blue-500/10 blur-[80px] rounded-full pointer-events-none" />
                <div className="relative z-10">
                    <div className="flex items-center gap-3 text-white/40 mb-2">
                        <FiFileText /> <span className="text-xs uppercase tracking-widest font-orbitron">Articles</span>
                    </div>
                    <div className="text-4xl font-bold font-helvetica">{totalBlogs}</div>
                     <Link href="/admin/blogs/new" className="inline-block mt-4 text-xs font-orbitron text-blue-400 hover:text-white transition-colors">
                        + Create New
                    </Link>
                </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 relative overflow-hidden group hover:border-green-500/30 transition-colors">
                <div className="absolute top-0 right-0 p-32 bg-green-500/10 blur-[80px] rounded-full pointer-events-none" />
                <div className="relative z-10">
                    <div className="flex items-center gap-3 text-white/40 mb-2">
                        <FiMessageSquare /> <span className="text-xs uppercase tracking-widest font-orbitron">Testimonials</span>
                    </div>
                    <div className="text-4xl font-bold font-helvetica">{totalTestimonials}</div>
                    <div className="text-xs text-white/40 mt-1">{pendingTestimonials} Pending Approval</div>
                </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col justify-center items-center text-center hover:bg-white/10 transition-colors cursor-pointer dashed-border">
                <span className="text-white/20 text-5xl mb-2">+</span>
                <span className="text-xs font-orbitron uppercase tracking-widest text-white/40">Quick Action</span>
            </div>
        </div>

        {/* Content Management Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

            {/* Recent Blogs */}
            <div>
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold font-helvetica">Recent Articles</h2>
                    <Link href="/admin/blogs" className="text-xs font-orbitron text-white/40 hover:text-white uppercase tracking-widest">View All</Link>
                </div>
                <div className="space-y-4">
                    {blogs?.slice(0, 5).map(blog => (
                        <div key={blog.id} className="group bg-white/5 border border-white/10 p-5 rounded-xl flex justify-between items-center hover:bg-white/10 transition-colors">
                            <div>
                                <h3 className="font-bold text-lg mb-1 group-hover:text-orange-400 transition-colors">{blog.title}</h3>
                                <div className="flex gap-3 text-xs text-white/40 font-mono">
                                    <span>{blog.views || 0} views</span>
                                    <span>•</span>
                                    <span>{new Date(blog.created_at).toLocaleDateString()}</span>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <Link href={`/admin/blogs/edit/${blog.id}`} className="p-2 hover:bg-white/10 rounded-lg text-white/40 hover:text-white transition-colors">Edit</Link>
                                <form action={async () => { 'use server'; await deleteBlog(blog.id); }}>
                                    <button className="p-2 hover:bg-red-500/20 rounded-lg text-white/40 hover:text-red-400 transition-colors"><FiTrash2/></button>
                                </form>
                            </div>
                        </div>
                    ))}
                    {blogs?.length === 0 && <p className="text-white/20 italic">No blogs yet.</p>}
                </div>
            </div>

            {/* Recent Testimonials */}
            <div>
                 <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold font-helvetica">Testimonials</h2>
                    <Link href="/admin/testimonials" className="text-xs font-orbitron text-white/40 hover:text-white uppercase tracking-widest">Manage All</Link>
                </div>
                <div className="space-y-4">
                     {testimonials?.slice(0, 5).map(t => (
                        <div key={t.id} className={`group bg-white/5 border ${t.approved ? 'border-green-500/20' : 'border-yellow-500/20'} p-5 rounded-xl transition-colors`}>
                            <div className="flex justify-between items-start mb-3">
                                <div className="flex items-center gap-3">
                                    {t.image_url ? <img src={t.image_url} alt={t.name} className="w-10 h-10 rounded-full object-cover" /> : <div className="w-10 h-10 rounded-full bg-white/10" />}
                                    <div>
                                        <h4 className="font-bold text-sm">{t.name}</h4>
                                        <p className="text-xs text-white/40">{t.role} @ {t.company}</p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                     <form action={async () => { 'use server'; await toggleTestimonialApproval(t.id, t.approved); }}>
                                        <button className={`p-2 rounded-lg text-xs font-orbitron uppercase tracking-wider ${t.approved ? 'text-green-400 bg-green-500/10' : 'text-yellow-400 bg-yellow-500/10'}`}>
                                            {t.approved ? 'Approved' : 'Pending'}
                                        </button>
                                    </form>
                                    <form action={async () => { 'use server'; await deleteTestimonial(t.id); }}>
                                        <button className="p-2 hover:bg-red-500/20 rounded-lg text-white/40 hover:text-red-400 transition-colors"><FiTrash2/></button>
                                    </form>
                                </div>
                            </div>
                            <p className="text-sm text-white/60 line-clamp-2 italic">"{t.content}"</p>
                        </div>
                    ))}
                    {testimonials?.length === 0 && <p className="text-white/20 italic">No testimonials yet.</p>}
                </div>
            </div>

        </div>
    </div>
  );
}
