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
      {/* Mobile: top bar 56px + bottom tab bar ~56px */}
      <main className="pt-[56px] pb-[64px] lg:pt-0 lg:pb-0 lg:ml-[240px] transition-all duration-300">
        <header className="sticky top-[56px] lg:top-0 z-30 glass-effect px-4 sm:px-6 py-3 sm:py-4 border-b border-border/50">
          <h1 className="text-lg sm:text-xl font-bold text-foreground">{title}</h1>
          {subtitle && <p className="text-xs sm:text-sm text-muted-foreground mt-0.5 line-clamp-2">{subtitle}</p>}
        </header>
        <div className="p-4 sm:p-6 space-y-4 sm:space-y-6 animate-fade-in">{children}</div>
      </main>
    </div>
  );
};

export default DashboardLayout;
