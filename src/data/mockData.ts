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
  { year: "2002", pib: 19.2, crescimento: 0 },
  { year: "2003", pib: 24.0, crescimento: 25.0 },
  { year: "2004", pib: 30.0, crescimento: 25.0 },
  { year: "2005", pib: 28.7, crescimento: -4.3 },
  { year: "2006", pib: 35.2, crescimento: 22.6 },
  { year: "2007", pib: 42.7, crescimento: 21.3 },
  { year: "2008", pib: 53.4, crescimento: 25.1 },
  { year: "2009", pib: 51.9, crescimento: -2.8 },
  { year: "2010", pib: 59.6, crescimento: 14.8 },
  { year: "2011", pib: 71.4, crescimento: 19.8 },
  { year: "2012", pib: 80.8, crescimento: 13.2 },
  { year: "2013", pib: 89.1, crescimento: 10.3 },
  { year: "2014", pib: 101.2, crescimento: 13.6 },
  { year: "2015", pib: 107.4, crescimento: 6.1 },
  { year: "2016", pib: 115.4, crescimento: 7.4 },
  { year: "2017", pib: 123.8, crescimento: 7.3 },
  { year: "2018", pib: 142.5, crescimento: 15.1 },
  { year: "2019", pib: 155.0, crescimento: 8.8 },
  { year: "2020", pib: 170.3, crescimento: 9.9 },
  { year: "2021", pib: 233.4, crescimento: 37.1 },
  { year: "2022", pib: 255.5, crescimento: 9.5 },
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
  { city: "Rondonópolis", population: 236042, pibMunicipal: 14.2 },
  { city: "Sorriso", population: 92677, pibMunicipal: 12.5 },
  { city: "Sinop", population: 146005, pibMunicipal: 9.8 },
  { city: "Lucas", population: 65849, pibMunicipal: 8.9 },
  { city: "Várzea Grande", population: 287526, pibMunicipal: 8.7 },
  { city: "Tangará", population: 103750, pibMunicipal: 4.1 },
  { city: "Cáceres", population: 94861, pibMunicipal: 2.8 },
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
  { cultura: "Milho", producao: 46.2, area: 7.3 },
  { cultura: "Soja", producao: 43.8, area: 12.1 },
  { cultura: "Cana", producao: 18.5, area: 0.28 },
  { cultura: "Algodão", producao: 5.8, area: 1.5 },
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

// ===== ECONOMIA - NOVOS INDICADORES =====

// Valor Adicionado Bruto por setor (R$ bilhões) - Fonte: SEPLAG/IBGE
export const vabSetorial = [
  { year: "2019", agropecuaria: 48.2, industria: 22.1, servicos: 62.8 },
  { year: "2020", agropecuaria: 55.3, industria: 24.5, servicos: 65.1 },
  { year: "2021", agropecuaria: 68.7, industria: 28.3, servicos: 74.2 },
  { year: "2022", agropecuaria: 82.1, industria: 32.6, servicos: 85.4 },
  { year: "2023", agropecuaria: 78.5, industria: 35.2, servicos: 92.8 },
];

// Renda média por categoria (R$) - Fonte: SEPLAG 4T 2025
export const rendaPorCategoria = [
  { categoria: "Empregado", valor: 3200 },
  { categoria: "Autônomo", valor: 2850 },
  { categoria: "Empregador", valor: 8750 },
  { categoria: "Total", valor: 3480 },
];

// Consumo de Energia por classe (GWh) - Fonte: SEDEC
export const consumoEnergia = [
  { year: "2020", residencial: 2850, comercial: 1420, industrial: 3180, rural: 1950 },
  { year: "2021", residencial: 3020, comercial: 1580, industrial: 3450, rural: 2100 },
  { year: "2022", residencial: 3180, comercial: 1720, industrial: 3680, rural: 2280 },
  { year: "2023", residencial: 3350, comercial: 1850, industrial: 3920, rural: 2450 },
  { year: "2024", residencial: 3480, comercial: 1980, industrial: 4150, rural: 2580 },
];

// Produção Industrial Mensal - variação % acumulada - Fonte: SEDEC/IBGE
export const producaoIndustrial = [
  { mes: "Jan", variacao: 2.1 },
  { mes: "Fev", variacao: 3.4 },
  { mes: "Mar", variacao: 1.8 },
  { mes: "Abr", variacao: 4.2 },
  { mes: "Mai", variacao: 3.9 },
  { mes: "Jun", variacao: 5.1 },
  { mes: "Jul", variacao: 4.7 },
  { mes: "Ago", variacao: 3.5 },
  { mes: "Set", variacao: 2.8 },
  { mes: "Out", variacao: 4.1 },
  { mes: "Nov", variacao: 3.6 },
  { mes: "Dez", variacao: 4.8 },
];

// Produção de Carne (mil toneladas) - Fonte: SEDEC
export const producaoCarne = [
  { year: "2020", bovino: 1280, suino: 185, aves: 420 },
  { year: "2021", bovino: 1350, suino: 198, aves: 455 },
  { year: "2022", bovino: 1420, suino: 212, aves: 490 },
  { year: "2023", bovino: 1510, suino: 225, aves: 528 },
  { year: "2024", bovino: 1580, suino: 240, aves: 560 },
];

// Turismo - Municípios no Mapa do Turismo Brasileiro - Fonte: SEDEC
export const turismoData = {
  municipiosTuristicos: 85,
  regioesTuristicas: 12,
  visitantesAnuais: "3,2 mi",
  receitaTurismo: "R$ 4,8 bi",
};

// ===== SOCIAL - NOVOS INDICADORES =====

// Mortalidade (por 1000 habitantes) - Fonte: SES
export const mortalidadeData = [
  { year: "2019", infantil: 13.8, materna: 58.2, geral: 5.2 },
  { year: "2020", infantil: 14.2, materna: 72.5, geral: 6.8 },
  { year: "2021", infantil: 13.5, materna: 65.1, geral: 7.1 },
  { year: "2022", infantil: 12.8, materna: 52.3, geral: 5.5 },
  { year: "2023", infantil: 12.1, materna: 48.7, geral: 5.1 },
];

// Violência contra a mulher - Fonte: SESP
export const violenciaMulher = [
  { year: "2019", registros: 28500, medidas: 12400 },
  { year: "2020", registros: 31200, medidas: 14100 },
  { year: "2021", registros: 29800, medidas: 13500 },
  { year: "2022", registros: 30500, medidas: 14800 },
  { year: "2023", registros: 29100, medidas: 15200 },
];

// Déficit Habitacional - Fonte: SETASC
export const deficitHabitacional = {
  totalFamilias: 125000,
  percentualEstadual: "8,2%",
  domiciliosPrecarios: 42000,
  coabitacao: 58000,
};

// Trânsito - Fonte: DETRAN
export const transitoData = [
  { year: "2019", acidentes: 18500, vitimas: 1250, frota: 2180000 },
  { year: "2020", acidentes: 15800, vitimas: 1080, frota: 2250000 },
  { year: "2021", acidentes: 16900, vitimas: 1120, frota: 2340000 },
  { year: "2022", acidentes: 17200, vitimas: 1150, frota: 2450000 },
  { year: "2023", acidentes: 17800, vitimas: 1180, frota: 2580000 },
];

// ===== AMBIENTAL - NOVOS INDICADORES =====

// Focos de incêndio por mês - Fonte: SEMA
export const focosIncendio = [
  { mes: "Jan", focos: 180 },
  { mes: "Fev", focos: 145 },
  { mes: "Mar", focos: 120 },
  { mes: "Abr", focos: 95 },
  { mes: "Mai", focos: 250 },
  { mes: "Jun", focos: 580 },
  { mes: "Jul", focos: 1850 },
  { mes: "Ago", focos: 4200 },
  { mes: "Set", focos: 5800 },
  { mes: "Out", focos: 2100 },
  { mes: "Nov", focos: 650 },
  { mes: "Dez", focos: 220 },
];

// Áreas protegidas por tipo (km²) - Fonte: SEMA
export const areasProtegidas = [
  { tipo: "Terras Indígenas", area: 78000 },
  { tipo: "Unid. Conservação", area: 52000 },
  { tipo: "Reserva Legal", area: 35000 },
  { tipo: "APP", area: 20000 },
];

// Mineração - Fonte: SEDEC
export const mineracaoData = {
  substancias: 42,
  areasAtivas: 1850,
  producaoOuro: "18,5 ton",
  faturamento: "R$ 8,2 bi",
};

// ===== INFRAESTRUTURA =====
export const obrasData = [
  { tipo: "Rodovias", concluidas: 45, emAndamento: 28, planejadas: 15 },
  { tipo: "Pontes", concluidas: 12, emAndamento: 8, planejadas: 5 },
  { tipo: "Mobilidade Urbana", concluidas: 18, emAndamento: 12, planejadas: 7 },
  { tipo: "Saneamento", concluidas: 22, emAndamento: 15, planejadas: 10 },
];

// ===== OBRAS ESTRATÉGICAS (BRT) =====
export const obrasEstrategicas = {
  titulo: "Obras Estratégicas",
  descricao: "Implantação do corredor de transporte público integrado por meio do BRT nas cidades de Cuiabá e Várzea Grande",
  contrato: {
    numero: "Contrato 052/2022",
    inicio: "25/10/2022",
    diasAtuais: 1111,
    status: "Vigente",
  },
  terminoPrevisto: "2° semestre de 2025",
  valorTotal: "R$ 485.886.236,59",
  percentualPago: "22,35%",
  valorPago: "R$ 108.557.059,28",
  valorExecutado: "R$ 132.400.909,29",
  execucaoFisica: {
    area: "586.000.000 m²",
    status: "obra concluída",
  },
  percentualExecutado: 27.26,
  cameras: [
    { id: 1, nome: "Obra BRT – Femina", cidade: "Cuiabá", local: "Canteiro próximo ao hospital Femina (Av. CPA)", tipo: "BRT", placa: "934,000" },
    { id: 2, nome: "Obra BRT – Shopping Pantanal", cidade: "Cuiabá", local: "Av. Ulisses Canteiro em frente ao Shop. Pantanal (Av. CPA)", tipo: "Obra estratégica", placa: "934,000" },
    { id: 3, nome: "Obra BRT – Ganha Tempo", cidade: "Cuiabá", local: "Av. Historiador Rubens de Mendonça", tipo: "Obra estratégica", placa: "934,000" },
    { id: 4, nome: "Obra BRT – Av. XV Novembro", cidade: "Cuiabá", local: "Av. Historiador Rubens de Mendonça", tipo: "Obra estratégica", placa: "934,000" },
    { id: 5, nome: "Obra BRT – Porto", cidade: "Cuiabá", local: "Porto", tipo: "Obra estratégica", placa: "934,000" },
    { id: 6, nome: "Obra BRT – Morro da Luz", cidade: "Cuiabá", local: "Av. Historiador Rubens de Mendonça", tipo: "Obra estratégica", placa: "934,000" },
  ],
  objeto: {
    totalBRT: 8,
    online: 1,
    offline: 0,
    detalhes: "Contratação integrada de empresa para execução dos serviços de elaboração de projetos básicos e executivos de engenharia, desapropriação, obtenção de licenças, outorgas, aprovações e execução das obras de infraestrutura urbana para implantação do corredor BRT em Cuiabá e Várzea Grande.",
  },
};

export const investimentoInfra = [
  { year: "2020", investimento: 1.8 },
  { year: "2021", investimento: 2.3 },
  { year: "2022", investimento: 3.1 },
  { year: "2023", investimento: 3.8 },
  { year: "2024", investimento: 4.2 },
  { year: "2025", investimento: 4.5 },
];
