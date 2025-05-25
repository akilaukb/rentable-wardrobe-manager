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
      customers: {
        Row: {
          created_at: string | null
          email: string
          id: string
          name: string
          notification_status: boolean | null
          phone: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          name: string
          notification_status?: boolean | null
          phone: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          name?: string
          notification_status?: boolean | null
          phone?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      orders: {
        Row: {
          additional_remarks: string | null
          advance_payment: number | null
          commission_amount: number | null
          created_at: string | null
          customer_id: string
          final_payment: number | null
          id: string
          order_number: string
          product_id: string
          rental_end_date: string
          rental_start_date: string
          staff_id: string
          status: Database["public"]["Enums"]["order_status"]
          total_amount: number
          updated_at: string | null
        }
        Insert: {
          additional_remarks?: string | null
          advance_payment?: number | null
          commission_amount?: number | null
          created_at?: string | null
          customer_id: string
          final_payment?: number | null
          id?: string
          order_number: string
          product_id: string
          rental_end_date: string
          rental_start_date: string
          staff_id: string
          status?: Database["public"]["Enums"]["order_status"]
          total_amount: number
          updated_at?: string | null
        }
        Update: {
          additional_remarks?: string | null
          advance_payment?: number | null
          commission_amount?: number | null
          created_at?: string | null
          customer_id?: string
          final_payment?: number | null
          id?: string
          order_number?: string
          product_id?: string
          rental_end_date?: string
          rental_start_date?: string
          staff_id?: string
          status?: Database["public"]["Enums"]["order_status"]
          total_amount?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "orders_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_staff_id_fkey"
            columns: ["staff_id"]
            isOneToOne: false
            referencedRelation: "staff"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          adjustment_notes: string | null
          category: string
          created_at: string | null
          id: string
          name: string
          price_per_day: number
          status: Database["public"]["Enums"]["product_status"]
          stock_quantity: number
          updated_at: string | null
        }
        Insert: {
          adjustment_notes?: string | null
          category: string
          created_at?: string | null
          id?: string
          name: string
          price_per_day: number
          status?: Database["public"]["Enums"]["product_status"]
          stock_quantity?: number
          updated_at?: string | null
        }
        Update: {
          adjustment_notes?: string | null
          category?: string
          created_at?: string | null
          id?: string
          name?: string
          price_per_day?: number
          status?: Database["public"]["Enums"]["product_status"]
          stock_quantity?: number
          updated_at?: string | null
        }
        Relationships: []
      }
      staff: {
        Row: {
          commission_earned: number | null
          created_at: string | null
          id: string
          name: string
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          commission_earned?: number | null
          created_at?: string | null
          id?: string
          name: string
          role: Database["public"]["Enums"]["user_role"]
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          commission_earned?: number | null
          created_at?: string | null
          id?: string
          name?: string
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      tasks: {
        Row: {
          assigned_staff_id: string | null
          created_at: string | null
          id: string
          order_id: string
          status: Database["public"]["Enums"]["task_status"]
          task_type: string
          updated_at: string | null
          value: string | null
        }
        Insert: {
          assigned_staff_id?: string | null
          created_at?: string | null
          id?: string
          order_id: string
          status?: Database["public"]["Enums"]["task_status"]
          task_type: string
          updated_at?: string | null
          value?: string | null
        }
        Update: {
          assigned_staff_id?: string | null
          created_at?: string | null
          id?: string
          order_id?: string
          status?: Database["public"]["Enums"]["task_status"]
          task_type?: string
          updated_at?: string | null
          value?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tasks_assigned_staff_id_fkey"
            columns: ["assigned_staff_id"]
            isOneToOne: false
            referencedRelation: "staff"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tasks_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      generate_order_number: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
    }
    Enums: {
      order_status:
        | "processing"
        | "ironing"
        | "ready"
        | "completed"
        | "cancelled"
      product_status: "available" | "booked" | "maintenance"
      task_status: "pending" | "in_progress" | "completed"
      user_role: "admin" | "sales" | "ironing" | "supervisor"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      order_status: [
        "processing",
        "ironing",
        "ready",
        "completed",
        "cancelled",
      ],
      product_status: ["available", "booked", "maintenance"],
      task_status: ["pending", "in_progress", "completed"],
      user_role: ["admin", "sales", "ironing", "supervisor"],
    },
  },
} as const
