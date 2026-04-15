/* ─── Dados do PTA 2026 — Orçamento do Estado de Mato Grosso ─── */

export const ptaSummary = {
  totalOrcamento: "R$ 33,91 bi",
  totalCorrente: "R$ 28,92 bi",
  totalCapital: "R$ 4,99 bi",
  totalFuncoes: 22,
  totalOrgaos: 30,
};

export const orcamentoFuncao = [
  { funcao: "Previdência Social", valor: 6378, fill: "#a78bfa" },
  { funcao: "Educação", valor: 6094, fill: "#60a5fa" },
  { funcao: "Saúde", valor: 4695, fill: "#8df3db" },
  { funcao: "Segurança Pública", valor: 4631, fill: "#f87171" },
  { funcao: "Transporte", valor: 3146, fill: "#fbbf24" },
  { funcao: "Administração", valor: 2859, fill: "#86efac" },
  { funcao: "Encargos Especiais", valor: 1995, fill: "#fb923c" },
  { funcao: "Agricultura", valor: 1128, fill: "#34d399" },
  { funcao: "Dir. Cidadania", valor: 1006, fill: "#c084fc" },
  { funcao: "Gestão Ambiental", valor: 379, fill: "#22d3ee" },
  { funcao: "Assist. Social", valor: 336, fill: "#f472b6" },
  { funcao: "Urbanismo", valor: 200, fill: "#a3e635" },
];

export const categoriaEconomica = [
  { name: "Despesa Corrente", value: 85.3, fill: "#60a5fa" },
  { name: "Despesa Capital", value: 14.7, fill: "#fbbf24" },
];

export const topSubfuncoes = [
  { subfuncao: "Administração Geral", valor: 11050, fill: "#8df3db" },
  { subfuncao: "Prev. Reg. Estatutário", valor: 5570, fill: "#a78bfa" },
  { subfuncao: "Ensino Fundamental", valor: 4510, fill: "#60a5fa" },
  { subfuncao: "Assist. Hosp. Ambul.", valor: 3190, fill: "#f87171" },
  { subfuncao: "Transp. Rodoviário", valor: 2970, fill: "#fbbf24" },
  { subfuncao: "Enc. Especiais", valor: 850, fill: "#fb923c" },
  { subfuncao: "Prev. Especial", valor: 750, fill: "#c084fc" },
  { subfuncao: "Produção Agropec.", valor: 680, fill: "#86efac" },
];

export const orcamentoOrgao = [
  { sigla: "SEPLAG", nome: "Planejamento e Gestão", valor: 6216, fill: "#a78bfa" },
  { sigla: "SEDUC", nome: "Educação", valor: 5813, fill: "#60a5fa" },
  { sigla: "SESP", nome: "Segurança Pública", valor: 4803, fill: "#f87171" },
  { sigla: "SES", nome: "Saúde", valor: 4792, fill: "#8df3db" },
  { sigla: "SINFRA", nome: "Infraestrutura", valor: 3452, fill: "#fbbf24" },
  { sigla: "EGE", nome: "Encargos Gerais", valor: 1325, fill: "#fb923c" },
  { sigla: "SEFAZ", nome: "Fazenda", valor: 1102, fill: "#86efac" },
  { sigla: "SEJUS", nome: "Justiça", valor: 964, fill: "#c084fc" },
  { sigla: "SEDEC", nome: "Desenv. Econômico", valor: 890, fill: "#34d399" },
  { sigla: "SECITECI", nome: "Ciência e Tecnologia", valor: 854, fill: "#22d3ee" },
];

export const modalidadeAplicacao = [
  { name: "Aplicações Diretas", value: 84.5, fill: "#8df3db" },
  { name: "Op. entre Órgãos", value: 8.3, fill: "#60a5fa" },
  { name: "Inst. Priv. s/ fins", value: 2.2, fill: "#a78bfa" },
  { name: "Transf. Municípios", value: 3.7, fill: "#fbbf24" },
  { name: "Outras", value: 1.3, fill: "#f87171" },
];

export const pacoteDespesa = [
  { pacote: "Pessoal Ativo", valor: 8825, fill: "#60a5fa" },
  { pacote: "Pessoal Aposentado", valor: 4402, fill: "#a78bfa" },
  { pacote: "Obrig. Patronais", valor: 3171, fill: "#8df3db" },
  { pacote: "Vias e Pontes", valor: 2550, fill: "#fbbf24" },
  { pacote: "Pessoal Temporário", valor: 1624, fill: "#f87171" },
  { pacote: "Serviços Saúde", valor: 1258, fill: "#86efac" },
  { pacote: "Transf. Municípios", valor: 1163, fill: "#fb923c" },
  { pacote: "Pessoal Pensionista", valor: 864, fill: "#c084fc" },
];

export const elementoDespesa = [
  { elemento: "Venc. Fixos Civil", valor: 7160, fill: "#60a5fa" },
  { elemento: "Aposentadorias", valor: 4400, fill: "#a78bfa" },
  { elemento: "Serv. Terc. PJ", valor: 3680, fill: "#8df3db" },
  { elemento: "Obras e Instalações", valor: 3360, fill: "#fbbf24" },
  { elemento: "Obrig. Patronais", valor: 2920, fill: "#f87171" },
  { elemento: "Contrat. Temporária", valor: 1620, fill: "#86efac" },
  { elemento: "Contribuições", valor: 1510, fill: "#fb923c" },
  { elemento: "Venc. Fixos Militar", valor: 1470, fill: "#c084fc" },
];

/* Radar — distribuição percentual por macro-área */
export const radarOrcamento = [
  { area: "Educação", pct: 18 },
  { area: "Saúde", pct: 14 },
  { area: "Segurança", pct: 14 },
  { area: "Previdência", pct: 19 },
  { area: "Transporte", pct: 9 },
  { area: "Administração", pct: 8 },
  { area: "Social", pct: 7 },
  { area: "Outros", pct: 11 },
];

/* Stacked area — composição corrente vs capital por top 6 funções */
export const composicaoFuncao = [
  { funcao: "Prev. Social", corrente: 6200, capital: 178 },
  { funcao: "Educação", corrente: 5300, capital: 794 },
  { funcao: "Saúde", corrente: 3800, capital: 895 },
  { funcao: "Segurança", corrente: 4100, capital: 531 },
  { funcao: "Transporte", corrente: 596, capital: 2550 },
  { funcao: "Administração", corrente: 2400, capital: 459 },
];

export const ticInvestimento = [
  { name: "Demais Despesas", value: 98.1, fill: "#60a5fa" },
  { name: "TIC", value: 1.9, fill: "#8df3db" },
];
