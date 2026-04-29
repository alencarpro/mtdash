-- Create table to store the data
CREATE TABLE IF NOT EXISTS public.external_dashboard_data (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category TEXT NOT NULL, -- 'mortalidade_infantil' or 'alfabetizacao'
    region_type TEXT NOT NULL, -- 'brazil_state' or 'mt_municipality'
    region_name TEXT NOT NULL,
    region_code TEXT, -- State acronym or IBGE code
    value NUMERIC NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.external_dashboard_data ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Public read access for dashboard data"
ON public.external_dashboard_data FOR SELECT
USING (true);

-- Unique constraint for upserting
ALTER TABLE public.external_dashboard_data ADD CONSTRAINT unique_region_category UNIQUE (category, region_type, region_name);

-- Index for performance
CREATE INDEX idx_dashboard_data_category ON public.external_dashboard_data(category, region_type);