import { useFetchJobsByCurrentRecruiterQuery } from "@/services/job/jobApi";
import { useEffect, useMemo, useState } from "react";

export interface RecruiterJobFilters {
  title?: string;
  level?: string[];
  workingType?: string[];
  active?: boolean | null; // null = all, true = active, false = inactive
}

interface UseJobManagementProps {
  initialPage?: number;
  initialSize?: number;
}

export const useJobManagement = ({ initialPage = 1, initialSize = 10 }: UseJobManagementProps) => {
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [filters, setFilters] = useState<RecruiterJobFilters>({
    title: "",
    level: [],
    workingType: [],
    active: null
  });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPage(initialPage);
    setSize(initialSize);
  }, [initialPage, initialSize]);

  // Build query params
  const queryParams = useMemo(() => {
    const params: Record<string, string | number | string[] | boolean> = {
      page,
      size
    };

    if (filters.title) params.title = filters.title;
    if (filters.level && filters.level.length > 0) params.level = filters.level;
    if (filters.workingType && filters.workingType.length > 0)
      params.workingType = filters.workingType;
    if (filters.active != undefined) params.active = filters.active;

    return params;
  }, [page, size, filters]);

  // Fetch API
  const { data, isLoading, isFetching, isError, error } =
    useFetchJobsByCurrentRecruiterQuery(queryParams);

  const jobs = data?.data?.result || [];
  const meta = data?.data?.meta || {
    current: 1,
    pageSize: 10,
    pages: 0,
    total: 0
  };

  // Handlers
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleSizeChange = (newSize: number) => {
    setSize(newSize);
    setPage(1); // Reset về trang 1 khi đổi size
  };

  const handleFilterChange = (newFilters: Partial<RecruiterJobFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
    setPage(1); // Reset về trang 1 khi filter thay đổi
  };

  const resetFilters = () => {
    setFilters({
      title: "",
      level: [],
      workingType: [],
      active: null
    });
    setPage(1);
  };

  return {
    jobs,
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
    resetFilters
  };
};
