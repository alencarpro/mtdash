import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Plus, Link, FileText, RefreshCw } from 'lucide-react';
import { CATEGORY_LABELS, type DashboardCategory } from '@/data/dashboards-registry';

const CATEGORIES = Object.keys(CATEGORY_LABELS) as DashboardCategory[];

const formSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório').max(200),
  description: z.string().max(2000).optional(),
  category: z.enum(['ECONOMY', 'SOCIAL', 'ENVIRONMENT', 'WORKS', 'TRANSPARENCY', 'CUSTOM']),
  source_url: z.string().url('URL inválida (inclua https://)'),
  refresh_interval: z.coerce.number().int().positive().default(60),
});

type FormValues = z.infer<typeof formSchema>;

interface AddDashboardModalProps {
  open: boolean;
  onClose: () => void;
  onCreate: (values: FormValues) => Promise<boolean>;
}

export function AddDashboardModal({ open, onClose, onCreate }: AddDashboardModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      category: 'TRANSPARENCY',
      source_url: '',
      refresh_interval: 60,
    },
  });

  const handleSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    const ok = await onCreate(values);
    setIsSubmitting(false);
    if (ok) {
      form.reset();
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) onClose(); }}>
      <DialogContent className="bg-card border-border max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-base font-black uppercase tracking-widest flex items-center gap-2">
            <Plus className="w-4 h-4 text-primary" />
            Nova Dashboard
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 pt-2">
            {/* Nome */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[10px] uppercase tracking-widest opacity-60 flex items-center gap-1.5">
                    <FileText className="w-3 h-3" /> Nome
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ex: Execução Orçamentária"
                      className="bg-secondary/10 border-border focus-visible:ring-primary/50"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-[10px] text-destructive" />
                </FormItem>
              )}
            />

            {/* Descrição */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[10px] uppercase tracking-widest opacity-60">
                    Descrição <span className="opacity-40">(opcional)</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Breve descrição do conteúdo"
                      className="bg-secondary/10 border-border focus-visible:ring-primary/50"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-[10px] text-destructive" />
                </FormItem>
              )}
            />

            {/* Categoria + Intervalo (side-by-side) */}
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[10px] uppercase tracking-widest opacity-60">
                      Categoria
                    </FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-secondary/10 border-border focus:ring-primary/50">
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-card border-border">
                        {CATEGORIES.map((cat) => (
                          <SelectItem key={cat} value={cat} className="text-sm">
                            {CATEGORY_LABELS[cat]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-[10px] text-destructive" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="refresh_interval"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[10px] uppercase tracking-widest opacity-60 flex items-center gap-1.5">
                      <RefreshCw className="w-3 h-3" /> Atualização (s)
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={10}
                        className="bg-secondary/10 border-border focus-visible:ring-primary/50"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-[10px] text-destructive" />
                  </FormItem>
                )}
              />
            </div>

            {/* URL */}
            <FormField
              control={form.control}
              name="source_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[10px] uppercase tracking-widest opacity-60 flex items-center gap-1.5">
                    <Link className="w-3 h-3" /> URL da Fonte
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://painel.exemplo.gov.br"
                      className="bg-secondary/10 border-border focus-visible:ring-primary/50 font-mono text-xs"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-[10px] text-destructive" />
                </FormItem>
              )}
            />

            <DialogFooter className="pt-4 gap-2">
              <Button
                type="button"
                variant="ghost"
                onClick={onClose}
                disabled={isSubmitting}
                className="text-muted-foreground hover:text-foreground"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold uppercase tracking-widest text-[10px] px-6"
              >
                {isSubmitting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <Plus className="w-4 h-4 mr-1.5" />
                    Criar Dashboard
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
