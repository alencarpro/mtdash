import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { PresentationLayout } from "@/components/PresentationLayout";
import { useGlobalSync } from "@/hooks/use-global-sync";
import { useUIStore } from "@/hooks/use-ui-store";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";
import { canAccessAdmin as hasAdminAccess } from "@/lib/auth/roles";

export const Route = createFileRoute("/")({
  // Auth is enforced by the root route's server-validated beforeLoad guard.
  component: Index,
});

function Index() {
  useGlobalSync();
  const { isAdmin } = useUIStore();
  const { isAuthenticated, role, isLoading } = useAuth();
  const navigate = useNavigate();

  const normalizedRole = role?.toLowerCase();
  const canAccessAdmin = hasAdminAccess(normalizedRole as any);

  // Redireciona para /login se não autenticado após o carregamento (proteção extra
  // para o caso de o beforeLoad do SSR não conseguir redirecionar a tempo).
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate({ to: '/login', replace: true });
    }
  }, [isLoading, isAuthenticated, navigate]);

  // Redireciona para a área administrativa apenas quando o modo admin está ativo.
  // Isso evita o loop /admin -> / -> /admin ao clicar em EXIBIÇÃO.
  useEffect(() => {
    if (!isLoading && isAuthenticated && canAccessAdmin && isAdmin) {
      navigate({ to: '/admin', replace: true });
    }
  }, [isLoading, isAuthenticated, canAccessAdmin, isAdmin, navigate]);

  // Handle auto-fullscreen and redirection for VIEWERs
  useEffect(() => {
    if (isAuthenticated && normalizedRole === 'viewer') {
      const enterFullscreen = async () => {
        try {
          if (!document.fullscreenElement) {
            await document.documentElement.requestFullscreen();
          }
        } catch (err) {
          console.warn('Auto-fullscreen blocked by browser policy. User interaction required.');
        }
      };
      
      enterFullscreen();

      const handleFirstClick = () => {
        enterFullscreen();
        document.removeEventListener('click', handleFirstClick);
      };
      
      document.addEventListener('click', handleFirstClick);
      return () => document.removeEventListener('click', handleFirstClick);
    }
  }, [isAuthenticated, normalizedRole]);

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          <span className="text-primary font-mono text-[10px] uppercase tracking-widest">Validando Acesso...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="h-screen w-screen overflow-hidden bg-[#001529]">
      <PresentationLayout />
    </div>
  );
}



