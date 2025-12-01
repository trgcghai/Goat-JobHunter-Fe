import { useState } from "react";

export interface ApplicationByYearFilter {
  year: number;
  status?: string;
  recruiterId?: number;
}

export default function useApplicationByYearFilter(initial?: Partial<ApplicationByYearFilter>) {
  const [filter, setFilter] = useState<ApplicationByYearFilter>({
    year: initial?.year ?? new Date().getFullYear(),
    status: initial?.status ?? "",
    recruiterId: initial?.recruiterId ?? 0
  });

  function getQueryParams() {
    const params: Record<string, string | number> = { year: filter.year };
    if (filter.status) params.status = filter.status;
    if (filter.recruiterId) params.recruiterId = filter.recruiterId;
    return params;
  }

  function reset() {
    setFilter((s) => ({ ...s, status: "", recruiterId: 0 }));
  }

  return { filter, setFilter, getQueryParams, reset };
}