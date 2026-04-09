import { useNavigate, useLocation } from "react-router-dom";
import {
  BarChart3,
  Users,
  TrendingUp,
  Leaf,
  LayoutDashboard,
} from "lucide-react";

const menuItems = [
  { label: "Visão Geral", icon: LayoutDashboard, path: "/dashboard/overview" },
  { label: "Economia", icon: TrendingUp, path: "/dashboard/economy" },
  { label: "Social", icon: Users, path: "/dashboard/social" },
  { label: "Ambiental", icon: Leaf, path: "/dashboard/environment" },
];

const AppSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      {/* Top bar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-sidebar border-b border-sidebar-border">
        <div className="flex items-center gap-3 px-4 py-3">
          <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center flex-shrink-0">
            <BarChart3 className="w-4 h-4 text-sidebar-primary-foreground" />
          </div>
          <h1 className="text-sm font-bold text-sidebar-accent-foreground">Dados MT</h1>
          
          {/* Desktop inline nav */}
          <nav className="hidden sm:flex items-center gap-1 ml-6">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? "bg-sidebar-accent text-sidebar-primary"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  }`}
                >
                  <item.icon className={`w-4 h-4 ${isActive ? "text-sidebar-primary" : ""}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Mobile bottom tab bar */}
      <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-50 bg-sidebar border-t border-sidebar-border flex items-center justify-around py-2 px-1">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-lg transition-all ${
                isActive ? "text-sidebar-primary" : "text-sidebar-foreground"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-[10px] font-medium leading-tight">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
};

export default AppSidebar;
