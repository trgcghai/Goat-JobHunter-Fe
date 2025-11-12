"use client";

import { JobFilters } from "@/app/(main)/jobs/hooks/useJobsFilter";
import { Button } from "@/components/ui/button";
import MultipleSelector, { Option } from "@/components/ui/MultipleSelector";
import { JOBFILTER_CONFIG } from "@/constants/constant";
import { X } from "lucide-react";
import { toast } from "sonner";

interface JobFilterProps {
  filters: JobFilters;
  onFilterChange: (filters: Partial<JobFilters>) => void;
  onResetFilters: () => void;
  activeFiltersCount: number;
}

export default function JobFilter({
  filters,
  onFilterChange,
  onResetFilters,
  activeFiltersCount,
}: JobFilterProps) {
  const handleSkillsChange = (options: Option[]) => {
    onFilterChange({
      skills: options.map((opt) => opt.value),
    });
  };

  const handleLocationChange = (options: Option[]) => {
    onFilterChange({
      location: options.map((opt) => opt.value),
    });
  };

  const handleEmployerChange = (options: Option[]) => {
    onFilterChange({
      employer: options.map((opt) => opt.value),
    });
  };

  const handleLevelChange = (options: Option[]) => {
    onFilterChange({
      level: options.map((opt) => opt.value),
    });
  };

  const handleWorkingTypeChange = (options: Option[]) => {
    onFilterChange({
      workingType: options.map((opt) => opt.value),
    });
  };

  const selectedSkills: Option[] =
    filters.skills?.map((skill) => ({
      value: skill,
      label: skill,
    })) || [];

  const selectedLocation: Option[] =
    filters.location?.map((location) => ({
      value: location,
      label: location,
    })) || [];

  const selectedEmployer: Option[] =
    filters.employer?.map((employer) => ({
      value: employer,
      label: employer,
    })) || [];

  const selectedLevel: Option[] =
    filters.level?.map((level) => ({
      value: level,
      label: level,
    })) || [];

  const selectedWorkingType: Option[] =
    filters.workingType?.map((type) => ({
      value: type,
      label: type,
    })) || [];

  return (
    <div className="bg-white rounded-xl border border-border p-6 mb-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-xl md:text-4xl font-bold text-foreground mb-2">
            Tìm kiếm việc làm
          </p>
          <p className="text-muted-foreground">
            Khám phá các cơ hội việc làm hấp dẫn
          </p>
        </div>

        <Button
          variant="default"
          size="sm"
          disabled={activeFiltersCount === 0}
          onClick={onResetFilters}
          className="rounded-xl"
        >
          <X className="h-4 w-4 mr-2" />
          Xóa bộ lọc ({activeFiltersCount})
        </Button>
      </div>

      <div className="mb-4 space-y-4">
        <div className="flex items-center gap-4">
          <MultipleSelector
            value={selectedSkills}
            onChange={handleSkillsChange}
            defaultOptions={JOBFILTER_CONFIG.skill.option}
            onMaxSelected={() =>
              toast.info(JOBFILTER_CONFIG.skill.maxSelectedMessage)
            }
            maxSelected={JOBFILTER_CONFIG.skill.maxSelected}
            placeholder="Tìm kiếm theo kỹ năng..."
            emptyIndicator={
              <p className="text-center text-sm text-muted-foreground">
                Không tìm thấy kỹ năng
              </p>
            }
            className="rounded-xl w-full"
          />

          <MultipleSelector
            value={selectedLocation}
            onChange={handleLocationChange}
            defaultOptions={JOBFILTER_CONFIG.location.option}
            placeholder="Tìm kiếm theo địa điểm..."
            maxSelected={JOBFILTER_CONFIG.location.maxSelected}
            onMaxSelected={() =>
              toast.info(JOBFILTER_CONFIG.location.maxSelectedMessage)
            }
            emptyIndicator={
              <p className="text-center text-sm text-muted-foreground">
                Không tìm thấy địa điểm
              </p>
            }
            className="rounded-xl w-full"
          />

          <MultipleSelector
            value={selectedLevel}
            onChange={handleLevelChange}
            defaultOptions={JOBFILTER_CONFIG.level.option}
            placeholder="Chọn cấp độ..."
            maxSelected={JOBFILTER_CONFIG.level.maxSelected}
            onMaxSelected={() =>
              toast.info(JOBFILTER_CONFIG.level.maxSelectedMessage)
            }
            emptyIndicator={
              <p className="text-center text-sm text-muted-foreground">
                Không tìm thấy cấp độ
              </p>
            }
            className="rounded-xl w-full"
          />
        </div>

        <div className="flex items-center gap-4">
          <MultipleSelector
            value={selectedWorkingType}
            onChange={handleWorkingTypeChange}
            defaultOptions={JOBFILTER_CONFIG.workingType.option}
            placeholder="Hình thức làm việc..."
            maxSelected={JOBFILTER_CONFIG.workingType.maxSelected}
            onMaxSelected={() =>
              toast.info(JOBFILTER_CONFIG.workingType.maxSelectedMessage)
            }
            emptyIndicator={
              <p className="text-center text-sm text-muted-foreground">
                Không tìm thấy hình thức
              </p>
            }
            className="rounded-xl w-full"
          />

          <MultipleSelector
            value={selectedEmployer}
            onChange={handleEmployerChange}
            defaultOptions={JOBFILTER_CONFIG.recruiter.option}
            placeholder="Tìm kiếm nhà tuyển dụng..."
            maxSelected={JOBFILTER_CONFIG.recruiter.maxSelected}
            onMaxSelected={() =>
              toast.info(JOBFILTER_CONFIG.recruiter.maxSelectedMessage)
            }
            emptyIndicator={
              <p className="text-center text-sm text-muted-foreground">
                Không tìm thấy nhà tuyển dụng
              </p>
            }
            className="rounded-xl w-full"
          />
        </div>
      </div>
    </div>
  );
}
