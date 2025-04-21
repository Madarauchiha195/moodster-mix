import { supabase } from '@/lib/supabase';
import { Content } from '@/lib/supabase';

export const contentService = {
  // Get all content
  async getContent(): Promise<Content[]> {
    const { data, error } = await supabase
      .from('contents')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  // Get content by type
  async getContentByType(type: 'movie' | 'song'): Promise<Content[]> {
    const { data, error } = await supabase
      .from('contents')
      .select('*')
      .eq('type', type)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  // Add new content
  async addContent(content: Omit<Content, 'id' | 'created_at'>): Promise<Content> {
    const { data, error } = await supabase
      .from('contents')
      .insert([
        {
          ...content,
          created_at: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Update content
  async updateContent(id: string, content: Partial<Content>): Promise<Content> {
    const { data, error } = await supabase
      .from('contents')
      .update(content)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Delete content
  async deleteContent(id: string): Promise<void> {
    const { error } = await supabase
      .from('contents')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },
}; 