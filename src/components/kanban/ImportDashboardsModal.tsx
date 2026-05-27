import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Loader2, Download, CheckCircle2, AlertCircle, FileJson } from 'lucide-react';
import { DASHBOARD_REGISTRY, CATEGORY_LABELS, CATEGORY_COLORS } from '@/data/dashboards-registry';
import { useServerFn } from '@tanstack/react-start';
import { importDashboardsFn } from '@/lib/admin.functions';
import { toast } from 'sonner';

interface ImportDashboardsModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function ImportDashboardsModal({ open, onClose, onSuccess }: ImportDashboardsModalProps) {
  const [isImporting, setIsImporting] = useState(false);
  const [result, setResult] = useState<{ imported: number } | null>(null);

  const importFn = useServerFn(importDashboardsFn);

  const handleImport = async () => {
    setIsImporting(true);
    setResult(null);
    try {
      const res = await importFn({
        data: {
          dashboards: DASHBOARD_REGISTRY,
          skipDuplicates: true,
        },
      });
      setResult({ imported: res.imported });
      toast.success(`${res.imported} dashboard(s) importada(s) com sucesso!`);
      onSuccess();
    } catch (err: any) {
      toast.error('Erro ao importar: ' + (err?.message ?? 'desconhecido'));
    } finally {
      setIsImporting(false);
    }
  };

  const handleClose = () => {
    setResult(null);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) handleClose(); }}>
      <DialogContent className="bg-card border-border max-w-2xl max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-base font-black uppercase tracking-widest flex items-center gap-2">
            <Download className="w-4 h-4 text-primary" />
            Importar Dashboards do Registro
          </DialogTitle>
          <p className="text-[11px] text-muted-foreground/60 mt-1 leading-relaxed">
            Importa as definições de dashboards da pasta <code className="text-primary/70 bg-primary/5 px-1 rounded">/dashboards</code> para o banco de dados.
            Duplicatas (mesmo URL) são ignoradas.
          </p>
        </DialogHeader>

        {/* Lista de dashboards do registro */}
        <div className="flex-1 overflow-y-auto space-y-2 pr-1">
          {DASHBOARD_REGISTRY.map((d, i) => (
            <div
              key={i}
              className="flex items-start gap-3 p-3 rounded-lg bg-secondary/5 border border-border hover:border-primary/20 transition-colors"
            >
              <FileJson className="w-4 h-4 text-primary/40 mt-0.5 shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-medium text-sm truncate">{d.name}</span>
                  <Badge
                    className={`text-[9px] px-1.5 py-0 font-bold uppercase tracking-wider border-0 ${CATEGORY_COLORS[d.category]}`}
                  >
                    {CATEGORY_LABELS[d.category]}
                  </Badge>
                </div>
                <p className="text-[10px] text-muted-foreground/50 mt-0.5 truncate">{d.source_url}</p>
              </div>
              <div className="text-[9px] text-muted-foreground/40 uppercase tracking-wider shrink-0">
                {d.refresh_interval}s
              </div>
            </div>
          ))}
        </div>

        {/* Resultado */}
        {result && (
          <div className="flex items-center gap-3 p-3 rounded-lg bg-success/10 border border-success/20 mt-2">
            <CheckCircle2 className="w-4 h-4 text-success shrink-0" />
            <span className="text-sm text-success font-medium">
              {result.imported} dashboard(s) importada(s) com sucesso!
            </span>
          </div>
        )}

        <DialogFooter className="gap-2 pt-2 border-t border-border">
          <div className="flex-1 text-[10px] text-muted-foreground/40 flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />
            {DASHBOARD_REGISTRY.length} definições no registro
          </div>
          <Button
            type="button"
            variant="ghost"
            onClick={handleClose}
            disabled={isImporting}
            className="text-muted-foreground hover:text-foreground"
          >
            Fechar
          </Button>
          <Button
            onClick={handleImport}
            disabled={isImporting || !!result}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold uppercase tracking-widest text-[10px] px-6"
          >
            {isImporting ? (
              <><Loader2 className="w-4 h-4 animate-spin mr-1.5" /> Importando...</>
            ) : result ? (
              <><CheckCircle2 className="w-4 h-4 mr-1.5" /> Concluído</>
            ) : (
              <><Download className="w-4 h-4 mr-1.5" /> Importar {DASHBOARD_REGISTRY.length} Dashboards</>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
