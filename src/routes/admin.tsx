import { createFileRoute, redirect } from "@tanstack/react-router";
import { AdminDashboard } from "@/components/AdminDashboard";
import { canAccessAdmin, getCurrentUserRole } from "@/lib/auth/roles";

export const Route = createFileRoute("/admin")({
  beforeLoad: async () => {
    // Skip during SSR — sessão Supabase só existe no browser
    if (typeof window === 'undefined') return;

    const { supabase } = await import("@/lib/supabase/client");

    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) {
      throw redirect({ to: "/login" });
    }

    // Verifica papel na tabela autoritativa de RBAC (user_roles), não no perfil legado.
    const role = await getCurrentUserRole(supabase, session.user.id);
    const isAdmin = canAccessAdmin(role);

    if (!isAdmin) {
      throw redirect({ to: "/" });
    }
  },
  component: AdminPage,
});

function AdminPage() {
  return <AdminDashboard />;
}
