'use server';

import { supabase } from '@/lib/supabase';
import { currentUser } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';

// --- COMMENTS ---

export async function submitComment(blogSlug, content) {
  const user = await currentUser();
  if (!user) return { success: false, message: 'Unauthorized' };

  const name = `${user.firstName} ${user.lastName || ''}`.trim() || user.username || 'Anonymous';

  const { error } = await supabase.from('blog_comments').insert({
    blog_slug: blogSlug,
    user_id: user.id,
    user_name: name,
    user_image: user.imageUrl,
    content: content
  });

  if (error) {
    console.error('Comment error:', error);
    return { success: false, message: 'Failed to post comment' };
  }

  revalidatePath(`/blogs/${blogSlug}`);
  return { success: true };
}

export async function getComments(blogSlug) {
  const { data, error } = await supabase
    .from('blog_comments')
    .select('*')
    .eq('blog_slug', blogSlug)
    .order('created_at', { ascending: false });

  if (error) return [];
  return data;
}

export async function deleteComment(commentId, blogSlug) {
  const user = await currentUser();
  if (!user) return { success: false, message: 'Unauthorized' };

   // We must also verify the comment belongs to the user, but for now we rely on the condition match in delete
   // Actually, RLS handles it, but let's be explicit
   const { error } = await supabase
    .from('blog_comments')
    .delete()
    .eq('id', commentId)
    .eq('user_id', user.id); // Security: Ensure user owns comment

  if (error) return { success: false, message: 'Failed to delete' };

  revalidatePath(`/blogs/${blogSlug}`);
  return { success: true };
}


// --- LIKES ---

export async function toggleLike(blogSlug) {
  const user = await currentUser();
  if (!user) return { success: false, message: 'Unauthorized' };

  // Check if liked
  const { data: existing } = await supabase
    .from('blog_likes')
    .select('id')
    .eq('blog_slug', blogSlug)
    .eq('user_id', user.id)
    .single();

  if (existing) {
    // Unlike
    await supabase.from('blog_likes').delete().eq('id', existing.id);
  } else {
    // Like
    await supabase.from('blog_likes').insert({
      blog_slug: blogSlug,
      user_id: user.id
    });
  }

  revalidatePath(`/blogs/${blogSlug}`);
  return { success: true };
}

export async function getLikeStatus(blogSlug) {
  const user = await currentUser();

  // Get total
  const { count } = await supabase
    .from('blog_likes')
    .select('*', { count: 'exact', head: true })
    .eq('blog_slug', blogSlug);

  let isLiked = false;

  if (user) {
    const { data } = await supabase
        .from('blog_likes')
        .select('id')
        .eq('blog_slug', blogSlug)
        .eq('user_id', user.id)
        .single();
    if (data) isLiked = true;
  }

  return { count: count || 0, isLiked };
}
