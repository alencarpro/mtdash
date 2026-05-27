-- Enable pg_cron if not already enabled
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Schedule the sync-authority heartbeat
-- Note: Replace with actual URL if different, but this follows standard naming
SELECT cron.schedule(
  'sync-authority-heartbeat',
  '* * * * *',
  $$ 
  SELECT net.http_post(
    url := 'https://tozlbjyiuycxrbkwshgu.supabase.co/functions/v1/sync-authority',
    headers := jsonb_build_object('Authorization', 'Bearer ' || (SELECT value FROM vault.decrypted_secrets WHERE name = 'SUPABASE_SERVICE_ROLE_KEY'))
  ); 
  $$
);
