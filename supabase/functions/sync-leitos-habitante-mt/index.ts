import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const LEITOS_MT_URL = "https://mtdash-api.cge.mt.gov.br/api/v1/leitos-por-habitante/MT"
const UF_MT_URL = "https://mtdash-api.cge.mt.gov.br/api/v1/uf/MT"

async function fetchWithRetry(url: string, retries = 3, timeoutMs = 25000): Promise<Response> {
  let lastErr: any
  for (let attempt = 0; attempt <= retries; attempt++) {
    const ctrl = new AbortController()
    const t = setTimeout(() => ctrl.abort(), timeoutMs)
    try {
      const r = await fetch(url, { signal: ctrl.signal })
      clearTimeout(t)
      if (!r.ok) throw new Error(`${url} -> ${r.status}`)
      return r
    } catch (e: any) {
      clearTimeout(t)
      lastErr = e
      if (attempt === retries) break
      const backoff = Math.min(15000, 1500 * Math.pow(2, attempt)) + Math.floor(Math.random() * 500)
      console.warn(`retry ${attempt + 1}/${retries} for ${url} after ${backoff}ms: ${e.message}`)
      await new Promise(res => setTimeout(res, backoff))
    }
  }
  throw lastErr
}

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    console.log("Sync leitos-por-habitante MT: fetching APIs...")
    const [leitosRes, ufRes] = await Promise.all([fetchWithRetry(LEITOS_MT_URL), fetchWithRetry(UF_MT_URL)])

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