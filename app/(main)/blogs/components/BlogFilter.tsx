"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export interface BlogFilterOptions {
  searchTerm: string;
}

interface BlogFilterProps {
  filters: BlogFilterOptions;
  onFilterChange: (filters: BlogFilterOptions) => void;
}

export default function BlogFilter({
  filters,
  onFilterChange,
}: BlogFilterProps) {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({
      ...filters,
      searchTerm: e.target.value,
    });
  };

  return (
    <div className="mb-12">
      <div className="flex items-center gap-4">
        <Input
          type="text"
          placeholder="Nhập tiêu đề bài viết..."
          value={filters.searchTerm}
          onChange={handleSearchChange}
          className="rounded-xl w-full"
        />

        <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl w-1/8">
          <Search />
          Tìm kiếm
        </Button>
      </div>
    </div>
  );
}
