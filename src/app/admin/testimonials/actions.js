'use server';

import { supabase } from '@/lib/supabase';
import { auth, currentUser } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';

// Admin helper
async function checkAdmin() {
    const user = await currentUser();
    const adminEmail = process.env.ADMIN_EMAIL;
    return user?.emailAddresses[0]?.emailAddress === adminEmail;
}

export async function createTestimonial(formData) {
    // This can be public or admin-only depending on requirements
    // For now, let's make it Admin-only URL creation, or Public via a form?
    // User requested "Admin panel" management, likely manual entry by Admin for now.

    const isAdmin = await checkAdmin();
    if (!isAdmin) return { success: false, message: 'Unauthorized' };

    const name = formData.get('name');
    const role = formData.get('role');
    const company = formData.get('company');
    const content = formData.get('content');
    const image_url = formData.get('image_url');

    const { error } = await supabase.from('testimonials').insert([{
        name, role, company, content, image_url, approved: true // Auto-approve if Admin adds it
    }]);

    if (error) return { success: false, message: error.message };

    revalidatePath('/admin');
    revalidatePath('/');
    return { success: true };
}

export async function deleteTestimonial(id) {
    const isAdmin = await checkAdmin();
    if (!isAdmin) return { success: false, message: 'Unauthorized' };

    await supabase.from('testimonials').delete().eq('id', id);
    revalidatePath('/admin');
    return { success: true };
}

export async function toggleTestimonialApproval(id, currentStatus) {
    const isAdmin = await checkAdmin();
    if (!isAdmin) return { success: false, message: 'Unauthorized' };

    await supabase.from('testimonials').update({ approved: !currentStatus }).eq('id', id);
    revalidatePath('/admin');
    return { success: true };
}

export async function getApprovedTestimonials() {
    // Public fetch - no admin check needed, but strictly filter by approved
    const { data } = await supabase
        .from('testimonials')
        .select('*')
        .eq('approved', true)
        .order('created_at', { ascending: false });

    return data || [];
}
