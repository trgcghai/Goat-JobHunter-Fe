import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { ApplicationByYearFilter } from "@/app/(admin)/dashboard/hooks/useApplicationByYearFilter";
import { Recruiter } from "@/types/model";

const STATUS_OPTIONS = [
  { label: "Tất cả", value: "ALL" },
  { label: "PENDING", value: "PENDING" },
  { label: "ACCEPTED", value: "ACCEPTED" },
  { label: "REJECTED", value: "REJECTED" }
];

interface FilterApplicationByYearProps {
  filter: ApplicationByYearFilter;
  setFilter: React.Dispatch<React.SetStateAction<ApplicationByYearFilter>>;
  recruiters: Recruiter[];
}

export default function FilterApplicationByYear({ filter, setFilter, recruiters } : FilterApplicationByYearProps) {
  return (
    <div className="flex items-center gap-4">
      {/* Năm */}
      <div className="w-40">
        <Select
          value={String(filter.year)}
          onValueChange={(v) => setFilter({ ...filter, year: Number(v) })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Chọn năm" />
          </SelectTrigger>
          <SelectContent>
            {[2023, 2024, 2025].map((y) => (
              <SelectItem key={y} value={String(y)}>
                {y}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Status */}
      <div className="w-40">
        <Select
          value={filter.status}
          onValueChange={(v) => setFilter({ ...filter, status: v })}
        >
          <SelectTrigger>
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

      {/* Recruiter */}
      <div className="w-48">
        <Select
          value={filter.recruiterId?.toString()}
          onValueChange={(v) => setFilter({ ...filter, recruiterId: Number(v) })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Nhà tuyển dụng" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">Tất cả</SelectItem>
            {recruiters.map((r) => (
              <SelectItem key={r.userId} value={r.userId.toString()}>
                {r.fullName || r.contact.email}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
