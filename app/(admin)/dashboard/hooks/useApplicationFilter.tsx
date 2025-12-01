import { useState } from "react";

export interface DateRangeFilter {
  startDate?: string;
  endDate?: string;
  status?: string;
}

export default function useApplicationFilter(initial?: DateRangeFilter) {
  const [filter, setFilter] = useState<DateRangeFilter>(initial ?? { startDate: "", endDate: "", status: "" });

  function getQueryParams() {
    const params: Record<string, string> = {};
    if (filter.startDate) params.startDate = filter.startDate;
    if (filter.endDate) params.endDate = filter.endDate;
    if (filter.status) params.status = filter.status;
    return params;
  }

  function reset() {
    setFilter({ startDate: "", endDate: "", status: "" });
  }

  return { filter, setFilter, getQueryParams, reset };
}