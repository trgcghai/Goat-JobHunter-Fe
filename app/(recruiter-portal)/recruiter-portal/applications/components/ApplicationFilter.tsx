"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import MultipleSelector, { Option } from "@/components/ui/MultipleSelector";
import { debounce } from "lodash";
import { Search, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { ApplicationFilters } from "../hooks/useApplicationManagement";
import { ApplicationStatus } from "@/types/enum";

interface ApplicationFilterProps {
  filters: ApplicationFilters;
  onFilterChange: (filters: Partial<ApplicationFilters>) => void;
  onResetFilters: () => void;
}

const STATUS_OPTIONS: Option[] = Object.entries(ApplicationStatus).map(([key, value]) => ({
  label: key.charAt(0) + key.slice(1).toLowerCase().replace(/_/g, " "),
  value: value,
}))

export default function ApplicationFilter({
  filters,
  onFilterChange,
  onResetFilters,
}: ApplicationFilterProps) {
  const [jobTitle, setJobTitle] = useState(filters.jobTitle || "");

  // Debounce search for Job Title
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedJobSearch = useCallback(
    debounce((value: string) => {
      onFilterChange({ jobTitle: value });
    }, 500),
    [],
  );

  const handleJobTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setJobTitle(value);
    debouncedJobSearch(value);
  };

  // Sync local state with filters prop
  useEffect(() => {
    if (filters.jobTitle !== jobTitle) setJobTitle(filters.jobTitle || "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.jobTitle]);

  const selectedStatus =
    filters.status?.map(
      (s) =>
        STATUS_OPTIONS.find((opt) => opt.value === s) || { label: s, value: s },
    ) || [];

  return (
    <div className="space-y-4 mb-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Tìm theo công việc..."
            className="pl-9 rounded-xl"
            value={jobTitle}
            onChange={handleJobTitleChange}
          />
        </div>

        <MultipleSelector
          value={selectedStatus}
          onChange={(options) =>
            onFilterChange({ status: options.map((o) => o.value) })
          }
          defaultOptions={STATUS_OPTIONS}
          placeholder="Trạng thái hồ sơ..."
          className="rounded-xl"
          badgeClassName="bg-primary/10 text-primary"
        />
      </div>

      <div className="flex justify-end">
        <Button
          variant={"destructive"}
          className="rounded-xl"
          onClick={() => {
            setJobTitle("");
            onResetFilters();
          }}
        >
          <X className="h-4 w-4 mr-2" />
          Xóa bộ lọc
        </Button>
      </div>
    </div>
  );
}
