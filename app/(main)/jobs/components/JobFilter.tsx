"use client";

import { JobFilters } from "@/app/(main)/jobs/hooks/useJobsFilter";
import { Button } from "@/components/ui/button";
import MultipleSelector, { Option } from "@/components/ui/MultipleSelector";
import { JOBFILTER_CONFIG } from "@/constants/constant";
import { useGetSkillsQuery } from "@/services/skill/skillApi";
import { debounce } from "lodash";
import { X } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { toast } from "sonner";
import LoaderSpin from "@/components/common/LoaderSpin";

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
                                    activeFiltersCount
                                  }: JobFilterProps) {
  const [skillInputValue, setSkillInputValue] = useState<string>("");
  const [debouncedSkillInput, setDebouncedSkillInput] = useState<string>("");

  // Fetch skills from API (only when user types)
  const { data: skillsData, isFetching: isFetchingSkills } = useGetSkillsQuery(
    {
      page: 1,
      size: 50,
      name: debouncedSkillInput
    },
    {
      skip: !debouncedSkillInput || debouncedSkillInput.length < 2
    }
  );

  // Debounced function to update search query
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSkillSearch = useCallback(
    debounce((value: string) => {
      setDebouncedSkillInput(value);
    }, 500),
    []
  );

  // Handle skill input value change
  const handleSkillInputChange = (value: string) => {
    setSkillInputValue(value);
    debouncedSkillSearch(value);
  };

  // Convert API skills to options
  const skillOptions = useMemo<Option[]>(() => {
    if (!debouncedSkillInput || debouncedSkillInput.length < 2) return [];

    if (!skillsData?.data?.result) return [];

    return skillsData.data.result.map((skill) => ({
      label: skill.name,
      value: skill.skillId.toString()
    }));
  }, [skillsData, debouncedSkillInput]);

  const handleSkillsChange = (options: Option[]) => {
    onFilterChange({
      skills: options.map((opt) => opt.value)
    });
  };

  const handleLocationChange = (options: Option[]) => {
    onFilterChange({
      location: options.map((opt) => opt.value)
    });
  };

  const handleLevelChange = (options: Option[]) => {
    onFilterChange({
      level: options.map((opt) => opt.value)
    });
  };

  const handleWorkingTypeChange = (options: Option[]) => {
    onFilterChange({
      workingType: options.map((opt) => opt.value)
    });
  };


  const selectedSkills: Option[] =
    filters.skills?.map((skill) => ({
      value: skill,
      label: skill
    })) || [];

  console.log(selectedSkills);

  const selectedLocation: Option[] =
    filters.location?.map((location) => ({
      value: location,
      label: location
    })) || [];

  const selectedLevel: Option[] =
    filters.level?.map((level) => ({
      value: level,
      label: level
    })) || [];

  const selectedWorkingType: Option[] =
    filters.workingType?.map((type) => ({
      value: type,
      label: type
    })) || [];

  return (
    <div className="bg-white rounded-xl border border-border p-6 mb-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-xl md:text-4xl font-bold text-foreground mb-2">
            Tìm kiếm việc làm
          </p>
          <p className="text-muted-foreground">
            Khám phá các việc làm phù hợp với bạn
          </p>
        </div>

        <Button
          size="sm"
          onClick={onResetFilters}
          disabled={activeFiltersCount === 0}
          className="rounded-xl"
        >
          <X className="h-4 w-4 mr-2" />
          Xóa bộ lọc ({activeFiltersCount})
        </Button>
      </div>

      <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <MultipleSelector
          options={skillOptions}
          value={selectedSkills}
          onChange={handleSkillsChange}
          inputValue={skillInputValue}
          onInputValueChange={handleSkillInputChange}
          placeholder="Nhập tên kỹ năng..."
          loadingIndicator={
            isFetchingSkills && (
              <div className="flex items-center justify-center py-2">
                <LoaderSpin />
              </div>
            )
          }
          emptyIndicator={
            <p className="text-center text-sm text-muted-foreground py-2">
              {skillInputValue.length < 2
                ? "Nhập ít nhất 2 ký tự để tìm kiếm"
                : "Không tìm thấy kỹ năng"}
            </p>
          }
          className="flex-1 rounded-xl"
          hidePlaceholderWhenSelected
          maxSelected={5}
          onMaxSelected={(maxLimit) => {
            toast.error(`Chỉ có thể chọn tối đa ${maxLimit} kỹ năng`);
          }}
        />

        <MultipleSelector
          options={JOBFILTER_CONFIG.location.option}
          value={selectedLocation}
          onChange={handleLocationChange}
          placeholder="Chọn địa điểm..."
          emptyIndicator={
            <p className="text-center text-sm text-muted-foreground">
              Không tìm thấy địa điểm
            </p>
          }
          className="flex-1 rounded-xl"
          hidePlaceholderWhenSelected
          maxSelected={JOBFILTER_CONFIG.location.maxSelected}
          onMaxSelected={() => {
            toast.error(JOBFILTER_CONFIG.location.maxSelectedMessage);
          }}
        />

        <MultipleSelector
          options={JOBFILTER_CONFIG.level.option}
          value={selectedLevel}
          onChange={handleLevelChange}
          placeholder="Chọn cấp bậc..."
          emptyIndicator={
            <p className="text-center text-sm text-muted-foreground">
              Không tìm thấy cấp bậc
            </p>
          }
          className="flex-1 rounded-xl"
          hidePlaceholderWhenSelected
          maxSelected={JOBFILTER_CONFIG.level.maxSelected}
          onMaxSelected={() => {
            toast.error(JOBFILTER_CONFIG.level.maxSelectedMessage);
          }}
        />

        <MultipleSelector
          options={JOBFILTER_CONFIG.workingType.option}
          value={selectedWorkingType}
          onChange={handleWorkingTypeChange}
          placeholder="Chọn loại công việc..."
          emptyIndicator={
            <p className="text-center text-sm text-muted-foreground">
              Không tìm thấy loại công việc
            </p>
          }
          className="flex-1 rounded-xl"
          hidePlaceholderWhenSelected
          maxSelected={JOBFILTER_CONFIG.workingType.maxSelected}
          onMaxSelected={() => {
            toast.error(JOBFILTER_CONFIG.workingType.maxSelectedMessage);
          }}
        />
      </div>
    </div>
  );
}