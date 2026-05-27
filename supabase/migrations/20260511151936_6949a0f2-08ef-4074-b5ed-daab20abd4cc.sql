-- RBAC System Implementation
CREATE TYPE public.app_role AS ENUM ('super_admin', 'admin', 'operator', 'viewer');

-- User Roles Table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE (user_id, role)
);

-- Permissions Table
CREATE TABLE public.permissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Role Permissions (Mapping)
CREATE TABLE public.role_permissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  role app_role NOT NULL,
  permission_id UUID REFERENCES public.permissions(id) ON DELETE CASCADE NOT NULL,
  UNIQUE (role, permission_id)
);

-- Enable RLS
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.role_permissions ENABLE ROW LEVEL SECURITY;

-- Security Definer Function to check roles (bypasses RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Security Definer Function to check permissions
CREATE OR REPLACE FUNCTION public.has_permission(_user_id uuid, _permission_name text)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles ur
    JOIN public.role_permissions rp ON ur.role = rp.role
    JOIN public.permissions p ON rp.permission_id = p.id
    WHERE ur.user_id = _user_id AND p.name = _permission_name
  )
$$;

-- Update RLS for tables to use RBAC
-- Profiles: admins can see all in org, users can see own
DROP POLICY IF EXISTS "Profiles viewable by same org" ON public.profiles;
CREATE POLICY "profiles_rbac_select" ON public.profiles FOR SELECT
USING (
  id = auth.uid() OR 
  public.has_role(auth.uid(), 'admin') OR 
  public.has_role(auth.uid(), 'super_admin')
);

-- Environments: restricted by org and role
DROP POLICY IF EXISTS "Org-based environments" ON public.environments;
CREATE POLICY "environments_rbac_all" ON public.environments FOR ALL
USING (
  organization_id = public.current_user_org_id() AND (
    public.has_role(auth.uid(), 'admin') OR 
    public.has_role(auth.uid(), 'super_admin') OR
    public.has_role(auth.uid(), 'operator')
  )
);

-- Dashboard Management Policies
DROP POLICY IF EXISTS "Org-based dashboards" ON public.dashboards;
CREATE POLICY "dashboards_rbac_all" ON public.dashboards FOR ALL
USING (
  organization_id = public.current_user_org_id() AND (
    public.has_permission(auth.uid(), 'manage_dashboards') OR
    public.has_role(auth.uid(), 'admin') OR 
    public.has_role(auth.uid(), 'super_admin')
  )
);

-- Seed initial permissions
INSERT INTO public.permissions (name, description) VALUES
('manage_dashboards', 'Create, edit, and delete dashboards'),
('manage_playlists', 'Organize and schedule playlists'),
('operate_players', 'Control display players and columns'),
('view_analytics', 'View detailed metrics and logs');

-- Map permissions to roles
INSERT INTO public.role_permissions (role, permission_id)
SELECT 'admin', id FROM public.permissions;

INSERT INTO public.role_permissions (role, permission_id)
SELECT 'operator', id FROM public.permissions WHERE name IN ('manage_playlists', 'operate_players', 'view_analytics');

INSERT INTO public.role_permissions (role, permission_id)
SELECT 'viewer', id FROM public.permissions WHERE name = 'view_analytics';

-- Grant access to user_roles to appropriate roles
CREATE POLICY "Admins can view all roles" ON public.user_roles FOR SELECT
USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'super_admin'));

-- Cleanup old role column from profiles if it exists (optional, keeping it for now to avoid breaking existing code)
-- ALTER TABLE public.profiles DROP COLUMN role;
