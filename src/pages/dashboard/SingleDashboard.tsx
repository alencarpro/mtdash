import { useState } from "react";
import { BarChart3, LayoutDashboard, TrendingUp, Users, Leaf, DollarSign, Building2, Ship, Briefcase, GraduationCap, HeartPulse, Shield, TreePine, Wind, Construction } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, AreaChart, Area, LineChart, Line,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
} from "recharts";
import {
  overviewKPIs, pibEvolution, sectorPieData, populationData,
  comercioExterior, principaisDestinos, mercadoTrabalho, producaoAgricola,
  educacaoData, saudeData, segurancaData, assistenciaSocial, icqvData,
  desmatamentoData, biomaData, qualidadeArData, vegetacaoNativa, obrasData, investimentoInfra,
} from "@/data/mockData";

const COLORS = ["hsl(174 72% 40%)", "hsl(199 89% 48%)", "hsl(262 52% 47%)", "hsl(43 96% 56%)", "hsl(0 72% 51%)", "hsl(142 71% 45%)"];
const BIOMA_COLORS = ["hsl(142 71% 45%)", "hsl(43 96% 56%)", "hsl(199 89% 48%)"];
const tooltipStyle = { backgroundColor: "hsl(220 25% 12%)", border: "1px solid hsl(220 20% 18%)", borderRadius: 8, color: "hsl(220 10% 92%)" };

const tabs = [
  { label: "1", icon: LayoutDashboard },
  { label: "2", icon: TrendingUp },
  { label: "3", icon: Users },
  { label: "4", icon: Leaf },
];

const MiniKPI = ({ title, value, sub }: { title: string; value: string; sub: string }) => (
  <div className="bg-card rounded-lg border border-border p-2 flex flex-col justify-center">
    <p className="text-[10px] text-muted-foreground truncate">{title}</p>
    <p className="text-sm font-bold text-card-foreground leading-tight">{value}</p>
    <p className="text-[9px] text-muted-foreground truncate">{sub}</p>
  </div>
);

const MiniChart = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="bg-card rounded-lg border border-border p-2 flex flex-col min-h-0 flex-1">
    <p className="text-[10px] font-semibold text-card-foreground mb-1 truncate">{title}</p>
    <div className="flex-1 min-h-0">{children}</div>
  </div>
);

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

/* ─── Tab panels ─── */

const Panel1 = () => (
  <div className="flex flex-col gap-2 h-full">
    <div className="grid grid-cols-2 gap-2">
      <MiniKPI title="PIB Estadual (2023)" value={overviewKPIs.pibTotal} sub={overviewKPIs.pibRanking} />
      <MiniKPI title="Crescimento PIB" value={overviewKPIs.crescimentoMedio} sub={overviewKPIs.crescimentoPeriodo} />
      <MiniKPI title="PIB per Capita" value={overviewKPIs.pibPerCapita} sub={overviewKPIs.pibPerCapitaRanking} />
      <MiniKPI title="Municípios" value={overviewKPIs.municipios} sub="Total do estado" />
    </div>
    <div className="grid grid-cols-2 gap-2 flex-1 min-h-0">
      <MiniChart title="Evolução do PIB (R$ bi)">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={pibEvolution}>
            <defs><linearGradient id="cpib" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="hsl(174 72% 40%)" stopOpacity={0.3} /><stop offset="95%" stopColor="hsl(174 72% 40%)" stopOpacity={0} /></linearGradient></defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 20% 18%)" />
            <XAxis dataKey="year" stroke="hsl(220 10% 46%)" fontSize={9} tickLine={false} />
            <YAxis stroke="hsl(220 10% 46%)" fontSize={9} tickLine={false} width={30} />
            <Tooltip contentStyle={tooltipStyle} />
            <Area type="monotone" dataKey="pib" stroke="hsl(174 72% 40%)" fill="url(#cpib)" strokeWidth={1.5} />
          </AreaChart>
        </ResponsiveContainer>
      </MiniChart>
      <MiniChart title="PIB por Setor">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={sectorPieData} cx="50%" cy="50%" innerRadius="35%" outerRadius="60%" paddingAngle={3} dataKey="value">
              {sectorPieData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
            </Pie>
            <Legend wrapperStyle={{ fontSize: 9 }} />
            <Tooltip contentStyle={tooltipStyle} />
          </PieChart>
        </ResponsiveContainer>
      </MiniChart>
    </div>
    <MiniChart title="PIB Municipal (R$ bi)">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={populationData}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 20% 18%)" />
          <XAxis dataKey="city" stroke="hsl(220 10% 46%)" fontSize={8} tickLine={false} />
          <YAxis stroke="hsl(220 10% 46%)" fontSize={9} tickLine={false} width={25} />
          <Tooltip contentStyle={tooltipStyle} />
          <Bar dataKey="pibMunicipal" fill="hsl(199 89% 48%)" radius={[3, 3, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </MiniChart>
  </div>
);

const Panel2 = () => (
  <div className="flex flex-col gap-2 h-full">
    <div className="grid grid-cols-2 gap-2">
      <MiniKPI title="Superávit Comercial" value={`US$ ${lastTrade.superavit} bi`} sub="4T 2025" />
      <MiniKPI title="Principal Export." value="Soja — 31%" sub="do total" />
      <MiniKPI title="Taxa Emprego" value={`${lastWork.emprego}%`} sub={`Renda R$ ${lastWork.renda}`} />
      <MiniKPI title="Cresc. PIB" value="+12,9%" sub="2022 → 2023" />
    </div>
    <div className="grid grid-cols-2 gap-2 flex-1 min-h-0">
      <MiniChart title="Comércio Exterior (US$ bi)">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={comercioExterior}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 20% 18%)" />
            <XAxis dataKey="trimestre" stroke="hsl(220 10% 46%)" fontSize={7} tickLine={false} />
            <YAxis stroke="hsl(220 10% 46%)" fontSize={9} tickLine={false} width={25} />
            <Tooltip contentStyle={tooltipStyle} />
            <Line type="monotone" dataKey="exportacao" stroke="hsl(174 72% 40%)" strokeWidth={1.5} dot={false} />
            <Line type="monotone" dataKey="importacao" stroke="hsl(43 96% 56%)" strokeWidth={1.5} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </MiniChart>
      <MiniChart title="Destinos Exportações">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={principaisDestinos} cx="50%" cy="50%" innerRadius="30%" outerRadius="55%" paddingAngle={2} dataKey="percentual" nameKey="pais">
              {principaisDestinos.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
            </Pie>
            <Legend wrapperStyle={{ fontSize: 8 }} />
            <Tooltip contentStyle={tooltipStyle} />
          </PieChart>
        </ResponsiveContainer>
      </MiniChart>
    </div>
    <div className="grid grid-cols-2 gap-2 flex-1 min-h-0">
      <MiniChart title="Mercado de Trabalho">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={mercadoTrabalho}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 20% 18%)" />
            <XAxis dataKey="trimestre" stroke="hsl(220 10% 46%)" fontSize={7} tickLine={false} />
            <YAxis stroke="hsl(220 10% 46%)" fontSize={9} tickLine={false} width={25} domain={[70, 85]} />
            <Tooltip contentStyle={tooltipStyle} />
            <Bar dataKey="emprego" fill="hsl(262 52% 47%)" radius={[3, 3, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </MiniChart>
      <MiniChart title="Produção Agrícola (M ton)">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={producaoAgricola} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 20% 18%)" />
            <XAxis type="number" stroke="hsl(220 10% 46%)" fontSize={9} tickLine={false} />
            <YAxis type="category" dataKey="cultura" stroke="hsl(220 10% 46%)" fontSize={8} tickLine={false} width={40} />
            <Tooltip contentStyle={tooltipStyle} />
            <Bar dataKey="producao" fill="hsl(174 72% 40%)" radius={[0, 3, 3, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </MiniChart>
    </div>
  </div>
);

const Panel3 = () => (
  <div className="flex flex-col gap-2 h-full">
    <div className="grid grid-cols-2 gap-2">
      <MiniKPI title="IDEB (2023)" value={lastEdu.ideb.toString()} sub={`${lastEdu.matriculas.toLocaleString()} matrículas`} />
      <MiniKPI title="Leitos Hosp." value={saudeData.leitos.toLocaleString()} sub={`${saudeData.leitosUTI} UTI`} />
      <MiniKPI title="Segurança" value={segurancaData[segurancaData.length - 1].ocorrencias.toLocaleString()} sub="Ocorrências 2023" />
      <MiniKPI title="CadÚnico" value={assistenciaSocial.familiasCadUnico.toLocaleString()} sub={`Desc. BF: ${assistenciaSocial.descobertura}`} />
    </div>
    <div className="grid grid-cols-2 gap-2 flex-1 min-h-0">
      <MiniChart title="Evolução IDEB">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={educacaoData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 20% 18%)" />
            <XAxis dataKey="year" stroke="hsl(220 10% 46%)" fontSize={9} tickLine={false} />
            <YAxis stroke="hsl(220 10% 46%)" fontSize={9} tickLine={false} width={25} domain={[4, 6]} />
            <Tooltip contentStyle={tooltipStyle} />
            <Line type="monotone" dataKey="ideb" stroke="hsl(174 72% 40%)" strokeWidth={2} dot={{ r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </MiniChart>
      <MiniChart title="Segurança Pública">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={segurancaData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 20% 18%)" />
            <XAxis dataKey="year" stroke="hsl(220 10% 46%)" fontSize={9} tickLine={false} />
            <YAxis stroke="hsl(220 10% 46%)" fontSize={9} tickLine={false} width={30} />
            <Tooltip contentStyle={tooltipStyle} />
            <Bar dataKey="ocorrencias" fill="hsl(199 89% 48%)" radius={[3, 3, 0, 0]} />
            <Bar dataKey="homicidios" fill="hsl(0 72% 51%)" radius={[3, 3, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </MiniChart>
    </div>
    <div className="grid grid-cols-2 gap-2 flex-1 min-h-0">
      <MiniChart title="ICQV por Município">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={icqvData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 20% 18%)" />
            <XAxis dataKey="city" stroke="hsl(220 10% 46%)" fontSize={7} tickLine={false} />
            <YAxis stroke="hsl(220 10% 46%)" fontSize={9} tickLine={false} width={25} domain={[0, 1]} />
            <Tooltip contentStyle={tooltipStyle} />
            <Bar dataKey="saude" fill="hsl(0 72% 51%)" radius={[2, 2, 0, 0]} />
            <Bar dataKey="educacao" fill="hsl(199 89% 48%)" radius={[2, 2, 0, 0]} />
            <Bar dataKey="economia" fill="hsl(174 72% 40%)" radius={[2, 2, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </MiniChart>
      <MiniChart title="Radar Estadual">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={radarAvg}>
            <PolarGrid stroke="hsl(220 20% 18%)" />
            <PolarAngleAxis dataKey="subject" stroke="hsl(220 10% 46%)" fontSize={8} />
            <PolarRadiusAxis stroke="hsl(220 10% 46%)" fontSize={8} domain={[0, 100]} />
            <Radar dataKey="value" stroke="hsl(174 72% 40%)" fill="hsl(174 72% 40%)" fillOpacity={0.3} />
          </RadarChart>
        </ResponsiveContainer>
      </MiniChart>
    </div>
  </div>
);

const Panel4 = () => (
  <div className="flex flex-col gap-2 h-full">
    <div className="grid grid-cols-2 gap-2">
      <MiniKPI title="Vegetação Preservada" value={`${vegetacaoNativa.vegetacaoPreservada}%`} sub={`${(vegetacaoNativa.areaProtegida / 1000).toFixed(0)} mil km²`} />
      <MiniKPI title="Desmatamento 2023" value={`${lastDesm.area} km²`} sub="-10,2% vs 2022" />
      <MiniKPI title="Qualidade do Ar" value="IQA variável" sub="Crítico Jul–Set" />
      <MiniKPI title="Obras Andamento" value={obrasData.reduce((a, b) => a + b.emAndamento, 0).toString()} sub={`${obrasData.reduce((a, b) => a + b.concluidas, 0)} concluídas`} />
    </div>
    <div className="grid grid-cols-2 gap-2 flex-1 min-h-0">
      <MiniChart title="Desmatamento Anual">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={desmatamentoData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 20% 18%)" />
            <XAxis dataKey="year" stroke="hsl(220 10% 46%)" fontSize={9} tickLine={false} />
            <YAxis stroke="hsl(220 10% 46%)" fontSize={9} tickLine={false} width={30} />
            <Tooltip contentStyle={tooltipStyle} />
            <Bar dataKey="area" fill="hsl(0 72% 51%)" radius={[3, 3, 0, 0]} />
            <Bar dataKey="alertas" fill="hsl(43 96% 56%)" radius={[3, 3, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </MiniChart>
      <MiniChart title="Biomas de MT">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={biomaData} cx="50%" cy="50%" innerRadius="30%" outerRadius="55%" paddingAngle={3} dataKey="percentual" nameKey="name">
              {biomaData.map((_, i) => <Cell key={i} fill={BIOMA_COLORS[i]} />)}
            </Pie>
            <Legend wrapperStyle={{ fontSize: 8 }} />
            <Tooltip contentStyle={tooltipStyle} />
          </PieChart>
        </ResponsiveContainer>
      </MiniChart>
    </div>
    <div className="grid grid-cols-2 gap-2 flex-1 min-h-0">
      <MiniChart title="Qualidade do Ar (IQA)">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={qualidadeArData}>
            <defs><linearGradient id="ciqa" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="hsl(43 96% 56%)" stopOpacity={0.3} /><stop offset="95%" stopColor="hsl(43 96% 56%)" stopOpacity={0} /></linearGradient></defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 20% 18%)" />
            <XAxis dataKey="mes" stroke="hsl(220 10% 46%)" fontSize={8} tickLine={false} />
            <YAxis stroke="hsl(220 10% 46%)" fontSize={9} tickLine={false} width={25} />
            <Tooltip contentStyle={tooltipStyle} />
            <Area type="monotone" dataKey="iqa" stroke="hsl(43 96% 56%)" fill="url(#ciqa)" strokeWidth={1.5} />
          </AreaChart>
        </ResponsiveContainer>
      </MiniChart>
      <MiniChart title="Investimento Infra (R$ bi)">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={investimentoInfra}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 20% 18%)" />
            <XAxis dataKey="year" stroke="hsl(220 10% 46%)" fontSize={9} tickLine={false} />
            <YAxis stroke="hsl(220 10% 46%)" fontSize={9} tickLine={false} width={25} />
            <Tooltip contentStyle={tooltipStyle} />
            <Bar dataKey="investimento" fill="hsl(174 72% 40%)" radius={[3, 3, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </MiniChart>
    </div>
  </div>
);

const panels = [Panel1, Panel2, Panel3, Panel4];

const SingleDashboard = () => {
  const [active, setActive] = useState(0);
  const ActivePanel = panels[active];

  return (
    <div className="h-dvh w-full flex flex-col overflow-hidden bg-background">
      {/* Header */}
      <header className="flex items-center gap-3 px-3 py-2 border-b border-border/50 bg-sidebar flex-shrink-0">
        <div className="w-7 h-7 rounded-lg gradient-primary flex items-center justify-center flex-shrink-0">
          <BarChart3 className="w-3.5 h-3.5 text-sidebar-primary-foreground" />
        </div>
        <h1 className="text-sm font-bold text-sidebar-accent-foreground">Dados MT</h1>
        {/* Tab buttons */}
        <nav className="flex items-center gap-1 ml-auto">
          {tabs.map((tab, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                active === i
                  ? "bg-sidebar-accent text-sidebar-primary"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50"
              }`}
            >
              <tab.icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </header>

      {/* Panel content — fills remaining height */}
      <div className="flex-1 min-h-0 p-2 overflow-hidden">
        <ActivePanel />
      </div>
    </div>
  );
};

export default SingleDashboard;
