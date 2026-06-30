## Objetivo

Exibir a fonte **DATASUS** no rodapé dos painéis de Mortalidade Infantil (rotas `/a05` e `/a06`), corrigindo a atribuição atual que mostra incorretamente "FIPLAN/SEFAZ".

## Contexto

No arquivo `src/pages/dashboard/SingleDashboard.tsx`, o rodapé (linhas 2054-2084) escolhe a fonte com base no índice `active` do painel ativo. Os painéis de Mortalidade Infantil são:

- `active === 13` → "Mortalidade Inf — BR" (rota `/a05`)
- `active === 14` → "Mortalidade Inf — MT" (rota `/a06`)

Atualmente esses dois índices estão incluídos na condição que mostra **"Fonte: FIPLAN/SEFAZ"** (linha 2067), o que está errado para dados de mortalidade.

## Mudança

No bloco do rodapé em `src/pages/dashboard/SingleDashboard.tsx`:

1. **Remover** `13` e `14` da condição da linha 2067 (que ficará apenas com `10, 11, 12, 15, 16` para FIPLAN/SEFAZ).
2. **Adicionar** uma nova ramificação antes do fallback:

   ```tsx
   ) : active === 13 || active === 14 ? (
     <span className="text-[16px] sm:text-[18px]" style={{ color: '#8df3db' }}>
       Fonte: DATASUS
     </span>
   ) : (
   ```

## Observação

O painel "Social" (`active === 1`, rota `/a02`) contém o gráfico de Mortalidade junto com outros indicadores (educação, segurança, etc.), então o rodapé desse painel **não** será alterado — segue como `dados.mt.gov.br`. A atribuição DATASUS já aparece nos próprios cards de mortalidade dentro do painel Social.

## Arquivos afetados

- `src/pages/dashboard/SingleDashboard.tsx` (apenas o bloco do `<footer>`, linhas ~2067-2079)