import { supabase } from '@/lib/supabase';
import { Playlist, PlaylistItem } from '@/lib/supabase';

export const playlistService = {
  // Get all playlists for the current user
  async getPlaylists(userId: string): Promise<Playlist[]> {
    const { data, error } = await supabase
      .from('playlists')
      .select(`
        *,
        items:playlist_items(
          *,
          content:contents(*)
        )
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  // Create a new playlist
  async createPlaylist(name: string, userId: string): Promise<Playlist> {
    const { data, error } = await supabase
      .from('playlists')
      .insert([
        {
          name,
          user_id: userId,
          created_at: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Add an item to a playlist
  async addToPlaylist(playlistId: string, contentId: string, contentType: 'movie' | 'song'): Promise<PlaylistItem> {
    const { data, error } = await supabase
      .from('playlist_items')
      .insert([
        {
          playlist_id: playlistId,
          content_id: contentId,
          content_type: contentType,
          created_at: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Remove an item from a playlist
  async removeFromPlaylist(playlistId: string, itemId: string): Promise<void> {
    const { error } = await supabase
      .from('playlist_items')
      .delete()
      .eq('playlist_id', playlistId)
      .eq('id', itemId);

    if (error) throw error;
  },

  // Delete a playlist
  async deletePlaylist(playlistId: string): Promise<void> {
    const { error } = await supabase
      .from('playlists')
      .delete()
      .eq('id', playlistId);

    if (error) throw error;
  },
}; 