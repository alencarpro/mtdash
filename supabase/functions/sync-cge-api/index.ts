import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const BASE = "https://mtdash-api.cge.mt.gov.br/api/v1"

async function fetchWithTimeout(url: string, timeoutMs = 25000): Promise<Response> {
  const ctrl = new AbortController()
  const t = setTimeout(() => ctrl.abort(), timeoutMs)
  try {
    return await fetch(url, { signal: ctrl.signal })
  } finally {
    clearTimeout(t)
  }
}

async function fetchJson(url: string, opts: { retries?: number; timeoutMs?: number } = {}) {
  const retries = opts.retries ?? 3
  const timeoutMs = opts.timeoutMs ?? 25000
  let lastErr: any
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const r = await fetchWithTimeout(url, timeoutMs)
      if (!r.ok) throw new Error(`${url} -> ${r.status}`)
      return await r.json()
    } catch (e: any) {
      lastErr = e
      if (attempt === retries) break
      const backoff = Math.min(15000, 1500 * Math.pow(2, attempt)) + Math.floor(Math.random() * 500)
      console.warn(`fetchJson retry ${attempt + 1}/${retries} for ${url} after ${backoff}ms: ${e.message}`)
      await new Promise(res => setTimeout(res, backoff))
    }
  }
  throw lastErr
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
      const [brA, ufA, mtA] = await Promise.all([
        fetchJson(`${BASE}/meta-alfabetizacao-brasil/`).catch(() => null),
        fetchJson(`${BASE}/meta-alfabetizacao-uf/`),
        fetchJson(`${BASE}/meta-alfabetizacao-municipio/MT`),
      ])
      const ufArr = Array.isArray(ufA) ? ufA : []
      const mtArr = Array.isArray(mtA) ? mtA : []
      const brasilGeral = Array.isArray(brA) ? brA : (brA ? [brA] : [])
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
        { endpoint: 'alfabetizacao', payload: { brasil, mt, brasil_geral: brasilGeral }, updated_at: new Date().toISOString() },
        { onConflict: 'endpoint' }
      )
      results.alfabetizacao = { brasil: brasil.length, mt: mt.length }
    } catch (e: any) { results.alfabetizacao = { error: e.message } }

    // ─── POPULAÇÃO ──────────────────────────────────────────────────
    try {
      const [brasilPop, ufPop, mtMun] = await Promise.all([
        fetchJson(`${BASE}/brasil/`).catch(() => null),
        fetchJson(`${BASE}/uf/`).catch(() => []),
        fetchJson(`${BASE}/municipio/MT`).catch(() => []),
      ])
      await supabase.from('external_api_data').upsert(
        { endpoint: 'populacao', payload: { brasil: brasilPop, uf: ufPop, mt: mtMun }, updated_at: new Date().toISOString() },
        { onConflict: 'endpoint' }
      )
      results.populacao = {
        uf: Array.isArray(ufPop) ? ufPop.length : 0,
        mt: Array.isArray(mtMun) ? mtMun.length : 0,
      }
    } catch (e: any) { results.populacao = { error: e.message } }

    // ─── TOTAL DE SERVIDORES (SEAP) ─────────────────────────────────
    try {
      const servidores = await fetchJson(`${BASE}/total-servidores/`)
      await supabase.from('external_api_data').upsert(
        { endpoint: 'total-servidores', payload: servidores, updated_at: new Date().toISOString() },
        { onConflict: 'endpoint' }
      )
      results.servidores = Array.isArray(servidores) ? servidores.length : 1
    } catch (e: any) { results.servidores = { error: e.message } }

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