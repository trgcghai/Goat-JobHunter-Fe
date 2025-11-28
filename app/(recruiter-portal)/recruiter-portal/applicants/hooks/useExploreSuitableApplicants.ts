import { useMemo, useState } from "react";
import { useFetchApplicantsSuitableForJobQuery } from "@/services/job/jobApi";

export interface SuitableApplicantsFilters {
  jobId: number;
  fullName?: string;
}

const useExploreSuitableApplicants = () => {
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [filters, setFilters] = useState<SuitableApplicantsFilters>({
    jobId: 0,
    fullName: ""
  });

  const queryParams = useMemo(() => {
    const params: Record<string, string | number | string[] | boolean> = {
      page,
      size
    };

    if (filters.jobId) params.jobId = filters.jobId;
    if (filters.fullName) params.fullName = filters.fullName;

    return params;
  }, [page, size, filters]);

  const {
    data,
    isLoading,
    isFetching,
    error,
    isError
  } = useFetchApplicantsSuitableForJobQuery(queryParams, { skip: !filters.jobId });

  const applicants = data?.data?.result || [];
  const meta = data?.data?.meta || {
    current: 1,
    pageSize: 10,
    pages: 0,
    total: 0,
  };

  const handleSizeChange = (newSize: number) => {
    setSize(newSize);
    setPage(1);
  };

  const handleFilterChange = (newFilters: Partial<SuitableApplicantsFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
    setPage(1);
  };

  const resetFilters = () => {
    if (filters.jobId && !filters.fullName) {
      setFilters({
        jobId: 0,
        fullName: ""
      })
      return;
    }

    setFilters((prev) => ({
      ...prev,
      fullName: ""
    }));
    setPage(1);
  };

  return {
    applicants,
    meta,
    isLoading: isLoading || isFetching,
    isError,
    error,
    page,
    size,
    filters,
    setPage,
    setSize,
    handleSizeChange,
    handleFilterChange,
    resetFilters,
  }
};
export default useExploreSuitableApplicants;
