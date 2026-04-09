import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import KPICard from "@/components/dashboard/KPICard";
import ChartCard from "@/components/dashboard/ChartCard";
import FilterBar from "@/components/dashboard/FilterBar";
import { cities, periods, economyData, populationData, sectorPieData } from "@/data/mockData";
import { Users, TrendingUp, DollarSign, Building2 } from "lucide-react";
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
    <DashboardLayout title="Visão Geral" subtitle="Resumo dos indicadores do Mato Grosso">
      <FilterBar
        cities={cities}
        periods={periods}
        selectedCity={city}
        selectedPeriod={period}
        onCityChange={setCity}
        onPeriodChange={setPeriod}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <KPICard title="População Total" value="3,6M" trend="up" trendValue="+2.3%" icon={Users} />
        <KPICard title="PIB Estadual" value="R$ 5,5 Bi" trend="up" trendValue="+8.2%" icon={DollarSign} />
        <KPICard title="Taxa de Emprego" value="82%" trend="up" trendValue="+3.1%" icon={TrendingUp} />
        <KPICard title="Municípios Ativos" value="141" trend="neutral" trendValue="Estável" icon={Building2} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard title="Evolução do PIB" subtitle="Em milhões (R$) - últimos 12 meses">
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={economyData}>
              <defs>
                <linearGradient id="colorPib" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(174 72% 40%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(174 72% 40%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 20% 18%)" />
              <XAxis dataKey="month" stroke="hsl(220 10% 46%)" fontSize={12} />
              <YAxis stroke="hsl(220 10% 46%)" fontSize={12} />
              <Tooltip
                contentStyle={{ backgroundColor: "hsl(220 25% 12%)", border: "1px solid hsl(220 20% 18%)", borderRadius: 8, color: "hsl(220 10% 92%)" }}
              />
              <Area type="monotone" dataKey="pib" stroke="hsl(174 72% 40%)" fillOpacity={1} fill="url(#colorPib)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="PIB por Setor" subtitle="Distribuição percentual">
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={sectorPieData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={4} dataKey="value">
                {sectorPieData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Legend wrapperStyle={{ fontSize: 12, color: "hsl(220 10% 46%)" }} />
              <Tooltip contentStyle={{ backgroundColor: "hsl(220 25% 12%)", border: "1px solid hsl(220 20% 18%)", borderRadius: 8, color: "hsl(220 10% 92%)" }} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <ChartCard title="População por Cidade" subtitle="Habitantes">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={populationData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 20% 18%)" />
            <XAxis dataKey="city" stroke="hsl(220 10% 46%)" fontSize={11} />
            <YAxis stroke="hsl(220 10% 46%)" fontSize={11} />
            <Tooltip contentStyle={{ backgroundColor: "hsl(220 25% 12%)", border: "1px solid hsl(220 20% 18%)", borderRadius: 8, color: "hsl(220 10% 92%)" }} />
            <Bar dataKey="population" fill="hsl(199 89% 48%)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>
    </DashboardLayout>
  );
};

export default OverviewPage;
