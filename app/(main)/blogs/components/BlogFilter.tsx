"use client";

import { BlogFilters } from "@/app/(main)/blogs/hooks/useBlogsFilter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { debounce } from "lodash";
import { X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

interface BlogFilterProps {
  filters: BlogFilters;
  onFilterChange: (filters: Partial<BlogFilters>) => void;
  onResetFilters: () => void;
  activeFiltersCount: number;
}

export default function BlogFilter({
  filters,
  onFilterChange,
  onResetFilters,
  activeFiltersCount,
}: BlogFilterProps) {
  // Local state for input value
  const [titleInput, setTitleInput] = useState(filters.title || "");

  // Debounced filter change handler
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedFilterChange = useCallback(
    debounce((value: string) => {
      onFilterChange({ title: value });
    }, 500),
    [onFilterChange],
  );

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      debouncedFilterChange.cancel();
    };
  }, [debouncedFilterChange]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTitleInput(value);
    debouncedFilterChange(value);
  };

  const handleSearch = () => {
    debouncedFilterChange.cancel();
    onFilterChange({ title: titleInput });
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="bg-white rounded-xl border border-border p-6 mb-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-xl md:text-4xl font-bold text-foreground mb-2">
            Tìm kiếm bài viết
          </p>
          <p className="text-muted-foreground">Khám phá các bài viết hữu ích</p>
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

      <div className="mb-4">
        <div className="flex items-center gap-4">
          <Input
            type="text"
            placeholder="Nhập tiêu đề bài viết..."
            value={titleInput}
            onChange={handleTitleChange}
            onKeyPress={handleKeyPress}
            className="rounded-xl flex-1"
          />
        </div>
      </div>
    </div>
  );
}
