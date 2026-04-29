 import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
 import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1"
 
 const API_URL = "https://mtdash-api.cge.mt.gov.br/"
 
 serve(async (req) => {
   try {
     const supabase = createClient(
       Deno.env.get('SUPABASE_URL') ?? '',
       Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
     )
 
     console.log("Iniciando sincronização com a API CGE-MT...")
 
     // Lista de endpoints para sincronizar (ajustar conforme documentação da API)
     const endpoints = ["mortalidade", "alfabetizacao"]
     
     for (const path of endpoints) {
       const response = await fetch(`${API_URL}${path}`)
       if (!response.ok) throw new Error(`Falha ao buscar ${path}`)
       
       const data = await response.json()
 
       const { error } = await supabase
         .from('external_api_data')
         .upsert(
           { endpoint: path, payload: data },
           { onConflict: 'endpoint' }
         )
 
       if (error) throw error
       console.log(`Endpoint ${path} sincronizado com sucesso.`)
     }
 
     return new Response(JSON.stringify({ message: "Sincronização concluída" }), {
       headers: { "Content-Type": "application/json" },
       status: 200,
     })
   } catch (err) {
     console.error("Erro na sincronização:", err.message)
     return new Response(JSON.stringify({ error: err.message }), {
       headers: { "Content-Type": "application/json" },
       status: 500,
     })
   }
 })