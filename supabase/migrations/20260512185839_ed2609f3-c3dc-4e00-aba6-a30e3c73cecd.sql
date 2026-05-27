-- 1. Corrigir funções que podem estar sem search_path ou com permissões excessivas
-- Primeiro removemos as versões que serão corrigidas para evitar conflitos de assinatura
DROP FUNCTION IF EXISTS public.log_admin_action(text, uuid, jsonb);

-- 2. Recriar/Atualizar funções com search_path e SECURITY DEFINER correto
CREATE OR REPLACE FUNCTION public.log_admin_action(
    _action text, 
    _entity_type text DEFAULT 'USER', 
    _entity_id text DEFAULT NULL, 
    _details jsonb DEFAULT NULL
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    INSERT INTO public.audit_logs (user_id, action, entity_type, entity_id, after_data)
    VALUES (auth.uid(), _action, _entity_type, _entity_id, _details);
END;
$$;

-- 3. Revogar execução pública de funções sensíveis
REVOKE EXECUTE ON FUNCTION public.log_admin_action(text, text, text, jsonb) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.log_admin_action(text, text, text, jsonb) TO authenticated;

REVOKE EXECUTE ON FUNCTION public.has_permission(uuid, text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.has_permission(uuid, text) TO authenticated;

REVOKE EXECUTE ON FUNCTION public.has_role(uuid, app_role) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, app_role) TO authenticated;

REVOKE EXECUTE ON FUNCTION public.current_user_org_id() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.current_user_org_id() TO authenticated;

-- 4. Garantir que funções de trigger também tenham search_path
ALTER FUNCTION public.prevent_profile_role_escalation() SET search_path = public;
