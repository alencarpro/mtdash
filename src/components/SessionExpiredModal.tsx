import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useNavigate, useRouter } from "@tanstack/react-router";
import { useAuthErrorStore } from "@/hooks/use-auth-error-store";
import { useAuth } from "@/contexts/AuthContext";
import { useUIStore } from "@/hooks/use-ui-store";

export function SessionExpiredModal() {
  const { showLoginModal, setShowLoginModal } = useAuthErrorStore();
  const navigate = useNavigate();
  const router = useRouter();
  const { signOut } = useAuth();
  const { setAdmin } = useUIStore();

  const handleLoginRedirect = async () => {
    const currentPath = router.state.location.pathname;
    try {
      await signOut();
    } catch (e) {
      console.error('Erro ao sair:', e);
    }
    setAdmin(false);
    setShowLoginModal(false);
    navigate({ 
      to: '/login', 
      search: { redirect: currentPath },
      replace: true 
    });
  };

  return (
    <Dialog open={showLoginModal} onOpenChange={setShowLoginModal}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Sessão Expirada</DialogTitle>
          <DialogDescription>
            Sua sessão expirou por inatividade ou por um erro de autenticação. Por favor, faça login novamente para continuar.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={handleLoginRedirect} className="w-full">
            Ir para Login
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
