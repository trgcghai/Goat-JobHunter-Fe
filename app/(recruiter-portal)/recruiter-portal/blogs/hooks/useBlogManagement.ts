import { useFetchBlogsByCurrentRecruiterQuery } from "@/services/blog/blogApi";
import { useEffect, useMemo, useState } from "react";

export interface RecruiterBlogFilters {
  title?: string;
  draft?: boolean | null; // null = all, true = draft, false = published
}

interface UseBlogManagementProps {
  initialPage?: number;
  initialSize?: number;
}

export const useBlogManagement = ({ initialPage = 1, initialSize = 10 }: UseBlogManagementProps) => {
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [filters, setFilters] = useState<RecruiterBlogFilters>({
    title: "",
    draft: null
  });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPage(initialPage);
    setSize(initialSize);
  }, [initialPage, initialSize]);

  const queryParams = useMemo(() => {
    const params: Record<string, string | number | string[] | boolean> = {
      page,
      size
    };

    if (filters.title) params.title = filters.title;
    if (filters.draft) params.draft = filters.draft;

    return params;
  }, [page, size, filters]);

  const { data, isLoading, isFetching, isError, error } =
    useFetchBlogsByCurrentRecruiterQuery(queryParams);

  const blogs = data?.data?.result || [];
  const meta = data?.data?.meta || {
    current: 1,
    pageSize: 10,
    pages: 0,
    total: 0
  };

  const handleSizeChange = (newSize: number) => {
    setSize(newSize);
    setPage(1);
  };

  const handleFilterChange = (newFilters: Partial<RecruiterBlogFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
    setPage(1);
  };

  const resetFilters = () => {
    setFilters({
      title: "",
      draft: null
    });
    setPage(1);
  };

  return {
    blogs,
    meta,
    isLoading: isLoading || isFetching,
    isError,
    error,
    page,
    size,
    filters,
    setPage,
    handleSizeChange,
    handleFilterChange,
    resetFilters
  };
};