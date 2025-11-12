import { useFetchJobsQuery } from "@/services/job/jobApi";
import { useMemo, useState } from "react";

export interface JobFilters {
  location?: string[];
  skills?: string[];
  employer?: string[];
  level?: string[];
  workingType?: string[];
  keyword?: string;
  salary?: string;
  career?: string;
  status?: string;
  recruiterId?: string;
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

  // Build query params
  const queryParams = useMemo(() => {
    return {
      page: currentPage,
      limit: itemsPerPage,
      sortBy: "createdAt",
      ...filters,
      // Convert arrays to comma-separated strings
      location: filters.location?.join(","),
      skills: filters.skills?.join(","),
      level: filters.level?.join(","),
      workingType: filters.workingType?.join(","),
    };
  }, [currentPage, itemsPerPage, filters]);

  // Fetch jobs with RTK Query
  const {
    data: jobsResponse,
    isLoading,
    isFetching,
    isError,
    error,
  } = useFetchJobsQuery(queryParams);

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
  const activeFiltersCount = Object.keys(filters).filter(
    (key) => filters[key as keyof JobFilters] !== undefined,
  ).length;

  const hasActiveFilters = activeFiltersCount > 0;

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
    hasActiveFilters,

    // Pagination
    goToPage,
    nextPage,
    previousPage,
    hasNextPage,
    hasPreviousPage,
  };
};

export default useJobsFilter;
