import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { deleteBlog } from '@/actions/blogs';
import DeleteBlogButton from './DeleteBlogButton';

export default async function AdminBlogsPage() {
  // Fetch blogs - checking for empty
  const { data: blogs, error } = await supabase
    .from('blogs')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return <div className="text-red-500">Error loading blogs: {error.message}</div>;
  }

  return (
    <div className="min-h-screen bg-black text-white p-8 pt-24">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold font-helvetica">Manage Blogs</h1>
          <Link
            href="/admin/blogs/new"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-orbitron text-sm uppercase tracking-wider transition-colors"
          >
            Create New
          </Link>
        </div>

        <div className="space-y-4">
          {blogs?.length === 0 ? (
            <p className="text-white/40">No blogs found. Create your first one!</p>
          ) : (
            blogs.map((blog) => (
              <div key={blog.id} className="bg-white/5 border border-white/10 rounded-xl p-6 flex justify-between items-center group hover:bg-white/10 transition-colors">
                <div>
                  <h3 className="text-xl font-bold mb-1">{blog.title}</h3>
                  <p className="text-white/40 text-sm font-mono">{blog.slug}</p>
                </div>
                <div className="flex gap-4">
                  <Link href={`/blogs/${blog.slug}`} target="_blank" className="text-blue-400 hover:text-blue-300 text-sm font-orbitron uppercase">View</Link>
                  <Link href={`/admin/blogs/edit/${blog.id}`} className="text-yellow-400 hover:text-yellow-300 text-sm font-orbitron uppercase">Edit</Link>
                  <DeleteBlogButton blogId={blog.id} />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
