import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { FiCheck, FiX, FiTrash2, FiArrowLeft, FiEye, FiEyeOff } from 'react-icons/fi';
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

  const approvedTestimonials = testimonials?.filter(t => t.approved) || [];
  const pendingTestimonials = testimonials?.filter(t => !t.approved) || [];

  function TestimonialCard({ t }) {
        return (
              <div className={`bg-white/5 border ${t.approved ? 'border-green-500/30' : 'border-yellow-500/30'} rounded-2xl p-6 flex flex-col justify-between group hover:bg-white/10 transition-colors h-full`}>
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
                            <p className="text-xs text-white/40">{t.role} {t.company ? `@ ${t.company}` : ''}</p>
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
                        <button className={`w-full py-2 rounded-lg text-xs font-orbitron uppercase tracking-wider font-bold transition-colors flex items-center justify-center gap-2 ${t.approved ? 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white' : 'bg-green-500/10 text-green-500 hover:bg-green-500/20'}`}>
                            {t.approved ? <><FiEyeOff /> Hide</> : <><FiCheck /> Approve</>}
                        </button>
                    </form>
                    <form action={async () => { 'use server'; await deleteTestimonial(t.id); }}>
                        <button className="p-2 bg-red-500/10 text-red-500 hover:bg-red-500/20 rounded-lg transition-colors" title="Delete">
                            <FiTrash2 size={18} />
                        </button>
                    </form>
                </div>
              </div>
        );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white p-6 md:p-12 font-inter">
      <div className="max-w-[1600px] mx-auto">
        <div className="flex items-center gap-4 mb-8">
             <Link href="/admin" className="p-3 bg-white/5 rounded-full hover:bg-white/10 transition-colors">
                <FiArrowLeft />
             </Link>
             <h1 className="text-3xl font-bold font-helvetica">Manage Testimonials</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Pending / Hidden Section */}
            <div className="bg-white/5 rounded-3xl p-6 border border-white/5">
                <h2 className="text-xl font-bold font-bitcount text-white/50 mb-6 uppercase flex items-center gap-3 sticky top-0 bg-[#0e0e0e] py-4 z-10 -mt-4 -mx-2 px-2 backdrop-blur-md rounded-xl">
                    <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                    Pending / Hidden <span className="text-sm bg-white/5 px-2 py-1 rounded-full text-white/30">{pendingTestimonials.length}</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
                    {pendingTestimonials.length === 0 ? (
                        <p className="text-white/20 col-span-full italic text-center py-10">No pending reviews.</p>
                    ) : (
                        pendingTestimonials.map((t) => (
                            <TestimonialCard key={t.id} t={t} />
                        ))
                    )}
                </div>
            </div>

            {/* Approved Section */}
            <div className="bg-white/5 rounded-3xl p-6 border border-white/5">
                <h2 className="text-xl font-bold font-bitcount text-green-500 mb-6 uppercase flex items-center gap-3 sticky top-0 bg-[#0e0e0e] py-4 z-10 -mt-4 -mx-2 px-2 backdrop-blur-md rounded-xl">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    Published Endorsements <span className="text-sm bg-green-500/10 px-2 py-1 rounded-full text-green-500">{approvedTestimonials.length}</span>
                </h2>
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
                    {approvedTestimonials.length === 0 ? (
                        <p className="text-white/20 col-span-full italic text-center py-10">No published reviews yet.</p>
                    ) : (
                        approvedTestimonials.map((t) => (
                            <TestimonialCard key={t.id} t={t} />
                        ))
                    )}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
