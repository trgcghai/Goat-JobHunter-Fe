import { useFetchRecruitersQuery } from "@/services/recruiter/recruiterApi";
import { useMemo, useState } from "react";

export interface RecruiterFilters {
  keyword?: string;
  address?: string[];
  enabled?: boolean;
  page?: number;
  size?: number;
}

export interface UseRecruitersFilterOptions {
  initialPage?: number;
  itemsPerPage?: number;
  initialFilters?: RecruiterFilters;
}

export const useRecruitersFilter = (options?: UseRecruitersFilterOptions) => {
  const {
    initialPage = 1,
    itemsPerPage = 10,
    initialFilters = {},
  } = options || {};

  const [currentPage, setCurrentPage] = useState(initialPage);
  const [filters, setFilters] = useState<RecruiterFilters>(initialFilters);

  // Build query params
  const queryParams = useMemo(() => {
    return {
      page: currentPage,
      limit: itemsPerPage,
      sortBy: "createdAt",
      ...filters,
      // Convert address array to comma-separated string
      address: filters.address?.length ? filters.address.join(",") : undefined,
    };
  }, [currentPage, itemsPerPage, filters]);

  // Fetch recruiters with RTK Query
  const {
    data: recruitersResponse,
    isLoading,
    isFetching,
    isError,
    error,
  } = useFetchRecruitersQuery(queryParams);

  // Extract data from response
  const recruiters = recruitersResponse?.data?.result || [];
  const meta = recruitersResponse?.data?.meta || {
    current: 1,
    pageSize: itemsPerPage,
    pages: 0,
    total: 0,
  };

  const totalPages = meta.pages;
  const totalItems = meta.total;

  // Filter handlers
  const handleFilterChange = (newFilters: Partial<RecruiterFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
    setCurrentPage(1); // Reset to first page on filter change
  };

  const resetFilters = () => {
    setFilters(initialFilters);
    setCurrentPage(1);
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
    recruiters,
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

export default useRecruitersFilter;
