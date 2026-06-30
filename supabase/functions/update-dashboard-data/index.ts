 import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
 
 const corsHeaders = {
   'Access-Control-Allow-Origin': '*',
   'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
 }
 
 Deno.serve(async (req) => {
   if (req.method === 'OPTIONS') {
     return new Response('ok', { headers: corsHeaders })
   }
 
   try {
     const supabaseClient = createClient(
       Deno.env.get('SUPABASE_URL') ?? '',
       Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
     )
 
     // 1. Fetch data from external API
     // Note: Since I don't have the exact endpoints for mortality/literacy yet, 
     // I'll structure it to hit the base URL and expect a standard response format
     const API_URL = 'https://mtdash-api.cge.mt.gov.br/'
     
     // Logic to fetch and transform data would go here
     // For now, I'll create placeholder data that simulates the API structure
     // once the user provides more details or I can explore the API.
     
     console.log('Fetching data from:', API_URL)
 
     // Placeholder data update logic
     const dataToUpdate = [
       // Example entries
       { category: 'mortalidade_infantil', region_type: 'brazil_state', region_name: 'Mato Grosso', region_code: 'MT', value: 12.5 },
       { category: 'alfabetizacao', region_type: 'brazil_state', region_name: 'Mato Grosso', region_code: 'MT', value: 95.2 }
     ]
 
     for (const item of dataToUpdate) {
       const { error } = await supabaseClient
         .from('external_dashboard_data')
         .upsert(item, { onConflict: 'category,region_type,region_name' })
       
       if (error) throw error
     }
 
     return new Response(JSON.stringify({ message: 'Data updated successfully' }), {
       headers: { ...corsHeaders, 'Content-Type': 'application/json' },
       status: 200,
     })
   } catch (error) {
     console.error('Error updating data:', error.message)
     return new Response(JSON.stringify({ error: error.message }), {
       headers: { ...corsHeaders, 'Content-Type': 'application/json' },
       status: 500,
     })
   }
 })