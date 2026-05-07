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
  { city: "Cuiabá", population: 618124, pibMunicipal: 32.4, fill: "#38bdf8" },
  { city: "Rondonópolis", population: 236042, pibMunicipal: 14.2, fill: "#6ee7b7" },
  { city: "Sorriso", population: 92677, pibMunicipal: 12.5, fill: "#a78bfa" },
  { city: "Sinop", population: 146005, pibMunicipal: 9.8, fill: "#fb923c" },
  { city: "Lucas", population: 65849, pibMunicipal: 8.9, fill: "#f472b6" },
  { city: "Várzea Grande", population: 287526, pibMunicipal: 8.7, fill: "#8df3db" },
  { city: "Tangará", population: 103750, pibMunicipal: 4.1, fill: "#fbbf24" },
  { city: "Cáceres", population: 94861, pibMunicipal: 2.8, fill: "#60a5fa" },
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
  { cultura: "Milho", producao: 46.2, area: 7.3, fill: "#8df3db" },
  { cultura: "Soja", producao: 43.8, area: 12.1, fill: "#6ee7b7" },
  { cultura: "Cana", producao: 18.5, area: 0.28, fill: "#38bdf8" },
  { cultura: "Algodão", producao: 5.8, area: 1.5, fill: "#a78bfa" },
  { cultura: "Arroz", producao: 0.35, area: 0.05, fill: "#fb923c" },
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

 // Mortalidade (por 1000 habitantes) - Fonte: DATASUS
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
  { year: "2020", investimento: 1.8, fill: "#38bdf8" },
  { year: "2021", investimento: 2.3, fill: "#6ee7b7" },
  { year: "2022", investimento: 3.1, fill: "#a78bfa" },
  { year: "2023", investimento: 3.8, fill: "#fb923c" },
  { year: "2024", investimento: 4.2, fill: "#8df3db" },
  { year: "2025", investimento: 4.5, fill: "#fbbf24" },
];

// ===== PAINEL 5 — CONTROLE & EFICIÊNCIA (CGE) =====

export const beneficiosFinanceiros = [
  { area: "Executiva e Ações Estratégicas", qtd: 5, valor: 814.26, percentual: 87, fill: "#8df3db" },
  { area: "Auditoria e Controle", qtd: 45, valor: 117.68, percentual: 12.5, fill: "#38bdf8" },
  { area: "Corregedoria (PARs)", qtd: 16, valor: 8.8, percentual: 0.9, fill: "#a78bfa" },
];

export const aderenciaRecomendacoes = [
  { year: "2019", aderencia: 65, implementacao: 35 },
  { year: "2020", aderencia: 75, implementacao: 50 },
  { year: "2021", aderencia: 85, implementacao: 65 },
  { year: "2022", aderencia: 90, implementacao: 75 },
  { year: "2023", aderencia: 95, implementacao: 85 },
  { year: "2024", aderencia: 95, implementacao: 85 },
  { year: "2025", aderencia: 94, implementacao: 82 },
];

export const auditoriaControle = {
  totalProdutos: 703,
  controlePrevio: 622,
  auditoria: 81,
  mixAtividades: [
    { tipo: "Previdenciários", qtd: 519 },
    { tipo: "Concurso Público", qtd: 45 },
    { tipo: "Tomada Contas", qtd: 38 },
    { tipo: "Seleção/Temp.", qtd: 20 },
  ],
  auditoriaCategoria: [
    { tipo: "Especial", qtd: 30 },
    { tipo: "Avaliação", qtd: 25 },
    { tipo: "Consultoria", qtd: 7 },
    { tipo: "Controle Interno", qtd: 4 },
  ],
};

export const ouvidoriaManifestacoes = [
  { tipo: "Solicitação", qtd: 7728, percentual: 41.09 },
  { tipo: "Reclamação", qtd: 5392, percentual: 28.67 },
  { tipo: "Denúncia", qtd: 3473, percentual: 18.47 },
  { tipo: "Informação", qtd: 1011, percentual: 5.38 },
  { tipo: "Elogio", qtd: 981, percentual: 5.22 },
  { tipo: "Sugestão", qtd: 201, percentual: 1.07 },
];

export const cgeAlerta = [
  { tipo: "Inassiduidade", inicial: 34, final: 2, variacao: -94.1 },
  { tipo: "Abandono Cargo", inicial: 26, final: 7, variacao: -73.1 },
  { tipo: "Juros/Multa Atraso", inicial: 15, final: 9, variacao: -40.0 },
  { tipo: "Licença >24m", inicial: 229, final: 193, variacao: -15.7 },
];

export const areasAuditadas = [
  { area: "Infraestrutura", qtd: 12 },
  { area: "Saúde", qtd: 12 },
  { area: "Educação", qtd: 8 },
  { area: "Gestão Pessoas", qtd: 8 },
  { area: "Economia", qtd: 4 },
  { area: "Meio Ambiente", qtd: 4 },
  { area: "Receita", qtd: 4 },
];

// ===== PAINEL 6 — INTEGRIDADE & TRANSPARÊNCIA =====

export const integridadeNumeros = {
  orgaosPlanos: 31,
  acompanhamentoCGE: 25,
  acoesMonitoradas: 491,
  capacitacoes: 23,
  certificados: 1000,
};

export const dosimetriaPenas = [
  { opiniao: "Demissão", y2023: 47.41, y2024: 34.44, y2025: 31.09 },
  { opiniao: "Absolvição", y2023: 20.0, y2024: 21.19, y2025: 23.53 },
  { opiniao: "Suspensão >30d", y2023: 2.22, y2024: 7.95, y2025: 15.13 },
  { opiniao: "Repreensão", y2023: 2.22, y2024: 7.95, y2025: 13.45 },
  { opiniao: "Prescrição", y2023: 7.41, y2024: 17.22, y2025: 4.20 },
  { opiniao: "Arquivamento", y2023: 17.78, y2024: 7.28, y2025: 4.20 },
];

export const capacitacoesCGE = [
  { area: "Integridade", eventos: 23, participacoes: 1000 },
  { area: "Auditoria e Controle", eventos: 21, participacoes: 996 },
  { area: "Corregedoria", eventos: 12, participacoes: 544 },
  { area: "Eventos Externos", eventos: 8, participacoes: 520 },
  { area: "Ouvidoria e Transp.", eventos: 5, participacoes: 235 },
];

export const tcacs = [
  { orgao: "SESP", acordos: 78, fill: "#38bdf8" },
  { orgao: "SEDUC", acordos: 56, fill: "#6ee7b7" },
  { orgao: "SEPLAG", acordos: 52, fill: "#a78bfa" },
  { orgao: "Outros", acordos: 38, fill: "#fbbf24" },
];

export const planejamentoEstrategico = [
  { indicador: "Benef. Financeiro", previsto: 250, realizado: 940.7, unidade: "R$ mi" },
  { indicador: "Planos Integridade", previsto: 25, realizado: 88, unidade: "órgãos" },
  { indicador: "Satisfação Cidadão", previsto: 52, realizado: 47.63, unidade: "%" },
  { indicador: "Transparência", previsto: 96, realizado: 95.28, unidade: "%" },
];

export const custosServicos = [
  { area: "Auditoria e Controle", percentual: 75 },
  { area: "Corregedoria e Integridade", percentual: 19 },
  { area: "Ouvidoria e Transparência", percentual: 6 },
];

 // ===== MORTALIDADE INFANTIL (Fonte: DATASUS) =====
export const mortalidadeInfantilBrasil = [
  { state: "MT", value: 12.1 },
  { state: "SP", value: 10.5 },
  { state: "RJ", value: 11.2 },
  { state: "MG", value: 10.8 },
  { state: "BA", value: 14.5 },
  { state: "RS", value: 9.8 },
  { state: "PR", value: 10.2 },
  { state: "SC", value: 9.5 },
  { state: "PE", value: 13.2 },
  { state: "CE", value: 12.8 },
  { state: "PA", value: 15.6 },
  { state: "MA", value: 16.2 },
  { state: "GO", value: 11.5 },
  { state: "AM", value: 14.8 },
  { state: "ES", value: 10.1 },
  { state: "PB", value: 13.5 },
  { state: "RN", value: 12.2 },
  { state: "AL", value: 15.1 },
  { state: "PI", value: 14.2 },
  { state: "MT", value: 12.1 },
  { state: "MS", value: 11.8 },
  { state: "DF", value: 9.2 },
  { state: "SE", value: 14.8 },
  { state: "RO", value: 13.9 },
  { state: "TO", value: 13.1 },
  { state: "AC", value: 15.5 },
  { state: "AP", value: 16.8 },
  { state: "RR", value: 17.2 },
];

export const mortalidadeInfantilMT = [
  { city: "Acorizal", value: 15 },
  { city: "Alta Floresta", value: 12.5 },
  { city: "Alto Araguaia", value: 11.4 },
  { city: "Alto Boa Vista", value: 14.6 },
  { city: "Alto Garças", value: 11.3 },
  { city: "Alto Paraguai", value: 9.4 },
  { city: "Alto Taquari", value: 10.1 },
  { city: "Apiacás", value: 11.8 },
  { city: "Araguaiana", value: 9.8 },
  { city: "Araguainha", value: 15.8 },
  { city: "Araputanga", value: 12.4 },
  { city: "Arenápolis", value: 12.5 },
  { city: "Aripuanã", value: 9.9 },
  { city: "Barra do Bugres", value: 9.6 },
  { city: "Barra do Garças", value: 15.5 },
  { city: "Barão de Melgaço", value: 13.8 },
  { city: "Bom Jesus do Araguaia", value: 14.1 },
  { city: "Brasnorte", value: 12.7 },
  { city: "Campinápolis", value: 13 },
  { city: "Campo Novo do Parecis", value: 12 },
  { city: "Campo Verde", value: 9.3 },
  { city: "Campos de Júlio", value: 14.2 },
  { city: "Canabrava do Norte", value: 15.5 },
  { city: "Canarana", value: 9.8 },
  { city: "Carlinda", value: 9.9 },
  { city: "Castanheira", value: 10.2 },
  { city: "Chapada dos Guimarães", value: 9.5 },
  { city: "Cláudia", value: 10.2 },
  { city: "Cocalinho", value: 9.2 },
  { city: "Colniza", value: 12.3 },
  { city: "Colíder", value: 10.8 },
  { city: "Comodoro", value: 15.7 },
  { city: "Confresa", value: 15.5 },
  { city: "Conquista D'Oeste", value: 14.6 },
  { city: "Cotriguaçu", value: 14.2 },
  { city: "Cuiabá", value: 10.5 },
  { city: "Curvelândia", value: 10.8 },
  { city: "Cáceres", value: 14.2 },
  { city: "Denise", value: 14.5 },
  { city: "Diamantino", value: 15.8 },
  { city: "Dom Aquino", value: 9.8 },
  { city: "Feliz Natal", value: 15.1 },
  { city: "Figueirópolis D'Oeste", value: 10 },
  { city: "Gaúcha do Norte", value: 16 },
  { city: "General Carneiro", value: 11.2 },
  { city: "Glória D'Oeste", value: 14 },
  { city: "Guarantã do Norte", value: 11.5 },
  { city: "Guiratinga", value: 10.4 },
  { city: "Indiavaí", value: 13.5 },
  { city: "Ipiranga do Norte", value: 10.2 },
  { city: "Itanhangá", value: 9.8 },
  { city: "Itaúba", value: 10.4 },
  { city: "Itiquira", value: 12.5 },
  { city: "Jaciara", value: 13.3 },
  { city: "Jangada", value: 12.8 },
  { city: "Jauru", value: 13.1 },
  { city: "Juara", value: 15.1 },
  { city: "Juruena", value: 12 },
  { city: "Juscimeira", value: 11.9 },
  { city: "Juína", value: 14.5 },
  { city: "Lambari D'Oeste", value: 9.6 },
  { city: "Lucas do Rio Verde", value: 15.5 },
  { city: "Luciara", value: 14.8 },
  { city: "Marcelândia", value: 10.9 },
  { city: "Matupá", value: 10.2 },
  { city: "Mirassol d'Oeste", value: 14.9 },
  { city: "Nobres", value: 15.4 },
  { city: "Nortelândia", value: 10.5 },
  { city: "Nossa Senhora do Livramento", value: 9.7 },
  { city: "Nova Bandeirantes", value: 15.6 },
  { city: "Nova Brasilândia", value: 9.5 },
  { city: "Nova Canaã do Norte", value: 11.8 },
  { city: "Nova Guarita", value: 11.6 },
  { city: "Nova Lacerda", value: 12.6 },
  { city: "Nova Marilândia", value: 10.4 },
  { city: "Nova Maringá", value: 10.8 },
  { city: "Nova Monte Verde", value: 14 },
  { city: "Nova Mutum", value: 12.2 },
  { city: "Nova Nazaré", value: 13.7 },
  { city: "Nova Olímpia", value: 15.1 },
  { city: "Nova Santa Helena", value: 10.1 },
  { city: "Nova Ubiratã", value: 10.8 },
  { city: "Nova Xavantina", value: 9.8 },
  { city: "Novo Horizonte do Norte", value: 9.1 },
  { city: "Novo Mundo", value: 10.3 },
  { city: "Novo Santo Antônio", value: 12.9 },
  { city: "Novo São Joaquim", value: 11.4 },
  { city: "Paranatinga", value: 10.4 },
  { city: "Paranaíta", value: 15.9 },
  { city: "Pedra Preta", value: 12.1 },
  { city: "Peixoto de Azevedo", value: 15.3 },
  { city: "Planalto da Serra", value: 14.6 },
  { city: "Poconé", value: 11.2 },
  { city: "Pontal do Araguaia", value: 12.2 },
  { city: "Ponte Branca", value: 13.9 },
  { city: "Pontes e Lacerda", value: 10.7 },
  { city: "Porto Alegre do Norte", value: 12.4 },
  { city: "Porto Esperidião", value: 11.2 },
  { city: "Porto Estrela", value: 12.2 },
  { city: "Porto dos Gaúchos", value: 15.3 },
  { city: "Poxoréo", value: 15.9 },
  { city: "Primavera do Leste", value: 15.5 },
  { city: "Querência", value: 10.4 },
  { city: "Reserva do Cabaçal", value: 14.1 },
  { city: "Ribeirão Cascalheira", value: 16 },
  { city: "Ribeirãozinho", value: 12.5 },
  { city: "Rio Branco", value: 9 },
  { city: "Rondolândia", value: 12.3 },
  { city: "Rondonópolis", value: 15.4 },
  { city: "Rosário Oeste", value: 11.7 },
  { city: "Salto do Céu", value: 16 },
  { city: "Santa Carmem", value: 15.9 },
  { city: "Santa Cruz do Xingu", value: 10.8 },
  { city: "Santa Rita do Trivelato", value: 13.7 },
  { city: "Santa Terezinha", value: 9.4 },
  { city: "Santo Afonso", value: 10.1 },
  { city: "Santo Antônio do Leste", value: 13.1 },
  { city: "Santo Antônio do Leverger", value: 15.5 },
  { city: "Sapezal", value: 14.9 },
  { city: "Serra Nova Dourada", value: 14 },
  { city: "Sinop", value: 9.3 },
  { city: "Sorriso", value: 15.3 },
  { city: "São Félix do Araguaia", value: 13.5 },
  { city: "São José do Povo", value: 10.6 },
  { city: "São José do Rio Claro", value: 12.6 },
  { city: "São José do Xingu", value: 9.8 },
  { city: "São José dos Quatro Marcos", value: 14.6 },
  { city: "São Pedro da Cipa", value: 10.3 },
  { city: "Tabaporã", value: 11.1 },
  { city: "Tangará da Serra", value: 15.3 },
  { city: "Tapurah", value: 15.9 },
  { city: "Terra Nova do Norte", value: 13.2 },
  { city: "Tesouro", value: 9 },
  { city: "Torixoréu", value: 13.4 },
  { city: "União do Sul", value: 13.2 },
  { city: "Vale de São Domingos", value: 15.3 },
  { city: "Vera", value: 14.4 },
  { city: "Vila Bela da Santíssima Trindade", value: 15.8 },
  { city: "Vila Rica", value: 10.6 },
  { city: "Várzea Grande", value: 11.8 },
  { city: "Água Boa", value: 11.9 },
];

// ===== ALFABETIZAÇÃO =====
export const alfabetizacaoBrasil = [
  { state: "MT", value: 94.5 },
  { state: "SP", value: 97.2 },
  { state: "RJ", value: 96.8 },
  { state: "MG", value: 96.5 },
  { state: "BA", value: 89.5 },
  { state: "RS", value: 97.5 },
  { state: "PR", value: 97.1 },
  { state: "SC", value: 97.8 },
  { state: "PE", value: 88.2 },
  { state: "CE", value: 87.8 },
  { state: "PA", value: 90.6 },
  { state: "MA", value: 85.2 },
  { state: "GO", value: 95.5 },
  { state: "AM", value: 91.8 },
  { state: "ES", value: 96.1 },
  { state: "PB", value: 86.5 },
  { state: "RN", value: 88.2 },
  { state: "AL", value: 84.1 },
  { state: "PI", value: 85.2 },
  { state: "MS", value: 95.1 },
  { state: "DF", value: 97.8 },
  { state: "SE", value: 86.8 },
  { state: "RO", value: 93.9 },
  { state: "TO", value: 92.1 },
  { state: "AC", value: 88.5 },
  { state: "AP", value: 92.8 },
  { state: "RR", value: 91.2 },
];

export const alfabetizacaoMT = [
  { city: "Acorizal", value: 95 },
  { city: "Alta Floresta", value: 94 },
  { city: "Alto Araguaia", value: 97.9 },
  { city: "Alto Boa Vista", value: 96.9 },
  { city: "Alto Garças", value: 97.1 },
  { city: "Alto Paraguai", value: 97.3 },
  { city: "Alto Taquari", value: 95.8 },
  { city: "Apiacás", value: 97.9 },
  { city: "Araguaiana", value: 89.4 },
  { city: "Araguainha", value: 92.1 },
  { city: "Araputanga", value: 90.5 },
  { city: "Arenápolis", value: 92.4 },
  { city: "Aripuanã", value: 94.8 },
  { city: "Barra do Bugres", value: 93.8 },
  { city: "Barra do Garças", value: 91.1 },
  { city: "Barão de Melgaço", value: 97.7 },
  { city: "Bom Jesus do Araguaia", value: 96.4 },
  { city: "Brasnorte", value: 97.6 },
  { city: "Campinápolis", value: 88.7 },
  { city: "Campo Novo do Parecis", value: 95.7 },
  { city: "Campo Verde", value: 88.4 },
  { city: "Campos de Júlio", value: 90.4 },
  { city: "Canabrava do Norte", value: 96.8 },
  { city: "Canarana", value: 93.5 },
  { city: "Carlinda", value: 95.1 },
  { city: "Castanheira", value: 96.4 },
  { city: "Chapada dos Guimarães", value: 96 },
  { city: "Cláudia", value: 93.2 },
  { city: "Cocalinho", value: 89.2 },
  { city: "Colniza", value: 94.4 },
  { city: "Colíder", value: 88.9 },
  { city: "Comodoro", value: 88.1 },
  { city: "Confresa", value: 93.8 },
  { city: "Conquista D'Oeste", value: 88.6 },
  { city: "Cotriguaçu", value: 96.7 },
  { city: "Cuiabá", value: 92.5 },
  { city: "Curvelândia", value: 96 },
  { city: "Cáceres", value: 88.4 },
  { city: "Denise", value: 97.4 },
  { city: "Diamantino", value: 97.3 },
  { city: "Dom Aquino", value: 94 },
  { city: "Feliz Natal", value: 94.7 },
  { city: "Figueirópolis D'Oeste", value: 89.1 },
  { city: "Gaúcha do Norte", value: 92.1 },
  { city: "General Carneiro", value: 91 },
  { city: "Glória D'Oeste", value: 88.3 },
  { city: "Guarantã do Norte", value: 92.4 },
  { city: "Guiratinga", value: 90.9 },
  { city: "Indiavaí", value: 89.4 },
  { city: "Ipiranga do Norte", value: 97.8 },
  { city: "Itanhangá", value: 96.5 },
  { city: "Itaúba", value: 94 },
  { city: "Itiquira", value: 93.6 },
  { city: "Jaciara", value: 96.5 },
  { city: "Jangada", value: 90.4 },
  { city: "Jauru", value: 97.1 },
  { city: "Juara", value: 91.1 },
  { city: "Juruena", value: 91.3 },
  { city: "Juscimeira", value: 94.1 },
  { city: "Juína", value: 88.4 },
  { city: "Lambari D'Oeste", value: 96.6 },
  { city: "Lucas do Rio Verde", value: 90.9 },
  { city: "Luciara", value: 95.7 },
  { city: "Marcelândia", value: 95.5 },
  { city: "Matupá", value: 93.2 },
  { city: "Mirassol d'Oeste", value: 90.3 },
  { city: "Nobres", value: 89.9 },
  { city: "Nortelândia", value: 89 },
  { city: "Nossa Senhora do Livramento", value: 88 },
  { city: "Nova Bandeirantes", value: 93.2 },
  { city: "Nova Brasilândia", value: 96.5 },
  { city: "Nova Canaã do Norte", value: 90.5 },
  { city: "Nova Guarita", value: 94.5 },
  { city: "Nova Lacerda", value: 95.2 },
  { city: "Nova Marilândia", value: 88.1 },
  { city: "Nova Maringá", value: 97.6 },
  { city: "Nova Monte Verde", value: 88.6 },
  { city: "Nova Mutum", value: 93.1 },
  { city: "Nova Nazaré", value: 95.2 },
  { city: "Nova Olímpia", value: 90.8 },
  { city: "Nova Santa Helena", value: 90.6 },
  { city: "Nova Ubiratã", value: 93.6 },
  { city: "Nova Xavantina", value: 96.9 },
  { city: "Novo Horizonte do Norte", value: 93.9 },
  { city: "Novo Mundo", value: 96.2 },
  { city: "Novo Santo Antônio", value: 95.8 },
  { city: "Novo São Joaquim", value: 97.3 },
  { city: "Paranatinga", value: 95.3 },
  { city: "Paranaíta", value: 95.1 },
  { city: "Pedra Preta", value: 97 },
  { city: "Peixoto de Azevedo", value: 95.7 },
  { city: "Planalto da Serra", value: 95.2 },
  { city: "Poconé", value: 96.7 },
  { city: "Pontal do Araguaia", value: 92.2 },
  { city: "Ponte Branca", value: 90.7 },
  { city: "Pontes e Lacerda", value: 97.5 },
  { city: "Porto Alegre do Norte", value: 90 },
  { city: "Porto Esperidião", value: 97.4 },
  { city: "Porto Estrela", value: 92.3 },
  { city: "Porto dos Gaúchos", value: 88.6 },
  { city: "Poxoréo", value: 89.4 },
  { city: "Primavera do Leste", value: 94.5 },
  { city: "Querência", value: 94 },
  { city: "Reserva do Cabaçal", value: 92.4 },
  { city: "Ribeirão Cascalheira", value: 89.1 },
  { city: "Ribeirãozinho", value: 93.7 },
  { city: "Rio Branco", value: 90.9 },
  { city: "Rondolândia", value: 94.7 },
  { city: "Rondonópolis", value: 89.6 },
  { city: "Rosário Oeste", value: 96.5 },
  { city: "Salto do Céu", value: 92.9 },
  { city: "Santa Carmem", value: 93.6 },
  { city: "Santa Cruz do Xingu", value: 95.5 },
  { city: "Santa Rita do Trivelato", value: 97.4 },
  { city: "Santa Terezinha", value: 95.4 },
  { city: "Santo Afonso", value: 97.7 },
  { city: "Santo Antônio do Leste", value: 97.1 },
  { city: "Santo Antônio do Leverger", value: 91.2 },
  { city: "Sapezal", value: 93.3 },
  { city: "Serra Nova Dourada", value: 91.5 },
  { city: "Sinop", value: 92.1 },
  { city: "Sorriso", value: 92.7 },
  { city: "São Félix do Araguaia", value: 94.2 },
  { city: "São José do Povo", value: 88.9 },
  { city: "São José do Rio Claro", value: 89.7 },
  { city: "São José do Xingu", value: 94.1 },
  { city: "São José dos Quatro Marcos", value: 97.7 },
  { city: "São Pedro da Cipa", value: 95.4 },
  { city: "Tabaporã", value: 91.1 },
  { city: "Tangará da Serra", value: 97.6 },
  { city: "Tapurah", value: 92.7 },
  { city: "Terra Nova do Norte", value: 94.4 },
  { city: "Tesouro", value: 94.3 },
  { city: "Torixoréu", value: 96 },
  { city: "União do Sul", value: 91.5 },
  { city: "Vale de São Domingos", value: 93.2 },
  { city: "Vera", value: 97.9 },
  { city: "Vila Bela da Santíssima Trindade", value: 97.7 },
  { city: "Vila Rica", value: 97.6 },
  { city: "Várzea Grande", value: 88.5 },
  { city: "Água Boa", value: 89.4 },
];

// ===== LEITOS POR HABITANTE (Fonte: CNES/DATASUS) — leitos por 1.000 habitantes =====
// Valores aproximados; serão substituídos por dados da API quando disponíveis.
export const leitosPorHabitanteBrasil = [
  { state: "AC", value: 1.6, leitos: 1450, populacao: 906876 },
  { state: "AL", value: 1.9, leitos: 6320, populacao: 3365351 },
  { state: "AP", value: 1.4, leitos: 1120, populacao: 802837 },
  { state: "AM", value: 1.7, leitos: 6850, populacao: 4144597 },
  { state: "BA", value: 2.0, leitos: 29800, populacao: 14930634 },
  { state: "CE", value: 1.9, leitos: 17200, populacao: 9187103 },
  { state: "DF", value: 2.4, leitos: 6650, populacao: 2982818 },
  { state: "ES", value: 2.1, leitos: 8400, populacao: 3975100 },
  { state: "GO", value: 2.3, leitos: 16100, populacao: 7056495 },
  { state: "MA", value: 1.8, leitos: 12450, populacao: 6800605 },
  { state: "MT", value: 2.2, leitos: 7700, populacao: 3526220 },
  { state: "MS", value: 2.5, leitos: 7050, populacao: 2839188 },
  { state: "MG", value: 2.4, leitos: 50400, populacao: 20539989 },
  { state: "PA", value: 1.6, leitos: 13100, populacao: 8121025 },
  { state: "PB", value: 2.1, leitos: 8400, populacao: 3974687 },
  { state: "PR", value: 2.6, leitos: 30000, populacao: 11444380 },
  { state: "PE", value: 2.2, leitos: 20800, populacao: 9058931 },
  { state: "PI", value: 1.9, leitos: 5950, populacao: 3270174 },
  { state: "RJ", value: 2.7, leitos: 44600, populacao: 16055174 },
  { state: "RN", value: 2.0, leitos: 6720, populacao: 3302406 },
  { state: "RS", value: 2.6, leitos: 28800, populacao: 10882965 },
  { state: "RO", value: 1.8, leitos: 2820, populacao: 1581196 },
  { state: "RR", value: 1.5, leitos: 950, populacao: 636707 },
  { state: "SC", value: 2.5, leitos: 19500, populacao: 7610361 },
  { state: "SP", value: 2.8, leitos: 126500, populacao: 44411238 },
  { state: "SE", value: 2.0, leitos: 4600, populacao: 2210004 },
  { state: "TO", value: 1.7, leitos: 2680, populacao: 1577342 },
];
