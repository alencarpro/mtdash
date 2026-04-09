import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import KPICard from "@/components/dashboard/KPICard";
import ChartCard from "@/components/dashboard/ChartCard";
import FilterBar from "@/components/dashboard/FilterBar";
import { cities, periods, educacaoData, saudeData, segurancaData, assistenciaSocial, icqvData } from "@/data/mockData";
import { GraduationCap, HeartPulse, Shield, Users } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, Legend, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
} from "recharts";

const radarAvg = [
  { subject: "Saúde", value: Math.round(icqvData.reduce((a, b) => a + b.saude, 0) / icqvData.length * 100) },
  { subject: "Educação", value: Math.round(icqvData.reduce((a, b) => a + b.educacao, 0) / icqvData.length * 100) },
  { subject: "Economia", value: Math.round(icqvData.reduce((a, b) => a + b.economia, 0) / icqvData.length * 100) },
  { subject: "ICQV", value: Math.round(icqvData.reduce((a, b) => a + b.icqv, 0) / icqvData.length * 100) },
];

const SocialPage = () => {
  const [city, setCity] = useState("all");
  const [period, setPeriod] = useState("1y");

  const lastEdu = educacaoData[educacaoData.length - 1];

  return (
    <DashboardLayout title="Social" subtitle="Educação, Saúde, Segurança Pública e Assistência Social">
      <FilterBar cities={cities} periods={periods} selectedCity={city} selectedPeriod={period} onCityChange={setCity} onPeriodChange={setPeriod} />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <KPICard title="IDEB (2023)" value={lastEdu.ideb.toString()} trend="up" trendValue={`${lastEdu.matriculas.toLocaleString()} matrículas`} icon={GraduationCap} />
        <KPICard title="Leitos Hospitalares" value={saudeData.leitos.toLocaleString()} trend="neutral" trendValue={`${saudeData.leitosUTI} UTI — Cobertura ${saudeData.coberturaSUS}`} icon={HeartPulse} />
        <KPICard title="Segurança Pública" value={segurancaData[segurancaData.length - 1].ocorrencias.toLocaleString()} trend="down" trendValue="Ocorrências 2023 — queda de 3,4%" icon={Shield} />
        <KPICard title="Famílias CadÚnico" value={assistenciaSocial.familiasCadUnico.toLocaleString()} trend="neutral" trendValue={`Descobertura BF: ${assistenciaSocial.descobertura}`} icon={Users} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard title="Evolução do IDEB" subtitle="Índice de Desenvolvimento da Educação Básica | Fonte: SEDUC">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={educacaoData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 20% 18%)" />
              <XAxis dataKey="year" stroke="hsl(220 10% 46%)" fontSize={12} />
              <YAxis stroke="hsl(220 10% 46%)" fontSize={12} domain={[4, 6]} />
              <Tooltip contentStyle={{ backgroundColor: "hsl(220 25% 12%)", border: "1px solid hsl(220 20% 18%)", borderRadius: 8, color: "hsl(220 10% 92%)" }} />
              <Line type="monotone" dataKey="ideb" name="IDEB" stroke="hsl(174 72% 40%)" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Segurança Pública" subtitle="Ocorrências e homicídios por ano | Fonte: SESP">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={segurancaData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 20% 18%)" />
              <XAxis dataKey="year" stroke="hsl(220 10% 46%)" fontSize={12} />
              <YAxis stroke="hsl(220 10% 46%)" fontSize={12} />
              <Tooltip contentStyle={{ backgroundColor: "hsl(220 25% 12%)", border: "1px solid hsl(220 20% 18%)", borderRadius: 8, color: "hsl(220 10% 92%)" }} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="ocorrencias" name="Ocorrências" fill="hsl(199 89% 48%)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="homicidios" name="Homicídios" fill="hsl(0 72% 51%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard title="ICQV por Município" subtitle="Índice de Condição e Qualidade de Vida | Fonte: SEPLAG">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={icqvData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 20% 18%)" />
              <XAxis dataKey="city" stroke="hsl(220 10% 46%)" fontSize={10} />
              <YAxis stroke="hsl(220 10% 46%)" fontSize={12} domain={[0, 1]} />
              <Tooltip contentStyle={{ backgroundColor: "hsl(220 25% 12%)", border: "1px solid hsl(220 20% 18%)", borderRadius: 8, color: "hsl(220 10% 92%)" }} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Bar dataKey="saude" name="Saúde" fill="hsl(0 72% 51%)" radius={[2, 2, 0, 0]} />
              <Bar dataKey="educacao" name="Educação" fill="hsl(199 89% 48%)" radius={[2, 2, 0, 0]} />
              <Bar dataKey="economia" name="Economia" fill="hsl(174 72% 40%)" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Radar — Médias Estaduais" subtitle="ICQV: Saúde, Educação e Economia">
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={radarAvg}>
              <PolarGrid stroke="hsl(220 20% 18%)" />
              <PolarAngleAxis dataKey="subject" stroke="hsl(220 10% 46%)" fontSize={12} />
              <PolarRadiusAxis stroke="hsl(220 10% 46%)" fontSize={10} domain={[0, 100]} />
              <Radar name="Média MT" dataKey="value" stroke="hsl(174 72% 40%)" fill="hsl(174 72% 40%)" fillOpacity={0.3} />
            </RadarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </DashboardLayout>
  );
};

export default SocialPage;
