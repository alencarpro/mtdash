
-- 1. Ensure profiles columns exist
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS active BOOLEAN DEFAULT true;

-- 2. Secure existing or new log function
CREATE OR REPLACE FUNCTION public.log_admin_action(
    _action TEXT,
    _entity_type TEXT DEFAULT 'USER',
    _entity_id TEXT DEFAULT NULL,
    _details JSONB DEFAULT NULL
) RETURNS VOID AS $$
BEGIN
    INSERT INTO public.audit_logs (user_id, action, entity_type, entity_id, after_data)
    VALUES (auth.uid(), _action, _entity_type, _entity_id, _details);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- 3. Restrict execution
REVOKE EXECUTE ON FUNCTION public.log_admin_action(TEXT, TEXT, TEXT, JSONB) FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.log_admin_action(TEXT, TEXT, TEXT, JSONB) FROM anon;
GRANT EXECUTE ON FUNCTION public.log_admin_action(TEXT, TEXT, TEXT, JSONB) TO authenticated;

-- 4. Update Audit Logs Policies
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admins can view all audit logs" ON public.audit_logs;
CREATE POLICY "Admins can view all audit logs"
ON public.audit_logs FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'super_admin'));

DROP POLICY IF EXISTS "System can insert audit logs" ON public.audit_logs;
CREATE POLICY "System can insert audit logs"
ON public.audit_logs FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);
