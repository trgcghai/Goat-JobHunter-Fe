import { useFetchApplicationsByRecruiterQuery } from "@/services/application/applicationApi";
import { useMemo, useState } from "react";

export interface ApplicationFilters {
  jobTitle?: string;
  status?: string[];
}

export const useApplicationManagement = () => {
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [filters, setFilters] = useState<ApplicationFilters>({
    jobTitle: "",
    status: [],
  });

  // Build query params
  const queryParams = useMemo(() => {
    const params: Record<string, string | number | string[] | boolean> = {
      page,
      size,
    };

    if (filters.jobTitle) params.jobTitle = filters.jobTitle;
    if (filters.status && filters.status.length > 0)
      params.status = filters.status;

    return params;
  }, [page, size, filters]);

  // Fetch API
  const { data, isLoading, isFetching, isError, error } =
    useFetchApplicationsByRecruiterQuery(queryParams);

  const applications = data?.data?.result || [];
  const meta = data?.data?.meta || {
    current: 1,
    pageSize: 10,
    pages: 0,
    total: 0,
  };

  // Handlers
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleSizeChange = (newSize: number) => {
    setSize(newSize);
    setPage(1);
  };

  const handleFilterChange = (newFilters: Partial<ApplicationFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
    setPage(1);
  };

  const resetFilters = () => {
    setFilters({
      jobTitle: "",
      status: [],
    });
    setPage(1);
  };

  return {
    applications,
    meta,
    isLoading: isLoading || isFetching,
    isError,
    error,
    page,
    size,
    filters,
    handlePageChange,
    handleSizeChange,
    handleFilterChange,
    resetFilters,
  };
};
