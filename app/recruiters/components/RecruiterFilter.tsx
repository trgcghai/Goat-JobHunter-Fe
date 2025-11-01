"use client";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import type React from "react";

export interface RecruiterFilterOptions {
  location: string;
  companyName: string;
}

interface RecruiterFilterProps {
  filters: RecruiterFilterOptions;
  onFilterChange: (filters: RecruiterFilterOptions) => void;
}

const LOCATIONS = ["Ho Chi Minh City", "Hanoi", "Da Nang", "Can Tho"];

export function RecruiterFilter({
  filters,
  onFilterChange,
}: RecruiterFilterProps) {
  const handleLocationChange = (location: string) => {
    onFilterChange({
      ...filters,
      location: filters.location === location ? "" : location,
    });
  };

  const handleCompanyNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({
      ...filters,
      companyName: e.target.value,
    });
  };

  const handleReset = () => {
    onFilterChange({
      location: "",
      companyName: "",
    });
  };

  const hasActiveFilters = filters.location || filters.companyName;

  return (
    <Card className="p-6 bg-card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold text-foreground">Tìm Kiếm</h3>
        {hasActiveFilters && (
          <button
            onClick={handleReset}
            className="text-xs text-primary hover:text-primary/80 transition-colors flex items-center gap-1"
          >
            <X className="h-3 w-3" />
            Xóa
          </button>
        )}
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-foreground mb-2">
          Tên Công Ty
        </label>
        <Input
          type="text"
          placeholder="Nhập tên công ty..."
          value={filters.companyName}
          onChange={handleCompanyNameChange}
          className="w-full"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-3">
          Địa Điểm
        </label>
        <div className="space-y-2">
          {LOCATIONS.map((location) => (
            <label
              key={location}
              className="flex items-center gap-2 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={filters.location === location}
                onChange={() => handleLocationChange(location)}
                className="rounded border-border"
              />
              <span className="text-sm text-foreground group-hover:text-primary transition-colors">
                {location}
              </span>
            </label>
          ))}
        </div>
      </div>
    </Card>
  );
}
