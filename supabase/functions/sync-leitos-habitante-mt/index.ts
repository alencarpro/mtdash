import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const LEITOS_MT_URL = "https://mtdash-api.cge.mt.gov.br/api/v1/leitos-por-habitante/MT"
const UF_MT_URL = "https://mtdash-api.cge.mt.gov.br/api/v1/uf/MT"

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    console.log("Sync leitos-por-habitante MT: fetching APIs...")
    const [leitosRes, ufRes] = await Promise.all([fetch(LEITOS_MT_URL), fetch(UF_MT_URL)])
    if (!leitosRes.ok) throw new Error(`Leitos MT API ${leitosRes.status}`)
    if (!ufRes.ok) throw new Error(`UF MT API ${ufRes.status}`)

    const leitos = await leitosRes.json()
    const ufData = await ufRes.json()
    const popMT = Array.isArray(ufData)
      ? Math.max(...ufData.map((u: any) => Number(u.populacao_total ?? 0)))
      : Number((ufData as any)?.populacao_total ?? 0)

    const list = Array.isArray(leitos) ? leitos : []
    const merged: Record<string, any> = {}
    for (const l of list) {
      const city = l.municipio || l.nome_municipio || l.city || l.nome
      if (!city) continue
      const ano = Number(l.ano ?? 0)
      const qtd = Number(l.qtd_leitos ?? l.leitos ?? 0)
      const pop = Number(l.populacao_total ?? l.populacao ?? 0)
      const taxa = Number(l.leitos_por_mil_habitantes ?? l.value ?? 0)
      const computed = taxa > 0 ? taxa : pop > 0 ? (qtd / pop) * 1000 : 0
      if (!merged[city] || ano >= (merged[city].ano ?? 0)) {
        merged[city] = {
          municipio: city,
          city,
          ano,
          qtd_leitos: qtd,
          leitos: qtd,
          populacao_total: pop,
          populacao: pop,
          leitos_por_mil_habitantes: Number(computed.toFixed(3)),
          value: Number(computed.toFixed(3)),
        }
      }
    }

    const payload = Object.values(merged)
    const { error } = await supabase
      .from('external_api_data')
      .upsert(
        { endpoint: 'leitos-por-habitante-mt', payload, updated_at: new Date().toISOString() },
        { onConflict: 'endpoint' }
      )
    if (error) throw error

    return new Response(
      JSON.stringify({ message: "ok", count: payload.length, populacao_mt: popMT }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
    )
  } catch (err: any) {
    console.error("Sync leitos MT error:", err.message)
    return new Response(
      JSON.stringify({ error: err.message }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    )
  }
})