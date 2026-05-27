import React, { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Database } from '@/integrations/supabase/types';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MoreVertical, Trash2, Edit2, Check, X, Power } from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type Dashboard = Database['public']['Tables']['dashboards']['Row'];

interface KanbanCardProps {
  dashboard: Dashboard;
  isOverlay?: boolean;
  onDelete: (id: string) => Promise<boolean>;
  onUpdate: (id: string, updates: Partial<Dashboard>) => Promise<boolean>;
}

export function KanbanCard({ dashboard, isOverlay, onDelete, onUpdate }: KanbanCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(dashboard.name);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: dashboard.id });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.3 : 1,
  };

  const handleSaveName = async () => {
    if (newName.trim() && newName !== dashboard.name) {
      await onUpdate(dashboard.id, { name: newName });
    }
    setIsEditing(false);
  };

  const handleToggleActive = async () => {
    const newStatus = dashboard.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
    await onUpdate(dashboard.id, { status: newStatus as any });
  };

  return (
    <>
      <div ref={setNodeRef} style={style} className="group relative">
        <Card className={`p-4 bg-secondary/10 border-border hover:border-primary/50 transition-all cursor-grab active:cursor-grabbing ${dashboard.status === 'INACTIVE' ? 'opacity-60' : ''}`}>
          <div className="flex justify-between items-start gap-2">
            <div className="flex-1 min-w-0" {...listeners} {...attributes}>
              {isEditing ? (
                <div className="flex gap-1 items-center" onClick={e => e.stopPropagation()}>
                  <Input 
                    value={newName}
                    onChange={e => setNewName(e.target.value)}
                    className="h-7 text-sm py-1"
                    autoFocus
                    onKeyDown={e => {
                      if (e.key === 'Enter') handleSaveName();
                      if (e.key === 'Escape') setIsEditing(false);
                    }}
                  />
                  <button onClick={handleSaveName} className="p-1 hover:text-primary"><Check className="w-4 h-4" /></button>
                  <button onClick={() => setIsEditing(false)} className="p-1 hover:text-destructive"><X className="w-4 h-4" /></button>
                </div>
              ) : (
                <>
                  <h4 className="font-medium text-sm truncate">{dashboard.name}</h4>
                  <p className="text-[10px] opacity-40 uppercase truncate">{dashboard.category}</p>
                </>
              )}
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="p-1 hover:bg-secondary/20 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  <MoreVertical className="w-4 h-4 text-muted-foreground" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setIsEditing(true)}>
                  <Edit2 className="w-4 h-4 mr-2" /> Renomear
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleToggleActive}>
                  <Power className={`w-4 h-4 mr-2 ${dashboard.status === 'ACTIVE' ? 'text-destructive' : 'text-primary'}`} /> 
                  {dashboard.status === 'ACTIVE' ? 'Desativar' : 'Ativar'}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setShowDeleteDialog(true)} className="text-destructive">
                  <Trash2 className="w-4 h-4 mr-2" /> Excluir
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="mt-3 flex items-center justify-between" {...listeners} {...attributes}>
            <Badge variant={dashboard.status === 'ACTIVE' ? 'success' : 'secondary'} className="text-[9px] px-1.5 py-0">
              {dashboard.status}
            </Badge>
            <div className="w-2 h-2 rounded-full bg-primary/20" />
          </div>
        </Card>
      </div>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir Dashboard?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. Isso removerá permanentemente a dashboard "{dashboard.name}".
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={() => onDelete(dashboard.id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
