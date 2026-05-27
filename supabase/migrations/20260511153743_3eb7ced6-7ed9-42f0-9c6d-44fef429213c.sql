-- Ensure all roles exist in both enums used by the system
DO $$
BEGIN
    -- For app_role
    IF EXISTS (SELECT 1 FROM pg_type WHERE typname = 'app_role') THEN
        ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'VIEWER';
        ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'OPERATOR';
        -- ADMIN and SUPER_ADMIN already exist based on query results
    END IF;

    -- For user_role
    IF EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN
        ALTER TYPE public.user_role ADD VALUE IF NOT EXISTS 'VIEWER';
        ALTER TYPE public.user_role ADD VALUE IF NOT EXISTS 'OPERATOR';
        ALTER TYPE public.user_role ADD VALUE IF NOT EXISTS 'ADMIN';
        ALTER TYPE public.user_role ADD VALUE IF NOT EXISTS 'SUPER_ADMIN';
    END IF;
EXCEPTION
    WHEN duplicate_object THEN null;
END
$$;

-- Ensure profiles table has necessary columns for Enterprise features
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS organization_id UUID,
ADD COLUMN IF NOT EXISTS fullscreen_auto BOOLEAN DEFAULT false;

-- Create session_logs table for audit and watchdog
CREATE TABLE IF NOT EXISTS public.session_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    login_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    logout_at TIMESTAMP WITH TIME ZONE,
    ip_address TEXT,
    device_info TEXT,
    fullscreen BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on session_logs
ALTER TABLE public.session_logs ENABLE ROW LEVEL SECURITY;

-- Policies for session_logs
-- Drop existing if they somehow exist to avoid conflicts
DROP POLICY IF EXISTS "Users can view their own session logs" ON public.session_logs;
DROP POLICY IF EXISTS "Admins can view all session logs" ON public.session_logs;
DROP POLICY IF EXISTS "System can insert session logs" ON public.session_logs;

CREATE POLICY "Users can view their own session logs"
ON public.session_logs
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all session logs"
ON public.session_logs
FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM public.user_roles
        WHERE user_id = auth.uid() AND (role::text = 'ADMIN' OR role::text = 'SUPER_ADMIN')
    )
);

CREATE POLICY "System can insert session logs"
ON public.session_logs
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Ensure user_roles has RLS
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view their own roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can manage user roles" ON public.user_roles;

CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage user roles"
ON public.user_roles
FOR ALL
USING (
    EXISTS (
        SELECT 1 FROM public.user_roles
        WHERE user_id = auth.uid() AND (role::text = 'ADMIN' OR role::text = 'SUPER_ADMIN')
    )
);
