export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      moods: {
        Row: {
          created_at: string
          id: string
          mood: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          mood?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          mood?: string | null
          user_id?: string
        }
        Relationships: []
      }
      movies: {
        Row: {
          description: string
          genre: string
          id: number
          image_url: string
          platform: string[] | null
          rating: number | null
          title: string
          year: number
        }
        Insert: {
          description: string
          genre: string
          id?: number
          image_url: string
          platform?: string[] | null
          rating?: number | null
          title: string
          year: number
        }
        Update: {
          description?: string
          genre?: string
          id?: number
          image_url?: string
          platform?: string[] | null
          rating?: number | null
          title?: string
          year?: number
        }
        Relationships: []
      }
      playlist_items: {
        Row: {
          created_at: string | null
          id: string
          item_id: number
          item_type: string
          playlist_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          item_id: number
          item_type: string
          playlist_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          item_id?: number
          item_type?: string
          playlist_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "playlist_items_playlist_id_fkey"
            columns: ["playlist_id"]
            isOneToOne: false
            referencedRelation: "playlists"
            referencedColumns: ["id"]
          },
        ]
      }
      playlists: {
        Row: {
          created_at: string | null
          creator: string
          description: string | null
          id: string
          mood: string
          name: string
        }
        Insert: {
          created_at?: string | null
          creator: string
          description?: string | null
          id?: string
          mood: string
          name: string
        }
        Update: {
          created_at?: string | null
          creator?: string
          description?: string | null
          id?: string
          mood?: string
          name?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          gender: string | null
          id: string
          username: string | null
        }
        Insert: {
          created_at?: string
          gender?: string | null
          id: string
          username?: string | null
        }
        Update: {
          created_at?: string
          gender?: string | null
          id?: string
          username?: string | null
        }
        Relationships: []
      }
      shared_playlists: {
        Row: {
          created_at: string
          description: string | null
          id: string
          mood: string | null
          title: string
          user_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          mood?: string | null
          title: string
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          mood?: string | null
          title?: string
          user_id?: string
        }
        Relationships: []
      }
      songs: {
        Row: {
          album: string
          artist: string
          description: string
          genre: string
          id: number
          image_url: string
          title: string
          year: number
        }
        Insert: {
          album: string
          artist: string
          description: string
          genre: string
          id?: number
          image_url: string
          title: string
          year: number
        }
        Update: {
          album?: string
          artist?: string
          description?: string
          genre?: string
          id?: number
          image_url?: string
          title?: string
          year?: number
        }
        Relationships: []
      }
      user_liked_content: {
        Row: {
          content_id: number
          content_type: string | null
          created_at: string
          id: string
          user_id: string
        }
        Insert: {
          content_id: number
          content_type?: string | null
          created_at?: string
          id?: string
          user_id: string
        }
        Update: {
          content_id?: number
          content_type?: string | null
          created_at?: string
          id?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
