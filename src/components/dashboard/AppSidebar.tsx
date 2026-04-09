import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  BarChart3,
  Users,
  TrendingUp,
  Leaf,
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  Building2,
} from "lucide-react";

const menuItems = [
  { label: "Visão Geral", icon: LayoutDashboard, path: "/dashboard/overview" },
  { label: "Economia", icon: TrendingUp, path: "/dashboard/economy" },
  { label: "Social", icon: Users, path: "/dashboard/social" },
  { label: "Ambiental & Infra", icon: Leaf, path: "/dashboard/environment" },
];

const AppSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <aside
      className={`fixed left-0 top-0 h-screen bg-sidebar border-r border-sidebar-border flex flex-col transition-all duration-300 z-50 ${
        collapsed ? "w-[72px]" : "w-[260px]"
      }`}
    >
      <div className="flex items-center gap-3 px-5 py-6 border-b border-sidebar-border">
        <div className="w-9 h-9 rounded-lg gradient-primary flex items-center justify-center flex-shrink-0">
          <BarChart3 className="w-5 h-5 text-sidebar-primary-foreground" />
        </div>
        {!collapsed && (
          <div className="animate-fade-in">
            <h1 className="text-sm font-bold text-sidebar-accent-foreground tracking-tight">
              Dados MT
            </h1>
            <p className="text-[10px] text-sidebar-foreground">Portal de Indicadores</p>
          </div>
        )}
      </div>

      <nav className="flex-1 py-4 px-3 space-y-1">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-sidebar-accent text-sidebar-primary"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              }`}
            >
              <item.icon className={`w-5 h-5 flex-shrink-0 ${isActive ? "text-sidebar-primary" : ""}`} />
              {!collapsed && <span className="animate-fade-in">{item.label}</span>}
            </button>
          );
        })}
      </nav>

      <div className="px-3 py-3 border-t border-sidebar-border">
        {!collapsed && (
          <p className="text-[9px] text-sidebar-foreground px-3 mb-2 animate-fade-in">
            Fonte: dados.mt.gov.br
          </p>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center py-2 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent transition-all"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>
    </aside>
  );
};

export default AppSidebar;
