// Proxy HLS das câmeras "Obras ao Vivo" (SINFRA-MT).
// O servidor de origem só responde em HTTP / TLS inválido e sem CORS,
// portanto o navegador não consegue consumir o stream diretamente.
// Esta função busca a playlist/segmentos e devolve por HTTPS com CORS.

const ORIGIN = "http://obrasaovivo.sinfra.mt.gov.br";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, range",
  "Access-Control-Allow-Methods": "GET, HEAD, OPTIONS",
};

const SAFE = /^[a-zA-Z0-9_-]+$/;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const url = new URL(req.url);
  const cam = url.searchParams.get("cam") ?? "";
  const file = url.searchParams.get("file") ?? "index.m3u8";

  if (!SAFE.test(cam)) {
    return new Response("invalid cam", { status: 400, headers: corsHeaders });
  }
  if (!/^[a-zA-Z0-9_.-]+$/.test(file) || file.includes("..")) {
    return new Response("invalid file", { status: 400, headers: corsHeaders });
  }

  const target = `${ORIGIN}/streams/${cam}/${file}`;

  try {
    const upstream = await fetch(target, {
      method: req.method === "HEAD" ? "HEAD" : "GET",
      headers: req.headers.get("range") ? { range: req.headers.get("range")! } : undefined,
    });

    if (!upstream.ok) {
      return new Response("upstream error", { status: upstream.status, headers: corsHeaders });
    }

    // Playlist: reescreve os nomes dos segmentos para passarem pelo proxy
    if (file.endsWith(".m3u8")) {
      const text = await upstream.text();
      const base = `${url.origin}${url.pathname}?cam=${cam}&file=`;
      const rewritten = text
        .split("\n")
        .map((line) => {
          const t = line.trim();
          if (!t || t.startsWith("#")) return line;
          const name = t.split("/").pop() ?? t;
          return `${base}${encodeURIComponent(name)}`;
        })
        .join("\n");

      return new Response(rewritten, {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/vnd.apple.mpegurl",
          "Cache-Control": "no-store",
        },
      });
    }

    return new Response(upstream.body, {
      status: upstream.status,
      headers: {
        ...corsHeaders,
        "Content-Type": upstream.headers.get("content-type") ?? "video/mp2t",
        "Cache-Control": "public, max-age=10",
      },
    });
  } catch (_e) {
    return new Response("fetch failed", { status: 502, headers: corsHeaders });
  }
});
