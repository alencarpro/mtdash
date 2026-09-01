import { TrendingUp, TrendingDown, Minus, LucideIcon } from "lucide-react";

interface KPICardProps {
  title: string;
  value: string | number;
  trend: "up" | "down" | "neutral";
  trendValue?: string;
  icon?: LucideIcon;
}

const trendConfig = {
  up: { Icon: TrendingUp, color: "text-success", bg: "bg-success/10", label: "Aumento" },
  down: { Icon: TrendingDown, color: "text-destructive", bg: "bg-destructive/10", label: "Queda" },
  neutral: { Icon: Minus, color: "text-muted-foreground", bg: "bg-muted", label: "Estável" },
};

const KPICard = ({ title, value, trend, trendValue, icon: CardIcon }: KPICardProps) => {
  const { Icon: TrendIcon, color, bg } = trendConfig[trend];

  return (
    <div className="interactive-card group bg-card rounded-xl border border-border p-4 sm:p-5 kpi-shadow hover:border-primary/60 hover:shadow-[0_18px_40px_-20px_hsl(var(--primary)/0.6)] hover:-translate-y-1 hover:scale-[1.03] cursor-pointer animate-slide-up">
      <div className="flex items-start justify-between mb-3">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        {CardIcon && (
          <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center transition-all duration-300 group-hover:bg-primary/25 group-hover:scale-110">
            <CardIcon className="w-4 h-4 text-primary" />
          </div>
        )}
      </div>
      <p className="text-2xl font-bold text-card-foreground mb-2">{value}</p>
      <div className="flex items-center gap-1.5">
        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${bg} ${color}`}>
          <TrendIcon className="w-3 h-3" />
          {trendValue}
        </span>
      </div>
    </div>
  );
};

export default KPICard;
