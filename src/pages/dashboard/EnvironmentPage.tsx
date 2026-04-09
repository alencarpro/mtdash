import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import KPICard from "@/components/dashboard/KPICard";
import ChartCard from "@/components/dashboard/ChartCard";
import FilterBar from "@/components/dashboard/FilterBar";
import { cities, periods, desmatamentoData, biomaData, qualidadeArData, vegetacaoNativa, obrasData, investimentoInfra } from "@/data/mockData";
import { TreePine, Wind, Construction, Leaf } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, Legend, PieChart, Pie, Cell, AreaChart, Area,
} from "recharts";

const BIOMA_COLORS = ["hsl(142 71% 45%)", "hsl(43 96% 56%)", "hsl(199 89% 48%)"];

const obrasChartData = obrasData.map(d => ({
  ...d,
  total: d.concluidas + d.emAndamento + d.planejadas,
}));

const EnvironmentPage = () => {
  const [city, setCity] = useState("all");
  const [period, setPeriod] = useState("1y");

  const lastDesm = desmatamentoData[desmatamentoData.length - 1];

  return (
    <DashboardLayout title="Ambiental & Infraestrutura" subtitle="Meio Ambiente, Vegetação Nativa, Qualidade do Ar e Obras Públicas">
      <FilterBar cities={cities} periods={periods} selectedCity={city} selectedPeriod={period} onCityChange={setCity} onPeriodChange={setPeriod} />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <KPICard title="Vegetação Preservada" value={`${vegetacaoNativa.vegetacaoPreservada}%`} trend="neutral" trendValue={`${(vegetacaoNativa.areaProtegida / 1000).toFixed(0)} mil km² protegidos`} icon={TreePine} />
        <KPICard title="Desmatamento (2023)" value={`${lastDesm.area} km²`} trend="down" trendValue="-10,2% vs 2022 | Fonte: SEMA" icon={Leaf} />
        <KPICard title="Qualidade do Ar" value="IQA variável" trend="neutral" trendValue="Crítico Jul–Set (queimadas)" icon={Wind} />
        <KPICard title="Obras em Andamento" value={obrasData.reduce((a, b) => a + b.emAndamento, 0).toString()} trend="up" trendValue={`${obrasData.reduce((a, b) => a + b.concluidas, 0)} concluídas | SINFRA`} icon={Construction} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard title="Desmatamento Anual" subtitle="Área desmatada (km²) e alertas emitidos | Fonte: SEMA">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={desmatamentoData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 20% 18%)" />
              <XAxis dataKey="year" stroke="hsl(220 10% 46%)" fontSize={12} />
              <YAxis stroke="hsl(220 10% 46%)" fontSize={12} />
              <Tooltip contentStyle={{ backgroundColor: "hsl(220 25% 12%)", border: "1px solid hsl(220 20% 18%)", borderRadius: 8, color: "hsl(220 10% 92%)" }} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="area" name="Área (km²)" fill="hsl(0 72% 51%)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="alertas" name="Alertas" fill="hsl(43 96% 56%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Biomas de MT" subtitle="Distribuição territorial (%)">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={biomaData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={4} dataKey="percentual" nameKey="name">
                {biomaData.map((_, i) => (
                  <Cell key={i} fill={BIOMA_COLORS[i]} />
                ))}
              </Pie>
              <Legend wrapperStyle={{ fontSize: 12, color: "hsl(220 10% 46%)" }} />
              <Tooltip contentStyle={{ backgroundColor: "hsl(220 25% 12%)", border: "1px solid hsl(220 20% 18%)", borderRadius: 8, color: "hsl(220 10% 92%)" }} formatter={(value: number) => [`${value}%`, ""]} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard title="Qualidade do Ar" subtitle="Índice de Qualidade do Ar mensal (IQA) | Fonte: SEMA/UFMT">
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={qualidadeArData}>
              <defs>
                <linearGradient id="colorIqa" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(43 96% 56%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(43 96% 56%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 20% 18%)" />
              <XAxis dataKey="mes" stroke="hsl(220 10% 46%)" fontSize={12} />
              <YAxis stroke="hsl(220 10% 46%)" fontSize={12} />
              <Tooltip contentStyle={{ backgroundColor: "hsl(220 25% 12%)", border: "1px solid hsl(220 20% 18%)", borderRadius: 8, color: "hsl(220 10% 92%)" }} formatter={(value: number, name: string, props: any) => [`IQA ${value} — ${props.payload.classificacao}`, ""]} />
              <Area type="monotone" dataKey="iqa" stroke="hsl(43 96% 56%)" fillOpacity={1} fill="url(#colorIqa)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Investimento em Infraestrutura" subtitle="Em bilhões (R$) por ano | Fonte: SINFRA">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={investimentoInfra}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 20% 18%)" />
              <XAxis dataKey="year" stroke="hsl(220 10% 46%)" fontSize={12} />
              <YAxis stroke="hsl(220 10% 46%)" fontSize={12} />
              <Tooltip contentStyle={{ backgroundColor: "hsl(220 25% 12%)", border: "1px solid hsl(220 20% 18%)", borderRadius: 8, color: "hsl(220 10% 92%)" }} formatter={(value: number) => [`R$ ${value} bi`, ""]} />
              <Bar dataKey="investimento" name="Investimento" fill="hsl(174 72% 40%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <ChartCard title="Obras por Categoria" subtitle="Concluídas, em andamento e planejadas | Fonte: SINFRA">
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={obrasData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 20% 18%)" />
            <XAxis dataKey="tipo" stroke="hsl(220 10% 46%)" fontSize={11} />
            <YAxis stroke="hsl(220 10% 46%)" fontSize={12} />
            <Tooltip contentStyle={{ backgroundColor: "hsl(220 25% 12%)", border: "1px solid hsl(220 20% 18%)", borderRadius: 8, color: "hsl(220 10% 92%)" }} />
            <Legend wrapperStyle={{ fontSize: 11 }} />
            <Bar dataKey="concluidas" name="Concluídas" fill="hsl(142 71% 45%)" radius={[2, 2, 0, 0]} />
            <Bar dataKey="emAndamento" name="Em Andamento" fill="hsl(43 96% 56%)" radius={[2, 2, 0, 0]} />
            <Bar dataKey="planejadas" name="Planejadas" fill="hsl(199 89% 48%)" radius={[2, 2, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>
    </DashboardLayout>
  );
};

export default EnvironmentPage;
