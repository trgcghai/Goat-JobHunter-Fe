import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { DateRangeFilter } from "@/app/(admin)/dashboard/hooks/useApplicationFilter";

const STATUS_OPTIONS = [
  { label: "Tất cả", value: "ALL" },
  { label: "PENDING", value: "PENDING" },
  { label: "ACCEPTED", value: "ACCEPTED" },
  { label: "REJECTED", value: "REJECTED" }
];

interface FilterApplicationProps {
  filter: DateRangeFilter;
  setFilter: React.Dispatch<React.SetStateAction<DateRangeFilter>>;
}

export default function FilterApplication({ filter, setFilter } : FilterApplicationProps) {
  return (
    <div className="flex items-center gap-4">
      <Input
        type="date"
        value={filter.startDate}
        onChange={(e) => setFilter({ ...filter, startDate: e.target.value })}
        className="w-40"
      />
      <Input
        type="date"
        value={filter.endDate}
        onChange={(e) => setFilter({ ...filter, endDate: e.target.value })}
        className="w-40"
      />

      <Select
        value={filter.status}
        onValueChange={(v) => setFilter({ ...filter, status: v })}
      >
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Trạng thái" />
        </SelectTrigger>
        <SelectContent>
          {STATUS_OPTIONS.map((s) => (
            <SelectItem key={s.value} value={s.value}>
              {s.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
