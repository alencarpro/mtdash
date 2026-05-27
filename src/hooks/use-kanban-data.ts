import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';
import { Database } from '@/integrations/supabase/types';
import { toast } from 'sonner';
import { useServerFn } from '@tanstack/react-start';
import { updateDashboardFn, deleteDashboardFn, createDashboardFn } from '@/lib/admin.functions';
import { useAuthErrorStore } from './use-auth-error-store';

type Dashboard = Database['public']['Tables']['dashboards']['Row'];
type DashboardColumn = Database['public']['Tables']['dashboard_columns']['Row'];

export function useKanbanData() {
  const [dashboards, setDashboards] = useState<Dashboard[]>([]);
  const [columns, setColumns] = useState<DashboardColumn[]>([]);
  const [loading, setLoading] = useState(true);
  const { setShowLoginModal } = useAuthErrorStore();

  const fetchData = async () => {
    try {
      setLoading(true);
      const [dashboardsRes, columnsRes] = await Promise.all([
        supabase.from('dashboards').select('*').order('order_index'),
        supabase.from('dashboard_columns').select('*').order('order_index')
      ]);

      if (dashboardsRes.error) throw dashboardsRes.error;
      if (columnsRes.error) throw columnsRes.error;

      setDashboards(dashboardsRes.data || []);
      setColumns(columnsRes.data || []);
    } catch (error: any) {
      if (error?.status === 401 || error?.code === 'PGRST301' || (error instanceof Response && error.status === 401)) {
        console.warn('Sessão expirada ou não autorizada ao carregar dados do Kanban');
        setShowLoginModal(true);
      } else {
        toast.error('Erro ao carregar dados: ' + (error?.message || 'Erro desconhecido'));
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    const dashboardSub = supabase
      .channel('kanban-changes')
      .on('postgres_changes' as any, { event: '*', table: 'dashboards', schema: 'public' }, () => fetchData())
      .on('postgres_changes' as any, { event: '*', table: 'dashboard_columns', schema: 'public' }, () => fetchData())
      .subscribe();

    return () => {
      supabase.removeChannel(dashboardSub);
    };
  }, []);

  const updateDashboardCall = useServerFn(updateDashboardFn);
  const deleteDashboardCall = useServerFn(deleteDashboardFn);
  const createDashboardCall = useServerFn(createDashboardFn);

  const updateDashboard = async (id: string, updates: Partial<Dashboard>) => {
    const oldDashboards = [...dashboards];
    setDashboards(prev => prev.map(d => d.id === id ? { ...d, ...updates } : d));
    try {
      await updateDashboardCall({ data: { id, updates: updates as any } });
      return true;
    } catch (error: any) {
      setDashboards(oldDashboards);
      toast.error('Erro ao atualizar: ' + (error?.message ?? 'desconhecido'));
      return false;
    }
  };

  const deleteDashboard = async (id: string) => {
    try {
      await deleteDashboardCall({ data: { id } });
      toast.success('Dashboard excluída com sucesso');
      return true;
    } catch (error: any) {
      toast.error('Erro ao excluir: ' + (error?.message ?? 'desconhecido'));
      return false;
    }
  };

  const createDashboard = async (input: {
    name: string;
    description?: string | null;
    category: string;
    source_url: string;
    refresh_interval?: number;
    status?: 'ACTIVE' | 'INACTIVE';
    column_id?: string | null;
  }) => {
    try {
      await createDashboardCall({ data: { ...input, status: input.status ?? 'ACTIVE' } as any });
      toast.success('Dashboard criada com sucesso!');
      await fetchData();
      return true;
    } catch (error: any) {
      toast.error('Erro ao criar dashboard: ' + (error?.message ?? 'desconhecido'));
      return false;
    }
  };

  return {
    dashboards,
    columns,
    loading,
    updateDashboard,
    deleteDashboard,
    createDashboard,
    refresh: fetchData,
  };
}
