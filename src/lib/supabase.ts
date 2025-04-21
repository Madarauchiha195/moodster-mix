import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

// Create anon client for client-side operations
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

// Create service role client for server-side operations
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

// Types for our database tables
export type Profile = {
  id: string;
  username: string;
  email: string;
  phone?: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
};

export type Playlist = {
  id: string;
  user_id: string;
  name: string;
  description?: string;
  created_at: string;
  updated_at: string;
};

export type PlaylistItem = {
  playlist_id: string;
  content_id: string;
  position: number;
  created_at: string;
};

export type Content = {
  id: string;
  title: string;
  description?: string;
  type: 'song' | 'movie';
  url?: string;
  image_url?: string;
  created_at: string;
  updated_at: string;
}; 