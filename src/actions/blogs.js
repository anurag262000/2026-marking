'use server';

import { supabase, adminSupabase } from '@/lib/supabase';
import { auth, currentUser } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

/**
 * --- BLOG MANAGEMENT (ADMIN) ---
 */

export async function createBlog(formData) {
  const { userId } = await auth();
  const user = await currentUser();

  if (!userId) {
    return { success: false, message: 'Unauthorized' };
  }

  // Admin Check
  const adminEmail = process.env.ADMIN_EMAIL;
  const userEmail = user?.emailAddresses[0]?.emailAddress;

  if (userEmail !== adminEmail) {
    return { success: false, message: 'Unauthorized Access' };
  }

  const title = formData.get('title');
  const slug = formData.get('slug');
  const excerpt = formData.get('excerpt');
  const content = formData.get('content');
  const imageFile = formData.get('image');

  let image_url = null;

  // Handle Image Upload and Processing
  if (imageFile && imageFile.size > 0) {
    try {
      const { Buffer } = await import('node:buffer');
      const sharpModule = await import('sharp');
      const sharp = sharpModule.default;
      
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const webpBuffer = await sharp(buffer)
        .resize({ width: 1920, withoutEnlargement: true })
        .webp({ quality: 80 })
        .toBuffer();

      const fileName = `${Date.now()}-${slug}.webp`;
      const filePath = `blog-covers/${fileName}`;

      const { data: uploadData, error: uploadError } = await adminSupabase.storage
        .from('blog-images')
        .upload(filePath, webpBuffer, {
          contentType: 'image/webp'
        });

      if (uploadError) {
        console.error('Storage Upload Error:', uploadError);
        return { success: false, message: `Storage Error: ${uploadError.message}` };
      }

      const { data: { publicUrl } } = adminSupabase.storage
        .from('blog-images')
        .getPublicUrl(filePath);
      
      image_url = publicUrl;
    } catch (err) {
      console.error('CRITICAL: Image Processing Error:', err);
      return { success: false, message: `Image optimization failed: ${err.message}` };
    }
  }

  const seo_title = formData.get('seo_title') || title;
  const seo_description = formData.get('seo_description') || excerpt;
  const tagsString = formData.get('tags');
  const tags = tagsString ? tagsString.split(',').map(t => t.trim()).filter(Boolean) : [];

  if (!title || !slug || !content) {
    return { success: false, message: 'Title, Slug, and Content are required.' };
  }

  const { data, error } = await adminSupabase
    .from('blogs')
    .insert([
      {
        title,
        slug,
        excerpt,
        content,
        image_url,
        seo_title,
        seo_description,
        tags,
        published: true,
        author_email: userEmail,
      },
    ])
    .select();

  if (error) {
    console.error('Database Insertion Error:', error);
    return { success: false, message: error.message };
  }

  revalidatePath('/blogs');
  revalidatePath('/admin/blogs');
  redirect('/admin/blogs');
}

export async function updateBlog(id, formData) {
  const { userId } = await auth();
  const user = await currentUser();
  const adminEmail = process.env.ADMIN_EMAIL;
  const userEmail = user?.emailAddresses[0]?.emailAddress;

  if (!userId || userEmail !== adminEmail) {
    return { success: false, message: 'Unauthorized' };
  }

  const title = formData.get('title');
  const slug = formData.get('slug');
  const excerpt = formData.get('excerpt');
  const content = formData.get('content');
  const imageFile = formData.get('image');
  let image_url = formData.get('existing_image_url');

  if (imageFile && imageFile.size > 0) {
    try {
      const { Buffer } = await import('node:buffer');
      const sharpModule = await import('sharp');
      const sharp = sharpModule.default;

      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const webpBuffer = await sharp(buffer)
        .resize({ width: 1920, withoutEnlargement: true })
        .webp({ quality: 80 })
        .toBuffer();

      const fileName = `${Date.now()}-${slug}.webp`;
      const filePath = `blog-covers/${fileName}`;

      const { error: uploadError } = await adminSupabase.storage
        .from('blog-images')
        .upload(filePath, webpBuffer, {
          contentType: 'image/webp'
        });

      if (uploadError) {
        console.error('Storage Upload Error in Update:', uploadError);
        return { success: false, message: `Storage Error: ${uploadError.message}` };
      } else {
        const { data: { publicUrl } } = adminSupabase.storage
          .from('blog-images')
          .getPublicUrl(filePath);
        image_url = publicUrl;
      }
    } catch (err) {
      console.error('CRITICAL: Update Image Processing Exception:', err);
      return { success: false, message: `Image optimization failed: ${err.message}` };
    }
  }

  const seo_title = formData.get('seo_title') || title;
  const seo_description = formData.get('seo_description') || excerpt;
  const tagsString = formData.get('tags');
  const tags = tagsString ? tagsString.split(',').map(t => t.trim()).filter(Boolean) : [];

  const updateData = {
    title,
    slug,
    excerpt,
    content,
    image_url,
    seo_title,
    seo_description,
    tags,
  };

  const { error } = await adminSupabase
    .from('blogs')
    .update(updateData)
    .eq('id', id);

  if (error) {
    console.error('Database Update Error:', error);
    return { success: false, message: error.message };
  }

  revalidatePath('/blogs');
  revalidatePath(`/blogs/${slug}`);
  revalidatePath('/admin/blogs');
  revalidatePath('/', 'layout');
  
  return { success: true };
}

export async function deleteBlog(id) {
    const { userId } = await auth();
    const user = await currentUser();
    const adminEmail = process.env.ADMIN_EMAIL;

    if (!userId || user?.emailAddresses[0]?.emailAddress !== adminEmail) {
        return { success: false, message: 'Unauthorized' };
    }

    const { error } = await adminSupabase.from('blogs').delete().eq('id', id);

    if (error) {
        return { success: false, message: error.message };
    }

    revalidatePath('/blogs');
    revalidatePath('/admin/blogs');
    return { success: true };
}

/**
 * --- BLOG DATA FETCHING (GET) ---
 */

export async function getBlogBySlug(slug) {
  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) return null;
  return data;
}

export async function getBlogById(id) {
  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) {
    console.error('Fetch Blog Error:', error);
    return null;
  }
  return data;
}

/**
 * --- BLOG ENGAGEMENT (PUBLIC) ---
 */

export async function incrementBlogView(slug) {
    const { data: blog } = await supabase.from('blogs').select('id, views').eq('slug', slug).single();
    if (blog) {
        await supabase.from('blogs').update({ views: (blog.views || 0) + 1 }).eq('id', blog.id);
    }
}

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

   const { error } = await supabase
    .from('blog_comments')
    .delete()
    .eq('id', commentId)
    .eq('user_id', user.id);

  if (error) return { success: false, message: 'Failed to delete' };

  revalidatePath(`/blogs/${blogSlug}`);
  return { success: true };
}

// --- LIKES ---

export async function toggleLike(blogSlug) {
  const user = await currentUser();
  if (!user) return { success: false, message: 'Unauthorized' };

  const { data: existing } = await supabase
    .from('blog_likes')
    .select('id')
    .eq('blog_slug', blogSlug)
    .eq('user_id', user.id)
    .single();

  if (existing) {
    await supabase.from('blog_likes').delete().eq('id', existing.id);
  } else {
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
