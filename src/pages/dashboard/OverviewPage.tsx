import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import KPICard from "@/components/dashboard/KPICard";
import ChartCard from "@/components/dashboard/ChartCard";
import FilterBar from "@/components/dashboard/FilterBar";
import { cities, periods, overviewKPIs, pibEvolution, sectorPieData, populationData } from "@/data/mockData";
import { DollarSign, TrendingUp, Building2, BarChart3 } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, AreaChart, Area,
} from "recharts";

const COLORS = [
  "hsl(174 72% 40%)",
  "hsl(199 89% 48%)",
  "hsl(262 52% 47%)",
  "hsl(43 96% 56%)",
];

const OverviewPage = () => {
  const [city, setCity] = useState("all");
  const [period, setPeriod] = useState("1y");

  return (
    <DashboardLayout title="Visão Geral — Mato Grosso" subtitle="Indicadores consolidados do Portal de Dados Públicos de MT">
      <FilterBar cities={cities} periods={periods} selectedCity={city} selectedPeriod={period} onCityChange={setCity} onPeriodChange={setPeriod} />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <KPICard title="PIB Estadual (2023)" value={overviewKPIs.pibTotal} trend="up" trendValue={`${overviewKPIs.pibRanking} — Part. ${overviewKPIs.pibParticipacao}`} icon={DollarSign} />
        <KPICard title="Crescimento Médio do PIB" value={overviewKPIs.crescimentoMedio} trend="up" trendValue={overviewKPIs.crescimentoPeriodo} icon={TrendingUp} />
        <KPICard title="PIB per Capita" value={overviewKPIs.pibPerCapita} trend="up" trendValue={overviewKPIs.pibPerCapitaRanking} icon={BarChart3} />
        <KPICard title="Municípios" value={overviewKPIs.municipios} trend="neutral" trendValue="Total do estado" icon={Building2} />
      </div>

      <div className="grid grid-cols-1 gap-4">
        <ChartCard title="Evolução do PIB" subtitle="Em bilhões (R$) — 2018 a 2023 | Fonte: SEPLAG/IBGE">
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={pibEvolution}>
              <defs>
                <linearGradient id="colorPib" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(174 72% 40%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(174 72% 40%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 20% 18%)" />
              <XAxis dataKey="year" stroke="hsl(220 10% 46%)" fontSize={12} />
              <YAxis stroke="hsl(220 10% 46%)" fontSize={12} />
              <Tooltip contentStyle={{ backgroundColor: "hsl(220 25% 12%)", border: "1px solid hsl(220 20% 18%)", borderRadius: 8, color: "hsl(220 10% 92%)" }} formatter={(value: number) => [`R$ ${value} bi`, "PIB"]} />
              <Area type="monotone" dataKey="pib" stroke="hsl(174 72% 40%)" fillOpacity={1} fill="url(#colorPib)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="PIB por Setor" subtitle="Distribuição percentual — Valor Adicionado Bruto">
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={sectorPieData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={4} dataKey="value">
                {sectorPieData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Legend wrapperStyle={{ fontSize: 12, color: "hsl(220 10% 46%)" }} />
              <Tooltip contentStyle={{ backgroundColor: "hsl(220 25% 12%)", border: "1px solid hsl(220 20% 18%)", borderRadius: 8, color: "hsl(220 10% 92%)" }} formatter={(value: number) => [`${value}%`, ""]} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <ChartCard title="PIB Municipal" subtitle="Em bilhões (R$) — Principais municípios | Fonte: SEPLAG">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={populationData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 20% 18%)" />
            <XAxis dataKey="city" stroke="hsl(220 10% 46%)" fontSize={11} />
            <YAxis stroke="hsl(220 10% 46%)" fontSize={11} />
            <Tooltip contentStyle={{ backgroundColor: "hsl(220 25% 12%)", border: "1px solid hsl(220 20% 18%)", borderRadius: 8, color: "hsl(220 10% 92%)" }} formatter={(value: number) => [`R$ ${value} bi`, "PIB Municipal"]} />
            <Bar dataKey="pibMunicipal" radius={[4, 4, 0, 0]}>
              {populationData.map((entry, index) => (
                <Cell key={index} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>
    </DashboardLayout>
  );
};

export default OverviewPage;
