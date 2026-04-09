import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import KPICard from "@/components/dashboard/KPICard";
import ChartCard from "@/components/dashboard/ChartCard";
import FilterBar from "@/components/dashboard/FilterBar";
import { cities, periods, infraData } from "@/data/mockData";
import { Droplets, Route, Stethoscope, School } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Legend,
} from "recharts";

const radarData = infraData.map((d) => ({
  city: d.city,
  Saneamento: d.saneamento,
  Pavimentação: d.pavimentacao,
  Saúde: d.saude,
  Educação: d.educacao,
}));

const avgData = [
  { subject: "Saneamento", value: Math.round(infraData.reduce((a, b) => a + b.saneamento, 0) / infraData.length) },
  { subject: "Pavimentação", value: Math.round(infraData.reduce((a, b) => a + b.pavimentacao, 0) / infraData.length) },
  { subject: "Saúde", value: Math.round(infraData.reduce((a, b) => a + b.saude, 0) / infraData.length) },
  { subject: "Educação", value: Math.round(infraData.reduce((a, b) => a + b.educacao, 0) / infraData.length) },
];

const InfrastructurePage = () => {
  const [city, setCity] = useState("all");
  const [period, setPeriod] = useState("1y");

  return (
    <DashboardLayout title="Infraestrutura" subtitle="Índices de infraestrutura e serviços públicos">
      <FilterBar cities={cities} periods={periods} selectedCity={city} selectedPeriod={period} onCityChange={setCity} onPeriodChange={setPeriod} />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <KPICard title="Saneamento Médio" value="76%" trend="up" trendValue="+2.1%" icon={Droplets} />
        <KPICard title="Pavimentação" value="72%" trend="up" trendValue="+1.8%" icon={Route} />
        <KPICard title="Cobertura de Saúde" value="72%" trend="neutral" trendValue="Estável" icon={Stethoscope} />
        <KPICard title="Índice Educação" value="78%" trend="up" trendValue="+1.5%" icon={School} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard title="Índices por Cidade" subtitle="Saneamento e Pavimentação (%)">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={infraData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 20% 18%)" />
              <XAxis dataKey="city" stroke="hsl(220 10% 46%)" fontSize={11} />
              <YAxis stroke="hsl(220 10% 46%)" fontSize={12} />
              <Tooltip contentStyle={{ backgroundColor: "hsl(220 25% 12%)", border: "1px solid hsl(220 20% 18%)", borderRadius: 8, color: "hsl(220 10% 92%)" }} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="saneamento" name="Saneamento" fill="hsl(174 72% 40%)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="pavimentacao" name="Pavimentação" fill="hsl(199 89% 48%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Radar de Infraestrutura" subtitle="Média estadual por categoria">
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={avgData}>
              <PolarGrid stroke="hsl(220 20% 18%)" />
              <PolarAngleAxis dataKey="subject" stroke="hsl(220 10% 46%)" fontSize={12} />
              <PolarRadiusAxis stroke="hsl(220 10% 46%)" fontSize={10} />
              <Radar name="Média MT" dataKey="value" stroke="hsl(174 72% 40%)" fill="hsl(174 72% 40%)" fillOpacity={0.3} />
            </RadarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </DashboardLayout>
  );
};

export default InfrastructurePage;
