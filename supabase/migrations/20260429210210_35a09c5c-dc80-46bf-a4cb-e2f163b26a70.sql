-- Corrigir avisos de segurança (search_path)
ALTER FUNCTION public.update_updated_at_column() SET search_path = public;

-- Ativar extensão cron (requer privilégios de superuser em alguns ambientes, mas padrão no Supabase)
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Agendar a tarefa para as 00:00 (UTC-3 seria 03:00 UTC)
-- Como o servidor geralmente usa UTC, agendamos para 03:00 para bater com 00:00 de MT/Brasília
SELECT cron.schedule(
    'sync-cge-api-daily',
    '0 3 * * *',
    $$ SELECT net.http_post(
        url := (SELECT value FROM settings WHERE key = 'edge_function_url') || '/sync-cge-api',
        headers := jsonb_build_object('Authorization', 'Bearer ' || (SELECT value FROM settings WHERE key = 'service_role_key'))
    ) $$
);

-- Nota: Este comando de agendamento assume que as variáveis de URL e Key estão disponíveis.
-- No Lovable Cloud, o agendamento é gerenciado internamente se o pg_cron falhar.