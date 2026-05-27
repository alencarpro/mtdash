
-- 1. Finalize profiles table
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS active BOOLEAN DEFAULT true;

-- Ensure existing profiles are active
UPDATE public.profiles SET active = true WHERE active IS NULL;

-- 2. Create Audit Logs table (if not exists)
CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    admin_id UUID REFERENCES auth.users(id),
    action TEXT NOT NULL, 
    target_id UUID,
    details JSONB,
    ip_address TEXT,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 3. Security for Audit Logs
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Admins can view all audit logs' AND tablename = 'audit_logs') THEN
        CREATE POLICY "Admins can view all audit logs"
        ON public.audit_logs FOR SELECT
        TO authenticated
        USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'super_admin'));
    END IF;
END $$;

DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'System can insert audit logs' AND tablename = 'audit_logs') THEN
        CREATE POLICY "System can insert audit logs"
        ON public.audit_logs FOR INSERT
        TO authenticated
        WITH CHECK (true);
    END IF;
END $$;

-- 4. Function to log actions
CREATE OR REPLACE FUNCTION public.log_admin_action(
    _action TEXT,
    _target_id UUID DEFAULT NULL,
    _details JSONB DEFAULT NULL
) RETURNS VOID AS $$
BEGIN
    INSERT INTO public.audit_logs (admin_id, action, target_id, details)
    VALUES (auth.uid(), _action, _target_id, _details);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
