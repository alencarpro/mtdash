import { ReactNode } from "react";

interface ChartCardProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
}

const ChartCard = ({ title, subtitle, children }: ChartCardProps) => {
  return (
    <div className="bg-card rounded-xl border border-border p-5 animate-slide-up">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-card-foreground">{title}</h3>
        {subtitle && <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>}
      </div>
      <div className="w-full">{children}</div>
    </div>
  );
};

export default ChartCard;
