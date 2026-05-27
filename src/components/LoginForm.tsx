import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate } from '@tanstack/react-router';

import { supabase } from '@/lib/supabase/client';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Lock, Mail, Loader2 } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
});

export function LoginForm() {
  const [isLoading, setIsLoading] = React.useState(false);
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });

      if (error) {
        if (error.message === 'Invalid login credentials') {
          toast.error('Credenciais inválidas. Verifique seu email e senha.');
        } else if (error.message.includes('Email not confirmed')) {
          toast.error('Email não confirmado. Verifique sua caixa de entrada.');
        } else {
          toast.error('Erro na autenticação: ' + error.message);
        }
      } else {
        toast.success('Login realizado com sucesso!');
        navigate({ to: '/' });
      }
    } catch (error: any) {
      toast.error('Ocorreu um erro inesperado');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <Card className="bg-secondary/20 border-border text-foreground backdrop-blur-xl shadow-2xl">
          <CardHeader className="space-y-2 text-center pb-8">
            <div className="flex justify-center mb-4">
              <div className="h-12 w-12 rounded-xl bg-blue-600 flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.3)]">
                <span className="text-2xl font-black text-white">M</span>
              </div>
            </div>
            <CardTitle className="text-3xl font-bold tracking-tight text-white">Unidade de Inteligência</CardTitle>
            <CardDescription className="text-blue-100/60">
              CGE-MT // Centro de Comando
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-blue-100/70">Email</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-blue-100/40" />
                          <Input
                             placeholder="seu@email.com"
                             autoComplete="email"
                            className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-blue-100/20 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background transition-all h-11"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="text-red-400 text-xs" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-blue-100/70">Senha</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-blue-100/40" />
                          <Input
                            type="password"
                             placeholder="••••••••"
                             autoComplete="current-password"
                            className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-blue-100/20 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background transition-all h-11"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="text-red-400 text-xs" />
                    </FormItem>
                  )}
                />
                <div>
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold h-11 transition-all shadow-[0_0_15px_rgba(37,99,235,0.2)] focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background relative overflow-hidden"
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2 relative z-10">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>PROCESSANDO...</span>
                      </div>
                    ) : (
                      <span className="relative z-10">ENTRAR NO SISTEMA</span>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
          <div className="px-8 pb-8 text-center">
            <p className="text-[10px] text-zinc-600 uppercase tracking-widest font-mono">
              Dados Monitorados pela Unidade de Inteligência / CGE-MT
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
