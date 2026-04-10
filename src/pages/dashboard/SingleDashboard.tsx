import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BarChart3, TrendingUp, Users, Leaf, MapPin, Calendar } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer,
  PieChart, Pie, Cell, AreaChart, Area, LineChart, Line, LabelList,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Legend,
  Tooltip,
} from "recharts";
import {
  comercioExterior, principaisDestinos, mercadoTrabalho, producaoAgricola,
  educacaoData, saudeData, segurancaData, assistenciaSocial, icqvData,
  desmatamentoData, biomaData, qualidadeArData, vegetacaoNativa, investimentoInfra,
  overviewKPIs, pibEvolution, sectorPieData, populationData,
  vabSetorial, rendaPorCategoria, consumoEnergia, producaoIndustrial, producaoCarne, turismoData,
  mortalidadeData, violenciaMulher, deficitHabitacional, transitoData,
  focosIncendio, areasProtegidas, mineracaoData,
  beneficiosFinanceiros, aderenciaRecomendacoes, auditoriaControle, ouvidoriaManifestacoes,
  cgeAlerta, areasAuditadas, integridadeNumeros, dosimetriaPenas, capacitacoesCGE,
  tcacs, planejamentoEstrategico, custosServicos,
} from "@/data/mockData";
import tituloImg from "@/assets/titulo.png";


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
  const radius = outerRadius + 10;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  if ((percent || value / 100) < 0.05) return null;
  const displayName = name.length > 12 ? name.substring(0, 12) + '…' : name;
  return (
     <text x={x} y={y} fill={C.label} textAnchor={x > cx ? "start" : "end"} dominantBaseline="central" fontSize={11} fontWeight={600}>
       {displayName} {typeof percent === 'number' ? `${(percent * 100).toFixed(0)}%` : `${value}%`}
     </text>
  );
};

/* ─── Custom legend ─── */
const renderLegend = (props: any) => {
  const { payload } = props;
  return (
     <div className="mt-1 flex w-full flex-wrap items-start justify-center gap-x-3 gap-y-2 px-1 text-center">
       {payload?.map((entry: any, index: number) => (
         <span
           key={index}
           className="flex min-w-0 max-w-full items-start justify-center gap-1.5 text-[11px] leading-tight sm:text-[13px] md:text-[14px]"
           style={{ color: 'rgba(226,232,240,0.72)' }}
         >
            <span className="inline-block w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ backgroundColor: entry.color }} />
             <span className="max-w-[6.5rem] whitespace-normal break-words sm:max-w-none">{entry.value}</span>
          </span>
        ))}
    </div>
  );
};

/* ─── Custom tooltip ─── */
const CustomTooltip = ({ active, payload, label, unit }: any) => {
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
       {label && <p style={{ color: 'rgba(226,232,240,0.9)', fontSize: 18, fontWeight: 600, marginBottom: 4 }}>{label}</p>}
       {payload.map((entry: any, i: number) => (
         <div key={i} className="flex items-center gap-2" style={{ fontSize: 18, marginTop: 2 }}>
           <span className="inline-block w-3 h-3 rounded-sm" style={{ backgroundColor: entry.color || entry.fill }} />
           <span style={{ color: 'rgba(226,232,240,0.72)' }}>{entry.name}:</span>
           <span style={{ color: '#f8fafc', fontWeight: 700 }}>
             {typeof entry.value === 'number' ? entry.value.toLocaleString('pt-BR') : entry.value}
             {unit ? ` ${unit}` : ''}
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
       <div className="flex items-center gap-2" style={{ fontSize: 18 }}>
         <span className="inline-block w-3 h-3 rounded-sm" style={{ backgroundColor: d.payload?.fill }} />
         <span style={{ color: '#f8fafc', fontWeight: 700 }}>{d.name}: {typeof d.value === 'number' ? d.value.toLocaleString('pt-BR') : d.value}{d.payload?.unit || '%'}</span>
      </div>
    </div>
  );
};

const KPI = ({ title, value, sub, color = C.teal, delay = 0 }: { title: string; value: string; sub: string; color?: string; delay?: number }) => (
  <div
    className="rounded-lg px-4 sm:px-5 py-4 sm:py-5 flex flex-col justify-center relative overflow-hidden opacity-0 transition-all duration-300 ease-out hover:scale-[1.045] hover:z-10 cursor-default group"
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
     <p className="text-base sm:text-lg md:text-xl uppercase tracking-wider font-medium break-words leading-snug" style={{ color: 'rgba(226,232,240,0.72)' }}>{title}</p>
     <p className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight mt-1" style={{ color: '#f8fafc' }}>{value}</p>
     <p className="text-sm sm:text-base md:text-lg break-words leading-snug mt-1" style={{ color: 'rgba(226,232,240,0.72)' }}>{sub}</p>
  </div>
);

/* ─── Chart wrapper ─── */
const Chart = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div
    className="group/chart flex h-full min-w-0 flex-col overflow-hidden rounded-lg p-2 sm:p-3 transition-all duration-300 ease-out md:hover:z-10 md:hover:scale-[1.02] cursor-default"
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
    <p className="text-[12px] sm:text-[14px] md:text-[16px] uppercase tracking-wider font-semibold mb-1 break-words leading-snug transition-colors duration-300 group-hover/chart:text-[rgba(141,243,219,0.95)]" style={{ color: 'rgba(226,232,240,0.72)' }}>{title}</p>
    <div className="flex-1 min-w-0" style={{ minHeight: 0 }}>{children}</div>
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
  <div className="flex flex-col gap-2 h-full overflow-auto">
    {/* KPIs - 2x2 */}
    <div className="grid grid-cols-2 gap-2 flex-shrink-0">
      <KPI title="Superávit" value={`US$ ${lastTrade.superavit} bi`} sub="4T 2025" color={C.teal} delay={0} />
      <KPI title="Export. Principal" value="Soja 31%" sub="do total" color={C.green} delay={120} />
      <KPI title="Emprego" value={`${lastWork.emprego}%`} sub={`Renda R$ ${lastWork.renda}`} color={C.blue} delay={240} />
      <KPI title="Turismo" value={turismoData.visitantesAnuais} sub={`Receita ${turismoData.receitaTurismo}`} color={C.yellow} delay={360} />
    </div>
    {/* Comércio Exterior */}
    <div className="flex-shrink-0" style={{ height: 280 }}>
      <Chart title="Comércio Exterior (US$ bi)">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={comercioExterior} margin={{ top: 10, right: 8, bottom: 14, left: -10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={C.grid} vertical={false} />
            <XAxis dataKey="trimestre" stroke={C.axis} fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke={C.axis} fontSize={18} tickLine={false} axisLine={false} width={50} />
            <Legend content={renderLegend} />
            <Tooltip content={<CustomTooltip unit="US$ bi" />} cursor={{ fill: "rgba(141,243,219,0.06)" }} />
            <Line type="monotone" dataKey="exportacao" name="Exportação" stroke={C.teal} strokeWidth={2} dot={false} animationDuration={2000} animationEasing="ease-out">
              <LabelList dataKey="exportacao" position="top" fontSize={9} fill={C.label} content={({ x, y, value, index }: any) => index % 2 === 0 ? <text x={x} y={y - 6} textAnchor="middle" fontSize={9} fill={C.label}>{value}</text> : null} />
            </Line>
            <Line type="monotone" dataKey="importacao" name="Importação" stroke={C.yellow} strokeWidth={2} dot={false} animationDuration={2000} animationBegin={300} animationEasing="ease-out">
              <LabelList dataKey="importacao" position="top" fontSize={9} fill={C.label} content={({ x, y, value, index }: any) => index % 2 === 0 ? <text x={x} y={y - 6} textAnchor="middle" fontSize={9} fill={C.label}>{value}</text> : null} />
            </Line>
          </LineChart>
        </ResponsiveContainer>
      </Chart>
    </div>
    {/* Destinos Exportações + Produção Agrícola */}
    <div className="grid grid-cols-2 gap-2 flex-shrink-0" style={{ height: 280 }}>
      <Chart title="Destinos Exportações">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={principaisDestinos} cx="50%" cy="50%" innerRadius="20%" outerRadius="45%" paddingAngle={2} dataKey="percentual" nameKey="pais" label={renderPieLabel} labelLine={false} animationDuration={1800} animationEasing="ease-out">
              {principaisDestinos.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
            </Pie>
            <Tooltip content={<PieTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </Chart>
      <Chart title="Produção Agrícola (M ton)">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={producaoAgricola} layout="vertical" margin={{ top: 4, right: 30, bottom: 0, left: -5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={C.grid} horizontal={false} />
            <XAxis type="number" hide />
            <YAxis type="category" dataKey="cultura" stroke={C.axis} fontSize={14} tickLine={false} axisLine={false} width={70} />
            <Tooltip content={<CustomTooltip unit="M ton" />} cursor={{ fill: "rgba(141,243,219,0.06)" }} />
            <Bar dataKey="producao" fill={C.teal} radius={[0, 3, 3, 0]} animationDuration={1800} animationEasing="ease-out">
              <LabelList dataKey="producao" position="right" fontSize={14} fill={C.label} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Chart>
    </div>
    {/* VAB Setorial */}
    <div className="h-[320px] flex-shrink-0 sm:h-[280px]">
      <Chart title="VAB Setorial (R$ bi)">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={vabSetorial} margin={{ top: 10, right: 4, bottom: 10, left: -10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={C.grid} vertical={false} />
            <XAxis dataKey="year" stroke={C.axis} fontSize={12} tickLine={false} axisLine={false} tickMargin={8} />
            <YAxis hide />
            <Legend content={renderLegend} height={56} />
            <Tooltip content={<CustomTooltip unit="R$ bi" />} cursor={{ fill: "rgba(141,243,219,0.06)" }} />
            <Bar dataKey="agropecuaria" name="Agro" fill={C.green} radius={[2, 2, 0, 0]} animationDuration={1500} animationEasing="ease-out">
              <LabelList dataKey="agropecuaria" position="top" fontSize={8} fill={C.label} />
            </Bar>
            <Bar dataKey="industria" name="Indústria" fill={C.blue} radius={[2, 2, 0, 0]} animationDuration={1500} animationBegin={200} animationEasing="ease-out">
              <LabelList dataKey="industria" position="top" fontSize={8} fill={C.label} />
            </Bar>
            <Bar dataKey="servicos" name="Serviços" fill={C.purple} radius={[2, 2, 0, 0]} animationDuration={1500} animationBegin={400} animationEasing="ease-out">
              <LabelList dataKey="servicos" position="top" fontSize={8} fill={C.label} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Chart>
    </div>
    {/* Produção de Carne */}
    <div className="flex-shrink-0" style={{ height: 280 }}>
      <Chart title="Produção de Carne (mil ton)">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={producaoCarne} margin={{ top: 10, right: 4, bottom: 14, left: -10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={C.grid} vertical={false} />
            <XAxis dataKey="year" stroke={C.axis} fontSize={16} tickLine={false} axisLine={false} />
            <YAxis hide />
            <Legend content={renderLegend} />
            <Tooltip content={<CustomTooltip unit="mil ton" />} cursor={{ fill: "rgba(141,243,219,0.06)" }} />
            <Bar dataKey="bovino" name="Bovino" fill={C.red} radius={[2, 2, 0, 0]} animationDuration={1500} animationEasing="ease-out">
              <LabelList dataKey="bovino" position="top" fontSize={8} fill={C.label} />
            </Bar>
            <Bar dataKey="suino" name="Suíno" fill={C.yellow} radius={[2, 2, 0, 0]} animationDuration={1500} animationBegin={200} animationEasing="ease-out">
              <LabelList dataKey="suino" position="top" fontSize={8} fill={C.label} />
            </Bar>
            <Bar dataKey="aves" name="Aves" fill={C.blue} radius={[2, 2, 0, 0]} animationDuration={1500} animationBegin={400} animationEasing="ease-out">
              <LabelList dataKey="aves" position="top" fontSize={8} fill={C.label} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Chart>
    </div>
    {/* Produção Industrial */}
    <div className="flex-shrink-0" style={{ height: 280 }}>
      <Chart title="Produção Industrial (% var.)">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={producaoIndustrial} margin={{ top: 10, right: 8, bottom: 0, left: -10 }}>
            <defs><linearGradient id="cind" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={C.purple} stopOpacity={0.4} /><stop offset="95%" stopColor={C.purple} stopOpacity={0} /></linearGradient></defs>
            <CartesianGrid strokeDasharray="3 3" stroke={C.grid} vertical={false} />
            <XAxis dataKey="mes" stroke={C.axis} fontSize={14} tickLine={false} axisLine={false} />
            <YAxis hide />
            <Tooltip content={<CustomTooltip unit="%" />} cursor={{ fill: "rgba(141,243,219,0.06)" }} />
            <Area type="monotone" dataKey="variacao" stroke={C.purple} fill="url(#cind)" strokeWidth={2} animationDuration={2000} animationEasing="ease-out">
              <LabelList dataKey="variacao" position="top" fontSize={14} fill={C.label} formatter={(v: number) => `${v}%`} />
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
  <div className="flex flex-col gap-2 h-full overflow-hidden">
    {/* KPIs - 3x2 */}
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 flex-shrink-0">
      <KPI title="IDEB 2023" value={lastEdu.ideb.toString()} sub={`${lastEdu.matriculas.toLocaleString()} matrículas`} color={C.teal} delay={0} />
      <KPI title="Leitos Hosp." value={saudeData.leitos.toLocaleString()} sub={`${saudeData.leitosUTI} UTI`} color={C.red} delay={80} />
      <KPI title="Déf. Habitacional" value={deficitHabitacional.totalFamilias.toLocaleString()} sub={`${deficitHabitacional.percentualEstadual}`} color={C.yellow} delay={160} />
      <KPI title="Frota Veicular" value={`${(transitoData[transitoData.length - 1].frota / 1e6).toFixed(1)} mi`} sub={`${transitoData[transitoData.length - 1].acidentes.toLocaleString()} acid.`} color={C.blue} delay={240} />
      <KPI title="Cobertura SUS" value={saudeData.coberturaSUS} sub="pop. coberta" color={C.green} delay={320} />
      <KPI title="ICQV Médio" value={(icqvData.reduce((a, b) => a + b.icqv, 0) / icqvData.length).toFixed(2)} sub="índice estadual" color={C.purple} delay={400} />
    </div>
    {/* Row 1: ICQV */}
    <div className="grid grid-cols-2 gap-2 flex-1 min-h-[200px]">
      <Chart title="ICQV — Médias Estaduais">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={[...radarAvg].sort((a, b) => b.value - a.value)} layout="vertical" margin={{ top: 8, right: 30, bottom: 8, left: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={C.grid} horizontal={false} />
            <XAxis type="number" domain={[0, 100]} stroke={C.axis} fontSize={16} tickLine={false} axisLine={false} />
            <YAxis type="category" dataKey="subject" stroke={C.axis} fontSize={18} tickLine={false} axisLine={false} width={100} />
            <Tooltip content={<CustomTooltip unit="pts" />} cursor={{ fill: "rgba(141,243,219,0.06)" }} />
            <Bar dataKey="value" name="Índice" radius={[0, 4, 4, 0]} animationDuration={1800} animationEasing="ease-out">
              {[...radarAvg].sort((a, b) => b.value - a.value).map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              <LabelList dataKey="value" position="right" fontSize={18} fill={C.label} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Chart>
      <Chart title="ICQV por Município">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={[...icqvData].sort((a, b) => b.icqv - a.icqv)} layout="vertical" margin={{ top: 4, right: 30, bottom: 4, left: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={C.grid} horizontal={false} />
            <XAxis type="number" domain={[0, 1]} hide />
            <YAxis type="category" dataKey="city" stroke={C.axis} fontSize={11} tickLine={false} axisLine={false} width={90} />
            <Legend content={renderLegend} />
            <Tooltip content={<CustomTooltip unit="índice" />} cursor={{ fill: "rgba(141,243,219,0.06)" }} />
            <Bar dataKey="saude" name="Saúde" fill={C.red} radius={[0, 2, 2, 0]} animationDuration={1500} animationEasing="ease-out">
              <LabelList dataKey="saude" position="right" fontSize={8} fill={C.label} />
            </Bar>
            <Bar dataKey="educacao" name="Educação" fill={C.blue} radius={[0, 2, 2, 0]} animationDuration={1500} animationBegin={200} animationEasing="ease-out">
              <LabelList dataKey="educacao" position="right" fontSize={8} fill={C.label} />
            </Bar>
            <Bar dataKey="economia" name="Economia" fill={C.teal} radius={[0, 2, 2, 0]} animationDuration={1500} animationBegin={400} animationEasing="ease-out">
              <LabelList dataKey="economia" position="right" fontSize={8} fill={C.label} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Chart>
    </div>
    {/* Row 2: IDEB + Mortalidade — full width, half height each */}
    <div className="grid grid-cols-1 gap-2 flex-1 min-h-[200px]">
      <Chart title="Evolução IDEB">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={educacaoData} margin={{ top: 12, right: 8, bottom: 0, left: -10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={C.grid} vertical={false} />
            <XAxis dataKey="year" stroke={C.axis} fontSize={18} tickLine={false} axisLine={false} />
            <YAxis stroke={C.axis} fontSize={18} tickLine={false} axisLine={false} width={50} domain={[4, 6]} />
            <Tooltip content={<CustomTooltip unit="pts" />} cursor={{ fill: "rgba(141,243,219,0.06)" }} />
            <Line type="monotone" dataKey="ideb" stroke={C.teal} strokeWidth={2} dot={{ r: 3, fill: C.teal }} animationDuration={2000} animationEasing="ease-out">
              <LabelList dataKey="ideb" position="top" fontSize={16} fill={C.label} />
            </Line>
          </LineChart>
        </ResponsiveContainer>
      </Chart>
      <Chart title="Mortalidade (Infantil e Geral)">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={mortalidadeData} margin={{ top: 18, right: 16, bottom: 14, left: 16 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={C.grid} vertical={false} />
            <XAxis dataKey="year" stroke={C.axis} fontSize={11} tickLine={false} axisLine={false} interval={0} />
            <YAxis hide />
            <Legend content={renderLegend} />
            <Tooltip content={<CustomTooltip unit="por mil hab." />} cursor={{ fill: "rgba(141,243,219,0.06)" }} />
            <Line type="monotone" dataKey="infantil" name="Infantil" stroke={C.yellow} strokeWidth={2} dot={{ r: 3 }} animationDuration={2000} animationEasing="ease-out">
              <LabelList dataKey="infantil" position="top" offset={8} fontSize={10} fill={C.label} />
            </Line>
            <Line type="monotone" dataKey="geral" name="Geral" stroke={C.blue} strokeWidth={2} dot={{ r: 3 }} animationDuration={2000} animationBegin={300} animationEasing="ease-out">
              <LabelList dataKey="geral" position="bottom" offset={8} fontSize={10} fill={C.label} />
            </Line>
          </LineChart>
        </ResponsiveContainer>
      </Chart>
    </div>
    {/* Row 2: Segurança + Trânsito + Violência */}
    <div className="grid grid-cols-3 gap-2 flex-1 min-h-[200px]">
      <Chart title="Segurança Pública">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={segurancaData} margin={{ top: 14, right: 4, bottom: 14, left: -10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={C.grid} vertical={false} />
            <XAxis dataKey="year" stroke={C.axis} fontSize={18} tickLine={false} axisLine={false} />
            <YAxis hide />
            <Legend content={renderLegend} />
            <Tooltip content={<CustomTooltip unit="ocorrências" />} cursor={{ fill: "rgba(141,243,219,0.06)" }} />
            <Bar dataKey="ocorrencias" name="Ocorrências" fill={C.blue} radius={[3, 3, 0, 0]} animationDuration={1500} animationEasing="ease-out">
              <LabelList dataKey="ocorrencias" position="top" fontSize={14} fill={C.label} formatter={(v: number) => `${(v / 1000).toFixed(1)}k`} />
            </Bar>
            <Bar dataKey="homicidios" name="Homicídios" fill={C.red} radius={[3, 3, 0, 0]} animationDuration={1500} animationBegin={300} animationEasing="ease-out">
              <LabelList dataKey="homicidios" position="top" fontSize={14} fill={C.label} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Chart>
      <Chart title="Trânsito — Acidentes">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={transitoData} margin={{ top: 18, right: 24, bottom: 8, left: 24 }}>
            <defs><linearGradient id="cfrota" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={C.yellow} stopOpacity={0.4} /><stop offset="95%" stopColor={C.yellow} stopOpacity={0} /></linearGradient></defs>
            <CartesianGrid strokeDasharray="3 3" stroke={C.grid} vertical={false} />
            <XAxis dataKey="year" stroke={C.axis} fontSize={12} tickLine={false} axisLine={false} tickMargin={8} />
            <YAxis hide />
            <Tooltip content={<CustomTooltip unit="acidentes" />} cursor={{ fill: "rgba(141,243,219,0.06)" }} />
            <Area type="monotone" dataKey="acidentes" stroke={C.yellow} fill="url(#cfrota)" strokeWidth={2} animationDuration={2000} animationEasing="ease-out">
              <LabelList dataKey="acidentes" position="top" offset={8} fontSize={10} fill={C.label} formatter={(v: number) => `${(v / 1000).toFixed(1)}k`} />
            </Area>
          </AreaChart>
        </ResponsiveContainer>
      </Chart>
      <Chart title="Violência contra a Mulher">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={violenciaMulher} margin={{ top: 14, right: 4, bottom: 14, left: -10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={C.grid} vertical={false} />
            <XAxis dataKey="year" stroke={C.axis} fontSize={11} tickLine={false} axisLine={false} />
            <YAxis hide />
            <Legend content={renderLegend} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(141,243,219,0.06)" }} />
            <Bar dataKey="registros" name="Registros" fill={C.red} radius={[3, 3, 0, 0]} animationDuration={1500} animationEasing="ease-out">
              <LabelList dataKey="registros" position="top" fontSize={9} fill={C.label} formatter={(v: number) => `${(v / 1000).toFixed(1)}k`} />
            </Bar>
            <Bar dataKey="medidas" name="Medidas Protetivas" fill={C.teal} radius={[3, 3, 0, 0]} animationDuration={1500} animationBegin={300} animationEasing="ease-out">
              <LabelList dataKey="medidas" position="top" fontSize={9} fill={C.label} formatter={(v: number) => `${(v / 1000).toFixed(1)}k`} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Chart>
    </div>
  </div>
);

/* ═══════════════════════════════════════════════════════════
   PANEL 3 — AMBIENTAL
   ═══════════════════════════════════════════════════════════ */
const PanelAmbiental = () => (
  <div className="flex flex-col gap-2 h-full overflow-hidden">
    {/* KPIs - 2x2 */}
    <div className="grid grid-cols-2 gap-2 flex-shrink-0">
      <KPI title="Vegetação Preservada" value={`${vegetacaoNativa.vegetacaoPreservada}%`} sub={`${(vegetacaoNativa.areaProtegida / 1000).toFixed(0)} mil km² protegidos`} color={C.green} delay={0} />
      <KPI title="Desmatamento Anual" value={`${lastDesm.area} km²`} sub={`-10,2% vs 2022 — ${lastDesm.alertas} alertas`} color={C.red} delay={120} />
      <KPI title="Mineração" value={mineracaoData.producaoOuro} sub={`Fatur. ${mineracaoData.faturamento}`} color={C.yellow} delay={240} />
      <KPI title="Focos Incêndio" value={focosIncendio.reduce((a, b) => a + b.focos, 0).toLocaleString()} sub="Total anual" color={C.red} delay={360} />
    </div>
    {/* Row 1: Desmatamento (wide) + Biomas */}
    <div className="grid grid-cols-2 gap-2 flex-1 min-h-[200px]">
      <Chart title="Desmatamento Anual (km²)">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={desmatamentoData} margin={{ top: 14, right: 4, bottom: 14, left: -10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={C.grid} vertical={false} />
            <XAxis dataKey="year" stroke={C.axis} fontSize={18} tickLine={false} axisLine={false} />
            <YAxis hide />
            <Legend content={renderLegend} />
            <Tooltip content={<CustomTooltip unit="km²" />} cursor={{ fill: "rgba(141,243,219,0.06)" }} />
            <Bar dataKey="area" name="Área (km²)" fill={C.red} radius={[3, 3, 0, 0]} animationDuration={1500} animationEasing="ease-out">
              <LabelList dataKey="area" position="top" fontSize={14} fill={C.label} />
            </Bar>
            <Bar dataKey="alertas" name="Alertas" fill={C.yellow} radius={[3, 3, 0, 0]} animationDuration={1500} animationBegin={300} animationEasing="ease-out">
              <LabelList dataKey="alertas" position="top" fontSize={12} fill={C.label} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Chart>
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
    </div>
    {/* Row 2: Qualidade do Ar + Focos de Incêndio — full width, half height each */}
    <div className="grid grid-cols-1 gap-2 flex-1 min-h-[200px]">
      <Chart title="Qualidade do Ar (IQA)">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={qualidadeArData} margin={{ top: 12, right: 8, bottom: 0, left: -10 }}>
            <defs><linearGradient id="ciqa" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={C.yellow} stopOpacity={0.4} /><stop offset="95%" stopColor={C.yellow} stopOpacity={0} /></linearGradient></defs>
            <CartesianGrid strokeDasharray="3 3" stroke={C.grid} vertical={false} />
            <XAxis dataKey="mes" stroke={C.axis} fontSize={14} tickLine={false} axisLine={false} />
            <YAxis hide />
            <Tooltip content={<CustomTooltip unit="IQA" />} cursor={{ fill: "rgba(141,243,219,0.06)" }} />
            <Area type="monotone" dataKey="iqa" stroke={C.yellow} fill="url(#ciqa)" strokeWidth={2} animationDuration={2000} animationEasing="ease-out">
              <LabelList dataKey="iqa" position="top" fontSize={12} fill={C.label} />
            </Area>
          </AreaChart>
        </ResponsiveContainer>
      </Chart>
      <Chart title="Focos de Incêndio (mensal)">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={focosIncendio} margin={{ top: 10, right: 8, bottom: 0, left: -10 }}>
            <defs><linearGradient id="cfogo" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={C.red} stopOpacity={0.4} /><stop offset="95%" stopColor={C.red} stopOpacity={0} /></linearGradient></defs>
            <CartesianGrid strokeDasharray="3 3" stroke={C.grid} vertical={false} />
            <XAxis dataKey="mes" stroke={C.axis} fontSize={14} tickLine={false} axisLine={false} />
            <YAxis hide />
            <Tooltip content={<CustomTooltip unit="focos" />} cursor={{ fill: "rgba(141,243,219,0.06)" }} />
            <Area type="monotone" dataKey="focos" stroke={C.red} fill="url(#cfogo)" strokeWidth={2} animationDuration={2000} animationEasing="ease-out">
              <LabelList dataKey="focos" position="top" fontSize={12} fill={C.label} />
            </Area>
          </AreaChart>
        </ResponsiveContainer>
      </Chart>
    </div>
    {/* Row 3: Áreas Protegidas + Consumo Energia */}
    <div className="grid grid-cols-2 gap-2 flex-1 min-h-[200px]">
      <Chart title="Áreas Protegidas (km²)">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={areasProtegidas} layout="vertical" margin={{ top: 4, right: 35, bottom: 0, left: -5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={C.grid} horizontal={false} />
            <XAxis type="number" hide />
            <YAxis type="category" dataKey="tipo" stroke={C.axis} fontSize={14} tickLine={false} axisLine={false} width={110} />
            <Tooltip content={<CustomTooltip unit="km²" />} cursor={{ fill: "rgba(141,243,219,0.06)" }} />
            <Bar dataKey="area" fill={C.green} radius={[0, 3, 3, 0]} animationDuration={1800} animationEasing="ease-out">
              <LabelList dataKey="area" position="right" fontSize={14} fill={C.label} formatter={(v: number) => `${(v / 1000).toFixed(0)}k`} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Chart>
      <Chart title="Consumo Energia (GWh)">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={consumoEnergia} margin={{ top: 10, right: 4, bottom: 14, left: -10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={C.grid} vertical={false} />
            <XAxis dataKey="year" stroke={C.axis} fontSize={16} tickLine={false} axisLine={false} />
            <YAxis hide />
            <Legend content={renderLegend} />
            <Tooltip content={<CustomTooltip unit="GWh" />} cursor={{ fill: "rgba(141,243,219,0.06)" }} />
            <Bar dataKey="residencial" name="Resid." fill={C.blue} radius={[2, 2, 0, 0]} animationDuration={1500} animationEasing="ease-out">
              <LabelList dataKey="residencial" position="top" fontSize={8} fill={C.label} />
            </Bar>
            <Bar dataKey="industrial" name="Indust." fill={C.purple} radius={[2, 2, 0, 0]} animationDuration={1500} animationBegin={200} animationEasing="ease-out">
              <LabelList dataKey="industrial" position="top" fontSize={8} fill={C.label} />
            </Bar>
            <Bar dataKey="rural" name="Rural" fill={C.green} radius={[2, 2, 0, 0]} animationDuration={1500} animationBegin={400} animationEasing="ease-out">
              <LabelList dataKey="rural" position="top" fontSize={8} fill={C.label} />
            </Bar>
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
  <div className="flex flex-col gap-2 h-full overflow-hidden">
    {/* KPIs - 2x2 (last row has 1 centered or 2) */}
    <div className="grid grid-cols-2 gap-2 flex-shrink-0">
      <KPI title="PIB Estadual" value={overviewKPIs.pibTotal} sub={`${overviewKPIs.pibRanking} — ${overviewKPIs.pibParticipacao} do Brasil`} color={C.teal} delay={0} />
      <KPI title="PIB per Capita" value={overviewKPIs.pibPerCapita} sub={overviewKPIs.pibPerCapitaRanking} color={C.purple} delay={120} />
      <KPI title="Crescimento" value={overviewKPIs.crescimentoMedio} sub={overviewKPIs.crescimentoPeriodo} color={C.blue} delay={240} />
      <KPI title="População" value="3,7 mi" sub="Censo 2022" color={C.green} delay={360} />
    </div>
    {/* Evolução do PIB + Crescimento PIB — stacked full width */}
    <div className="flex flex-col gap-2 flex-1 min-h-[200px]">
      <div className="flex-1 min-h-0">
        <Chart title="Evolução do PIB (R$ bi)">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={pibEvolution} margin={{ top: 16, right: 12, bottom: 0, left: -10 }}>
              <defs><linearGradient id="cpib" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={C.teal} stopOpacity={0.4} /><stop offset="95%" stopColor={C.teal} stopOpacity={0} /></linearGradient></defs>
              <CartesianGrid strokeDasharray="3 3" stroke={C.grid} />
              <XAxis dataKey="year" stroke={C.axis} fontSize={9} tickLine={false} axisLine={false} interval={0} />
              <YAxis stroke={C.axis} fontSize={11} tickLine={false} axisLine={false} width={40} />
              <Tooltip content={<CustomTooltip unit="R$ bi" />} cursor={{ fill: "rgba(141,243,219,0.06)" }} />
              <Area type="monotone" dataKey="pib" stroke={C.teal} fill="url(#cpib)" strokeWidth={2} animationDuration={2000} animationEasing="ease-out">
                <LabelList dataKey="pib" position="top" fontSize={9} fill={C.label} content={({ x, y, value, index }: any) => index % 2 === 0 ? <text x={x} y={y - 4} textAnchor="middle" fontSize={9} fill={C.label}>{value}</text> : null} />
              </Area>
            </AreaChart>
          </ResponsiveContainer>
        </Chart>
      </div>
      <div className="flex-1 min-h-0">
        <Chart title="Crescimento PIB (%)">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={pibEvolution} margin={{ top: 16, right: 12, bottom: 0, left: -10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.grid} vertical={false} />
              <XAxis dataKey="year" stroke={C.axis} fontSize={9} tickLine={false} axisLine={false} interval={0} />
              <YAxis hide />
              <Tooltip content={<CustomTooltip unit="%" />} cursor={{ fill: "rgba(141,243,219,0.06)" }} />
              <Line type="monotone" dataKey="crescimento" stroke={C.yellow} strokeWidth={2} dot={{ r: 3, fill: C.yellow }} animationDuration={2000} animationEasing="ease-out">
                <LabelList dataKey="crescimento" position="top" fontSize={9} fill={C.label} content={({ x, y, value, index }: any) => index % 2 === 0 ? <text x={x} y={y - 4} textAnchor="middle" fontSize={9} fill={C.label}>{value}%</text> : null} />
              </Line>
            </LineChart>
          </ResponsiveContainer>
        </Chart>
      </div>
    </div>
    {/* PIB por Setor + PIB Municipal */}
    <div className="grid grid-cols-2 gap-2 flex-1 min-h-[200px]">
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
      <Chart title="Renda por Categoria (R$)">
        <ResponsiveContainer width="100%" height="100%">
           <BarChart data={[...rendaPorCategoria].sort((a, b) => b.valor - a.valor)} layout="vertical" margin={{ top: 4, right: 60, bottom: 0, left: 0 }}>
             <CartesianGrid strokeDasharray="3 3" stroke={C.grid} horizontal={false} />
             <XAxis type="number" hide />
             <YAxis type="category" dataKey="categoria" stroke={C.axis} fontSize={11} tickLine={false} axisLine={false} width={80} />
             <Tooltip content={<CustomTooltip unit="R$" />} cursor={{ fill: "rgba(141,243,219,0.06)" }} />
             <Bar dataKey="valor" fill={C.purple} radius={[0, 3, 3, 0]} animationDuration={1800} animationEasing="ease-out">
               {[...rendaPorCategoria].sort((a, b) => b.valor - a.valor).map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
               <LabelList dataKey="valor" position="right" fontSize={11} fill={C.label} formatter={(v: number) => `R$ ${v.toLocaleString()}`} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Chart>
    </div>
    {/* PIB Municipal + Investimento Infra */}
    <div className="grid grid-cols-2 gap-2 flex-1 min-h-[200px]">
      <Chart title="PIB Municipal (R$ bi)">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={populationData} margin={{ top: 14, right: 4, bottom: 80, left: -10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={C.grid} vertical={false} />
            <XAxis dataKey="city" stroke={C.axis} fontSize={11} tickLine={false} axisLine={false} angle={-55} textAnchor="end" interval={0} height={80} />
            <YAxis hide />
            <Tooltip content={<CustomTooltip unit="R$ bi" />} cursor={{ fill: "rgba(141,243,219,0.06)" }} />
            <Bar dataKey="pibMunicipal" fill={C.blue} radius={[3, 3, 0, 0]} animationDuration={1500} animationEasing="ease-out">
              <LabelList dataKey="pibMunicipal" position="top" fontSize={16} fill={C.label} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Chart>
      <Chart title="Investimento Infra (R$ bi)">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={investimentoInfra} margin={{ top: 14, right: 4, bottom: 0, left: -10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={C.grid} vertical={false} />
            <XAxis dataKey="year" stroke={C.axis} fontSize={18} tickLine={false} axisLine={false} />
            <YAxis hide />
            <Tooltip content={<CustomTooltip unit="R$ bi" />} cursor={{ fill: "rgba(141,243,219,0.06)" }} />
            <Bar dataKey="investimento" fill={C.teal} radius={[3, 3, 0, 0]} animationDuration={1500} animationEasing="ease-out">
              <LabelList dataKey="investimento" position="top" fontSize={16} fill={C.label} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Chart>
    </div>
  </div>
);

/* ═══════════════════════════════════════════════════════════
   PANEL 5 — CONTROLE & EFICIÊNCIA (CGE)
   ═══════════════════════════════════════════════════════════ */
const OUVIDORIA_COLORS = [C.blue, C.yellow, C.red, C.teal, C.green, C.purple];

const PanelControle = () => (
  <div className="flex flex-col gap-2 h-full overflow-hidden">
    {/* KPIs */}
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 flex-shrink-0">
      <KPI title="Benefício Financeiro" value="R$ 940,7 mi" sub="214 benefícios validados" color={C.teal} delay={0} />
      <KPI title="Produtos Auditoria" value="703" sub="622 controle + 81 auditoria" color={C.blue} delay={80} />
      <KPI title="Aderência Recom." value="86,11%" sub="779 trabalhos monitorados" color={C.green} delay={160} />
      <KPI title="Ouvidoria" value="21.472" sub="manifestações | 94% no prazo" color={C.yellow} delay={240} />
      <KPI title="CGE Alerta" value="147.397" sub="alertas gerados em 12 categ." color={C.red} delay={320} />
      <KPI title="Meta Superada" value="300%" sub="benef. financeiro vs meta" color={C.purple} delay={400} />
    </div>
    {/* Row 1: Benefícios Financeiros + Aderência Recomendações */}
    <div className="grid grid-cols-2 gap-2 flex-1 min-h-[200px]">
      <Chart title="Benefícios Financeiros por Área (R$ mi)">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={beneficiosFinanceiros} layout="vertical" margin={{ top: 4, right: 40, bottom: 4, left: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={C.grid} horizontal={false} />
            <XAxis type="number" hide />
            <YAxis type="category" dataKey="area" stroke={C.axis} fontSize={11} tickLine={false} axisLine={false} width={120} />
            <Tooltip content={<CustomTooltip unit="R$ mi" />} cursor={{ fill: "rgba(141,243,219,0.06)" }} />
            <Bar dataKey="valor" fill={C.teal} radius={[0, 4, 4, 0]} animationDuration={1800} animationEasing="ease-out">
              <LabelList dataKey="valor" position="right" fontSize={14} fill={C.label} formatter={(v: number) => `R$ ${v}`} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Chart>
      <Chart title="Aderência às Recomendações (%)">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={aderenciaRecomendacoes} margin={{ top: 12, right: 8, bottom: 0, left: -10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={C.grid} vertical={false} />
            <XAxis dataKey="year" stroke={C.axis} fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke={C.axis} fontSize={12} tickLine={false} axisLine={false} domain={[0, 100]} />
            <Legend content={renderLegend} />
            <Tooltip content={<CustomTooltip unit="%" />} cursor={{ fill: "rgba(141,243,219,0.06)" }} />
            <Line type="monotone" dataKey="aderencia" name="Aderência" stroke={C.teal} strokeWidth={2} dot={{ r: 3 }} animationDuration={2000}>
              <LabelList dataKey="aderencia" position="top" fontSize={11} fill={C.label} />
            </Line>
            <Line type="monotone" dataKey="implementacao" name="Implementação" stroke={C.blue} strokeWidth={2} dot={{ r: 3 }} animationDuration={2000} animationBegin={300}>
              <LabelList dataKey="implementacao" position="bottom" fontSize={11} fill={C.label} />
            </Line>
          </LineChart>
        </ResponsiveContainer>
      </Chart>
    </div>
    {/* Row 2: Áreas Auditadas + Ouvidoria */}
    <div className="grid grid-cols-2 gap-2 flex-1 min-h-[200px]">
      <Chart title="Ranking Áreas Auditadas">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={areasAuditadas} layout="vertical" margin={{ top: 4, right: 30, bottom: 4, left: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={C.grid} horizontal={false} />
            <XAxis type="number" hide />
            <YAxis type="category" dataKey="area" stroke={C.axis} fontSize={11} tickLine={false} axisLine={false} width={100} />
            <Tooltip content={<CustomTooltip unit="auditorias" />} cursor={{ fill: "rgba(141,243,219,0.06)" }} />
            <Bar dataKey="qtd" radius={[0, 4, 4, 0]} animationDuration={1800} animationEasing="ease-out">
              {areasAuditadas.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              <LabelList dataKey="qtd" position="right" fontSize={14} fill={C.label} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Chart>
      <Chart title="Ouvidoria — Manifestações por Natureza">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={ouvidoriaManifestacoes} layout="vertical" margin={{ top: 4, right: 40, bottom: 4, left: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={C.grid} horizontal={false} />
            <XAxis type="number" hide />
            <YAxis type="category" dataKey="tipo" stroke={C.axis} fontSize={11} tickLine={false} axisLine={false} width={90} />
            <Tooltip content={<CustomTooltip unit="manif." />} cursor={{ fill: "rgba(141,243,219,0.06)" }} />
            <Bar dataKey="qtd" radius={[0, 4, 4, 0]} animationDuration={1800} animationEasing="ease-out">
              {ouvidoriaManifestacoes.map((_, i) => <Cell key={i} fill={OUVIDORIA_COLORS[i % OUVIDORIA_COLORS.length]} />)}
              <LabelList dataKey="qtd" position="right" fontSize={12} fill={C.label} formatter={(v: number) => v.toLocaleString('pt-BR')} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Chart>
    </div>
    {/* Row 3: CGE Alerta */}
    <div className="grid grid-cols-1 gap-2 flex-1 min-h-[140px]">
      <Chart title="CGE Alerta — Redução de Alertas Sensíveis">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={cgeAlerta} margin={{ top: 14, right: 20, bottom: 4, left: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={C.grid} vertical={false} />
            <XAxis dataKey="tipo" stroke={C.axis} fontSize={12} tickLine={false} axisLine={false} />
            <YAxis hide />
            <Legend content={renderLegend} />
            <Tooltip content={<CustomTooltip unit="alertas" />} cursor={{ fill: "rgba(141,243,219,0.06)" }} />
            <Bar dataKey="inicial" name="Inicial" fill={C.red} radius={[3, 3, 0, 0]} animationDuration={1500}>
              <LabelList dataKey="inicial" position="top" fontSize={14} fill={C.label} />
            </Bar>
            <Bar dataKey="final" name="Final" fill={C.teal} radius={[3, 3, 0, 0]} animationDuration={1500} animationBegin={300}>
              <LabelList dataKey="final" position="top" fontSize={14} fill={C.label} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Chart>
    </div>
  </div>
);

/* ═══════════════════════════════════════════════════════════
   PANEL 6 — INTEGRIDADE & TRANSPARÊNCIA
   ═══════════════════════════════════════════════════════════ */
const PanelIntegridade = () => (
  <div className="flex flex-col gap-2 h-full overflow-hidden">
    {/* KPIs */}
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 flex-shrink-0">
      <KPI title="Planos Integridade" value="31" sub="órgãos com planos publicados" color={C.teal} delay={0} />
      <KPI title="Ações Monitoradas" value="491" sub="25 órgãos acompanhados" color={C.blue} delay={80} />
      <KPI title="Capacitações" value="64" sub="3.094 participações" color={C.green} delay={160} />
      <KPI title="TCACs Firmados" value="224" sub="acordos de ajustamento" color={C.yellow} delay={240} />
      <KPI title="Selo Transparência" value="Diamante" sub="95,28% — 3º ano consecutivo" color={C.purple} delay={320} />
      <KPI title="Acesso Informação" value="1.011" sub="pedidos | 74% concedidos" color={C.red} delay={400} />
    </div>
    {/* Row 1: Dosimetria + Capacitações */}
    <div className="grid grid-cols-2 gap-2 flex-1 min-h-[200px]">
      <Chart title="Dosimetria das Penas (%) — Evolução 2023-2025">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={dosimetriaPenas} margin={{ top: 14, right: 4, bottom: 4, left: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={C.grid} vertical={false} />
            <XAxis dataKey="opiniao" stroke={C.axis} fontSize={10} tickLine={false} axisLine={false} />
            <YAxis hide />
            <Legend content={renderLegend} />
            <Tooltip content={<CustomTooltip unit="%" />} cursor={{ fill: "rgba(141,243,219,0.06)" }} />
            <Bar dataKey="y2023" name="2023" fill={C.red} radius={[2, 2, 0, 0]} animationDuration={1500}>
              <LabelList dataKey="y2023" position="top" fontSize={9} fill={C.label} />
            </Bar>
            <Bar dataKey="y2024" name="2024" fill={C.yellow} radius={[2, 2, 0, 0]} animationDuration={1500} animationBegin={200}>
              <LabelList dataKey="y2024" position="top" fontSize={9} fill={C.label} />
            </Bar>
            <Bar dataKey="y2025" name="2025" fill={C.teal} radius={[2, 2, 0, 0]} animationDuration={1500} animationBegin={400}>
              <LabelList dataKey="y2025" position="top" fontSize={9} fill={C.label} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Chart>
      <Chart title="Capacitações por Área (participações)">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={capacitacoesCGE} layout="vertical" margin={{ top: 4, right: 40, bottom: 4, left: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={C.grid} horizontal={false} />
            <XAxis type="number" hide />
            <YAxis type="category" dataKey="area" stroke={C.axis} fontSize={11} tickLine={false} axisLine={false} width={110} />
            <Tooltip content={<CustomTooltip unit="participações" />} cursor={{ fill: "rgba(141,243,219,0.06)" }} />
            <Bar dataKey="participacoes" radius={[0, 4, 4, 0]} animationDuration={1800} animationEasing="ease-out">
              {capacitacoesCGE.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              <LabelList dataKey="participacoes" position="right" fontSize={14} fill={C.label} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Chart>
    </div>
    {/* Row 2: TCACs + Custos dos Serviços */}
    <div className="grid grid-cols-2 gap-2 flex-1 min-h-[200px]">
      <Chart title="TCACs por Órgão (acordos)">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={tcacs} margin={{ top: 14, right: 4, bottom: 4, left: -10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={C.grid} vertical={false} />
            <XAxis dataKey="orgao" stroke={C.axis} fontSize={14} tickLine={false} axisLine={false} />
            <YAxis hide />
            <Tooltip content={<CustomTooltip unit="acordos" />} cursor={{ fill: "rgba(141,243,219,0.06)" }} />
            <Bar dataKey="acordos" fill={C.blue} radius={[4, 4, 0, 0]} animationDuration={1500}>
              <LabelList dataKey="acordos" position="top" fontSize={16} fill={C.label} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Chart>
      <Chart title="Custos dos Serviços CGE (%)">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={custosServicos} cx="50%" cy="50%" innerRadius="20%" outerRadius="40%" paddingAngle={4} dataKey="percentual" nameKey="area" label={renderPieLabel} labelLine={false} animationDuration={2000}>
              {custosServicos.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
            </Pie>
            <Tooltip content={<PieTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </Chart>
    </div>
    {/* Row 3: Planejamento Estratégico — Previsto vs Realizado */}
    <div className="grid grid-cols-1 gap-2 flex-1 min-h-[140px]">
      <Chart title="Planejamento Estratégico 2025 — Previsto vs Realizado">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={planejamentoEstrategico} margin={{ top: 14, right: 20, bottom: 4, left: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={C.grid} vertical={false} />
            <XAxis dataKey="indicador" stroke={C.axis} fontSize={11} tickLine={false} axisLine={false} />
            <YAxis hide />
            <Legend content={renderLegend} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(141,243,219,0.06)" }} />
            <Bar dataKey="previsto" name="Previsto" fill={C.yellow} radius={[3, 3, 0, 0]} animationDuration={1500}>
              <LabelList dataKey="previsto" position="top" fontSize={12} fill={C.label} />
            </Bar>
            <Bar dataKey="realizado" name="Realizado" fill={C.teal} radius={[3, 3, 0, 0]} animationDuration={1500} animationBegin={300}>
              <LabelList dataKey="realizado" position="top" fontSize={12} fill={C.label} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Chart>
    </div>
  </div>
);

const panels = [PanelEconomia, PanelSocial, PanelAmbiental, PanelVisaoGeral, PanelControle, PanelIntegridade];
const panelLabels = ["P1", "P2", "P3", "P4", "P5", "P6"];

/* ─── Main ─── */
const SingleDashboard = () => {
  const { page } = useParams<{ page: string }>();
  const navigate = useNavigate();
  const idx = page ? Math.max(0, Math.min(parseInt(page) - 1, 5)) : 0;
  const active = isNaN(idx) ? 0 : idx;
  const ActivePanel = panels[active];

  const panelTitles = ["Economia", "Social", "Ambiental", "Economia", "Controle & Eficiência", "Integridade"];
  const panelTitleColors = ["#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff"];
  // Nível 1 = azul claro, Nível 3 = azul intenso (fundo do header)
  const panelHeaderBgs = ["#1e2405", "#1e2405", "#1e2405", "#1e2405", "#102041", "#102041"];

  const ROTATE_INTERVAL = 30; // seconds per panel
  const [now, setNow] = useState(new Date());
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let hasNavigated = false;

    const getElapsedInWindow = () => {
      const s = new Date().getSeconds();
      return ((s - 1 + 60) % 60) % 30;
    };

    const tick = () => {
      setNow(new Date());
      const elapsed = getElapsedInWindow();
      setProgress((elapsed / ROTATE_INTERVAL) * 100);
    };

    tick();

    const timer = setInterval(tick, 1000);

    const checkRotate = setInterval(() => {
      const s = new Date().getSeconds();
      if (s === 1 || s === 31) {
        if (!hasNavigated) {
          hasNavigated = true;
          const nextPage = ((active + 1) % panels.length) + 1;
          navigate(`/${nextPage}`, { replace: true });
        }
      } else {
        hasNavigated = false;
      }
    }, 500);

    return () => { clearInterval(timer); clearInterval(checkRotate); };
  }, [active, navigate]);

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
      <header className="flex-shrink-0 flex items-center justify-between px-3 sm:px-4 py-2 sm:py-3" style={{ borderBottom: '1px solid rgba(148,163,184,0.18)', background: panelHeaderBgs[active] }}>
        <img src={tituloImg} alt="Título" className="h-12 sm:h-[60px] object-contain" />
        <span className="text-[32px] sm:text-[36px] font-bold uppercase tracking-wider text-white" style={{ color: panelTitleColors[active] }}>{panelTitles[active]}</span>
      </header>
      {/* Reload progress bar */}
      <div className="flex-shrink-0 w-full h-[2px]" style={{ background: 'rgba(148,163,184,0.1)' }}>
        <div
          className="h-full transition-all duration-1000 ease-linear"
          style={{
            width: `${progress}%`,
            background: 'linear-gradient(90deg, #8df3db, #60a5fa)',
            boxShadow: '0 0 6px rgba(141,243,219,0.4)',
          }}
        />
      </div>
      {/* Panel */}
      <div className="flex-1 min-h-0 p-1.5 sm:p-2 overflow-hidden animate-fade-in">
        <ActivePanel />
      </div>
      {/* Footer with source + clock */}
       <footer className="flex-shrink-0 flex flex-col sm:flex-row items-center justify-between px-2 sm:px-3 py-1 sm:py-1.5 gap-0.5 sm:gap-0" style={{ borderTop: '1px solid rgba(148,163,184,0.18)', background: 'rgba(10,17,30,0.78)' }}>
         <span className="text-[16px] sm:text-[18px] font-semibold tabular-nums" style={{ color: '#60a5fa' }}>
           {formattedDate} — {formattedTime}
         </span>
         <a href="https://dados.mt.gov.br/" target="_blank" rel="noopener noreferrer" className="text-[16px] sm:text-[18px] transition-colors" style={{ color: '#8df3db' }}>
           Fonte: dados.mt.gov.br
         </a>
      </footer>
    </div>
  );
};

export default SingleDashboard;
