'use server';

import { supabase } from '@/lib/supabase';
import { auth, currentUser } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createBlog(formData) {
  const { userId } = await auth();
  const user = await currentUser();

  if (!userId) {
    return { success: false, message: 'Unauthorized' };
  }

  // Admin Check (Double check for safety)
  const adminEmail = process.env.ADMIN_EMAIL;
  const userEmail = user?.emailAddresses[0]?.emailAddress;

  if (userEmail !== adminEmail) {
    return { success: false, message: 'Unauthorized Access' };
  }

  /* Existing createBlog code updated */
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
      // Use import() with .default for sharp
      const sharpModule = await import('sharp');
      const sharp = sharpModule.default;
      
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Convert to WebP using sharp
      const webpBuffer = await sharp(buffer)
        .webp({ quality: 80 })
        .toBuffer();

      const fileName = `${Date.now()}-${slug}.webp`;
      const filePath = `blog-covers/${fileName}`;

      // Upload to Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('blog-images')
        .upload(filePath, webpBuffer, {
          contentType: 'image/webp',
          upsert: true
        });

      if (uploadError) {
        console.error('Storage Upload Error:', uploadError);
        return { success: false, message: `Storage Error: ${uploadError.message}` };
      }

      // Get Public URL
      const { data: { publicUrl } } = supabase.storage
        .from('blog-images')
        .getPublicUrl(filePath);
      
      image_url = publicUrl;
    } catch (err) {
      console.error('Image Processing Error:', err);
      // If sharp fails (e.g. missing native dependencies on some environments), fallback or alert
      // return { success: false, message: 'Image optimization failed. Please try again or use a different format.' };
    }
  }

  // New Fields
  const seo_title = formData.get('seo_title') || title;
  const seo_description = formData.get('seo_description') || excerpt;
  const tagsString = formData.get('tags'); // Expecting comma separated
  const tags = tagsString ? tagsString.split(',').map(t => t.trim()).filter(Boolean) : [];

  if (!title || !slug || !content) {
    return { success: false, message: 'Title, Slug, and Content are required.' };
  }

  const { data, error } = await supabase
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

  console.log('Blog Created Successfully:', data[0]?.id);

  revalidatePath('/blogs');
  revalidatePath('/admin/blogs');
  redirect('/admin/blogs');
}

export async function incrementBlogView(slug) {
    // Basic view counter (server-side to avoid strict RLS issues if public write isn't allowed)
    // In a real app, use RPC or a separate analytics table to prevent race conditions.
    // For simplicity: fetch -> increment -> update

    const { data: blog } = await supabase.from('blogs').select('id, views').eq('slug', slug).single();
    if (blog) {
        await supabase.from('blogs').update({ views: (blog.views || 0) + 1 }).eq('id', blog.id);
    }
}

export async function deleteBlog(id) {
    const { userId } = await auth();
    const user = await currentUser();
    const adminEmail = process.env.ADMIN_EMAIL;

    if (!userId || user?.emailAddresses[0]?.emailAddress !== adminEmail) {
        return { success: false, message: 'Unauthorized' };
    }

    const { error } = await supabase.from('blogs').delete().eq('id', id);

    if (error) {
        return { success: false, message: error.message };
    }

    revalidatePath('/blogs');
    revalidatePath('/admin/blogs');
    return { success: true };
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

  // Handle New Image if provided
  if (imageFile && imageFile.size > 0) {
    try {
      const { Buffer } = await import('node:buffer');
      const sharpModule = await import('sharp');
      const sharp = sharpModule.default;

      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const webpBuffer = await sharp(buffer)
        .webp({ quality: 80 })
        .toBuffer();

      const fileName = `${Date.now()}-${slug}.webp`;
      const filePath = `blog-covers/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('blog-images')
        .upload(filePath, webpBuffer, {
          contentType: 'image/webp',
          upsert: true
        });

      if (!uploadError) {
        const { data: { publicUrl } } = supabase.storage
          .from('blog-images')
          .getPublicUrl(filePath);
        image_url = publicUrl;
      }
    } catch (err) {
      console.error('Update Image Error:', err);
    }
  }

  const seo_title = formData.get('seo_title') || title;
  const seo_description = formData.get('seo_description') || excerpt;
  const tagsString = formData.get('tags');
  const tags = tagsString ? tagsString.split(',').map(t => t.trim()).filter(Boolean) : [];

  const { error } = await supabase
    .from('blogs')
    .update({
      title,
      slug,
      excerpt,
      content,
      image_url,
      seo_title,
      seo_description,
      tags,
    })
    .eq('id', id);

  if (error) {
    return { success: false, message: error.message };
  }

  revalidatePath('/blogs');
  revalidatePath(`/blogs/${slug}`);
  revalidatePath('/admin/blogs');
  return { success: true };
}
