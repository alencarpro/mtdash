import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';


import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Lock, Mail, Loader2, ShieldCheck, Activity, Eye, EyeOff } from 'lucide-react';
import { useNavigate, useRouter, useSearch } from '@tanstack/react-router';
import { useUIStore } from '@/hooks/use-ui-store';
import { supabase } from '@/lib/supabase/client';
import { canAccessAdmin, getCurrentUserRole } from '@/lib/auth/roles';

const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
});

export function LoginSplit() {
  const [isLoading, setIsLoading] = React.useState(false);
  // Removed old store usage
  const { setAdmin } = useUIStore();
  const [logoError, setLogoError] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const navigate = useNavigate();
  const router = useRouter();
  const search = useSearch({ from: '/login' });

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  function describeAuthError(err: any): string {
    const msg = (err?.message ?? '').toLowerCase();
    if (msg.includes('invalid login credentials')) return 'Credenciais inválidas. Verifique o email e a senha.';
    if (msg.includes('email not confirmed')) return 'Email ainda não confirmado.';
    return err?.message ?? 'Erro ao autenticar.';
  }

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });

      if (error) {
        toast.error(describeAuthError(error as any));
        setIsLoading(false);
        return;
      }

      if (data?.session) {
        // Roles are authoritative in user_roles; profiles.role is legacy only.
        const role = await getCurrentUserRole(supabase, data.session.user.id);
        const isAdminRole = canAccessAdmin(role);
        setAdmin(isAdminRole);

        toast.success('Login realizado com sucesso!');

        await router.invalidate();
        const redirectTo = search.redirect || (isAdminRole ? '/admin' : '/');
        navigate({ to: redirectTo, replace: true });
      }
    } catch (error: any) {
      toast.error('Erro inesperado: ' + (error?.message ?? 'sem detalhes'));
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-background text-foreground selection:bg-blue-500/30 overflow-hidden">
      {/* Branding Side - Left */}
      <div className="w-full md:w-[55%] relative overflow-hidden flex flex-col justify-center p-8 md:p-24 min-h-[40vh] md:min-h-screen border-r border-white/5">
        {/* Abstract Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-15%] left-[-10%] w-[50%] h-[50%] bg-primary/10 blur-[140px] rounded-full mix-blend-screen pointer-events-none" />
          <div className="absolute bottom-[-15%] right-[-10%] w-[50%] h-[50%] bg-blue-600/5 blur-[140px] rounded-full mix-blend-screen pointer-events-none" />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.02] mix-blend-overlay pointer-events-none" />
        </div>

        <div 
          className="relative z-10 flex flex-col justify-center h-full"
        >
          <div className="mb-12 flex justify-center md:justify-start">
            {!logoError ? (
              <img 
                src="https://rmetppilvfrxosvxzhgj.supabase.co/storage/v1/object/public/message-attachments/159f5cca-442d-405b-94e3-e77ee0afd383/1778614348714_bif60w_logocge_v1-negativo.png" 
                alt="CGE-MT Logo" 
                className="h-10 md:h-16 w-auto hover:scale-105 transition-transform duration-500 brightness-110 object-contain"
                onError={() => setLogoError(true)}
              />
            ) : (
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-2xl bg-primary/20 backdrop-blur-xl border border-primary/20 flex items-center justify-center">
                  <ShieldCheck className="h-9 w-9 text-primary" />
                </div>
                <div className="flex flex-col">
                  <span className="text-3xl font-black tracking-tighter text-foreground leading-none">CGE-MT</span>
                  <span className="text-[10px] font-bold tracking-[0.3em] text-primary/70 uppercase mt-1">Sistemas Estratégicos</span>
                </div>
              </div>
            )}
          </div>
          
          <div className="space-y-6 max-w-2xl text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold tracking-[0.2em] uppercase w-fit mx-auto md:mx-0 text-zinc-300">
              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
              UNIDADE DE INTELIGÊNCIA - CGE-MT
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] text-foreground">
              Centro de <br className="hidden sm:block" />
              Monitoramento e <br className="hidden sm:block" />
              <span className="text-primary">
                Controle Estratégico
              </span>
            </h1>
            
            <p className="text-muted-foreground/80 text-base sm:text-lg md:text-xl font-light leading-relaxed max-w-lg mt-6 md:mt-8 border-l-2 border-primary/20 pl-6 mx-auto md:mx-0 text-center md:text-left">
              Plataforma unificada de monitoramento estratégico e orquestração de inteligência para operações de alta criticidade da Controladoria Geral do Estado.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 md:gap-10 mt-10 md:mt-16">
            <div className="flex items-center gap-2.5">
              <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
              <span className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-[0.2em]">Sistemas Operacionais</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Activity className="w-3.5 h-3.5 text-primary/50" />
              <span className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-[0.2em]">Dados Sincronizados</span>
            </div>
          </div>
        </div>
      </div>

      {/* Login Side - Right */}
      <div className="w-full md:w-[45%] flex items-center justify-center p-8 md:p-12 bg-secondary/10 backdrop-blur-md relative">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-primary/5 pointer-events-none" />
        <div className="w-full max-w-md relative z-10">
          <div className="mb-10 text-center md:text-left">
            <h2 className="text-3xl font-black tracking-tight text-foreground uppercase italic">
              Acesso <span className="text-primary">Restrito</span>
            </h2>
            <div className="h-1 w-12 bg-primary mt-2 mb-4 hidden md:block" />
            <p className="text-muted-foreground/60 text-sm font-medium tracking-wide">
              {/* Texto removido conforme solicitado */}
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="space-y-1.5">
                    <FormLabel className="text-primary/70 font-bold text-[9px] uppercase tracking-[0.2em] ml-1">E-Mail</FormLabel>
                    <FormControl>
                      <div className="relative group">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                        <Input
                          placeholder="usuario@cge.mt.gov.br"
                          autoComplete="email"
                          className="pl-11 bg-background/40 border-none ring-1 ring-primary/10 text-foreground placeholder:text-muted-foreground/30 focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background transition-all h-14 rounded-xl text-sm font-medium"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-400 text-[10px] font-bold uppercase tracking-wider mt-1 ml-1" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="space-y-1.5">
                    <FormLabel className="text-primary/70 font-bold text-[9px] uppercase tracking-[0.2em] ml-1">Senha</FormLabel>
                    <FormControl>
                      <div className="relative group">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••••••"
                          autoComplete="current-password"
                          className="pl-11 pr-11 bg-background/40 border-none ring-1 ring-primary/10 text-foreground placeholder:text-muted-foreground/30 focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background transition-all h-14 rounded-xl text-sm font-medium"
                          {...field}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 rounded-md"
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-400 text-[10px] font-bold uppercase tracking-wider mt-1 ml-1" />
                  </FormItem>
                )}
              />

              <div className="mt-4">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-primary via-primary to-blue-600 hover:brightness-110 text-primary-foreground font-black h-14 transition-all duration-300 rounded-xl text-xs tracking-[0.3em] uppercase overflow-hidden shadow-lg shadow-primary/20 active:shadow-inner focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background relative hover:scale-[1.02] active:scale-[0.98] hover:shadow-primary/40 active:translate-y-0.5 border border-white/10"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2 relative z-10">
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span>AUTORIZANDO...</span>
                    </div>
                  ) : (
                    <span className="relative z-10">ACESSAR</span>
                  )}
                </Button>
              </div>
            </form>
          </Form>

          <div className="mt-12 pt-8 border-t border-primary/5">
            <div className="flex flex-col items-center gap-6">
              <p className="text-[9px] text-muted-foreground/40 uppercase tracking-[0.3em] font-bold text-center leading-relaxed">
                {/* Protocolo de Segurança removido */}
                Dados Monitorados pela Unidade de Inteligência / CGE-MT
              </p>
              
              <div className="flex gap-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-1.5 h-1.5 rounded-full bg-primary/20" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
