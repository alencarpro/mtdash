import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const LEITOS_URL = "https://mtdash-api.cge.mt.gov.br/api/v1/leitos-por-habitante/"
const UF_URL = "https://mtdash-api.cge.mt.gov.br/api/v1/uf/"

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

    console.log("Sync leitos-por-habitante: fetching APIs...")

    const [leitosRes, ufRes] = await Promise.all([
      fetchWithRetry(LEITOS_URL),
      fetchWithRetry(UF_URL),
    ])

    const leitos = await leitosRes.json()
    const ufs = await ufRes.json()

    // Map population by sigla_uf (latest year)
    const popBySigla: Record<string, number> = {}
    if (Array.isArray(ufs)) {
      for (const u of ufs) {
        const sig = u.sigla_uf
        if (!sig) continue
        if (!popBySigla[sig] || (u.ano ?? 0) > (popBySigla[sig + '_ano'] ?? 0)) {
          popBySigla[sig] = Number(u.populacao_total ?? 0)
          ;(popBySigla as any)[sig + '_ano'] = u.ano ?? 0
        }
      }
    }

    // Aggregate leitos by UF (latest year if multiple)
    const merged: Record<string, any> = {}
    if (Array.isArray(leitos)) {
      for (const l of leitos) {
        const sig = l.sigla_uf || l.uf || l.estado
        if (!sig) continue
        const ano = Number(l.ano ?? 0)
        if (!merged[sig] || ano >= (merged[sig].ano ?? 0)) {
          const qtdLeitos = Number(l.qtd_leitos ?? l.leitos ?? 0)
          const taxa = Number(
            l.leitos_por_mil_habitantes ?? l.leitos_por_habitante ?? l.taxa ?? 0
          )
          const pop = popBySigla[sig] || 0
          merged[sig] = {
            sigla_uf: sig,
            ano,
            qtd_leitos: qtdLeitos,
            populacao_total: pop,
            leitos_por_mil_habitantes: taxa > 0
              ? taxa
              : pop > 0
                ? (qtdLeitos / pop) * 1000
                : 0,
          }
        }
      }
    }

    const payload = Object.values(merged).map((d: any) => ({
      state: d.sigla_uf,
      sigla_uf: d.sigla_uf,
      ano: d.ano,
      leitos: d.qtd_leitos,
      qtd_leitos: d.qtd_leitos,
      populacao: d.populacao_total,
      populacao_total: d.populacao_total,
      value: Number(d.leitos_por_mil_habitantes.toFixed(3)),
      leitos_por_mil_habitantes: Number(d.leitos_por_mil_habitantes.toFixed(3)),
    }))

    const { error } = await supabase
      .from('external_api_data')
      .upsert(
        { endpoint: 'leitos-por-habitante', payload, updated_at: new Date().toISOString() },
        { onConflict: 'endpoint' }
      )

    if (error) throw error

    return new Response(
      JSON.stringify({ message: "ok", count: payload.length }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
    )
  } catch (err: any) {
    console.error("Sync leitos error:", err.message)
    return new Response(
      JSON.stringify({ error: err.message }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    )
  }
})