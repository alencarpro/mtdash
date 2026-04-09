import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import KPICard from "@/components/dashboard/KPICard";
import ChartCard from "@/components/dashboard/ChartCard";
import FilterBar from "@/components/dashboard/FilterBar";
import { cities, periods, populationData, demographicsTrendData } from "@/data/mockData";
import { Users, Baby, GraduationCap, HeartPulse } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, Legend,
} from "recharts";

const DemographicsPage = () => {
  const [city, setCity] = useState("all");
  const [period, setPeriod] = useState("1y");

  return (
    <DashboardLayout title="Demografia" subtitle="Indicadores demográficos das cidades de MT">
      <FilterBar cities={cities} periods={periods} selectedCity={city} selectedPeriod={period} onCityChange={setCity} onPeriodChange={setPeriod} />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <KPICard title="IDH Médio" value="0.762" trend="up" trendValue="+0.014" icon={HeartPulse} />
        <KPICard title="Taxa de Natalidade" value="14.2‰" trend="down" trendValue="-0.8‰" icon={Baby} />
        <KPICard title="Alfabetização" value="94%" trend="up" trendValue="+0.5%" icon={GraduationCap} />
        <KPICard title="Urbanização" value="86%" trend="up" trendValue="+1.2%" icon={Users} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard title="Crescimento Populacional (%)" subtitle="Taxa anual por cidade">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={populationData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 20% 18%)" />
              <XAxis dataKey="city" stroke="hsl(220 10% 46%)" fontSize={11} />
              <YAxis stroke="hsl(220 10% 46%)" fontSize={12} />
              <Tooltip contentStyle={{ backgroundColor: "hsl(220 25% 12%)", border: "1px solid hsl(220 20% 18%)", borderRadius: 8, color: "hsl(220 10% 92%)" }} />
              <Bar dataKey="growth" fill="hsl(174 72% 40%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Tendências Demográficas" subtitle="Evolução 2018–2025">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={demographicsTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 20% 18%)" />
              <XAxis dataKey="year" stroke="hsl(220 10% 46%)" fontSize={12} />
              <YAxis stroke="hsl(220 10% 46%)" fontSize={12} />
              <Tooltip contentStyle={{ backgroundColor: "hsl(220 25% 12%)", border: "1px solid hsl(220 20% 18%)", borderRadius: 8, color: "hsl(220 10% 92%)" }} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Line type="monotone" dataKey="urbanizacao" name="Urbanização (%)" stroke="hsl(174 72% 40%)" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="alfabetizacao" name="Alfabetização (%)" stroke="hsl(199 89% 48%)" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </DashboardLayout>
  );
};

export default DemographicsPage;
