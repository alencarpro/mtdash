import { ReactNode } from "react";
import AppSidebar from "./AppSidebar";

interface DashboardLayoutProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
}

const DashboardLayout = ({ title, subtitle, children }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <AppSidebar />
      <main className="ml-[72px] lg:ml-[260px] transition-all duration-300">
        <header className="sticky top-0 z-40 glass-effect px-6 py-4 border-b border-border/50">
          <h1 className="text-xl font-bold text-foreground">{title}</h1>
          {subtitle && <p className="text-sm text-muted-foreground mt-0.5">{subtitle}</p>}
        </header>
        <div className="p-6 space-y-6 animate-fade-in">{children}</div>
      </main>
    </div>
  );
};

export default DashboardLayout;
