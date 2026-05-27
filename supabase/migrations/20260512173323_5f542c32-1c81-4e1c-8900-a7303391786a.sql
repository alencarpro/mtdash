-- Alter dashboards table to support Kanban
ALTER TABLE public.dashboards ADD COLUMN IF NOT EXISTS column_id UUID;
ALTER TABLE public.dashboards ADD COLUMN IF NOT EXISTS order_index INTEGER DEFAULT 0;

-- Create dashboard_columns table
CREATE TABLE IF NOT EXISTS public.dashboard_columns (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.dashboard_columns ENABLE ROW LEVEL SECURITY;

-- Policies for dashboard_columns
-- Public read for dashboard_columns
CREATE POLICY "Public read for dashboard_columns" ON public.dashboard_columns FOR SELECT USING (true);

-- Admin full access for dashboard_columns using lowercase enum values
CREATE POLICY "Admin full access for dashboard_columns" ON public.dashboard_columns FOR ALL USING (
    EXISTS (
        SELECT 1 FROM public.user_roles ur 
        WHERE ur.user_id = auth.uid() AND (ur.role = 'admin'::app_role OR ur.role = 'super_admin'::app_role)
    )
);

-- Seed initial columns if empty
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM public.dashboard_columns) THEN
        INSERT INTO public.dashboard_columns (name, order_index) VALUES 
        ('Exibição Principal', 0),
        ('Monitoramento', 1),
        ('Alertas Críticos', 2),
        ('Financeiro', 3);
    END IF;
END $$;
