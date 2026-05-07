-- Allow upsert via service role (already allowed) and seed initial timestamps
INSERT INTO public.external_api_data (endpoint, payload, updated_at) VALUES
  ('mortalidade', '{}'::jsonb, now()),
  ('alfabetizacao', '{}'::jsonb, now()),
  ('leitos-por-habitante', '[]'::jsonb, now()),
  ('leitos-por-habitante-mt', '[]'::jsonb, now())
ON CONFLICT DO NOTHING;