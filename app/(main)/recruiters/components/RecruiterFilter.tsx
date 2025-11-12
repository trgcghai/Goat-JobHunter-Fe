"use client";

import { RecruiterFilters } from "@/app/(main)/recruiters/hooks/useRecruitersFilter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import MultipleSelector, { Option } from "@/components/ui/MultipleSelector";
import { JOBFILTER_CONFIG } from "@/constants/constant";
import { Search, X } from "lucide-react";
import { toast } from "sonner";

interface RecruiterFilterProps {
  filters: RecruiterFilters;
  onFilterChange: (filters: Partial<RecruiterFilters>) => void;
  onResetFilters: () => void;
  activeFiltersCount: number;
}

export default function RecruiterFilter({
  filters,
  onFilterChange,
  onResetFilters,
  activeFiltersCount,
}: RecruiterFilterProps) {
  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ keyword: e.target.value });
  };

  const handleAddressChange = (options: Option[]) => {
    onFilterChange({
      address: options.map((opt) => opt.value),
    });
  };

  const handleSearch = () => {
    // Trigger search by updating filters
    onFilterChange({ ...filters });
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const selectedAddress: Option[] =
    filters.address?.map((addr) => ({
      value: addr,
      label: addr,
    })) || [];

  return (
    <div className="bg-white rounded-xl border border-border p-6 mb-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-xl md:text-4xl font-bold text-foreground mb-2">
            Tìm kiếm nhà tuyển dụng
          </p>
          <p className="text-muted-foreground">
            Khám phá các nhà tuyển dụng uy tín
          </p>
        </div>

        {activeFiltersCount > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={onResetFilters}
            className="rounded-xl"
          >
            <X className="h-4 w-4 mr-2" />
            Xóa bộ lọc ({activeFiltersCount})
          </Button>
        )}
      </div>

      <div className="mb-4 space-y-4">
        <div className="flex items-center gap-4">
          <Input
            type="text"
            placeholder="Nhập tên công ty hoặc từ khóa..."
            value={filters.keyword || ""}
            onChange={handleKeywordChange}
            onKeyUp={handleKeyPress}
            className="rounded-xl w-full"
          />

          <MultipleSelector
            value={selectedAddress}
            onChange={handleAddressChange}
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

          <Button
            onClick={handleSearch}
            className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl"
          >
            <Search className="h-4 w-4 mr-2" />
            Tìm kiếm
          </Button>
        </div>
      </div>
    </div>
  );
}
