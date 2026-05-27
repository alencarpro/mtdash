/**
 * Registro de Dashboards
 * Definições bundled com a aplicação.
 * Cada entrada espelha o arquivo JSON correspondente em /dashboards/.
 * Use o botão "Importar Dashboards" no Painel Admin para inserir no Supabase.
 */

export type DashboardCategory =
  | 'ECONOMY'
  | 'SOCIAL'
  | 'ENVIRONMENT'
  | 'WORKS'
  | 'TRANSPARENCY'
  | 'CUSTOM';

export interface DashboardDefinition {
  name: string;
  description: string;
  category: DashboardCategory;
  source_url: string;
  refresh_interval: number;
  status: 'ACTIVE' | 'INACTIVE';
  thumbnail_url: string | null;
}

export const DASHBOARD_REGISTRY: DashboardDefinition[] = [
  {
    name: 'Transparência Fiscal',
    description:
      'Painel de transparência dos gastos públicos do Estado de Mato Grosso, consolidando receitas, despesas e transferências do Portal da Transparência MT.',
    category: 'TRANSPARENCY',
    source_url: 'https://transparencia.mt.gov.br/painel/fiscal',
    refresh_interval: 120,
    status: 'ACTIVE',
    thumbnail_url: null,
  },
  {
    name: 'Execução Orçamentária',
    description:
      'Acompanhamento em tempo real da execução orçamentária estadual: receita realizada x despesa empenhada, liquidada e paga por secretaria.',
    category: 'ECONOMY',
    source_url: 'https://sefaz.mt.gov.br/bi/orcamento',
    refresh_interval: 60,
    status: 'ACTIVE',
    thumbnail_url: null,
  },
  {
    name: 'Compras Governamentais',
    description:
      'Monitoramento de licitações, contratos e dispensas de licitação. Volume de compras por modalidade, fornecedor e secretaria.',
    category: 'TRANSPARENCY',
    source_url: 'https://compras.mt.gov.br/painel',
    refresh_interval: 60,
    status: 'ACTIVE',
    thumbnail_url: null,
  },
  {
    name: 'Controle Interno',
    description:
      'Indicadores de controle interno da CGE-MT: recomendações emitidas, implementadas e pendentes por unidade gestora.',
    category: 'CUSTOM',
    source_url: 'https://cge.mt.gov.br/controle/painel',
    refresh_interval: 300,
    status: 'ACTIVE',
    thumbnail_url: null,
  },
  {
    name: 'Obras Públicas',
    description:
      'Monitoramento de obras de infraestrutura: andamento físico-financeiro, alertas de atraso e mapa de projetos em execução no Estado.',
    category: 'WORKS',
    source_url: 'https://seinfra.mt.gov.br/obras/painel',
    refresh_interval: 180,
    status: 'ACTIVE',
    thumbnail_url: null,
  },
  {
    name: 'Indicadores Sociais',
    description:
      'Painel de indicadores sociais de Mato Grosso: educação, saúde, assistência social e desenvolvimento humano por município.',
    category: 'SOCIAL',
    source_url: 'https://sedesc.mt.gov.br/indicadores',
    refresh_interval: 300,
    status: 'ACTIVE',
    thumbnail_url: null,
  },
  {
    name: 'Meio Ambiente',
    description:
      'Monitoramento ambiental: desmatamento, queimadas, qualidade do ar e recursos hídricos em Mato Grosso.',
    category: 'ENVIRONMENT',
    source_url: 'https://sema.mt.gov.br/painel/ambiental',
    refresh_interval: 180,
    status: 'ACTIVE',
    thumbnail_url: null,
  },
  {
    name: 'Gestão de Riscos',
    description:
      'Painel de gestão de riscos e achados de auditoria da CGE-MT: mapa de calor de riscos, achados críticos e planos de ação.',
    category: 'CUSTOM',
    source_url: 'https://cge.mt.gov.br/risco/dashboard',
    refresh_interval: 300,
    status: 'ACTIVE',
    thumbnail_url: null,
  },
];

export const CATEGORY_LABELS: Record<DashboardCategory, string> = {
  ECONOMY: 'Economia',
  SOCIAL: 'Social',
  ENVIRONMENT: 'Meio Ambiente',
  WORKS: 'Obras',
  TRANSPARENCY: 'Transparência',
  CUSTOM: 'Personalizado',
};

export const CATEGORY_COLORS: Record<DashboardCategory, string> = {
  ECONOMY: 'text-chart-5 bg-chart-5/10',
  SOCIAL: 'text-chart-2 bg-chart-2/10',
  ENVIRONMENT: 'text-success bg-success/10',
  WORKS: 'text-chart-3 bg-chart-3/10',
  TRANSPARENCY: 'text-primary bg-primary/10',
  CUSTOM: 'text-muted-foreground bg-muted/20',
};
