 import { useState, useEffect, useMemo } from "react";
 import { supabase } from "@/integrations/supabase/client";
import { useParams, useNavigate } from "react-router-dom";
import { BarChart3, TrendingUp, Users, Leaf, MapPin, Calendar, DollarSign, Ship, Briefcase, Plane, GraduationCap, Hospital, Home, Car, HeartPulse, Activity, TreePine, Flame, Mountain, ShieldCheck, Search, FileText, MessageSquare, Bell, Target, Shield, Eye, BookOpen, Handshake, Award, Mail, LucideIcon, HardHat, Camera, CircleDollarSign, CheckCircle2, ClipboardList, Layers, Compass } from "lucide-react";
import { obrasEstrategicasList, obrasExecucaoChart, obrasValorChart, obrasSummary } from "@/data/obrasData";
import BrazilMap from "@/components/dashboard/maps/BrazilMap";
import MTMap from "@/components/dashboard/maps/MTMap";
 import { beneficiosSummary, adjuntasRanking, macrofuncaoStats, topClassesBeneficio, dimensaoImpacto, naturezaBeneficios, unidadesDetalhadas } from "@/data/beneficiosControleData";
 import { liquidacoesSummary, liquidacoesUnidades, liquidacoesEvolucaoMensal, liquidacoesAlinhamento, liquidacoesFuncaoGoverno, topCredores } from "@/data/liquidacoesData";
import { ptaSummary, orcamentoFuncao, categoriaEconomica, topSubfuncoes, orcamentoUO, modalidadeAplicacao, pacoteDespesa, elementoDespesa, ticInvestimento, radarOrcamento, composicaoFuncao } from "@/data/ptaData";
import { Landmark, Building2, Receipt, Wallet, PiggyBank, BadgeDollarSign } from "lucide-react";
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
  mortalidadeInfantilBrasil, mortalidadeInfantilMT, alfabetizacaoBrasil, alfabetizacaoMT,
} from "@/data/mockData";
 /* ═══════════════════════════════════════════════════════════
    PANEL 14 — MORTALIDADE INFANTIL BRASIL
    ═══════════════════════════════════════════════════════════ */
  const PanelMortalidadeBR = () => {
    const [apiData, setApiData] = useState<any[]>([]);
    
    useEffect(() => {
      supabase
        .from('external_api_data')
        .select('payload')
        .eq('endpoint', 'mortalidade')
        .single()
        .then(({ data }) => {
          const payload = data?.payload as any;
          if (payload && Array.isArray(payload.brasil)) {
            setApiData(payload.brasil);
          }
        });
    }, []);

    const currentData = apiData.length > 0 ? apiData : mortalidadeInfantilBrasil;
    const top10 = [...currentData].sort((a, b) => a.value - b.value).slice(0, 10);
    const scatterData = currentData.map(d => ({
      name: d.state,
      taxa: d.value,
      pop: populationData.find(p => p.city.includes(d.state))?.population || Math.random() * 10000000 + 1000000,
    }));

    return (
      <div className="flex flex-col gap-2 h-full overflow-hidden">
        <div className="grid grid-cols-4 gap-2 flex-shrink-0">
          <KPI title="Média Nacional" value="11.9" sub="por 1000 nascidos" color={C.red} delay={0} icon={Activity} />
          <KPI title="Melhor Estado" value="9.2" sub="Distrito Federal" color={C.green} delay={120} icon={Target} />
          <KPI title="Mato Grosso" value="12.1" sub="Ranking 14º" color={C.blue} delay={240} icon={MapPin} />
          <KPI title="Meta ODS" value="< 12.0" sub="até 2030" color={C.teal} delay={360} icon={TrendingUp} />
        </div>
        <div className="flex-1 min-h-0 overflow-hidden animate-in fade-in zoom-in-95 duration-1000 fill-mode-forwards">
          <Chart title="Mapa de Calor - Mortalidade Inf. por Estado">
            <BrazilMap data={currentData} title="Mortalidade Inf. BR" colorScale={["#f87171", "#86efac"]} unit="" isLowerBetter={true} />
          </Chart>
        </div>
        <div className="flex flex-col gap-3 h-[720px] flex-shrink-0 animate-in fade-in slide-in-from-bottom-8 duration-1000 fill-mode-forwards">
          <Chart title="Correlação: Taxa vs População Estimada">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={scatterData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={C.grid} vertical={false} />
                <XAxis dataKey="name" stroke={C.axis} fontSize={9} />
                <YAxis yAxisId="left" stroke={C.red} fontSize={9} />
                <YAxis yAxisId="right" orientation="right" stroke={C.blue} fontSize={9} />
                <Tooltip content={<CustomTooltip />} />
                <Legend verticalAlign="top" height={36} />
                <Line yAxisId="left" type="monotone" dataKey="taxa" stroke={C.red} dot={{ r: 3 }} name="Taxa" />
                <Area yAxisId="right" type="monotone" dataKey="pop" fill={C.blue} stroke="none" opacity={0.1} name="População" />
              </LineChart>
            </ResponsiveContainer>
          </Chart>
          <Chart title="Top 10 Estados (Menor Taxa)">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={top10} layout="vertical" margin={{ top: 5, right: 30, bottom: 0, left: -10 }}>
                <XAxis type="number" hide />
                <YAxis type="category" dataKey="state" stroke={C.axis} fontSize={10} tickLine={false} axisLine={false} width={35} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="value" name="Taxa" radius={[0, 2, 2, 0]}>
                  {top10.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={TOP_COLORS[index % TOP_COLORS.length]} />
                  ))}
                  <LabelList dataKey="value" position="right" fontSize={10} fill={C.label} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Chart>
        </div>
      </div>
    );
  };
 
  /* ═══════════════════════════════════════════════════════════
     PANEL 15 — MORTALIDADE INFANTIL MT
     ═══════════════════════════════════════════════════════════ */
  const PanelMortalidadeMT_Dashboard = () => {
    const [apiData, setApiData] = useState<any[]>([]);
    
    useEffect(() => {
      supabase
        .from('external_api_data')
        .select('payload')
        .eq('endpoint', 'mortalidade')
        .single()
        .then(({ data }) => {
          const payload = data?.payload as any;
          if (payload && Array.isArray(payload.mt)) {
            setApiData(payload.mt);
          }
        });
    }, []);

    const currentData = useMemo(() => {
      return apiData.length > 0 ? apiData : mortalidadeInfantilMT;
    }, [apiData]);
    
    const top20Piores = useMemo(() => {
      return [...currentData].sort((a, b) => b.value - a.value).slice(0, 20);
    }, [currentData]);

    // Generate gradient colors for top 20 piores: from pure red (#ff0000) to soft red (#F17874)
    const pioresColors = useMemo(() => {
      const start = { r: 255, g: 0, b: 0 };
      const end = { r: 241, g: 120, b: 116 };
      return Array.from({ length: 20 }, (_, i) => {
        const ratio = i / 19;
        const r = Math.round(start.r + (end.r - start.r) * ratio);
        const g = Math.round(start.g + (end.g - start.g) * ratio);
        const b = Math.round(start.b + (end.b - start.b) * ratio);
        return `rgb(${r}, ${g}, ${b})`;
      });
    }, []);

    const top10Melhores = useMemo(() => {
      return [...currentData].sort((a, b) => a.value - b.value).slice(0, 10);
    }, [currentData]);

    return (
      <div className="flex flex-col gap-2 h-full overflow-hidden">
        <div className="grid grid-cols-4 gap-2 flex-shrink-0">
          <KPI title="Média Estadual" value="12.1" sub="por 1000 nascidos" color={C.red} delay={0} icon={Activity} />
          <KPI title="Melhor Município" value="10.2" sub="Lucas do Rio Verde" color={C.green} delay={120} icon={Target} />
          <KPI title="Cuiabá" value="11.5" sub="Capital" color={C.blue} delay={240} icon={Building2} />
          <KPI title="Redução" value="-2.4%" sub="em relação a 2023" color={C.teal} delay={360} icon={TrendingUp} />
        </div>
        <div className="flex-1 min-h-0 overflow-hidden animate-in fade-in zoom-in-95 duration-1000 fill-mode-forwards">
          <Chart title="Mapa de Calor - Mortalidade Inf. por Município (MT)">
            <MTMap data={currentData} title="Mortalidade Inf. MT" colorScale={["#f87171", "#86efac"]} unit="" isLowerBetter={true} />
          </Chart>
        </div>
        <div className="flex flex-col gap-3 h-[720px] flex-shrink-0 animate-in fade-in slide-in-from-bottom-8 duration-1000 fill-mode-forwards">
          <Chart title="Top 20 Municípios (Maior Taxa - Piores)">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={top20Piores} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={C.grid} vertical={false} />
                <XAxis dataKey="city" stroke={C.axis} fontSize={8} tick={WrappedYAxisTick} />
                <YAxis fontSize={9} stroke={C.axis} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="value" name="Taxa" radius={[2, 2, 0, 0]}>
                  {top20Piores.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={pioresColors[index]} />
                  ))}
                  <LabelList dataKey="value" position="top" fontSize={10} fill={C.label} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Chart>
          <Chart title="Top 10 Municípios (Menor Taxa - Melhores)">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={top10Melhores} layout="vertical" margin={{ top: 5, right: 30, bottom: 0, left: -5 }}>
                <XAxis type="number" hide />
                <YAxis type="category" dataKey="city" stroke={C.axis} fontSize={9} tickLine={false} axisLine={false} width={85} tick={WrappedYAxisTick} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="value" name="Taxa" radius={[0, 2, 2, 0]}>
                  {top10Melhores.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={TOP_COLORS[index % TOP_COLORS.length]} />
                  ))}
                  <LabelList dataKey="value" position="right" fontSize={10} fill={C.label} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Chart>
        </div>
      </div>
    );
  };
 
 /* ═══════════════════════════════════════════════════════════
    PANEL 16 — ALFABETIZAÇÃO BRASIL
    ═══════════════════════════════════════════════════════════ */
  const PanelAlfabetizacaoBR = () => {
    const [apiData, setApiData] = useState<any[]>([]);
    
    useEffect(() => {
      supabase
        .from('external_api_data')
        .select('payload')
        .eq('endpoint', 'alfabetizacao')
        .single()
        .then(({ data }) => {
          const payload = data?.payload as any;
          if (payload && Array.isArray(payload.brasil)) {
            setApiData(payload.brasil);
          }
        });
    }, []);

    const currentData = apiData.length > 0 ? apiData : alfabetizacaoBrasil;
    const top10 = [...currentData].sort((a, b) => b.value - a.value).slice(0, 10);
    const correlationData = currentData.map(d => ({
      name: d.state,
      taxa: d.value,
      pop: populationData.find(p => p.city.includes(d.state))?.population || 2000000 + Math.random() * 10000000,
    }));

    return (
      <div className="flex flex-col gap-2 h-full overflow-hidden">
        <div className="grid grid-cols-4 gap-2 flex-shrink-0">
          <KPI title="Média Nacional" value="93.0%" sub="população 15+" color={C.teal} delay={0} icon={BookOpen} />
          <KPI title="Melhor Estado" value="97.8%" sub="SC / DF" color={C.green} delay={120} icon={Award} />
          <KPI title="Mato Grosso" value="94.5%" sub="Ranking 12º" color={C.blue} delay={240} icon={GraduationCap} />
          <KPI title="Meta PNE" value="100%" sub="Erradicar Analfabetismo" color={C.purple} delay={360} icon={Target} />
        </div>
        <div className="flex-1 min-h-0 overflow-hidden animate-in fade-in zoom-in-95 duration-1000 fill-mode-forwards">
          <Chart title="Mapa de Calor - Alfabetização por Estado">
            <BrazilMap data={currentData} title="Alfabetização BR" colorScale={["#f87171", "#86efac"]} unit="%" isLowerBetter={false} />
          </Chart>
        </div>
        <div className="flex flex-col gap-3 h-[720px] flex-shrink-0 animate-in fade-in slide-in-from-bottom-8 duration-1000 fill-mode-forwards">
          <Chart title="Alfabetização vs Volume Populacional">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={correlationData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={C.grid} vertical={false} />
                <XAxis dataKey="name" stroke={C.axis} fontSize={8} />
                <YAxis fontSize={9} stroke={C.axis} />
                <Tooltip content={<CustomTooltip unit="%" />} />
                <Legend verticalAlign="top" height={36} />
                <Area type="monotone" dataKey="taxa" stroke={C.teal} fill={C.teal} fillOpacity={0.2} name="Taxa %" />
              </AreaChart>
            </ResponsiveContainer>
          </Chart>
          <Chart title="Top 10 Estados (Maior Taxa)">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={top10} layout="vertical" margin={{ top: 5, right: 35, bottom: 0, left: -10 }}>
                <XAxis type="number" hide />
                <YAxis type="category" dataKey="state" stroke={C.axis} fontSize={10} tickLine={false} axisLine={false} width={35} />
                <Tooltip content={<CustomTooltip unit="%" />} />
                <Bar dataKey="value" name="Taxa" radius={[0, 2, 2, 0]}>
                  {top10.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={TOP_COLORS[index % TOP_COLORS.length]} />
                  ))}
                  <LabelList dataKey="value" position="right" fontSize={10} fill={C.label} formatter={(v: number) => `${v}%`} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Chart>
        </div>
      </div>
    );
  };
 
  /* ═══════════════════════════════════════════════════════════
     PANEL 17 — ALFABETIZAÇÃO MT
     ═══════════════════════════════════════════════════════════ */
  const PanelAlfabetizacaoMT = () => {
    const [apiData, setApiData] = useState<any[]>([]);
    
    useEffect(() => {
      supabase
        .from('external_api_data')
        .select('payload')
        .eq('endpoint', 'alfabetizacao')
        .single()
        .then(({ data }) => {
          const payload = data?.payload as any;
          if (payload && Array.isArray(payload.mt)) {
            setApiData(payload.mt);
          }
        });
    }, []);

    const currentData = useMemo(() => {
      return apiData.length > 0 ? apiData : alfabetizacaoMT;
    }, [apiData]);
    
    const top10 = useMemo(() => {
      return [...currentData].sort((a, b) => b.value - a.value).slice(0, 10);
    }, [currentData]);
    
    const correlationData = useMemo(() => {
      return currentData.map(d => ({
      name: d.city,
      taxa: d.value,
      pop: populationData.find(p => p.city === d.city)?.population || 30000 + Math.random() * 80000,
      }));
    }, [currentData]);

    return (
      <div className="flex flex-col gap-2 h-full overflow-hidden">
        <div className="grid grid-cols-4 gap-2 flex-shrink-0">
          <KPI title="Média Estadual" value="94.5%" sub="população 15+" color={C.teal} delay={0} icon={BookOpen} />
          <KPI title="Melhor Município" value="96.8%" sub="Lucas do Rio Verde" color={C.green} delay={120} icon={Award} />
          <KPI title="Cuiabá" value="96.5%" sub="Capital" color={C.blue} delay={240} icon={GraduationCap} />
          <KPI title="Evolução" value="+1.2%" sub="em relação a 2022" color={C.purple} delay={360} icon={TrendingUp} />
        </div>
        <div className="flex-1 min-h-0 overflow-hidden animate-in fade-in zoom-in-95 duration-1000 fill-mode-forwards">
           <Chart title="Mapa de Calor - Alfabetização por Município (MT)">
            <MTMap data={currentData} title="Alfabetização MT" colorScale={["#f87171", "#86efac"]} unit="%" isLowerBetter={false} />
          </Chart>
        </div>
        <div className="flex flex-col gap-3 h-[720px] flex-shrink-0 animate-in fade-in slide-in-from-bottom-8 duration-1000 fill-mode-forwards">
          <Chart title="Índice Proporcional (Alfabetização vs População)">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={correlationData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={C.grid} vertical={false} />
                <XAxis dataKey="name" stroke={C.axis} fontSize={8} tick={WrappedYAxisTick} />
                <YAxis fontSize={9} stroke={C.axis} />
                <Tooltip content={<CustomTooltip unit="%" />} />
                <Legend verticalAlign="top" height={36} />
                <Bar dataKey="taxa" name="Taxa %" fill={C.teal} radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Chart>
          <Chart title="Top 10 Municípios (Maior Taxa)">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={top10} layout="vertical" margin={{ top: 5, right: 35, bottom: 0, left: -5 }}>
                <XAxis type="number" hide />
                <YAxis type="category" dataKey="city" stroke={C.axis} fontSize={9} tickLine={false} axisLine={false} width={85} tick={WrappedYAxisTick} />
                <Tooltip content={<CustomTooltip unit="%" />} />
                <Bar dataKey="value" name="Taxa" radius={[0, 2, 2, 0]}>
                  {top10.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={TOP_COLORS[index % TOP_COLORS.length]} />
                  ))}
                  <LabelList dataKey="value" position="right" fontSize={10} fill={C.label} formatter={(v: number) => `${v}%`} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Chart>
        </div>
      </div>
    );
  };
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

const TOP_COLORS = [
  "#166534", // 1º (Mais escura)
  "#237441",
  "#30834E",
  "#3D925B",
  "#4AA168",
  "#57B075",
  "#64BF82",
  "#71CE8F",
  "#7EDD9C",
  "#8AEAAA", // 10º (Mais clara)
];
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
  // Show all labels regardless of percentage
  // if ((percent || value / 100) < 0.05) return null;
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

const wrapAxisLabel = (value: string, maxCharsPerLine = 11) => {
  const words = value.split(/\s+/).filter(Boolean);
  const lines: string[] = [];

  words.forEach((word) => {
    const currentLine = lines[lines.length - 1];

    if (!currentLine) {
      lines.push(word);
      return;
    }

    if (`${currentLine} ${word}`.length <= maxCharsPerLine) {
      lines[lines.length - 1] = `${currentLine} ${word}`;
      return;
    }

    lines.push(word);
  });

  const visibleLines = lines.slice(0, 2);

  if (lines.length > 2) {
    visibleLines[visibleLines.length - 1] = `${visibleLines[visibleLines.length - 1]}…`;
  }

  return visibleLines;
};

const WrappedYAxisTick = ({ x, y, payload }: any) => {
  const lines = wrapAxisLabel(String(payload?.value ?? ""));

  return (
    <text x={x - 6} y={y} fill={C.axis} textAnchor="end" fontSize={10} dominantBaseline="middle">
      {lines.map((line, index) => (
        <tspan key={`${payload?.value}-${index}`} x={x - 6} dy={index === 0 ? -(lines.length - 1) * 6 : 12}>
          {line}
        </tspan>
      ))}
    </text>
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

const KPI = ({ title, value, sub, color = C.teal, delay = 0, icon: Icon }: { title: string; value: string; sub: string; color?: string; delay?: number; icon?: LucideIcon }) => (
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
     {Icon && <Icon className="absolute right-3 top-3 opacity-[0.35] group-hover:opacity-[0.5] transition-opacity duration-300" size={38} color="#ffffff" strokeWidth={1.5} />}
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
      <KPI title="Superávit" value={`US$ ${lastTrade.superavit} bi`} sub="4T 2025" color={C.teal} delay={0} icon={DollarSign} />
      <KPI title="Export. Principal" value="Soja 31%" sub="do total" color={C.green} delay={120} icon={Ship} />
      <KPI title="Emprego" value={`${lastWork.emprego}%`} sub={`Renda R$ ${lastWork.renda}`} color={C.blue} delay={240} icon={Briefcase} />
      <KPI title="Turismo" value={turismoData.visitantesAnuais} sub={`Receita ${turismoData.receitaTurismo}`} color={C.yellow} delay={360} icon={Plane} />
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
            <Line type="monotone" dataKey="exportacao" name="Exportação" stroke={C.teal} strokeWidth={2} dot={false} animationDuration={1500} animationEasing="ease-in-out">
              <LabelList dataKey="exportacao" position="top" fontSize={9} fill={C.label} content={({ x, y, value, index }: any) => index % 2 === 0 ? <text x={x} y={y - 6} textAnchor="middle" fontSize={9} fill={C.label}>{value}</text> : null} />
            </Line>
            <Line type="monotone" dataKey="importacao" name="Importação" stroke={C.yellow} strokeWidth={2} dot={false} animationDuration={1500} animationBegin={300} animationEasing="ease-in-out">
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
            <Pie data={principaisDestinos} cx="50%" cy="50%" innerRadius="20%" outerRadius="45%" paddingAngle={2} dataKey="percentual" nameKey="pais" label={renderPieLabel} labelLine={false} animationDuration={1500} animationEasing="ease-in-out">
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
            <Bar dataKey="producao" radius={[0, 3, 3, 0]} animationDuration={1500} animationEasing="ease-in-out">
              {producaoAgricola.map((entry, index) => (
                <Cell key={index} fill={entry.fill} />
              ))}
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
            <Bar dataKey="agropecuaria" name="Agro" fill={C.green} radius={[2, 2, 0, 0]} animationDuration={1500} animationEasing="ease-in-out">
              <LabelList dataKey="agropecuaria" position="top" fontSize={8} fill={C.label} />
            </Bar>
            <Bar dataKey="industria" name="Indústria" fill={C.blue} radius={[2, 2, 0, 0]} animationDuration={1500} animationBegin={300} animationEasing="ease-in-out">
              <LabelList dataKey="industria" position="top" fontSize={8} fill={C.label} />
            </Bar>
            <Bar dataKey="servicos" name="Serviços" fill={C.purple} radius={[2, 2, 0, 0]} animationDuration={1500} animationBegin={300} animationEasing="ease-in-out">
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
            <Bar dataKey="bovino" name="Bovino" fill={C.red} radius={[2, 2, 0, 0]} animationDuration={1500} animationEasing="ease-in-out">
              <LabelList dataKey="bovino" position="top" fontSize={8} fill={C.label} />
            </Bar>
            <Bar dataKey="suino" name="Suíno" fill={C.yellow} radius={[2, 2, 0, 0]} animationDuration={1500} animationBegin={300} animationEasing="ease-in-out">
              <LabelList dataKey="suino" position="top" fontSize={8} fill={C.label} />
            </Bar>
            <Bar dataKey="aves" name="Aves" fill={C.blue} radius={[2, 2, 0, 0]} animationDuration={1500} animationBegin={300} animationEasing="ease-in-out">
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
            <Area type="monotone" dataKey="variacao" stroke={C.purple} fill="url(#cind)" strokeWidth={2} animationDuration={1500} animationEasing="ease-in-out">
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
      <KPI title="IDEB 2023" value={lastEdu.ideb.toString()} sub={`${lastEdu.matriculas.toLocaleString()} matrículas`} color={C.teal} delay={0} icon={GraduationCap} />
      <KPI title="Leitos Hosp." value={saudeData.leitos.toLocaleString()} sub={`${saudeData.leitosUTI} UTI`} color={C.red} delay={80} icon={Hospital} />
      <KPI title="Déf. Habitacional" value={deficitHabitacional.totalFamilias.toLocaleString()} sub={`${deficitHabitacional.percentualEstadual}`} color={C.yellow} delay={160} icon={Home} />
      <KPI title="Frota Veicular" value={`${(transitoData[transitoData.length - 1].frota / 1e6).toFixed(1)} mi`} sub={`${transitoData[transitoData.length - 1].acidentes.toLocaleString()} acid.`} color={C.blue} delay={240} icon={Car} />
      <KPI title="Cobertura SUS" value={saudeData.coberturaSUS} sub="pop. coberta" color={C.green} delay={320} icon={HeartPulse} />
      <KPI title="ICQV Médio" value={(icqvData.reduce((a, b) => a + b.icqv, 0) / icqvData.length).toFixed(2)} sub="índice estadual" color={C.purple} delay={400} icon={Activity} />
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
            <Bar dataKey="value" name="Índice" radius={[0, 4, 4, 0]} animationDuration={1500} animationEasing="ease-in-out">
              {[...radarAvg].sort((a, b) => b.value - a.value).map((_, i) => <Cell key={i} fill={TOP_COLORS[i % TOP_COLORS.length]} />)}
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
            <Bar dataKey="saude" name="Saúde" radius={[0, 2, 2, 0]} animationDuration={1500} animationEasing="ease-in-out">
              {icqvData.map((_, i) => <Cell key={i} fill={TOP_COLORS[i % TOP_COLORS.length]} />)}
              <LabelList dataKey="saude" position="right" fontSize={8} fill={C.label} />
            </Bar>
            <Bar dataKey="educacao" name="Educação" radius={[0, 2, 2, 0]} animationDuration={1500} animationBegin={300} animationEasing="ease-in-out">
              {icqvData.map((_, i) => <Cell key={i} fill={TOP_COLORS[(i + 1) % TOP_COLORS.length]} />)}
              <LabelList dataKey="educacao" position="right" fontSize={8} fill={C.label} />
            </Bar>
            <Bar dataKey="economia" name="Economia" radius={[0, 2, 2, 0]} animationDuration={1500} animationBegin={300} animationEasing="ease-in-out">
              {icqvData.map((_, i) => <Cell key={i} fill={TOP_COLORS[(i + 2) % TOP_COLORS.length]} />)}
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
            <Line type="monotone" dataKey="ideb" stroke={C.teal} strokeWidth={2} dot={{ r: 3, fill: C.teal }} animationDuration={1500} animationEasing="ease-in-out">
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
            <Line type="monotone" dataKey="infantil" name="Infantil" stroke={C.yellow} strokeWidth={2} dot={{ r: 3 }} animationDuration={1500} animationEasing="ease-in-out">
              <LabelList dataKey="infantil" position="top" offset={8} fontSize={10} fill={C.label} />
            </Line>
            <Line type="monotone" dataKey="geral" name="Geral" stroke={C.blue} strokeWidth={2} dot={{ r: 3 }} animationDuration={1500} animationBegin={300} animationEasing="ease-in-out">
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
            <Bar dataKey="ocorrencias" name="Ocorrências" fill={C.blue} radius={[3, 3, 0, 0]} animationDuration={1500} animationEasing="ease-in-out">
              <LabelList dataKey="ocorrencias" position="top" fontSize={14} fill={C.label} formatter={(v: number) => `${(v / 1000).toFixed(1)}k`} />
            </Bar>
            <Bar dataKey="homicidios" name="Homicídios" fill={C.red} radius={[3, 3, 0, 0]} animationDuration={1500} animationBegin={300} animationEasing="ease-in-out">
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
            <Area type="monotone" dataKey="acidentes" stroke={C.yellow} fill="url(#cfrota)" strokeWidth={2} animationDuration={1500} animationEasing="ease-in-out">
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
            <Bar dataKey="registros" name="Registros" fill={C.red} radius={[3, 3, 0, 0]} animationDuration={1500} animationEasing="ease-in-out">
              <LabelList dataKey="registros" position="top" fontSize={9} fill={C.label} formatter={(v: number) => `${(v / 1000).toFixed(1)}k`} />
            </Bar>
            <Bar dataKey="medidas" name="Medidas Protetivas" fill={C.teal} radius={[3, 3, 0, 0]} animationDuration={1500} animationBegin={300} animationEasing="ease-in-out">
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
      <KPI title="Vegetação Preservada" value={`${vegetacaoNativa.vegetacaoPreservada}%`} sub={`${(vegetacaoNativa.areaProtegida / 1000).toFixed(0)} mil km² protegidos`} color={C.green} delay={0} icon={TreePine} />
      <KPI title="Desmatamento Anual" value={`${lastDesm.area} km²`} sub={`-10,2% vs 2022 — ${lastDesm.alertas} alertas`} color={C.red} delay={120} icon={Leaf} />
      <KPI title="Mineração" value={mineracaoData.producaoOuro} sub={`Fatur. ${mineracaoData.faturamento}`} color={C.yellow} delay={240} icon={Mountain} />
      <KPI title="Focos Incêndio" value={focosIncendio.reduce((a, b) => a + b.focos, 0).toLocaleString()} sub="Total anual" color={C.red} delay={360} icon={Flame} />
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
            <Bar dataKey="area" name="Área (km²)" fill={C.red} radius={[3, 3, 0, 0]} animationDuration={1500} animationEasing="ease-in-out">
              <LabelList dataKey="area" position="top" fontSize={14} fill={C.label} />
            </Bar>
            <Bar dataKey="alertas" name="Alertas" fill={C.yellow} radius={[3, 3, 0, 0]} animationDuration={1500} animationBegin={300} animationEasing="ease-in-out">
              <LabelList dataKey="alertas" position="top" fontSize={12} fill={C.label} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Chart>
      <Chart title="Biomas de MT">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={biomaData} cx="50%" cy="50%" innerRadius="25%" outerRadius="50%" paddingAngle={3} dataKey="percentual" nameKey="name" label={renderPieLabel} labelLine={false} animationDuration={1500} animationEasing="ease-in-out">
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
            <Area type="monotone" dataKey="iqa" stroke={C.yellow} fill="url(#ciqa)" strokeWidth={2} animationDuration={1500} animationEasing="ease-in-out">
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
            <Area type="monotone" dataKey="focos" stroke={C.red} fill="url(#cfogo)" strokeWidth={2} animationDuration={1500} animationEasing="ease-in-out">
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
            <Bar dataKey="area" fill={C.green} radius={[0, 3, 3, 0]} animationDuration={1500} animationEasing="ease-in-out">
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
            <Bar dataKey="residencial" name="Resid." fill={C.blue} radius={[2, 2, 0, 0]} animationDuration={1500} animationEasing="ease-in-out">
              <LabelList dataKey="residencial" position="top" fontSize={8} fill={C.label} />
            </Bar>
            <Bar dataKey="industrial" name="Indust." fill={C.purple} radius={[2, 2, 0, 0]} animationDuration={1500} animationBegin={300} animationEasing="ease-in-out">
              <LabelList dataKey="industrial" position="top" fontSize={8} fill={C.label} />
            </Bar>
            <Bar dataKey="rural" name="Rural" fill={C.green} radius={[2, 2, 0, 0]} animationDuration={1500} animationBegin={300} animationEasing="ease-in-out">
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
      <KPI title="PIB Estadual" value={overviewKPIs.pibTotal} sub={`${overviewKPIs.pibRanking} — ${overviewKPIs.pibParticipacao} do Brasil`} color={C.teal} delay={0} icon={TrendingUp} />
      <KPI title="PIB per Capita" value={overviewKPIs.pibPerCapita} sub={overviewKPIs.pibPerCapitaRanking} color={C.purple} delay={120} icon={DollarSign} />
      <KPI title="Crescimento" value={overviewKPIs.crescimentoMedio} sub={overviewKPIs.crescimentoPeriodo} color={C.blue} delay={240} icon={BarChart3} />
      <KPI title="População" value="3,7 mi" sub="Censo 2022" color={C.green} delay={360} icon={Users} />
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
              <Area type="monotone" dataKey="pib" stroke={C.teal} fill="url(#cpib)" strokeWidth={2} animationDuration={1500} animationEasing="ease-in-out">
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
              <Line type="monotone" dataKey="crescimento" stroke={C.yellow} strokeWidth={2} dot={{ r: 3, fill: C.yellow }} animationDuration={1500} animationEasing="ease-in-out">
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
            <Pie data={sectorPieData} cx="50%" cy="50%" innerRadius="30%" outerRadius="55%" paddingAngle={3} dataKey="value" label={renderPieLabel} labelLine={false} animationDuration={1500} animationEasing="ease-in-out">
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
             <Bar dataKey="valor" fill={C.purple} radius={[0, 3, 3, 0]} animationDuration={1500} animationEasing="ease-in-out">
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
            <Bar dataKey="pibMunicipal" radius={[3, 3, 0, 0]} animationDuration={1500} animationEasing="ease-in-out">
              {populationData.map((entry, index) => (
                <Cell key={index} fill={entry.fill} />
              ))}
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
            <Bar dataKey="investimento" radius={[3, 3, 0, 0]} animationDuration={1500} animationEasing="ease-in-out">
              {investimentoInfra.map((entry, index) => (
                <Cell key={index} fill={entry.fill} />
              ))}
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
      <KPI title="Benefício Financeiro" value="R$ 940,7 mi" sub="214 benefícios validados" color={C.teal} delay={0} icon={DollarSign} />
      <KPI title="Produtos Auditoria" value="703" sub="622 controle + 81 auditoria" color={C.blue} delay={80} icon={Search} />
      <KPI title="Aderência Recom." value="86,11%" sub="779 trabalhos monitorados" color={C.green} delay={160} icon={Target} />
      <KPI title="Ouvidoria" value="21.472" sub="manifestações | 94% no prazo" color={C.yellow} delay={240} icon={MessageSquare} />
      <KPI title="CGE Alerta" value="147.397" sub="alertas gerados em 12 categ." color={C.red} delay={320} icon={Bell} />
      <KPI title="Meta Superada" value="300%" sub="benef. financeiro vs meta" color={C.purple} delay={400} icon={Award} />
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
            <Bar dataKey="valor" radius={[0, 4, 4, 0]} animationDuration={1500} animationEasing="ease-in-out">
              {beneficiosFinanceiros.map((entry, index) => (
                <Cell key={index} fill={entry.fill} />
              ))}
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
            <Line type="monotone" dataKey="aderencia" name="Aderência" stroke={C.teal} strokeWidth={2} dot={{ r: 3 }} animationDuration={1500}>
              <LabelList dataKey="aderencia" position="top" fontSize={11} fill={C.label} />
            </Line>
            <Line type="monotone" dataKey="implementacao" name="Implementação" stroke={C.blue} strokeWidth={2} dot={{ r: 3 }} animationDuration={1500} animationBegin={300}>
              <LabelList dataKey="implementacao" position="bottom" fontSize={11} fill={C.label} />
            </Line>
          </LineChart>
        </ResponsiveContainer>
      </Chart>
    </div>
    {/* Row 2: Áreas Auditadas + Ouvidoria */}
    <div className="grid min-w-0 grid-cols-2 gap-2 flex-1 min-h-[200px]">
      <Chart title="Ranking Áreas Auditadas">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={areasAuditadas} layout="vertical" margin={{ top: 4, right: 26, bottom: 4, left: 2 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={C.grid} horizontal={false} />
            <XAxis type="number" hide />
            <YAxis type="category" dataKey="area" stroke={C.axis} fontSize={10} tickLine={false} axisLine={false} width={88} interval={0} tick={<WrappedYAxisTick />} />
            <Tooltip content={<CustomTooltip unit="auditorias" />} cursor={{ fill: "rgba(141,243,219,0.06)" }} />
            <Bar dataKey="qtd" radius={[0, 4, 4, 0]} animationDuration={1500} animationEasing="ease-in-out">
              {areasAuditadas.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              <LabelList dataKey="qtd" position="right" fontSize={11} fill={C.label} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Chart>
      <Chart title="Ouvidoria — Manifestações por Natureza">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={ouvidoriaManifestacoes} layout="vertical" margin={{ top: 4, right: 32, bottom: 4, left: 2 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={C.grid} horizontal={false} />
            <XAxis type="number" hide />
            <YAxis type="category" dataKey="tipo" stroke={C.axis} fontSize={10} tickLine={false} axisLine={false} width={78} interval={0} tick={<WrappedYAxisTick />} />
            <Tooltip content={<CustomTooltip unit="manif." />} cursor={{ fill: "rgba(141,243,219,0.06)" }} />
            <Bar dataKey="qtd" radius={[0, 4, 4, 0]} animationDuration={1500} animationEasing="ease-in-out">
              {ouvidoriaManifestacoes.map((_, i) => <Cell key={i} fill={OUVIDORIA_COLORS[i % OUVIDORIA_COLORS.length]} />)}
              <LabelList dataKey="qtd" position="right" fontSize={10} fill={C.label} formatter={(v: number) => v.toLocaleString('pt-BR')} />
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
      <KPI title="Planos Integridade" value="31" sub="órgãos com planos publicados" color={C.teal} delay={0} icon={Shield} />
      <KPI title="Ações Monitoradas" value="491" sub="25 órgãos acompanhados" color={C.blue} delay={80} icon={Eye} />
      <KPI title="Capacitações" value="64" sub="3.094 participações" color={C.green} delay={160} icon={BookOpen} />
      <KPI title="TCACs Firmados" value="224" sub="acordos de ajustamento" color={C.yellow} delay={240} icon={Handshake} />
      <KPI title="Selo Transparência" value="Diamante" sub="95,28% — 3º ano consecutivo" color={C.purple} delay={320} icon={Award} />
      <KPI title="Acesso Informação" value="1.011" sub="pedidos | 74% concedidos" color={C.red} delay={400} icon={Mail} />
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
            <Bar dataKey="y2024" name="2024" fill={C.yellow} radius={[2, 2, 0, 0]} animationDuration={1500} animationBegin={300}>
              <LabelList dataKey="y2024" position="top" fontSize={9} fill={C.label} />
            </Bar>
            <Bar dataKey="y2025" name="2025" fill={C.teal} radius={[2, 2, 0, 0]} animationDuration={1500} animationBegin={300}>
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
            <Bar dataKey="participacoes" radius={[0, 4, 4, 0]} animationDuration={1500} animationEasing="ease-in-out">
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
            <Bar dataKey="acordos" radius={[4, 4, 0, 0]} animationDuration={1500}>
              {tcacs.map((entry, index) => (
                <Cell key={index} fill={entry.fill} />
              ))}
              <LabelList dataKey="acordos" position="top" fontSize={16} fill={C.label} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Chart>
      <Chart title="Custos dos Serviços CGE (%)">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={custosServicos} cx="50%" cy="50%" innerRadius="20%" outerRadius="40%" paddingAngle={4} dataKey="percentual" nameKey="area" label={renderPieLabel} labelLine={false} animationDuration={1500}>
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

/* ═══════════════════════════════════════════════════════════
   PANEL 7 — OBRAS ESTRATÉGICAS
   ═══════════════════════════════════════════════════════════ */
const ProgressRing = ({ value, size = 90, label }: { value: number; size?: number; label: string }) => {
  const r = (size - 10) / 2;
  const circ = 2 * Math.PI * r;
  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    // Start from 0 and animate to target value
    setAnimatedValue(0);
    const startTime = performance.now();
    const duration = 1800; // ms

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic for smooth deceleration
      const eased = 1 - Math.pow(1 - progress, 3);
      setAnimatedValue(eased * value);
      if (progress < 1) requestAnimationFrame(animate);
    };

    const raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [value]);

  const offset = circ - (animatedValue / 100) * circ;

  return (
    <div className="flex flex-col items-center gap-1">
      <svg width={size} height={size} className="drop-shadow-lg">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(141,243,219,0.12)" strokeWidth={7} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={animatedValue >= 100 ? C.green : C.teal} strokeWidth={7}
          strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`} />
        <text x="50%" y="50%" textAnchor="middle" dominantBaseline="central" fill="#f8fafc" fontSize={size > 80 ? 16 : 13} fontWeight={700}>
          {animatedValue.toFixed(1)}%
        </text>
      </svg>
      <span className="text-[10px] sm:text-[11px] text-center leading-tight max-w-[100px]" style={{ color: 'rgba(226,232,240,0.72)' }}>{label}</span>
    </div>
  );
};

/* Hook: Page Visibility — unmount iframes when tab/window is hidden */
const usePageVisible = () => {
  const [visible, setVisible] = useState(!document.hidden);
  useEffect(() => {
    const handler = () => setVisible(!document.hidden);
    document.addEventListener('visibilitychange', handler);
    return () => document.removeEventListener('visibilitychange', handler);
  }, []);
  return visible;
};

/* Camera frame with dynamic scaling + staggered mount + visibility awareness */
const CameraFrame = ({ cam, visible, staggerMs = 0 }: { cam: typeof obrasEstrategicasList[0]['cameras'][0]; visible: boolean; staggerMs?: number }) => {
  const [containerEl, setContainerEl] = useState<HTMLDivElement | null>(null);
  const [scale, setScale] = useState(1);
  const [mounted, setMounted] = useState(staggerMs === 0);
  const pageVisible = usePageVisible();
  const INTERNAL_W = 430;
  const INTERNAL_H = 300;

  // Staggered mount: delay iframe creation to avoid burst of connections
  useEffect(() => {
    const canMount = visible && pageVisible;

    if (!canMount) {
      setMounted(false);
      return;
    }

    if (staggerMs === 0) {
      setMounted(true);
      return;
    }

    setMounted(false);
    const t = window.setTimeout(() => setMounted(true), staggerMs);
    return () => window.clearTimeout(t);
  }, [visible, pageVisible, staggerMs]);

  const shouldRender = visible && mounted && pageVisible;

  useEffect(() => {
    if (!containerEl || !shouldRender) return;
    const measure = () => {
      const { width, height } = containerEl.getBoundingClientRect();
      if (width && height) {
        setScale(Math.min(width / INTERNAL_W, height / INTERNAL_H));
      }
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(containerEl);
    return () => ro.disconnect();
  }, [containerEl, shouldRender]);

  return (
    <div className="flex flex-col gap-1">
      <div
        ref={setContainerEl}
        className="rounded-md overflow-hidden relative w-full"
        style={{ border: '1px solid rgba(141,243,219,0.2)', aspectRatio: '16/9', background: '#0a111e' }}
      >
        {shouldRender ? (
          <iframe
            src={cam.link}
            title={cam.tpObra || cam.nome}
            style={{
              border: 'none',
              background: '#0a111e',
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: `${INTERNAL_W}px`,
              height: `${INTERNAL_H}px`,
              transform: `translate(-50%, -50%) scale(${scale})`,
              transformOrigin: 'center center',
            }}
            loading="eager"
            allow="autoplay; encrypted-media"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center" style={{ color: 'rgba(226,232,240,0.4)' }}>
            <Camera className="w-8 h-8" />
          </div>
        )}
      </div>
      <span className="text-[12px] sm:text-[14px] text-center truncate" style={{ color: 'rgba(226,232,240,0.72)' }} title={cam.nome}>
        {cam.tpObra || cam.nome}
      </span>
    </div>
  );
};

/* Shared obra card with cameras — optimized layout */
const ObraCard = ({ o, visible = true }: { o: typeof obrasEstrategicasList[0]; visible?: boolean }) => {
  const shortName =
    o.obraId === 1 ? "BRT Cuiabá/VG" :
    o.obraId === 2 ? "Cplx. Viário Leblon" :
    o.obraId === 3 ? "Hosp. Júlio Muller" :
    "Ponte Rio Juruena";
  const pct = parseFloat(o.contrato.percentualExecutado.replace("%", "").replace(",", "."));
  const camCount = o.cameras.length;
  const camCols = camCount <= 2 ? 'grid-cols-2' : 'grid-cols-3';

  return (
    <div
      id={`obra-card-${o.obraId}`}
      className="rounded-lg p-4 sm:p-5 flex flex-col gap-3"
      style={{ background: 'rgba(10,17,30,0.78)', border: '1px solid rgba(148,163,184,0.15)' }}
    >
      <div className="flex items-center gap-3">
        <HardHat className="w-7 h-7 flex-shrink-0" style={{ color: C.teal }} />
        <p className="text-[18px] sm:text-[22px] font-bold leading-snug" style={{ color: '#f8fafc' }}>{shortName}</p>
        <span className="ml-auto text-[14px] sm:text-[16px] px-3 py-1.5 rounded-md font-semibold" style={{ background: pct >= 100 ? 'rgba(134,239,172,0.2)' : 'rgba(141,243,219,0.12)', color: pct >= 100 ? C.green : 'rgba(226,232,240,0.9)' }}>
          {o.contrato.percentualExecutado} executado
        </span>
      </div>

      <div className="flex items-center justify-center gap-6">
        <ProgressRing value={pct} size={100} label="" />
        <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-[15px] sm:text-[17px]" style={{ color: 'rgba(226,232,240,0.72)' }}>
          <span>Valor Total:</span><span className="font-bold text-right" style={{ color: '#f8fafc' }}>{o.contrato.valorTotal}</span>
          <span>Contrato:</span><span className="text-right">{o.contrato.contrato}</span>
          <span>Situação:</span><span className="text-right font-semibold" style={{ color: o.contrato.situacao === 'Vigente' ? C.green : C.red }}>{o.contrato.situacao}</span>
          <span>Pago:</span><span className="font-bold text-right" style={{ color: C.yellow }}>{o.contrato.percentualPago}</span>
        </div>
      </div>

      {camCount > 0 && (
        <div className="flex flex-col gap-2 mt-1">
          <p className="text-[14px] sm:text-[16px] font-semibold flex items-center gap-1.5" style={{ color: C.teal }}>
            <Camera className="w-5 h-5" /> Câmeras ao vivo ({camCount})
          </p>
          <div className={`grid ${camCols} gap-2`}>
            {o.cameras.map((cam, ci) => (
              <CameraFrame key={ci} cam={cam} visible={visible} staggerMs={ci * 800} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};



const obrasGroup1 = obrasEstrategicasList.filter(o => o.obraId <= 2);
const obrasGroup2 = obrasEstrategicasList.filter(o => o.obraId >= 3);

/* ═══════════════════════════════════════════════════════════
   PANEL 7 — OBRAS: BRT Cuiabá + Cplx. Leblon
   ═══════════════════════════════════════════════════════════ */
const PanelObras = () => (
  <div className="flex flex-col gap-2 h-full overflow-hidden">
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 flex-shrink-0">
      <KPI title="BRT Cuiabá" value="27,26%" sub="R$ 485,7 Mi total" color={C.teal} delay={0} icon={HardHat} />
      <KPI title="Cplx. Leblon" value="50,94%" sub="R$ 105,0 Mi total" color={C.blue} delay={120} icon={HardHat} />
      <KPI title="Câmeras" value={`${obrasGroup1.reduce((s, o) => s + o.cameras.length, 0)}`} sub="monitoramento ao vivo" color={C.purple} delay={240} icon={Camera} />
      <KPI title="Investimento" value="R$ 590,7 Mi" sub="obras neste painel" color={C.green} delay={360} icon={CircleDollarSign} />
    </div>
    <div className="grid grid-cols-1 gap-2 flex-1 min-h-0">
      {obrasGroup1.map(o => <ObraCard key={o.obraId} o={o} visible={true} />)}
    </div>
  </div>
);

/* ═══════════════════════════════════════════════════════════
   PANEL 8 — OBRAS: Hosp. J. Muller + Ponte Juruena
   ═══════════════════════════════════════════════════════════ */
const PanelObrasCameras = () => (
  <div className="flex flex-col gap-2 h-full overflow-hidden">
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 flex-shrink-0">
      <KPI title="Hosp. J. Muller" value="100,00%" sub="R$ 247,1 Mi total" color={C.green} delay={0} icon={HardHat} />
      <KPI title="Ponte Juruena" value="59,43%" sub="R$ 309,1 Mi total" color={C.blue} delay={120} icon={HardHat} />
      <KPI title="Câmeras" value={`${obrasGroup2.reduce((s, o) => s + o.cameras.length, 0)}`} sub="monitoramento ao vivo" color={C.purple} delay={240} icon={Camera} />
      <KPI title="Investimento" value="R$ 556,2 Mi" sub="obras neste painel" color={C.teal} delay={360} icon={CircleDollarSign} />
    </div>
    <div className="grid grid-cols-1 gap-2 flex-1 min-h-0">
      {obrasGroup2.map(o => <ObraCard key={o.obraId} o={o} visible={true} />)}
    </div>
  </div>
);

/* ═══════════════════════════════════════════════════════════
   PANEL 8 — BENEFÍCIOS DE CONTROLE
   ═══════════════════════════════════════════════════════════ */
const formatBRL = (v: number) => {
  if (v >= 1e6) return `R$ ${(v / 1e6).toLocaleString("pt-BR", { minimumFractionDigits: 1, maximumFractionDigits: 1 })} Mi`;
  if (v >= 1e3) return `R$ ${(v / 1e3).toLocaleString("pt-BR", { minimumFractionDigits: 0, maximumFractionDigits: 0 })} Mil`;
  return `R$ ${v.toLocaleString("pt-BR")}`;
};

const PanelBeneficios = () => (
  <div className="flex flex-col gap-2 h-full overflow-hidden">
    {/* KPIs */}
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 flex-shrink-0">
      <KPI title="Impacto Financeiro" value="R$ 940,9 Mi" sub="benefícios 2025" color={C.teal} delay={0} icon={DollarSign} />
      <KPI title="Benefícios" value={`${beneficiosSummary.totalBeneficios}`} sub={`${beneficiosSummary.totalAcoes} ações | ${beneficiosSummary.totalAdjuntas} adjuntas`} color={C.blue} delay={120} icon={ClipboardList} />
      <KPI title="Potencial" value={`${beneficiosSummary.potencial}`} sub={`${beneficiosSummary.efetivo} efetivos`} color={C.purple} delay={240} icon={Target} />
      <KPI title="Unidades" value={`${beneficiosSummary.unidadesAtivas}`} sub={`${beneficiosSummary.totalClasses} classes de benefício`} color={C.yellow} delay={360} icon={Layers} />
    </div>

    {/* Row 1: Impacto por Adjunta + Dimensão de Impacto */}
    <div className="grid grid-cols-2 gap-2 flex-1 min-h-[160px]">
      <Chart title="Impacto Financeiro por Adjunta (R$ Mi)">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={adjuntasRanking.filter(a => a.valorTotal > 0).map(a => ({ ...a, valorMi: +(a.valorTotal / 1e6).toFixed(1) }))} layout="vertical" margin={{ top: 4, right: 50, bottom: 0, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={C.grid} horizontal={false} />
            <XAxis type="number" hide />
            <YAxis type="category" dataKey="nome" stroke={C.axis} fontSize={12} tickLine={false} axisLine={false} width={100} />
            <Tooltip content={<CustomTooltip unit="R$ Mi" />} cursor={{ fill: "rgba(141,243,219,0.06)" }} />
            <Bar dataKey="valorMi" name="Valor" radius={[0, 3, 3, 0]} animationDuration={1500}>
              {adjuntasRanking.filter(a => a.valorTotal > 0).map((_, index) => (
                <Cell key={index} fill={TOP_COLORS[index % TOP_COLORS.length]} />
              ))}
              <LabelList dataKey="valorMi" position="right" fontSize={12} fill={C.label} formatter={(v: number) => `R$ ${v} Mi`} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Chart>
      <Chart title="Dimensão de Impacto">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={dimensaoImpacto} cx="50%" cy="50%" innerRadius="20%" outerRadius="45%" paddingAngle={2} dataKey="qtd" nameKey="nome" label={renderPieLabel} labelLine={false} animationDuration={1500}>
              {dimensaoImpacto.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
            </Pie>
            <Tooltip content={<PieTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </Chart>
    </div>

    {/* Row 2: Benefícios por Adjunta + Top Classes */}
    <div className="grid grid-cols-2 gap-2 flex-1 min-h-[160px]">
      <Chart title="Benefícios por Adjunta">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={adjuntasRanking.filter(a => a.beneficios > 0)} margin={{ top: 10, right: 4, bottom: 14, left: -10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={C.grid} vertical={false} />
            <XAxis dataKey="nome" stroke={C.axis} fontSize={10} tickLine={false} axisLine={false} />
            <YAxis hide />
            <Tooltip content={<CustomTooltip unit="benefícios" />} cursor={{ fill: "rgba(141,243,219,0.06)" }} />
            <Bar dataKey="beneficios" name="Benefícios" radius={[3, 3, 0, 0]} animationDuration={1500}>
              {adjuntasRanking.filter(a => a.beneficios > 0).map((_, index) => (
                <Cell key={index} fill={TOP_COLORS[index % TOP_COLORS.length]} />
              ))}
              <LabelList dataKey="beneficios" position="top" fontSize={12} fill={C.label} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Chart>
      <Chart title="Top Classes de Benefício">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={topClassesBeneficio} layout="vertical" margin={{ top: 4, right: 30, bottom: 0, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={C.grid} horizontal={false} />
            <XAxis type="number" hide />
            <YAxis type="category" dataKey="nome" stroke={C.axis} fontSize={9} tickLine={false} axisLine={false} width={120} tick={WrappedYAxisTick} />
            <Tooltip content={<CustomTooltip unit="ações" />} cursor={{ fill: "rgba(141,243,219,0.06)" }} />
            <Bar dataKey="qtdAcoes" name="Ações" radius={[0, 3, 3, 0]} animationDuration={1500}>
              {topClassesBeneficio.map((_, index) => (
                <Cell key={index} fill={TOP_COLORS[index % TOP_COLORS.length]} />
              ))}
              <LabelList dataKey="qtdAcoes" position="right" fontSize={11} fill={C.label} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Chart>
    </div>

    {/* Row 3: Top Unidades + Natureza */}
    <div className="grid grid-cols-2 gap-2 flex-1 min-h-[160px]">
      <Chart title="Top 10 Unidades por Ações">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={unidadesDetalhadas} layout="vertical" margin={{ top: 4, right: 30, bottom: 0, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={C.grid} horizontal={false} />
            <XAxis type="number" hide />
            <YAxis type="category" dataKey="unidade" stroke={C.axis} fontSize={10} tickLine={false} axisLine={false} width={75} />
            <Tooltip content={<CustomTooltip unit="ações" />} cursor={{ fill: "rgba(141,243,219,0.06)" }} />
            <Bar dataKey="acoes" name="Ações" radius={[0, 3, 3, 0]} animationDuration={1500}>
              {unidadesDetalhadas.map((_, index) => (
                <Cell key={index} fill={TOP_COLORS[index % TOP_COLORS.length]} />
              ))}
              <LabelList dataKey="acoes" position="right" fontSize={11} fill={C.label} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Chart>
      <Chart title="Natureza dos Benefícios">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={naturezaBeneficios} cx="50%" cy="50%" innerRadius="20%" outerRadius="45%" paddingAngle={4} dataKey="qtd" nameKey="nome" label={renderPieLabel} labelLine={false} animationDuration={1500}>
              {naturezaBeneficios.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
            </Pie>
            <Tooltip content={<PieTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </Chart>
    </div>
  </div>
);

/* ═══════════════════════════════════════════════════════════
   PANEL 10 — ORÇAMENTO PTA 2026
   ═══════════════════════════════════════════════════════════ */
const PanelOrcamentoPTA = () => (
  <div className="flex flex-col gap-2 h-full overflow-hidden">
    {/* KPIs */}
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 flex-shrink-0">
      <KPI title="Orçamento Total" value={ptaSummary.totalOrcamento} sub="PTA 2026" color={C.teal} delay={0} icon={Landmark} />
      <KPI title="Desp. Corrente" value={ptaSummary.totalCorrente} sub="85,3% do total" color={C.blue} delay={120} icon={Wallet} />
      <KPI title="Desp. Capital" value={ptaSummary.totalCapital} sub="14,7% do total" color={C.yellow} delay={240} icon={PiggyBank} />
      <KPI title="Pessoal Ativo" value="R$ 8,82 bi" sub="26% do orçamento" color={C.purple} delay={360} icon={Users} />
    </div>
    {/* Row 1: Função + Órgão */}
    <div className="grid grid-cols-2 gap-2 flex-1 min-h-[200px]">
      <Chart title="Orçamento por Função (R$ mi)">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={orcamentoFuncao} layout="vertical" margin={{ top: 4, right: 30, bottom: 4, left: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={C.grid} horizontal={false} />
            <XAxis type="number" hide />
            <YAxis type="category" dataKey="funcao" stroke={C.axis} fontSize={11} tickLine={false} axisLine={false} width={100} tick={WrappedYAxisTick} />
            <Tooltip content={<CustomTooltip unit="R$ mi" />} cursor={{ fill: "rgba(141,243,219,0.06)" }} />
            <Bar dataKey="valor" radius={[0, 4, 4, 0]} animationDuration={1500} animationEasing="ease-in-out">
              {orcamentoFuncao.map((e, i) => <Cell key={i} fill={e.fill} />)}
              <LabelList dataKey="valor" position="right" fontSize={11} fill={C.label} formatter={(v: number) => v.toLocaleString('pt-BR')} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Chart>
      <Chart title="Orçamento por UO (R$ mi)">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={orcamentoUO} layout="vertical" margin={{ top: 4, right: 30, bottom: 4, left: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={C.grid} horizontal={false} />
            <XAxis type="number" hide />
            <YAxis type="category" dataKey="sigla" stroke={C.axis} fontSize={10} tickLine={false} axisLine={false} width={100} tick={WrappedYAxisTick} />
            <Tooltip content={<CustomTooltip unit="R$ mi" />} cursor={{ fill: "rgba(141,243,219,0.06)" }} />
            <Bar dataKey="valor" radius={[0, 4, 4, 0]} animationDuration={1500} animationEasing="ease-in-out">
              {orcamentoUO.map((e, i) => <Cell key={i} fill={e.fill} />)}
              <LabelList dataKey="valor" position="right" fontSize={11} fill={C.label} formatter={(v: number) => v.toLocaleString('pt-BR')} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Chart>
    </div>
    {/* Row 2: Composição Corrente vs Capital — full width */}
    <div className="flex-1 min-h-[160px]">
      <Chart title="Corrente vs Capital por Função (R$ mi)">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={composicaoFuncao} margin={{ top: 10, right: 8, bottom: 4, left: -10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={C.grid} vertical={false} />
            <XAxis dataKey="funcao" stroke={C.axis} fontSize={14} tickLine={false} axisLine={false} />
            <YAxis hide />
            <Legend content={renderLegend} />
            <Tooltip content={<CustomTooltip unit="R$ mi" />} cursor={{ fill: "rgba(141,243,219,0.06)" }} />
            <Bar dataKey="corrente" name="Corrente" fill={C.blue} radius={[2, 2, 0, 0]} animationDuration={1500} animationEasing="ease-in-out">
              <LabelList dataKey="corrente" position="top" fontSize={10} fill={C.label} formatter={(v: number) => v.toLocaleString('pt-BR')} />
            </Bar>
            <Bar dataKey="capital" name="Capital" fill={C.yellow} radius={[2, 2, 0, 0]} animationDuration={1500} animationBegin={300} animationEasing="ease-in-out">
              <LabelList dataKey="capital" position="top" fontSize={10} fill={C.label} formatter={(v: number) => v.toLocaleString('pt-BR')} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Chart>
    </div>
    {/* Row 3: Pacote Despesa + Categoria Econômica + Modalidade */}
    <div className="grid grid-cols-3 gap-2 flex-1 min-h-[200px]">
      <Chart title="Pacote da Despesa (R$ mi)">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={pacoteDespesa} layout="vertical" margin={{ top: 4, right: 30, bottom: 4, left: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={C.grid} horizontal={false} />
            <XAxis type="number" hide />
            <YAxis type="category" dataKey="pacote" stroke={C.axis} fontSize={10} tickLine={false} axisLine={false} width={90} tick={WrappedYAxisTick} />
            <Tooltip content={<CustomTooltip unit="R$ mi" />} cursor={{ fill: "rgba(141,243,219,0.06)" }} />
            <Bar dataKey="valor" radius={[0, 4, 4, 0]} animationDuration={1500}>
              {pacoteDespesa.map((e, i) => <Cell key={i} fill={e.fill} />)}
              <LabelList dataKey="valor" position="right" fontSize={10} fill={C.label} formatter={(v: number) => v.toLocaleString('pt-BR')} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Chart>
      <Chart title="Categoria Econômica">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={categoriaEconomica} cx="50%" cy="50%" innerRadius="25%" outerRadius="50%" paddingAngle={4} dataKey="value" nameKey="name" label={renderPieLabel} labelLine={false} animationDuration={1500}>
              {categoriaEconomica.map((e, i) => <Cell key={i} fill={e.fill} />)}
            </Pie>
            <Tooltip content={<PieTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </Chart>
      <Chart title="Modalidade de Aplicação">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={modalidadeAplicacao} cx="50%" cy="50%" innerRadius="25%" outerRadius="50%" paddingAngle={3} dataKey="value" nameKey="name" label={renderPieLabel} labelLine={false} animationDuration={1500}>
              {modalidadeAplicacao.map((e, i) => <Cell key={i} fill={e.fill} />)}
            </Pie>
            <Tooltip content={<PieTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </Chart>
    </div>
  </div>
);
 
 /* ═══════════════════════════════════════════════════════════
    PANEL 11 — LIQUIDAÇÕES 2025
    ═══════════════════════════════════════════════════════════ */
const PanelLiquidacoes = () => (
  <div className="flex flex-col gap-2 h-full overflow-hidden">
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 flex-shrink-0">
      <KPI title="Total Liquidado" value={liquidacoesSummary.totalLiquidado} sub="Exercício 2025" color={C.teal} delay={0} icon={DollarSign} />
      <KPI title="Quantidade Liqs" value={liquidacoesSummary.quantidadeLiqs} sub="Janeiro — Dezembro" color={C.blue} delay={120} icon={ClipboardList} />
      <KPI title="Valor Médio" value={liquidacoesSummary.valorMedioLiq} sub="por Liquidação" color={C.purple} delay={240} icon={Target} />
      <KPI title="Unidades" value={liquidacoesSummary.unidadesOrcamentarias.toString()} sub="Orçamentárias" color={C.yellow} delay={360} icon={Landmark} />
    </div>

    <div className="grid grid-cols-2 gap-2 flex-1 min-h-[160px]">
      <Chart title="Evolução Mensal (R$ bi)">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={liquidacoesEvolucaoMensal} margin={{ top: 10, right: 8, bottom: 0, left: -10 }}>
            <defs><linearGradient id="cliq" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={C.blue} stopOpacity={0.4} /><stop offset="95%" stopColor={C.blue} stopOpacity={0} /></linearGradient></defs>
            <CartesianGrid strokeDasharray="3 3" stroke={C.grid} vertical={false} />
            <XAxis dataKey="mes" stroke={C.axis} fontSize={14} tickLine={false} axisLine={false} />
            <YAxis hide />
            <Tooltip content={<CustomTooltip unit="bi" />} cursor={{ fill: "rgba(141,243,219,0.06)" }} />
            <Area type="monotone" dataKey="valor" stroke={C.blue} fill="url(#cliq)" strokeWidth={2} animationDuration={1500}>
              <LabelList dataKey="valor" position="top" fontSize={12} fill={C.label} />
            </Area>
          </AreaChart>
        </ResponsiveContainer>
      </Chart>
      <Chart title="Alinhamento Estratégico">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={liquidacoesAlinhamento} cx="50%" cy="50%" innerRadius="20%" outerRadius="45%" paddingAngle={2} dataKey="value" nameKey="name" label={renderPieLabel} labelLine={false} animationDuration={1500}>
              {liquidacoesAlinhamento.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
            </Pie>
            <Legend content={renderLegend} />
            <Tooltip content={<PieTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </Chart>
    </div>

    <div className="grid grid-cols-2 gap-2 flex-1 min-h-[160px]">
      <Chart title="Top 5 Por Função de Governo (R$ bi)">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={liquidacoesFuncaoGoverno.slice(0, 5)} layout="vertical" margin={{ top: 4, right: 40, bottom: 0, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={C.grid} horizontal={false} />
            <XAxis type="number" hide />
            <YAxis type="category" dataKey="funcao" stroke={C.axis} fontSize={10} tickLine={false} axisLine={false} width={100} tick={WrappedYAxisTick} />
            <Tooltip content={<CustomTooltip unit="bi" />} cursor={{ fill: "rgba(141,243,219,0.06)" }} />
            <Bar dataKey="valor" radius={[0, 3, 3, 0]} animationDuration={1500}>
              {liquidacoesFuncaoGoverno.slice(0, 5).map((e, i) => <Cell key={i} fill={e.fill} />)}
              <LabelList dataKey="valor" position="right" fontSize={11} fill={C.label} formatter={(v: number) => `R$ ${v} bi`} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Chart>
      <Chart title="Top 5 Por Unidade Orçamentária (R$ bi)">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={liquidacoesUnidades.slice(0, 5)} layout="vertical" margin={{ top: 4, right: 40, bottom: 0, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={C.grid} horizontal={false} />
            <XAxis type="number" hide />
            <YAxis type="category" dataKey="unidade" stroke={C.axis} fontSize={10} tickLine={false} axisLine={false} width={100} tick={WrappedYAxisTick} />
            <Tooltip content={<CustomTooltip unit="bi" />} cursor={{ fill: "rgba(141,243,219,0.06)" }} />
            <Bar dataKey="valor" radius={[0, 3, 3, 0]} animationDuration={1500}>
              {liquidacoesUnidades.slice(0, 5).map((e, i) => <Cell key={i} fill={e.fill} />)}
              <LabelList dataKey="valor" position="right" fontSize={11} fill={C.label} formatter={(v: number) => `R$ ${v} bi`} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Chart>
    </div>

    <div className="grid grid-cols-1 gap-2 flex-1 min-h-[160px]">
      <Chart title="Top 10 Credores (Excl. Pessoal)">
        <div className="overflow-auto h-full pr-1">
          <table className="w-full text-left text-[11px] sm:text-[13px]" style={{ color: 'rgba(226,232,240,0.72)' }}>
            <thead className="sticky top-0 bg-[#0a111e] z-10">
              <tr>
                <th className="py-1 px-1 border-b border-white/10">Credor</th>
                <th className="py-1 px-1 border-b border-white/10">Modalidade</th>
                <th className="py-1 px-1 border-b border-white/10 text-right">Valor</th>
              </tr>
            </thead>
            <tbody>
              {topCredores.map((c, i) => (
                <tr key={i} className="hover:bg-white/5 transition-colors">
                  <td className="py-1 px-1 border-b border-white/5 truncate max-w-[250px]" title={c.credor}>{c.credor}</td>
                  <td className="py-1 px-1 border-b border-white/5 text-[10px] uppercase">{c.modalidade}</td>
                  <td className="py-1 px-1 border-b border-white/5 text-right font-semibold text-white">{c.valor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Chart>
    </div>
  </div>
);
 
 const panels = [PanelEconomia, PanelSocial, PanelAmbiental, PanelVisaoGeral, PanelControle, PanelIntegridade, PanelObras, PanelObrasCameras, PanelBeneficios, PanelOrcamentoPTA, PanelLiquidacoes, PanelLiquidacoes, PanelLiquidacoes, PanelMortalidadeBR, PanelMortalidadeMT_Dashboard, PanelAlfabetizacaoBR, PanelAlfabetizacaoMT];
 const panelLabels = ["a01", "a02", "a03", "a04", "c01", "c02", "b01", "b02", "c03", "b03", "b04", "c04", "b05", "a05", "a06", "a07", "a08"];
/* ─── Rotation sequences for /tX routes (0-indexed panel indices) ─── */
const rotationSequences: Record<string, number[]> = {
   t1: [0, 1, 2, 3, 13, 14, 15, 16],   // a01, a02, a03, a04, a05, a06, a07, a08
    t2: [13, 14, 15, 16, 0, 1, 2, 3],   // a05, a06, a07, a08, a01, a02, a03, a04
     t3: [6, 7, 9, 10, 12],       // b01, b02, b03, b04, b05
      t4: [4, 5, 8, 11],       // c01, c02, c03, c04
};

/* ─── Main ─── */
const SingleDashboard = () => {
  const { page } = useParams<{ page: string }>();
  const navigate = useNavigate();
  const location = window.location.pathname.replace("/", "");

  // Check if we're on a /tX rotation route
  const rotationKey = Object.keys(rotationSequences).find(k => location === k);
  const sequence = rotationKey ? rotationSequences[rotationKey] : null;

  // For rotation routes, determine active panel from clock
  const getRotationIndex = () => {
    const now = new Date();
    const totalSeconds = now.getMinutes() * 60 + now.getSeconds();
    const windowIndex = Math.floor(totalSeconds / 60);
    return windowIndex;
  };

  const [rotationTick, setRotationTick] = useState(0);
  // Manual override for /tX routes
  const [manualIndex, setManualIndex] = useState<number | null>(null);
  // Hover idle: disable hover effects after 5s of no mouse movement
  const [hoverDisabled, setHoverDisabled] = useState(false);
  // Pause auto-rotation
  const [paused, setPaused] = useState(false);
  const [pausedActivePanel, setPausedActivePanel] = useState<number | null>(null);

  // Reset manual override when rotation tick changes (auto-advance)
  useEffect(() => {
    if (!paused) setManualIndex(null);
  }, [rotationTick, paused]);

  // Mouse idle timer: after 5s without movement, disable hover
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const resetIdle = () => {
      setHoverDisabled(false);
      clearTimeout(timer);
      timer = setTimeout(() => setHoverDisabled(true), 5000);
    };
    resetIdle();
    window.addEventListener("mousemove", resetIdle);
    return () => {
      window.removeEventListener("mousemove", resetIdle);
      clearTimeout(timer);
    };
  }, []);

  const autoSeqIndex = sequence ? getRotationIndex() % sequence.length : 0;

  const active = useMemo(() => {
    if (sequence) {
      return manualIndex !== null
        ? sequence[manualIndex % sequence.length]
        : paused && pausedActivePanel !== null
          ? pausedActivePanel
          : sequence[autoSeqIndex];
    }
    
    if (!page) return 0;
    const label = page.toLowerCase();
    const idx = panelLabels.indexOf(label);
    return idx !== -1 ? idx : 0;
  }, [sequence, manualIndex, paused, pausedActivePanel, autoSeqIndex, page]);

  // Current sequence index for edge navigation
  const currentSeqIndex = sequence
    ? (manualIndex !== null
        ? manualIndex % sequence.length
        : paused && pausedActivePanel !== null
          ? Math.max(0, sequence.indexOf(pausedActivePanel))
          : autoSeqIndex)
    : 0;

  // Toggle pause with Space or P key
  useEffect(() => {
    if (!sequence) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.key === 'p' || e.key === 'P') {
        e.preventDefault();
        setPaused(prev => {
          const next = !prev;
          setPausedActivePanel(next ? active : null);
          return next;
        });
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [active, sequence]);

  const goNext = () => {
    if (!sequence) return;
    setManualIndex((currentSeqIndex + 1) % sequence.length);
  };
  const goPrev = () => {
    if (!sequence) return;
    setManualIndex((currentSeqIndex - 1 + sequence.length) % sequence.length);
  };

  const ActivePanel = panels[active];

      const panelTitles = ["Economia", "Social", "Ambiental", "Economia", "Controle & Eficiência", "Integridade", "Obras — BRT & Leblon", "Obras — Hospital & Ponte", "Benefícios de Controle", "Orçamento PTA 2026", "Painel de Liquidações 2025", "Liquidações Por Unidade", "Despesas Liquidadas 2025", "Mortalidade Inf — BR", "Mortalidade Inf — MT", "Alfabetização — BR", "Alfabetização — MT"];
     const panelTitleColors = ["#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff"];
     const panelHeaderBgs = ["#1e2405", "#1e2405", "#1e2405", "#1e2405", "#102041", "#102041", "#1c0903", "#1c0903", "#102041", "#1C0903", "#1C0903", "#102041", "#1C0903", "#1e2405", "#1e2405", "#1e2405", "#1e2405"];

  const ROTATE_INTERVAL = 60;
  const [now, setNow] = useState(new Date());
  const [progress, setProgress] = useState(0);

  // Store progress when paused
  const [pausedProgress, setPausedProgress] = useState(0);

  useEffect(() => {
    let hasNavigated = false;

    const getElapsedMs = () => {
      const d = new Date();
      const s = d.getSeconds();
      const ms = d.getMilliseconds();
      const totalMs = (s % 60) * 1000 + ms;
      return totalMs;
    };

    const tick = () => {
      setNow(new Date());
      if (!paused) {
        const elapsedMs = getElapsedMs();
        const p = (elapsedMs / (ROTATE_INTERVAL * 1000)) * 100;
        setProgress(p);
        setPausedProgress(p);
      }
    };

    tick();
    const clockTick = window.setInterval(tick, 250);

    const checkRotate = setInterval(() => {
      if (paused || !sequence) return;
      const d = new Date();
      const s = d.getSeconds();
      if (s === 0) {
        if (!hasNavigated) {
          hasNavigated = true;
          setRotationTick(t => t + 1);
        }
      } else {
        hasNavigated = false;
      }
    }, 500);
    
    return () => { 
      clearInterval(clockTick); 
      clearInterval(checkRotate); 
    };
  }, [active, navigate, sequence, rotationTick, paused]);

  const formattedDate = now.toLocaleDateString("pt-BR", { weekday: "long", day: "2-digit", month: "long", year: "numeric", timeZone: "America/Cuiaba" });
  const formattedTime = now.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit", second: "2-digit", timeZone: "America/Cuiaba" });

  return (
    <div
      className={`h-dvh w-full flex flex-col overflow-hidden relative${hoverDisabled ? ' hover-disabled' : ''}`}
      style={{
        background: `radial-gradient(circle at top left, rgba(96,165,250,0.18), transparent 24%), radial-gradient(circle at top right, rgba(45,212,191,0.15), transparent 20%), linear-gradient(180deg, #02060d 0%, #040b15 100%)`,
      }}
    >
      {/* Edge hover zones for /tX routes */}
      {sequence && (
        <>
          <div
            className="absolute left-0 top-0 bottom-0 w-16 z-50 cursor-pointer flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300"
            style={{ background: 'linear-gradient(90deg, rgba(141,243,219,0.12), transparent)' }}
            onClick={goPrev}
          >
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
            </div>
          </div>
          <div
            className="absolute right-0 top-0 bottom-0 w-16 z-50 cursor-pointer flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300"
            style={{ background: 'linear-gradient(-90deg, rgba(96,165,250,0.12), transparent)' }}
            onClick={goNext}
          >
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 6 15 12 9 18" /></svg>
            </div>
          </div>
        </>
      )}
      {/* Header */}
      <header
        className="flex-shrink-0 flex items-center justify-between px-3 sm:px-4 py-2 sm:py-3 select-none"
        style={{ borderBottom: '1px solid rgba(148,163,184,0.18)', background: panelHeaderBgs[active], cursor: sequence ? 'pointer' : 'default' }}
        onClick={() => {
          if (!sequence) return;
          setPaused(prev => {
            const next = !prev;
            setPausedActivePanel(next ? active : null);
            return next;
          });
        }}
      >
        <img src={tituloImg} alt="Título" className="h-12 sm:h-[60px] object-contain pointer-events-none" />
        <div className="flex items-center gap-3">
          {sequence && paused && (
            <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-semibold" style={{ background: 'rgba(251,191,36,0.15)', color: '#fbbf24', border: '1px solid rgba(251,191,36,0.3)' }}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="#fbbf24"><rect x="6" y="4" width="4" height="16" rx="1" /><rect x="14" y="4" width="4" height="16" rx="1" /></svg>
              PAUSADO
            </span>
          )}
          <span className="text-[32px] sm:text-[36px] font-bold uppercase tracking-wider text-white" style={{ color: panelTitleColors[active] }}>{panelTitles[active]}</span>
        </div>
      </header>
      {/* Reload progress bar */}
      <div className="flex-shrink-0 w-full h-[2px]" style={{ background: 'rgba(148,163,184,0.1)' }}>
        <div
          className="h-full"
          style={{
            width: `${paused ? pausedProgress : progress}%`,
            background: paused ? 'linear-gradient(90deg, #fbbf24, #f59e0b)' : 'linear-gradient(90deg, #8df3db, #60a5fa)',
            boxShadow: paused ? '0 0 6px rgba(251,191,36,0.4)' : '0 0 6px rgba(141,243,219,0.4)',
          }}
        />
      </div>
      {/* Panel */}
      <div className="flex-1 min-h-0 p-1.5 sm:p-2 overflow-hidden">
        <ActivePanel />
      </div>
      {/* Footer with source + clock */}
       <footer className="flex-shrink-0 flex flex-col sm:flex-row items-center justify-between px-2 sm:px-3 py-1 sm:py-1.5 gap-0.5 sm:gap-0" style={{ borderTop: '1px solid rgba(148,163,184,0.18)', background: 'rgba(10,17,30,0.78)' }}>
         <span className="text-[16px] sm:text-[18px] font-semibold tabular-nums" style={{ color: '#60a5fa' }}>
           {formattedDate} — {formattedTime}
         </span>
           {active === 8 ? (
             <span className="text-[16px] sm:text-[18px]" style={{ color: '#8df3db' }}>
               Fonte: Relatório Executivo - Benefícios do Controle - 2025
             </span>
           ) : active === 9 ? (
             <span className="text-[16px] sm:text-[18px]" style={{ color: '#8df3db' }}>
               Fonte: PTA 2026 — Governo do Estado de Mato Grosso
             </span>
            ) : active === 10 || active === 11 || active === 12 || active === 15 || active === 16 ? (
             <span className="text-[16px] sm:text-[18px]" style={{ color: '#8df3db' }}>
                Fonte: FIPLAN/SEFAZ
             </span>
           ) : active === 4 || active === 5 ? (
             <span className="text-[16px] sm:text-[18px]" style={{ color: '#8df3db' }}>
               Fonte: Balanço de Gestão 2025 — CGE-MT
             </span>
           ) : active === 6 || active === 7 ? (
            <span className="text-[16px] sm:text-[18px]" style={{ color: '#8df3db' }}>
              Fonte: SINFRA-MT — Obras Estratégicas
            </span>
          ) : active === 13 || active === 14 ? (
            <span className="text-[16px] sm:text-[18px]" style={{ color: '#8df3db' }}>
              Fonte: DATASUS
            </span>
          ) : (
            <a href="https://dados.mt.gov.br/" target="_blank" rel="noopener noreferrer" className="text-[16px] sm:text-[18px] transition-colors" style={{ color: '#8df3db' }}>
              Fonte: dados.mt.gov.br
            </a>
          )}
      </footer>
    </div>
  );
};

export default SingleDashboard;
