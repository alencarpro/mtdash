# Definições de Dashboards — CGE-MT

Esta pasta contém os arquivos de definição de dashboards que podem ser importados para o banco de dados Supabase por meio do painel administrativo da plataforma CMCE (Central de Monitoramento e Controle Estratégico).

---

## Como funciona

Cada arquivo `.json` nesta pasta representa um dashboard disponível para exibição na plataforma. Os arquivos seguem um formato padronizado e são lidos pelo painel de administração para permitir o cadastro em lote ou individual no banco de dados.

Para importar um dashboard:
1. Acesse o painel administrativo da plataforma.
2. Navegue até **Dashboards → Importar Definição**.
3. Selecione o arquivo `.json` correspondente.
4. Revise os campos e confirme a importação.

---

## Formato do arquivo de definição

Cada arquivo deve ser um objeto JSON com os seguintes campos:

| Campo              | Tipo            | Obrigatório | Descrição                                                                                                 |
|--------------------|-----------------|-------------|-----------------------------------------------------------------------------------------------------------|
| `name`             | `string`        | ✅ Sim       | Nome exibido do dashboard na interface da plataforma.                                                     |
| `description`      | `string`        | ✅ Sim       | Descrição detalhada do conteúdo e finalidade do dashboard.                                                |
| `category`         | `string (enum)` | ✅ Sim       | Categoria temática. Valores permitidos: `TRANSPARENCY`, `ECONOMY`, `SOCIAL`, `ENVIRONMENT`, `WORKS`, `CUSTOM`. |
| `source_url`       | `string (URL)`  | ✅ Sim       | URL da fonte de dados ou do painel externo que alimenta este dashboard.                                   |
| `refresh_interval` | `integer`       | ✅ Sim       | Intervalo de atualização dos dados em segundos. Valor padrão recomendado: `60`.                           |
| `status`           | `string (enum)` | ✅ Sim       | Estado do dashboard. Valores permitidos: `ACTIVE`, `INACTIVE`, `DRAFT`.                                   |
| `thumbnail_url`    | `string \| null` | ❌ Não      | URL de uma imagem de miniatura para o dashboard. Pode ser `null` se não houver imagem disponível.         |

### Valores válidos para `category`

| Valor           | Descrição                                                        |
|-----------------|------------------------------------------------------------------|
| `TRANSPARENCY`  | Transparência pública, acesso à informação e gastos governamentais |
| `ECONOMY`       | Indicadores econômicos, orçamento e finanças públicas             |
| `SOCIAL`        | Saúde, educação, assistência social e indicadores de bem-estar    |
| `ENVIRONMENT`   | Meio ambiente, desmatamento e sustentabilidade                    |
| `WORKS`         | Obras e infraestrutura públicas                                   |
| `CUSTOM`        | Uso interno da CGE-MT ou categorias personalizadas                |

### Valores válidos para `status`

| Valor      | Descrição                                              |
|------------|--------------------------------------------------------|
| `ACTIVE`   | Dashboard ativo e visível na plataforma                |
| `INACTIVE` | Dashboard desativado temporariamente                   |
| `DRAFT`    | Rascunho em elaboração, não exibido publicamente       |

---

## Exemplo de arquivo de definição

```json
{
  "name": "Painel de Transparência Fiscal",
  "description": "Acompanhamento dos gastos públicos do Estado de Mato Grosso com dados do Portal da Transparência.",
  "category": "TRANSPARENCY",
  "source_url": "https://transparencia.mt.gov.br/painel/fiscal",
  "refresh_interval": 60,
  "status": "ACTIVE",
  "thumbnail_url": null
}
```

---

## Dashboards disponíveis nesta pasta

| Arquivo                              | Nome                              | Categoria        |
|--------------------------------------|-----------------------------------|------------------|
| `painel-transparencia-fiscal.json`   | Painel de Transparência Fiscal    | TRANSPARENCY     |
| `painel-execucao-orcamentaria.json`  | Painel de Execução Orçamentária   | ECONOMY          |
| `painel-compras-governamentais.json` | Painel de Compras Governamentais  | TRANSPARENCY     |
| `painel-controle-interno.json`       | Painel de Controle Interno        | CUSTOM           |
| `painel-obras-publicas.json`         | Painel de Obras Públicas          | WORKS            |
| `painel-indicadores-sociais.json`    | Painel de Indicadores Sociais     | SOCIAL           |
| `painel-meio-ambiente.json`          | Painel de Meio Ambiente           | ENVIRONMENT      |
| `painel-gestao-risco.json`           | Painel de Gestão de Riscos        | CUSTOM           |

---

## Como adicionar um novo dashboard

1. Crie um novo arquivo `.json` nesta pasta seguindo a convenção de nomenclatura: `painel-<nome-descritivo>.json`.
2. Preencha todos os campos obrigatórios conforme a tabela acima.
3. Valide o JSON antes de importar (utilize ferramentas como [jsonlint.com](https://jsonlint.com)).
4. Importe o arquivo pelo painel administrativo da plataforma CMCE.

---

*Mantido pela equipe de tecnologia da CGE-MT — Controladoria Geral do Estado de Mato Grosso.*
