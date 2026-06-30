import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/api/public/seed-admin')({
  server: {
    handlers: {
      POST: async () => {
        const { supabaseAdmin } = await import('@/integrations/supabase/client.server')
        const email = 'admin@admin.com'
        const password = 'admin123'

        const { data: created, error: createErr } = await supabaseAdmin.auth.admin.createUser({
          email,
          password,
          email_confirm: true,
        })

        let userId = created?.user?.id
        if (!userId) {
          const { data: list } = await supabaseAdmin.auth.admin.listUsers()
          userId = list?.users?.find((u) => u.email === email)?.id
          if (userId) {
            await supabaseAdmin.auth.admin.updateUserById(userId, { password, email_confirm: true })
          }
        }

        if (!userId) {
          return new Response(JSON.stringify({ error: createErr?.message ?? 'no user' }), { status: 500 })
        }

        const { error: roleErr } = await supabaseAdmin
          .from('user_roles')
          .upsert({ user_id: userId, role: 'admin' }, { onConflict: 'user_id,role' })

        return new Response(
          JSON.stringify({ ok: true, userId, roleError: roleErr?.message ?? null }),
          { status: 200, headers: { 'content-type': 'application/json' } },
        )
      },
    },
  },
})