"use client";

import { BlogFilters } from "@/app/(main)/blogs/hooks/useBlogsFilter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import MultipleSelector, { Option } from "@/components/ui/MultipleSelector";
import { useFetchTagsQuery } from "@/services/blog/blogApi";
import { debounce } from "lodash";
import { Search, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

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

  // Fetch tags from API
  const { data: tagsResponse } = useFetchTagsQuery({});
  const tagOptions: Option[] = useMemo(() => {
    const tags = tagsResponse?.data || [];
    return tags.map((tag) => ({
      value: tag,
      label: tag,
    }));
  }, [tagsResponse]);

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

  const handleTagsChange = (options: Option[]) => {
    onFilterChange({
      tags: options.map((opt) => opt.value),
    });
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

  const selectedTags: Option[] =
    filters.tags?.map((tag) => ({
      value: tag,
      label: tag,
    })) || [];

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

      <div className="mb-4 space-y-4">
        <div className="flex items-center gap-4">
          <Input
            type="text"
            placeholder="Nhập tiêu đề bài viết..."
            value={titleInput}
            onChange={handleTitleChange}
            onKeyPress={handleKeyPress}
            className="rounded-xl w-full"
          />

          <MultipleSelector
            value={selectedTags}
            onChange={handleTagsChange}
            defaultOptions={tagOptions}
            placeholder="Chọn thẻ..."
            maxSelected={5}
            onMaxSelected={() => toast.info("Bạn chỉ có thể chọn tối đa 5 thẻ")}
            emptyIndicator={
              <p className="text-center text-sm text-muted-foreground">
                Không tìm thấy thẻ
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
