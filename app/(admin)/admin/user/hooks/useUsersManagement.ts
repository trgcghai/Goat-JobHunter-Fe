import { useFetchUsersQuery } from "@/services/user/userApi";
import { useMemo, useState } from "react";

export type UserFilterType = {
  email?: string;
  phone?: string;
  role?: string;
  enabled?: boolean;
};

export default function useUsersManagement() {
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [filters, setFilters] = useState<UserFilterType>({
    email: "",
    phone: "",
    role: "",
    enabled: undefined,
  });

  // Build query params
  const queryParams = useMemo(() => {
    const params: Record<string, string | number | boolean> = {
      page,
      size,
    };

    if (filters.email) params.email = filters.email;
    if (filters.phone) params.phone = filters.phone;
    if (filters.role) params.role = filters.role;
    if (filters.enabled) params.enabled = filters.enabled;

    return params;
  }, [page, size, filters]);

  const { data, isLoading, isFetching, isError } = useFetchUsersQuery(queryParams);

  const users = data?.data?.result || [];
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

  const handleFilterChange = (newFilters: UserFilterType) => {
    setFilters(newFilters);
    setPage(1);
  };

  const resetFilters = () => {
    setFilters({
      email: "",
      phone: "",
      role: "",
      enabled: undefined,
    });
    setPage(1);
  };

  return {
    users,
    meta,
    isLoading: isLoading || isFetching,
    isError,
    page,
    size,
    filters,
    handlePageChange,
    handleSizeChange,
    handleFilterChange,
    resetFilters,
  };
}