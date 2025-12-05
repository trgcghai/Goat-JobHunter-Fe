import { useFetchAvailableBlogsQuery } from "@/services/blog/blogApi";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

export interface BlogFilters {
  title?: string;
  tags?: string[];
}

export interface UseBlogsFilterOptions {
  initialPage?: number;
  itemsPerPage?: number;
  initialFilters?: BlogFilters;
}

export const useBlogsFilter = (options?: UseBlogsFilterOptions) => {
  const {
    initialPage = 1,
    itemsPerPage = 10,
    initialFilters = {},
  } = options || {};

  const router = useRouter()

  const [currentPage, setCurrentPage] = useState(initialPage);
  const [filters, setFilters] = useState<BlogFilters>(initialFilters);

  // Build query params matching FetchBlogsRequest
  const queryParams = useMemo(() => {
    const params: Record<string, string | number | string[]> = {
      page: currentPage,
      size: itemsPerPage,
    };

    // Add filters
    if (filters.title) {
      params.title = filters.title;
    }

    if (filters.tags && filters.tags.length > 0) {
      params.tags = filters.tags; // API accepts string[]
    }

    return params;
  }, [currentPage, itemsPerPage, filters]);

  // Fetch blogs with RTK Query
  const {
    data: blogsResponse,
    isLoading,
    isFetching,
    isError,
    error,
  } = useFetchAvailableBlogsQuery(queryParams);

  // Extract data from response
  const blogs = blogsResponse?.data?.result || [];
  const meta = blogsResponse?.data?.meta || {
    current: 1,
    pageSize: itemsPerPage,
    pages: 0,
    total: 0,
  };

  const totalPages = meta.pages;
  const totalItems = meta.total;

  // Filter handlers
  const handleFilterChange = (newFilters: Partial<BlogFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
    setCurrentPage(1); // Reset to first page on filter change
  };

  const resetFilters = () => {
    setFilters({
      title: "",
      tags: [],
    });
    setCurrentPage(1);
    router.push("/blogs")
  };

  // Pagination handlers
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const hasNextPage = currentPage < totalPages;
  const hasPreviousPage = currentPage > 1;

  // Active filters count
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const activeFiltersCount = Object.entries(filters).filter(([_, value]) => {
    if (Array.isArray(value)) {
      return value.length > 0;
    }
    return value !== undefined && value !== null && value !== "";
  }).length;

  return {
    // Data
    blogs,
    meta,
    totalPages,
    totalItems,
    currentPage,
    itemsPerPage,

    // Loading states
    isLoading,
    isFetching,
    isError,
    error,

    // Filters
    filters,
    handleFilterChange,
    resetFilters,
    activeFiltersCount,

    // Pagination
    goToPage,
    nextPage,
    previousPage,
    hasNextPage,
    hasPreviousPage,
  };
};

export default useBlogsFilter;
