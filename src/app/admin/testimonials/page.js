import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { FiCheck, FiX, FiTrash2, FiArrowLeft } from 'react-icons/fi';
import { deleteTestimonial, toggleTestimonialApproval } from './actions';

export const revalidate = 0;

export default async function AdminTestimonialsPage() {
  const { data: testimonials, error } = await supabase
    .from('testimonials')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return <div className="text-red-500 p-8">Error loading testimonials: {error.message}</div>;
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white p-6 md:p-12 font-inter">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
             <Link href="/admin" className="p-3 bg-white/5 rounded-full hover:bg-white/10 transition-colors">
                <FiArrowLeft />
             </Link>
             <h1 className="text-3xl font-bold font-helvetica">Manage Testimonials</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials?.length === 0 ? (
            <p className="text-white/40 col-span-full text-center py-20">No testimonials found.</p>
          ) : (
            testimonials.map((t) => (
              <div key={t.id} className={`bg-white/5 border ${t.approved ? 'border-green-500/30' : 'border-yellow-500/30'} rounded-2xl p-6 flex flex-col justify-between group hover:bg-white/10 transition-colors h-full`}>
                <div>
                   <div className="flex items-center gap-4 mb-4">
                        {t.image_url ? (
                            <img src={t.image_url} alt={t.name} className="w-12 h-12 rounded-full object-cover border-2 border-white/10" />
                        ) : (
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center font-bold text-lg">
                                {t.name[0]}
                            </div>
                        )}
                        <div>
                            <h3 className="font-bold text-lg leading-tight">{t.name}</h3>
                            <p className="text-xs text-white/40">{t.role} @ {t.company}</p>
                        </div>
                   </div>
                   <div className="relative mb-6">
                        <span className="absolute top-0 left-0 text-4xl text-white/10 font-serif -translate-y-2">“</span>
                        <p className="text-sm text-white/70 leading-relaxed italic relative z-10 pl-2">
                            {t.content}
                        </p>
                   </div>
                </div>

                <div className="flex gap-2 pt-4 border-t border-white/5 mt-auto">
                    <form action={async () => { 'use server'; await toggleTestimonialApproval(t.id, t.approved); }} className="flex-1">
                        <button className={`w-full py-2 rounded-lg text-xs font-orbitron uppercase tracking-wider font-bold transition-colors flex items-center justify-center gap-2 ${t.approved ? 'bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20' : 'bg-green-500/10 text-green-500 hover:bg-green-500/20'}`}>
                            {t.approved ? <><FiX /> Reject</> : <><FiCheck /> Approve</>}
                        </button>
                    </form>
                    <form action={async () => { 'use server'; await deleteTestimonial(t.id); }}>
                        <button className="p-2 bg-red-500/10 text-red-500 hover:bg-red-500/20 rounded-lg transition-colors" title="Delete">
                            <FiTrash2 size={18} />
                        </button>
                    </form>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
