import { ReactNode } from "react";

interface ChartCardProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
}

const ChartCard = ({ title, subtitle, children }: ChartCardProps) => {
  return (
    <div className="interactive-card group bg-card rounded-xl border border-border p-5 hover:border-primary/60 hover:shadow-[0_20px_44px_-22px_hsl(var(--primary)/0.55)] hover:-translate-y-1 cursor-pointer animate-slide-up">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-card-foreground transition-colors duration-300 group-hover:text-primary">{title}</h3>
        {subtitle && <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>}
      </div>
      <div className="w-full">{children}</div>
    </div>
  );
};

export default ChartCard;
