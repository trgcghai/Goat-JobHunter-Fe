import { useFetchJobsAvailableQuery } from "@/services/job/jobApi";
import { useMemo, useState } from "react";

export interface JobFilters {
  location?: string[];
  skills?: number[];
  level?: string[];
  workingType?: string[];
}

export interface UseJobsFilterOptions {
  initialPage?: number;
  itemsPerPage?: number;
  initialFilters?: JobFilters;
}

export const useJobsFilter = (options?: UseJobsFilterOptions) => {
  const {
    initialPage = 1,
    itemsPerPage = 10,
    initialFilters = {},
  } = options || {};

  const [currentPage, setCurrentPage] = useState(initialPage);
  const [filters, setFilters] = useState<JobFilters>(initialFilters);

  // Build query params matching FetchJobsRequest
  const queryParams = useMemo(() => {
    const params: Record<string, string | number | string[] | boolean | number[]> = {
      page: currentPage,
      size: itemsPerPage, // Changed from 'limit' to 'size'
    };

    if (filters.location && filters.location.length > 0) {
      params.location = filters.location.join(",");
    }

    if (filters.level && filters.level.length > 0) {
      params.level = filters.level; // API accepts string[] or string
    }

    if (filters.workingType && filters.workingType.length > 0) {
      params.workingType = filters.workingType; // API accepts string[] or string
    }

    if (filters.skills && filters.skills.length > 0) {
      params.skills = filters.skills;
    }

    return params;
  }, [currentPage, itemsPerPage, filters]);

  const {
    data: jobsResponse,
    isLoading,
    isFetching,
    isError,
    error,
  } = useFetchJobsAvailableQuery(queryParams);

  // Extract data from response
  const jobs = jobsResponse?.data?.result || [];
  const meta = jobsResponse?.data?.meta || {
    current: 1,
    pageSize: itemsPerPage,
    pages: 0,
    total: 0,
  };

  const totalPages = meta.pages;
  const totalItems = meta.total;

  // Filter handlers
  const handleFilterChange = (newFilters: Partial<JobFilters>) => {
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
    jobs,
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

export default useJobsFilter;
