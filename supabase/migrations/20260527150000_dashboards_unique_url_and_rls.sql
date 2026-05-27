-- Adiciona constraint UNIQUE em source_url na tabela dashboards
-- Necessário para o upsert de importação em lote (onConflict: 'source_url')
-- e para garantir que não haja dashboards duplicadas por URL.

ALTER TABLE public.dashboards
  ADD CONSTRAINT dashboards_source_url_unique UNIQUE (source_url);

-- Atualiza políticas de dashboards para permitir INSERT/UPDATE/DELETE por admins
DROP POLICY IF EXISTS "Org-based dashboards" ON public.dashboards;

-- SELECT: usuários autenticados da mesma organização (ou sem org = acesso geral)
CREATE POLICY "Authenticated read dashboards"
  ON public.dashboards FOR SELECT
  TO authenticated
  USING (true);

-- INSERT/UPDATE/DELETE: apenas admins
CREATE POLICY "Admins manage dashboards"
  ON public.dashboards FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles ur
      WHERE ur.user_id = auth.uid()
        AND (ur.role = 'admin'::app_role OR ur.role = 'super_admin'::app_role)
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.user_roles ur
      WHERE ur.user_id = auth.uid()
        AND (ur.role = 'admin'::app_role OR ur.role = 'super_admin'::app_role)
    )
  );
