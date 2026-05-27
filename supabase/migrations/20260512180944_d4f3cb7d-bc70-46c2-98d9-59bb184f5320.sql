
-- These SECURITY DEFINER helpers are intended to be invoked from RLS policies
-- by AUTHENTICATED users. They must NOT be callable by anonymous (PostgREST `anon`)
-- callers via auto-exposed RPC. We keep the `authenticated` grant so RLS keeps
-- working (RLS evaluates function calls with the caller's role and requires EXECUTE).
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, app_role) FROM anon, public;
REVOKE EXECUTE ON FUNCTION public.has_permission(uuid, text) FROM anon, public;
REVOKE EXECUTE ON FUNCTION public.current_user_org_id() FROM anon, public;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, app_role) TO authenticated;
GRANT EXECUTE ON FUNCTION public.has_permission(uuid, text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.current_user_org_id() TO authenticated;
