-- Enable pg_cron if not already enabled
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Schedule the cron job to call the edge function daily at 00:00
-- Note: Replace the URL with the actual project URL which is usually handled by the infra, 
-- but we can use net_http_post for a generic trigger if the function is public or handle auth.
SELECT cron.schedule(
  'update-dashboard-data-job',
  '0 0 * * *',
  $$
  SELECT net.http_post(
    url := 'https://aoutccbgyowaufkdogfn.supabase.co/functions/v1/update-dashboard-data',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer ' || current_setting('app.settings.service_role_key', true)
    )
  );
  $$
);