import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { JobFilter } from "@/app/(admin)/dashboard/hooks/useJobFilter";

export type FilterJobProps = {
  filter: JobFilter;
  setFilter: React.Dispatch<React.SetStateAction<JobFilter>>;
};

export default function FilterJob({ filter, setFilter } : FilterJobProps) {
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
          <SelectItem value="ALL">Tất cả</SelectItem>
          <SelectItem value="ACTIVE">Active</SelectItem>
          <SelectItem value="INACTIVE">Inactive</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
