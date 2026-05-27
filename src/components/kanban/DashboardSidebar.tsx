import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { KanbanCard } from './KanbanCard';
import { Database } from '@/integrations/supabase/types';

type Dashboard = Database['public']['Tables']['dashboards']['Row'];

interface DashboardSidebarProps {
  dashboards: Dashboard[];
  onDelete: (id: string) => Promise<boolean>;
  onUpdate: (id: string, updates: Partial<Dashboard>) => Promise<boolean>;
}

export function DashboardSidebar({ dashboards, onDelete, onUpdate }: DashboardSidebarProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: 'sidebar',
  });

  return (
    <div 
      ref={setNodeRef}
      className={`w-72 bg-secondary/5 border border-border rounded-xl flex flex-col flex-shrink-0 transition-colors ${isOver ? 'bg-secondary/20 border-primary/50' : ''}`}
    >
      <div className="p-4 border-b border-border">
        <h3 className="font-bold uppercase tracking-widest text-[10px] opacity-60">
          Dashboards Disponíveis
          <span className="ml-2 text-muted-foreground">({dashboards.length})</span>
        </h3>
      </div>
      
      <div className="flex-1 p-3 space-y-3 overflow-y-auto">
        <SortableContext items={dashboards.map(d => d.id)} strategy={verticalListSortingStrategy}>
          {dashboards.map(dashboard => (
            <KanbanCard 
              key={dashboard.id} 
              dashboard={dashboard} 
              onDelete={onDelete}
              onUpdate={onUpdate}
            />
          ))}
        </SortableContext>
        
        {dashboards.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center opacity-20 text-center p-4">
            <p className="text-xs uppercase tracking-tighter">Todas as dashboards estão em colunas</p>
          </div>
        )}
      </div>
    </div>
  );
}
