'use server';

import { supabase } from '@/lib/supabase';
import { currentUser } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';

// Admin helper
async function checkAdmin() {
    const user = await currentUser();
    const adminEmail = process.env.ADMIN_EMAIL;
    return user?.emailAddresses[0]?.emailAddress === adminEmail;
}

export async function submitTestimonial(formData) {
    const user = await currentUser();

    if (!user) {
        return { success: false, message: 'You must be logged in to submit a testimonial.' };
    }

    const content = formData.get('content');
    const role = formData.get('role');
    const company = formData.get('company');
    const socialLink = formData.get('social_link');

    if (!content) {
        return { success: false, message: 'Content is required.' };
    }

    // User selects avatar or defaults to Clerk image
    const avatarUrl = formData.get('avatar_url') || user.imageUrl;

    // Use Clerk user details for name
    const name = `${user.firstName} ${user.lastName || ''}`.trim() || user.username || 'Anonymous';

    try {
        const { error } = await supabase.from('testimonials').insert({
            name,
            role: role || null, // Handle optional fields
            company: company || null,
            content,
            image_url: avatarUrl,
            social_link: socialLink || null,
            approved: false, // Pending approval
        });

        if (error) {
            console.error('Supabase error:', error);
            return { success: false, message: 'Failed to submit testimonial. Please try again.' };
        }

        return { success: true, message: 'Testimonial submitted successfully! It will be visible after approval.' };
    } catch (error) {
        console.error('Server error:', error);
        return { success: false, message: 'An unexpected error occurred.' };
    }
}

export async function createTestimonial(formData) {
    const isAdmin = await checkAdmin();
    if (!isAdmin) return { success: false, message: 'Unauthorized' };

    const name = formData.get('name');
    const role = formData.get('role');
    const company = formData.get('company');
    const content = formData.get('content');
    const image_url = formData.get('image_url');
    const social_link = formData.get('social_link');

    const { error } = await supabase.from('testimonials').insert([{
        name, role, company, content, image_url, social_link, approved: true
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
    revalidatePath('/');
    return { success: true };
}

export async function toggleTestimonialApproval(id, currentStatus) {
    const isAdmin = await checkAdmin();
    if (!isAdmin) return { success: false, message: 'Unauthorized' };

    await supabase.from('testimonials').update({ approved: !currentStatus }).eq('id', id);
    revalidatePath('/admin');
    revalidatePath('/');
    return { success: true };
}

export async function getApprovedTestimonials() {
    const { data } = await supabase
        .from('testimonials')
        .select('*')
        .eq('approved', true)
        .order('created_at', { ascending: false });

    return data || [];
}
