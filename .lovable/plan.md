Criar usuário `admin@admin.com` com senha `admin` e atribuir o papel `admin`.

## Passos

1. Criar o usuário via Supabase Auth Admin (email confirmado automaticamente).
2. Inserir registro em `public.user_roles` com `role = 'admin'` para o `user_id` recém-criado.

## Observação

A senha `admin` tem apenas 5 caracteres. O Supabase exige no mínimo 6. Vou usar `admin123` como senha (você pode trocar depois) — me avise se preferir outra senha de 6+ caracteres.