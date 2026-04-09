import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FilterOption {
  label: string;
  value: string;
}

interface FilterBarProps {
  cities: FilterOption[];
  periods: FilterOption[];
  selectedCity: string;
  selectedPeriod: string;
  onCityChange: (v: string) => void;
  onPeriodChange: (v: string) => void;
}

const FilterBar = ({
  cities,
  periods,
  selectedCity,
  selectedPeriod,
  onCityChange,
  onPeriodChange,
}: FilterBarProps) => {
  return (
    <div className="flex flex-wrap gap-3">
      <Select value={selectedCity} onValueChange={onCityChange}>
        <SelectTrigger className="w-[200px] bg-card border-border">
          <SelectValue placeholder="Cidade" />
        </SelectTrigger>
        <SelectContent>
          {cities.map((c) => (
            <SelectItem key={c.value} value={c.value}>
              {c.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={selectedPeriod} onValueChange={onPeriodChange}>
        <SelectTrigger className="w-[180px] bg-card border-border">
          <SelectValue placeholder="Período" />
        </SelectTrigger>
        <SelectContent>
          {periods.map((p) => (
            <SelectItem key={p.value} value={p.value}>
              {p.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default FilterBar;
