import { useState, useEffect } from "react";
import { BarChart3, LayoutDashboard, TrendingUp, Users, Leaf, MapPin, Calendar } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer,
  PieChart, Pie, Cell, AreaChart, Area, LineChart, Line, LabelList,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
} from "recharts";
import {
  overviewKPIs, pibEvolution, sectorPieData, populationData,
  comercioExterior, principaisDestinos, mercadoTrabalho, producaoAgricola,
  educacaoData, saudeData, segurancaData, assistenciaSocial, icqvData,
  desmatamentoData, biomaData, qualidadeArData, vegetacaoNativa, obrasData, investimentoInfra,
} from "@/data/mockData";

/* ─── Paleta ─── */
const C = {
  teal: "hsl(174 72% 50%)",
  blue: "hsl(199 89% 48%)",
  purple: "hsl(262 52% 47%)",
  yellow: "hsl(43 96% 56%)",
  red: "hsl(0 72% 51%)",
  green: "hsl(142 71% 45%)",
  grid: "hsl(220 20% 18%)",
  axis: "hsl(220 10% 55%)",
  label: "hsl(220 10% 85%)",
};
const COLORS = [C.teal, C.blue, C.purple, C.yellow, C.red, C.green];
const BIOMA_COLORS = [C.green, C.yellow, C.blue];

const tabs = [
  { label: "Visão Geral", icon: LayoutDashboard },
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

/* ─── Compact KPI ─── */
const KPI = ({ title, value, sub, color = C.teal }: { title: string; value: string; sub: string; color?: string }) => (
  <div className="bg-card rounded-lg border border-border px-3 py-2 flex flex-col justify-center relative overflow-hidden">
    <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-lg" style={{ backgroundColor: color }} />
    <p className="text-[9px] uppercase tracking-wider text-muted-foreground font-medium truncate">{title}</p>
    <p className="text-base font-extrabold text-card-foreground leading-tight mt-0.5">{value}</p>
    <p className="text-[9px] text-muted-foreground truncate mt-0.5">{sub}</p>
  </div>
);

/* ─── Chart wrapper ─── */
const Chart = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="bg-card rounded-lg border border-border p-2 flex flex-col min-h-0 flex-1">
    <p className="text-[9px] uppercase tracking-wider font-semibold text-muted-foreground mb-1 truncate">{title}</p>
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

const Panel1 = () => (
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
          <LineChart data={comercioExterior} margin={{ top: 10, right: 8, bottom: 0, left: -10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={C.grid} vertical={false} />
            <XAxis dataKey="trimestre" stroke={C.axis} fontSize={7} tickLine={false} axisLine={false} />
            <YAxis stroke={C.axis} fontSize={9} tickLine={false} axisLine={false} width={25} />
            <Line type="monotone" dataKey="exportacao" stroke={C.teal} strokeWidth={2} dot={false}>
              <LabelList dataKey="exportacao" position="top" fontSize={7} fill={C.teal} />
            </Line>
            <Line type="monotone" dataKey="importacao" stroke={C.yellow} strokeWidth={2} dot={false} />
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
          <BarChart data={segurancaData} margin={{ top: 14, right: 4, bottom: 0, left: -10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={C.grid} vertical={false} />
            <XAxis dataKey="year" stroke={C.axis} fontSize={9} tickLine={false} axisLine={false} />
            <YAxis hide />
            <Bar dataKey="ocorrencias" fill={C.blue} radius={[3, 3, 0, 0]}>
              <LabelList dataKey="ocorrencias" position="top" fontSize={7} fill={C.label} formatter={(v: number) => `${(v / 1000).toFixed(1)}k`} />
            </Bar>
            <Bar dataKey="homicidios" fill={C.red} radius={[3, 3, 0, 0]}>
              <LabelList dataKey="homicidios" position="top" fontSize={7} fill={C.label} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Chart>
    </div>
    <div className="grid grid-cols-2 gap-2 flex-1 min-h-0">
      <Chart title="ICQV por Município">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={icqvData} margin={{ top: 4, right: 4, bottom: 0, left: -10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={C.grid} vertical={false} />
            <XAxis dataKey="city" stroke={C.axis} fontSize={7} tickLine={false} axisLine={false} />
            <YAxis hide domain={[0, 1]} />
            <Bar dataKey="saude" fill={C.red} radius={[2, 2, 0, 0]} />
            <Bar dataKey="educacao" fill={C.blue} radius={[2, 2, 0, 0]} />
            <Bar dataKey="economia" fill={C.teal} radius={[2, 2, 0, 0]} />
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
          <BarChart data={desmatamentoData} margin={{ top: 14, right: 4, bottom: 0, left: -10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={C.grid} vertical={false} />
            <XAxis dataKey="year" stroke={C.axis} fontSize={9} tickLine={false} axisLine={false} />
            <YAxis hide />
            <Bar dataKey="area" fill={C.red} radius={[3, 3, 0, 0]}>
              <LabelList dataKey="area" position="top" fontSize={7} fill={C.label} />
            </Bar>
            <Bar dataKey="alertas" fill={C.yellow} radius={[3, 3, 0, 0]}>
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

const panels = [Panel1, Panel2, Panel3, Panel4];

/* ─── Main ─── */
const SingleDashboard = () => {
  const [active, setActive] = useState(0);
  const ActivePanel = panels[active];

  // Auto-rotate every 15 seconds for "gestão à vista"
  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % panels.length);
    }, 15000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="h-dvh w-full flex flex-col overflow-hidden bg-background">
      {/* Panel */}
      <div className="flex-1 min-h-0 p-2 overflow-hidden animate-fade-in" key={active}>
        <ActivePanel />
      </div>
    </div>
  );
};

export default SingleDashboard;
