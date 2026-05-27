import { createServerFn } from '@tanstack/react-start';
import { z } from 'zod';
import { requireSupabaseAuth } from '@/integrations/supabase/auth-middleware';

// SECURITY: Server-side re-check of role using the caller's authenticated
// Supabase client (RLS-respecting). This is defence-in-depth on top of RLS.
async function assertAdmin(supabase: any, userId: string) {
  const { data, error } = await supabase
    .from('user_roles')
    .select('role')
    .eq('user_id', userId);
  if (error) throw new Response('Forbidden', { status: 403 });
  const roles = (data ?? []).map((r: { role: string }) => r.role);
  if (!roles.includes('admin') && !roles.includes('super_admin')) {
    throw new Response('Forbidden: admin role required', { status: 403 });
  }
}

const togglePlaybackSchema = z.object({
  columnIndex: z.number().int().min(0).max(3),
  state: z.enum(['RUNNING', 'PAUSED']),
});

export const togglePlaybackFn = createServerFn({ method: 'POST' })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => togglePlaybackSchema.parse(d))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    await assertAdmin(supabase, userId);
    const { error } = await supabase
      .from('column_playback_controls')
      .upsert(
        {
          column_index: data.columnIndex,
          state: data.state,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'column_index' }
      );
    if (error) throw new Response(error.message, { status: 400 });
    return { ok: true };
  });

const updateDashboardSchema = z.object({
  id: z.string().uuid(),
  updates: z
    .object({
      name: z.string().min(1).max(200).optional(),
      description: z.string().max(2000).nullable().optional(),
      column_id: z.string().uuid().nullable().optional(),
      order_index: z.number().int().optional(),
      source_url: z.string().url().optional(),
      refresh_interval: z.number().int().positive().optional(),
    })
    .strict(),
});

export const updateDashboardFn = createServerFn({ method: 'POST' })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => updateDashboardSchema.parse(d))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    await assertAdmin(supabase, userId);
    const { error } = await supabase
      .from('dashboards')
      .update(data.updates)
      .eq('id', data.id);
    if (error) throw new Response(error.message, { status: 400 });
    return { ok: true };
  });

const deleteDashboardSchema = z.object({ id: z.string().uuid() });

export const deleteDashboardFn = createServerFn({ method: 'POST' })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => deleteDashboardSchema.parse(d))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    await assertAdmin(supabase, userId);
    const { error } = await supabase.from('dashboards').delete().eq('id', data.id);
    if (error) throw new Response(error.message, { status: 400 });
    return { ok: true };
  });
