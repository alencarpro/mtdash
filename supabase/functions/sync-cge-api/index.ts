import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const BASE = "https://mtdash-api.cge.mt.gov.br/api/v1"

async function fetchJson(url: string) {
  const r = await fetch(url)
  if (!r.ok) throw new Error(`${url} -> ${r.status}`)
  return await r.json()
}

function pickLatestByKey<T extends Record<string, any>>(items: T[], key: string, anoKey = 'ano') {
  const map: Record<string, T> = {}
  for (const it of items) {
    const k = (it as any)[key]
    if (!k) continue
    const ano = Number((it as any)[anoKey] ?? 0)
    if (!map[k] || ano >= Number((map[k] as any)[anoKey] ?? 0)) map[k] = it
  }
  return Object.values(map)
}

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })
  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const results: Record<string, any> = {}

    // ─── MORTALIDADE ────────────────────────────────────────────────
    try {
      const [allMort, mtMort] = await Promise.all([
        fetchJson(`${BASE}/taxa-mortalidade-infantil/`),
        fetchJson(`${BASE}/taxa-mortalidade-infantil/MT`),
      ])
      const brArr = Array.isArray(allMort) ? allMort : []
      const mtArr = Array.isArray(mtMort) ? mtMort : []
      const brasil = pickLatestByKey(brArr, 'sigla_uf').map((d: any) => ({
        state: d.sigla_uf,
        value: Number(d.taxa ?? d.valor ?? d.taxa_mortalidade ?? d.value ?? 0),
        ano: d.ano,
      })).filter((d: any) => d.state && d.value > 0)
      const mt = pickLatestByKey(mtArr, 'municipio').map((d: any) => ({
        city: d.municipio || d.nome_municipio || d.city,
        value: Number(d.taxa ?? d.valor ?? d.taxa_mortalidade ?? d.value ?? 0),
        ano: d.ano,
      })).filter((d: any) => d.city && d.value > 0)
      await supabase.from('external_api_data').upsert(
        { endpoint: 'mortalidade', payload: { brasil, mt }, updated_at: new Date().toISOString() },
        { onConflict: 'endpoint' }
      )
      results.mortalidade = { brasil: brasil.length, mt: mt.length }
    } catch (e: any) { results.mortalidade = { error: e.message } }

    // ─── ALFABETIZAÇÃO ──────────────────────────────────────────────
    try {
      const [ufA, mtA] = await Promise.all([
        fetchJson(`${BASE}/meta-alfabetizacao-uf/`),
        fetchJson(`${BASE}/meta-alfabetizacao-municipio/MT`),
      ])
      const ufArr = Array.isArray(ufA) ? ufA : []
      const mtArr = Array.isArray(mtA) ? mtA : []
      const brasil = pickLatestByKey(ufArr, 'sigla_uf').map((d: any) => ({
        state: d.sigla_uf,
        value: Number(d.taxa_alfabetizacao ?? d.taxa ?? d.valor ?? d.value ?? 0),
        ano: d.ano,
      })).filter((d: any) => d.state && d.value > 0)
      const mt = pickLatestByKey(mtArr, 'municipio').map((d: any) => ({
        city: d.municipio || d.nome_municipio || d.city,
        value: Number(d.taxa_alfabetizacao ?? d.taxa ?? d.valor ?? d.value ?? 0),
        ano: d.ano,
      })).filter((d: any) => d.city && d.value > 0)
      await supabase.from('external_api_data').upsert(
        { endpoint: 'alfabetizacao', payload: { brasil, mt }, updated_at: new Date().toISOString() },
        { onConflict: 'endpoint' }
      )
      results.alfabetizacao = { brasil: brasil.length, mt: mt.length }
    } catch (e: any) { results.alfabetizacao = { error: e.message } }

    return new Response(JSON.stringify({ message: "ok", results }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    })
  } catch (err: any) {
    console.error("Sync CGE error:", err.message)
    return new Response(JSON.stringify({ error: err.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    })
  }
})