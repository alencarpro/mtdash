import React, { useState } from 'react';
import { useKanbanData } from '@/hooks/use-kanban-data';
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragOverEvent,
  DragEndEvent,
  defaultDropAnimationSideEffects
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy
} from '@dnd-kit/sortable';
import { KanbanColumn } from './kanban/KanbanColumn';
import { KanbanCard } from './kanban/KanbanCard';
import { DashboardSidebar } from './kanban/DashboardSidebar';
import { AddDashboardModal } from './kanban/AddDashboardModal';
import { ImportDashboardsModal } from './kanban/ImportDashboardsModal';
import { Skeleton } from '@/components/ui/skeleton';
import { Search, Plus, Download } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function DashboardKanban() {
  const { dashboards, columns, loading, updateDashboard, deleteDashboard, createDashboard, refresh } = useKanbanData();
  const [activeId, setActiveId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const filteredDashboards = dashboards.filter(d =>
    d.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const unassignedDashboards = filteredDashboards.filter(d => !d.column_id);

  const getDashboardsByColumn = (columnId: string) => {
    return filteredDashboards
      .filter(d => d.column_id === columnId)
      .sort((a, b) => (a.order_index || 0) - (b.order_index || 0));
  };

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    const activeDashboard = dashboards.find(d => d.id === activeId);
    if (!activeDashboard) return;

    const overColumn = columns.find(c => c.id === overId);
    const overCard = dashboards.find(d => d.id === overId);
    const isOverSidebar = overId === 'sidebar';

    let newColumnId: string | null = activeDashboard.column_id;

    if (overColumn) {
      newColumnId = overColumn.id;
    } else if (overCard) {
      newColumnId = overCard.column_id;
    } else if (isOverSidebar) {
      newColumnId = null;
    }

    if (newColumnId !== activeDashboard.column_id) {
      updateDashboard(activeId, { column_id: newColumnId });
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    if (activeId === overId) return;

    const activeDashboard = dashboards.find(d => d.id === activeId);
    const overDashboard = dashboards.find(d => d.id === overId);

    if (activeDashboard && overDashboard && activeDashboard.column_id === overDashboard.column_id) {
      const columnDashboards = getDashboardsByColumn(activeDashboard.column_id!);
      const oldIndex = columnDashboards.findIndex(d => d.id === activeId);
      const newIndex = columnDashboards.findIndex(d => d.id === overId);

      const newOrder = arrayMove(columnDashboards, oldIndex, newIndex);

      newOrder.forEach((d, index) => {
        if (d.order_index !== index) {
          updateDashboard(d.id, { order_index: index });
        }
      });
    }
  };

  if (loading) {
    return (
      <div className="flex gap-6 h-[calc(100vh-200px)] overflow-hidden">
        <Skeleton className="w-64 h-full" />
        <div className="flex-1 grid grid-cols-4 gap-6">
          {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-full" />)}
        </div>
      </div>
    );
  }

  const activeDashboard = dashboards.find(d => d.id === activeId);

  return (
    <>
      <div className="space-y-6">
        {/* Header com busca e ações */}
        <div className="flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="h-4 w-1 bg-primary rounded-full" />
            <h2 className="font-bold uppercase tracking-[0.2em] text-[10px] opacity-60">
              Organização de Dashboards
            </h2>
            <span className="text-[10px] font-mono text-muted-foreground/40">
              ({dashboards.length} dashboards · {columns.length} colunas)
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Busca */}
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <Input
                placeholder="Buscar dashboards..."
                className="pl-9 h-9 bg-secondary/10 border-border text-sm focus-visible:ring-primary/50"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Importar do registro */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowImportModal(true)}
              className="h-9 border-border bg-secondary/10 hover:bg-secondary/20 text-[10px] uppercase tracking-widest font-bold gap-2"
            >
              <Download className="w-3.5 h-3.5 text-primary" />
              Importar
            </Button>

            {/* Nova dashboard */}
            <Button
              size="sm"
              onClick={() => setShowAddModal(true)}
              className="h-9 bg-primary hover:bg-primary/90 text-primary-foreground text-[10px] uppercase tracking-widest font-bold gap-2"
            >
              <Plus className="w-3.5 h-3.5" />
              Nova
            </Button>
          </div>
        </div>

        {/* Kanban */}
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          <div className="flex gap-6 h-[calc(100vh-280px)] overflow-x-auto pb-4">
            {/* Sidebar: Dashboards disponíveis (não atribuídas) */}
            <DashboardSidebar
              dashboards={unassignedDashboards}
              onDelete={deleteDashboard}
              onUpdate={updateDashboard}
            />

            {/* Colunas de exibição */}
            <div className="flex gap-6 flex-1 min-w-0">
              {columns.map(column => (
                <KanbanColumn
                  key={column.id}
                  column={column}
                  dashboards={getDashboardsByColumn(column.id)}
                  onDelete={deleteDashboard}
                  onUpdate={updateDashboard}
                />
              ))}
            </div>
          </div>

          <DragOverlay dropAnimation={{
            sideEffects: defaultDropAnimationSideEffects({
              styles: {
                active: {
                  opacity: '0.5',
                },
              },
            }),
          }}>
            {activeId && activeDashboard ? (
              <KanbanCard
                dashboard={activeDashboard}
                isOverlay
                onDelete={deleteDashboard}
                onUpdate={updateDashboard}
              />
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>

      {/* Modais */}
      <AddDashboardModal
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
        onCreate={createDashboard as any}
      />

      <ImportDashboardsModal
        open={showImportModal}
        onClose={() => setShowImportModal(false)}
        onSuccess={refresh}
      />
    </>
  );
}
