"use client";

import { RecruiterFilters } from "@/app/(main)/recruiters/hooks/useRecruitersFilter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import MultipleSelector, { Option } from "@/components/ui/MultipleSelector";
import { RECRUITERFILTER_CONFIG } from "@/constants/constant";
import { debounce } from "lodash";
import { X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
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
  // Local state for input value
  const [nameInput, setNameInput] = useState(filters.fullName || "");

  // Debounced filter change handler
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedFilterChange = useCallback(
    debounce((value: string) => {
      onFilterChange({ fullName: value });
    }, 500), // 500ms delay
    [onFilterChange],
  );

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      debouncedFilterChange.cancel();
    };
  }, [debouncedFilterChange]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNameInput(value); // Update local state immediately
    debouncedFilterChange(value); // Debounced API call
  };

  const handleAddressChange = (options: Option[]) => {
    // Convert array to comma-separated string
    const addressString = options.map((opt) => opt.value).join(",");
    onFilterChange({
      address: addressString || undefined,
    });
  };

  const handleSearch = () => {
    // Force immediate search (cancel pending debounce)
    debouncedFilterChange.cancel();
    onFilterChange({ fullName: nameInput });
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // Convert comma-separated string back to Options array for MultipleSelector
  const selectedAddress: Option[] = filters.address
    ? filters.address.split(",").map((addr) => ({
        value: addr,
        label: addr,
      }))
    : [];

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
          <Input
            type="text"
            placeholder="Nhập tên nhà tuyển dụng..."
            value={nameInput}
            onChange={handleNameChange}
            onKeyPress={handleKeyPress}
            className="rounded-xl w-full"
          />

          <MultipleSelector
            value={selectedAddress}
            onChange={handleAddressChange}
            defaultOptions={RECRUITERFILTER_CONFIG.location.option}
            placeholder="Tìm kiếm theo địa điểm..."
            maxSelected={RECRUITERFILTER_CONFIG.location.maxSelected}
            onMaxSelected={() =>
              toast.info(RECRUITERFILTER_CONFIG.location.maxSelectedMessage)
            }
            emptyIndicator={
              <p className="text-center text-sm text-muted-foreground">
                Không tìm thấy địa điểm
              </p>
            }
            className="rounded-xl w-full"
          />
        </div>
      </div>
    </div>
  );
}
