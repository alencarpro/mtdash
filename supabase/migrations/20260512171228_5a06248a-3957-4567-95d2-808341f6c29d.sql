
-- 1) user_roles: replace overly broad ALL policy with org-scoped, enum-typed checks
DROP POLICY IF EXISTS "Admins can manage user roles" ON public.user_roles;

CREATE POLICY "Admins manage roles in own org"
ON public.user_roles
FOR ALL
TO authenticated
USING (
  (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'super_admin'::app_role))
  AND user_id IN (
    SELECT p.id FROM public.profiles p
    WHERE p.organization_id = public.current_user_org_id()
  )
)
WITH CHECK (
  (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'super_admin'::app_role))
  AND user_id IN (
    SELECT p.id FROM public.profiles p
    WHERE p.organization_id = public.current_user_org_id()
  )
  -- Only super_admin may grant super_admin
  AND (
    role <> 'super_admin'::app_role
    OR has_role(auth.uid(), 'super_admin'::app_role)
  )
);

-- 2) session_logs: scope admin SELECT to same org
DROP POLICY IF EXISTS "Admins can view all session logs" ON public.session_logs;

CREATE POLICY "Admins view session logs in own org"
ON public.session_logs
FOR SELECT
TO authenticated
USING (
  (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'super_admin'::app_role))
  AND user_id IN (
    SELECT p.id FROM public.profiles p
    WHERE p.organization_id = public.current_user_org_id()
  )
);

-- 3) audit_logs: remove client INSERT path; only service role / triggers can write
DROP POLICY IF EXISTS "audit_logs_org_insert" ON public.audit_logs;

-- 4) Revoke EXECUTE on SECURITY DEFINER helpers from signed-in users
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, app_role) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.has_permission(uuid, text) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.current_user_org_id() FROM PUBLIC, anon, authenticated;
