"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import MultipleSelector, { Option } from "@/components/ui/MultipleSelector";
import { LOCATION_OPTIONS } from "@/constants/constant";
import { Search } from "lucide-react";

export interface RecruiterFilterOptions {
  location: string;
  companyName: string;
}

interface RecruiterFilterProps {
  filters: RecruiterFilterOptions;
  onFilterChange: (filters: RecruiterFilterOptions) => void;
}

export default function RecruiterFilter({
  filters,
  onFilterChange,
}: RecruiterFilterProps) {
  const handleLocationChange = (options: Option[]) => {
    onFilterChange({
      ...filters,
      location: options.length > 0 ? options[0].value : "",
    });
  };

  const handleCompanyNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({
      ...filters,
      companyName: e.target.value,
    });
  };

  const selectedLocation: Option[] = filters.location
    ? [{ value: filters.location, label: filters.location }]
    : [];

  return (
    <div className="bg-white rounded-xl border border-border p-6 mb-8">
      <div className="mb-6">
        <p className="text-xl md:text-4xl font-bold text-foreground mb-2">
          Tìm kiếm nhà tuyển dụng
        </p>
        <p className="text-muted-foreground">
          Khám phá các nhà tuyển dụng uy tín
        </p>
      </div>

      <div className="mb-4 space-y-4">
        <div className="flex items-center gap-4">
          <Input
            type="text"
            placeholder="Nhập tên công ty..."
            value={filters.companyName}
            onChange={handleCompanyNameChange}
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

          <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl w-1/10">
            <Search />
            Tìm kiếm
          </Button>
        </div>
      </div>
    </div>
  );
}
