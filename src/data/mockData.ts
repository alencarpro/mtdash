// Dados baseados no Portal Unificado de Dados Públicos de Mato Grosso
// Fonte: https://dados.mt.gov.br/

export const cities = [
  { label: "Todas as Cidades", value: "all" },
  { label: "Cuiabá", value: "cuiaba" },
  { label: "Várzea Grande", value: "varzea-grande" },
  { label: "Rondonópolis", value: "rondonopolis" },
  { label: "Sinop", value: "sinop" },
  { label: "Tangará da Serra", value: "tangara" },
  { label: "Cáceres", value: "caceres" },
  { label: "Sorriso", value: "sorriso" },
  { label: "Lucas do Rio Verde", value: "lucas" },
];

export const periods = [
  { label: "Último Trimestre", value: "1q" },
  { label: "Último Semestre", value: "6m" },
  { label: "Último Ano", value: "1y" },
  { label: "Série Histórica", value: "all" },
];

// ===== VISÃO GERAL =====
export const overviewKPIs = {
  pibTotal: "R$ 273 bi",
  pibParticipacao: "2,50%",
  pibRanking: "10° do país",
  crescimentoMedio: "5,2% a.a.",
  crescimentoPeriodo: "2002 a 2023",
  pibPerCapita: "R$ 74,6 mil",
  pibPerCapitaRanking: "3° do país",
  municipios: "141",
};

export const pibEvolution = [
  { year: "2018", pib: 142.5, crescimento: 6.8 },
  { year: "2019", pib: 155.0, crescimento: 8.8 },
  { year: "2020", pib: 170.3, crescimento: 9.9 },
  { year: "2021", pib: 206.5, crescimento: 21.3 },
  { year: "2022", pib: 255.5, crescimento: 23.7 },
  { year: "2023", pib: 273.0, crescimento: 6.8 },
];

export const pibVariacaoAcumulada = {
  valor: "187,5%",
  periodo: "2002–2023",
};

export const sectorPieData = [
  { name: "Agropecuária", value: 38 },
  { name: "Serviços", value: 32 },
  { name: "Indústria", value: 18 },
  { name: "Comércio", value: 12 },
];

export const populationData = [
  { city: "Cuiabá", population: 618124, pibMunicipal: 32.4 },
  { city: "Várzea Grande", population: 287526, pibMunicipal: 8.7 },
  { city: "Rondonópolis", population: 236042, pibMunicipal: 14.2 },
  { city: "Sinop", population: 146005, pibMunicipal: 9.8 },
  { city: "Tangará", population: 103750, pibMunicipal: 4.1 },
  { city: "Cáceres", population: 94861, pibMunicipal: 2.8 },
  { city: "Sorriso", population: 92677, pibMunicipal: 12.5 },
  { city: "Lucas", population: 65849, pibMunicipal: 8.9 },
];

// ===== ECONOMIA =====
export const comercioExterior = [
  { trimestre: "1T 2024", exportacao: 8.2, importacao: 2.1, superavit: 6.1 },
  { trimestre: "2T 2024", exportacao: 9.5, importacao: 2.3, superavit: 7.2 },
  { trimestre: "3T 2024", exportacao: 10.1, importacao: 2.5, superavit: 7.6 },
  { trimestre: "4T 2024", exportacao: 11.0, importacao: 2.7, superavit: 8.3 },
  { trimestre: "1T 2025", exportacao: 9.8, importacao: 2.4, superavit: 7.4 },
  { trimestre: "2T 2025", exportacao: 10.3, importacao: 2.6, superavit: 7.7 },
  { trimestre: "3T 2025", exportacao: 10.8, importacao: 2.5, superavit: 8.3 },
  { trimestre: "4T 2025", exportacao: 11.5, importacao: 2.8, superavit: 8.7 },
];

export const principaisExportacoes = [
  { produto: "Soja e derivados", percentual: 31, valor: 3.57 },
  { produto: "Carne bovina", percentual: 22, valor: 2.53 },
  { produto: "Milho", percentual: 18, valor: 2.07 },
  { produto: "Algodão", percentual: 12, valor: 1.38 },
  { produto: "Ouro", percentual: 8, valor: 0.92 },
  { produto: "Outros", percentual: 9, valor: 1.04 },
];

export const principaisDestinos = [
  { pais: "China", percentual: 42 },
  { pais: "Rússia", percentual: 12 },
  { pais: "Canadá", percentual: 8 },
  { pais: "Emirados Árabes", percentual: 7 },
  { pais: "Índia", percentual: 6 },
  { pais: "Outros", percentual: 25 },
];

export const mercadoTrabalho = [
  { trimestre: "1T 2024", emprego: 76.2, renda: 2850 },
  { trimestre: "2T 2024", emprego: 77.5, renda: 2920 },
  { trimestre: "3T 2024", emprego: 78.1, renda: 2980 },
  { trimestre: "4T 2024", emprego: 79.3, renda: 3050 },
  { trimestre: "1T 2025", emprego: 78.8, renda: 3020 },
  { trimestre: "2T 2025", emprego: 79.5, renda: 3100 },
  { trimestre: "3T 2025", emprego: 80.1, renda: 3150 },
  { trimestre: "4T 2025", emprego: 80.8, renda: 3200 },
];

export const producaoAgricola = [
  { cultura: "Soja", producao: 43.8, area: 12.1 },
  { cultura: "Milho", producao: 46.2, area: 7.3 },
  { cultura: "Algodão", producao: 5.8, area: 1.5 },
  { cultura: "Cana", producao: 18.5, area: 0.28 },
  { cultura: "Arroz", producao: 0.35, area: 0.05 },
];

// ===== SOCIAL =====
export const educacaoData = [
  { year: "2018", ideb: 4.8, matriculas: 820000, escolas: 1450 },
  { year: "2019", ideb: 5.0, matriculas: 835000, escolas: 1460 },
  { year: "2020", ideb: 4.9, matriculas: 828000, escolas: 1455 },
  { year: "2021", ideb: 5.1, matriculas: 840000, escolas: 1465 },
  { year: "2022", ideb: 5.3, matriculas: 855000, escolas: 1470 },
  { year: "2023", ideb: 5.5, matriculas: 862000, escolas: 1478 },
];

export const saudeData = {
  leitos: 8450,
  leitosUTI: 1120,
  unidades: 2340,
  coberturaSUS: "78%",
};

export const segurancaData = [
  { year: "2019", ocorrencias: 42500, homicidios: 580 },
  { year: "2020", ocorrencias: 38200, homicidios: 540 },
  { year: "2021", ocorrencias: 40100, homicidios: 510 },
  { year: "2022", ocorrencias: 39800, homicidios: 485 },
  { year: "2023", ocorrencias: 38500, homicidios: 460 },
];

export const assistenciaSocial = {
  familiasCadUnico: 485000,
  familiasBolsaFamilia: 310000,
  descobertura: "19,4%",
  unidadesSUAS: 385,
};

export const icqvData = [
  { city: "Cuiabá", icqv: 0.82, saude: 0.79, educacao: 0.85, economia: 0.83 },
  { city: "Várzea Grande", icqv: 0.71, saude: 0.68, educacao: 0.74, economia: 0.72 },
  { city: "Rondonópolis", icqv: 0.76, saude: 0.74, educacao: 0.78, economia: 0.77 },
  { city: "Sinop", icqv: 0.80, saude: 0.78, educacao: 0.83, economia: 0.80 },
  { city: "Tangará", icqv: 0.69, saude: 0.66, educacao: 0.72, economia: 0.70 },
  { city: "Cáceres", icqv: 0.64, saude: 0.61, educacao: 0.67, economia: 0.65 },
  { city: "Sorriso", icqv: 0.79, saude: 0.77, educacao: 0.82, economia: 0.79 },
  { city: "Lucas", icqv: 0.81, saude: 0.79, educacao: 0.84, economia: 0.81 },
];

// ===== AMBIENTAL =====
export const desmatamentoData = [
  { year: "2018", area: 1490, alertas: 3200 },
  { year: "2019", area: 1685, alertas: 4100 },
  { year: "2020", area: 1750, alertas: 4500 },
  { year: "2021", area: 1420, alertas: 3800 },
  { year: "2022", area: 1280, alertas: 3400 },
  { year: "2023", area: 1150, alertas: 3100 },
];

export const biomaData = [
  { name: "Amazônia", percentual: 53.6 },
  { name: "Cerrado", percentual: 39.6 },
  { name: "Pantanal", percentual: 6.8 },
];

export const qualidadeArData = [
  { mes: "Jan", iqa: 42, classificacao: "Boa" },
  { mes: "Fev", iqa: 38, classificacao: "Boa" },
  { mes: "Mar", iqa: 45, classificacao: "Boa" },
  { mes: "Abr", iqa: 50, classificacao: "Boa" },
  { mes: "Mai", iqa: 65, classificacao: "Moderada" },
  { mes: "Jun", iqa: 78, classificacao: "Moderada" },
  { mes: "Jul", iqa: 95, classificacao: "Ruim" },
  { mes: "Ago", iqa: 120, classificacao: "Muito Ruim" },
  { mes: "Set", iqa: 145, classificacao: "Péssima" },
  { mes: "Out", iqa: 85, classificacao: "Ruim" },
  { mes: "Nov", iqa: 55, classificacao: "Moderada" },
  { mes: "Dez", iqa: 40, classificacao: "Boa" },
];

export const vegetacaoNativa = {
  areaTotal: 903366, // km²
  vegetacaoPreservada: 62, // %
  areaProtegida: 185000, // km²
};

// ===== INFRAESTRUTURA =====
export const obrasData = [
  { tipo: "Rodovias", concluidas: 45, emAndamento: 28, planejadas: 15 },
  { tipo: "Pontes", concluidas: 12, emAndamento: 8, planejadas: 5 },
  { tipo: "Mobilidade Urbana", concluidas: 18, emAndamento: 12, planejadas: 7 },
  { tipo: "Saneamento", concluidas: 22, emAndamento: 15, planejadas: 10 },
];

export const investimentoInfra = [
  { year: "2020", investimento: 1.8 },
  { year: "2021", investimento: 2.3 },
  { year: "2022", investimento: 3.1 },
  { year: "2023", investimento: 3.8 },
  { year: "2024", investimento: 4.2 },
  { year: "2025", investimento: 4.5 },
];
