import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import KPICard from "@/components/dashboard/KPICard";
import ChartCard from "@/components/dashboard/ChartCard";
import FilterBar from "@/components/dashboard/FilterBar";
import { cities, periods, comercioExterior, principaisExportacoes, principaisDestinos, mercadoTrabalho, producaoAgricola } from "@/data/mockData";
import { DollarSign, TrendingUp, Briefcase, Ship } from "lucide-react";
import {
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, Legend, BarChart, Bar, PieChart, Pie, Cell,
} from "recharts";

const COLORS = [
  "hsl(174 72% 40%)",
  "hsl(199 89% 48%)",
  "hsl(262 52% 47%)",
  "hsl(43 96% 56%)",
  "hsl(0 72% 51%)",
  "hsl(142 71% 45%)",
];

const EconomyPage = () => {
  const [city, setCity] = useState("all");
  const [period, setPeriod] = useState("1y");

  const lastTrade = comercioExterior[comercioExterior.length - 1];
  const lastWork = mercadoTrabalho[mercadoTrabalho.length - 1];

  return (
    <DashboardLayout title="Economia" subtitle="Indicadores econômicos — Comércio Exterior, Agropecuária e Mercado de Trabalho">
      <FilterBar cities={cities} periods={periods} selectedCity={city} selectedPeriod={period} onCityChange={setCity} onPeriodChange={setPeriod} />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <KPICard title="Superávit Comercial" value={`US$ ${lastTrade.superavit} bi`} trend="up" trendValue={`4T 2025 — Exp. US$ ${lastTrade.exportacao} bi`} icon={Ship} />
        <KPICard title="Principal Export." value="Soja — 31%" trend="up" trendValue="do total das exportações" icon={DollarSign} />
        <KPICard title="Taxa de Emprego" value={`${lastWork.emprego}%`} trend="up" trendValue={`Renda média R$ ${lastWork.renda}`} icon={Briefcase} />
        <KPICard title="Crescimento PIB" value="+12,9%" trend="up" trendValue="2022 → 2023" icon={TrendingUp} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard title="Comércio Exterior" subtitle="Exportação vs Importação (US$ bilhões) | Fonte: SEPLAG">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={comercioExterior}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 20% 18%)" />
              <XAxis dataKey="trimestre" stroke="hsl(220 10% 46%)" fontSize={10} />
              <YAxis stroke="hsl(220 10% 46%)" fontSize={12} />
              <Tooltip contentStyle={{ backgroundColor: "hsl(220 25% 12%)", border: "1px solid hsl(220 20% 18%)", borderRadius: 8, color: "hsl(220 10% 92%)" }} formatter={(value: number) => [`US$ ${value} bi`, ""]} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Line type="monotone" dataKey="exportacao" name="Exportação" stroke="hsl(174 72% 40%)" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="importacao" name="Importação" stroke="hsl(43 96% 56%)" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="superavit" name="Superávit" stroke="hsl(199 89% 48%)" strokeWidth={2} strokeDasharray="5 5" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Destinos das Exportações" subtitle="Principais países importadores de MT">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={principaisDestinos} cx="50%" cy="50%" innerRadius={55} outerRadius={95} paddingAngle={3} dataKey="percentual" nameKey="pais">
                {principaisDestinos.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Legend wrapperStyle={{ fontSize: 11, color: "hsl(220 10% 46%)" }} />
              <Tooltip contentStyle={{ backgroundColor: "hsl(220 25% 12%)", border: "1px solid hsl(220 20% 18%)", borderRadius: 8, color: "hsl(220 10% 92%)" }} formatter={(value: number) => [`${value}%`, ""]} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard title="Mercado de Trabalho" subtitle="Taxa de emprego (%) e renda média (R$) | Fonte: SEPLAG">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={mercadoTrabalho}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 20% 18%)" />
              <XAxis dataKey="trimestre" stroke="hsl(220 10% 46%)" fontSize={10} />
              <YAxis stroke="hsl(220 10% 46%)" fontSize={12} domain={[70, 85]} />
              <Tooltip contentStyle={{ backgroundColor: "hsl(220 25% 12%)", border: "1px solid hsl(220 20% 18%)", borderRadius: 8, color: "hsl(220 10% 92%)" }} />
              <Bar dataKey="emprego" name="Emprego (%)" fill="hsl(262 52% 47%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Produção Agrícola" subtitle="Principais culturas — milhões de toneladas | Fonte: SEDEC">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={producaoAgricola} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 20% 18%)" />
              <XAxis type="number" stroke="hsl(220 10% 46%)" fontSize={12} />
              <YAxis type="category" dataKey="cultura" stroke="hsl(220 10% 46%)" fontSize={11} width={70} />
              <Tooltip contentStyle={{ backgroundColor: "hsl(220 25% 12%)", border: "1px solid hsl(220 20% 18%)", borderRadius: 8, color: "hsl(220 10% 92%)" }} formatter={(value: number) => [`${value} M ton`, ""]} />
              <Bar dataKey="producao" name="Produção" fill="hsl(174 72% 40%)" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </DashboardLayout>
  );
};

export default EconomyPage;
