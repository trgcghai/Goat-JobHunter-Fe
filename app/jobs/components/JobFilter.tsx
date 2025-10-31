"use client";

import { Button } from "@/components/ui/button";
import MultipleSelector, { Option } from "@/components/ui/MultipleSelector";

interface FilterOptions {
  location: string;
  skills: string[];
  employer: string;
  datePosted: string;
}

interface JobFilterProps {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
}

const LOCATION_OPTIONS: Option[] = [
  { value: "Ho Chi Minh City", label: "Ho Chi Minh City" },
  { value: "Hanoi", label: "Hanoi" },
  { value: "Da Nang", label: "Da Nang" },
  { value: "Can Tho", label: "Can Tho" },
];

const SKILL_OPTIONS: Option[] = [
  { value: "React", label: "React" },
  { value: "Node.js", label: "Node.js" },
  { value: "TypeScript", label: "TypeScript" },
  { value: "Python", label: "Python" },
  { value: "AWS", label: "AWS" },
  { value: "SQL", label: "SQL" },
  { value: "Figma", label: "Figma" },
  { value: "UI Design", label: "UI Design" },
  { value: "Mobile UI", label: "Mobile UI" },
  { value: "Kubernetes", label: "Kubernetes" },
  { value: "Docker", label: "Docker" },
  { value: "PostgreSQL", label: "PostgreSQL" },
  { value: "Flutter", label: "Flutter" },
  { value: "React Native", label: "React Native" },
];

const EMPLOYER_OPTIONS: Option[] = [
  { value: "TechCorp Vietnam", label: "TechCorp Vietnam" },
  { value: "StartupXYZ", label: "StartupXYZ" },
  { value: "DesignStudio", label: "DesignStudio" },
  { value: "CloudServices Inc", label: "CloudServices Inc" },
  { value: "DataCorp", label: "DataCorp" },
  { value: "AppStudio", label: "AppStudio" },
  { value: "InfraTech", label: "InfraTech" },
];

export function JobFilter({ filters, onFilterChange }: JobFilterProps) {
  const handleSkillsChange = (options: Option[]) => {
    onFilterChange({
      ...filters,
      skills: options.map((opt) => opt.value),
    });
  };

  const handleLocationChange = (options: Option[]) => {
    onFilterChange({
      ...filters,
      location: options.length > 0 ? options[0].value : "",
    });
  };

  const handleEmployerChange = (options: Option[]) => {
    onFilterChange({
      ...filters,
      employer: options.length > 0 ? options[0].value : "",
    });
  };

  const selectedSkills: Option[] = filters.skills.map((skill) => ({
    value: skill,
    label: skill,
  }));

  const selectedLocation: Option[] = filters.location
    ? [{ value: filters.location, label: filters.location }]
    : [];

  const selectedEmployer: Option[] = filters.employer
    ? [{ value: filters.employer, label: filters.employer }]
    : [];

  return (
    <div className="bg-white rounded-xl border border-border p-6 mb-8 ">
      <div className="mb-6">
        <p className="text-xl md:text-4xl font-bold text-foreground mb-2">
          Tìm kiếm việc làm
        </p>
        <p className="text-muted-foreground">
          Khám phá các cơ hội việc làm hấp dẫn
        </p>
      </div>

      <div className="flex items-center gap-4 mb-4">
        <MultipleSelector
          value={selectedSkills}
          onChange={handleSkillsChange}
          defaultOptions={SKILL_OPTIONS}
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
          defaultOptions={LOCATION_OPTIONS}
          placeholder="Tìm kiếm theo địa điểm..."
          maxSelected={1}
          emptyIndicator={
            <p className="text-center text-sm text-muted-foreground">
              Không tìm thấy địa điểm
            </p>
          }
          className="rounded-xl w-full"
        />

        <MultipleSelector
          value={selectedEmployer}
          onChange={handleEmployerChange}
          defaultOptions={EMPLOYER_OPTIONS}
          placeholder="Tìm kiếm nhà tuyển dụng..."
          maxSelected={1}
          emptyIndicator={
            <p className="text-center text-sm text-muted-foreground">
              Không tìm thấy nhà tuyển dụng
            </p>
          }
          className="rounded-xl w-full"
        />

        <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl w-1/10">
          Tìm kiếm
        </Button>
      </div>
    </div>
  );
}
