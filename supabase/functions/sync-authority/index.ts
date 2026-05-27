import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!
const SUPABASE_ANON_KEY = Deno.env.get('SUPABASE_ANON_KEY')!
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!

serve(async (req) => {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return new Response(JSON.stringify({ error: "No authorization header" }), { 
      status: 401,
      headers: { "Content-Type": "application/json" }
    });
  }

  const token = authHeader.split(" ")[1];
  
  // Create a supabase client with the user's JWT to verify it
  const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    global: { headers: { Authorization: `Bearer ${token}` } },
  })

  // Verify signature and get user
  const { data: { user }, error: authError } = await supabaseClient.auth.getUser();

  if (authError || !user) {
    return new Response(JSON.stringify({ error: "Invalid token signature or expired" }), { 
      status: 401,
      headers: { "Content-Type": "application/json" }
    });
  }

  // Check claims and scope (e.g., must be an admin or super_admin)
  // We use the service role client to check the user's role in our database
  const adminClient = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
  const { data: roleData, error: roleError } = await adminClient
    .from('user_roles')
    .select('role')
    .eq('user_id', user.id)
    .single();

  if (roleError || !roleData || !['ADMIN', 'SUPER_ADMIN'].includes(roleData.role.toUpperCase())) {
    return new Response(JSON.stringify({ error: "Insufficient permissions: Admin scope required" }), { 
      status: 403,
      headers: { "Content-Type": "application/json" }
    });
  }

  // Proceed with the routine using service role for broadcasting
  const now = new Date()
  const payload = {
    timestamp: now.toISOString(),
    second: now.getSeconds(),
    minute: now.getMinutes(),
    hour: now.getHours(),
    triggered_by: user.id
  }

  const { error: broadcastError } = await adminClient
    .channel('global-sync')
    .send({
      type: 'broadcast',
      event: 'tick',
      payload
    })

  if (broadcastError) {
    return new Response(JSON.stringify({ error: broadcastError.message }), { 
      status: 500,
      headers: { "Content-Type": "application/json" }
    })
  }

  return new Response(JSON.stringify({ success: true, tick: payload }), {
    headers: { "Content-Type": "application/json" },
  })
})
