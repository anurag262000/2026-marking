import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_SUPABASE_URL;
const supabaseKey = process.env.NEXT_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

// Admin client for server-side operations (uses Service Role Key to bypass RLS)
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!serviceRoleKey) {
  console.warn('WARNING: SUPABASE_SERVICE_ROLE_KEY is missing. Admin actions may fail due to permissions.');
} else {
  console.log('SUCCESS: SUPABASE_SERVICE_ROLE_KEY detected. Admin client initialized.');
}

export const adminSupabase = serviceRoleKey 
  ? createClient(supabaseUrl, serviceRoleKey)
  : supabase;
