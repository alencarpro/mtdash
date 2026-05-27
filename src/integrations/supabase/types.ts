export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      audit_logs: {
        Row: {
          action: string
          after_data: Json | null
          before_data: Json | null
          created_at: string | null
          entity_id: string
          entity_type: string
          id: string
          ip_address: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          after_data?: Json | null
          before_data?: Json | null
          created_at?: string | null
          entity_id: string
          entity_type: string
          id?: string
          ip_address?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          after_data?: Json | null
          before_data?: Json | null
          created_at?: string | null
          entity_id?: string
          entity_type?: string
          id?: string
          ip_address?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      column_playback_controls: {
        Row: {
          column_index: number
          created_at: string | null
          current_item_id: string | null
          current_minute_key: string | null
          display_group_id: string | null
          id: string
          paused_at: string | null
          resumed_at: string | null
          state: Database["public"]["Enums"]["column_playback_state"] | null
          sync_at: string | null
          updated_at: string | null
        }
        Insert: {
          column_index: number
          created_at?: string | null
          current_item_id?: string | null
          current_minute_key?: string | null
          display_group_id?: string | null
          id?: string
          paused_at?: string | null
          resumed_at?: string | null
          state?: Database["public"]["Enums"]["column_playback_state"] | null
          sync_at?: string | null
          updated_at?: string | null
        }
        Update: {
          column_index?: number
          created_at?: string | null
          current_item_id?: string | null
          current_minute_key?: string | null
          display_group_id?: string | null
          id?: string
          paused_at?: string | null
          resumed_at?: string | null
          state?: Database["public"]["Enums"]["column_playback_state"] | null
          sync_at?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "column_playback_controls_display_group_id_fkey"
            columns: ["display_group_id"]
            isOneToOne: false
            referencedRelation: "display_groups"
            referencedColumns: ["id"]
          },
        ]
      }
      dashboard_caches: {
        Row: {
          checksum: string | null
          created_at: string | null
          dashboard_id: string | null
          expires_at: string
          id: string
          last_valid_at: string
          payload: Json
        }
        Insert: {
          checksum?: string | null
          created_at?: string | null
          dashboard_id?: string | null
          expires_at: string
          id?: string
          last_valid_at: string
          payload: Json
        }
        Update: {
          checksum?: string | null
          created_at?: string | null
          dashboard_id?: string | null
          expires_at?: string
          id?: string
          last_valid_at?: string
          payload?: Json
        }
        Relationships: [
          {
            foreignKeyName: "dashboard_caches_dashboard_id_fkey"
            columns: ["dashboard_id"]
            isOneToOne: true
            referencedRelation: "dashboards"
            referencedColumns: ["id"]
          },
        ]
      }
      dashboard_columns: {
        Row: {
          created_at: string
          id: string
          name: string
          order_index: number | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          order_index?: number | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          order_index?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      dashboard_events: {
        Row: {
          created_at: string | null
          dashboard_id: string | null
          display_player_id: string | null
          id: string
          payload: Json | null
          type: Database["public"]["Enums"]["event_type"]
        }
        Insert: {
          created_at?: string | null
          dashboard_id?: string | null
          display_player_id?: string | null
          id?: string
          payload?: Json | null
          type: Database["public"]["Enums"]["event_type"]
        }
        Update: {
          created_at?: string | null
          dashboard_id?: string | null
          display_player_id?: string | null
          id?: string
          payload?: Json | null
          type?: Database["public"]["Enums"]["event_type"]
        }
        Relationships: [
          {
            foreignKeyName: "dashboard_events_dashboard_id_fkey"
            columns: ["dashboard_id"]
            isOneToOne: false
            referencedRelation: "dashboards"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dashboard_events_display_player_id_fkey"
            columns: ["display_player_id"]
            isOneToOne: false
            referencedRelation: "display_players"
            referencedColumns: ["id"]
          },
        ]
      }
      dashboard_tags: {
        Row: {
          created_at: string | null
          dashboard_id: string | null
          id: string
          tag_id: string | null
        }
        Insert: {
          created_at?: string | null
          dashboard_id?: string | null
          id?: string
          tag_id?: string | null
        }
        Update: {
          created_at?: string | null
          dashboard_id?: string | null
          id?: string
          tag_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "dashboard_tags_dashboard_id_fkey"
            columns: ["dashboard_id"]
            isOneToOne: false
            referencedRelation: "dashboards"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dashboard_tags_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "tags"
            referencedColumns: ["id"]
          },
        ]
      }
      dashboard_widgets: {
        Row: {
          config: Json | null
          created_at: string | null
          dashboard_id: string | null
          expandable: boolean | null
          fullscreen_title: string | null
          height: number
          id: string
          pos_x: number
          pos_y: number
          title: string
          type: Database["public"]["Enums"]["widget_type"]
          updated_at: string | null
          width: number
        }
        Insert: {
          config?: Json | null
          created_at?: string | null
          dashboard_id?: string | null
          expandable?: boolean | null
          fullscreen_title?: string | null
          height: number
          id?: string
          pos_x: number
          pos_y: number
          title: string
          type: Database["public"]["Enums"]["widget_type"]
          updated_at?: string | null
          width: number
        }
        Update: {
          config?: Json | null
          created_at?: string | null
          dashboard_id?: string | null
          expandable?: boolean | null
          fullscreen_title?: string | null
          height?: number
          id?: string
          pos_x?: number
          pos_y?: number
          title?: string
          type?: Database["public"]["Enums"]["widget_type"]
          updated_at?: string | null
          width?: number
        }
        Relationships: [
          {
            foreignKeyName: "dashboard_widgets_dashboard_id_fkey"
            columns: ["dashboard_id"]
            isOneToOne: false
            referencedRelation: "dashboards"
            referencedColumns: ["id"]
          },
        ]
      }
      dashboards: {
        Row: {
          auto_scale: boolean | null
          cache_enabled: boolean | null
          category: Database["public"]["Enums"]["dashboard_category"]
          column_id: string | null
          created_at: string | null
          description: string | null
          fullscreen_enabled: boolean | null
          height: number | null
          id: string
          last_sync_at: string | null
          name: string
          order_index: number | null
          organization_id: string | null
          refresh_interval: number | null
          responsive: boolean | null
          source_url: string
          status: Database["public"]["Enums"]["dashboard_status"] | null
          thumbnail_url: string | null
          updated_at: string | null
          width: number | null
        }
        Insert: {
          auto_scale?: boolean | null
          cache_enabled?: boolean | null
          category: Database["public"]["Enums"]["dashboard_category"]
          column_id?: string | null
          created_at?: string | null
          description?: string | null
          fullscreen_enabled?: boolean | null
          height?: number | null
          id?: string
          last_sync_at?: string | null
          name: string
          order_index?: number | null
          organization_id?: string | null
          refresh_interval?: number | null
          responsive?: boolean | null
          source_url: string
          status?: Database["public"]["Enums"]["dashboard_status"] | null
          thumbnail_url?: string | null
          updated_at?: string | null
          width?: number | null
        }
        Update: {
          auto_scale?: boolean | null
          cache_enabled?: boolean | null
          category?: Database["public"]["Enums"]["dashboard_category"]
          column_id?: string | null
          created_at?: string | null
          description?: string | null
          fullscreen_enabled?: boolean | null
          height?: number | null
          id?: string
          last_sync_at?: string | null
          name?: string
          order_index?: number | null
          organization_id?: string | null
          refresh_interval?: number | null
          responsive?: boolean | null
          source_url?: string
          status?: Database["public"]["Enums"]["dashboard_status"] | null
          thumbnail_url?: string | null
          updated_at?: string | null
          width?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "dashboards_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      display_groups: {
        Row: {
          columns: number | null
          created_at: string | null
          environment_id: string | null
          id: string
          name: string
          updated_at: string | null
        }
        Insert: {
          columns?: number | null
          created_at?: string | null
          environment_id?: string | null
          id?: string
          name: string
          updated_at?: string | null
        }
        Update: {
          columns?: number | null
          created_at?: string | null
          environment_id?: string | null
          id?: string
          name?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "display_groups_environment_id_fkey"
            columns: ["environment_id"]
            isOneToOne: false
            referencedRelation: "environments"
            referencedColumns: ["id"]
          },
        ]
      }
      display_players: {
        Row: {
          browser_version: string | null
          created_at: string | null
          display_group_id: string | null
          gpu_acceleration: boolean | null
          hostname: string | null
          id: string
          ip_address: string | null
          last_heartbeat: string | null
          name: string
          status: Database["public"]["Enums"]["player_status"] | null
          updated_at: string | null
        }
        Insert: {
          browser_version?: string | null
          created_at?: string | null
          display_group_id?: string | null
          gpu_acceleration?: boolean | null
          hostname?: string | null
          id?: string
          ip_address?: string | null
          last_heartbeat?: string | null
          name: string
          status?: Database["public"]["Enums"]["player_status"] | null
          updated_at?: string | null
        }
        Update: {
          browser_version?: string | null
          created_at?: string | null
          display_group_id?: string | null
          gpu_acceleration?: boolean | null
          hostname?: string | null
          id?: string
          ip_address?: string | null
          last_heartbeat?: string | null
          name?: string
          status?: Database["public"]["Enums"]["player_status"] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "display_players_display_group_id_fkey"
            columns: ["display_group_id"]
            isOneToOne: false
            referencedRelation: "display_groups"
            referencedColumns: ["id"]
          },
        ]
      }
      environments: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          is_active: boolean | null
          name: string
          organization_id: string | null
          resolution_height: number | null
          resolution_width: number | null
          timezone: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          organization_id?: string | null
          resolution_height?: number | null
          resolution_width?: number | null
          timezone?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          organization_id?: string | null
          resolution_height?: number | null
          resolution_width?: number | null
          timezone?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "environments_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      expanded_views: {
        Row: {
          closed_at: string | null
          dashboard_widget_id: string | null
          description: string | null
          duration_ms: number | null
          fullscreen_config: Json | null
          id: string
          opened_at: string | null
          title: string | null
        }
        Insert: {
          closed_at?: string | null
          dashboard_widget_id?: string | null
          description?: string | null
          duration_ms?: number | null
          fullscreen_config?: Json | null
          id?: string
          opened_at?: string | null
          title?: string | null
        }
        Update: {
          closed_at?: string | null
          dashboard_widget_id?: string | null
          description?: string | null
          duration_ms?: number | null
          fullscreen_config?: Json | null
          id?: string
          opened_at?: string | null
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "expanded_views_dashboard_widget_id_fkey"
            columns: ["dashboard_widget_id"]
            isOneToOne: false
            referencedRelation: "dashboard_widgets"
            referencedColumns: ["id"]
          },
        ]
      }
      organizations: {
        Row: {
          created_at: string | null
          id: string
          name: string
          slug: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
          slug: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
          slug?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      permissions: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      playlist_items: {
        Row: {
          active: boolean | null
          animation: Database["public"]["Enums"]["animation_type"] | null
          column_index: number
          created_at: string | null
          dashboard_id: string | null
          display_order: number
          duration_sec: number | null
          id: string
          playlist_id: string | null
          preload: boolean | null
        }
        Insert: {
          active?: boolean | null
          animation?: Database["public"]["Enums"]["animation_type"] | null
          column_index: number
          created_at?: string | null
          dashboard_id?: string | null
          display_order: number
          duration_sec?: number | null
          id?: string
          playlist_id?: string | null
          preload?: boolean | null
        }
        Update: {
          active?: boolean | null
          animation?: Database["public"]["Enums"]["animation_type"] | null
          column_index?: number
          created_at?: string | null
          dashboard_id?: string | null
          display_order?: number
          duration_sec?: number | null
          id?: string
          playlist_id?: string | null
          preload?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "playlist_items_dashboard_id_fkey"
            columns: ["dashboard_id"]
            isOneToOne: false
            referencedRelation: "dashboards"
            referencedColumns: ["id"]
          },
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
          active: boolean | null
          created_at: string | null
          environment_id: string | null
          id: string
          is_looping: boolean | null
          name: string
          sync_enabled: boolean | null
          transition_time_ms: number | null
          updated_at: string | null
        }
        Insert: {
          active?: boolean | null
          created_at?: string | null
          environment_id?: string | null
          id?: string
          is_looping?: boolean | null
          name: string
          sync_enabled?: boolean | null
          transition_time_ms?: number | null
          updated_at?: string | null
        }
        Update: {
          active?: boolean | null
          created_at?: string | null
          environment_id?: string | null
          id?: string
          is_looping?: boolean | null
          name?: string
          sync_enabled?: boolean | null
          transition_time_ms?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "playlists_environment_id_fkey"
            columns: ["environment_id"]
            isOneToOne: false
            referencedRelation: "environments"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          active: boolean | null
          created_at: string | null
          full_name: string | null
          fullscreen_auto: boolean | null
          id: string
          organization_id: string | null
          role: Database["public"]["Enums"]["user_role"] | null
          updated_at: string | null
        }
        Insert: {
          active?: boolean | null
          created_at?: string | null
          full_name?: string | null
          fullscreen_auto?: boolean | null
          id: string
          organization_id?: string | null
          role?: Database["public"]["Enums"]["user_role"] | null
          updated_at?: string | null
        }
        Update: {
          active?: boolean | null
          created_at?: string | null
          full_name?: string | null
          fullscreen_auto?: boolean | null
          id?: string
          organization_id?: string | null
          role?: Database["public"]["Enums"]["user_role"] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      role_permissions: {
        Row: {
          id: string
          permission_id: string
          role: Database["public"]["Enums"]["app_role"]
        }
        Insert: {
          id?: string
          permission_id: string
          role: Database["public"]["Enums"]["app_role"]
        }
        Update: {
          id?: string
          permission_id?: string
          role?: Database["public"]["Enums"]["app_role"]
        }
        Relationships: [
          {
            foreignKeyName: "role_permissions_permission_id_fkey"
            columns: ["permission_id"]
            isOneToOne: false
            referencedRelation: "permissions"
            referencedColumns: ["id"]
          },
        ]
      }
      session_logs: {
        Row: {
          created_at: string | null
          device_info: string | null
          fullscreen: boolean | null
          id: string
          ip_address: string | null
          login_at: string | null
          logout_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          device_info?: string | null
          fullscreen?: boolean | null
          id?: string
          ip_address?: string | null
          login_at?: string | null
          logout_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          device_info?: string | null
          fullscreen?: boolean | null
          id?: string
          ip_address?: string | null
          login_at?: string | null
          logout_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      tags: {
        Row: {
          active: boolean | null
          category: string | null
          color: string | null
          created_at: string | null
          icon: string | null
          id: string
          name: string
          slug: string
          updated_at: string | null
        }
        Insert: {
          active?: boolean | null
          category?: string | null
          color?: string | null
          created_at?: string | null
          icon?: string | null
          id?: string
          name: string
          slug: string
          updated_at?: string | null
        }
        Update: {
          active?: boolean | null
          category?: string | null
          color?: string | null
          created_at?: string | null
          icon?: string | null
          id?: string
          name?: string
          slug?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      current_user_org_id: { Args: never; Returns: string }
      has_permission: {
        Args: { _permission_name: string; _user_id: string }
        Returns: boolean
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      log_admin_action: {
        Args: {
          _action: string
          _details?: Json
          _entity_id?: string
          _entity_type?: string
        }
        Returns: undefined
      }
    }
    Enums: {
      animation_type: "FADE" | "SLIDE_UP" | "SCALE" | "BLUR" | "CINEMATIC"
      app_role:
        | "super_admin"
        | "admin"
        | "operator"
        | "viewer"
        | "VIEWER"
        | "OPERATOR"
      column_playback_state: "RUNNING" | "PAUSED" | "SYNCING" | "LOADING"
      dashboard_category:
        | "ECONOMY"
        | "SOCIAL"
        | "ENVIRONMENT"
        | "WORKS"
        | "TRANSPARENCY"
        | "CUSTOM"
      dashboard_status: "ACTIVE" | "INACTIVE" | "ERROR" | "LOADING"
      event_type:
        | "DASHBOARD_STARTED"
        | "DASHBOARD_ENDED"
        | "GRAPH_EXPANDED"
        | "GRAPH_CLOSED"
        | "PLAYER_CONNECTED"
        | "PLAYER_DISCONNECTED"
        | "ERROR"
      player_status: "ONLINE" | "OFFLINE" | "SYNCING" | "ERROR"
      user_role: "SUPER_ADMIN" | "ADMIN" | "OPERATOR" | "VIEWER"
      widget_type:
        | "KPI"
        | "BAR_CHART"
        | "LINE_CHART"
        | "AREA_CHART"
        | "PIE_CHART"
        | "RADAR"
        | "MAP"
        | "TABLE"
        | "CUSTOM"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      animation_type: ["FADE", "SLIDE_UP", "SCALE", "BLUR", "CINEMATIC"],
      app_role: [
        "super_admin",
        "admin",
        "operator",
        "viewer",
        "VIEWER",
        "OPERATOR",
      ],
      column_playback_state: ["RUNNING", "PAUSED", "SYNCING", "LOADING"],
      dashboard_category: [
        "ECONOMY",
        "SOCIAL",
        "ENVIRONMENT",
        "WORKS",
        "TRANSPARENCY",
        "CUSTOM",
      ],
      dashboard_status: ["ACTIVE", "INACTIVE", "ERROR", "LOADING"],
      event_type: [
        "DASHBOARD_STARTED",
        "DASHBOARD_ENDED",
        "GRAPH_EXPANDED",
        "GRAPH_CLOSED",
        "PLAYER_CONNECTED",
        "PLAYER_DISCONNECTED",
        "ERROR",
      ],
      player_status: ["ONLINE", "OFFLINE", "SYNCING", "ERROR"],
      user_role: ["SUPER_ADMIN", "ADMIN", "OPERATOR", "VIEWER"],
      widget_type: [
        "KPI",
        "BAR_CHART",
        "LINE_CHART",
        "AREA_CHART",
        "PIE_CHART",
        "RADAR",
        "MAP",
        "TABLE",
        "CUSTOM",
      ],
    },
  },
} as const
