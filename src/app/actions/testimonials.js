'use server';

import { supabase } from '@/lib/supabase';
import { currentUser } from '@clerk/nextjs/server';

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
