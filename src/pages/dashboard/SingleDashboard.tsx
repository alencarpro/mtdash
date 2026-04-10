import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BarChart3, TrendingUp, Users, Leaf, MapPin, Calendar, Camera, Video } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer,
  PieChart, Pie, Cell, AreaChart, Area, LineChart, Line, LabelList,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Legend,
  Tooltip,
} from "recharts";
import {
  comercioExterior, principaisDestinos, mercadoTrabalho, producaoAgricola,
  educacaoData, saudeData, segurancaData, assistenciaSocial, icqvData,
  desmatamentoData, biomaData, qualidadeArData, vegetacaoNativa, obrasData, investimentoInfra,
  overviewKPIs, pibEvolution, sectorPieData, populationData,
  vabSetorial, rendaPorCategoria, consumoEnergia, producaoIndustrial, producaoCarne, turismoData,
  mortalidadeData, violenciaMulher, deficitHabitacional, transitoData,
  focosIncendio, areasProtegidas, mineracaoData, obrasEstrategicas,
} from "@/data/mockData";
import tituloImg from "@/assets/titulo.png";
import p1Img from "@/assets/p1.png";
import p2Img from "@/assets/p2.png";
import p3Img from "@/assets/p3.png";
import p4Img from "@/assets/p4.png";
import p5Img from "@/assets/p5.png";

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

/* ─── Custom tooltip ─── */
const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: 'rgba(10,17,30,0.95)',
      border: '1px solid rgba(141,243,219,0.3)',
      borderRadius: 8,
      padding: '8px 12px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
      backdropFilter: 'blur(8px)',
    }}>
      {label && <p style={{ color: 'rgba(226,232,240,0.9)', fontSize: 10, fontWeight: 600, marginBottom: 4 }}>{label}</p>}
      {payload.map((entry: any, i: number) => (
        <div key={i} className="flex items-center gap-2" style={{ fontSize: 10, marginTop: 2 }}>
          <span className="inline-block w-2 h-2 rounded-sm" style={{ backgroundColor: entry.color || entry.fill }} />
          <span style={{ color: 'rgba(226,232,240,0.72)' }}>{entry.name}:</span>
          <span style={{ color: '#f8fafc', fontWeight: 700 }}>
            {typeof entry.value === 'number' ? entry.value.toLocaleString('pt-BR') : entry.value}
          </span>
        </div>
      ))}
    </div>
  );
};

const PieTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;
  const d = payload[0];
  return (
    <div style={{
      background: 'rgba(10,17,30,0.95)',
      border: '1px solid rgba(141,243,219,0.3)',
      borderRadius: 8,
      padding: '8px 12px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
    }}>
      <div className="flex items-center gap-2" style={{ fontSize: 10 }}>
        <span className="inline-block w-2 h-2 rounded-sm" style={{ backgroundColor: d.payload?.fill }} />
        <span style={{ color: '#f8fafc', fontWeight: 700 }}>{d.name}: {typeof d.value === 'number' ? d.value.toLocaleString('pt-BR') : d.value}{d.payload?.unit || '%'}</span>
      </div>
    </div>
  );
};

const KPI = ({ title, value, sub, color = C.teal, delay = 0 }: { title: string; value: string; sub: string; color?: string; delay?: number }) => (
  <div
    className="rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 flex flex-col justify-center relative overflow-hidden opacity-0 transition-all duration-300 ease-out hover:scale-[1.045] hover:z-10 cursor-default group"
    style={{
      background: 'rgba(10,17,30,0.78)',
      border: '1px solid rgba(148,163,184,0.15)',
      animation: `cascadeIn 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms forwards, subtleFloat 7s ease-in-out ${delay + 900}ms infinite, glowBorder 6s ease-in-out ${delay}ms infinite`,
    }}
    onMouseEnter={e => {
      const el = e.currentTarget;
      el.style.boxShadow = `0 0 18px -2px ${color}44, 0 0 6px -1px ${color}33`;
      el.style.borderColor = `${color}55`;
    }}
    onMouseLeave={e => {
      const el = e.currentTarget;
      el.style.boxShadow = '';
      el.style.borderColor = 'rgba(148,163,184,0.15)';
    }}
  >
    <div
      className="absolute left-0 top-0 bottom-0 w-1 rounded-l-lg transition-all duration-300 group-hover:w-[3px]"
      style={{ backgroundColor: color, color, animation: `accentGlow 3s ease-in-out ${delay + 400}ms infinite` }}
    />
    <p className="text-[8px] sm:text-[9px] uppercase tracking-wider font-medium truncate" style={{ color: 'rgba(226,232,240,0.72)' }}>{title}</p>
    <p className="text-sm sm:text-base font-extrabold leading-tight mt-0.5" style={{ color: '#f8fafc' }}>{value}</p>
    <p className="text-[8px] sm:text-[9px] truncate mt-0.5" style={{ color: 'rgba(226,232,240,0.72)' }}>{sub}</p>
  </div>
);

/* ─── Chart wrapper ─── */
const Chart = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div
    className="rounded-lg p-2 flex flex-col min-h-[160px] sm:min-h-0 flex-1 transition-all duration-300 ease-out hover:scale-[1.025] hover:z-10 cursor-default group/chart"
    style={{ background: 'rgba(10,17,30,0.78)', border: '1px solid rgba(148,163,184,0.15)', animation: 'glowBorder 6s ease-in-out infinite' }}
    onMouseEnter={e => {
      e.currentTarget.style.boxShadow = '0 0 20px -4px rgba(96,165,250,0.3), 0 0 8px -2px rgba(141,243,219,0.2)';
      e.currentTarget.style.borderColor = 'rgba(96,165,250,0.4)';
      e.currentTarget.style.background = 'rgba(10,17,30,0.92)';
    }}
    onMouseLeave={e => {
      e.currentTarget.style.boxShadow = '';
      e.currentTarget.style.borderColor = 'rgba(148,163,184,0.15)';
      e.currentTarget.style.background = 'rgba(10,17,30,0.78)';
    }}
  >
    <p className="text-[8px] sm:text-[9px] uppercase tracking-wider font-semibold mb-1 truncate transition-colors duration-300 group-hover/chart:text-[rgba(141,243,219,0.95)]" style={{ color: 'rgba(226,232,240,0.72)' }}>{title}</p>
    <div className="flex-1 min-h-0">{children}</div>
  </div>
);

/* ─── Pre-computed data ─── */
const radarAvg = [
  { subject: "Saúde", value: Math.round(icqvData.reduce((a, b) => a + b.saude, 0) / icqvData.length * 100) },
  { subject: "Educação", value: Math.round(icqvData.reduce((a, b) => a + b.educacao, 0) / icqvData.length * 100) },
  { subject: "Economia", value: Math.round(icqvData.reduce((a, b) => a + b.economia, 0) / icqvData.length * 100) },
  { subject: "ICQV", value: Math.round(icqvData.reduce((a, b) => a + b.icqv, 0) / icqvData.length * 100) },
].sort((a, b) => b.value - a.value);
const lastTrade = comercioExterior[comercioExterior.length - 1];
const lastWork = mercadoTrabalho[mercadoTrabalho.length - 1];
const lastEdu = educacaoData[educacaoData.length - 1];
const lastDesm = desmatamentoData[desmatamentoData.length - 1];

/* ═══════════════════════════════════════════════════════════
   PANEL 1 — ECONOMIA
   ═══════════════════════════════════════════════════════════ */
const PanelEconomia = () => (
  <div className="flex flex-col gap-2 h-full overflow-auto sm:overflow-hidden">
    {/* KPIs */}
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
      <KPI title="Superávit" value={`US$ ${lastTrade.superavit} bi`} sub="4T 2025" color={C.teal} delay={0} />
      <KPI title="Export. Principal" value="Soja 31%" sub="do total" color={C.green} delay={120} />
      <KPI title="Emprego" value={`${lastWork.emprego}%`} sub={`Renda R$ ${lastWork.renda}`} color={C.blue} delay={240} />
      <KPI title="Turismo" value={turismoData.visitantesAnuais} sub={`Receita ${turismoData.receitaTurismo}`} color={C.yellow} delay={360} />
    </div>
    {/* Row 1: 1 wide (span 2) + 1 narrow */}
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 flex-1 min-h-0">
      <div className="sm:col-span-2 flex flex-col min-h-0">
        <Chart title="Comércio Exterior (US$ bi)">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={comercioExterior} margin={{ top: 10, right: 8, bottom: 14, left: -10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.grid} vertical={false} />
              <XAxis dataKey="trimestre" stroke={C.axis} fontSize={6} tickLine={false} axisLine={false} />
              <YAxis stroke={C.axis} fontSize={9} tickLine={false} axisLine={false} width={25} />
              <Legend content={renderLegend} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(141,243,219,0.06)" }} />
              <Line type="monotone" dataKey="exportacao" name="Exportação" stroke={C.teal} strokeWidth={2} dot={false} animationDuration={2000} animationEasing="ease-out" />
              <Line type="monotone" dataKey="importacao" name="Importação" stroke={C.yellow} strokeWidth={2} dot={false} animationDuration={2000} animationBegin={300} animationEasing="ease-out" />
            </LineChart>
          </ResponsiveContainer>
        </Chart>
      </div>
      <Chart title="Destinos Exportações">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={principaisDestinos} cx="50%" cy="50%" innerRadius="25%" outerRadius="50%" paddingAngle={2} dataKey="percentual" nameKey="pais" label={renderPieLabel} labelLine={false} animationDuration={1800} animationEasing="ease-out">
              {principaisDestinos.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
            </Pie>
            <Tooltip content={<PieTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </Chart>
    </div>
    {/* Row 2: 4 equal columns */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 flex-1 min-h-0">
      <Chart title="VAB Setorial (R$ bi)">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={vabSetorial} margin={{ top: 10, right: 4, bottom: 14, left: -10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={C.grid} vertical={false} />
            <XAxis dataKey="year" stroke={C.axis} fontSize={8} tickLine={false} axisLine={false} />
            <YAxis hide />
            <Legend content={renderLegend} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(141,243,219,0.06)" }} />
            <Bar dataKey="agropecuaria" name="Agro" fill={C.green} radius={[2, 2, 0, 0]} animationDuration={1500} animationEasing="ease-out" />
            <Bar dataKey="industria" name="Indústria" fill={C.blue} radius={[2, 2, 0, 0]} animationDuration={1500} animationBegin={200} animationEasing="ease-out" />
            <Bar dataKey="servicos" name="Serviços" fill={C.purple} radius={[2, 2, 0, 0]} animationDuration={1500} animationBegin={400} animationEasing="ease-out" />
          </BarChart>
        </ResponsiveContainer>
      </Chart>
      <Chart title="Produção Agrícola (M ton)">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={producaoAgricola} layout="vertical" margin={{ top: 4, right: 30, bottom: 0, left: -5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={C.grid} horizontal={false} />
            <XAxis type="number" hide />
            <YAxis type="category" dataKey="cultura" stroke={C.axis} fontSize={8} tickLine={false} axisLine={false} width={42} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(141,243,219,0.06)" }} />
            <Bar dataKey="producao" fill={C.teal} radius={[0, 3, 3, 0]} animationDuration={1800} animationEasing="ease-out">
              <LabelList dataKey="producao" position="right" fontSize={8} fill={C.label} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Chart>
      <Chart title="Produção de Carne (mil ton)">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={producaoCarne} margin={{ top: 10, right: 4, bottom: 14, left: -10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={C.grid} vertical={false} />
            <XAxis dataKey="year" stroke={C.axis} fontSize={8} tickLine={false} axisLine={false} />
            <YAxis hide />
            <Legend content={renderLegend} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(141,243,219,0.06)" }} />
            <Bar dataKey="bovino" name="Bovino" fill={C.red} radius={[2, 2, 0, 0]} animationDuration={1500} animationEasing="ease-out" />
            <Bar dataKey="suino" name="Suíno" fill={C.yellow} radius={[2, 2, 0, 0]} animationDuration={1500} animationBegin={200} animationEasing="ease-out" />
            <Bar dataKey="aves" name="Aves" fill={C.blue} radius={[2, 2, 0, 0]} animationDuration={1500} animationBegin={400} animationEasing="ease-out" />
          </BarChart>
        </ResponsiveContainer>
      </Chart>
      <Chart title="Produção Industrial (% var.)">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={producaoIndustrial} margin={{ top: 10, right: 8, bottom: 0, left: -10 }}>
            <defs><linearGradient id="cind" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={C.purple} stopOpacity={0.4} /><stop offset="95%" stopColor={C.purple} stopOpacity={0} /></linearGradient></defs>
            <CartesianGrid strokeDasharray="3 3" stroke={C.grid} vertical={false} />
            <XAxis dataKey="mes" stroke={C.axis} fontSize={7} tickLine={false} axisLine={false} />
            <YAxis hide />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(141,243,219,0.06)" }} />
            <Area type="monotone" dataKey="variacao" stroke={C.purple} fill="url(#cind)" strokeWidth={2} animationDuration={2000} animationEasing="ease-out">
              <LabelList dataKey="variacao" position="top" fontSize={7} fill={C.label} formatter={(v: number) => `${v}%`} />
            </Area>
          </AreaChart>
        </ResponsiveContainer>
      </Chart>
    </div>
  </div>
);

/* ═══════════════════════════════════════════════════════════
   PANEL 2 — SOCIAL
   ═══════════════════════════════════════════════════════════ */
const PanelSocial = () => (
  <div className="flex flex-col gap-2 h-full overflow-auto sm:overflow-hidden">
    {/* KPIs: 6 in a row */}
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
      <KPI title="IDEB 2023" value={lastEdu.ideb.toString()} sub={`${lastEdu.matriculas.toLocaleString()} matrículas`} color={C.teal} delay={0} />
      <KPI title="Leitos Hosp." value={saudeData.leitos.toLocaleString()} sub={`${saudeData.leitosUTI} UTI`} color={C.red} delay={80} />
      <KPI title="Déf. Habitacional" value={deficitHabitacional.totalFamilias.toLocaleString()} sub={`${deficitHabitacional.percentualEstadual}`} color={C.yellow} delay={160} />
      <KPI title="Frota Veicular" value={`${(transitoData[transitoData.length - 1].frota / 1e6).toFixed(1)} mi`} sub={`${transitoData[transitoData.length - 1].acidentes.toLocaleString()} acid.`} color={C.blue} delay={240} />
      <KPI title="Cobertura SUS" value={saudeData.coberturaSUS} sub="pop. coberta" color={C.green} delay={320} />
      <KPI title="ICQV Médio" value={(icqvData.reduce((a, b) => a + b.icqv, 0) / icqvData.length).toFixed(2)} sub="índice estadual" color={C.purple} delay={400} />
    </div>
    {/* Row 1: 2 charts side by side */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 flex-1 min-h-0">
      <Chart title="Evolução IDEB">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={educacaoData} margin={{ top: 12, right: 8, bottom: 0, left: -10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={C.grid} vertical={false} />
            <XAxis dataKey="year" stroke={C.axis} fontSize={9} tickLine={false} axisLine={false} />
            <YAxis stroke={C.axis} fontSize={9} tickLine={false} axisLine={false} width={25} domain={[4, 6]} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(141,243,219,0.06)" }} />
            <Line type="monotone" dataKey="ideb" stroke={C.teal} strokeWidth={2} dot={{ r: 3, fill: C.teal }} animationDuration={2000} animationEasing="ease-out">
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
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(141,243,219,0.06)" }} />
            <Bar dataKey="ocorrencias" name="Ocorrências" fill={C.blue} radius={[3, 3, 0, 0]} animationDuration={1500} animationEasing="ease-out">
              <LabelList dataKey="ocorrencias" position="top" fontSize={7} fill={C.label} formatter={(v: number) => `${(v / 1000).toFixed(1)}k`} />
            </Bar>
            <Bar dataKey="homicidios" name="Homicídios" fill={C.red} radius={[3, 3, 0, 0]} animationDuration={1500} animationBegin={300} animationEasing="ease-out">
              <LabelList dataKey="homicidios" position="top" fontSize={7} fill={C.label} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Chart>
    </div>
    {/* Row 2: 1 narrow + 1 wide (inverted asymmetry from Panel 1) */}
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 flex-1 min-h-0">
      <Chart title="ICQV — Médias Estaduais">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={[...radarAvg].sort((a, b) => b.value - a.value)} layout="vertical" margin={{ top: 8, right: 30, bottom: 8, left: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={C.grid} horizontal={false} />
            <XAxis type="number" domain={[0, 100]} stroke={C.axis} fontSize={8} tickLine={false} axisLine={false} />
            <YAxis type="category" dataKey="subject" stroke={C.axis} fontSize={9} tickLine={false} axisLine={false} width={60} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(141,243,219,0.06)" }} />
            <Bar dataKey="value" name="Índice" radius={[0, 4, 4, 0]} animationDuration={1800} animationEasing="ease-out">
              {[...radarAvg].sort((a, b) => b.value - a.value).map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              <LabelList dataKey="value" position="right" fontSize={9} fill={C.label} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Chart>
      <div className="sm:col-span-2 flex flex-col min-h-0">
        <Chart title="ICQV por Município">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={icqvData} margin={{ top: 4, right: 4, bottom: 14, left: -10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.grid} vertical={false} />
              <XAxis dataKey="city" stroke={C.axis} fontSize={7} tickLine={false} axisLine={false} />
              <YAxis hide domain={[0, 1]} />
              <Legend content={renderLegend} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(141,243,219,0.06)" }} />
              <Bar dataKey="saude" name="Saúde" fill={C.red} radius={[2, 2, 0, 0]} animationDuration={1500} animationEasing="ease-out" />
              <Bar dataKey="educacao" name="Educação" fill={C.blue} radius={[2, 2, 0, 0]} animationDuration={1500} animationBegin={200} animationEasing="ease-out" />
              <Bar dataKey="economia" name="Economia" fill={C.teal} radius={[2, 2, 0, 0]} animationDuration={1500} animationBegin={400} animationEasing="ease-out" />
            </BarChart>
          </ResponsiveContainer>
        </Chart>
      </div>
    </div>
    {/* Row 3: 3 equal */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 flex-1 min-h-0">
      <Chart title="Mortalidade (por 1000 hab.)">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={mortalidadeData} margin={{ top: 10, right: 8, bottom: 14, left: -10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={C.grid} vertical={false} />
            <XAxis dataKey="year" stroke={C.axis} fontSize={9} tickLine={false} axisLine={false} />
            <YAxis hide />
            <Legend content={renderLegend} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(141,243,219,0.06)" }} />
            <Line type="monotone" dataKey="infantil" name="Infantil" stroke={C.yellow} strokeWidth={2} dot={{ r: 2 }} animationDuration={2000} animationEasing="ease-out" />
            <Line type="monotone" dataKey="geral" name="Geral" stroke={C.blue} strokeWidth={2} dot={{ r: 2 }} animationDuration={2000} animationBegin={300} animationEasing="ease-out" />
          </LineChart>
        </ResponsiveContainer>
      </Chart>
      <Chart title="Violência contra a Mulher">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={violenciaMulher} margin={{ top: 10, right: 4, bottom: 14, left: -10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={C.grid} vertical={false} />
            <XAxis dataKey="year" stroke={C.axis} fontSize={9} tickLine={false} axisLine={false} />
            <YAxis hide />
            <Legend content={renderLegend} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(141,243,219,0.06)" }} />
            <Bar dataKey="registros" name="Registros" fill={C.red} radius={[2, 2, 0, 0]} animationDuration={1500} animationEasing="ease-out">
              <LabelList dataKey="registros" position="top" fontSize={6} fill={C.label} formatter={(v: number) => `${(v / 1000).toFixed(1)}k`} />
            </Bar>
            <Bar dataKey="medidas" name="Medidas Prot." fill={C.teal} radius={[2, 2, 0, 0]} animationDuration={1500} animationBegin={300} animationEasing="ease-out" />
          </BarChart>
        </ResponsiveContainer>
      </Chart>
      <Chart title="Trânsito — Acidentes">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={transitoData} margin={{ top: 12, right: 8, bottom: 0, left: -10 }}>
            <defs><linearGradient id="cfrota" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={C.yellow} stopOpacity={0.4} /><stop offset="95%" stopColor={C.yellow} stopOpacity={0} /></linearGradient></defs>
            <CartesianGrid strokeDasharray="3 3" stroke={C.grid} vertical={false} />
            <XAxis dataKey="year" stroke={C.axis} fontSize={9} tickLine={false} axisLine={false} />
            <YAxis hide />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(141,243,219,0.06)" }} />
            <Area type="monotone" dataKey="acidentes" stroke={C.yellow} fill="url(#cfrota)" strokeWidth={2} animationDuration={2000} animationEasing="ease-out">
              <LabelList dataKey="acidentes" position="top" fontSize={6} fill={C.label} formatter={(v: number) => `${(v / 1000).toFixed(1)}k`} />
            </Area>
          </AreaChart>
        </ResponsiveContainer>
      </Chart>
    </div>
  </div>
);

/* ═══════════════════════════════════════════════════════════
   PANEL 3 — AMBIENTAL
   ═══════════════════════════════════════════════════════════ */
const PanelAmbiental = () => (
  <div className="flex flex-col gap-2 h-full overflow-auto sm:overflow-hidden">
    {/* KPIs: 2 wide cards */}
    <div className="grid grid-cols-2 gap-2">
      <KPI title="Vegetação Preservada" value={`${vegetacaoNativa.vegetacaoPreservada}%`} sub={`${(vegetacaoNativa.areaProtegida / 1000).toFixed(0)} mil km² protegidos`} color={C.green} delay={0} />
      <KPI title="Desmatamento Anual" value={`${lastDesm.area} km²`} sub={`-10,2% vs 2022 — ${lastDesm.alertas} alertas`} color={C.red} delay={120} />
    </div>
    {/* Main area: sidebar (pie + KPIs stacked) + wide chart */}
    <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 flex-1 min-h-0">
      {/* Sidebar: pie on top, 2 mini KPIs below */}
      <div className="flex flex-col gap-2 min-h-0">
        <Chart title="Biomas de MT">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={biomaData} cx="50%" cy="50%" innerRadius="25%" outerRadius="50%" paddingAngle={3} dataKey="percentual" nameKey="name" label={renderPieLabel} labelLine={false} animationDuration={1800} animationEasing="ease-out">
                {biomaData.map((_, i) => <Cell key={i} fill={BIOMA_COLORS[i]} />)}
              </Pie>
              <Tooltip content={<PieTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </Chart>
        <KPI title="Mineração" value={mineracaoData.producaoOuro} sub={`Fatur. ${mineracaoData.faturamento}`} color={C.yellow} delay={240} />
        <KPI title="Focos Incêndio" value={focosIncendio.reduce((a, b) => a + b.focos, 0).toLocaleString()} sub="Total anual" color={C.red} delay={360} />
      </div>
      {/* Main: 3 charts stacked in 3 cols */}
      <div className="sm:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-2 min-h-0">
        <Chart title="Desmatamento Anual (km²)">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={desmatamentoData} margin={{ top: 14, right: 4, bottom: 14, left: -10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.grid} vertical={false} />
              <XAxis dataKey="year" stroke={C.axis} fontSize={9} tickLine={false} axisLine={false} />
              <YAxis hide />
              <Legend content={renderLegend} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(141,243,219,0.06)" }} />
              <Bar dataKey="area" name="Área (km²)" fill={C.red} radius={[3, 3, 0, 0]} animationDuration={1500} animationEasing="ease-out">
                <LabelList dataKey="area" position="top" fontSize={7} fill={C.label} />
              </Bar>
              <Bar dataKey="alertas" name="Alertas" fill={C.yellow} radius={[3, 3, 0, 0]} animationDuration={1500} animationBegin={300} animationEasing="ease-out" />
            </BarChart>
          </ResponsiveContainer>
        </Chart>
        <Chart title="Focos de Incêndio (mensal)">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={focosIncendio} margin={{ top: 10, right: 8, bottom: 0, left: -10 }}>
              <defs><linearGradient id="cfogo" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={C.red} stopOpacity={0.4} /><stop offset="95%" stopColor={C.red} stopOpacity={0} /></linearGradient></defs>
              <CartesianGrid strokeDasharray="3 3" stroke={C.grid} vertical={false} />
              <XAxis dataKey="mes" stroke={C.axis} fontSize={7} tickLine={false} axisLine={false} />
              <YAxis hide />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(141,243,219,0.06)" }} />
              <Area type="monotone" dataKey="focos" stroke={C.red} fill="url(#cfogo)" strokeWidth={2} animationDuration={2000} animationEasing="ease-out">
                <LabelList dataKey="focos" position="top" fontSize={6} fill={C.label} />
              </Area>
            </AreaChart>
          </ResponsiveContainer>
        </Chart>
        <Chart title="Qualidade do Ar (IQA)">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={qualidadeArData} margin={{ top: 12, right: 8, bottom: 0, left: -10 }}>
              <defs><linearGradient id="ciqa" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={C.yellow} stopOpacity={0.4} /><stop offset="95%" stopColor={C.yellow} stopOpacity={0} /></linearGradient></defs>
              <CartesianGrid strokeDasharray="3 3" stroke={C.grid} vertical={false} />
              <XAxis dataKey="mes" stroke={C.axis} fontSize={7} tickLine={false} axisLine={false} />
              <YAxis hide />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(141,243,219,0.06)" }} />
              <Area type="monotone" dataKey="iqa" stroke={C.yellow} fill="url(#ciqa)" strokeWidth={2} animationDuration={2000} animationEasing="ease-out">
                <LabelList dataKey="iqa" position="top" fontSize={6} fill={C.label} />
              </Area>
            </AreaChart>
          </ResponsiveContainer>
        </Chart>
      </div>
    </div>
    {/* Bottom row: 2 charts */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 flex-1 min-h-0">
      <Chart title="Áreas Protegidas (km²)">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={areasProtegidas} layout="vertical" margin={{ top: 4, right: 35, bottom: 0, left: -5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={C.grid} horizontal={false} />
            <XAxis type="number" hide />
            <YAxis type="category" dataKey="tipo" stroke={C.axis} fontSize={7} tickLine={false} axisLine={false} width={65} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(141,243,219,0.06)" }} />
            <Bar dataKey="area" fill={C.green} radius={[0, 3, 3, 0]} animationDuration={1800} animationEasing="ease-out">
              <LabelList dataKey="area" position="right" fontSize={7} fill={C.label} formatter={(v: number) => `${(v / 1000).toFixed(0)}k`} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Chart>
      <Chart title="Consumo Energia (GWh)">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={consumoEnergia} margin={{ top: 10, right: 4, bottom: 14, left: -10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={C.grid} vertical={false} />
            <XAxis dataKey="year" stroke={C.axis} fontSize={8} tickLine={false} axisLine={false} />
            <YAxis hide />
            <Legend content={renderLegend} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(141,243,219,0.06)" }} />
            <Bar dataKey="residencial" name="Resid." fill={C.blue} radius={[2, 2, 0, 0]} animationDuration={1500} animationEasing="ease-out" />
            <Bar dataKey="industrial" name="Indust." fill={C.purple} radius={[2, 2, 0, 0]} animationDuration={1500} animationBegin={200} animationEasing="ease-out" />
            <Bar dataKey="rural" name="Rural" fill={C.green} radius={[2, 2, 0, 0]} animationDuration={1500} animationBegin={400} animationEasing="ease-out" />
          </BarChart>
        </ResponsiveContainer>
      </Chart>
    </div>
  </div>
);

/* ═══════════════════════════════════════════════════════════
   PANEL 4 — VISÃO GERAL
   ═══════════════════════════════════════════════════════════ */
const PanelVisaoGeral = () => (
  <div className="flex flex-col gap-2 h-full overflow-auto sm:overflow-hidden">
    {/* KPIs: 3 wide */}
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
      <KPI title="PIB Estadual" value={overviewKPIs.pibTotal} sub={`${overviewKPIs.pibRanking} — ${overviewKPIs.pibParticipacao} do Brasil`} color={C.teal} delay={0} />
      <KPI title="PIB per Capita" value={overviewKPIs.pibPerCapita} sub={overviewKPIs.pibPerCapitaRanking} color={C.purple} delay={120} />
      <KPI title="Crescimento" value={overviewKPIs.crescimentoMedio} sub={overviewKPIs.crescimentoPeriodo} color={C.blue} delay={240} />
    </div>
    {/* Hero: full-width PIB evolution */}
    <div className="flex-1 min-h-0">
      <Chart title="Evolução do PIB (R$ bi)">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={pibEvolution} margin={{ top: 12, right: 8, bottom: 0, left: -10 }}>
            <defs><linearGradient id="cpib" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={C.teal} stopOpacity={0.4} /><stop offset="95%" stopColor={C.teal} stopOpacity={0} /></linearGradient></defs>
            <CartesianGrid strokeDasharray="3 3" stroke={C.grid} />
            <XAxis dataKey="year" stroke={C.axis} fontSize={9} tickLine={false} axisLine={false} />
            <YAxis stroke={C.axis} fontSize={9} tickLine={false} axisLine={false} width={30} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(141,243,219,0.06)" }} />
            <Area type="monotone" dataKey="pib" stroke={C.teal} fill="url(#cpib)" strokeWidth={2} animationDuration={2000} animationEasing="ease-out">
              <LabelList dataKey="pib" position="top" fontSize={8} fill={C.label} formatter={(v: number) => `${v}`} />
            </Area>
          </AreaChart>
        </ResponsiveContainer>
      </Chart>
    </div>
    {/* Bottom: 3 columns */}
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 flex-1 min-h-0">
      <Chart title="PIB por Setor (%)">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={sectorPieData} cx="50%" cy="50%" innerRadius="30%" outerRadius="55%" paddingAngle={3} dataKey="value" label={renderPieLabel} labelLine={false} animationDuration={1800} animationEasing="ease-out">
              {sectorPieData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
            </Pie>
            <Tooltip content={<PieTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </Chart>
      <Chart title="PIB Municipal (R$ bi)">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={populationData} margin={{ top: 14, right: 4, bottom: 0, left: -10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={C.grid} vertical={false} />
            <XAxis dataKey="city" stroke={C.axis} fontSize={8} tickLine={false} axisLine={false} />
            <YAxis hide />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(141,243,219,0.06)" }} />
            <Bar dataKey="pibMunicipal" fill={C.blue} radius={[3, 3, 0, 0]} animationDuration={1500} animationEasing="ease-out">
              <LabelList dataKey="pibMunicipal" position="top" fontSize={8} fill={C.label} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Chart>
      <Chart title="Investimento Infra (R$ bi)">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={investimentoInfra} margin={{ top: 14, right: 4, bottom: 0, left: -10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={C.grid} vertical={false} />
            <XAxis dataKey="year" stroke={C.axis} fontSize={9} tickLine={false} axisLine={false} />
            <YAxis hide />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(141,243,219,0.06)" }} />
            <Bar dataKey="investimento" fill={C.teal} radius={[3, 3, 0, 0]} animationDuration={1500} animationEasing="ease-out">
              <LabelList dataKey="investimento" position="top" fontSize={8} fill={C.label} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Chart>
    </div>
  </div>
);

/* ═══════════════════════════════════════════════════════════
   PANEL 5 — OBRAS ESTRATÉGICAS (Monitoramento)
   ═══════════════════════════════════════════════════════════ */

const ProgressRing = ({ percent, size = 100 }: { percent: number; size?: number }) => {
  const stroke = 8;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;
  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="rgba(148,163,184,0.15)" strokeWidth={stroke} />
        <circle
          cx={size / 2} cy={size / 2} r={radius} fill="none"
          stroke={C.teal} strokeWidth={stroke} strokeLinecap="round"
          strokeDasharray={circumference} strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 1.5s ease-out' }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-lg font-extrabold" style={{ color: '#f8fafc' }}>{percent.toFixed(2)}%</span>
        <span className="text-[8px] uppercase tracking-wider" style={{ color: 'rgba(226,232,240,0.72)' }}>Executado</span>
      </div>
    </div>
  );
};

const CameraCard = ({ camera }: { camera: typeof obrasEstrategicas.cameras[0] }) => (
  <div
    className="rounded-lg overflow-hidden transition-all duration-300 hover:scale-[1.02] cursor-default"
    style={{ background: 'rgba(10,17,30,0.78)', border: '1px solid rgba(148,163,184,0.15)' }}
  >
    <div className="relative w-full" style={{ paddingBottom: '56.25%', background: 'linear-gradient(135deg, rgba(10,17,30,0.95), rgba(20,30,50,0.95))' }}>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex flex-col items-center gap-1">
          <Camera size={20} style={{ color: 'rgba(226,232,240,0.4)' }} />
          <span className="text-[7px]" style={{ color: 'rgba(226,232,240,0.4)' }}>Feed de câmera</span>
        </div>
      </div>
      <div className="absolute top-1 right-1 flex items-center gap-1 px-1.5 py-0.5 rounded" style={{ background: 'rgba(0,0,0,0.6)' }}>
        <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
        <span className="text-[7px] font-semibold" style={{ color: '#f8fafc' }}>LIVE</span>
      </div>
    </div>
    <div className="px-2 py-1.5">
      <div className="flex items-center justify-between mb-0.5">
        <span className="text-[8px] font-medium" style={{ color: C.teal }}>{camera.cidade}</span>
      </div>
      <p className="text-[9px] font-bold truncate" style={{ color: '#f8fafc' }}>{camera.nome}</p>
      <p className="text-[7px] truncate mt-0.5" style={{ color: 'rgba(226,232,240,0.6)' }}>{camera.local}</p>
      <div className="flex items-center justify-between mt-1">
        <span className="text-[7px]" style={{ color: 'rgba(226,232,240,0.5)' }}>{camera.tipo}</span>
        <span className="text-[7px]" style={{ color: 'rgba(226,232,240,0.5)' }}>Placa {camera.placa}</span>
      </div>
    </div>
  </div>
);

const PanelObras = () => {
  const d = obrasEstrategicas;
  return (
    <div className="flex flex-col gap-2 h-full overflow-auto">
      {/* Hero section: title + progress ring */}
      <div className="rounded-lg p-2 sm:p-3 flex flex-col sm:flex-row items-start justify-between gap-2 sm:gap-0" style={{ background: 'rgba(10,17,30,0.78)', border: '1px solid rgba(148,163,184,0.15)' }}>
        <div className="flex-1 min-w-0 mr-3">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[8px] uppercase tracking-widest font-bold px-2 py-0.5 rounded" style={{ color: C.teal, background: 'rgba(141,243,219,0.1)', border: '1px solid rgba(141,243,219,0.2)' }}>
              Painel de Monitoramento
            </span>
            <span className="text-[8px] uppercase tracking-widest font-semibold px-2 py-0.5 rounded" style={{ color: C.blue, background: 'rgba(96,165,250,0.1)', border: '1px solid rgba(96,165,250,0.2)' }}>
              Percentual Executado
            </span>
          </div>
          <h2 className="text-lg font-extrabold mt-1" style={{ color: '#f8fafc' }}>{d.titulo}</h2>
          <p className="text-[9px] mt-0.5 leading-relaxed" style={{ color: 'rgba(226,232,240,0.72)' }}>{d.descricao}</p>
          <div className="flex items-center gap-2 mt-1.5">
            <span className="text-[8px] px-2 py-0.5 rounded font-semibold" style={{ background: 'rgba(141,243,219,0.1)', color: C.teal, border: '1px solid rgba(141,243,219,0.2)' }}>{d.contrato.numero}</span>
            <span className="text-[8px] px-2 py-0.5 rounded font-semibold" style={{ background: 'rgba(96,165,250,0.1)', color: C.blue, border: '1px solid rgba(96,165,250,0.2)' }}>{d.contrato.status}</span>
            <span className="text-[8px]" style={{ color: 'rgba(226,232,240,0.5)' }}>{d.cameras.length} câmeras</span>
          </div>
        </div>
        <ProgressRing percent={d.percentualExecutado} size={90} />
      </div>

      {/* Contract info cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <KPI title="Contrato" value={d.contrato.numero} sub={`início ${d.contrato.inicio}\n${d.contrato.diasAtuais} dias atuais`} color={C.teal} delay={0} />
        <KPI title="Término Previsto" value={d.terminoPrevisto} sub={`${d.contrato.diasAtuais} dias atuais`} color={C.blue} delay={120} />
        <KPI title="Valor Total" value={d.valorTotal} sub={`${d.percentualPago} pago`} color={C.purple} delay={240} />
        <KPI title="Execução Física" value={d.execucaoFisica.area} sub={d.execucaoFisica.status} color={C.green} delay={360} />
      </div>

      {/* Objeto */}
      <div className="rounded-lg p-2" style={{ background: 'rgba(10,17,30,0.78)', border: '1px solid rgba(148,163,184,0.15)' }}>
        <div className="flex items-center justify-between mb-1">
          <div>
            <span className="text-[8px] uppercase tracking-wider font-bold" style={{ color: C.yellow }}>Objeto</span>
            <span className="text-[9px] ml-2 font-semibold" style={{ color: '#f8fafc' }}>Detalhes do contrato</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[8px] px-1.5 py-0.5 rounded" style={{ background: 'rgba(141,243,219,0.1)', color: C.teal }}>{d.objeto.totalBRT} BRT</span>
            <span className="text-[8px] px-1.5 py-0.5 rounded" style={{ background: 'rgba(134,239,172,0.1)', color: C.green }}>{d.objeto.online} online</span>
            <span className="text-[8px] px-1.5 py-0.5 rounded" style={{ background: 'rgba(248,113,113,0.1)', color: C.red }}>{d.objeto.offline} offline</span>
          </div>
        </div>
        <p className="text-[8px] leading-relaxed" style={{ color: 'rgba(226,232,240,0.6)' }}>{d.objeto.detalhes}</p>
      </div>

      {/* Cameras section */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-2">
            <span className="text-[8px] uppercase tracking-wider font-bold" style={{ color: C.yellow }}>Monitoramento</span>
            <span className="text-[10px] font-semibold" style={{ color: '#f8fafc' }}>Câmeras de obras</span>
          </div>
          <span className="text-[8px] font-medium" style={{ color: 'rgba(226,232,240,0.5)' }}>{d.cameras.length} cards</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {d.cameras.map(cam => (
            <CameraCard key={cam.id} camera={cam} />
          ))}
        </div>
      </div>
    </div>
  );
};

const panels = [PanelEconomia, PanelSocial, PanelAmbiental, PanelVisaoGeral, PanelObras];
const panelIcons = [p1Img, p2Img, p3Img, p4Img, p5Img];

/* ─── Main ─── */
const SingleDashboard = () => {
  const { page } = useParams<{ page: string }>();
  const idx = page ? Math.max(0, Math.min(parseInt(page) - 1, 4)) : 0;
  const active = isNaN(idx) ? 0 : idx;
  const ActivePanel = panels[active];

  const panelTitles = ["Economia", "Social", "Ambiental", "Visão Geral", "Obras"];

  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedDate = now.toLocaleDateString("pt-BR", { weekday: "long", day: "2-digit", month: "long", year: "numeric", timeZone: "America/Cuiaba" });
  const formattedTime = now.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit", second: "2-digit", timeZone: "America/Cuiaba" });

  return (
    <div
      className="h-dvh w-full flex flex-col overflow-hidden"
      style={{
        background: `radial-gradient(circle at top left, rgba(96,165,250,0.18), transparent 24%), radial-gradient(circle at top right, rgba(45,212,191,0.15), transparent 20%), linear-gradient(180deg, #02060d 0%, #040b15 100%)`,
      }}
    >
      {/* Header */}
      <header className="flex-shrink-0 flex items-center justify-between px-2 sm:px-3 py-1 sm:py-1.5" style={{ borderBottom: '1px solid rgba(148,163,184,0.18)', background: 'rgba(10,17,30,0.78)' }}>
        <img src={tituloImg} alt="Título" className="h-4 sm:h-5 object-contain" />
        <img src={panelIcons[active]} alt={panelTitles[active]} className="h-4 sm:h-5 object-contain" />
      </header>
      {/* Panel */}
      <div className="flex-1 min-h-0 p-1.5 sm:p-2 overflow-hidden animate-fade-in">
        <ActivePanel />
      </div>
      {/* Footer with source + clock */}
      <footer className="flex-shrink-0 flex flex-col sm:flex-row items-center justify-between px-2 sm:px-3 py-1 sm:py-1.5 gap-0.5 sm:gap-0" style={{ borderTop: '1px solid rgba(148,163,184,0.18)', background: 'rgba(10,17,30,0.78)' }}>
        <span className="text-[8px] sm:text-[9px] font-medium uppercase tracking-wider" style={{ color: 'rgba(226,232,240,0.72)' }}>
          {panelTitles[active]} — Dados MT
        </span>
        <span className="text-[8px] sm:text-[9px] font-semibold tabular-nums" style={{ color: '#60a5fa' }}>
          {formattedDate} — {formattedTime}
        </span>
        <a href="https://dados.mt.gov.br/" target="_blank" rel="noopener noreferrer" className="text-[8px] sm:text-[9px] transition-colors" style={{ color: '#8df3db' }}>
          Fonte: dados.mt.gov.br
        </a>
      </footer>
    </div>
  );
};

export default SingleDashboard;
