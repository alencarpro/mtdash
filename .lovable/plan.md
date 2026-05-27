## Diagnóstico

### Por que o login não funciona

Os logs do Supabase confirmam que a autenticação em si **funciona** (`Login` 200 OK para `angelton@gmail.com`). O problema é pós-login.

**Causa raiz — loop de redirecionamento por SSR:**

`src/routes/__root.tsx` define `beforeLoad` que chama `supabase.auth.getSession()` usando o cliente do browser (que persiste sessão em `localStorage`).

```
beforeLoad: async ({ location }) => {
  const { supabase } = await import('@/lib/supabase/client');
  const { data: { session } } = await supabase.auth.getSession();
  if (!session && !isLoginPage) throw redirect({ to: '/login' });
  if (session && isLoginPage) throw redirect({ to: '/' });
}
```

Em TanStack Start, `beforeLoad` da rota raiz **roda também no servidor durante SSR**. No servidor não existe `localStorage` nem cookies de sessão do Supabase (a sessão fica só no browser), então `getSession()` retorna `null`. Resultado:

1. Usuário envia login → Supabase autentica → toast aparece por ~300ms.
2. Código faz `window.location.href = '/'` (reload completo).
3. SSR de `/` executa o `beforeLoad` da raiz → sem sessão no servidor → redireciona para `/login`.
4. Usuário cai de volta em `/login`.
5. No client, hidratação encontra a sessão e o `beforeLoad` client-side redireciona pra `/` → SSR roda de novo → loop.

A mesma falha afeta a rota `/admin` que adicionei na última iteração (também faz `getSession()` em `beforeLoad`).

### Por que os toasts não aparecem

Dois fatores combinados:
- `window.location.href = '/'` faz reload completo, destruindo o `<Toaster />` antes do toast renderizar pra valer (300ms é insuficiente — e mesmo se fosse, recarregar mata).
- Quando o loop acima dispara o redirect SSR para `/login`, o toast nunca chega a montar porque a página inteira é trocada.

## Plano de correção

### 1. Retirar a checagem de sessão do SSR

Mover a guarda do `beforeLoad` da raiz para rodar **apenas no client**. Em TanStack Start, isso é feito detectando `typeof window === 'undefined'` (servidor) e retornando sem fazer nada — a guarda do client cuida do redirect quando a hidratação acontece.

Aplicar o mesmo padrão em `src/routes/admin.tsx` (a checagem de role também só vale no client; RLS já garante segurança no servidor).

A proteção real continua intacta porque:
- RLS no Supabase impede acesso a dados sem sessão válida.
- O `AdminDashboard` e o `Index` já checam `isAuthenticated` / `role` no React e mostram fallback de loading.

### 2. Usar navegação SPA em vez de reload

Em `src/components/LoginSplit.tsx`:
- Trocar `window.location.href = '/'` por `navigate({ to: '/admin' })` (admins) ou `navigate({ to: '/' })` (demais), preservando o `<Toaster />` montado.
- Remover o `setTimeout(..., 300)` — o toast `sonner` já tem duração própria e sobrevive à navegação SPA.
- Invalidar o router (`router.invalidate()`) após login para o `AuthContext` recarregar o profile.

### 3. Garantir que o `<Toaster />` esteja sempre montado

Já está em `__root.tsx`. Confirmar que continua fora do `<Outlet />` (está) e que não há toasts duplicados configurados.

### 4. Tratar findings de segurança da view atual

Os findings `agent_security` e `supabase_lov` referenciam funções (`newera_mark_purchase_paid`, `newera_attach_license_to_purchase`) e bucket (`newera-resources`) que **não existem neste projeto** — o schema atual é o do CGE-MT (dashboards, profiles, user_roles). São findings obsoletos de um scan anterior em outro projeto. Vou marcar como `mark_as_fixed` com explicação.

Os findings restantes do scanner `supabase` (SECURITY DEFINER executável, leaked password protection, function search_path mutable) já foram tratados na iteração anterior — confirmar que continuam ignorados com justificativa válida.

## Arquivos a modificar

- `src/routes/__root.tsx` — `beforeLoad` retorna cedo no servidor.
- `src/routes/admin.tsx` — `beforeLoad` retorna cedo no servidor.
- `src/components/LoginSplit.tsx` — navegação SPA + remover `setTimeout`.

## Detalhes técnicos

```ts
// __root.tsx — pular guarda no servidor
beforeLoad: async ({ location }) => {
  if (typeof window === 'undefined') return; // SSR: sem acesso à sessão
  const { supabase } = await import('@/lib/supabase/client');
  const { data: { session } } = await supabase.auth.getSession();
  // ...redirects iguais
}
```

```ts
// LoginSplit.tsx — após sucesso
const router = useRouter();
// ...
toast.success('Login realizado com sucesso!');
await router.invalidate();
navigate({ to: isAdminRole ? '/admin' : '/' });
```

```ts
// admin.tsx — guarda só no client
beforeLoad: async () => {
  if (typeof window === 'undefined') return;
  // ...mesma checagem de role
}
```
