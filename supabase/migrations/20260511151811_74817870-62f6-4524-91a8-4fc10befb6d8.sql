-- Helper function to get current user's organization_id (SECURITY DEFINER avoids recursive RLS)
CREATE OR REPLACE FUNCTION public.current_user_org_id()
RETURNS uuid
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT organization_id FROM public.profiles WHERE id = auth.uid()
$$;

-- ============ AUDIT_LOGS ============
DROP POLICY IF EXISTS "Auth audit" ON audit_logs;
CREATE POLICY "audit_logs_org_select" ON audit_logs FOR SELECT
USING (user_id IN (SELECT id FROM profiles WHERE organization_id = public.current_user_org_id()));
CREATE POLICY "audit_logs_org_insert" ON audit_logs FOR INSERT
WITH CHECK (user_id = auth.uid());

-- ============ DISPLAY_PLAYERS ============
DROP POLICY IF EXISTS "Auth players" ON display_players;
CREATE POLICY "display_players_org_all" ON display_players FOR ALL
USING (display_group_id IN (
  SELECT dg.id FROM display_groups dg
  JOIN environments e ON e.id = dg.environment_id
  WHERE e.organization_id = public.current_user_org_id()
))
WITH CHECK (display_group_id IN (
  SELECT dg.id FROM display_groups dg
  JOIN environments e ON e.id = dg.environment_id
  WHERE e.organization_id = public.current_user_org_id()
));

-- ============ PLAYLISTS ============
DROP POLICY IF EXISTS "Enable all for authenticated users" ON playlists;
CREATE POLICY "playlists_org_all" ON playlists FOR ALL
USING (environment_id IN (SELECT id FROM environments WHERE organization_id = public.current_user_org_id()))
WITH CHECK (environment_id IN (SELECT id FROM environments WHERE organization_id = public.current_user_org_id()));

-- ============ PLAYLIST_ITEMS ============
DROP POLICY IF EXISTS "Enable all for authenticated users items" ON playlist_items;
CREATE POLICY "playlist_items_org_all" ON playlist_items FOR ALL
USING (playlist_id IN (
  SELECT p.id FROM playlists p
  JOIN environments e ON e.id = p.environment_id
  WHERE e.organization_id = public.current_user_org_id()
))
WITH CHECK (playlist_id IN (
  SELECT p.id FROM playlists p
  JOIN environments e ON e.id = p.environment_id
  WHERE e.organization_id = public.current_user_org_id()
));

-- ============ DASHBOARD_WIDGETS ============
DROP POLICY IF EXISTS "Auth widgets" ON dashboard_widgets;
CREATE POLICY "dashboard_widgets_org_all" ON dashboard_widgets FOR ALL
USING (dashboard_id IN (SELECT id FROM dashboards WHERE organization_id = public.current_user_org_id()))
WITH CHECK (dashboard_id IN (SELECT id FROM dashboards WHERE organization_id = public.current_user_org_id()));

-- ============ DASHBOARD_CACHES ============
DROP POLICY IF EXISTS "Auth cache" ON dashboard_caches;
CREATE POLICY "dashboard_caches_org_all" ON dashboard_caches FOR ALL
USING (dashboard_id IN (SELECT id FROM dashboards WHERE organization_id = public.current_user_org_id()))
WITH CHECK (dashboard_id IN (SELECT id FROM dashboards WHERE organization_id = public.current_user_org_id()));

-- ============ DASHBOARD_EVENTS ============
DROP POLICY IF EXISTS "Auth events" ON dashboard_events;
CREATE POLICY "dashboard_events_org_all" ON dashboard_events FOR ALL
USING (dashboard_id IN (SELECT id FROM dashboards WHERE organization_id = public.current_user_org_id()))
WITH CHECK (dashboard_id IN (SELECT id FROM dashboards WHERE organization_id = public.current_user_org_id()));

-- ============ COLUMN_PLAYBACK_CONTROLS ============
DROP POLICY IF EXISTS "Enable all for authenticated users column_controls" ON column_playback_controls;
CREATE POLICY "column_playback_controls_org_all" ON column_playback_controls FOR ALL
USING (display_group_id IN (
  SELECT dg.id FROM display_groups dg
  JOIN environments e ON e.id = dg.environment_id
  WHERE e.organization_id = public.current_user_org_id()
))
WITH CHECK (display_group_id IN (
  SELECT dg.id FROM display_groups dg
  JOIN environments e ON e.id = dg.environment_id
  WHERE e.organization_id = public.current_user_org_id()
));

-- ============ EXPANDED_VIEWS ============
DROP POLICY IF EXISTS "Auth expanded" ON expanded_views;
CREATE POLICY "expanded_views_org_all" ON expanded_views FOR ALL
USING (dashboard_widget_id IN (
  SELECT dw.id FROM dashboard_widgets dw
  JOIN dashboards d ON d.id = dw.dashboard_id
  WHERE d.organization_id = public.current_user_org_id()
))
WITH CHECK (dashboard_widget_id IN (
  SELECT dw.id FROM dashboard_widgets dw
  JOIN dashboards d ON d.id = dw.dashboard_id
  WHERE d.organization_id = public.current_user_org_id()
));

-- ============ DASHBOARD_TAGS ============
DROP POLICY IF EXISTS "Enable all for authenticated users dashboard_tags" ON dashboard_tags;
CREATE POLICY "dashboard_tags_org_all" ON dashboard_tags FOR ALL
USING (dashboard_id IN (SELECT id FROM dashboards WHERE organization_id = public.current_user_org_id()))
WITH CHECK (dashboard_id IN (SELECT id FROM dashboards WHERE organization_id = public.current_user_org_id()));

-- ============ PROFILES — Prevent privilege escalation ============
-- Use a trigger because RLS WITH CHECK cannot reference OLD values
CREATE OR REPLACE FUNCTION public.prevent_profile_role_escalation()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.role IS DISTINCT FROM OLD.role THEN
    RAISE EXCEPTION 'Changing role is not allowed';
  END IF;
  IF NEW.organization_id IS DISTINCT FROM OLD.organization_id THEN
    RAISE EXCEPTION 'Changing organization is not allowed';
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS profiles_prevent_escalation ON profiles;
CREATE TRIGGER profiles_prevent_escalation
BEFORE UPDATE ON profiles
FOR EACH ROW
EXECUTE FUNCTION public.prevent_profile_role_escalation();
