-- RLS Policies for RBAC Metadata
CREATE POLICY "permissions_read_auth" ON public.permissions FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "role_permissions_read_auth" ON public.role_permissions FOR SELECT USING (auth.role() = 'authenticated');

-- Function Permissions
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, app_role) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.has_permission(uuid, text) FROM PUBLIC, anon;

GRANT EXECUTE ON FUNCTION public.has_role(uuid, app_role) TO authenticated;
GRANT EXECUTE ON FUNCTION public.has_permission(uuid, text) TO authenticated;
