
-- 1) Tags: restrict mutations to admins; restrict reads to authenticated
DROP POLICY IF EXISTS "Auth tags" ON public.tags;
DROP POLICY IF EXISTS "Public tags" ON public.tags;

CREATE POLICY "tags_select_authenticated"
ON public.tags FOR SELECT TO authenticated
USING (true);

CREATE POLICY "tags_admin_write"
ON public.tags FOR ALL TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'super_admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'super_admin'::app_role));

-- 2) dashboard_columns: remove anonymous read
DROP POLICY IF EXISTS "Public read for dashboard_columns" ON public.dashboard_columns;

CREATE POLICY "dashboard_columns_read_authenticated"
ON public.dashboard_columns FOR SELECT TO authenticated
USING (true);
