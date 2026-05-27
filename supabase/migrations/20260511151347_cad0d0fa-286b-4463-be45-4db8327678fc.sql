-- Enums
CREATE TYPE user_role AS ENUM ('SUPER_ADMIN', 'ADMIN', 'OPERATOR', 'VIEWER');
CREATE TYPE dashboard_category AS ENUM ('ECONOMY', 'SOCIAL', 'ENVIRONMENT', 'WORKS', 'TRANSPARENCY', 'CUSTOM');
CREATE TYPE dashboard_status AS ENUM ('ACTIVE', 'INACTIVE', 'ERROR', 'LOADING');
CREATE TYPE animation_type AS ENUM ('FADE', 'SLIDE_UP', 'SCALE', 'BLUR', 'CINEMATIC');
CREATE TYPE player_status AS ENUM ('ONLINE', 'OFFLINE', 'SYNCING', 'ERROR');
CREATE TYPE widget_type AS ENUM ('KPI', 'BAR_CHART', 'LINE_CHART', 'AREA_CHART', 'PIE_CHART', 'RADAR', 'MAP', 'TABLE', 'CUSTOM');
CREATE TYPE event_type AS ENUM ('DASHBOARD_STARTED', 'DASHBOARD_ENDED', 'GRAPH_EXPANDED', 'GRAPH_CLOSED', 'PLAYER_CONNECTED', 'PLAYER_DISCONNECTED', 'ERROR');
CREATE TYPE column_playback_state AS ENUM ('RUNNING', 'PAUSED', 'SYNCING', 'LOADING');

-- Organizations
CREATE TABLE organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Profiles (extends auth.users)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  organization_id UUID REFERENCES organizations(id),
  full_name TEXT,
  role user_role DEFAULT 'VIEWER',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Environments
CREATE TABLE environments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES organizations(id),
  name TEXT NOT NULL,
  description TEXT,
  resolution_width INTEGER DEFAULT 8640,
  resolution_height INTEGER DEFAULT 3840,
  timezone TEXT DEFAULT 'America/Cuiaba',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Display Groups
CREATE TABLE display_groups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  environment_id UUID REFERENCES environments(id),
  name TEXT NOT NULL,
  columns INTEGER DEFAULT 4,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Display Players
CREATE TABLE display_players (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  display_group_id UUID REFERENCES display_groups(id),
  name TEXT NOT NULL,
  hostname TEXT,
  ip_address TEXT,
  status player_status DEFAULT 'OFFLINE',
  last_heartbeat TIMESTAMPTZ,
  gpu_acceleration BOOLEAN DEFAULT true,
  browser_version TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Dashboards
CREATE TABLE dashboards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES organizations(id),
  name TEXT NOT NULL,
  description TEXT,
  category dashboard_category NOT NULL,
  source_url TEXT NOT NULL,
  thumbnail_url TEXT,
  status dashboard_status DEFAULT 'ACTIVE',
  responsive BOOLEAN DEFAULT true,
  fullscreen_enabled BOOLEAN DEFAULT true,
  auto_scale BOOLEAN DEFAULT true,
  width INTEGER DEFAULT 2160,
  height INTEGER DEFAULT 3840,
  refresh_interval INTEGER DEFAULT 60,
  cache_enabled BOOLEAN DEFAULT true,
  last_sync_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Playlists
CREATE TABLE playlists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  environment_id UUID REFERENCES environments(id),
  name TEXT NOT NULL,
  is_looping BOOLEAN DEFAULT true,
  sync_enabled BOOLEAN DEFAULT true,
  transition_time_ms INTEGER DEFAULT 1200,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Playlist Items
CREATE TABLE playlist_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  playlist_id UUID REFERENCES playlists(id) ON DELETE CASCADE,
  dashboard_id UUID REFERENCES dashboards(id) ON DELETE CASCADE,
  column_index INTEGER NOT NULL,
  display_order INTEGER NOT NULL,
  duration_sec INTEGER DEFAULT 60,
  animation animation_type DEFAULT 'FADE',
  preload BOOLEAN DEFAULT true,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Tags
CREATE TABLE tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  color TEXT,
  icon TEXT,
  category TEXT,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Dashboard Tags
CREATE TABLE dashboard_tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  dashboard_id UUID REFERENCES dashboards(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(dashboard_id, tag_id)
);

-- Column Playback Controls
CREATE TABLE column_playback_controls (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  display_group_id UUID REFERENCES display_groups(id) ON DELETE CASCADE,
  column_index INTEGER NOT NULL,
  state column_playback_state DEFAULT 'RUNNING',
  paused_at TIMESTAMPTZ,
  resumed_at TIMESTAMPTZ,
  sync_at TIMESTAMPTZ,
  current_item_id UUID,
  current_minute_key TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(display_group_id, column_index)
);

-- Dashboard Widgets
CREATE TABLE dashboard_widgets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  dashboard_id UUID REFERENCES dashboards(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  type widget_type NOT NULL,
  pos_x INTEGER NOT NULL,
  pos_y INTEGER NOT NULL,
  width INTEGER NOT NULL,
  height INTEGER NOT NULL,
  expandable BOOLEAN DEFAULT true,
  fullscreen_title TEXT,
  config JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Expanded Views
CREATE TABLE expanded_views (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  dashboard_widget_id UUID REFERENCES dashboard_widgets(id) ON DELETE CASCADE,
  title TEXT,
  description TEXT,
  fullscreen_config JSONB DEFAULT '{}'::jsonb,
  opened_at TIMESTAMPTZ DEFAULT now(),
  closed_at TIMESTAMPTZ,
  duration_ms INTEGER
);

-- Dashboard Cache
CREATE TABLE dashboard_caches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  dashboard_id UUID UNIQUE REFERENCES dashboards(id) ON DELETE CASCADE,
  payload JSONB NOT NULL,
  last_valid_at TIMESTAMPTZ NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  checksum TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Audit Logs
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id TEXT NOT NULL,
  before_data JSONB,
  after_data JSONB,
  ip_address TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Dashboard Events
CREATE TABLE dashboard_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  dashboard_id UUID REFERENCES dashboards(id),
  display_player_id UUID REFERENCES display_players(id),
  type event_type NOT NULL,
  payload JSONB,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE environments ENABLE ROW LEVEL SECURITY;
ALTER TABLE display_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE display_players ENABLE ROW LEVEL SECURITY;
ALTER TABLE dashboards ENABLE ROW LEVEL SECURITY;
ALTER TABLE playlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE playlist_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE dashboard_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE column_playback_controls ENABLE ROW LEVEL SECURITY;
ALTER TABLE dashboard_widgets ENABLE ROW LEVEL SECURITY;
ALTER TABLE expanded_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE dashboard_caches ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE dashboard_events ENABLE ROW LEVEL SECURITY;

-- Basic RLS Policies (Simplified for Initial Setup)
-- Users can see everything in their organization
CREATE POLICY "Public profiles are viewable by everyone" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- For other tables, we'll implement organization-based access
-- This assumes profiles table has the organization_id
CREATE POLICY "Org-based select" ON organizations FOR SELECT USING (id IN (SELECT organization_id FROM profiles WHERE id = auth.uid()));
CREATE POLICY "Org-based environments" ON environments FOR SELECT USING (organization_id IN (SELECT organization_id FROM profiles WHERE id = auth.uid()));
CREATE POLICY "Org-based display_groups" ON display_groups FOR SELECT USING (environment_id IN (SELECT id FROM environments WHERE organization_id IN (SELECT organization_id FROM profiles WHERE id = auth.uid())));
CREATE POLICY "Org-based dashboards" ON dashboards FOR SELECT USING (organization_id IN (SELECT organization_id FROM profiles WHERE id = auth.uid()));

-- Allow service role or authenticated for testing MVP
CREATE POLICY "Enable all for authenticated users" ON playlists FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Enable all for authenticated users items" ON playlist_items FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Enable all for authenticated users tags" ON tags FOR ALL USING (true);
CREATE POLICY "Enable all for authenticated users dashboard_tags" ON dashboard_tags FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Enable all for authenticated users column_controls" ON column_playback_controls FOR ALL USING (auth.role() = 'authenticated');

-- Indexes
CREATE INDEX idx_profiles_org ON profiles(organization_id);
CREATE INDEX idx_environments_org ON environments(organization_id);
CREATE INDEX idx_display_groups_env ON display_groups(environment_id);
CREATE INDEX idx_players_group ON display_players(display_group_id);
CREATE INDEX idx_dashboards_org ON dashboards(organization_id);
CREATE INDEX idx_playlist_items_playlist ON playlist_items(playlist_id);
CREATE INDEX idx_playlist_items_column ON playlist_items(column_index);
CREATE INDEX idx_dashboard_widgets_dash ON dashboard_widgets(dashboard_id);
CREATE INDEX idx_expanded_views_widget ON expanded_views(dashboard_widget_id);
CREATE INDEX idx_audit_logs_user ON audit_logs(user_id);
CREATE INDEX idx_dashboard_events_dash ON dashboard_events(dashboard_id);
