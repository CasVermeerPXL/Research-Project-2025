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
      drone_flights: {
        Row: {
          battery_usage: number | null
          created_at: string
          drone_id: string
          end_time: string
          flight_id: string
          start_time: string
          total_distance: number | null
        }
        Insert: {
          battery_usage?: number | null
          created_at?: string
          drone_id: string
          end_time: string
          flight_id?: string
          start_time: string
          total_distance?: number | null
        }
        Update: {
          battery_usage?: number | null
          created_at?: string
          drone_id?: string
          end_time?: string
          flight_id?: string
          start_time?: string
          total_distance?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "Drone_Flights_drone_id_fkey"
            columns: ["drone_id"]
            isOneToOne: false
            referencedRelation: "drones"
            referencedColumns: ["drone_id"]
          },
        ]
      }
      drones: {
        Row: {
          battery_capacity: number
          created_at: string
          drone_id: string
          manufacturer: string
          max_payload: number
          model: string
        }
        Insert: {
          battery_capacity: number
          created_at?: string
          drone_id?: string
          manufacturer: string
          max_payload: number
          model: string
        }
        Update: {
          battery_capacity?: number
          created_at?: string
          drone_id?: string
          manufacturer?: string
          max_payload?: number
          model?: string
        }
        Relationships: []
      }
      hopper_deployments: {
        Row: {
          altitude: number
          created_at: string
          deployment_id: string
          deployment_time: string
          flight_id: string | null
          latitude: number
          longitude: number
          num_hoppers: number
        }
        Insert: {
          altitude: number
          created_at?: string
          deployment_id?: string
          deployment_time: string
          flight_id?: string | null
          latitude: number
          longitude: number
          num_hoppers: number
        }
        Update: {
          altitude?: number
          created_at?: string
          deployment_id?: string
          deployment_time?: string
          flight_id?: string | null
          latitude?: number
          longitude?: number
          num_hoppers?: number
        }
        Relationships: [
          {
            foreignKeyName: "Hopper_Deployments_flight_id_fkey"
            columns: ["flight_id"]
            isOneToOne: false
            referencedRelation: "drone_flights"
            referencedColumns: ["flight_id"]
          },
        ]
      }
      hyacinth: {
        Row: {
          altitude: number
          created_at: string
          density: string | null
          flight_id: string | null
          growth_id: string
          hyacinth_area: number
          hyacinth_health: string | null
          latitude: number
          longitude: number
          timestamp: string
        }
        Insert: {
          altitude: number
          created_at?: string
          density?: string | null
          flight_id?: string | null
          growth_id?: string
          hyacinth_area: number
          hyacinth_health?: string | null
          latitude: number
          longitude: number
          timestamp: string
        }
        Update: {
          altitude?: number
          created_at?: string
          density?: string | null
          flight_id?: string | null
          growth_id?: string
          hyacinth_area?: number
          hyacinth_health?: string | null
          latitude?: number
          longitude?: number
          timestamp?: string
        }
        Relationships: [
          {
            foreignKeyName: "Hyacinth_Growth_flight_id_fkey"
            columns: ["flight_id"]
            isOneToOne: false
            referencedRelation: "drone_flights"
            referencedColumns: ["flight_id"]
          },
        ]
      }
      profiles: {
        Row: {
          first_name: string | null
          last_name: string | null
          user_id: string
          username: string | null
        }
        Insert: {
          first_name?: string | null
          last_name?: string | null
          user_id: string
          username?: string | null
        }
        Update: {
          first_name?: string | null
          last_name?: string | null
          user_id?: string
          username?: string | null
        }
        Relationships: []
      }
      weather: {
        Row: {
          created_at: string
          flight_id: string | null
          humidity: number | null
          rainfall: number | null
          temperature: number | null
          water_temperature: number | null
          weather_id: string
        }
        Insert: {
          created_at?: string
          flight_id?: string | null
          humidity?: number | null
          rainfall?: number | null
          temperature?: number | null
          water_temperature?: number | null
          weather_id?: string
        }
        Update: {
          created_at?: string
          flight_id?: string | null
          humidity?: number | null
          rainfall?: number | null
          temperature?: number | null
          water_temperature?: number | null
          weather_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "Weather_flight_id_fkey"
            columns: ["flight_id"]
            isOneToOne: false
            referencedRelation: "drone_flights"
            referencedColumns: ["flight_id"]
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
