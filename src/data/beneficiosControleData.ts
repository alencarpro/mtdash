// Dados do Painel Benefícios de Controle — Fonte: Balanço de Gestão 2025 — CGE-MT

export const beneficiosSummary = {
  totalAcoes: 66,
  valorTotal: 940740000, // R$ 940,74 mi
  acoesComValor: 51,
  totalAdjuntas: 4,
  totalClasses: 8,
  totalDimensoes: 5,
  totalNaturezas: 3,
  unidadesAtivas: 12,
};

export const adjuntasRanking = [
  { nome: "Executiva", qtdAcoes: 5, valorTotal: 814260000, fill: "#8df3db" },
  { nome: "Auditoria", qtdAcoes: 45, valorTotal: 117680000, fill: "#38bdf8" },
  { nome: "Corregedoria", qtdAcoes: 16, valorTotal: 8800000, fill: "#a78bfa" },
  { nome: "Ouvidoria", qtdAcoes: 5, valorTotal: 0, fill: "#fbbf24" },
];

export const macrofuncaoStats = [
  { nome: "Controle Prévio", qtdAcoes: 22 },
  { nome: "Auditoria", qtdAcoes: 15 },
  { nome: "Corregedoria", qtdAcoes: 12 },
  { nome: "Ações Estratégicas", qtdAcoes: 8 },
  { nome: "Ouvidoria", qtdAcoes: 5 },
  { nome: "Transparência", qtdAcoes: 4 },
];

export const topClassesBeneficio = [
  { nome: "Recuperação de valores", qtdAcoes: 18, natureza: "Quantitativa" },
  { nome: "Economia potencial", qtdAcoes: 14, natureza: "Quantitativa" },
  { nome: "Correção de irregularidades", qtdAcoes: 12, natureza: "Qualitativa" },
  { nome: "Melhoria de processos", qtdAcoes: 9, natureza: "Qualitativa" },
  { nome: "Prevenção de danos", qtdAcoes: 8, natureza: "Quantitativa" },
  { nome: "Fortalecimento institucional", qtdAcoes: 5, natureza: "Qualitativa" },
];

export const dimensaoImpacto = [
  { nome: "Financeira", qtd: 28 },
  { nome: "Administrativa", qtd: 18 },
  { nome: "Social", qtd: 10 },
  { nome: "Institucional", qtd: 7 },
  { nome: "Normativa", qtd: 3 },
];
