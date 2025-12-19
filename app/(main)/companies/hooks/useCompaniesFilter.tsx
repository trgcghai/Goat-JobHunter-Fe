import { useFetchAvailableCompaniesQuery } from "@/services/company/companyApi";
import { useMemo, useState } from "react";


export interface CompanyFilters {
  name?: string;
  address?: string;
  enabled?: boolean;
  verified?: boolean;
}

export interface UseCompanyFilterOptions {
  initialPage?: number;
  itemsPerPage?: number;
  initialFilters?: CompanyFilters;
}

export const useCompanyFilter = (options?: UseCompanyFilterOptions) => {
    const {
        initialPage = 1,
        itemsPerPage = 10,
        initialFilters = {},
    } = options || {};

    const [currentPage, setCurrentPage] = useState(initialPage);
    const [filters, setFilters] = useState<CompanyFilters>(initialFilters);

    const queryParams = useMemo(() => {
        const params: Record<string, string | number | boolean> = {
          page: currentPage,
          size: itemsPerPage,
        };

        // Add filters
        if (filters.name) {
          params.name = filters.name;
        }

        if (filters.address) {
          params.address = filters.address;
        }

        if (filters.verified !== undefined) {
          params.verified = filters.verified;
        }

        if (filters.enabled !== undefined) {
          params.enabled = filters.enabled;
        }

        return params;
      }, [currentPage, itemsPerPage, filters]);

    const {data: companyResponse, isLoading, isFetching, isError, error} = useFetchAvailableCompaniesQuery(queryParams);

    const companies = companyResponse?.data?.result || [];
    const meta = companyResponse?.data?.meta || {
        current: 1,
        pageSize: itemsPerPage,
        pages: 0,
        total: 0,
    };

    const totalPages = meta.pages;
    const totalItems = meta.total;

    const handleFilterChange = (newFilters: Partial<CompanyFilters>) => {
        setFilters((prev) => ({ ...prev, ...newFilters }));
        setCurrentPage(1);
    };

    const resetFilters = () => {
        setFilters(initialFilters);
        setCurrentPage(1);
    };


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

    const activeFiltersCount = Object.entries(filters).filter(([_, value]) => {
        return value !== undefined && value !== null && value !== "";
    }).length;

    return {
        // Data
        companies,
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
    }
}