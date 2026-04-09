import { useParams } from "react-router-dom";
import { BarChart3, TrendingUp, Users, Leaf, MapPin, Calendar } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer,
  PieChart, Pie, Cell, AreaChart, Area, LineChart, Line, LabelList,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Legend,
} from "recharts";
import {
  comercioExterior, principaisDestinos, mercadoTrabalho, producaoAgricola,
  educacaoData, saudeData, segurancaData, assistenciaSocial, icqvData,
  desmatamentoData, biomaData, qualidadeArData, vegetacaoNativa, obrasData, investimentoInfra,
  overviewKPIs, pibEvolution, sectorPieData, populationData,
} from "@/data/mockData";
import tituloImg from "@/assets/titulo.png";
import p1Img from "@/assets/p1.png";
import p2Img from "@/assets/p2.png";
import p3Img from "@/assets/p3.png";
import p4Img from "@/assets/p4.png";

/* ─── Paleta ─── */
const C = {
  teal: "#8df3db",
  blue: "#60a5fa",
  purple: "#a78bfa",
  yellow: "#fbbf24",
  red: "#f87171",
  green: "#86efac",
  grid: "rgba(148, 163, 184, 0.18)",
  axis: "rgba(226, 232, 240, 0.72)",
  label: "#f8fafc",
};
const COLORS = [C.teal, C.blue, C.purple, C.yellow, C.red, C.green];
const BIOMA_COLORS = [C.green, C.yellow, C.blue];

const tabs = [
  { label: "Economia", icon: TrendingUp },
  { label: "Social", icon: Users },
  { label: "Ambiental", icon: Leaf },
];

/* ─── Custom pie label ─── */
const renderPieLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, name, value, percent }: any) => {
  const RADIAN = Math.PI / 180;
  const radius = outerRadius + 14;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  if ((percent || value / 100) < 0.05) return null;
  return (
    <text x={x} y={y} fill={C.label} textAnchor={x > cx ? "start" : "end"} dominantBaseline="central" fontSize={8} fontWeight={600}>
      {name} {typeof percent === 'number' ? `${(percent * 100).toFixed(0)}%` : `${value}%`}
    </text>
  );
};

/* ─── Custom legend ─── */
const renderLegend = (props: any) => {
  const { payload } = props;
  return (
    <div className="flex items-center justify-center gap-3 mt-0.5">
      {payload?.map((entry: any, index: number) => (
        <span key={index} className="flex items-center gap-1 text-[8px]" style={{ color: 'rgba(226,232,240,0.72)' }}>
          <span className="inline-block w-2 h-2 rounded-sm" style={{ backgroundColor: entry.color }} />
          {entry.value}
        </span>
      ))}
    </div>
  );
};

/* ─── Compact KPI ─── */
const KPI = ({ title, value, sub, color = C.teal }: { title: string; value: string; sub: string; color?: string }) => (
  <div className="rounded-lg px-3 py-2 flex flex-col justify-center relative overflow-hidden" style={{ background: 'rgba(10,17,30,0.78)', border: '1px solid rgba(148,163,184,0.18)' }}>
    <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-lg" style={{ backgroundColor: color }} />
    <p className="text-[9px] uppercase tracking-wider font-medium truncate" style={{ color: 'rgba(226,232,240,0.72)' }}>{title}</p>
    <p className="text-base font-extrabold leading-tight mt-0.5" style={{ color: '#f8fafc' }}>{value}</p>
    <p className="text-[9px] truncate mt-0.5" style={{ color: 'rgba(226,232,240,0.72)' }}>{sub}</p>
  </div>
);

/* ─── Chart wrapper ─── */
const Chart = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="rounded-lg p-2 flex flex-col min-h-0 flex-1" style={{ background: 'rgba(10,17,30,0.78)', border: '1px solid rgba(148,163,184,0.18)' }}>
    <p className="text-[9px] uppercase tracking-wider font-semibold mb-1 truncate" style={{ color: 'rgba(226,232,240,0.72)' }}>{title}</p>
    <div className="flex-1 min-h-0">{children}</div>
  </div>
);

/* ─── Pre-computed data ─── */
const radarAvg = [
  { subject: "Saúde", value: Math.round(icqvData.reduce((a, b) => a + b.saude, 0) / icqvData.length * 100) },
  { subject: "Educação", value: Math.round(icqvData.reduce((a, b) => a + b.educacao, 0) / icqvData.length * 100) },
  { subject: "Economia", value: Math.round(icqvData.reduce((a, b) => a + b.economia, 0) / icqvData.length * 100) },
  { subject: "ICQV", value: Math.round(icqvData.reduce((a, b) => a + b.icqv, 0) / icqvData.length * 100) },
];
const lastTrade = comercioExterior[comercioExterior.length - 1];
const lastWork = mercadoTrabalho[mercadoTrabalho.length - 1];
const lastEdu = educacaoData[educacaoData.length - 1];
const lastDesm = desmatamentoData[desmatamentoData.length - 1];

/* ─── PANELS ─── */

const Panel2 = () => (
  <div className="flex flex-col gap-2 h-full">
    <div className="grid grid-cols-4 gap-2">
      <KPI title="Superávit" value={`US$ ${lastTrade.superavit} bi`} sub="4T 2025" color={C.teal} />
      <KPI title="Export. Principal" value="Soja 31%" sub="do total" color={C.green} />
      <KPI title="Emprego" value={`${lastWork.emprego}%`} sub={`Renda R$ ${lastWork.renda}`} color={C.blue} />
      <KPI title="Cresc. PIB" value="+12,9%" sub="2022 → 2023" color={C.yellow} />
    </div>
    <div className="grid grid-cols-2 gap-2 flex-1 min-h-0">
      <Chart title="Comércio Exterior (US$ bi)">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={comercioExterior} margin={{ top: 10, right: 8, bottom: 14, left: -10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={C.grid} vertical={false} />
            <XAxis dataKey="trimestre" stroke={C.axis} fontSize={7} tickLine={false} axisLine={false} />
            <YAxis stroke={C.axis} fontSize={9} tickLine={false} axisLine={false} width={25} />
            <Legend content={renderLegend} />
            <Line type="monotone" dataKey="exportacao" name="Exportação" stroke={C.teal} strokeWidth={2} dot={false}>
              <LabelList dataKey="exportacao" position="top" fontSize={7} fill={C.teal} />
            </Line>
            <Line type="monotone" dataKey="importacao" name="Importação" stroke={C.yellow} strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </Chart>
      <Chart title="Destinos Exportações">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={principaisDestinos} cx="50%" cy="50%" innerRadius="25%" outerRadius="50%" paddingAngle={2} dataKey="percentual" nameKey="pais" label={renderPieLabel} labelLine={false}>
              {principaisDestinos.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </Chart>
    </div>
    <div className="grid grid-cols-2 gap-2 flex-1 min-h-0">
      <Chart title="Emprego (%)">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={mercadoTrabalho} margin={{ top: 14, right: 4, bottom: 0, left: -10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={C.grid} vertical={false} />
            <XAxis dataKey="trimestre" stroke={C.axis} fontSize={6} tickLine={false} axisLine={false} />
            <YAxis hide domain={[70, 85]} />
            <Bar dataKey="emprego" fill={C.purple} radius={[3, 3, 0, 0]}>
              <LabelList dataKey="emprego" position="top" fontSize={7} fill={C.label} formatter={(v: number) => `${v}%`} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Chart>
      <Chart title="Produção Agrícola (M ton)">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={producaoAgricola} layout="vertical" margin={{ top: 4, right: 30, bottom: 0, left: -5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={C.grid} horizontal={false} />
            <XAxis type="number" hide />
            <YAxis type="category" dataKey="cultura" stroke={C.axis} fontSize={8} tickLine={false} axisLine={false} width={42} />
            <Bar dataKey="producao" fill={C.teal} radius={[0, 3, 3, 0]}>
              <LabelList dataKey="producao" position="right" fontSize={8} fill={C.label} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Chart>
    </div>
  </div>
);

const Panel3 = () => (
  <div className="flex flex-col gap-2 h-full">
    <div className="grid grid-cols-4 gap-2">
      <KPI title="IDEB 2023" value={lastEdu.ideb.toString()} sub={`${lastEdu.matriculas.toLocaleString()} matrículas`} color={C.teal} />
      <KPI title="Leitos Hosp." value={saudeData.leitos.toLocaleString()} sub={`${saudeData.leitosUTI} UTI — ${saudeData.coberturaSUS} SUS`} color={C.red} />
      <KPI title="Ocorrências" value={segurancaData[segurancaData.length - 1].ocorrencias.toLocaleString()} sub="2023 — queda 3,4%" color={C.blue} />
      <KPI title="CadÚnico" value={assistenciaSocial.familiasCadUnico.toLocaleString()} sub={`Desc. BF ${assistenciaSocial.descobertura}`} color={C.purple} />
    </div>
    <div className="grid grid-cols-2 gap-2 flex-1 min-h-0">
      <Chart title="Evolução IDEB">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={educacaoData} margin={{ top: 12, right: 8, bottom: 0, left: -10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={C.grid} vertical={false} />
            <XAxis dataKey="year" stroke={C.axis} fontSize={9} tickLine={false} axisLine={false} />
            <YAxis stroke={C.axis} fontSize={9} tickLine={false} axisLine={false} width={25} domain={[4, 6]} />
            <Line type="monotone" dataKey="ideb" stroke={C.teal} strokeWidth={2} dot={{ r: 3, fill: C.teal }}>
              <LabelList dataKey="ideb" position="top" fontSize={8} fill={C.label} />
            </Line>
          </LineChart>
        </ResponsiveContainer>
      </Chart>
      <Chart title="Segurança Pública">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={segurancaData} margin={{ top: 14, right: 4, bottom: 14, left: -10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={C.grid} vertical={false} />
            <XAxis dataKey="year" stroke={C.axis} fontSize={9} tickLine={false} axisLine={false} />
            <YAxis hide />
            <Legend content={renderLegend} />
            <Bar dataKey="ocorrencias" name="Ocorrências" fill={C.blue} radius={[3, 3, 0, 0]}>
              <LabelList dataKey="ocorrencias" position="top" fontSize={7} fill={C.label} formatter={(v: number) => `${(v / 1000).toFixed(1)}k`} />
            </Bar>
            <Bar dataKey="homicidios" name="Homicídios" fill={C.red} radius={[3, 3, 0, 0]}>
              <LabelList dataKey="homicidios" position="top" fontSize={7} fill={C.label} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Chart>
    </div>
    <div className="grid grid-cols-2 gap-2 flex-1 min-h-0">
      <Chart title="ICQV por Município">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={icqvData} margin={{ top: 4, right: 4, bottom: 14, left: -10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={C.grid} vertical={false} />
            <XAxis dataKey="city" stroke={C.axis} fontSize={7} tickLine={false} axisLine={false} />
            <YAxis hide domain={[0, 1]} />
            <Legend content={renderLegend} />
            <Bar dataKey="saude" name="Saúde" fill={C.red} radius={[2, 2, 0, 0]} />
            <Bar dataKey="educacao" name="Educação" fill={C.blue} radius={[2, 2, 0, 0]} />
            <Bar dataKey="economia" name="Economia" fill={C.teal} radius={[2, 2, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Chart>
      <Chart title="Radar Estadual (ICQV)">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={radarAvg}>
            <PolarGrid stroke={C.grid} />
            <PolarAngleAxis dataKey="subject" stroke={C.axis} fontSize={8} />
            <PolarRadiusAxis stroke={C.grid} fontSize={7} domain={[0, 100]} />
            <Radar dataKey="value" stroke={C.teal} fill={C.teal} fillOpacity={0.3}>
              <LabelList dataKey="value" fontSize={8} fill={C.label} />
            </Radar>
          </RadarChart>
        </ResponsiveContainer>
      </Chart>
    </div>
  </div>
);

const Panel4 = () => (
  <div className="flex flex-col gap-2 h-full">
    <div className="grid grid-cols-4 gap-2">
      <KPI title="Vegetação" value={`${vegetacaoNativa.vegetacaoPreservada}%`} sub={`${(vegetacaoNativa.areaProtegida / 1000).toFixed(0)} mil km²`} color={C.green} />
      <KPI title="Desmatamento" value={`${lastDesm.area} km²`} sub="-10,2% vs 2022" color={C.red} />
      <KPI title="Qual. do Ar" value="IQA variável" sub="Crítico Jul–Set" color={C.yellow} />
      <KPI title="Obras" value={obrasData.reduce((a, b) => a + b.emAndamento, 0).toString()} sub={`${obrasData.reduce((a, b) => a + b.concluidas, 0)} concluídas`} color={C.blue} />
    </div>
    <div className="grid grid-cols-2 gap-2 flex-1 min-h-0">
      <Chart title="Desmatamento Anual (km²)">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={desmatamentoData} margin={{ top: 14, right: 4, bottom: 14, left: -10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={C.grid} vertical={false} />
            <XAxis dataKey="year" stroke={C.axis} fontSize={9} tickLine={false} axisLine={false} />
            <YAxis hide />
            <Legend content={renderLegend} />
            <Bar dataKey="area" name="Área (km²)" fill={C.red} radius={[3, 3, 0, 0]}>
              <LabelList dataKey="area" position="top" fontSize={7} fill={C.label} />
            </Bar>
            <Bar dataKey="alertas" name="Alertas" fill={C.yellow} radius={[3, 3, 0, 0]}>
              <LabelList dataKey="alertas" position="top" fontSize={7} fill={C.label} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Chart>
      <Chart title="Biomas de MT">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={biomaData} cx="50%" cy="50%" innerRadius="25%" outerRadius="50%" paddingAngle={3} dataKey="percentual" nameKey="name" label={renderPieLabel} labelLine={false}>
              {biomaData.map((_, i) => <Cell key={i} fill={BIOMA_COLORS[i]} />)}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </Chart>
    </div>
    <div className="grid grid-cols-2 gap-2 flex-1 min-h-0">
      <Chart title="Qualidade do Ar (IQA mensal)">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={qualidadeArData} margin={{ top: 12, right: 8, bottom: 0, left: -10 }}>
            <defs><linearGradient id="ciqa" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={C.yellow} stopOpacity={0.4} /><stop offset="95%" stopColor={C.yellow} stopOpacity={0} /></linearGradient></defs>
            <CartesianGrid strokeDasharray="3 3" stroke={C.grid} vertical={false} />
            <XAxis dataKey="mes" stroke={C.axis} fontSize={8} tickLine={false} axisLine={false} />
            <YAxis hide />
            <Area type="monotone" dataKey="iqa" stroke={C.yellow} fill="url(#ciqa)" strokeWidth={2}>
              <LabelList dataKey="iqa" position="top" fontSize={7} fill={C.label} />
            </Area>
          </AreaChart>
        </ResponsiveContainer>
      </Chart>
      <Chart title="Investimento Infra (R$ bi)">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={investimentoInfra} margin={{ top: 14, right: 4, bottom: 0, left: -10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={C.grid} vertical={false} />
            <XAxis dataKey="year" stroke={C.axis} fontSize={9} tickLine={false} axisLine={false} />
            <YAxis hide />
            <Bar dataKey="investimento" fill={C.teal} radius={[3, 3, 0, 0]}>
              <LabelList dataKey="investimento" position="top" fontSize={8} fill={C.label} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Chart>
    </div>
  </div>
);

/* ─── Panel 5 (Visão Geral / Infraestrutura) ─── */
const Panel5 = () => (
  <div className="flex flex-col gap-2 h-full">
    <div className="grid grid-cols-4 gap-2">
      <KPI title="PIB Estadual" value={overviewKPIs.pibTotal} sub={overviewKPIs.pibRanking} color={C.teal} />
      <KPI title="Crescimento" value={overviewKPIs.crescimentoMedio} sub={overviewKPIs.crescimentoPeriodo} color={C.blue} />
      <KPI title="PIB per Capita" value={overviewKPIs.pibPerCapita} sub={overviewKPIs.pibPerCapitaRanking} color={C.purple} />
      <KPI title="Municípios" value={overviewKPIs.municipios} sub="Total do estado" color={C.yellow} />
    </div>
    <div className="grid grid-cols-2 gap-2 flex-1 min-h-0">
      <Chart title="Evolução do PIB (R$ bi)">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={pibEvolution} margin={{ top: 12, right: 8, bottom: 0, left: -10 }}>
            <defs><linearGradient id="cpib" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={C.teal} stopOpacity={0.4} /><stop offset="95%" stopColor={C.teal} stopOpacity={0} /></linearGradient></defs>
            <CartesianGrid strokeDasharray="3 3" stroke={C.grid} />
            <XAxis dataKey="year" stroke={C.axis} fontSize={9} tickLine={false} axisLine={false} />
            <YAxis stroke={C.axis} fontSize={9} tickLine={false} axisLine={false} width={30} />
            <Area type="monotone" dataKey="pib" stroke={C.teal} fill="url(#cpib)" strokeWidth={2}>
              <LabelList dataKey="pib" position="top" fontSize={8} fill={C.label} formatter={(v: number) => `${v}`} />
            </Area>
          </AreaChart>
        </ResponsiveContainer>
      </Chart>
      <Chart title="PIB por Setor (%)">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={sectorPieData} cx="50%" cy="50%" innerRadius="30%" outerRadius="55%" paddingAngle={3} dataKey="value" label={renderPieLabel} labelLine={false}>
              {sectorPieData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </Chart>
    </div>
    <Chart title="PIB Municipal (R$ bi)">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={populationData} margin={{ top: 14, right: 4, bottom: 0, left: -10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={C.grid} vertical={false} />
          <XAxis dataKey="city" stroke={C.axis} fontSize={8} tickLine={false} axisLine={false} />
          <YAxis hide />
          <Bar dataKey="pibMunicipal" fill={C.blue} radius={[3, 3, 0, 0]}>
            <LabelList dataKey="pibMunicipal" position="top" fontSize={8} fill={C.label} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Chart>
  </div>
);

const panels = [Panel2, Panel3, Panel4, Panel5];
const panelIcons = [p1Img, p2Img, p3Img, p4Img];

/* ─── Main ─── */
const SingleDashboard = () => {
  const { page } = useParams<{ page: string }>();
  const idx = page ? Math.max(0, Math.min(parseInt(page) - 1, 3)) : 0;
  const active = isNaN(idx) ? 0 : idx;
  const ActivePanel = panels[active];

  const panelTitles = ["Economia", "Social", "Ambiental", "Visão Geral"];

  return (
    <div
      className="h-dvh w-full flex flex-col overflow-hidden"
      style={{
        background: `radial-gradient(circle at top left, rgba(96,165,250,0.18), transparent 24%), radial-gradient(circle at top right, rgba(45,212,191,0.15), transparent 20%), linear-gradient(180deg, #02060d 0%, #040b15 100%)`,
      }}
    >
      {/* Header */}
      <header className="flex-shrink-0 flex items-center justify-between px-3 py-1.5" style={{ borderBottom: '1px solid rgba(148,163,184,0.18)', background: 'rgba(10,17,30,0.78)' }}>
        <img src={tituloImg} alt="Título" className="h-5 object-contain" />
        <img src={panelIcons[active]} alt={panelTitles[active]} className="h-5 object-contain" />
      </header>
      {/* Panel */}
      <div className="flex-1 min-h-0 p-2 overflow-hidden animate-fade-in">
        <ActivePanel />
      </div>
      {/* Footer with source */}
      <footer className="flex-shrink-0 flex items-center justify-between px-3 py-1.5" style={{ borderTop: '1px solid rgba(148,163,184,0.18)', background: 'rgba(10,17,30,0.78)' }}>
        <span className="text-[9px] font-medium uppercase tracking-wider" style={{ color: 'rgba(226,232,240,0.72)' }}>
          {panelTitles[active]} — Dados MT
        </span>
        <a href="https://dados.mt.gov.br/" target="_blank" rel="noopener noreferrer" className="text-[9px] transition-colors" style={{ color: '#8df3db' }}>
          Fonte: dados.mt.gov.br
        </a>
      </footer>
    </div>
  );
};

export default SingleDashboard;
