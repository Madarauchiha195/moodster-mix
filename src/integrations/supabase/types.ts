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
      stock_historical_data: {
        Row: {
          close_price: number
          created_at: string | null
          date: string
          high_price: number
          id: string
          low_price: number
          open_price: number
          stock_id: string | null
          volume: number
        }
        Insert: {
          close_price: number
          created_at?: string | null
          date: string
          high_price: number
          id?: string
          low_price: number
          open_price: number
          stock_id?: string | null
          volume: number
        }
        Update: {
          close_price?: number
          created_at?: string | null
          date?: string
          high_price?: number
          id?: string
          low_price?: number
          open_price?: number
          stock_id?: string | null
          volume?: number
        }
        Relationships: [
          {
            foreignKeyName: "stock_historical_data_stock_id_fkey"
            columns: ["stock_id"]
            isOneToOne: false
            referencedRelation: "stocks"
            referencedColumns: ["id"]
          },
        ]
      }
      stocks: {
        Row: {
          avg_volume: number | null
          beta: number | null
          currency: string | null
          current_price: number
          dividend_yield: number | null
          eps: number | null
          fifty_two_week_high: number | null
          fifty_two_week_low: number | null
          id: string
          industry: string | null
          last_updated: string | null
          market_cap: number | null
          market_cap_category: string | null
          name: string
          pe_ratio: number | null
          revenue_growth: number | null
          sector: string | null
          symbol: string
          type: string
          volume: number | null
          year_high: number | null
          year_low: number | null
        }
        Insert: {
          avg_volume?: number | null
          beta?: number | null
          currency?: string | null
          current_price: number
          dividend_yield?: number | null
          eps?: number | null
          fifty_two_week_high?: number | null
          fifty_two_week_low?: number | null
          id?: string
          industry?: string | null
          last_updated?: string | null
          market_cap?: number | null
          market_cap_category?: string | null
          name: string
          pe_ratio?: number | null
          revenue_growth?: number | null
          sector?: string | null
          symbol: string
          type: string
          volume?: number | null
          year_high?: number | null
          year_low?: number | null
        }
        Update: {
          avg_volume?: number | null
          beta?: number | null
          currency?: string | null
          current_price?: number
          dividend_yield?: number | null
          eps?: number | null
          fifty_two_week_high?: number | null
          fifty_two_week_low?: number | null
          id?: string
          industry?: string | null
          last_updated?: string | null
          market_cap?: number | null
          market_cap_category?: string | null
          name?: string
          pe_ratio?: number | null
          revenue_growth?: number | null
          sector?: string | null
          symbol?: string
          type?: string
          volume?: number | null
          year_high?: number | null
          year_low?: number | null
        }
        Relationships: []
      }
      user_preferences: {
        Row: {
          created_at: string | null
          default_currency: string | null
          id: string
          notification_preferences: Json | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          default_currency?: string | null
          id?: string
          notification_preferences?: Json | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          default_currency?: string | null
          id?: string
          notification_preferences?: Json | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_preferences_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string | null
          email: string
          id: string
          preferred_currency: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          preferred_currency?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          preferred_currency?: string | null
        }
        Relationships: []
      }
      watchlists: {
        Row: {
          created_at: string | null
          id: string
          stock_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          stock_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          stock_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "watchlists_stock_id_fkey"
            columns: ["stock_id"]
            isOneToOne: false
            referencedRelation: "stocks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "watchlists_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
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
