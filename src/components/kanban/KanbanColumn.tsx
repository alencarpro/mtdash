import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { KanbanCard } from './KanbanCard';
import { Database } from '@/integrations/supabase/types';

type Dashboard = Database['public']['Tables']['dashboards']['Row'];

interface KanbanColumnProps {
  column: Database['public']['Tables']['dashboard_columns']['Row'];
  dashboards: Dashboard[];
  onDelete: (id: string) => Promise<boolean>;
  onUpdate: (id: string, updates: Partial<Dashboard>) => Promise<boolean>;
}

export function KanbanColumn({ column, dashboards, onDelete, onUpdate }: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: column.id,
  });

  return (
    <div 
      ref={setNodeRef}
      className={`flex flex-col w-72 bg-secondary/5 border border-border rounded-xl flex-shrink-0 transition-colors ${isOver ? 'bg-secondary/20 border-primary/50' : ''}`}
    >
      <div className="p-4 border-b border-border flex justify-between items-center">
        <h3 className="font-bold uppercase tracking-widest text-[10px] opacity-60">
          {column.name}
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
          <div className="h-24 border-2 border-dashed border-border rounded-lg flex items-center justify-center">
            <span className="text-[10px] uppercase opacity-20 tracking-tighter">Arraste aqui</span>
          </div>
        )}
      </div>
    </div>
  );
}
