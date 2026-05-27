-- Fix RLS for Display Players
CREATE POLICY "Auth players" ON display_players FOR ALL USING (auth.role() = 'authenticated');

-- Fix RLS for Dashboard Widgets
CREATE POLICY "Auth widgets" ON dashboard_widgets FOR ALL USING (auth.role() = 'authenticated');

-- Fix RLS for Expanded Views
CREATE POLICY "Auth expanded" ON expanded_views FOR ALL USING (auth.role() = 'authenticated');

-- Fix RLS for Dashboard Cache
CREATE POLICY "Auth cache" ON dashboard_caches FOR ALL USING (auth.role() = 'authenticated');

-- Fix RLS for Audit Logs
CREATE POLICY "Auth audit" ON audit_logs FOR ALL USING (auth.role() = 'authenticated');

-- Fix RLS for Dashboard Events
CREATE POLICY "Auth events" ON dashboard_events FOR ALL USING (auth.role() = 'authenticated');

-- Fix permissive policies to be authenticated only where appropriate
DROP POLICY "Enable all for authenticated users tags" ON tags;
CREATE POLICY "Public tags" ON tags FOR SELECT USING (true);
CREATE POLICY "Auth tags" ON tags FOR ALL USING (auth.role() = 'authenticated');

-- Fix the profile policy to be more specific
DROP POLICY "Public profiles are viewable by everyone" ON profiles;
CREATE POLICY "Profiles viewable by same org" ON profiles FOR SELECT USING (
  organization_id IN (
    SELECT organization_id FROM profiles WHERE id = auth.uid()
  )
);
