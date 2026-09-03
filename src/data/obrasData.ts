// Dados das Obras Estratégicas — Fonte: SINFRA-MT

export type ObraContrato = {
  obra: string;
  contrato: string;
  objeto: string;
  situacao: string;
  dataInicio: string;
  dataFim: string;
  diasAtuais: string;
  valorTotal: string;
  valorExecutado: string;
  valorPago: string;
  percentualExecutado: string;
  percentualPago: string;
  execucaoConcluida: string;
};

export type ObraCamera = {
  nome: string;
  link: string;
  cidade: string;
  nuPlaca: string;
  tpObra: string;
  obra: string;
};

export type ObraPainel = {
  obraId: number;
  contrato: ObraContrato;
  cameras: ObraCamera[];
};

export const obrasEstrategicasList: ObraPainel[] = [
  {
    obraId: 1,
    contrato: {
      obra: "Implantação do corredor de transporte público integrado por meio do BRT nas cidades de Cuiabá e Várzea Grande",
      contrato: "052/2022",
      objeto: "Contratação integrada de empresa para execução dos serviços de elaboração de projetos básicos e executivos de engenharia, projetos de desapropriação, obtenção de licenças, outorgas, aprovações e execução das obras de infraestrutura urbana para implantação do corredor BRT em Cuiabá e Várzea Grande.",
      situacao: "Vigente",
      dataInicio: "25/10/2022",
      dataFim: "2º semestre de 2025",
      diasAtuais: "1111",
      valorTotal: "R$ 485.686.236,59",
      valorExecutado: "R$ 132.400.909,26",
      valorPago: "R$ 108.557.059,28",
      percentualExecutado: "27,26%",
      percentualPago: "22,35%",
      execucaoConcluida: "586.000 m²",
    },
    cameras: [
      { nome: "Canteiro próximo ao hospital Femina (AV. CPA)", link: "https://obrasaovivo.sinfra.mt.gov.br/brt_femina.html", cidade: "Cuiabá", nuPlaca: "934", tpObra: "Obra BRT - Femina", obra: "BRT" },
      { nome: "Av. Ulisses Canteiro em frente ao Shop. Pantanal (Av. CPA)", link: "https://obrasaovivo.sinfra.mt.gov.br/brt_shoppingpantanal.html", cidade: "Cuiabá", nuPlaca: "934", tpObra: "Obra BRT - Shopping Pantanal", obra: "" },
      { nome: "Av. Historiador Rubens de Mendonça", link: "https://obrasaovivo.sinfra.mt.gov.br/brt_ganhatempo.html", cidade: "Cuiabá", nuPlaca: "934", tpObra: "Obra BRT - Ganha Tempo", obra: "" },
      { nome: "Av. Historiador Rubens de Mendonça", link: "https://obrasaovivo.sinfra.mt.gov.br/brt_xvnovembro.html", cidade: "Cuiabá", nuPlaca: "934", tpObra: "Obra BRT - Av. XV Novembro", obra: "" },
      { nome: "Porto", link: "https://obrasaovivo.sinfra.mt.gov.br/brt_porto.html", cidade: "Cuiabá", nuPlaca: "934", tpObra: "Obra BRT - Porto", obra: "" },
      { nome: "Av. Historiador Rubens de Mendonça", link: "https://obrasaovivo.sinfra.mt.gov.br/brt_morrodaluz.html", cidade: "Cuiabá", nuPlaca: "934", tpObra: "Obra BRT - Morro da Luz", obra: "" },
    ],
  },
  {
    obraId: 2,
    contrato: {
      obra: "Complexo viário do Jardim Leblon",
      contrato: "012/2024",
      objeto: "O objeto do presente instrumento consiste na execução de obra de implantação do Complexo Viário na Avenida Miguel Sutil (Jardim Leblon) com a Rua Boa Vista para acesso à Avenida Arquimedes Pereira Lima, acesso e retorno da marginal à Avenida Miguel Sutil na região da Avenida do CPA.",
      situacao: "Vigente",
      dataInicio: "15/04/2024",
      dataFim: "2º semestre de 2026",
      diasAtuais: "1111",
      valorTotal: "R$ 105.002.197,97",
      valorExecutado: "R$ 53.490.082,31",
      valorPago: "R$ 43.960.131,15",
      percentualExecutado: "50,94%",
      percentualPago: "41,87%",
      execucaoConcluida: "5.490 m²",
    },
    cameras: [
      { nome: "Esquina do Posto BR (R. Boa Vista)", link: "https://obrasaovivo.sinfra.mt.gov.br/obraleblon_postobr.html", cidade: "Cuiabá", nuPlaca: "0", tpObra: "Obra LEBLON - Posto BR", obra: "" },
      { nome: "Miguel Sutil", link: "https://obrasaovivo.sinfra.mt.gov.br/obraleblon_todimo.html", cidade: "Cuiabá/Chapada dos Guimarães", nuPlaca: "1080", tpObra: "Obra LEBLON - Todimo", obra: "" },
    ],
  },
  {
    obraId: 3,
    contrato: {
      obra: "Hospital Universitário Júlio Muller",
      contrato: "051/2020/SINFRA",
      objeto: "Contratação Integrada de Empresa para Elaboração de projeto executivo, elaboração de as built, obtenção de licenças, outorgas, aprovações e execução das obras do hospital universitário Júlio Muller em Cuiabá/MT.",
      situacao: "Vigente",
      dataInicio: "20/01/2021",
      dataFim: "2º semestre de 2026",
      diasAtuais: "1111",
      valorTotal: "R$ 247.148.259,14",
      valorExecutado: "R$ 270.724.721,81",
      valorPago: "R$ 258.985.210,41",
      percentualExecutado: "100,00%",
      percentualPago: "95,67%",
      execucaoConcluida: "58.000 m²",
    },
    cameras: [
      { nome: "Coxipó da Ponte, Cuiabá - MT, Brazil", link: "https://obrasaovivo.sinfra.mt.gov.br/hospital.html", cidade: "Cuiabá", nuPlaca: "454", tpObra: "Hospital Universitário - Cam Fundo", obra: "" },
      { nome: "Coxipó da Ponte, Cuiabá - MT, Brazil", link: "https://obrasaovivo.sinfra.mt.gov.br/hospital2.html", cidade: "Cuiabá", nuPlaca: "454", tpObra: "Hospital Universitário - Cam Frente", obra: "" },
    ],
  },
  {
    obraId: 4,
    contrato: {
      obra: "Construção de uma ponte no Rio Juruena",
      contrato: "002/2023/SINFRA",
      objeto: "Contratação de empresa de engenharia para execução dos serviços de construção de uma ponte de concreto sobre o Rio Juruena, na rodovia MT-208, com 1.360,00 metros de extensão e 10,40 m de largura, bem como a implantação e pavimentação dos acessos à referida ponte.",
      situacao: "Vigente",
      dataInicio: "13/04/2023",
      dataFim: "2º semestre de 2026",
      diasAtuais: "1111",
      valorTotal: "R$ 309.065.364,91",
      valorExecutado: "R$ 183.666.402,03",
      valorPago: "R$ 182.476.967,61",
      percentualExecutado: "59,43%",
      percentualPago: "59,04%",
      execucaoConcluida: "1.410 m²",
    },
    cameras: [
      { nome: "MT-208 (Cotriguaçu x Vila Japuranã)", link: "https://obrasaovivo.sinfra.mt.gov.br/rio_juruena1.html", cidade: "Cotriguaçu", nuPlaca: "976", tpObra: "Ponte Rio Juruena - CAM 01", obra: "" },
      { nome: "MT-208 (Cotriguaçu x Vila Japuranã)", link: "https://obrasaovivo.sinfra.mt.gov.br/rio_juruena2.html", cidade: "Nova Bandeirantes", nuPlaca: "976", tpObra: "Ponte Rio Juruena - CAM 02", obra: "" },
    ],
  },
];

// Dados pré-computados para gráficos
export const obrasExecucaoChart = obrasEstrategicasList.map((o) => {
  const pct = parseFloat(o.contrato.percentualExecutado.replace("%", "").replace(",", "."));
  const shortName =
    o.obraId === 1 ? "BRT Cuiabá" :
    o.obraId === 2 ? "Cplx. Leblon" :
    o.obraId === 3 ? "Hosp. J. Muller" :
    "Ponte Juruena";
  return { nome: shortName, executado: pct, pago: parseFloat(o.contrato.percentualPago.replace("%", "").replace(",", ".")) };
});

export const obrasValorChart = obrasEstrategicasList.map((o) => {
  const parseValor = (v: string) => {
    const n = v.replace("R$", "").replace(/\./g, "").replace(",", ".").trim();
    return parseFloat(n) / 1e6; // em milhões
  };
  const shortName =
    o.obraId === 1 ? "BRT Cuiabá" :
    o.obraId === 2 ? "Cplx. Leblon" :
    o.obraId === 3 ? "Hosp. J. Muller" :
    "Ponte Juruena";
  return {
    nome: shortName,
    total: Math.round(parseValor(o.contrato.valorTotal)),
    executado: Math.round(parseValor(o.contrato.valorExecutado)),
    pago: Math.round(parseValor(o.contrato.valorPago)),
  };
});

export const obrasSummary = {
  totalObras: obrasEstrategicasList.length,
  totalCameras: obrasEstrategicasList.reduce((s, o) => s + o.cameras.length, 0),
  investimentoTotal: "R$ 1,15 bi",
  obraConcluida: 1,
};