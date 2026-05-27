import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase/client";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  UserPlus, 
  MoreHorizontal, 
  Shield, 
  User, 
  Mail, 
  Clock, 
  Power,
  Edit,
  Trash2,
  Filter
} from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

import { UserRole } from "@/types/auth";

export function UserManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState<UserRole | null>(null);

  const { data: users, isLoading, refetch } = useQuery({
    queryKey: ["admin-users"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select(`
          id,
          full_name,
          active,
          role,
          created_at,
          updated_at
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const filteredUsers = useMemo(() => {
    if (!users) return [];
    return users.filter((user) => {
      const matchesSearch = 
        (user.full_name?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
        user.id.includes(searchTerm);
      const matchesRole = !filterRole || (user.role && user.role.toLowerCase() === filterRole);
      return matchesSearch && matchesRole;
    });
  }, [users, searchTerm, filterRole]);

  const handleToggleStatus = async (userId: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from("profiles")
        .update({ active: !currentStatus })
        .eq("id", userId);

      if (error) throw error;
      
      toast.success(`Usuário ${!currentStatus ? 'ativado' : 'desativado'} com sucesso`);
      
      // Log de Auditoria
      await supabase.rpc('log_admin_action', {
        _action: !currentStatus ? 'ACTIVATE_USER' : 'DEACTIVATE_USER',
        _entity_type: 'USER',
        _entity_id: userId,
        _details: { timestamp: new Date().toISOString() }
      });
      
      refetch();
    } catch (error: any) {
      toast.error("Erro ao atualizar status: " + error.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-primary">Gerenciamento de Usuários</h2>
          <p className="text-muted-foreground">Administre permissões, status e perfis de acesso.</p>
        </div>
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            className="gap-2"
            onClick={() => window.open(`${(import.meta as any).env.VITE_SUPABASE_URL}/project/_/auth/users`, '_blank')}
          >
            <Shield className="w-4 h-4" />
            Abrir Console Supabase
          </Button>
          <Button className="gap-2">
            <UserPlus className="w-4 h-4" />
            Novo Usuário
          </Button>
        </div>
      </div>

      <Card className="bg-secondary/5 border-border">
        <CardHeader className="pb-3">
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nome ou ID..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Filter className="w-4 h-4" />
                    {filterRole || "Todos os Cargos"}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setFilterRole(null)}>Todos</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterRole("admin")}>Admin</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterRole("super_admin")}>Super Admin</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterRole("operator")}>Operador</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterRole("viewer")}>Visualizador</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          ) : (
            <div className="rounded-md border border-border overflow-hidden">
              <Table>
                <TableHeader className="bg-secondary/10">
                  <TableRow>
                    <TableHead className="w-[300px]">Usuário</TableHead>
                    <TableHead>Cargo</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Criado em</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                        Nenhum usuário encontrado.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredUsers.map((user) => (
                      <TableRow key={user.id} className="hover:bg-secondary/5 transition-colors">
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                              {user.full_name?.charAt(0).toUpperCase() || "U"}
                            </div>
                            <div className="flex flex-col">
                              <span className="font-medium">{user.full_name || "Sem Nome"}</span>
                              <span className="text-[10px] text-muted-foreground font-mono">{user.id}</span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={(user.role?.toLowerCase() === "admin" || user.role?.toLowerCase() === "super_admin") ? "default" : "secondary"} className="gap-1 px-2 py-0">
                            {(user.role?.toLowerCase() === "admin" || user.role?.toLowerCase() === "super_admin") ? <Shield className="w-3 h-3" /> : <User className="w-3 h-3" />}
                            {user.role}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant={user.active ? "success" : "destructive"} 
                            className="gap-1 cursor-pointer"
                            onClick={() => handleToggleStatus(user.id, !!user.active)}
                          >
                            <Power className="w-3 h-3" />
                            {user.active ? "Ativo" : "Inativo"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {user.created_at ? format(new Date(user.created_at), "dd/MM/yyyy", { locale: ptBR }) : 'n/d'}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-48">
                              <DropdownMenuLabel>Ações</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="gap-2">
                                <Edit className="w-4 h-4" /> Editar Perfil
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                className="gap-2"
                                onClick={() => handleToggleStatus(user.id, !!user.active)}
                              >
                                <Power className="w-4 h-4" /> 
                                {user.active ? "Desativar" : "Ativar"}
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="gap-2 text-destructive focus:text-destructive">
                                <Trash2 className="w-4 h-4" /> Excluir Usuário
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
