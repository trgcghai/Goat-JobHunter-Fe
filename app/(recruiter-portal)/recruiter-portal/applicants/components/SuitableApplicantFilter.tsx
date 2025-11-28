import React, { useCallback, useEffect, useState } from "react";
import {
  SuitableApplicantsFilters
} from "@/app/(recruiter-portal)/recruiter-portal/applicants/hooks/useExploreSuitableApplicants";
import { useJobManagement } from "@/app/(recruiter-portal)/recruiter-portal/jobs/hooks/useJobManagement";
import { capitalize, debounce } from "lodash";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

interface SuitableApplicantFilterProps {
  filters: SuitableApplicantsFilters;
  onFilterChange: (filters: Partial<SuitableApplicantsFilters>) => void;
  onResetFilters: () => void;
}

const SuitableApplicantFilter = ({
                                   filters,
                                   onFilterChange,
                                   onResetFilters
                                 }: SuitableApplicantFilterProps) => {
  const [fullName, setFullName] = useState(filters.fullName || "");

  const { jobs } = useJobManagement({ initialSize: 200 });

  // Debounce search for applicant full name
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedFullName = useCallback(
    debounce((value: string) => {
      onFilterChange({ fullName: value });
    }, 500),
    []
  );

  // Sync local state with filters prop
  useEffect(() => {
    if (filters.fullName !== fullName) setFullName(filters.fullName || "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.fullName]);

  const handleFullNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFullName(value);
    debouncedFullName(value);
  };

  return (
    <div className="space-y-4 mb-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Tìm theo tên ứng viên..."
            className="pl-9 rounded-xl"
            value={fullName}
            onChange={handleFullNameChange}
          />
        </div>

        <Select
          value={filters.jobId ? filters.jobId.toString() : ""}
          onValueChange={(value) => {
            const jobId = value ? Number(value) : 0;
            onFilterChange({ jobId });
          }}
        >
          <SelectTrigger className="rounded-xl w-full">
            <SelectValue placeholder="Chọn việc làm" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {jobs && jobs.map((job) => {
                return <SelectItem value={job.jobId.toString()} key={job.jobId}>
                  {capitalize(job.title)}
                </SelectItem>;
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="flex justify-end">
        <Button
          variant={"destructive"}
          className="rounded-xl"
          onClick={() => {
            setFullName("");
            onResetFilters();
          }}
        >
          <X className="h-4 w-4 mr-2" />
          Xóa bộ lọc
        </Button>
      </div>
    </div>
  );
};
export default SuitableApplicantFilter;
