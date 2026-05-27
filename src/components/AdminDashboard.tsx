import React, { useMemo, useCallback, memo } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Monitor, Play, Pause, Settings, LayoutGrid, LogOut, Activity, AlertTriangle, Sun, Moon } from "lucide-react";
import { useUIStore } from "@/hooks/use-ui-store";
import { usePlaybackStore } from "@/hooks/use-playback-store";
import { useAuth } from "@/contexts/AuthContext";
import { useServerFn } from "@tanstack/react-start";
import { togglePlaybackFn } from "@/lib/admin.functions";
import { toast } from "sonner";
import { useAuthErrorStore } from "@/hooks/use-auth-error-store";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { DashboardKanban } from "./DashboardKanban";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserManagement } from "./UserManagement";
import { useNavigate } from "@tanstack/react-router";

const CHART_DATA = [
  { month: "Jan", desktop: 186, mobile: 80 },
  { month: "Feb", desktop: 305, mobile: 200 },
  { month: "Mar", desktop: 237, mobile: 120 },
  { month: "Apr", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "Jun", desktop: 214, mobile: 140 },
];

const CHART_CONFIG = {
  desktop: { label: "Acessos", color: "var(--chart-1)" },
  mobile: { label: "Alertas", color: "var(--chart-2)" },
};

const ColumnCard = memo(({ index, status, onToggle }: { 
  index: number; 
  status: string; 
  onToggle: (idx: number, current: string) => void 
}) => (
  <Card className="bg-secondary/10 border-border p-6 flex flex-col gap-4 hover:border-primary/30 transition-all">
    <div className="flex justify-between items-center">
      <h3 className="font-bold uppercase tracking-widest text-[10px] opacity-50">Coluna {index + 1}</h3>
      <div className="flex gap-2">
        <button 
          onClick={() => onToggle(index, status)}
          className="p-2 hover:bg-secondary/20 rounded-full transition-colors group"
        >
          {status === 'RUNNING' ? (
            <Pause className="w-4 h-4 text-warning group-hover:scale-110 transition-transform" />
          ) : (
            <Play className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
          )}
        </button>
        <button className="p-2 hover:bg-secondary/20 rounded-full transition-colors opacity-40 hover:opacity-100">
          <Settings className="w-4 h-4" />
        </button>
      </div>
    </div>
    
    <div className="aspect-[9/16] bg-secondary/40 rounded-lg border border-border flex items-center justify-center overflow-hidden relative group">
      <div className="text-center z-10">
        <div className={`text-[10px] uppercase tracking-tighter mb-2 ${status === 'RUNNING' ? 'text-primary animate-pulse' : 'text-warning'}`}>
          {status}
        </div>
        <span className="text-[10px] opacity-20 uppercase tracking-tighter">Preview Live</span>
      </div>
      <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>

    <div className="space-y-2">
      <div className="text-[10px] opacity-40 uppercase font-medium">Fila Atual</div>
      <div className="bg-secondary/10 p-3 rounded border border-border flex items-center gap-3 hover:bg-secondary/20 transition-colors">
        <div className="w-8 h-8 bg-primary/20 rounded flex items-center justify-center text-primary text-[10px] font-bold">01</div>
        <div className="min-w-0">
          <div className="text-xs font-medium truncate text-foreground/80">Monitoramento MT</div>
          <div className="text-[9px] opacity-30 truncate">Economia // 60s</div>
        </div>
      </div>
    </div>
  </Card>
));

ColumnCard.displayName = 'ColumnCard';

export function AdminDashboard() {
  const { setAdmin } = useUIStore();
  const columnStates = usePlaybackStore((state) => state.columnStates);
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const { setShowLoginModal } = useAuthErrorStore();

  const togglePlaybackCall = useServerFn(togglePlaybackFn);

  const handleSignOut = useCallback(async () => {
    try {
      await signOut();
      setAdmin(false);
      navigate({ to: '/login', replace: true });
    } catch (error: any) {
      toast.error(`Erro ao sair: ${error?.message ?? 'desconhecido'}`);
    }
  }, [navigate, setAdmin, signOut]);

  const togglePlayback = useCallback(async (columnIndex: number, currentState: string) => {
    const newState = currentState === 'RUNNING' ? 'PAUSED' : 'RUNNING';
    try {
      await togglePlaybackCall({ data: { columnIndex, state: newState } });
      toast.success(`Coluna ${columnIndex + 1} ${newState === 'RUNNING' ? 'iniciada' : 'pausada'}`);
    } catch (error: any) {
      let msg = 'desconhecido';
      if (error instanceof Response) {
        msg = `${error.status} ${error.statusText || ''}`.trim();
        if (error.status === 401) {
          msg = 'Sessão expirada. Faça login novamente.';
          setShowLoginModal(true);
        }
      } else if (error?.message) {
        msg = error.message;
      }
      toast.error(`Erro ao atualizar coluna: ${msg}`);
    }
  }, [togglePlaybackCall]);

  return (
    <div className="p-8 bg-background min-h-screen text-foreground font-sans">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div className="flex gap-4 md:gap-6 items-center w-full md:w-auto">
          <img 
            src="https://rmetppilvfrxosvxzhgj.supabase.co/storage/v1/object/public/message-attachments/159f5cca-442d-405b-94e3-e77ee0afd383/1778614348714_bif60w_logocge_v1-negativo.png" 
            alt="Logo CGE-MT" 
            className="h-10 md:h-16 w-auto object-contain dark:brightness-200 shrink-0"
          />
          <div className="flex flex-col">
            <h2 className="text-xl md:text-2xl font-black tracking-tighter text-foreground leading-none uppercase italic">
              Painel de <span className="text-primary">Controle</span>
            </h2>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span className="text-[10px] font-bold tracking-[0.2em] text-primary/70 uppercase">Unidade de Inteligência - CGE-MT</span>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-3 md:gap-4 w-full md:w-auto">
          <button 
            onClick={() => document.documentElement.classList.toggle('light')}
            className="p-2 bg-secondary/10 hover:bg-secondary/20 rounded-md border border-border transition-colors"
            title="Alternar Tema"
          >
            <Sun className="w-4 h-4 hidden dark:block" />
            <Moon className="w-4 h-4 block dark:hidden" />
          </button>
          <button 
            onClick={() => {
              setAdmin(false);
              navigate({ to: '/', replace: true });
            }}
            className="flex items-center gap-2 bg-secondary/10 hover:bg-secondary/20 px-4 py-1 rounded-md text-sm border border-border transition-colors"
          >
            <LayoutGrid className="w-4 h-4" />
            EXIBIÇÃO
          </button>
          <button 
            onClick={handleSignOut}
            className="flex items-center gap-2 bg-destructive/10 hover:bg-destructive/20 px-4 py-1 rounded-md text-sm border border-destructive/20 text-destructive transition-colors"
          >
            <LogOut className="w-4 h-4" />
            SAIR
          </button>
        </div>
      </header>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="mb-8 bg-secondary/5 border border-border p-1">
          {['overview', 'kanban', 'users', 'settings'].map(val => (
            <TabsTrigger 
              key={val} 
              value={val} 
              className="uppercase tracking-[0.15em] text-[9px] font-bold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-6 py-2 transition-all"
            >
              {val === 'overview' ? 'Visão Geral' : val === 'kanban' ? 'Organização' : val === 'users' ? 'Usuários' : 'Ajustes'}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="overview" className="outline-none">
          <div className="mb-6 flex items-center gap-3">
            <div className="h-4 w-1 bg-primary rounded-full" />
            <h2 className="font-bold uppercase tracking-[0.2em] text-[10px] opacity-60">Gerenciamento de Terminais</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[0, 1, 2, 3].map((col) => (
              <ColumnCard 
                key={col} 
                index={col} 
                status={columnStates[col]?.status || 'RUNNING'} 
                onToggle={togglePlayback}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="kanban" className="outline-none">
          <DashboardKanban />
        </TabsContent>

        <TabsContent value="users" className="outline-none">
          <UserManagement />
        </TabsContent>

        <TabsContent value="settings" className="outline-none">
          <Card className="bg-secondary/5 border-border p-20 text-center shadow-inner">
            <Settings className="w-12 h-12 mx-auto mb-4 opacity-10 animate-[spin_8s_linear_infinite]" />
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] opacity-40">Módulo de Engenharia</h3>
            <p className="text-[11px] opacity-30 max-w-sm mx-auto mt-4 leading-relaxed">
              Configurações de infraestrutura e parâmetros globais de orquestração em fase de calibração.
            </p>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
