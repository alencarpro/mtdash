import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import KPICard from "@/components/dashboard/KPICard";
import ChartCard from "@/components/dashboard/ChartCard";
import FilterBar from "@/components/dashboard/FilterBar";
import { cities, periods, economyData, sectorPieData } from "@/data/mockData";
import { DollarSign, TrendingUp, Briefcase, Landmark } from "lucide-react";
import {
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, Legend, BarChart, Bar,
} from "recharts";

const EconomyPage = () => {
  const [city, setCity] = useState("all");
  const [period, setPeriod] = useState("1y");

  return (
    <DashboardLayout title="Economia" subtitle="Indicadores econômicos e financeiros">
      <FilterBar cities={cities} periods={periods} selectedCity={city} selectedPeriod={period} onCityChange={setCity} onPeriodChange={setPeriod} />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <KPICard title="PIB Total" value="R$ 5,5 Bi" trend="up" trendValue="+8.2%" icon={DollarSign} />
        <KPICard title="Arrecadação" value="R$ 1,16 Bi" trend="up" trendValue="+5.4%" icon={Landmark} />
        <KPICard title="Emprego Formal" value="82%" trend="up" trendValue="+3.1%" icon={Briefcase} />
        <KPICard title="Crescimento" value="+4.8%" trend="up" trendValue="vs ano anterior" icon={TrendingUp} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard title="PIB vs Arrecadação" subtitle="Evolução mensal (R$ milhões)">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={economyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 20% 18%)" />
              <XAxis dataKey="month" stroke="hsl(220 10% 46%)" fontSize={12} />
              <YAxis stroke="hsl(220 10% 46%)" fontSize={12} />
              <Tooltip contentStyle={{ backgroundColor: "hsl(220 25% 12%)", border: "1px solid hsl(220 20% 18%)", borderRadius: 8, color: "hsl(220 10% 92%)" }} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Line type="monotone" dataKey="pib" name="PIB" stroke="hsl(174 72% 40%)" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="arrecadacao" name="Arrecadação" stroke="hsl(43 96% 56%)" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Emprego Formal (%)" subtitle="Taxa mensal de ocupação">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={economyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 20% 18%)" />
              <XAxis dataKey="month" stroke="hsl(220 10% 46%)" fontSize={12} />
              <YAxis stroke="hsl(220 10% 46%)" fontSize={12} domain={[60, 90]} />
              <Tooltip contentStyle={{ backgroundColor: "hsl(220 25% 12%)", border: "1px solid hsl(220 20% 18%)", borderRadius: 8, color: "hsl(220 10% 92%)" }} />
              <Bar dataKey="emprego" fill="hsl(262 52% 47%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </DashboardLayout>
  );
};

export default EconomyPage;
